# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Numo serves two audiences on the same site, and the design must satisfy both without code-switching:

1. **Independent merchants** — cafe owners, food-truck operators, market stall vendors, freelancers, small retail. They are evaluating "can I accept Bitcoin as easily as I accept a Visa tap?" They are not Bitcoin experts. They care about fees, speed of setup, whether their customers can pay with a wallet they already have, and whether funds land somewhere they control.

2. **Bitcoin-native users** — people already fluent in Lightning, Cashu, ecash, and self-custody. They scrutinize whether a tool respects sovereignty (does it custody funds? does it lock me in?) and whether the technical claims hold up. They are allergic to marketing gloss that hides how the thing actually works.

## Product Purpose

Numo is a Bitcoin point-of-sale app that makes accepting Bitcoin feel as native as Apple Pay. The site's job is to show, in under 30 seconds of scroll, that Numo makes Bitcoin acceptance feel that native — and that it does so without Numo taking a cut, holding the merchant's funds, or locking them into a walled garden. A merchant should leave thinking "I can use this tomorrow." A Bitcoin native should leave thinking "this is built correctly."

## Positioning

**Ecash is what makes the tap real.** Numo's payments are Cashu ecash — bearer tokens that transfer directly between devices — which is why a customer can tap their phone to a merchant's phone and be done. A Lightning-only point-of-sale app can present a QR code to scan; it cannot deliver a genuine Apple Pay-style tap. Everything else Numo offers (Lightning fallback, offline sales, BTCPay integration, zero platform fees) is real and worth saying, but the tap is the claim a neighboring product cannot truthfully copy.

## Operating Context

- **The merchant's setup**: an NFC-capable Android phone, on a counter, a market stall, or a food truck. No extra hardware, no dedicated terminal.
- **The sale**: the customer taps an ecash wallet phone-to-phone, or scans a Lightning invoice QR when they don't have one. Settlement is seconds, no chargebacks or holds.
- **Onboarding**: download the APK from GitHub releases or Zapstore → create a wallet (or restore from backup) → accept the pre-selected default mint → start selling. The merchant is not required to understand Bitcoin infrastructure to finish.
- **Payouts**: optional auto-withdraw sends sales to the merchant's own Lightning address (which reads like an email address) once a balance threshold is reached.
- **Inventory**: categories and item sizes, tap-to-request pre-set payments, exportable per-item sales reports.
- **BTCPay Server**: Numo connects directly to an existing BTCPay store, generating invoices and keeping point-of-sale inventory in sync.
- **How the site is read**: on a phone in a kitchen or a laptop in a back office — daylight, interrupted attention — not a dark trading terminal.
- **Site surfaces today**: `/` (home), `/setup` (merchant setup guide), `/releases` (versioned changelog), `/privacy`, `/export/offline`.

## Capabilities and Constraints

**Custody — the single most load-bearing fact.** Ecash tokens are bearer instruments held on the merchant's device; the Cashu **mint** is the party backing them. Numo the project custodies nothing. Future copy must not flatly claim "non-custodial," and must not say "your bitcoin stays in Numo." Name the mint and describe the actual arrangement. *The FAQ answer currently shipped on the homepage ("Is Numo custodial? Yes. Your bitcoin stays in Numo…") contradicts this and is a known copy defect awaiting a fix.*

- **Platform**: Android only, NFC required. iOS availability is not established — do not imply it.
- **Distribution**: GitHub releases (APK) at `github.com/cashubtc/Numo/releases`, and Zapstore. The site states a Google Play listing is coming; no date is confirmed and none may be invented.
- **Price**: free to download, free to use. Numo takes no percentage and no subscription. Bitcoin network fees only, typically under a cent. No "2.9% + 30¢."
- **Open source**: the app repo is `cashubtc/Numo`; this site repo is MIT.
- **Customer-side requirement**: tap-to-pay needs a compatible Cashu ecash wallet. Any Lightning wallet works via invoice/QR. Both are true and the distinction must not be blurred.
- **Offline**: ecash payments complete without connectivity and sync on reconnect.
- **Compatible wallets named on the site** (factual list; never padded with unverified names) — *ecash*: eNuts, Sovran, Macadamia, Cashu.me, Minibits, Phoenix, Bey. *Lightning*: Alby Go, Blink, Agicash, Cash App, Fedi, Muun, Strike, Wallet of Satoshi, Zeus.
- **Terminology**: mint, ecash, Cashu, Lightning address, sats, auto-withdraw, balance threshold, BTCPay Server, NFC tap-to-pay. The app calls its payment screen the *till*.
- **Site stack (fixed)**: Next.js 16 App Router, React 19, Tailwind v4, TypeScript. Deployed on Vercel with `@vercel/analytics`. The application lives in `numo-site/`, not at the repository root.
- **Domain**: numopay.org.

