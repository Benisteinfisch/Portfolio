export interface UITranslations {
  nav: {
    profil: string;
    fundament: string;
    werdegang: string;
    kompetenzen: string;
    projekte: string;
    zertifikate: string;
    kontakt: string;
  };
  toggleTitles: {
    light: string;
    dark: string;
    system: string;
    langDe: string;
    langEn: string;
  };
  hero: {
    badge: string;
    tagline: string;
    photoAlt: string;
    status: {
      work: { primary: string; secondary: string };
      study: { primary: string; secondary: string };
      vocational: { primary: string; secondary: string };
    };
    ctaContact: string;
  };
  foundation: {
    badge: string;
    title: string;
    description: string;
    industriekaufmann: {
      title: string;
      employer: string;
      description: string;
      bullets: string[];
    };
    itsec: {
      title: string;
      institution: string;
      description: string;
      gradesHeader: string;
      subjects: string[];
    };
  };
  timeline: {
    badge: string;
    title: string;
    filterAll: string;
    filterWork: string;
    filterEducation: string;
  };
  skills: {
    badge: string;
    title: string;
    description: string;
    categories: {
      security: string;
      coding: string;
      admin: string;
      ai: string;
      tools: string;
    };
    levelLabel: string;
  };
  projects: {
    badge: string;
    title: string;
    description: string;
    filterAll: string;
    filterSecurity: string;
    filterDev: string;
    filterResearch: string;
    categorySecurity: string;
    categoryDev: string;
    categoryResearch: string;
    statusCompleted: string;
    statusOngoing: string;
    statusPlanning: string;
    showMore: string;
    showLess: string;
  };
  certs: {
    badge: string;
    title: string;
    philips: {
      title: string;
      subtitle: string;
      description: string;
    };
    languages: {
      title: string;
      subtitle: string;
      description: string;
      items: { label: string; value: string }[];
    };
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    emailLabel: string;
    linkedinLabel: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFieldLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    submitted: string;
    successMessage: string;
    errorNotConfigured: string;
    errorNetwork: string;
  };
  footer: {
    impressum: string;
    datenschutz: string;
    copyrightSuffix: string;
  };
  legal: {
    back: string;
  };
}

