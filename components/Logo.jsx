export default function Logo({ className = 'h-12 w-auto', mark = false }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={mark ? '/logo-mark.png' : '/logo.png'} alt="Bright Tec. Park" className={`object-contain ${className}`} />;
}
