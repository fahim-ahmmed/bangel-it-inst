'use client';
import { useState } from 'react';
import { Monitor, Keyboard, FileText, Table, Presentation, Cloud, Cpu, Image as Img, ShieldCheck, Award, ChevronRight, CheckCircle } from 'lucide-react';
import { useApp } from '@/app/providers';

const ICONS = { Monitor, Keyboard, FileText, Table, Presentation, Cloud, Cpu, Image: Img, ShieldCheck, Award };

export default function RoadmapView({ items: ROADMAP = [] }) {
  const { tr } = useApp();
  const [i, setI] = useState(0);
  if (ROADMAP.length === 0) return null;
  const d = ROADMAP[Math.min(i, ROADMAP.length - 1)];
  const Icon = ICONS[d.icon] || Monitor;
  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-6 rounded-2xl bg-surface border border-line overflow-hidden">
        <div className="px-4 py-2 border-b border-line text-xs text-muted flex justify-between"><span className="font-mono">Bright OS · Lab PC #14</span><span className="text-brand font-bold">{d.day} / {ROADMAP.length}</span></div>
        <div className="p-5 sm:p-6 space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-brand/15 text-brand text-xs font-bold">{tr(d.hBn, d.hEn)}</span>
          <div className="flex gap-4 items-start"><div className="p-3 rounded-xl bg-brand/10 text-brand shrink-0"><Icon className="w-6 h-6" /></div><h3 className="text-xl font-black leading-snug">{tr(d.tBn, d.tEn)}</h3></div>
          <p className="text-sm text-muted leading-relaxed p-4 rounded-xl bg-bg border border-line">{tr(d.dBn, d.dEn)}</p>
          <div><div className="flex justify-between text-xs mb-1"><span className="text-muted">{tr('রোডম্যাপ সম্পন্নতা', 'Roadmap progress')}</span><span className="text-brand font-bold">{Math.round(((i + 1) / ROADMAP.length) * 100)}%</span></div>
            <div className="h-2 rounded-full bg-surface2 overflow-hidden"><div className="h-full bg-brand transition-all" style={{ width: `${Math.round(((i + 1) / ROADMAP.length) * 100)}%` }} /></div></div>
          <div className="flex justify-between gap-2">
            <button disabled={i === 0} onClick={() => setI(i - 1)} className="px-3 py-2 rounded-lg bg-surface2 text-xs disabled:opacity-30">{tr('← আগের দিন', '← Previous')}</button>
            <button disabled={i >= ROADMAP.length - 1} onClick={() => setI(i + 1)} className="px-3 py-2 rounded-lg bg-brand text-brand-fg text-xs font-bold disabled:opacity-30">{tr('পরের দিন →', 'Next →')}</button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-6 space-y-2.5 lg:max-h-[520px] lg:overflow-y-auto">
        {ROADMAP.map((r, idx) => { const I = ICONS[r.icon] || Monitor; const sel = idx === i; return (
          <button key={r.id || r.day} onClick={() => setI(idx)} className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 ${sel ? 'bg-surface border-brand' : 'bg-bg border-line hover:border-muted'}`}>
            <span className="flex items-center gap-3 min-w-0"><span className={`p-2 rounded-lg shrink-0 ${sel ? 'bg-brand text-brand-fg' : 'bg-surface2 text-muted'}`}><I className="w-4 h-4" /></span>
              <span className="min-w-0"><span className="text-xs font-mono font-bold text-muted">{r.day} · {tr(r.hBn, r.hEn)}</span><span className="block text-sm font-bold truncate">{tr(r.tBn, r.tEn)}</span></span></span>
            {sel ? <CheckCircle className="w-4 h-4 text-brand shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted shrink-0" />}
          </button>); })}
      </div>
    </div>
  );
}
