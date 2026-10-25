import { getCourses, getTeachers } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);
  const fixed = ['', '/courses', '/teachers', '/roadmap', '/calculator', '/verify', '/campus', '/ai-studio', '/admission'];
  return [
    ...fixed.map((p) => ({ url: base + p })),
    ...courses.map((c) => ({ url: `${base}/courses/${c.id}` })),
    ...teachers.map((t) => ({ url: `${base}/teachers/${t.id}` })),
  ];
}
