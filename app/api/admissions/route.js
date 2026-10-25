import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getServerSession } from '@/lib/session';
import { getCourse, getSettings } from '@/lib/content';

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const fullName = String(body.fullName || '').trim();
  const phone = String(body.phone || '').trim();
  const course = await getCourse(body.courseId);
  if (fullName.length < 3 || fullName.length > 100) return NextResponse.json({ error: 'নাম সঠিক নয়' }, { status: 400 });
  if (!/^(\+?88)?01[3-9]\d{8}$/.test(phone.replace(/[-\s]/g, ''))) return NextResponse.json({ error: 'মোবাইল নম্বর সঠিক নয়' }, { status: 400 });
  if (!course) return NextResponse.json({ error: 'কোর্স পাওয়া যায়নি বা বর্তমানে বন্ধ' }, { status: 400 });

  const settings = await getSettings();
  const couponApplied = settings.offerActive && String(body.couponCode || '').trim().toUpperCase() === String(settings.couponCode).toUpperCase();
  const fee = couponApplied ? Math.round(course.fee * (1 - settings.couponPercent / 100)) : course.discountFee || course.fee;
  const token = 'BCTI-ADM-' + Math.floor(10000 + Math.random() * 90000);
  const session = await getServerSession();

  const doc = {
    token, fullName, phone,
    email: String(body.email || '').trim() || null,
    courseId: course.id, courseName: course.titleBn, fee,
    shift: String(body.shift || ''), education: String(body.education || ''),
    address: String(body.address || ''), couponCode: couponApplied ? settings.couponCode : null,
    status: 'pending', payment: { paidAmount: 0, method: null, trxId: '', note: '', paidAt: null },
    userId: session?.user?.id || null, createdAt: new Date(),
  };

  let saved = true;
  try {
    const db = await getDb();
    await db.collection('admissions').insertOne(doc);
  } catch (e) {
    console.error('admission save failed', e.message);
    saved = false;
  }
  return NextResponse.json({ token, saved, fee });
}
