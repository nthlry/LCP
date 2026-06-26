'use client';

import dynamic from 'next/dynamic';

const FloorPlan3D = dynamic(() => import('./FloorPlan3D'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-surface-container-high">
      <span className="font-label-md text-on-surface-variant uppercase tracking-widest">Chargement du plan 3D…</span>
    </div>
  ),
});

export default function FloorPlan3DLoader() {
  return <FloorPlan3D />;
}
