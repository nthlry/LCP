import { NextResponse } from 'next/server';

/**
 * Route serveur qui crée (ou met à jour) un contact directement dans le CRM
 * HubSpot via l'API Contacts. Contrairement à la Forms API, cette voie n'est
 * pas soumise au filtre anti-spam des formulaires : les contacts arrivent
 * directement dans la liste des contacts.
 *
 * Le token reste côté serveur (jamais exposé au navigateur).
 */

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';
// Propriétaire HubSpot auquel sont attribués les contacts du site
// (Hugo Poulaillon — hpoulaillon@deskeo.fr). Surchargage possible via env.
const HUBSPOT_OWNER_ID = process.env.HUBSPOT_OWNER_ID ?? '445387662';

type Body = {
  firstname?: string;
  lastname?: string;
  company?: string;
  email?: string;
};

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
  if (HUBSPOT_OWNER_ID) {
    properties.hubspot_owner_id = HUBSPOT_OWNER_ID;
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
  };

  try {
    // 1) Tentative de création
    const createRes = await fetch(HUBSPOT_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties }),
    });

    if (createRes.ok) {
      return NextResponse.json({ ok: true });
    }

    // 2) Contact déjà existant (409) → on le met à jour via son ID
    if (createRes.status === 409) {
      const err = await createRes.json().catch(() => null);
      const existingId: string | undefined = err?.message?.match(/\b(\d{4,})\b/)?.[1];
      if (existingId) {
        const updateRes = await fetch(`${HUBSPOT_API}/${existingId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ properties }),
        });
        if (updateRes.ok) {
          return NextResponse.json({ ok: true, updated: true });
        }
      }
    }

    const detail = await createRes.text().catch(() => '');
    console.error('HubSpot CRM error', createRes.status, detail);
    return NextResponse.json(
      { error: 'Erreur lors de la création du contact.' },
      { status: 502 }
    );
  } catch (e) {
    console.error('HubSpot CRM exception', e);
    return NextResponse.json({ error: 'Erreur réseau.' }, { status: 502 });
  }
}
