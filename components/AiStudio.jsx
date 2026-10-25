'use client';
import { useState } from 'react';
import { Sparkles, Download, Upload, Wand2 } from 'lucide-react';
import { useApp } from '@/app/providers';
import Button from './ui/Button';

const PRESETS = [['কম্পিউটার ল্যাব', 'Computer lab', 'Students working in a modern AC computer lab with dual monitors in Kushtia, Bangladesh', 'Modern Lab'], ['এআই ও কোডিং', 'AI & coding', 'A young programmer building an AI project with glowing code on screen', 'AI & Coding'], ['সাইবার সিকিউরিটি', 'Cyber security', 'Cyber security operations room with neon dashboards and shield icons', 'Cyber Neon'], ['গ্রাফিক ডিজাইন', 'Graphic design', 'Creative graphic design workspace with a drawing tablet and colorful brand mockups', '3D Digital Art']];
const STYLES = ['Modern Lab', 'Computer Technology', 'AI & Coding', 'Photorealistic Studio', 'Cyber Neon', '3D Digital Art'];

export default function AiStudio() {
  const { tr } = useApp();
  const [prompt, setPrompt] = useState('Students collaborating in a high-tech computer lab with modern PCs in Bright Tec. Park Kushtia');
  const [style, setStyle] = useState('Modern Lab');
  const [aspect, setAspect] = useState('16:9');
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [mode, setMode] = useState('generate');
  const [src, setSrc] = useState('');

  async function generate() {
    setBusy(true); setErr('');
    try {
      const res = await fetch('/api/ai-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, style, aspect, action: mode, image: mode === 'edit' ? src || url : undefined }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUrl(data.url);
    } catch (e) { setErr(e.message || tr('ছবি তৈরি করা যায়নি', 'Could not generate image')); }
    setBusy(false);
  }

  function onUpload(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { setSrc(r.result); setUrl(r.result); setMode('edit'); };
    r.readAsDataURL(f);
  }

  async function save() {
    try {
      const blob = await (await fetch(url)).blob();
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `bengal-${Date.now()}.png`; a.click();
    } catch { window.open(url, '_blank'); }
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-surface border border-line rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-2 gap-2">{[['generate', 'টেক্সট টু ইমেজ', 'Text to image', Sparkles], ['edit', 'ইমেজ এডিট', 'Edit image', Wand2]].map(([id, b, e, I]) => <button key={id} onClick={() => setMode(id)} className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border ${mode === id ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}><I className="w-3.5 h-3.5" />{tr(b, e)}</button>)}</div>
        {mode === 'edit' && <label className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-line text-xs font-semibold cursor-pointer hover:border-brand"><Upload className="w-4 h-4 text-brand" />{tr('ডিভাইস থেকে ছবি আপলোড (বা বর্তমান ছবি এডিট হবে)', 'Upload an image (or edit the current one)')}<input type="file" accept="image/*" className="hidden" onChange={onUpload} /></label>}
        <div className="flex flex-wrap gap-1.5">{PRESETS.map(([b, e, p, st]) => <button key={e} onClick={() => { setPrompt(p); setStyle(st); setMode('generate'); }} className="text-[11px] px-2.5 py-1 rounded-lg bg-bg border border-line hover:border-brand text-muted">⚡ {tr(b, e)}</button>)}</div>
        <label className="block text-xs font-bold space-y-1"><span>{tr('প্রজেক্ট প্রম্পট', 'Project prompt')}</span><textarea rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-sm outline-none focus:border-brand resize-none" /></label>
        <div><span className="text-xs font-bold block mb-2">{tr('স্টাইল', 'Style')}</span><div className="flex flex-wrap gap-2">{STYLES.map((s) => <button key={s} onClick={() => setStyle(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${style === s ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}>{s}</button>)}</div></div>
        <div><span className="text-xs font-bold block mb-2">{tr('অনুপাত', 'Aspect ratio')}</span><div className="grid grid-cols-4 gap-2">{['16:9', '1:1', '4:3', '9:16'].map((a) => <button key={a} onClick={() => setAspect(a)} className={`py-2 rounded-lg text-xs font-bold border ${aspect === a ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}>{a}</button>)}</div></div>
        {err && <p className="text-sm text-rose-400">{err}</p>}
        <Button onPress={generate} isDisabled={busy} className="w-full"><Sparkles className="w-4 h-4 mr-2" />{busy ? tr('প্রসেস হচ্ছে...', 'Working...') : mode === 'edit' ? tr('ছবি এডিট করুন', 'Edit image') : tr('ছবি তৈরি করুন', 'Generate image')}</Button>
      </div>
      <div className="lg:col-span-7 bg-surface border border-line rounded-2xl p-4 space-y-3">
        <div className="min-h-[260px] rounded-xl bg-bg flex items-center justify-center overflow-hidden">
          {url ? <img src={url} alt="AI generated" className="w-full h-auto object-contain" /> : <p className="text-sm text-muted p-6 text-center">{tr('প্রম্পট দিয়ে ছবি তৈরি করুন', 'Generate an image from your prompt')}</p>}
        </div>
        {url && <button onClick={save} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-brand-fg text-sm font-bold"><Download className="w-4 h-4" />{tr('ডিভাইসে সেভ করুন', 'Save to device')}</button>}
      </div>
    </div>
  );
}
