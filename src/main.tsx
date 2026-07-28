
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import Features from "./app/Features.tsx";
import FeaturesNew from "./app/FeaturesNew.tsx";
import Pricing from "./app/Pricing.tsx";
import Contact from "./app/Contact.tsx";
import About from "./app/About.tsx";
import NotFound from "./app/NotFound.tsx";
import "./styles/index.css";
import Lenis from "lenis";

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/"         element={<App />} />
      <Route path="/features" element={<Features />} />
      <Route path="/features-new" element={<FeaturesNew />} />
      <Route path="/pricing"  element={<Pricing />} />
      <Route path="/contact"  element={<Contact />} />
      <Route path="/about"    element={<About />} />
      <Route path="*"         element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
