'use client';
import { useApp } from '@/app/providers';

// Bilingual text helper for server-rendered pages.
export default function T({ bn, en }) {
  const { tr } = useApp();
  return <>{tr(bn, en)}</>;
}
