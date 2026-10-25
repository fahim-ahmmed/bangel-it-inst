'use client';
import { useCallback, useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { api, inputCls } from './shared';

const EMPTY = { certificateNo: '', studentName: '', fatherName: '', courseName: '', rollNo: '', regNo: '', session: '', grade: 'A+', cgpa: '', issueDate: '' };

export default function CertificatesManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState('');
  const load = useCallback(async () => { const r = await api('GET', '/api/admin/certificates'); if (r.ok) setItems(r.data.items); }, []);
  useEffect(() => { load(); }, [load]);

  async function add(e) {
    e.preventDefault();
    const r = await api('POST', '/api/admin/certificates', form);
    if (!r.ok) return setErr(r.data.error);
    setErr(''); setForm(EMPTY); load();
  }
  return (
    <div className="space-y-4">
      <form onSubmit={add} className="p-4 rounded-xl bg-surface border border-line grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.keys(EMPTY).map((k) => <label key={k} className="text-xs font-bold space-y-1"><span>{k}</span><input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={inputCls} /></label>)}
        {err && <p className="sm:col-span-2 lg:col-span-3 text-sm text-rose-400">{err}</p>}
        <button className="sm:col-span-2 lg:col-span-3 py-2.5 rounded-lg bg-brand text-brand-fg text-sm font-bold">সনদ যোগ করুন</button>
      </form>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-surface text-left text-xs text-muted"><tr>{['No', 'নাম', 'কোর্স', 'Roll', 'Reg', ''].map((h, i) => <th key={i} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{items.map((c) => <tr key={c._id} className="border-t border-line"><td className="p-3 font-mono text-xs">{c.certificateNo}</td><td className="p-3">{c.studentName}</td><td className="p-3 text-xs">{c.courseName}</td><td className="p-3 font-mono text-xs">{c.rollNo}</td><td className="p-3 font-mono text-xs">{c.regNo}</td><td className="p-3"><button onClick={async () => { if (confirm('মুছবেন?')) { await api('DELETE', `/api/admin/certificates?id=${c._id}`); load(); } }} aria-label="Delete" className="text-rose-400"><Trash2 className="w-4 h-4" /></button></td></tr>)}</tbody>
        </table>
        {items.length === 0 && <p className="p-6 text-center text-sm text-muted">ডাটাবেজে কোনো সনদ নেই (যাচাই পেজে ৪টি নমুনা রেকর্ড কাজ করে)</p>}
      </div>
    </div>
  );
}
