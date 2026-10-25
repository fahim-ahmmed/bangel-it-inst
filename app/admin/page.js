import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import PageShell from '@/components/PageShell';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = { title: 'Admin | Bright Tec. Park', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const admin = await getAdminSession();
  if (!admin) redirect('/admin/login');
  return <PageShell><AdminDashboard email={admin.email} /></PageShell>;
}
