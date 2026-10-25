'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HardDrive, FileSpreadsheet, FileText, Folder, Upload, Plus, ExternalLink, RefreshCw } from 'lucide-react';
import { useApp } from '@/app/providers';
import { signIn } from '@/lib/auth-client';

const TABS = [['files', 'ফাইল', 'Files', HardDrive], ['sheets', 'স্প্রেডশিট', 'Sheets', FileSpreadsheet], ['docs', 'ডকুমেন্টস', 'Docs', FileText], ['folders', 'ফোল্ডার', 'Folders', Folder]];

export default function DrivePortal() {
  const { tr } = useApp();
  const [kind, setKind] = useState('files');
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ok | connect | error
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    setStatus('loading');
    const res = await fetch(`/api/drive?kind=${kind}`);
    const data = await res.json().catch(() => ({}));
    if (res.status === 403 || res.status === 401) return setStatus('connect');
    if (!res.ok) { setMsg(data.error || ''); return setStatus('error'); }
    setFiles(data.files); setStatus('ok');
  }, [kind]);

  useEffect(() => { load(); }, [load]);

  async function create(e) {
    e.preventDefault();
    if (kind === 'files' || !title.trim()) return;
    const res = await fetch('/api/drive', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, title }) });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setTitle(''); setMsg(''); window.open(data.link, '_blank', 'noopener'); load();
  }

  async function upload(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData(); fd.append('file', f);
    const res = await fetch('/api/drive/upload', { method: 'POST', body: fd });
    const data = await res.json();
    setMsg(res.ok ? tr('আপলোড সফল হয়েছে ✓', 'Uploaded ✓') : data.error);
    e.target.value = '';
    if (res.ok) load();
  }

  if (status === 'connect') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-line text-center space-y-3">
        <HardDrive className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="font-bold">{tr('Google Drive সংযুক্ত নেই', 'Google Drive not connected')}</h3>
        <p className="text-sm text-muted">{tr('ড্রাইভ, শিট ও ডক ব্যবহার করতে Google অ্যাকাউন্ট দিয়ে সাইন-ইন করুন।', 'Sign in with Google to use Drive, Sheets and Docs.')}</p>
        <button onClick={() => signIn.social({ provider: 'google', callbackURL: '/student-portal' })} className="px-5 py-3 rounded-xl bg-brand text-brand-fg text-sm font-bold">{tr('Google দিয়ে সংযুক্ত করুন', 'Connect Google')}</button>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-surface border border-line space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">{TABS.map(([id, b, e, I]) => <button key={id} onClick={() => setKind(id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border ${kind === id ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}><I className="w-3.5 h-3.5" />{tr(b, e)}</button>)}</div>
        <div className="flex gap-2">
          <button onClick={load} aria-label="Refresh" className="p-2 rounded-lg border border-line text-muted"><RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} /></button>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface2 text-xs font-bold"><Upload className="w-3.5 h-3.5" />{tr('আপলোড', 'Upload')}</button>
          <input ref={fileRef} type="file" className="hidden" onChange={upload} />
        </div>
      </div>
      {kind !== 'files' && (
        <form onSubmit={create} className="flex gap-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={tr('নতুন আইটেমের নাম', 'New item name')} className="flex-1 px-3 py-2.5 rounded-xl bg-bg border border-line text-sm outline-none focus:border-brand" />
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand text-brand-fg text-sm font-bold"><Plus className="w-4 h-4" />{tr('তৈরি', 'Create')}</button>
        </form>
      )}
      {msg && <p className="text-xs text-amber-400">{msg}</p>}
      {status === 'error' && <p className="text-sm text-rose-400">{tr('লোড করা যায়নি', 'Could not load')}</p>}
      <ul className="divide-y divide-line">
        {files.map((f) => (
          <li key={f.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
            <span className="truncate">{f.name}<span className="block text-[11px] text-muted">{new Date(f.modifiedTime).toLocaleString()}</span></span>
            <a href={f.webViewLink} target="_blank" rel="noopener noreferrer" className="shrink-0 text-brand" aria-label="Open"><ExternalLink className="w-4 h-4" /></a>
          </li>
        ))}
        {status === 'ok' && files.length === 0 && <li className="py-6 text-center text-sm text-muted">{tr('কিছু পাওয়া যায়নি', 'Nothing here yet')}</li>}
      </ul>
    </div>
  );
}
