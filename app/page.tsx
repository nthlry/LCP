import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ScrollChrome from '@/components/ScrollChrome';
import HeroParallax from '@/components/HeroParallax';
import SectionTitle from '@/components/SectionTitle';
import CampusAsService from '@/components/CampusAsService';

export const metadata: Metadata = {
  title: "Le Campus Paris — Campus opéré nouvelle génération pour l'enseignement",
  description:
    "Le Campus Paris est la première infrastructure entièrement opérée dédiée à l'éducation et à la formation : espaces modulaires, services intégrés, exploitation prise en charge. Vous développez votre école, nous opérons le campus.",
  keywords:
    'campus, enseignement supérieur, formation, espaces de formation, campus opéré, école, Paris, location espaces pédagogiques',
  alternates: { canonical: 'https://le-campus-paris.fr/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Campus Paris',
    title: 'Le Campus Paris — Campus opéré nouvelle génération',
    description:
      "La première infrastructure entièrement opérée dédiée à l'éducation et à la formation. Vous développez votre école, nous opérons le campus.",
    url: 'https://le-campus-paris.fr/',
    images: ['https://le-campus-paris.fr/assets/interieur.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Campus Paris — Campus opéré nouvelle génération',
    description: "La première infrastructure entièrement opérée dédiée à l'éducation et à la formation.",
    images: ['https://le-campus-paris.fr/assets/interieur.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Le Campus Paris',
  url: 'https://le-campus-paris.fr/',
  logo: 'https://le-campus-paris.fr/assets/logo.png',
  description:
    "Opérateur de campus nouvelle génération pour les établissements d'enseignement supérieur et de formation. Première infrastructure entièrement opérée dédiée à l'éducation : espaces modulaires, services intégrés, exploitation prise en charge.",
  areaServed: 'FR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6-8 rue des 3 Fontanot',
    postalCode: '92000',
    addressLocality: 'Nanterre',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  knowsAbout: ['Enseignement supérieur', 'Formation professionnelle', 'Espaces de formation', 'Campus opéré'],
};

export default function ConceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollChrome
        dots={[
          { id: 'hero', label: 'Accueil' },
          { id: 'concept', label: 'Le concept' },
          { id: 'proof', label: "L'expérience Campus" },
          { id: 'contact', label: 'Contact' },
        ]}
      />
      <main>
        {/* ============================================================
            HERO IMMERSIF
            ============================================================ */}
        <section className="relative overflow-hidden border-b border-stone" id="hero">
          <HeroParallax alt="Intérieur du Campus Paris" src="/assets/interieur.webp" videoSrc="/assets/hero.mp4">
            <div className="hero-shrink-overlay"></div>

            <span
              className="floating absolute top-[18%] left-[10%] w-24 h-24 rounded-full bg-white/20 blur-2xl z-10 pointer-events-none"
              aria-hidden="true"
            ></span>
            <span
              className="floating float-slow float-delay absolute top-[28%] right-[14%] w-32 h-32 rounded-3xl bg-accent-blue/25 blur-2xl z-10 pointer-events-none"
              aria-hidden="true"
            ></span>
            <span
              className="floating float-fast absolute bottom-[22%] left-[18%] w-16 h-16 rounded-full bg-white/20 blur-2xl z-10 pointer-events-none"
              aria-hidden="true"
            ></span>

            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-container-max px-margin-mobile md:px-margin-desktop w-full text-center text-white">
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-tight">
                  FREE YOUR MIND
                </h1>
                <p className="font-headline-md text-xl md:text-2xl font-normal text-white/90 mb-12 reveal-fade">to focus on teaching</p>
                <div className="flex flex-col md:flex-row gap-gutter justify-center items-center mt-4">
                  <a
                    className="glass-blue text-white px-10 py-5 rounded-lg font-label-md transition-all w-full md:w-auto text-center inline-block"
                    href="#concept"
                  >
                    Découvrir le concept
                  </a>
                  <Link
                    className="glass-pill text-white px-10 py-5 rounded-lg font-label-md transition-all w-full md:w-auto text-center inline-block"
                    href="/espaces"
                  >
                    Visiter nos espaces
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
              <span className="material-symbols-outlined text-white">keyboard_arrow_down</span>
            </div>
          </HeroParallax>
        </section>

        {/* Chiffres clés — rappel */}
        <section className="py-section-gap bg-white border-b border-stone" id="chiffres" aria-label="Chiffres clés">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter items-center text-center">
              <div className="space-y-2">
                <p className="font-headline-2xl text-headline-lg md:text-headline-xl text-accent-blue leading-none">
                  <span data-counter="2200">0</span>
                </p>
                <p className="font-label-md uppercase tracking-widest text-on-surface-variant">Étudiants</p>
              </div>
              <div className="space-y-2">
                <p className="font-headline-2xl text-headline-lg md:text-headline-xl text-accent-blue leading-none">
                  <span data-counter="8600" data-counter-suffix=" m²">0</span>
                </p>
                <p className="font-label-md uppercase tracking-widest text-on-surface-variant">Opérés</p>
              </div>
              <div className="space-y-2">
                <p className="font-headline-2xl text-headline-lg md:text-headline-xl text-accent-blue leading-none">
                  <span data-counter="400" data-counter-suffix=" m²">0</span>
                </p>
                <p className="font-label-md uppercase tracking-widest text-on-surface-variant">De rooftop</p>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <p className="font-title-lg text-title-lg leading-tight uppercase">
                  Premier campus opéré <span className="text-accent-blue">de France</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section className="py-section-gap bg-white" id="concept">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <SectionTitle as="h2" tone="light" className="text-headline-lg mb-8" lead="Le" rest="concept" />
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  L&apos;excellence opérationnelle au service de l&apos;éducation.
                </p>
              </div>
              <div className="lg:col-span-8 space-y-stack-lg">
                <div className="glass-blue text-white p-8 md:p-12 rounded-xl mb-stack-lg reveal-up">
                  <p className="font-headline-lg text-headline-lg leading-tight uppercase">
                    Nous sommes la <span className="text-white font-black">première infrastructure entièrement opérée</span>{' '}dédiée à
                    l&apos;éducation et à la formation.
                  </p>
                  <p className="mt-8 text-xl font-medium leading-relaxed opacity-90">
                    Des espaces modulaires, des services intégrés, une exploitation entièrement prise en charge. Les établissements
                    apportent leur vision pédagogique et se concentrent sur l&apos;essentiel : <span className="font-bold">l&apos;enseignement</span>.
                  </p>
                </div>

                <div className="mb-stack-lg space-y-12">
                  <SectionTitle
                    as="h3"
                    tone="light"
                    className="text-headline-lg reveal-left"
                    lead="Le campus"
                    rest="devient un levier de croissance, d'image et d'expérience"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter" data-stagger="up">
                    <div className="space-y-4">
                      <div className="text-accent-blue font-black text-4xl tracking-tighter">01.</div>
                      <h4 className="text-accent-blue font-bold uppercase tracking-tight">Accélérer le développement</h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Ouvrir rapidement de nouveaux programmes, accompagner la croissance sans rigidité et lancer de nouveaux formats{' '}
                        <span className="font-bold text-primary">sans immobiliser des années d&apos;investissement.</span>
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-accent-blue font-black text-4xl tracking-tighter">02.</div>
                      <h4 className="text-accent-blue font-bold uppercase tracking-tight">Renforcer l&apos;attractivité</h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Une expérience étudiante plus moderne, des lieux plus vivants et un environnement premium pour attirer étudiants,
                        intervenants et entreprises partenaires.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-accent-blue font-black text-4xl tracking-tighter">03.</div>
                      <h4 className="text-accent-blue font-bold uppercase tracking-tight">Simplifier le quotidien</h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Un interlocuteur unique, une infrastructure déjà opérationnelle et{' '}
                        <span className="font-bold text-primary">toute l&apos;exploitation du campus intégrée</span> : internet, accueil,
                        maintenance, services et gestion quotidienne.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-accent-blue pl-8 py-4 mt-stack-lg reveal-up">
                  <SectionTitle as="h3" tone="light" className="text-headline-lg mb-6 leading-tight" lead="Le monde" rest="de l'éducation a changé" />
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
                    Il évolue désormais plus vite que les modèles traditionnels d&apos;apprentissage. L&apos;intelligence artificielle, les
                    nouvelles technologies et les transformations des métiers redéfinissent les compétences en permanence. Ce que nous
                    apprenons aujourd&apos;hui peut devenir obsolète demain.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
                    Pour autant, la majorité des écoles et organismes de formation évoluent encore dans des modèles conçus pour un autre
                    monde : campus figés, baux longs, infrastructures lourdes, espaces peu adaptables et expériences étudiantes dépassées.
                    À cela s&apos;ajoute une autre contrainte majeure : les écoles doivent encore gérer seules l&apos;immobilier,
                    l&apos;exploitation, les services et toute la complexité quotidienne d&apos;un campus.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
                    Les méthodes d&apos;apprentissage évoluent en permanence. Les infrastructures actuelles, beaucoup moins.
                  </p>
                  <p className="font-headline-md text-headline-md text-accent-blue mt-12 uppercase">LE CAMPUS PARIS EST DIFFÉRENT.</p>
                  <p className="font-body-md text-on-surface-variant mt-6 leading-relaxed">
                    Nous sommes convaincus qu&apos;une école ne devrait plus avoir à porter seule l&apos;immobilier, l&apos;exploitation et
                    toute la gestion quotidienne d&apos;un campus, pour se concentrer sur son cœur de métier : la transmission. Les acteurs
                    de l&apos;éducation doivent pouvoir ouvrir rapidement de nouveaux programmes, adapter leurs espaces à leur croissance,
                    améliorer l&apos;expérience étudiante et se concentrer pleinement sur leur pédagogie. Nous concevons le campus comme un
                    service, un nouveau modèle dans lequel il devient une infrastructure opérée, flexible et évolutive. Un modèle conçu
                    pour permettre aux écoles d&apos;évoluer plus vite que les modèles traditionnels. Vous développez votre école. Nous
                    opérons le campus.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-gutter pt-stack-lg" data-stagger="up">
                  <div className="glass-card p-10 rounded-lg group">
                    <span className="material-symbols-outlined text-4xl text-accent-blue mb-6">school</span>
                    <h4 className="font-headline-md text-headline-md mb-4 uppercase tracking-tight">
                      Un campus adapté à tous types d&apos;établissements
                    </h4>
                    <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
                      Le Campus Paris s&apos;adresse aux acteurs de l&apos;apprentissage qui veulent se développer sans porter seuls la
                      complexité d&apos;un campus. Des structures qui cherchent à ouvrir, grandir, tester de nouveaux formats ou améliorer
                      leur expérience étudiante, sans être ralenties par l&apos;immobilier.
                    </p>
                    <ul className="mt-6 space-y-0 border-t border-stone">
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">ÉCOLES SUPÉRIEURES</li>
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">ÉCOLES SPÉCIALISÉES</li>
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">UNIVERSITÉS</li>
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">
                        ORGANISMES DE FORMATION PROFESSIONNELLE
                      </li>
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">
                        CENTRES DE FORMATION D&apos;APPRENTIS (CFA)
                      </li>
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">ÉCOLES TECH, IA &amp; DIGITAL</li>
                      <li className="py-3 border-b border-stone font-bold text-accent-blue uppercase tracking-tight">
                        ORGANISMES DE FORMATION HYBRIDE
                      </li>
                      <li className="py-3 font-bold text-accent-blue uppercase tracking-tight">GROUPES DE FORMATION</li>
                    </ul>
                  </div>
                  <div className="glass-card p-10 rounded-lg group">
                    <span className="material-symbols-outlined text-4xl text-accent-blue mb-6">space_dashboard</span>
                    <h4 className="font-headline-md text-headline-md mb-4 uppercase tracking-tight">Une approche moderne et flexible</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Le Campus Paris et son mode d&apos;exploitation en contrat de prestation de services vous permettent de louer des
                      surfaces adaptées à vos besoins, en fonction de vos activités d&apos;enseignement ou de formation, avec une grande
                      flexibilité de durée et de configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campus as a Service — infographie */}
        <CampusAsService />

        {/* Visual Proof Section */}
        <section className="py-section-gap overflow-hidden bg-[#eef1fb]" id="proof">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col lg:flex-row gap-gutter">
              <div className="w-full lg:w-7/12 aspect-video rounded-xl overflow-hidden border border-stone shadow-sm">
                <img alt="Intérieur moderne du campus" className="w-full h-full object-cover" src="/assets/interieur.webp" />
              </div>
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <div className="p-8 border-y border-stone">
                  <span className="font-label-sm uppercase tracking-widest text-accent-blue mb-2 block">L&apos;expérience Campus</span>
                  <SectionTitle as="h3" tone="light" className="text-headline-lg mb-4" lead="Des espaces" rest="qui inspirent l'excellence" />
                  <p className="font-body-md text-on-surface-variant mb-6">
                    Chaque détail est pensé pour minimiser les distractions. De l&apos;acoustique traitée aux mobiliers ergonomiques, nous
                    créons l&apos;environnement idéal pour la transmission du savoir.
                  </p>
                  <Link className="inline-flex items-center gap-2 font-label-md text-accent-blue group" href="/espaces">
                    En savoir plus sur nos espaces
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Contact CTA */}
        <section className="py-section-gap bg-[#213145]" id="contact">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <SectionTitle as="h2" tone="dark" className="text-headline-lg mb-8" lead="Prêt" rest="à transformer votre modèle immobilier" end=" ?" />
            <button
              className="magnetic glass-blue text-white px-12 py-5 rounded-full font-label-md hover:scale-105 transition-all"
              data-open-contact-modal=""
            >
              Nous contacter
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
