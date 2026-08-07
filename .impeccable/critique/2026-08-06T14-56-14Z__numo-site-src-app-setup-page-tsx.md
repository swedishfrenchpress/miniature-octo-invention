---
target: the setup page
total_score: 17
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 4
timestamp: 2026-08-06T14-56-14Z
slug: numo-site-src-app-setup-page-tsx
---
Method: dual-agent (A: ab038efa750f62575 · B: ab699e5090cb2e67a)

Surface mode: **Read** (a merchant follows this to completion; comprehension and confidence outrank expression).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Desktop rail desyncs — measured at scrollY 7200 the badge reads "Step 4" while all six steps sit at `opacity-35`. No progress indicator on a 9,787px page. |
| 2 | Match System / Real World | 3 | Strong plain language ("the green keypad is your till"). But "adjusts the minimum when needed" and "gives fees room to move" have no real-world referent. |
| 3 | User Control and Freedom | 1 | Step-1 carousel auto-advances every 2400ms with no pause; the only controls on the entire page are two 6×6px dots. No step deep-links, no way to enlarge a screenshot. WCAG 2.2.2 exposure. |
| 4 | Consistency and Standards | 2 | Part One and Part Two use two different step languages (ghost `01` numerals + cream frames vs. mint bubbles + "Step N" badges). "Download APK" / "Download the APK" / "the latest APK". |
| 5 | Error Prevention | 1 | The two irreversible acts — a wrong Lightning address, tapping "Restore From Backup" — get one clause each. "Store your recovery phrase somewhere private and offline" is clause 3 of 4 in step 04, styled identically to everything around it. |
| 6 | Recognition Rather Than Recall | 2 | Five of six Part Two steps show the identical screenshot. Step 6 says "confirm the status says **Active**" while the red ring physically covers the word. Step 3 promises a green "Valid Lightning address" message that appears in no screenshot. |
| 7 | Flexibility and Efficiency | 1 | No table of contents, no step anchors, no condensed view. "Start the guide ↓" is the only in-page navigation and it only reaches the top of Part One. |
| 8 | Aesthetic and Minimalist Design | 2 | `min-h-[68vh]` + `items-center` leaves 60–70% of the Part Two left column empty at any scroll position. Part One's sticky panel leaves a ~350px void under "What is a mint?". |
| 9 | Error Recovery | 1 | No invalid-address case, no failed-payout case, no mint-unreachable case, no support link. The only red on the page is the annotation ring. |
| 10 | Help and Documentation | 2 | The page *is* the doc and it dead-ends: it lists "A Lightning address for payouts" as a prerequisite and never says how to get one or names a single wallet, despite `/#wallets` existing. |
| **Total** | | **17/40** | **Poor — the visual system is sound; the instructional layer is not doing its job** |

## Design Specificity Verdict

**LLM assessment.** The hero, the mint prerequisites band, and roughly six sentences are genuinely authored for this product and could not be lifted onto another page. Everything below the fold is category-interchangeable: sticky-left/numbered-right, its mirror, a 2-up card pair, a footer CTA bar — the standard four-move onboarding template, mirrored once for a symmetry no content motivates. The scroll-driven rail is the tell: it is the most expensive composition on the page and it reveals the same image five times. The layout was chosen before anyone checked whether there was anything to reveal. Read whole, this is Signwriter's Counter typography wrapped around a generic doc-site skeleton, with a red annotation system borrowed from a screenshot tool rather than from the design system.

**Deterministic scan.** `detect.mjs` returns `[]`, exit 0, on both target files — zero findings. The detector was verified functional rather than a silent no-op: run across all of `numo-site/src/**`, it fires two `bounce-easing` warnings (`src/app/page.tsx:1094`, `src/app/globals.css:178`), neither in scope here. So the page is clean against every mechanical anti-pattern rule the system ships. Everything below was found by measurement or by judgment, not by the linter — which is itself the useful signal: this page's problems are not token violations, they are instructional and structural.

**Visual overlays.** Not injected. A dev server was already serving the page, so the live-server/overlay flow was skipped in favor of direct measurement in a fresh tab. No user-visible overlay exists in the browser.

## Overall Impression

The top 900px of this page are the best work on the site — a confident dark hero and a hard mint band that lets a merchant self-qualify in three items before spending any scroll. Then the page stops designing and starts filling a template.

The single biggest problem is that **the guide's central mechanic is a bluff**. Part Two builds a scroll-driven sticky screenshot rail — the most elaborate layout in the codebase — to reveal `/setup/07-payout-details.png` five times in a row. The user pays ~3,100px of scroll for one image. The "Step N" badge ends up carrying the load the image was supposed to carry.

