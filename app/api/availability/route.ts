import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // remplace * par ton domaine si tu veux limiter
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET /api/availability?date=2025-09-20&durationMin=60
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get('date');
  const durationMin = Number(searchParams.get('durationMin') ?? '60');

  if (!date) {
    return NextResponse.json(
      { error: "Paramètre 'date' manquant (YYYY-MM-DD)" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!Number.isFinite(durationMin) || durationMin <= 0) {
    return NextResponse.json(
      { error: "Paramètre 'durationMin' invalide (> 0)" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Créneaux fictifs 09:00 → 17:00
  const startDay = new Date(`${date}T09:00:00Z`);
  const endDay = new Date(`${date}T17:00:00Z`);
  const addMin = (d: Date, m: number) => new Date(d.getTime() + m * 60000);

  const slots: Array<{ id: string; start: string; end: string }> = [];
  for (let i = 0, s = new Date(startDay); addMin(s, durationMin) <= endDay; i++, s = addMin(s, durationMin)) {
    const e = addMin(s, durationMin);
    slots.push({ id: `${date}-${i}`, start: s.toISOString(), end: e.toISOString() });
  }

  return NextResponse.json(
    { ok: true, date, durationMin, count: slots.length, slots },
    { headers: corsHeaders }
  );
}
