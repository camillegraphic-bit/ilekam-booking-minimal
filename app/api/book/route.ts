import { NextResponse } from 'next/server';

// POST /api/book
// body JSON: { slotId: string, email: string }
export async function POST(req: Request) {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 });
  }

  const { slotId, email } = (payload as any) ?? {};

  if (typeof slotId !== 'string' || !slotId.trim()) {
    return NextResponse.json({ error: "Champ 'slotId' manquant" }, { status: 400 });
  }
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Champ 'email' invalide" }, { status: 400 });
  }

  // Ici, on ferait l’appel Stripe + enregistrement DB.
  // Pour la démo, on renvoie une confirmation fictive.
  const bookingId = `bk_${Math.random().toString(36).slice(2, 10)}`;

  return NextResponse.json({
    ok: true,
    bookingId,
    slotId,
    email,
    note: 'Placeholder de réservation — intégration Stripe à venir.',
  });
}
