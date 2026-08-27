import { useEffect, useState, type FocusEvent } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CreditCard,
  LayoutGrid,
  Menu,
  MessageSquare,
  Sparkles,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "./components/ui/button";

interface NavbarProps {
  activePage?: "features" | "pricing" | "about" | "contact";
}

const featureGroups = [
  {
    title: "Centre operations",
    items: [
      {
        href: "/features/enrolment",
        title: "Enrolment & Admissions",
        description: "Move from enquiry to confirmed class with one connected student record.",
        icon: UserPlus,
      },
      {
        href: "/features/class-management",
        title: "Classes & Student Management",
        description: "Coordinate schedules, attendance, teachers, homework and progress.",
        icon: CalendarDays,
      },
      {
        href: "/features/billing-payments",
        title: "Billing & Payments",
        description: "Keep invoices, payments and outstanding balances easier to follow.",
        icon: CreditCard,
      },
      {
        href: "/features/payroll-leave-management",
        title: "Payroll & Teacher Leave",
        description: "Keep teacher leave, payroll and finance admin on one connected record.",
        icon: Wallet,
      },
    ],
  },
  {
    title: "Engagement & insights",
    items: [
      {
        href: "/features/parent-communication",
        title: "Parent Communication",
        description: "Share relevant centre and student updates in context.",
        icon: MessageSquare,
      },
      {
        href: "/features/reporting",
        title: "Reporting & Multi-Branch",
        description: "See centre operations while retaining branch-level detail.",
        icon: BarChart3,
      },
      {
        href: "/features/ai",
        title: "EdBuddies AI",
        description: "Explore the direction for AI-assisted test-paper marking.",
        icon: Sparkles,
        badge: "Product direction",
      },
    ],
  },
];

const featureItems = featureGroups.flatMap((group) => group.items);

const standardNavLinks = [
  { href: "/pricing", label: "Pricing", page: "pricing" },
  { href: "/about", label: "About", page: "about" },
  { href: "/contact", label: "Contact", page: "contact" },
] as const;

const MotionLink = motion.create(Link);

