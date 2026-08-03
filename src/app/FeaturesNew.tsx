import { useEffect, type ElementType } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MessageSquare,
  ReceiptText,
  School,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "./components/ui/button";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

// Internal draft route. The live /features page is intentionally untouched.

type Pillar = {
  id: string;
  href: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ElementType;
  bullets: string[];
  previewTitle: string;
  previewMetric: string;
  previewRows: { label: string; value: string; status?: string }[];
};

type DirectoryGroup = {
  title: string;
  icon: ElementType;
  items: { title: string; description: string }[];
};

const pillars: Pillar[] = [
  {
    id: "enrolment",
    href: "/features/enrolment",
    navLabel: "Enrolment",
    eyebrow: "Enrolment & admissions",
    title: "Turn every enquiry into an organised next step.",
    description:
      "Keep prospective students, registrations and student records together so your team can move from first enquiry to confirmed class without losing context.",
    icon: UserPlus,
    bullets: [
      "Centralised student and parent profiles",
      "Clear registration and enrolment records",
      "Class placement with less duplicate entry",
      "One history your admin team can follow",
    ],
    previewTitle: "Admissions overview",
    previewMetric: "12 active applications",
    previewRows: [
      { label: "New enquiries", value: "5", status: "Today" },
      { label: "Pending registration", value: "4", status: "Follow up" },
      { label: "Ready for class", value: "3", status: "Complete" },
    ],
  },
  {
    id: "class-management",
    href: "/features/class-management",
    navLabel: "Classes",
    eyebrow: "Classes & student management",
    title: "Keep classes running smoothly from timetable to attendance.",
    description:
      "Give teachers and administrators the same view of class schedules, attendance, homework and student progress—without passing spreadsheets back and forth.",
    icon: CalendarDays,
    bullets: [
      "Class scheduling and student assignment",
      "Fast attendance tracking for every session",
      "Homework and student progress records",
      "Teacher schedules and class assignments",
    ],
    previewTitle: "Today’s classes",
    previewMetric: "8 sessions scheduled",
    previewRows: [
      { label: "Primary Mathematics", value: "16 students", status: "4:00 PM" },
      { label: "English Writing", value: "12 students", status: "5:30 PM" },
      { label: "Science Workshop", value: "10 students", status: "7:00 PM" },
    ],
  },
  {
    id: "payroll-leave-management",
    href: "/features/payroll-leave-management",
    navLabel: "Payroll & Leave",
    eyebrow: "Payroll & teacher leave",
    title: "Staff leave and payroll, without a separate system to manage.",
    description:
      "Keep teacher leave applications, approvals and payroll administration connected to the same centre record as attendance and classes, instead of a separate spreadsheet or system.",
    icon: Wallet,
    bullets: [
      "Teacher leave applications and approvals",
      "Payroll administration linked to staff records",
      "Staff attendance connected to the same record",
      "Finance and daily administration in one view",
    ],
    previewTitle: "Staff admin overview",
    previewMetric: "6 staff records connected",
    previewRows: [
      { label: "Leave requests", value: "2 pending", status: "Review" },
      { label: "Approved leave", value: "1 this week", status: "Recorded" },
      { label: "Payroll cycle", value: "Linked to attendance", status: "Up to date" },
    ],
  },
  {
    id: "billing-payments",
    href: "/features/billing-payments",
    navLabel: "Billing",
    eyebrow: "Billing & payments",
    title: "Know what has been billed, paid and still needs attention.",
    description:
      "Manage invoices and payment records alongside the students and classes they belong to, giving your team a clearer path from fees due to payments received.",
    icon: CreditCard,
    bullets: [
      "Create and manage student invoices",
      "Track payment status and outstanding balances",
      "Keep fee records connected to each student",
      "Support finance and day-to-day administration",
    ],
    previewTitle: "Payment summary",
    previewMetric: "RM 28,450 recorded",
    previewRows: [
      { label: "Paid", value: "RM 21,800", status: "Recorded" },
      { label: "Pending", value: "RM 5,100", status: "Due" },
      { label: "Overdue", value: "RM 1,550", status: "Review" },
    ],
  },
  {
    id: "parent-communication",
    href: "/features/parent-communication",
    navLabel: "Communication",
    eyebrow: "Parent communication",
    title: "Give parents the updates they need, in context.",
    description:
      "Keep announcements, class information and student-related updates connected to the right people, so communication stays timely and easier to understand.",
    icon: MessageSquare,
    bullets: [
      "Parent and teacher communication tools",
      "Announcements and class updates",
      "Student information available on mobile",
      "Less dependence on scattered chat threads",
    ],
    previewTitle: "Communication centre",
    previewMetric: "3 updates ready",
    previewRows: [
      { label: "Class reminder", value: "Primary 4", status: "Sent" },
      { label: "Homework update", value: "English", status: "Delivered" },
      { label: "Centre notice", value: "All parents", status: "Draft" },
    ],
  },
  {
    id: "reporting",
    href: "/features/reporting",
    navLabel: "Reporting",
    eyebrow: "Reporting & multi-centre",
    title: "See the bigger picture without losing branch-level detail.",
    description:
      "Bring key operational and finance information into a clearer management view, whether you oversee one education centre or several locations.",
    icon: BarChart3,
    bullets: [
      "Operational dashboards and reporting",
      "Finance and administrative visibility",
      "Centre-by-centre records and oversight",
      "A consistent system as your business grows",
    ],
    previewTitle: "Centre overview",
    previewMetric: "4 locations connected",
    previewRows: [
      { label: "Central branch", value: "286 students", status: "Active" },
      { label: "North branch", value: "194 students", status: "Active" },
      { label: "South branch", value: "148 students", status: "Active" },
    ],
  },
];

