'use client';
import { useEffect, useState } from 'react';
import { SETTINGS_FIELDS } from '@/lib/schemas';
import { api } from './shared';
import FieldInput from './FieldInput';

export default function SettingsManager() {
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState('');
  useEffect(() => { api('GET', '/api/admin/settings').then((r) => r.ok && setForm(r.data.settings)); }, []);
  if (!form) return <p className="text-sm text-muted">লোড হচ্ছে...</p>;
  async function save(e) {
    e.preventDefault();
    const r = await api('PUT', '/api/admin/settings', form);
    setMsg(r.ok ? '✓ সংরক্ষিত হয়েছে — সাইটে সাথে সাথে দেখাবে' : r.data.error);
  }
  return (
    <form onSubmit={save} className="p-5 rounded-2xl bg-surface border border-line space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">{SETTINGS_FIELDS.map((fd) => <FieldInput key={fd.key} field={fd} value={form[fd.key]} onChange={(v) => setForm({ ...form, [fd.key]: v })} />)}</div>
      {msg && <p className="text-sm text-brand">{msg}</p>}
      <button className="px-5 py-2.5 rounded-xl bg-brand text-brand-fg text-sm font-bold">সংরক্ষণ করুন</button>
    </form>
  );
}
