'use client';
import { useState } from 'react';
import { CheckCircle2, Printer, Send } from 'lucide-react';
import { useApp } from '@/app/providers';
import Button from './ui/Button';

const inputCls = 'w-full px-3.5 py-3 rounded-xl bg-bg border border-line text-fg text-sm outline-none focus:border-brand';

export default function AdmissionForm({ courses = [], defaultCourse, defaultCoupon = '' }) {
  const { tr, num, settings } = useApp();
  const [f, setF] = useState({ fullName: '', phone: '', email: '', courseId: courses.find((c) => c.id === defaultCourse) ? defaultCourse : courses[0]?.id || '', shift: 'morning', education: 'HSC Candidate', couponCode: defaultCoupon, address: 'কুষ্টিয়া' });
  const [state, setState] = useState({ status: 'idle' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const course = courses.find((c) => c.id === f.courseId);
  if (!course) return <p className="text-center text-muted">{tr('বর্তমানে কোনো কোর্সে ভর্তি চলছে না।', 'No courses are open for admission right now.')}</p>;
  const coupon = settings.offerActive && f.couponCode.trim().toUpperCase() === String(settings.couponCode).toUpperCase();
  const fee = coupon ? Math.round(course.fee * (1 - settings.couponPercent / 100)) : course.discountFee || course.fee;

  async function submit(e) {
    e.preventDefault();
    setState({ status: 'loading' });
    try {
      const res = await fetch('/api/admissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json();
      if (!res.ok) return setState({ status: 'error', message: data.error });
      setState({ status: 'done', token: data.token, saved: data.saved, fee: data.fee });
    } catch { setState({ status: 'error', message: tr('নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।', 'Network error, please retry.') }); }
  }

  if (state.status === 'done') {
    return (
      <div className="text-center space-y-5 print:text-black">
        <CheckCircle2 className="w-14 h-14 text-brand mx-auto" />
        <h2 className="text-2xl font-black">{tr('ভর্তি আবেদন গৃহীত হয়েছে', 'Admission Application Received')}</h2>
        {!state.saved && <p className="text-xs text-amber-400">{tr('সতর্কতা: ডাটাবেজে সংরক্ষণ হয়নি, অনুগ্রহ করে ফোনে যোগাযোগ করুন।', 'Warning: not saved to database — please contact us by phone.')}</p>}
        <div className="p-5 rounded-xl bg-bg border border-brand/40 text-left space-y-2 text-sm">
          <p className="flex justify-between"><span className="text-muted">{tr('টোকেন', 'Token')}</span><b className="font-mono text-brand">{state.token}</b></p>
          <p className="flex justify-between"><span className="text-muted">{tr('নাম', 'Name')}</span><b>{f.fullName}</b></p>
          <p className="flex justify-between"><span className="text-muted">{tr('মোবাইল', 'Mobile')}</span><b className="font-mono">{f.phone}</b></p>
          <p className="flex justify-between gap-4"><span className="text-muted">{tr('কোর্স', 'Course')}</span><b className="text-right">{tr(course.titleBn, course.titleEn)}</b></p>
          <p className="flex justify-between"><span className="text-muted">{tr('ফি', 'Fee')}</span><b className="text-amber-400">৳{num(state.fee ?? fee)}</b></p>
          <p className="text-xs text-muted pt-2 border-t border-line">{tr(settings.addressBn, settings.addressEn)} · {settings.phone1} / {settings.phone2}</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface2 text-sm font-bold"><Printer className="w-4 h-4" />{tr('স্লিপ প্রিন্ট', 'Print Slip')}</button>
          <button onClick={() => setState({ status: 'idle' })} className="flex-1 py-3 rounded-xl bg-brand text-brand-fg text-sm font-bold">{tr('আরেকটি আবেদন', 'New Application')}</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-bold space-y-1"><span>{tr('শিক্ষার্থীর পূর্ণ নাম *', "Student's Full Name *")}</span><input required minLength={3} value={f.fullName} onChange={set('fullName')} className={inputCls} placeholder={tr('যেমন: মোঃ সাকিব হাসান', 'e.g. Md. Sakib Hasan')} /></label>
        <label className="block text-xs font-bold space-y-1"><span>{tr('মোবাইল নম্বর *', 'Mobile Number *')}</span><input required type="tel" value={f.phone} onChange={set('phone')} className={`${inputCls} font-mono`} placeholder="017xxxxxxxx" /></label>
      </div>
      <label className="block text-xs font-bold space-y-1"><span>{tr('ইমেইল (ঐচ্ছিক)', 'Email (optional)')}</span><input type="email" value={f.email} onChange={set('email')} className={inputCls} /></label>
      <label className="block text-xs font-bold space-y-1"><span>{tr('কোর্স *', 'Course *')}</span>
        <select value={f.courseId} onChange={set('courseId')} className={inputCls}>{courses.map((c) => <option key={c.id} value={c.id}>{tr(c.titleBn, c.titleEn)} - {tr(c.durationBn, c.durationEn)}</option>)}</select>
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-bold space-y-1"><span>{tr('সুবিধাজনক শিফট', 'Preferred Shift')}</span>
          <select value={f.shift} onChange={set('shift')} className={inputCls}>
            <option value="morning">সকাল (৯:০০ - ১১:০০)</option><option value="noon">দুপুর (১১:০০ - ১:০০)</option><option value="afternoon">বিকাল (৩:০০ - ৫:০০)</option><option value="evening">সান্ধ্যকালীন (৬:০০ - ৮:০০)</option><option value="weekend">শুক্র-শনিবার বিশেষ ব্যাচ</option>
          </select></label>
        <label className="block text-xs font-bold space-y-1"><span>{tr('শিক্ষাগত যোগ্যতা', 'Education')}</span>
          <select value={f.education} onChange={set('education')} className={inputCls}>
            <option value="HSC Candidate">এইচএসসি পরীক্ষার্থী / শিক্ষার্থী</option><option value="SSC">এসএসসি পাস</option><option value="Honours/Degree">অনার্স / ডিগ্রি শিক্ষার্থী</option><option value="Job Holder">চাকরিজীবী / প্রফেশনাল</option><option value="Kids">স্কুল শিক্ষার্থী (কিডস)</option>
          </select></label>
      </div>
      <label className="block text-xs font-bold space-y-1"><span>{tr('প্রমো / স্কলারশিপ কোড', 'Promo / Scholarship Code')}</span>
        <input value={f.couponCode} onChange={set('couponCode')} className={`${inputCls} font-mono uppercase`} placeholder={settings.couponCode} />
        {coupon && <span className="text-brand font-semibold">✓ {tr(`${settings.couponCode} কোডে ${settings.couponPercent}% ছাড় প্রযোজ্য`, `${settings.couponPercent}% discount applied`)}</span>}
      </label>
      <div className="p-4 rounded-xl bg-bg border border-line flex items-center justify-between">
        <div><span className="text-xs text-muted block">{tr('প্রদেয় কোর্স ফি', 'Payable Fee')}</span><span className="text-2xl font-black text-brand font-mono">৳{num(fee)}</span> <span className="text-xs text-muted line-through">৳{num(course.fee)}</span></div>
        <span className="text-xs text-muted">{tr('কিস্তিতেও পরিশোধযোগ্য', 'Installments available')}</span>
      </div>
      {state.status === 'error' && <p className="text-sm text-rose-400">{state.message}</p>}
      <Button type="submit" isDisabled={state.status === 'loading'} className="w-full"><Send className="w-4 h-4 mr-2" />{state.status === 'loading' ? tr('জমা হচ্ছে...', 'Submitting...') : tr('ভর্তি আবেদন জমা দিন', 'Submit Application')}</Button>
    </form>
  );
}
