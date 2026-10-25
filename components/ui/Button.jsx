'use client';
import { Button as HeroButton } from '@heroui/react';

// Thin wrapper so the HeroUI API is used in one place.
export default function Button({ children, className = '', tone = 'brand', ...props }) {
  const tones = {
    brand: 'bg-brand text-brand-fg hover:opacity-90',
    ghost: 'bg-surface2 text-fg hover:opacity-90',
    danger: 'bg-rose-600 text-white hover:opacity-90',
  };
  return (
    <HeroButton className={`rounded-xl font-bold text-sm px-5 py-2.5 min-h-11 ${tones[tone]} ${className}`} {...props}>
      {children}
    </HeroButton>
  );
}
