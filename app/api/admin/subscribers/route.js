import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = await getDb();
  const rows = await db.collection('newsletter_subscribers').find({}).sort({ createdAt: -1 }).limit(1000).toArray();
  return NextResponse.json({ items: rows.map((r) => ({ email: r.email, createdAt: r.createdAt })) });
}
