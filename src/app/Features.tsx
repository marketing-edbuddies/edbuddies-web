import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./components/ui/button";
import {
  ArrowRight, ClipboardList, CreditCard, MessageSquare, Calendar,
  BarChart, Users, BookOpen, Settings, CheckCircle2, Check,
  Bell, ChevronRight,
} from "lucide-react";
import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";
import { SHOW_FREE_MESSAGING } from "./flags";
import Footer from "./Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_FEATURES = [
  { icon: ClipboardList, title: "Student Attendance Tracking",   desc: "Mark attendance in seconds. Parents notified automatically. No more paper registers." },
  { icon: CreditCard,   title: "Automated Invoicing & Billing",  desc: "Generate and send invoices with one tap. Track who's paid without awkward follow-ups." },
  { icon: MessageSquare,title: "Parent Communication",           desc: "Send announcements, homework updates, and fee reminders directly through the app." },
  { icon: Calendar,     title: "Class & Timetable Scheduling",   desc: "Set up classes, assign teachers, and manage timetables. No spreadsheet needed." },
  { icon: BarChart,     title: "Finance & Payments Overview",    desc: "See revenue, outstanding payments, and monthly performance at a glance." },
  { icon: Users,        title: "Teacher Management",             desc: "Add teachers, assign them to classes, and track their schedules from one place." },
  { icon: BookOpen,     title: "Homework Workflows",             desc: "Assign homework, share materials, and keep parents informed. All in the app." },
  { icon: Settings,     title: "Daily Admin Tools",              desc: "Everything else a centre needs: class notes, student records, and centre settings." },
];

// ─── Deep Dive Section ────────────────────────────────────────────────────────

interface DeepDiveProps {
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ElementType;
  mockCards: { icon: React.ElementType; text: string; sub?: string }[];
  reverse?: boolean;
  bg?: string;
  videoSrc?: string;
}

