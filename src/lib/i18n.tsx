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

function detectInitialLanguage(): Lang {
  if (typeof window === 'undefined') return 'de';
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
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
