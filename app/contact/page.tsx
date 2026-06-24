"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactPage() {
  const { tr } = useLanguage();

  return (
    <div className="bg-[#F5F8FB] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">{tr.contact.badge}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B2645] mb-3">
            {tr.contact.title}{" "}
            <span className="text-gold">{tr.contact.titleHighlight}</span>
          </h1>
          <p className="text-[#6B6B6B] text-sm max-w-md mx-auto">{tr.contact.subtitle}</p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="bg-white border border-[#D6EAF8] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
          >
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-3">{tr.contact.phoneTitle}</p>
            <div className="space-y-1.5">
              <a href="tel:+306978059001" className="block text-[#4A4A4A] hover:text-ocean-blue text-sm transition-colors">
                +30 697 805 9001
              </a>
              <a href="tel:+306985123690" className="block text-[#4A4A4A] hover:text-ocean-blue text-sm transition-colors">
                +30 698 512 3690
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-[#D6EAF8] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
          >
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-3">{tr.contact.emailTitle}</p>
            <a href="mailto:info@rentboatsalamina.gr"
              className="text-[#4A4A4A] hover:text-ocean-blue text-sm transition-colors break-all">
              info@rentboatsalamina.gr
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-[#D6EAF8] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
          >
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-3">{tr.contact.locationTitle}</p>
            <p className="text-[#4A4A4A] text-sm leading-relaxed">
              Μαρίνα Σαλαμίνας, TK 18900
              <br />
              Dionysios Solomos 5
            </p>
            <p className="text-[#6B6B6B] text-xs mt-2">{tr.contact.meetingPoint}</p>
            <a
              href="https://maps.app.goo.gl/VvRvoU2g1DbyFGuu8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-xs mt-2 transition-colors"
            >
              {tr.contact.openMaps}
              <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white border border-[#D6EAF8] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
          >
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-3">{tr.contact.reservationsTitle}</p>
            <p className="text-[#4A4A4A] text-sm">{tr.contact.byPhone}</p>
            <p className="text-[#6B6B6B] text-xs mt-2">{tr.contact.notice}</p>
          </motion.div>
        </div>

        {/* Map + Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl overflow-hidden h-[380px] border border-[#D6EAF8] shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Leoforos+Karaiskaki+30,+Salamina+18900,+Greece&t=&z=16&hl=el&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salamina Marina"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-white border border-[#D6EAF8] rounded-xl p-6 shadow-sm">
              <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-4">{tr.contact.followUs}</p>
              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/rentboatsalamina.gr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#4A4A4A] hover:text-ocean-blue text-sm transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#F5F8FB] rounded-lg flex items-center justify-center text-[#6B6B6B] group-hover:text-ocean-blue transition-colors">
                    <FacebookIcon className="w-4 h-4" />
                  </div>
                  Facebook
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
                <a
                  href="https://www.instagram.com/rentboatsalamina.gr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#4A4A4A] hover:text-ocean-blue text-sm transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#F5F8FB] rounded-lg flex items-center justify-center text-[#6B6B6B] group-hover:text-ocean-blue transition-colors">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  Instagram
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/25 rounded-xl p-6">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">{tr.contact.ctaBadge}</p>
              <h3 className="text-[#0B2645] font-bold text-base mb-1">{tr.contact.ctaTitle}</h3>
              <p className="text-[#4A4A4A] text-sm mb-5">{tr.contact.ctaDesc}</p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+306978059001"
                  className="inline-flex items-center justify-center gap-2 border border-[#D6EAF8] text-[#0B2645] hover:border-gold hover:text-gold text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm transition-colors bg-white"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {tr.contact.callNow}
                </a>
                <a
                  href="https://rent-boat-salamina.captainbook.io/en/embedded/all?wid=1"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm transition-colors"
                >
                  {tr.contact.bookOnline}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
