import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  energetic = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  energetic?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: energetic ? 44 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={energetic ? { type: "spring", stiffness: 280, damping: 20, delay } : { duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCheck({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16A34A"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 h-5 w-5 shrink-0"
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.3 }}
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: delay + 0.15, duration: 0.45, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

export function MediaPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className = "",
  src,
}: {
  label: string;
  aspect?: string;
  className?: string;
  src?: string;
}) {
  if (src) {
    return (
      <div className={`flex ${aspect} w-full items-center justify-center ${className}`}>
        <img src={src} alt={label} className="h-full w-full object-contain" />
      </div>
    );
  }

  // TODO: replace with a real product screenshot or short screen recording once available.
  return (
    <div
      className={`flex ${aspect} w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-white to-[#EEFCFF] shadow-[0_24px_60px_rgba(9,36,75,0.08)] ${className}`}
    >
      <p className="px-6 text-center text-sm font-semibold text-slate-400">{label}</p>
    </div>
  );
}

export const ctaButtonClass =
  "h-12 rounded-xl bg-[#FF8000] px-7 text-base text-white shadow-[0_10px_30px_rgba(255,128,0,0.28)] hover:-translate-y-0.5 hover:bg-[#E87300] hover:shadow-[0_16px_40px_rgba(255,128,0,0.34)]";
