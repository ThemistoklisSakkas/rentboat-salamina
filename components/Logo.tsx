// Brand mark — sailboat + anchor emblem matching the original logo:
// a masthead ball, a small pennant flag, a filled sail billowing right,
// the mast/anchor shaft, the stock crossbar and the anchor arms with fluke
// barbs. Drawn in `currentColor` so it inherits the navbar/footer text color.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* masthead ball */}
      <circle cx="18" cy="4" r="1.5" fill="currentColor" stroke="none" />
      {/* pennant flag */}
      <path d="M18 5 L 22.5 6.2 L 18 7.4 Z" fill="currentColor" stroke="none" />
      {/* mast / anchor shaft */}
      <path d="M18 6 V 43" />
      {/* sail (filled, billowing right) */}
      <path d="M18 9.5 C 27 12.5 29.5 20 27 26 L 18 26 Z" fill="currentColor" stroke="none" />
      {/* anchor stock */}
      <path d="M11 30 H 25" />
      {/* anchor arms */}
      <path d="M11 33 C 11 40 14.5 43.5 18 43.5 C 21.5 43.5 25 40 25 33" />
      {/* fluke barbs */}
      <path d="M11 33 l -2.5 -2 M11 33 l 1.5 -3.5" />
      <path d="M25 33 l 2.5 -2 M25 33 l -1.5 -3.5" />
    </svg>
  );
}
