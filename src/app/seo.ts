interface PageMeta {
  title: string;
  description: string;
  url: string;
  noindex?: boolean;
}

// Custom domain isn't connected yet (see CLAUDE.md) — every other host
// (the *.vercel.app review URL, any future preview alias) is a non-production
// review copy and must never be indexed, regardless of what each page asks for.
const PRODUCTION_HOSTS = ["edbuddies.ai", "www.edbuddies.ai"];

export function isReviewHost(): boolean {
  if (typeof window === "undefined") return false;
  return !PRODUCTION_HOSTS.includes(window.location.hostname);
}

export function setPageMeta({ title, description, url, noindex = false }: PageMeta) {
  document.title = title;

  const setMeta = (sel: string, attr: string, val: string) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };

  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", url);
  // Every route shares one meta[name="robots"] tag (no SSR), so each page
  // must explicitly reset it — otherwise a noindex page (e.g. NotFound)
  // leaves later routes noindexed for the rest of the SPA session.
  const forceNoindex = noindex || isReviewHost();
  setMeta('meta[name="robots"]', "content", forceNoindex ? "noindex, nofollow" : "index, follow");
}
