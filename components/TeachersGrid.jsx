'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/providers';

const CATS = [['all', 'সকল', 'All'], ['office', 'অফিস', 'Office'], ['coding', 'কোডিং', 'Coding'], ['design', 'ডিজাইন', 'Design'], ['freelancing', 'ফ্রিল্যান্সিং', 'Freelancing'], ['cyber', 'সাইবার', 'Cyber'], ['ict', 'আইসিটি', 'ICT'], ['spoken', 'স্পোকেন', 'Spoken']];

export default function TeachersGrid({ teachers = [], limit }) {
  const { tr, num } = useApp();
  const [cat, setCat] = useState('all');
  const list = (cat === 'all' ? teachers : teachers.filter((t) => t.category === cat));
  const shown = limit ? list.slice(0, limit) : list;
  return (
    <div className="space-y-6">
      {!limit && <div className="flex gap-2 overflow-x-auto pb-1">{CATS.map(([id, b, e]) => <button key={id} onClick={() => setCat(id)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold border ${cat === id ? 'bg-brand text-brand-fg border-brand' : 'bg-surface border-line text-muted'}`}>{tr(b, e)}</button>)}</div>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((t) => (
          <article key={t.id} className="rounded-2xl bg-surface border border-line overflow-hidden hover:border-brand/50 transition-colors">
            <div className="aspect-[4/3] bg-surface2 overflow-hidden"><img src={t.photo} alt={tr(t.nameBn, t.nameEn)} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" /></div>
            <div className="p-4 space-y-2">
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand/10 text-brand">{tr(t.badgeBn, t.badgeEn)}</span>
              <h3 className="font-bold"><Link href={`/teachers/${t.id}`} className="hover:text-brand">{tr(t.nameBn, t.nameEn)}</Link></h3>
              <p className="text-xs text-muted leading-snug">{tr(t.roleBn, t.roleEn)}</p>
              <p className="text-xs flex justify-between text-muted"><span>{tr(t.expBn, t.expEn)}</span><span>{num(t.students)}+ {tr('শিক্ষার্থী', 'students')}</span></p>
              <div className="flex flex-wrap gap-1">{t.skills.slice(0, 4).map((s) => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-surface2 text-muted">{s}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
