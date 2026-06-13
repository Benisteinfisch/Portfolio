import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

// Endpoint des Cloudflare Workers. Wird über VITE_ASK_BEN_ENDPOINT gesetzt
// (siehe worker/README.md). Ohne Endpoint degradiert das Widget freundlich.
const ENDPOINT = import.meta.env.VITE_ASK_BEN_ENDPOINT as string | undefined;
const MAX_LEN = 500;
const COOLDOWN_MS = 5000; // muss mit COOLDOWN_SEC im Worker (ask-ben.js) synchron sein

// Filtert offensichtlich sinnlose Eingaben (Gibberish, Spam, Symbol-Müll),
// bevor sie überhaupt gesendet werden. Spiegelbild der Server-Validierung.
function looksLikeJunk(text: string): boolean {
  const t = text.trim();
  if (t.length < 2) return true;
  const letters = (t.match(/\p{L}/gu) || []).length;
  if (letters < 2) return true;                  // braucht echte Buchstaben
  if (/^(.)\1*$/u.test(t)) return true;          // nur ein wiederholtes Zeichen ("aaaa")
  if (/(.)\1{7,}/u.test(t)) return true;         // 8+ gleiche Zeichen am Stück
  const longestToken = t.split(/\s+/).reduce((m, w) => Math.max(m, w.length), 0);
  if (longestToken > 50) return true;            // ein Riesen-"Wort" = Mash/Payload
  return false;
}

