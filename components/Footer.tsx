import Link from 'next/link';

/**
 * Footer unique partagé par les 3 pages (Le concept, Les espaces,
 * Informations pratiques). Auparavant deux variantes divergeaient ;
 * désormais un seul composant. Les couleurs sont volontairement
 * codées en dur (et non via les tokens « surface »/« inverse-surface »)
 * car ces tokens sont redéfinis par le thème de la page
 * (.theme-index vs .theme-site) — sans ça le footer changeait de teinte
 * d'une page à l'autre. Couleurs fixes = rendu strictement identique.
 */
export default function Footer() {
  return (
    <footer className="bg-[#213145] text-white border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter py-section-gap">
          <div className="col-span-1 md:col-span-1">
            <div className="font-headline-md font-bold mb-6">LE CAMPUS PARIS</div>
            <p className="text-white/70 text-body-md leading-relaxed">
              Opérateur de campus nouvelle génération pour les établissements d&apos;enseignement supérieur.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-md uppercase mb-2">Navigation</h4>
            <Link className="text-white/70 hover:text-white hover:underline transition-all" href="/">
              Le concept
            </Link>
            <Link className="text-white/70 hover:text-white hover:underline transition-all" href="/pourquoi-maintenant">
              Pourquoi maintenant
            </Link>
            <Link className="text-white/70 hover:text-white hover:underline transition-all" href="/espaces">
              Les espaces
            </Link>
            <Link className="text-white/70 hover:text-white hover:underline transition-all" href="/infos-pratiques">
              Informations pratiques
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-md uppercase mb-2">Légal</h4>
            <a className="text-white/70 hover:text-white hover:underline transition-all" href="#">
              Mentions Légales
            </a>
            <a className="text-white/70 hover:text-white hover:underline transition-all" href="#">
              Politique de Confidentialité
            </a>
            <a className="text-white/70 hover:text-white hover:underline transition-all" href="#">
              Plan du site
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-md uppercase mb-2">Contact</h4>
            <p className="text-white/70 text-body-md leading-relaxed">
              Pour toute demande de renseignements ou visite privée.
            </p>
            <a className="text-white hover:underline break-all" href="mailto:contact@lecampus-paris.fr">
              contact@lecampus-paris.fr
            </a>
          </div>
        </div>
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white/60 text-sm">© 2026 Le Campus Paris. Tous droits réservés.</span>
          <div className="flex gap-4">
            <a href="#" aria-label="Partager">
              <span className="material-symbols-outlined text-white/60 hover:text-white cursor-pointer transition-colors">share</span>
            </a>
            <a href="mailto:contact@lecampus-paris.fr" aria-label="Email">
              <span className="material-symbols-outlined text-white/60 hover:text-white cursor-pointer transition-colors">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
