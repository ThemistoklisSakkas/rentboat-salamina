import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import PhoneButton from "@/components/PhoneButton";
import LanguageButton from "@/components/LanguageButton";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

// Cormorant Garamond — elegant serif for Latin headings (no Greek subset).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// EB Garamond — matching Garamond serif that DOES cover Greek, used as a
// per-glyph fallback so Greek headings stay an elegant serif.
const garamondGreek = EB_Garamond({
  subsets: ["latin", "greek"],
  variable: "--font-display-greek",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rentboatsalamina.gr"),
  title: "Rent Boat Salamina | Ενοικίαση Σκάφους Σαλαμίνα",
  description:
    "Boat rental without license in Salamina, Greece. Explore 14 stunning destinations. Ενοικίαση σκάφους χωρίς δίπλωμα στη Σαλαμίνα.",
  keywords: [
    "boat rental Salamina",
    "rent boat without license Greece",
    "ενοικίαση σκάφους Σαλαμίνα",
    "ενοικίαση σκάφους χωρίς δίπλωμα",
    "boat hire Athens",
    "Technohull Alpha 40",
  ],
  openGraph: {
    title: "Rent Boat Salamina | Ενοικίαση Σκάφους Σαλαμίνα",
    description:
      "Boat rental without license in Salamina, Greece. Explore. Discover. Live.",
    url: "https://rentboatsalamina.gr",
    siteName: "Rent Boat Salamina",
    images: [
      {
        url: "https://rentboatsalamina.gr/wp-content/uploads/2025/07/DSC_3560-740x482.jpg",
        width: 740,
        height: 482,
        alt: "Andromeda — Technohull Alpha 40, Rent Boat Salamina",
      },
    ],
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent Boat Salamina | Ενοικίαση Σκάφους Σαλαμίνα",
    description:
      "Boat rental without license in Salamina, Greece. Explore. Discover. Live.",
    images: [
      "https://rentboatsalamina.gr/wp-content/uploads/2025/07/DSC_3560-740x482.jpg",
    ],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rent Boat Salamina",
  url: "https://rentboatsalamina.gr",
  image:
    "https://rentboatsalamina.gr/wp-content/uploads/2025/07/DSC_3560-740x482.jpg",
  telephone: "+30 697 805 9001",
  email: "info@rentboatsalamina.gr",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dionysios Solomos 5, Salamina Marina",
    addressLocality: "Salamina",
    postalCode: "18900",
    addressCountry: "GR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el" className={`${inter.variable} ${cormorant.variable} ${garamondGreek.variable}`}>
      <head>
        {/* CaptainBook booking widget — provides the click-to-open booking modal */}
        <link rel="dns-prefetch" href="//rent-boat-salamina.captainbook.io" />
        <script
          type="text/javascript"
          src="https://rent-boat-salamina.captainbook.io/widget.js"
          async
        />
      </head>
      <body className="antialiased bg-[#F5F8FB] text-[#0B2645]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ClientProviders>
          <SmoothScroll />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <WhatsAppButton />
          <PhoneButton />
          <LanguageButton />
        </ClientProviders>
      </body>
    </html>
  );
}
