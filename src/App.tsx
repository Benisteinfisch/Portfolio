import { useState, useEffect, lazy, Suspense, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
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
import { AskBen } from './components/AskBen';
import { ScrollTop } from './components/ScrollTop';
import { useLenis } from './lib/useLenis';
import { Preloader } from './components/Preloader';
import './index.css';

// Rechtliche Seiten werden nur bei Bedarf (eigene Routes) geladen -> kleineres Haupt-Bundle.
const Impressum = lazy(() => import('./pages/Impressum').then(m => ({ default: m.Impressum })));
const Datenschutz = lazy(() => import('./pages/Datenschutz').then(m => ({ default: m.Datenschutz })));

type Theme = 'light' | 'dark' | 'system';
type View = 'main' | 'impressum' | 'datenschutz';

const LEGAL_HASHES: Record<string, View> = {
  '#/impressum': 'impressum',
  '#/datenschutz': 'datenschutz',
};

function getViewFromHash(): View {
  if (typeof window === 'undefined') return 'main';
  return LEGAL_HASHES[window.location.hash] ?? 'main';
}

// Setzt die Theme-Klasse auf <html>. Als Modul-Funktion ausgelagert, damit der
// Circular Reveal sie synchron innerhalb von startViewTransition aufrufen kann
// (useEffect liefe erst nach dem Snapshot -> Animation würde ins Leere laufen).
function applyThemeClass(t: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (t === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(t);
  }
}

function App() {
  useLenis();
  const { scrollYProgress } = useScroll();

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved as Theme;
    }
    return 'system';
  });

  const [view, setView] = useState<View>(getViewFromHash);

  useEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyThemeClass('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Theme-Wechsel als Circular Reveal: das neue Theme breitet sich kreisförmig
  // vom geklickten Button aus. Fallback (alte Browser / reduced motion): harter Wechsel.
  const changeTheme = (t: Theme, e?: MouseEvent<HTMLButtonElement>) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (
      !doc.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(t);
      return;
    }
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? 40;
    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        applyThemeClass(t);
        setTheme(t);
      });
    });
    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

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
      <Preloader />
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

      <Header theme={theme} setTheme={changeTheme} />
      <main>
        <HeroSection />
        <FoundationSection />
        <TimelineSection />
        <SkillsSection />
        <ProjectsSection />
        <CertsSection />
        <ContactSection />
      </main>
      <Footer onNavigate={navigateLegal} />
      <AskBen />
      <ScrollTop />
    </div>
  );
}

export default App;
