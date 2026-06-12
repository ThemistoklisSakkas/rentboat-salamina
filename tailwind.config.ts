import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light site palette
        "warm-white":   "#FAFAF8",
        "section-gray": "#F5F5F0",
        "footer-bg":    "#F0F0EC",
        charcoal:       "#1A1A1A",
        "body-text":    "#4A4A4A",
        "muted-text":   "#6B6B6B",
        "light-border": "#E5E5E0",
        // Accent
        gold:           "#F0A500",
        "gold-light":   "#F5B833",
        // Dark accents (hero, hover links)
        navy:           "#0A1628",
        "ocean-blue":   "#1A4B8C",
        // CSS vars
        background: "var(--background)",
        foreground: "var(--foreground)",
        border:     "var(--border)",
        ring:       "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
