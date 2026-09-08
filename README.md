# EdBuddies Website

This is the source code for the new EdBuddies marketing website.

It is currently used for review and testing on Vercel. It is not the public
website at `edbuddies.ai` yet. The public website remains on WordPress until
Kenneth approves the change.

## Important safety rule

The `master` branch is connected to Vercel through GitHub. Pushing to GitHub
may create a new deployment. Do not push, deploy, change the domain or transfer
the repository without Kenneth's approval.

## Working folders

- `EdBuddies-Website` — CONTROL and final integration on `master`
- `EdBuddies-Development` — website development on `website-dev/main`
- `EdBuddies-SEO` — SEO/GEO work on `seo-geo/main`

Always open the folder for the task. Do not switch these worktrees onto one
another's branches, and do not use Claude's automatic worktree mode for this
repository.

## Start the website on your computer

1. Install the required packages:

   `npm install`

2. Start the local website:

   `npm run dev`

3. Open the local address shown in the terminal. It is normally:

   `http://localhost:5173`

## Check that the website can build

Run:

`npm run build`

The completed build is placed in the `dist` folder. The `dist` folder and
`node_modules` are computer-generated and are not saved to GitHub.

## Main files

- `src/app/App.tsx` — home page
- `src/app/Features.tsx` — current features page
- `src/app/FeaturesNew.tsx` — internal draft features page
- `src/app/About.tsx` — about page
- `src/app/Contact.tsx` — contact page
- `src/app/Pricing.tsx` — pricing page
- `src/app/flags.ts` — website message switches
- `src/app/seo.ts` — search-engine information
- `public` — images, videos, icons and other public files

## Current messaging

Free or zero-cost product messaging is switched off. Do not make it public
again unless Kenneth approves it.

The `/features-new` page is an internal draft. Review it before making it part
of the public navigation.

## Analytics and private information

The GA4, Google Tag Manager and Meta Pixel setup has not yet been fully audited.
Do not guess tracking IDs or add secret keys to the code.

## GitHub

- Repository: `marketing-edbuddies/edbuddies-web`
- Main branch: `master`
- Production preparation: Vercel
- Final live transfer: a later step that requires Kenneth's approval

<!-- deploy pipeline test: 2026-08-27T07:09:40Z -->
