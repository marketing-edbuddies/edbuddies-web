import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { AnimatedCheck, ctaButtonClass, MediaPlaceholder, Reveal } from "./components/feature-kit";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

export default function FeatureReporting() {
  useEffect(() => {
    setPageMeta({
      title: "Reporting & Multi-Branch — EdBuddies Features",
      description:
        "Bring operational, finance, attendance and centre information into clearer management views for one location or a growing group of branches.",
      url: "https://edbuddies.ai/features/reporting",
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
              <span className="font-semibold text-[#09244B]" aria-current="page">Reporting &amp; Multi-Branch</span>
            </nav>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                  See the whole operation, without losing the branch-level detail.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Bring operational, finance and attendance information into one clearer view, for one centre or a growing group of them.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className={ctaButtonClass}>
                    <Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <MediaPlaceholder
                  label="Multi-Branch Dashboard Screenshot"
                  aspect="aspect-[4/3]"
                  src="/assets/features/reporting/edbuddies-reporting-multi-branch-dashboard.webp"
                  className="scale-125"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scale-progression band: a distinct typographic device, not used on the other pages */}
        <section className="border-t border-slate-100 bg-[#F7FCFD] px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-lg leading-8 text-slate-600">The same system, whether you&apos;re running one location or several.</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
            <div>
              <p className="text-4xl font-bold sm:text-5xl">One centre.</p>
              <p className="mt-2 text-slate-600">Every daily record in one place.</p>
            </div>
            <ArrowRight className="h-8 w-8 shrink-0 rotate-90 text-[#0FB8F1] sm:rotate-0" aria-hidden="true" />
            <div>
              <p className="text-4xl font-bold sm:text-5xl">Many centres.</p>
              <p className="mt-2 text-slate-600">The same view, held together.</p>
            </div>
          </Reveal>
        </section>

        {/* Benefit 1: text left, media right */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">One dashboard for the information your team checks daily.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Operational dashboards bring the centre information that matters into a single view, instead of several logins and spreadsheets.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Finance and attendance visibility sit alongside it, so a manager can see the wider picture without leaving the report they started in.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <MediaPlaceholder
                label="Operational Dashboard Screenshot"
                aspect="aspect-square"
                src="/assets/features/reporting/edbuddies-reporting-operational-dashboard.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Benefit 2: media left, text right */}
        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="lg:order-2">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Branch-level detail that doesn&apos;t get lost as you grow.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Each location keeps its own clear record, so a multi-centre team can still tell exactly what&apos;s happening where.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The same reporting approach carries across every branch, so growth doesn&apos;t mean rebuilding how your team reviews the business.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:order-1">
              <MediaPlaceholder
                label="Branch Reporting Screenshot"
                aspect="aspect-square"
                src="/assets/features/reporting/edbuddies-reporting-branch-detail.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-t border-slate-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold">What this changes for management.</h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                "A clearer view across locations",
                "More consistent branch reporting",
                "Less manual consolidation for management",
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
              Built to scale with real centres, not a single-location dashboard stretched thin.
            </p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">See how reporting fits your centre.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us how many locations you run, and we&apos;ll show you the parts of EdBuddies most relevant to your team.
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
