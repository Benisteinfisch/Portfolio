import { Shield } from 'lucide-react';
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
          <a
            href="https://securityheaders.com/?q=https%3A%2F%2Fadamo.de%2Fben-vincent%2F&followRedirects=on"
            target="_blank"
            rel="noopener noreferrer"
            title="Security Headers scan result for adamo.de/ben-vincent"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-nordic-accent/30 bg-accent-light hover:border-nordic-accent/60 hover:bg-accent-light/80 transition-colors duration-200"
          >
            <Shield size={11} className="text-nordic-accent" />
            <span className="text-nordic-muted font-medium tracking-wide">securityheaders.com</span>
            <span className="font-bold font-mono text-nordic-accent">A+</span>
          </a>
          <span className="hidden md:inline text-nordic-muted/40">·</span>
          <span>© {new Date().getFullYear()} {t.footer.copyrightSuffix}</span>
          <span className="hidden md:inline text-nordic-muted/40">·</span>
          <button
            onClick={() => onNavigate('impressum')}
            className="link-sweep hover:text-nordic-text transition-colors"
          >
            {t.footer.impressum}
          </button>
          <span className="hidden md:inline text-nordic-muted/40">·</span>
          <button
            onClick={() => onNavigate('datenschutz')}
            className="link-sweep hover:text-nordic-text transition-colors"
          >
            {t.footer.datenschutz}
          </button>
        </div>
      </div>
    </footer>
  );
}
