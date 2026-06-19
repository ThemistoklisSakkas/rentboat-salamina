"use client";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// CaptainBook opens its booking modal when this link is clicked
// (widget.js is loaded in the document <head> — see app/layout.tsx).
const CAPTAINBOOK_URL =
  "https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1";

export default function BookingPage() {
  const { tr } = useLanguage();

  return (
    <div className="bg-[#F0F7FC] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">{tr.booking.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A2B3C] mb-3">
            {tr.booking.title}{" "}
            <span className="text-gold">{tr.booking.titleHighlight}</span>
          </h1>
          <p className="text-[#6B6B6B] text-sm max-w-lg">{tr.booking.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* CaptainBook booking */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-[#D6EAF8] rounded-xl p-10 shadow-sm"
            >
              <p className="text-gold text-xs tracking-widest uppercase border-b border-[#D6EAF8] pb-2 mb-5">
                {tr.booking.sectionBooking}
              </p>
              <h2 className="text-2xl font-bold text-[#1A2B3C] mb-3">
                {tr.booking.title} {tr.booking.titleHighlight}
              </h2>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-8 max-w-md">
                {tr.booking.subtitle}
              </p>

              <a
                href={CAPTAINBOOK_URL}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-colors duration-200 group"
              >
                Κράτηση / Book Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <p className="text-[#6B6B6B] text-xs mt-4">{tr.booking.disclaimer}</p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white border border-[#D6EAF8] rounded-xl p-6 shadow-sm">
                <p className="text-gold text-xs tracking-widest uppercase mb-4">
                  {tr.contact.phoneTitle}
                </p>
                <div className="space-y-2">
                  <a href="tel:+306978059001"
                    className="flex items-center gap-2 text-[#4A4A4A] hover:text-gold text-sm transition-colors">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    +30 697 805 9001
                  </a>
                  <a href="tel:+306985123690"
                    className="flex items-center gap-2 text-[#4A4A4A] hover:text-gold text-sm transition-colors">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    +30 698 512 3690
                  </a>
                  <a href="mailto:info@rentboatsalamina.gr"
                    className="flex items-center gap-2 text-[#4A4A4A] hover:text-gold text-sm transition-colors">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    info@rentboatsalamina.gr
                  </a>
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/25 rounded-xl p-6">
                <p className="text-gold font-semibold text-xs tracking-widest uppercase mb-4">
                  {tr.booking.termsTitle}
                </p>
                <ul className="space-y-3">
                  {tr.booking.terms.map((term) => (
                    <li key={term} className="flex items-start gap-2 text-[#4A4A4A] text-sm leading-relaxed">
                      <span className="text-gold mt-0.5 flex-shrink-0">•</span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
