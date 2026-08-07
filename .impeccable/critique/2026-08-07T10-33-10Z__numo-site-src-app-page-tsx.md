---
target: the Numo website (homepage-anchored, all surfaces)
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 5
timestamp: 2026-08-07T10-33-10Z
slug: numo-site-src-app-page-tsx
---
Method: dual-agent (A: af77c932c27fd71c5 · B: a5be6d601950f2731)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Scroll spy, two-state nav bar and FAQ `+`→`×` are genuinely well built; but four `<video>` elements have no `poster` and no loading state, and cross-page anchors change the URL while doing nothing. |
| 2 | Match System / Real World | 2 | "Tap. Done." and "No 2.9% + 30¢" are perfect merchant language — but two illustrations draw a hardware card terminal with a reader slot, the customer's phone is an iPhone, and `layout.tsx:30` sells an "NFC-enabled **terminal**" for a product whose Operating Context says "no dedicated terminal." |
| 3 | User Control and Freedom | 2 | `/privacy` ships with no `<Navigation />` and no footer — a total dead end (confirmed: the file never imports it). `html { scroll-behavior: smooth }` animates 5,000px jumps with no interrupt. |
| 4 | Consistency and Standards | 2 | Three mutually contradictory custody claims across three surfaces. Component consistency is otherwise strong (shared `Button`, `BentoCard`, `SectionHeading`, `Navigation`), which is why this is a 2 and not a 1. |
| 5 | Error Prevention | 1 | No `poster` on any video while `public/hero.png` sits unused; ~6MB of video requested on first paint; the two hero videos have their `moov` atom at **98% of file length**, so no frame can decode until the whole file lands. The fee headline animates `forwards` and stays permanently broken. |
| 6 | Recognition Rather Than Recall | 3 | Wallet logos, the NFC badge convention, real app screenshots and numbered mint steps all work. Docked because "mint" — the party that actually holds the balance — is never introduced on the homepage where custody is claimed. |
| 7 | Flexibility and Efficiency | 2 | **Not n/a.** There is a real nav rail with a scroll spy and deep-linkable anchors. Four of the six rail items are dead when clicked from `/setup` or `/releases`. |
| 8 | Aesthetic and Minimalist Design | 2 | The BTCPay section ships an entire fake dashboard — sidebar, "15" badge, search field, three filter dropdowns, six invented invoices — as decoration for one idea. Six unranked bento claims; one `md:col-span-2` slab with a single child and half of it empty. |
| 9 | Error Recovery | 1 | No error, empty, or offline states anywhere. Videos fail to blank white rectangles; `next/image` has no `placeholder="blur"`, so release images render as empty cream boxes; nothing recovers. |
| 10 | Help and Documentation | 3 | **Not n/a.** `/setup` is excellent and real. Docked hard because **no CTA on the site links to it** — not the hero, not the footer, not even the FAQ's "How do I get started?", which routes to GitHub instead. |
| **Total** | | **20/40** | **Acceptable (bottom of band) — significant improvements needed** |

Nothing is marked `n/a`. Heuristic 7 has a real subject here (a scroll-spy nav rail with anchor deep-links) and heuristic 10 has two genuine documentation surfaces. Scoring them `n/a` would hide two of the site's biggest losses.

## Design Specificity Verdict

**The utility page is the designed one; the marketing page is the generic one. That inversion is the headline finding.**

### LLM assessment

The hero is authored. "BITCOIN PAYMENTS AS EASY AS APPLE PAY. TAP. DONE." is precisely the claim a Lightning-only competitor cannot truthfully copy, and it leads — correct per Positioning. The page then spends 5.8 viewports failing to prove it. "TAP TO PAY" (`page.tsx:291`) is one bento card, sized and weighted identically to "Fully open-source and free" (`:649`) and "Instant settlement" (`:660`). The load-bearing *reason* the tap is real — ecash bearer tokens — is not demonstrated anywhere; it is asserted in a paragraph ~3,100px down.

