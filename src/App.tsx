import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FoundationSection } from './components/FoundationSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertsSection } from './components/CertsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import './index.css';

// Rechtliche Seiten werden nur bei Bedarf (eigene Routes) geladen -> kleineres Haupt-Bundle.
const Impressum = lazy(() => import('./pages/Impressum').then(m => ({ default: m.Impressum })));
const Datenschutz = lazy(() => import('./pages/Datenschutz').then(m => ({ default: m.Datenschutz })));
// Cyber-/Terminal-Ansicht ist opt-in -> erst beim Umschalten nachladen (Corporate-Bundle bleibt schlank).
const CyberTerminal = lazy(() => import('./components/CyberTerminal').then(m => ({ default: m.CyberTerminal })));

type Theme = 'light' | 'dark' | 'system';
type Mode = 'corporate' | 'cyber';
type View = 'main' | 'impressum' | 'datenschutz';

const LEGAL_HASHES: Record<string, View> = {
  '#/impressum': 'impressum',
  '#/datenschutz': 'datenschutz',
};

function getViewFromHash(): View {
  if (typeof window === 'undefined') return 'main';
  return LEGAL_HASHES[window.location.hash] ?? 'main';
}

function App() {
  const { scrollYProgress } = useScroll();

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved as Theme;
    }
    return 'system';
  });

  const [view, setView] = useState<View>(getViewFromHash);

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mode');
      if (saved === 'cyber' || saved === 'corporate') return saved;
    }
    return 'corporate';
  });

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (t: Theme) => {
      root.classList.remove('light', 'dark');
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(t);
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => setView(getViewFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (view !== 'main') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  const navigateLegal = (target: 'impressum' | 'datenschutz') => {
    window.location.hash = `#/${target}`;
  };

  const navigateBack = () => {
    history.pushState('', document.title, window.location.pathname + window.location.search);
    setView('main');
  };

  if (view === 'impressum' || view === 'datenschutz') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-nordic-bg transition-colors duration-300" />}>
        {view === 'impressum' ? <Impressum onBack={navigateBack} /> : <Datenschutz onBack={navigateBack} />}
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-nordic-accent selection:text-white transition-colors duration-300">
      {mode === 'corporate' && (
        <>
          <a
            href="#profil"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-nordic-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none focus:shadow-lg"
          >
            Zum Hauptinhalt springen
          </a>

          <motion.div
            className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-nordic-accent origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </>
      )}

      <Header theme={theme} setTheme={setTheme} mode={mode} setMode={setMode} />

      {mode === 'cyber' ? (
        <Suspense fallback={<div className="pt-20 min-h-screen bg-[#070a07]" />}>
          <CyberTerminal onExit={() => setMode('corporate')} />
        </Suspense>
      ) : (
        <>
          <HeroSection />
          <FoundationSection />
          <TimelineSection />
          <SkillsSection />
          <ProjectsSection />
          <CertsSection />
          <ContactSection />
          <Footer onNavigate={navigateLegal} />
        </>
      )}
    </div>
  );
}

export default App;
