import { NextResponse } from 'next/server';

// GET /api/availability?date=2025-09-20&durationMin=60
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const durationMin = Number(searchParams.get('durationMin') ?? '60');

  if (!date) return NextResponse.json({ error: "Paramètre 'date' manquant (YYYY-MM-DD)" }, { status: 400 });
  if (!Number.isFinite(durationMin) || durationMin <= 0)
    return NextResponse.json({ error: "Paramètre 'durationMin' invalide (> 0)" }, { status: 400 });

  const start = new Date(`${date}T09:00:00Z`);
  const end = new Date(`${date}T17:00:00Z`);
  const addMin = (d: Date, m: number) => new Date(d.getTime() + m * 60_000);

  const slots = [];
  for (let i = 0, s = new Date(start); addMin(s, durationMin) <= end; i++, s = addMin(s, durationMin)) {
    const e = addMin(s, durationMin);
    slots.push({ id: `${date}-${i}`, start: s.toISOString(), end: e.toISOString() });
  }

  return NextResponse.json({ ok: true, date, durationMin, count: slots.length, slots });
}
