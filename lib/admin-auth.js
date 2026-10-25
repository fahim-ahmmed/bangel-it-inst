import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'bcti_admin';
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const s = process.env.BETTER_AUTH_SECRET;
  if (!s) throw new Error('BETTER_AUTH_SECRET is not set');
  return s;
}
const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Admin credentials come only from environment variables. There is no registration for admins.
export function checkAdminCredentials(email, password) {
  const e = process.env.ADMIN_EMAIL;
  const p = process.env.ADMIN_PASSWORD;
  if (!e || !p) return false; // fail closed when not configured
  const okEmail = safeEqual(String(email || '').trim().toLowerCase(), e.trim().toLowerCase());
  const okPass = safeEqual(password || '', p);
  return okEmail && okPass;
}

export async function setAdminCookie(email) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: MAX_AGE });
}

export async function clearAdminCookie() {
  (await cookies()).delete(COOKIE);
}

export async function getAdminSession() {
  try {
    const raw = (await cookies()).get(COOKIE)?.value;
    if (!raw) return null;
    const [payload, sig] = raw.split('.');
    if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

export const requireAdmin = getAdminSession;
