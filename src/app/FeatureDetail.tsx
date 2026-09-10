import { useEffect, type ElementType } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  MessageSquare,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Button } from "./components/ui/button";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { setPageMeta } from "./seo";

type Capability = {
  icon: ElementType;
  title: string;
  description: string;
};

type FeaturePage = {
  slug: string;
  shortTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ElementType;
  direction?: boolean;
  workflowTitle: string;
  workflow: { step: string; title: string; description: string }[];
  capabilities: Capability[];
  outcomes: string[];
};

const featurePages: Record<string, FeaturePage> = {
  ai: {
    slug: "ai",
    shortTitle: "EdBuddies AI",
    eyebrow: "Product direction",
    title: "Shape AI around practical teacher workload—not novelty.",
    description:
      "AI-assisted test-paper marking is part of the EdBuddies product direction, intended to reduce repetitive marking work while keeping teachers in oversight of the process.",
    icon: Sparkles,
    direction: true,
    workflowTitle: "The marking workflow being explored",
    workflow: [
      { step: "01", title: "Review submitted answers", description: "Bring student answers into an AI-assisted review workflow." },
      { step: "02", title: "Assist with marking", description: "Use AI assistance for repetitive parts of the marking process." },
      { step: "03", title: "Keep teacher oversight", description: "Maintain teacher review and judgement as part of the workflow." },
    ],
    capabilities: [
      { icon: FileCheck2, title: "Test-paper focus", description: "Develop the capability around a real, repeatable teacher task." },
      { icon: Sparkles, title: "AI assistance", description: "Explore assistance for repetitive marking work rather than replacing teachers." },
      { icon: UserCheck, title: "Teacher oversight", description: "Keep professional review and judgement within the process." },
      { icon: GraduationCap, title: "Education context", description: "Shape the workflow around the needs of education teams." },
      { icon: CheckCircle2, title: "Practical workflow", description: "Connect the direction to work teachers already perform." },
      { icon: MessageSquare, title: "Customer input", description: "Invite centres to discuss the product direction with the EdBuddies team." },
    ],
    outcomes: ["Less repetitive marking work", "Teacher review stays central", "A practical use of AI for education operations"],
  },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function WorkflowPreview({ page }: { page: FeaturePage }) {
  const Icon = page.icon;
  return (
    <div className="rounded-[2rem] bg-[#09244B] p-4 shadow-[0_30px_80px_rgba(9,36,75,0.22)] sm:p-6">
      <div className="overflow-hidden rounded-[1.4rem] bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8FE] text-[#0FB8F1]"><Icon className="h-5 w-5" /></span>
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">EdBuddies workflow</p><p className="font-semibold text-[#09244B]">{page.shortTitle}</p></div>
        </div>
        <div className="space-y-3 bg-[#F8FCFD] p-5 sm:p-7">
          {page.workflow.map((item) => (
            <div key={item.step} className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#09244B] text-xs font-bold text-white">{item.step}</span>
              <div><p className="font-semibold text-[#09244B]">{item.title}</p><p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeatureDetail() {
  const { featureId } = useParams();
  const page = featureId ? featurePages[featureId] : undefined;

  useEffect(() => {
    if (!page) return;
    setPageMeta({
      // shortTitle can already start with "EdBuddies" (e.g. "EdBuddies AI") —
      // strip that prefix here so the title tag never repeats the brand name.
      title: `${page.shortTitle.replace(/^EdBuddies\s+/, "")} — EdBuddies Features`,
      description: page.description,
      url: `https://edbuddies.ai/features/${page.slug}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://edbuddies.ai/" },
          { "@type": "ListItem", position: 2, name: "Features", item: "https://edbuddies.ai/features" },
          { "@type": "ListItem", position: 3, name: page.shortTitle, item: `https://edbuddies.ai/features/${page.slug}` },
        ],
      },
    });
  }, [page]);

  if (!page) return <NotFound />;
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-white text-[#09244B]">
      <Navbar activePage="features" />
      <main>
        <section className="relative overflow-hidden bg-[#F7FCFD] px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#0FB8F1]/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-[#09244B]">Home</Link><span aria-hidden="true">/</span>
              <Link to="/features" className="hover:text-[#09244B]">Features</Link><span aria-hidden="true">/</span>
              <span className="font-semibold text-[#09244B]" aria-current="page">{page.shortTitle}</span>
            </nav>
            <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0FB8F1]/20 bg-white px-4 py-2 text-sm font-semibold text-[#09769A] shadow-sm"><Icon className="h-4 w-4" />{page.eyebrow}</div>
                <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{page.title}</h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{page.description}</p>
                {page.direction ? <p className="mt-5 rounded-xl border border-[#0FB8F1]/20 bg-[#E8F8FE] p-4 text-sm leading-6 text-[#086686]">This is a product direction. Availability is to be confirmed.</p> : null}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-xl bg-[#0FB8F1] px-7 text-base text-white hover:bg-[#0DA8DC]"><Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link></Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.08 }}><WorkflowPreview page={page} /></motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#09769A]">Core capabilities</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">Everything the workflow needs, kept in context.</h2></Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {page.capabilities.map(({ icon: CapabilityIcon, title, description }, index) => (
                <Reveal key={title} delay={(index % 3) * 0.05}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(9,36,75,0.05)]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEFCFF] text-[#08718C]"><CapabilityIcon className="h-5 w-5" /></span>
                    <h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#09244B] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9DE9F3]">Connected workflow</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">{page.workflowTitle}</h2></Reveal>
            <div className="space-y-4">
              {page.workflow.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.06}>
                  <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-[56px_1fr]">
                    <span className="text-2xl font-bold text-[#49C9F4]">{item.step}</span><div><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-2 leading-7 text-white/65">{item.description}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7FCFD] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#09769A]">What this improves</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">A more connected way to run the work.</h2></Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {page.outcomes.map((outcome, index) => <Reveal key={outcome} delay={index * 0.06}><div className="flex h-full gap-4 rounded-2xl bg-white p-6 shadow-[0_8px_28px_rgba(9,36,75,0.06)]"><Check className="mt-1 h-5 w-5 shrink-0 text-[#0FB8F1]" /><p className="font-semibold leading-7">{outcome}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <Reveal className="mx-auto max-w-6xl rounded-[2rem] bg-[#EEFCFF] px-6 py-14 text-center sm:px-10 lg:py-20"><h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-5xl">See how {page.shortTitle.toLowerCase()} fits your centre.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Tell us how your team works today and we’ll help you explore the most relevant EdBuddies capabilities.</p><Button asChild size="lg" className="mt-8 h-12 rounded-xl bg-[#0FB8F1] px-7 text-base text-white hover:bg-[#0DA8DC]"><Link to="/contact">Enquire Now <ArrowRight className="h-4 w-4" /></Link></Button></Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
