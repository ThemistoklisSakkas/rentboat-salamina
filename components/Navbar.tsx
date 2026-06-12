"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-b border-[#E5E5E0]"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-[#1A1A1A]/40 text-[9px] tracking-[0.3em] uppercase">Rent Boat</span>
          <span className="text-gold font-bold text-sm tracking-widest uppercase">Salamina</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                pathname === l.href
                  ? "text-ocean-blue font-semibold"
                  : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-xs tracking-widest">
            <button
              onClick={() => setLang("en")}
              className={`transition-colors duration-200 ${
                lang === "en" ? "text-gold font-semibold" : "text-[#1A1A1A]/35 hover:text-[#1A1A1A]/65"
              }`}
            >
              EN
            </button>
            <span className="text-[#1A1A1A]/20">|</span>
            <button
              onClick={() => setLang("gr")}
              className={`transition-colors duration-200 ${
                lang === "gr" ? "text-gold font-semibold" : "text-[#1A1A1A]/35 hover:text-[#1A1A1A]/65"
              }`}
            >
              ΕΛ
            </button>
          </div>
          <MagneticButton
            href="/booking"
            className="bg-gold hover:bg-gold-light text-navy font-bold text-xs tracking-widest uppercase px-5 py-2 rounded-sm transition-colors duration-200 inline-block"
          >
            {tr.nav.bookNow}
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
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
                  pathname === l.href ? "text-ocean-blue font-semibold" : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E5E5E0] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs tracking-widest">
                <button
                  onClick={() => setLang("en")}
                  className={lang === "en" ? "text-gold font-semibold" : "text-[#1A1A1A]/35"}
                >
                  EN
                </button>
                <span className="text-[#1A1A1A]/20">|</span>
                <button
                  onClick={() => setLang("gr")}
                  className={lang === "gr" ? "text-gold font-semibold" : "text-[#1A1A1A]/35"}
                >
                  ΕΛ
                </button>
              </div>
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="bg-gold text-navy font-bold text-xs tracking-widest uppercase px-5 py-2 rounded-sm"
              >
                {tr.nav.bookNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
