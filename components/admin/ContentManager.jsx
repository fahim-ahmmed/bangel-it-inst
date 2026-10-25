'use client';
import { useCallback, useEffect, useState } from 'react';
import { Trash2, Pencil, Plus, Eye } from 'lucide-react';
import { CONTENT_SCHEMAS, getPath, setPath } from '@/lib/schemas';
import { api } from './shared';
import FieldInput from './FieldInput';

function toForm(fields, item) {
  const f = {};
  fields.forEach((fd) => {
    let v = getPath(item || {}, fd.key);
    if (v === undefined) v = fd.default;
    if (fd.type === 'lines' && Array.isArray(v)) v = v.join('\n');
    if (fd.type === 'csv' && Array.isArray(v)) v = v.join(', ');
    setPath(f, fd.key, v);
  });
  return f;
}

export default function ContentManager({ type }) {
  const schema = CONTENT_SCHEMAS[type];
  const [items, setItems] = useState([]);
  const [touched, setTouched] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const r = await api('GET', `/api/admin/content/${type}`);
    if (!r.ok) return setMsg(r.data.error || 'Error');
    setItems(r.data.items); setTouched(r.data.touched);
  }, [type]);
  useEffect(() => { setEditing(null); load(); }, [load]);

  const open = (item) => { setEditing(item || 'new'); setForm(toForm(schema.fields, item)); setMsg(''); };
  const bind = (fd) => ({ field: fd, value: getPath(form, fd.key), onChange: (v) => setForm((p) => { const n = structuredClone(p); setPath(n, fd.key, v); return n; }) });

  async function save(e) {
    e.preventDefault();
    const isNew = editing === 'new';
    const r = isNew ? await api('POST', `/api/admin/content/${type}`, form) : await api('PUT', `/api/admin/content/${type}`, { ...form, _id: editing._id });
    if (!r.ok) return setMsg(r.data.error || 'Error');
    setEditing(null); load();
  }
  async function remove(item) {
    if (!confirm('নিশ্চিতভাবে মুছে ফেলবেন? / Delete permanently?')) return;
    await api('DELETE', `/api/admin/content/${type}?id=${item._id}`); load();
  }
  async function importDefaults() {
    const r = await api('POST', `/api/admin/content/${type}`, { action: 'import-defaults' });
    setMsg(r.ok ? `${r.data.imported} টি ডিফল্ট আইটেম ইমপোর্ট হয়েছে` : r.data.error); load();
  }

  if (editing) {
    return (
      <form onSubmit={save} className="p-5 rounded-2xl bg-surface border border-line space-y-4">
        <h2 className="font-bold">{editing === 'new' ? 'নতুন যোগ করুন' : 'সম্পাদনা'} — {schema.title[0]}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {schema.fields.map((fd) => <FieldInput key={fd.key} {...bind(fd)} disabled={fd.slug && editing !== 'new'} />)}
        </div>
        {msg && <p className="text-sm text-rose-400">{msg}</p>}
        <div className="flex gap-2"><button className="px-5 py-2.5 rounded-xl bg-brand text-brand-fg text-sm font-bold">সংরক্ষণ</button><button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl bg-surface2 text-sm font-bold">বাতিল</button></div>
      </form>
    );
  }

  const visBadge = { published: 'bg-emerald-500/15 text-emerald-400', draft: 'bg-amber-500/15 text-amber-400', cancelled: 'bg-rose-500/15 text-rose-400' };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted">{items.length} {schema.title[0]}</p>
        <button onClick={() => open(null)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-brand-fg text-sm font-bold"><Plus className="w-4 h-4" />নতুন যোগ করুন</button>
      </div>
      {!touched && items.length === 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm space-y-2">
          <p>এখন সাইটে ডিফল্ট (কোডে থাকা) ডাটা দেখানো হচ্ছে। সম্পাদনা করতে আগে ডিফল্ট ডাটা ইমপোর্ট করুন।</p>
          <button onClick={importDefaults} className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold">ডিফল্ট ডাটা ইমপোর্ট করুন</button>
        </div>
      )}
      {msg && <p className="text-sm text-amber-400">{msg}</p>}
      <ul className="rounded-xl border border-line divide-y divide-line">
        {items.map((it) => (
          <li key={it._id} className="p-3 flex items-center justify-between gap-3">
            <span className="min-w-0 text-sm">
              <b className="block truncate">{it[schema.labelKey] || it.id}</b>
              <span className="text-xs text-muted font-mono">{it.id}</span>
              {it.visibility && <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded ${visBadge[it.visibility]}`}>{it.visibility}</span>}
              {it.batch?.status && <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-surface2 text-muted">{it.batch.status}</span>}
            </span>
            <span className="flex items-center gap-1 shrink-0">
              {type === 'courses' && (
                it.visibility === 'cancelled'
                  ? <button onClick={async () => { await api('PUT', '/api/admin/content/courses', { _id: it._id, visibility: 'published' }); load(); }} className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold">চালু করুন</button>
                  : <button onClick={async () => { if (confirm('কোর্সটি বাতিল করবেন? সাইট থেকে লুকিয়ে যাবে।')) { await api('PUT', '/api/admin/content/courses', { _id: it._id, visibility: 'cancelled' }); load(); } }} className="px-2.5 py-1.5 rounded-lg bg-rose-500/15 text-rose-400 text-xs font-bold">বাতিল</button>
              )}
              <button onClick={() => open(it)} aria-label="Edit" className="p-2 rounded-lg hover:bg-surface2"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(it)} aria-label="Delete" className="p-2 rounded-lg hover:bg-surface2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
            </span>
          </li>
        ))}
        {items.length === 0 && <li className="p-6 text-center text-sm text-muted">কিছু নেই</li>}
      </ul>
    </div>
  );
}
