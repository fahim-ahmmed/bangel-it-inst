'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Sun, Moon, GraduationCap, UserCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '@/app/providers';
import { useSession, signOut } from '@/lib/auth-client';
import { INSTITUTE } from '@/data/institute';
import Logo from './Logo';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';

const LINKS = [
  { href: '/', bn: 'হোম', en: 'Home' },
  { href: '/courses', bn: 'কোর্সসমূহ', en: 'Courses' },
  { href: '/teachers', bn: 'শিক্ষকবৃন্দ', en: 'Teachers' },
  { href: '/roadmap', bn: '১০ দিনের রোডম্যাপ', en: '10-Day Roadmap' },
  { href: '/calculator', bn: 'ফি ক্যালকুলেটর', en: 'Fee Calculator' },
  { href: '/ai-studio', bn: 'এআই স্টুডিও', en: 'AI Studio' },
  { href: '/campus', bn: 'ক্যাম্পাস', en: 'Campus' },
  { href: '/verify', bn: 'সনদ যাচাই', en: 'Verify' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { tr, lang, setLang, theme, setTheme, settings } = useApp();
  const pathname = usePathname();
  const { data: session } = useSession();
  const active = (h) => (h === '/' ? pathname === '/' : pathname.startsWith(h));

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-line">
      <div className="bg-surface border-b border-line text-[11px]">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-brand font-bold"><ShieldCheck className="w-3.5 h-3.5" />{tr(`BTEB কোড: ${INSTITUTE.btebCode} · গভঃ রেজি: ${INSTITUTE.govReg}`, `BTEB Code: ${INSTITUTE.btebCode} · Govt Reg: ${INSTITUTE.govReg}`)}</span>
          <div className="flex items-center gap-2 ml-auto">
            <div className="inline-flex rounded-full border border-line overflow-hidden">
              {['bn', 'en'].map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 font-bold ${lang === l ? 'bg-brand text-brand-fg' : 'text-muted'}`}>{l === 'bn' ? 'বাংলা' : 'EN'}</button>
              ))}
            </div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" className="p-1.5 rounded-full border border-line text-muted hover:text-fg">
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <a href={`tel:${settings.phone1}`} className="hidden sm:flex items-center gap-1 font-bold"><Phone className="w-3 h-3 text-brand" />{settings.phone1}</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <span className="hidden sm:flex items-center gap-1.5"><BtebLogo className="h-12 w-12" /><GovRegLogo className="h-12 w-12" /></span>
          <Logo mark className="h-12 w-auto" />
          <div className="leading-tight"><p className="font-black text-accent text-sm sm:text-base tracking-tight">BRIGHT TEC. PARK</p><p className="text-[11px] text-muted">{tr('কুষ্টিয়া', 'Kushtia')}</p></div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`px-3 py-2 rounded-lg transition-colors ${active(l.href) ? 'text-brand bg-brand/10 font-bold' : 'text-muted hover:text-fg'}`}>{tr(l.bn, l.en)}</Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          {session ? (
            <>
              <Link href="/student-portal" className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line text-sm font-bold"><UserCircle2 className="w-4 h-4 text-brand" />{session.user.name?.split(' ')[0] || tr('পোর্টাল', 'Portal')}</Link>
              <button onClick={() => signOut()} className="px-3 py-2 rounded-xl text-sm text-muted hover:text-fg">{tr('লগআউট', 'Log out')}</button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-2 rounded-xl border border-line text-sm font-bold">{tr('লগইন', 'Login')}</Link>
          )}
          <Link href="/admission" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-black hover:opacity-90"><GraduationCap className="w-4 h-4" />{tr('ভর্তি আবেদন', 'Apply Now')}</Link>
        </div>

        <button className="xl:hidden p-2 rounded-lg border border-line min-w-11 min-h-11 flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-line bg-bg px-4 pb-6 pt-3 space-y-1 max-h-[75vh] overflow-y-auto">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`block px-3 py-3 rounded-lg text-sm font-medium ${active(l.href) ? 'bg-brand/10 text-brand font-bold' : 'text-muted'}`}>{tr(l.bn, l.en)}</Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-3">
            {session ? (
              <Link href="/student-portal" onClick={() => setOpen(false)} className="text-center px-3 py-3 rounded-xl border border-line text-sm font-bold">{tr('স্টুডেন্ট পোর্টাল', 'Student Portal')}</Link>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="text-center px-3 py-3 rounded-xl border border-line text-sm font-bold">{tr('লগইন', 'Login')}</Link>
            )}
            <Link href="/admission" onClick={() => setOpen(false)} className="text-center px-3 py-3 rounded-xl bg-accent text-white text-sm font-black">{tr('ভর্তি আবেদন', 'Apply Now')}</Link>
          </div>
          {session && <button onClick={() => { setOpen(false); signOut(); }} className="w-full text-center py-3 text-sm text-muted">{tr('লগআউট', 'Log out')}</button>}
        </div>
      )}
    </header>
  );
}
