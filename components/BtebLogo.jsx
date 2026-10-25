'use client';
import { useState } from 'react';

// Put your real BTEB logo at public/bteb-logo.png — it is used automatically.
// Until then a simple text seal is shown (this is a stand-in, not the official artwork).
export default function BtebLogo({ className = 'h-14 w-14' }) {
  const [failed, setFailed] = useState(false);
  const title = 'Bangladesh Technical Education Board (BTEB) – Code 27117';
  if (!failed) {
    return <img src="/bteb-logo.png" alt={title} title={title} onError={() => setFailed(true)} className={`object-contain shrink-0 ${className}`} />;
  }
  return (
    <span className={`inline-flex shrink-0 ${className}`} title={title}>
      <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label={title}>
        <circle cx="100" cy="100" r="96" fill="#fff" stroke="#047857" strokeWidth="8" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#047857" strokeWidth="2" strokeDasharray="4 4" />
        <text x="100" y="98" textAnchor="middle" fontSize="44" fontWeight="900" fill="#047857" fontFamily="system-ui, sans-serif">BTEB</text>
        <text x="100" y="128" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a" fontFamily="system-ui, sans-serif">27117</text>
      </svg>
    </span>
  );
}
