"use client";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function PhoneButton() {
  return (
    <motion.a
      href="tel:+306978059001"
      aria-label="Call us"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#0B2645] rounded-full shadow-lg shadow-black/25 flex items-center justify-center"
    >
      <Phone className="w-6 h-6 text-white" />
      {/* Subtle pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#0B2645] animate-ping opacity-20 pointer-events-none" />
    </motion.a>
  );
}
