import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type UITranslations } from '../data/translations';

export type Lang = 'de' | 'en';
export type Bilingual<T> = { de: T; en: T };

interface LanguageContextValue {
  language: Lang;
  setLanguage: (l: Lang) => void;
  t: UITranslations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Tab-Titel & Meta-Description je Sprache (für SEO und Browser-Tab).
const META: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Ben-Vincent Adamo — IT-Security Portfolio',
    description:
      'Ben-Vincent Emilio Adamo — Industriekaufmann (IHK) und B.Eng.-Student der IT-Sicherheit. Werkstudent Informationssicherheit bei Hitachi Rail. Schwerpunkte: sichere Netzwerke, ISMS und KRITIS.',
  },
  en: {
    title: 'Ben-Vincent Adamo — IT Security Portfolio',
    description:
      'Ben-Vincent Emilio Adamo — certified industrial business management assistant (IHK) and B.Eng. student of IT security. Working student in information security at Hitachi Rail. Focus: secure networks, ISMS and critical infrastructure (KRITIS).',
  },
};

function detectInitialLanguage(): Lang {
  if (typeof window === 'undefined') return 'de';
  // URL-Parameter hat Vorrang (macht die Sprachversionen direkt verlinkbar —
  // Grundlage für die hreflang-Alternates in index.html und sitemap.xml).
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'de' || param === 'en') return param;
  const saved = localStorage.getItem('language');
  if (saved === 'de' || saved === 'en') return saved;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('de') ? 'de' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Lang>(detectInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.title = META[language].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', META[language].description);
  }, [language]);

  // Augenzwinkern im Tab-Titel, wenn der Besucher den Tab verlässt.
  useEffect(() => {
    const onVisibilityChange = () => {
      document.title = document.hidden
        ? language === 'de' ? '👋 Bis gleich — Ben' : '👋 See you soon — Ben'
        : META[language].title;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [language]);

  // Sprachwechsel mit kurzem Blur-Cross-Fade statt hartem Textsprung
  // (Keyframes .lang-fade in index.css; bei reduced motion harter Wechsel).
  const switchLanguage = (l: Lang) => {
    if (l === language) {
      return;
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const body = document.body;
      body.classList.remove('lang-fade');
      // Reflow erzwingen, damit die Animation auch bei schnellem Doppelklick neu startet
      void body.offsetWidth;
      body.classList.add('lang-fade');
      window.setTimeout(() => body.classList.remove('lang-fade'), 450);
      // Text erst wechseln, wenn die Seite am unschärfsten ist
      window.setTimeout(() => setLanguage(l), 120);
    } else {
      setLanguage(l);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: switchLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
