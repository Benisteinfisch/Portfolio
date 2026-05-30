import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { fadeUp } from '../lib/animations';
import { useLanguage } from '../lib/i18n';

interface LegalPageProps {
  onBack: () => void;
}

const content = {
  de: {
    badge: 'Rechtliches',
    title: 'Impressum',
    intro: 'Angaben gemäß § 5 TMG',
    sections: [
      {
        h: 'Verantwortlich für den Inhalt',
        body: (
          <>
            Ben-Vincent Emilio Adamo<br />
            Mutzenreisstraße 140<br />
            73734 Esslingen am Neckar<br />
            Deutschland
          </>
        ),
      },
      {
        h: 'Kontakt',
        body: (
          <>E-Mail: <a className="text-nordic-accent hover:underline" href="mailto:Ben@Adamo.de">Ben@Adamo.de</a></>
        ),
      },
      {
        h: 'Haftung für Inhalte',
        body:
          'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      },
      {
        h: 'Haftung für Links',
        body:
          'Diese Seite enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
      },
      {
        h: 'Urheberrecht',
        body:
          'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      },
    ],
  },
  en: {
    badge: 'Legal',
    title: 'Imprint',
    intro: 'Information in accordance with § 5 TMG (German Telemedia Act)',
    sections: [
      {
        h: 'Responsible for the content',
        body: (
          <>
            Ben-Vincent Emilio Adamo<br />
            Mutzenreisstraße 140<br />
            73734 Esslingen am Neckar<br />
            Germany
          </>
        ),
      },
      {
        h: 'Contact',
        body: (
          <>Email: <a className="text-nordic-accent hover:underline" href="mailto:Ben@Adamo.de">Ben@Adamo.de</a></>
        ),
      },
      {
        h: 'Liability for content',
        body:
          'As a service provider, I am responsible for my own content on these pages under § 7 (1) TMG and general law. Under §§ 8–10 TMG, however, I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.',
      },
      {
        h: 'Liability for links',
        body:
          'This site contains links to external third-party websites whose contents I have no influence over. Therefore I cannot accept any liability for these external contents. The provider or operator of the linked pages is always responsible for their contents.',
      },
      {
        h: 'Copyright',
        body:
          'The content and works on these pages created by the site operator are subject to German copyright law. Reproduction, modification, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.',
      },
    ],
  },
};

export function Impressum({ onBack }: LegalPageProps) {
  const { language, t } = useLanguage();
  const c = content[language];

  return (
    <main className="min-h-screen bg-nordic-bg pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        <motion.button
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-nordic-muted hover:text-nordic-text transition-colors mb-12"
        >
          <ArrowLeft size={16} /> {t.legal.back}
        </motion.button>

        <motion.article
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-6"
        >
          <header>
            <span className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4 block">
              {c.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-nordic-text leading-tight">
              {c.title}
            </h1>
            <p className="text-nordic-muted mt-3 text-sm font-light">{c.intro}</p>
          </header>

          {c.sections.map((section, i) => (
            <section
              key={i}
              className="bg-nordic-surface border border-border-color rounded-2xl p-6 md:p-8 space-y-3 text-sm md:text-base text-nordic-text"
            >
              <h2 className="font-serif text-xl font-bold mb-3">{section.h}</h2>
              <p className="text-nordic-muted leading-relaxed">{section.body}</p>
            </section>
          ))}
        </motion.article>
      </div>
    </main>
  );
}
