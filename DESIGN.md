---
name: Numo
description: A Bitcoin point-of-sale site built like a warm merchant counter — GC Protage display headers paired with Sora body, ink on warm paper and sunken cream, one fresh coat of mint.
colors:
  signwriters-ink: "#0A2540"
  ink-light: "#1a3a5c"
  ink-deep: "#06182B"
  fresh-paint-mint: "#5EFFC2"
  mint-soft: "#E6FFF4"
  vermilion-slash: "#D93829"
  paper: "#FBFAF7"
  sunken-cream: "#F2EEE6"
  surface-white: "#FFFFFF"
  line: "rgb(10 37 64 / 0.11)"
  line-strong: "rgb(10 37 64 / 0.2)"
  gray-50: "#FAFAFA"
  gray-100: "#F4F4F5"
  gray-200: "#E4E4E7"
  gray-300: "#D4D4D8"
  gray-400: "#A1A1AA"
  gray-500: "#71717A"
  gray-600: "#52525B"
typography:
  display:
    fontFamily: "GC Protage, Sora, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, max(min(9.8vw, 2.625rem), 6.2vw), 5.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.01em"
  h2:
    fontFamily: "GC Protage, Sora, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "0.015em"
  title:
    fontFamily: "GC Protage, Sora, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.28
    letterSpacing: "0.02em"
  h3:
    fontFamily: "GC Protage, Sora, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.02em"
  lead:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.0625rem / 1.1875rem md"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  caption:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
rounded:
  chip: "6px"
  control: "10px"
  card: "16px"
  frame: "24px"
  pill: "9999px"
spacing:
  content: "72rem"
  gutter: "1.5rem / 2.5rem md / 3rem lg"
  section: "6rem / 8rem md / 9rem lg / 10rem xl"
  block: "3.5rem / 4.5rem md / 5.5rem lg / 6rem xl"
  header-top: "4.5rem / 7rem md / 8rem lg"
  header-bottom: "4rem / 6rem md / 7rem lg"
components:
  button-mint:
    backgroundColor: "{colors.fresh-paint-mint}"
    textColor: "{colors.signwriters-ink}"
    rounded: "{rounded.control}"
    height: "3rem (lg) / 2.75rem (md)"
  button-primary:
    backgroundColor: "{colors.signwriters-ink}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.control}"
    height: "2.75rem (md) / 2.25rem (sm + 44px hit extension)"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.signwriters-ink}"
    rounded: "{rounded.control}"
    height: "2.75rem (md)"
  stage-frame:
    backgroundColor: "{colors.sunken-cream}"
    rounded: "{rounded.frame}"
    shadow: "none"
  wallet-tile:
    backgroundColor: "{colors.surface-white}"
    border: "1px solid {colors.line}"
    rounded: "14px"
---

# Design System: Numo

## Overview

**Creative North Star: "Warm Counter Editorial"**

Numo's website is built for daylight on a real shop counter, not a dark crypto trading terminal or an anonymous B2B SaaS template. It pairs expressive, sentence-case **GC Protage** display headings with calm **Sora** body typography, warm physical surfaces (**Paper** `#FBFAF7` alternating with **Sunken Cream** `#F2EEE6`), deep **Signwriter's Ink** (`#0A2540`) for language and bookends, and a disciplined coat of **Fresh Paint Mint** (`#5EFFC2`) reserved strictly for brand authorship, primary dark-ground CTAs, and active/success confirmations.

The atmosphere is **calm, declarative, and concrete**. Calm, because pages alternate softly between warm paper and richer cream grounds rather than stacking heavy boxes or glossy gradients. Declarative, because headlines sit in medium-weight sentence case with generous breathing room and short, verifiable statements. Concrete, because every claim is backed by real hardware renders, live payment illustrations (`FeeStage`, `BTCPayDemo`), authentic app screenshots, and a dated changelog.

