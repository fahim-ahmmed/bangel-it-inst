import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import AuthForm from '@/components/AuthForm';

export const metadata = { title: 'রেজিস্ট্রেশন | Bright Tec. Park' };

export default function RegisterPage() {
  return (
    <PageShell narrow>
      <SectionHeader title={['নতুন ', 'Create ']} accent={['একাউন্ট', 'Account']} />
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-8"><Suspense><AuthForm mode="register" /></Suspense></div>
    </PageShell>
  );
}
