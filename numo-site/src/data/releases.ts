/**
 * Numo release entries.
 *
 * Add new entries at the TOP of the `releases` array. The first entry is
 * rendered as the featured "latest" release; everything below appears in
 * the earlier-releases timeline.
 *
 * Tone: merchant-first. Highlight the 2–4 things a shop owner would actually
 * care about. Skip deep technical notes, refactors, and CI changes — those
 * live on GitHub. Every entry auto-links to the full notes.
 *
 * Images: drop files into `/public/releases/` (or reuse existing assets in
 * `/public/`) and reference them by path. `width` / `height` are the
 * intrinsic pixel dimensions — they feed Next.js's Image optimizer and lock
 * the layout before the asset loads.
 */

export type ReleaseImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type ReleaseHighlight = {
  title: string;
  body: string;
  /** Optional image shown beneath this highlight's body. */
  image?: ReleaseImage;
};

export type Release = {
  /** Semver-like tag without the leading "v", e.g. "1.4". */
  version: string;
  /** ISO date — YYYY-MM-DD. */
  date: string;
  /** Editorial title — tell the story, don't describe the commit. */
  title: string;
  /** One or two punchy sentences under the title. */
  summary: string;
  /** Optional cover image shown beneath the summary, full content-column width. */
  heroImage?: ReleaseImage;
  /** Optional deeper breakdown of what changed (merchant-facing only). */
  highlights?: ReleaseHighlight[];
  /** Optional per-release download override. Defaults to the GitHub releases page. */
  downloadUrl?: string;
};

/** Every release links here for the unabridged, commit-level changelog. */
export const FULL_RELEASE_NOTES_URL =
  "https://github.com/cashubtc/Numo/releases";

