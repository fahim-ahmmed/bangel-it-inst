'use client';
import { useCallback, useEffect, useState } from 'react';
import { Trash2, Download, Printer, X } from 'lucide-react';
import { api, inputCls, toCsv, downloadCsv } from './shared';

const STATUS_STYLE = { pending: 'bg-amber-500/15 text-amber-400', verified: 'bg-sky-500/15 text-sky-400', enrolled: 'bg-emerald-500/15 text-emerald-400', cancelled: 'bg-rose-500/15 text-rose-400' };
const STATUS_BN = { pending: 'অপেক্ষমাণ', verified: 'যাচাইকৃত', enrolled: 'ভর্তি নিশ্চিত', cancelled: 'বাতিল' };
const money = (n) => `৳${Number(n || 0).toLocaleString('bn-BD')}`;

export default function AdmissionsManager() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sel, setSel] = useState(null);
  const [pay, setPay] = useState({ paidAmount: '', method: 'cash', trxId: '', note: '' });
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => { const r = await api('GET', '/api/admin/admissions'); if (r.ok) setItems(r.data.items); else setMsg(r.data.error); }, []);
  useEffect(() => { load(); }, [load]);

  const open = (a) => { setSel(a); setPay({ paidAmount: a.payment?.paidAmount || '', method: a.payment?.method || 'cash', trxId: a.payment?.trxId || '', note: a.payment?.note || '' }); setMsg(''); };
  async function patch(body) {
    const r = await api('PATCH', '/api/admin/admissions', { id: sel._id, ...body });
    if (!r.ok) return setMsg(r.data.error);
    await load(); const fresh = (await api('GET', '/api/admin/admissions')).data.items.find((x) => x._id === sel._id); setSel(fresh || null); setMsg('✓ সংরক্ষিত');
  }
  async function remove(a) { if (confirm('আবেদনটি স্থায়ীভাবে মুছবেন?')) { await api('DELETE', `/api/admin/admissions?id=${a._id}`); setSel(null); load(); } }

  const list = items.filter((a) => filter === 'all' || a.status === filter);
  const due = sel ? Math.max(0, (sel.fee || 0) - Number(pay.paidAmount || 0)) : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">{['all', 'pending', 'verified', 'enrolled', 'cancelled'].map((s) => <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filter === s ? 'border-brand text-brand bg-brand/10' : 'border-line text-muted'}`}>{s === 'all' ? 'সব' : STATUS_BN[s]} ({s === 'all' ? items.length : items.filter((a) => a.status === s).length})</button>)}</div>
        <button onClick={() => downloadCsv('admissions.csv', toCsv(items.map((a) => ({ ...a, paid: a.payment?.paidAmount || 0, method: a.payment?.method || '' })), ['token', 'fullName', 'phone', 'email', 'courseName', 'fee', 'paid', 'method', 'status', 'createdAt']))} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface2 text-xs font-bold"><Download className="w-3.5 h-3.5" />CSV</button>
      </div>
      {msg && !sel && <p className="text-sm text-rose-400">{msg}</p>}
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm min-w-[760px]">
          <thead className="bg-surface text-left text-xs text-muted"><tr>{['Token', 'নাম', 'মোবাইল', 'কোর্স', 'ফি', 'জমা', 'স্ট্যাটাস'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{list.map((a) => (
            <tr key={a._id} onClick={() => open(a)} className="border-t border-line hover:bg-surface cursor-pointer">
              <td className="p-3 font-mono text-xs">{a.token}</td><td className="p-3 font-semibold">{a.fullName}</td><td className="p-3 font-mono text-xs">{a.phone}</td><td className="p-3 text-xs">{a.courseName}</td>
              <td className="p-3 font-mono text-xs">{money(a.fee)}</td><td className="p-3 font-mono text-xs">{money(a.payment?.paidAmount)}</td>
              <td className="p-3"><span className={`px-2 py-1 rounded-md text-[11px] font-bold ${STATUS_STYLE[a.status]}`}>{STATUS_BN[a.status] || a.status}</span></td>
            </tr>))}</tbody>
        </table>
        {list.length === 0 && <p className="p-6 text-center text-sm text-muted">কোনো আবেদন নেই</p>}
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-3 overflow-y-auto" onClick={() => setSel(null)}>
          <div className="w-full max-w-lg bg-surface border border-line rounded-2xl p-5 my-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start"><div><h3 className="font-black text-lg">{sel.fullName}</h3><p className="text-xs text-muted font-mono">{sel.token} · {sel.phone}</p></div><button onClick={() => setSel(null)} aria-label="Close"><X className="w-5 h-5" /></button></div>
            <p className="text-sm">{sel.courseName} · <b>{money(sel.fee)}</b>{sel.couponCode && <span className="text-brand"> ({sel.couponCode})</span>}</p>
            <div className="space-y-2"><span className="text-xs font-bold">ভর্তির অবস্থা</span>
              <div className="grid grid-cols-2 gap-2">{['pending', 'verified', 'enrolled', 'cancelled'].map((s) => <button key={s} onClick={() => patch({ status: s })} className={`py-2 rounded-lg text-xs font-bold border ${sel.status === s ? 'border-brand bg-brand/10 text-brand' : 'border-line text-muted'}`}>{STATUS_BN[s]}</button>)}</div></div>
            <div className="space-y-2 pt-3 border-t border-line"><span className="text-xs font-bold">পেমেন্ট</span>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" min="0" placeholder="জমা (৳)" value={pay.paidAmount} onChange={(e) => setPay({ ...pay, paidAmount: e.target.value })} className={inputCls} />
                <select value={pay.method} onChange={(e) => setPay({ ...pay, method: e.target.value })} className={inputCls}>{['cash', 'bkash', 'nagad', 'rocket', 'bank', 'other'].map((m) => <option key={m}>{m}</option>)}</select>
                <input placeholder="Transaction ID" value={pay.trxId} onChange={(e) => setPay({ ...pay, trxId: e.target.value })} className={inputCls} />
                <input placeholder="নোট" value={pay.note} onChange={(e) => setPay({ ...pay, note: e.target.value })} className={inputCls} />
              </div>
              <p className="text-xs">বাকি: <b className={due > 0 ? 'text-amber-400' : 'text-brand'}>{money(due)}</b>{due === 0 && ' · পরিশোধিত'}</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => patch({ payment: pay })} className="px-4 py-2 rounded-lg bg-surface2 text-xs font-bold">পেমেন্ট সংরক্ষণ</button>
                <button onClick={() => patch({ payment: pay, status: 'enrolled' })} className="px-4 py-2 rounded-lg bg-brand text-brand-fg text-xs font-bold">পেমেন্ট নিয়ে ভর্তি নিশ্চিত করুন</button>
              </div>
            </div>
            {msg && <p className="text-xs text-brand">{msg}</p>}
            <div className="flex justify-between pt-3 border-t border-line">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-bold text-muted"><Printer className="w-3.5 h-3.5" />রসিদ প্রিন্ট</button>
              <button onClick={() => remove(sel)} className="flex items-center gap-1.5 text-xs font-bold text-rose-400"><Trash2 className="w-3.5 h-3.5" />মুছুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
