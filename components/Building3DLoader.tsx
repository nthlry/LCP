'use client';

import dynamic from 'next/dynamic';

/* Le rendu 3D (Three.js / WebGL) ne peut pas être fait côté serveur.
   On charge Building3D uniquement côté client, avec un placeholder
   pendant le chargement du bundle. */
const Building3D = dynamic(() => import('./Building3D'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] md:h-[560px] rounded-2xl glass-card flex items-center justify-center">
      <span className="font-label-md text-on-surface-variant uppercase tracking-widest">Chargement du bâtiment 3D…</span>
    </div>
  ),
});

export default function Building3DLoader() {
  return <Building3D />;
}
