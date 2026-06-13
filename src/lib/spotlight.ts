import type { MouseEvent } from 'react';

// Setzt die Cursor-Position als CSS-Variablen auf der Karte —
// .spotlight-card::before (index.css) rendert daraus den Lichtfleck.
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}
