import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import AuthForm from '@/components/AuthForm';

export const metadata = { title: 'লগইন | Bright Tec. Park' };

export default function LoginPage() {
  return (
    <PageShell narrow>
      <SectionHeader title={['শিক্ষার্থী ', 'Student ']} accent={['লগইন', 'Login']} />
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-8"><Suspense><AuthForm mode="login" /></Suspense></div>
    </PageShell>
  );
}
