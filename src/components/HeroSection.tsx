import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Briefcase, GraduationCap, Award } from 'lucide-react';
import type { ReactNode } from 'react';
import { fadeUp, stagger } from '../lib/animations';
import { useLanguage } from '../lib/i18n';
import { getCurrentSemester, ordinalEn } from '../lib/semester';

interface StatusRowProps {
  icon: ReactNode;
  primary: string;
  secondary: string;
}

function StatusRow({ icon, primary, secondary }: StatusRowProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-accent-light flex items-center justify-center text-nordic-accent shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-nordic-text text-sm md:text-base leading-tight">{primary}</div>
        <div className="text-xs md:text-sm text-nordic-muted mt-0.5">{secondary}</div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yRaw = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y = prefersReducedMotion ? '0%' : yRaw;
  const { t, language } = useLanguage();
  const s = t.hero.status;

  const semester = getCurrentSemester();
  const semesterLabel =
    language === 'de' ? `${semester}. Semester` : `${ordinalEn(semester)} semester`;
  const studyPrimary = `${s.study.primary} (${semesterLabel})`;

  const photoUrl = `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <section id="profil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-nordic-bg transition-colors duration-300">
      <motion.div
        className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--nordic-accent) 0%, transparent 60%)',
          y
        }}
      />

      <div className="section-container relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="glass-card bg-glass-bg border border-border-color shadow-xl relative overflow-hidden p-8 md:p-14"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-nordic-accent/10 rounded-full blur-3xl -z-10" />

          {/* Profile photo */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-nordic-accent/15 rounded-full blur-xl" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-nordic-accent/20 ring-offset-4 ring-offset-glass-bg shadow-xl">
                <img
                  src={photoUrl}
                  alt={t.hero.photoAlt}
                  className="w-full h-full object-cover object-[center_25%]"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-border-color text-xs font-semibold uppercase tracking-widest text-nordic-accent bg-glass-bg backdrop-blur-sm shadow-sm transition-colors duration-300">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-nordic-text leading-[1.1] mb-6 font-bold">
              Ben-Vincent Emilio Adamo
            </h1>
            <p className="text-base md:text-lg text-nordic-muted font-light max-w-2xl mx-auto leading-relaxed">
              {t.hero.tagline}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="border-t border-border-color pt-8 space-y-5 max-w-lg mx-auto">
            <StatusRow
              icon={<Briefcase size={18} />}
              primary={s.work.primary}
              secondary={s.work.secondary}
            />
            <StatusRow
              icon={<GraduationCap size={18} />}
              primary={studyPrimary}
              secondary={s.study.secondary}
            />
            <StatusRow
              icon={<Award size={18} />}
              primary={s.vocational.primary}
              secondary={s.vocational.secondary}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex justify-center">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nordic-accent hover:bg-nordic-accent-hover text-white dark:text-nordic-bg text-sm font-medium transition-colors shadow-sm"
            >
              {t.hero.ctaContact} <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        <div className="flex justify-center w-full">
          <a
            href="#fundament"
            aria-label={language === 'de' ? 'Nach unten scrollen' : 'Scroll down'}
            className="animate-bounce mt-16 text-nordic-muted hover:text-nordic-text transition-colors"
          >
            <ChevronDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
