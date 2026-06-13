import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { Magnetic } from './Magnetic';

// "Nach oben"-Button unten links (Gegenstück zum Ask-Ben-Button rechts).
// Der Ring um den Button füllt sich mit dem Scroll-Fortschritt der Seite.
export function ScrollTop() {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-5 z-40"
        >
          <Magnetic strength={0.35}>
            <button
              // Mit Lenis-Dämpfung nach oben, falls aktiv (sonst nativer Smooth-Scroll)
              onClick={() => {
                if (window.__lenis) window.__lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label={language === 'de' ? 'Nach oben scrollen' : 'Scroll to top'}
              className="relative w-12 h-12 rounded-full bg-glass-bg backdrop-blur-md border border-border-color shadow-md flex items-center justify-center text-nordic-muted hover:text-nordic-accent transition-colors"
            >
              {/* Scroll-Fortschritt als Ring (pathLength folgt scrollYProgress) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                <motion.circle
                  cx="24"
                  cy="24"
                  r="21"
                  fill="none"
                  stroke="var(--nordic-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
              <ArrowUp size={18} />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
