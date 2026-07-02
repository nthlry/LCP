# Le Campus Paris

Site vitrine du Campus Paris (La Défense) — Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion.

## Pages

- `/` — accueil (hero parallax, chiffres clés, infographie « Campus as a Service »)
- `/espaces` — les espaces (plans RDC / 1er étage, rooftop, certifications HQE & BREEAM)
- `/infos-pratiques` — accès, quartier, environs
- `/pourquoi-maintenant` — argumentaire marché

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

Build de production : `npm run build` puis `npm start`.

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs (voir les commentaires dans le fichier) :

- `HUBSPOT_PRIVATE_APP_TOKEN` — création de contacts via `/api/contact`
- `HUBSPOT_OWNER_ID` — (optionnel) propriétaire HubSpot des contacts
- `RESEND_API_KEY` — envoi de la brochure par e-mail
- `BROCHURE_FROM_EMAIL` — adresse d'expéditeur (domaine vérifié Resend)

## Structure

- `app/` — pages (App Router) + route API `app/api/contact`
- `components/` — composants React (header, footer, modales, hero…)
- `app/globals.css` — styles globaux et animations (repris de la V1)
- `public/assets/hero-anim.js` — animations vanilla JS chargées par `AnimLoader`
- `public/assets/` — images (webp), logos, brochure PDF
