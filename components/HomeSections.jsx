'use client';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, GraduationCap, Award, Star, Phone } from 'lucide-react';
import { useApp } from '@/app/providers';
import { INSTITUTE } from '@/data/institute';

export function Hero({ notices = [] }) {
  const { tr } = useApp();
  const items = [...notices, ...notices];
  const pillars = [
    [CheckCircle2, 'অভিজ্ঞ প্রশিক্ষক', 'Expert Instructors', 'দক্ষ ও ইন্ডাস্ট্রি প্রফেশনাল ইন্সট্রাক্টর', 'Skilled industry professional trainers'],
    [GraduationCap, 'আধুনিক ক্লাসরুম', 'Modern Classrooms', 'এসি ল্যাব, দ্রুত ইন্টারনেট ও প্রজেক্টর', 'AC labs, fast internet & projectors'],
    [Sparkles, 'প্র্যাকটিক্যাল প্রশিক্ষণ', '100% Practical Training', '১ জন ১টি কম্পিউটার নিশ্চিতকরণ', '1 computer per student guaranteed'],
    [Award, 'দক্ষতা উন্নয়নের নিশ্চয়তা', 'Guaranteed Skill Growth', 'BTEB সরকারি সনদ ও ক্যারিয়ার সাপোর্ট', 'Govt BTEB certificates & career guidance'],
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(circle_at_50%_20%,rgba(47,150,6,0.18),transparent_70%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface border border-line">
          <span className="px-2.5 py-1 rounded-lg bg-brand text-brand-fg text-xs font-black shrink-0">{tr('নোটিশ', 'Notice')}</span>
          <div className="overflow-hidden flex-1"><div className="animate-marquee text-xs text-muted gap-10">{items.map((n, i) => <span key={i} className="pr-10">📢 {tr(n.bn, n.en)} <span className="text-brand px-3">❖</span></span>)}</div></div>
        </div>
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-brand/40 text-xs sm:text-sm font-bold text-brand"><span className="w-2 h-2 rounded-full bg-brand animate-ping" />{tr(`BTEB অনুমোদিত · কোড ${INSTITUTE.btebCode} · কুষ্টিয়া`, `BTEB Approved · Code ${INSTITUTE.btebCode} · Kushtia`)}</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15]">
            {tr('আধুনিক প্রযুক্তি ও এআই-তে ', 'Master Modern Tech & AI ')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">{tr('দক্ষ হয়ে ওঠো', 'with Hands-on Training')}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">{tr('কুষ্টিয়ায় আধুনিক প্রযুক্তি, কৃত্রিম বুদ্ধিমত্তা (AI) ও শতভাগ প্র্যাকটিক্যাল প্রশিক্ষণ প্রদানকারী কম্পিউটার ট্রেনিং ইনস্টিটিউট।', 'A computer training institute in Kushtia offering modern technology, AI and 100% practical training.')}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/admission" className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-black text-sm hover:opacity-90"><Sparkles className="w-4 h-4" />{tr('এখনই ভর্তি হোন', 'Apply Now')}<ArrowRight className="w-4 h-4" /></Link>
            <Link href="/courses" className="px-6 py-3.5 rounded-xl bg-surface border border-line font-bold text-sm">{tr('কোর্সসমূহ দেখুন', 'Browse Courses')}</Link>
            <Link href="/verify" className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface border border-sky-500/30 text-sky-400 font-bold text-sm"><ShieldCheck className="w-4 h-4" />{tr('সনদ যাচাই', 'Verify Certificate')}</Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-2xl bg-surface border border-line">
          {pillars.map(([I, b, e, db, de]) => (
            <div key={e} className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-brand/10 text-brand shrink-0"><I className="w-5 h-5" /></div><div><h4 className="font-bold text-sm">{tr(b, e)}</h4><p className="text-xs text-muted">{tr(db, de)}</p></div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferBanner() {
  const { tr, settings } = useApp();
  if (!settings.offerActive) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border-2 border-brand/50 bg-gradient-to-r from-emerald-950 via-slate-900 to-black p-6 sm:p-8 grid lg:grid-cols-12 gap-6 items-center text-slate-100">
        <div className="lg:col-span-8 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">{tr(settings.offerPeriodBn, settings.offerPeriodEn)}</span>
          <h2 className="text-3xl sm:text-5xl font-black">{tr('HSC পরীক্ষার্থীদের জন্য', 'Special Offer for HSC Students')} <span className="inline-block px-3 py-1 rounded-xl bg-orange-500 text-white -rotate-1">{tr(`${settings.couponPercent}% ছাড়!`, `${settings.couponPercent}% OFF!`)}</span></h2>
          <p className="text-slate-300 max-w-2xl">{tr('এইচএসসি পরবর্তী সময়কে কাজে লাগিয়ে আইটি ও ফ্রিল্যান্সিংয়ে এগিয়ে থাকো। বিশেষ স্কলারশিপে ভর্তি চলছে!', 'Use your post-HSC time to build IT & freelancing skills. Admission is open with a special scholarship!')}</p>
          <a href={`tel:${settings.phone1}`} className="inline-flex items-center gap-2 text-sm font-bold"><Phone className="w-4 h-4 text-emerald-400" />{settings.phone1}</a>
        </div>
        <div className="lg:col-span-4 rounded-xl bg-black/50 border border-emerald-500/30 p-5 text-center space-y-3">
          <p className="text-xs uppercase text-slate-400">{tr('কুপন কোড', 'Coupon Code')}</p>
          <p className="text-2xl font-black font-mono text-emerald-400 tracking-wider">{settings.couponCode}</p>
          <Link href={`/admission?coupon=${settings.couponCode}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white font-black text-sm">{tr(`${settings.couponPercent}% ছাড়ে আবেদন করুন`, `Claim ${settings.couponPercent}% Discount`)}<ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

export function Reviews({ items = [] }) {
  const { tr } = useApp();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((t) => (
        <figure key={t.id} className="p-6 rounded-2xl bg-surface border border-line flex flex-col justify-between gap-4 hover:border-brand/40 transition-colors">
          <div className="space-y-3">
            <div className="flex text-amber-400">{Array.from({ length: Math.min(5, Math.max(0, t.rating || 5)) }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}</div>
            <blockquote className="text-sm text-muted leading-relaxed italic">“{tr(t.bn, t.en)}”</blockquote>
            <p className="text-xs font-bold text-brand p-2 rounded-lg bg-brand/10">{t.result}</p>
          </div>
          <figcaption className="pt-4 border-t border-line flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-slate-950 font-black flex items-center justify-center">{t.name.slice(0, 1)}</span>
            <span><b className="block text-sm">{t.name}</b><span className="text-[11px] text-muted block">{t.role}</span></span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
