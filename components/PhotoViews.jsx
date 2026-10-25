'use client';
import { useState } from 'react';

// Shows your real photo if it exists in /public (same file names as the original project), otherwise a vector illustration.
function PhotoOrArt({ src, alt, badge, caption, sub, children }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 rounded-2xl border border-line">
      {!failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-cover" /> : children}
      <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs shadow-lg">{badge}</span>
      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur px-3 py-2 rounded-xl border border-slate-700/80 text-left">
        <div className="text-xs font-black text-white">{caption}</div>
        <div className="text-[10px] text-emerald-400 font-medium">{sub}</div>
      </div>
    </div>
  );
}

export function BuildingPhotoView({ caption, sub, badge }) {
  return (
    <PhotoOrArt src="/20211010_170230_edited.jpg" alt="Azizur Rahman Super Market – Bright Tec. Park" badge={badge} caption={caption} sub={sub}>
      <svg viewBox="0 0 1000 580" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Campus building illustration">
        <defs>
          <linearGradient id="pvSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38bdf8" /><stop offset=".6" stopColor="#bae6fd" /><stop offset="1" stopColor="#fef3c7" /></linearGradient>
          <linearGradient id="pvBank" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0369a1" /><stop offset=".5" stopColor="#0284c7" /><stop offset="1" stopColor="#075985" /></linearGradient>
        </defs>
        <rect width="1000" height="580" fill="url(#pvSky)" />
        <circle cx="80" cy="440" r="75" fill="#15803d" /><circle cx="890" cy="440" r="85" fill="#15803d" />
        <rect x="120" y="105" width="760" height="385" fill="#e2e8f0" />
        <rect x="110" y="85" width="780" height="22" rx="3" fill="#334155" />
        <rect x="310" y="115" width="380" height="26" rx="4" fill="#0f172a" />
        <text x="500" y="132" fill="#f8fafc" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="2">AZIZUR RAHMAN SUPER MARKET</text>
        <rect x="125" y="165" width="750" height="160" fill="#f1f5f9" stroke="#94a3b8" />
        {[145, 235, 715, 800].map((x) => <g key={x}><rect x={x} y="185" width="65" height="115" rx="3" fill="#0f172a" /><rect x={x + 3} y="188" width="59" height="109" fill="#0369a1" opacity=".35" /><rect x={x + 15} y="225" width="34" height="25" fill="#38bdf8" /></g>)}
        <rect x="310" y="180" width="390" height="125" rx="8" fill="#14430a" stroke="#3aa80f" strokeWidth="3" />
        <text x="505" y="210" fill="#fff" fontSize="17" fontWeight="bold" textAnchor="middle">ব্রাইট টেক পার্ক</text>
        <text x="505" y="242" fill="#fff" fontSize="26" fontWeight="900" textAnchor="middle" letterSpacing="2">BRIGHT TEC. PARK</text>
        <text x="505" y="262" fill="#d4f5bf" fontSize="10.5" fontWeight="bold" textAnchor="middle" letterSpacing="4">LEARN · PRACTICE · ACHIEVE</text>
        <rect x="330" y="272" width="165" height="22" rx="4" fill="#2f7d0a" /><text x="412" y="287" fill="#fff" fontSize="9.5" fontWeight="bold" textAnchor="middle">কারিগরি শিক্ষা বোর্ড কোড: ২৭১১৭</text>
        <rect x="505" y="272" width="180" height="22" rx="11" fill="#3aa80f" /><text x="595" y="287" fill="#0b2205" fontSize="11" fontWeight="900" textAnchor="middle">01782-824582</text>
        <rect x="125" y="325" width="750" height="165" fill="#e2e8f0" stroke="#94a3b8" />
        <rect x="235" y="345" width="105" height="32" rx="3" fill="#ea580c" /><text x="287" y="366" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">শারমীনা ক্লথ</text>
        <rect x="348" y="345" width="105" height="32" rx="3" fill="#b91c1c" /><text x="400" y="366" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">আবির ফ্যাশন</text>
        <rect x="465" y="335" width="280" height="52" rx="4" fill="url(#pvBank)" stroke="#bae6fd" strokeWidth="2" /><text x="520" y="368" fill="#fff" fontSize="18" fontWeight="bold">জনতা ব্যাংক লিমিটেড</text>
        <rect x="755" y="345" width="110" height="32" rx="3" fill="#000" stroke="#facc15" /><text x="810" y="366" fill="#facc15" fontSize="9" fontWeight="bold" textAnchor="middle">WESTERN UNION</text>
        <rect x="150" y="365" width="75" height="125" rx="3" fill="#1e293b" /><rect x="155" y="370" width="65" height="25" fill="#3aa80f" /><text x="187" y="386" fill="#0b2205" fontSize="9" fontWeight="bold" textAnchor="middle">↑ ব্রাইট ল্যাব</text>
        <rect x="0" y="490" width="1000" height="90" fill="#1e293b" /><rect x="0" y="490" width="1000" height="12" fill="#64748b" />
      </svg>
    </PhotoOrArt>
  );
}

