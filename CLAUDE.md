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
- `/features-new` is an internal draft route.
- GA4, Google Tag Manager and Meta Pixel still require a separate connection
  audit.
