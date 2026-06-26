'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Le site V1 définissait un tailwind.config inline DIFFÉRENT par page
 * (palette "Concept" sur index.html, palette "Espaces/Infos pratiques"
 * sur les deux autres). En Next.js le thème Tailwind est global, donc
 * les tokens conflictuels (couleurs + 3 tailles de police) ont été
 * portés en classes CSS scopées : .theme-index / .theme-site
 * (voir app/globals.css). Ce composant applique le bon scope sur
 * <body> selon la route active, y compris pour le Header/Footer
 * partagés dans le layout racine.
 */
export default function ThemeScope() {
  const pathname = usePathname();

  useEffect(() => {
    const scope = pathname === '/' ? 'theme-index' : 'theme-site';
    document.body.classList.remove('theme-index', 'theme-site');
    document.body.classList.add(scope);
  }, [pathname]);

  return null;
}