const de: UITranslations = {
  nav: {
    profil: 'Profil',
    fundament: 'Fundament',
    werdegang: 'Werdegang',
    kompetenzen: 'Kompetenzen',
    projekte: 'Projekte',
    zertifikate: 'Zertifikate',
    kontakt: 'Kontakt',
  },
  toggleTitles: {
    light: 'Hell-Modus',
    dark: 'Dunkel-Modus',
    system: 'System-Präferenz',
    langDe: 'Deutsch',
    langEn: 'Englisch',
  },
  hero: {
    badge: 'Über mich',
    tagline:
      'Industriekaufmann (IHK) und IT-Sicherheitsstudent — die Brücke zwischen kaufmännischer Struktur und technischem Schutz kritischer Systeme.',
    photoAlt: 'Porträt Ben-Vincent Emilio Adamo',
    status: {
      work: {
        primary: 'Werkstudent Informationssicherheit',
        secondary: 'Hitachi Rail · Ditzingen',
      },
      study: {
        primary: 'B.Eng. IT-Sicherheit',
        secondary: 'Hochschule Esslingen · Schnitt 1,8',
      },
      vocational: {
        primary: 'Industriekaufmann (IHK)',
        secondary: 'Karl Klein Ventilatorenbau GmbH · IHK „gut" · Berufsschule 1,8',
      },
    },
    ctaContact: 'Kontakt aufnehmen',
  },
  foundation: {
    badge: 'Das Fundament',
    title: 'Kaufmännische Struktur vereint mit technischer Tiefe.',
    description:
      'Die Kombination aus einer fundierten wirtschaftlichen Ausbildung und einem spezialisierten IT-Sicherheitsstudium ermöglicht mir einen ganzheitlichen Blick auf organisatorische und technische Sicherheitsrisiken.',
    industriekaufmann: {
      title: 'Industriekaufmann (IHK)',
      employer: 'Karl Klein Ventilatorenbau GmbH',
      description:
        'Die duale Ausbildung bei Karl Klein vermittelte mir umfassendes Wissen über die betrieblichen Zusammenhänge eines mittelständischen Industrieunternehmens. In den zwei Jahren durchlief ich unter anderem die Abteilungen Einkauf, Arbeitsvorbereitung, Vertrieb und Buchhaltung. Diese Einblicke prägten mein Verständnis für Prozesse, Schnittstellen und kaufmännische Entscheidungen. Dieser Hintergrund hilft mir heute, IT-Sicherheit nicht nur technisch, sondern auch im Kontext betrieblicher Abläufe und Risiken zu verstehen.',
      bullets: [
        'IHK-Abschluss „gut" (86 Punkte)',
        'Berufsschulnote 1,8',
      ],
    },
    itsec: {
      title: 'IT-Sicherheit (B.Eng.)',
      institution: 'Hochschule Esslingen',
      description:
        'Bewusster Schritt in den technischen Bereich: Mein Studium im 4. Semester verbindet mathematisch-technische Grundlagen mit fundierten Methoden zum Schutz komplexer Netzwerke und kritischer Systeme.',
      gradesHeader: 'Notenspiegel (Auszug)',
      subjects: ['Informationstechnik', 'Programmieren', 'IT-Sicherheit', 'Rechnernetze', 'Safety and Security', 'Softwaretechnik'],
    },
  },
  timeline: {
    badge: 'Lebenslauf',
    title: 'Mein Werdegang',
    filterAll: 'Alle',
    filterWork: 'Praxis',
    filterEducation: 'Bildung',
  },
  skills: {
    badge: 'Kompetenzen',
    title: 'Fähigkeiten & Werkzeuge',
    description: 'Meine fachlichen Schwerpunkte, eingesetzte Werkzeuge und Arbeitsweisen im Überblick.',
    categories: {
      security: 'IT-Sicherheit & Netzwerke',
      coding: 'Softwareentwicklung',
      admin: 'Systeme & Administration',
      ai: 'KI-Fähigkeiten',
      tools: 'Tools & Plattformen',
    },
    levelLabel: 'Kompetenzniveau',
  },
  projects: {
    badge: 'Portfolio',
    title: 'Projekte & Arbeiten',
    description: 'Ausgewählte Projekte aus Studium, Selbststudium und praktischer Arbeit.',
    filterAll: 'Alle',
    filterSecurity: 'Sicherheit',
    filterDev: 'Entwicklung',
    filterResearch: 'Forschung',
    categorySecurity: 'Sicherheit',
    categoryDev: 'Entwicklung',
    categoryResearch: 'Forschung',
    statusCompleted: 'Abgeschlossen',
    statusOngoing: 'Laufend',
    statusPlanning: 'In Aufbau',
    showMore: 'Details anzeigen',
    showLess: 'Details ausblenden',
  },
  certs: {
    badge: 'Zertifizierungen',
    title: 'Qualifikationen & Auszeichnungen',
    philips: {
      title: 'Philips Medizin Systeme Nominierung',
      subtitle: 'Besondere akademische Anerkennung',
      description:
        'Vorgeschlagen durch Studiendekan Prof. Dr. Jörg Nitzsche für herausragende Leistungen und Engagement im Studiengang IT-Sicherheit an der Hochschule Esslingen.',
    },
    languages: {
      title: 'Sprachen',
      subtitle: '',
      description:
        'Deutsch als Muttersprache, fließendes Englisch (C1) für internationale Projektarbeit und Fachliteratur. Italienisch auf A1-Niveau — gutes passives Verständnis, aktiv sprachlich noch im Aufbau.',
      items: [
        { label: 'DEUTSCH', value: 'Muttersprache' },
        { label: 'ENGLISCH', value: 'Fließend (C1)' },
        { label: 'ITALIENISCH', value: 'A1' },
      ],
    },
  },
  contact: {
    badge: 'Kontakt',
    title: 'Lassen Sie uns vernetzen.',
    description:
      'Haben Sie Fragen zu Projekten, akademischen Arbeiten oder möchten Sie meinen vollständigen Lebenslauf einsehen? Schreiben Sie mir gerne.',
    emailLabel: 'E-Mail',
    linkedinLabel: 'LinkedIn',
    formTitle: 'Nachricht senden',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailFieldLabel: 'E-Mail Adresse',
    emailPlaceholder: 'name@beispiel.de',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Worum geht es?',
    submit: 'Senden',
    submitting: 'Wird gesendet…',
    submitted: 'Nachricht gesendet!',
    successMessage: 'Vielen Dank für Ihre Nachricht! Ich melde mich so schnell wie möglich zurück.',
    errorNotConfigured:
      'Kontaktformular ist noch nicht konfiguriert. Bitte melden Sie sich direkt per E-Mail an Ben@Adamo.de.',
    errorNetwork: 'Netzwerkfehler. Bitte direkt per E-Mail kontaktieren.',
  },
  footer: {
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    copyrightSuffix: 'Ben-Vincent Emilio Adamo',
  },
  legal: {
    back: 'Zurück',
  },
};

