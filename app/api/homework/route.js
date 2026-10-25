import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getServerSession } from '@/lib/session';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Login required' }, { status: 401 });
  const db = await getDb();
  const rows = await db.collection('homework').find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json({ items: rows.map((r) => ({ id: String(r._id), title: r.title, link: r.link, status: r.status, feedback: r.feedback || '', createdAt: r.createdAt })) });
}

export async function POST(req) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Login required' }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const title = String(b.title || '').trim().slice(0, 150);
  const link = String(b.link || '').trim().slice(0, 500);
  if (title.length < 3) return NextResponse.json({ error: 'শিরোনাম দিন' }, { status: 400 });
  if (link && !/^https?:\/\//i.test(link)) return NextResponse.json({ error: 'লিংক http(s):// দিয়ে শুরু হতে হবে' }, { status: 400 });
  const db = await getDb();
  await db.collection('homework').insertOne({ userId: session.user.id, studentName: session.user.name, studentEmail: session.user.email, title, notes: String(b.notes || '').slice(0, 1000), link, status: 'submitted', createdAt: new Date() });
  return NextResponse.json({ ok: true });
}
