'use client';
import Link from 'next/link';
import { Clock, Award, ArrowLeft } from 'lucide-react';
import { useApp } from '@/app/providers';
import StatusLabel from './ui/StatusLabel';

export default function CourseDetail({ course }) {
  const { tr, num } = useApp();
  const b = course.batch;
  const left = Math.max(0, b.seats - b.enrolled);
  const cta = b.status === 'full' ? tr('পরবর্তী ব্যাচে ওয়েটলিস্ট আবেদন', 'Join Waitlist for Next Batch') : b.status === 'coming_soon' ? tr('অগ্রিম আসন প্রি-বুকিং', 'Pre-Book Seat') : tr('এই কোর্সে ভর্তি হতে আবেদন করুন', 'Apply for Admission');
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-brand font-bold"><Clock className="w-4 h-4" />{tr(course.durationBn, course.durationEn)} · {course.level}{course.bteb && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-400"><Award className="w-3 h-3" />BTEB</span>}</div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">{tr(course.titleBn, course.titleEn)}</h1>
          <p className="text-sm text-muted">{tr(course.titleEn, course.titleBn)}</p>
          <p className="leading-relaxed text-muted">{tr(course.descBn, course.descEn)}</p>
        </div>
        <section><h2 className="font-bold text-brand mb-3">{tr('সম্পূর্ণ পাঠ্যক্রম ও ল্যাব মডিউল', 'Full syllabus & lab modules')}</h2>
          <ol className="space-y-2">{course.modules.map((m, i) => <li key={i} className="flex gap-3 p-3 rounded-xl bg-surface border border-line text-sm"><span className="w-6 h-6 rounded-full bg-brand/15 text-brand text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>{m}</li>)}</ol></section>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-line"><h3 className="text-sm font-bold mb-2">{tr('সফটওয়্যার ও টুলস', 'Software & tools')}</h3><div className="flex flex-wrap gap-1.5">{course.software.map((s) => <span key={s} className="text-xs px-2 py-1 rounded-md bg-surface2 text-muted">{s}</span>)}</div></div>
          <div className="p-4 rounded-xl bg-surface border border-line"><h3 className="text-sm font-bold mb-2">{tr('ক্যারিয়ার সুযোগ', 'Career paths')}</h3><div className="flex flex-wrap gap-1.5">{course.careers.map((s) => <span key={s} className="text-xs px-2 py-1 rounded-md bg-brand/10 text-brand">{s}</span>)}</div></div>
        </div>
      </div>
      <aside className="lg:sticky lg:top-28 h-fit space-y-4 p-5 rounded-2xl bg-surface border border-line">
        <StatusLabel status={b.status} seatsLeft={left} tr={tr} />
        <div><span className="text-xs text-muted block">{tr('কোর্স ফি', 'Course fee')}</span><span className="text-3xl font-black text-brand">৳{num(course.discountFee)}</span> <span className="text-sm text-muted line-through">৳{num(course.fee)}</span></div>
        <dl className="text-sm space-y-2 pt-3 border-t border-line">
          <div className="flex justify-between gap-3"><dt className="text-muted">{tr('ব্যাচ', 'Batch')}</dt><dd className="font-semibold text-right">{tr(b.codeBn, b.codeEn)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-muted">{tr('আসন', 'Seats')}</dt><dd className="font-semibold">{num(b.enrolled)}/{num(b.seats)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-muted">{tr('শুরু', 'Start')}</dt><dd className="font-semibold text-right">{tr(b.startBn, b.startEn)}</dd></div>
        </dl>
        <Link href={`/admission?course=${course.id}`} className="block text-center py-3 rounded-xl bg-brand text-brand-fg text-sm font-black">{cta}</Link>
        <Link href="/courses" className="flex items-center justify-center gap-1 text-xs text-muted hover:text-brand"><ArrowLeft className="w-3 h-3" />{tr('সব কোর্স', 'All courses')}</Link>
      </aside>
    </div>
  );
}
