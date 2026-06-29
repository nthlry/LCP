'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Plan axonométrique interactif (étage courant R+2).
 *
 * Chaque CATÉGORIE d'espace peut contenir PLUSIEURS polygones (`shapes`).
 * Au survol (ou survol de la légende) tous les polygones d'une catégorie
 * s'illuminent ; au clic, un panneau de détail s'ouvre.
 *
 * MODE ÉDITEUR : ajouter `?calib=1` à l'URL (/espaces?calib=1) active un
 * éditeur visuel : sélectionne une catégorie, déplace les sommets existants
 * à la souris, ajoute de nouvelles formes, puis « Copier » le code des
 * `shapes` à recoller dans ZONES ci-dessous.
 */
type Zone = {
  id: string;
  label: string;
  color: string;
  /** plusieurs polygones possibles, en coordonnées image (0..1227 / 0..837) */
  shapes: string[];
  detail: string;
};

const ZONES: Zone[] = [
  {
    id: 'detente',
    label: 'Espace détente',
    color: '#16a34a',
    shapes: [
      '295,366 229,316 456,154 474,168 354,264',
      '743,342 781,370 846,319 814,288',
      '428,435 461,409 553,488 516,518',
      '518,154 536,143 576,181 559,194',
    ],
    detail: 'Lounge informel avec assises basses et tables : pauses, échanges spontanés et travail décontracté.',
  },
  {
    id: 'etude',
    label: "Salle d'étude",
    color: '#7c3aed',
    shapes: ['1150,526 1073,589 1027,549 1016,554 919,474 939,452 948,461 1022,413'],
    detail: 'Espace calme pour le travail individuel, la lecture et la révision.',
  },
  {
    id: 'reunion',
    label: 'Salle de réunion',
    color: '#e11d48',
    shapes: [
      '701,599 652,629 669,650 721,616',
      '1027,552 970,592 1008,629 1071,585',
      '539,131 521,140 493,113 507,99',
      '576,182 587,165 613,191 601,210',
    ],
    detail: 'Espace équipé pour les réunions de projet, entretiens et visioconférences.',
  },
  {
    id: 'profs',
    label: 'Salles des professeurs',
    color: '#d97706',
    shapes: ['474,699 582,626 717,741 508,736'],
    detail: 'Bureaux et espaces de préparation réservés aux enseignants et intervenants.',
  },
  {
    id: 'classe',
    label: 'Salles de classe',
    color: '#2563eb',
    shapes: [
      '106,384 220,309 581,623 467,702',
      '638,673 721,742 763,739 1016,557 916,471',
      '951,457 1021,410 882,295 794,364 877,441 911,427',
      '710,173 624,233 729,335 814,262',
    ],
    detail: 'Salles de cours modulables, organisées en plateaux pour s’adapter à chaque format pédagogique.',
  },
];

type Pt = [number, number];
const parseShape = (s: string): Pt[] =>
  s.trim().length ? s.trim().split(/\s+/).map((p) => p.split(',').map(Number) as Pt) : [];
const shapeToStr = (pts: Pt[]): string => pts.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).join(' ');
const centroid = (pts: Pt[]): Pt => {
  if (!pts.length) return [0, 0];
  const sx = pts.reduce((a, [x]) => a + x, 0);
  const sy = pts.reduce((a, [, y]) => a + y, 0);
  return [sx / pts.length, sy / pts.length];
};

