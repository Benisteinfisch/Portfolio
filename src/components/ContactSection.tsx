import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, ExternalLink, Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { fadeUp, stagger } from '../lib/animations';
import { useLanguage } from '../lib/i18n';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // Honeypot gegen Spam-Bots (uncontrolled -> liest den echten DOM-Wert beim Absenden).
  const honeypotRef = useRef<HTMLInputElement>(null);

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessKey) {
      setStatus('error');
      setErrorMessage(t.contact.errorNotConfigured);
      return;
    }

    // Honeypot ausgefuellt -> Bot. Stillschweigend "erfolgreich" tun (nicht verraten),
    // ohne die Anfrage tatsaechlich zu senden.
    if (honeypotRef.current?.value) {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 8000);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio inquiry from ${formState.name}`,
          from_name: 'Portfolio Website',
          botcheck: honeypotRef.current?.value || '',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        setStatus('error');
        setErrorMessage(data.message ?? t.contact.errorNetwork);
        setTimeout(() => setStatus('idle'), 6000);
      }
    } catch {
      clearTimeout(timeoutId);
      setStatus('error');
      setErrorMessage(t.contact.errorNetwork);
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section id="kontakt" className="py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="md:col-span-5 space-y-8"
          >
            <div>
              <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4 block">
                {t.contact.badge}
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif leading-tight">
                {t.contact.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-nordic-muted mt-4 font-light text-sm md:text-base leading-relaxed">
                {t.contact.description}
              </motion.p>
            </div>

            <motion.div variants={stagger} className="space-y-4 text-sm md:text-base">
              <motion.a
                variants={fadeUp}
                href="mailto:Ben@Adamo.de"
                className="flex items-center gap-4 text-nordic-muted hover:text-nordic-text transition-colors p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-nordic-accent shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-nordic-muted">{t.contact.emailLabel}</div>
                  <div className="font-semibold text-nordic-text">Ben@Adamo.de</div>
                </div>
              </motion.a>

              <motion.a
                variants={fadeUp}
                href="https://www.linkedin.com/in/ben-adamo-509b441bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-nordic-muted hover:text-nordic-text transition-colors p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-nordic-accent shrink-0">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-nordic-muted">{t.contact.linkedinLabel}</div>
                  <div className="font-semibold text-nordic-text flex items-center gap-1">
                    Ben Adamo <ExternalLink size={12} />
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 bg-nordic-surface dark:bg-zinc-900/40 p-8 md:p-10 rounded-2xl border border-border-color shadow-sm"
          >
            <h3 className="font-serif font-bold text-2xl text-nordic-text mb-6">{t.contact.formTitle}</h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Honeypot: fuer Menschen unsichtbar (display:none, aria-hidden, nicht fokussierbar).
                  Bots fuellen es aus -> Absendung wird verworfen. */}
              <input
                ref={honeypotRef}
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="name" className="block text-xs uppercase font-semibold text-nordic-muted mb-2">{t.contact.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  required
                  maxLength={100}
                  disabled={isSubmitting}
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-border-color bg-black/5 dark:bg-white/5 text-nordic-text placeholder-nordic-muted/60 focus:outline-none input-glow disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase font-semibold text-nordic-muted mb-2">{t.contact.emailFieldLabel}</label>
                <input
                  type="email"
                  id="email"
                  required
                  maxLength={150}
                  disabled={isSubmitting}
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-border-color bg-black/5 dark:bg-white/5 text-nordic-text placeholder-nordic-muted/60 focus:outline-none input-glow disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase font-semibold text-nordic-muted mb-2">{t.contact.messageLabel}</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  maxLength={2000}
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-border-color bg-black/5 dark:bg-white/5 text-nordic-text placeholder-nordic-muted/60 focus:outline-none input-glow resize-none disabled:opacity-60"
                />
              </div>

              {/* Button morpht zwischen Senden / Spinner / gezeichnetem Häkchen */}
              <motion.button
                type="submit"
                disabled={isSubmitting || status === 'success'}
                animate={{ scale: status === 'success' ? [1, 1.04, 1] : 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-nordic-accent hover:bg-nordic-accent-hover disabled:bg-nordic-accent/55 text-white text-sm font-semibold transition-colors shadow-sm overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status === 'success' ? 'success' : isSubmitting ? 'submitting' : 'idle'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={15} className="animate-spin" /><span>{t.contact.submitting}</span></>
                    ) : status === 'success' ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <motion.path
                            d="M4 12.5l5 5L20 6.5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                          />
                        </svg>
                        <span>{t.contact.submitted}</span>
                      </>
                    ) : (
                      <><span>{t.contact.submit}</span><Send size={15} /></>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 text-xs text-nordic-accent bg-accent-light p-3 rounded-xl border border-nordic-accent/20 font-medium"
                >
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                  <span>{t.contact.successMessage}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 font-medium"
                >
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
