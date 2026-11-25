---
target: setup page
total_score: 20
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 3
target_identity: "file:/Users/erik/Documents/GitHub/numo-website/numo-site/src/app/(site)/setup/page.tsx"
target_fingerprint: "sha256:f49af829d2c7418d705e58debb6c8c70c3031004b2564aed012f2a9532cf7773"
target_path: /Users/erik/Documents/GitHub/numo-website/numo-site/src/app/(site)/setup/page.tsx
timestamp: 2026-11-25T18-26-33Z
slug: numo-site-src-app-site-setup-page-tsx
closed: true
---
Method: dual-agent (A: 930e37bf-4dde-458b-b129-4d85cfff8964 · B: 81d87ca9-4fcf-41e3-8a1a-06bc56b0ae3d)

## Design Health Score

Evaluated on `/setup` (`numo-site/src/app/(site)/setup/page.tsx` with `PayoutSetupGuide.tsx`, `PreflightChecklist.tsx`, `PhoneFrame.tsx`, and shared navigation/footer chrome) at `1440×900`, `1024×900`, `768×900`, and `390×844` against `PRODUCT.md` and `DESIGN.md`.

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2 | Active nav pill and `aria-live="polite"` checklist counter work, but checklist progress wipes on mobile tab reload (`useState`), `07-payout-details.png` shows `Active` with an empty Lightning address contradicting prose, no in-page section progress exists across a `5,638px–9,991px` scroll, and `4 of 4 checked` lacks a clear ready confirmation. |
| 2 | Match System / Real World | 2 | `Pick a mint` precedes `"What is a mint?"` while `Mint Cuba Bitcoin` / `antifiat mint` appear on screen; `(all wallets)` under `Payout wallet` links to customer wallets including Muun; Stripe cards are buried inside the BTCPay table; `50,000 sats` has no everyday counter-scale context. |
| 3 | User Control and Freedom | 3 | Header links jump to `Part one` and `Part two`, Escape/outside-click closes menus, and checkboxes toggle cleanly via mouse and `Space`. Missing top jumps to `#ready`/`#btcpay`, no checklist Reset control, and external APK/Zapstore links open new tabs silently. |
| 4 | Consistency and Standards | 2 | Strong Warm Counter visual world and `0` CLI detector findings, but `next/font/local` falls back to **Arial (`ArialMT`)** instead of `Sora` on colons (`:`) in all 3 section `h2`s; `DownloadMenu` exposes incomplete ARIA `role="menu"` semantics; Step 3 jumps heading scale (`text-title` 24px/500 vs Steps 1–2 `text-h3` 20px/600) mid-list; Step 3's 2-line caption breaks Part one's stage baseline. |
| 5 | Error Prevention | 2 | `(all wallets)` steers payout wallet selection to Muun (explicitly warned against in `PRODUCT.md:46`), recovery-phrase backup is missing from `PreflightChecklist`, `Active` prose misstates readiness before address validation, and no warning explains why a small test sale won't cross `50,000 sats`. |
| 6 | Recognition Rather Than Recall | 2 | Bold UI labels and Step 3's `A/B/C` workbench work cleanly, but neither the till's top-right **gear icon** nor **Activity** appears in any screenshot, the recovery card references `Settings` before Part two explains how to open it, `07-payout-details.png` omits `"Valid Lightning address"`, and `"What is a mint?"` sits after Step 4. |
| 7 | Flexibility and Efficiency | 2 | Top links accelerate Parts 1–2 and custom mints are noted, but BTCPay Server users have no fast path at the top, Step 1 gives no APK-vs-Zapstore recommendation, and checklist progress is not persisted across app switches. |
| 8 | Aesthetic and Minimalist Design | 3 | Layout rebuild cut desktop height from `8,764px` to `5,638px` (`#onboarding` down 60% to `1,328px`) and brought Part one + Step 1 above the fold across all 4 viewports with GC Protage and calm alternating stages. Deducted for Step 3's ~19px baseline drift in Part one, cramped `xl:grid-cols-[1fr_268px]` L-voids on Part two Steps 1–2, unconstrained `~95ch` `Payout wallet` width at `1440px`, and the recycled marketing Download footer. |
| 9 | Error Recovery | n/a | Static Read + Operate merchant guide with no web form submissions or runtime error states (in-app setup recovery is scored under #5 and #10). |
| 10 | Help and Documentation | 2 | Clear task-ordered screenshots, but lacks Android APK sideloading / GitHub `.apk` selection guidance, test-sale walkthrough + `Withdraw Now` note, mint-switching guidance, and any troubleshooting or support link. |
| **Total** | | **20/36** | **Acceptable (55.6%)** *(9 applicable heuristics × 4; #9 n/a)* |

---

## Design Specificity Verdict

**Verdict: Genuinely authored for Numo visually and editorially, but still under-authored operationally at the real shop-counter friction points — plus a handful of live contrast, font-fallback, and ARIA defects.**

**LLM assessment (unanchored):** The rebuilt `/setup` page clearly belongs to Numo's *Warm Counter Editorial* world. Alternating Paper (`#FBFAF7`) and Sunken Cream (`#F2EEE6`) bands, sentence-case **GC Protage** display headings paired with calm **Sora** prose, mirrored tonal `PhoneFrame` stages, real un-retouched Android captures, the `A / B / C` payout workbench, and concrete counter phrasing (*"open your till"*, *"50,000 sats in. 95% out"*) feel bespoke rather than templated. Where specificity drops is in **Operate-mode authorship**: the guide reads like a calm exhibition of seven happy-path screens rather than a hands-free counter companion built for the exact four friction points unique to Numo (APK sideloading, confronting `"Mint Cuba Bitcoin"` / `"antifiat mint"` on screen, choosing a payout Lightning address without hitting Muun, and testing a small payment below a `50,000 sats` threshold) — and closes a completed setup guide with the shared *"Start accepting Bitcoin today / Download APK"* marketing footer.

**Deterministic scan & live browser evidence:**
- **CLI detector (`impeccable detect --json` on `setup/page.tsx`, `PayoutSetupGuide.tsx`, `PreflightChecklist.tsx`, `PhoneFrame.tsx`):** Exit `0`, **`0` findings (`[]`)**.
- **In-page `detect.js` (headless Chrome CDP at `1440×900` and `390×844`):**
  - **1 true positive:** `line-length` (`~95 chars/line`, aim `<80`) on `You'll need → Payout wallet` `<dd>` (`setup/page.tsx:122`) inside an unconstrained `1fr` track at `1440px`.
  - **False positives triaged:** `dark-glow` on shared Footer CTA (`Button.tsx:39`, `--ink-deep` shadow on navy); `nested-cards` on `What is a mint?` `<aside>` (`setup/page.tsx:199`) and `PreflightChecklist` card (`PreflightChecklist.tsx:24`), both of whose parents are full-bleed `<section>` bands, not cards; mobile-only `cramped-padding` inside the collapsed `clientHeight: 0` mobile nav drawer (`Navigation.tsx`).
- **Live DOM, Font, Contrast & A11y audit (where A and B agreed + what B caught):**
  - **Independent A+B agreement — WCAG 1.4.11 UI contrast failure:** `PreflightChecklist` unchecked checkbox border (`PreflightChecklist.tsx:56`, `border-navy/45` on `#FFFFFF`) composites to `#919DA9` = **`2.76:1`** (fails `3.0:1` minimum; needs `border-navy/55` or `border-navy/60`).
  - **Caught by B (`CSS.getPlatformFontsForNode`):** `next/font/local` generates `"protage Fallback"` (metric-adjusted **Arial**) inside `--font-protage` *before* `Sora`. Glyphs missing from the GC Protage demo TTF — specifically the colon `:` in `"Part one: open your till."`, `"Part two: automatic payouts."`, and `"Optional: connect BTCPay Server."` — render in **`ArialMT`** instead of `Sora`.
  - **Caught by B (shared nav & button chrome):** Closed mobile nav drawer links remain focusable at `390px` (`46` total focusables) without `inert`; `Button variant="secondary"` (`View the BTCPay demo`) hairline shadow ring measures **`1.32:1`** on `#FBFAF7` paper (`#FFF` vs `#FBFAF7` fill = `1.04:1`).
  - **Verified green:** `0` console errors/warnings, `0` failed images (all 7 screenshots decoded with `0.00–0.38%` aspect distortion), `0` horizontal overflow at all 4 viewports, `0` standalone touch targets `<44×44px`, clean heading hierarchy (`1` `h1`, `5` `h2`, `8` `h3` in `<main>`), clean `<ol>` counts (`4` + `3`), working `:focus-visible` two-tone rings, and full mouse + `Space` interactivity on `PreflightChecklist`.

**Visual overlays:** `detect.js` preflight and script injection succeeded on headless Chrome CDP tabs (`http://localhost:8400/detect.js` mounted `.impeccable-overlay` nodes cleanly at `1440×900` and `390×844`), but because verification ran headless via CDP no user-visible `[Human]` browser tab overlay was presented; all console findings and computed DOM/contrast/font metrics above serve as the recorded evidence.

---

## Overall Impression

The spatial rebuild transformed `/setup` from a bloated `8,764px` rail-broken page into a genuinely crisp, cohesive `5,638px` editorial storyboard where Part one and Step 1 land immediately above the fold on desktop, tablet, and mobile. What's holding it back now isn't visual slop — it's operational honesty and precision: four real-world merchant hurdles (sideloading, mint surprise, Muun via `(all wallets)`, and test-sale expectations), a handful of live technical bugs (`2.76:1` unchecked checkbox borders, `ArialMT` colon fallback in section headings, broken ARIA `menu` semantics in `DownloadMenu`), and a few small alignment edges in Part one and Part two. Fixing those turns `/setup` from a handsome walkthrough into a counter-grade onboarding tool.

---

## What's Working

1. **Cohesive Warm Counter Editorial architecture (`setup/page.tsx`, `PayoutSetupGuide.tsx`):** Alternating `Paper` ↔ `Sunken Cream` grounds mirrored by `StepScreenshot` tonal stages (`paper` on sunken, `sunken` on paper), GC Protage + Sora pairing, and the 4-up Part one frieze cut desktop scroll height by 36% (`#onboarding` down 60%) while keeping every screenshot visible hands-free.
2. **Step 3 `A / B / C` payout workbench (`PayoutSetupGuide.tsx:102–132, 194–244`):** Precision percentage-positioned rings (`A`, `B`, `C`) on the enlarged `252px` phone frame paired face-to-face with the hairline `<dl>` and *"Everything saves automatically as you type"* make the densest configuration screen effortless to follow.
3. **Accessible, concrete counter framing (`PreflightChecklist.tsx`, `setup/page.tsx:247–253`):** Real Android screenshots, named Lightning-address wallets, plain-English default guidance (`50,000 sats in. 95% out.`), `52px` full-row interactive checkbox targets, and verified keyboard `:focus-visible` rings ground the guide in a real shipped product.

---

## Priority Issues

### 1. `[P1]` Operational and trust gaps at the four highest-stakes setup moments (sideloading, mint custody, test sale, recovery phrase)
- **What:** (a) Step 1 (`setup/page.tsx:20–32`) gives no Zapstore-vs-GitHub recommendation, doesn't say which GitHub release file (`.apk`) to download, and doesn't reassure merchants about Android's *"Install unknown apps"* warning; (b) `"What is a mint?"` (`setup/page.tsx:199–208`) sits *after* Step 4 even though Step 3 (`03-select-mint.png`) confronts merchants with `"Mint Cuba Bitcoin — Holds your bitcoin"` and `"antifiat mint"`; (c) `#ready` (`setup/page.tsx:243–245`) says *"Run one small test payment"* and checks `"The sale appears in Activity"` without explaining how to ring up a sale, where `Activity` is, or that a small test sale won't cross `50,000 sats` (nor pointing to `Withdraw Now` shown in `06-auto-withdraw.png`); (d) `"Back up your recovery phrase"` (`setup/page.tsx:186–197`) cites `Settings` before Part two explains the top-right gear icon and is absent from `PreflightChecklist`.
- **Why it matters:** Every one of these four gaps causes real merchant abandonment, panic when a $1 test sale doesn't land in Strike, or a merchant opening a live till (`4 of 4 checked`) without having backed up their 12 words.
- **Fix:**
  1. In Step 1, recommend Zapstore for signed auto-updates, specify downloading the `.apk` asset under the latest GitHub release, and note plainly that Android's *"Install unknown apps"* prompt is expected while Play Store is pending.
  2. Move `"What is a mint?"` directly alongside/under Step 3 and match `/#faq`'s custody clarity (*"Numo holds nothing. The mint backs incoming ecash until it sweeps out; switch mints anytime in Settings under Mints."*).
  3. In `#ready`, add a 2-sentence test-sale walkthrough (ring up a small amount on the green keypad, scan from your own wallet, confirm in `Activity`, and note that amounts under `50,000 sats` wait for threshold or can be sent immediately via `Withdraw Now`).
  4. Mention the top-right gear icon inside the recovery-phrase card and include *"Recovery phrase written down offline"* in `PreflightChecklist` (combining the two payout checks into *"Auto-Withdraw reads Active with a valid Lightning address"* to keep a crisp 4-item list).
- **Suggested command:** `$impeccable onboard`

### 2. `[P1]` Payout wallet `(all wallets)` link steers merchants to incompatible wallets (including Muun), and `Active` readiness copy contradicts the screenshot
- **What:** `You'll need → Payout wallet` (`setup/page.tsx:128`) links `(all wallets)` to `/#wallets`, which is a *customer* payment directory listing Cashu wallets and **Muun** (which has no Lightning address, directly contradicting `PRODUCT.md:46`). Meanwhile `setup/page.tsx:243` claims *"Once Withdraw reads Active, sales sweep to your wallet automatically"*, yet `07-payout-details.png` displays the green `Active` badge with an empty Lightning Address field and never shows the `"Valid Lightning address"` state described in Step 3A.
- **Why it matters:** Sends merchants into an incompatible wallet setup and undermines credibility with Bitcoin-native readers who immediately spot Muun and the unvalidated `Active` state.
- **Fix:** Remove the `(all wallets)` link from `Payout wallet` and clarify plain text (*"Any wallet that gives you a Lightning address like `shop@wallet.com`."*). Update `setup/page.tsx:243` to *"Once Auto-Withdraw is Active and your Lightning address reads Valid, sales sweep to your wallet automatically."* Recapture `07-payout-details.png` with a sample address displaying `"Valid Lightning address"`.
- **Suggested command:** `$impeccable clarify`

### 3. `[P1]` Accessibility, contrast, font-fallback, and persistence hardening (`2.76:1` checkbox borders, `ArialMT` colon fallback, ARIA `menu` & mobile drawer focus, ephemeral checklist)
- **What:** (a) Unchecked checkboxes (`PreflightChecklist.tsx:56`, `border-navy/45` on `#FFFFFF`) measure **`2.76:1`**, failing WCAG 2.1 SC 1.4.11 (`≥3.0:1`); (b) `PreflightChecklist.tsx:15` stores state only in React `useState`, wiping progress on mobile tab switches/reloads, and lacks a Reset control or completion banner at `4 of 4 checked`; (c) `layout.tsx:15` (`next/font/local`) injects `"protage Fallback"` (metric-adjusted `ArialMT`) ahead of `Sora`, causing every `:` in section `h2` headings (`Part one:`, `Part two:`, `Optional:`) to render in Arial instead of Sora; (d) `DownloadMenu.tsx:74,95,102,128,161` declares ARIA `role="menu"`/`menuitem` without arrow-key navigation or Tab-out dismissal and keeps its `Setup guide` link at `min-h-9` (`36px`) while self-linking on `/setup`; (e) closed mobile nav drawer links (`Navigation.tsx`) remain keyboard-focusable at `390px` unless `inert` is properly enforced in React/HTML.
- **Why it matters:** Fails WCAG non-text contrast in counter daylight, degrades keyboard/screen-reader navigation for Sam, loses mobile progress for Casey mid-test, and leaks system Arial into GC Protage display headings.
- **Fix:** Darken unchecked checkbox border to `border-navy/60` (`~4.0:1`); persist `PreflightChecklist` in `localStorage` with SSR-safe hydration, a Reset button when `doneCount > 0`, and a clear ready confirmation when `allDone`; set `adjustFontFallback: false` (and `fallback: ["var(--font-sora)", "system-ui", "sans-serif"]`) on `localFont` in `layout.tsx` so missing glyphs fall back cleanly to Sora; convert `DownloadMenu` to a standard disclosure popover (drop `role="menu"`/`menuitem`, bump footer link to `min-h-11`, hide self-link on `/setup`); ensure the closed mobile drawer hides links from focus (`hidden` / `visibility: hidden` when closed); bump `Button variant="secondary"` hairline border contrast above `3:1` (or `ring-navy/35`) on warm paper.
- **Suggested command:** `$impeccable harden`

### 4. `[P2]` Remaining layout & alignment rough edges (Part one Step 3 baseline drift, Part two Steps 1–2 squeeze, Step 3 heading scale jump, `95ch` Payout wallet line, misgrouped Stripe cards)
- **What:** (a) In Part one (`setup/page.tsx:52–63`), Step 3's 2-line caption inside `mt-auto` pushes Step 3's phone stage ~19px higher than Steps 1, 2, and 4 at `1440px`; (b) In Part two (`PayoutSetupGuide.tsx:138,166`), `xl:grid-cols-[1fr_268px]` inside `md:grid-cols-2` squeezes prose into ~260px beside a ~480px phone, leaving L-shaped blank space while shrinking the `Auto-Withdraw` toggle highlight; (c) Step 3 (`PayoutSetupGuide.tsx:196`) jumps from `text-h3` (`20px/600`) to `text-title` (`24px/500`) mid-list; (d) `You'll need → Payout wallet` `<dd>` (`setup/page.tsx:122`) has no `max-w-*`, triggering `detect.js` `line-length` (`~95ch`) at `1440px`; (e) `Cards: Connect Stripe in Settings for tap-to-pay cards` (`setup/page.tsx:82`) sits inside `Optional: connect BTCPay Server`.
- **Why it matters:** Misaligned card shelves weaken editorial polish, shrunken Part two screens obscure the small toggle ring, over-wide metadata lines slow scanning, and non-BTCPay merchants miss Stripe card setup completely.
- **Fix:** Shorten Step 3's caption to 1 line (`"Top card holds incoming payments."`) and reserve uniform caption height so all 4 Part one stages lock to one baseline; remove `xl:grid-cols-[1fr_268px]` on Part two Steps 1–2 so both stack cleanly in `md:grid-cols-2` with larger `240px` phones; align Step 3's heading to `text-h3`; cap `Payout wallet` `<dd>` at `max-w-[34rem]`; split Stripe cards out of `BTCPAY_SPECS` into its own brief optional item alongside BTCPay (an *"Optional add-ons"* band).
- **Suggested command:** `$impeccable layout`

### 5. `[P2]` Missing fast-path jump navigation for `#ready`/`#btcpay` and anticlimactic marketing-footer ending
- **What:** The header lead (`setup/page.tsx:91–101`) links only to `Part one` and `Part two`, omitting `#ready` and `#btcpay`; there is no troubleshooting/support escape hatch when setup stalls; and the page closes with the shared `SiteFooter` pitching **`Start accepting Bitcoin today — [Download APK]`** to someone who just finished installing and testing Numo.
- **Why it matters:** BTCPay merchants read through Part two unnecessarily before seeing `#btcpay`, stuck merchants have nowhere to get help, and ending a completed guide by telling users to download the app violates the Peak-End rule.
- **Fix:** Add crisp header anchor links covering all four sections (`Part one`, `Part two`, `Test sale`, `BTCPay & cards`), include a concise troubleshooting/support link beneath `#ready` (`/#faq` + `github.com/cashubtc/Numo/issues`), and add a guide-specific closing ask or bridge on `/setup` pointing to next counter steps (catalog/BTCPay demo/releases) rather than leading with APK download.
- **Suggested command:** `$impeccable shape`

---

## Persona Red Flags

- **Jordan (Confused First-Timer):** Lands on GitHub Releases developer files + Android's *"Install unknown apps"* prompt with one terse sentence; encounters `"Mint Cuba Bitcoin — Holds your bitcoin"` and `"antifiat mint"` in Step 3 before `"What is a mint?"` appears below Step 4; clicks `(all wallets)` under `Payout wallet` and picks Muun; sees an empty `you@wallet.com` field in `07-payout-details.png` while told to wait for `"Valid Lightning address"`; told to run a test sale and check `Activity` with no steps or scale context for `50,000 sats`.
- **Casey (Distracted Mobile User — `390×844`):** Checks 2 preflight items, switches to Numo/Strike for a test payment, and returns to Chrome to find progress wiped back to `0 of 4 checked`; loses scroll orientation across `9,991px` with no section jump cue; hits `36px` `Setup guide` self-link inside `DownloadMenu`; exits to external GitHub/Zapstore tabs with no new-tab indicator.
- **Sam (Accessibility-Dependent User):** Encounters `role="menu"`/`menuitem` in `DownloadMenu` without arrow-key traversal or Tab-out dismissal; faces `2.76:1` unchecked checkbox borders in `PreflightChecklist`; misses `"Back up your recovery phrase"` (`<div>`) and `"What is a mint?"` (`<p>`) when navigating by headings (`H`); tabs into hidden mobile drawer links at `390px`; encounters `h2` (`14px` `You'll need`) smaller than `h3` (`20px`) and Step 3 (`24px`) larger than sibling Steps 1–2 (`20px`).
- **Independent Merchant (Cafe/Stall in Daylight — `PRODUCT.md`):** Surprised by `"Mint Cuba Bitcoin"` / `"antifiat mint"` without upfront reassurance; skips `"Optional: connect BTCPay Server"` and never discovers Stripe contactless cards; struggles to see `2.76:1` checkbox outlines and tiny `Auto-Withdraw` toggle highlight in sunlight; runs a $1 test sale, sees $0 arrive in Strike (below `50,000 sats`), and assumes payouts failed; doesn't learn live internet is required until preflight checkbox #4.
- **Bitcoin-Native User (`PRODUCT.md`):** Spots softer custody wording than `/#faq` (*"What is a mint?"* omits *"the mint holds the backing bitcoin, not Numo"* and doesn't note switching mints in `Settings → Mints`); catches Muun inside `(all wallets)` under `Payout wallet`; sees zero mention of Zapstore signed builds or APK verification in Step 1; finds no clarification on whether BTCPay Server replaces or coexists with Part two auto-withdraw, nor what the 12-word recovery phrase restores.

---

## Minor Observations

- **Missing till screenshot:** Copy references *"The green keypad is your till"* (Step 4), *"top-right gear icon"* (Part two Step 1), and *"appears in Activity"* (Preflight), yet jumps straight from `04-ready.png` (`Wallet Created`) to `05-settings.png` (`Settings`).
- **Sample placeholder mismatch:** Prose cites `shop@wallet.com` and `50,000 sats`, while `07-payout-details.png` displays `you@wallet.com` and `50,000 sat`.
- **Mint dot semantic ambiguity on dark recovery card (`setup/page.tsx:188`):** The `bg-mint` dot next to `"Back up your recovery phrase"` visually mirrors the green `● Active` badge in `07-payout-details.png`, subtly reading as "active/done" instead of "required action."
- **Heading semantics on callouts (`setup/page.tsx:187,203`):** Promote `"Back up your recovery phrase"` and `"What is a mint?"` to proper `<h3>` headings so screen-reader heading navigation discovers them.
- **Route-specific OpenGraph metadata (`setup/page.tsx:8–12`):** Define `openGraph` and `twitter` title/description so sharing `numopay.org/setup` with staff previews the setup guide rather than the homepage title.

---

## Questions to Consider

1. **What if `/setup` worked like a real counter checklist instead of a static walkthrough?** Letting a merchant jump straight to `Lightning auto-withdraw` vs `BTCPay Server`, persist checklist progress locally across mobile app switches, and hit a genuine *"Your till is live"* confirmation would turn the page into an actual counter tool.
2. **What would a radically honest version of Steps 1 and 3 look like?** Preempting Android's *"Install unknown apps"* prompt at Step 1 and putting plain-English custody clarity right beside `Mint Cuba Bitcoin` in Step 3 turns the two highest-anxiety moments into trust builders.
3. **Should Part two Steps 1 & 2 stack cleanly in `md:grid-cols-2` with larger phone frames (or tight crops around `Withdrawals` and the `Auto-Withdraw` toggle)?** Right now ~80% of `05-settings.png` and `06-auto-withdraw.png` is empty screen while the highlighted toggle shrinks to a tiny target.
4. **Where should a merchant go 30 seconds after `"That's the till open"`?** Ending with a focused next-steps bridge (adding catalog items, enabling optional Stripe cards, or troubleshooting) would beat pitching `"Download APK"` again in the footer.
