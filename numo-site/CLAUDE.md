# Numo Site

Marketing site for Numo — a Bitcoin point-of-sale app. Next.js 16 (App Router), React 19, Tailwind v4, TypeScript. Deployed on Vercel.

## Authoritative context — read these, don't restate them

Product and design truth live at the **repository root**, one level above this directory:

- **`../PRODUCT.md`** — users, purpose, positioning, capabilities, brand voice, evidence. Binding for anything factual or written.
- **`../DESIGN.md`** — the visual system: palette, type scale, spacing, components, and the named rules that govern them.

This file deliberately contains no product or design guidance. An earlier version duplicated both, drifted out of sync, and ended up contradicting them — most seriously on custody. Add durable product facts to `PRODUCT.md` and visual decisions to `DESIGN.md`; keep this file limited to how the repository works.

### Before writing or editing copy

Check `PRODUCT.md` → *Capabilities and Constraints* first. Several claims are constrained by fact rather than taste — custody, platform support, distribution, and fees each have a precise form the copy must take. `PRODUCT.md` → *Evidence on Hand* lists what may be cited and what must never be invented (there are no testimonials, install counts, or usage metrics).

## Layout

The app lives in `numo-site/`, **not** at the repository root.

```
src/app/          routes: / · /setup · /releases · /privacy · /export/offline
src/app/globals.css   design tokens (@theme), font classes, reduced-motion block
src/components/   BentoCard · Button · Navigation · SectionHeading ·
                  PayoutSetupGuide · ReleaseEntry · ReleaseImage ·
                  WorksOfflineAnimation
src/data/         releases.ts — the versioned changelog rendered by /releases
public/           setup/ · releases/ · wallets/ screenshots and logos
```

## Commands

Run from `numo-site/`. **npm** is the maintained package manager.

```bash
npm run dev     # next dev --webpack, with WATCHPACK_POLLING=true
npm run build
npm run lint
```

## Conventions

- **Fonts** are loaded in `src/app/layout.tsx` via `next/font/google` and exposed as CSS variables consumed in `globals.css`. Declare only the weights actually used — each one is a self-hosted file shipped to every visitor.
- **Release notes** are data, not markup: add an entry to `src/data/releases.ts` and put its screenshots under `public/releases/v<version>/`. Not every release has screenshots, and that is fine.
- **Motion** is load-bearing content here, and `globals.css` carries a global `prefers-reduced-motion` block. Keep it working when adding animation.
