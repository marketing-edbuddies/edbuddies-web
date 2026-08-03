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

## Safety rules

- The public `edbuddies.ai` website remains on WordPress.
- This repository remains on Vercel for review and production preparation.
- Do not push, deploy, change domains, transfer ownership or change Vercel
  settings without Kenneth's approval.
- Do not publish product pricing or free/zero-cost claims unless Kenneth
  approves the exact wording.
- Do not expose passwords, API keys, access tokens, customer data or tracking
  credentials.
- Keep files in `public/assets` unless the code references have been checked.

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
- GA4, Google Tag Manager and Meta Pixel still require a separate connection
  audit.

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
