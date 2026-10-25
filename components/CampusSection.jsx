'use client';
import { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Bus, Car, ExternalLink, Monitor, Wifi, Tv, ShieldCheck, Users, Headphones } from 'lucide-react';
import { INSTITUTE } from '@/data/institute';
import { useApp } from '@/app/providers';

const ICONS = [Monitor, Wifi, Tv, ShieldCheck, Users, Headphones];
const ROUTES = {
  majampur: { bn: 'মজমপুর গেট থেকে', en: 'From Majampur Gate', icon: Bus, tBn: 'মজমপুর গেট থেকে এন এস রোড ধরে সোজা কোর্টের দিকে রিকশা বা ইজিবাইকে সিঙ্গার মোড়ে আসুন। মোড়ে জনতা ব্যাংকের সম্মুখ সিঁড়ি দিয়ে ১ম তলায় উঠলেই ব্রাইট টেক পার্ক।', tEn: 'Take NS Road toward the court by rickshaw or easy-bike to Singer Mor. Climb the stairs beside Janata Bank to the 1st floor.' },
  court: { bn: 'কোর্ট স্টেশন থেকে', en: 'From Court Station', icon: Navigation, tBn: 'কোর্ট স্টেশন বা ডিসি অফিস মোড় থেকে এন এস রোড দিয়ে হেঁটে সিঙ্গার মোড়। আজিজুর রহমান সুপার মার্কেটের ১ম তলা।', tEn: 'Walk along NS Road from Court Station / DC Office to Singer Mor. 1st floor of Azizur Rahman Super Market.' },
  chowrhas: { bn: 'চৌড়হাস মোড় থেকে', en: 'From Chowrhas Mor', icon: Car, tBn: 'চৌড়হাস মোড় থেকে এন এস রোডগামী যে কোনো ইজিবাইকে সিঙ্গার মোড় নামলেই জনতা ব্যাংক ভবন।', tEn: 'Take any easy-bike toward NS Road and get off at Singer Mor — the Janata Bank building is right there.' },
};

export default function CampusSection({ facilities = [] }) {
  const { tr, settings } = useApp();
  const [tab, setTab] = useState('majampur');
  const r = ROUTES[tab]; const RIcon = r.icon;
  const q = encodeURIComponent(`${INSTITUTE.mapCenter.lat},${INSTITUTE.mapCenter.lng}`);
  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f, i) => { const I = ICONS[i % ICONS.length]; return (
          <div key={f.id || f.en} className="p-5 rounded-2xl bg-surface border border-line flex gap-4 hover:border-brand/40 transition-colors">
            <div className="p-3 rounded-xl bg-bg border border-line h-fit"><I className="w-5 h-5 text-brand" /></div>
            <div><h3 className="font-bold">{tr(f.bn, f.en)}</h3><p className="text-xs text-muted mt-1 leading-relaxed">{tr(f.dbn, f.den)}</p></div>
          </div>); })}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 rounded-2xl bg-surface border border-line p-5 sm:p-8">
        <div className="space-y-5">
          <h3 className="text-2xl font-black">{tr('কীভাবে আসবেন?', 'How to reach us')}</h3>
          <p className="text-sm text-muted">{tr(settings.addressBn, settings.addressEn)}</p>
          <div className="flex flex-wrap gap-2">{Object.entries(ROUTES).map(([k, v]) => <button key={k} onClick={() => setTab(k)} className={`px-3 py-2 rounded-lg text-xs font-semibold border ${tab === k ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'border-line text-muted'}`}>{tr(v.bn, v.en)}</button>)}</div>
          <p className="p-4 rounded-xl bg-bg border border-line text-sm leading-relaxed"><RIcon className="w-4 h-4 text-sky-400 inline mr-2" />{tr(r.tBn, r.tEn)}</p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <p className="flex gap-3 p-3 rounded-xl bg-bg border border-line"><Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" />{tr(settings.hoursBn, settings.hoursEn)}</p>
            <a href={`tel:${settings.phone1}`} className="flex gap-3 p-3 rounded-xl bg-bg border border-line font-bold text-brand"><Phone className="w-4 h-4 shrink-0 mt-0.5" />{settings.phone1} / {settings.phone2}</a>
          </div>
        </div>
        <div className="space-y-3">
          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-line">
            <iframe title="Bright Tec. Park map" src={`https://www.google.com/maps?q=${q}&z=16&output=embed`} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand text-brand-fg text-sm font-black"><MapPin className="w-4 h-4" />{tr('গুগল ম্যাপসে ডিরেকশন', 'Open directions in Google Maps')}<ExternalLink className="w-3 h-3" /></a>
        </div>
      </div>
    </div>
  );
}
