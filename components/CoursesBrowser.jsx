'use client';
import { useState } from 'react';
import { CATEGORIES } from '@/data/courses';
import { useApp } from '@/app/providers';
import CourseCard from './CourseCard';

export default function CoursesBrowser({ courses = [], limit }) {
  const { tr } = useApp();
  const [cat, setCat] = useState('all');
  const [status, setStatus] = useState('all');
  const list = courses.filter((c) => (cat === 'all' || c.category === cat) && (status === 'all' || c.batch.status === status));
  const shown = limit ? list.slice(0, limit) : list;
  const statuses = [['all', 'সকল ব্যাচ', 'All Batches'], ['enrolling', 'ভর্তি চলছে', 'Enrolling'], ['full', 'ব্যাচ পূর্ণ', 'Full'], ['coming_soon', 'শীঘ্রই শুরু', 'Coming Soon']];
  return (
    <div className="space-y-6">
      {!limit && (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => <button key={c.id} onClick={() => setCat(c.id)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold border ${cat === c.id ? 'bg-brand text-brand-fg border-brand' : 'bg-surface border-line text-muted hover:text-fg'}`}>{tr(c.bn, c.en)}</button>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {statuses.map(([id, b, e]) => <button key={id} onClick={() => setStatus(id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${status === id ? 'border-brand text-brand bg-brand/10' : 'border-line text-muted'}`}>{tr(b, e)}</button>)}
          </div>
        </div>
      )}
      {shown.length === 0 ? (
        <div className="text-center py-12 rounded-2xl bg-surface border border-line">
          <p className="font-bold mb-2">{tr('কোনো কোর্স পাওয়া যায়নি', 'No courses found')}</p>
          <button onClick={() => { setCat('all'); setStatus('all'); }} className="px-4 py-2 rounded-xl bg-brand text-brand-fg text-sm font-bold">{tr('ফিল্টার রিসেট', 'Reset filters')}</button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{shown.map((c) => <CourseCard key={c.id} course={c} />)}</div>
      )}
    </div>
  );
}
