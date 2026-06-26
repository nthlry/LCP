'use client';

import { useRef, useState } from 'react';
import { Canvas, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html, Edges } from '@react-three/drei';
import * as THREE from 'three';

/* =================================================================
   Building3D — bâtiment stylisé interactif (Three.js / R3F)
   Pas de modèle 3D réel : chaque niveau du Campus Paris est
   représenté par un bloc empilé, dimensionné/coloré selon sa
   nature (RDC, R+1 mutualisé, étages d'enseignement, rooftop).
   Au survol, le bloc se soulève légèrement et affiche son nom ;
   au clic, on défile en douceur jusqu'à la fiche correspondante
   plus bas sur la page (voir id= sur les cartes de app/espaces/page.tsx).
   ================================================================= */

type Floor = {
  id: string;
  niveau: string;
  label: string;
  height: number;
  depthScale?: number;
  widthScale?: number;
  color: string;
  floorLines?: number;
  detail?: string;
  terrace?: boolean;
};

/* Données réelles issues de la brochure commerciale 2026 (PDF-PLANS-SITEWEB-V1).
   Chaque niveau R+2 à R+7 renvoie vers la carte "niveau-enseignement" de la
   page Espaces (celle-ci regroupe les 6 plateaux), les autres niveaux ont
   chacun leur propre carte. */
const FLOORS: Floor[] = [
  { id: 'niveau-rdc', niveau: 'Niveau 0', label: 'Rez-de-chaussée', height: 0.9, color: '#EAE6DA', detail: 'Accueil, barista, cafétéria · 50 pers.' },
  { id: 'niveau-r1', niveau: 'Niveau 1', label: 'Premier étage mutualisé', height: 0.9, color: '#255EE1', detail: 'Auditorium, wellness, business center · 301 pers.' },
  { id: 'niveau-enseignement', niveau: 'Niveau 2', label: 'Salles 201 à 210', height: 0.57, color: '#F8F9FF', detail: '349 places · 104 700 € HT/mois' },
  { id: 'niveau-enseignement', niveau: 'Niveau 3', label: 'Salles 301 à 309', height: 0.57, color: '#F8F9FF', detail: '305 places · 91 500 € HT/mois', terrace: true },
  { id: 'niveau-enseignement', niveau: 'Niveau 4', label: 'Salles 401 à 410', height: 0.57, color: '#F8F9FF', detail: '368 places · 110 400 € HT/mois', terrace: true },
  { id: 'niveau-enseignement', niveau: 'Niveau 5', label: 'Salles 501 à 512', height: 0.57, color: '#F8F9FF', detail: '424 places · 127 200 € HT/mois' },
  { id: 'niveau-enseignement', niveau: 'Niveau 6', label: 'Salles 601 à 609', height: 0.57, color: '#F8F9FF', detail: '270 places · 81 000 € HT/mois', terrace: true },
  { id: 'niveau-enseignement', niveau: 'Niveau 7', label: 'Salles 701 à 710', height: 0.57, color: '#F8F9FF', detail: '297 places · 89 100 € HT/mois', terrace: true },
  { id: 'niveau-rooftop', niveau: 'Niveau 8', label: 'Rooftop, terrasse 360°', height: 0.55, depthScale: 0.82, widthScale: 0.82, color: '#7FA66B', detail: 'Terrasse 360° · 440 pers.' },
];

const WIDTH = 3.2;
const DEPTH = 2.4;

function scrollToFloor(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function FloorBlock({ floor, y }: { floor: Floor; y: number }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const w = WIDTH * (floor.widthScale ?? 1);
  const d = DEPTH * (floor.depthScale ?? 1);

  function onOver(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }
  function onOut(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  }
  function onClick(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    scrollToFloor(floor.id);
  }

  return (
    <group position={[0, y, 0]}>
      <mesh
        ref={meshRef}
        position={[0, hovered ? 0.08 : 0, 0]}
        onPointerOver={onOver}
        onPointerOut={onOut}
        onClick={onClick}
      >
        <boxGeometry args={[w, floor.height, d]} />
        <meshStandardMaterial
          color={floor.color}
          roughness={0.55}
          metalness={0.05}
          emissive={hovered ? new THREE.Color(floor.color) : undefined}
          emissiveIntensity={hovered ? 0.25 : 0}
        />
        <Edges color={hovered ? '#255EE1' : '#9aa0b4'} />
      </mesh>

      {/* Terrasse privative : fine plateforme en saillie sur la façade avant */}
      {floor.terrace && (
        <mesh position={[0, -floor.height / 2 + 0.04, d / 2 + 0.22]}>
          <boxGeometry args={[w * 0.9, 0.08, 0.45]} />
          <meshStandardMaterial color="#8FBF6F" roughness={0.7} />
        </mesh>
      )}

      {hovered && (
        <Html center distanceFactor={8} position={[0, floor.height / 2 + 0.35, 0]}>
          <div className="glass-card px-4 py-2 rounded-lg text-center whitespace-nowrap pointer-events-none">
            <div className="font-label-sm uppercase tracking-widest text-secondary">{floor.niveau}</div>
            <div className="font-title-lg text-title-lg leading-tight">{floor.label}</div>
            {floor.detail && <div className="font-body-sm text-on-surface-variant mt-0.5">{floor.detail}</div>}
          </div>
        </Html>
      )}
    </group>
  );
}

function Building() {
  let cursor = 0;
  const blocks = FLOORS.map((floor) => {
    const y = cursor + floor.height / 2;
    cursor += floor.height;
    return { floor, y };
  });
  const totalHeight = cursor;

  return (
    <group position={[0, -totalHeight / 2, 0]}>
      {blocks.map(({ floor, y }) => (
        <FloorBlock key={floor.id} floor={floor} y={y} />
      ))}
      {/* Socle / ombre au sol */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function Building3D() {
  return (
    <div className="relative h-[420px] md:h-[560px] rounded-2xl overflow-hidden glass-card">
      <Canvas camera={{ position: [6.5, 4.5, 7.5], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />
        <Building />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-label-sm text-on-surface-variant uppercase tracking-widest opacity-70 pointer-events-none">
        Glisser pour faire pivoter · cliquer un niveau
      </div>
    </div>
  );
}
