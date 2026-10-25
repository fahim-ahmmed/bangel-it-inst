'use client';
import Link from 'next/link';
import { Clock, Award, ArrowRight } from 'lucide-react';
import { useApp } from '@/app/providers';
import StatusLabel from './ui/StatusLabel';

export default function CourseCard({ course }) {
  const { tr, num } = useApp();
  const { batch } = course;
  const left = Math.max(0, batch.seats - batch.enrolled);
  const pct = Math.min(100, Math.round((batch.enrolled / batch.seats) * 100));
  const cta = batch.status === 'full' ? tr('ওয়েটলিস্টে আবেদন করুন', 'Join Waitlist') : batch.status === 'coming_soon' ? tr('অগ্রিম আসন বুক করুন', 'Pre-Book Seat') : tr('ভর্তি হতে আবেদন করুন', 'Enroll Now');
  return (
    <article className="flex flex-col justify-between rounded-2xl bg-surface border border-line hover:border-brand/50 transition-colors overflow-hidden">
      <div className="p-5 space-y-3">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <StatusLabel status={batch.status} seatsLeft={left} tr={tr} />
          {course.bteb && <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-400"><Award className="w-3 h-3" />BTEB</span>}
        </div>
        <h3 className="text-lg font-bold leading-snug"><Link href={`/courses/${course.id}`} className="hover:text-brand">{tr(course.titleBn, course.titleEn)}</Link></h3>
        <p className="text-xs text-muted">{tr(course.titleEn, course.titleBn)}</p>
        <p className="flex items-center gap-2 text-xs text-brand font-medium"><Clock className="w-3.5 h-3.5" />{tr(course.durationBn, course.durationEn)} <span className="text-muted">· {course.level}</span></p>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">{tr(course.descBn, course.descEn)}</p>
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] text-muted"><span>{tr(batch.codeBn, batch.codeEn)}</span><span>{num(batch.enrolled)}/{num(batch.seats)}</span></div>
          <div className="h-1.5 rounded-full bg-surface2 overflow-hidden"><div className={`h-full ${batch.status === 'full' ? 'bg-rose-500' : 'bg-brand'}`} style={{ width: `${pct}%` }} /></div>
        </div>
      </div>
      <div className="p-5 pt-4 border-t border-line space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase text-muted block">{tr('কোর্স ফি', 'Course Fee')}</span>
            <span className="text-xl font-black text-brand">৳{num(course.discountFee)}</span>{' '}
            <span className="text-xs text-muted line-through">৳{num(course.fee)}</span>
          </div>
          <Link href={`/courses/${course.id}`} className="text-xs font-semibold underline underline-offset-4 hover:text-brand">{tr('সিলেবাস দেখুন', 'View Syllabus')}</Link>
        </div>
        <Link href={`/admission?course=${course.id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand text-brand-fg text-sm font-bold">{cta}<ArrowRight className="w-4 h-4" /></Link>
      </div>
    </article>
  );
}
