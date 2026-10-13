# asmiee — Interactive Terminal Website

A Vercel-ready **Next.js 16 + React 19 + TypeScript** experience for asmiee. The initial full-screen terminal leads to branded color previews, while `/exit` opens an alternate regular website preview. The dotted **asmiee** wordmark is rendered using actual spring-physics particles in Canvas, not a static image.

## Features

- Full-screen purple-on-black CMD-inspired UI, timed startup and functioning terminal input.
- Responsive command directory at the right; click a command to insert it, then press Enter to run.
- Working `/home`, `/about`, `/services`, `/projects`, `/contact` routes. These are intentionally **solid-color placeholders**, not finished inner pages.
- `/exit` opens the off-white/purple standard website preview at `/site`.
- `/help`, `/ls`, `/whoami`, `/status`, `/clear`, `/cls`, `/back`; Up/Down arrows cycle command history.
- Terminal routes are real Next.js URLs, so browser back works. The placeholder back button and Escape key return to `/terminal`.
- Pointer-reactive particle lettering with reduced-motion support, DPR handling, and particle limits for smaller screens.
- Responsive tablet/mobile layout, accessible labels/focus indicators, SEO metadata, and provisional SVG favicon.
- No backend, authentication, external image dependencies, API keys, or environment variables.

## Quick start

Requires **Node.js 20.9+** (Node 22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000, then try `/help`, `/about`, `/back`, `/exit`.

For local production:

```bash
npm run build
npm run start
```

## Vercel deployment

1. Unzip this project, create a GitHub repository, and push the *project contents* to the repo root (not a parent folder).
2. In Vercel, select **Add New → Project** and import the GitHub repository.
3. Framework preset should detect **Next.js**; root directory is `./`.
4. Build command: default `next build`. No environment variables needed.
5. Click **Deploy**. Use the assigned `*.vercel.app` address, or later add your own domain in **Settings → Domains**.

Do **not** point a custom domain at this preview until the company approves the replacement of its live site.

## Editing content and branding

- `lib/config.ts` — company references, commands and placeholder colors.
- `app/globals.css` — global brand palette near the top and all layout styles.
- `components/TerminalExperience.tsx` — commands, boot lines, input and command directory.
- `components/ParticleWordmark.tsx` — dotted company name, particles and mouse interaction.
- `components/PlaceholderPage.tsx` — temporary colored routes.
- `components/StandardSite.tsx` — `/exit` regular website preview.
- `public/asmiee-mark.svg` and `app/icon.svg` — **temporary original symbol**, not the official logo.

### Brand color caveat

The public [asmiee LinkedIn](https://www.linkedin.com/company/asmiee/) cover features purple type on a light/white background and the phrase **WE CODE FOR PEOPLE.** No accessible published design system or official HEX references could be verified, and the current `asmiee.com` site did not load in the research tool. Consequently the theme is a **close visual interpretation**: primary plum `#542B5C`, accent purple `#B884C5`, dark `#0C0910`, paper `#F8F6F8`. These are NOT asserted to be official brand HEX codes. Replace them once the logo or style guide is supplied.

## Important scope notes

- As requested, inner pages remain flat color screens until designs are finalized. The regular website has an attractive but **provisional** overview.
- Contact links point to the company LinkedIn profile; there is **no fabricated email/contact form**.
- No official logo was embedded because an unambiguous downloadable asset could not be verified; the typographic wordmark and editable SVG mark are placeholders.
- `npm run typecheck` and `npm run build` require dependencies installed via `npm install`.
