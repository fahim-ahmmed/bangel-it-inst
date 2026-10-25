import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourse } from '@/lib/content';
import PageShell from '@/components/PageShell';
import CourseDetail from '@/components/CourseDetail';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const c = await getCourse(id);
  return { title: c ? `${c.titleBn} | Bright Tec. Park` : 'Course not found' };
}

export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();
  return (
    <PageShell>
      <nav className="text-xs text-muted mb-6 flex gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>/<Link href="/courses" className="hover:text-brand">Courses</Link>/<span className="text-fg">{course.titleEn}</span>
      </nav>
      <CourseDetail course={course} />
    </PageShell>
  );
}
