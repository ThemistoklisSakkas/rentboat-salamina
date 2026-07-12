"use client";
import Link from "next/link";
import Image from "next/image";
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

export default function Footer() {
  const { tr } = useLanguage();

  return (
    <footer className="bg-[#F5F8FB] border-t border-[#D6EAF8] text-[#0B2645]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Salamina Rent Boat"
              width={500}
              height={112}
              className="h-12 w-auto mb-5 [filter:brightness(0)_saturate(100%)_invert(11%)_sepia(42%)_saturate(1900%)_hue-rotate(189deg)_brightness(95%)_contrast(96%)]"
            />
            <p className="text-[#4A4A4A] text-sm leading-relaxed max-w-xs">
              {tr.footer.tagline}
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/rentboatsalamina.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-[#D6EAF8] flex items-center justify-center text-[#6B6B6B] hover:text-gold hover:border-gold/50 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/rentboatsalamina.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-[#D6EAF8] flex items-center justify-center text-[#6B6B6B] hover:text-gold hover:border-gold/50 transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-5">
              {tr.footer.navTitle}
            </p>
            <ul className="space-y-3">
              {[
                { href: "/", label: tr.footer.links.home },
                { href: "/fleet", label: tr.footer.links.fleet },
                { href: "/booking", label: tr.footer.links.booking },
                { href: "/contact", label: tr.footer.links.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#4A4A4A] hover:text-ocean-blue text-sm tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-5">
              {tr.footer.contactTitle}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+306985123690" className="text-[#4A4A4A] hover:text-ocean-blue transition-colors duration-200">
                  +30 698 512 3690
                </a>
              </li>
              <li>
                <a href="tel:+306978059001" className="text-[#4A4A4A] hover:text-ocean-blue transition-colors duration-200">
                  +30 697 805 9001
                </a>
              </li>
              <li>
                <a href="mailto:info@rentboatsalamina.gr" className="text-[#4A4A4A] hover:text-ocean-blue transition-colors duration-200">
                  info@rentboatsalamina.gr
                </a>
              </li>
              <li className="text-[#6B6B6B] leading-relaxed pt-1">
                {tr.contact.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#D6EAF8] pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[#6B6B6B] text-xs tracking-wide">
          <p>© {new Date().getFullYear()} Rent Boat Salamina. {tr.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
