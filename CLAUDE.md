# EdBuddies Website — AI Instructions

Read `README.md` before changing this project.

## Source of truth

This folder is the active source code for the new EdBuddies marketing website.
Do not use old copies from the EdBuddies business-document folder.

Business, marketing and brand guidance is stored in:

`/Users/kenneth/Documents/Claude/Projects/EdBuddies`

Use these documents before changing product claims or marketing copy:

- `00-Start-Here/PROJECT_CONTEXT.md`
- `02-Marketing/00-Marketing-Guide/product-facts.md`
- `02-Marketing/00-Marketing-Guide/brand-brief.md`

## Workspace roles — check before every task

This repository has three deliberate checkouts. Run `pwd`,
`git rev-parse --show-toplevel`, `git branch --show-current`, and
`git status --short --branch` before making changes.

- `/Users/kenneth/Documents/Claude/Projects/EdBuddies-Website`
  - Role: **CONTROL / final integration**
  - Required branch: `master`
  - Do not use for routine development or SEO work.
  - A push of `master` may deploy; never push without Kenneth's explicit
    deployment approval.
- `/Users/kenneth/Documents/Claude/Projects/EdBuddies-Development`
  - Role: **WEBSITE DEVELOPMENT**
  - Required branch: `website-dev/main`
  - Do not switch branches, deploy or push `master` from this checkout.
- `/Users/kenneth/Documents/Claude/Projects/EdBuddies-SEO`
  - Role: **SEO / GEO**
  - Required branch: `seo-geo/main`
  - Do not switch branches, deploy or push `master` from this checkout.

If the folder and branch do not match this table, stop and tell Kenneth before
editing. Never use Claude's automatic worktree mode for this repository while
these three manual worktrees exist. Never work on website source from the mixed
parent `Projects` repository or from the `EdBuddies` Marketing folder.

## Multi-Agent Worktree Structure

CONTROL
Path:
/Users/kenneth/Documents/Claude/Projects/EdBuddies-Website
Branch:
master

Purpose:
Review and integrate approved Development and SEO work.
Production push/deploy only with Kenneth's explicit approval.


DEVELOPMENT
Path:
/Users/kenneth/Documents/Claude/Projects/EdBuddies-Development
Branch:
website-dev/main

Purpose:
UI, components, responsive development, features, functionality,
animations, forms, content implementation and general website fixes.


SEO/GEO
Path:
/Users/kenneth/Documents/Claude/Projects/EdBuddies-SEO
Branch:
seo-geo/main

Purpose:
SEO, GEO, metadata, canonical tags, sitemap, robots.txt,
schema/structured data, internal linking and AI-search optimisation.


## Shared Coordination

Shared local handoff directory:

/Users/kenneth/Documents/Claude/Projects/.edbuddies-handoff

At the beginning of every meaningful session:

1. Verify pwd.
2. Verify current branch.
3. Verify git status.
4. Stop if folder and branch do not match the assigned role.
5. Read:
   - .edbuddies-handoff/README.md
   - .edbuddies-handoff/SEO.md
   - .edbuddies-handoff/DEVELOPMENT.md
   - .edbuddies-handoff/CONTROL.md
6. Update ONLY the current agent's own status file.
7. Declare FILES_IN_SCOPE before making substantial edits.
8. Check other ACTIVE agents for overlapping scope.
9. Stop and request coordination if overlapping files are detected.

Claude's built-in automatic Worktree feature must NOT be used for
these EdBuddies workspaces because dedicated physical Git worktrees
already exist.


## Ownership

SEO/GEO owns:
- SEO-GEO-AUTOMATION-TRACKER.html
- seo-geo-progress.json
- SEO/GEO-specific implementation

Development should not modify those tracker files without Kenneth's instruction.

Development owns normal website implementation.

If SEO requires modifications to files also actively being modified by
Development, the SEO agent must flag the overlap before editing.

CONTROL owns:
- integration
- branch review
- master
- production approval workflow


## Git / Production Rules

- Never switch to another agent's branch for normal work.
- Never directly edit another agent's physical worktree.
- Never push master without Kenneth's approval.
- Never deploy production without Kenneth's approval.
- Never reset/rebase/revert another agent's work.
- Development and SEO commit only to their assigned branches.
- CONTROL integrates completed work into master.
- Read-only git diff/show/log inspection across branches is allowed.

## Safety rules

