import { useLanguage } from '../lib/i18n';

interface FooterProps {
  onNavigate: (view: 'impressum' | 'datenschutz') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();
  return (
    <footer className="bg-nordic-surface dark:bg-zinc-900 border-t border-border-color py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif font-bold text-lg text-nordic-text">Ben-Vincent Emilio Adamo</div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-nordic-muted font-light">
          <span>© {new Date().getFullYear()} {t.footer.copyrightSuffix}</span>
          <span className="hidden md:inline text-nordic-muted/40">·</span>
          <button
            onClick={() => onNavigate('impressum')}
            className="hover:text-nordic-text transition-colors"
          >
            {t.footer.impressum}
          </button>
          <span className="hidden md:inline text-nordic-muted/40">·</span>
          <button
            onClick={() => onNavigate('datenschutz')}
            className="hover:text-nordic-text transition-colors"
          >
            {t.footer.datenschutz}
          </button>
        </div>
      </div>
    </footer>
  );
}
