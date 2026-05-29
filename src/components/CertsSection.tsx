import { motion } from 'framer-motion';
import { Award, Languages, BookOpen } from 'lucide-react';
import { fadeUp, stagger } from '../lib/animations';
import { certs } from '../data/certs';
import { useLanguage } from '../lib/i18n';

export function CertsSection() {
  const { t, language } = useLanguage();

  return (
    <section id="zertifikate" className="bg-[#262320] dark:bg-zinc-950 text-white py-24 transition-colors duration-300">
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
          <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-serif leading-tight">
            {t.certs.title}
          </motion.h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 border-b border-white/10 pb-16 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex gap-6 items-start"
          >
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-nordic-accent shrink-0 mt-1">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-2 text-white">{t.certs.philips.title}</h3>
              <span className="inline-block text-xs font-semibold text-nordic-accent bg-nordic-accent/15 px-2.5 py-1 rounded-full mb-4">
                {t.certs.philips.subtitle}
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed">{t.certs.philips.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex gap-6 items-start"
          >
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-nordic-accent shrink-0 mt-1">
              <Languages size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-4 text-white">{t.certs.languages.title}</h3>
              {t.certs.languages.subtitle && (
                <span className="inline-block text-xs font-semibold text-nordic-accent bg-nordic-accent/15 px-2.5 py-1 rounded-full mb-4">
                  {t.certs.languages.subtitle}
                </span>
              )}
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{t.certs.languages.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-300 font-mono">
                {t.certs.languages.items.map(item => (
                  <div key={item.label}>
                    {item.label}: <span className="text-white font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 hover:border-nordic-accent/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold font-mono text-nordic-accent bg-nordic-accent/10 px-2 py-0.5 rounded-full border border-nordic-accent/20">
                    {cert.date}
                  </span>
                  <BookOpen size={16} className="text-zinc-500" />
                </div>
                <h4 className="font-serif font-bold text-base text-white leading-tight mb-2">{cert.name}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">{cert.desc[language]}</p>
              </div>
              <div className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider border-t border-white/5 pt-4 mt-6">
                {cert.issuer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