function DeepDive({ label, title, desc, bullets, icon: Icon, mockCards, reverse = false, bg = "bg-white", videoSrc }: DeepDiveProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // SVG accent line draws in as section enters viewport
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section ref={sectionRef} className={`py-20 px-4 sm:px-6 lg:px-8 ${bg} overflow-hidden`}>
      <div className="max-w-5xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>

          {/* Text column */}
          <div className="space-y-6 lg:[direction:ltr]">
            {/* Label — slides in first */}
            <motion.div
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 24 }}
              className="inline-flex items-center gap-2 text-sm text-gray-500"
            >
              <Icon className="w-4 h-4 text-[#0FB8F1]" />
              <span className="uppercase tracking-wider font-medium">{label}</span>
            </motion.div>

            {/* Animated orange accent line (matches SVG path style from home) */}
            <div className="w-full h-px bg-gray-100 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#0FB8F1]"
                style={{ width: "60%", scaleX: lineProgress, originX: 0 }}
              />
            </div>

            {/* Heading — slides up with slight spring overshoot */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09244B] leading-tight"
            >
              {title}
            </motion.h2>

            {/* Description — fades in after heading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {desc}
            </motion.p>

            {/* Bullets — staggered spring, same pattern as home's how-it-works cards */}
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: reverse ? 16 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.22 + i * 0.07, type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E8F8FE] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#0FB8F1]" />
                  </div>
                  <span className="text-gray-700">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Visual mock column — slides in from opposite side */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 200, damping: 26 }}
            className="lg:[direction:ltr]"
          >
            {videoSrc ? (
              <div className="scale-150">
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                />
              </div>
            ) : (
            <div
              className="bg-[#EEFCFF] rounded-3xl p-8 space-y-4"
              style={{ boxShadow: "0 4px 24px rgba(9,36,75,0.10)" }}
            >
              {mockCards.map(({ icon: MIcon, text, sub }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.09, type: "spring", stiffness: 260, damping: 24 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 32px rgba(9,36,75,0.14)",
                    borderColor: "rgba(15,184,241,0.22)",
                    transition: { type: "spring", stiffness: 350, damping: 25 },
                  }}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-default border border-transparent"
                  style={{ boxShadow: "0 2px 8px rgba(9,36,75,0.08)" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                    className="w-10 h-10 rounded-xl bg-[#0FB8F1] flex items-center justify-center flex-shrink-0"
                  >
                    <MIcon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#09244B] truncate">{text}</p>
                    {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Features() {
  useEffect(() => {
    setPageMeta({
      title: "Features — EdBuddies | Centre Management App",
      description: "EdBuddies helps tuition and enrichment centres in Singapore and Malaysia manage attendance, billing, invoicing, parent communication and class scheduling.",
      url: "https://edbuddies.ai/features",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="features" />

      <main id="main-content">
      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#0FB8F1]" />
            <span className="uppercase tracking-wider font-medium">Features Overview</span>
          </motion.div>

          {/* Heading — spring up, same as home hero */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 220, damping: 22 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] leading-tight mb-6"
          >
            Everything Your Centre Needs.<br className="hidden sm:block" />
            <span className="text-[#0FB8F1]">In One App.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            From attendance to invoices, parent communication to class scheduling —
            all in one app built for tuition centres and freelance tutors in Singapore &amp; Malaysia.
          </motion.p>

          {/* CTAs — staggered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#09244B] text-white px-8 py-6 text-base gap-2 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(9,36,75,0.30)] hover:bg-[#0d3570]">
                  Enquire Now <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Feature Grid ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-5xl mx-auto">

          {/* Section header — staggered label → h2 → desc, same as home features section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Settings className="w-4 h-4" />
              <span className="uppercase tracking-wider">All Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-4">
              One App. Every Tool You Need.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
              {SHOW_FREE_MESSAGING
                ? "Eight things you used to juggle manually. Now handled from one app — at RM 0."
                : "Eight things you used to juggle manually. Now handled from one app."}
            </p>
          </motion.div>

          {/* Cards — staggered y-up with spring, identical to home feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-0 relative z-10">
            {ALL_FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                whileHover={{ y: -6, boxShadow: "0 20px 52px rgba(9,36,75,0.16)", borderColor: "rgba(15,184,241,0.28)", transition: { type: "spring", stiffness: 350, damping: 25 } }}
                whileTap={{ y: 0, transition: { duration: 0.1 } }}
                className="group bg-white rounded-2xl p-6 flex flex-col border border-transparent cursor-pointer"
                style={{ boxShadow: "0 4px 16px rgba(9,36,75,0.12)" }}
              >
                <div className="w-12 h-12 mb-3 bg-[#0FB8F1] rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-[1.08] group-hover:-rotate-3 group-hover:shadow-[0_8px_24px_rgba(15,184,241,0.35)]">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-[#09244B] leading-snug mb-3 min-h-[2.5rem]">{title}</h3>
                <div className="border-t border-gray-200 mb-3" />
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 3: Deep Dive — Attendance & Classes ───────────────────── */}
      <DeepDive
        label="Attendance & Classes"
        title="Never Lose an Attendance Record Again."
        desc="Track who's present, who's absent, and who's late. In seconds. Parents get notified automatically and your records are always up to date."
        bullets={[
          "One-tap attendance marking per class",
          "Automatic parent notification on absence",
          "Full attendance history per student",
          "Class scheduling and timetable management",
          "Assign teachers to specific classes",
        ]}
        icon={ClipboardList}
        mockCards={[
          { icon: ClipboardList, text: "Morning Class — 9:00am",   sub: "18 / 20 present · 2 absent" },
          { icon: Bell,          text: "Parent Notified",           sub: "Ahmad's parent alerted · 5 min ago" },
          { icon: Calendar,      text: "Saturday Class",            sub: "All 12 students confirmed" },
          { icon: Users,         text: "Teacher: Ms. Lim",          sub: "3 classes today" },
        ]}
        videoSrc="/attendance-and-class-schedule.mp4"
        bg="bg-white"
      />

      {/* ── Section 4: Deep Dive — Billing & Invoices ────────────────────── */}
      <DeepDive
        label="Billing & Invoices"
        title="Invoice in One Tap. Get Paid Without the Chase."
        desc="Stop chasing fees manually. Generate invoices, track payment status, and send reminders, all from your phone. No more awkward conversations."
        bullets={[
          "Auto-generate monthly invoices per student",
          "Real-time payment status tracking",
          "Send payment reminders with one tap",
          "Supports multiple payment methods",
          "Full finance overview at a glance",
        ]}
        icon={CreditCard}
        mockCards={[
          { icon: CreditCard,    text: "Invoice #0042 — Sent",      sub: "Ahmad bin Ali · RM 280 · Due Jun 15" },
          { icon: CheckCircle2,  text: "Payment Received",           sub: "Siti binti Noor · RM 250 · Jun 10" },
          { icon: Bell,          text: "Reminder Sent",              sub: "3 outstanding invoices notified" },
          { icon: BarChart,      text: "June Revenue",               sub: "RM 4,200 collected · RM 560 outstanding" },
        ]}
        reverse
        bg="bg-[#EEFCFF]"
      />

      {/* ── Section 5: Deep Dive — Parent Communication ───────────────────── */}
      <DeepDive
        label="Parent Communication"
        title="Keep Parents in the Loop — Without the Group Chat Chaos."
        desc="Send announcements, homework updates, and fee reminders directly through the app. No more relying on WhatsApp groups where messages get buried."
        bullets={[
          "Broadcast announcements to all parents",
          "Send homework updates per class or student",
          "Fee reminders delivered instantly",
        ]}
        icon={MessageSquare}
        mockCards={[
          { icon: MessageSquare, text: "Announcement Sent",          sub: "Exam revision schedule · All parents" },
          { icon: BookOpen,      text: "Homework Assigned",           sub: "Math Worksheet 3 · Due Thursday" },
          { icon: Bell,          text: "Fee Reminder",               sub: "June tuition due in 3 days · 12 parents" },
          { icon: Users,         text: "38 Parents Connected",        sub: "Active on EdBuddies" },
        ]}
        bg="bg-white"
      />

      {/* ── Section 6: Platform Strip ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09244B]">
        <div className="max-w-5xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="uppercase tracking-wider">Availability</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Available on iOS &amp; Android.
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white/70 text-lg max-w-xl mx-auto mb-10"
          >
            {SHOW_FREE_MESSAGING
              ? "EdBuddies runs on any smartphone. Download it once, use it forever — no desktop, no setup, no fees."
              : "EdBuddies runs on any smartphone. Download it once — no desktop required, no complex setup."}
          </motion.p>

          {/* App store buttons — staggered spring */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* App Store badge */}
              <motion.a
                href="https://apps.apple.com/my/app/edbuddies/id6746329753"
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}
                whileTap={{ y: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex items-center gap-3 bg-black text-white rounded-2xl px-5 py-3 min-w-[180px]"
                style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.22)" }}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="none">
                  <rect width="24" height="24" rx="5.5" fill="url(#appleGradF)"/>
                  <defs>
                    <linearGradient id="appleGradF" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
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
                className="flex items-center gap-3 bg-black text-white rounded-2xl px-5 py-3 min-w-[180px]"
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/40 text-sm mt-8"
          >
            {SHOW_FREE_MESSAGING ? "Used by centres in Singapore & Malaysia · Free forever" : "Used by centres in Singapore & Malaysia"}
          </motion.p>
        </div>
      </section>

      {/* ── Section 7: CTA Banner ─────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#0FB8F1]" />
            <span className="uppercase tracking-wider">Get Started</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-6"
          >
            Your Centre, Managed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-xl text-gray-600 leading-relaxed mb-10"
          >
            Join tuition centres and freelance tutors across Singapore and Malaysia who've ditched the spreadsheets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="inline-flex">
              <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-[#09244B] text-white px-10 py-6 text-base gap-2 transition-colors duration-200 hover:shadow-[0_10px_32px_rgba(9,36,75,0.35)] hover:bg-[#0d3570]"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 14px rgba(9,36,75,0.22)" }}
                >
                  Enquire Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-400 mt-6"
          >
            {SHOW_FREE_MESSAGING ? "No credit card. No commitment. No monthly fees." : "Get started in minutes."}
          </motion.p>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