**Key Characteristics:**
- **GC Protage** self-hosted display headers paired with **Sora** (`400 / 500 / 600`) body and UI copy
- Deliberate ground alternation: Dark Ink Hero → Paper Showcase (with Sunken Stages) → Sunken Wallets (with White Tiles) → Paper FAQ → Dark Ink Footer
- **One Coat Mint (`#5EFFC2`)**: app icon tile, Hero & Footer dark-surface primary CTAs, active indicators, success confirmation, focus ring, and text selection
- Flat page architecture with no shadows anywhere; edges are a hairline or a change of tone
- Opaque scrolled navigation bar (never frosted blur over scrolling imagery) with explicit anchor/route separation and an underline-free tonal pill active state
- Non-blocking transparent download flow (`DownloadMenu`) surfacing Direct Android APK and Zapstore up front

## Colors

### Primary & Accent
- **Signwriter's Ink (`#0A2540`)**: Primary voice for headings, body copy, light-ground primary buttons, and the closing footer ground. Supporting body copy runs at `/70` opacity (`5.57–5.89:1` AA pass across all light grounds); captions stop at `/65` (`≥4.8:1` floor). **Ink Light (`#1a3a5c`)** is the primary button hover state. **Ink Deep (`#06182B`)** backs the hero video scrim and Android hardware bezels.
- **Fresh Paint Mint (`#5EFFC2`)**: The single bright accent (`12.8:1` AAA contrast paired with `#0A2540` text). Used on the app icon tile, Hero and Footer primary CTAs, FAQ open control, Signwriter's Ink security-note status dot, `:focus-visible` ring core, `::selection`, and payment-received confirmations.
- **Mint Soft (`#E6FFF4`)**: Quiet confirmation tint for small badges (`NFC tap`, `Auto-updates`, `Latest` release chip), always paired with `#0A2540` text.
- **Vermilion Slash (`#D93829`)**: Reserved strictly for the diagonal strike crossing out `2.9% + 30¢` in `FeeStage`.

### Grounds & Structure
- **Paper (`#FBFAF7`)**: Default page ground, scrolled navigation board, Showcase, FAQ, and editorial headers.
- **Sunken Cream (`#F2EEE6`)**: Alternating warm ground for full-bleed sections (`Wallets`, `/setup` Open your till & Optional extras, `/releases` featured release, `/btcpay` showcase, `/privacy` body) and Showcase visual stages. Clearly separates from Paper even in bright counter daylight.
- **Surface White (`#FFFFFF`)**: Crisp cards, wallet tiles, notification cards, and callout boxes sitting on Sunken Cream or bounded by `line-strong`.
- **Lines (`--line` 11% ink / `--line-strong` 20% ink)**: Editorial rules, structural dividers, and crisp borders.
- **Grays 50–600**: Reserved for depicted third-party software, never for site prose. The `/btcpay` demo no longer uses them: it carries BTCPay Server's and the Numo app's own tokens in its CSS modules.

### Named Rules

1. **The One Coat Rule.** Mint marks action on dark grounds, brand authorship, and confirmed states — never decorative walls of mint and never mint text on light backgrounds.
2. **The Own Ground Rule.** Adjacent sections alternate grounds (`Paper` ↔ `Sunken Cream` ↔ `Ink`) separated by hairline `line` dividers so no page ever degrades into an endless monochrome stretch.
3. **The Tinted Ink Rule.** Secondary prose uses `navy/70` and captions `navy/65` (`4.5:1` AA floor). Never reach for cool grays on warm grounds.
4. **The No Shadow Rule.** Nothing on the site casts a shadow: no drop shadow, no glow, no lift under screenshots, panels, cards, buttons, or popovers. An edge is made one of two ways, tonal contrast with the ground or a single ink hairline (`ring-1 ring-navy/10`), never both and never a soft shadow. There are no shadow tokens; do not add one. The focus ring is a ring, not a shadow.
5. **The Depicted Object Rule.** A depicted product (`BTCPayInvoices`, `NumoApp`) is a transcription of the real interface, never an invention: its own typeface, tokens, icons, labels, and native pixel sizes, taken from that product's source and scaled as a whole object. It MUST be wrapped in `inert` so simulated buttons and inputs never enter keyboard focus or assistive technology trees. If a detail cannot be verified against the real product, leave it out rather than guess.
6. **The No Middot Rule.** Never use `·` (interpunct/middot) separators anywhere in copy, labels, captions, or UI chrome. Use plain sentences, spacing, or real layout structure instead.
7. **The No Arrow Rule.** Never use text arrows (`→` or `->`) in links, buttons, UI labels, or copy. Write plain English (e.g. `Setup guide`, `Withdrawals under Payments`) instead.
8. **The Measure Rule.** Paragraphs of lead text run to one reading width, the `measure` utility (`44rem`, about 70 characters a line). Use it for page intros, section intros, and guide steps; never cap a paragraph at an ad hoc `30rem`-ish width that leaves it reading as a narrow strip under a wide heading. A narrower column (a pinned-screen layout, a two-up list) holds the text tighter on its own. The hero intro is the exception: its width is set by hand to control its line breaks.