const directoryGroups: DirectoryGroup[] = [
  {
    title: "Students & enrolment",
    icon: GraduationCap,
    items: [
      { title: "Student profiles", description: "Keep contact details, class history and student information in one record." },
      { title: "Parent records", description: "Connect parents and guardians with the students they manage." },
      { title: "Enrolment records", description: "Organise registration details and class placement." },
      { title: "Student rewards", description: "Support student engagement with rewards and recognition records." },
    ],
  },
  {
    title: "Classes & learning",
    icon: CalendarDays,
    items: [
      { title: "Class scheduling", description: "Plan class times, teachers and student groups." },
      { title: "Attendance", description: "Record and review attendance for each class session." },
      { title: "Homework", description: "Create and follow student homework activities." },
      { title: "Progress records", description: "Keep learning progress visible to the right people." },
    ],
  },
  {
    title: "Teachers & operations",
    icon: UserCheck,
    items: [
      { title: "Teacher profiles", description: "Manage teacher information and class responsibilities." },
      { title: "Staff attendance", description: "Maintain clear attendance and working records." },
      { title: "Leave management", description: "Track staff leave applications and approvals." },
      { title: "Payroll administration", description: "Keep payroll work connected to your staff records." },
    ],
  },
  {
    title: "Finance & communication",
    icon: ReceiptText,
    items: [
      { title: "Invoices", description: "Create and manage invoices against student accounts." },
      { title: "Payment tracking", description: "See paid, pending and outstanding payment records." },
      { title: "Parent communication", description: "Share relevant centre and student updates." },
      { title: "Reports", description: "Review centre operations and finance from a clearer dashboard." },
    ],
  },
];

