import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function getGoogleToken() {
  try {
    const res = await auth.api.getAccessToken({ body: { providerId: 'google' }, headers: await headers() });
    return res?.accessToken || null;
  } catch {
    return null;
  }
}

export async function gfetch(token, url, init = {}) {
  const res = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `Google API error ${res.status}`);
  return data;
}
