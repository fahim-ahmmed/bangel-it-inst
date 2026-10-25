import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';

const FIELDS = ['certificateNo', 'studentName', 'fatherName', 'courseName', 'rollNo', 'regNo', 'session', 'grade', 'cgpa', 'issueDate'];

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = await getDb();
  const rows = await db.collection('certificates').find({}).sort({ createdAt: -1 }).limit(500).toArray();
  return NextResponse.json({ items: rows.map((r) => ({ ...r, _id: String(r._id) })) });
}

export async function POST(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const doc = { instituteCode: '27117', createdAt: new Date() };
  for (const k of FIELDS) doc[k] = String(body[k] || '').trim().slice(0, 200);
  doc.certificateNo = doc.certificateNo.toUpperCase();
  if (!doc.certificateNo || !doc.studentName || !doc.courseName || !doc.rollNo || !doc.regNo) {
    return NextResponse.json({ error: 'certificateNo, studentName, courseName, rollNo, regNo are required' }, { status: 400 });
  }
  const db = await getDb();
  if (await db.collection('certificates').findOne({ certificateNo: doc.certificateNo })) return NextResponse.json({ error: 'Certificate number already exists' }, { status: 409 });
  await db.collection('certificates').insertOne(doc);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const id = new URL(req.url).searchParams.get('id');
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const db = await getDb();
  await db.collection('certificates').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
