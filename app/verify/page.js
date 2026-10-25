import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import CertificateVerifier from '@/components/CertificateVerifier';

export const metadata = { title: 'সনদ যাচাই | Bright Tec. Park' };

export default function VerifyPage() {
  return (
    <PageShell>
      <SectionHeader badge={['BTEB ভেরিফিকেশন', 'BTEB Verification']} title={['অনলাইন ', 'Online ']} accent={['সার্টিফিকেট যাচাই', 'Certificate Verification']} sub={['সার্টিফিকেট আইডি, রোল বা রেজিস্ট্রেশন নম্বর দিয়ে যাচাই করুন।', 'Verify using certificate ID, roll or registration number.']} />
      <CertificateVerifier />
    </PageShell>
  );
}
