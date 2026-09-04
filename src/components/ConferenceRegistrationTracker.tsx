"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

const PAYHIP_CONFERENCE = "payhip.com/b/4c3GJ";

/**
 * Traccia il click sul link Payhip “Registrazione integrale della Conferenza”
 * senza bloccare la navigazione.
 */
export function ConferenceRegistrationTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor?.href) return;
      if (!anchor.href.includes(PAYHIP_CONFERENCE)) return;
      trackEvent("click_registrazione_conferenza");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
