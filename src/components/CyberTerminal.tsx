import { useState, useRef, useEffect, type ReactNode, type FormEvent, type KeyboardEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { projects, type Project } from '../data/projects';
import { skillsData, type SkillIconKey } from '../data/skills';
import { timelineItems } from '../data/timeline';
import { getCurrentSemester, ordinalEn } from '../lib/semester';

const PROMPT = 'visitor@adamo:~$';

interface Entry {
  key: number;
  command?: string;
  output: ReactNode;
}

// Kompaktes, terminal-gestyltes Kontaktformular. Nutzt dieselbe Web3Forms-Logik
// wie die ContactSection, nur in CLI-Optik.
function TerminalContact() {
  const { t } = useLanguage();
  const tt = t.terminal;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accessKey) {
      setStatus('error');
      setError(t.contact.errorNotConfigured);
      return;
    }
    setStatus('submitting');
    setError('');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio inquiry from ${form.name}`,
          from_name: 'Portfolio Terminal',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setError(data.message ?? t.contact.errorNetwork);
      }
    } catch {
      clearTimeout(timeoutId);
      setStatus('error');
      setError(t.contact.errorNetwork);
    }
  };

  if (status === 'success') {
    return <div className="text-emerald-300">✓ {t.contact.successMessage}</div>;
  }

  const fieldCls =
    'w-full bg-black/40 border border-emerald-500/25 rounded px-2 py-1 text-emerald-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 placeholder-emerald-200/30 disabled:opacity-60';

  return (
    <form onSubmit={submit} className="space-y-1.5 max-w-md">
      <div className="text-emerald-200/70">{tt.contactIntro}</div>
      <div className="flex items-center gap-2">
        <span className="text-cyan-300 w-14 shrink-0">name:</span>
        <input
          className={fieldCls}
          required
          maxLength={100}
          disabled={status === 'submitting'}
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder={t.contact.namePlaceholder}
          aria-label={t.contact.nameLabel}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-cyan-300 w-14 shrink-0">email:</span>
        <input
          type="email"
          className={fieldCls}
          required
          maxLength={150}
          disabled={status === 'submitting'}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder={t.contact.emailPlaceholder}
          aria-label={t.contact.emailFieldLabel}
        />
      </div>
      <div className="flex items-start gap-2">
        <span className="text-cyan-300 w-14 shrink-0 pt-1">msg:</span>
        <textarea
          className={fieldCls}
          required
          maxLength={2000}
          rows={3}
          disabled={status === 'submitting'}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder={t.contact.messagePlaceholder}
          aria-label={t.contact.messageLabel}
        />
      </div>
      {status === 'error' && <div className="text-rose-400 pl-16">{error}</div>}
      <div className="pl-16">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/30 transition-colors disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <><Loader2 size={12} className="animate-spin" />{t.contact.submitting}</>
          ) : (
            `> ${t.contact.submit}`
          )}
        </button>
      </div>
    </form>
  );
}

export function CyberTerminal({ onExit }: { onExit: () => void }) {
  const { t, language } = useLanguage();
  const tt = t.terminal;

  const [history, setHistory] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logPointer, setLogPointer] = useState(-1);

  const keyRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextKey = () => ++keyRef.current;

  const statusLabel: Record<Project['status'], string> = {
    completed: t.projects.statusCompleted,
    ongoing: t.projects.statusOngoing,
    planning: t.projects.statusPlanning,
  };

  const commands: { name: string; usage?: string; descKey: keyof typeof tt.desc }[] = [
    { name: 'help', descKey: 'help' },
    { name: 'whoami', descKey: 'whoami' },
    { name: 'skills', descKey: 'skills' },
    { name: 'projects', descKey: 'projects' },
    { name: 'cat', usage: 'cat <id>', descKey: 'cat' },
    { name: 'career', descKey: 'career' },
    { name: 'contact', descKey: 'contact' },
    { name: 'social', descKey: 'social' },
    { name: 'clear', descKey: 'clear' },
    { name: 'corporate', descKey: 'corporate' },
  ];

  // ---- Renderer (dieselben Daten wie die Corporate-Ansicht) ----

  const renderHelp = (): ReactNode => (
    <div>
      <div className="text-emerald-200/70">{tt.helpIntro}</div>
      <ul className="mt-1 space-y-0.5">
        {commands.map(c => (
          <li key={c.name} className="flex flex-wrap gap-x-3">
            <span className="text-cyan-300 w-28 shrink-0">{c.usage ?? c.name}</span>
            <span className="text-emerald-200/70">{tt.desc[c.descKey]}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderWhoami = (): ReactNode => {
    const semester = getCurrentSemester();
    const semLabel = language === 'de' ? `${semester}. Semester` : `${ordinalEn(semester)} semester`;
    return (
      <div className="space-y-1">
        <div className="text-emerald-300 font-bold text-base">Ben-Vincent Emilio Adamo</div>
        <div className="text-emerald-200/80">{t.hero.tagline}</div>
        <div className="mt-2 space-y-0.5 text-emerald-200/70">
          <div><span className="text-cyan-300">role</span>  · {t.hero.status.work.primary} — {t.hero.status.work.secondary}</div>
          <div><span className="text-cyan-300">study</span> · {t.hero.status.study.primary} ({semLabel}) — {t.hero.status.study.secondary}</div>
          <div><span className="text-cyan-300">base</span>  · {t.hero.status.vocational.primary}</div>
        </div>
      </div>
    );
  };

  const renderSkills = (): ReactNode => (
    <div className="space-y-2">
      {(Object.keys(skillsData) as SkillIconKey[]).map(key => (
        <div key={key}>
          <div className="text-emerald-300 font-bold">{t.skills.categories[key]}</div>
          <ul className="mt-0.5">
            {skillsData[key].items.map(s => (
              <li key={s.name.de} className="flex gap-2">
                <span className="text-emerald-400 tracking-tighter">{'█'.repeat(s.level)}{'░'.repeat(5 - s.level)}</span>
                <span className="text-emerald-200/80">{s.name[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderProjects = (): ReactNode => (
    <div className="space-y-0.5">
      {projects.map(p => (
        <div key={p.id} className="flex gap-3">
          <span className="text-cyan-300 w-6 shrink-0 text-right">{p.id}</span>
          <span className="text-emerald-200/90 flex-1">{p.title[language]}</span>
          <span className="text-emerald-200/50 shrink-0 hidden sm:inline">[{statusLabel[p.status]}]</span>
        </div>
      ))}
      <div className="text-emerald-200/50 mt-1">{tt.projectsHint}</div>
    </div>
  );

  const renderProject = (p: Project): ReactNode => (
    <div className="space-y-2">
      <div className="text-emerald-300 font-bold text-base">{p.title[language]}</div>
      <div className="text-emerald-200/80">{p.description[language]}</div>
      <div><span className="text-cyan-300">{tt.labelStatus}:</span> <span className="text-emerald-200/80">{statusLabel[p.status]}</span></div>
      <div><span className="text-cyan-300">{tt.labelTech}:</span> <span className="text-emerald-200/80">{p.tech.join(', ')}</span></div>
      <div>
        <div className="text-cyan-300">{tt.labelHighlights}:</div>
        <ul className="mt-0.5 space-y-0.5">
          {p.highlights[language].map((h, i) => (
            <li key={i} className="flex gap-2"><span className="text-emerald-500 shrink-0">›</span><span className="text-emerald-200/80">{h}</span></li>
          ))}
        </ul>
      </div>
      {p.repoUrl && (
        <div>
          <span className="text-cyan-300">repo:</span>{' '}
          <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300 break-all">{p.repoUrl}</a>
        </div>
      )}
    </div>
  );

  const renderCareer = (): ReactNode => (
    <div className="space-y-2">
      {timelineItems.map(item => (
        <div key={item.id}>
          <div className="flex flex-wrap gap-x-3">
            <span className="text-cyan-300 shrink-0">{item.date[language]}</span>
            <span className="text-emerald-300 font-bold">{item.title[language]}</span>
          </div>
          <div className="text-emerald-200/60">{item.institution[language]}</div>
        </div>
      ))}
    </div>
  );

  const renderSocial = (): ReactNode => (
    <div className="space-y-0.5">
      <div><span className="text-cyan-300 inline-block w-20">email</span> <a className="text-emerald-400 underline hover:text-emerald-300" href="mailto:Ben@Adamo.de">Ben@Adamo.de</a></div>
      <div><span className="text-cyan-300 inline-block w-20">linkedin</span> <a className="text-emerald-400 underline hover:text-emerald-300" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ben-adamo-509b441bb/">ben-adamo</a></div>
      <div><span className="text-cyan-300 inline-block w-20">github</span> <a className="text-emerald-400 underline hover:text-emerald-300" target="_blank" rel="noopener noreferrer" href="https://github.com/Benisteinfisch">Benisteinfisch</a></div>
    </div>
  );

  // ---- Boot-Sequenz beim ersten Mount ----
  useEffect(() => {
    const boot: Entry[] = tt.boot.map(line => ({ key: nextKey(), output: <span className="text-emerald-200/50">{line}</span> }));
    boot.push({ key: nextKey(), output: <span className="text-emerald-300">{tt.welcome}</span> });
    boot.push({ key: nextKey(), output: <span className="text-emerald-200/60">{tt.hint}</span> });
    setHistory(boot);
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Auto-Scroll ans Ende ----
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const push = (command: string | undefined, output: ReactNode) =>
    setHistory(h => [...h, { key: nextKey(), command, output }]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      push('', null);
      return;
    }
    setCmdLog(l => [...l, trimmed]);
    setLogPointer(-1);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(' ');
    const lc = cmd.toLowerCase();

    switch (lc) {
      case 'help':
        push(trimmed, renderHelp());
        break;
      case 'whoami':
        push(trimmed, renderWhoami());
        break;
      case 'skills':
        push(trimmed, renderSkills());
        break;
      case 'projects':
      case 'ls':
        push(trimmed, renderProjects());
        break;
      case 'cat': {
        if (!arg) {
          push(trimmed, <span className="text-emerald-200/70">{tt.catUsage}</span>);
          break;
        }
        const p = projects.find(pr => String(pr.id) === arg);
        push(trimmed, p ? renderProject(p) : <span className="text-rose-400">{tt.catNotFound}</span>);
        break;
      }
      case 'career':
      case 'history':
        push(trimmed, renderCareer());
        break;
      case 'contact':
        push(trimmed, <TerminalContact />);
        break;
      case 'social':
      case 'links':
        push(trimmed, renderSocial());
        break;
      case 'sudo':
        if (arg.toLowerCase().replace('-', ' ') === 'hire me') {
          push(trimmed, (
            <div className="space-y-0.5">
              {tt.hireMe.map((l, i) => (
                <div key={i} className={i < 2 ? 'text-emerald-200/50' : 'text-emerald-300'}>{l}</div>
              ))}
            </div>
          ));
        } else {
          push(trimmed, <span className="text-rose-400">{cmd}{tt.notFound}</span>);
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'corporate':
      case 'exit':
        push(trimmed, <span className="text-emerald-300">→ corporate</span>);
        setTimeout(onExit, 150);
        return;
      default:
        push(trimmed, <span className="text-rose-400">{cmd}{tt.notFound}</span>);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(input);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const np = logPointer < 0 ? cmdLog.length - 1 : Math.max(0, logPointer - 1);
      setLogPointer(np);
      setInput(cmdLog[np]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (logPointer < 0) return;
      const np = logPointer + 1;
      if (np >= cmdLog.length) {
        setLogPointer(-1);
        setInput('');
      } else {
        setLogPointer(np);
        setInput(cmdLog[np]);
      }
    }
  };

  const chips = ['help', 'whoami', 'skills', 'projects', 'career', 'contact'];
  const runChip = (c: string) => {
    run(c);
    inputRef.current?.focus();
  };

  return (
    <section className="pt-20 bg-[#070a07] min-h-screen" aria-label="Interactive terminal">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="rounded-xl border border-emerald-500/20 bg-[#0a0e0a] shadow-2xl overflow-hidden font-mono text-[13px] md:text-sm">
          {/* Titelleiste */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-emerald-500/15 bg-emerald-950/30">
            <span className="w-3 h-3 rounded-full bg-rose-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-emerald-300/70 text-xs">ben@adamo — secure shell</span>
          </div>

          {/* Ausgabe + Eingabezeile */}
          <div
            ref={scrollRef}
            onClick={e => {
              // Nur Klicks auf den leeren Terminal-Hintergrund fokussieren die
              // Kommandozeile — Klicks auf Formularfelder/Links/Buttons NICHT,
              // sonst klaut das Terminal den Fokus (z. B. im `contact`-Formular).
              const el = e.target as HTMLElement;
              if (el.closest('input, textarea, button, a, label, select')) return;
              inputRef.current?.focus();
            }}
            className="h-[58vh] md:h-[62vh] overflow-y-auto px-4 py-4 space-y-2 leading-relaxed"
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            {history.map(e => (
              <div key={e.key}>
                {e.command !== undefined && (
                  <div className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">{PROMPT}</span>
                    <span className="text-emerald-100 break-all">{e.command}</span>
                  </div>
                )}
                {e.output != null && <div className="mt-1">{e.output}</div>}
              </div>
            ))}

            <form onSubmit={onSubmit} className="flex gap-2 items-center">
              <span className="text-emerald-500 shrink-0">{PROMPT}</span>
              <label htmlFor="terminal-input" className="sr-only">Terminal command</label>
              <input
                ref={inputRef}
                id="terminal-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-emerald-100 caret-emerald-400"
              />
            </form>
          </div>

          {/* Klickbare Befehls-Chips (lösen das Mobile-Problem) */}
          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-emerald-500/15 bg-emerald-950/20">
            {chips.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => runChip(c)}
                className="px-2.5 py-1 rounded-md text-xs text-emerald-300 border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/15 hover:border-emerald-500/50 transition-colors"
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              onClick={onExit}
              className="ml-auto px-2.5 py-1 rounded-md text-xs text-emerald-200/60 border border-emerald-500/25 hover:text-emerald-200 hover:border-emerald-500/50 transition-colors"
            >
              {tt.exit}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
