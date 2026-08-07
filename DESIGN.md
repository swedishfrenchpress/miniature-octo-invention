---
name: Numo
description: A Bitcoin point-of-sale site built like painted shop signage — ink on cream, one coat of fresh mint.
colors:
  signwriters-ink: "#0A2540"
  ink-light: "#1a3a5c"
  fresh-paint-mint: "#5EFFC2"
  mint-soft: "#E8FFF5"
  mint-pale: "#F0FFF8"
  awning-cream: "#FAF8F5"
  butcher-paper: "#F5F0E8"
  white: "#FFFFFF"
  gray-50: "#FAFAFA"
  gray-100: "#F4F4F5"
  gray-200: "#E4E4E7"
  gray-300: "#D4D4D8"
  gray-400: "#A1A1AA"
  gray-500: "#71717A"
  gray-600: "#52525B"
typography:
  scale:
    nav: "1.2rem"
    nav-lg: "1.5rem"
    nav-xl: "1.7rem"
    nav-panel: "1.6rem"
    masthead: "2.5rem"
  display:
    fontFamily: "Bebas Neue, Haettenschweiler, Impact, sans-serif"
    fontSize: "clamp(3rem, 8vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Bebas Neue, Haettenschweiler, Impact, sans-serif"
    fontSize: "clamp(3rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.01em"
  title:
    fontFamily: "Bebas Neue, Haettenschweiler, Impact, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  masthead:
    fontFamily: "Bebas Neue, Haettenschweiler, Impact, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.01em"
  nav:
    fontFamily: "Bebas Neue, Haettenschweiler, Impact, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.06em"
  nav-panel:
    fontFamily: "Bebas Neue, Haettenschweiler, Impact, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
  body:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.25em"
  wordmark:
    fontFamily: "Grandstander, cursive"
    fontSize: "clamp(6rem, 20vw, 20rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  annotation:
    fontFamily: "Solitreo, cursive"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "0.5rem"
  md: "1rem"
  card: "2rem"
  card-lg: "3rem"
  pill: "9999px"
spacing:
  gutter: "1.5rem"
  card-gap: "1rem"
  card-sm: "1.5rem"
  card-md: "2rem"
  card-lg: "3rem"
  section: "5rem"
  section-lg: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.signwriters-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.signwriters-ink}"
  button-accent:
    backgroundColor: "{colors.fresh-paint-mint}"
    textColor: "{colors.signwriters-ink}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-accent-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.signwriters-ink}"
  button-compact:
    backgroundColor: "{colors.signwriters-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.25rem"
  card-bento:
    backgroundColor: "{colors.awning-cream}"
    textColor: "{colors.signwriters-ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-md}"
  card-bento-warm:
    backgroundColor: "{colors.butcher-paper}"
    textColor: "{colors.signwriters-ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-md}"
  wallet-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.signwriters-ink}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1rem"
  step-marker:
    backgroundColor: "{colors.fresh-paint-mint}"
    textColor: "{colors.signwriters-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    size: "2.5rem"
  nav-link:
    textColor: "{colors.signwriters-ink}"
    typography: "{typography.nav}"
    textOpacity: 0.7
    textOpacityActive: 1
    textColorOnScrim: "{colors.white}"
    textOpacityOnScrim: 0.75
    indicatorHeight: "2px"
    indicatorColor: "{colors.signwriters-ink}"
    indicatorColorOnScrim: "{colors.fresh-paint-mint}"
  nav-logo:
    backgroundColor: "{colors.fresh-paint-mint}"
    textColor: "{colors.signwriters-ink}"
    typography: "{typography.masthead}"
    rounded: "{rounded.sm}"
    size: "2.75rem"
---

# Design System: Numo

## Overview

**Creative North Star: "The Signwriter's Counter"**

Numo's surface is a shop sign, not a dashboard. Bebas Neue set in tight condensed capitals is the painted lettering a signwriter brushes across a storefront window; the cream fields behind it are awning canvas and butcher paper; navy is the ink; and mint is the single wet coat of accent paint applied where the merchant is meant to act. This is why the system looks warm without looking soft, and confident without looking corporate — every headline is a piece of hand-set signage, and everything else is the counter it hangs above.

