'use client';
import { MessageCircle } from 'lucide-react';
import { useApp } from '@/app/providers';

export default function WhatsAppFAB() {
  const { settings } = useApp();
  const n = '88' + String(settings.phone1).replace(/[^0-9]/g, '');
  return (
    <a href={`https://wa.me/${n}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
