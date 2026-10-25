import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(req) {
  const { email, name } = await req.json().catch(() => ({}));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''))) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  try {
    const db = await getDb();
    await db.collection('newsletter_subscribers').updateOne(
      { email: email.toLowerCase() },
      { $setOnInsert: { email: email.toLowerCase(), name: name || null, createdAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not save subscription' }, { status: 503 });
  }
}
