import { motion, AnimatePresence } from "motion/react";
import { Mail, Clock, MessageCircle, ChevronDown, ArrowRight, Send, Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";
import { setPageMeta } from "./seo";
import { SHOW_FREE_MESSAGING } from "./flags";
import { trackEvent } from "./analytics";
import Footer from "./Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#0FB8F1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: "WhatsApp Malaysia",
    value: "+6017-566 5935",
    href: "https://wa.me/60175665935",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#0FB8F1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: "WhatsApp Singapore",
    value: "+65 8772 5422",
    href: "https://wa.me/6587725422",
  },
  {
    icon: <Mail className="w-5 h-5 text-[#0FB8F1]" />,
    label: "Email",
    value: "marketing@edbuddies.ai",
    href: "mailto:marketing@edbuddies.ai",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#0FB8F1]" />,
    label: "Response Time",
    value: "1–2 working days",
    href: null,
  },
];

const FAQS_FREE = [
  {
    q: "Is EdBuddies really free?",
    a: "Yes, completely. No subscription fee, no per-student charge, no setup fee. Free to download, free to use, free forever. We mean it.",
  },
  {
    q: "Which countries do you support?",
    a: "We're currently active in Malaysia and Singapore, with Vietnam and the Philippines coming soon. Our team responds to enquiries from both markets.",
  },
  {
    q: "How do I get my centre started?",
    a: "Simply WhatsApp or email us. Our team will walk you through the onboarding process step by step — it usually takes less than a day to get set up.",
  },
  {
    q: "What can EdBuddies help with?",
    a: "Attendance tracking, invoicing, billing, parent communication, class scheduling, teacher management, homework workflows, finance overview, and daily admin — all in one free app.",
  },
  {
    q: "Will there be any charges in the future?",
    a: "The core platform is free forever. We may introduce optional premium features down the road, but everything available today will always remain free.",
  },
];

const FAQS_DEFAULT = [
  {
    q: "What does EdBuddies do?",
    a: "EdBuddies helps tuition centres and freelance tutors manage their day-to-day operations — attendance, billing, invoicing, parent communication, class scheduling, and more — all from one app.",
  },
  {
    q: "Which countries do you support?",
    a: "We're currently active in Malaysia and Singapore, with Vietnam and the Philippines coming soon. Our team responds to enquiries from both markets.",
  },
  {
    q: "How do I get my centre started?",
    a: "Simply WhatsApp or email us. Our team will walk you through the onboarding process step by step — it usually takes less than a day to get set up.",
  },
  {
    q: "What can EdBuddies help with?",
    a: "Attendance tracking, invoicing, billing, parent communication, class scheduling, teacher management, homework workflows, finance overview, and daily admin — all in one app.",
  },
  {
    q: "How do I find out about pricing?",
    a: "Get in touch via WhatsApp or email and our team will walk you through what's available and what works best for your centre.",
  },
];

const FAQS = SHOW_FREE_MESSAGING ? FAQS_FREE : FAQS_DEFAULT;

const SOCIALS = [
  {
    label: "Facebook",
    handle: "@edbuddies.ai",
    cta: "Follow on Facebook",
    href: "https://www.facebook.com/profile.php?id=61573123059740",
    icon: <Facebook className="w-6 h-6 text-white" />,
    bg: "#1877F2",
    desc: "Updates, tips, and centre management insights.",
  },
  {
    label: "Instagram",
    handle: "@edbuddies.ai",
    cta: "Follow on Instagram",
    href: "https://www.instagram.com/edbuddies.ai",
    icon: <Instagram className="w-6 h-6 text-white" />,
    bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    desc: "Behind the scenes and product updates.",
  },
];

// ─── WhatsApp icon SVG ─────────────────────────────────────────────────────────

function WaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", lastName: "", email: "", phone: "", centre: "", message: "" });
  const [botcheck, setBotcheck] = useState("");

  useEffect(() => {
    setPageMeta({
      title: "Contact — EdBuddies | Get in Touch",
      description: "Contact EdBuddies for centre onboarding, general enquiries, or technical support. WhatsApp us in Malaysia or Singapore, or send us an email.",
      url: "https://edbuddies.ai/contact",
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: real visitors never see or fill this field. If it's
    // filled, silently pretend success instead of hitting the API.
    if (botcheck) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "21c8c876-63c0-4573-b334-364afa34c489",
          botcheck,
          subject: `EdBuddies Enquiry from ${form.name} ${form.lastName}`,
          from_name: `${form.name} ${form.lastName}`,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          centre: form.centre,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        trackEvent("generate_lead", { method: "contact_form" });
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or WhatsApp us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="contact" />

      <main id="main-content">
      {/* ── Section 1: Hero + Form ────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — heading + contact info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#09769A] uppercase tracking-wider mb-5"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 220, damping: 22 }}
                className="text-4xl sm:text-5xl font-bold text-[#09244B] leading-tight mb-5"
              >
                We'd love to<br />
                <span className="text-[#0FB8F1]">hear from you.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-500 text-base leading-relaxed mb-10 max-w-md"
              >
                WhatsApp us for the fastest reply, or fill out the form and we'll get back to you within 1–2 working days.
              </motion.p>

              {/* Contact info 2×2 grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {CONTACT_INFO.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E8F8FE] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-[#09244B] hover:text-[#09769A] transition-colors" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#09244B]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 200, damping: 22 }}
              className="bg-white rounded-2xl border border-gray-100 p-8"
              style={{ boxShadow: "0 4px 32px rgba(9,36,75,0.10)" }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#E8F8FE] flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-[#0FB8F1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#09244B] mb-2">Message sent!</h3>
                  <p className="text-gray-500 text-sm">We'll get back to you within 1–2 working days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="botcheck"
                    value={botcheck}
                    onChange={e => setBotcheck(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-first-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                      <input
                        id="contact-first-name"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0FB8F1] focus:ring-2 focus:ring-[#0FB8F1]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-last-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                      <input
                        id="contact-last-name"
                        required
                        value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        placeholder="Enter last name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0FB8F1] focus:ring-2 focus:ring-[#0FB8F1]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="Enter work email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0FB8F1] focus:ring-2 focus:ring-[#0FB8F1]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input
                        id="contact-phone"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="e.g. +60 12 345 6789"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0FB8F1] focus:ring-2 focus:ring-[#0FB8F1]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-centre" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Centre Name</label>
                    <input
                      id="contact-centre"
                      value={form.centre}
                      onChange={e => setForm(f => ({ ...f, centre: e.target.value }))}
                      placeholder="Enter your centre name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0FB8F1] focus:ring-2 focus:ring-[#0FB8F1]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Enter your message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0FB8F1] focus:ring-2 focus:ring-[#0FB8F1]/10 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}

                  <p className="text-xs text-gray-400 leading-relaxed">
                    By submitting, you agree to our{" "}
                    <Link to="/privacy" className="underline hover:text-[#09769A]">Privacy Policy</Link>. We'll only use your details to respond to this enquiry.
                  </p>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#09244B] text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[#0d3570] hover:shadow-[0_8px_24px_rgba(9,36,75,0.30)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Social Follow ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EEFCFF]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SOCIALS.map(({ label, handle, cta, href, icon, bg, desc }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(9,36,75,0.12)", transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-transparent cursor-pointer group"
                style={{ boxShadow: "0 2px 8px rgba(9,36,75,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ background: bg }}
                >
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#09244B] text-base mb-0.5">{label}</p>
                  <p className="text-xs text-gray-400 mb-2">{handle}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#09769A] group-hover:gap-2.5 transition-all duration-200">
                  {cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: FAQ ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#09769A] uppercase tracking-wider mb-4">
              FAQs
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#09244B]">
              Frequently Asked<br />Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-lg overflow-hidden"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`contact-faq-panel-${i}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#0FB8F1]" />
                  </motion.div>
                </button>
                <motion.div
                  id={`contact-faq-panel-${i}`}
                  role="region"
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Dark CTA Banner ────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#09244B]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 22 }}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5"
          >
            Ready to get started?<br />
            <span className="text-[#0FB8F1]">
              {SHOW_FREE_MESSAGING ? "It's completely free." : "Let's talk."}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-white/70 text-lg mb-10"
          >
            {SHOW_FREE_MESSAGING
              ? "Free forever. No credit card. No commission. Just a better way to manage your centre."
              : "WhatsApp us or fill in the form and we'll get back to you within 1–2 working days."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="https://tally.so/r/3y1vE0"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-[#0FB8F1] text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#0DA6DA] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(15,184,241,0.35)]"
            >
              Get started →
            </motion.a>
            <motion.a
              href="mailto:marketing@edbuddies.ai"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Email us
            </motion.a>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
