'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inputCls = 'w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-fg text-sm outline-none focus:border-brand';

export default function AdminLoginForm() {
  const router = useRouter();
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr('');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setErr(data.error || 'Error');
    router.push('/admin'); router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-xs font-bold space-y-1"><span>Email</span><input type="email" required autoComplete="username" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={inputCls} /></label>
      <label className="block text-xs font-bold space-y-1"><span>Password</span><input type="password" required autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} className={inputCls} /></label>
      {err && <p className="text-sm text-rose-400">{err}</p>}
      <button disabled={busy} className="w-full py-3 rounded-xl bg-brand text-brand-fg text-sm font-black disabled:opacity-60">{busy ? '...' : 'Login'}</button>
    </form>
  );
}
