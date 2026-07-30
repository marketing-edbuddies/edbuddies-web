import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./components/ui/button";
import {
  ArrowRight, CheckCircle2, Check, ChevronRight, Sparkles,
  Building2, Users, UserPlus, Calendar, FileText, ClipboardList,
  MessageSquare, Bell, CreditCard, Receipt, Wallet, RefreshCw, Globe,
  GraduationCap, Clock, Award, Gift, Star, Brain, FileQuestion,
  Download, Smartphone, Mail, BarChart3, PieChart, LayoutDashboard, Eye,
} from "lucide-react";
import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { setPageMeta } from "./seo";

// ─── DRAFT PAGE — internal review only. Mirrors Features.tsx styling. ────────
// Not linked in Navbar/Footer/sitemap. Existing /features page is untouched.

// ─── Feature Grid Card (matches Features.tsx "All Features" card style) ──────

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

function FeatureCard({ icon: Icon, title, desc, i }: FeatureItem & { i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
      whileHover={{ y: -6, boxShadow: "0 20px 52px rgba(9,36,75,0.16)", borderColor: "rgba(255,128,0,0.28)", transition: { type: "spring", stiffness: 350, damping: 25 } }}
      whileTap={{ y: 0, transition: { duration: 0.1 } }}
      className="group bg-white rounded-2xl p-6 flex flex-col border border-transparent cursor-pointer"
      style={{ boxShadow: "0 4px 16px rgba(9,36,75,0.12)" }}
    >
      <div className="w-12 h-12 mb-3 bg-[#FF8000] rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-[1.08] group-hover:-rotate-3 group-hover:shadow-[0_8px_24px_rgba(255,128,0,0.35)]">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-base font-semibold text-[#09244B] leading-snug mb-3 min-h-[2.5rem]">{title}</h3>
      <div className="border-t border-gray-200 mb-3" />
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ─── Category Section (grid of FeatureCards, matches Features.tsx Section 2 pattern) ─

interface CategorySection {
  icon: React.ElementType;
  label: string;
  title: string;
  desc: string;
  items: FeatureItem[];
  bg?: string;
}

function FeatureGridSection({ icon: Icon, label, title, desc, items, bg = "bg-white" }: CategorySection) {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${bg}`}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Icon className="w-4 h-4" />
            <span className="uppercase tracking-wider">{label}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">{desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-0 relative z-10">
          {items.map((item, i) => (
            <FeatureCard key={item.title} {...item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Deep Dive Section (copied from Features.tsx to keep that file untouched) ─

interface DeepDiveProps {
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ElementType;
  mockCards: { icon: React.ElementType; text: string; sub?: string }[];
  reverse?: boolean;
  bg?: string;
}

function DeepDive({ label, title, desc, bullets, icon: Icon, mockCards, reverse = false, bg = "bg-white" }: DeepDiveProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section ref={sectionRef} className={`py-20 px-4 sm:px-6 lg:px-8 ${bg} overflow-hidden`}>
      <div className="max-w-5xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>

          <div className="space-y-6 lg:[direction:ltr]">
            <motion.div
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 24 }}
              className="inline-flex items-center gap-2 text-sm text-gray-500"
            >
              <Icon className="w-4 h-4 text-[#FF8000]" />
              <span className="uppercase tracking-wider font-medium">{label}</span>
            </motion.div>

            <div className="w-full h-px bg-gray-100 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#FF8000]"
                style={{ width: "60%", scaleX: lineProgress, originX: 0 }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 22 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09244B] leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {desc}
            </motion.p>

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
                  <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#FF8000]" />
                  </div>
                  <span className="text-gray-700">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 200, damping: 26 }}
            className="lg:[direction:ltr]"
          >
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
                    borderColor: "rgba(255,128,0,0.22)",
                    transition: { type: "spring", stiffness: 350, damping: 25 },
                  }}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-default border border-transparent"
                  style={{ boxShadow: "0 2px 8px rgba(9,36,75,0.08)" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                    className="w-10 h-10 rounded-xl bg-[#FF8000] flex items-center justify-center flex-shrink-0"
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CENTRE_MANAGEMENT: FeatureItem[] = [
  { icon: UserPlus, title: "Student Registration & Enrolment", desc: "Enrol new students in minutes, no paperwork required." },
  { icon: Users, title: "Student Profiles", desc: "One record per student — contact info, class history, and more." },
  { icon: Users, title: "Parent Profiles", desc: "Linked parent details for every student, always up to date." },
  { icon: GraduationCap, title: "Teacher Profiles", desc: "Track qualifications, classes, and schedules per teacher." },
  { icon: LayoutDashboard, title: "Class Creation & Management", desc: "Set up and manage classes without a spreadsheet." },
  { icon: Calendar, title: "Timetable & Class Scheduling", desc: "Build timetables and avoid double-booked slots." },
  { icon: Building2, title: "Multi-Centre Management", desc: "Run multiple branches from a single dashboard." },
  { icon: BarChart3, title: "Centre Reports & Admin Analytics", desc: "See how your centre is performing at a glance." },
  { icon: Bell, title: "Announcements & Centre Updates", desc: "Push updates to your whole centre in one tap." },
];

const ATTENDANCE_PROGRESS: FeatureItem[] = [
  { icon: ClipboardList, title: "Student Attendance Tracking", desc: "Mark attendance in seconds, every class." },
  { icon: ClipboardList, title: "Teacher Attendance Tracking", desc: "Know who's in, who's late, and who's off." },
  { icon: FileText, title: "Student Progress Records", desc: "A running record of how each student is doing." },
  { icon: MessageSquare, title: "Teacher Remarks & Feedback", desc: "Capture teacher notes right after class." },
  { icon: BarChart3, title: "Attendance Summaries", desc: "Attendance trends per student, class, or centre." },
  { icon: PieChart, title: "Class Performance Reports", desc: "See how each class is performing over time." },
  { icon: Clock, title: "Student Lesson History", desc: "Full history of lessons attended per student." },
  { icon: Download, title: "Learning Materials & Homework Records", desc: "Share materials and track homework in one place." },
];

const BILLING_PAYMENTS: FeatureItem[] = [
  { icon: FileText, title: "Invoice Creation", desc: "Generate invoices in a tap, not an afternoon." },
  { icon: RefreshCw, title: "Recurring Invoices", desc: "Set it once — invoices go out automatically each cycle." },
  { icon: Wallet, title: "Payment Tracking", desc: "See who's paid and who hasn't, in real time." },
  { icon: Bell, title: "Outstanding & Overdue Payment Tracking", desc: "Never lose track of what's owed." },
  { icon: Bell, title: "Automated Payment Reminders", desc: "Reminders send themselves, so you don't have to chase." },
  { icon: Receipt, title: "Invoice Breakdown & Payment History", desc: "Full payment history, itemised, per student." },
  { icon: CreditCard, title: "Payment Gateway Support", desc: "Accept payments directly through the app." },
  { icon: Globe, title: "Local Currency Support", desc: "Billing in the right currency for your market." },
];

const STUDENT_REWARDS: FeatureItem[] = [
  { icon: Star, title: "Award Stamps for Good Behaviour", desc: "Recognise good behaviour on the spot." },
  { icon: Gift, title: "Students Collect Stamps Over Time", desc: "Stamps add up automatically as students earn them." },
  { icon: Gift, title: "Centre-Created Rewards & Gifts", desc: "Build your own reward catalogue." },
  { icon: Award, title: "Reward Redemption", desc: "Students redeem rewards once they've earned enough." },
  { icon: Eye, title: "Reward Balance & Redemption Tracking", desc: "See every student's balance and redemption history." },
];

const PARENT_FEATURES: FeatureItem[] = [
  { icon: Eye, title: "View Child Profiles", desc: "Parents see their child's profile anytime." },
  { icon: ClipboardList, title: "View Attendance Summaries", desc: "Parents check attendance without asking staff." },
  { icon: FileText, title: "View Progress & Teacher Remarks", desc: "Progress and feedback, visible to parents directly." },
  { icon: Wallet, title: "View Upcoming & Overdue Payments", desc: "No surprises — parents see what's due and when." },
  { icon: Receipt, title: "View Invoices & Payment History", desc: "Full billing history available to parents." },
  { icon: Download, title: "Access Learning Materials", desc: "Parents can access shared materials anytime." },
  { icon: Bell, title: "Receive Centre Announcements", desc: "Parents stay in the loop automatically." },
];

const COMMUNICATION: FeatureItem[] = [
  { icon: Bell, title: "Centre Announcements", desc: "Broadcast updates to your whole centre instantly." },
  { icon: MessageSquare, title: "Student & Parent Notifications", desc: "Automatic notifications for the moments that matter." },
  { icon: CreditCard, title: "Invoice & Payment Reminders", desc: "Reminders that go out on their own." },
  { icon: Calendar, title: "Class-Related Updates", desc: "Keep everyone posted on schedule or class changes." },
  { icon: Smartphone, title: "Push Notifications", desc: "Real-time alerts, straight to the phone." },
  { icon: Mail, title: "Email Notifications", desc: "Important updates land in inboxes too." },
];

const REPORTING_ADMIN: FeatureItem[] = [
  { icon: LayoutDashboard, title: "Centre Performance Dashboard", desc: "Every key number for your centre, in one view." },
  { icon: ClipboardList, title: "Student Attendance Reports", desc: "Attendance data, exportable and ready to share." },
  { icon: Receipt, title: "Payment & Invoice Reports", desc: "Full financial picture without spreadsheets." },
  { icon: PieChart, title: "Class Performance Reports", desc: "Compare class performance over time." },
  { icon: GraduationCap, title: "Teacher & Payroll Records", desc: "Payroll and staff records, kept together." },
  { icon: Building2, title: "Multi-Centre Overview", desc: "Compare performance across every branch." },
  { icon: BarChart3, title: "Administrative Analytics", desc: "The numbers behind the day-to-day, made visible." },
];

const FUTURE_ITEMS = [
  { icon: FileQuestion, title: "AI-Generated Past-Year Mock Tests" },
  { icon: Brain, title: "AI Tutor & Student Matching" },
  { icon: Globe, title: "MOE Learning Resources" },
  { icon: Download, title: "Homework & Materials Download" },
  { icon: MessageSquare, title: "In-App Chat" },
  { icon: LayoutDashboard, title: "Education Marketplace Features" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesNew() {
  useEffect(() => {
    setPageMeta({
      title: "New Features (Draft) — EdBuddies",
      description: "Draft page — internal review only.",
      url: "https://edbuddies.ai/features-new",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Internal draft notice ─────────────────────────────────────────── */}
      <div className="bg-[#09244B] text-white text-center text-sm py-2 px-4 mt-[112px]">
        Draft page for internal review — not linked from the live site.
      </div>

      {/* ── Section 1: Hero (matches Features.tsx hero) ───────────────────── */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FF8000]" />
            <span className="uppercase tracking-wider font-medium">New Features Overview</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 220, damping: 22 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] leading-tight mb-6"
          >
            More Of What Your Centre Needs.<br className="hidden sm:block" />
            <span className="text-[#FF8000]">Now Built In.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Beyond attendance and billing — centre management, staff and payroll,
            student rewards, AI-marked assessments, and a parent-facing view, all in one app.
          </motion.p>

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
            <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <a href="/features">
                <Button size="lg" variant="outline" className="bg-white border-gray-300 px-8 py-6 text-base transition-all duration-200 hover:bg-[#09244B] hover:text-white hover:border-[#09244B] hover:shadow-[0_8px_24px_rgba(9,36,75,0.20)]">
                  See Current Features Page
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Centre Management ──────────────────────────────────── */}
      <FeatureGridSection
        icon={Building2}
        label="Centre Management"
        title="Run Every Part of Your Centre."
        desc="From enrolling a new student to managing multiple branches — the day-to-day admin lives in one app."
        items={CENTRE_MANAGEMENT}
        bg="bg-[#EEFCFF]"
      />

      {/* ── Section 3: Attendance & Student Progress ──────────────────────── */}
      <FeatureGridSection
        icon={ClipboardList}
        label="Attendance & Student Progress"
        title="Track Attendance and Progress."
        desc="See who showed up, how they're doing, and what teachers are noticing — all in one history per student."
        items={ATTENDANCE_PROGRESS}
        bg="bg-white"
      />

      {/* ── Section 4: Billing & Payments ─────────────────────────────────── */}
      <FeatureGridSection
        icon={CreditCard}
        label="Billing & Payments"
        title="Get Paid, Without the Chase."
        desc="Invoices go out automatically, reminders send themselves, and you always know what's outstanding."
        items={BILLING_PAYMENTS}
        bg="bg-[#EEFCFF]"
      />

      {/* ── Section 5: Deep Dive — Teacher & Staff Management ─────────────── */}
      <DeepDive
        label="Teacher & Staff Management"
        title="Manage Your Team Like You Manage Your Students."
        desc="Leave, payroll, scheduling, and class assignments — handled without spreadsheets or WhatsApp threads."
        bullets={[
          "Teacher profiles",
          "Teacher leave management",
          "Payroll management",
          "Teacher scheduling",
          "Teacher assignment to classes",
          "Staff attendance records",
        ]}
        icon={GraduationCap}
        mockCards={[
          { icon: Calendar, text: "Leave Request — Approved", sub: "Ms. Tan · 2 days · Aug 5-6" },
          { icon: Wallet, text: "Payroll Run — July", sub: "8 staff · Processed" },
          { icon: Users, text: "Ms. Lim — 3 Classes Today", sub: "Assigned & confirmed" },
          { icon: ClipboardList, text: "Staff Attendance", sub: "7 / 8 present today" },
        ]}
        bg="bg-white"
      />

      {/* ── Section 6: Deep Dive — Tests, Quizzes & AI ────────────────────── */}
      <DeepDive
        label="Tests, Quizzes & AI"
        title="Mark Faster. Report Smarter."
        desc="From full mock tests to quick pop quizzes — AI does the marking, so teachers get their time back."
        bullets={[
          "Test paper creation",
          "AI marking for test papers",
          "Mock tests",
          "Pop quizzes",
          "Multiple quiz sections",
          "Quiz results and class reports",
          "Attendance percentage within quiz reports",
          "Export test papers or reports as PDF",
        ]}
        icon={Brain}
        mockCards={[
          { icon: FileQuestion, text: "Test Paper Uploaded", sub: "Form 3 Mathematics · 30 questions" },
          { icon: Brain, text: "AI Marking Complete", sub: "Class average 78% · 2 min" },
          { icon: ClipboardList, text: "Mock Test Scheduled", sub: "Saturday · 9:00am · 18 students" },
          { icon: BarChart3, text: "Quiz Report Ready", sub: "Attendance 94% · Export as PDF" },
        ]}
        reverse
        bg="bg-[#EEFCFF]"
      />

      {/* ── Section 7: Student Reward System ──────────────────────────────── */}
      <FeatureGridSection
        icon={Award}
        label="Student Reward System"
        title="Turn Good Behaviour Into Something Students Want."
        desc="A built-in stamp-and-reward system centres can shape around their own classroom culture."
        items={STUDENT_REWARDS}
        bg="bg-white"
      />

      {/* ── Section 8: Parent Features ─────────────────────────────────────── */}
      <FeatureGridSection
        icon={Users}
        label="Parent Features"
        title="Give Parents Visibility."
        desc="Parents get their own view into what matters most, so 'is my child okay?' stops being a phone call."
        items={PARENT_FEATURES}
        bg="bg-[#EEFCFF]"
      />

      {/* ── Section 9: Communication ───────────────────────────────────────── */}
      <FeatureGridSection
        icon={Bell}
        label="Communication"
        title="Reach Everyone, Without the Group Chats."
        desc="Announcements, reminders, and updates go out through the app — not scattered across WhatsApp groups."
        items={COMMUNICATION}
        bg="bg-white"
      />

      {/* ── Section 10: Reporting & Administration ─────────────────────────── */}
      <FeatureGridSection
        icon={BarChart3}
        label="Reporting & Administration"
        title="See How Your Centre Is Really Performing."
        desc="One dashboard for attendance, payments, class performance, and payroll — across every branch."
        items={REPORTING_ADMIN}
        bg="bg-[#EEFCFF]"
      />

      {/* ── Section 11: Coming Soon (clearly not live) ─────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <span className="uppercase tracking-wider">Coming Soon — Not Yet Live</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-500 mb-4">
              In Development. Do Not Present as Launched.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-0 relative z-10 max-w-4xl mx-auto">
            {FUTURE_ITEMS.map(({ icon: Icon, title }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 flex flex-col border border-dashed border-gray-300"
              >
                <div className="w-12 h-12 mb-3 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-500 leading-snug">{title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 12: CTA Banner (matches Features.tsx CTA) ──────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#FF8000]" />
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
            Join tuition centres and freelance tutors across Malaysia and Singapore who've ditched the spreadsheets.
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
            Get started in minutes.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
