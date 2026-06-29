import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ScrollChrome from '@/components/ScrollChrome';
import SectionTitle from '@/components/SectionTitle';
import AxonometriePlan from '@/components/AxonometriePlan';

export const metadata: Metadata = {
  title: 'Les Espaces — Le Campus Paris | Bâtiment neuf, 8 niveaux, ouverture 2026',
  description:
    "Découvrez les espaces du Campus Paris : un bâtiment neuf livré en 2026, classé ERP type R de 1ère catégorie, conçu pour accueillir 2 200 personnes. 8 niveaux, terrasses végétalisées, rooftop, certifications environnementales.",
  keywords: 'espaces campus Paris, bâtiment formation, ERP, rooftop, terrasses, certification HQE, BREEAM, plateaux enseignement',
  alternates: { canonical: 'https://le-campus-paris.fr/espaces' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Campus Paris',
    title: 'Les Espaces — Le Campus Paris',
    description:
      "Un bâtiment neuf de 8 niveaux, conçu pour accueillir 2 200 personnes. Plateaux d'enseignement, rooftop, terrasses végétalisées et certifications environnementales.",
    url: 'https://le-campus-paris.fr/espaces',
    images: ['https://le-campus-paris.fr/assets/rooftop.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Les Espaces — Le Campus Paris',
    description: "Un bâtiment neuf de 8 niveaux, conçu pour accueillir 2 200 personnes. Ouverture 2026.",
    images: ['https://le-campus-paris.fr/assets/rooftop.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Le Campus Paris',
  description:
    "Bâtiment neuf livré en 2026, classé ERP type R de 1ère catégorie, conçu pour accueillir 2 200 personnes. 8 niveaux, plateaux d'enseignement, rooftop et terrasses végétalisées.",
  url: 'https://le-campus-paris.fr/espaces',
  image: 'https://le-campus-paris.fr/assets/rooftop.webp',
  maximumAttendeeCapacity: 2200,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Surface totale', value: '8 143 m²' },
    { '@type': 'LocationFeatureSpecification', name: 'Terrasses végétalisées', value: '776 m²' },
    { '@type': 'LocationFeatureSpecification', name: 'Rooftop mutualisé', value: '400 m²' },
    { '@type': 'LocationFeatureSpecification', name: 'Niveaux', value: '8 étages' },
  ],
};

export default function EspacesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollChrome
        dots={[
          { id: 'hero', label: 'Aperçu' },
          { id: 'niveaux', label: 'Structure des niveaux' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'contact', label: 'Contact' },
        ]}
      />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section
          className="relative w-full py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center"
          id="hero"
        >
          <div className="space-y-xl z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary-container/10 text-secondary rounded-full border border-secondary/20">
              <span className="font-label-md uppercase tracking-widest">OUVERTURE 2026</span>
            </div>
            <h1 className="font-headline-2xl text-headline-lg-mobile md:text-headline-2xl leading-tight">
              UN CAMPUS ALLIANT <br />
              <span className="text-secondary">CONFORT ET MODERNITÉ</span>
            </h1>
            <p id="hero-intro-text" className="font-body-lg text-body-lg text-on-surface-variant max-w-[36rem] notranslate" translate="no">
              LE CAMPUS EST UN IMMEUBLE NEUF LIVRÉ EN 2026, CLASSÉ ERP TYPE R DE 1ÈRE CATÉGORIE – EISCP, CONÇU POUR ACCUEILLIR 2 200
              PERSONNES.
            </p>
            <div className="flex flex-wrap gap-md">
              <div className="flex items-center gap-2 font-label-md text-on-surface">
                <span className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">groups</span>
                </span>{' '}
                2 200 PERSONNES
              </div>
              <div className="flex items-center gap-2 font-label-md text-on-surface">
                <span className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">square_foot</span>
                </span>{' '}
                8 143 M²
              </div>
            </div>
          </div>
          <div className="relative perspective-grid">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">
                  <SectionTitle as="h2" tone="light" className="text-headline-lg" lead="Les chiffres" rest="clés" />
                  <div className="h-1 w-12 bg-secondary/20 rounded-full hidden md:block"></div>
                </div>

                <div className="grid grid-cols-2 gap-x-gutter gap-y-8">
                  <div className="space-y-1 min-w-0">
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-widest opacity-80">Surface Totale</p>
                    <p className="text-headline-xl font-bold text-secondary leading-none">
                      8&nbsp;143<span className="text-title-lg font-semibold align-baseline ml-1">m²</span>
                    </p>
                    <p className="text-label-md uppercase text-on-surface-variant/60 font-medium">dont 850 m² mutualisés</p>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-widest opacity-80">Terrasses et espaces verts</p>
                    <p className="text-headline-xl font-bold text-secondary leading-none">
                      776<span className="text-title-lg font-semibold align-baseline ml-1">m²</span>
                    </p>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-widest opacity-80">Capacité</p>
                    <p className="text-headline-xl font-bold text-secondary leading-none">2&nbsp;200</p>
                    <p className="text-label-md uppercase text-on-surface-variant/60 font-medium">Personnes</p>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-label-sm uppercase text-on-surface-variant tracking-widest opacity-80">Niveaux</p>
                    <p className="text-headline-xl font-bold text-secondary leading-none">8</p>
                    <p className="text-label-md uppercase text-on-surface-variant/60 font-medium">Étages</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Descriptive Content */}
        <section className="glass-card py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-5 md:mx-auto rounded-3xl my-xl">
          <div className="max-w-4xl mx-auto text-center space-y-md">
            <SectionTitle as="h2" tone="light" className="text-headline-xl" lead="Conçu" rest="pour l'excellence pédagogique" />
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Développé sur 8 niveaux et totalisant 8 143 m², Le Campus intègre au rez-de-chaussée un socle serviciel de 850 m²
              comprenant un hall d&apos;accueil, une cafétéria et une brasserie attenante. Le R+1, entièrement dédié aux services,
              propose un business center, un auditorium ainsi qu&apos;un fitness center accessible à l&apos;ensemble des occupants.
              Les étages R+2 à R+7 sont composés de six plateaux d&apos;environ 1 000 m² dédiés à l&apos;enseignement et à la
              formation, bénéficiant d&apos;un accès à des terrasses végétalisées.
            </p>
          </div>
        </section>

        {/* Plan axonométrique d'un plateau type */}
        <section className="py-2xl my-xl space-y-xl" id="plan-plateau">
          <div className="glass-blue text-white max-w-container-max mx-5 md:mx-auto px-margin-mobile md:px-margin-desktop py-2xl rounded-3xl">
            <SectionTitle as="h3" tone="blue" className="text-headline-lg mb-6" lead="Un plateau" rest="pensé dans le moindre détail" />
            <p className="font-body-md leading-relaxed opacity-90">
              Chaque plateau d&apos;enseignement d&apos;environ 1 000 m² est conçu comme un écosystème complet et modulable. Salles
              de cours de tailles variées, gradins, espaces de travail collaboratif et îlots informels s&apos;articulent autour
              d&apos;une circulation fluide et lumineuse. Une trame ouverte qui laisse à chaque établissement la liberté de
              composer ses espaces au gré de ses formats pédagogiques — du cours magistral au travail en petits groupes.
            </p>
          </div>

          <AxonometriePlan />

          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-secondary text-3xl">grid_view</span>
              <h4 className="font-label-md uppercase tracking-tight">Salles modulables</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Des configurations adaptables, du petit atelier au grand amphithéâtre.</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-secondary text-3xl">groups</span>
              <h4 className="font-label-md uppercase tracking-tight">Espaces collaboratifs</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Des zones ouvertes pour le travail en équipe et les échanges informels.</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-secondary text-3xl">stairs</span>
              <h4 className="font-label-md uppercase tracking-tight">Gradins &amp; amphis</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Des espaces gradinés pour conférences, projections et grands rassemblements.</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-secondary text-3xl">deck</span>
              <h4 className="font-label-md uppercase tracking-tight">Détente &amp; terrasses</h4>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Des respirations et un accès direct aux terrasses végétalisées.</p>
            </div>
          </div>
        </section>

        {/* Level Breakdown Bento Grid */}
        <section className="py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="niveaux">
          <div className="mb-xl">
            <SectionTitle as="h3" tone="light" className="text-headline-lg" lead="Structure" rest="des niveaux" />
          </div>

          <div className="space-y-gutter">
            {/* Rez-de-chaussée */}
            <div id="niveau-rdc" className="glass-card group rounded-2xl overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 overflow-hidden aspect-video md:aspect-auto md:min-h-[280px]">
                <img
                  src="/assets/rez-de-chaussee.webp"
                  alt="Hall d'accueil du rez-de-chaussée"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
              <div className="w-full md:w-1/2 p-xl flex flex-col justify-center">
                <span className="font-label-sm uppercase tracking-widest text-secondary mb-1 block">Niveau 0</span>
                <h4 className="font-title-lg text-title-lg mb-3">Rez-de-chaussée</h4>
                <p className="font-body-md text-on-surface-variant mb-md">
                  Socle serviciel de 850 m² comprenant hall d&apos;accueil, cafétéria et brasserie attenante.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full font-label-md">Accueil</span>
                  <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full font-label-md">Barista</span>
                  <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full font-label-md">Coworking</span>
                  <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full font-label-md">Cafétéria</span>
                  <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full font-label-md">Comptoir</span>
                </div>
              </div>
            </div>

            {/* R+1 + R+2-7 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div id="niveau-r1" className="glass-card group rounded-2xl overflow-hidden flex flex-col">
                <div className="overflow-hidden aspect-video">
                  <img
                    src="/assets/premier-etage.webp"
                    alt="Premier Étage Interior"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-xl flex flex-col flex-1">
                  <span className="font-label-sm uppercase tracking-widest text-secondary mb-1 block">Niveau 1</span>
                  <h4 className="font-title-lg text-title-lg mb-3">Premier Étage mutualisé</h4>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed mb-md">
                    Entièrement dédié aux services : business center, auditorium et espace wellness.
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                      <span className="material-symbols-outlined text-[20px] text-secondary">fitness_center</span>{' '}
                      <span>Espace wellness</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                      <span className="material-symbols-outlined text-[20px] text-secondary">theater_comedy</span>{' '}
                      <span>Auditorium</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                      <span className="material-symbols-outlined text-[20px] text-secondary">hub</span> <span>Business Center</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="niveau-enseignement" className="glass-card group rounded-2xl overflow-hidden flex flex-col">
                <div className="overflow-hidden aspect-video">
                  <img
                    src="/assets/enseignement.webp"
                    alt="Étage d'enseignement du Campus Paris"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-xl flex flex-col flex-1">
                  <span className="font-label-sm uppercase tracking-widest text-secondary mb-1 block">Niveaux 2-7</span>
                  <h4 className="font-title-lg text-title-lg mb-3">Étages d&apos;enseignement</h4>
                  <p className="font-body-sm text-on-surface-variant mb-md">
                    Six plateaux de 1 000 m² pour la formation, avec terrasses privatives à chaque niveau.
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Salles de cours modulables
                    </li>
                    <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Salles des professeurs
                    </li>
                    <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Salles d&apos;étude
                    </li>
                    <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Espaces détente
                    </li>
                    <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Terrasses
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Rooftop */}
            <div id="niveau-rooftop" className="glass-card group rounded-2xl overflow-hidden flex flex-col md:flex-row-reverse">
              <div className="w-full md:w-1/2 overflow-hidden aspect-video md:aspect-auto md:min-h-[260px]">
                <img
                  src="/assets/rooftop.webp"
                  alt="Rooftop terrasse végétalisée"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="w-full md:w-1/2 p-xl flex flex-col justify-center">
                <span className="font-label-sm uppercase tracking-widest text-secondary mb-1 block">Niveau 8</span>
                <h4 className="font-title-lg text-title-lg mb-3">Rooftop mutualisé</h4>
                <p className="font-body-md text-on-surface-variant mb-md">
                  Un espace extérieur privilégié de 400 m², entièrement aménagé et végétalisé pour la détente et l&apos;événementiel.
                </p>
                <div className="inline-flex items-center gap-2 text-secondary font-label-md">
                  <span className="material-symbols-outlined">nature_people</span> 400 m² de rooftop
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Performance */}
        <section
          className="py-3xl px-margin-mobile md:px-margin-desktop bg-[#213145] text-white overflow-hidden relative"
          id="certifications"
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2"></div>
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2xl relative z-10">
            <div className="space-y-xl">
              <SectionTitle as="h2" tone="dark" className="text-headline-xl" lead="Une performance" rest="environnementale certifiée" />
              <p className="font-body-lg opacity-80">
                L&apos;immeuble privilégie le confort d&apos;usage avec des volumes naturellement lumineux. Le projet s&apos;inscrit dans
                une démarche de haute qualité environnementale.
              </p>
              <div className="grid grid-cols-2 gap-gutter">
                <div className="glass-pill p-md rounded-xl flex flex-col items-center text-center">
                  <img alt="HQE Logo" className="h-16 mb-4 filter brightness-0 invert" src="/assets/hqe-logo.svg" />
                  <span className="font-label-md">Bâtiment Durable</span>
                </div>
                <div className="glass-pill p-md rounded-xl flex flex-col items-center text-center">
                  <img alt="BREEAM Logo" className="h-16 mb-4 filter brightness-0 invert" src="/assets/breeam-logo.png" />
                  <span className="font-label-md">BREEAM Excellent</span>
                </div>
              </div>
            </div>
            <div className="glass-pill rounded-3xl p-xl space-y-md">
              <h5 className="font-title-lg text-title-lg">Chiffres clés du projet</h5>
              <div className="space-y-md">
                <div className="flex justify-between items-end border-b border-surface-bright/10 pb-md">
                  <span className="font-body-md opacity-60">Surface Totale</span>
                  <span className="font-headline-lg">
                    <span data-counter="8143" data-counter-suffix=" m²">
                      0
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-bright/10 pb-md">
                  <span className="font-body-md opacity-60">dont espace mutualisé</span>
                  <span className="font-headline-lg">
                    <span data-counter="850" data-counter-suffix=" m²">
                      0
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-bright/10 pb-md">
                  <span className="font-body-md opacity-60">Capacité d&apos;accueil</span>
                  <span className="font-headline-lg">
                    <span data-counter="2200" data-counter-suffix=" pers.">
                      0
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-bright/10 pb-md">
                  <span className="font-body-md opacity-60">Terrasses végétalisées</span>
                  <span className="font-headline-lg">
                    <span data-counter="776" data-counter-suffix=" m²">
                      0
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-bright/10 pb-md">
                  <span className="font-body-md opacity-60">Surface moyenne étage</span>
                  <span className="font-headline-lg">
                    <span data-counter="1000" data-counter-suffix=" m²">
                      0
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA / Contact */}
        <section className="py-3xl px-margin-mobile md:px-margin-desktop text-center max-w-container-max mx-auto" id="contact">
          <SectionTitle as="h2" tone="light" className="text-headline-xl mb-md" lead="Prêt" rest="à découvrir votre futur campus" end=" ?" />
          <p className="font-body-lg text-on-surface-variant mb-xl max-w-[42rem] mx-auto">
            Nos experts vous accompagnent dans la découverte de ces espaces innovants conçus pour le futur de la formation.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <button
              className="magnetic glass-blue text-white px-8 py-4 rounded-full font-title-lg transition-all transform hover:-translate-y-1"
              data-open-contact-modal=""
            >
              Réserver une visite
            </button>
            <a
              href="/assets/brochure-le-campus-paris.pdf"
              target="_blank"
              rel="noopener"
              className="magnetic border-2 border-outline text-on-surface px-8 py-4 rounded-full font-title-lg hover:bg-surface-container transition-all"
            >
              Télécharger la brochure
            </a>
            <a
              href="/assets/plans-techniques.pdf"
              target="_blank"
              rel="noopener"
              className="magnetic border-2 border-outline text-on-surface px-8 py-4 rounded-full font-title-lg hover:bg-surface-container transition-all"
            >
              Plans techniques
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
