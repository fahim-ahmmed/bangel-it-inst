'use client';
import Link from 'next/link';
import { Clock, GraduationCap, Users } from 'lucide-react';
import { useApp } from '@/app/providers';

export default function TeacherDetail({ teacher: t }) {
  const { tr, num } = useApp();
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="rounded-2xl overflow-hidden border border-line bg-surface2 aspect-[4/5] md:aspect-auto md:h-fit">
        <img src={t.photo} alt={tr(t.nameBn, t.nameEn)} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      </div>
      <div className="md:col-span-2 space-y-5">
        <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-brand/10 text-brand">{tr(t.badgeBn, t.badgeEn)}</span>
        <h1 className="text-3xl sm:text-4xl font-black">{tr(t.nameBn, t.nameEn)}</h1>
        <p className="text-muted">{tr(t.roleBn, t.roleEn)}</p>
        <p className="leading-relaxed">{tr(t.bioBn, t.bioEn)}</p>
        <dl className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-4 rounded-xl bg-surface border border-line"><dt className="text-xs text-muted flex items-center gap-1"><Users className="w-3 h-3" />{tr('প্রশিক্ষিত শিক্ষার্থী', 'Students trained')}</dt><dd className="font-bold text-brand">{num(t.students)}+</dd></div>
          <div className="p-4 rounded-xl bg-surface border border-line"><dt className="text-xs text-muted">{tr('অভিজ্ঞতা', 'Experience')}</dt><dd className="font-bold">{tr(t.expBn, t.expEn)}</dd></div>
          <div className="p-4 rounded-xl bg-surface border border-line"><dt className="text-xs text-muted">{tr('বিভাগ', 'Category')}</dt><dd className="font-bold capitalize">{t.category}</dd></div>
        </dl>
        <p className="flex gap-2 p-4 rounded-xl bg-surface border border-line text-sm"><GraduationCap className="w-4 h-4 text-brand shrink-0 mt-0.5" />{tr(t.eduBn, t.eduEn)}</p>
        <p className="flex gap-2 p-4 rounded-xl bg-surface border border-line text-sm"><Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" />{tr(t.availBn, t.availEn)}</p>
        <div className="flex flex-wrap gap-2">{t.skills.map((s) => <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-surface2 text-muted">{s}</span>)}</div>
        <Link href="/admission" className="inline-block px-6 py-3 rounded-xl bg-brand text-brand-fg text-sm font-black">{tr('ভর্তি আবেদন করুন', 'Apply for admission')}</Link>
      </div>
    </div>
  );
}