Structural sameness is severe. Four of six content sections resolve to "headline + paragraph + list/grid." `SimpleFeatures` ships **two structurally identical blocks** — media on one side, headline + paragraph + three checkmark bullets in tinted circles on the other, mirrored left/right (`:818` and `:876`). That is the canonical AI-templated B2B feature block, run twice, and PRODUCT.md's anti-references name exactly this family.

And all six top-level sections declare `bg-white` — verified in source (`:209, :285, :705, :815, :1374, :1472`) and confirmed in-browser as `rgb(255,255,255)`. Only the footer uses another ground. Butcher Paper appears nowhere on `/`.

What *is* genuinely authored: the wallet grid (`:703`) — white pills on cream, 40px logos, a small ink NFC badge overlapping the corner of only the seven ecash wallets, a `FULLY COMPATIBLE WITH` hairline divider before the nine Lightning ones, closed by the once-per-page Solitreo aside. It encodes PRODUCT.md's must-not-blur ecash/Lightning distinction visually, with zero explanatory prose. Unfakeable by a neighbouring product. The fee-slice concept is a payments idea, not a SaaS one. And `/setup` is a different-quality artifact entirely: ink hero → mint prerequisites strip → butcher-paper Part One → ink Part Two. Four grounds in four sections, real screenshots in black bezels, a "What is a mint?" explainer, and "50,000 sats in. 95% out."

### Deterministic scan

`detect.mjs --json numo-site/src` → **exit 2, 2 findings, both the same rule, both false positives.**

| Location | Verdict |
|---|---|
| `globals.css:176` | False positive — `--ease-spring` token declaration only. `grep -rn "ease-spring" src/` returns *only this line*; the token has zero call sites. Dead code, not a shipped bounce. |
| `page.tsx:1094` | False positive — the payment-success checkmark. DESIGN.md sanctions the overshoot easing at exactly this one site: "Bounce is the sound of a sale landing." |

A 2-finding scan on a 4,089-line codebase is a genuinely clean mechanical result. **The detector found almost nothing because the problems here are not mechanical — they are compositional and factual.**

### Visual overlays

Injection succeeded. The in-page detector ran on three routes: **`/` 28 findings, `/setup` 1, `/releases` 43.** The live server on port 8400 was started, used, and stopped (verified: port dead, pid gone).

Triaged, the overlay's own headline categories mostly resolve to *your design system overriding the detector's defaults*, correctly:
- `oversized-h1` (128px) — DESIGN.md specifies Display at `clamp(3rem, 8vw, 8rem)` = exactly 128px.
- `all-caps-body` on FAQ questions and release terms — DESIGN.md: "Card headings, FAQ questions, release-note highlight terms… Still Bebas, still uppercase."
- `hero-eyebrow-chip` on `/releases` — explicitly designed at 0.3em tracking.
- `text-occlusion` + `clipped-overflow-container` on the fee slice — "content rather than decoration."
- `layout-transition` on the nav — "vertical padding tightens… so the bar physically settles as it lands."
- 10 of 11 `low-contrast` and all `nested-cards` / `cramped-padding` / `undersized-ui-text` hits live *inside depicted device mockups*, not in your chrome.

What survives triage as real: **`skipped-heading` h1→h3** (independently confirmed by DOM audit), **`line-length` ×36 on `/releases`**, and the **`#f7931a` zero-offset glow** at `page.tsx` — a colored glow that is not one of the five shadows in your own vocabulary and violates the Earned Shadow Rule.

The `line-length` finding is the interesting one. DESIGN.md claims "65ch for release summaries." Measured: `dd` computes `max-width: 802.44px` at `18px` — that *is* 65ch. But Sora's `0` advance is 12.35px, so 65ch renders **~89 real characters**. The cap is honored in CSS and missed in fact.

## Overall Impression

