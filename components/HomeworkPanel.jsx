'use client';
import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/app/providers';

const inputCls = 'w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-sm outline-none focus:border-brand';

export default function HomeworkPanel() {
  const { tr } = useApp();
  const [items, setItems] = useState([]);
  const [f, setF] = useState({ title: '', link: '', notes: '' });
  const [msg, setMsg] = useState('');
  const load = useCallback(async () => { const r = await fetch('/api/homework'); if (r.ok) setItems((await r.json()).items); }, []);
  useEffect(() => { load(); }, [load]);

  async function submit(e) {
    e.preventDefault();
    const r = await fetch('/api/homework', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return setMsg(d.error || 'Error');
    setMsg(tr('✓ জমা হয়েছে, শিক্ষক দেখবেন।', '✓ Submitted — your teacher will review it.')); setF({ title: '', link: '', notes: '' }); load();
  }
  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="p-5 rounded-2xl bg-surface border border-line space-y-3">
        <p className="text-xs text-muted">{tr('ফাইল Google Drive-এ আপলোড করে শেয়ার লিংক এখানে দিন।', 'Upload your file to Google Drive and paste the share link here.')}</p>
        <input required minLength={3} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder={tr('অ্যাসাইনমেন্ট / প্রজেক্টের নাম *', 'Assignment / project title *')} className={inputCls} />
        <input value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} placeholder="https://drive.google.com/..." className={inputCls} />
        <textarea rows={3} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder={tr('মন্তব্য (ঐচ্ছিক)', 'Notes (optional)')} className={inputCls} />
        {msg && <p className="text-sm text-brand">{msg}</p>}
        <button className="px-5 py-3 rounded-xl bg-brand text-brand-fg text-sm font-bold">{tr('জমা দিন', 'Submit')}</button>
      </form>
      <ul className="space-y-2">{items.map((h) => <li key={h.id} className="p-4 rounded-xl bg-surface border border-line text-sm flex flex-wrap justify-between gap-2"><span><b>{h.title}</b>{h.feedback && <span className="block text-xs text-brand">{tr('শিক্ষকের মন্তব্য', 'Feedback')}: {h.feedback}</span>}</span><span className="text-xs font-bold px-2 py-1 h-fit rounded-md bg-surface2">{h.status}</span></li>)}</ul>
    </div>
  );
}
