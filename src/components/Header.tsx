import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

type Theme = 'light' | 'dark' | 'system';

interface HeaderProps {
  theme: Theme;
  /** Klick-Event mitgeben, damit der Circular Reveal am Button startet (App.tsx) */
  setTheme: (t: Theme, e?: MouseEvent<HTMLButtonElement>) => void;
}

export function Header({ theme, setTheme }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profil');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Scroll-Spy: markiert den Abschnitt, der gerade im mittleren Viewport-Band liegt.
  useEffect(() => {
    const ids = ['profil', 'fundament', 'werdegang', 'kompetenzen', 'projekte', 'zertifikate', 'kontakt'];
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    const observed = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    observed.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: '#profil', label: t.nav.profil },
    { href: '#fundament', label: t.nav.fundament },
    { href: '#werdegang', label: t.nav.werdegang },
    { href: '#kompetenzen', label: t.nav.kompetenzen },
    { href: '#projekte', label: t.nav.projekte },
    { href: '#zertifikate', label: t.nav.zertifikate },
    { href: '#kontakt', label: t.nav.kontakt },
  ];

  // Sprach- und Theme-Umschalter: einmal definiert, in Desktop-Header UND Mobile-Menue genutzt.
  const languageToggle = (
    <div className="flex items-center gap-0.5 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-border-color">
      <button
        onClick={() => setLanguage('de')}
        className={`px-2 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all ${language === 'de' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
        title={t.toggleTitles.langDe}
        aria-label={t.toggleTitles.langDe}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all ${language === 'en' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
        title={t.toggleTitles.langEn}
        aria-label={t.toggleTitles.langEn}
      >
        EN
      </button>
    </div>
  );

  const themeToggle = (
    <div className="flex items-center gap-0.5 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-border-color">
      <button
        onClick={(e) => setTheme('light', e)}
        className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
        title={t.toggleTitles.light}
        aria-label={t.toggleTitles.light}
      >
        <Sun size={14} />
      </button>
      <button
        onClick={(e) => setTheme('dark', e)}
        className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
        title={t.toggleTitles.dark}
        aria-label={t.toggleTitles.dark}
      >
        <Moon size={14} />
      </button>
      <button
        onClick={(e) => setTheme('system', e)}
        className={`p-1.5 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
        title={t.toggleTitles.system}
        aria-label={t.toggleTitles.system}
      >
        <Monitor size={14} />
      </button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-glass-bg backdrop-blur-md border-b border-border-color transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <a href="#" aria-label={language === 'de' ? 'Zur Startseite' : 'Back to top'} className="font-serif font-bold text-base md:text-xl tracking-tight text-nordic-text min-w-0 truncate">
          Ben-Vincent Emilio Adamo
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = link.href === `#${activeSection}`;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative transition-colors ${isActive ? 'text-nordic-text' : 'link-sweep text-nordic-muted hover:text-nordic-text'}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-nordic-accent"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {/* Desktop: Sprache + Theme direkt im Header */}
          <div className="hidden md:flex items-center gap-3">
            {languageToggle}
            {themeToggle}
          </div>

          {/* Mobile: nur der Menue-Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-nordic-text hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? (language === 'de' ? 'Menü schließen' : 'Close menu') : (language === 'de' ? 'Menü öffnen' : 'Open menu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-color bg-glass-bg backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={link.href === `#${activeSection}` ? 'true' : undefined}
                  className={`transition-colors py-1 ${link.href === `#${activeSection}` ? 'text-nordic-accent font-semibold' : 'text-nordic-muted hover:text-nordic-text'}`}
                >
                  {link.label}
                </a>
              ))}

              {/* Sprache + Theme im Menue (auf Mobile aus dem Header ausgelagert) */}
              <div className="flex items-center gap-3 pt-4 mt-1 border-t border-border-color">
                {languageToggle}
                {themeToggle}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
