'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Edges } from '@react-three/drei';

/* =================================================================
   FloorPlan3D — plan isométrique 3D d'un plateau d'enseignement type
   (R+2 à R+7). Inspiré des plans d'architecte en vue axonométrique :
   sol clair, salles tracées au trait, zones fonctionnelles (détente,
   réunion, étude, salle des profs) en aplats de couleur, bureaux
   matérialisés par de petits blocs. Données de programme issues de
   la brochure commerciale 2026 (10 salles de classe, 5 espaces
   détente, 5 espaces de réunion, 1 salle d'étude, 1 salle des
   professeurs par plateau).
   ================================================================= */

type RoomType = 'classroom' | 'détente' | 'réunion' | 'étude' | 'profs';

type Room = {
  x: number;
  z: number;
  w: number;
  d: number;
  type: RoomType;
  label: string;
  detail: string;
  fill?: string;
  deskRows?: number;
  deskCols?: number;
};

const W = 14;
const D = 9;

const ROOMS: Room[] = [
  // Rangée côté façade (z 0-3)
  { x: 0, z: 0, w: 3, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },
  { x: 3.4, z: 0, w: 3, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },
  { x: 6.8, z: 0, w: 3, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },
  { x: 10.2, z: 0, w: 3.6, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },

  // Rangée côté cour (z 6-9)
  { x: 0, z: 6, w: 3, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },
  { x: 3.4, z: 6, w: 3, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },
  { x: 6.8, z: 6, w: 3, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },
  { x: 10.2, z: 6, w: 3.6, d: 3, type: 'classroom', label: 'Salle de classe', detail: '10 salles de classe sur le plateau', deskRows: 2, deskCols: 3 },

  // Bande centrale : circulation + espaces fonctionnels
  { x: 0, z: 3.4, w: 2.6, d: 2.2, type: 'étude', label: "Salle d'étude", detail: '1 salle d\'étude par plateau', fill: '#BFD9CF', deskRows: 2, deskCols: 2 },
  { x: 2.9, z: 3.4, w: 2.4, d: 2.2, type: 'réunion', label: 'Espace de réunion', detail: '5 espaces de réunion sur le plateau', fill: '#E3CFA0' },
  { x: 5.6, z: 3.4, w: 2.4, d: 2.2, type: 'détente', label: 'Espace détente', detail: '5 espaces détente sur le plateau', fill: '#7FB5A8' },
  { x: 8.3, z: 3.4, w: 2.4, d: 2.2, type: 'réunion', label: 'Espace de réunion', detail: '5 espaces de réunion sur le plateau', fill: '#E3CFA0' },
  { x: 11.0, z: 3.4, w: 2.8, d: 2.2, type: 'profs', label: 'Salle des professeurs', detail: '1 salle des professeurs par plateau', fill: '#C9A66B', deskRows: 1, deskCols: 3 },
];

function Desks({ room }: { room: Room }) {
  if (!room.deskRows || !room.deskCols) return null;
  const marginX = room.w * 0.16;
  const marginZ = room.d * 0.2;
  const innerW = room.w - marginX * 2;
  const innerD = room.d - marginZ * 2;
  const cellW = innerW / room.deskCols;
  const cellD = innerD / room.deskRows;
  const desks: { x: number; z: number }[] = [];
  for (let r = 0; r < room.deskRows; r++) {
    for (let c = 0; c < room.deskCols; c++) {
      desks.push({
        x: -room.w / 2 + marginX + cellW * (c + 0.5),
        z: -room.d / 2 + marginZ + cellD * (r + 0.5),
      });
    }
  }
  return (
    <>
      {desks.map((p, i) => (
        <mesh key={i} position={[p.x, 0.14, p.z]}>
          <boxGeometry args={[cellW * 0.55, 0.18, cellD * 0.5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
          <Edges color="#9aa0b4" />
        </mesh>
      ))}
    </>
  );
}

function RoomBlock({ room }: { room: Room }) {
  const [hovered, setHovered] = useState(false);
  const cx = room.x - W / 2 + room.w / 2;
  const cz = room.z - D / 2 + room.d / 2;

  return (
    <group position={[cx, 0, cz]}>
      <mesh
        position={[0, 0.05, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={[room.w, 0.06, room.d]} />
        <meshStandardMaterial
          color={room.fill ?? '#F4F1E8'}
          transparent={!room.fill}
          opacity={room.fill ? 0.92 : 0.35}
          roughness={0.8}
        />
        <Edges color={hovered ? '#255EE1' : '#b9b4a4'} />
      </mesh>

      <Desks room={room} />

      {hovered && (
        <Html center distanceFactor={10} position={[0, 0.9, 0]}>
          <div className="glass-card px-4 py-2 rounded-lg text-center whitespace-nowrap pointer-events-none">
            <div className="font-title-lg text-title-lg leading-tight">{room.label}</div>
            <div className="font-body-sm text-on-surface-variant mt-0.5">{room.detail}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function FloorPlate() {
  return (
    <mesh position={[0, -0.02, 0]}>
      <boxGeometry args={[W, 0.04, D]} />
      <meshStandardMaterial color="#F7F6F1" roughness={0.9} />
      <Edges color="#9aa0b4" />
    </mesh>
  );
}

const LEGEND: { color: string; label: string }[] = [
  { color: '#7FB5A8', label: 'Détente' },
  { color: '#E3CFA0', label: 'Réunion' },
  { color: '#BFD9CF', label: "Salle d'étude" },
  { color: '#C9A66B', label: 'Salle des profs' },
];

export default function FloorPlan3D() {
  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [9, 8.5, 10], fov: 32 }}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[6, 9, 6]} intensity={1} />
        <directionalLight position={[-6, 4, -4]} intensity={0.35} />
        <FloorPlate />
        {ROOMS.map((room, i) => (
          <RoomBlock key={i} room={room} />
        ))}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4.2}
          maxPolarAngle={Math.PI / 3.4}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-3 px-2 pointer-events-none">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 font-label-sm text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
