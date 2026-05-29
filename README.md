# Portfolio – Ben-Vincent Emilio Adamo

Persönliches Portfolio / Online-CV. Zweisprachig (DE/EN), Dark- & Light-Mode,
Fokus auf Performance, Barrierefreiheit und Datenschutz.

**Live:** https://adamo.de/ben-vincent/

## Tech-Stack

- **React 18** + **TypeScript**
- **Vite** (Build & Dev-Server)
- **Tailwind CSS** (Theming über CSS-Variablen, `darkMode: 'class'`)
- **Framer Motion** (Animationen, respektiert `prefers-reduced-motion`)
- **@fontsource** (selbst gehostete Schriften Inter & Playfair Display – DSGVO-konform, keine externen CDNs)
- **Web3Forms** (Kontaktformular ohne eigenes Backend)

## Entwicklung

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Dev-Server (http://localhost:5173/ben-vincent/)
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal testen
```

### Kontaktformular einrichten

Das Formular nutzt [Web3Forms](https://web3forms.com). Für den lokalen Betrieb:

```bash
cp .env.example .env.local
# danach VITE_WEB3FORMS_KEY in .env.local eintragen
```

Ohne Key zeigt das Formular einen E-Mail-Fallback. `.env.local` ist
absichtlich nicht im Repo (enthält Secrets).

## Projektstruktur

```
public/            statische Assets (Favicons, OG-Image, robots.txt,
                   sitemap.xml, .htaccess mit Security-Headern)
src/
  components/      Sektionen (Hero, Timeline, Skills, Projects, Certs, …)
  pages/           Rechtliche Seiten (Impressum, Datenschutz)
  data/            Inhalte (Übersetzungen, Projekte, Skills, Zeitleiste …)
  lib/             i18n, Animationen, Semester-Logik
```

## Besonderheiten

- **Dynamische Semesteranzeige** – wird aus dem Einschreibedatum berechnet, kein manuelles Pflegen.
- **Security-Header** via `public/.htaccess` (CSP, X-Frame-Options, Referrer-Policy …).
- **SEO/Social** – Open Graph, Twitter Cards, JSON-LD (`Person`), Canonical, Sitemap.

## Lizenz

Quellcode zur Ansicht. Inhalte, Texte und Bilder © Ben-Vincent Emilio Adamo.
