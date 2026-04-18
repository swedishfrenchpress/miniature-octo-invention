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
        body: "A short explainer carousel walks new merchants through mint selection — so you know what you're picking before you pick it.",
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
      "Tag each transaction with a label right from the POS. Export your activity as a clean spreadsheet. And a single QR code now pays with ecash or Lightning — your customers stop picking.",
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
        body: "Label each payment directly from the POS. Keep track of what every transaction was for — without leaving the app.",
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
        body: "Tap any payment in your history to see the full context — amount, time, label, and how it settled.",
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
        body: "CSV export for the item catalog — back it up, edit in a spreadsheet, or move it to a second device.",
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
        body: "NFC payments via NDEF — customers pay by holding their phone to yours.",
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
        body: "Item catalogs with pre-selectable items, persistent baskets, and payment history — built in.",
      },
    ],
  },
];
