"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Spot = { gr: string; en: string; x: number; y: number };

// Approximate positions (% of the container) around a stylised Salamina.
const SPOTS: Spot[] = [
  { gr: "Ηλιαχτή",            en: "Iliaxti Beach",      x: 49, y: 17 },
  { gr: "Κολώνες Πατητήρι",   en: "Columns Patitiri",   x: 70, y: 27 },
  { gr: "Παραλία Κόγχη",      en: "Kohi Beach",         x: 80, y: 44 },
  { gr: "Φάρος Κόγχης",       en: "Konchi Lighthouse",  x: 84, y: 57 },
  { gr: "Σπήλαιο Ευριπίδη",   en: "Euripides' Cave",    x: 46, y: 44 },
  { gr: "Παραλία Αίας",       en: "Aias Beach",         x: 19, y: 37 },
  { gr: "Λαμπρανό",           en: "Lamprano Beach",     x: 32, y: 64 },
  { gr: "Κανάκια",            en: "Kanakia",            x: 45, y: 79 },
];

export default function SalaminaMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] select-none">
      {/* ── Monoline island cartography ── */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {/* coastline */}
        <path
          d="M200 120 C300 80 460 90 560 140 C640 180 700 250 662 332 C628 408 540 472 440 482 C360 490 298 452 280 400 C266 360 304 332 302 300 C300 270 250 260 210 240 C158 214 140 162 200 120 Z"
          fill="#F5F8FB"
          stroke="#0B2645"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* inner contour lines (topographic feel) */}
        <path
          d="M250 170 C330 140 460 150 540 195 C605 232 645 290 618 350 C590 410 510 452 432 458"
          fill="none"
          stroke="#0B2645"
          strokeWidth="1"
          strokeOpacity="0.22"
        />
        <path
          d="M300 230 C360 210 450 220 510 255 C560 285 585 330 565 372"
          fill="none"
          stroke="#0B2645"
          strokeWidth="1"
          strokeOpacity="0.16"
        />
        {/* lat/long ticks frame */}
        <g stroke="#0B2645" strokeOpacity="0.18" strokeWidth="1">
          <line x1="40" y1="40" x2="40" y2="560" />
          <line x1="760" y1="40" x2="760" y2="560" />
          <line x1="40" y1="40" x2="760" y2="40" />
          <line x1="40" y1="560" x2="760" y2="560" />
          {[120, 200, 280, 360, 440, 520].map((y) => (
            <line key={`l${y}`} x1="34" y1={y} x2="46" y2={y} />
          ))}
          {[120, 200, 280, 360, 440, 520].map((y) => (
            <line key={`r${y}`} x1="754" y1={y} x2="766" y2={y} />
          ))}
        </g>
        {/* compass rose */}
        <g transform="translate(700 110)" stroke="#0B2645" fill="none" strokeWidth="1.4">
          <circle r="22" strokeOpacity="0.4" />
          <path d="M0 -30 L6 0 L0 30 L-6 0 Z" fill="#0B2645" stroke="none" fillOpacity="0.85" />
          <text x="0" y="-30" textAnchor="middle" fontSize="13" fill="#0B2645" stroke="none" fontWeight="700">N</text>
        </g>
      </svg>

      {/* ── Interactive markers ── */}
      {SPOTS.map((s, i) => {
        const open = active === i;
        return (
          <button
            key={s.en}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
            onFocus={() => setActive(i)}
            onClick={() => setActive((cur) => (cur === i ? null : i))}
            aria-label={`${s.en} — ${s.gr}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 group outline-none"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            {/* pulse ring on active */}
            {open && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gold/20 animate-ping" />
            )}
            {/* dot */}
            <span
              className={`relative block w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                open
                  ? "bg-gold border-gold scale-125"
                  : "bg-white border-[#0B2645] group-hover:border-gold"
              }`}
            />

            {/* info card */}
            <motion.span
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 6 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap rounded-md bg-white border border-[#0B2645]/15 shadow-md px-3 py-2 text-center ${
                open ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <span className="block font-display font-semibold text-[#0B2645] text-sm leading-tight">
                {s.gr}
              </span>
              <span className="block text-[#0D5EAF] text-[10px] tracking-widest uppercase mt-0.5">
                {s.en}
              </span>
            </motion.span>
          </button>
        );
      })}

      {/* compass coordinates caption */}
      <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[#0B2645]/55 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
        ΣΑΛΑΜΙΝΑ · ΣΑΡΩΝΙΚΟΣ ΚΟΛΠΟΣ
      </p>
    </div>
  );
}
