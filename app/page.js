import Link from 'next/link';
import { Hero, OfferBanner, Reviews } from '@/components/HomeSections';
import SectionHeader from '@/components/SectionHeader';
import CoursesBrowser from '@/components/CoursesBrowser';
import TeachersGrid from '@/components/TeachersGrid';
import T from '@/components/T';
import Gallery from '@/components/Gallery';
import StatsStrip from '@/components/StatsStrip';
import { getCourses, getTeachers, getList } from '@/lib/content';

export default async function HomePage() {
  const [courses, teachers, notices, testimonials] = await Promise.all([getCourses(), getTeachers(), getList('notices'), getList('testimonials')]);
  return (
    <>
      <Hero notices={notices} />
      <OfferBanner />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"><StatsStrip courseCount={courses.length} btebCount={courses.filter((c) => c.bteb).length} /></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"><Gallery /></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader badge={['আমাদের কোর্স', 'Our Courses']} title={['জনপ্রিয় ', 'Popular ']} accent={['কোর্সসমূহ', 'Courses']} sub={['BTEB সনদসহ আধুনিক ও কর্মমুখী প্রশিক্ষণ।', 'Modern, career-focused training with BTEB certification.']} />
        <CoursesBrowser courses={courses} limit={6} />
        <div className="text-center mt-8"><Link href="/courses" className="inline-block px-6 py-3 rounded-xl border border-line font-bold text-sm hover:border-brand"><T bn="সব কোর্স দেখুন" en="View all courses" /></Link></div>
      </section>
      <section className="bg-surface/50 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionHeader badge={['আমাদের শিক্ষক', 'Our Mentors']} title={['অভিজ্ঞ ', 'Experienced ']} accent={['শিক্ষকবৃন্দ', 'Instructors']} />
          <TeachersGrid teachers={teachers} limit={4} />
          <div className="text-center mt-8"><Link href="/teachers" className="inline-block px-6 py-3 rounded-xl border border-line font-bold text-sm hover:border-brand"><T bn="সব শিক্ষক দেখুন" en="Meet all teachers" /></Link></div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader badge={['সফলতার গল্প', 'Success Stories']} title={['শিক্ষার্থীদের ', 'Student ']} accent={['অভিজ্ঞতা', 'Experiences']} />
        <Reviews items={testimonials} />
      </section>
    </>
  );
}
