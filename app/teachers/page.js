import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import TeachersGrid from '@/components/TeachersGrid';
import { getTeachers } from '@/lib/content';

export const metadata = { title: 'শিক্ষকবৃন্দ | Bright Tec. Park' };

export default async function TeachersPage() {
  const teachers = await getTeachers();
  return (
    <PageShell>
      <SectionHeader badge={['আমাদের টিম', 'Our Team']} title={['অভিজ্ঞ ', 'Expert ']} accent={['অভিজ্ঞ শিক্ষক ও মেন্টর', 'Teachers & Mentors']} />
      <TeachersGrid teachers={teachers} />
    </PageShell>
  );
}
