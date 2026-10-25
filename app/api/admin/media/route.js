import { NextResponse } from 'next/server';
import { Binary } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';

const MAX = 3 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || typeof file === 'string') return NextResponse.json({ error: 'File required' }, { status: 400 });
  if (!TYPES.includes(file.type)) return NextResponse.json({ error: 'শুধু JPG/PNG/WebP/GIF ছবি / Images only' }, { status: 415 });
  if (file.size > MAX) return NextResponse.json({ error: 'ছবি ৩ MB-এর বেশি / Image over 3 MB' }, { status: 413 });
  const db = await getDb();
  const buf = Buffer.from(await file.arrayBuffer());
  const r = await db.collection('media').insertOne({ data: new Binary(buf), type: file.type, name: file.name, size: file.size, createdAt: new Date() });
  return NextResponse.json({ url: `/api/media/${r.insertedId}` });
}
