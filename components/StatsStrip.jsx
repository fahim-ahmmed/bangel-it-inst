'use client';
import { useApp } from '@/app/providers';

export default function StatsStrip({ courseCount, btebCount }) {
  const { tr, settings } = useApp();
  const items = [
    [courseCount, tr('টি কোর্স', 'Courses')], [settings.statStudents, tr('সফল শিক্ষার্থী', 'Successful students')],
    [settings.statPlacement, tr('গড় প্লেসমেন্ট রেট', 'Avg. placement rate')], [settings.statDuration, tr('গড় কোর্স মেয়াদ', 'Avg. course duration')], [btebCount, tr('টি BTEB অনুমোদিত কোর্স', 'BTEB-approved courses')],
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {items.map(([v, l]) => <div key={l} className="p-4 rounded-xl bg-surface border border-line text-center"><p className="text-2xl font-black text-brand">{v}</p><p className="text-xs text-muted mt-1">{l}</p></div>)}
    </div>
  );
}
