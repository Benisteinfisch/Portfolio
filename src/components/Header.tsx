import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

type Theme = 'light' | 'dark' | 'system';

interface HeaderProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export function Header({ theme, setTheme }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#profil', label: t.nav.profil },
    { href: '#fundament', label: t.nav.fundament },
    { href: '#werdegang', label: t.nav.werdegang },
    { href: '#kompetenzen', label: t.nav.kompetenzen },
    { href: '#projekte', label: t.nav.projekte },
    { href: '#zertifikate', label: t.nav.zertifikate },
    { href: '#kontakt', label: t.nav.kontakt },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-glass-bg backdrop-blur-md border-b border-border-color transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <a href="#" className="font-serif font-bold text-base md:text-xl tracking-tight text-nordic-text shrink-0">
          Ben-Vincent Emilio Adamo
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-nordic-muted hover:text-nordic-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
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

          {/* Theme Toggle */}
          <div className="flex items-center gap-0.5 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-border-color">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
              title={t.toggleTitles.light}
              aria-label={t.toggleTitles.light}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
              title={t.toggleTitles.dark}
              aria-label={t.toggleTitles.dark}
            >
              <Moon size={14} />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-1.5 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm' : 'text-nordic-muted hover:text-nordic-text'}`}
              title={t.toggleTitles.system}
              aria-label={t.toggleTitles.system}
            >
              <Monitor size={14} />
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-nordic-text hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
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
                  className="text-nordic-muted hover:text-nordic-text transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
