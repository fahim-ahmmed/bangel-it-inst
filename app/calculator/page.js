import PageShell from '@/components/PageShell';
import FeeCalculator from '@/components/FeeCalculator';
import { getCourses } from '@/lib/content';

export const metadata = { title: 'ফি ক্যালকুলেটর | Bright Tec. Park' };

export default async function CalculatorPage() {
  const courses = await getCourses();
  return <PageShell><FeeCalculator courses={courses} /></PageShell>;
}
