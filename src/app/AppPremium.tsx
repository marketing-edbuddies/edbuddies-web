import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Menu, Smartphone, CreditCard, Users, Bell, Calendar, BarChart, GraduationCap, BookOpen, School, AlertTriangle, ClipboardList, MessageSquare, CheckCircle2, Settings, Check, Download, ChevronDown, Apple, Facebook, Instagram, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* ─────────────────────────────────────────
   Reusable primitive: premium pill badge
───────────────────────────────────────── */
function SectionBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-full shadow-sm mb-6 tracking-wide uppercase">
      {icon}
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────
   Reusable: premium CTA primary button
───────────────────────────────────────── */
function PrimaryBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(255,128,0,0.35)" }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF8000] to-[#EA6B0E] hover:from-[#FF9020] hover:to-[#FF8000] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow-[0_4px_16px_rgba(255,128,0,0.3)] ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   Reusable: premium ghost/secondary button
───────────────────────────────────────── */
function SecondaryBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: "rgba(9,36,75,0.05)" }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 hover:border-gray-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function AppPremium() {
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const whoSectionRef     = useRef<HTMLDivElement>(null);
  const howSectionRef     = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq]   = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scroll progress refs (logic unchanged) ── */
  const { scrollYProgress } = useScroll({
    target: problemSectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: whoScrollProgress } = useScroll({
    target: whoSectionRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: howScrollProgress } = useScroll({
    target: howSectionRef,
    offset: ["start end", "end start"],
  });

  /* Problem cards — true one-at-a-time: each fades IN then OUT before next appears */
  const card1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.20, 0.27], [0, 1, 1, 0]);
  const card1Y       = useTransform(scrollYProgress, [0.05, 0.15, 0.20, 0.27], [20, 0, 0, -20]);

  const card2Opacity = useTransform(scrollYProgress, [0.27, 0.37, 0.42, 0.50], [0, 1, 1, 0]);
  const card2Y       = useTransform(scrollYProgress, [0.27, 0.37, 0.42, 0.50], [20, 0, 0, -20]);

  const card3Opacity = useTransform(scrollYProgress, [0.50, 0.60, 0.65, 0.73], [0, 1, 1, 0]);
  const card3Y       = useTransform(scrollYProgress, [0.50, 0.60, 0.65, 0.73], [20, 0, 0, -20]);

  const card4Opacity = useTransform(scrollYProgress, [0.73, 0.83, 1.0,  1.0 ], [0, 1, 1, 1]);
  const card4Y       = useTransform(scrollYProgress, [0.73, 0.83           ], [20, 0       ]);

  /* Who section (unchanged) */
  const whoCard1Opacity = useTransform(whoScrollProgress, [0, 0.25, 0.35],          [1, 1, 0.25]);
  const whoCard2Opacity = useTransform(whoScrollProgress, [0, 0.25, 0.35, 0.6, 0.7],[0.25, 0.25, 1, 1, 0.25]);
  const whoCard3Opacity = useTransform(whoScrollProgress, [0.4, 0.6, 0.7, 0.85],    [0.15, 0.25, 1, 1]);

  /* How section (unchanged) */
  const howLinePathProgress = useTransform(howScrollProgress, [0.1, 0.65], [0, 1]);
  const howCard2Opacity     = useTransform(howScrollProgress, [0.25, 0.4], [0, 1]);
  const howCard2X           = useTransform(howScrollProgress, [0.25, 0.4], [-30, 0]);
  const howCard3Opacity     = useTransform(howScrollProgress, [0.45, 0.6], [0, 1]);
  const howCard3X           = useTransform(howScrollProgress, [0.45, 0.6], [-30, 0]);

  /* Feature cards data */
  const features = [
    {
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      bg: "from-orange-400 to-orange-600",
      title: "Student Attendance Tracking",
      desc: "Mark attendance in seconds. Parents get notified automatically. No more paper registers.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      bg: "from-blue-400 to-blue-600",
      title: "Automated Invoicing & Billing",
      desc: "Generate and send invoices with one tap. Track who's paid and who hasn't — without the awkward follow-up.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      bg: "from-violet-400 to-violet-600",
      title: "Parent Communication",
      desc: "Send announcements, homework updates, and fee reminders directly through the app. No more group chats.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      bg: "from-emerald-400 to-emerald-600",
      title: "Class Scheduling",
      desc: "Set up classes, assign teachers, and manage timetables without a spreadsheet in sight.",
    },
    {
      icon: <BarChart className="w-6 h-6 text-white" />,
      bg: "from-rose-400 to-rose-600",
      title: "Finance & Payments Overview",
      desc: "See your centre's revenue, outstanding payments, and monthly performance at a glance.",
    },
  ];

  /* FAQ data */
  const faqs = [
    { q: "Is EdBuddies really free?",             a: "Yes — completely. No subscription, no per-student fee, no hidden charges. Free to download, free to use, free forever." },
    { q: "Does it work for freelance tutors?",    a: "Absolutely. Whether you run one class or twenty, EdBuddies works for solo tutors and multi-teacher centres alike." },
    { q: "Is EdBuddies available in Singapore?",  a: "Yes. EdBuddies is actively used by centres in both Malaysia and Singapore." },
    { q: "What devices does it support?",         a: "EdBuddies is available on iOS and Android. Centre owners and teachers access it from their phones — no desktop required." },
    { q: "How long does setup take?",             a: "Most centres are fully set up in under 10 minutes." },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">

      {/* ══════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/assets/logo-horizontal.webp"
                alt="EdBuddies"
                className="h-10 w-auto object-contain"
              />
            </motion.div>

            {/* Desktop links */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center gap-8"
            >
              {["Features", "Pricing", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#FF8000] to-[#EA6B0E] group-hover:w-full transition-all duration-250" />
                </a>
              ))}
            </motion.div>

            {/* Nav CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(9,36,75,0.18)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#09244B] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Mobile hamburger */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-900" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-radial from-orange-100/60 to-transparent blur-3xl" />
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-100/40 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-orange-50/50 to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto relative">

            {/* Announcement badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-10"
            >
              <span className="inline-flex items-center gap-2 bg-[#09244B] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-[#09244B]/20">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                <span className="text-orange-300 uppercase tracking-widest text-[10px]">New</span>
                <span className="text-white/80">Free forever — No hidden fees 🎉</span>
              </span>
            </motion.div>

            {/* ── Floating icon cards ── */}
            {[
              { pos: "absolute left-[5%] top-[10%]", delay: 0.8,  dur: 3.0,  amp: 10, icon: <Smartphone className="w-7 h-7 text-blue-500" />,   bg: "from-blue-50 to-blue-100/60" },
              { pos: "absolute right-[5%] top-[10%]",delay: 1.0,  dur: 3.5,  amp: 12, icon: <Calendar className="w-7 h-7 text-emerald-500" />,   bg: "from-emerald-50 to-emerald-100/60" },
              { pos: "absolute left-[8%] top-[45%]", delay: 1.2,  dur: 2.8,  amp: 8,  icon: <CreditCard className="w-7 h-7 text-violet-500" />,  bg: "from-violet-50 to-violet-100/60" },
              { pos: "absolute right-[8%] top-[45%]",delay: 1.4,  dur: 3.2,  amp: 10, icon: <Users className="w-7 h-7 text-orange-500" />,       bg: "from-orange-50 to-orange-100/60" },
              { pos: "absolute left-[12%] bottom-[5%]",delay:1.6, dur: 3.3,  amp: 11, icon: <Bell className="w-7 h-7 text-rose-500" />,          bg: "from-rose-50 to-rose-100/60" },
              { pos: "absolute right-[12%] bottom-[5%]",delay:1.8,dur: 2.9,  amp: 9,  icon: <BarChart className="w-7 h-7 text-teal-500" />,      bg: "from-teal-50 to-teal-100/60" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -card.amp, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: card.delay },
                  scale:   { duration: 0.6, delay: card.delay },
                  y: { duration: card.dur, repeat: Infinity, ease: "easeInOut", delay: card.delay },
                }}
                className={`${card.pos} hidden lg:block`}
              >
                <div className={`bg-gradient-to-br ${card.bg} backdrop-blur-sm border border-white/80 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] transition-shadow duration-300`}>
                  {card.icon}
                </div>
              </motion.div>
            ))}

            {/* ── Connecting lines SVG ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              viewBox="0 0 1000 560"
              preserveAspectRatio="xMidYMid meet"
              style={{ zIndex: 0 }}
            >
              {[
                { d: "M 500 258 C 420 180 220 90 58 60",   delay: 0.90 },
                { d: "M 500 258 C 580 180 780 90 942 60",  delay: 1.05 },
                { d: "M 500 265 C 390 255 260 250 88 252", delay: 1.20 },
                { d: "M 500 265 C 610 255 740 250 912 252",delay: 1.35 },
                { d: "M 500 272 C 400 360 230 440 128 496",delay: 1.50 },
                { d: "M 500 272 C 600 360 770 440 872 496",delay: 1.65 },
              ].map((line, i) => (
                <motion.path
                  key={i}
                  d={line.d}
                  stroke="#94a3b8"
                  strokeWidth="0.75"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.25 }}
                  transition={{ duration: 1.4, delay: line.delay, ease: [0.25, 0.1, 0.25, 1] }}
                />
              ))}
              <motion.circle cx="500" cy="265" r="2.5" fill="#94a3b8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.85 }}
              />
            </svg>

            {/* ── Headline ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#09244B] mb-4 leading-[1.08] tracking-tight">
                The Free Centre
              </h1>

              {/* Logo lockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center mb-5"
              >
                <img
                  src="/assets/logo-horizontal.webp"
                  alt="EdBuddies"
                  className="h-14 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-sm"
                />
              </motion.div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#09244B] leading-[1.08] tracking-tight">
                For Tuition Centres
              </h2>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative z-10 text-lg text-gray-500 mt-7 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Attendance, billing, invoicing, and parent communication — all in one app.{" "}
              <span className="font-semibold text-gray-700">
                No subscription. No student commission. No catch.
              </span>
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center mb-7"
            >
              <PrimaryBtn>
                Download the App — It's Free
                <ArrowRight className="w-4 h-4" />
              </PrimaryBtn>
              <SecondaryBtn>
                See How It Works
              </SecondaryBtn>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="relative z-10 text-xs text-gray-400 mb-16 tracking-wide"
            >
              Available on iOS & Android · Used by centres in Malaysia & Singapore
            </motion.p>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOCIAL PROOF BAR
      ══════════════════════════════════════════ */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8"
          >
            Trusted by tuition centres and freelance tutors across Malaysia & Singapore
          </motion.p>

          <div className="relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFBFF] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFBFF] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-16"
              animate={{ x: [0, -1200] }}
              transition={{ x: { duration: 22, repeat: Infinity, ease: "linear" } }}
            >
              {[
                { icon: <GraduationCap className="w-5 h-5 text-gray-400" />, name: "EduCentre" },
                { icon: <BookOpen      className="w-5 h-5 text-gray-400" />, name: "LearnHub" },
                { icon: <School        className="w-5 h-5 text-gray-400" />, name: "SmartTutor" },
                { icon: <GraduationCap className="w-5 h-5 text-gray-400" />, name: "AcadPlus" },
                { icon: <BookOpen      className="w-5 h-5 text-gray-400" />, name: "BrightMinds" },
                { icon: <School        className="w-5 h-5 text-gray-400" />, name: "TutorPro" },
              ].flatMap((item, _, arr) => [...arr]).map((item, i) => (
                <div key={i} className="flex items-center gap-2 opacity-50 shrink-0">
                  {item.icon}
                  <span className="font-semibold text-gray-500 whitespace-nowrap text-sm">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROBLEM SECTION  (sticky scroll)
      ══════════════════════════════════════════ */}
      <section ref={problemSectionRef} className="relative bg-white">
        <div className="h-[250vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Outer wrapper — full viewport height, title locked dead centre */}
            <div className="relative w-full max-w-7xl" style={{ height: "80vh" }}>

              {/* ── TITLE — always centred, never moves ── */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
                  Pain points
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#09244B] leading-tight tracking-tight text-center">
                  Is this your centre?
                </h2>
              </div>

              {/* ── CARDS — one at a time, positioned clear of title ── */}
              {[
                {
                  style: { opacity: card1Opacity, y: card1Y },
                  pos: "absolute right-4 lg:right-20 top-[8%]",
                  text: "Software fees drain profit every month.",
                },
                {
                  style: { opacity: card2Opacity, y: card2Y },
                  pos: "absolute left-4 lg:left-20 top-[8%]",
                  text: "Manual invoicing every month is exhausting.",
                },
                {
                  style: { opacity: card3Opacity, y: card3Y },
                  pos: "absolute right-4 lg:right-20 bottom-[8%]",
                  text: "Chasing fees eats your teaching time.",
                },
                {
                  style: { opacity: card4Opacity, y: card4Y },
                  pos: "absolute left-4 lg:left-20 bottom-[8%]",
                  text: "Attendance records lost or never updated.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  style={card.style}
                  className={`${card.pos} w-[260px] lg:w-[320px]`}
                >
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_4px_24px_rgba(9,36,75,0.10)]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 leading-relaxed">{card.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFBF7] relative overflow-hidden">

        {/* Subtle warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-radial from-orange-100/50 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionBadge icon={<CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />} label="Features" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#09244B] mb-5 leading-tight tracking-tight">
              Everything your centre needs.<br />In your pocket.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Powerful tools that simplify how you work and accelerate how you grow.
            </p>
          </motion.div>

          {/* 5-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(9,36,75,0.12)" }}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_16px_rgba(9,36,75,0.06)] transition-all duration-300 cursor-default"
              >
                <div className={`w-12 h-12 mb-5 bg-gradient-to-br ${feat.bg} rounded-2xl flex items-center justify-center shadow-md`}>
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-[#09244B] mb-2 leading-snug">{feat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Converging lines → logo */}
          <div className="relative h-48 mt-4">
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 200"
              preserveAspectRatio="xMidYMid meet"
            >
              {[
                { d: "M 100 0 Q 100 100 500 150", delay: 0.6 },
                { d: "M 300 0 Q 350 80 500 150",  delay: 0.7 },
                { d: "M 500 0 L 500 150",          delay: 0.8 },
                { d: "M 700 0 Q 650 80 500 150",  delay: 0.9 },
                { d: "M 900 0 Q 900 100 500 150", delay: 1.0 },
              ].map((p, i) => (
                <motion.path
                  key={i}
                  d={p.d}
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: p.delay }}
                />
              ))}
            </svg>

            {/* Central logo node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: "150px" }}
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_8px_32px_rgba(9,36,75,0.12)]">
                <img src="/assets/logo-horizontal.webp" alt="EdBuddies" className="h-8 w-auto object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHO IT'S FOR  (sticky scroll)
      ══════════════════════════════════════════ */}
      <section ref={whoSectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <SectionBadge icon={<Users className="w-3.5 h-3.5 text-[#09244B]" />} label="Who It's For" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#09244B] leading-tight tracking-tight">
              Built for every kind of<br className="hidden sm:block" /> education business
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — sticky image panel */}
            <div className="lg:sticky lg:top-28 h-[520px] relative">
              {[
                {
                  opacity: useTransform(whoScrollProgress, [0, 0.35, 0.4], [1, 1, 0]),
                  src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGNsYXNzcm9vbSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3ODA4MDcwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Tuition Centre", num: "/01",
                },
                {
                  opacity: useTransform(whoScrollProgress, [0.35, 0.4, 0.7, 0.75], [0, 1, 1, 0]),
                  src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGNsYXNzcm9vbSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3ODA4MDcwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Freelance Tutor", num: "/02",
                },
                {
                  opacity: useTransform(whoScrollProgress, [0.7, 0.75, 1], [0, 1, 1]),
                  src: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGNsYXNzcm9vbSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3ODA4MDcwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Enrichment Centre", num: "/03",
                },
              ].map((img, i) => (
                <motion.div key={i} style={{ opacity: img.opacity }} className="absolute inset-0">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(9,36,75,0.18)]">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09244B]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-6xl font-black text-white/20 select-none">
                      {img.num}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right — scrolling content */}
            <div className="space-y-36">
              {[
                {
                  opacity: whoCard1Opacity,
                  num: "01",
                  title: "Tuition Centres",
                  desc: "Small or growing, EdBuddies scales with you. Manage multiple classes, teachers, and hundreds of students — all for free.",
                },
                {
                  opacity: whoCard2Opacity,
                  num: "02",
                  title: "Freelance Tutors",
                  desc: "Running your own classes solo? EdBuddies keeps your admin organised so you can focus on teaching.",
                },
                {
                  opacity: whoCard3Opacity,
                  num: "03",
                  title: "Enrichment Centres",
                  desc: "From music to robotics to language classes — if you run a centre, EdBuddies runs with you.",
                },
              ].map((item, i) => (
                <motion.div key={i} style={{ opacity: item.opacity }} className="min-h-[400px] flex items-center">
                  <div>
                    <span className="text-5xl font-black text-gray-100 leading-none select-none">{item.num}</span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#09244B] mt-2 mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-lg text-gray-500 leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS  (scroll-driven path)
      ══════════════════════════════════════════ */}
      <section ref={howSectionRef} className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFBFF] relative" style={{ minHeight: "180vh" }}>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-orange-50/60 to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionBadge icon={<Settings className="w-3.5 h-3.5 text-gray-500" />} label="Process" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#09244B] mb-4 tracking-tight">
              Up and running in under 10 minutes
            </h2>
          </div>

          <div className="relative min-h-[700px]">

            {/* Step 01 — top right (always visible) */}
            <div className="absolute right-[10%] top-0 w-80 z-10">
              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_8px_40px_rgba(9,36,75,0.10)] hover:shadow-[0_16px_60px_rgba(9,36,75,0.15)] hover:-translate-y-1 transition-all duration-300 relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#FF8000] to-[#EA6B0E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-300/40">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Step 01</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2">Contact us</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Tell us about your centre. We'll get you set up in no time.</p>
              </div>
            </div>

            {/* Animated orange path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet">
              <motion.path
                d="M 400 80 L 850 80 Q 950 80 950 140 Q 800 220 400 300 Q 200 300 200 360 Q 500 480 850 560 Q 950 560 950 620"
                stroke="url(#orangeGrad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                style={{ pathLength: howLinePathProgress }}
              />
              <defs>
                <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#FF8000" />
                  <stop offset="100%" stopColor="#EA6B0E" />
                </linearGradient>
              </defs>
            </svg>

            {/* Step 02 — middle left */}
            <motion.div style={{ opacity: howCard2Opacity, x: howCard2X }} className="absolute left-[10%] top-[250px] w-80 z-10">
              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_8px_40px_rgba(9,36,75,0.10)] hover:shadow-[0_16px_60px_rgba(9,36,75,0.15)] hover:-translate-y-1 transition-all duration-300 relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#FF8000] to-[#EA6B0E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-300/40">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Step 02</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2">Set up your centre</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Add your classes, students, and teachers in minutes.</p>
              </div>
            </motion.div>

            {/* Step 03 — bottom right */}
            <motion.div style={{ opacity: howCard3Opacity, x: howCard3X }} className="absolute right-[10%] top-[500px] w-80 z-10">
              <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_8px_40px_rgba(9,36,75,0.10)] hover:shadow-[0_16px_60px_rgba(9,36,75,0.15)] hover:-translate-y-1 transition-all duration-300 relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#FF8000] to-[#EA6B0E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-300/40">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Step 03</p>
                <h3 className="text-xl font-bold text-[#09244B] mb-2">Start managing</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Attendance, invoices, communication, all handled from one place.</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-16">
            <PrimaryBtn>
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </PrimaryBtn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — floating phone */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-orange-100 to-transparent rounded-[3rem] blur-3xl opacity-70 scale-110" />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative bg-[#09244B] rounded-[3rem] p-3 shadow-[0_32px_80px_rgba(9,36,75,0.30)]"
                  style={{ width: "300px", height: "620px" }}
                >
                  <div className="bg-white rounded-[2.5rem] h-full w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkYXNoYm9hcmQlMjB1aSUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc4MDgxMTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="EdBuddies Mobile App"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#09244B] rounded-full h-6 w-28" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right — pricing content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <SectionBadge icon={<Sparkles className="w-3.5 h-3.5 text-orange-500" />} label="Pricing" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#09244B] leading-tight tracking-tight">
                Free. Not "free trial."<br />Free forever.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                No subscription fees. No per-student charges. No hidden costs. EdBuddies is 100% free because we believe every centre deserves great tools — regardless of size.
              </p>

              {/* Pricing card */}
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-[0_8px_40px_rgba(9,36,75,0.08)] hover:shadow-[0_16px_60px_rgba(9,36,75,0.12)] transition-shadow duration-300 relative overflow-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8000] via-[#EA6B0E] to-[#FF8000]" />

                <div className="mb-7">
                  <h3 className="text-xl font-bold text-[#09244B] mb-2">EdBuddies Free</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-[#09244B] tracking-tight">RM 0</span>
                    <span className="text-gray-400 font-medium">/ month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 mb-8">
                  {[
                    "Unlimited students",
                    "Parent communication",
                    "Attendance tracking",
                    "Class scheduling",
                    "Invoicing & billing",
                    "Finance overview",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feat}</span>
                    </div>
                  ))}
                </div>

                <PrimaryBtn className="w-full justify-center">
                  <Download className="w-4 h-4" />
                  Download Now — Free Forever
                </PrimaryBtn>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFBFF]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <SectionBadge icon={<CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />} label="FAQ" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#09244B] tracking-tight">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                  openFaq === i
                    ? "border-orange-200 shadow-[0_4px_24px_rgba(255,128,0,0.12)]"
                    : "border-gray-100 shadow-[0_2px_12px_rgba(9,36,75,0.05)] hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`text-base font-semibold transition-colors ${openFaq === i ? "text-[#FF8000]" : "text-[#09244B]"}`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 ml-4 transition-colors ${openFaq === i ? "text-orange-500" : "text-gray-400"}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA  — deep navy
      ══════════════════════════════════════════ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#09244B] relative overflow-hidden">

        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[#FF8000]/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                  Get started today
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  Start managing your centre free today.
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mt-5">
                  Join tuition centres and freelance tutors across Malaysia and Singapore who've ditched the spreadsheets.
                </p>
              </div>

              {/* App store buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {[
                  { icon: <Apple className="w-6 h-6" />, sub: "Download on the", main: "App Store" },
                  {
                    icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    ),
                    sub: "Get it on",
                    main: "Google Play",
                  },
                ].map((btn, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.18)" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl transition-all duration-200 backdrop-blur-sm"
                  >
                    {btn.icon}
                    <div className="text-left">
                      <div className="text-xs text-white/60">{btn.sub}</div>
                      <div className="text-base font-bold -mt-0.5">{btn.main}</div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="text-sm text-white/40">No credit card. No commitment. No monthly fees.</p>
            </motion.div>

            {/* Right — mascot / illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-orange-600/10 rounded-full blur-3xl scale-110" />
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-[#FF8000] to-[#EA6B0E] rounded-3xl flex items-center justify-center shadow-[0_32px_80px_rgba(255,128,0,0.35)]"
                >
                  <div className="text-center">
                    <GraduationCap className="w-28 h-28 text-white mx-auto mb-3 drop-shadow-lg" />
                    <p className="text-white text-sm font-semibold">3D Mascot Placeholder</p>
                    <p className="text-white/60 text-xs mt-1">Replace with your own</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-gray-950 text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Brand column */}
            <div className="md:col-span-2">
              <img src="/assets/logo-horizontal.webp" alt="EdBuddies" className="h-9 w-auto object-contain mb-4 brightness-0 invert opacity-90" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                The 100% free centre management app built for tuition centres, freelance tutors, and enrichment providers.
              </p>
              <div className="flex gap-4 mt-6">
                {[Facebook, Instagram].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.12, color: "#FF8000" }}
                    className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF8000] hover:border-orange-500/30 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Product</h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "How It Works", "Download"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Company</h4>
              <ul className="space-y-3">
                {["About", "Contact", "Malaysia", "Singapore"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider + copyright */}
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">© 2025 EdBuddies. All rights reserved.</p>
            <p className="text-gray-600 text-xs">Built for tuition centres in Malaysia & Singapore.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
