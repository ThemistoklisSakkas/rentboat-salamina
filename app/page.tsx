"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Star, Clock, Users, ArrowRight, Phone, ChevronLeft, ChevronRight, Ticket, Play, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const STAT_VALUES   = [355, 10, 4] as const;
const STAT_SUFFIXES = ["", "", ""] as const;

const allBoats = [
  { name: "Soul is",      booking: "Soul is",                             type: "Speed Boat",     cap: 5,  img: "/boats/soul-is.webp" },
  { name: "Anna",         booking: "Anna",                                type: "Speed Boat",     cap: 5,  img: "/boats/anna.webp" },
  { name: "Quality",      booking: "Quality",                             type: "Speed Boat",     cap: 5,  img: "/boats/quality.webp" },
  { name: "Andromeda",    booking: "Andromeda – Technohull Alpha 40",     type: "Luxury RIB",     cap: 10, img: "/boats/andromeda.webp" },
];

const featureIcons = [Anchor, Star, Users, Clock];

// Hero poster shown on mobile before the visitor taps to play.
const HERO_POSTER =
  "/boats/andromeda.webp";

// Hero video 1 has burned-in text/letters that appear after ~20s and clash
// with our own headline overlay. Loop only the clean opening by rewinding just
// before that point (rewind a touch early since timeupdate only fires ~4x/sec).
const HERO1_LOOP_SECONDS = 19.5;
const capHeroVideo1 = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  const v = e.currentTarget;
  if (v.currentTime >= HERO1_LOOP_SECONDS) v.currentTime = 0;
};

