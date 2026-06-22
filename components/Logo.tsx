// Brand mark — anchor + sail emblem (adapted from the original logo),
// recolored for the light site: navy anchor (#0B2645) + Greek-blue sail (#0D5EAF).
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* sail */}
      <path d="M32 6 C 41 12, 42 20, 38 24 L 32 24 Z" fill="#0D5EAF" />
      {/* anchor */}
      <g
        stroke="#0B2645"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 24 V 50" />
        <path d="M21 30 H 43" />
        <path d="M15 38 C 15 50 23 56 32 56 C 41 56 49 50 49 38" />
        <path d="M15 38 L 11 42 M15 38 L 20 40" />
        <path d="M49 38 L 53 42 M49 38 L 44 40" />
      </g>
    </svg>
  );
}
