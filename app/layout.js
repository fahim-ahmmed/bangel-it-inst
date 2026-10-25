import { Hind_Siliguri } from 'next/font/google';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { getSettings, getCourses } from '@/lib/content';

// Content is editable from /admin, so pages are rendered on demand.
export const dynamic = 'force-dynamic';

const hind = Hind_Siliguri({ subsets: ['bengali', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-hind', display: 'swap' });

export const metadata = {
  title: 'Bright Tec. Park - Kushtia | BTEB Approved (Code: 27117)',
  description: 'ব্রাইট টেক পার্ক (Bright Tec. Park) - সিঙ্গার মোড়, আজিজুর রহমান সুপার মার্কেট (জনতা ব্যাংক ভবন), কুষ্টিয়া। BTEB অনুমোদিত কম্পিউটার ও ফ্রিল্যান্সিং প্রশিক্ষণ কেন্দ্র।',
  openGraph: { title: 'Bright Tec. Park - Kushtia', type: 'website' },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children }) {
  const [settings, courses] = await Promise.all([getSettings(), getCourses()]);
  const navCourses = courses.slice(0, 6).map((c) => ({ id: c.id, titleBn: c.titleBn, titleEn: c.titleEn }));
  return (
    <html lang="bn" className={`dark g-root g-root_theme_dark ${hind.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-brand selection:text-brand-fg">
        <Providers settings={settings} navCourses={navCourses}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </Providers>
      </body>
    </html>
  );
}
