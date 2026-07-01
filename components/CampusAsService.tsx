import SectionTitle from '@/components/SectionTitle';

/**
 * Infographie « Campus as a Service ».
 * Traduit visuellement le modèle : l'école apporte sa pédagogie, Le Campus
 * Paris opère l'intégralité des services, au bénéfice des étudiants.
 * Objectif : tout comprendre en dix secondes.
 */

const SERVICES = [
  { icon: 'concierge', label: 'Accueil' },
  { icon: 'build', label: 'Maintenance' },
  { icon: 'dns', label: 'IT' },
  { icon: 'restaurant', label: 'Restauration' },
  { icon: 'spa', label: 'Wellness' },
];

function Arrow() {
  return (
    <div className="flex justify-center py-3 text-accent-blue" aria-hidden="true">
      <span className="material-symbols-outlined text-3xl">arrow_downward</span>
    </div>
  );
}

export default function CampusAsService() {
  return (
    <section className="py-section-gap bg-[#213145] text-white overflow-hidden" id="campus-as-a-service">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-[42rem] mx-auto mb-16">
          <span className="font-label-sm uppercase tracking-widest text-accent-blue mb-3 block">Campus as a Service</span>
          <SectionTitle as="h2" tone="dark" className="text-headline-xl mb-4" lead="Vous enseignez," rest="nous opérons tout le reste" />
          <p className="font-body-lg opacity-80">
            L&apos;école apporte sa pédagogie, Le Campus Paris opère l&apos;intégralité du campus, au service des étudiants.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* L'école */}
          <div className="reveal-up rounded-2xl border border-white/10 bg-white/5 px-8 py-6 text-center max-w-[24rem] mx-auto">
            <span className="material-symbols-outlined text-4xl text-white mb-2 block">school</span>
            <p className="font-title-lg text-title-lg">L&apos;école</p>
            <p className="font-body-sm opacity-70">Votre pédagogie, votre marque</p>
          </div>

          <Arrow />

          {/* Le Campus Paris — le hub opéré */}
          <div className="glass-blue reveal-up rounded-2xl px-8 py-8 text-center max-w-[28rem] mx-auto">
            <span className="material-symbols-outlined text-4xl text-white mb-2 block">apartment</span>
            <p className="font-headline-md text-headline-md uppercase tracking-tight">Le Campus Paris</p>
            <p className="font-body-md opacity-90">Opère l&apos;intégralité du campus</p>
          </div>

          <Arrow />

          {/* Les services opérés */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" data-stagger="up">
            {SERVICES.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <span className="material-symbols-outlined text-3xl text-accent-blue mb-2 block">{s.icon}</span>
                <p className="font-label-md uppercase tracking-tight">{s.label}</p>
              </div>
            ))}
          </div>

          <Arrow />

          {/* Les étudiants */}
          <div className="reveal-up rounded-2xl border border-accent-blue/40 bg-accent-blue/10 px-8 py-6 text-center max-w-[24rem] mx-auto">
            <span className="material-symbols-outlined text-4xl text-white mb-2 block">groups</span>
            <p className="font-title-lg text-title-lg">Les étudiants</p>
            <p className="font-body-sm opacity-70">Une expérience premium, clé en main</p>
          </div>
        </div>
      </div>
    </section>
  );
}
