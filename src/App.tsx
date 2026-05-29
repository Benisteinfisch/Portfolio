import { useState, useEffect } from 'react';
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
import { Impressum } from './pages/Impressum';
import { Datenschutz } from './pages/Datenschutz';
import './index.css';

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

  if (view === 'impressum') return <Impressum onBack={navigateBack} />;
  if (view === 'datenschutz') return <Datenschutz onBack={navigateBack} />;

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-nordic-accent selection:text-white transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-nordic-accent origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <Header theme={theme} setTheme={setTheme} />
      <HeroSection />
      <FoundationSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <CertsSection />
      <ContactSection />
      <Footer onNavigate={navigateLegal} />
    </div>
  );
}

export default App;
