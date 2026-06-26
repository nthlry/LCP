'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    __leCampusAnim?: {
      initAll: () => void;
      initPageEffects: () => void;
    };
  }
}

/**
 * Charge assets/hero-anim.js (copié depuis V1, légèrement adapté — voir
 * commentaire en bas du fichier) et relance les effets dépendants du
 * contenu de page (lettres du titre, reveals, slider, compteurs) à
 * chaque navigation client-side, puisque le <header> et les listeners
 * globaux restent montés en permanence dans le layout racine.
 */
export default function AnimLoader() {
  const pathname = usePathname();
  const loadedOnce = useRef(false);

  useEffect(() => {
    if (!loadedOnce.current) {
      // Premier chargement : géré par le bootstrap interne du script
      // (DOMContentLoaded / appel immédiat), rien à faire ici.
      loadedOnce.current = true;
      return;
    }
    window.__leCampusAnim?.initPageEffects();
  }, [pathname]);

  return <Script src="/assets/hero-anim.js" strategy="afterInteractive" />;
}
