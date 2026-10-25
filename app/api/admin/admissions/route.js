import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';

const STATUSES = ['pending', 'verified', 'enrolled', 'cancelled'];
const METHODS = ['cash', 'bkash', 'nagad', 'rocket', 'bank', 'other'];

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = await getDb();
  const rows = await db.collection('admissions').find({}).sort({ createdAt: -1 }).limit(1000).toArray();
  return NextResponse.json({ items: rows.map((r) => ({ ...r, _id: String(r._id) })) });
}

// Update status and/or record a payment. Confirming enrolment (status "enrolled") is up to the admin.
export async function PATCH(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  if (!ObjectId.isValid(body.id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const set = { updatedAt: new Date() };
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    set.status = body.status;
  }
  if (body.payment) {
    const paidAmount = Number(body.payment.paidAmount);
    if (!Number.isFinite(paidAmount) || paidAmount < 0) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    const method = METHODS.includes(body.payment.method) ? body.payment.method : 'cash';
    set.payment = { paidAmount, method, trxId: String(body.payment.trxId || '').slice(0, 60), note: String(body.payment.note || '').slice(0, 300), paidAt: paidAmount > 0 ? new Date() : null };
  }
  if (body.fee !== undefined && Number.isFinite(Number(body.fee))) set.fee = Number(body.fee);
  const db = await getDb();
  await db.collection('admissions').updateOne({ _id: new ObjectId(body.id) }, { $set: set });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const id = new URL(req.url).searchParams.get('id');
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const db = await getDb();
  await db.collection('admissions').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