const audiences = [
  { icon: School, title: "Tuition centres", description: "Coordinate recurring classes, teachers, fees and parent updates." },
  { icon: Sparkles, title: "Enrichment centres", description: "Manage programmes, student groups and changing schedules in one place." },
  { icon: Building2, title: "Schools", description: "Connect essential student, teacher and administrative workflows." },
  { icon: GraduationCap, title: "Freelance tutors", description: "Stay organised as your student list and teaching schedule grow." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductPreview({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;

  return (
    <div className="relative rounded-[2rem] bg-[#09244B] p-3 shadow-[0_28px_80px_rgba(9,36,75,0.20)] sm:p-5">
      <div className="overflow-hidden rounded-[1.35rem] bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1E6] text-[#FF8000]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">EdBuddies</p>
              <p className="font-semibold text-[#09244B]">{pillar.previewTitle}</p>
            </div>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-[#FF8000]" />
          </div>
        </div>
        <div className="bg-[#F8FCFD] p-5 sm:p-7">
          <div className="mb-5 rounded-2xl bg-[#EEFCFF] p-5">
            <p className="text-sm text-slate-500">Current overview</p>
            <p className="mt-1 text-2xl font-bold text-[#09244B]">{pillar.previewMetric}</p>
          </div>
          <div className="space-y-3">
            {pillar.previewRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-slate-100 bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-[#09244B]">{row.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{row.value}</p>
                </div>
                <span className="rounded-full bg-[#FFF1E6] px-2.5 py-1 text-[11px] font-semibold text-[#D96900]">{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;
  const reverse = index % 2 === 1;

  return (
    <section id={pillar.id} className={`scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-28 ${index % 2 === 1 ? "bg-[#F7FCFD]" : "bg-white"}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FFF1E6] px-4 py-2 text-sm font-semibold text-[#B95700]">
            <Icon className="h-4 w-4" />
            {pillar.eyebrow}
          </div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#09244B] sm:text-4xl lg:text-5xl">{pillar.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{pillar.description}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillar.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEFCFF] text-[#08718C]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <a href={pillar.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-[#B95700] hover:text-[#8D4300]">
            View full feature page <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Reveal delay={0.08} className={reverse ? "lg:order-1" : ""}>
          <ProductPreview pillar={pillar} />
        </Reveal>
      </div>
    </section>
  );
}

export default function FeaturesNew() {
  useEffect(() => {
    setPageMeta({
      title: "Features — EdBuddies Education Centre Management Platform",
      description: "Explore EdBuddies features for enrolment, classes, teachers, billing, parent communication and centre reporting.",
      url: "https://edbuddies.ai/features-new",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#09244B]">
      <Navbar activePage="features" />

      <main>
        <section className="relative overflow-hidden bg-[#F7FCFD] px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-[#FF8000]/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#8CE5F2]/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF8000]/20 bg-white px-4 py-2 text-sm font-semibold text-[#B95700] shadow-sm">
                <LayoutDashboard className="h-4 w-4" />
                One connected centre-management platform
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#09244B] sm:text-5xl lg:text-6xl">
                Run every part of your education centre from one place.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Bring enrolment, classes, teachers, billing, parent updates and reporting into one operating view—so your team can spend less time piecing information together.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-xl bg-[#FF8000] px-7 text-base text-white shadow-[0_12px_30px_rgba(255,128,0,0.28)] hover:bg-[#E87300]">
                  <a href="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-[#09244B]/15 bg-white px-7 text-base text-[#09244B] hover:bg-[#EEFCFF]">
                  <a href="#capabilities">Explore capabilities <ChevronDown className="h-4 w-4" /></a>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute inset-x-6 bottom-0 h-24 rounded-full bg-[#09244B]/15 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_30px_90px_rgba(9,36,75,0.18)] backdrop-blur sm:p-8">
                <img
                  src="/assets/hero%20mockup/second-screen.png"
                  alt="EdBuddies centre dashboard shown on a mobile device"
                  className="mx-auto max-h-[560px] w-auto object-contain"
                />
              </div>
            </motion.div>
          </div>

          <div className="relative mx-auto mt-16 grid max-w-6xl gap-3 border-t border-[#09244B]/10 pt-8 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, text: "Built for education businesses" },
              { icon: Building2, text: "For single and multi-centre teams" },
              { icon: Smartphone, text: "Available on iOS and Android" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-[#09244B]">
                <Icon className="h-5 w-5 text-[#FF8000]" />
                {text}
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="Feature categories" className="sticky top-16 z-30 border-y border-slate-100 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {pillars.map((pillar) => (
              <a key={pillar.id} href={pillar.href} className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-[#EEFCFF] hover:text-[#09244B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8000]">
                {pillar.navLabel}
              </a>
            ))}
            <a href="/features/ai" className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-[#FFF1E6] hover:text-[#09244B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8000]">AI direction</a>
          </div>
        </nav>

        <section id="capabilities" className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D96900]">Connected capabilities</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#09244B] sm:text-5xl">One system across the entire centre journey.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Start with the work your team handles every day, then connect each workflow as your centre grows.</p>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={pillar.id} delay={(index % 3) * 0.06}>
                    <a href={pillar.href} className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(9,36,75,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#FF8000]/30 hover:shadow-[0_18px_45px_rgba(9,36,75,0.12)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEFCFF] text-[#08718C] transition group-hover:bg-[#FF8000] group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-[#09244B]">{pillar.eyebrow}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B95700]">View feature page <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {pillars.map((pillar, index) => <PillarSection key={pillar.id} pillar={pillar} index={index} />)}

        <section id="ai" className="scroll-mt-32 bg-[#09244B] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#9DE9F3]">
                <Sparkles className="h-4 w-4" />
                Product direction
              </div>
              <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-5xl">EdBuddies AI is being shaped around practical teacher workload.</h2>
              <p className="mt-6 text-lg leading-8 text-white/70">AI-assisted test-paper marking is part of the EdBuddies product direction, designed to help teachers spend less time on repetitive marking work and more time supporting students.</p>
              <p className="mt-5 rounded-xl border border-[#FFB46B]/25 bg-[#FF8000]/10 p-4 text-sm leading-6 text-[#FFD4AD]">Availability is to be confirmed. Contact our team if you would like to discuss this product direction.</p>
              <Button asChild variant="outline" size="lg" className="mt-8 h-12 rounded-xl border-white/25 bg-transparent px-7 text-white hover:bg-white hover:text-[#09244B]">
                <a href="/features/ai">Explore EdBuddies AI <ArrowRight className="h-4 w-4" /></a>
              </Button>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-8">
                <div className="rounded-2xl bg-white p-6 text-[#09244B]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E6] text-[#FF8000]"><FileCheck2 className="h-6 w-6" /></div>
                      <div><p className="font-bold">Test-paper marking</p><p className="text-xs text-slate-500">AI-assisted workflow concept</p></div>
                    </div>
                    <span className="rounded-full bg-[#EEFCFF] px-3 py-1 text-xs font-semibold text-[#08718C]">Direction</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {["Review submitted answers", "Assist with marking", "Keep teacher oversight"].map((text, index) => (
                      <div key={text} className="flex items-center gap-4 rounded-xl bg-[#F8FCFD] p-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#09244B] text-sm font-bold text-white">{index + 1}</span>
                        <span className="font-semibold">{text}</span>
                        <CheckCircle2 className="ml-auto h-5 w-5 text-[#FF8000]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D96900]">Built around your operation</p>
              <h2 className="mt-4 text-3xl font-bold text-[#09244B] sm:text-5xl">A clearer starting point for every education business.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">The same connected platform can support different teaching models without forcing every centre into the same workflow.</p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map(({ icon: Icon, title, description }, index) => (
                <Reveal key={title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <Icon className="h-7 w-7 text-[#FF8000]" />
                    <h3 className="mt-5 text-lg font-bold text-[#09244B]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D96900]">Feature directory</p>
              <h2 className="mt-4 text-3xl font-bold text-[#09244B] sm:text-5xl">Explore the full toolkit.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">The overview stays easy to scan, while the detailed capabilities remain available when you need them.</p>
            </Reveal>
            <div className="mt-12 space-y-4">
              {directoryGroups.map(({ title, icon: Icon, items }, index) => (
                <Reveal key={title} delay={index * 0.04}>
                  <details className="group rounded-2xl border border-slate-200 bg-white open:shadow-[0_16px_45px_rgba(9,36,75,0.08)]">
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEFCFF] text-[#08718C]"><Icon className="h-5 w-5" /></span>
                      <span className="text-left text-lg font-bold text-[#09244B] sm:text-xl">{title}</span>
                      <ChevronDown className="ml-auto h-5 w-5 text-slate-400 transition group-open:rotate-180" />
                    </summary>
                    <div className="grid gap-5 border-t border-slate-100 p-5 sm:grid-cols-2 sm:p-6">
                      {items.map((item) => (
                        <div key={item.title} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8000]" />
                          <div><h3 className="font-semibold text-[#09244B]">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p></div>
                        </div>
                      ))}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#EEFCFF] px-6 py-14 text-center sm:px-10 lg:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF8000] text-white shadow-[0_12px_30px_rgba(255,128,0,0.28)]"><Mail className="h-7 w-7" /></div>
            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-bold text-[#09244B] sm:text-5xl">See how EdBuddies fits your centre.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Tell us how your team works today. We’ll help you explore the features that are most relevant to your operation.</p>
            <Button asChild size="lg" className="mt-8 h-12 rounded-xl bg-[#FF8000] px-7 text-base text-white hover:bg-[#E87300]">
              <a href="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