export default function AxonometriePlan() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // --- éditeur ---
  const [calib, setCalib] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  // copie de travail : id -> liste de formes (chaque forme = liste de points)
  const [draft, setDraft] = useState<Record<string, Pt[][]>>(() =>
    Object.fromEntries(ZONES.map((z) => [z.id, z.shapes.map(parseShape)])),
  );
  const [editId, setEditId] = useState<string>(ZONES[0].id);
  const [mode, setMode] = useState<'edit' | 'draw'>('edit');
  const [newPts, setNewPts] = useState<Pt[]>([]);
  const dragRef = useRef<{ si: number; pi: number } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('calib')) {
      setCalib(true);
    }
  }, []);

  const active = hovered ?? selected;
  const selectedZone = ZONES.find((z) => z.id === selected) ?? null;

  const toImg = (clientX: number, clientY: number): Pt => {
    const rect = svgRef.current!.getBoundingClientRect();
    return [
      Math.round(((clientX - rect.left) / rect.width) * 1227),
      Math.round(((clientY - rect.top) / rect.height) * 837),
    ];
  };

  function handleSvgClick(e: React.MouseEvent<SVGSVGElement>) {
    if (!calib || mode !== 'draw') return;
    setNewPts((prev) => [...prev, toImg(e.clientX, e.clientY)]);
  }

  function onPointerMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!calib || mode !== 'edit' || !dragRef.current) return;
    const { si, pi } = dragRef.current;
    const p = toImg(e.clientX, e.clientY);
    setDraft((d) => {
      const shapes = d[editId].map((s) => s.slice());
      shapes[si][pi] = p;
      return { ...d, [editId]: shapes };
    });
  }

  function validateShape() {
    if (newPts.length < 3) return;
    setDraft((d) => ({ ...d, [editId]: [...d[editId], newPts] }));
    setNewPts([]);
    setMode('edit');
  }

  function deleteShape(si: number) {
    setDraft((d) => ({ ...d, [editId]: d[editId].filter((_, i) => i !== si) }));
  }

  const codeOutput = ZONES.map((z) => {
    const shapes = (draft[z.id] ?? []).map((s) => `'${shapeToStr(s)}'`).join(', ');
    return `  ${z.id}: [${shapes}],`;
  }).join('\n');

  return (
    <div className="max-w-container-max mx-5 md:mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <h4 className="font-headline-lg text-headline-lg uppercase tracking-tight">
          <span className="font-black text-accent-blue">Étage courant</span>{' '}
          <span className="font-normal text-[#12100B]">: R+2</span>
          <span className="font-black text-accent-blue">.</span>
        </h4>
        <p className="font-label-sm uppercase tracking-widest text-on-surface-variant/70">Survolez ou cliquez les zones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden p-3 md:p-6">
          <div className="relative">
            <img
              src="/assets/plan-axonometrique.png"
              alt="Plan axonométrique de l'étage courant R+2 du Campus Paris"
              className="w-full h-auto select-none"
              loading="lazy"
            />
            <svg
              ref={svgRef}
              viewBox="0 0 1227 837"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              role="group"
              aria-label="Zones interactives du plan"
              onClick={handleSvgClick}
              onMouseMove={onPointerMove}
              onMouseUp={() => (dragRef.current = null)}
              style={{ cursor: calib ? 'crosshair' : 'default' }}
            >
              {/* ---- AFFICHAGE NORMAL ---- */}
              {!calib &&
                ZONES.map((z) => {
                  const isActive = active === z.id;
                  return z.shapes.map((s, i) => (
                    <polygon
                      key={`${z.id}-${i}`}
                      points={s}
                      fill={z.color}
                      fillOpacity={isActive ? 0.45 : 0}
                      stroke={z.color}
                      strokeOpacity={isActive ? 1 : 0}
                      strokeWidth={3}
                      strokeLinejoin="round"
                      className="cursor-pointer transition-all duration-200"
                      style={{ outline: 'none' }}
                      tabIndex={0}
                      role="button"
                      aria-label={z.label}
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(z.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setSelected(z.id)}
                    />
                  ));
                })}

              {/* ---- ÉDITEUR ---- */}
              {calib &&
                ZONES.map((z) =>
                  (draft[z.id] ?? []).map((pts, si) => (
                    <polygon
                      key={`${z.id}-${si}`}
                      points={shapeToStr(pts)}
                      fill={z.color}
                      fillOpacity={z.id === editId ? 0.3 : 0.12}
                      stroke={z.color}
                      strokeWidth={z.id === editId ? 3 : 1.5}
                      className="pointer-events-none"
                    />
                  )),
                )}
              {calib &&
                mode === 'edit' &&
                (draft[editId] ?? []).map((pts, si) =>
                  pts.map((p, pi) => (
                    <circle
                      key={`h-${si}-${pi}`}
                      cx={p[0]}
                      cy={p[1]}
                      r={8}
                      fill="#fff"
                      stroke="#000"
                      strokeWidth={2}
                      style={{ cursor: 'grab' }}
                      onMouseDown={() => (dragRef.current = { si, pi })}
                    />
                  )),
                )}
              {calib && mode === 'draw' && newPts.length > 0 && (
                <>
                  <polygon points={shapeToStr(newPts)} fill="#ff0000" fillOpacity={0.25} stroke="#ff0000" strokeWidth={3} />
                  {newPts.map((p, i) => (
                    <circle key={i} cx={p[0]} cy={p[1]} r={6} fill="#ff0000" />
                  ))}
                </>
              )}
            </svg>

            {/* Cartouches (mode normal uniquement) */}
            {!calib &&
              ZONES.map((z) => {
                if (active !== z.id || !z.shapes.length) return null;
                const [cx, cy] = centroid(parseShape(z.shapes[0]));
                return (
                  <span
                    key={z.id}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-label-md text-[#12100B] shadow-md border"
                    style={{ left: `${(cx / 1227) * 100}%`, top: `${(cy / 837) * 100}%`, borderColor: z.color }}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle" style={{ backgroundColor: z.color }} />
                    {z.label}
                  </span>
                );
              })}
          </div>

          {/* Panneau éditeur */}
          {calib && (
            <div className="mt-4 rounded-xl bg-[#12100B] text-white p-4 text-sm space-y-3">
              <div className="font-bold">Éditeur de zones</div>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => {
                      setEditId(z.id);
                      setNewPts([]);
                      setMode('edit');
                    }}
                    className="px-3 py-1 rounded flex items-center gap-2"
                    style={{ background: editId === z.id ? z.color : 'rgba(255,255,255,0.15)' }}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: z.color }} />
                    {z.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="opacity-70">Catégorie active : <b>{ZONES.find((z) => z.id === editId)?.label}</b></span>
                {mode === 'edit' ? (
                  <button type="button" onClick={() => setMode('draw')} className="px-3 py-1 rounded bg-white/15 hover:bg-white/25">
                    + Ajouter une forme
                  </button>
                ) : (
                  <>
                    <span className="opacity-70">Clique les coins…</span>
                    <button type="button" onClick={validateShape} className="px-3 py-1 rounded bg-green-600 hover:bg-green-500">
                      Valider la forme
                    </button>
                    <button type="button" onClick={() => setNewPts((p) => p.slice(0, -1))} className="px-3 py-1 rounded bg-white/15 hover:bg-white/25">
                      Annuler point
                    </button>
                    <button type="button" onClick={() => { setNewPts([]); setMode('edit'); }} className="px-3 py-1 rounded bg-white/15 hover:bg-white/25">
                      Annuler
                    </button>
                  </>
                )}
              </div>

              {mode === 'edit' && (draft[editId] ?? []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(draft[editId] ?? []).map((_, si) => (
                    <button key={si} type="button" onClick={() => deleteShape(si)} className="px-2 py-1 rounded bg-red-700/70 hover:bg-red-600">
                      Suppr. forme {si + 1}
                    </button>
                  ))}
                </div>
              )}

              <div>
                <div className="opacity-70 mb-1">Code à me recopier (shapes par catégorie) :</div>
                <pre className="whitespace-pre-wrap break-all bg-black/40 rounded p-2 text-xs">{codeOutput}</pre>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(codeOutput)}
                  className="mt-2 px-3 py-1 rounded bg-white/15 hover:bg-white/25"
                >
                  Copier tout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Légende + détail */}
        <div className="lg:col-span-1 space-y-md">
          <div>
            <h5 className="font-label-sm uppercase tracking-widest text-on-surface-variant/70 mb-3">Légende</h5>
            <ul className="space-y-2">
              {ZONES.map((z) => {
                const isActive = active === z.id;
                return (
                  <li key={z.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setSelected(z.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left font-label-md transition-all ${
                        isActive ? 'bg-surface-container' : 'hover:bg-surface-container/60'
                      }`}
                    >
                      <span className="inline-block w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: z.color }} />
                      <span className="text-[#12100B]">{z.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {selectedZone ? (
            <div className="glass-card rounded-2xl p-5 border-l-4" style={{ borderColor: selectedZone.color }}>
              <div className="flex items-start justify-between gap-3">
                <h5 className="font-title-lg text-title-lg text-[#12100B]">{selectedZone.label}</h5>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Fermer le détail"
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed mt-2">{selectedZone.detail}</p>
            </div>
          ) : (
            <p className="font-body-sm text-on-surface-variant/70 leading-relaxed">
              Cliquez une zone du plan ou de la légende pour afficher son détail.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
