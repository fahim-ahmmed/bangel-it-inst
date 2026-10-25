'use client';
import { useApp } from '@/app/providers';

// Each prop is a [bn, en] pair.
export default function SectionHeader({ badge, title, accent, sub, center = true }) {
  const { tr } = useApp();
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-10 space-y-3`}>
      {badge && <span className="inline-block px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold">{tr(...badge)}</span>}
      <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
        {tr(...title)} {accent && <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">{tr(...accent)}</span>}
      </h2>
      {sub && <p className="text-muted text-sm sm:text-base leading-relaxed">{tr(...sub)}</p>}
    </div>
  );
}