const en: UITranslations = {
  nav: {
    profil: 'Profile',
    fundament: 'Foundation',
    werdegang: 'Background',
    kompetenzen: 'Skills',
    projekte: 'Projects',
    zertifikate: 'Certificates',
    kontakt: 'Contact',
  },
  toggleTitles: {
    light: 'Light mode',
    dark: 'Dark mode',
    system: 'System preference',
    langDe: 'German',
    langEn: 'English',
  },
  hero: {
    badge: 'About me',
    tagline:
      'Industrial Clerk (IHK) and IT Security student — bridging commercial structure with the technical protection of critical systems.',
    photoAlt: 'Portrait of Ben-Vincent Emilio Adamo',
    status: {
      work: {
        primary: 'Working Student, Information Security',
        secondary: 'Hitachi Rail · Ditzingen',
      },
      study: {
        primary: 'B.Eng. IT Security',
        secondary: 'Esslingen University of Applied Sciences · GPA 1.8',
      },
      vocational: {
        primary: 'Industrial Clerk (IHK)',
        secondary: 'Karl Klein Ventilatorenbau GmbH · IHK „good" · Berufsschule 1.8',
      },
    },
    ctaContact: 'Get in touch',
  },
  foundation: {
    badge: 'The Foundation',
    title: 'Commercial structure meets technical depth.',
    description:
      'Combining a solid commercial background with a specialised degree in IT security lets me see security risks holistically — both organisational and technical.',
    industriekaufmann: {
      title: 'Industrial Clerk (IHK)',
      employer: 'Karl Klein Ventilatorenbau GmbH',
      description:
        'The dual vocational training at Karl Klein gave me an end-to-end view of how a mid-sized industrial company actually runs. Over those two years I rotated through several departments, including purchasing, work scheduling, sales and accounting. Those insights shaped my understanding of processes, interfaces and commercial decision-making. That background now helps me approach IT security not just technically, but in the context of how a business actually operates and where its risks sit.',
      bullets: [
        'IHK final exam "good" (86 points)',
        'Berufsschule grade 1.8',
      ],
    },
    itsec: {
      title: 'IT Security (B.Eng.)',
      institution: 'Esslingen University of Applied Sciences',
      description:
        'A deliberate move into the technical field: my fourth-semester programme combines mathematical and technical fundamentals with substantive methods for protecting complex networks and critical systems.',
      gradesHeader: 'Selected grades',
      subjects: ['Information Technology', 'Programming', 'IT Security', 'Computer Networks', 'Safety and Security', 'Software Engineering'],
    },
  },
  timeline: {
    badge: 'Background',
    title: 'My career path',
    filterAll: 'All',
    filterWork: 'Work',
    filterEducation: 'Education',
  },
  skills: {
    badge: 'Skills',
    title: 'Capabilities & Tools',
    description: 'My professional focus areas, the tools I work with and the way I work — at a glance.',
    categories: {
      security: 'IT Security & Networks',
      coding: 'Software Development',
      admin: 'Systems & Administration',
      ai: 'AI Skills',
      tools: 'Tools & Platforms',
    },
    levelLabel: 'Proficiency',
  },
  projects: {
    badge: 'Portfolio',
    title: 'Projects & Work',
    description: 'Selected projects from my studies, self-study and practical work.',
    filterAll: 'All',
    filterSecurity: 'Security',
    filterDev: 'Development',
    filterResearch: 'Research',
    categorySecurity: 'Security',
    categoryDev: 'Development',
    categoryResearch: 'Research',
    statusCompleted: 'Completed',
    statusOngoing: 'Ongoing',
    statusPlanning: 'In Setup',
    showMore: 'Show details',
    showLess: 'Hide details',
  },
  certs: {
    badge: 'Certifications',
    title: 'Qualifications & Awards',
    philips: {
      title: 'Philips Medical Systems Nomination',
      subtitle: 'Special academic recognition',
      description:
        'Nominated by Dean of Studies Prof. Dr. Jörg Nitzsche for outstanding performance and commitment in the IT Security programme at Esslingen University of Applied Sciences.',
    },
    languages: {
      title: 'Languages',
      subtitle: '',
      description:
        'German as native language, fluent English (C1) for international project work and technical literature. Italian at A1 level — solid passive comprehension, active speaking still developing.',
      items: [
        { label: 'GERMAN', value: 'Native' },
        { label: 'ENGLISH', value: 'Fluent (C1)' },
        { label: 'ITALIAN', value: 'A1' },
      ],
    },
  },
  contact: {
    badge: 'Contact',
    title: "Let's connect.",
    description:
      'Questions about projects, academic work, or would you like to see my full CV? Drop me a message.',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    formTitle: 'Send a message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailFieldLabel: 'Email address',
    emailPlaceholder: 'name@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'What is this about?',
    submit: 'Send',
    submitting: 'Sending…',
    submitted: 'Message sent!',
    successMessage: 'Thanks for your message! I will get back to you as soon as possible.',
    errorNotConfigured:
      'The contact form is not configured yet. Please reach me directly at Ben@Adamo.de.',
    errorNetwork: 'Network error. Please reach out by email instead.',
  },
  footer: {
    impressum: 'Imprint',
    datenschutz: 'Privacy',
    copyrightSuffix: 'Ben-Vincent Emilio Adamo',
  },
  legal: {
    back: 'Back',
  },
};

export const translations = { de, en } as const;
