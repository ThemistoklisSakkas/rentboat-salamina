"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Star, Clock, Users, ArrowRight, Phone, ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

const ParticleOcean = dynamic(() => import("@/components/ParticleOcean"), { ssr: false });
gsap.registerPlugin(ScrollTrigger);

const STAT_VALUES   = [355, 10, 4] as const;
const STAT_SUFFIXES = ["", "", ""] as const;

const allBoats = [
  { name: "Salamina",     booking: "Salamina",                            type: "Speed Boat",     cap: 5,  img: "https://rentboatsalamina.gr/wp-content/uploads/2024/05/IMG_2991-740x482.jpg" },
  { name: "Anna",         booking: "Anna",                                type: "Speed Boat",     cap: 5,  img: "https://rentboatsalamina.gr/wp-content/uploads/2024/05/IMG_2990-740x482.jpg" },
  { name: "Quality",      booking: "Quality",                             type: "Speed Boat",     cap: 5,  img: "https://rentboatsalamina.gr/wp-content/uploads/2018/06/%CE%B5%CE%B9%CE%BA%CF%8C%CE%BD%CE%B1_Viber_2024-07-11_17-55-43-077-scaled-e1720718416291-740x482.jpg" },
  { name: "Andromeda",    booking: "Andromeda – Technohull Alpha 40",     type: "Luxury RIB",     cap: 10, img: "https://rentboatsalamina.gr/wp-content/uploads/2025/07/DSC_3560-740x482.jpg" },
  { name: "Happy Family", booking: "Happy Family (Including Jet-Ski)",    type: "Sea Ray 42.5ft", cap: 8,  img: "https://rentboatsalamina.gr/wp-content/uploads/2025/06/IMG-20250615-WA0005-740x482.jpg" },
];

const featureIcons = [Anchor, Star, Users, Clock];

// Real destination photos from rentboatsalamina.gr.
// Order MUST match tr.home.destinations in lib/translations.ts:
// Kanakia, Aias, Lamprano, Secret Beaches, Euripides' Cave, Lighthouse,
// Ancient Salamina, Salamis Monument, Iliaxti, Columns Patitiri,
// Kohi Beach, Museum, Karaiskakis Tomb, Sikelianos House.
const DEST_IMAGES = [
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/kanakia.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2024/06/aias-banner.jpg",
  "https://rentboatsalamina.gr/wp-content/uploads/2024/06/lamprano-banner.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2024/04/paralies.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/spileo.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/faros.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/salamina2.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/salamina.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2024/06/iliaxti3.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2024/06/patitiri.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2024/06/beach.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/mouseio.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/karaiskakis.png",
  "https://rentboatsalamina.gr/wp-content/uploads/2017/04/sikelianos.png",
];

// ─── TESTIMONIAL CAROUSEL ────────────────────────────────────────────────────
type Review = { name: string; text: string };

const CAROUSEL_GAP = 24;

