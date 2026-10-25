import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const db = await getDb();
  const adm = await db.collection('admissions').find({}, { projection: { status: 1, fee: 1, 'payment.paidAmount': 1 } }).toArray();
  const by = (s) => adm.filter((a) => a.status === s).length;
  const billed = adm.filter((a) => a.status !== 'cancelled').reduce((n, a) => n + (a.fee || 0), 0);
  const paid = adm.reduce((n, a) => n + (a.payment?.paidAmount || 0), 0);
  return NextResponse.json({
    admissions: { total: adm.length, pending: by('pending'), verified: by('verified'), enrolled: by('enrolled'), cancelled: by('cancelled') },
    money: { billed, paid, due: Math.max(0, billed - paid) },
    subscribers: await db.collection('newsletter_subscribers').countDocuments(),
    certificates: await db.collection('certificates').countDocuments(),
  });
}
