import { Link } from "react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import HeroScroll from "./HeroScroll";
import { Button } from "./components/ui/button";
import { ArrowRight, Smartphone, CreditCard, Users, Bell, Calendar, BarChart, BookOpen, School, AlertTriangle, ClipboardList, MessageSquare, DollarSign, CheckCircle2, Settings, Check, Download, ChevronDown, Facebook, Instagram } from "lucide-react";
import { useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SHOW_FREE_MESSAGING } from "./flags";

function HomeMascot() {
  const [ready, setReady] = useState(false);
  return (
    <video
      src="/assets/animated-edii.mp4"
      autoPlay
      loop
      muted
      playsInline
      onCanPlay={() => setReady(true)}
      className="w-full max-w-sm lg:max-w-md rounded-3xl object-cover transition-opacity duration-500"
      style={{ mixBlendMode: "multiply", opacity: ready ? 1 : 0 }}
    />
  );
}

export default function App() {
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const mobileProblemRef = useRef<HTMLDivElement>(null);
  const mobilePainRef = useRef<HTMLDivElement>(null);
  const painInView = useInView(mobilePainRef, { once: true, amount: 0.3 });
  const whoSectionRef = useRef<HTMLDivElement>(null);
  const howSectionRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: problemSectionRef,
    offset: ["start end", "end start"]
  });


  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileProblemRef,
    offset: ["start end", "end start"]
  });

  // Mobile: cards slide in from just below the title slot, one at a time, 0.05 gap between each
  const mobileCard1Y = useTransform(mobileScrollProgress, [0.05, 0.12], [30, 0]);
  const mobileCard1Opacity = useTransform(mobileScrollProgress, [0.05, 0.12, 0.22, 0.27], [0, 1, 1, 0]);
  const mobileCard2Y = useTransform(mobileScrollProgress, [0.32, 0.39], [30, 0]);
  const mobileCard2Opacity = useTransform(mobileScrollProgress, [0.32, 0.39, 0.49, 0.54], [0, 1, 1, 0]);
  const mobileCard3Y = useTransform(mobileScrollProgress, [0.59, 0.66], [30, 0]);
  const mobileCard3Opacity = useTransform(mobileScrollProgress, [0.59, 0.66, 0.76, 0.81], [0, 1, 1, 0]);
  const mobileCard4Y = useTransform(mobileScrollProgress, [0.86, 0.93], [30, 0]);
  const mobileCard4Opacity = useTransform(mobileScrollProgress, [0.86, 0.93, 1.0, 1.0], [0, 1, 1, 1]);

  const { scrollYProgress: howScrollProgress } = useScroll({
    target: howSectionRef,
    offset: ["start end", "end start"]
  });

  const card1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.3], [20, 0]);
  const card1Visible = useTransform(scrollYProgress, [0.3], [1]);

  const card2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.35, 0.45], [20, 0]);
  const card2Visible = useTransform(scrollYProgress, [0.45], [1]);

  const card3Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.5, 0.6], [20, 0]);
  const card3Visible = useTransform(scrollYProgress, [0.6], [1]);

  const card4Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const card4Y = useTransform(scrollYProgress, [0.65, 0.75], [20, 0]);
  const card4Visible = useTransform(scrollYProgress, [0.75], [1]);


  const { scrollYProgress: whoScrollProgress } = useScroll({
    target: whoSectionRef,
    offset: ["start start", "end end"]
  });

  // Who section — image slides vertically (enter from bottom, exit to top)
  const whoImg1Y = useTransform(whoScrollProgress, [0, 0.28, 0.38], ["0%", "0%", "-115%"]);
  const whoImg2Y = useTransform(whoScrollProgress, [0.22, 0.36, 0.62, 0.72], ["115%", "0%", "0%", "-115%"]);
  const whoImg3Y = useTransform(whoScrollProgress, [0.58, 0.72, 1], ["115%", "0%", "0%"]);
  const whoImg1Opacity = useTransform(whoScrollProgress, [0, 0.26, 0.36], [1, 1, 0]);
  const whoImg2Opacity = useTransform(whoScrollProgress, [0.22, 0.34, 0.60, 0.70], [0, 1, 1, 0]);
  const whoImg3Opacity = useTransform(whoScrollProgress, [0.58, 0.70, 1], [0, 1, 1]);

  // Who section — text fades in/out
  const whoText1Opacity = useTransform(whoScrollProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const whoText1Y = useTransform(whoScrollProgress, [0, 0.22, 0.32], [0, 0, -320]);
  const whoText2Opacity = useTransform(whoScrollProgress, [0.24, 0.34, 0.60, 0.70], [0, 1, 1, 0]);
  const whoText2Y = useTransform(whoScrollProgress, [0.24, 0.34, 0.60, 0.70], [320, 0, 0, -320]);
  const whoText3Opacity = useTransform(whoScrollProgress, [0.60, 0.70, 1], [0, 1, 1]);
  const whoText3Y = useTransform(whoScrollProgress, [0.60, 0.70], [320, 0]);

  // How section animations - smooth progressive reveals
  const howLinePathProgress = useTransform(howScrollProgress, [0.1, 0.65], [0, 1]);
  const howCard2Opacity = useTransform(howScrollProgress, [0.25, 0.4], [0, 1]);
  const howCard2X = useTransform(howScrollProgress, [0.25, 0.4], [-30, 0]);
  const howCard3Opacity = useTransform(howScrollProgress, [0.45, 0.6], [0, 1]);
  const howCard3X = useTransform(howScrollProgress, [0.45, 0.6], [-30, 0]);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section removed */}
      {false && <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-5xl mx-auto relative">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gray-800 text-white text-sm px-4 py-2 rounded-full mb-8"
            >
              <span className="text-xs font-medium">NEW</span>
              <span className="text-xs">Free forever — No hidden fees 🎉</span>
            </motion.div>

            {/* Floating Icon Cards - Top Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0]
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                scale: { duration: 0.6, delay: 0.8 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }}
              className="absolute left-[5%] top-[10%] hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
            </motion.div>

            {/* Floating Icon Cards - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -12, 0]
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1 },
                scale: { duration: 0.6, delay: 1 },
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
              className="absolute right-[5%] top-[10%] hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>

            {/* Floating Icon Cards - Middle Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -8, 0]
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.2 },
                scale: { duration: 0.6, delay: 1.2 },
                x: { duration: 0.6, delay: 1.2 },
                y: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }}
              className="absolute left-[8%] top-[45%] hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
            </motion.div>

            {/* Floating Icon Cards - Middle Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -10, 0]
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.4 },
                scale: { duration: 0.6, delay: 1.4 },
                x: { duration: 0.6, delay: 1.4 },
                y: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4
                }
              }}
              className="absolute right-[8%] top-[45%] hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <Users className="w-8 h-8 text-[#09244B]" />
              </div>
            </motion.div>

            {/* Floating Icon Cards - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -11, 0]
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.6 },
                scale: { duration: 0.6, delay: 1.6 },
                y: {
                  duration: 3.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.6
                }
              }}
              className="absolute left-[12%] bottom-[5%] hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <Bell className="w-8 h-8 text-red-600" />
              </div>
            </motion.div>

            {/* Floating Icon Cards - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -9, 0]
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.8 },
                scale: { duration: 0.6, delay: 1.8 },
                y: {
                  duration: 2.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.8
                }
              }}
              className="absolute right-[12%] bottom-[5%] hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <BarChart className="w-8 h-8 text-teal-600" />
              </div>
            </motion.div>

            {/* SVG Connecting Lines - soft curves flowing around text safe zone */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              viewBox="0 0 1000 560"
              preserveAspectRatio="xMidYMid meet"
              style={{ zIndex: 0 }}
            >
              {/*
                Logo anchor: ~500, 265
                Text safe zone (do not cross): x 240–760, y 80–500
                Each line exits the safe zone early and arcs around the outside edge.
                Control points are deliberately pushed to the outer regions.
              */}

              {/* Top Left card (~50, 56) — arc up and outward, hugging top-left corner */}
              <motion.path
                d="M 500 258 C 420 180 220 90 58 60"
                stroke="#94a3b8"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.28 }}
                transition={{ duration: 1.4, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Top Right card (~950, 56) — arc up and outward, hugging top-right corner */}
              <motion.path
                d="M 500 258 C 580 180 780 90 942 60"
                stroke="#94a3b8"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.28 }}
                transition={{ duration: 1.4, delay: 1.05, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Middle Left card (~80, 252) — gentle horizontal arc, exits left edge cleanly */}
              <motion.path
                d="M 500 265 C 390 255 260 250 88 252"
                stroke="#94a3b8"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.22 }}
                transition={{ duration: 1.4, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Middle Right card (~920, 252) — mirror horizontal arc */}
              <motion.path
                d="M 500 265 C 610 255 740 250 912 252"
                stroke="#94a3b8"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.22 }}
                transition={{ duration: 1.4, delay: 1.35, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Bottom Left card (~120, 504) — sweeps down-left, curving below the CTA zone */}
              <motion.path
                d="M 500 272 C 400 360 230 440 128 496"
                stroke="#94a3b8"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.25 }}
                transition={{ duration: 1.4, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Bottom Right card (~880, 504) — mirror sweep down-right */}
              <motion.path
                d="M 500 272 C 600 360 770 440 872 496"
                stroke="#94a3b8"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.25 }}
                transition={{ duration: 1.4, delay: 1.65, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Subtle origin dot at logo anchor */}
              <motion.circle
                cx="500" cy="265" r="2.5"
                fill="#94a3b8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.35, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.85 }}
              />
            </svg>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                The Free Centre
              </h1>

              {/* Central Logo/Brand Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center mb-4"
              >
                <img
                  src="/assets/logo-horizontal.png"
                  alt="EdBuddies"
                  className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
                />
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#09244B] leading-tight">
                For Tuition Centres
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 mb-10 mt-6 max-w-2xl mx-auto"
            >
              Attendance, billing, invoicing, and parent communication. All in one app.{" "}
              {SHOW_FREE_MESSAGING && (
                <span className="font-semibold text-gray-900">
                  No subscription. No student commission. Nothing to pay.
                </span>
              )}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#09244B] text-white px-8 py-6 text-base gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-[#0d3570]">
                  Enquire Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Link to="/features">
                <Button size="lg" variant="outline" className="bg-white border-gray-300 px-8 py-6 text-base transition-all duration-200 hover:bg-[#09244B] hover:text-white hover:border-[#09244B] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Trust Micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-sm text-gray-500 mb-16"
            >
              Available on iOS & Android · Used by centres in Malaysia & Singapore
            </motion.p>
          </div>
        </div>
      </section>}

      {/* Scroll Hero Section */}
      <HeroScroll />

      {/* Social Proof Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm text-gray-500 mb-10"
          >
            Used by tuition centres and freelance tutors across Malaysia & Singapore
          </motion.p>

          {/* Infinite Scrolling Logos */}
          <div className="relative overflow-hidden max-w-4xl mx-auto">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <motion.div
              className="flex gap-20 items-center"
              animate={{ x: [0, -800] }}
              transition={{ x: { duration: 16, repeat: Infinity, ease: "linear" } }}
            >
              {/* First Set */}
              {[
                { src: '/assets/EdBuddies-ai.png', alt: 'EdBuddies' },
                { src: '/assets/Whizminds-tuition-centre.png', alt: 'Whizminds' },
                { src: '/assets/champs-tuition-centre.png', alt: 'Champs' },
                { src: '/assets/yews-tuition-centre.png', alt: 'Yews' },
              ].map(({ src, alt }) => (
                <div key={alt} className="shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                  <img src={src} alt={alt} loading="lazy" className="h-28 w-auto object-contain" />
                </div>
              ))}
              {/* Duplicate Set for seamless loop */}
              {[
                { src: '/assets/EdBuddies-ai.png', alt: 'EdBuddies2' },
                { src: '/assets/Whizminds-tuition-centre.png', alt: 'Whizminds2' },
                { src: '/assets/champs-tuition-centre.png', alt: 'Champs2' },
                { src: '/assets/yews-tuition-centre.png', alt: 'Yews2' },
              ].map(({ src, alt }) => (
                <div key={alt} className="shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                  <img src={src} alt={alt} loading="lazy" className="h-28 w-auto object-contain" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      {/* Problem Section — Mobile static layout, all 4 cards animate in on scroll */}
      <section ref={mobilePainRef} className="sm:hidden py-16 px-6 bg-white">
        {/* Top 2 cards — staggered */}
        <div className="relative mb-8" style={{ height: '160px' }}>
          <motion.div
            animate={painInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute left-0 top-0 w-[230px] bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">Manual invoicing every month is exhausting.</p>
            </div>
          </motion.div>
          <motion.div
            animate={painInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute right-0 bottom-0 w-[230px] bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">Software fees drain profit every month.</p>
            </div>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          animate={painInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-4xl font-bold text-gray-900 text-center leading-tight mb-8"
        >
          Is this your centre?
        </motion.h2>

        {/* Bottom 2 cards — staggered */}
        <div className="relative" style={{ height: '160px' }}>
          <motion.div
            animate={painInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute left-0 top-0 w-[230px] bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">Attendance records lost or never updated.</p>
            </div>
          </motion.div>
          <motion.div
            animate={painInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="absolute right-0 bottom-0 w-[230px] bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">Chasing fees eats your teaching time.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section — Desktop scroll animation */}
      <section ref={problemSectionRef} className="relative hidden sm:block">
        {/* Spacer for scroll height */}
        <div className="h-[250vh]">
          {/* Sticky Container */}
          <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-5xl">
              {/* Central Title - Always Visible */}
              <div className="text-center relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] leading-tight">
                  Is this your centre?
                </h2>
              </div>

              {/* Card 1 - Top Right (appears FIRST) - Software fees */}
              <motion.div
                style={{ opacity: card1Opacity, y: card1Y }}
                className="absolute right-8 lg:right-32 bottom-32 lg:bottom-40 w-[280px] lg:w-[360px]"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-[float_3s_ease-in-out_infinite]">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <p className="text-base text-gray-800">Software fees drain profit every month.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Top Left (appears SECOND) - Manual invoicing */}
              <motion.div
                style={{ opacity: card2Opacity, y: card2Y }}
                className="absolute left-8 lg:left-32 bottom-32 lg:bottom-40 w-[280px] lg:w-[360px]"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-[float_3.2s_ease-in-out_infinite_0.2s]">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <p className="text-base text-gray-800">Manual invoicing every month is exhausting.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Bottom Right (appears THIRD) - Chasing fees */}
              <motion.div
                style={{ opacity: card3Opacity, y: card3Y }}
                className="absolute right-8 lg:right-32 top-28 lg:top-32 w-[280px] lg:w-[360px]"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-[float_2.8s_ease-in-out_infinite_0.4s]">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <p className="text-base text-gray-800">Chasing fees eats your teaching time.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Bottom Left (appears FOURTH/LAST) - Attendance */}
              <motion.div
                style={{ opacity: card4Opacity, y: card4Y }}
                className="absolute left-8 lg:left-32 top-28 lg:top-32 w-[280px] lg:w-[360px]"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-[float_3.5s_ease-in-out_infinite_0.6s]">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <p className="text-base text-gray-800">Attendance records lost or never updated.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EEFCFF] relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center bg-[#DBE3F8] text-[#09244B] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[rgba(9,36,75,0.08)] mb-6">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-4">
              Everything your centre needs.<br />In your pocket.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
              Five things you used to juggle manually. Now handled automatically.
            </p>
          </motion.div>

          {/* Features Grid - 5 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-0 relative z-10">
            {[
              { icon: ClipboardList, title: "Student Attendance Tracking", desc: "Mark attendance in seconds. Parents get notified automatically. You won't need a paper register again.", delay: 0.1 },
              { icon: CreditCard, title: "Automated Invoicing & Billing", desc: "Generate and send invoices with one tap. You can see who's paid and who hasn't, without the awkward follow-up.", delay: 0.2 },
              { icon: MessageSquare, title: "Parent Communication", desc: "Send announcements, homework updates, and fee reminders directly through the app. No more juggling group chats.", delay: 0.3 },
              { icon: Calendar, title: "Class & Timetable Scheduling", desc: "Set up classes, assign teachers, and manage timetables without a spreadsheet in sight.", delay: 0.4 },
              { icon: BarChart, title: "Finance & Payments Overview", desc: "See your centre's revenue, outstanding payments, and monthly performance at a glance.", delay: 0.5 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay }}
                whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: "rgba(255,128,0,0.28)", transition: { type: "spring", stiffness: 350, damping: 25 } }}
                whileTap={{ y: 0, transition: { duration: 0.1 } }}
                className="group bg-white rounded-lg p-6 flex flex-col border border-transparent cursor-pointer" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
              >
                <div className="w-12 h-12 mb-3 bg-[#FF8000] rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-[1.08] group-hover:-rotate-3 group-hover:shadow-[0_8px_24px_rgba(255,128,0,0.35)]">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-[#09244B] leading-snug mb-3 sm:min-h-[4rem]">
                  {title}
                </h3>
                <div className="border-t border-gray-200 mb-3" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Central Logo with connecting lines */}
          <div className="relative h-72 mt-0">
            {/* SVG Connecting Lines */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 288"
              preserveAspectRatio="none"
            >
              {/* Base grey lines */}
              {[
                "M 90 0 Q 90 140 500 220",
                "M 295 0 Q 340 120 500 220",
                "M 500 0 L 500 220",
                "M 705 0 Q 660 120 500 220",
                "M 910 0 Q 910 140 500 220",
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#cbd5e1" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }}
                />
              ))}

              {/* Neon glow filter */}
              <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Traveling neon highlight — outer glow + core, fade out on arrival */}
              {[
                "M 90 0 Q 90 140 500 220",
                "M 295 0 Q 340 120 500 220",
                "M 500 0 L 500 220",
                "M 705 0 Q 660 120 500 220",
                "M 910 0 Q 910 140 500 220",
              ].map((d, i) => (
                <g key={`highlight-${i}`}>
                  {/* Outer glow */}
                  <motion.path
                    d={d}
                    stroke="#FF8000"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#neon-glow)"
                    initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
                    animate={{
                      pathOffset: [0, 0.9],
                      opacity: [0, 0.3, 0.3, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1.5,
                      times: [0, 0.1, 0.75, 1],
                    }}
                  />
                  {/* Core */}
                  <motion.path
                    d={d}
                    stroke="#FF8000"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.08, pathOffset: 0, opacity: 0 }}
                    animate={{
                      pathOffset: [0, 0.92],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1.5,
                      times: [0, 0.08, 0.78, 1],
                    }}
                  />
                </g>
              ))}
            </svg>

            {/* Central Logo Box — pulses when lines arrive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: '220px' }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 4px 12px rgba(0,0,0,0.08)",
                    "0 4px 16px rgba(255,128,0,0.22)",
                    "0 4px 12px rgba(0,0,0,0.08)",
                  ],
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.65,
                  repeat: Infinity,
                  repeatDelay: 2.8,
                  ease: "easeOut",
                }}
                className="bg-white rounded-2xl p-1 shadow-md"
              >
                <img src="/assets/EdBuddies V2 App icon.webp" alt="EdBuddies" width="96" height="96" className="rounded-2xl" loading="lazy" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who It's For — Mobile */}
      <section className="sm:hidden py-16 px-6 bg-white">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-[#09244B]">Built for Every Type of Teaching Business</h2>
        </div>
        {[
          {
            img: "/assets/tuition-centre.webp",
            alt: "Tuition Centre",
            title: "Tuition Centres",
            desc: "Small or growing, EdBuddies scales with you. Manage multiple classes, teachers, and hundreds of students, all from one app.",
          },
          {
            img: "/assets/freelance-tutor.webp",
            alt: "Freelance Tutor",
            title: "Freelance Tutors",
            desc: "Running your own classes solo? EdBuddies keeps your admin organised so you can focus on teaching.",
          },
          {
            img: "/assets/enrichment-class.webp",
            alt: "Enrichment Centre",
            title: "Enrichment Centres",
            desc: "From music to robotics to language classes. If you run a centre, EdBuddies runs with you.",
          },
        ].map(({ img, alt, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="mb-20 last:mb-0"
          >
            <div className="h-[260px] mb-6 flex items-center justify-center">
              <img src={img} alt={alt} loading="lazy" className="max-w-full max-h-full object-contain" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">For</p>
            <h3 className="text-3xl font-bold text-[#09244B] mb-3">{title}</h3>
            <p className="text-base text-gray-600 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Who It's For Section — Desktop */}
      <section ref={whoSectionRef} className="relative bg-white hidden sm:block">
        {/* Outer tall div — 3 cards × ~120vh each */}
        <div className="h-[360vh]" >
          {/* Sticky viewport panel */}
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">
            <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-10 text-center">Built for Every Type of Teaching Business</h2>
              <div className="grid grid-cols-2 gap-20 items-center">

                {/* LEFT — photo slides vertically */}
                <div className="relative h-[480px] overflow-hidden flex items-center justify-center">
                  {/* Image 1 */}
                  <motion.div style={{ y: whoImg1Y, opacity: whoImg1Opacity }} className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/assets/tuition-centre.webp"
                      alt="Tuition Centre"
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                  {/* Image 2 */}
                  <motion.div style={{ y: whoImg2Y, opacity: whoImg2Opacity }} className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/assets/freelance-tutor.webp"
                      alt="Freelance Tutor"
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                  {/* Image 3 */}
                  <motion.div style={{ y: whoImg3Y, opacity: whoImg3Opacity }} className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/assets/enrichment-class.webp"
                      alt="Enrichment Centre"
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                </div>

                {/* RIGHT — text fades in/out */}
                <div className="relative h-[300px] overflow-hidden">
                  {/* Text 1 */}
                  <motion.div
                    style={{ opacity: whoText1Opacity, y: whoText1Y }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">For</p>
                    <h3 className="text-4xl lg:text-5xl font-bold text-[#09244B] mb-6">Tuition Centres</h3>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Small or growing, EdBuddies scales with you. Manage multiple classes, teachers, and hundreds of students, all from one app.
                    </p>
                  </motion.div>

                  {/* Text 2 */}
                  <motion.div
                    style={{ opacity: whoText2Opacity, y: whoText2Y }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">For</p>
                    <h3 className="text-4xl lg:text-5xl font-bold text-[#09244B] mb-6">Freelance Tutors</h3>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Running your own classes solo? EdBuddies keeps your admin organised so you can focus on teaching.
                    </p>
                  </motion.div>

                  {/* Text 3 */}
                  <motion.div
                    style={{ opacity: whoText3Opacity, y: whoText3Y }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">For</p>
                    <h3 className="text-4xl lg:text-5xl font-bold text-[#09244B] mb-6">Enrichment Centres</h3>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      From music to robotics to language classes. If you run a centre, EdBuddies runs with you.
                    </p>
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Mobile + Tablet */}
      <section className="lg:hidden py-16 pl-6 pr-9 bg-white">
        <div className="text-center mb-12">
          <span className="inline-flex items-center bg-[#DBE3F8] text-[#09244B] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[rgba(9,36,75,0.08)] mb-4">
            How It Works
          </span>
          <h2 className="text-4xl font-bold text-[#09244B]">Up and Running in Under 10 Minutes</h2>
        </div>
        <div className="flex flex-col gap-0">
          {[
            { step: 'Step 01', title: 'Contact us', desc: "Tell us about your centre. We'll get you set up in no time.", Icon: MessageSquare },
            { step: 'Step 02', title: 'Set up your centre', desc: 'Add your classes, students, and teachers in minutes.', Icon: Settings },
            { step: 'Step 03', title: 'Start managing', desc: 'Attendance, invoices, communication, all handled from one place.', Icon: CheckCircle2 },
          ].map(({ step, title, desc, Icon }, i) => (
            <div key={step} className="flex flex-col items-stretch">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12, type: "spring", stiffness: 260, damping: 24 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: "rgba(255,128,0,0.25)", transition: { type: "spring", stiffness: 350, damping: 25 } }}
                whileTap={{ y: 0, transition: { duration: 0.1 } }}
                className="group bg-white rounded-lg p-6 relative border border-transparent cursor-pointer"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              >
                {/* Icon bubble — bounces on card hover */}
                <motion.div
                  className="absolute -top-3 -right-3 w-12 h-12 bg-[#FF8000] rounded-full flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(255,128,0,0.30)' }}
                  whileHover={{ scale: 1.18, rotate: -8, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                <p className="text-sm text-gray-400 mb-2">{step}</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2 group-hover:text-[#FF8000] transition-colors duration-200">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>

              {/* Connector between cards */}
              {i < 2 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
                  className="self-center w-px bg-gradient-to-b from-[#FF8000] to-transparent origin-top"
                  style={{ height: '32px' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="inline-flex">
            <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#09244B] text-white px-8 py-6 text-base gap-2 transition-colors duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-[#0d3570]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.10)' }}>
                Enquire Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section — Desktop only */}
      <section ref={howSectionRef} className="hidden lg:block py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center bg-[#DBE3F8] text-[#09244B] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[rgba(9,36,75,0.08)] mb-6">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-4">
              Up and Running in<br className="hidden sm:block" /> Under 10 Minutes
            </h2>
          </div>

          {/* Process Flow */}
          <div className="relative min-h-[700px]">
            {/* Card 1 - Top Right - Always visible */}
            <div className="absolute right-[2%] top-[55px] w-80 z-10">
              <div className="bg-white rounded-lg p-6 relative" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#FF8000] rounded-full flex items-center justify-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-400 mb-2">Step 01</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2">Contact us</h3>
                <p className="text-gray-600">
                  Tell us about your centre and we'll get you set up.
                </p>
              </div>
            </div>

            {/* SVG Complete Path - Progressive draw animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet">
              <motion.path
                d="M 400 100 L 820 100 C 970 100 970 105 970 180 Q 800 280 400 340 Q 200 340 180 400 Q 500 500 920 550"
                stroke="#FF8000"
                strokeWidth="2"
                strokeOpacity="0.85"
                fill="none"
                initial={{ pathLength: 0 }}
                style={{ pathLength: howLinePathProgress }}
              />
            </svg>

            {/* Card 2 - Middle Left - Fades in during scroll */}
            <motion.div
              style={{ opacity: howCard2Opacity, x: howCard2X }}
              className="absolute left-[10%] top-[250px] w-80 z-10"
            >
              <div className="bg-white rounded-lg p-6 relative" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#FF8000] rounded-full flex items-center justify-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-400 mb-2">Step 02</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2">Set up your centre</h3>
                <p className="text-gray-600">
                  Add your classes, students, and teachers in minutes.
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Bottom Right - Fades in during scroll */}
            <motion.div
              style={{ opacity: howCard3Opacity, x: howCard3X }}
              className="absolute right-[10%] top-[500px] w-80 z-10"
            >
              <div className="bg-white rounded-lg p-6 relative" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#FF8000] rounded-full flex items-center justify-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-400 mb-2">Step 03</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2">Start managing</h3>
                <p className="text-gray-600">
                  Attendance, invoices, parent communication. Everything in one place.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="inline-flex">
              <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#09244B] text-white px-8 py-6 text-base gap-2 transition-colors duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-[#0d3570]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.10)' }}>
                  Enquire Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Floating Mobile App Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative">
                {/* Glow effect behind mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b8c8e0] via-[#dce4f0] to-transparent rounded-[3rem] blur-3xl opacity-60 scale-110"></div>

                {/* Product mockup */}
                <motion.img
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src="/assets/EdBuddies-mockup.webp"
                  alt="EdBuddies App Mockup"
                  loading="lazy"
                  className="relative w-[380px] sm:w-[460px] lg:w-[600px] lg:-ml-16 max-w-none"
                />
              </div>
            </motion.div>

            {/* Right Side - Pricing Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Heading */}
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-6">
                  {SHOW_FREE_MESSAGING ? (
                    <>Your Competitors Pay Monthly.<br />You Don't Have To.</>
                  ) : (
                    <>Everything Your Centre Needs.<br />In One App.</>
                  )}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {SHOW_FREE_MESSAGING
                    ? "No subscription fees. No per-student charges. No hidden costs. EdBuddies is 100% free because every centre deserves good tools, regardless of size."
                    : "Attendance, billing, invoicing, parent communication, class scheduling — all managed from a single app built for tuition centres and freelance tutors."}
                </p>
              </div>

              {/* Pricing Card */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 transition-shadow" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }} onMouseEnter={e => (e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)')} onMouseLeave={e => (e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.10)')}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#09244B] mb-2">EdBuddies</h3>
                  {SHOW_FREE_MESSAGING && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gray-900">RM 0</span>
                      <span className="text-gray-600">/ month</span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#FF8000]" />
                      </div>
                      <span className="text-gray-700">Unlimited students</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#FF8000]" />
                      </div>
                      <span className="text-gray-700">Attendance tracking</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#FF8000]" />
                      </div>
                      <span className="text-gray-700">Invoicing & billing</span>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#FF8000]" />
                      </div>
                      <span className="text-gray-700">Parent communication</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#FF8000]" />
                      </div>
                      <span className="text-gray-700">Class scheduling</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#FF8000]" />
                      </div>
                      <span className="text-gray-700">Finance overview</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                  <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="lg" className="w-full bg-[#09244B] text-white px-8 py-6 text-base gap-2 transition-colors duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-[#0d3570]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.10)' }}>
                      Enquire Now
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {/* FAQ 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {SHOW_FREE_MESSAGING ? "Is EdBuddies really free?" : "What's included with EdBuddies?"}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === 0 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#FF8000]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === 0 ? "auto" : 0,
                  opacity: openFaq === 0 ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {SHOW_FREE_MESSAGING
                    ? "Yes, completely. No subscription, no per-student fee, no hidden charges. Download it and use it at no cost."
                    : "EdBuddies is built to help tuition centres and freelance tutors manage their operations from a single app. Get in touch to learn more about what's included."}
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  Does it work for freelance tutors?
                </span>
                <motion.div
                  animate={{ rotate: openFaq === 1 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#FF8000]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === 1 ? "auto" : 0,
                  opacity: openFaq === 1 ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  Absolutely. Whether you run one class or twenty, EdBuddies works for solo tutors and multi-teacher centres alike.
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  Is EdBuddies available in Singapore?
                </span>
                <motion.div
                  animate={{ rotate: openFaq === 2 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#FF8000]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === 2 ? "auto" : 0,
                  opacity: openFaq === 2 ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  Yes. EdBuddies is actively used by centres in both Malaysia and Singapore.
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  What devices does it support?
                </span>
                <motion.div
                  animate={{ rotate: openFaq === 3 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#FF8000]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === 3 ? "auto" : 0,
                  opacity: openFaq === 3 ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  EdBuddies is available on iOS and Android. Centre owners and teachers run it from their phones, no desktop needed.
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  How long does setup take?
                </span>
                <motion.div
                  animate={{ rotate: openFaq === 4 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#FF8000]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === 4 ? "auto" : 0,
                  opacity: openFaq === 4 ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  Most centres are fully set up in under 10 minutes.
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 order-2 lg:order-1"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-6">
                  Your Centre, Managed.
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join tuition centres and freelance tutors across Malaysia and Singapore who've ditched the spreadsheets.
                </p>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
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
                    <rect width="24" height="24" rx="5.5" fill="url(#appleGradH)"/>
                    <defs>
                      <linearGradient id="appleGradH" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
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
                    <path d="M13.5 12L3.18 22.72a1.5 1.5 0 001.5.06L17.5 15.5 13.5 12z" fill="#F44336"/>
                    <path d="M13.5 12L17.5 8.5 4.68 1.22a1.5 1.5 0 00-1.5.06L13.5 12z" fill="#66BB6A"/>
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/70 text-[10px] font-medium tracking-wide uppercase">Get it on</span>
                    <span className="text-white text-base font-bold">Google Play</span>
                  </div>
                </motion.a>
              </div>

              {/* Micro-copy */}
              {SHOW_FREE_MESSAGING && (
                <p className="text-sm text-gray-500">
                  No credit card. No commitment. No monthly fees.
                </p>
              )}
            </motion.div>

            {/* Right Side - Mascot Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <HomeMascot />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}