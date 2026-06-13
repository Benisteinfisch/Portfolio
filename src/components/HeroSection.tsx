import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown, Briefcase, GraduationCap, Award } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { fadeUp, stagger } from '../lib/animations';
import { useLanguage } from '../lib/i18n';
import { getCurrentSemester, ordinalEn } from '../lib/semester';
import { Magnetic } from './Magnetic';
import { PROFILE_PLACEHOLDER } from '../lib/profilePlaceholder';

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
  // Blur-up: Foto blendet über der winzigen unscharfen Vorschau ein.
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Bild war schon im Cache -> onLoad feuert nicht mehr.
    if (imgRef.current?.complete) setPhotoLoaded(true);
  }, []);
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

  // 3D-Tilt: Foto neigt sich dezent zur Cursor-Position (gefedert, max. ±7°).
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 20 });
  const handleTilt = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 14);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const nameWords = ['Ben-Vincent', 'Emilio', 'Adamo'];

  return (
    <section id="profil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 transition-colors duration-300">
      {/* Aurora: zwei langsam driftende Farbflecken (Keyframes + Farben in index.css) */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y }} aria-hidden="true">
        <div
          className="aurora-blob w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] left-[5%] top-[2%]"
          style={{ background: 'var(--aurora-1)', animation: 'aurora-a 18s ease-in-out infinite' }}
        />
        <div
          className="aurora-blob w-[48vw] h-[48vw] max-w-[600px] max-h-[600px] right-[2%] bottom-[8%]"
          style={{ background: 'var(--aurora-2)', animation: 'aurora-b 22s ease-in-out infinite' }}
        />
      </motion.div>

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
            <motion.div
              className="relative"
              style={{ rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 600 }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div className="absolute -inset-2 bg-nordic-accent/15 rounded-full blur-xl" />
              {/* Rotierender Akzent-Bogen (Conic-Gradient + Maske, siehe .hero-ring in index.css) */}
              <div className="hero-ring absolute -inset-[7px] rounded-full opacity-80" aria-hidden="true" />
              <div
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-nordic-accent/20 ring-offset-4 ring-offset-glass-bg shadow-xl"
                // Blur-up-Placeholder als Hintergrund, bis das echte Foto geladen ist
                style={{
                  backgroundImage: `url(${PROFILE_PLACEHOLDER})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 25%',
                }}
              >
                <picture>
                  <source srcSet={`${import.meta.env.BASE_URL}profile.avif`} type="image/avif" />
                  <source srcSet={`${import.meta.env.BASE_URL}profile.webp`} type="image/webp" />
                  <img
                    ref={imgRef}
                    src={photoUrl}
                    alt={t.hero.photoAlt}
                    width={600}
                    height={800}
                    onLoad={() => setPhotoLoaded(true)}
                    className={`w-full h-full object-cover object-[center_25%] transition-opacity duration-500 ${photoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="eager"
                    // React 18 kennt das Attribut nur kleingeschrieben (erst React 19 mappt fetchPriority)
                    {...{ fetchpriority: 'high' }}
                  />
                </picture>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-border-color text-xs font-semibold uppercase tracking-widest text-nordic-accent bg-glass-bg backdrop-blur-sm shadow-sm transition-colors duration-300">
              {t.hero.badge}
            </span>
            {/* Text-Reveal: jedes Wort schiebt sich einzeln aus einer unsichtbaren Maske hoch */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-nordic-text leading-[1.1] mb-6 font-bold">
              {nameWords.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                  {i < nameWords.length - 1 ? ' ' : ''}
                </span>
              ))}
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
            <Magnetic>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nordic-accent hover:bg-nordic-accent-hover text-white dark:text-nordic-bg text-sm font-medium transition-colors shadow-sm"
              >
                {t.hero.ctaContact} <ArrowRight size={16} />
              </a>
            </Magnetic>
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