## Typography

**Display Font:** GC Protage (`500`, `600`, self-hosted locally via `next/font/local` from `src/fonts/`, with per-glyph fallback to Sora)
**Body & UI Font:** Sora (`400`, `500`, `600`, self-hosted via `next/font/google`)

- **`.text-display`**: `clamp(1.875rem, max(min(9.8vw, 2.625rem), 6.2vw), 5.25rem)`, weight `500`, tracking `0.01em`, line-height `1.1` — Page `h1` and major section anchors (`text-wrap: balance`). Scales with the viewport below `428px` so the longest headline line still fits a `360px` phone.
- **`.text-h2`**: `clamp(1.875rem, 4vw, 3.25rem)`, weight `500`, tracking `0.015em`, line-height `1.14` — Section and Showcase headings.
- **`.text-title`**: `1.5rem`, weight `500`, tracking `0.02em`, line-height `1.28` — Release titles, wallet groups.
- **`.text-h3`**: `1.25rem`, weight `600`, tracking `0.02em`, line-height `1.35` — Step headings, card headings, highlight titles, privacy headings.
- **`.text-lead`**: `1.0625rem` → `1.1875rem` (`md`), weight `400`, line-height `1.55` — Section intros (Sora).
- **Body (`text-base`)**: `1rem`, weight `400`, line-height `1.6` — Editorial prose capped at **`max-w-[35rem]`–`36rem`** (`64–70` characters per line in 16px Sora).
- **`.text-caption`**: `0.8125rem`, weight `400`, line-height `1.45` — Captions, timestamps, and metadata.
- **`.tabular`**: `font-variant-numeric: tabular-nums` on every price, satoshi amount, date, version tag, and step numeral.

### Named Rules

1. **The Open Tracking Rule.** GC Protage is drawn with very tight sidebearings (about `0.04em` beside a stem), so the heading scale is never tracked negative. Tracking stays slightly positive and opens as the size drops (`0.01em` display → `0.02em` title and `h3`), and line height never goes below `1.1`. Negative tracking makes pairs like `al`, `ll`, and `rw` collide and the headline reads crushed. The two logo wordmarks are the only exceptions: `tracking-normal` in the lockup, and `-0.03em` on the giant `6%`-opacity footer wordmark.
2. **The Em Measure Rule.** Cap headline widths in `em`, not `ch`. The shipped GC Protage files have no `0` glyph, so `1ch` silently resolves to a `0.5em` guess. Measure the longest line that must stay whole and leave about `0.4em` of slack.
3. **The Whole Word Rule.** Headings break between phrases only: never at a hyphen (`unbrokenHyphens` in `ReleaseEntry.tsx`) and never after a one-letter word (bind it to its noun with a non-breaking space in the data).
4. **The Demo Glyph Rule.** The font files in `src/fonts/` are the GC Protage demo cut: `A–Z`, `a–z`, space, comma, and period only. Digits, apostrophes, hyphens, question marks, and every other mark in a heading render in Sora. Keep numerals and symbol-heavy strings out of display headings where copy allows, until the full family is licensed.

## Layout & Navigation

- **Spacing roles (`globals.css`):** four named intervals carry the page's air, each a CSS variable that steps up with the viewport and each applied through one utility. Change the variable, never a one-off class.
  - **`shell`** (`--gutter`): the page column. `72rem` (`1152px`) of content, centered, with a gutter of `1.5rem`, `2.5rem` from `md`, `3rem` from `lg`. The wider gutter is what keeps content off the edge of a mid-width window.
  - **`section-y`** (`--section-space`): top and bottom of every full-width section, `6rem` → `8rem` → `9rem` → `10rem`.
  - **`mt-block`** (`--block-space`): from a section's heading block to the content it introduces, `3.5rem` → `4.5rem` → `5.5rem` → `6rem`.
  - **`header-y`** (`--header-top`, `--header-bottom`): a page header under the fixed nav, roomier above than below.
