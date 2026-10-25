import PageShell from '@/components/PageShell';
import SectionHeader from '@/components/SectionHeader';
import AiStudio from '@/components/AiStudio';

export const metadata = { title: 'এআই ইমেজ স্টুডিও | Bright Tec. Park' };

export default function AiStudioPage() {
  return (
    <PageShell>
      <SectionHeader badge={['শিক্ষার্থীদের জন্য', 'For students']} title={['প্রম্পট ও স্টাইল দিন, ', 'Enter a prompt & style, ']} accent={['এআই ইমেজ তৈরি করুন', 'generate AI images']} />
      <AiStudio />
    </PageShell>
  );
}
