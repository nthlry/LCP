'use client';

import { useEffect, useRef, useState } from 'react';

const BROCHURE_URL = '/assets/brochure-le-campus-paris.pdf';

/**
 * Modale de demande de brochure. Même principe que ContactModal : tout
 * élément [data-open-brochure-modal] ouvre la modale (écoute au niveau du
 * document). Reprend les mêmes styles (.contact-modal*) pour rester
 * cohérente. Champs identiques au contact + un champ téléphone. À la
 * soumission, le contact est créé dans HubSpot via /api/contact, puis on
 * propose le téléchargement de la brochure.
 */
export default function BrochureModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-open-brochure-modal]')) {
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

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstname: String(data.get('firstname') ?? ''),
      lastname: String(data.get('lastname') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      sendBrochure: true,
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Le serveur a répondu ${res.status}`);
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
      aria-hidden={!open}
      onClick={handleOverlayClick}
    >
      <div aria-labelledby="brochure-modal-title" aria-modal="true" className="contact-modal liquid-glass" role="dialog">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-title-lg text-title-lg" id="brochure-modal-title">
            Recevez la brochure
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
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="brochure-firstname">
                Prénom
              </label>
              <input
                ref={firstInputRef}
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="brochure-firstname"
                name="firstname"
                required
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="brochure-lastname">
                Nom
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="brochure-lastname"
                name="lastname"
                required
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="brochure-company">
                Entreprise
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="brochure-company"
                name="company"
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="brochure-email">
                E-mail
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="brochure-email"
                name="email"
                required
                type="email"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1.5" htmlFor="brochure-phone">
                Téléphone
              </label>
              <input
                className="w-full rounded-xl border border-outline-variant px-4 py-2.5 font-body-md focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
                id="brochure-phone"
                name="phone"
                required
                type="tel"
              />
            </div>
            {error && (
              <p className="font-body-md text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              className="glass-blue w-full text-white px-6 py-3 rounded-full font-title-lg mt-2 transition-all disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Envoi…' : 'Recevoir la brochure'}
            </button>
          </form>
        )}
        {submitted && (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-secondary text-[40px] mb-3 block">check_circle</span>
            <p className="font-title-lg text-title-lg mb-2">Merci !</p>
            <p className="font-body-md text-on-surface-variant mb-6">
              Votre demande a bien été enregistrée. Téléchargez dès maintenant la brochure ci-dessous.
            </p>
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener"
              className="glass-blue inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-title-lg transition-all"
            >
              <span className="material-symbols-outlined">download</span>
              Télécharger la brochure
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
