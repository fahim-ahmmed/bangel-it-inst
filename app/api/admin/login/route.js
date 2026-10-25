import { NextResponse } from 'next/server';
import { checkAdminCredentials, setAdminCookie } from '@/lib/admin-auth';

const attempts = new Map(); // ip -> { n, until }

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const rec = attempts.get(ip);
  if (rec && rec.until > Date.now()) return NextResponse.json({ error: 'অনেকবার ভুল চেষ্টা। ১৫ মিনিট পরে আবার চেষ্টা করুন। / Too many attempts, retry in 15 minutes.' }, { status: 429 });

  const { email, password } = await req.json().catch(() => ({}));
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Admin credentials are not configured on the server.' }, { status: 503 });

  if (!checkAdminCredentials(email, password)) {
    const n = (rec?.n || 0) + 1;
    attempts.set(ip, { n, until: n >= 5 ? Date.now() + 15 * 60 * 1000 : 0 });
    return NextResponse.json({ error: 'ইমেইল বা পাসওয়ার্ড ভুল। / Wrong email or password.' }, { status: 401 });
  }
  attempts.delete(ip);
  await setAdminCookie(String(email).trim().toLowerCase());
  return NextResponse.json({ ok: true });
}
