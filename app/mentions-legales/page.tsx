import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mentions légales — Le Campus Paris',
  description: 'Mentions légales et politique de confidentialité du site Le Campus Paris.',
  alternates: { canonical: 'https://le-campus-paris.fr/mentions-legales' },
  robots: { index: false },
};

/*
 * Les champs entre crochets sont à compléter avec les informations
 * légales de la société avant mise en ligne.
 */
export default function MentionsLegalesPage() {
  return (
    <>
      <main className="pt-24 md:pt-28">
        <section className="py-2xl px-margin-mobile md:px-margin-desktop max-w-[52rem] mx-auto">
          <h1 className="font-headline-2xl text-headline-lg-mobile md:text-headline-2xl leading-tight mb-12 uppercase">
            Mentions <span className="text-secondary">légales</span>
          </h1>

          <div className="space-y-10 font-body-md text-on-surface-variant leading-relaxed">
            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface mb-3">Éditeur du site</h2>
              <p>
                Le Campus Paris
                <br />
                [Forme juridique, capital social]
                <br />
                Siège social : 6-8 rue des 3 Fontanot, 92000 Nanterre
                <br />
                [SIREN / RCS, n° TVA intracommunautaire]
                <br />
                Directeur de la publication : [nom]
                <br />
                Contact : <a className="text-accent-blue hover:underline" href="mailto:contact@lecampus-paris.fr">contact@lecampus-paris.fr</a>
              </p>
            </div>

            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface mb-3">Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc.
                <br />
                440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis
                <br />
                <a className="text-accent-blue hover:underline" href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                  vercel.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface mb-3">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus de ce site (textes, images, plans, logos, vidéos) est la propriété exclusive de
                Le Campus Paris ou de ses partenaires. Toute reproduction, représentation ou diffusion, totale ou partielle,
                sans autorisation écrite préalable est interdite. Les visuels 3D sont non contractuels.
              </p>
            </div>

            <div id="confidentialite">
              <h2 className="font-title-lg text-title-lg text-on-surface mb-3">Politique de confidentialité</h2>
              <p className="mb-3">
                Les informations transmises via les formulaires du site (nom, prénom, e-mail, téléphone, établissement) sont
                utilisées uniquement pour répondre à votre demande de contact ou vous envoyer la brochure. Elles sont
                traitées par nos outils de gestion de la relation client (HubSpot) et d&apos;envoi d&apos;e-mails (Resend) et
                ne sont ni revendues ni communiquées à des tiers à des fins commerciales.
              </p>
              <p>
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de
                rectification et de suppression de vos données. Pour l&apos;exercer, écrivez-nous à{' '}
                <a className="text-accent-blue hover:underline" href="mailto:contact@lecampus-paris.fr">contact@lecampus-paris.fr</a>.
              </p>
            </div>

            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface mb-3">Cookies</h2>
              <p>
                Ce site n&apos;utilise pas de cookies de suivi publicitaire. Seuls des cookies techniques strictement
                nécessaires au fonctionnement du site peuvent être déposés.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
