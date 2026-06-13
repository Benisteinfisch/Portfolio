import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis-Instanz global zugänglich machen (z.B. für den Scroll-to-top-Button),
// ohne sie durch den Komponentenbaum reichen zu müssen.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Butterweiches Scrollen mit Trägheit/Dämpfung (Lenis). Animiert den NATIVEN
// Scroll, daher funktionieren useScroll/IntersectionObserver/Scroll-Spy weiter.
// Bei prefers-reduced-motion bleibt alles beim Browser-Standard.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // Anker-Links (#kontakt etc.) übernimmt Lenis mit derselben Dämpfung
      anchors: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.__lenis = lenis;

    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
