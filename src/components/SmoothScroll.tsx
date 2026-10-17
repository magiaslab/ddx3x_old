"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Scroll fluido con Lenis sulle pagine del sito (non nello Studio).
 * Disattivato con prefers-reduced-motion. Su touch resta lo scroll nativo.
 * Le aree con scroll proprio (es. menu mobile) usano data-lenis-prevent.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Al cambio pagina ferma un'eventuale animazione in corso, così non
  // trascina la nuova pagina verso la posizione di quella precedente.
  useEffect(() => {
    window.__lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
