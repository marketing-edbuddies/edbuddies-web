import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { AnimatedCheck, ctaButtonClass, MediaPlaceholder, Reveal } from "./components/feature-kit";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

const steps = [
  { title: "Leave is requested", body: "A teacher submits a leave request from wherever they are, against their own record." },
  { title: "Owner reviews and approves", body: "Approvals happen against the same centre record — no separate form or chat thread to track down." },
  { title: "Payroll reflects it", body: "Attendance and approved leave stay connected to payroll, instead of being re-entered by hand." },
];

export default function FeaturePayrollLeave() {
  useEffect(() => {
    setPageMeta({
      title: "Payroll & Teacher Leave Management — EdBuddies Features",
      description:
        "Keep teacher leave, payroll administration and day-to-day finance connected to the same centre record — built for tuition centres and education businesses, not adapted from generic HR software.",
      url: "https://edbuddies.ai/features/payroll-leave-management",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#09244B]">
      <Navbar activePage="features" />

      <main>
        {/* Hero */}
        <section className="px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <a href="/" className="hover:text-[#09244B]">Home</a><span aria-hidden="true">/</span>
              <a href="/features-new" className="hover:text-[#09244B]">Features</a><span aria-hidden="true">/</span>
              <span className="font-semibold text-[#09244B]" aria-current="page">Payroll &amp; Teacher Leave</span>
            </nav>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                  Staff leave and payroll, without a separate system to manage.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Teacher leave, payroll administration and day-to-day finance stay connected to the same centre record as your students and classes.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className={ctaButtonClass}>
                    <a href="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></a>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <MediaPlaceholder
                  label="Staff Leave & Payroll Screenshot"
                  aspect="aspect-[4/3]"
                  src="/assets/features/payroll-leave-management/edbuddies-payroll-leave-management-staff-overview.png"
                  className="scale-125"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-slate-100 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Staff admin usually lives apart from everything else.</h2>
            </Reveal>
            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {[
                "Leave gets requested over chat, approved verbally, and never makes it into a proper record.",
                "Payroll is worked out separately from attendance, so someone has to reconcile the two by hand every cycle.",
                "The owner ends up piecing together staff costs from a mix of spreadsheets, messages and memory.",
              ].map((line, index) => (
                <Reveal key={line} delay={index * 0.06} className="py-6">
                  <p className="text-lg leading-8 text-slate-600">{line}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal dot-timeline */}
        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">From leave request to payroll, in one record.</h2>
            </Reveal>
            <div className="relative mt-16">
              <div className="absolute left-0 right-0 top-5 hidden h-px bg-slate-300 sm:block" aria-hidden="true" />
              <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
                {steps.map((step, index) => (
                  <Reveal key={step.title} delay={index * 0.1}>
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#09244B] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{step.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefit block */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Staff administration, connected to the centre it supports.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Teacher leave applications and approvals sit in the same place as attendance and class assignments, so there's one record to check instead of several.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Payroll administration stays linked to those same staff records, and day-to-day finance sits alongside it — giving centre owners a clearer view of operations without a separate admin system on the side.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <MediaPlaceholder
                label="Payroll Overview Screenshot"
                aspect="aspect-square"
                src="/assets/features/payroll-leave-management/edbuddies-payroll-leave-management-payroll-overview.png"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-t border-slate-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold">What this changes for centre owners.</h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                "Fewer separate spreadsheets for staff and payroll",
                "Leave and payroll linked to the same staff record",
                "A clearer view of staff and finance admin together",
              ].map((outcome, index) => (
                <div key={outcome} className={`flex items-start gap-3 ${index > 0 ? "sm:border-l sm:border-slate-200 sm:pl-8" : ""}`}>
                  <AnimatedCheck delay={index * 0.15} />
                  <p className="text-lg font-semibold leading-7">{outcome}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Trust statement */}
        <section className="bg-[#09244B] px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              Built for how education businesses manage staff, not a generic HR tool bolted on.
            </p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">See how staff leave and payroll fit your centre.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us how you currently handle teacher leave and payroll, and we&apos;ll show you the parts of EdBuddies most relevant to your team.
            </p>
            <Button asChild size="lg" className={`mt-8 ${ctaButtonClass}`}>
              <a href="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
