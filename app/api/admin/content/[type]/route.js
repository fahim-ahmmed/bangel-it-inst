import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';
import { CONTENT_SCHEMAS, sanitize } from '@/lib/schemas';
import { SEEDS } from '@/lib/content';

async function ctx(params) {
  if (!(await requireAdmin())) return { res: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  const { type } = await params;
  const schema = CONTENT_SCHEMAS[type];
  if (!schema) return { res: NextResponse.json({ error: 'Unknown type' }, { status: 404 }) };
  return { type, schema, db: await getDb() };
}
const touch = (db, type) => db.collection('site_meta').updateOne({ _id: 'touched' }, { $set: { [type]: true } }, { upsert: true });

export async function GET(_req, { params }) {
  const c = await ctx(params); if (c.res) return c.res;
  const rows = await c.db.collection(c.type).find({}).sort({ order: 1, createdAt: 1 }).toArray();
  const meta = await c.db.collection('site_meta').findOne({ _id: 'touched' });
  return NextResponse.json({ items: rows.map((r) => ({ ...r, _id: String(r._id) })), touched: Boolean(meta?.[c.type]) });
}

export async function POST(req, { params }) {
  const c = await ctx(params); if (c.res) return c.res;
  const body = await req.json().catch(() => ({}));

  if (body.action === 'import-defaults') {
    const count = await c.db.collection(c.type).countDocuments();
    if (count > 0) return NextResponse.json({ error: 'Collection is not empty' }, { status: 409 });
    const docs = SEEDS[c.type]().map((d) => ({ ...d, createdAt: new Date() }));
    if (docs.length) await c.db.collection(c.type).insertMany(docs);
    await touch(c.db, c.type);
    return NextResponse.json({ ok: true, imported: docs.length });
  }

  const doc = sanitize(c.schema.fields, body);
  const missing = c.schema.fields.filter((f) => f.required && !doc[f.key.split('.')[0]]);
  if (missing.length) return NextResponse.json({ error: `Required: ${missing.map((f) => f.key).join(', ')}` }, { status: 400 });
  if (doc.id && (await c.db.collection(c.type).findOne({ id: doc.id }))) return NextResponse.json({ error: 'এই ID আগে থেকেই আছে / ID already exists' }, { status: 409 });
  await c.db.collection(c.type).insertOne({ ...doc, createdAt: new Date() });
  await touch(c.db, c.type);
  return NextResponse.json({ ok: true });
}

export async function PUT(req, { params }) {
  const c = await ctx(params); if (c.res) return c.res;
  const body = await req.json().catch(() => ({}));
  if (!ObjectId.isValid(body._id)) return NextResponse.json({ error: 'Invalid _id' }, { status: 400 });
  const doc = sanitize(c.schema.fields, body);
  delete doc.id; // id is immutable (used in URLs)
  await c.db.collection(c.type).updateOne({ _id: new ObjectId(body._id) }, { $set: { ...doc, updatedAt: new Date() } });
  await touch(c.db, c.type);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req, { params }) {
  const c = await ctx(params); if (c.res) return c.res;
  const id = new URL(req.url).searchParams.get('id');
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await c.db.collection(c.type).deleteOne({ _id: new ObjectId(id) });
  await touch(c.db, c.type);
  return NextResponse.json({ ok: true });
}