export const releases: Release[] = [
  {
    version: "1.8",
    date: "2026-07-20",
    title: "More units. A safer way back.",
    summary:
      "Numo now works in any base unit supported by your mint, with that unit carried through every sale, receipt, report, and export. Android wallets can also back up encrypted recovery data to Google, and the fiat currency picker is faster to scan.",
    heroImage: {
      src: "/releases/v1.8/hero.png",
      alt: "Numo v1.8 release artwork showing the point-of-sale keypad",
      width: 1200,
      height: 675,
    },
    downloadUrl: "https://github.com/cashubtc/Numo/releases/tag/v1.8",
    highlights: [
      {
        title: "Price and sell in your mint's unit",
        body: "Choose a base unit in mint settings, and Numo uses it across payment requests, received payments, tips, catalog pricing, receipts, transaction history, insights, and CSV exports. Custom units turn off fiat conversion; recognized fiat units keep their standard formatting. Numo also skips Lightning mints that don't support the active unit.",
        image: {
          src: "/releases/v1.8/custom-unit.png",
          alt: "Numo mint settings with a dialog for selecting sat or usd as the base unit",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "An encrypted way back on Android",
        body: "Opt in to back up your encrypted seed phrase and mint list to your Google account, protected by a separate recovery password of at least 12 characters. The backup refreshes whenever your recovery data changes and can restore your wallet on a new device. Android cloud backup and a device screen lock must be enabled, and Numo can't recover a forgotten recovery password.",
        image: {
          src: "/releases/v1.8/android-recovery.png",
          alt: "Numo Security and Privacy and encrypted device backup screens",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Currencies you can spot faster",
        body: "Fiat currencies now come with circular flag avatars, plus a code-based fallback where no suitable flag exists. Removing the pinned Preferred Currency header leaves more room for the searchable list.",
        image: {
          src: "/releases/v1.8/fiat-selector.png",
          alt: "Numo fiat currency selector before and after adding flag avatars",
          width: 872,
          height: 302,
        },
      },
    ],
  },
  {
    version: "1.7",
    date: "2026-06-11",
    title: "BTCPay Server arrives",
    summary:
      "Numo now connects directly to BTCPay Server. It generates invoices, accepts Lightning or Cashu, and syncs your Point-of-Sale inventory automatically. Plus a fix for NFC taps that were triggering Apple Pay on nearby iPhones, and broader support for mints that don't speak Lightning.",
    downloadUrl: "https://github.com/cashubtc/Numo/releases/tag/v1.7",
    highlights: [
      {
        title: "Your BTCPay store, connected",
        body: "Link Numo to your BTCPay Server and it takes over invoicing: generating the request, watching for settlement, and accepting payment in Lightning or Cashu. Your Point-of-Sale items, prices, and photos import automatically, and every sale posts back to BTCPay to keep your stock count honest.",
      },
      {
        title: "No more surprise Apple Pay",
        body: "Numo could accidentally trigger the Apple Pay prompt on a nearby iPhone just by listening for NFC. That's fixed. Numo stays quiet until your customer actually taps to pay.",
      },
      {
        title: "Works with mints that skip Lightning",
        body: "If your mint doesn't support BOLT11 invoices, Numo now detects that automatically and routes the sale through Cashu instead. No more dead end on the Lightning tab.",
      },
      {
        title: "Plus",
        body: "Itemized CSV exports that break out every item in the basket, layout fixes for Sunmi V2s terminals, and product photos that no longer rotate sideways.",
      },
    ],
  },
  {
    version: "1.6",
    date: "2026-05-22",
    title: "A new look, top to bottom",
    summary:
      "Numo gets an app-wide redesign: a refreshed design system, rebuilt components, and redrawn screens across every flow. Plus a running log of your wallet activity, a nudge to put your shop on the Bitcoin map, and auto-withdrawals that stop failing before they start.",
    downloadUrl: "https://github.com/cashubtc/Numo/releases/tag/v1.6",
    highlights: [
      {
        title: "Redesigned, end to end",
        body: "An app-wide refresh: a new design system, refined components, and redrawn screens across the entire app. Everything you already do, cleaner to look at and easier to read.",
      },
      {
        title: "A record of everything your wallet does",
        body: "Numo now keeps a running log of your wallet activity, so you can trace transactions and wallet events and see exactly what happened, and when.",
      },
      {
        title: "Put your shop on the map",
        body: "A new onboarding banner invites you to add your location to BTCMap, the open directory of places that take Bitcoin, so nearby customers can find you.",
      },
      {
        title: "Auto-withdrawals that don't bounce",
        body: "Your auto-withdraw threshold is now checked against your Lightning address's minimum before it runs. Sweeps to your wallet stop failing on amounts that were too small to send.",
      },
    ],
  },
  {
    version: "1.5",
    date: "2026-05-02",
    title: "Built from the floor",
    summary:
      "Tap2Pay no longer drops on retry or when the app comes back from the background. The transaction history gets a sales dashboard, real filters, and receipts you can read in place. Plus fiat rates that work in Latin America, and Numo in Korean and Japanese.",
    heroImage: {
      src: "/releases/v1.5/hero.jpg",
      alt: "Numo v1.5 release",
      width: 1200,
      height: 675,
    },
    highlights: [
      {
        title: "Taps that don't drop",
        body: "NFC now survives retries and survives the app coming back from the background. And when you're offline, Numo won't let you generate a payment request your customer can't pay.",
        image: {
          src: "/releases/v1.5/nfc.jpg",
          alt: "Numo v1.5 — NFC and payment reliability",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "A sales dashboard",
        body: "Open it from your transaction history. See what sold today, this week, or this month, broken out by item.",
        image: {
          src: "/releases/v1.5/sales-summary.jpg",
          alt: "Numo v1.5 — sales summary dashboard",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Filters in your activity",
        body: "Filter the history by settled or pending. Narrow to any date range. Tap a payment to read its full receipt without leaving the screen.",
        image: {
          src: "/releases/v1.5/activity-filter.jpg",
          alt: "Numo v1.5 — activity filter with All, Completed, and Pending tabs",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Fiat rates that work in LATAM",
        body: "Exchange rates moved from Coinbase to Yadio.io. For Latin American merchants, that means rates that keep working in countries where Coinbase is blocked. Numo also now ships in Korean and Japanese.",
        image: {
          src: "/releases/v1.5/fiat-rates.jpg",
          alt: "Numo v1.5 — better fiat rates",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Plus",
        body: "Set ecash or Lightning as your default, and Numo opens straight to it.",
      },
    ],
  },
  {
    version: "1.4",
    date: "2026-04-17",
    title: "Every currency, a cleaner start",
    summary:
      "Price your items in any local currency, walk through a redesigned first-run experience, and pick a language that actually sticks.",
    heroImage: {
      src: "/releases/v1.4/hero.jpg",
      alt: "Numo v1.4 release",
      width: 1200,
      height: 675,
    },
    highlights: [
      {
        title: "All fiat currencies supported",
        body: "Set your prices in any local currency. Numo converts to sats behind the scenes.",
        image: {
          src: "/releases/v1.4/currencies.jpg",
          alt: "Numo v1.4 — supports all fiat currencies",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Redesigned onboarding",
        body: "A short explainer carousel walks new merchants through mint selection, so you know what you're picking before you pick it.",
        image: {
          src: "/releases/v1.4/onboarding.jpg",
          alt: "Numo v1.4 — redesigned onboarding flow",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Language stays put",
        body: "Pick your language once. Numo remembers it across relaunches.",
        image: {
          src: "/releases/v1.4/language.jpg",
          alt: "Numo v1.4 — language selection",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Plus",
        body: "Edge-to-edge UI across payment, settings, and withdraw flows; tip-screen fixes; dark-mode QR codes; updated terms and privacy dialogs; faster mint-icon loading.",
      },
    ],
  },
  {
    version: "1.3",
    date: "2026-03-26",
    title: "Label every payment. Export everything.",
    summary:
      "Tag each transaction with a label right from the POS. Export your activity as a clean spreadsheet. And a single QR code now pays with ecash or Lightning. Your customers stop picking.",
    heroImage: {
      src: "/releases/v1.3/hero.jpg",
      alt: "Numo v1.3 release — activity screen showing payments received and a withdrawal",
      width: 1200,
      height: 675,
    },
    highlights: [
      {
        title: "Unified BIP321 URI",
        body: "One QR code that works with ecash or Lightning. No more picking which payment method your customer is using.",
        image: {
          src: "/releases/v1.3/bip321.jpg",
          alt: "BIP321 URI support — Numo payment screen with a unified QR code",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Tag every transaction",
        body: "Label each payment directly from the POS. Keep track of what every transaction was for. No need to leave the app.",
        image: {
          src: "/releases/v1.3/tags.jpg",
          alt: "Tag every transaction with a label — shop tags for Farmer's Market, Catering Deposit, Patio Tab, Inventory Raw Milk, Food Truck",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "Export to a spreadsheet",
        body: "One tap, clean CSV. No more copy-pasting transactions into your bookkeeping.",
        image: {
          src: "/releases/v1.3/csv.jpg",
          alt: "Export your payment activity to Excel — Numo notification showing 32 transactions exported",
          width: 1200,
          height: 675,
        },
      },
      {
        title: "New transaction details",
        body: "Tap any payment in your history to see the full context: amount, time, label, and how it settled.",
      },
    ],
  },
  {
    version: "1.2",
    date: "2026-03-13",
    title: "You feel the tap now",
    summary:
      "Tap-to-pay gets a bespoke animation with haptic feedback, so you and your customer both know the moment a payment clears. Plus fixes to receipt printing and inventory CSV.",
    highlights: [
      {
        title: "Haptic tap animation",
        body: "A custom NFC animation with a processing state and a vibration on success. No more squinting to check whether the tap worked.",
      },
      {
        title: "Token withdrawals in history",
        body: "Every Cashu token you cash out is now recorded alongside payments received.",
      },
      {
        title: "CSV export for inventory",
        body: "Move your item catalog and VAT data between devices with a proper import/export round-trip.",
      },
      {
        title: "Printed receipts cleaned up",
        body: "Thermal printer output now formats correctly across currencies.",
      },
    ],
  },
  {
    version: "1.1",
    date: "2026-03-03",
    title: "Webhooks arrive",
    summary:
      "Connect Numo to your own server, BTCPay, or shop system via webhooks. Plus CSV export for your item catalog and three new Scandinavian currencies.",
    highlights: [
      {
        title: "Webhooks",
        body: "Send payment events to any URL. Pair Numo with your existing back-office, inventory app, or BTCPay store.",
      },
      {
        title: "Export your menu",
        body: "CSV export for the item catalog: back it up, edit in a spreadsheet, or move it to a second device.",
      },
      {
        title: "DKK, SEK, NOK",
        body: "Danish krone, Swedish krona, and Norwegian krone join the supported currency list.",
      },
    ],
  },
  {
    version: "1.0",
    date: "2026-02-23",
    title: "Numo launches",
    summary:
      "The first public build of Numo is live. Accept Bitcoin payments with a tap on any NFC-enabled Android. No custodian. No subscription.",
    highlights: [
      {
        title: "Tap-to-pay with Cashu ecash",
        body: "NFC payments via NDEF. Customers pay by holding their phone to yours.",
      },
      {
        title: "Lightning fallback",
        body: "Switch to the Lightning tab for a BOLT11 QR code, so customers without an ecash wallet still pay.",
      },
      {
        title: "Self-custody from day one",
        body: "Withdraw manually to your own wallet, or set an automatic threshold to sweep to your Lightning address.",
      },
      {
        title: "Merchant tools",
        body: "Item catalogs with pre-selectable items, persistent baskets, and payment history. Built in.",
      },
    ],
  },
];
