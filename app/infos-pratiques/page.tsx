import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ScrollChrome from '@/components/ScrollChrome';

export const metadata: Metadata = {
  title: 'Informations pratiques — Le Campus Paris | Accès, transports, localisation',
  description:
    "Accès et localisation du Campus Paris : 6-8 rue des 3 Fontanot, 92000 Nanterre. RER Nanterre-Préfecture à 6 min à pied, La Défense à 9 min, parking de 320 places et local vélos sécurisé.",
  keywords: "accès Campus Paris, Nanterre, RER Nanterre-Préfecture, La Défense, parking, transports, localisation, plan d'accès",
  alternates: { canonical: 'https://le-campus-paris.fr/infos-pratiques' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Campus Paris',
    title: 'Informations pratiques — Le Campus Paris',
    description:
      '6-8 rue des 3 Fontanot, 92000 Nanterre. RER Nanterre-Préfecture à 6 min à pied, La Défense à 9 min. Parking et local vélos sur place.',
    url: 'https://le-campus-paris.fr/infos-pratiques',
    images: ['https://le-campus-paris.fr/assets/interieur.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Informations pratiques — Le Campus Paris',
    description: 'Accès, transports et localisation du Campus Paris à Nanterre, aux portes de La Défense.',
    images: ['https://le-campus-paris.fr/assets/interieur.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Place', 'LocalBusiness'],
  name: 'Le Campus Paris',
  url: 'https://le-campus-paris.fr/infos-pratiques',
  image: 'https://le-campus-paris.fr/assets/interieur.webp',
  description:
    'Campus opéré nouvelle génération à Nanterre, aux portes de La Défense. RER Nanterre-Préfecture à 6 min à pied, La Défense à 9 min, parking de 320 places et local vélos sécurisé.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6-8 rue des 3 Fontanot',
    postalCode: '92000',
    addressLocality: 'Nanterre',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.8924,
    longitude: 2.2197,
  },
  areaServed: 'Île-de-France',
  publicAccess: true,
};

export default function InfosPratiquesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollChrome
        dots={[
          { id: 'hero', label: 'Aperçu' },
          { id: 'localisation', label: 'Localisation' },
          { id: 'transports', label: 'Transports' },
          { id: 'contact', label: 'Contact' },
        ]}
      />
      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="hero">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary-container/10 text-secondary rounded-full border border-secondary/20 mb-md">
            <span className="font-label-md uppercase tracking-widest">Infos pratiques</span>
          </div>
          <h1 className="font-headline-2xl text-headline-lg-mobile md:text-headline-2xl leading-tight max-w-[48rem]">
            Un campus aux portes de Paris, <span className="text-secondary">parfaitement connecté.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[42rem] mt-md">
            À Nanterre, à quelques minutes de La Défense, Le Campus Paris bénéficie d&apos;une accessibilité exceptionnelle en
            transports en commun comme en voiture.
          </p>
        </section>

        {/* Localisation + carte */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-2xl" id="localisation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-stretch">
            <div className="glass-card rounded-2xl p-xl flex flex-col justify-center reveal-left">
              <span className="font-label-sm uppercase tracking-widest text-secondary mb-2 block">Adresse</span>
              <h2 className="font-headline-lg text-headline-lg mb-4">Le Campus Paris</h2>
              <p className="font-body-lg text-on-surface-variant mb-md">
                6-8 rue des 3 Fontanot
                <br />
                92000 Nanterre
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=6-8+rue+des+3+Fontanot+92000+Nanterre"
                  target="_blank"
                  rel="noopener"
                  className="glass-blue inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-label-md transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">directions</span> Itinéraire
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-outline text-on-surface px-6 py-3 rounded-full font-label-md hover:bg-surface-container transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">event</span> Réserver une visite
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-outline-variant min-h-[340px] shadow-sm reveal-right">
              <iframe
                title="Localisation du Campus Paris — 6-8 rue des 3 Fontanot, Nanterre"
                src="https://www.google.com/maps?q=6-8+rue+des+3+Fontanot,+92000+Nanterre&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 340 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Accessibilité transports */}
        <section className="py-2xl px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="transports">
          <div className="max-w-container-max mx-auto">
            <div className="mb-xl">
              <span className="font-label-sm uppercase tracking-widest text-secondary mb-2 block">Accessibilité</span>
              <h2 className="font-headline-xl text-headline-xl">Venir au Campus</h2>
              <div className="w-24 h-1 bg-secondary rounded-full mt-3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter" data-stagger="up">
              <div className="glass-card rounded-2xl p-xl">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/15 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-secondary">directions_subway</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-4">Transports en commun</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">train</span> RER A —
                    Nanterre-Préfecture, à 450 m (6 min à pied)
                  </li>
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">subway</span> Métro
                    Nanterre-La-Folie, à 750 m (ligne 15, prévu en 2031)
                  </li>
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">location_city</span> La Défense à 9
                    min, Charles-de-Gaulle-Étoile à 16 min
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-xl">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/15 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-secondary">directions_car</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-4">En voiture</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">local_parking</span> Parking
                    surveillé de 320 places, à 100 m du bâtiment
                  </li>
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">add_road</span> Accès autoroute A14
                    / A86 à environ 2 km
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-xl">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/15 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-secondary">directions_bike</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-4">Mobilités douces</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">pedal_bike</span> Local vélos
                    sécurisé accessible à proximité immédiate
                  </li>
                  <li className="flex items-start gap-3 text-on-surface-variant font-body-md">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">directions_walk</span> Quartier
                    piéton, commerces et services à quelques minutes à pied
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Les alentours */}
        <section className="py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-xl">
            <span className="font-label-sm uppercase tracking-widest text-secondary mb-2 block">L&apos;environnement</span>
            <h2 className="font-headline-xl text-headline-xl">Les alentours du site</h2>
            <div className="w-24 h-1 bg-secondary rounded-full mt-3"></div>
            <p className="font-body-md text-on-surface-variant max-w-[42rem] mt-4">
              À deux pas du campus, le quartier offre une vie de quartier dense : restaurants, cafés, brasseries et commerces de
              proximité, dans un environnement vivant proche de La Défense.
            </p>
          </div>
          <div className="slider" data-slider="">
            <div className="slider-track" data-slider-track="">
              <div className="slider-slide glass-card rounded-2xl overflow-hidden">
                <img src="/assets/parc-andre-malraux.webp" alt="Parc André Malraux" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
                <div className="p-xl">
                  <h3 className="font-title-lg text-title-lg mb-1">Parc André Malraux</h3>
                  <p className="font-body-md text-on-surface-variant">25 hectares de respiration urbaine à proximité immédiate.</p>
                </div>
              </div>
              <div className="slider-slide glass-card rounded-2xl overflow-hidden">
                <img
                  src="/assets/westfield-cnit.webp"
                  alt="Westfield Les 4 Temps / CNIT"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-xl">
                  <h3 className="font-title-lg text-title-lg mb-1">Westfield Les 4 Temps / CNIT</h3>
                  <p className="font-body-md text-on-surface-variant">Restauration, sport, loisirs et services du quotidien.</p>
                </div>
              </div>
              <div className="slider-slide glass-card rounded-2xl overflow-hidden">
                <img
                  src="/assets/paris-la-defense-arena.webp"
                  alt="Paris La Défense Arena"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-xl">
                  <h3 className="font-title-lg text-title-lg mb-1">Paris La Défense Arena</h3>
                  <p className="font-body-md text-on-surface-variant">Une destination culturelle et sportive incontournable.</p>
                </div>
              </div>
              <div className="slider-slide glass-card rounded-2xl overflow-hidden">
                <img
                  src="/assets/terrasses-de-larche.webp"
                  alt="Les Terrasses de l'Arche"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-xl">
                  <h3 className="font-title-lg text-title-lg mb-1">Les Terrasses de l&apos;Arche</h3>
                  <p className="font-body-md text-on-surface-variant">De nombreuses options de restauration à proximité.</p>
                </div>
              </div>
            </div>
            <div className="slider-controls">
              <button className="slider-btn" data-slider-prev="" aria-label="Précédent" type="button">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="slider-btn" data-slider-next="" aria-label="Suivant" type="button">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-3xl px-margin-mobile md:px-margin-desktop bg-on-surface text-surface-bright">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-headline-xl text-headline-xl mb-md">Une question ? Réservons votre visite.</h2>
            <p className="font-body-lg opacity-80 mb-xl max-w-[42rem] mx-auto">
              Notre équipe vous accompagne pour toute demande de renseignements ou pour organiser une visite privée du campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
              <a
                href="mailto:contact@lecampus-paris.fr"
                className="magnetic glass-blue inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-title-lg transition-all transform hover:-translate-y-1"
              >
                <span className="material-symbols-outlined">mail</span> contact@lecampus-paris.fr
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="site" />
    </>
  );
}
