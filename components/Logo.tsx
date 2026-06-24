// Brand mark — minimal line-art anchor + sailboat sail.
// Outline only, drawn in `currentColor` so it inherits whatever text color
// the navbar/footer sets (navy on the white navbar; white if used on dark).
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* sailboat sail */}
      <path d="M24 5 C 31 9 32 16 28 20 L 24 20 Z" />
      {/* mast / anchor shaft */}
      <path d="M24 5 V 35" />
      {/* stock crossbar */}
      <path d="M16 22 H 32" />
      {/* anchor flukes */}
      <path d="M12 28 C 12 37 18 42 24 42 C 30 42 36 37 36 28" />
      <path d="M12 28 L 9 32 M12 28 L 16 30" />
      <path d="M36 28 L 39 32 M36 28 L 32 30" />
    </svg>
  );
}