// Real destination photos from rentboatsalamina.gr.
// Order MUST match tr.home.destinations in lib/translations.ts:
// Kanakia, Aias, Lamprano, Secret Beaches, Euripides' Cave, Lighthouse,
// Ancient Salamina, Salamis Monument, Iliaxti, Columns Patitiri,
// Kohi Beach, Museum, Karaiskakis Tomb, Sikelianos House.
// Real local Salamina photos where provided; Unsplash placeholders for the
// destinations still awaiting a real photo.
const DEST_IMAGES = [
  "/destinations/kanakia.webp",                                                                     // Kanakia (real)
  "/destinations/aias-beach.jpg",                                                                   // Aias Beach (real)
  "/destinations/lamprano.jpg",                                                                     // Lamprano (real)
  "/destinations/secret-beaches.jpg",                                                               // Secret Beaches (real)
  "/destinations/euripides-cave.jpg",                                                               // Euripides' Cave (real)
  "/destinations/konchi-lighthouse.jpg",                                                            // Konchi Lighthouse (real)
  "/destinations/ancient-salamina.jpg",                                                             // Ancient Salamina (real)
  "/destinations/salamis-monument.webp",                                                            // Salamis Monument (real)
  "/destinations/iliaxti.jpg",                                                                      // Iliaxti (real)
  "/destinations/columns-patitiri.jpg",                                                             // Columns Patitiri (real)
  "/destinations/kohi-beach.jpg",                                                                   // Kohi Beach (real)
  "/destinations/archaeological-museum.jpg",                                                        // Archaeological Museum (real)
  "/destinations/karaiskakis-tomb.jpg",                                                             // Karaiskakis Tomb (real)
  "/destinations/sikelianos-house.jpg",                                                             // Sikelianos House (real)
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
              className="flex-shrink-0 flex flex-col bg-[#F5F8FB] border border-[#D6EAF8] rounded-lg p-8 shadow-sm cursor-grab active:cursor-grabbing select-none"
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
          className="w-9 h-9 rounded-full border border-[#D6EAF8] flex items-center justify-center text-[#6B6B6B] hover:border-gold hover:text-gold transition-colors"
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
                activeDot === i ? "w-6 bg-gold" : "w-1.5 bg-[#0B2645]/20 hover:bg-[#0B2645]/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => { paginate(1); resetTimer(); }}
          aria-label="Next review"
          className="w-9 h-9 rounded-full border border-[#D6EAF8] flex items-center justify-center text-[#6B6B6B] hover:border-gold hover:text-gold transition-colors"
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

  // Mobile "tap to play" hero state
  const [isMobile, setIsMobile] = useState(false);
  const [heroReady, setHeroReady] = useState(false); // detection has run (client only)
  const [mobileTapped, setMobileTapped] = useState(false); // visitor tapped play
  const [mobileReady, setMobileReady] = useState(false);   // canplaythrough fired
  const [mobileFailed, setMobileFailed] = useState(false); // gave up after retries
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const retryCountRef = useRef(0);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Video is only revealed once the visitor tapped AND it buffered through,
  // and only while it hasn't permanently failed (then particles show through).
  const mobileShowingVideo = mobileTapped && mobileReady && !mobileFailed;

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

  // Mobile detection — viewport width OR a touch-device user agent.
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < 768 ||
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    check();
    setHeroReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleDotClick = (i: number) => {
    setActiveVideo(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveVideo(v => (v + 1) % 2);
    }, 8000);
  };

  // Reveal the video — clears the safety timer so the spinner can't linger.
  const revealMobileVideo = () => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    setMobileReady(true);
  };

  // Mobile: tap the play button to start the looping video — always muted,
  // which lets the play() call succeed reliably on iOS / Android. A spinner
  // shows until the video has buffered enough (canplaythrough) to play smoothly.
  const handleMobilePlay = () => {
    const v = mobileVideoRef.current;
    if (!v) return;
    v.muted = true;
    retryCountRef.current = 0;
    setMobileFailed(false);
    setMobileTapped(true);
    v.play().catch(() => {});
    // HAVE_ENOUGH_DATA (4) means it's already buffered through.
    if (v.readyState >= 4) revealMobileVideo();
    // Safety net: iOS sometimes never fires canplaythrough for muted inline
    // video — reveal anyway after 6s so the spinner can't spin forever.
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => setMobileReady(true), 6000);
  };

  // If the video stalls or errors, reload + replay up to 3 times before
  // giving up and letting the particle ocean show through underneath.
  const retryMobileVideo = () => {
    const v = mobileVideoRef.current;
    if (!v) return;
    if (retryCountRef.current >= 3) {
      setMobileFailed(true);
      return;
    }
    retryCountRef.current += 1;
    try {
      v.load();
      v.play().catch(() => {});
    } catch {
      /* ignore — covered by the retry cap above */
    }
  };

  // Clear the reveal-safety timer on unmount.
  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0A1628]"
      >
        <div ref={bgRef} className="absolute inset-0 origin-center overflow-hidden">
          {/* z-0 — static dark-blue base. Shown before the videos load and as
              the only fallback if a video fails (no particle ocean anywhere). */}
          <div className="absolute inset-0 z-0 bg-[#0A1628]" />

          {/* ─── DESKTOP: autoplay crossfading videos ─── */}
          {heroReady && !isMobile && (
            <>
              {/* Video 1 — local optimized boat video (web-optimized / fast-start) */}
              <motion.div
                className="absolute inset-0"
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
                  poster={HERO_POSTER}
                  onCanPlay={() => setVid1Ready(true)}
                  onLoadedData={() => setVid1Ready(true)}
                  onTimeUpdate={capHeroVideo1}
                >
                  <source src="/boat-hero-1-desktop.mp4" type="video/mp4" />
                </video>
              </motion.div>

              {/* Video 2 — local boat video */}
              <motion.div
                className="absolute inset-0"
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
                  poster="/boats/soul-is.webp"
                  onCanPlay={() => setVid2Ready(true)}
                  onLoadedData={() => setVid2Ready(true)}
                >
                  <source src="/boat-hero-2-desktop.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </>
          )}

          {/* ─── MOBILE: tap-to-play ─── */}
          {heroReady && isMobile && (
            <>
              {/* z-2 — poster with a slow Ken Burns drift until the video shows.
                  Hidden once the video fails so the particles show through. */}
              {!mobileShowingVideo && !mobileFailed && (
                <motion.div
                  className="absolute inset-0 z-[2]"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.12 }}
                  transition={{
                    duration: 16,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src={HERO_POSTER}
                    alt="Boat at sea — Salamina"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                </motion.div>
              )}

              {/* z-1 — the video itself, on top of the particles when playing */}
              <video
                ref={mobileVideoRef}
                className={`absolute inset-0 z-[1] w-full h-full object-cover transition-opacity duration-700 ${
                  mobileShowingVideo ? "opacity-100" : "opacity-0"
                }`}
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_POSTER}
                onCanPlayThrough={revealMobileVideo}
                onPlaying={() => {
                  retryCountRef.current = 0;
                  setMobileFailed(false);
                }}
                onStalled={() => { if (mobileTapped) retryMobileVideo(); }}
                onError={() => { if (mobileTapped) retryMobileVideo(); }}
                onTimeUpdate={capHeroVideo1}
                {...({ "webkit-playsinline": "true" } as Record<string, string>)}
              >
                {/* Same hero footage as desktop. */}
                <source src="/boat-hero-1.mp4" type="video/mp4" />
              </video>
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-blue-900/30 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white pointer-events-none" />

        {/* ─── MOBILE: centered tap-to-play button (also a manual retry after
             a failure). Kept above the hero text so it stays visible and
             tappable. ─── */}
        {isMobile && (!mobileTapped || mobileFailed) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <button
              onClick={handleMobilePlay}
              aria-label="Play video"
              className="relative pointer-events-auto w-[70px] h-[70px] rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center active:scale-95 transition-transform"
            >
              {/* Pulse rings */}
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              <span className="absolute -inset-3 rounded-full border border-white/20 animate-pulse" />
              <Play className="w-7 h-7 text-white fill-white translate-x-0.5" />
            </button>
          </div>
        )}

        {/* ─── MOBILE: buffering spinner (after tap, until canplaythrough) ─── */}
        {isMobile && mobileTapped && !mobileReady && !mobileFailed && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="w-[70px] h-[70px] rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>
        )}

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
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide text-white leading-tight mb-6"
          >
            {tr.home.h1a}{" "}
            <span className="text-gold italic font-medium">{tr.home.h1b}</span>
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
              href="https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1"
              className="bg-gold hover:bg-gold-light text-white font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200 inline-block"
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

        {/* Video dot indicators — desktop crossfade only */}
        {!isMobile && (
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
        )}

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
      <section className="bg-white py-24 px-6 lg:px-12" ref={featuresRef}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645]">
              {tr.home.whyTitle}{" "}
              <span className="text-gold italic font-medium">{tr.home.whySalamina}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tr.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={f.title}
                  className="feat-card relative bg-white border border-[#D6EAF8] shadow-sm rounded-lg p-6 hover:border-gold/50 transition-colors duration-300"
                >
                  <span className="absolute top-4 right-5 font-display text-3xl font-bold text-[#0B2645]/15 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#2E86C1]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-[#0B2645] font-semibold mb-2">{f.title}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STAT COUNTERS ═══════════════════════ */}
      <div
        ref={statsRef}
        className="bg-[#F5F8FB] border-y border-[#D6EAF8] py-14 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {STAT_VALUES.map((_, i) => (
            <div key={i} className="group">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-1 tabular-nums">
                <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                {STAT_SUFFIXES[i]}
              </div>
              <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mt-1">
                {statLabels[i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════ FLEET — desktop horizontal scroll ═══════════════════════ */}
      <section
        ref={fleetSectionRef}
        className="hidden md:block overflow-hidden bg-white"
      >
        <div className="h-screen flex flex-col justify-center">
          <div className="flex items-end justify-between px-12 mb-10 flex-shrink-0">
            <div>
              <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">
                {tr.home.fleetBadge}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645]">
                {tr.home.fleetTitle}{" "}
                <span className="text-gold italic font-medium">{tr.home.fleetHighlight}</span>
              </h2>
            </div>
            <p className="text-[#6B6B6B] text-sm tracking-wide">
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
                href="/fleet"
                key={boat.name}
                className="group flex-shrink-0 w-[340px]"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 bg-[#F5F8FB]">
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
                    <p className="text-[#0B2645] font-semibold">{boat.name}</p>
                    <p className="text-[#6B6B6B] text-xs mt-0.5">
                      {boat.cap} {tr.home.pax}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0B2645]/25 group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}

            <Link
              href="/fleet"
              className="group flex-shrink-0 w-[260px] flex flex-col items-center justify-center rounded-xl border border-[#D6EAF8] hover:border-gold/50 bg-[#F5F8FB] shadow-sm transition-colors duration-300 mr-12 gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#2E86C1]/10 flex items-center justify-center group-hover:bg-gold/25 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[#6B6B6B] group-hover:text-[#0B2645] text-sm tracking-widest uppercase transition-colors">
                {tr.home.viewAll}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FLEET — mobile grid fallback ═══════════════════════ */}
      <section className="md:hidden bg-white py-24 px-6">
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-2">
            {tr.home.fleetBadge}
          </p>
          <h2 className="text-3xl font-bold text-[#0B2645]">
            {tr.home.fleetTitle}{" "}
            <span className="text-gold">{tr.home.fleetHighlight}</span>
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 scrollbar-hide">
          {allBoats.map((boat) => (
            <Link
              href="/fleet"
              key={boat.name}
              className="group flex-shrink-0 w-[280px] snap-start"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3 bg-[#F5F8FB]">
                <Image
                  src={boat.img}
                  alt={boat.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <p className="text-[#0B2645] font-semibold">{boat.name}</p>
              <p className="text-[#6B6B6B] text-xs mt-0.5">
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
      <section className="bg-[#F5F8FB] py-24 px-6 lg:px-12" ref={destRef}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645]">
              {tr.home.destTitle}{" "}
              <span className="text-gold italic font-medium">{tr.home.destHighlight}</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2645]/90 via-[#0B2645]/20 to-transparent" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645]">
              {tr.home.reviewsTitle}
            </h2>
          </motion.div>

          <TestimonialCarousel reviews={tr.home.reviews} />
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-[#F5F8FB] py-24 px-6 lg:px-12 border-t border-[#D6EAF8]">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B2645] mb-4">
            {tr.home.ctaTitle}
          </h2>
          <p className="text-[#4A4A4A] text-base mb-10 leading-relaxed max-w-xl mx-auto">
            {tr.home.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+306978059001"
              className="inline-flex items-center gap-2 border border-[#D6EAF8] bg-white text-[#0B2645] hover:border-gold hover:text-gold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              +30 697 805 9001
            </a>
            <MagneticButton
              href="https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200"
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