export function AskBen() {
  const { t } = useLanguage();
  const a = t.askBen;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  // Auf Mobile an den sichtbaren Bereich (Visual Viewport) gekoppelt -> Tastatur-Handling.
  const [vvStyle, setVvStyle] = useState<{ top: number; height: number } | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  // Tickt nur während eines aktiven Cooldowns (für den Countdown).
  useEffect(() => {
    if (cooldownUntil <= Date.now()) return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  const cooldownSecs = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const onCooldown = cooldownSecs > 0;

  const keyRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = () => ++keyRef.current;

  // Fokus auf Eingabe beim Öffnen, Esc schließt.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open]);

  // Auf Mobile (Vollbild-Chat) den Hintergrund-Scroll sperren, damit die Seite
  // dahinter nicht mitscrollt/wackelt. iOS-robust via position:fixed + Scroll-Restore.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia('(max-width: 639px)').matches) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Mobile: Panel exakt an den sichtbaren Bereich koppeln. Geht die Tastatur auf,
  // schrumpft visualViewport.height -> Fenster passt sich an, kein leerer Bereich,
  // Eingabe + Fragen bleiben sichtbar.
  useEffect(() => {
    const vp = window.visualViewport;
    if (!open || !vp) return;
    if (!window.matchMedia('(max-width: 639px)').matches) return;
    const update = () => setVvStyle({ top: vp.offsetTop, height: vp.height });
    update();
    vp.addEventListener('resize', update);
    vp.addEventListener('scroll', update);
    return () => {
      vp.removeEventListener('resize', update);
      vp.removeEventListener('scroll', update);
      setVvStyle(null);
    };
  }, [open]);

  // Auto-Scroll ans Ende bei neuen Nachrichten.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async (raw: string) => {
    const text = raw.trim().slice(0, MAX_LEN);
    if (!text || loading || onCooldown) return;

    // Sinnlos-/Spam-Eingaben gar nicht erst senden.
    if (looksLikeJunk(text)) {
      setInput('');
      setMessages(m => [...m, { id: nextId(), role: 'assistant', content: a.junk }]);
      return;
    }

    // 30-Sekunden-Sperre starten (Client-UX; der Server erzwingt sie zusätzlich).
    setCooldownUntil(Date.now() + COOLDOWN_MS);
    setNow(Date.now());

    const userMsg: ChatMessage = { id: nextId(), role: 'user', content: text };
    // Nur die letzten Turns als Kontext mitgeben (Server kappt zusätzlich).
    const history = [...messages, userMsg].slice(-6).map(m => ({ role: m.role, content: m.content }));
    setMessages(m => [...m, userMsg]);
    setInput('');

    if (!ENDPOINT) {
      setMessages(m => [...m, { id: nextId(), role: 'assistant', content: a.notConfigured }]);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json().catch(() => null);

      if (res.status === 429) {
        setMessages(m => [...m, { id: nextId(), role: 'assistant', content: a.rateLimited }]);
      } else if (res.status === 422) {
        setMessages(m => [...m, { id: nextId(), role: 'assistant', content: a.junk }]);
      } else if (res.ok && data && typeof data.reply === 'string') {
        // Antwort wird als reiner Text gerendert (kein HTML) -> XSS-sicher.
        setMessages(m => [...m, { id: nextId(), role: 'assistant', content: data.reply }]);
      } else {
        setMessages(m => [...m, { id: nextId(), role: 'assistant', content: a.error }]);
      }
    } catch {
      clearTimeout(timeoutId);
      setMessages(m => [...m, { id: nextId(), role: 'assistant', content: a.error }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showIntro = messages.length === 0;

  return (
    <>
      {/* Floating-Button unten rechts */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? a.close : a.open}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[55] w-14 h-14 rounded-full bg-nordic-accent text-white shadow-lg shadow-nordic-accent/30 flex items-center justify-center hover:bg-nordic-accent-hover hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat-Fenster */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={a.title}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={vvStyle ? { top: vvStyle.top, height: vvStyle.height, bottom: 'auto' } : undefined}
            className="fixed z-[55] flex flex-col bg-nordic-surface shadow-2xl overflow-hidden
              inset-0 rounded-none border-0
              sm:inset-auto sm:bottom-24 sm:right-5 sm:w-[370px] sm:h-[540px] sm:max-h-[calc(100vh-9rem)] sm:rounded-2xl sm:border sm:border-border-color"
          >
            {/* Kopfzeile */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-color bg-nordic-bg/60">
              <div className="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center text-nordic-accent shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif font-bold text-nordic-text leading-tight">{a.title}</div>
                <div className="text-[11px] text-nordic-muted">{a.subtitle}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={a.close}
                className="p-1.5 rounded-lg text-nordic-muted hover:text-nordic-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nachrichten */}
            {/* data-lenis-prevent: Mausrad scrollt hier den Chat, nicht die Seite dahinter */}
            <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
              {showIntro && (
                <div className="flex gap-2">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-black/5 dark:bg-white/5 px-3.5 py-2.5 text-sm text-nordic-text leading-relaxed">
                    {a.intro}
                  </div>
                </div>
              )}

              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      m.role === 'user'
                        ? 'rounded-2xl rounded-tr-sm bg-nordic-accent text-white'
                        : 'rounded-2xl rounded-tl-sm bg-black/5 dark:bg-white/5 text-nordic-text'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-black/5 dark:bg-white/5 px-3.5 py-3 text-nordic-muted">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}

              {/* Vorschlags-Chips nur am Anfang */}
              {showIntro && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {a.suggestions.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 rounded-full text-xs text-nordic-accent border border-nordic-accent/30 bg-accent-light hover:bg-nordic-accent/10 hover:border-nordic-accent/50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Eingabe */}
            <form onSubmit={onSubmit} className="border-t border-border-color p-3 bg-nordic-bg/40">
              <div className="flex items-end gap-2">
                <label htmlFor="askben-input" className="sr-only">{a.placeholder}</label>
                <input
                  id="askben-input"
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  maxLength={MAX_LEN}
                  disabled={loading || onCooldown}
                  placeholder={onCooldown ? `${a.cooldown} ${cooldownSecs}s…` : a.placeholder}
                  autoComplete="off"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-border-color bg-nordic-surface text-base sm:text-sm text-nordic-text placeholder-nordic-muted/60 focus:outline-none focus:border-nordic-accent focus:ring-2 focus:ring-nordic-accent/30 transition-colors disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={loading || onCooldown || !input.trim()}
                  aria-label={a.send}
                  className="w-10 h-10 shrink-0 rounded-xl bg-nordic-accent text-white flex items-center justify-center hover:bg-nordic-accent-hover disabled:opacity-40 disabled:hover:bg-nordic-accent transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="text-[10px] text-nordic-muted/70 text-center mt-2">{a.disclaimer}</div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
