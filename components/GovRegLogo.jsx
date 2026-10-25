export default function GovRegLogo({ className = 'h-14 w-14', title = 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত - কারিগরি আইসিটি বাংলাদেশ (গভঃ রেজি নং- ১৬৫৪৪১)' }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`} title={title}>
      <svg viewBox="0 0 500 500" className="w-full h-full" role="img" aria-label={title}>
        <defs>
          <path id="govTopArc" d="M 85,250 A 165,165 0 0,1 415,250" fill="none" />
          <path id="govBottomArc" d="M 75,250 A 175,175 0 0,0 425,250" fill="none" />
        </defs>
        <circle cx="250" cy="250" r="242" fill="#991b1b" stroke="#7f1d1d" strokeWidth="4" />
        {Array.from({ length: 36 }).map((_, i) => (
          <rect key={i} x="238" y="16" width="24" height="38" rx="2" fill="#ffffff" transform={`rotate(${(360 / 36) * i} 250 250)`} />
        ))}
        <circle cx="250" cy="250" r="195" fill="#ffffff" stroke="#991b1b" strokeWidth="7" />
        <text fill="#0f172a" fontWeight="900" fontSize="27" letterSpacing="0.8"><textPath href="#govTopArc" startOffset="50%" textAnchor="middle">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত</textPath></text>
        <g fill="#991b1b"><text x="94" y="242" fontSize="24" textAnchor="middle">★</text><text x="406" y="242" fontSize="24" textAnchor="middle">★</text></g>
        <g fill="#991b1b" fontWeight="900" textAnchor="middle"><text x="250" y="234" fontSize="38">গভঃ রেজি নং-</text><text x="250" y="280" fontSize="42" letterSpacing="2">১৬৫৪৪১</text></g>
        <text fill="#0f172a" fontWeight="900" fontSize="36"><textPath href="#govBottomArc" startOffset="50%" textAnchor="middle">কারিগরি আইসিটি বাংলাদেশ</textPath></text>
      </svg>
    </span>
  );
}
