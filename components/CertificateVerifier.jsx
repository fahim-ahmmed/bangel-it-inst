'use client';
import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Printer, Award, X } from 'lucide-react';
import { useApp } from '@/app/providers';
import { INSTITUTE } from '@/data/institute';
import Button from './ui/Button';
import Logo from './Logo';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';

export default function CertificateVerifier() {
  const { tr } = useApp();
  const [q, setQ] = useState('');
  const [state, setState] = useState({ status: 'idle' });
  const [preview, setPreview] = useState(false);

  async function verify(value) {
    const v = (value ?? q).trim();
    if (v.length < 3) return setState({ status: 'error', message: tr('সঠিক সার্টিফিকেট আইডি, রোল বা রেজিস্ট্রেশন নম্বর দিন।', 'Enter a valid certificate ID, roll or registration number.') });
    setState({ status: 'loading' });
    try {
      const res = await fetch(`/api/certificates?q=${encodeURIComponent(v)}`);
      const data = await res.json();
      if (res.ok && data.certificate) setState({ status: 'found', c: data.certificate });
      else setState({ status: 'error', message: tr(`"${v}" নম্বরে কোনো সনদ রেকর্ড পাওয়া যায়নি।`, `No certificate record found for "${v}".`) });
    } catch { setState({ status: 'error', message: tr('যাচাই করা যায়নি, আবার চেষ্টা করুন।', 'Could not verify, please retry.') }); }
  }

  return (
    <div className="max-w-2xl mx-auto bg-surface border border-line rounded-2xl p-5 sm:p-8">
      <form onSubmit={(e) => { e.preventDefault(); verify(); }} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr('সার্টিফিকেট আইডি / রোল / রেজিস্ট্রেশন নম্বর', 'Certificate ID / Roll / Reg. No.')} className="w-full pl-10 pr-3 py-3 rounded-xl bg-bg border border-line text-sm font-mono outline-none focus:border-brand" /></div>
        <Button type="submit" isDisabled={state.status === 'loading'}>{state.status === 'loading' ? tr('যাচাই হচ্ছে...', 'Verifying...') : tr('সনদ যাচাই করুন', 'Verify')}</Button>
      </form>
      <div className="mt-4 pt-3 border-t border-line flex flex-wrap items-center gap-2 text-xs text-muted">
        <span>{tr('ক্লিক করে টেস্ট করুন:', 'Try a sample ID:')}</span>
        {['BCTI-2024-101', 'BCTI-2025-248', 'BCTI-2026-007', 'BTEB-27117-092'].map((id) => <button key={id} type="button" onClick={() => { setQ(id); verify(id); }} className="px-2 py-1 rounded-md bg-bg border border-line hover:border-brand text-brand font-mono text-[11px]">{id}</button>)}
      </div>
      {state.status === 'error' && <p className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2"><XCircle className="w-4 h-4 shrink-0" />{state.message}</p>}
      {state.status === 'found' && (
        <div className="mt-6 p-5 rounded-xl bg-bg border border-brand/40 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-line">
            <span className="flex items-center gap-2 text-brand font-bold"><CheckCircle2 className="w-5 h-5" />{tr('সনদটি ভেরিফাইড', 'Certificate verified')}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand/15 text-brand font-mono font-bold">BTEB {INSTITUTE.btebCode}</span>
          </div>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            {[[tr('শিক্ষার্থী', 'Student'), state.c.studentName], [tr('পিতা', 'Father'), state.c.fatherName], [tr('কোর্স', 'Course'), state.c.courseName], [tr('সেশন', 'Session'), state.c.session], [tr('সার্টিফিকেট নং', 'Certificate No'), state.c.certificateNo], [tr('রোল', 'Roll'), state.c.rollNo], [tr('রেজিস্ট্রেশন', 'Reg. No'), state.c.regNo], [tr('গ্রেড', 'Grade'), state.c.cgpa || state.c.grade], [tr('ইস্যুর তারিখ', 'Issued'), state.c.issueDate]].map(([k, v]) => (
              <div key={k}><dt className="text-xs text-muted">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          <button onClick={() => setPreview(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand text-brand-fg text-xs font-bold"><Award className="w-3.5 h-3.5" />{tr('অফিশিয়াল সার্টিফিকেট প্রিভিউ', 'Official certificate preview')}</button>
        </div>
      )}
      {preview && state.status === 'found' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-3 overflow-y-auto print:static print:bg-white" onClick={() => setPreview(false)}>
          <div className="relative w-full max-w-3xl bg-slate-900 text-slate-100 rounded-2xl border-2 border-amber-500/50 p-5 sm:p-8 my-6" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-3 right-3 flex gap-2 print:hidden">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold"><Printer className="w-3.5 h-3.5" />{tr('প্রিন্ট', 'Print')}</button>
              <button onClick={() => setPreview(false)} aria-label="Close" className="p-1.5 rounded-lg bg-slate-800"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 sm:p-8 rounded-xl border border-amber-500/30 text-center space-y-3">
              <div className="flex items-center justify-center gap-4"><BtebLogo className="h-12 w-12" /><Logo className="h-12 w-auto text-white" /><GovRegLogo className="h-12 w-12" /></div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-widest">BRIGHT TEC. PARK</h3>
              <p className="text-xs text-slate-300">বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত প্রতিষ্ঠান · কোড: ২৭১১৭</p>
              <p className="text-sm font-bold text-emerald-400 tracking-wider uppercase">Certificate of Completion</p>
              <p className="text-xs text-slate-400 pt-3">This is to certify that</p>
              <h4 className="text-2xl sm:text-3xl font-black underline decoration-amber-500/60 underline-offset-8">{state.c.studentName}</h4>
              <p className="text-xs text-slate-400">পিতা: {state.c.fatherName}</p>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">has successfully completed the professional training on <b className="text-amber-300">{state.c.courseName}</b> under session <span className="font-mono text-emerald-300">{state.c.session}</span>.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left">
                {[['Certificate ID', state.c.certificateNo], ['Roll', state.c.rollNo], ['Reg. No', state.c.regNo], ['Grade', state.c.cgpa || state.c.grade]].map(([k, v]) => <div key={k}><span className="text-slate-400 block text-[10px]">{k}</span><span className="font-mono font-bold text-emerald-400">{v}</span></div>)}
              </div>
              <div className="flex justify-between pt-6 text-xs text-slate-400"><span>কোর্স কো-অর্ডিনেটর</span><span className="text-emerald-400 font-mono">VERIFIED ONLINE</span><span>পরিচালক / অধ্যক্ষ</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
