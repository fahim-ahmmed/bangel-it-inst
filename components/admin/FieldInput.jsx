'use client';
import { useState } from 'react';
import { inputCls } from './shared';

// Renders one schema field. `value` is already in editable form (lines/csv as strings).
export default function FieldInput({ field, value, onChange, disabled }) {
  const common = { disabled, className: inputCls };
  const [upErr, setUpErr] = useState('');
  let input;
  if (field.type === 'textarea' || field.type === 'lines') input = <textarea rows={field.type === 'lines' ? 5 : 3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...common} />;
  else if (field.type === 'number') input = <input type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...common} />;
  else if (field.type === 'image') input = (
    <div className="space-y-2">
      <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="https://... বা আপলোড" {...common} />
      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; setUpErr(''); const fd = new FormData(); fd.append('file', f); const r = await fetch('/api/admin/media', { method: 'POST', body: fd }); const d = await r.json().catch(() => ({})); if (r.ok) onChange(d.url); else setUpErr(d.error || 'Upload failed'); e.target.value = ''; }} className="text-xs" />
      {upErr && <p className="text-rose-400 font-normal">{upErr}</p>}
      {value && <img src={value} alt="" className="h-20 w-20 object-cover rounded-lg border border-line" />}
    </div>
  );
  else if (field.type === 'bool') input = <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 accent-emerald-500" />;
  else if (field.type === 'select') input = <select value={value ?? field.default ?? field.options[0]} onChange={(e) => onChange(e.target.value)} {...common}>{field.options.map((o) => <option key={o}>{o}</option>)}</select>;
  else input = <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...common} />;
  return (
    <label className={`block text-xs font-bold space-y-1 ${field.type === 'textarea' || field.type === 'lines' ? 'sm:col-span-2' : ''}`}>
      <span>{field.label}{field.required && ' *'}</span>
      {input}
    </label>
  );
}