export default function Navbar({ activePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(activePage === "features");
  const [activeFeatureHref, setActiveFeatureHref] = useState(featureItems[0].href);

  const activeFeature = featureItems.find((item) => item.href === activeFeatureHref) ?? featureItems[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkClass = (page: string) =>
    `transition-all duration-300 hover:text-gray-900 ${scrolled ? "text-sm" : "text-base"} ${
      activePage === page ? "font-semibold text-[#09244B]" : "text-gray-700"
    }`;

  const handleFeaturesBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFeaturesOpen(false);
  };

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-300 ${scrolled || featuresOpen ? "shadow-[0_2px_20px_rgba(9,36,75,0.08),0_1px_4px_rgba(0,0,0,0.04)]" : ""}`}
        onMouseLeave={() => setFeaturesOpen(false)}
        onBlur={handleFeaturesBlur}
        onKeyDown={(event) => { if (event.key === "Escape") setFeaturesOpen(false); }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-28"}`}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center">
              <Link to="/" aria-label="EdBuddies home" onMouseEnter={() => setFeaturesOpen(false)} onFocus={() => setFeaturesOpen(false)}>
                <img src="/assets/logo-horizontal.png" alt="EdBuddies" className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="hidden items-center gap-8 md:flex">
              <div
                className="flex h-full items-center"
                onMouseEnter={() => setFeaturesOpen(true)}
                onFocus={() => setFeaturesOpen(true)}
              >
                <Link
                  to="/features"
                  className={`${linkClass("features")} inline-flex items-center gap-1.5 rounded-md py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8000] focus-visible:ring-offset-2`}
                  aria-haspopup="true"
                  aria-expanded={featuresOpen}
                >
                  Features
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
                </Link>
              </div>

              {standardNavLinks.map(({ href, label, page }) => (
                <Link key={page} to={href} className={linkClass(page)} onMouseEnter={() => setFeaturesOpen(false)} onFocus={() => setFeaturesOpen(false)}>{label}</Link>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden md:block">
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} onMouseEnter={() => setFeaturesOpen(false)}>
                <Button asChild className={`transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${scrolled ? "" : "px-6 py-5 text-base"}`}>
                  <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">Get Started</a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-2 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {featuresOpen ? (
            <motion.div
              key="feature-mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full hidden border-t border-slate-100 bg-white shadow-[0_24px_60px_rgba(9,36,75,0.14)] md:block"
              onMouseEnter={() => setFeaturesOpen(true)}
            >
              <div className="mx-auto grid max-w-6xl grid-cols-[0.9fr_1fr_1fr] gap-7 px-8 py-8">
                <div className="relative overflow-hidden rounded-2xl bg-[#09244B] p-6 text-white">
                  <div className="absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-[#FF8000]/25 blur-2xl" aria-hidden="true" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><LayoutGrid className="h-5 w-5 text-[#9DE9F3]" /></span>
                  <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.17em] text-[#9DE9F3]">Feature overview</p>
                  <h2 className="relative mt-2 text-xl font-bold leading-snug">One connected platform for centre operations.</h2>
                  <Link to="/features-new" className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FFD4AD]">View all features <ArrowRight className="h-4 w-4" /></Link>
                </div>

                {featureGroups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{group.title}</p>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = item.href === activeFeature.href;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onMouseEnter={() => setActiveFeatureHref(item.href)}
                            onFocus={() => setActiveFeatureHref(item.href)}
                            className={`group flex items-start gap-3 rounded-xl p-3 transition ${isActive ? "bg-[#EEFCFF]" : "hover:bg-slate-50"}`}
                          >
                            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${isActive ? "bg-[#FF8000] text-white" : "bg-[#EEFCFF] text-[#08718C] group-hover:bg-[#FF8000] group-hover:text-white"}`}><ItemIcon className="h-4.5 w-4.5" /></span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold leading-5 text-[#09244B]">{item.title}</span>
                              {"badge" in item ? <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#B95700]">{item.badge}</span> : null}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={closeMobileMenu} />
            <motion.div key="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }} className="fixed right-0 top-0 z-50 flex h-full w-[min(22rem,90vw)] flex-col bg-white shadow-2xl md:hidden">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <img src="/assets/logo-horizontal.png" alt="EdBuddies" className="h-10 w-auto object-contain" />
                <button onClick={closeMobileMenu} className="p-2 text-gray-500 hover:text-gray-900" aria-label="Close navigation menu"><X className="h-5 w-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <Link to="/features" onClick={closeMobileMenu} className={`flex-1 py-3 text-lg ${activePage === "features" ? "font-semibold text-[#09244B]" : "text-gray-700"}`}>Features</Link>
                    <button onClick={() => setMobileFeaturesOpen((open) => !open)} className="p-3 text-slate-500" aria-label="Toggle feature categories" aria-expanded={mobileFeaturesOpen}><ChevronDown className={`h-5 w-5 transition ${mobileFeaturesOpen ? "rotate-180" : ""}`} /></button>
                  </div>
                  <AnimatePresence initial={false}>
                    {mobileFeaturesOpen ? (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-1 pb-4 pl-2">
                          <Link to="/features-new" onClick={closeMobileMenu} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#B95700]"><LayoutGrid className="h-4 w-4" />All features overview</Link>
                          {featureItems.map((item) => { const ItemIcon = item.icon; return (
                            <Link key={item.href} to={item.href} onClick={closeMobileMenu} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#EEFCFF] hover:text-[#09244B]"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEFCFF] text-[#08718C]"><ItemIcon className="h-4 w-4" /></span>{item.title}</Link>
                          ); })}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {standardNavLinks.map(({ href, label, page }, index) => (
                  <MotionLink key={page} to={href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 28 }} onClick={closeMobileMenu} className={`block border-b border-gray-100 py-3 text-lg ${activePage === page ? "font-semibold text-[#09244B]" : "text-gray-700 hover:text-[#09244B]"}`}>{label}</MotionLink>
                ))}
              </div>

              <div className="px-6 pb-8 pt-4">
                <Button asChild className="w-full bg-[#09244B] py-5 text-base text-white hover:bg-[#0d3570]"><a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Get Started</a></Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
