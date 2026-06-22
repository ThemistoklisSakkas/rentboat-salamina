"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { motion } from "framer-motion";

type Spot = { name: string; img: string };

// % positions on the satellite frame (Google static: center 37.9667,23.4833,
// zoom 12, hybrid). Order matches the destinations list. Positions are
// approximate — tune them if you swap in your own map screenshot.
const POS = [
  { x: 40.7, y: 67.1 }, // Kanakia
  { x: 37.1, y: 61.0 }, // Aias Beach
  { x: 43.1, y: 70.0 }, // Lamprano Beach
  { x: 39.0, y: 68.3 }, // Secret Beaches
  { x: 36.6, y: 63.0 }, // Euripides Cave
  { x: 57.7, y: 65.9 }, // Konchi Lighthouse
  { x: 55.3, y: 54.8 }, // Ancient Salamina
  { x: 60.1, y: 57.7 }, // Salamis Monument
  { x: 52.8, y: 46.6 }, // Iliaxti Beach
  { x: 46.8, y: 72.4 }, // Columns Patitiri
  { x: 50.4, y: 42.5 }, // Kohi Beach
  { x: 49.2, y: 50.7 }, // Archaeological Museum
  { x: 57.7, y: 56.0 }, // Karaiskakis Tomb
  { x: 48.7, y: 49.5 }, // Sikelianos House
];

// If a Google Static Maps key is provided, fetch a live satellite/hybrid image;
// otherwise fall back to a local screenshot at /public/salamina-map.jpg.
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const MAP_SRC = MAPS_KEY
  ? `https://maps.googleapis.com/maps/api/staticmap?center=37.9667,23.4833&zoom=12&size=640x480&scale=2&maptype=hybrid&key=${MAPS_KEY}`
  : "/salamina-map.jpg";

export default function SalaminaSatelliteMap({ spots }: { spots: Spot[] }) {
  const [imgOk, setImgOk] = useState(true);

  const goTo = (i: number) => {
    document
      .getElementById(`dest-${i}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[#0B2645]">
      {/* satellite image with a navy duotone tint */}
      {imgOk && (
        <img
          src={MAP_SRC}
          alt="Satellite map of Salamina island"
          onError={() => setImgOk(false)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:
              "sepia(0.55) hue-rotate(165deg) saturate(1.7) brightness(0.8) contrast(1.1)",
          }}
        />
      )}

      {/* navy gradient / vignette so it blends with the palette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2645]/70 via-transparent to-[#0B2645]/30 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />

      {/* coordinates caption */}
      <p className="absolute top-3 left-4 text-white/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase pointer-events-none">
        ΣΑΛΑΜΙΝΑ · ΣΑΡΩΝΙΚΟΣ ΚΟΛΠΟΣ
      </p>

      {/* photo pins */}
      {spots.map((s, i) => {
        const p = POS[i % POS.length];
        return (
          <motion.button
            key={s.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={s.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 18 }}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 outline-none"
          >
            {/* pulsing ring */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-gold/30 animate-ping" />
            {/* photo thumbnail */}
            <img
              src={s.img}
              alt={s.name}
              className="relative w-9 h-9 md:w-11 md:h-11 rounded-full object-cover border-2 border-white shadow-lg transition-transform duration-200 group-hover:scale-125 group-focus:scale-125"
            />
            {/* tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-white text-[#0B2645] text-xs font-semibold px-2.5 py-1 shadow-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
              {s.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