- **The Breathing Rule.** The site breathes between groups, never inside them. Section padding, block space, and the gap between feature rows are generous; the gaps inside a group (a headline and its lead at `mt-5 md:mt-6`, a step title and its text at `mt-2`) stay tight, so each group still reads as one thing. Adding air everywhere equally removes the grouping and reads as loose, not calm.
- **Navigation (`Navigation.tsx`):** Fixed `72px` (`md: 84px`) masthead bar with the wordmark alone (`24px` tall, `28px` from `lg`; ink on paper, white over the hero) and `md` (`44px`) `DownloadMenu`. Transparent over the dark Hero scrim with **no rule beneath it**, and no rule at the top of any other page either; snaps cleanly to **opaque `bg-paper`** once scrolled or off-home (zero translucent blur smudging), and only then, with content sliding under it, takes a `1px` `border-line`. The hero's logo marquee likewise sits on the scrim with no rule above it. The short vertical divider between the on-page anchors and the routes stays. Centered desktop rail splits on-page anchors (`Features`, `Wallets`, `FAQ`) from routes (`Setup`, `Stripe`, `Releases`, in that order; `Stripe` is the `/setup/stripe` guide, and a page lights only its most specific link, so `/setup/stripe` marks `Stripe` and not `Setup`; `/btcpay` is reached from the footer and the setup guide's closing band, not the bar) with a `1px` vertical divider and marks the active destination with a tonal pill alone (`bg-sunken` on paper; `bg-white/15` on dark): **no outline or ring around it**, and no underlines. Over the Hero, the top-right `DownloadMenu` stays `ghost-inverse` (hidden on mobile fold) so the Hero's Mint CTA owns first focus.
- **Touch targets:** Every interactive control — including short footer links (`X`, `FAQ`, `Nostr`) and desktop nav links — maintains a minimum **`44×44px`** hit area (`min-h-11 min-w-11` or `::after` hit extension).

## Key Components

