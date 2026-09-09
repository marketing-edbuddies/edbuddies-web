
import { lazy, StrictMode, Suspense, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import ErrorBoundary from "./app/ErrorBoundary.tsx";
import { initLinkTracking, trackPageView } from "./app/analytics.ts";
import CookieConsent from "./app/CookieConsent.tsx";
import "./styles/index.css";
import Lenis from "lenis";

const App = lazy(() => import("./app/App.tsx"));
const PrivacyPolicy = lazy(() => import("./app/PrivacyPolicy.tsx"));
const Terms = lazy(() => import("./app/Terms.tsx"));
const Features = lazy(() => import("./app/Features.tsx"));
const FeaturesNew = lazy(() => import("./app/FeaturesNew.tsx"));
const FeatureDetail = lazy(() => import("./app/FeatureDetail.tsx"));
const FeatureEnrolment = lazy(() => import("./app/FeatureEnrolment.tsx"));
const FeatureClassManagement = lazy(() => import("./app/FeatureClassManagement.tsx"));
const FeaturePayrollLeave = lazy(() => import("./app/FeaturePayrollLeave.tsx"));
const FeatureBilling = lazy(() => import("./app/FeatureBilling.tsx"));
const FeatureParentCommunication = lazy(() => import("./app/FeatureParentCommunication.tsx"));
const FeatureReporting = lazy(() => import("./app/FeatureReporting.tsx"));
const Pricing = lazy(() => import("./app/Pricing.tsx"));
const Contact = lazy(() => import("./app/Contact.tsx"));
const About = lazy(() => import("./app/About.tsx"));
const NotFound = lazy(() => import("./app/NotFound.tsx"));

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

initLinkTracking();

function RouteFallback() {
  return <div style={{ minHeight: "100vh" }} aria-hidden="true" />;
}

/**
 * React Router keeps the browser's scroll position across client-side
 * navigations. Without this, following a link while scrolled down lands on
 * the new page at the same scroll offset instead of the top. Lenis owns
 * actual scroll rendering, so window.scrollTo alone isn't enough — it has to
 * be told directly too.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Fires a virtual GA4 page_view on every client-side navigation. GTM's
 * default Page View trigger only sees the initial document load, so without
 * this every route after the first is invisible in analytics.
 */
function RouteTracker() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#09244B] focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <RouteTracker />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/"         element={<App />} />
            <Route path="/features" element={<Features />} />
            <Route path="/features-new" element={<FeaturesNew />} />
            <Route path="/features/enrolment" element={<FeatureEnrolment />} />
            <Route path="/features/class-management" element={<FeatureClassManagement />} />
            <Route path="/features/payroll-leave-management" element={<FeaturePayrollLeave />} />
            <Route path="/features/billing-payments" element={<FeatureBilling />} />
            <Route path="/features/parent-communication" element={<FeatureParentCommunication />} />
            <Route path="/features/reporting" element={<FeatureReporting />} />
            <Route path="/features/:featureId" element={<FeatureDetail />} />
            <Route path="/pricing"  element={<Pricing />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/about"    element={<About />} />
            <Route path="/privacy"  element={<PrivacyPolicy />} />
            <Route path="/terms"    element={<Terms />} />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
