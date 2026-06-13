// Easter-Egg für alle, die F12 drücken: ein gestyltes Begrüßungs-Banner in der
// DevTools-Konsole. Läuft einmal beim Laden. Kein DOM-Effekt, rein kosmetisch.

const ASCII = [
  '  ____  _____ _   _    _    ____    _    __  __  ___',
  ' | __ )| ____| \\ | |  / \\  |  _ \\  / \\  |  \\/  |/ _ \\',
  " |  _ \\|  _| |  \\| | / _ \\ | | | |/ _ \\ | |\\/| | | | |",
  ' | |_) | |___| |\\  |/ ___ \\| |_| / ___ \\| |  | | |_| |',
  ' |____/|_____|_| \\_/_/   \\_\\____/_/   \\_\\_|  |_|\\___/',
].join('\n');

export function printConsoleGreeting() {
  if (typeof console === 'undefined') return;

  const sage = '#8db58d';
  const muted = '#9E9E96';

  // ASCII-Logo in Sage-Grün, Mono.
  console.log(`%c${ASCII}`, `color:${sage};font-family:monospace;font-size:11px;line-height:1.1;`);

  console.log(
    '%cHi 👋 — neugierig auf den Code?',
    `color:${sage};font-size:15px;font-weight:700;font-family:system-ui,sans-serif;`
  );
  console.log(
    '%cIch bin Ben-Vincent Adamo, B.Eng.-Student der IT-Sicherheit.\n' +
      'Die Seite ist React + Vite + Tailwind, mit strikter CSP und selbst gehosteten Fonts.',
    `color:${muted};font-size:12px;font-family:system-ui,sans-serif;line-height:1.5;`
  );
  console.log(
    '%c📬  Lust auf ein Gespräch? → Ben@Adamo.de',
    `color:${sage};font-size:13px;font-weight:600;font-family:system-ui,sans-serif;`
  );

  // Maschinenlesbar für die ganz Neugierigen.
  console.info('mailto:Ben@Adamo.de');
}
