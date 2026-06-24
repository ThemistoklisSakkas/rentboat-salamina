"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Floating language toggle — an extra access point that reuses the shared
// language state (the navbar EN|ΕΛ switcher stays too). Mirrors the phone
// button's navy circular style, on the bottom-left.
export default function LanguageButton() {
  const { lang, setLang } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={() => setLang(lang === "en" ? "gr" : "en")}
      aria-label={lang === "en" ? "Switch to Greek" : "Αλλαγή σε Αγγλικά"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#0B2645] rounded-full shadow-lg shadow-black/25 flex items-center justify-center text-white font-bold text-sm tracking-wider"
    >
      {lang === "en" ? "EN" : "ΕΛ"}
    </motion.button>
  );
}
