"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";

const BOOK_URL = "https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { tr, lang, setLang } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/fleet", label: tr.nav.fleet },
    { href: "/contact", label: tr.nav.contact },
  ];

  // Navbar stays dark navy with white content at all scroll positions.
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0B2645] border-b border-white/10 shadow-md shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo — the real brand artwork, white on the navy navbar */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Salamina Rent Boat"
            width={500}
            height={112}
            priority
            className="h-10 w-auto"
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
                  active ? "text-white font-semibold" : "text-white/65 hover:text-white"
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
                lang === "en" ? "text-white font-semibold" : "text-white/50 hover:text-white/80"
              }`}
            >
              EN
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setLang("gr")}
              className={`transition-colors duration-200 ${
                lang === "gr" ? "text-white font-semibold" : "text-white/50 hover:text-white/80"
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
          className="md:hidden text-white transition-colors"
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
            className="md:hidden bg-[#0B2645] border-t border-white/10 px-6 py-6 space-y-4 shadow-md"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block text-sm tracking-widest uppercase py-1 transition-colors ${
                  pathname === l.href ? "text-white font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs tracking-widest">
                <button
                  onClick={() => setLang("en")}
                  className={lang === "en" ? "text-white font-semibold" : "text-white/50"}
                >
                  EN
                </button>
                <span className="text-white/30">|</span>
                <button
                  onClick={() => setLang("gr")}
                  className={lang === "gr" ? "text-white font-semibold" : "text-white/50"}
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