The second-biggest is that this is a page about **money leaving a merchant's device**, and it has no failure content, no reassurance at the three moments confidence drops (choosing a mint, typing an address, setting a threshold), and no ending. After step 6 the last thing a merchant reads is "Download the APK" — an instruction from before step 01. Nothing on the page says *you're open*.

## What's Working

1. **Hero + prerequisites band.** The band works because it's a hard horizontal rule in the page architecture, not a card — it reads as the counter you sign in at, and three concrete items (5 min / NFC Android / a Lightning address) let a merchant self-qualify before scrolling. Editorially specific, not template. Contrast measures 12.25:1.

2. **Two authored sentences.** `PayoutSetupGuide.tsx:37` — *"There is no Save button—Numo stores these settings as you change them."* — is the best line on the page: it answers a question the *app's own UI* provokes that nobody would think to write down. Same class as *"The green keypad is your till"* (`page.tsx:34`). These are the voice the rest of the page should match.

3. **"What is a mint?" placed before the steps that force the choice** (`page.tsx:70-72`). Glossary at point of need rather than in a footnote is correct information architecture, and the restrained `bg-white/55` treatment keeps it an aside instead of a competing card.

## Priority Issues

### [P0] Five of six Part Two steps show the identical screenshot

**What.** `PayoutSetupGuide.tsx` lines 18, 23, 28, 33, 38 all reference `/setup/07-payout-details.png`. Only the hotspot coordinates differ.

**Why it matters.** The entire desktop composition (lines 153–182: `lg:grid-cols-[1fr_.8fr]`, `sticky top-24`, `min-h-[68vh]` per step) exists so that an image changes as you scroll. It does not change. A merchant scrolls 3,100px watching a red dot move around a static picture. Step 3's copy also promises a green "Valid Lightning address" confirmation that appears in no screenshot — the field is empty in every frame, so the one piece of feedback the merchant is told to wait for is never shown.

**Fix.** Capture five real states: toggle off → on; address field empty → filled with the green validation message; threshold picker open; percentage picker open; Active status at the top of the screen. If those captures aren't available, delete the sticky rail entirely and inline one *cropped* detail per step at double the current width, the way Part One does. Don't ship a scroll mechanic with a constant payload.

**Suggested command:** `/impeccable layout`

### [P0] The annotation ring is red, pulses forever, and covers its own target

**What.** `PayoutSetupGuide.tsx:72-76` — a 48px `border-red-500 bg-red-500/10` circle with `animate-ping`, centered on the hotspot. Measured: `animation-iteration-count: infinite`, 1000ms, `playState: running`. At step 4 it lands on "50,000 sat"; at step 6 it sits on the "Active" pill so that only "…tive" is legible — while the copy instructs you to "confirm the status says Active."

**Why it matters.** Red is the universal wrong-signal, deployed on a screen where a merchant is authorizing automatic outbound payments — the one place on the page they should feel most certain. It's also the only red in a system whose entire color story is one mint accent, so it reads as borrowed from a screenshot-annotation tool. And because the ring is centered on its target, it occludes the exact value being described.

**Fix.** Make the ring mint (`border-mint`, `bg-mint/15`, keep the white halo shadow) — this is the textbook One Coat case: the place the merchant acts. Then move it *off* the target: size it to the control with an outline offset, or anchor a mint pointer beside it. Drop `animate-ping`, or fire it once on activation instead of infinitely (six concurrent instances render on mobile).

**Suggested command:** `/impeccable polish`

### [P1] Inactive steps render at 1.95:1 — five of six descriptions are unreadable at any given moment

**What.** `PayoutSetupGuide.tsx:164` applies `opacity-35` to the whole block; the body inside is already `text-white/60` (line 168). Both agents measured the composited result independently: effective `#3d5269` on `#0a2441` = **1.95:1**. The `<strong>` runs inside it are also 1.95:1; the numeral badge is 3.10:1. WCAG AA needs 4.5:1.

**Why it matters.** This is content, not chrome. Anyone who scans rather than scrolls linearly — or who hits the desync in the next issue — can read nothing. And the treatment is redundant: the mint number bubble already says which step is active.

**Fix.** Stop dimming text. Signal the active step with the bubble alone (`bg-mint text-navy` vs `border border-white/25`) plus a left rule. If a dim is structurally required, floor the wrapper at `opacity-70` and raise inactive body to `text-white/75`.

**Suggested command:** `/impeccable audit`

### [P1] Active-step tracking desyncs and dies at the ends

**What.** `PayoutSetupGuide.tsx:104-120`. `rootMargin: "-30% 0px -45%"` leaves a ~215px detection band on an 863px viewport, while each `<li>` is `min-h-[68vh]` ≈ 519px with `items-center`. When nothing intersects the band, `visible` is `undefined` and the callback returns early — leaving `activeStep` stale. Measured at scrollY 7200: badge reads "Step 4" while all six items are dimmed. Separately, `setCarouselIndex(0)` fires on *every* intersection change (line 113), fighting the 2400ms autoplay in lines 122–129.