- The public `edbuddies.ai` website remains on WordPress.
- This repository remains on Vercel for review and production preparation.
- GitHub repo is `marketing-edbuddies/edbuddies-web` (transferred from Kenneth's
  personal account 2026-08-27) and Vercel project `edbuddies-web` (team
  `edbuddies-projects`) is git-connected: **`git push origin master` auto-deploys
  to production within ~1 minute.** Push is the real "go live" step here, not
  just commit — treat it with the same care as a manual deploy.
- Do not push, deploy, change domains, transfer ownership or change Vercel
  settings without Kenneth's approval.
- Do not publish product pricing or free/zero-cost claims unless Kenneth
  approves the exact wording.
- Do not expose passwords, API keys, access tokens, customer data or tracking
  credentials.
- Keep files in `public/assets` unless the code references have been checked.
- **Brand secondary color is blue (`#0FB8F1`), not orange**, as of 2026-09-07 —
  see Session update below. Do not reintroduce `#FF8000` or any of its
  derived shades; the parent EdBuddies project's brand docs
  (`04-Brand-and-Assets/Design-System/design-system.html`, that project's
  `CLAUDE.md`) still say orange and have not been updated to match — treat
  this repo as the current source of truth for the live site's color, not
  those docs, until someone reconciles them.
- This local checkout has had commits appear from something other than an
  interactive session (an "SEO/GEO automation" tracker/progress-state commit
  pair, 2026-09-07) — some automated process may be running against this same
  repo. Don't assume you're the only thing changing it; `git fetch` and check
  for divergence before committing or pushing.

## Before making a change

1. Run `git status --short --branch`.
2. Read the affected file instead of assuming its purpose.
3. Check whether the change affects the current page or an internal draft.
4. Explain any deployment, analytics or data risk before proceeding.

## After making a change

1. Run `npm run build`.
2. Explain what changed in simple English.
3. Explain how Kenneth can test it.
4. Show the Git status.
5. Do not push unless Kenneth clearly asks for it.

## Current notes

- `src/app/flags.ts` keeps retired free messaging switched off.
- Consent: `src/app/CookieConsent.tsx` + `src/app/analytics.ts` implement
  Google Consent Mode (default-denied in `index.html`, before GTM loads) and
  a real cookie banner; `/privacy` and `/terms` pages exist and are linked
  from the footer and above the Contact form. Meta Pixel doesn't understand
  Consent Mode the way Google's tools do — a GTM-side trigger checking the
  `consent_marketing` dataLayer event still needs to be built in the GTM
  container itself (outside this repo) before Meta tracking actually respects
  a visitor's choice.
- SPA route changes now fire a GA4 `page_view` (`RouteTracker` in
  `src/main.tsx`) — previously only the first page load of a visit was ever
  counted.
- `vercel.json` has security headers (X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy) live, and a Content-Security-Policy in
  **Report-Only** mode (logs violations, blocks nothing). Before switching it
  to enforcing: deploy to preview and watch the browser console for
  `Content-Security-Policy-Report-Only` violations for a few days — the
  allow-list was built from every external domain found in the code, but GTM
  loads some tags from its own dashboard config, which this repo can't see.
- `.github/workflows/ci.yml` runs `npm run build` (typecheck + build) on every
  push/PR to master/main/staging — not yet pushed, so not active on GitHub yet.
- Pricing page (`/pricing`) is hidden from the Navbar, Footer, and the
  Features-page CTA as of 2026-09-07 — the route itself still works for
  anyone with the direct link, and it's off `public/sitemap.xml`. Nothing
  else about the page changed.
- A full outside audit of this site (claims accuracy, performance,
  accessibility, security headers, analytics) lives at
  `EdBuddies_Website_Audit_Report.html` (not in this repo —
  `~/.codex/.chatgpt-projects/g-p-69240b1587c48191be52b8d22a9e0331/`), kept
  updated with fix status per issue as work lands.

## Session update — 2026-09-07