This is a well-*engineered* site with a genuinely distinctive design system that the homepage does not implement, wrapped around copy that contradicts itself on the one fact that matters most.

The engineering is not the problem. Zero console errors on all three routes. Zero 404s. No horizontal overflow at 390/768/1440 — verified even with `body { overflow-x: hidden }` neutralized. All 17 images have alt text. A working skip link. Visible focus rings on every stop. `inert` correctly applied to the collapsed mobile nav. A `prefers-reduced-motion` block that actually neutralizes all 172 animated/transitioned elements. Someone competent built this.

The problem is that **the homepage doesn't use the design system it ships with.** Your DESIGN.md says the alternation between white, cream, butcher paper and ink "is the page's primary structural signal, and it does more work here than dividers or spacing do." The homepage runs six consecutive sections on identical white. That single omission is the root cause of the visual-hierarchy failure, the single-focus failure, and why the page misses PRODUCT.md's "under 30 seconds of scroll" test despite having excellent raw material.

**The single biggest opportunity:** `/setup` already proves you can build this. Ink hero, mint strip, butcher paper, ink again. Port that discipline onto `/`, fix the custody sentence, and point a CTA at `/setup` — and the score moves ten points without a single new asset.

## What's Working

1. **`/setup` is the design system fully realised.** The only surface that obeys the Own Ground Rule, and the only one that satisfies PRODUCT.md's "technical honesty is the trust mechanism." *"What is a mint? It is the service that issues and holds the Cashu balance received by this terminal. It is not your final payout wallet"* (`setup/page.tsx:163`) is the single most valuable paragraph on the site. "50,000 sats in. 95% out." (`:217`) is the best headline. It also correctly avoids `font-bold` on Bebas, which the homepage does not.

2. **The wallet section's two-tier badge convention** (`page.tsx:703`). It communicates PRODUCT.md's non-negotiable ecash/Lightning distinction *visually*, with zero explanatory prose, and the once-per-page Solitreo aside gives it exactly the warmth the brief asks for. This is what "authored for this product" looks like.

3. **The `Navigation` component.** Two states of one bar crossfading over 300ms; a four-stop scrim at 190% height so no band edge shows over moving video; a 2px paint-stroke indicator that wipes in from the left; mint on the scrim, ink on the board (correctly refusing mint on cream, which measures **1.20:1**); the anchors|routes hairline split; a `grid-template-rows` panel carrying `inert` when collapsed. Better-reasoned and better-commented than the page it sits on.

## Priority Issues

### 1. [P0] The site gives three contradictory answers about custody

**What.** `page.tsx:1431` — *"Is Numo custodial?" → "Yes. Your bitcoin stays in Numo until you're ready to move it."* Meanwhile `page.tsx:147` heads a bento card **"Automatic self-custody"**, and `privacy/page.tsx:6` describes Numo as a **"Self-custodial Bitcoin wallet."** Only `setup/page.tsx:163` states the truth — and it is three pages deep.

**Why it matters.** PRODUCT.md calls custody "the single most load-bearing fact" and bans *both* shipped forms by name: copy "must not flatly claim 'non-custodial'" and "must not say 'your bitcoin stays in Numo.'" The site ships both, plus a third answer, on the same domain. Numo custodies nothing — the mint is the backing party. For the Bitcoin-native audience this is the fastest possible disqualifier; for a merchant it makes "where is my money?" unanswerable.

**Fix.** Rewrite `FAQ_DATA[4].a` to name the real arrangement: *"Numo holds nothing. Your sales are Cashu ecash — bearer tokens on your phone, backed by the mint you choose during setup. Withdraw to your own Lightning address any time, or set a threshold to do it automatically."* Retitle `page.tsx:147` to describe the mechanic ("Automatic payouts" / "Sweep to your own wallet"). Correct `privacy/page.tsx:6`. Link the FAQ answer to `/setup`.

