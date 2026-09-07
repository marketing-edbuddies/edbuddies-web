import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getStoredConsent, saveConsent, type ConsentState } from "./analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      // Re-apply a past choice on every load — Consent Mode defaults to
      // denied on each fresh page load until we tell it otherwise.
      saveConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function choose(state: ConsentState) {
    saveConsent(state);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(9,36,75,0.12)] px-4 py-5 sm:px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            We use cookies to run this site and, with your permission, to measure traffic and show relevant ads.
            Read our{" "}
            <Link to="/privacy" className="underline text-[#09244B] hover:text-[#09769A]">Privacy Policy</Link>{" "}
            or{" "}
            <button type="button" onClick={() => setExpanded((v) => !v)} className="underline text-[#09244B] hover:text-[#09769A]">
              manage settings
            </button>.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => choose({ analytics: false, marketing: false })}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-[#09244B] hover:border-[#09244B] transition-colors"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => choose({ analytics: true, marketing: true })}
              className="px-4 py-2.5 rounded-lg bg-[#09244B] text-white text-sm font-semibold hover:bg-[#0d3570] transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>

        {expanded && (
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input type="checkbox" checked disabled className="mt-1" />
              <span><strong className="text-[#09244B]">Essential</strong> — required for the site to function. Always on.</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1" />
              <span><strong className="text-[#09244B]">Analytics</strong> — helps us understand how visitors use the site.</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1" />
              <span><strong className="text-[#09244B]">Marketing</strong> — used to measure and target ads.</span>
            </label>
            <button
              type="button"
              onClick={() => choose({ analytics, marketing })}
              className="self-start mt-1 px-4 py-2 rounded-lg bg-[#0FB8F1] text-white text-sm font-semibold hover:bg-[#0CA2D5] transition-colors"
            >
              Save preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
