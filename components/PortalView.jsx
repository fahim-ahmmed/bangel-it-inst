'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogOut, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '@/app/providers';
import { signOut } from '@/lib/auth-client';
import DrivePortal from './DrivePortal';
import HomeworkPanel from './HomeworkPanel';

export default function PortalView({ user, admissions }) {
  const { tr, settings } = useApp();
  const router = useRouter();
  const [tab, setTab] = useState('overview');
  const TABS = [['overview', 'ওভারভিউ', 'Overview'], ['drive', 'ক্লাউড ফাইল', 'Cloud files'], ['homework', 'হোমওয়ার্ক জমা', 'Homework'], ['routine', 'ক্লাস রুটিন', 'Class routine']];
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-surface border border-line flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {user.image ? <img src={user.image} alt="" referrerPolicy="no-referrer" className="w-14 h-14 rounded-2xl object-cover" /> : <span className="w-14 h-14 rounded-2xl bg-brand/15 text-brand font-black text-xl flex items-center justify-center">{user.name?.[0]?.toUpperCase()}</span>}
          <div className="min-w-0"><h1 className="font-black text-lg truncate">{user.name}</h1><p className="text-sm text-muted font-mono truncate">{user.email}</p></div>
        </div>
        <button onClick={async () => { await signOut(); router.push('/'); router.refresh(); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface2 text-sm font-bold"><LogOut className="w-4 h-4" />{tr('লগআউট', 'Log out')}</button>
      </div>

      <div className="flex flex-wrap gap-2">{TABS.map(([id, b, e]) => <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold border ${tab === id ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}>{tr(b, e)}</button>)}</div>

      {tab === 'overview' && (
        <>
      <section className="space-y-3">
        <h2 className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-brand" />{tr('আমার ভর্তি আবেদনসমূহ', 'My admission applications')}</h2>
        {admissions.length === 0 ? (
          <p className="p-5 rounded-xl bg-surface border border-line text-sm text-muted">{tr('এখনো কোনো আবেদন নেই।', 'No applications yet.')} <Link href="/admission" className="text-brand font-bold">{tr('ভর্তি আবেদন করুন', 'Apply now')}</Link></p>
        ) : (
          <ul className="space-y-2">{admissions.map((a) => (
            <li key={a.token} className="p-4 rounded-xl bg-surface border border-line flex flex-wrap justify-between gap-2 text-sm">
              <span><b>{a.courseName}</b><span className="block text-xs text-muted font-mono">{a.token} · {new Date(a.createdAt).toLocaleDateString()}</span></span>
              <span className="px-2 py-1 h-fit rounded-md bg-brand/10 text-brand text-xs font-bold">{a.status}</span>
            </li>))}</ul>
        )}
      </section>

        </>
      )}

      {tab === 'drive' && <section className="space-y-3"><h2 className="font-bold">Google Drive · Sheets · Docs</h2><DrivePortal /></section>}
      {tab === 'homework' && <HomeworkPanel />}
      {tab === 'routine' && (
        <ul className="space-y-3">
          {[['সাপ্তাহিক ক্লাস: রবি, মঙ্গল, বৃহস্পতি', 'সকাল ১০:০০ - ১২:০০'], ['শুক্রবার স্পেশাল ল্যাব প্র্যাকটিস', 'বিকাল ৩:০০ - ৫:০০'], ['BTEB বোর্ড ফাইনাল মক টেস্ট', 'মাসের শেষ শনিবার']].map(([t, h]) => <li key={t} className="p-4 rounded-xl bg-surface border border-line flex flex-wrap justify-between gap-2 text-sm"><b>{t}</b><span className="text-brand font-mono text-xs font-bold">{h}</span></li>)}
          <li className="text-xs text-muted">{tr('আপনার ব্যাচের সঠিক সময়ের জন্য ইনস্টিটিউটে যোগাযোগ করুন।', 'Contact the institute for your batch\'s exact timing.')}</li>
        </ul>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/verify" className="p-5 rounded-2xl bg-surface border border-line hover:border-brand/50 flex gap-3"><ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" /><span><b className="block">{tr('সনদ যাচাই', 'Verify certificate')}</b><span className="text-xs text-muted">{tr('BTEB সনদ অনলাইনে যাচাই করুন', 'Verify BTEB certificates online')}</span></span></Link>
        <a href={`tel:${settings.phone1}`} className="p-5 rounded-2xl bg-surface border border-line hover:border-brand/50"><b className="block">{tr('হেল্পলাইন', 'Helpline')}</b><span className="text-sm text-brand font-mono">{settings.phone1} / {settings.phone2}</span></a>
      </div>
    </div>
  );
}
