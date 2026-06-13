import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Languages, BookOpen, RotateCw } from 'lucide-react';
import { fadeUp, stagger } from '../lib/animations';
import { certs } from '../data/certs';
import { useLanguage } from '../lib/i18n';

export function CertsSection() {
  const { t, language } = useLanguage();
  // Für Touch/Tastatur: Klick bzw. Enter toggelt die Karte (Maus flippt per Hover, CSS).
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="zertifikate" className="matrix-band py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16 text-center md:text-left"
        >
          <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4 block">
            {t.certs.badge}
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif leading-tight text-nordic-text">
            {t.certs.title}
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 border-b border-border-color pb-16 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex gap-6 items-start"
          >
            <div className="w-12 h-12 bg-nordic-accent/10 border border-nordic-accent/20 rounded-full flex items-center justify-center text-nordic-accent shrink-0 mt-1">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-2 text-nordic-text">{t.certs.philips.title}</h3>
              <span className="inline-block text-xs font-semibold text-nordic-accent bg-nordic-accent/15 px-2.5 py-1 rounded-full mb-4">
                {t.certs.philips.subtitle}
              </span>
              <p className="text-nordic-muted text-sm leading-relaxed">{t.certs.philips.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex gap-6 items-start"
          >
            <div className="w-12 h-12 bg-nordic-accent/10 border border-nordic-accent/20 rounded-full flex items-center justify-center text-nordic-accent shrink-0 mt-1">
              <Languages size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-4 text-nordic-text">{t.certs.languages.title}</h3>
              {t.certs.languages.subtitle && (
                <span className="inline-block text-xs font-semibold text-nordic-accent bg-nordic-accent/15 px-2.5 py-1 rounded-full mb-4">
                  {t.certs.languages.subtitle}
                </span>
              )}
              <p className="text-nordic-muted text-sm leading-relaxed mb-4">{t.certs.languages.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-nordic-muted font-mono">
                {t.certs.languages.items.map(item => (
                  <div key={item.label}>
                    {item.label}: <span className="text-nordic-text font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, index) => {
            const isFlipped = flippedCards.has(index);
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={cert.name}
                onClick={() => toggleFlip(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(index);
                  }
                }}
                className="flip-card group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nordic-accent rounded-2xl min-h-[220px]"
              >
                <div className={`flip-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Vorderseite: Datum, Titel, Aussteller + deutlicher Umdreh-Hinweis */}
                  <div className="flip-face min-h-[220px] h-full bg-nordic-bg border border-border-color group-hover:border-nordic-accent/50 p-6 rounded-2xl flex flex-col justify-between transition-colors duration-300">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold font-mono text-nordic-accent bg-nordic-accent/10 px-2 py-0.5 rounded-full border border-nordic-accent/20">
                          {cert.date}
                        </span>
                        <BookOpen size={16} className="text-nordic-muted" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-nordic-text leading-tight">{cert.name}</h4>
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t border-border-color pt-4 mt-6">
                      <span className="text-[11px] text-nordic-muted font-semibold uppercase tracking-wider">{cert.issuer}</span>
                      <RotateCw
                        size={16}
                        className="shrink-0 text-nordic-accent/70 transition-transform duration-500 group-hover:rotate-180 group-hover:text-nordic-accent"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  {/* Rückseite: Kursinhalte */}
                  <div className="flip-face flip-back bg-nordic-bg border border-nordic-accent/40 p-6 rounded-2xl flex flex-col">
                    <div className="text-[10px] font-bold font-mono text-nordic-accent uppercase tracking-wider mb-3">
                      {language === 'de' ? 'Inhalte' : 'Covered topics'}
                    </div>
                    <p className="text-nordic-muted text-xs leading-relaxed font-light">{cert.desc[language]}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
