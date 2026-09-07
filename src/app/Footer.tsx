import { Link } from "react-router";
import { Facebook, Instagram } from "lucide-react";
import { SHOW_FREE_MESSAGING } from "./flags";

const QUICK_LINKS = [
  { label: "Features", href: "/features" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const CONTACT_ITEMS = [
  { label: "marketing@edbuddies.ai", href: "mailto:marketing@edbuddies.ai" },
  { label: "+6017-566 5935 (MY)",    href: "https://wa.me/60175665935" },
  { label: "+65 9837 3314 (SG)",     href: "https://wa.me/6598373314" },
];

export default function Footer() {
  return (
    <footer className="bg-[#09244B] text-white">

      {/* ── Top: 3-column grid ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 items-start">

          {/* Col 1 — About Us */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">About Us</p>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {SHOW_FREE_MESSAGING
                ? "Free centre management app for tuition centres and freelance tutors in Malaysia & Singapore. No fees, no limits."
                : "Centre management app for tuition centres and freelance tutors in Malaysia & Singapore."}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61573123059740" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/edbuddies.ai" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="flex flex-col items-start sm:items-center text-left sm:text-center w-full">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Quick Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 w-full sm:place-items-center">
              {QUICK_LINKS.map(({ label, href }) => (
                <Link key={label} to={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Contact</p>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Middle: logo ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-center">
          <img
            src="/assets/logo-horizontal-dark.webp"
            alt="EdBuddies"
            loading="lazy"
            className="h-28 sm:h-36 lg:h-44 w-auto object-contain opacity-20 select-none"
          />
        </div>
      </div>

      {/* ── Bottom: copyright + socials ─────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 flex flex-wrap items-center gap-x-3 gap-y-1 justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} EdBuddies. All rights reserved. Built for tuition centres in Malaysia &amp; Singapore.</span>
            <Link to="/privacy" className="underline hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="underline hover:text-white transition-colors duration-200">Terms of Service</Link>
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/profile.php?id=61573123059740"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/edbuddies.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
