import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { AnimatedCheck, ctaButtonClass, MediaPlaceholder, Reveal } from "./components/feature-kit";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

const statuses = [
  { word: "Paid", body: "Recorded the moment it's confirmed." },
  { word: "Pending", body: "Tracked until it's resolved." },
  { word: "Overdue", body: "Flagged so it doesn't get missed." },
];

const steps = [
  { title: "Prepare the invoice", body: "Create the student invoice using the relevant centre and fee information." },
  { title: "Track the status", body: "Keep paid, pending and outstanding records easy to review." },
  { title: "Maintain the history", body: "Keep payment activity connected to the student account." },
];

export default function FeatureBilling() {
  useEffect(() => {
    setPageMeta({
      title: "Billing & Payments — EdBuddies Features",
      description:
        "Create invoices, record payments and review outstanding balances in the same system as your student and centre information.",
      url: "https://edbuddies.ai/features/billing-payments",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://edbuddies.ai/" },
          { "@type": "ListItem", position: 2, name: "Features", item: "https://edbuddies.ai/features" },
          { "@type": "ListItem", position: 3, name: "Billing & Payments", item: "https://edbuddies.ai/features/billing-payments" },
        ],
      },
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
              <Link to="/features" className="hover:text-[#09244B]">Features</Link><span aria-hidden="true">/</span>
              <span className="font-semibold text-[#09244B]" aria-current="page">Billing &amp; Payments</span>
            </nav>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                  Payment status your team can understand at a glance.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Create invoices, record payments and track outstanding balances in the same system as your student records.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className={ctaButtonClass}>
                    <Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <MediaPlaceholder
                  label="Invoice Dashboard Screenshot"
                  aspect="aspect-[4/3]"
                  src="/assets/features/billing-payments/edbuddies-billing-payments-dashboard.webp"
                  className="scale-125"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dark status-snapshot band, placed early (not at the end) - distinct rhythm from other pages */}
        <section className="bg-[#09244B] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Every invoice sits in one of three states.</h2>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {statuses.map((status, index) => (
                <Reveal key={status.word} delay={index * 0.08} className={index > 0 ? "sm:border-l sm:border-white/15 sm:pl-8" : ""}>
                  <p className="text-4xl font-bold sm:text-5xl">{status.word}</p>
                  <p className="mt-3 text-white/65">{status.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Benefit 1: text left, media right */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">An invoice that stays linked to the student it belongs to.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Student invoicing draws on the same centre and fee information your team already has, so there&apos;s no separate spreadsheet to keep in sync.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Payments get recorded against that same invoice, so its status is always current for whoever checks next.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <MediaPlaceholder
                label="Student Invoice Screenshot"
                aspect="aspect-square"
                src="/assets/features/billing-payments/edbuddies-billing-payments-invoice.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Benefit 2: media left, text right */}
        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="lg:order-2">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Outstanding balances that don&apos;t need a separate search.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Accounts that still need attention are visible without cross-referencing a second system. Finance history stays attached to the student record for whenever it&apos;s needed again.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Management gets the same visibility, as part of the wider centre picture rather than a finance-only report.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:order-1">
              <MediaPlaceholder
                label="Outstanding Balances Screenshot"
                aspect="aspect-square"
                src="/assets/features/billing-payments/edbuddies-billing-payments-outstanding-balances.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Vertical rail timeline: distinct from the horizontal dot-timeline on Class Management */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">From fees due to payment recorded.</h2>
            </Reveal>
            <div className="relative mt-12 space-y-10 border-l border-slate-200 pl-8">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08} className="relative">
                  <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#0FB8F1]" aria-hidden="true" />
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-t border-slate-100 bg-[#F7FCFD] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold">What this changes for your finance workflow.</h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                "Clearer payment follow-up",
                "Less searching across separate finance records",
                "A more consistent billing workflow",
              ].map((outcome, index) => (
                <div key={outcome} className={`flex items-start gap-3 ${index > 0 ? "sm:border-l sm:border-slate-200 sm:pl-8" : ""}`}>
                  <AnimatedCheck delay={index * 0.15} />
                  <p className="text-lg font-semibold leading-7">{outcome}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Final CTA (no separate end trust band - the dark band already anchored the page early) */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">See how billing fits your centre.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us how invoicing works today, and we&apos;ll show you the parts of EdBuddies most relevant to your team.
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
