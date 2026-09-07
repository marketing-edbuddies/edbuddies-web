import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { AnimatedCheck, ctaButtonClass, MediaPlaceholder, Reveal } from "./components/feature-kit";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

export default function FeatureParentCommunication() {
  useEffect(() => {
    setPageMeta({
      title: "Parent Communication — EdBuddies Features",
      description:
        "Connect announcements, class information, homework and student updates to the right families, so communication stays timely and easy to follow.",
      url: "https://edbuddies.ai/features/parent-communication",
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
              <span className="font-semibold text-[#09244B]" aria-current="page">Parent Communication</span>
            </nav>

            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                  Keep parents in the loop, without scattering the conversation.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Connect announcements, class updates and homework to the right families, so communication stays timely and easy to follow.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className={ctaButtonClass}>
                    <Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <MediaPlaceholder
                  label="Parent App Notification Preview"
                  aspect="aspect-[4/3]"
                  src="/assets/features/parent-communication/edbuddies-parent-communication-notification.webp"
                  className="scale-125"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Before / After contrast: distinct layout family, not used on other pages */}
        <section className="border-t border-slate-100 bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Where parent updates usually break down.</h2>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-16">
              <Reveal delay={0.05}>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-400">Without a connected system</p>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Class notices go out over chat. Homework updates live somewhere else. A parent asking a simple question means checking three different places before anyone can answer.
                </p>
              </Reveal>
              <Reveal delay={0.12} className="sm:border-l sm:border-slate-200 sm:pl-16">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#09769A]">With EdBuddies</p>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Announcements, class updates and homework connect to the right student and family automatically. A parent&apos;s question has one place to be answered from.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Benefit block */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Updates that reach the right family, not just the right group chat.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Parent and teacher communication stays connected to the student it&apos;s about, so a message always has context instead of starting from scratch.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Announcements and class updates go to the relevant audience, and homework becomes visible beyond the classroom the moment it&apos;s set.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <MediaPlaceholder
                label="Class Update Screenshot"
                aspect="aspect-square"
                src="/assets/features/parent-communication/edbuddies-parent-communication-class-update.webp"
                className="scale-110"
              />
            </Reveal>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-t border-slate-100 bg-[#F7FCFD] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold">What this changes for your front office.</h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                "Less dependence on disconnected chat threads",
                "More relevant parent updates",
                "A shared source of student information",
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
              Built for how parents and centres actually talk, not a broadcast tool with no context.
            </p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">See how parent communication fits your centre.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us how you currently reach parents, and we&apos;ll show you the parts of EdBuddies most relevant to your team.
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
