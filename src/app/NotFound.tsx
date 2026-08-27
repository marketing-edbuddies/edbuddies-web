import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "./components/ui/button";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found — EdBuddies";
    const meta = document.querySelector('meta[name="robots"]');
    if (meta) meta.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-lg mx-auto text-center">

          {/* 404 number */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[120px] font-bold leading-none text-[#EEFCFF] select-none mb-2"
            style={{ textShadow: "0 2px 0 rgba(9,36,75,0.08)" }}
          >
            404
          </motion.div>

          {/* Logo / mascot */}
          <motion.img
            src="/assets/logo-horizontal.png"
            alt="EdBuddies"
            className="h-12 w-auto mx-auto mb-8 -mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-[#09244B] mb-4"
          >
            Page not found.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 text-lg mb-10 leading-relaxed"
          >
            Looks like this page took the day off. Head back home and keep managing your centre.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Link to="/">
                <Button size="lg" className="bg-[#09244B] text-white px-8 py-6 text-base gap-2 hover:bg-[#0d3570] transition-colors">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white border-gray-300 px-8 py-6 text-base gap-2 hover:bg-[#09244B] hover:text-white hover:border-[#09244B] transition-all">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
