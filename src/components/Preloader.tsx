import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fake-Boot-Log: bewusst glaubwürdig statt Hollywood — die Zeilen entsprechen
// echten Eigenschaften der Seite (CSP, TLS, security.txt, Self-hosted Fonts).
const BOOT_LINES = [
  '[ ok ] boot      ben-adamo portfolio v1.0',
  '[ ok ] tls       certificate valid · adamo.de',
  "[ ok ] csp       policy active · script-src 'self'",
  '[ ok ] headers   hsts · nosniff · frame-deny',
  '[ ok ] fonts     inter / playfair · self-hosted',
  '[ ok ] i18n      modules de/en loaded',
  '[ ok ] sec.txt   RFC 9116 · /.well-known/security.txt',
  '[ >> ] init      launching interface …',
];

const LINE_INTERVAL_MS = 140;
const GLITCH_MS = 380;

// Terminal-Boot-Sequenz beim ersten Aufruf (einmal pro Tab-Session).
// Bei prefers-reduced-motion wird sie komplett übersprungen.
export function Preloader() {
  const [shown, setShown] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return sessionStorage.getItem('boot-done') !== '1';
    } catch {
      return false;
    }
  });
  const [lineCount, setLineCount] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!shown) return;
    const interval = setInterval(() => {
      setLineCount(count => {
        if (count >= BOOT_LINES.length) {
          clearInterval(interval);
          setGlitch(true);
          setTimeout(() => {
            try {
              sessionStorage.setItem('boot-done', '1');
            } catch { /* Storage blockiert -> Sequenz läuft beim nächsten Mal eben erneut */ }
            setShown(false);
          }, GLITCH_MS);
          return count;
        }
        return count + 1;
      });
    }, LINE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [shown]);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-[300] bg-[#0a0a09] flex items-center justify-center ${glitch ? 'boot-glitch' : ''}`}
          aria-hidden="true"
        >
          <div className="w-full max-w-md px-6 font-mono text-[11px] md:text-xs leading-relaxed select-none">
            {BOOT_LINES.slice(0, lineCount).map(line => (
              <div key={line} className="whitespace-pre text-[#8db58d]">
                <span className="text-[#5C574E]">{line.slice(0, 6)}</span>
                {line.slice(6)}
              </div>
            ))}
            <span className="boot-cursor inline-block w-2 h-3.5 bg-[#8db58d] align-middle" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
