import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import CoursesBrowser from '@/components/CoursesBrowser';
import { getCourses } from '@/lib/content';

export const metadata = { title: 'কোর্সসমূহ | Bright Tec. Park' };

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <PageShell>
      <SectionHeader badge={['কোর্স ক্যাটালগ', 'Course Catalog']} title={['আমাদের ', 'Our ']} accent={['কোর্সসমূহ', 'Courses']} sub={['ক্যাটাগরি ও ব্যাচ স্ট্যাটাস অনুযায়ী কোর্স খুঁজুন।', 'Filter courses by category and batch status.']} />
      <CoursesBrowser courses={courses} />
    </PageShell>
  );
}
