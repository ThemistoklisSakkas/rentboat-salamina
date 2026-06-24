// Brand mark — sailboat + anchor emblem matching the original logo:
// a masthead finial, a filled billowing sail, the mast/anchor shaft, the
// stock crossbar, and the curved anchor arms with upward fluke barbs.
// Drawn in `currentColor` so it inherits the navbar/footer text color
// (navy on the white navbar; white if ever placed on a dark background).
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
      {/* masthead finial */}
      <circle cx="24" cy="5.5" r="1.8" fill="currentColor" stroke="none" />
      {/* mast / anchor shaft */}
      <path d="M24 7.5 V 38" />
      {/* sail */}
      <path
        d="M24 10 C 31 13 32.5 19 28.5 23.5 L 24 23.5 Z"
        fill="currentColor"
        stroke="none"
      />
      {/* anchor stock (crossbar) */}
      <path d="M17 27 H 31" />
      {/* anchor arms */}
      <path d="M13 31 C 13 39 18 43 24 43 C 30 43 35 39 35 31" />
      {/* fluke barbs */}
      <path d="M13 31 l -3 -2 M13 31 l 1.5 -4" />
      <path d="M35 31 l 3 -2 M35 31 l -1.5 -4" />
    </svg>
  );
}
