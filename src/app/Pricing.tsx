import { motion } from "motion/react";
import { Button } from "./components/ui/button";
import {
  ArrowRight, Check,
  ChevronDown, CheckCircle2, Users, ClipboardList, CreditCard,
  MessageSquare, Calendar, BarChart, BookOpen, Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";
import { SHOW_FREE_MESSAGING } from "./flags";
import Footer from "./Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: ClipboardList, label: "Student attendance tracking" },
  { icon: CreditCard,    label: "Automated invoicing and billing" },
  { icon: MessageSquare, label: "Parent communication" },
  { icon: Calendar,      label: "Class and timetable scheduling" },
  { icon: BarChart,      label: "Finance and payments overview" },
  { icon: Users,         label: "Teacher management" },
  { icon: BookOpen,      label: "Homework workflows" },
  { icon: Settings,      label: "Daily admin tools" },
];

const FAQS = [
  {
    q: "Is EdBuddies really free?",
    a: "Yes, completely. No subscription fee, no per-student charge, no setup fee. Free to download, free to use, free forever. We mean it.",
  },
  {
    q: "Why is it free?",
    a: "We believe every centre — big or small — deserves great tools. Our mission is to make running an education business easier and more accessible. We are building a platform we are proud of, and free is how we grow.",
  },
  {
    q: "Will it stay free?",
    a: "Yes. The core platform is free forever. We may introduce optional premium features in the future, but everything available today will always remain free.",
  },
  {
    q: "Are there any hidden fees?",
    a: "None. No student commission, no transaction fee, no monthly cap, no feature paywalls. What you see is what you get.",
  },
  {
    q: "What is included in the free plan?",
    a: "Everything. Attendance tracking, invoicing, billing, parent communication, class scheduling, teacher management, homework workflows, finance overview, and daily admin tools. All free, all in one app.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setPageMeta({
      title: SHOW_FREE_MESSAGING ? "Pricing — EdBuddies | Free Forever, No Hidden Fees" : "Pricing — EdBuddies | Centre Management App",
      description: SHOW_FREE_MESSAGING ? "EdBuddies is 100% free. No subscription, no per-student fee, no hidden charges. Everything your tuition centre needs at RM 0 per month." : "Everything your tuition centre needs to manage attendance, billing, and parent communication — in one app.",
      url: "https://edbuddies.ai/pricing",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="pricing" />

      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#FF8000]" />
            <span className="uppercase tracking-wider font-medium">Pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 220, damping: 22 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#09244B] leading-tight mb-6"
          >
            {SHOW_FREE_MESSAGING ? (
              <>The only centre management app<br className="hidden sm:block" />that is <span className="text-[#FF8000]">actually free.</span></>
            ) : (
              <>The centre management app<br className="hidden sm:block" />built for <span className="text-[#FF8000]">education.</span></>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            {SHOW_FREE_MESSAGING
              ? "No subscription. No per-student fee. No hidden charges. Everything your centre needs at RM 0 per month, forever."
              : "Attendance, billing, invoicing, parent communication, class scheduling — everything your centre needs to run smoothly, in one place."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="inline-flex">
              <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#09244B] text-white px-8 py-6 text-base gap-2 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(9,36,75,0.30)] hover:bg-[#0d3570]">
                  Enquire Now <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Free Plan Card ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span className="uppercase tracking-wider">What is included</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09244B]">
              {SHOW_FREE_MESSAGING ? "One plan. Everything included." : "One app. Everything included."}
            </h2>
          </motion.div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 200, damping: 26 }}
            className="bg-white rounded-3xl p-8 sm:p-10"
            style={{ boxShadow: "0 8px 40px rgba(9,36,75,0.12)" }}
          >
            {/* Price header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">EdBuddies</p>
                {SHOW_FREE_MESSAGING && (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-[#09244B]">RM 0</span>
                      <span className="text-gray-500 text-lg">/ month</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Free forever. No credit card required.</p>
                  </>
                )}
              </div>
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ y: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#09244B] text-white px-8 py-5 text-base gap-2 transition-colors duration-200 hover:shadow-[0_10px_32px_rgba(9,36,75,0.35)] hover:bg-[#0d3570] whitespace-nowrap" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 14px rgba(9,36,75,0.22)" }}>
                    {SHOW_FREE_MESSAGING ? "Get Started Free" : "Get Started"} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#fff0e6] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#FF8000]" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{label}</span>
                  <Check className="w-4 h-4 text-[#FF8000] ml-auto flex-shrink-0" />
                </motion.div>
              ))}
            </div>

            {/* No-catch reassurance strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 pt-8 border-t border-gray-100"
            >
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                {(SHOW_FREE_MESSAGING ? [
                  "No subscription fee",
                  "No per-student commission",
                  "No setup fee",
                  "No feature paywalls",
                  "No contract",
                ] : []).map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.07 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-[#FF8000]" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: FAQ ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#09244B]">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 1px 3px rgba(9,36,75,0.08)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#FF8000]" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: CTA ────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
            {SHOW_FREE_MESSAGING ? (
              <>Start free today.<br className="hidden sm:block" /> Stay free forever.</>
            ) : (
              <>Run your whole centre<br className="hidden sm:block" /> from one app.</>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-xl text-gray-600 mb-10"
          >
            {SHOW_FREE_MESSAGING
              ? "Download EdBuddies and run your centre without spending a single ringgit on software."
              : "Download EdBuddies and manage your centre from a single app — attendance, billing, parent comms, and more."}
          </motion.p>

          {/* App Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
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
                  <rect width="24" height="24" rx="5.5" fill="url(#appleGradP)"/>
                  <defs>
                    <linearGradient id="appleGradP" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
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
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-gray-400 mt-8"
          >
            {SHOW_FREE_MESSAGING ? "No credit card. No commitment. No monthly fees." : "Get started in minutes."}
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
