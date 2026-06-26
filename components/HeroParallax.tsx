'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Parallax du hero piloté par Framer Motion (remplace l'ancien effet
 * "squeeze" géré en vanilla JS dans hero-anim.js).
 *
 * useScroll({ target: ref }) suit la progression du scroll sur la
 * hauteur du conteneur (0 en haut, 1 quand il a totalement défilé).
 * useTransform mappe cette progression sur un déplacement vertical de
 * l'image dans le sens inverse du scroll de la page (l'image descend
 * pendant que le contenu défile vers le haut), ce qui crée l'effet de
 * profondeur classique du parallax.
 * useSpring lisse ce déplacement (au lieu de suivre le scroll 1:1),
 * pour un mouvement "smooth" plutôt que mécanique.
 *
 * L'image est surdimensionnée en CSS (top: -12%, height: 124%, voir
 * .hero-shrink-media dans globals.css) pour que ce déplacement ne
 * révèle jamais de bord vide.
 */
export default function HeroParallax({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-10%', '10%']);
  const y = useSpring(rawY, { stiffness: 300, damping: 35, mass: 0.4 });

  return (
    <div ref={ref} className="hero-shrink-wrap">
      <motion.img alt={alt} className="hero-shrink-media" src={src} style={{ y }} />
      {children}
    </div>
  );
}