**Fix.** Drive `activeStep` from scroll position against measured offsets, or use a zero-height sentinel at 40% viewport height with `threshold: 0`, so exactly one step is always active. Move `setCarouselIndex(0)` out of the observer and into the `activeStep` effect, *before* the `screenCount < 2` early return.

**Suggested command:** `/impeccable harden`

### [P1] Mobile gets the smaller screenshot and the only controls are 6px tall

**What.** `PayoutSetupGuide.tsx:60` — `compact ? "max-w-[280px]"`, with `compact` hardcoded `true` for the mobile list (line 147). App body text inside the screenshot renders at roughly 6–7px. The carousel dots measure **20×6 and 6×6 CSS px** (`getBoundingClientRect`, identical at both widths, zero padding). WCAG 2.5.8 needs 24×24.

**Why it matters.** A merchant on a phone is holding the exact device the guide is about, and cannot read the screen they're being told to match — with no tap-to-zoom. The sizing is inverted: mobile has less room and gets the *smaller* image (Part One uses 320px). The dots are also the only interactive element in the entire guide, and they only exist while step 1 is active — on desktop they unmount from the DOM as you scroll past.

**Fix.** Drop `compact` on mobile and let the figure run `w-full` (342px at a 390px viewport). Remove the `rounded-[2rem] bg-white/60 p-5` wrapper at `page.tsx:81`, which steals another 40px for zero information. Give the dots a 24×24 hit area (`p-2 -m-2` around the 6px bar), add `aria-current`, and label them by content ("Settings screen" / "Withdraw screen") rather than "Show image 1".

**Suggested command:** `/impeccable adapt`

### [P1] No landmarks, and seven focusable invisible links before the content

**What.** Both `<header>` and `<footer>` are nested inside `<main>` (`page.tsx:43`, `page.tsx:121`). Per HTML-AAM, a `footer`/`header` scoped to `main` maps to neither `contentinfo` nor `banner` — measured: **the page exposes no banner and no contentinfo landmark at all**. Separately, at mobile width the collapsed nav panel is `height: 0` with no `inert`, `aria-hidden`, or `display:none`, so its 7 children keep full 444×60 layout boxes and stay in the tab order. Hit-testing their centers returns the hero — a keyboard user tabs through seven invisible links before reaching page content. (That one lives in `Navigation.tsx`, but it manifests here.)

**Fix.** Move `<header>` and `<footer>` out of `<main>`. Add `inert` to the collapsed nav panel when closed.

**Suggested command:** `/impeccable audit`

## AI-Slop Inventory

Concrete tells, each with a location:

- **`page.tsx:69`** — *"You do not need to understand Bitcoin infrastructure to get started."* A reassurance sentence that manufactures the anxiety it soothes. Nobody arrived worried about this until the page raised it.
- **`page.tsx:107`** — *"A sensible first setup."* Apologetic and hedgy in a brand whose stated voice "doesn't hedge."
- **`PayoutSetupGuide.tsx:32`** — *"Leaving a small balance behind gives fees room to move."* Metaphor with no referent. Fees don't move.
- **`PayoutSetupGuide.tsx:27`** — *"Numo checks your address and adjusts the minimum when needed."* An unexplained rule the reader must carry forward with no way to act on it.
- **Structural symmetry with no content behind it.** Part One is sticky-left/steps-right; Part Two is steps-left/sticky-right. Nothing motivates the mirror — it exists because it was easy to generate. Part Two then pays for it with a rail that shows one image five times.
- **Em-dash inconsistency.** Two unspaced em dashes (`page.tsx:97`, `PayoutSetupGuide.tsx:37`), both in the dark section, none anywhere else on the page.
- **Six steps where the app has one screen.** "Enter the address," "pick a number," "pick a percent" are three fields on a single screen, expanded into three steps to fill a scroll mechanic.
- **`page.tsx:114`** — the pre-flight checklist renders as four mint circles with white ticks, which reads as four *completed* items rather than a four-item to-do.

## Persona Red Flags

**Jordan (confused first-timer)**
- The mint band lists "A Lightning address for payouts" as a prerequisite, and the page never says how to get one or names a single wallet — while `/#wallets` exists and the nav links to it. Jordan is blocked before step 01 with no exit.
- `page.tsx:71` says a third party "issues and holds the Cashu balance" and "is not your final payout wallet," then says nothing more. The step 03 screenshot pre-selects "Mint Cuba Bitcoin" — a named counterparty the copy never names.
- `page.tsx:34` buries "store your recovery phrase somewhere private and offline" as clause 3 of 4, styled identically to everything around it. It is the only irreversible thing on the page and Jordan will skip it.

