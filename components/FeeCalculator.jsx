'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { useApp } from '@/app/providers';

export default function FeeCalculator({ courses = [] }) {
  const { tr, num, settings } = useApp();
  const [courseId, setCourseId] = useState(courses[0]?.id);
  const [cat, setCat] = useState('hsc');
  const [months, setMonths] = useState(2);
  const [code, setCode] = useState('');
  const course = courses.find((c) => c.id === courseId) || courses[0];
  if (!course) return <p className="text-center text-muted">{tr('এখন কোনো কোর্স নেই।', 'No courses available.')}</p>;
  const base = course.fee;
  const regularPct = course.discountFee ? Math.round(((course.fee - course.discountFee) / course.fee) * 100) : 0;
  const pct = { hsc: settings.offerActive ? settings.couponPercent : regularPct, female: 25, merit: 30, regular: regularPct }[cat];
  const couponOn = settings.offerActive && code.trim().toUpperCase() === String(settings.couponCode).toUpperCase();
  const finalPct = couponOn ? Math.max(pct, settings.couponPercent) : pct;
  const discount = Math.round((base * finalPct) / 100);
  const total = base - discount;
  const cats = [['hsc', 'HSC পরীক্ষার্থী', 'HSC Student', `${settings.couponPercent}%`], ['female', 'নারী শিক্ষার্থী', 'Female Student', '25%'], ['merit', 'মেধাবী ও দরিদ্র', 'Merit / Need-based', '30%'], ['regular', 'সাধারণ শিক্ষার্থী', 'Regular Student', tr('কোর্স অফার', 'Course offer')]];
  return (
    <div className="bg-surface border border-line rounded-2xl p-5 sm:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-xl bg-brand/10 text-brand"><Calculator className="w-5 h-5" /></div>
        <div><h2 className="text-xl font-black">{tr('কোর্স ফি ও কিস্তি ক্যালকুলেটর', 'Course Fee & Installment Calculator')}</h2><p className="text-xs text-muted">{tr('আপনার ক্যাটাগরি অনুযায়ী ফি দেখুন', 'See your fee by category')}</p></div></div>
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          <label className="block text-xs font-bold space-y-1"><span>{tr('কোর্স নির্বাচন', 'Select Course')}</span>
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-sm outline-none focus:border-brand">{courses.map((c) => <option key={c.id} value={c.id}>{tr(c.titleBn, c.titleEn)} (৳{num(c.fee)})</option>)}</select></label>
          <div className="grid grid-cols-2 gap-2">{cats.map(([id, b, e, tag]) => <button key={id} onClick={() => setCat(id)} className={`p-3 rounded-xl border text-left text-xs ${cat === id ? 'border-brand bg-brand/10 font-bold' : 'border-line text-muted'}`}>{tr(b, e)}<span className="block text-brand text-[10px] font-bold">{tag}</span></button>)}</div>
          <label className="block text-xs font-bold space-y-1"><span>{tr('প্রমো কোড', 'Promo code')}</span><input value={code} onChange={(e) => setCode(e.target.value)} placeholder={settings.couponCode} className="w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-sm font-mono uppercase outline-none focus:border-brand" />{couponOn && <span className="text-brand">✓ {tr('কুপন সক্রিয়', 'Coupon applied')}</span>}</label>
          <div><span className="text-xs font-bold block mb-1.5">{tr('কিস্তি', 'Installments')}</span><div className="grid grid-cols-3 gap-2">{[1, 2, 3].map((m) => <button key={m} onClick={() => setMonths(m)} className={`py-2.5 rounded-xl border text-xs font-semibold ${months === m ? 'bg-brand text-brand-fg border-brand' : 'border-line text-muted'}`}>{m === 1 ? tr('এককালীন', 'One time') : tr(`${m} কিস্তি`, `${m} installments`)}</button>)}</div></div>
        </div>
        <div className="md:col-span-5 bg-bg rounded-xl border border-line p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3 text-sm">
            <p className="flex justify-between"><span className="text-muted">{tr('মূল ফি', 'Base fee')}</span><span className="line-through text-muted font-mono">৳{num(course.fee)}</span></p>
            <p className="flex justify-between text-brand font-semibold"><span>{tr(`ছাড় (${finalPct}%)`, `Discount (${finalPct}%)`)}</span><span className="font-mono">- ৳{num(discount)}</span></p>
            <p className="flex justify-between items-baseline pt-3 border-t border-line"><span className="font-bold">{tr('সর্বমোট', 'Total')}</span><span className="text-2xl font-black text-brand font-mono">৳{num(total)}</span></p>
            {months > 1 && <p className="text-xs p-2.5 rounded-lg bg-brand/10 text-brand font-bold">{tr('প্রতি কিস্তি', 'Per installment')}: ৳{num(Math.round(total / months))}</p>}
          </div>
          <Link href={`/admission?course=${course.id}${(cat === 'hsc' || couponOn) && settings.offerActive ? `&coupon=${settings.couponCode}` : ''}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand text-brand-fg text-sm font-black">{tr('এই কোর্সে আবেদন করুন', 'Apply for this course')}<ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
}
