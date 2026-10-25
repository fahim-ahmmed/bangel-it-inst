import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-3">
      <p className="text-6xl font-black text-brand">404</p>
      <h1 className="text-xl font-bold">পেজটি পাওয়া যায়নি / Page not found</h1>
      <Link href="/" className="px-5 py-2.5 rounded-xl bg-brand text-brand-fg font-bold text-sm">হোম / Home</Link>
    </div>
  );
}
