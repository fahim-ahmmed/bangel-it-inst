import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import AdmissionForm from '@/components/AdmissionForm';
import { getCourses } from '@/lib/content';

export const metadata = { title: 'অনলাইন ভর্তি | Bright Tec. Park' };

export default async function AdmissionPage({ searchParams }) {
  const sp = await searchParams;
  const courses = await getCourses();
  return (
    <PageShell narrow>
      <SectionHeader badge={['BTEB কোড: ২৭১১৭', 'BTEB Code: 27117']} title={['অনলাইন ', 'Online ']} accent={['ভর্তি আবেদন', 'Admission']} />
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-8">
        <AdmissionForm courses={courses} defaultCourse={sp?.course} defaultCoupon={sp?.coupon || ''} />
      </div>
    </PageShell>
  );
}
