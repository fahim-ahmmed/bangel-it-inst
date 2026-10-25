'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { useApp } from '@/app/providers';
import { INSTITUTE } from '@/data/institute';
import Logo from './Logo';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';
import Newsletter from './Newsletter';

export default function Footer() {
  const { tr, settings, navCourses } = useApp();
  const quick = [['/', 'হোম', 'Home'], ['/courses', 'কোর্সসমূহ', 'Courses'], ['/teachers', 'শিক্ষকবৃন্দ', 'Teachers'], ['/roadmap', '১০ দিনের রোডম্যাপ', '10-Day Roadmap'], ['/campus', 'ক্যাম্পাস', 'Campus'], ['/verify', 'সনদ যাচাই', 'Verify Certificate'], ['/admission', 'অনলাইন ভর্তি', 'Apply Online']];
  return (
    <footer className="bg-surface border-t border-line text-sm text-muted">
      <div className="max-w-7xl mx-auto px-4 pt-12"><Newsletter /></div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3"><Logo className="h-20 w-auto" /><BtebLogo className="h-12 w-12" /><GovRegLogo className="h-12 w-12" /></div>
          <p className="leading-relaxed">{tr('কুষ্টিয়ায় আধুনিক প্রযুক্তি, কৃত্রিম বুদ্ধিমত্তা (AI) ও শতভাগ প্র্যাকটিক্যাল প্রশিক্ষণ প্রদানকারী কম্পিউটার ট্রেনিং ইনস্টিটিউট।', 'A computer training institute in Kushtia offering modern technology, AI and 100% practical training.')}</p>
          <div className="p-3 rounded-xl bg-bg border border-line">
            <p className="flex items-center gap-2 text-brand font-bold"><ShieldCheck className="w-4 h-4" />{tr(`BTEB কোড: ${INSTITUTE.btebCode}`, `BTEB Code: ${INSTITUTE.btebCode}`)}</p>
            <p className="text-xs mt-1">{tr(INSTITUTE.btebNameBn, INSTITUTE.btebNameEn)}</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h4 className="font-bold text-fg mb-3">{tr('দ্রুত লিংক', 'Quick Links')}</h4>
          <ul className="space-y-2">{quick.map(([h, b, e]) => <li key={h}><Link href={h} className="hover:text-brand">{tr(b, e)}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <h4 className="font-bold text-fg mb-3">{tr('শীর্ষ কোর্সসমূহ', 'Top Programs')}</h4>
          <ul className="space-y-2">{navCourses.map((c) => <li key={c.id}><Link href={`/courses/${c.id}`} className="hover:text-brand">{tr(c.titleBn, c.titleEn)}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-bold text-fg">{tr('যোগাযোগ', 'Contact')}</h4>
          <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-brand"><MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /><span>{tr(settings.addressBn, settings.addressEn)} <ExternalLink className="inline w-3 h-3" /></span></a>
          <p className="flex gap-2"><Clock className="w-4 h-4 text-amber-400 shrink-0" />{tr(settings.hoursBn, settings.hoursEn)}</p>
          <div className="space-y-1">
            {[settings.phone1, settings.phone2, settings.phone3].map((p, i) => (
              <a key={p} href={`tel:${p}`} className={`flex items-center gap-2 hover:text-brand ${i === 0 ? 'text-fg font-bold' : 'ml-6 font-mono text-xs'}`}>{i === 0 && <Phone className="w-4 h-4 text-brand" />}{p}</a>
            ))}
          </div>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-brand break-all"><Mail className="w-4 h-4 text-sky-400 shrink-0" />{settings.email}</a>
        </div>
      </div>
      <div className="border-t border-line py-4 px-4 text-center text-xs">
        © {new Date().getFullYear()} {tr(INSTITUTE.fullNameBn, INSTITUTE.fullNameEn)}. {tr('সর্বস্বত্ব সংরক্ষিত।', 'All Rights Reserved.')} · BTEB {INSTITUTE.btebCode}
      </div>
    </footer>
  );
}