The atmosphere is **warm, declarative, and demonstrative**. Warm, because no page in this system sits on plain white for long — cream slabs at 2rem and 3rem radii, dusted with a 3% noise texture, carry almost every block of content. Declarative, because the type never hedges: display sizes leap from 1.125rem body straight to 3–8rem headlines with nothing in between competing, and the copy is written in short flat statements. Demonstrative, because this system's most distinctive asset is not a component but an *illustration that runs* — fees getting sliced in half, bills flying across a gap into a terminal that flashes mint, NFC waves pulsing out of a phone. Those animations are load-bearing content. They explain the product where a paragraph would only claim it.

Depth is deliberately withheld. Page architecture is dead flat — cream on white, never a shadow — so that when a shadow does appear, it means something physical is present: a phone, a payment notification, a button you can press. The result reads as daylight rather than glass. A merchant looking at this on a phone in a kitchen should recognise a product built by people who sell things, and a Bitcoin native scrolling the same page should find nothing that smells like a crypto launch.

**Key Characteristics:**
- Condensed uppercase display type as the primary voice, at signage scale
- Cream slabs with deep radii (2rem / 3rem) on white, dusted with 3% noise
- One accent — mint — used only where action or success happens
- Flat page architecture; shadow reserved for depicted physical objects
- Running illustrations that demonstrate a mechanic instead of describing it
- Steep hierarchy: display type and body text, almost nothing between

## Colors

A four-color system — ink, mint, and two creams — deliberately narrow so the accent stays loud. Everything else is a neutral gray doing utility work.

### Primary
- **Signwriter's Ink** (`#0A2540`): The voice of the system. Every headline, every body paragraph, every icon glyph, and the dark inverse sections (site footer, setup hero, Part Two of the setup guide). Body copy runs at 75% opacity, secondary copy at 65%, and captions at 50–55% — the ink is tinted by transparency, never swapped for a gray. **Ink Light** (`#1a3a5c`) exists solely as the hover state of a compact dark button.

### Secondary
- **Fresh Paint Mint** (`#5EFFC2`): The single accent, and the only color in the system that gets to be bright. It appears on the logo tile, on accent CTAs, on the eyebrow labels of dark sections, on active step markers, on the focus ring, and — critically — as the success state that a POS screen flashes to when a payment lands. **Mint Soft** (`#E8FFF5`) and **Mint Pale** (`#F0FFF8`) are card fills for the rare block that should read as adjacent to success without shouting.

### Neutral
- **Awning Cream** (`#FAF8F5`): The default card fill. The warm, barely-there surface that keeps the site from being white-on-white fintech.
- **Butcher Paper** (`#F5F0E8`): The heavier cream. Used for whole-page backgrounds where a section needs to sit *behind* white cards rather than on them — the releases index and the setup guide's Part One both run on it.
- **White** (`#FFFFFF`): Page ground, wallet pills, and the hover state of dark and accent buttons. White is what a button turns into, not what it starts as.
- **Grays 50–600** (`#FAFAFA` → `#52525B`): Borders, dividers, scrollbar track, and the interior of device mockups. Never used for prose — prose is always tinted ink.

### Named Rules

**The One Coat Rule.** Mint is a coat of paint, not a palette. It appears where the merchant acts (CTA), where the system confirms (success flash, active step, valid state), and nowhere else. If a screen has more than a few mint elements, one of them is decoration and should be removed.

**The Tinted Ink Rule.** Secondary and tertiary text is `Signwriter's Ink` at reduced opacity — `/75` for body, `/65` for supporting copy, `/55` and `/50` for captions and timestamps. Never reach for a gray to make text quieter. Gray is for structure; ink is for language.

**The Cream Floor Rule.** Content sits on cream or on ink. Long stretches of pure white are a gap in the composition, not a style — white's job is to separate cream slabs, not to host content on its own.

## Typography

**Display Font:** Bebas Neue (with Haettenschweiler, Impact fallback)
**Body Font:** Sora (with system-ui fallback)
**Wordmark Font:** Grandstander — footer only
**Annotation Font:** Solitreo — handwritten asides only

**Character:** A signwriter's brush paired with a clean engineering hand. Bebas is condensed, uppercase, and set at 0.9 line-height so headlines stack like painted lettering with the courses almost touching. Sora underneath is neutral, geometric, and unhurried at 1.6 line-height. The pairing is the whole brand thesis in two faces: the sign shouts, the counter explains.

