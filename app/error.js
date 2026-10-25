'use client';
export default function Error({ error, reset }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 gap-3">
      <h1 className="text-xl font-bold">কিছু ভুল হয়েছে / Something went wrong</h1>
      <p className="text-sm text-muted max-w-md">{error?.message}</p>
      <button onClick={reset} className="px-5 py-2.5 rounded-xl bg-brand text-brand-fg font-bold text-sm">আবার চেষ্টা করুন / Retry</button>
    </div>
  );
}
