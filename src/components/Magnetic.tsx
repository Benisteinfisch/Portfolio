import type { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  /** Wie stark das Element dem Cursor folgt (0–1) */
  strength?: number;
}

// Zieht sein Kind dem Cursor ein paar Pixel entgegen und federt beim
// Verlassen zurück. Bei reduced motion komplett passiv.
export function Magnetic({ children, strength = 0.25 }: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 16 });
  const springY = useSpring(y, { stiffness: 280, damping: 16 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="inline-block"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
