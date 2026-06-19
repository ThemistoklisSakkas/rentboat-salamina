"use client";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BOATS = [
  "Salamina",
  "Anna",
  "Quality",
  "Andromeda – Technohull Alpha 40",
];

const inputClass =
  "w-full bg-white border border-[#E5E5E0] text-[#1A2B3C] placeholder-[#6B6B6B] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-200";

const labelClass = "block text-[#6B6B6B] text-xs tracking-widest uppercase mb-2";

function BookingForm() {
  const { tr, lang } = useLanguage();
  const searchParams = useSearchParams();
  const preselectedBoat = searchParams.get("boat") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    boat: BOATS.includes(preselectedBoat) ? preselectedBoat : "",
    startDate: "",
    endDate: "",
    guests: "",
    message: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Deliver the request via WhatsApp so it actually reaches the owner.
  // TODO: replace with a server-side email (Resend / Formspree) once the
  // customer provides an account — keep WhatsApp as a secondary channel.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const L = lang === "gr";
    const message = [
      L ? "🛥️ Νέο αίτημα κράτησης από το site:" : "🛥️ New booking request from the website:",
      `${L ? "Όνομα" : "Name"}: ${form.name}`,
      `${L ? "Τηλέφωνο" : "Phone"}: ${form.phone}`,
      `Email: ${form.email}`,
      `${L ? "Σκάφος" : "Boat"}: ${form.boat}`,
      `${L ? "Ημερομηνία" : "Date"}: ${form.startDate}${form.endDate ? ` ${L ? "έως" : "to"} ${form.endDate}` : ""}`,
      form.guests ? `${L ? "Επιβάτες" : "Guests"}: ${form.guests}` : "",
      form.message ? `${L ? "Σημειώσεις" : "Notes"}: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/306978059001?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#F5F5F0] border border-gold/30 rounded-xl p-10 text-center"
      >
        <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-gold" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A2B3C] mb-3">{tr.booking.successTitle}</h2>
        <p className="text-[#4A4A4A] text-sm leading-relaxed mb-2">
          {tr.booking.successMsg(form.name, form.boat, form.startDate)}
        </p>
        <p className="text-[#6B6B6B] text-sm mb-8">{tr.booking.successSub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:+306978059001"
            className="inline-flex items-center gap-2 border border-[#E5E5E0] text-[#1A2B3C] hover:border-gold hover:text-gold text-xs tracking-widest uppercase px-6 py-2.5 rounded-sm transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {tr.booking.callUsBtn}
          </a>
          <a
            href="mailto:info@rentboatsalamina.gr"
            className="inline-flex items-center gap-2 border border-[#E5E5E0] text-[#1A2B3C] hover:border-gold hover:text-gold text-xs tracking-widest uppercase px-6 py-2.5 rounded-sm transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            {tr.booking.emailUsBtn}
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Personal */}
      <div>
        <p className="text-gold text-xs tracking-widest uppercase border-b border-[#E5E5E0] pb-2 mb-5">
          {tr.booking.sectionPersonal}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{tr.booking.fullName} *</label>
            <input type="text" name="name" required value={form.name} onChange={set}
              placeholder={tr.booking.fullNamePlaceholder} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{tr.booking.phone} *</label>
            <input type="tel" name="phone" required value={form.phone} onChange={set}
              placeholder={tr.booking.phonePlaceholder} className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>{tr.booking.email} *</label>
          <input type="email" name="email" required value={form.email} onChange={set}
            placeholder={tr.booking.emailPlaceholder} className={inputClass} />
        </div>
      </div>

      {/* Booking details */}
      <div>
        <p className="text-gold text-xs tracking-widest uppercase border-b border-[#E5E5E0] pb-2 mb-5">
          {tr.booking.sectionBooking}
        </p>
        <div className="mb-4">
          <label className={labelClass}>{tr.booking.selectBoat} *</label>
          <select name="boat" required value={form.boat} onChange={set}
            className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" disabled className="bg-white text-[#6B6B6B]">
              {tr.booking.selectBoatPlaceholder}
            </option>
            {BOATS.map((b) => (
              <option key={b} value={b} className="bg-white text-[#1A2B3C]">{b}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>{tr.booking.startDate} *</label>
            <input type="date" name="startDate" required value={form.startDate} onChange={set}
              min={today} className={`${inputClass} [color-scheme:light]`} />
          </div>
          <div>
            <label className={labelClass}>
              {tr.booking.endDate}{" "}
              <span className="text-[#6B6B6B] normal-case">{tr.booking.endDateOptional}</span>
            </label>
            <input type="date" name="endDate" value={form.endDate} onChange={set}
              min={form.startDate || today} className={`${inputClass} [color-scheme:light]`} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{tr.booking.guests}</label>
          <input type="number" name="guests" min="1" max="10" value={form.guests} onChange={set}
            placeholder={tr.booking.guestsPlaceholder} className={inputClass} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>{tr.booking.notes}</label>
        <textarea name="message" rows={3} value={form.message} onChange={set}
          placeholder={tr.booking.notesPlaceholder}
          className={`${inputClass} resize-none`} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200 group"
        >
          {tr.booking.submit}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <p className="text-[#6B6B6B] text-xs">{tr.booking.disclaimer}</p>
      </div>
    </motion.form>
  );
}

export default function BookingPage() {
  const { tr } = useLanguage();

  return (
    <div className="bg-[#F5F8FB] min-h-screen pt-24">
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
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96 bg-[#F5F5F0] rounded-xl animate-pulse" />}>
              <BookingForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white border border-[#E5E5E0] rounded-xl p-6 shadow-sm">
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
