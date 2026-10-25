'use client';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { api, toCsv, downloadCsv } from './shared';

export default function SubscribersList() {
  const [items, setItems] = useState([]);
  useEffect(() => { api('GET', '/api/admin/subscribers').then((r) => r.ok && setItems(r.data.items)); }, []);
  return (
    <div className="space-y-3">
      <button onClick={() => downloadCsv('subscribers.csv', toCsv(items, ['email', 'createdAt']))} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface2 text-xs font-bold"><Download className="w-3.5 h-3.5" />CSV</button>
      <ul className="rounded-xl border border-line divide-y divide-line">{items.map((s) => <li key={s.email} className="p-3 text-sm flex justify-between"><span>{s.email}</span><span className="text-xs text-muted">{new Date(s.createdAt).toLocaleDateString()}</span></li>)}{items.length === 0 && <li className="p-6 text-center text-sm text-muted">কোনো সাবস্ক্রাইবার নেই</li>}</ul>
    </div>
  );
}
