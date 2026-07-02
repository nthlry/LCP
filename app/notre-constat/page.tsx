import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';

export const metadata: Metadata = {
  title: 'Notre constat — Le Campus Paris',
  description:
    "IA, nouveaux métiers, croissance des formations, besoin de flexibilité : le monde de l'éducation change plus vite que ses infrastructures. Le Campus Paris est la réponse.",
  alternates: { canonical: 'https://le-campus-paris.fr/notre-constat' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Campus Paris',
    title: 'Notre constat — Le Campus Paris',
    description:
      "Le monde de l'éducation change plus vite que ses infrastructures. Le Campus Paris est la réponse.",
    url: 'https://le-campus-paris.fr/notre-constat',
  },
};

const FORCES = [
  {
    icon: 'neurology',
    title: "L'IA",
    text: "L'intelligence artificielle redéfinit les compétences en continu et bouscule chaque secteur.",
  },
  {
    icon: 'work_update',
    title: 'De nouveaux métiers',
    text: "Des métiers apparaissent plus vite qu'ils ne se stabilisent. Ce qu'on apprend aujourd'hui peut être obsolète demain.",
  },
  {
    icon: 'trending_up',
    title: 'Une croissance des formations',
    text: "Écoles, organismes, formats hybrides : l'offre de formation se multiplie et se réinvente sans cesse.",
  },
  {
    icon: 'tune',
    title: 'Un besoin de flexibilité',
    text: 'Ouvrir vite, tester, s’adapter à la croissance : les modèles figés ne suivent plus.',
  },
];

export default function NotreConstatPage() {
  return (
    <>
      <main className="pt-24 md:pt-28">
        {/* Intro */}
        <section className="py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <h1 className="font-headline-2xl text-headline-lg-mobile md:text-headline-2xl leading-tight mb-6">
            NOTRE <span className="text-secondary">CONSTAT</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[42rem] mx-auto">
            Le monde de l&apos;éducation évolue plus vite que jamais, ralenti par des infrastructures figées dans le passé.
          </p>
        </section>

        {/* Aujourd'hui — les 4 forces */}
        <section className="py-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-xl">
            <SectionTitle
              as="h2"
              tone="light"
              className="text-headline-lg"
              lead="Le monde professionnel"
              rest="d'aujourd'hui et de demain est en pleine transformation"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter" data-stagger="up">
            {FORCES.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-8 space-y-4">
                <span className="material-symbols-outlined text-4xl text-accent-blue">{f.icon}</span>
                <h3 className="font-title-lg text-title-lg">{f.title}</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-xl max-w-[46rem] space-y-4">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Ces mutations imposent une nouvelle exigence : pouvoir tester, grandir, s&apos;adapter, vite. Or
              l&apos;immobilier éducatif classique n&apos;a pas suivi.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Pour accompagner ce changement, nous avons créé Le Campus Paris : le premier lieu de formation conçu pour
              bouger aussi vite que les métiers qu&apos;il forme.
            </p>
          </div>
        </section>

        {/* Donc → Le Campus Paris */}
        <section className="py-3xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <SectionTitle
            as="h2"
            tone="light"
            className="text-headline-xl mb-6"
            lead="Le Campus Paris"
            rest=": le campus conçu comme un service"
          />
          <p className="font-body-lg text-on-surface-variant max-w-[46rem] mx-auto mb-xl">
            Une infrastructure opérée, flexible et évolutive. Vous développez votre école, nous opérons le campus : ouvrez de
            nouveaux programmes, adaptez vos espaces et concentrez-vous sur l&apos;essentiel, l&apos;enseignement.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <button
              className="magnetic glass-blue text-white px-8 py-4 rounded-full font-title-lg transition-all"
              data-open-contact-modal=""
            >
              Rencontrons-nous
            </button>
            <Link
              href="/espaces"
              className="magnetic border-2 border-outline text-on-surface px-8 py-4 rounded-full font-title-lg hover:bg-surface-container transition-all"
            >
              Visiter nos espaces
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
