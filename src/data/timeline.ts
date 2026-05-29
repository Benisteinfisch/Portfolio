import type { Bilingual } from '../lib/i18n';

export type TimelineType = 'work' | 'education';

export interface TimelineItem {
  id: number;
  date: Bilingual<string>;
  title: Bilingual<string>;
  institution: Bilingual<string>;
  type: TimelineType;
  details: Bilingual<string[]>;
}

export const timelineItems: TimelineItem[] = [
  {
    id: 1,
    date: { de: '12/2025 – jetzt', en: '12/2025 – present' },
    title: {
      de: 'Werkstudent Informationssicherheit',
      en: 'Working Student, Information Security',
    },
    institution: {
      de: 'Hitachi Rail, Ditzingen',
      en: 'Hitachi Rail, Ditzingen',
    },
    type: 'work',
    details: {
      de: [
        'Einblicke in das Informationssicherheitsmanagement (ISMS) sowie in Audits und Zertifizierungen (ISO 27001, ISO 9001).',
        'Unterstützende Tätigkeiten bei der Erstellung von Sicherheitsdokumentationen.',
        'Einblicke in Risikoanalyseprozesse und KRITIS (Kritische Infrastrukturen) zur Sicherung gesellschaftlich relevanter Systeme.',
      ],
      en: [
        'Hands-on exposure to information security management (ISMS) as well as audits and certifications (ISO 27001, ISO 9001).',
        'Supporting the creation of security documentation.',
        'Insight into risk analysis processes and KRITIS (critical infrastructure) for the protection of socially relevant systems.',
      ],
    },
  },
  {
    id: 2,
    date: { de: '09/2024 – jetzt', en: '09/2024 – present' },
    title: {
      de: 'B.Eng. IT-Sicherheit (4. Semester)',
      en: 'B.Eng. IT Security (4th semester)',
    },
    institution: {
      de: 'Hochschule Esslingen',
      en: 'Esslingen University of Applied Sciences',
    },
    type: 'education',
    details: {
      de: [
        'Aktueller Notendurchschnitt: 1,8 (ISB Version 1, 90 ECTS).',
        'Schwerpunkte: Netzwerksicherheit, Systemschutz, IT-Forensik, Kryptografie und ISMS.',
        'Praktische Entwicklung: Web-Security-Projekte, Virtualisierung, Schwachstellenanalyse.',
        'Sprachen & Tools: C, C++, HTML/CSS, JavaScript, TypeScript, Python, SQL.',
      ],
      en: [
        'Current GPA: 1.8 (German grade scale, 1.0 = best · 90 ECTS).',
        'Focus areas: network security, system protection, IT forensics, cryptography and ISMS.',
        'Hands-on development: web security projects, virtualisation, vulnerability analysis.',
        'Languages & tools: C, C++, HTML/CSS, JavaScript, TypeScript, Python, SQL.',
      ],
    },
  },
  {
    id: 3,
    date: { de: '09/2022 – 07/2024', en: '09/2022 – 07/2024' },
    title: {
      de: 'Duale Ausbildung Industriekaufmann (IHK)',
      en: 'Dual Vocational Training, Industrial Clerk (IHK)',
    },
    institution: {
      de: 'Karl Klein Ventilatorenbau GmbH, Esslingen',
      en: 'Karl Klein Ventilatorenbau GmbH, Esslingen',
    },
    type: 'work',
    details: {
      de: [
        'IHK-Gesamtabschluss mit der Note „gut" (86 Punkte), Berufsschulnote 1,8.',
        'Einsatz in nahezu allen kaufmännischen Bereichen (u.a. Arbeitsvorbereitung, Einkauf, Vertrieb, Buchhaltung).',
        'Verbindung von kaufmännischem Denken mit strukturiertem Projektmanagement.',
      ],
      en: [
        'IHK final exam passed with overall grade "good" (86 points), Berufsschule grade 1.8.',
        'Rotation through nearly all commercial departments (work scheduling, purchasing, sales, accounting and more).',
        'Combining commercial thinking with structured project management.',
      ],
    },
  },
  {
    id: 4,
    date: { de: '2020 – 2022', en: '2020 – 2022' },
    title: {
      de: 'Kaufmännisches Berufskolleg',
      en: 'Commercial Vocational College',
    },
    institution: {
      de: 'John-F.-Kennedy Schule, Esslingen',
      en: 'John-F.-Kennedy Schule, Esslingen',
    },
    type: 'education',
    details: {
      de: [
        'Erwerb der Fachhochschulreife mit Schwerpunkt Wirtschaft (Abschlussnote: 1,5).',
        'Inhalte: Betriebswirtschaft, Rechnungswesen und Volkswirtschaftslehre.',
        'Praxisorientierter Unterricht zur Vorbereitung auf die anschließende kaufmännische Ausbildung.',
      ],
      en: [
        'Acquired the Fachhochschulreife (UAS entrance qualification), focus on business (final grade: 1.5).',
        'Subjects: business administration, accounting and economics.',
        'Practice-oriented curriculum in preparation for the subsequent commercial vocational training.',
      ],
    },
  },
];
