import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';
import { SETTINGS_FIELDS, sanitize } from '@/lib/schemas';
import { getSettings } from '@/lib/content';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const doc = sanitize(SETTINGS_FIELDS, body);
  const db = await getDb();
  await db.collection('site_meta').updateOne({ _id: 'settings' }, { $set: doc }, { upsert: true });
  return NextResponse.json({ ok: true });
}
