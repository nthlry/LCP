'use client';

/**
 * Barre de progression de scroll + points de navigation rapide.
 * Le remplissage/activation est piloté par hero-anim.js
 * (initScrollProgress / initScrollSpy), identique au site V1.
 * Les ids ciblés par les data-scroll-dot doivent exister sur la page
 * courante (sections #hero, #concept/#niveaux/#localisation, etc.) ;
 * les dots dont la section n'existe pas sur la page restent inertes.
 */
export default function ScrollChrome({
  dots,
}: {
  dots: { id: string; label: string }[];
}) {
  return (
    <>
      <div className="scroll-progress-bar" aria-hidden="true"></div>
      <nav className="scroll-dots" aria-label="Navigation rapide">
        {dots.map((dot) => (
          <a key={dot.id} className="scroll-dot" data-scroll-dot={dot.id} href={`#${dot.id}`} aria-label={dot.label}></a>
        ))}
      </nav>
    </>
  );
}
