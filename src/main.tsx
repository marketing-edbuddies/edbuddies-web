
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import ErrorBoundary from "./app/ErrorBoundary.tsx";
import { initLinkTracking } from "./app/analytics.ts";
import "./styles/index.css";
import Lenis from "lenis";

const App = lazy(() => import("./app/App.tsx"));
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
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
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