### Hierarchy
- **Display** (400, `clamp(3rem, 8vw, 8rem)`, 0.9): Page-level h1 only. Hero headlines and the footer CTA. Always uppercase, always allowed to break across lines at a chosen point rather than wrapping arbitrarily.
- **Headline** (400, `clamp(3rem, 5vw, 4.5rem)`, 0.9): Section h2. Shipped via `SectionHeading`, which offers a smaller `sm` step (2.25rem → 3rem) for headings inside cards.
- **Title** (400, `clamp(1.25rem, 3vw, 2.25rem)`, 0.95): Card headings, FAQ questions, release-note highlight terms, numbered step titles. Still Bebas, still uppercase in most contexts.
- **Masthead** (400, 2.5rem, 1.0): The navigation lockup only — the "N" inside the mint tile and the "Numo" wordmark beside it. Both halves carry a `0.05em` downward nudge, because Bebas sets its caps high in the line box and centering the box alone leaves the glyph above the tile's true middle.
- **Nav** (400, 1.2rem → 1.5rem at `lg` → 1.7rem at `xl`, 1.0): The desktop navigation rail. Tracking loosens as the type grows (`0.06em` → `0.09em` → `0.11em`) — larger Bebas caps need less letter-spacing to stay legible, and the tighter settings at the small end buy back the horizontal room the rail needs to clear the CTA. The mobile disclosure panel sets the same links at a flat 1.6rem / `0.1em`.
- **Body** (400, 1.125rem, 1.625): Sora at `text-lg`, tinted ink at 65–75%. Measure is capped explicitly on editorial surfaces — `65ch` for release summaries, `60ch` for highlight bodies, `52–58ch` for page intros.
- **Label** (600, 0.875rem, `0.22–0.3em` tracking, uppercase): Eyebrows, dates, and status chips. The widest tracking in the system (`0.3em`) belongs to the hero tagline and the releases eyebrow.
- **Wordmark** (Grandstander, `clamp(6rem, 20vw, 20rem)`, white at 10%): One instance only — "NUMO" resting on the footer baseline as architectural texture.
- **Annotation** (Solitreo, `clamp(1.5rem, 3vw, 1.875rem)`, rotated -2°): One instance only — the handwritten "+ all bitcoin lightning wallets!" beneath the wallet grid.

### Named Rules

**The Two Faces Rule.** Bebas carries every heading; Sora carries every sentence. There is no third face for headings, no serif for editorial contrast, and no monospace anywhere. Grandstander and Solitreo are not exceptions to this rule — they are ornaments governed by the rule below.

**The Once Per Page Rule.** Grandstander and Solitreo each appear exactly once in the entire site, and that scarcity is the reason they land. The Grandstander wordmark belongs to the site footer; the Solitreo aside belongs to the wallets card. A second use of either on the same page destroys both. Adding a third decorative face is out of bounds.

**The Nothing In Between Rule.** The gap between 1.125rem body and 3rem+ display is intentional. Do not introduce mid-scale headings (1.5–2.5rem Sora) to soften the jump — the steepness is what makes the display type read as signage rather than as a large paragraph. The Title, Nav, and Masthead steps sit inside that band without breaking the rule, because all three are Bebas: they read as small signage, not as large body copy. The rule bars mid-scale *Sora*, and it bars it in the reading column — chrome is not the reading column.

**The Single Weight Rule.** Bebas Neue ships one weight (400). Applying `font-bold` to it produces synthetic bold, which thickens the strokes unevenly and dulls the condensed silhouette. Prefer size and case for emphasis; treat any existing `font-display font-bold` pairing as legacy to be corrected, not as a pattern to copy.

## Layout

The system is a stack of full-bleed sections, each choosing its own ground (white, cream, butcher paper, or ink) and centering a fixed-width column inside a `1.5rem` gutter. Container widths are chosen by content type rather than by habit: `max-w-7xl` (80rem) for the navigation and the widest demo sections, `max-w-6xl` (72rem) for feature grids and the setup guide, `max-w-5xl` (64rem) for the hero and the releases index, `max-w-4xl` (56rem) for the FAQ. Narrower content — intros, summaries — is capped in `ch` rather than `rem` so the measure stays honest across sizes.