**Suggested command:** `/impeccable clarify`

### 2. [P0] The hero — the emotional centrepiece — renders as a gray box on first paint

**What.** Both hero videos have their **`moov` atom at 98% of file length** (`1.mp4`: byte 404,226 / 411,509; `2.mp4`: 465,601 / 476,553). They are not faststart-encoded, so no frame can decode until the entire file downloads. Neither has a `poster`, and `public/hero.png` (38KB) sits unused. Assessment A observed all four videos at `readyState 0`, `videoWidth 0`, `buffered.length 0` **12 seconds after load** — the hero rendered as a flat dark-gray gradient with white type, and the two `SimpleFeatures` media columns rendered as blank 448×336 white rectangles. Meanwhile ~6.0MB of video is requested on first paint, **5.1MB of it below the fold** (`cart.mp4` alone is 3.7MB with `autoPlay`).

**Why it matters.** PRODUCT.md's read context is "a phone in a kitchen or a laptop in a back office." The first viewport of a Persuade surface is currently a gray rectangle on any constrained connection, and there is no designed fallback — that's a design decision, not an environment artifact.

**Fix.** Re-encode `1.mp4`/`2.mp4` with `ffmpeg -movflags +faststart`. Add `poster="/hero.png"` to both hero `<video>` elements (`page.tsx:215`). Give `ln-checkout.mp4` (`:822`) and `cart.mp4` (`:917`) a poster plus `preload="none"`, triggered on viewport entry. Set an explicit `bg-cream` on the `aspect-[4/3]` wrappers so an unloaded video reads as an intentional cream slab, not a hole. Add `placeholder="blur"` to the `/releases` images. Also: `grass.png` is **2.46MB** and referenced by nothing.

**Suggested command:** `/impeccable optimize`

### 3. [P1] Six consecutive sections declare the same ground — the Own Ground Rule is simply not implemented

**What.** `page.tsx:209, 285, 705, 815, 1374, 1472` all carry `bg-white`. Confirmed in-browser: every section computes `rgb(255,255,255)`. Only `<footer>` uses ink. The Cream Floor Rule — "long stretches of pure white are a gap in the composition, not a style" — is violated across ~4,800px.

**Why it matters.** This is the root cause of the visual-hierarchy failure and the single-focus failure below. Six sections read as one undifferentiated scroll, which is why the page misses the 30-second test despite good material.

