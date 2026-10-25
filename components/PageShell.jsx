export default function PageShell({ children, narrow = false }) {
  return <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 ${narrow ? 'max-w-2xl' : 'max-w-7xl'}`}>{children}</div>;
}
