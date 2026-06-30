'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Modale de contact partagée. Reproduit le comportement de
 * initContactModal() dans hero-anim.js : tout élément
 * [data-open-contact-modal] (boutons Header desktop/mobile) ouvre
 * la modale, sans prop-drilling — on écoute les clics au niveau du
 * document, exactement comme le faisait le script vanilla JS.
 */
// Portal ID et Form GUID HubSpot. Ces valeurs sont publiques (elles transitent
// côté navigateur avec la Forms API), on peut donc les coder en dur comme
// valeurs par défaut tout en laissant la possibilité de les surcharger via
// des variables d'environnement.
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '2822390';
const HUBSPOT_FORM_GUID =
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID ?? '41687bd9-54ef-47dc-bc2e-990779f260fa';

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-open-contact-modal]')) {
        e.preventDefault();
        setOpen(true);
        setSubmitted(false);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      firstInputRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
      setError("La configuration HubSpot est manquante.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    // Le nouvel éditeur HubSpot rattache « Nom de l'entreprise » à l'objet
    // Entreprise (0-2/name), les autres champs à l'objet Contact (0-1).
    const fields = [
      { objectTypeId: '0-1', name: 'firstname', value: String(data.get('firstname') ?? '') },
      { objectTypeId: '0-1', name: 'lastname', value: String(data.get('lastname') ?? '') },
      { objectTypeId: '0-2', name: 'name', value: String(data.get('company') ?? '') },
      { objectTypeId: '0-1', name: 'email', value: String(data.get('email') ?? '') },
    ];

    // Cookie de suivi HubSpot, posé par le script js.hs-scripts.com. Le
    // transmettre relie la soumission à un vrai visiteur et évite que
    // HubSpot la classe en spam.
    const hutk = document.cookie
      .split('; ')
      .find((c) => c.startsWith('hubspotutk='))
      ?.split('=')[1];

    setSubmitting(true);
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields,
            context: {
              ...(hutk ? { hutk } : {}),
              pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
              pageName: typeof document !== 'undefined' ? document.title : undefined,
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HubSpot a répondu ${res.status}`);
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className={`contact-modal-overlay ${open ? 'is-open' : ''}`}
      data-contact-modal-overlay=""
      aria-hidden={!open}
      onClick={handleOverlayClick}
    >
      <div aria-labelledby="contact-modal-title" aria-modal="true" className="contact-modal liquid-glass" role="dialog">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-title-lg text-title-lg" id="contact-modal-title">
            Rencontrons-nous
          </h3>
          <button
            aria-label="Fermer"
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            type="button"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {!submitted && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="contact-firstname">
                Prénom
              </label>
              <input
                ref={firstInputRef}
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="contact-firstname"
                name="firstname"
                required
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="contact-lastname">
                Nom
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="contact-lastname"
                name="lastname"
                required
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="contact-company">
                Entreprise
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="contact-company"
                name="company"
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="contact-email">
                E-mail
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="contact-email"
                name="email"
                required
                type="email"
              />
            </div>
            {error && (
              <p className="font-body-md text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              className="magnetic glass-blue w-full text-white px-6 py-3 rounded-full font-title-lg mt-2 transition-all disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Envoi…' : 'Envoyer'}
            </button>
          </form>
        )}
        {submitted && (
          <div className="text-center py-8" data-contact-success="">
            <span className="material-symbols-outlined text-secondary text-[40px] mb-3 block">check_circle</span>
            <p className="font-title-lg text-title-lg mb-2">Merci !</p>
            <p className="font-body-md text-on-surface-variant">
              Votre demande a bien été enregistrée. Notre équipe vous recontacte rapidement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
