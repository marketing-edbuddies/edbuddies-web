declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Fires a virtual page_view on every SPA route change. GTM's default Page
 * View trigger only covers the initial document load — react-router
 * navigations never reload the page, so without this every route after the
 * first is invisible to GA4.
 */
export function trackPageView(path: string, title: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: path,
    page_location: window.location.origin + path,
    page_title: title,
  });
}

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = "edbuddies_cookie_consent";

export function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

/**
 * Pushes the visitor's choice into Google Consent Mode (gates GA4/Ads tags
 * configured for it) and also fires a plain dataLayer event carrying the same
 * flags, since Meta Pixel has no concept of Consent Mode — a GTM trigger for
 * the Meta tag has to be built to check `consent_marketing` on this event
 * instead. That trigger lives in the GTM container, outside this repo.
 */
export function applyConsent(state: ConsentState) {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  }
  window.gtag("consent", "update", {
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
  });
  trackEvent("consent_updated", {
    consent_analytics: state.analytics,
    consent_marketing: state.marketing,
  });
}

export function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private browsing, etc.) — consent still applies
    // to this page load via applyConsent, it just won't be remembered.
  }
  applyConsent(state);
}

/**
 * Delegated click tracking for outbound conversion links (Tally enquiry
 * form, WhatsApp) so every CTA is covered without instrumenting each one
 * individually. Matches by href since these all open in a new tab/app
 * rather than routing through react-router.
 */
export function initLinkTracking() {
  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement)?.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";

    if (href.includes("tally.so")) {
      trackEvent("cta_click", {
        cta_label: link.textContent?.trim() || "",
        link_url: href,
        page_path: window.location.pathname,
      });
    } else if (href.includes("wa.me")) {
      trackEvent("whatsapp_click", {
        link_url: href,
        page_path: window.location.pathname,
      });
    }
  });
}
