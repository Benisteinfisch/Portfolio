import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase, Shield } from 'lucide-react';
import { fadeUp, stagger } from '../lib/animations';
import { useLanguage } from '../lib/i18n';

const grades: string[] = ['1,0', '1,3', '1,7', '1,7', '1,7', '1,7'];
const gradesEn: string[] = ['1.0', '1.3', '1.7', '1.7', '1.7', '1.7'];

export function FoundationSection() {
  const { t, language } = useLanguage();
  const ik = t.foundation.industriekaufmann;
  const itsec = t.foundation.itsec;
  const gradeValues = language === 'de' ? grades : gradesEn;

  return (
    <section id="fundament" className="bg-nordic-surface dark:bg-zinc-900/40 py-24 transition-colors duration-300">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-16 text-center md:text-left"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4 font-sans">
            {t.foundation.badge}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif max-w-3xl leading-tight">
            {t.foundation.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-nordic-muted mt-4 max-w-2xl font-light">
            {t.foundation.description}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mb-6 text-nordic-accent">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-serif mb-2 text-nordic-text">{ik.title}</h3>
              <div className="text-xs font-semibold text-nordic-accent uppercase tracking-wider mb-4">
                {ik.employer}
              </div>
              <p className="text-nordic-muted mb-6 text-sm leading-relaxed">{ik.description}</p>
            </div>
            <ul className="space-y-3 text-sm font-medium border-t border-border-color pt-6">
              {ik.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-nordic-accent shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mb-6 text-nordic-accent">
                <Shield size={20} />
              </div>
              <h3 className="text-2xl font-serif mb-2 text-nordic-text">{itsec.title}</h3>
              <div className="text-xs font-semibold text-nordic-accent uppercase tracking-wider mb-4">
                {itsec.institution}
              </div>
              <p className="text-nordic-muted mb-6 text-sm leading-relaxed">{itsec.description}</p>
            </div>

            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-border-color mt-auto">
              <div className="text-xs uppercase tracking-widest text-nordic-muted mb-3 font-semibold">
                {itsec.gradesHeader}
              </div>
              <div className="space-y-2 text-sm">
                {itsec.subjects.map((subject, i) => (
                  <div
                    key={subject}
                    className={`flex justify-between transition-colors duration-300 ${i < itsec.subjects.length - 1 ? 'border-b border-border-color pb-2' : ''}`}
                  >
                    <span className="text-nordic-muted">{subject}</span>
                    <span className="font-mono font-bold text-nordic-accent">{gradeValues[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
