import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import AdminLoginForm from '@/components/AdminLoginForm';

export const metadata = { title: 'Admin Login', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect('/admin');
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-black text-center mb-6">অ্যাডমিন লগইন / Admin Login</h1>
      <div className="bg-surface border border-line rounded-2xl p-6"><AdminLoginForm /></div>
    </div>
  );
}
