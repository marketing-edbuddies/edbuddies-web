import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";

interface NavbarProps {
  activePage?: "features" | "pricing" | "about" | "contact";
}

export default function Navbar({ activePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkClass = (page: string) =>
    `transition-all duration-300 hover:text-gray-900 ${scrolled ? "text-sm" : "text-base"} ${
      activePage === page ? "text-[#09244B] font-semibold" : "text-gray-700"
    }`;

  const navLinks = [
    { href: "/features", label: "Features", page: "features" },
    { href: "/pricing",  label: "Pricing",  page: "pricing"  },
    { href: "/about",    label: "About",    page: "about"    },
    { href: "/contact",  label: "Contact",  page: "contact"  },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/80 backdrop-blur-sm transition-all duration-300 ${scrolled ? "shadow-[0_2px_20px_rgba(9,36,75,0.08),0_1px_4px_rgba(0,0,0,0.04)]" : ""}`}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? "h-16" : "h-28"}`}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <a href="/">
                <img
                  src="/assets/logo-horizontal.png"
                  alt="EdBuddies"
                  className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`}
                />
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center gap-8"
            >
              {navLinks.map(({ href, label, page }) => (
                <a key={page} href={href} className={linkClass(page)}>{label}</a>
              ))}
            </motion.div>

            {/* CTA Button — desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer">
                  <Button className={`transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${scrolled ? "" : "text-base px-6 py-5"}`}>
                    Get Started
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:hidden p-2"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X className="w-6 h-6 text-gray-900" />
                : <Menu className="w-6 h-6 text-gray-900" />
              }
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <img src="/assets/logo-horizontal.png" alt="EdBuddies" className="h-10 w-auto object-contain" />
                <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-6 py-6 gap-1 flex-1">
                {navLinks.map(({ href, label, page }, i) => (
                  <motion.a
                    key={page}
                    href={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 28 }}
                    onClick={() => setMenuOpen(false)}
                    className={`text-lg py-3 border-b border-gray-100 last:border-0 ${
                      activePage === page
                        ? "text-[#09244B] font-semibold"
                        : "text-gray-700 hover:text-[#09244B]"
                    }`}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <div className="px-6 pb-8">
                <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-[#09244B] text-white py-5 text-base hover:bg-[#0d3570]">
                    Get Started
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
