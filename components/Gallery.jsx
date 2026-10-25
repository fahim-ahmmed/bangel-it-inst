'use client';
import { useApp } from '@/app/providers';
import { BuildingPhotoView, ComputerLabPhotoView, CertificatePhotoView } from './PhotoViews';

export default function Gallery() {
  const { tr } = useApp();
  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
      <div className="lg:col-span-2 lg:row-span-2 aspect-[16/10] lg:aspect-auto min-h-[280px]">
        <BuildingPhotoView badge={tr('আসল ক্যাম্পাস ভবন', 'Campus building')} caption={tr('আজিজুর রহমান সুপার মার্কেট (জনতা ব্যাংক ভবন)', 'Azizur Rahman Super Market (Janata Bank Building)')} sub={tr('১ম তলা: ব্রাইট টেক পার্ক · নিচতলা: জনতা ব্যাংক · সিঙ্গার মোড়, কুষ্টিয়া', '1st floor: Bright Tec. Park · Ground: Janata Bank · Singer Mor, Kushtia')} />
      </div>
      <div className="aspect-[16/10] min-h-[160px]"><ComputerLabPhotoView badge={tr('কম্পিউটার ল্যাব', 'Computer lab')} caption={tr('আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থী টিম', 'Modern computer lab & student team')} sub={tr('১ জন ১টি কম্পিউটার', '1 computer per student')} /></div>
      <div className="aspect-[16/10] min-h-[160px]"><CertificatePhotoView badge={tr('সনদ হস্তান্তর', 'Certificates')} caption={tr('সরকারি BTEB সনদপত্র হস্তান্তর', 'BTEB certificate handover')} sub={tr('সফল শিক্ষার্থীদের সনদ গ্রহণ', 'Graduates receiving certificates')} /></div>
    </div>
  );
}
