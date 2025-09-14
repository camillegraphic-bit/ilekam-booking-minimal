import { NextResponse } from "next/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // remplace * par ton domaine si tu veux limiter
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// POST /api/book (body JSON: { slotId: string, email: string })
export async function POST(req: Request) {
  try {
    const { slotId, email } = await req.json();

    if (!slotId) {
      return NextResponse.json(
        { error: "slotId manquant" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "email invalide" },
        { status: 400, headers: corsHeaders }
      );
    }

    const bookingId = `bk_${Math.random().toString(36).slice(2, 10)}`;

    return NextResponse.json(
      { ok: true, bookingId, slotId, email },
      { headers: corsHeaders }
    );
  } catch {
    return NextResponse.json(
      { error: "JSON invalide" },
      { status: 400, headers: corsHeaders }
    );
  }
}
