import Link from 'next/link';

/**
 * Le footer V1 différait légèrement entre index.html (variant "concept")
 * et espaces.html / infos-pratiques.html (variant "site", avec bloc
 * Contact + email). Reproduits ici à l'identique selon la page.
 */
export default function Footer({ variant }: { variant: 'concept' | 'site' }) {
  if (variant === 'concept') {
    return (
      <footer className="bg-inverse-surface border-t border-white/5">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter py-section-gap">
            <div className="col-span-1 md:col-span-1">
              <div className="font-headline-md text-surface-bright font-bold mb-6">LE CAMPUS PARIS</div>
              <p className="text-surface-variant opacity-80 text-body-md leading-relaxed">
                Opérateur de campus nouvelle génération pour les établissements d&apos;enseignement supérieur.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-surface-bright font-label-md uppercase mb-2">Navigation</h4>
              <Link className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="/">
                Le concept
              </Link>
              <Link className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="/espaces">
                Les espaces
              </Link>
              <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#contact">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-surface-bright font-label-md uppercase mb-2">Légal</h4>
              <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#">
                Mentions Légales
              </a>
              <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#">
                Politique de Confidentialité
              </a>
              <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#">
                Plan du site
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-surface-bright font-label-md uppercase mb-2">Réseaux</h4>
              <div className="flex gap-4">
                <a href="#" aria-label="Partager">
                  <span className="material-symbols-outlined text-surface-bright opacity-60 hover:opacity-100 cursor-pointer">share</span>
                </a>
                <a href="#" aria-label="Email">
                  <span className="material-symbols-outlined text-surface-bright opacity-60 hover:opacity-100 cursor-pointer">mail</span>
                </a>
              </div>
            </div>
          </div>
          <div className="py-8 border-t border-white/10 text-center md:text-left">
            <span className="text-surface-variant opacity-60 text-sm">© 2026 Le Campus Paris. Tous droits réservés.</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-inverse-surface dark:bg-on-surface text-surface-bright dark:text-surface-container-lowest font-body-md text-body-md full-width mt-2xl">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter py-2xl">
          <div className="space-y-md">
            <div className="font-headline-md text-surface-bright font-bold">Le Campus Paris</div>
            <p className="opacity-60 font-body-sm">
              L&apos;excellence au service de la formation et de l&apos;innovation pédagogique aux portes de Paris.
            </p>
          </div>
          <div className="space-y-md">
            <h6 className="font-label-md uppercase tracking-widest text-secondary">Navigation</h6>
            <ul className="space-y-2">
              <li>
                <Link className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="/">
                  Le concept
                </Link>
              </li>
              <li>
                <Link className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="/espaces">
                  Les espaces
                </Link>
              </li>
              <li>
                <Link className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="/infos-pratiques">
                  Informations pratiques
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-md">
            <h6 className="font-label-md uppercase tracking-widest text-secondary">Légal</h6>
            <ul className="space-y-2">
              <li>
                <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#">
                  Mentions Légales
                </a>
              </li>
              <li>
                <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#">
                  Politique de Confidentialité
                </a>
              </li>
              <li>
                <a className="text-surface-variant opacity-80 hover:text-surface-bright hover:underline transition-all" href="#">
                  Plan du site
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-md">
            <h6 className="font-label-md uppercase tracking-widest text-secondary">Contact</h6>
            <p className="font-body-sm opacity-60">Pour toute demande de renseignements ou visite privée.</p>
            <a className="block font-title-lg text-secondary hover:underline break-all" href="mailto:contact@lecampus-paris.fr">
              contact@lecampus-paris.fr
            </a>
          </div>
        </div>
        <div className="border-t border-surface-variant/10 py-md flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="opacity-60 text-label-sm">© 2026 Le Campus Paris. Tous droits réservés.</div>
          <div className="flex gap-md">
            <a className="opacity-60 hover:opacity-100 transition-opacity" href="#" aria-label="Partager">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a className="opacity-60 hover:opacity-100 transition-opacity" href="#" aria-label="Réseaux sociaux">
              <span className="material-symbols-outlined">linked_camera</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
