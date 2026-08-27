import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { AnimatedCheck, ctaButtonClass, MediaPlaceholder, Reveal } from "./components/feature-kit";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

const steps = [
  { title: "Plan the class", body: "Set the schedule, assign the teacher and connect the right student group." },
  { title: "Run the session", body: "Record attendance and keep lesson information close to the class." },
  { title: "Follow progress", body: "Maintain homework and student progress after the lesson ends." },
];

export default function FeatureClassManagement() {
  useEffect(() => {
    setPageMeta({
      title: "Classes & Student Management — EdBuddies Features",
      description:
        "Bring schedules, teachers, attendance, homework and progress together so the whole team works from the same class record.",
      url: "https://edbuddies.ai/features/class-management",
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
              <Link to="/" className="hover:text-[#09244B]">Home</Link><span aria-hidden="true">/</span>
              <Link to="/features-new" className="hover:text-[#09244B]">Features</Link><span aria-hidden="true">/</span>
              <span className="font-semibold text-[#09244B]" aria-current="page">Classes &amp; Student Management</span>
            </nav>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                  Every class, organised before the lesson even starts.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Bring schedules, teachers, attendance and homework together, so the whole team works from the same class record.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className={ctaButtonClass}>
                    <Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <MediaPlaceholder
                  label="Class Schedule Screenshot"
                  aspect="aspect-[4/3]"
                  src="/assets/features/class-management/edbuddies-class-management-schedule.webp"
                  className="scale-125"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem: plain list, white background (varies from Enrolment's tinted version) */}
        <section className="border-t border-slate-100 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">A class shouldn&apos;t run on five different spreadsheets.</h2>
            </Reveal>
            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {[
                "The timetable lives in one place, attendance in another, and homework somewhere else entirely.",
                "A teacher swap means updating the schedule, then telling everyone by hand.",
                "By the time a report is needed, nobody remembers which version was current.",
              ].map((line, index) => (
                <Reveal key={line} delay={index * 0.06} className="py-6">
                  <p className="text-lg leading-8 text-slate-600">{line}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal dot-timeline: distinct structural device from Enrolment's numbered columns */}
        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">One connected class cycle.</h2>
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

        {/* Single benefit block */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Teachers and staff, connected to the classes they run.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Every class carries its own teacher assignment, attendance record and homework activity, so a teacher can see exactly what a class needs without asking around.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Staff administration runs alongside it. Teacher attendance, <Link to="/features/payroll-leave-management" className="font-semibold text-[#08718C] underline decoration-[#08718C]/30 underline-offset-2 hover:text-[#09244B]">leave and payroll</Link> stay part of the same centre record instead of a separate system to check.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <MediaPlaceholder
                label="Class Roster Screenshot"
                aspect="aspect-square"
                src="/assets/features/class-management/edbuddies-class-management-roster.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-t border-slate-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold">What this changes for your teaching team.</h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                "Fewer timetable misunderstandings",
                "Up-to-date class information",
                "Better continuity between teachers and administrators",
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
              Built around how a class actually runs, not a generic calendar with extra steps.
            </p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">See how class management fits your centre.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us how your timetable works today, and we&apos;ll show you the parts of EdBuddies most relevant to your team.
            </p>
            <Button asChild size="lg" className={`mt-8 ${ctaButtonClass}`}>
              <Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