**Fix.** In `page.tsx`: `SupportedWallets` (`:705`) → `bg-cream-warm`; `SimpleFeatures` (`:815`) → `bg-cream`; `BTCPayIntegration` (`:1374`) → `bg-navy` with inverted type (it's the most product-forward section and would carry ink well); `FAQ` (`:1472`) → `bg-cream-warm`. Leave `#features` white so the bento cards still read as cream slabs on white.

**Suggested command:** `/impeccable layout`

### 4. [P1] The illustrations sell hardware the product explicitly does not require, on a platform it does not ship on

**What.** "TAP TO PAY" (`page.tsx:369-408`) draws a black-and-orange payment terminal with a keypad, an LED, and a **card-reader slot**. "Works offline" (`:601-637`) draws a second handheld terminal with another reader slot, receiving money from an **iPhone** (Dynamic Island, `:521-526`). The BTCPay POS mockup (`:1003`) is unmistakably an iPhone — Dynamic Island, `9:41` status bar. And `layout.tsx:30/31/42/57` describes Numo to Google and every social share as an *"NFC-enabled **terminal**,"* with `"terminal"` in `keywords`.

**Why it matters.** PRODUCT.md is unambiguous: "an NFC-capable Android phone… **No extra hardware, no dedicated terminal**," and "iOS availability is not established — do not imply it." Your FAQ says "No. All you need is an Android phone that supports NFC" while the pictures immediately above it show a dedicated card terminal, and your own meta description contradicts the FAQ outright. Worse: the customer's device is drawn as an iPhone, which cannot run a Cashu NFC tap at all.

**Fix.** Redraw both terminal mockups as two Android-shaped phones — the tap is phone-to-phone, and drawing it that way *is* the differentiator, and it's the one thing on the page that would prove the ecash claim. Remove the Dynamic Island and the `9:41` clock from `POSSystem` (`:1003`). Strip "terminal" from `description`, `openGraph`, `twitter` and `keywords` in `layout.tsx`.

**Suggested command:** `/impeccable clarify` then `/impeccable bolder`

### 5. [P1] The trust cliff — installing an APK from GitHub — is completely unhandled, and `/setup` is linked from no CTA

**What.** Every download CTA (`page.tsx:256` hero, `:1529` footer, `Navigation.tsx:256`, `setup/page.tsx:251`) points straight at `github.com/cashubtc/Numo/releases`. No page mentions enabling installs from an unknown source, no signing key, no checksum, no screenshot of the Android install prompt. `/setup` step 1 is a bare unlinked sentence. `/setup` is reachable only from the nav rail — the FAQ's "How do I get started?" (`:1455`) links to GitHub instead. Compounding it: the primary `dark` CTA inverts to white on hover and becomes **pixel-indistinguishable** from the secondary `light` Zapstore CTA (`bg-white/90`) — verified by hover screenshot. The hierarchy collapses at the exact moment stakes are highest.

**Why it matters.** This is the highest-anxiety moment in the funnel for both audiences — the merchant fears malware, the Bitcoin native wants a verifiable signature — and it is the one moment the site says nothing. Peak-end rule: the journey ends on an unguarded jump off-site.

**Fix.** Make `Set it up in 5 minutes → /setup` the hero primary and `Download APK` the secondary. Add a reassurance line under the footer CTA: "Android 8+ with NFC · you'll be asked to allow installs from this source · open source at cashubtc/Numo." Expand `setup/page.tsx` step 1 into the real sideload sequence using the existing screenshot-frame treatment. Differentiate `Button.tsx` so `light` and `dark:hover` don't resolve to the same fill.

**Suggested command:** `/impeccable onboard`

### 6. [P1] Half the nav rail is dead from `/setup` and `/releases`, and long scrolls repaint the viewport blank

**What.** Reproduced twice: from `/setup`, clicking **FAQ** changes the URL to `/#faq` but lands at `scrollY 0` with `#faq` 5,073px below. All four `SECTION_LINKS` (`Navigation.tsx:9-14`) fail identically from both real routes. Separately, pressing **End** and clicking anchors each produced a **fully blank viewport persisting 3+ seconds**, with the fixed nav once painting at y≈555 mid-viewport. Assessment B independently froze the renderer twice — `Runtime.evaluate` timed out at 45s — attributing it to `html { scroll-behavior: smooth }` (`globals.css:86`) animating every programmatic scroll.

**Why it matters.** DESIGN.md argues the anchors/routes split "is doing real work — it tells a merchant which items move the page and which leave it." The promise is made and broken from two of five pages. The blank repaints happen on exactly the device PRODUCT.md names.

**Fix.** Remove `scroll-behavior: smooth` from `globals.css:86` and drive anchor scrolling explicitly from `Navigation.tsx` with `scrollIntoView`, gated on `prefers-reduced-motion`. Add a `useEffect` that re-resolves `location.hash` after hydration. Gate the `BentoFeatures` fee/tap/money loops on `IntersectionObserver` the way `AutoCustodyBento` and `BTCPayIntegration` already are.

**Suggested command:** `/impeccable harden`

### 7. [P1] Accessibility: tinted-ink captions fail AA, and 23 of 36 touch targets are under 44px on mobile

**What.** Measured composited ratios:

| Sample | Ratio | AA body (4.5) | AA large (3.0) |
|---|---|---|---|
| ink/40 on white | **2.42:1** | FAIL | FAIL |
| ink/50 on white | **3.17:1** | FAIL | PASS |
| ink/55 on white | **3.68:1** | FAIL | PASS |
| ink/65 on white | 5.02:1 | PASS | PASS |
| ink/75 on white | 6.92:1 | PASS | PASS |
| mint on white | **1.27:1** | FAIL | FAIL |
| mint on ink | 12.25:1 | PASS | PASS |

DESIGN.md prescribes `/55` and `/50` for captions and timestamps — both fail AA body. There are 9 uses of `/55` and one `/40` at 2.42:1. (Mint is correctly never used as text on light grounds — all 6 `text-mint` uses sit on ink.)

At 390px, **23 of 36 interactive elements are under 44×44**: "Download APK" at 334×**40**, nav links at 23px tall, footer links at **20px** tall. The hamburger is exactly 44×44 ✓. Also: the skip-link target `<main>` has no `tabindex="-1"`, so activating it scrolls without moving focus; a decorative `<div>` scroll container in the dashboard mockup is a focus stop carrying the UA default ring; 7 unlabelled inputs sit in that same mockup; and the reduced-motion block doesn't reset `animation-delay`/`transition-delay`, so delayed reveals still wait out their delay before snapping in.

**Why it matters.** PRODUCT.md defaults to WCAG AA. This is a merchant reading on a phone in daylight — the worst possible case for 3.17:1 text.

**Fix.** Raise the caption tint floor from `/50`–`/55` to `/65` and amend DESIGN.md's Tinted Ink Rule to match reality. Pad footer and nav links to a 44px hit area. Add `tabindex="-1"` to `<main>`. Add `aria-hidden="true"` + `tabindex="-1"` to the decorative dashboard mockup so it leaves the tab order entirely. Add `animation-delay: 0.01ms !important; transition-delay: 0.01ms !important` to the reduced-motion block.

**Suggested command:** `/impeccable audit`

### 8. [P2] Two named-rule violations that make the page look broken or off-system

**What.** (a) `.zero-slice-top/.zero-slice-bottom` uses `animation: slice-top 8.5s ease-out **forwards**` (`globals.css:321-332`). After 8.5s the word "FEES" is **permanently** split into two halves offset ±6px and never recovers — captured clean at t≈2s and mangled at t≈10s on the same load. The `fee-1`/`fee-2` keyframes hold their sliced state from 35%→100% and 60%→100% of a 12s loop, so "2.9%" sits as unreadable offset fragments for ~65% of the cycle. This is DESIGN.md's flagship "running illustration" and it currently reads as a font-rendering bug. (b) `SectionHeading.tsx` hard-codes `font-bold` into its base class, so **every** heading through it synthesizes bold on a single-weight face — plus inline `font-bold` at `page.tsx:245, 442, 452, 479, 489, 729, 1081, 1521`, `ReleaseEntry.tsx`, and `releases/page.tsx`. `/setup` does not, so the two pages' display type is visibly different weight.

**Why it matters.** The Single Weight Rule is explicit that `font-display font-bold` is "legacy to be corrected, not a pattern to copy" — and the shared component makes it the default, guaranteeing it spreads.

**Fix.** Delete `font-bold` from `SectionHeading.tsx`'s base class and strip the inline occurrences. In `globals.css:321-332`, change `forwards` to a cycle that reunites the halves, and adjust `fee-1-*`/`fee-2-*` so sliced halves fall away or fade rather than resting permanently offset.

**Suggested command:** `/impeccable polish`

### 9. [P2] `/privacy` is a dead end with no navigation and no footer

**What.** Confirmed in source — `privacy/page.tsx` never imports `Navigation`, and there is no footer. Reached from the homepage footer, the only way back is the browser's back button. There are three different footers across the site: ink on `/`, a `bg-cream-warm` mini-footer on `/setup`, none on `/privacy` or `/releases`.

**Fix.** Add `<Navigation />` to `privacy/page.tsx` and `export/offline/page.tsx`; standardize on two footer variants (full ink, compact cream) and apply one to every route.

**Suggested command:** `/impeccable harden`

## Cognitive Load

**Failed 6 of 8. Band: HIGH.**

| Check | Result |
|---|---|
| Single focus | **FAIL** — no focal claim between hero and footer; six sections of equal typographic weight on one ground |
| Chunking (≤4/group) | **FAIL** — bento 6, wallets 16, FAQ 8, footer 7 |
| Grouping | PASS (weak) — nav anchors\|routes split and the wallet NFC-badge tier are real; the bento has none |
| Visual hierarchy | **FAIL** — "TAP TO PAY" renders at the same size and weight as "Fully open-source and free" |
| One thing at a time | **FAIL** — 3–5 independent loops run simultaneously at most scroll positions (fee 12s, tap 5s, money-fly 3.5s, notification `setInterval` 2.5s, POS state machine 10s) |
| Minimal choices (≤4) | **FAIL** — see below |
| Working memory | **FAIL** — the custody story spans four surfaces with three answers; the reader must reconcile them |
| Progressive disclosure | **PASS** — single-open FAQ, `/setup`'s Part One/Two split, `grid-template-rows` nav with `inert`. Genuinely well done. |

**Every decision point over 4 options:** nav rail 7 targets (+ masthead = 8) · bento 6 competing claims · wallet grid 16 pills · FAQ 8 rows · footer 7 targets. *Passing:* hero 2 CTAs, `SimpleFeatures` bullet lists 3 each.

## Emotional Journey

**Peak** — the footer (`page.tsx:1517`). "START ACCEPTING BITCOIN TODAY." at display scale in white Bebas on ink, one mint pill, the Grandstander NUMO watermark on the baseline. The only place on the homepage where ground, type and accent all work at once. Secondary peak: `/setup`'s ink hero with the mint "YOU'LL NEED" strip — that strip does more for merchant confidence than the entire bento grid.

**Valley** — the ~2,800px from "Instant settlement" through "Easy inventory management." An empty slab, then 16 wallet pills, then two mirrored feature blocks whose media columns rendered as literal blank white rectangles, then a fake BTCPay dashboard. No beat, no payoff.

**End** — nominally the footer (strong). Actually: a click through to a raw GitHub releases page listing APK assets, with no preparation.

## Persona Red Flags

**Jordan (confused first-timer).** Reads the bento card headed "Automatic self-custody," scrolls to the FAQ, opens "Is Numo custodial?" and reads "Yes. Your bitcoin stays in Numo." Cannot reconcile them; the page offers no third source. Looks at the tap illustration, sees a black card terminal with a reader slot, and asks "do I have to buy that?" — the FAQ two screens down says "No, all you need is an Android phone," and the page's own meta description says "NFC-enabled terminal." Opens "How do I get started?", which links to GitHub rather than to `/setup`, the one page written for him.

**Casey (distracted mobile user).** The header CTA is wrapped in `hidden sm:block` (`Navigation.tsx:254`), so at 390px the header shows only the mint "N" tile and a hamburger — **no visible download button above the fold** on the device PRODUCT.md names as the primary read context. Every footer link is a 20px-tall tap target. The page is 5.8 viewports of continuously looping animation on one undifferentiated white ground, so there is no landmark to resume at after an interruption. FAQ answers carry an unconditional `pr-16` (`:1502`), leaving roughly 28 characters per line at 390px.

**Riley (stress tester).** Clicks FAQ in the rail from `/setup` → URL becomes `/#faq`, page sits at scrollY 0. Repeats from `/releases` → same. Presses End → viewport paints fully blank for 3+ seconds; on retry the fixed nav renders at mid-viewport. Leaves the tab open 10 seconds → "ZERO PLATFORM FEES" splits and never recovers. Throttles the connection → gray hero, two empty rectangles. Opens `/privacy` → no nav, no footer, no way back.

**Morgan (Bitcoin-native, project-specific).** Finds three custody answers, none correct on the homepage. Notices "Automatic self-custody" is describing an auto-withdraw *out of a mint-backed balance* — the least self-custodial thing on the page. Notices the homepage never names a mint at all while `/setup` does. Reads `/privacy`: *"We do not use any analytics or tracking services"* — served by a page whose `layout.tsx:4` renders `<Analytics />` from `@vercel/analytics` on every route. Finds no APK signature, no checksum, no reproducible-build note. Sees the BTCPay panel presenting six invented invoices with realistic BTC amounts, timestamps, a "Nuthouse" store name and a "15" notification badge, with no "illustrative" label. Concludes the opposite of PRODUCT.md's target reaction.

## Minor Observations

- `privacy/page.tsx` states "We do not use any analytics or tracking services" while `layout.tsx` renders `<Analytics />` sitewide. Even if scoped to the Android app, nothing says so.
- `globals.css:20-31` still defines the twelve pastel tokens (`--blue`, `--yellow`, `--red`, `--orange`, `--purple`, `--teal` + `-soft`) and `@theme inline` still exports them. DESIGN.md says delete, not repurpose.
- Illustrations import a palette outside the documented four colours: `#F7931A`/`#FFB84D`/`#FFCC66`, `#34C759`/`#5DD97C`/`#2DB84C`/`#4ADE80`, `#FF3B30`, `#FF9500`, plus `#51b13e` and `#a1a1aa`. Only the red slice line is sanctioned.
- `WorksOfflineAnimation.tsx` is **dead code** — `page.tsx:508-641` inlines an identical copy instead of importing it.
- Solitreo loads via a raw `<link href="https://fonts.googleapis.com/…">` placed **inside `<body>`**, bypassing `next/font`; the `other: {"font-preconnect-1": …}` metadata emits `<meta>` tags that do nothing.
- `notificationPool` (`page.tsx:11-18`) invents Lightning addresses at `coinos.io` and `getalby.com` — real providers not on PRODUCT.md's verified list.
- Heading outline skips h1 → h3 (the six bento headings are h3 with no h2 above them). Confirmed by both assessments.
- The `z-[9999]` white gradient overlay in `BTCPayIntegration` (`:1392`) outranks the fixed nav's `z-50` — a plausible contributor to the nav paint anomalies.
- `body { overflow-x: hidden }` (`globals.css:100`) masks rather than prevents overflow. (Verified there *is* none at 390/768/1440 — but the mask means a future regression will be invisible.)
- The BTCPay "New payment received!" toast at `top-4 right-4` visually collides with the "Create Invoice" button beneath it.
- `/setup`'s desktop two-column layout leaves ~500px of empty left column between step bodies at ~1370px — reads as unfinished rather than as editorial air.

## Questions to Consider

1. If `/setup` is where the design system, the technical honesty and the merchant voice all actually land — why is it the one page no CTA on the site points to, and why is the hero CTA a raw GitHub link instead of it?
2. Positioning says ecash is what makes the tap real and that no neighbouring product can copy it. Where is that *demonstrated*? The tap illustration shows a generic phone waving at a hardware card terminal — an image a Lightning-only competitor could ship unchanged. What does the picture look like if ecash is the subject?
3. If you had to answer "where is my money right now?" in one sentence that both a food-truck owner and a Cashu developer would accept as true — what is that sentence, and why isn't it in the hero?
4. Six sections, one white ground, six equally-weighted headings. If you deleted "Instant settlement," "Fully open-source and free," and one of the two mirrored `SimpleFeatures` rows outright — what would actually be lost, other than length?
5. DESIGN.md says the running illustrations are "content rather than decoration." The BTCPay section ships a fake sidebar, a "15" notification badge, three filter dropdowns and six invented invoices. Which of those is content?
