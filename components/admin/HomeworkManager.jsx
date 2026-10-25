'use client';
import { useCallback, useEffect, useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { api, inputCls } from './shared';

export default function HomeworkManager() {
  const [items, setItems] = useState([]);
  const [fb, setFb] = useState({});
  const load = useCallback(async () => { const r = await api('GET', '/api/admin/homework'); if (r.ok) setItems(r.data.items); }, []);
  useEffect(() => { load(); }, [load]);
  return (
    <ul className="space-y-3">
      {items.map((h) => (
        <li key={h._id} className="p-4 rounded-xl bg-surface border border-line space-y-2 text-sm">
          <div className="flex flex-wrap justify-between gap-2"><span><b>{h.title}</b><span className="block text-xs text-muted">{h.studentName} · {h.studentEmail} · {new Date(h.createdAt).toLocaleString()}</span></span>
            <span className="flex items-center gap-2">{h.link && <a href={h.link} target="_blank" rel="noopener noreferrer" className="text-brand" aria-label="Open"><ExternalLink className="w-4 h-4" /></a>}<button onClick={async () => { if (confirm('মুছবেন?')) { await api('DELETE', `/api/admin/homework?id=${h._id}`); load(); } }} aria-label="Delete" className="text-rose-400"><Trash2 className="w-4 h-4" /></button></span></div>
          {h.notes && <p className="text-xs text-muted">{h.notes}</p>}
          <div className="flex gap-2"><input value={fb[h._id] ?? h.feedback ?? ''} onChange={(e) => setFb({ ...fb, [h._id]: e.target.value })} placeholder="মন্তব্য" className={inputCls} />
            <button onClick={async () => { await api('PATCH', '/api/admin/homework', { id: h._id, status: 'reviewed', feedback: fb[h._id] ?? h.feedback ?? '' }); load(); }} className={`px-3 rounded-lg text-xs font-bold shrink-0 ${h.status === 'reviewed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand text-brand-fg'}`}>{h.status === 'reviewed' ? 'দেখা হয়েছে ✓' : 'দেখা হয়েছে'}</button></div>
        </li>))}
      {items.length === 0 && <li className="p-6 text-center text-sm text-muted">কোনো হোমওয়ার্ক জমা নেই</li>}
    </ul>
  );
}
