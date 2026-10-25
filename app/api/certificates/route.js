import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { SEED_CERTIFICATES } from '@/data/certificates';

export async function GET(req) {
  const q = (new URL(req.url).searchParams.get('q') || '').trim();
  if (q.length < 3) return NextResponse.json({ error: 'Enter at least 3 characters' }, { status: 400 });
  const needle = q.toUpperCase();
  const match = (c) => [c.certificateNo, c.rollNo, c.regNo].some((v) => String(v || '').toUpperCase() === needle);

  try {
    const db = await getDb();
    const found = await db.collection('certificates').findOne({
      $or: [{ certificateNo: needle }, { rollNo: q }, { regNo: q }],
    }, { projection: { _id: 0 } });
    if (found) return NextResponse.json({ certificate: found });
  } catch { /* DB unavailable: fall back to seed records */ }

  const seed = SEED_CERTIFICATES.find(match);
  if (seed) return NextResponse.json({ certificate: seed });
  return NextResponse.json({ certificate: null }, { status: 404 });
}
