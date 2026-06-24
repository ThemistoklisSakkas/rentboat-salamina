// Brand mark — anchor combined with a simple boat-hull curve.
// Thin line-art (no fill), drawn in `currentColor` so it switches between
// white (dark navbar) and navy (white navbar) automatically.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* anchor ring */}
      <circle cx="20" cy="6.5" r="2.5" />
      {/* anchor shaft — passes down through the hull */}
      <path d="M20 9 V 35" />
      {/* anchor stock (crossbar) */}
      <path d="M13.5 14 H 26.5" />
      {/* boat hull — a simple curved line at the bottom */}
      <path d="M9.5 30 C 11 36.5 15 39 20 39 C 25 39 29 36.5 30.5 30" />
    </svg>
  );
}
