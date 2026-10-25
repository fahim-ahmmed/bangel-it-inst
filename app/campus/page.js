import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import CampusSection from '@/components/CampusSection';
import Gallery from '@/components/Gallery';
import { getList } from '@/lib/content';

export const metadata = { title: 'ক্যাম্পাস ও ল্যাব | Bright Tec. Park' };

export default async function CampusPage() {
  const facilities = await getList('facilities');
  return (
    <PageShell>
      <SectionHeader badge={['আধুনিক ক্যাম্পাস', 'Modern Campus']} title={['সিঙ্গার মোড় ক্যাম্পাস ও ', 'Singer Mor Campus & ']} accent={['অত্যাধুনিক সুবিধা', 'Modern Facilities']} sub={['আজিজুর রহমান সুপার মার্কেটের ১ম তলায় (জনতা ব্যাংকের উপরে) শীতাতপ নিয়ন্ত্রিত কম্পিউটার ল্যাব।', 'Air-conditioned computer lab on the 1st floor above Janata Bank, Singer Mor, Kushtia.']} />
      <div className="mb-12"><Gallery /></div>
      <CampusSection facilities={facilities} />
    </PageShell>
  );
}
