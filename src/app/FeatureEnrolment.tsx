import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { AnimatedCheck, ctaButtonClass, MediaPlaceholder, Reveal } from "./components/feature-kit";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

export default function FeatureEnrolment() {
  useEffect(() => {
    setPageMeta({
      title: "Enrolment & Admissions — EdBuddies Features",
      description:
        "Keep enquiries, registration, parent details and class placement in one connected student record, from first enquiry to confirmed class.",
      url: "https://edbuddies.ai/features/enrolment",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#09244B]">
      <Navbar activePage="features" />

      <main>
        {/* Hero */}
        <section className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-[#09244B]">Home</Link><span aria-hidden="true">/</span>
              <Link to="/features-new" className="hover:text-[#09244B]">Features</Link><span aria-hidden="true">/</span>
              <span className="font-semibold text-[#09244B]" aria-current="page">Enrolment &amp; Admissions</span>
            </nav>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                  A clearer path from first enquiry to a confirmed class.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Keep enquiries, registration and class placement in one student record, so your admin team always knows the next step.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className={ctaButtonClass}>
                    <Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.35 }}
              >
                <MediaPlaceholder
                  label="Enrolment Dashboard Screenshot"
                  aspect="aspect-[4/3]"
                  src="/assets/features/enrolment/edbuddies-enrolment-dashboard.webp"
                  className="scale-150"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-slate-100 bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Enrolment shouldn&apos;t mean re-entering the same student twice.</h2>
            </Reveal>
            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {[
                "A new enquiry arrives in one place, then gets rebuilt somewhere else for registration.",
                "Parent and guardian details get copied by hand between spreadsheets and messages.",
                "By the time a student reaches a class, nobody is quite sure what's actually confirmed.",
              ].map((line, index) => (
                <Reveal key={line} delay={index * 0.06} className="py-6">
                  <p className="text-lg leading-8 text-slate-600">{line}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Benefit 1: text left, media right */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">One record for the student, and the people responsible for them.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Every student keeps one profile: contact details, class history and the records your team already gathers today. Parents and guardians connect directly to the students they manage, so a follow-up call or message always has the full picture.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Nothing gets rebuilt at the next stage. The same record carries forward instead of duplicating information across separate tools.
              </p>
            </Reveal>
            <Reveal delay={0.3} energetic>
              <MediaPlaceholder
                label="Student Profile Screenshot"
                aspect="aspect-square"
                src="/assets/features/enrolment/edbuddies-enrolment-student-profile.webp"
                className="scale-125"
              />
            </Reveal>
          </div>
        </section>

        {/* Benefit 2: media left, text right */}
        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="lg:order-2">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Registration that leads somewhere, not into a filing cabinet.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Registration details stay attached to the student from the first form onward, so administrators can see exactly what&apos;s been completed and what&apos;s still open.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Once a student is confirmed, placing them into the right class and schedule is simply the next visible step, not a separate task someone has to remember.
              </p>
            </Reveal>
            <Reveal delay={0.3} energetic className="lg:order-1">
              <MediaPlaceholder
                label="Class Placement Screenshot"
                aspect="aspect-square"
                src="/assets/features/enrolment/edbuddies-enrolment-class-placement.webp"
                className="scale-125"
              />
            </Reveal>
          </div>
        </section>

        {/* How it works: full-width, breaks the alternating pattern */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">The path from enquiry to class, in three steps.</h2>
            </Reveal>
            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {[
                { n: "01", title: "Capture the student", body: "Start one record with the contact and guardian details your team needs." },
                { n: "02", title: "Complete registration", body: "Keep enrolment details together so the next action is always visible." },
                { n: "03", title: "Place the student", body: "Connect the confirmed student to the right class and ongoing record." },
              ].map((step, index) => (
                <Reveal key={step.n} delay={index * 0.08} className="border-t border-slate-200 pt-6 sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0 first:border-l-0 first:pl-0">
                  <p className="text-sm font-bold text-[#FF8000]">{step.n}</p>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{step.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4} energetic className="mt-14">
              <MediaPlaceholder
                label="Enrolment Workflow Preview"
                aspect="aspect-[8/5]"
                src="/assets/features/enrolment/edbuddies-enrolment-workflow.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Outcomes: plain inline row, no cards */}
        <section className="border-t border-slate-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold">What this changes for your admin team.</h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                "Less duplicate data entry",
                "Clearer follow-up across the admin team",
                "One record that continues after enrolment",
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
              Built for education businesses running real admissions, not a generic form builder with a login screen.
            </p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">See how enrolment fits your centre.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us how registration works today, and we&apos;ll show you the parts of EdBuddies most relevant to your team.
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
