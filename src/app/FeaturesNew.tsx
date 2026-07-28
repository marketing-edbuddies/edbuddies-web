import { motion } from "motion/react";
import { Button } from "./components/ui/button";
import {
  ArrowRight, CheckCircle2, Building2, ClipboardList, CreditCard,
  GraduationCap, Award, Brain, UserCheck, Bell, BarChart3, Sparkles,
  Check,
} from "lucide-react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { setPageMeta } from "./seo";

// ─── Data ────────────────────────────────────────────────────────────────────
// DRAFT PAGE — internal review only. Not linked in Navbar/Footer/sitemap.

interface Category {
  icon: React.ElementType;
  label: string;
  title: string;
  desc: string;
  items: string[];
  bg?: string;
}

const CATEGORIES: Category[] = [
  {
    icon: Building2,
    label: "Centre Management",
    title: "Run every part of your centre from one place.",
    desc: "From enrolling a new student to managing multiple branches, the day-to-day admin work lives in one app.",
    items: [
      "Student registration and enrolment",
      "Student profiles",
      "Parent profiles",
      "Teacher profiles",
      "Class creation and management",
      "Timetable and class scheduling",
      "Multi-centre management",
      "Centre reports and admin analytics",
      "Announcements and centre updates",
    ],
    bg: "bg-white",
  },
  {
    icon: ClipboardList,
    label: "Attendance & Student Progress",
    title: "Track attendance and progress, not just names on a register.",
    desc: "See who showed up, how they're doing, and what teachers are noticing — all in one history per student.",
    items: [
      "Student attendance tracking",
      "Teacher attendance tracking",
      "Student progress records",
      "Teacher remarks and feedback",
      "Attendance summaries",
      "Class performance reports",
      "Student lesson history",
      "Learning materials and homework records",
    ],
    bg: "bg-[#EEFCFF]",
  },
  {
    icon: CreditCard,
    label: "Billing & Payments",
    title: "Get paid on time, without the manual chasing.",
    desc: "Invoices go out automatically, reminders send themselves, and you always know what's outstanding.",
    items: [
      "Invoice creation",
      "Recurring invoices",
      "Payment tracking",
      "Outstanding and overdue payment tracking",
      "Automated payment reminders",
      "Invoice breakdown and payment history",
      "Payment gateway support",
      "Local currency support based on centre country",
    ],
    bg: "bg-white",
  },
  {
    icon: GraduationCap,
    label: "Teacher & Staff Management",
    title: "Manage your team the way you manage your students.",
    desc: "Leave, payroll, scheduling, and class assignments — handled without spreadsheets or WhatsApp threads.",
    items: [
      "Teacher profiles",
      "Teacher leave management",
      "Payroll management",
      "Teacher scheduling",
      "Teacher assignment to classes",
      "Staff attendance records",
    ],
    bg: "bg-[#EEFCFF]",
  },
  {
    icon: Award,
    label: "Student Reward System",
    title: "Turn good behaviour into something students look forward to.",
    desc: "A built-in stamp-and-reward system centres can shape around their own classroom culture.",
    items: [
      "Teachers can award stamps for good behaviour",
      "Students collect stamps over time",
      "Centres can create different rewards or gifts",
      "Students can redeem rewards after collecting enough stamps",
      "Reward balance and redemption tracking",
    ],
    bg: "bg-white",
  },
  {
    icon: Brain,
    label: "Tests, Quizzes & AI",
    title: "Set, mark, and report on assessments — faster.",
    desc: "From full mock tests to quick pop quizzes, with AI doing the marking so teachers don't have to.",
    items: [
      "Test paper creation",
      "AI marking for test papers",
      "Mock tests",
      "Pop quizzes",
      "Multiple quiz sections",
      "Quiz results and class reports",
      "Attendance percentage within quiz reports",
      "Export test papers or reports as PDF",
    ],
    bg: "bg-[#EEFCFF]",
  },
  {
    icon: UserCheck,
    label: "Parent Features",
    title: "Give parents visibility, without extra work for your team.",
    desc: "Parents get their own view into what matters most, so 'is my child okay?' stops being a phone call.",
    items: [
      "View child profiles",
      "View attendance summaries",
      "View recent progress and teacher remarks",
      "View upcoming and overdue payments",
      "View invoices and payment history",
      "Access learning materials",
      "Receive centre announcements and updates",
    ],
    bg: "bg-white",
  },
  {
    icon: Bell,
    label: "Communication",
    title: "Reach parents and staff without juggling group chats.",
    desc: "Announcements, reminders, and updates go out through the app — not scattered across WhatsApp groups.",
    items: [
      "Centre announcements",
      "Student and parent notifications",
      "Invoice and payment reminders",
      "Class-related updates",
      "Push notifications",
      "Email notifications",
    ],
    bg: "bg-[#EEFCFF]",
  },
  {
    icon: BarChart3,
    label: "Reporting & Administration",
    title: "See how your centre is really performing.",
    desc: "One dashboard for attendance, payments, class performance, and payroll — across every branch.",
    items: [
      "Centre performance dashboard",
      "Student attendance reports",
      "Payment and invoice reports",
      "Class performance reports",
      "Teacher and payroll records",
      "Multi-centre overview",
      "Administrative analytics",
    ],
    bg: "bg-white",
  },
];

const FUTURE_ITEMS = [
  "AI-generated past-year mock tests",
  "AI tutor and student matching",
  "MOE learning resources",
  "Homework and materials download",
  "In-app chat",
  "Education marketplace features",
];

// ─── Category Section ───────────────────────────────────────────────────────

function CategorySection({ icon: Icon, label, title, desc, items, bg = "bg-white" }: Category) {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${bg}`}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Icon className="w-4 h-4 text-[#FF8000]" />
            <span className="uppercase tracking-wider font-medium">{label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#09244B] leading-tight mb-3 max-w-2xl">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">{desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#fff0e6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#FF8000]" />
              </div>
              <span className="text-gray-700">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
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
            More Ways EdBuddies<br className="hidden sm:block" />
            <span className="text-[#FF8000]">Runs Your Centre.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Beyond attendance and billing — centre management, staff and payroll,
            rewards, AI-marked assessments, and a parent-facing view, all in one app.
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

      {/* ── Category Sections ─────────────────────────────────────────────── */}
      {CATEGORIES.map((cat) => (
        <CategorySection key={cat.label} {...cat} />
      ))}

      {/* ── Coming Soon ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <span className="uppercase tracking-wider font-medium">Coming Soon — Not Yet Live</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-500 leading-tight max-w-2xl mx-auto">
              In active development. Do not present as launched.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
            {FUTURE_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-gray-500">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
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
            className="text-4xl sm:text-5xl font-bold text-[#09244B] mb-6"
          >
            Your Centre, Fully Managed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-xl text-gray-600 leading-relaxed mb-10"
          >
            Talk to us about which features matter most for your centre.
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
