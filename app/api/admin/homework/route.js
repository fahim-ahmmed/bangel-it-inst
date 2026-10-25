import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = await getDb();
  const rows = await db.collection('homework').find({}).sort({ createdAt: -1 }).limit(500).toArray();
  return NextResponse.json({ items: rows.map((r) => ({ ...r, _id: String(r._id) })) });
}

export async function PATCH(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json().catch(() => ({}));
  if (!ObjectId.isValid(b.id) || !['submitted', 'reviewed'].includes(b.status)) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const db = await getDb();
  await db.collection('homework').updateOne({ _id: new ObjectId(b.id) }, { $set: { status: b.status, feedback: String(b.feedback || '').slice(0, 500), updatedAt: new Date() } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const id = new URL(req.url).searchParams.get('id');
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const db = await getDb();
  await db.collection('homework').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
