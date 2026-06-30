import { NextResponse } from 'next/server';

/**
 * Route serveur qui crée (ou met à jour) un contact directement dans le CRM
 * HubSpot via l'API Contacts. Contrairement à la Forms API, cette voie n'est
 * pas soumise au filtre anti-spam des formulaires : les contacts arrivent
 * directement dans la liste des contacts.
 *
 * Si `sendBrochure` est vrai (demande de brochure), on envoie en plus un
 * e-mail au visiteur avec un lien vers la brochure, via Resend.
 *
 * Les tokens restent côté serveur (jamais exposés au navigateur).
 */

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';
// Propriétaire HubSpot auquel sont attribués les contacts du site
// (Hugo Poulaillon — hpoulaillon@deskeo.fr). Surchargage possible via env.
const HUBSPOT_OWNER_ID = process.env.HUBSPOT_OWNER_ID ?? '445387662';

// Envoi d'e-mail (Resend) pour la demande de brochure.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Adresse d'expéditeur : doit appartenir à un domaine vérifié dans Resend.
const BROCHURE_FROM_EMAIL = process.env.BROCHURE_FROM_EMAIL ?? 'Le Campus Paris <brochure@le-campus-paris.fr>';
const BROCHURE_PATH = '/assets/brochure-le-campus-paris.pdf';

type Body = {
  firstname?: string;
  lastname?: string;
  company?: string;
  email?: string;
  phone?: string;
  sendBrochure?: boolean;
};

const hubspotHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${HUBSPOT_TOKEN}`,
};

/** Crée le contact, ou le met à jour s'il existe déjà (409). */
async function upsertContact(properties: Record<string, string>): Promise<boolean> {
  const createRes = await fetch(HUBSPOT_API, {
    method: 'POST',
    headers: hubspotHeaders,
    body: JSON.stringify({ properties }),
  });
  if (createRes.ok) return true;

  if (createRes.status === 409) {
    const err = await createRes.json().catch(() => null);
    const existingId: string | undefined = err?.message?.match(/\b(\d{4,})\b/)?.[1];
    if (existingId) {
      const updateRes = await fetch(`${HUBSPOT_API}/${existingId}`, {
        method: 'PATCH',
        headers: hubspotHeaders,
        body: JSON.stringify({ properties }),
      });
      if (updateRes.ok) return true;
    }
  }

  const detail = await createRes.text().catch(() => '');
  console.error('HubSpot CRM error', createRes.status, detail);
  return false;
}

/** Envoie l'e-mail de brochure via Resend. Renvoie true si envoyé. */
async function sendBrochureEmail(to: string, firstname: string, brochureUrl: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY manquant — e-mail brochure non envoyé.');
    return false;
  }
  const hello = firstname ? `Bonjour ${firstname},` : 'Bonjour,';
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1b2330;line-height:1.6">
      <p>${hello}</p>
      <p>Merci pour votre intérêt pour <strong>Le Campus Paris</strong>. Voici votre brochure :</p>
      <p style="margin:24px 0">
        <a href="${brochureUrl}"
           style="background:#3b5bdb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;display:inline-block">
          Télécharger la brochure
        </a>
      </p>
      <p>Notre équipe revient vers vous très prochainement.</p>
      <p>— L'équipe du Campus Paris</p>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: BROCHURE_FROM_EMAIL,
      to: [to],
      subject: 'Votre brochure — Le Campus Paris',
      html,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  if (!HUBSPOT_TOKEN) {
    return NextResponse.json(
      { error: 'Configuration HubSpot manquante côté serveur.' },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const email = (body.email ?? '').trim();
  if (!email) {
    return NextResponse.json({ error: "L'e-mail est requis." }, { status: 400 });
  }

  const properties: Record<string, string> = {
    firstname: (body.firstname ?? '').trim(),
    lastname: (body.lastname ?? '').trim(),
    company: (body.company ?? '').trim(),
    email,
  };
  const phone = (body.phone ?? '').trim();
  if (phone) {
    properties.phone = phone;
  }
  if (HUBSPOT_OWNER_ID) {
    properties.hubspot_owner_id = HUBSPOT_OWNER_ID;
  }

  try {
    const created = await upsertContact(properties);
    if (!created) {
      return NextResponse.json(
        { error: 'Erreur lors de la création du contact.' },
        { status: 502 }
      );
    }

    // Demande de brochure : on envoie l'e-mail (sans faire échouer la requête
    // si l'envoi rate — le contact est déjà créé).
    let emailSent: boolean | undefined;
    if (body.sendBrochure) {
      const brochureUrl = new URL(BROCHURE_PATH, request.url).toString();
      emailSent = await sendBrochureEmail(email, properties.firstname, brochureUrl);
    }

    return NextResponse.json({ ok: true, ...(emailSent !== undefined ? { emailSent } : {}) });
  } catch (e) {
    console.error('HubSpot CRM exception', e);
    return NextResponse.json({ error: 'Erreur réseau.' }, { status: 502 });
  }
}
