import type { Bilingual } from '../lib/i18n';

export type ProjectCategory = 'security' | 'dev' | 'research';
export type ProjectStatus = 'completed' | 'ongoing' | 'planning';

export interface Project {
  id: number;
  title: Bilingual<string>;
  description: Bilingual<string>;
  tech: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  highlights: Bilingual<string[]>;
}

export const projects: Project[] = [
  {
    id: 1,
    title: {
      de: 'Device Analyzer — IoT-Sicherheits-Scanner für Märklin',
      en: 'Device Analyzer — IoT Security Scanner for Märklin',
    },
    description: {
      de: 'Gemeinsam mit drei Kommilitonen entwickle ich im Rahmen des Studienprojekts „PITS SS26" einen halbautomatischen IoT-Sicherheits-Scanner für die Märklin Engineering GmbH. Geprüft wird gegen die Norm EN 18031-1, getestet wird konkret die Märklin Central Station 3. Ich verantworte Modul A — Netzwerk- und Authentifizierungsanalyse.',
      en: 'Together with three fellow students, I am building a semi-automatic IoT security scanner for Märklin Engineering GmbH as part of the academic project „PITS SS26". The scanner tests devices against the EN 18031-1 standard, with the Märklin Central Station 3 as the device under test. I am responsible for Module A — network and authentication analysis.',
    },
    tech: ['Python', 'Docker', 'nmap', 'React', 'Tailwind', 'sqlite3', 'EN 18031-1'],
    category: 'security',
    status: 'ongoing',
    highlights: {
      de: [
        '6 automatisierte Prüf-Features: Port-/Service-Scan, Default-Credentials, Brute-Force-Schutz, unauthentifizierte Services, GEC-2-Whitelist-Bewertung',
        '622 Tests — die Kern-Analyselogik (Scanner, Auth, Brute-Force, Whitelist) durchgängig mit 93–97 % Code-Coverage abgedeckt',
        'Reale Findings am Central Station 3 dokumentiert (AUM-1- und AUM-6-Verstöße)',
        'React-Frontend zur Scanner-Steuerung mit automatisierter HTML-Report-Generierung',
        'Echtkunden-Kontext mit wöchentlichen Meetings zwischen Hochschule Esslingen und Märklin Engineering',
      ],
      en: [
        'Six automated checks: port/service scan, default credentials, brute-force protection, unauthenticated services, GEC-2 whitelist evaluation',
        '622 tests — core analysis logic (scanner, auth, brute-force, whitelist) consistently covered at 93–97 %',
        'Real findings on the Central Station 3 documented (AUM-1 and AUM-6 violations)',
        'React frontend for scanner control with automated HTML report generation',
        'Real-client setting with weekly meetings between Esslingen UAS and Märklin Engineering',
      ],
    },
  },
  {
    id: 6,
    title: {
      de: 'KI-gestützter Krypto-Trading-Bot',
      en: 'AI-powered Crypto Trading Bot',
    },
    description: {
      de: 'Persönliches Lernprojekt: ein vollautomatischer, KI-gestützter Krypto-Trading-Bot, der 24/7 auf einer dedizierten Mini-PC-Infrastruktur betrieben wird. Architektur, Strategie-Logik (Triple Gate System), Risikomanagement und Server-Härtung sind implementiert; aktuell läuft die Backtest- und Paper-Trading-Phase auf der Hardware. Live-Betrieb mit echtem Kapital steht noch aus. Kern: Hybrid aus drei parallelen Strategien (Swing, Grid/DCA, Mean-Reversion), gefiltert durch „Triple Gate" — Regelbasiert → LightGBM-Ensemble → lokales LLM-Sentiment-Veto.',
      en: 'Personal learning project: a fully automated, AI-powered crypto trading bot running 24/7 on dedicated mini-PC infrastructure. Architecture, strategy logic (Triple Gate System), risk management and server hardening are implemented; currently in the backtest and paper-trading phase on the hardware. Live trading with real capital is still ahead. Core idea: a hybrid of three parallel strategies (swing, grid/DCA, mean-reversion), filtered through „Triple Gate" — rule-based → LightGBM ensemble → local LLM sentiment veto.',
    },
    tech: ['Python', 'Docker', 'Freqtrade', 'FreqAI', 'LightGBM', 'Ollama', 'PostgreSQL', 'Tailscale'],
    category: 'dev',
    status: 'ongoing',
    highlights: {
      de: [
        'Triple-Gate-Architektur: Regelbasierte Indikatoren → LightGBM-Ensemble (Stacking) → lokales LLM-Sentiment-Veto via Ollama',
        'Hybrid aus drei unkorrelierten Strategien (Swing/Grid/Mean-Reversion) zur Glättung der Equity-Kurve',
        'Striktes Risikomanagement: ATR-basierte Stops, Quarter-Kelly-Position-Sizing, tägliche/wöchentliche Circuit-Breaker',
        'IT-Security-Härtung des Servers: Tailscale-VPN statt offener SSH-Port, Docker Secrets, fail2ban, restriktive ufw-Policy',
        'Dedizierte 24/7-Hardware: Dell OptiPlex 3080 Micro mit Ubuntu Server (headless), Docker-Compose-Stack',
      ],
      en: [
        'Triple-gate architecture: rule-based indicators → LightGBM ensemble (stacking) → local LLM sentiment veto via Ollama',
        'Hybrid of three uncorrelated strategies (swing/grid/mean-reversion) to smooth the equity curve',
        'Strict risk management: ATR-based stops, quarter-Kelly position sizing, daily/weekly circuit breakers',
        'Hardened server stack: Tailscale VPN instead of open SSH port, Docker secrets, fail2ban, restrictive ufw policy',
        'Dedicated 24/7 hardware: Dell OptiPlex 3080 Micro with Ubuntu Server (headless), Docker-Compose stack',
      ],
    },
  },
  {
    id: 5,
    title: {
      de: 'Persönliche Portfolio-Website',
      en: 'Personal Portfolio Website',
    },
    description: {
      de: 'Diese Portfolio-Website habe ich mithilfe von Claude Code als KI-Assistenten umgesetzt. Stack: React, TypeScript und Tailwind CSS — vollständig zweisprachig (Deutsch/Englisch) mit Light-/Dark-Mode und System-Präferenz-Erkennung. Architektur, Inhalte und Design-Entscheidungen sind selbst getrieben; Claude Code unterstützte gezielt bei Refactoring, Boilerplate und Komponentenstruktur.',
      en: 'This portfolio website was built with Claude Code as an AI assistant. Stack: React, TypeScript and Tailwind CSS — fully bilingual (German/English) with light/dark mode and system preference detection. Architecture, content and design decisions are driven by me; Claude Code assisted specifically with refactoring, boilerplate and component structure.',
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Framer Motion', 'Claude Code'],
    category: 'dev',
    status: 'ongoing',
    highlights: {
      de: [
        'Mithilfe von Claude Code als KI-Assistenten entwickelt — Architektur, Inhalte und Design-Entscheidungen selbst getrieben',
        'Komponenten-Architektur mit strikter TypeScript-Typisierung',
        'Vollständig zweisprachig (DE/EN) mit localStorage-Persistenz der Sprach- und Theme-Wahl',
        'Light-/Dark-Mode mit System-Präferenz-Erkennung',
        'Performante Scroll- und Filter-Animationen mit Framer Motion',
      ],
      en: [
        'Built with Claude Code as AI assistant — architecture, content and design decisions driven by me',
        'Component architecture with strict TypeScript typing',
        'Fully bilingual (DE/EN) with localStorage persistence for language and theme',
        'Light/dark mode with system preference detection',
        'Performant scroll and filter animations using Framer Motion',
      ],
    },
  },
  {
    id: 2,
    title: {
      de: 'Makro-Angriff im Labor',
      en: 'Macro-Based Attack in the Lab',
    },
    description: {
      de: 'Gemeinsam mit einem Kommilitonen habe ich in einem autorisierten Laborprojekt untersucht, wie Office-Makros als Angriffsweg missbraucht werden können. Ziel war es, den Angriffspfad nachzuvollziehen und daraus konkrete Awareness- und Schutzmaßnahmen abzuleiten.',
      en: 'Together with a fellow student I conducted an authorized lab project investigating how Office macros can be abused as an attack vector. The goal was to trace the attack path end-to-end and derive concrete awareness and defense measures from it.',
    },
    tech: ['VBA', 'Office Macros', 'Security Awareness', 'Lab Setup'],
    category: 'security',
    status: 'completed',
    highlights: {
      de: [
        'Autorisiertes Labor-Setup im akademischen Rahmen — keine Real-Targets',
        'Untersuchung von Auto-Execution-Mechanismen und Payload-Delivery über Office-Dokumente',
        'Ableitung konkreter Schutzmaßnahmen für Endanwender und Administratoren',
        'Dokumentation des Angriffspfads als Awareness-Material',
      ],
      en: [
        'Authorized lab setup within an academic frame — no real-world targets',
        'Investigation of auto-execution mechanisms and payload delivery via Office documents',
        'Derivation of concrete defense measures for end users and administrators',
        'Documentation of the attack path as awareness material',
      ],
    },
  },
  {
    id: 7,
    title: {
      de: 'Penetration-Testing-Labore (Web-Anwendungen)',
      en: 'Penetration Testing Labs (Web Applications)',
    },
    description: {
      de: 'Praktika zur Web-Anwendungs-Sicherheit aus dem 4. Semester. Lab 1 deckte die Vorbereitungs- und Reconnaissance-Phase ab (Tooling, Scope-Definition, Schwachstellen-Identifikation), Lab 2 fokussierte auf konkrete Angriffstechniken — insbesondere Injection-Schwachstellen (SQL, XSS).',
      en: 'Hands-on labs on web application security from the 4th semester. Lab 1 covered the preparation and reconnaissance phase (tooling, scope definition, vulnerability identification), Lab 2 focused on concrete attack techniques — in particular injection vulnerabilities (SQL, XSS).',
    },
    tech: ['Web Pentesting', 'SQL Injection', 'XSS', 'Burp Suite', 'OWASP'],
    category: 'security',
    status: 'completed',
    highlights: {
      de: [
        'Strukturierte Vorbereitungsphase: Tool-Auswahl, Scope-Festlegung, systematische Reconnaissance',
        'Praktische Identifikation und Ausnutzung von Injection-Schwachstellen (SQL- und XSS-Vektoren)',
        'Eigene Abgabe-Dokumentation mit Reproduktionsschritten und Maßnahmenempfehlungen',
      ],
      en: [
        'Structured preparation phase: tool selection, scope definition, systematic reconnaissance',
        'Hands-on identification and exploitation of injection vulnerabilities (SQL and XSS vectors)',
        'Own submission documentation with reproduction steps and recommended mitigations',
      ],
    },
  },
  {
    id: 8,
    title: {
      de: 'Netzwerksicherheits-Labor (Firewalls & VPN)',
      en: 'Network Security Lab (Firewalls & VPN)',
    },
    description: {
      de: 'Praktikum aus dem 4. Semester mit Fokus auf praktische Netzwerk-Absicherung: Konfiguration von Host-Firewalls auf Linux (iptables und ufw) sowie einer dedizierten Hardware-Firewall (OPNsense) und Aufbau eines VPN-Setups in einer kontrollierten Lab-Infrastruktur.',
      en: 'Lab work from the 4th semester focused on hands-on network hardening: configuring host firewalls on Linux (iptables and ufw), a dedicated hardware firewall (OPNsense) and setting up a VPN within a controlled lab infrastructure.',
    },
    tech: ['iptables', 'ufw', 'OPNsense', 'VPN', 'Linux'],
    category: 'security',
    status: 'completed',
    highlights: {
      de: [
        'Konfiguration und Vergleich von iptables und ufw als Host-Firewall-Lösungen',
        'OPNsense als dedizierte Hardware-Firewall mit eigenen Regelwerken aufgesetzt',
        'Praktischer VPN-Aufbau in einer Labor-Netzwerk-Topologie',
      ],
      en: [
        'Configuration and comparison of iptables and ufw as host firewall solutions',
        'OPNsense set up as a dedicated hardware firewall with custom rule sets',
        'Practical VPN deployment within a lab network topology',
      ],
    },
  },
  {
    id: 9,
    title: {
      de: 'Kryptografie-Labore (Klassische Verfahren & Kryptoanalyse)',
      en: 'Cryptography Labs (Classical Ciphers & Cryptanalysis)',
    },
    description: {
      de: 'Praktika zur klassischen Kryptografie und Kryptoanalyse aus dem 3. Semester. Schwerpunkt war die systematische Analyse der Vigenère-Chiffre — inklusive Bestimmung der Schlüssellänge über den Friedman-Test und vollständige Entschlüsselung mit bekannten und unbekannten Schlüsseln.',
      en: 'Labs on classical cryptography and cryptanalysis from the 3rd semester. The focus was the systematic analysis of the Vigenère cipher — including key-length estimation via the Friedman test and full decryption with both known and unknown keys.',
    },
    tech: ['CrypTool', 'Vigenère', 'Friedman-Test', 'Kryptoanalyse'],
    category: 'security',
    status: 'completed',
    highlights: {
      de: [
        'Bestimmung der Schlüssellänge mittels Friedman-Test (Koinzidenzindex)',
        'Vollständige Entschlüsselung der Vigenère-Chiffre — sowohl mit bekanntem als auch unbekanntem Schlüssel',
        'Praktischer Workflow mit CrypTool zur Visualisierung der Kryptoanalyse-Schritte',
      ],
      en: [
        'Key-length estimation via the Friedman test (index of coincidence)',
        'Full Vigenère cipher decryption — both with known and unknown key',
        'Practical CrypTool workflow to visualize each step of the cryptanalysis',
      ],
    },
  },
  {
    id: 10,
    title: {
      de: 'Safety-Lab: Sicherheits-SPS & ASi-Bus',
      en: 'Safety Lab: Safety PLC & AS-i Bus',
    },
    description: {
      de: 'Industrielles Safety-Praktikum aus dem 3. Semester mit direktem Hardware-Bezug. Schwerpunkt: Programmierung einer sicherheitsgerichteten SPS mit CODESYS und Konfiguration einer sicheren AS-Interface-Buslinie mit ASiMon. Über mehrere aufeinander aufbauende Projektphasen wurde eine sichere Maschinensteuerung entwickelt und schrittweise erweitert.',
      en: 'Industrial safety lab from the 3rd semester with direct hardware focus. Programming a safety-rated PLC with CODESYS and configuring a safe AS-Interface bus line with ASiMon. A safe machine control system was built up and incrementally extended across multiple project stages.',
    },
    tech: ['CODESYS Safety', 'ASiMon', 'AS-Interface', 'Safety PLC', 'OT-Security'],
    category: 'security',
    status: 'completed',
    highlights: {
      de: [
        'Programmierung einer sicherheitsgerichteten SPS mit CODESYS',
        'Konfiguration und Überwachung sicherer AS-Interface-Buslinien (ASiMon)',
        'Mehrstufiger Projektaufbau: Default-Setup → neue Applikation → Erweiterung → Reload',
        'Praktischer Einstieg in OT/IT-Konvergenz und industrielle Funktionale Sicherheit',
      ],
      en: [
        'Programming a safety-rated PLC with CODESYS',
        'Configuration and monitoring of safe AS-Interface bus lines (ASiMon)',
        'Multi-stage project structure: default setup → new application → enhancement → reload',
        'Hands-on entry into OT/IT convergence and industrial functional safety',
      ],
    },
  },
  {
    id: 11,
    title: {
      de: 'Nahrungserfassungssoftware (Backend mit Auth)',
      en: 'Food Tracking Software (Backend with Auth)',
    },
    description: {
      de: 'Studienprojekt aus dem Modul Softwaretechnik: Backend einer Web-Applikation zur Nahrungserfassung. Fokus auf saubere Authentifizierung mit JWT-Token, Passwort-Hashing per bcrypt und persistente Datenhaltung in SQLite über eine REST-API auf Express-Basis.',
      en: 'Course project from the software engineering module: backend of a food tracking web application. Focus on clean authentication using JWT tokens, password hashing via bcrypt and persistent data storage in SQLite, exposed through a REST API on Express.',
    },
    tech: ['Node.js', 'Express', 'SQLite', 'JWT', 'bcrypt', 'REST API'],
    category: 'dev',
    status: 'completed',
    highlights: {
      de: [
        'JWT-basierte Authentifizierung mit Token-Ausgabe und -Validierung',
        'Passwort-Hashing mit bcrypt — keine Klartext-Passwörter in der Datenbank',
        'REST-API auf Node.js/Express mit modularer Route-Struktur',
        'SQLite als leichtgewichtige Persistenzschicht',
      ],
      en: [
        'JWT-based authentication with token issuance and validation',
        'Password hashing with bcrypt — no plaintext passwords stored in the DB',
        'REST API on Node.js/Express with a modular route structure',
        'SQLite as a lightweight persistence layer',
      ],
    },
  },
  {
    id: 12,
    title: {
      de: 'Socket-Programmierung in C (Client / Server)',
      en: 'Socket Programming in C (Client / Server)',
    },
    description: {
      de: 'Praktikum aus dem Modul Rechnernetze: eigene Implementierung einer Client-Server-Kommunikation in C über POSIX-Sockets. Ziel war ein tieferes Verständnis der Netzwerk-Programmierung auf System-Call-Ebene — vom TCP-Verbindungsaufbau über Senden und Empfangen bis zum sauberen Verbindungsabbau.',
      en: 'Lab work from the networking module: hand-written client/server communication in C using POSIX sockets. The goal was a deeper understanding of network programming at the system-call level — from TCP connection setup through send/receive to a clean teardown.',
    },
    tech: ['C', 'POSIX Sockets', 'TCP/IP', 'Linux'],
    category: 'dev',
    status: 'completed',
    highlights: {
      de: [
        'Eigener TCP-Server in C mit POSIX-Socket-API',
        'Korrespondierender TCP-Client mit Verbindungsaufbau und Datenaustausch',
        'Tiefer Einblick in die System-Call-Schicht der Netzwerkprogrammierung',
      ],
      en: [
        'Custom TCP server in C using the POSIX socket API',
        'Matching TCP client with connection setup and data exchange',
        'Deep dive into the system-call layer of network programming',
      ],
    },
  },
  {
    id: 13,
    title: {
      de: 'Zeiterfassungssoftware (SWE-Teamprojekt)',
      en: 'Time-Tracking Software (SWE Team Project)',
    },
    description: {
      de: 'Studienprojekt im Modul Softwaretechnik nach Wasserfall-Vorgehen: Im Dreierteam wurde eine Zeiterfassungssoftware konzipiert — von der Anforderungsanalyse über UML-Modellierung (Use-Case-Diagramme) und UI-Mockups bis hin zur Implementierung. Schwerpunkt: strukturiertes SWE-Vorgehen, Team-Koordination und vollständige Projektdokumentation.',
      en: 'Course project in software engineering following a waterfall approach: a three-person team designed a time-tracking application — from requirements analysis through UML modelling (use-case diagrams) and UI mockups to implementation. Focus: structured SWE process, team coordination and full project documentation.',
    },
    tech: ['UML', 'Use-Case-Diagramme', 'Wasserfallmodell', 'SWE-Prozess'],
    category: 'dev',
    status: 'completed',
    highlights: {
      de: [
        'Wasserfall-Vorgehen mit klaren Phasen: Anforderungen → Design → Implementierung',
        'UML-Modellierung inkl. Use-Case-Diagrammen',
        'UI-Mockups vor der Implementierung',
        'Dreierteam mit dokumentierter Aufgabenverteilung und gemeinsamer Doku',
      ],
      en: [
        'Waterfall process with clear phases: requirements → design → implementation',
        'UML modelling including use-case diagrams',
        'UI mockups before implementation',
        'Three-person team with documented task allocation and shared documentation',
      ],
    },
  },
  {
    id: 3,
    title: {
      de: 'Online-Lebenslauf Website',
      en: 'Online Résumé Website',
    },
    description: {
      de: 'Mein erstes größeres Webprojekt: ein interaktiver Online-Lebenslauf, vollständig handgeschrieben in HTML, CSS und JavaScript — ohne Frameworks. Ziel war ein sauberes Grundlagen-Verständnis von Markup, Styling und client-seitiger Interaktion.',
      en: 'My first larger web project: an interactive online résumé, hand-written entirely in HTML, CSS and JavaScript — no frameworks. The goal was to build a solid grasp of markup, styling and client-side interactivity from the ground up.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'dev',
    status: 'completed',
    highlights: {
      de: [
        'Komplett ohne Framework — Vanilla HTML, CSS und JavaScript',
        'Responsives Layout per CSS, ohne UI-Library',
        'Interaktive Elemente mit Vanilla JavaScript (Navigation, kleine Animationen)',
      ],
      en: [
        'Entirely framework-free — vanilla HTML, CSS and JavaScript',
        'Responsive layout via CSS, no UI library',
        'Interactive elements with vanilla JavaScript (navigation, small animations)',
      ],
    },
  },
  {
    id: 4,
    title: {
      de: 'Schiffe versenken',
      en: 'Battleship',
    },
    description: {
      de: 'Programmieraufgabe aus dem Studium: Implementierung des klassischen Spiels „Schiffe versenken" mit eigener Spiellogik, Validierung von Benutzereingaben und sauberer Trennung zwischen Spielzustand und Eingabe-Handling.',
      en: 'A coursework assignment: implementing the classic „Battleship" game from scratch — with custom game logic, input validation and a clean separation between game state and input handling.',
    },
    tech: ['C++', 'Game Logic', 'CLI'],
    category: 'dev',
    status: 'completed',
    highlights: {
      de: [
        'Eigene Spielfeld-Logik und Treffer-Auswertung',
        'Robuste Validierung von Benutzereingaben',
        'Saubere Trennung von Spielzustand, Spiellogik und Eingabe-Handling',
      ],
      en: [
        'Custom playing-field logic and hit detection',
        'Robust user input validation',
        'Clean separation of game state, game logic and input handling',
      ],
    },
  },
];
