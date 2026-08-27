import { motion } from "motion/react";
import { Button } from "./components/ui/button";
import { SEAMap } from "./components/ui/map";
import { CheckCircle2, ArrowRight, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";
import Footer from "./Footer";

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2",         label: "Active markets — Malaysia & Singapore" },
  { value: "50K+",      label: "Notifications sent" },
  { value: "13,300+",   label: "Attendance events tracked" },
  { value: "99.5%",     label: "Payment reliability" },
];

const MARKETS = [
  { flag: "🇲🇾", country: "Malaysia",   status: "Active",    color: "bg-green-100 text-green-700" },
  { flag: "🇸🇬", country: "Singapore",  status: "Active",    color: "bg-green-100 text-green-700" },
  { flag: "🇻🇳", country: "Vietnam",    status: "Coming Soon", color: "bg-orange-100 text-orange-600" },
  { flag: "🇵🇭", country: "Philippines", status: "Coming Soon", color: "bg-orange-100 text-orange-600" },
];


// ─── Video mascot (hidden until ready to avoid white flash) ───────────────────

function VideoMascot() {
  const [ready, setReady] = useState(false);
  return (
    <video
      src="/assets/animated-edii.mp4"
      autoPlay
      loop
      muted
      playsInline
      onCanPlay={() => setReady(true)}
      className="w-full rounded-3xl object-cover transition-opacity duration-500"
      style={{ mixBlendMode: "multiply", opacity: ready ? 1 : 0 }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageMeta({
      title: "About — EdBuddies | Our Story",
      description: "EdBuddies was built to close the gap between education and technology — giving every tuition centre, big or small, the tools they deserve.",
      url: "https://edbuddies.ai/about",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="about" />

      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#FF8000]" />
            <span className="uppercase tracking-wider font-medium">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 220, damping: 22 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] leading-tight mb-6"
          >
            Good tools should be
            <br className="hidden sm:block" />
            available to <span className="text-[#FF8000]">every centre.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We built EdBuddies because no educator should have to choose
            between great technology and keeping fees affordable.
          </motion.p>
        </div>
      </section>

      {/* ── Section 1b: Bento Grid ────────────────────────────────────────── */}
      <section className="pb-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Mobile: 2-col (full / two-up / full) · Desktop: 3-col bento */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 lg:h-[540px]">

            {/* Img 1 — large, top-left, spans 2 cols × 1 row */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0, type: "spring", stiffness: 170, damping: 22 }}
              className="col-span-2 h-52 lg:h-auto lg:row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <motion.img
                src="/assets/about-us-img-4.webp"
                alt="EdBuddies tuition centre management app interface"
                loading="lazy"
                className="w-full h-full object-cover object-[center_20%]"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 28 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09244B]/20 to-transparent pointer-events-none" />
              {/* Glass flare sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none" />
            </motion.div>

            {/* Img 2 — tall, right column, spans 1 col × 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, x: 24 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 170, damping: 22 }}
              className="col-span-1 h-44 lg:h-auto lg:row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <motion.img
                src="/assets/about-us-img-1.webp"
                alt="Centre management software for tuition centres in Malaysia"
                loading="lazy"
                className="w-full h-full object-cover object-center scale-110"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 28 }}
              />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none" />
            </motion.div>

            {/* Img 3 — bottom-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.18, type: "spring", stiffness: 180, damping: 24 }}
              className="col-span-1 h-44 lg:h-auto lg:row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <motion.img
                src="/assets/about-us-img-2.png"
                alt="EdBuddies student attendance and billing management"
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 28 }}
              />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none" />
            </motion.div>

            {/* Img 4 — bottom-middle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.26, type: "spring", stiffness: 180, damping: 24 }}
              className="col-span-2 lg:col-span-1 h-44 lg:h-auto lg:row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <motion.img
                src="/assets/about-us-img-3.png"
                alt="Freelance tutor using EdBuddies app for class scheduling"
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 28 }}
              />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Story ──────────────────────────────────────────────── */}
      <section ref={storyRef} className="py-20 px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — story text */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 24 }}
                className="inline-flex items-center gap-2 text-sm text-gray-500"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FF8000]" />
                <span className="uppercase tracking-wider font-medium">Why we exist</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09244B] leading-tight"
              >
                We saw the gap.<br />We decided to close it.
              </motion.h2>

              {[
                "In Southeast Asia, thousands of freelance tutors and small tuition centres are delivering good education every day, but running their operations on spreadsheets, WhatsApp groups, and paper registers.",
                "Not because they lack ambition. The tools that existed were built for bigger institutions, and priced that way too. For a small centre keeping fees low for parents, paying hundreds of ringgit a month for software was never going to work.",
                "So they managed manually. They chased fees by hand, tracked attendance on paper, and spent hours on admin that should have taken minutes. EdBuddies was built to change that.",
                "Every centre, big or small, deserves tools that work as hard as they do. That's why we built EdBuddies specifically for education businesses, not adapted from some generic tool, so every educator gets technology that actually fits how they work.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.14 + i * 0.1 }}
                  className="text-gray-600 leading-relaxed text-lg"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Right — stock image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 200, damping: 26 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden group cursor-pointer" style={{ boxShadow: "0 12px 48px rgba(9,36,75,0.18)" }}>
                <motion.img
                  src="/assets/why-we-exist.webp"
                  alt="EdBuddies team — building education management tools for tuition centres in Malaysia and Singapore"
                  loading="lazy"
                  className="w-full h-[480px] object-cover"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 28 }}
                />
                {/* Glass flare sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none" />
                {/* Orange accent overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#09244B]/80 to-transparent p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-0.5 bg-[#FF8000]" />
                    <span className="text-[#FF8000] text-sm font-semibold uppercase tracking-wider">EdBuddies Mission</span>
                  </div>
                  <p className="text-white text-lg font-semibold leading-snug">
                    Good tools should reach every centre, big or small.
                  </p>
                </div>
              </div>
              {/* Decorative orange corner accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[#FF8000]/15 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-[#09244B]/08 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Stats strip ────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Orange accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-1 bg-[#FF8000] rounded-full mb-12 origin-left"
            style={{ maxWidth: "120px" }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 260, damping: 24 }}
                className="flex flex-col gap-2 items-center text-center"
              >
                <p className="text-4xl sm:text-5xl font-bold text-[#09244B] leading-none">{value}</p>
                <div className="w-6 h-0.5 bg-[#FF8000] rounded-full" />
                <p className="text-sm text-gray-500 leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Markets ────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Globe className="w-4 h-4" />
              <span className="uppercase tracking-wider">Where we are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09244B]">
              Built for Southeast Asia.
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto mt-4">
              We started where we know education best. Now we're expanding from there.
            </p>
          </motion.div>

          {/* Animated map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 26 }}
            className="flex justify-center mb-10"
          >
            <SEAMap />
          </motion.div>

          {/* Country cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {MARKETS.map(({ flag, country, status, color }, i) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 260, damping: 24 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(9,36,75,0.14)", transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="bg-white rounded-2xl p-6 text-center"
                style={{ boxShadow: "0 2px 8px rgba(9,36,75,0.08)" }}
              >
                <div className="text-4xl mb-3">{flag}</div>
                <p className="font-bold text-[#09244B] mb-2">{country}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
                  {status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Mission strip ──────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-[#09244B]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="uppercase tracking-wider">Our Mission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
          >
            Close the gap between education<br className="hidden sm:block" /> and technology. For good.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Every tuition centre, every freelance tutor, every enrichment class deserves the same tools as the biggest institutions. That's what we built EdBuddies to do.
          </motion.p>
        </div>
      </section>

      {/* ── Section 6: CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left — looping video */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 24 }}
              className="flex-shrink-0 w-full max-w-xs lg:max-w-sm"
            >
              <VideoMascot />
            </motion.div>

            {/* Right — CTA text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FF8000]" />
                <span className="uppercase tracking-wider">Join us</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-6 leading-tight"
              >
                Be part of what<br className="hidden sm:block" /> we're building.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-xl text-gray-600 mb-10"
              >
                Run your centre the way it deserves, with every tool you need, in one app.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                {/* App Store badge */}
                <motion.a
                  href="https://apps.apple.com/my/app/edbuddies/id6746329753"
                  whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}
                  whileTap={{ y: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex items-center justify-center gap-3 bg-black text-white rounded-2xl px-5 py-3 min-w-[180px]"
                  style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.22)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="none">
                    <rect width="24" height="24" rx="5.5" fill="url(#appleGrad)"/>
                    <defs>
                      <linearGradient id="appleGrad" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1BAAFF"/>
                        <stop offset="100%" stopColor="#0070E0"/>
                      </linearGradient>
                    </defs>
                    <path d="M16.46 12.6c-.02-2.04 1.67-3.02 1.74-3.07-.95-1.39-2.43-1.58-2.95-1.6-1.26-.13-2.46.74-3.1.74-.64 0-1.63-.72-2.68-.7-1.38.02-2.65.8-3.36 2.03-1.43 2.48-.37 6.17 1.03 8.19.68.99 1.5 2.1 2.57 2.06 1.03-.04 1.42-.66 2.66-.66 1.24 0 1.59.66 2.68.64 1.11-.02 1.81-1.01 2.49-2 .79-1.15 1.11-2.27 1.13-2.33-.03-.01-2.19-.84-2.21-3.3zM14.48 6.37c.57-.69.95-1.64.84-2.59-.82.03-1.8.54-2.38 1.22-.52.6-.98 1.57-.86 2.5.91.07 1.83-.46 2.4-1.13z" fill="white"/>
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/70 text-[10px] font-medium tracking-wide">Available on the</span>
                    <span className="text-white text-base font-bold">App Store</span>
                  </div>
                </motion.a>

                {/* Google Play badge */}
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.edusphere.edbuddies.ai"
                  whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}
                  whileTap={{ y: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex items-center justify-center gap-3 bg-black text-white rounded-2xl px-5 py-3 min-w-[180px]"
                  style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.22)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="none">
                    <path d="M3.18 1.28A1.5 1.5 0 001.5 2.7v18.6a1.5 1.5 0 001.68 1.42L13.5 12 3.18 1.28z" fill="#4FC3F7"/>
                    <path d="M17.5 8.5L13.5 12l4 3.5 4.54-2.62a1.5 1.5 0 000-2.76L17.5 8.5z" fill="#FFCA28"/>
                    <path d="M13.5 12L3.18 1.28a1.5 1.5 0 00-.18.12L13.5 12z" fill="#4FC3F7"/>
                    <path d="M3 22.6a1.5 1.5 0 00.18.12L13.5 12 3 1.28A1.5 1.5 0 003 2.7v18.6c0 .48.22.9.18 1.3z" fill="#4FC3F7"/>
                    <path d="M3.18 22.72L13.5 12l-10.32-10.72a1.5 1.5 0 00-.18.12v21.28c.05.04.1.08.18.12z" fill="#4FC3F7"/>
                    <path d="M13.5 12L3.18 22.72a1.5 1.5 0 001.5.06L17.5 15.5 13.5 12z" fill="#F44336"/>
                    <path d="M13.5 12l-10.32 10.72a1.5 1.5 0 001.5.06L17.5 15.5 13.5 12z" fill="#F44336"/>
                    <path d="M13.5 12L17.5 8.5 4.68 1.22a1.5 1.5 0 00-1.5.06L13.5 12z" fill="#66BB6A"/>
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/70 text-[10px] font-medium tracking-wide uppercase">Get it on</span>
                    <span className="text-white text-base font-bold">Google Play</span>
                  </div>
                </motion.a>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
