'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, signUp } from '@/lib/auth-client';
import { useApp } from '@/app/providers';
import Button from './ui/Button';

const inputCls = 'w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-fg text-sm outline-none focus:border-brand';

export default function AuthForm({ mode }) {
  const { tr } = useApp();
  const router = useRouter();
  const next = useSearchParams().get('next') || '/student-portal';
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    const res = mode === 'register'
      ? await signUp.email({ name: f.name, email: f.email, password: f.password })
      : await signIn.email({ email: f.email, password: f.password });
    setBusy(false);
    if (res?.error) return setErr(res.error.message || tr('ব্যর্থ হয়েছে', 'Failed'));
    router.push(next); router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="space-y-4">
        {mode === 'register' && <label className="block text-xs font-bold space-y-1"><span>{tr('পূর্ণ নাম', 'Full name')}</span><input required value={f.name} onChange={set('name')} className={inputCls} /></label>}
        <label className="block text-xs font-bold space-y-1"><span>{tr('ইমেইল', 'Email')}</span><input required type="email" value={f.email} onChange={set('email')} className={inputCls} /></label>
        <label className="block text-xs font-bold space-y-1"><span>{tr('পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)', 'Password (min 8 chars)')}</span><input required minLength={8} type="password" value={f.password} onChange={set('password')} className={inputCls} /></label>
        {err && <p className="text-sm text-rose-400">{err}</p>}
        <Button type="submit" isDisabled={busy} className="w-full">{busy ? '...' : mode === 'register' ? tr('একাউন্ট তৈরি করুন', 'Create account') : tr('লগইন করুন', 'Log in')}</Button>
      </form>
      <button onClick={() => signIn.social({ provider: 'google', callbackURL: next })} className="w-full py-3 rounded-xl border border-line text-sm font-bold hover:bg-surface2">{tr('Google দিয়ে চালিয়ে যান', 'Continue with Google')}</button>
      <p className="text-center text-sm text-muted">
        {mode === 'register' ? <>{tr('একাউন্ট আছে?', 'Have an account?')} <Link href="/login" className="text-brand font-bold">{tr('লগইন', 'Log in')}</Link></> : <>{tr('নতুন?', 'New here?')} <Link href="/register" className="text-brand font-bold">{tr('রেজিস্টার করুন', 'Register')}</Link></>}
      </p>
    </div>
  );
}