## Brand Commitments

**Name**: Numo. **Voice**: confident · punchy · merchant-first.

- *Confident*: We don't hedge. Numo is a product for people who sell things. Copy is declarative, not aspirational. No "imagine a world where…" No "we're on a mission to…"
- *Punchy*: Short lines, real numbers (fees, speeds, wallet names). Ideas land fast. If a sentence can be cut in half, cut it.
- *Merchant-first*: The landing page is a sales tool, not a Bitcoin manifesto. Every section answers a merchant's question. The Bitcoin-native audience is served by being *technically honest*, not by being spoken to directly.

Emotional goal on first scroll: **"Oh — this is real."** Not delight, not hype — recognition that Numo is a grown-up product, not a crypto experiment.

Nearest reference: Square / Block — merchant-first, editorial, confident, product-forward.

**Standing credits and accounts**: the footer credits OpenCash for supporting the project. Social presence: `x.com/numopayapp` and a Nostr profile on Primal. Cashu is credited via `cashu.space`.

### Anti-references

- **Not crypto-casino / degen**: No neon gradients, no purple-to-blue hero washes, no laser eyes, no moon/rocket iconography, no countdown-timer hype.
- **Not AI-templated startup**: No Inter + pastel-gradient hero. No giant rounded icons above every section heading. No identical 3-up card grids. No hero-metric-template (big number, small label, "trusted by N merchants").
- **Not austere cypherpunk**: No all-black terminal aesthetic. No monospace as the primary voice. Numo is technically honest but visually warm — a merchant's kid should be able to look at the homepage and not feel alienated.
- Enterprise-SaaS polish (Stripe/Linear tier) is acceptable as craft quality, just not as aesthetic — editorial-merchant feel, not abstract B2B.

## Evidence on Hand

**Designated proof — the release log.** Dated, versioned changelog entries running v1.0 (2026-02-23) → v1.8 (`numo-site/src/data/releases.ts`), of which v1.3, v1.4, v1.5, and v1.8 carry real product screenshots in `numo-site/public/releases/`. This is the one body of evidence future work is cleared to build on: it shows a product that ships on a cadence. Cite the cadence and the dated entries themselves; do not convert them into a metric ("shipping every N weeks") without checking the dates.

Other real assets available:

- Setup guide screenshots of actual app UI — `numo-site/public/setup/01-welcome.png` through `07-payout-details.png`.
- Wallet logos — `numo-site/public/wallets/`.
- BTCPay Server logo and interface still — `numo-site/public/btcpay-logo.svg`, `btcpay-ui.png`.
- Product video and imagery — `1.mp4`, `2.mp4`, `cart.mp4`, `ln-checkout.mp4`, `hero.png`, `grass.png`, `og-image.jpg`.

**Absences that must never be fabricated.** There are no testimonials, no named or pictured merchants, no case studies, no install or download counts, no transaction or volume figures, no press quotes, no uptime or benchmark numbers, and no "trusted by N merchants." The OpenCash support credit in the footer is factual shipped copy, but was not designated as a proof point to build marketing claims on. If a future section needs social proof, it must be sourced first — not written.

## Product Principles

1. **Merchant first, Bitcoin second.** Every section answers a question a merchant would actually ask. Technical honesty serves the Bitcoin-native audience; technical jargon never leads.
2. **Technical honesty is the trust mechanism.** Especially on custody, fees, and platform support. A precise, slightly less flattering sentence beats a clean claim that a Bitcoin native can catch out.
3. **Demonstrate, don't describe.** Default to "can we show this mechanic?" — fees getting cut, payments streaming in, NFC tapping — before reaching for a headline and a paragraph.
4. **Claim only what ships.** Android and NFC today. No implied iOS, no invented Play Store date, no borrowed metrics.
5. **Two audiences, one voice.** Never code-switch into merchant-speak in one section and cypherpunk-speak in the next. The same declarative sentences serve both.

## Accessibility & Inclusion

No formal WCAG level or special accommodations documented by stakeholders. Default to WCAG AA: verify body text contrast (≥4.5:1) and respect `prefers-reduced-motion` for the site's illustrative animations.

---

## Register

<!-- Retired field: v4 replaced the register axis with per-surface visitor modes. Retained pending deletion; treated as absent for all decisions. -->

brand