Vertical rhythm is `5rem` (`py-20`) per section, opening to `7rem` (`py-28`) at `md` on the editorial pages. The bento feature grid is a two-column layout at `md` with a tight `1rem` gap, letting cards touch closely enough to read as one composed slab rather than as separate tiles; some cards span both columns to break the rhythm.

Two responsive hinges matter. At **768px (`md`)** the navigation collapses to a hamburger with a grid-rows disclosure panel, the bento grid goes single-column, and display sizes step down. At **1024px (`lg`)** the setup guide switches from a stacked mobile list — where each step carries its own screenshot — to a two-column layout with a sticky screenshot rail on the right and scroll-driven step activation on the left. That is the system's most distinctive layout behavior and its mobile fallback is a genuine alternate composition, not a squeezed version of the desktop one. The navigation hinges on the same two widths for a different reason: the wordmark appears at `lg` and the rail steps up a type size again at `xl`, both governed by how much room is left between the masthead and the CTA.

Editorial pages use an asymmetric rail: the releases index sets a `160px` version column beside a fluid content column, separated by hairline `ink/10` rules with `3.5rem` of vertical padding per entry.

**The Own Ground Rule.** Every section declares its own background. A section that inherits the previous section's ground has not been designed yet — the alternation between white, cream, butcher paper, and ink is the page's primary structural signal, and it does more work here than dividers or spacing do.

## Elevation & Depth

**Flat page, lifted objects.** The page architecture uses no shadows at all. Cards are separated from their ground by tonal contrast (cream on white, white on cream) and by radius, never by elevation. A `BentoCard` has no border and no shadow — just a fill, a deep corner, and a 3% noise texture that gives the surface a faint tooth.

Shadow is reserved for two things: elements that depict a **physical object**, and controls that can be **pressed**. A phone mockup, a payment-received notification, a screenshot frame — these cast real, generous shadows because they are pretending to exist in space. A large CTA button carries `shadow-lg` because it invites a finger. Everything else stays on the page.

