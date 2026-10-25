'use client';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useApp } from '@/app/providers';

export default function Newsletter() {
  const { tr } = useApp();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  async function submit(e) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setState(res.ok ? 'done' : 'error');
      if (res.ok) setEmail('');
    } catch { setState('error'); }
  }

  return (
    <div className="rounded-2xl bg-bg border border-line p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-brand/10 text-brand"><Mail className="w-5 h-5" /></div>
        <div>
          <h3 className="font-black text-fg">{tr('নতুন ব্যাচ ও অফারের খবর পান', 'Get news on new batches & offers')}</h3>
          <p className="text-xs">{tr('ইমেইল দিয়ে সাবস্ক্রাইব করুন।', 'Subscribe with your email.')}</p>
        </div>
      </div>
      <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 md:w-64 px-3 py-2.5 rounded-xl bg-surface border border-line text-fg text-sm outline-none focus:border-brand" />
        <button disabled={state === 'loading'} className="px-4 py-2.5 rounded-xl bg-brand text-brand-fg text-sm font-bold disabled:opacity-60">{tr('সাবস্ক্রাইব', 'Subscribe')}</button>
      </form>
      {state === 'done' && <p className="text-xs text-brand w-full md:w-auto">✓ {tr('সফল হয়েছে!', 'Subscribed!')}</p>}
      {state === 'error' && <p className="text-xs text-rose-400 w-full md:w-auto">{tr('সাবস্ক্রিপশন সংরক্ষণ করা যায়নি।', 'Could not save subscription.')}</p>}
    </div>
  );
}
