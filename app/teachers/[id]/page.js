import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTeacher } from '@/lib/content';
import PageShell from '@/components/PageShell';
import TeacherDetail from '@/components/TeacherDetail';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = await getTeacher(id);
  return { title: t ? `${t.nameBn} | Bright Tec. Park` : 'Teacher not found' };
}

export default async function TeacherPage({ params }) {
  const { id } = await params;
  const t = await getTeacher(id);
  if (!t) notFound();
  return (
    <PageShell>
      <nav className="text-xs text-muted mb-6 flex gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>/<Link href="/teachers" className="hover:text-brand">Teachers</Link>/<span className="text-fg">{t.nameEn}</span>
      </nav>
      <TeacherDetail teacher={t} />
    </PageShell>
  );
}