function TestimonialCarousel({ reviews }: { reviews: ReadonlyArray<Review> }) {
  const count = reviews.length;
  // Three copies of the list; we navigate inside the middle copy and silently
  // re-center after each slide, which makes the infinite loop seamless.
  const slides = [...reviews, ...reviews, ...reviews];

  const viewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [viewportW, setViewportW] = useState(0);
  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(count);
  const [instant, setInstant] = useState(true);

  const cardW =
    viewportW > 0 ? (viewportW - CAROUSEL_GAP * (visible - 1)) / visible : 0;
  const offset = index * (cardW + CAROUSEL_GAP);

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      setVisible(w >= 1200 ? 3 : w >= 768 ? 2 : 1);
      if (viewportRef.current) setViewportW(viewportRef.current.offsetWidth);
      setInstant(true);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Re-enable animation on the frame after an instant reposition.
  useEffect(() => {
    if (!instant) return;
    const t = setTimeout(() => setInstant(false), 50);
    return () => clearTimeout(t);
  }, [instant]);

  const paginate = (dir: number) => setIndex((i) => i + dir);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => i + 1), 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If a slide walked us out of the middle copy, jump back by one copy length
  // with animation disabled — visually identical position, loop stays seamless.
  const handleAnimationComplete = () => {
    if (index >= count * 2) {
      setInstant(true);
      setIndex((i) => i - count);
    } else if (index < count) {
      setInstant(true);
      setIndex((i) => i + count);
    }
  };

  const activeDot = ((index % count) + count) % count;

  return (
    <div>
      <div
        ref={viewportRef}
        className="overflow-hidden"
        style={{ visibility: viewportW > 0 ? "visible" : "hidden" }}
      >
        <motion.div
          className="flex items-stretch"
          style={{ gap: CAROUSEL_GAP }}
          animate={{ x: -offset }}
          transition={
            instant
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
          onAnimationComplete={handleAnimationComplete}
          drag="x"
          dragConstraints={{ left: -offset, right: -offset }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 || info.velocity.x < -400) {
              paginate(1);
              resetTimer();
            } else if (info.offset.x > 60 || info.velocity.x > 400) {
              paginate(-1);
              resetTimer();
            }
          }}
        >
          {slides.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col bg-[#F5F5F0] border border-[#E5E5E0] rounded-lg p-8 shadow-sm cursor-grab active:cursor-grabbing select-none"
              style={{ width: cardW || undefined }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5 italic flex-grow">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase">
                {review.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrows + dot indicators */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => { paginate(-1); resetTimer(); }}
          aria-label="Previous review"
          className="w-9 h-9 rounded-full border border-[#E5E5E0] flex items-center justify-center text-[#6B6B6B] hover:border-gold hover:text-gold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(count + i); resetTimer(); }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeDot === i ? "w-6 bg-gold" : "w-1.5 bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => { paginate(1); resetTimer(); }}
          aria-label="Next review"
          className="w-9 h-9 rounded-full border border-[#E5E5E0] flex items-center justify-center text-[#6B6B6B] hover:border-gold hover:text-gold transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { tr, lang } = useLanguage();

  const heroRef         = useRef<HTMLElement>(null);
  const bgRef           = useRef<HTMLDivElement>(null);
  const heroTextRef     = useRef<HTMLDivElement>(null);
  const featuresRef     = useRef<HTMLDivElement>(null);
  const statsRef        = useRef<HTMLDivElement>(null);
  const fleetSectionRef = useRef<HTMLElement>(null);
  const fleetTrackRef   = useRef<HTMLDivElement>(null);
  const destRef         = useRef<HTMLDivElement>(null);
  const counterRefs     = useRef<(HTMLSpanElement | null)[]>([]);

  const [vid1Ready, setVid1Ready] = useState(false);
  const [vid2Ready, setVid2Ready] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const statLabels = lang === "gr"
    ? ["Ευχαριστημένοι Πελάτες", "Χρόνια Εμπειρίας", "Σκάφη"]
    : ["Happy Customers", "Years of Experience", "Boats"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. SCROLL ZOOM HERO ── */
      gsap.to(bgRef.current, {
        scale: 1.45,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(heroTextRef.current, {
        opacity: 0,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "45% top",
          scrub: true,
        },
      });

      /* ── 2. FEATURE CARDS ── */
      gsap.fromTo(
        ".feat-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 80%" },
        }
      );

      /* ── 3. STAT COUNTERS ── */
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: STAT_VALUES[i],
          duration: 2,
          ease: "power2.out",
          onUpdate() {
            el.textContent = String(Math.round(counter.val));
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
            once: true,
          },
        });
      });

      /* ── 4. HORIZONTAL FLEET SCROLL (desktop) ── */
      if (window.innerWidth >= 768 && fleetSectionRef.current && fleetTrackRef.current) {
        const track   = fleetTrackRef.current;
        const section = fleetSectionRef.current;
        const dist    = track.scrollWidth - window.innerWidth + 96;

        gsap.to(track, {
          x: -dist,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: `+=${dist}`,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      /* ── 5. DESTINATION CHIPS ── */
      gsap.fromTo(
        ".dest-chip",
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: destRef.current, start: "top 82%" },
        }
      );
    });

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveVideo(v => (v + 1) % 2);
    }, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDotClick = (i: number) => {
    setActiveVideo(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveVideo(v => (v + 1) % 2);
    }, 8000);
  };

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-navy"
      >
        <div ref={bgRef} className="absolute inset-0 origin-center overflow-hidden">
          <ParticleOcean />

          <div className="absolute inset-0 md:hidden">
            <Image
              src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&h=900&fit=crop&auto=format"
              alt="Boat at sea — Salamina"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Video 1 — Local optimized boat video (web-optimized / fast-start MP4) */}
          <motion.div
            className="absolute inset-0 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeVideo === 0 && vid1Ready ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="https://rentboatsalamina.gr/wp-content/uploads/2025/07/DSC_3560-740x482.jpg"
              onCanPlay={() => setVid1Ready(true)}
              onLoadedData={() => setVid1Ready(true)}
            >
              <source src="/boat-video-optimized.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Video 2 — Local boat video */}
          <motion.div
            className="absolute inset-0 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeVideo === 1 && vid2Ready ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://rentboatsalamina.gr/wp-content/uploads/2024/05/IMG_2991-740x482.jpg"
              onCanPlay={() => setVid2Ready(true)}
              onLoadedData={() => setVid2Ready(true)}
            >
              <source src="/boat-video-2.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0D4F5C] pointer-events-none" />

        <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold text-xs tracking-[0.4em] uppercase mb-4"
          >
            {tr.home.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            {tr.home.h1a}{" "}
            <span className="text-gold">{tr.home.h1b}</span>
            <br />
            {tr.home.h1c}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {tr.home.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton
              href="/booking"
              className="bg-gold hover:bg-gold-light text-navy font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200 inline-block"
            >
              {tr.home.bookNow}
            </MagneticButton>
            <Link
              href="/fleet"
              className="border border-white/40 text-white hover:border-gold hover:text-gold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200"
            >
              {tr.home.viewFleet}
            </Link>
          </motion.div>
        </div>

        {/* Video dot indicators */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Switch to video ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeVideo === i
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-px h-10 bg-white/30 mx-auto"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════ WHY US ═══════════════════════ */}
      <section className="bg-[#0D4F5C] py-24 px-6 lg:px-12" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">
              {tr.home.whyBadge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {tr.home.whyTitle}{" "}
              <span className="text-gold">{tr.home.whySalamina}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tr.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={f.title}
                  className="feat-card bg-white/10 border border-white/15 rounded-lg p-6 hover:border-gold/50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STAT COUNTERS ═══════════════════════ */}
      <div
        ref={statsRef}
        className="bg-[#0D4F5C] border-y border-white/10 py-14 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {STAT_VALUES.map((_, i) => (
            <div key={i} className="group">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-1 tabular-nums">
                <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                {STAT_SUFFIXES[i]}
              </div>
              <p className="text-white/70 text-xs tracking-widest uppercase mt-1">
                {statLabels[i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════ FLEET — desktop horizontal scroll ═══════════════════════ */}
      <section
        ref={fleetSectionRef}
        className="hidden md:block overflow-hidden bg-[#0D4F5C]"
      >
        <div className="h-screen flex flex-col justify-center">
          <div className="flex items-end justify-between px-12 mb-10 flex-shrink-0">
            <div>
              <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">
                {tr.home.fleetBadge}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {tr.home.fleetTitle}{" "}
                <span className="text-gold">{tr.home.fleetHighlight}</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm tracking-wide">
              {lang === "gr" ? "← Κύλισε για να δεις →" : "← Scroll to explore →"}
            </p>
          </div>

          <div
            ref={fleetTrackRef}
            className="flex gap-6 pl-12"
            style={{ willChange: "transform" }}
          >
            {allBoats.map((boat) => (
              <Link
                href={`/booking?boat=${encodeURIComponent(boat.booking)}`}
                key={boat.name}
                className="group flex-shrink-0 w-[340px]"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 bg-white/10">
                  <Image
                    src={boat.img}
                    alt={boat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-gold/90 text-[10px] tracking-widest uppercase">
                      {boat.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{boat.name}</p>
                    <p className="text-white/55 text-xs mt-0.5">
                      {boat.cap} {tr.home.pax}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}

            <Link
              href="/fleet"
              className="group flex-shrink-0 w-[260px] flex flex-col items-center justify-center rounded-xl border border-white/15 hover:border-gold/50 bg-white/5 transition-colors duration-300 mr-12 gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-gold" />
              </div>
              <span className="text-white/60 group-hover:text-white text-sm tracking-widest uppercase transition-colors">
                {tr.home.viewAll}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FLEET — mobile grid fallback ═══════════════════════ */}
      <section className="md:hidden bg-[#0D4F5C] py-24 px-6">
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">
            {tr.home.fleetBadge}
          </p>
          <h2 className="text-3xl font-bold text-white">
            {tr.home.fleetTitle}{" "}
            <span className="text-gold">{tr.home.fleetHighlight}</span>
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 scrollbar-hide">
          {allBoats.map((boat) => (
            <Link
              href={`/booking?boat=${encodeURIComponent(boat.name)}`}
              key={boat.name}
              className="group flex-shrink-0 w-[280px] snap-start"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3 bg-white/10">
                <Image
                  src={boat.img}
                  alt={boat.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <p className="text-white font-semibold">{boat.name}</p>
              <p className="text-white/55 text-xs mt-0.5">
                {boat.type} · {boat.cap} {tr.home.pax}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-gold text-sm">
            {tr.home.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════ DESTINATIONS ═══════════════════════ */}
      <section className="bg-[#FAFAF8] py-24 px-6 lg:px-12" ref={destRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">
              {tr.home.destBadge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {tr.home.destTitle}{" "}
              <span className="text-gold">{tr.home.destHighlight}</span>
            </h2>
            <p className="text-[#4A4A4A] text-sm mt-4 max-w-md mx-auto">
              {tr.home.destDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {tr.home.destinations.map((d, i) => (
              <div
                key={d}
                className="dest-chip group relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm"
              >
                <Image
                  src={DEST_IMAGES[i % DEST_IMAGES.length]}
                  alt={d}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D4F5C]/90 via-[#0D4F5C]/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="w-6 h-px bg-gold mb-2 group-hover:w-10 transition-all duration-300" />
                  <p className="text-white font-semibold text-sm leading-snug">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="bg-white py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">
              {tr.home.reviewsBadge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {tr.home.reviewsTitle}
            </h2>
          </motion.div>

          <TestimonialCarousel reviews={tr.home.reviews} />

          {/* Google reviews link */}
          <div className="text-center mt-10">
            <a
              href="https://maps.app.goo.gl/VvRvoU2g1DbyFGuu8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-[#E5E5E0] bg-white text-[#4A4A4A] hover:border-gold hover:text-[#1A1A1A] text-sm px-6 py-3 rounded-full shadow-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
              </svg>
              {tr.home.googleReviews}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-[#0D4F5C] py-24 px-6 lg:px-12 border-t border-white/10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {tr.home.ctaTitle}
          </h2>
          <p className="text-white/70 text-base mb-10 leading-relaxed max-w-xl mx-auto">
            {tr.home.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+306978059001"
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:border-gold hover:text-gold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              +30 697 805 9001
            </a>
            <MagneticButton
              href="/booking"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200"
            >
              {tr.home.bookOnline}
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            {/* TODO: replace href with the customer's GetYourGuide activity/supplier
                link once their account is available. */}
            <a
              href="https://www.getyourguide.com/s/?q=Salamina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF5533] hover:bg-[#E64A2E] text-white font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200"
            >
              <Ticket className="w-4 h-4" />
              GetYourGuide
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
