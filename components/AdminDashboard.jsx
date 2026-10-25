'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { api } from './admin/shared';
import ContentManager from './admin/ContentManager';
import AdmissionsManager from './admin/AdmissionsManager';
import CertificatesManager from './admin/CertificatesManager';
import SubscribersList from './admin/SubscribersList';
import SettingsManager from './admin/SettingsManager';
import HomeworkManager from './admin/HomeworkManager';

const TABS = [
  ['overview', 'ওভারভিউ'], ['admissions', 'ভর্তি ও পেমেন্ট'], ['courses', 'কোর্স'], ['teachers', 'শিক্ষক'], ['roadmap', 'রোডম্যাপ'],
  ['testimonials', 'রিভিউ'], ['notices', 'নোটিশ'], ['facilities', 'সুবিধা'], ['homework', 'হোমওয়ার্ক'], ['certificates', 'সনদ'], ['subscribers', 'নিউজলেটার'], ['settings', 'সাইট সেটিংস'],
];
const money = (n) => `৳${Number(n || 0).toLocaleString('bn-BD')}`;

function Overview() {
  const [s, setS] = useState(null);
  useEffect(() => { api('GET', '/api/admin/stats').then((r) => r.ok && setS(r.data)); }, []);
  if (!s) return <p className="text-sm text-muted">লোড হচ্ছে... (MongoDB সংযুক্ত আছে কি না দেখুন)</p>;
  const cards = [['মোট আবেদন', s.admissions.total], ['অপেক্ষমাণ', s.admissions.pending], ['যাচাইকৃত', s.admissions.verified], ['ভর্তি নিশ্চিত', s.admissions.enrolled], ['বাতিল', s.admissions.cancelled], ['মোট বিল', money(s.money.billed)], ['জমা হয়েছে', money(s.money.paid)], ['বাকি', money(s.money.due)], ['সাবস্ক্রাইবার', s.subscribers], ['সনদ', s.certificates]];
  return <div className="grid grid-cols-2 md:grid-cols-5 gap-3">{cards.map(([k, v]) => <div key={k} className="p-4 rounded-xl bg-surface border border-line"><p className="text-xs text-muted">{k}</p><p className="text-xl font-black text-brand mt-1">{v}</p></div>)}</div>;
}

export default function AdminDashboard({ email }) {
  const router = useRouter();
  const [tab, setTab] = useState('overview');
  async function logout() { await api('POST', '/api/admin/logout'); router.push('/admin/login'); router.refresh(); }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-black">অ্যাডমিন ড্যাশবোর্ড</h1><p className="text-xs text-muted">{email}</p></div>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface2 text-sm font-bold"><LogOut className="w-4 h-4" />লগআউট</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">{TABS.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold border ${tab === id ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}>{label}</button>)}</div>
      {tab === 'overview' && <Overview />}
      {tab === 'admissions' && <AdmissionsManager />}
      {['courses', 'teachers', 'roadmap', 'testimonials', 'notices', 'facilities'].includes(tab) && <ContentManager key={tab} type={tab} />}
      {tab === 'homework' && <HomeworkManager />}
      {tab === 'certificates' && <CertificatesManager />}
      {tab === 'subscribers' && <SubscribersList />}
      {tab === 'settings' && <SettingsManager />}
    </div>
  );
}
