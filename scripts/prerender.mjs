// Post-build static prerender step.
//
// Why this exists: this app is a client-side-rendered React SPA (see
// src/main.tsx — plain BrowserRouter, no SSR/framework mode). Search engines
// and AI crawlers that don't execute JavaScript (most of them, including
// GPTBot/ClaudeBot/PerplexityBot and Googlebot's first pass) would otherwise
// see every route as the same near-empty homepage shell. This script runs a
// real headless Chrome against the real production build, captures each
// route's fully-rendered HTML, and writes it to disk as a static file — so
// Vercel can serve real, correct, per-route HTML with zero runtime cost.
//
// Deliberately NOT using vite-react-ssg or React Router's framework-mode
// prerender: both execute the app in a Node/SSR-style pass where `window` is
// undefined, and this app's src/main.tsx instantiates Lenis (smooth-scroll)
// unconditionally at module scope with no such guard — a Node-based
// prerenderer would need real code changes to even run. Headless Chrome runs
// the actual client bundle, so none of that needs to change. See
// seo-geo-progress.json (p1-t2, p3-t1) for the full decision writeup.
//
// A failure anywhere in this script fails the build (non-zero exit) — a
// broken prerender should never silently ship.

import { mkdir, writeFile } from "node:fs/promises";
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

// Minimal static server with SPA fallback, standing in for `vite preview`.
// Written by hand (rather than using vite's preview() JS API) so the bind
// address is unambiguous: vite preview's default "localhost" binding was
// resolving to a different loopback address (::1 vs 127.0.0.1) than Chrome's
// --host-resolver-rules override below expected, which produced
// ERR_CONNECTION_REFUSED even though both were technically "localhost".
// Binding explicitly to 127.0.0.1 here removes that ambiguity.
function startStaticServer(rootDir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      let filePath = path.join(rootDir, urlPath);
      if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
        filePath = path.join(rootDir, "index.html"); // SPA fallback
      }
      const ext = path.extname(filePath);
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

// Every indexable production route, plus /features-new (internal draft —
// still noindex via its own setPageMeta call, but it's a real, linked page
// that must keep working on direct load/refresh, so it needs a physical
// file same as everything else). /pricing is included: Kenneth said its
// indexation status stays as-is (still indexable), and prerendering doesn't
// change indexability or content — it only makes already-approved content
// available without requiring JS, exactly like every other indexable route.
const ROUTES = [
  "/",
  "/features",
  "/features-new",
  "/features/enrolment",
  "/features/class-management",
  "/features/payroll-leave-management",
  "/features/billing-payments",
  "/features/parent-communication",
  "/features/reporting",
  "/pricing",
  "/contact",
  "/about",
  "/privacy",
  "/terms",
];

function outputPathFor(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, route.replace(/^\//, ""), "index.html");
}

async function main() {
  const server = await startStaticServer(distDir);
  const port = server.address().port;
  console.log(`prerender: static server listening at http://127.0.0.1:${port}`);

  // src/app/seo.ts's isReviewHost() checks window.location.hostname against
  // PRODUCTION_HOSTS and forces noindex on anything else — a deliberate
  // safety net so a Vercel preview URL never gets indexed. Without this flag,
  // Puppeteer would navigate via `localhost`, which fails that same check
  // and would incorrectly bake noindex into every single route, including
  // the real production ones. --host-resolver-rules makes Chrome resolve
  // edbuddies.ai to this local preview server ONLY for this browser
  // instance, so window.location.hostname genuinely reads "edbuddies.ai" and
  // the app's own existing hostname logic does the right thing unmodified.
  // This changes nothing about runtime safety: the inline hostname-check
  // script in index.html is still captured verbatim into every generated
  // file and still re-runs for real, live in any actual visitor's browser —
  // so a real non-production deployment (e.g. a *.vercel.app preview URL)
  // still gets correctly noindexed at request time regardless of what this
  // script baked in at build time.
  // Vercel's build container is Amazon Linux, missing the shared libraries
  // (libnspr4.so etc.) that full `puppeteer`'s bundled Chrome needs — so on
  // Vercel we launch @sparticuz/chromium (a Chromium build made for exactly
  // this kind of serverless/Lambda-style container) via puppeteer-core
  // instead. Locally (npm run build on a dev machine), regular `puppeteer`
  // with its own bundled Chrome still works fine and is simpler to debug.
  const hostResolverArg =
    "--host-resolver-rules=MAP edbuddies.ai 127.0.0.1,MAP www.edbuddies.ai 127.0.0.1";
  let browser;
  if (process.env.VERCEL) {
    const { default: chromium } = await import("@sparticuz/chromium");
    const { default: puppeteerCore } = await import("puppeteer-core");
    browser = await puppeteerCore.launch({
      args: [...chromium.args, hostResolverArg],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    const { default: puppeteer } = await import("puppeteer");
    browser = await puppeteer.launch({
      headless: "new",
      args: [hostResolverArg],
    });
  }
  const origin = `http://edbuddies.ai:${port}`;
  const failures = [];

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const target = `${origin}${route}`;
      const expectedCanonical = `https://edbuddies.ai${route === "/" ? "/" : route}`;
      try {
        await page.goto(target, { waitUntil: "networkidle0", timeout: 30000 });

        // Belt-and-suspenders: confirm the route's own setPageMeta() effect
        // has actually run (canonical href matches this route) before
        // capturing — networkidle0 alone should already guarantee this, but
        // this catches the edge case where it doesn't.
        await page.waitForFunction(
          (expected) => document.querySelector('link[rel="canonical"]')?.href === expected,
          { timeout: 5000 },
          expectedCanonical
        );

        const html = await page.evaluate(() => "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
        const outPath = outputPathFor(route);
        await mkdir(path.dirname(outPath), { recursive: true });
        await writeFile(outPath, html, "utf8");
        console.log(`prerender: ok   ${route} -> ${path.relative(distDir, outPath)}`);
      } catch (err) {
        failures.push({ route, error: err.message });
        console.error(`prerender: FAIL ${route} — ${err.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }

  if (failures.length > 0) {
    console.error(`prerender: ${failures.length}/${ROUTES.length} route(s) failed — failing the build.`);
    process.exit(1);
  }
  console.log(`prerender: all ${ROUTES.length} routes generated successfully.`);
}

main().catch((err) => {
  console.error("prerender: unexpected error —", err);
  process.exit(1);
});