### Shadow Vocabulary
- **Surface hairline** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): The navigation logo tile. The lightest possible acknowledgement that an object is sitting on the bar. The scrolled bar itself carries no shadow — it separates from the page with an `ink/10` bottom hairline instead.
- **Pressable** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Large CTA buttons and the payment-received toast.
- **Object** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`): Device mockups inside illustrations.
- **Ink-tinted object** (`box-shadow: 0 28px 60px rgba(10, 37, 64, .2)`): Screenshot frames on light grounds. The shadow is tinted with Signwriter's Ink rather than black, which keeps it warm against cream.
- **Deep object** (`box-shadow: 0 32px 80px rgba(0, 0, 0, .35)`): The setup guide's screenshot carousel, which sits on ink and needs a heavier drop to separate.

**The Earned Shadow Rule.** If an element is not depicting a physical object and cannot be pressed, it does not get a shadow. Adding elevation to a card, a section, or a text block is the fastest way to break this system's daylight character.

**The Noise Floor Rule.** Depth on flat surfaces comes from texture, not lift. The `noise-overlay` treatment — an SVG fractal-noise field at 3% opacity — is the sanctioned way to keep a large cream or ink field from reading as dead flat.

## Shapes

Corners are generous and the scale is unusually wide, which is what keeps a system built on hard condensed capitals from feeling severe. Five steps: `0.5rem` for small utility tiles (the logo, the menu button), `1rem` for nested containers inside illustrations, **`2rem` for the default card**, **`3rem` for feature containers** that should read as a soft-cornered slab (the FAQ, the wallets panel), and full pill for anything interactive or label-like.

Pills dominate — every button, every wallet chip, every step marker, every status badge, and the skip link are fully rounded. Rectangles with small radii appear almost exclusively inside device illustrations, where they are imitating hardware rather than expressing the brand.

Borders are used sparingly and are almost always hairline `ink/10` or `ink/15` dividers doing editorial work — separating release entries, setup steps, FAQ rows, and mobile nav items. Cards carry no border. The one structural use of a heavy border is decorative: a `48px` mint ring at 10% opacity, bleeding off the corner of the setup hero.

**The Pill Or Slab Rule.** Interactive things are pills; content containers are slabs at 2rem or 3rem. There is no middle radius for these two categories — a `0.75rem` button or a `0.5rem` card is out of system.

## Components

### Buttons
- **Shape:** Full pill (`9999px`), no border, in two sizes.
- **Primary (dark):** Signwriter's Ink fill, white text, medium weight, `1rem 2rem` padding at the large size, with `shadow-lg`. Large buttons go full-width below `sm` and auto-width above, with a `200px` minimum.
- **Accent:** Fresh Paint Mint fill with ink text. Used in inverse contexts — the site footer's download CTA — where mint is the only thing that will carry.
- **Light:** White at 90% with ink text; the secondary of a pair over imagery, as in the hero's Zapstore button.
- **Compact:** `0.625rem 1.25rem` padding, `0.875rem` text, no shadow. The navigation's persistent download button. It is the one button in the system that swaps variant with its surroundings — mint `accent` while the bar is transparent over the hero, ink `dark` once the bar becomes a cream board — so the CTA stays the loudest thing on the bar in both states.
- **Hover / Active:** Both large variants invert to a **white fill with ink text** — this system's signature button hover, in which the button appears to lift off the ground rather than darken. Scale `1.02` on hover, `0.98` on active, `200ms`. The compact dark button is the exception: it deepens to Ink Light instead of inverting.

### Cards / Containers
- **Corner Style:** `2rem` default (`BentoCard` radius `md`), `3rem` for feature panels (`radius="lg"`).
- **Background:** Awning Cream by default; Butcher Paper, Mint Pale, Mint Soft, and `gray-100` are the alternate fills.
- **Shadow Strategy:** None, ever. See Elevation.
- **Border:** None.
- **Internal Padding:** `1.5rem` / `2rem` / `2rem→3rem` at `md` for the small, medium, and large sizes.
- **Texture:** Every card carries the `noise-overlay` pseudo-element at 3% opacity.

### Chips
- **Wallet pill:** White fill on cream, full pill, `0.625rem 1rem` padding, a 40px circular logo, and the wallet name in medium-weight ink. Tap-to-pay wallets carry a small ink-filled NFC badge pinned to the top-right corner, overlapping the pill edge — the badge is how the two wallet tiers are told apart at a glance.
- **Status chip:** Ink at 90% with backdrop blur, white `0.75rem` semibold text, full pill. Used as the "Step N" marker floating over screenshots.

### Navigation
Fixed, full-width, and built as **two states of one bar**, crossfading over `300ms` on the smooth curve.

**Over the hero** the bar is transparent, sitting on hero video behind a four-stop black scrim that fades `0.5 → 0` across `190%` of the bar's own height. The long fade is the point: a shorter gradient leaves a visible band edge over moving video. Lettering is white, and the CTA is mint.

**Past 20px of scroll** the bar becomes an opaque Awning Cream board with the 3% noise overlay and an `ink/10` bottom hairline — a painted board, not frosted glass. There is no backdrop blur and no shadow. Lettering turns ink, and the CTA turns dark. Vertical padding tightens from `1.25rem` to `0.75rem`, so the bar physically settles as it lands.

**The masthead** is a `2.75rem` mint tile at `rounded.sm` holding an ink "N", followed by the "Numo" wordmark — both at the Masthead step. The wordmark is held in a box matching the tile's so the two sit on a shared optical centre, and it drops below `lg` where the rail needs the room.

**The rail** is split into two groups by a hairline divider: on-page anchors (Features, Wallets, Integration, FAQ) first, then real routes (Setup, Releases). Anchors stay plain `<a>` so they scroll in place; routes get client-side navigation. The split is doing real work — it tells a merchant which items move the page and which leave it.

**The active indicator** is a `2px` coat of paint that wipes in from the left on hover and stays put on the current item, mint over the scrim and ink on the board. Mint is deliberately *not* used on the cream board, where it reads at about 1.2:1. A scroll spy drives the anchor state from a line `120px` down the viewport, taking the last section whose top has crossed it — so the untitled stretches between sections hold the previous item rather than blanking the indicator out.

**Below `md`** the rail collapses into a panel that opens by animating `grid-template-rows` from `0fr` to `1fr` — no max-height guessing — while the hamburger's three bars rotate into an X. Panel links step up to the Nav Panel size, divided by `ink/10` hairlines with a heavier `ink/25` rule marking the anchors/routes seam. The collapsed panel carries `inert`, because `grid-rows-[0fr]` hides links visually but leaves them focusable.

### FAQ Accordion
Rows divided by `gray-200` hairlines inside a `3rem` cream panel. The question is Bebas title-scale; the control is a `40px` circle outlined in `ink/30` containing a `+` glyph, which on hover fills solid ink with a white glyph, and on open rotates `45°` into an X. The answer discloses via the same `grid-template-rows` technique, `300ms` smooth, with opacity following.

### Numbered Steps
The setup guide's spine. A `2.5rem` mint circle holding a Bebas numeral marks the active step; inactive steps show a hollow white-outlined circle at 35% opacity. On desktop the list scrolls past a sticky screenshot rail, with an IntersectionObserver promoting whichever step is centered; each active step is confirmed by a mint "Shown on the right" label. On the overview page the same idea is set differently — large `01`–`04` numerals in ink at 25% opacity, each step carrying its own screenshot.

### Screenshot Frame (signature)
App screenshots are presented in a black bezel: `0.5rem` of black padding, a `2rem`–`2.25rem` outer radius with the image clipped to a matching inner radius, and a `1px` ring. Instructional screenshots carry an animated hotspot — a `48px` red ring with a white halo and a pinging outer ring — positioned by percentage coordinates over the exact control being described. A caption in tinted ink or white sits beneath at `0.75rem`.

### Running Illustrations (signature)
The system's defining asset class: pure CSS/SVG scenes that loop to demonstrate a product mechanic — a `2.9%` and a `30¢` sliced in half by a red line, banknotes flying across a gap into a terminal that flashes mint and stamps a checkmark, NFC waves pulsing in three staggered rings, payment notifications stacking into a list. They are built from long multi-keyframe sequences (8.5s–12s), are gated on viewport entry, and are content rather than decoration.

## Do's and Don'ts

### Do:
- **Do** give every section its own ground — white, Awning Cream, Butcher Paper, or Signwriter's Ink. Alternation is the page's structure.
- **Do** tint text with ink opacity (`/75`, `/65`, `/55`, `/50`) rather than reaching for a gray.
- **Do** spend the mint on action and confirmation only, per **The One Coat Rule**.
- **Do** invert large buttons to a white fill on hover; it is the system's signature interaction.
- **Do** cap editorial measure in `ch` (52–65ch) and use `[text-wrap:balance]` on headlines, `[text-wrap:pretty]` on body.
- **Do** use `cubic-bezier(0.32, 0.72, 0, 1)` as the default easing for disclosure and state change, at `200ms` for micro-transitions and `300ms` for panels.
- **Do** disclose panels by animating `grid-template-rows` between `0fr` and `1fr`, as the nav and FAQ both do.
- **Do** build a mechanic as a running illustration before writing a paragraph that asserts it.
- **Do** keep `prefers-reduced-motion` honored — the global reduce block in `globals.css` is load-bearing given how much of this system moves.

### Don't:
- **Don't** put a shadow on a card, section, or text block. Shadow means "physical object" or "pressable" — nothing else.
- **Don't** introduce a third typeface, or use Grandstander or Solitreo more than once per page.
- **Don't** apply `font-bold` to Bebas Neue; it ships a single weight and synthesizes an uneven bold.
- **Don't** fill the gap between 1.125rem body and 3rem display with mid-scale headings.
- **Don't** use radii between `1rem` and `2rem` on cards, or anything but a full pill on buttons and chips.
- **Don't** revive the twelve unused pastel tokens (`--blue`, `--yellow`, `--red`, `--orange`, `--purple`, `--teal` and their `-soft` pairs) in `globals.css`. They were scoped to wallet pills that shipped white instead; treat them as dead and delete them rather than finding a use.
- **Don't** use the overshoot easing `cubic-bezier(0.34, 1.56, 0.64, 1)` outside a payment-success confirmation. Bounce is the sound of a sale landing, and it means nothing if it is everywhere.
- **Don't** use gray for prose or mint for large fills. Gray is structure; mint is a coat of paint.
