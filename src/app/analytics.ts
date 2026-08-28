declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
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