- **Buttons (`Button.tsx`):** `10px` radius (`rounded-control`), three clear sizes (`sm` `36px + 44px ::after`, `md` `44px`, `lg` `48px`), five semantic variants (`mint`, `primary`, `secondary`, `inverse`, `ghost-inverse`). All are flat fills; `secondary` and `ghost-inverse` are edged with a `1px` ring and nothing carries a shadow or inner highlight.
- **Download Chooser (`DownloadMenu.tsx`):** Lightweight non-blocking disclosure popover (standard link traversal + Escape/blur dismiss) revealing **Direct Android APK (GitHub Releases)** and **Zapstore (Auto-updates)** alongside *"Android with NFC"* and a `44px` link to `/setup` (hidden while already on `/setup`).
- **Showcase Stages (`Showcase.tsx`):** Every feature visual sits in a unified `aspect-[5/4] rounded-[24px] bg-sunken` stage — equalizing visual weight across studio hardware renders, the slashed `2.9% + 30¢ → 0%` `FeeStage`, and Android-styled payout notifications. **The Full Stage Rule:** a hardware render is the subject of its row, so it stands nearly as tall as its stage (about `90%`, one even `16–24px` margin, never cropped). The render files are trimmed to the device itself so `object-contain` does the fitting; never pad a render file with empty canvas or correct it with a per-image `scale`. From `xl` the stage takes the wider column of its row (`1.3fr` to the text's `1fr`).
- **BTCPay Demo (`btcpay/BTCPayDemo.tsx`, `BTCPayInvoices.tsx`, `NumoApp.tsx`):** Two real screens set side by side, straight on the section ground: **no device frame, no backing plate, no overlap, nothing cropped**. The Numo screen stands on the left where the sale starts and the BTCPay page on the right where it lands, sharing top and bottom edges and one edge treatment (a `10%` ink hairline, no shadow). `NumoApp` is the Android app's keypad, Pay, and received screens transcribed from its layout XML (Roboto, `#00C244`, the app's own drawables), shown as a bare rounded screen. `BTCPayInvoices` is BTCPay Server's Invoices page transcribed from its own stylesheets, markup, and icon sprite (Open Sans, `#51B13E`, `New` → `Settled` badges, amounts in `SATS` because that is how Numo creates its invoices). It is the page alone, without BTCPay's sidebar and top bar, so it can be drawn at `1:1` instead of shrunk, and it shows a fixed number of whole rows (eight wide, four compact): a new invoice opens at the top and the oldest slides out under a soft lower edge. Both are authored at native size on a fixed canvas that scales to its slot. In a tablet-width slot (`600–799px`) they stay side by side and the store takes BTCPay's narrow table shape, drawn exactly as tall as the till; below a `600px` slot they stack, the till on top. The story is one sale per loop: keys, Charge, the invoice arrives as `New`, the customer pays, it turns `Settled`, the till shows received, Close. Sales accumulate rather than rewind, and the till's clock moves on between customers. Open Sans and Roboto load on this route only. The demo has one control: a round `44px` pause/play icon button, flat white on the sunken ground, never a pair of text buttons (the loop needs no Replay). Reduced motion holds the settled frame and hides the control.
- **Setup Guide (`setup/page.tsx`, `SetupSequence.tsx`):** One screen at a time. Each part of the guide is a heading, then its steps in large type (`text-title` numeral and title, `text-lead` body), with a single real app screenshot beside them shown as a **bare rounded screen: no drawn device, no stage box, no caption, no shadow**, edged with one ink hairline. From `md` up that screen is pinned in the middle of the window while the steps scroll past, and it cross-fades to whichever step has just scrolled up into view; each step is a third of the window tall, which paces the scroll to one step at a time. Below `md` each step carries its own screen. Every step stays fully readable throughout: the current one is marked only by its title and numeral stepping up from `navy/55` to full ink, never by dimming body text. The page uses four type styles (`text-display`, `text-h2`, `text-title`, `text-lead`); step copy carries **no bold and no emphasis**: on-screen labels are written exactly as the app capitalizes them (`Create New Wallet`), which is enough to pick them out, and the two download links are marked by their underline alone, at the weight and tone of the sentence around them. A screenshot may carry one `ring-navy` outline on the control to tap. Grounds alternate `Paper` header → `Sunken` Open your till → `Paper` Automatic payouts → `Sunken` Optional extras (two quiet text columns) → `/setup`-aware closing footer. No grids of step cards, no cards, badges, or callout boxes.
- **Stripe Guide (`setup/stripe/page.tsx`):** The setup guide's sibling, in the same four type styles and the same `SetupSequence`. Create a key in Stripe is illustrated with real captures of Stripe's dashboard, taken twice so **the screenshot always looks like the screen the reader is on**. Phones get the page at phone width (the `mobileWeb` screen kind, `824 x 1358`), because the app opens that form in the phone's browser. Anything from `md` up gets **a whole desktop window** (`desktopWeb`, a step's `desktop` field): sidebar, top bar, page, and bottom bar, `16:9`, captured at `1088 x 612` and saved at `2x`. **The Whole Window Rule:** a desktop capture is never a cropped strip of a page and never squeezed into a column beside the text; each step is followed by its window at the full width of the shell, capped so it always fits in the window under the nav. Phone screens are tall and pin beside the steps; desktop windows are wide and stack under them. Captures are cropped only to remove the sandbox banner, the account name in the sidebar is replaced with `Your business`, and the onboarding card is hidden. **A key value never reaches a screenshot**: it is replaced in the page before the capture, or erased from the image, and only then blurred, never blurred alone, and screenshots come from a sandbox. Connect it in Numo is three steps with real app captures from a phone (`phoneTall`, `1080 x 2400`), pinned like the setup guide's screens. **App screenshots are taken in the app's light theme**, so they sit on the site's light grounds like the rest of the page; never mix in dark-theme captures. The captures come from a phone that was already connected, so the key field is blurred and **the pay screen's QR is a sample code, never a live payment request**; stray status-bar icons are painted out. The location chooser only appears on a first connection and is not pictured, so choosing a location is described inside the setup-check step. Step copy uses the app's real labels (`Restricted key`, `Ready to take cards`, `Pay with card`). The two closing sections (fixes for a failed check, good to know) are plain title-and-text pairs. Wording follows the app's own strings.
- **Logo (`Logo.tsx`):** The site logo is the **wordmark alone**: `NUMO` in the brand's own condensed capitals, drawn as paths from `public/logos/numo-wordmark-white.svg`, in ink on light grounds and white on dark (`24px` tall in the bar, `28px` from `lg`; `32px` in the footer, where it heads a column of small text). It is never set in GC Protage or any other font, and never paired with the icon as a lockup. The **app icon** (the wordmark's N on a mint tile, from `public/logos/numo-app-icon.svg`, with an app icon's rounding) appears only where Numo stands as an app beside other apps: the Partner Pair, and the favicons, whose N is drawn larger so it reads at `16px`. The footer closes on the wordmark at architectural scale (`640px` wide, `6%` white), whole and standing on the page's bottom edge.
- **Share Image (`public/og-image.jpg`, `lib/shareImage.ts`):** `1200 x 630`, split like a home feature row. Left `660px` on Paper with `72px` margins: the wordmark top left (`46px` tall, ink), and the home headline bottom left in GC Protage `500` at `64px` on three lines (`Bitcoin payments` / `as easy as` / `Apple Pay.`). Right `540px` on Sunken Cream: the `till-tap` render, contained, about `38px` clear top and bottom. **No domain, no intro line, no badge.** It is a static export, so changing the headline or render means rebuilding the composition and exporting it again. Any page that sets its own `openGraph` or `twitter` metadata must pass `SHARE_IMAGE` along, or it is shared with no picture.
- **Partner Pair (`PartnerPair.tsx`):** How Numo is shown working with a partner. Two app-icon tiles of the same size and rounding: Numo's mint tile, then the partner's own (BTCPay's mark on white with a hairline, Stripe's S on Stripe's blurple). From `lg` the pair is the header's picture: large (`176–232px` a tile), hanging in the right half with its top edge level with the capitals of the headline's first line and its right edge on the page's (`PARTNER_HEADER`). Below `lg` it sits over the headline at `64px`. The tiles slide together once as the page opens (`420ms`, strong ease-out) and are still under reduced motion. **No `x`, no dividing rule, no wordmarks, no small logo row above the heading**: the headline names both. Used on `/btcpay` and `/setup/stripe`.
- **BTCPay Sync List (`btcpay/page.tsx`):** What the integration keeps in sync is three parallel facts, so it is a list, not a row of boxes: an `h2` on the left that names the group and a `dl` on the right, each row a `text-title` term over a `text-lead` line, rows parted by one hairline. **Never three same-size cards or bordered columns of heading plus text.** On phones the heading sits above the list.
- **Responsive Behaviour:** Checked at `320`, `360`, `390`, `768`, `1024` and a phone on its side (`844 x 390`); no page scrolls sideways at any of them.
  - **Narrow columns decide for themselves.** `SpecList` is a size container: term and detail sit side by side only when the list itself is at least `28rem` wide, and stack otherwise, so a tablet's half-width column never squeezes a detail into three-word lines.
  - **Pin only in a tall window.** The setup guide pins its phone screen with `md:tall:` (`tall` is `min-height: 40rem`). A phone on its side is wide but short, so it gets the stacked layout with a full-size screen under each step, and the Stripe guide's fit-in-window cap is lifted there too.
  - **Wallets** run two to a row from `375px` and one to a row below it, where the names no longer fit.
  - **Nav:** below `360px` the bar's Download button steps aside so the menu button stays on screen; the menu carries both downloads.
  - **Notches:** the page is `viewport-fit=cover`, and the `shell` gutter is `max(gutter, safe-area inset)` on each side, so full-bleed grounds reach the edge of a phone held sideways while content clears the notch. Mobile browser chrome takes the Paper tone (`theme-color`).
  - **Touch targets** are at least `44px`, including the skip link and the demo's pause button.
  - **Press feedback (the Press Rule).** Every tappable thing answers a finger. The browser's own tap flash is off, so a control with no pressed state gives a phone user nothing. `hover:` is redefined in `globals.css` to do both jobs: under a mouse it shows on hover (`(hover: hover) and (pointer: fine)`, so a touch phone that claims hover never gets a style stuck on after a tap); under a finger the same style shows while pressed (`:active`). So a control's hover look is also its press look, and `group-hover:` follows. Filled and outlined buttons also scale to `0.98`. A link or row with no hover look of its own (menu rows, the logo, inline text links whose hover only darkens an underline) takes `active:opacity-60`. **Never write a bare `:hover` rule in CSS**: gate it with the same media query, as the hero marquee's pause is.
  - **Touch details.** Controls set `touch-action: manipulation` (no wait for a double tap) and `user-select: none` (holding a button does not select its label); links and page copy stay selectable, and links keep their long-press menu. The open phone menu is capped at `100dvh` less the bar and scrolls inside the screen, so it is reachable on a phone held sideways. Heights that track the window use `svh`, never `vh`.
  - **Checked on a real phone.** Sticky hover, press feedback, and the tap flash do not reproduce in a desktop browser's device mode. Test them on hardware: on the Pixel 7a (Chrome, Android) the page reports `hover: none`, `pointer: coarse`, `100vh` `56px` taller than the visible window, and a `24px` bottom inset.

## Motion & Accessibility

- **Curves:** Confident exponential deceleration (`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`) and smooth panel disclosure (`--ease-smooth: cubic-bezier(0.32, 0.72, 0, 1)`). A thing that stays on screen and changes shape (the menu icon becoming a cross) uses `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Curves come from these three tokens, never a hand-typed `cubic-bezier`. No elastic bounce anywhere.
- **Motion rules.**
  - **Press:** every button shrinks to `scale(0.97)` over `150ms` on `--ease-out-expo` and returns the same way. Tailwind's `scale-*` sets the `scale` property, so the transition must name `scale` (or use `transition-transform`); a list that only says `transform` leaves the shrink unanimated.
  - **Transform only.** Things that move are moved by `translate`, `rotate`, `scale`, or `opacity`. Never `transition-all`, and never animate `top`/`left`/`width`/`height` (the FAQ and phone menu open by `grid-template-rows`, the one exception). The menu icon's two bars both rest on the centre line and travel the same distance in the same `200ms`.
  - **Swaps.** When one picture replaces another in place (the setup guide's screens), the new one fades in on top while the old one stays solid underneath and is dropped only once covered, so two never show through each other. Small icon swaps (pause/play) cross-fade with a slight scale and `2px` blur over `150ms`.
  - **Panels grow from their button.** The download menu fades and scales in from `0.97` over `150ms`, from the corner that touches its button, and closes at once.
  - **Keyboard actions do not animate.** The skip link appears instantly.
  - **Arrivals (the Few Arrivals Rule).** The site has four entrances and they are all on the home page; **reading pages (setup, Stripe guide, releases, privacy) have none, and no section heading, wallet tile, FAQ row, or menu row ever fades in.** (1) The hero's headline, intro, and buttons rise `12px` and fade in `70ms` apart as the page opens (`600ms`, `--ease-out-expo`), then the logo strip fades in; CSS only. (2) Each feature row arrives once when it scrolls into view: picture up `16px` and in over `700ms`, words `80ms` behind (`Reveal.tsx`, `.reveal-part`). (3) The payout notifications land one after the other once their row is in (`.reveal-drop`). (4) The fee strike starts from its first frame when its row arrives. A row is only ever hidden by script and only while it is still below the window, so nothing can be left hidden: no script, reduced motion, or a row already on screen all show it as drawn. Do not add a fifth without a reason as specific as these.
  - **Nothing plays unseen.** The hero videos pause when the hero is off screen and resume where they stopped; the BTCPay demo already holds while out of view.
- **Reduced motion:** Global `@media (prefers-reduced-motion: reduce)` CSS block PLUS `usePrefersReducedMotion()` in JS-driven components (`Hero.tsx`, `BTCPayDemo.tsx`). `FeeStage` freezes on its clearly slashed `2.9% + 30¢` → `0%` final state; `BTCPayDemo` holds one frame: the first sale received on the till and `Settled` in the store.
- **Focus & Browser Surfaces:** Two-tone `:focus-visible` ring (`2px` mint + `4px` navy shadow), themed `::selection` (mint on navy), `caret-color: var(--navy)`, and skip-to-content link targeting `<main id="main-content" tabIndex={-1}>`.