Committed locally as `76aa12e` ("feat: rebrand to logo blue, audit fixes, and
site cleanup"). **Not pushed** — nothing has gone live from this session.

### Brand color: orange → logo blue

Site-wide secondary color changed from `#FF8000` to `#0FB8F1` (sampled
directly from the new logo file, `public/assets/logo-horizontal.webp`).
Every derived shade (hover-darkens, light tints, darkened-for-contrast text
variants, gradient partners) was recalculated from `#FF8000`'s shade rather
than hand-picked, so contrast ratios and tint relationships carry over
unchanged — see `theme.css`'s `--secondary` token for the anchor value.
Left alone on purpose: the semantic warning-orange (`text-orange-500` on
`AlertTriangle` icons), the "Coming Soon" status badges, Google's/Instagram's
own brand colors in their icon SVGs, the destructive/error red token, and
`AppPremium.tsx` (confirmed dead code — not imported or routed anywhere).

### Logo

New logo (mascot + wordmark, navy/light-blue) replaces the old one in the
Navbar and Footer. Source files for all four variants (brand-mark, wordmark,
horizontal and stacked combinations, plus a light-on-dark variant for the
footer) are under `public/assets/New Logo/`. The live files are
`logo-horizontal.webp` (Navbar, light background) and
`logo-horizontal-dark.webp` (Footer watermark, dark background) — both WebP,
~200KB each, down from ~1.2MB PNGs.

### Other changes this session

- Malaysia WhatsApp number corrected to `+6017-566 5935` (Footer + Contact
  page) — the old number was wrong.
- Real product mockup (`public/assets/EdBuddies-mockup.webp`) replaces a
  stock Unsplash placeholder in the homepage's "Everything Your Centre Needs"
  section.
- Animated Southeast Asia markets map (`src/app/components/ui/map.tsx`,
  `dotted-map` package) added to the About page, replacing a static image.
- Mobile hero bug fixed: floating feature icons were overlapping the
  headline text on screens ≤1100px (a stuck scroll-linked CSS transform never
  reset when the scroll animation is disabled at that breakpoint).
- Performance: mascot video 4.6MB → 153KB, both logo files ~1.2MB → ~200KB
  each, a 1.8MB unused `favicon.svg` removed entirely.
- Accessibility: skip link + `<main>` landmark added to all 7 pages that
  lacked one (home, Features, Pricing, Contact, About, Privacy, Terms);
  Contact form labels connected to inputs; all FAQ accordions (12 buttons
  across home/Pricing/Contact) get `aria-expanded`/`aria-controls`; small
  orange text darkened for contrast; `prefers-reduced-motion` respected for
  plain CSS animations (Framer Motion's JS-driven animations aren't covered —
  would need each component wired to `useReducedMotion()` individually).

## Features architecture draft — 2026-07-30

The redesigned feature architecture is implemented locally but has not been
pushed or deployed.

### Overview and routes

- `/features-new` is the redesigned internal feature-overview draft.
- The existing `/features` page remains unchanged and is still the destination
  when the main `Features` navbar label is clicked.
- Six detail routes are registered through `/features/:featureId`:
  - `/features/enrolment`
  - `/features/class-management`
  - `/features/billing-payments`
  - `/features/parent-communication`
  - `/features/reporting`
  - `/features/ai`
- Unknown feature slugs render the existing `NotFound` page.

### Navigation decisions

- `src/app/Navbar.tsx` now contains a Worksy-inspired desktop mega menu under
  `Features`.
- The menu groups the six pages into `Centre operations` and
  `Engagement & insights` and includes a contextual preview card.
- The menu supports mouse hover, keyboard focus and Escape-to-close behaviour.
- Mobile navigation uses an expandable feature-category list.
- The mega menu's `View all features` link opens `/features-new` while the
  redesigned overview remains under review.
- Feature detail pages do not contain the removed horizontal category switcher,
  an `All features` hero button or a `Connected features` cross-link section.
  Switching between feature categories should happen through the header mega
  menu. Breadcrumbs remain for hierarchy context.

### Content and product safeguards

- Feature detail content is shared through `src/app/FeatureDetail.tsx` and is
  selected from the URL slug.
- Teacher and staff administration is covered inside
  `Classes & Student Management`; it is not a separate top-level feature page.
- EdBuddies AI is described only as product direction for AI-assisted
  test-paper marking. Its page must continue to state that availability is to
  be confirmed.
- No pricing, free-plan claims, unsupported statistics or invented customer
  claims were added.

### Current local files

- Modified: `src/app/FeaturesNew.tsx`
- Modified: `src/app/Navbar.tsx`
- Modified: `src/main.tsx`
- New/untracked: `src/app/FeatureDetail.tsx`
- Modified: `CLAUDE.md` (this handoff update)

### Verification and next decision

- `npm run build` passes with the existing Vite warning that the main JavaScript
  bundle exceeds 500 kB after minification.
- All six detail routes were checked locally, the mega-menu links were tested,
  and no browser console errors were detected.
- The local preview command is `npm run dev -- --host 127.0.0.1`; then open
  `http://127.0.0.1:5173/features-new`.
- Nothing has been pushed or deployed. The public `edbuddies.ai` WordPress site
  is unchanged.
- Before production, Kenneth must decide whether to replace the existing
  `/features` route with `FeaturesNew` and whether the new feature pages should
  be added to footer navigation and the sitemap. Do not make that swap or deploy
  without explicit approval.
