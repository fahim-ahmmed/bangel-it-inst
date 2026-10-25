import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import RoadmapView from '@/components/RoadmapView';
import { getList } from '@/lib/content';

export const metadata = { title: '১০ দিনের কম্পিউটার ও এআই রোডম্যাপ | Bright Tec. Park' };

export default async function RoadmapPage() {
  const items = await getList('roadmap');
  return (
    <PageShell>
      <SectionHeader badge={['কম্পিউটার ও এআই স্বাক্ষরতা', 'Computer & AI Literacy']} title={['কম্পিউটার ও এআই ', 'Computer & AI ']} accent={['রোডম্যাপ', 'Roadmap']} sub={['মৌলিক জ্ঞান, ব্যবহারিক দক্ষতা ও আধুনিক এআই টুলসের ধারাবাহিক পরিকল্পনা।', 'A step-by-step plan covering fundamentals, hands-on skills and modern AI tools.']} />
      <RoadmapView items={items} />
    </PageShell>
  );
}
