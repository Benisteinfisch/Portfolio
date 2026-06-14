import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * "Isometric Cyber-Surface" — der Blick fällt schräg auf eine riesige, gekippte
 * Tech-Oberfläche aus gleich großen, CNC-gefrästen Kacheln. Dahinter fließt
 * Energie (Radial-Gradient, folgt der Maus) und bricht durch die feinen Fugen.
 *
 * Layer (hinten → vorne, alle in Screen-Space außer der gekippten Bühne):
 *   1. Grundfarbe (scheint durch die Fugen, wenn dort kein Licht ist)
 *   2. Grund-Energie (groß, STATISCH) — nur ein Hauch Atmosphäre
 *   3. Maus-Spotlight — folgt gefedert dem Cursor, glüht durch die Fugen am Cursor
 *   4. Isometrische Bühne mit dem Kachel-Grid (statisch, transparente Fugen)
 *
 * Performance: Der Hintergrund ist beim SCROLLEN komplett statisch — sonst würde
 * jede Bewegung den Cache aller backdrop-filter-Flächen (Glass-Cards) pro Frame
 * ungültig machen. Nur das Maus-Spotlight bewegt sich (und nur bei Mausbewegung,
 * nicht beim Scrollen). Kacheln statisch, Maus nur bei pointer:fine.
 */
export function EnergyMatrixBackground() {
  const prefersReducedMotion = useReducedMotion();

  // Kachelanzahl pro Achse: weniger auf Mobile (Performance + Lesbarkeit).
  const [gridN, setGridN] = useState(20);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => setGridN(mq.matches ? 12 : 20);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Maus-Position (px relativ zur Bildschirmmitte), gefedert.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 24, mass: 0.5 });

  const [mouseEnabled, setMouseEnabled] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setMouseEnabled(true);
    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  const tiles = Array.from({ length: gridN * gridN });

  return (
    <div
      className="energy-matrix fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, contain: 'strict' }}
      aria-hidden="true"
    >
      {/* 1. Grundfarbe */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--matrix-groove)' }} />

      {/* 2. Grund-Energie (STATISCH) — bewusst sehr schwach, damit die Seite
           primär dunkel wirkt; verändert sich beim Scrollen NICHT (Cache-freundlich). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70vw 70vh at 50% 45%, rgba(var(--matrix-accent-rgb), 0.06), transparent 70%)',
        }}
      />

      {/* 3. Maus-Spotlight (hinter den Kacheln) — kleiner, scharf abreißender
           Lichtkegel, der NUR die Fugen direkt unter dem Cursor aufglühen lässt. */}
      {mouseEnabled && (
        <motion.div
          className="absolute inset-0"
          style={{
            x: springX,
            y: springY,
            willChange: 'transform',
            background:
              'radial-gradient(circle 140px at 50% 50%, rgba(var(--matrix-accent-rgb), 0.85) 0%, rgba(var(--matrix-accent-rgb), 0.15) 40%, transparent 75%)',
          }}
        />
      )}

      {/* 4. Isometrische Bühne + Kachel-Grid (solide, deckt das Licht ab —
           Energie scheint nur durch die Fugen, kein Wash-out der Platten). */}
      <div className="iso-scene">
        <div className="iso-stage">
          <div className="iso-tiles" style={{ '--iso-n': gridN } as React.CSSProperties}>
            {tiles.map((_, i) => (
              <div key={i} className="iso-tile" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
