"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";

const BOOK_URL = "https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { tr, lang, setLang } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/fleet", label: tr.nav.fleet },
    { href: "/contact", label: tr.nav.contact },
  ];

  // Navbar is dark navy at the top and turns solid white on scroll, so the
  // logo and links flip from white to navy accordingly.
  const dark = !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm border-b border-[#E5E5E0]" : "bg-[#0B2645]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo — the real brand artwork. White on the dark navbar; darkened
            to navy when the navbar turns white on scroll. */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Salamina Rent Boat"
            width={500}
            height={112}
            priority
            className={`h-10 w-auto transition-[filter] duration-200 ${
              dark ? "" : "[filter:brightness(0)_saturate(100%)_invert(11%)_sepia(42%)_saturate(1900%)_hue-rotate(189deg)_brightness(95%)_contrast(96%)]"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                  active
                    ? dark
                      ? "text-white font-semibold"
                      : "text-ocean-blue font-semibold"
                    : dark
                      ? "text-white/65 hover:text-white"
                      : "text-[#0B2645]/60 hover:text-[#0B2645]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-xs tracking-widest">
            <button
              onClick={() => setLang("en")}
              className={`transition-colors duration-200 ${
                lang === "en"
                  ? dark ? "text-white font-semibold" : "text-gold font-semibold"
                  : dark ? "text-white/50 hover:text-white/80" : "text-[#0B2645]/35 hover:text-[#0B2645]/65"
              }`}
            >
              EN
            </button>
            <span className={dark ? "text-white/30" : "text-[#0B2645]/20"}>|</span>
            <button
              onClick={() => setLang("gr")}
              className={`transition-colors duration-200 ${
                lang === "gr"
                  ? dark ? "text-white font-semibold" : "text-gold font-semibold"
                  : dark ? "text-white/50 hover:text-white/80" : "text-[#0B2645]/35 hover:text-[#0B2645]/65"
              }`}
            >
              ΕΛ
            </button>
          </div>
          <MagneticButton
            href={BOOK_URL}
            className="bg-gold hover:bg-gold-light text-white font-bold text-xs tracking-widest uppercase px-5 py-2 rounded-sm transition-colors duration-200 inline-block"
          >
            {tr.nav.bookNow}
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors ${dark ? "text-white" : "text-[#0B2645]"}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu (solid white dropdown) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-[#E5E5E0] px-6 py-6 space-y-4 shadow-md"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block text-sm tracking-widest uppercase py-1 transition-colors ${
                  pathname === l.href ? "text-ocean-blue font-semibold" : "text-[#0B2645]/70 hover:text-[#0B2645]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E5E5E0] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs tracking-widest">
                <button
                  onClick={() => setLang("en")}
                  className={lang === "en" ? "text-gold font-semibold" : "text-[#0B2645]/35"}
                >
                  EN
                </button>
                <span className="text-[#0B2645]/20">|</span>
                <button
                  onClick={() => setLang("gr")}
                  className={lang === "gr" ? "text-gold font-semibold" : "text-[#0B2645]/35"}
                >
                  ΕΛ
                </button>
              </div>
              <a
                href={BOOK_URL}
                onClick={() => setOpen(false)}
                className="bg-gold text-white font-bold text-xs tracking-widest uppercase px-5 py-2 rounded-sm"
              >
                {tr.nav.bookNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
