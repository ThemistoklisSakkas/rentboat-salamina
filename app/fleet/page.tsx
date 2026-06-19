"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Users, Zap, Wind, ArrowRight, MapPin, Gauge, X, Expand } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 28 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width  / 2)) * 7);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 7);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={ref} style={{ perspective: 1200 }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

type BoatMeta = {
  name: string;
  bookingName: string;
  type: string;
  capacity: number;
  capacityNote?: string;
  avgSpeed: string;
  maxSpeed?: string;
  engine?: string;
  location: string;
  badge?: string;
  image: string;
};

const boatsMeta: BoatMeta[] = [
  {
    name: "Salamina",
    bookingName: "Salamina",
    type: "Speed Boat",
    capacity: 5,
    avgSpeed: "20 knots",
    location: "Salamina Marina",
    image: "https://rentboatsalamina.gr/wp-content/uploads/2024/05/IMG_2991-740x482.jpg",
  },
  {
    name: "Anna",
    bookingName: "Anna",
    type: "Speed Boat",
    capacity: 5,
    avgSpeed: "20 knots",
    location: "Salamina Marina",
    image: "https://rentboatsalamina.gr/wp-content/uploads/2024/05/IMG_2990-740x482.jpg",
  },
  {
    name: "Quality",
    bookingName: "Quality",
    type: "Speed Boat",
    capacity: 5,
    avgSpeed: "20 knots",
    location: "Salamina Marina",
    image: "https://rentboatsalamina.gr/wp-content/uploads/2018/06/%CE%B5%CE%B9%CE%BA%CF%8C%CE%BD%CE%B1_Viber_2024-07-11_17-55-43-077-scaled-e1720718416291-740x482.jpg",
  },
  {
    name: "Andromeda",
    bookingName: "Andromeda – Technohull Alpha 40",
    type: "Luxury RIB · Technohull Alpha 40",
    capacity: 10,
    capacityNote: "+ skipper",
    avgSpeed: "25 knots",
    maxSpeed: "70 knots",
    engine: "2 x 400hp",
    location: "Salamina Marina",
    badge: "Premium",
    image: "https://rentboatsalamina.gr/wp-content/uploads/2025/07/DSC_3560-740x482.jpg",
  },
];

export default function FleetPage() {
  const { tr } = useLanguage();
  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);

  return (
    <div className="bg-[#F5F8FB] min-h-screen pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">{tr.fleet.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A2B3C] mb-4">
            {tr.fleet.title}{" "}
            <span className="text-gold">{tr.fleet.titleHighlight}</span>
          </h1>
          <p className="text-[#6B6B6B] text-sm max-w-lg mx-auto leading-relaxed">
            {tr.fleet.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Boats grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boatsMeta.map((boat, i) => {
            const boatTr = tr.fleet.boats[i];
            return (
              <motion.div
                key={boat.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TiltCard>
                  <div className="bg-white border border-[#E5E5E0] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-300 group">
                    <div
                      className="relative aspect-[16/9] overflow-hidden cursor-zoom-in"
                      onClick={() => setLightbox({ src: boat.image, name: boat.name })}
                    >
                      <Image
                        src={boat.image}
                        alt={boat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Expand className="w-4 h-4" />
                      </div>
                      {boat.badge && (
                        <div className="absolute top-4 left-4 bg-gold text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm">
                          {boat.badge}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-[#1A2B3C] font-bold text-xl">{boat.name}</h2>
                          <p className="text-gold text-xs tracking-widest uppercase mt-0.5">{boat.type}</p>
                        </div>
                        <span className="text-[#6B6B6B] text-xs border border-[#E5E5E0] px-2.5 py-1 rounded">
                          {tr.fleet.contactPrice}
                        </span>
                      </div>

                      <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5">
                        {boatTr.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-[#E5E5E0]">
                        <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs">
                          <Users className="w-3.5 h-3.5 text-gold" />
                          {boat.capacity} {tr.fleet.passengers}
                          {boat.capacityNote && ` ${boat.capacityNote}`}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs">
                          <Wind className="w-3.5 h-3.5 text-gold" />
                          {tr.fleet.avg} {boat.avgSpeed}
                        </div>
                        {boat.maxSpeed && (
                          <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs">
                            <Zap className="w-3.5 h-3.5 text-gold" />
                            {tr.fleet.max} {boat.maxSpeed}
                          </div>
                        )}
                        {boat.engine && (
                          <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs">
                            <Gauge className="w-3.5 h-3.5 text-gold" />
                            {boat.engine}
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs">
                          <MapPin className="w-3.5 h-3.5 text-gold" />
                          {boat.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {boatTr.features.map((f) => (
                          <span
                            key={f}
                            className="bg-[#F5F5F0] border border-[#E5E5E0] text-[#4A4A4A] text-xs px-3 py-1 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <a
                        href="https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1"
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded-sm transition-colors duration-200 group/btn"
                      >
                        {tr.fleet.bookBtn} {boat.name}
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center border-t border-[#E5E5E0] pt-10"
        >
          <p className="text-[#6B6B6B] text-sm">
            {tr.fleet.noteText}{" "}
            <a href="tel:+306978059001" className="text-gold hover:underline">
              {tr.fleet.callUs}
            </a>{" "}
            {tr.fleet.or}{" "}
            <a href="mailto:info@rentboatsalamina.gr" className="text-gold hover:underline">
              {tr.fleet.emailUs}
            </a>
            {tr.fleet.noteSuffix}
          </p>
        </motion.div>
      </div>

      {/* Fullscreen image lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.name}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <p className="absolute -bottom-9 left-0 right-0 text-center text-white/70 text-sm tracking-widest uppercase">
                {lightbox.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
