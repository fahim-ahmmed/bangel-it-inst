import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/session';
import { getDb } from '@/lib/mongodb';
import PageShell from '@/components/PageShell';
import PortalView from '@/components/PortalView';

export const metadata = { title: 'স্টুডেন্ট পোর্টাল | Bright Tec. Park' };
export const dynamic = 'force-dynamic';

export default async function StudentPortalPage() {
  const session = await getServerSession();
  if (!session) redirect('/login?next=/student-portal');

  let admissions = [];
  try {
    const db = await getDb();
    const rows = await db.collection('admissions').find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(20).toArray();
    admissions = rows.map((r) => ({ token: r.token, courseName: r.courseName, status: r.status, createdAt: new Date(r.createdAt).toISOString() }));
  } catch { /* DB unavailable */ }

  return (
    <PageShell>
      <PortalView user={{ name: session.user.name, email: session.user.email, image: session.user.image || null }} admissions={admissions} />
    </PageShell>
  );
}
