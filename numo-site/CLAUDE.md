# Numo Site

Landing page for Numo — a Bitcoin POS that makes accepting Bitcoin feel as native as Apple Pay. Built with Next.js 16, React 19, Tailwind v4.

## Design Context

### Users
Numo serves two audiences on the same page, and the design must satisfy both without code-switching:

1. **Independent merchants** — cafe owners, food-truck operators, market stall vendors, freelancers, small retail. They are evaluating "can I accept Bitcoin as easily as I accept a Visa tap?" They are not Bitcoin experts. They care about fees, speed of setup, whether their customers can pay with a wallet they already have, and whether funds land somewhere they control.

2. **Bitcoin-native users** — people already fluent in Lightning, Cashu, ecash, and self-custody. They scrutinize whether a tool respects sovereignty (does it custody funds? does it lock me in?) and whether the technical claims hold up. They are allergic to marketing gloss that hides how the thing actually works.

**Job to be done**: Show, in under 30 seconds of scroll, that Numo makes Bitcoin acceptance feel as native as Apple Pay — and that it does so without custodying funds or locking merchants into a walled garden. A merchant should see "I can use this tomorrow." A Bitcoin native should see "this is built correctly."

### Brand Personality
**Confident · punchy · merchant-first.**

- *Confident*: We don't hedge. Numo is a product for people who sell things. Copy is declarative, not aspirational. No "imagine a world where…" No "we're on a mission to…"
- *Punchy*: Bold display type, short lines, real numbers (fees, speeds, wallet names). Ideas land fast. If a sentence can be cut in half, cut it.
- *Merchant-first*: The landing page is a sales tool, not a Bitcoin manifesto. Every section answers a merchant's question. The Bitcoin-native audience is served by being *technically honest*, not by speaking to them directly.

Emotional goal on first scroll: **"Oh — this is real."** Not delight, not hype — recognition that Numo is a grown-up product, not a crypto experiment.

### Aesthetic Direction

**Nearest reference**: Square / Block — merchant-first, editorial, confident. Product-forward. Treats small-business owners as serious professionals. Restrained palette with one hardworking accent color. Heavy display type balanced by clean body copy.

**Theme**: Light mode dominant. Square/Block operate in daylight — the reader of this page is most often on a phone in a kitchen or a laptop in a back office, not a dark trading terminal. The existing cream-warm surfaces are load-bearing and should stay.

**Visual direction inherited from the codebase that we keep**:
- Navy `#0A2540` as primary text/UI color, Mint `#5EFFC2` as the single accent.
- Cream `#FAF8F5` / `#F5F0E8` surfaces as warm backgrounds — this is the brand's one real differentiator against generic fintech white-on-white.
- Bebas Neue as the display face for punchy, condensed, merchant-signage energy. Pairs with Sora for body copy.
- Illustrative animations that demonstrate product mechanics (sliced fees, flying bills, NFC pulses, stacked payment notifications). These are load-bearing content, not decoration — they explain how Numo works.

**What to tune down from the current direction**:
- Dancing Script cursive accents and Grandstander flourishes should be used sparingly if at all. "Confident · punchy · merchant-first" pulls away from handmade-cursive charm. Keep Bebas + Sora as the primary pair; reserve cursive for at most one personal touch (e.g., footer signature), not section headings or CTAs.
- Avoid letting the extended pastel wallet-pill palette leak into primary UI. Those pastels belong on wallet chips only.

### Anti-References (what this is NOT)
- **Not crypto-casino / degen**: No neon gradients, no purple-to-blue hero washes, no laser eyes, no moon/rocket iconography, no countdown-timer hype.
- **Not AI-templated startup**: No Inter + pastel-gradient hero. No giant rounded icons above every section heading. No identical 3-up card grids. No hero-metric-template (big number, small label, "trusted by N merchants").
- **Not austere cypherpunk**: No all-black terminal aesthetic. No monospace as the primary voice. Numo is technically honest but visually warm — a merchant's kid should be able to look at the homepage and not feel alienated.
- *Note*: Enterprise-SaaS polish (Stripe/Linear tier) is acceptable as craft quality, just not as aesthetic — we want editorial-merchant feel, not abstract B2B.

### Design Principles

1. **Merchant first, Bitcoin second.** Every section answers a question a merchant would ask. Technical honesty serves the Bitcoin-native audience; technical jargon never leads.

2. **One accent, used sparingly.** Mint is the single load-bearing accent. The 60-30-10 rule applies: cream/white surfaces, navy text and structure, mint *only* for the things we want people to act on. The extended pastel palette is scoped to wallet-pill chips.

3. **Demonstrate, don't describe.** The site's best moments are the illustrative animations that *show* Numo working (fees getting cut, payments streaming in, NFC tapping). Default to "can we show this mechanic?" before reaching for a headline and a paragraph.

4. **Display type does the heavy lifting.** Bebas Neue headlines carry the voice. Body copy stays out of the way. Keep hierarchy steep — large display, small body, nothing in between fighting for attention.

5. **Warm surfaces, confident edges.** Cream backgrounds and rounded containers keep the page approachable; navy typography and bold display keep it serious. Neither softness nor rigor alone — both at once.