export function ComputerLabPhotoView({ caption, sub, badge }) {
  return (
    <PhotoOrArt src="/IMG_2810.JPG" alt="Computer lab and student batch" badge={badge} caption={caption} sub={sub}>
      <svg viewBox="0 0 1000 580" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Computer lab illustration">
        <rect width="1000" height="580" fill="#0a0f1d" />
        <polygon points="0,0 1000,0 900,120 100,120" fill="#1e293b" />
        <line x1="120" y1="40" x2="880" y2="40" stroke="#38bdf8" strokeWidth="4" /><line x1="150" y1="80" x2="850" y2="80" stroke="#0ea5e9" strokeWidth="3" />
        <rect x="250" y="70" width="380" height="48" rx="6" fill="#14430a" stroke="#3aa80f" strokeWidth="2" />
        <text x="440" y="92" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত কম্পিউটার ল্যাব</text>
        <text x="440" y="108" fill="#7ed957" fontSize="10" fontWeight="bold" textAnchor="middle">BTEB CODE: 27117 · 100% PRACTICAL WORKSTATIONS</text>
        <rect x="70" y="90" width="90" height="380" fill="#0284c7" rx="4" /><circle cx="115" cy="140" r="28" fill="#fff" /><text x="115" y="148" fill="#0284c7" fontSize="22" fontWeight="900" fontStyle="italic" textAnchor="middle">hp</text>
        <polygon points="0,320 1000,320 1000,580 0,580" fill="#111827" />
        <rect x="140" y="340" width="820" height="55" rx="4" fill="#0f172a" stroke="#3aa80f" strokeWidth="2" />
        {[170, 330, 490, 650, 810].map((x) => <g key={x}><rect x={x} y="275" width="115" height="75" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" /><rect x={x + 5} y="280" width="105" height="65" fill="#0369a1" /><text x={x + 12} y="295" fill="#fff" fontSize="8" fontFamily="monospace">MICROSOFT 365 / BTEB</text></g>)}
        {[220, 380, 540, 700, 860].map((x, i) => <g key={x} transform={`translate(${x},330)`}><path d="M -22,110 C -22,70 -18,60 0,60 C 18,60 22,70 22,110 Z" fill={i % 2 ? '#2f7d0a' : '#0369a1'} /><circle cx="0" cy="40" r="16" fill="#334155" /></g>)}
      </svg>
    </PhotoOrArt>
  );
}

export function CertificatePhotoView({ caption, sub, badge }) {
  return (
    <PhotoOrArt src="/IMG_2816.JPG" alt="Certificate handover" badge={badge} caption={caption} sub={sub}>
      <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Certificate handover illustration">
        <rect width="600" height="450" fill="#08152c" /><circle cx="300" cy="180" r="160" fill="#0284c7" opacity=".15" />
        <polygon points="50,420 550,420 500,280 100,280" fill="#1e293b" />
        <g transform="translate(230,260) rotate(-6)"><rect width="150" height="100" rx="4" fill="#14430a" stroke="#f59e0b" strokeWidth="2.5" /><circle cx="75" cy="40" r="20" fill="#d97706" /><text x="75" y="44" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">BTEB</text></g>
        <g transform="translate(130,160)"><circle cx="30" cy="30" r="26" fill="#1e293b" /><path d="M 0,120 C 0,70 10,60 30,60 C 50,60 60,70 60,120 Z" fill="#0f172a" /></g>
        <g transform="translate(410,160)"><circle cx="30" cy="30" r="26" fill="#334155" /><path d="M 0,120 C 0,70 10,60 30,60 C 50,60 60,70 60,120 Z" fill="#0369a1" /></g>
      </svg>
    </PhotoOrArt>
  );
}