**Casey (distracted mobile user)**
- 12,597px of scroll with no progress indicator, no in-viewport step counter, no resume. Casey loses their place the moment a customer walks up.
- The step-1 carousel auto-advances every 2400ms with no pause, and *stops* once a later step activates — so scrolling back can leave it frozen on the Withdraw screen while the copy describes the Settings screen.
- 280px screenshots: Casey cannot read "Withdrawals" under "Payments" in the step-1 image, and cannot tap to enlarge. The dots are unhittable with a thumb.

**Sam (accessibility-dependent)**
- **Seven `aria-live="polite"` regions** (`PayoutSetupGuide.tsx:60`, one per carousel). At mobile, all six mobile-list figures render as live regions simultaneously. The desktop rail re-announces alt + caption on every *scroll-driven* change — unsolicited speech triggered by scrolling rather than by an action.
- Five `<p>Shown on the right</p>` at `opacity-0` (line 169) stay in the accessibility tree, get announced, and are spatially meaningless when linearized.
- Measured contrast failures at rest: step ordinals `text-navy/25` **1.66:1** (`page.tsx:77`); "Part one" eyebrow `text-navy/45` **2.68:1**; "A sensible first setup" on mint **2.99:1**; screenshot figcaptions `text-navy/50` **3.17:1**; footer subline `text-navy/55` **3.55:1**; the mint stat-card body **4.49:1** (fails by 0.01). Inactive carousel dot `bg-white/30` is **2.03:1** against a 3:1 non-text requirement.
- Focus ring is `outline: 2px solid var(--mint)` (`globals.css:115-118`). Mint on cream-warm is roughly **1.1:1** — the ring on the footer "Download the APK" button and on the scrolled white nav is effectively invisible.
- `aria-label="Image 1 of 2"` sits on a plain `<div>` that is not a live region (line 87), so the count is never announced and never updates. The dots convey active state by color alone — no `aria-current`.

## Minor Observations

- The `<h1>` hard `<br />` (`page.tsx:46`) makes the accessible name "FROM DOWNLOADTO FIRST SALE." Same at line 108: "50,000 SATS IN.95% OUT."
- The mint stat card's headline is a `<p>` at `text-6xl` — the largest non-h1 type on the page is semantically invisible, while its sibling "BEFORE THE FIRST CUSTOMER" is a real `<h2>` at `text-4xl`. A symmetric pair with asymmetric semantics.
- `page.tsx:105` `lg:grid-cols-[1.1fr_.9fr]` leaves ~120px dead at the bottom of the cream card because the mint card is taller.
- The One Coat Rule is stretched past breaking: full-mint requirements band + full-mint stat card + mint bubbles + mint eyebrows. The stat card is the loudest mint on the page and is the one place the merchant does nothing.
- The hero ring (`page.tsx:52`, `border-[48px] border-mint/10`) is the page's only pure ornament, and on mobile it sits directly behind the subhead.
- Part One's `<ol>` has `border-t` on the list plus `border-b` on every `<li>` — a doubled rule at the section seam and above step 01.
- `priority` on every rail image (`PayoutSetupGuide.tsx:69`) with no `sizes`. Measured: at 1440px, all **7 images inside the `lg:hidden` mobile list download anyway** (`complete: true`, `naturalWidth 540`) because `priority` suppresses `loading="lazy"`. All 9 are below the fold. And at `devicePixelRatio: 2`, a 334 CSS px box needs 668 device px but is served 540 — under-resolved on HiDPI.
- `prefers-reduced-motion` is honored for CSS (`globals.css:91-100`, verified empirically: ping drops to 0.01ms/1 iteration, carousel transition to 1e-05s) but **not** for the 2400ms `setInterval`. Under reduced motion the slide becomes an instantaneous jump-cut every 2.4s instead of stopping.
- Clean: zero horizontal overflow at mobile (verified with `overflow-x` forced visible), correct heading order with no skipped levels, every `<img>` has non-empty descriptive alt, zero React/Next console warnings.

## Questions to Consider

1. If four of the six Part Two steps were deleted — "enter the address," "pick a number," "pick a percent" are three fields on one screen — what would actually be lost? A bespoke scroll mechanic and 3,100px currently make one screenshot look like six.
2. Why does the page get colder and darker at the exact moment it asks a cafe owner to authorize automatic outbound payments to an address they typed by hand?
3. A merchant finishes step 6. What is the last thing they read? Right now it's "Download the APK" — an instruction from before step 01. Where is the sentence that says *you're open*?
4. The page states that a third party holds the balance and that it isn't the merchant's wallet, then says nothing more. Which audience does that terseness serve — the cafe owner who doesn't know to worry, or the Bitcoin native who already does?
