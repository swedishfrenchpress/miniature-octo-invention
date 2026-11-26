import { releases as realReleases, type Release } from "@/data/releases";
import type { FaqItem } from "@/components/home/Faq";
import type { WalletGroupData } from "@/components/home/Wallets";
import type { NavItem } from "@/components/Navigation";
import type { SetupStep } from "@/components/SetupSequence";
import type { BreakData } from "./index";

/* Every value here is something that could plausibly be typed into this site's
   content one day: a real wallet's name, a release note written in a hurry, a
   screenshot taken on a different phone. Nothing is random or absurdly long.
   The images are files the site already has, used the wrong way on purpose
   (a phone screenshot as a cover, a wordmark as a wallet icon). */

const APK = "numo-v2.0.0-beta.3-arm64-v8a-release.apk";
const APK_URL = `https://github.com/cashubtc/Numo/releases/download/v2.0.0-beta.3/${APK}`;
const LN_ADDRESS = "aleksandra.wisniewska-kowalczyk@walletofsatoshi.example.com";

/* ---- Releases ------------------------------------------------------------ */

const WORST_RELEASES: Release[] = [
  {
    // A long pre-release tag, which also ends up on the download button.
    version: "2.0.0-beta.3",
    date: "2026-11-26",
    // One long word with nowhere to break, in the page's second-largest type.
    title: "Internationalization: Numo in 14 languages, multi-currency price lists, and end-to-end encrypted backups",
    summary: `Numo now speaks 14 languages, from Español and Português to 日本語 and العربية, and prices can be listed in your local currency. Sideloading? The file is ${APK} and it lives at ${APK_URL}. Backups are encrypted end to end before they leave the phone, so a lost device no longer means lost ecash.`,
    // A raw phone screenshot dropped in as the cover.
    heroImage: {
      src: "/setup/01-welcome.png",
      alt: "Numo welcome screen",
      width: 1080,
      height: 2340,
      caption:
        "The new welcome screen, shown here in English. The language follows the phone's system setting and can be changed any time under Settings, then Language & Region, without restarting the app or losing the current sale.",
    },
    highlights: [
      {
        title: "Price lists in your own currency, with the exchange rate shown beside every item on the till and on the receipt",
        body: "Set a display currency per device. Supported today: USD, EUR, GBP, SEK, NOK, DKK, CHF, BRL, ARS, MXN, ZAR, NGN, KES, INR, JPY and AUD.",
      },
      {
        // Declared as a wide picture, but the file is a tall phone screenshot.
        title: "A wider settings screen",
        body: "Settings are grouped the way shop owners look for them.",
        image: { src: "/setup/05-settings.png", alt: "Numo Settings screen", width: 1920, height: 1080 },
      },
      {
        // The file was never added to the repo.
        title: "Offline receipts",
        body: "Print a receipt for a sale you took while the connection was down.",
        image: { src: "/releases/v2.0/offline-receipts.png", alt: "A printed Numo receipt marked as taken offline", width: 1920, height: 1080 },
      },
      {
        // A small icon used as a screenshot, so it is stretched to the column.
        title: "eNuts joins tap to pay",
        body: "",
        image: { src: "/wallets/enuts.png", alt: "eNuts app icon", width: 1024, height: 1024 },
        secondImage: { src: "/btcpay-logo.svg", alt: "BTCPay Server logo", width: 86, height: 40 },
      },
      {
        title: "Payouts to any Lightning address",
        body: `Addresses of any length now validate, including ${LN_ADDRESS}. Full details: ${APK_URL}?tab=readme&filter=payouts`,
      },
      { title: "Fixes", body: "Bug fixes." },
      { title: "Markup is not rendered", body: "A note with **asterisks**, <b>tags</b> and &amp; entities shows them as typed." },
      { title: "Tips", body: "Tips can be 0%, 1% or 100%." },
    ],
  },
  {
    // Day and month the European way round: not a date the page can read.
    version: "1.12.1",
    date: "2026-25-10",
    title: "A fix",
    summary: "Fixes.",
  },
  {
    // The leading "v" typed into the version by habit.
    version: "v1.12",
    date: "2026-10-02",
    title: "⚡ Lightning address payouts, in español, 日本語 and العربية 🎉",
    summary: "Đặng Thị Ngọc Hân translated the till into Vietnamese; Ólafur Darri Ólafsson into Icelandic.",
    heroImage: { src: "/setup/stripe/01-key-form-desktop.png", alt: "Stripe dashboard", width: 2176, height: 1224 },
  },
  {
    // An entry copied from the one above and not renumbered.
    version: "v1.12",
    date: "2026-10-02",
    title: "Self-custodial-by-default payouts",
    summary: "The same version number twice.",
  },
  {
    // A draft left with nothing written yet.
    version: "1.11",
    date: "2026-09-14",
    title: "",
    summary: "",
  },
  {
    // A day that does not exist: the page shows a different, real-looking date.
    version: "1.10.9",
    date: "2026-02-30",
    title: "Reconciliation",
    summary: "Activity and Sales agree to the sat.",
    highlights: [{ title: "One highlight", body: "And nothing else." }],
  },
];

/** Sixty releases: the real ones, repeated, counting down. */
const MANY_RELEASES: Release[] = Array.from({ length: 60 }, (_, i) => {
  const source = realReleases[i % realReleases.length];
  return { ...source, version: `${6 - Math.floor(i / 10)}.${9 - (i % 10)}`, downloadUrl: undefined };
});

/* ---- Wallets ------------------------------------------------------------- */

const WORST_WALLETS: WalletGroupData[] = [
  {
    title: "Tap to pay with a Cashu ecash wallet",
    detail:
      "Cashu ecash wallets that support NFC payment requests (NUT-18), on Android and on iPhone 7 or newer running iOS 17.4.",
    nfc: true,
    wallets: [
      // One word, longer than a tile is wide on a phone.
      { name: "LightningTipBot", image: "/wallets/enuts.png" },
      { name: "Bitcoin Beach Wallet (Blink)", image: "/wallets/blinkwallet.jpg" },
      // The icon file was never added.
      { name: "Boardwalk Cash", image: "/wallets/boardwalk.png" },
      // A wide wordmark where a square icon belongs.
      { name: "BTCPay Server", image: "/btcpay-logo.svg" },
      { name: "X", image: "/wallets/bey.png" },
      { name: "nutstash.app", image: "/wallets/cashume.png" },
      { name: "Machankura 8333", image: "/wallets/minibits.jpg" },
    ],
  },
  {
    title: "Scan",
    detail: "Any.",
    wallets: [{ name: "Wallet of Satoshi", image: "/wallets/walletofsatoshi.png" }],
  },
];

const REAL_NAMES = [
  "Alby Go", "Aqua", "BitBanana", "Bitkit", "Blink Wallet", "Blitz Wallet", "BlueWallet", "Breez",
  "Cash App", "Coinos", "Electrum", "Fedi", "Muun", "Phoenix", "Primal", "River", "Speed Wallet",
  "Strike", "Wallet of Satoshi", "ZBD", "Zeus", "Machankura", "Blockstream App", "Bitnob",
];
const ICONS = ["/wallets/albygo.webp", "/wallets/blinkwallet.jpg", "/wallets/cashapp.svg", "/wallets/fedi.jpg", "/wallets/muun.png", "/wallets/strike.png", "/wallets/zeus.jpg"];
const MANY_WALLETS: WalletGroupData[] = [
  { title: "Tap to pay", detail: "Cashu ecash wallets.", nfc: true, wallets: REAL_NAMES.map((name, i) => ({ name, image: ICONS[i % ICONS.length] })) },
  { title: "Scan to pay", detail: "Any Bitcoin Lightning wallet.", wallets: REAL_NAMES.map((name, i) => ({ name, image: ICONS[(i + 3) % ICONS.length] })) },
];

/* ---- FAQ ----------------------------------------------------------------- */

const WORST_FAQ: FaqItem[] = [
  {
    id: "hardware",
    q: "Can I use Numo with my existing Square, Clover, SumUp or Toast terminal, my Bluetooth receipt printer and my cash drawer, or do I need to buy new hardware?",
    a: "Any Android phone with NFC works.",
  },
  { id: "fees", q: "Fees?", a: "None." },
  {
    id: "address",
    q: `Does Numo pay out to ${LN_ADDRESS}?`,
    a: `Yes. Any Lightning address works, including ${LN_ADDRESS}. The installer is at ${APK_URL} and the checksum is 9f8e7d6c5b4a4c3d8e2f1a0b9c8d7e6f9f8e7d6c5b4a4c3d8e2f1a0b9c8d7e6f.`,
  },
  {
    id: "long",
    q: "What happens to my money?",
    a: "Bitcoin sales are Cashu ecash backed by the mint you choose during setup. That mint holds the backing bitcoin, not Numo. Withdraw to your own Lightning address any time, or turn on auto-withdraw and Numo sends 95% once your balance passes the threshold you set, with the remainder covering network fees. Card payments, if you connect Stripe, go to your Stripe account at Stripe's standard card processing fees and Stripe pays them out to your bank on its usual schedule. They never mix with your bitcoin. If you lose the phone, restore the wallet on a new one with your 12-word recovery phrase; ecash that was on the old phone comes back from your mints, and anything already withdrawn is already in your own wallet. If your mint goes offline, Numo keeps taking Lightning payments through any other mint you have added and marks the offline one in Settings so you can move away from it.",
  },
  { id: "i18n", q: "Numo は日本語で使えますか？", a: "はい。設定から言語を変更できます。" },
];

const MANY_FAQ: FaqItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `q${i + 1}`,
  q: ["What is Numo?", "Do my customers need a special app?", "Is it really free?", "What if I have bad internet?"][i % 4],
  a: "Taking a new payment requires internet so the mint can verify it.",
}));

/* ---- Guide steps --------------------------------------------------------- */

const WORST_TILL_STEPS: SetupStep[] = [
  {
    title: "Install the app from Zapstore, GitHub or F-Droid and approve Android's install prompt",
    body: `Get it from Zapstore, which keeps it updated, or download ${APK} from ${APK_URL}. Android asks whether to allow installs from this source the first time: tap Settings, switch on Allow from this source, go back, and tap Install. On Samsung phones the switch is under Biometrics and security, then Install unknown apps. On Xiaomi phones turn off MIUI optimisation first. Then open Numo and tap Get Started.`,
    image: "/setup/01-welcome.png",
    alt: "Numo welcome screen with the Get Started button",
  },
  { title: "Go", body: "Tap it.", image: "/setup/02-wallet-choice.png", alt: "Numo Set Up Your Wallet screen" },
  {
    // The screenshot file was never added.
    title: "Pick a mint",
    body: "Keep the default or choose another, then tap Continue.",
    image: "/setup/03-select-mint-v2.png",
    alt: "Numo Your Mints screen",
  },
  {
    // Captured on a different phone: 1080 x 2400 in a guide of 1080 x 2340 screens.
    title: "Enter the till",
    body: "Wait for Wallet Created, then tap Continue.",
    image: "/setup/stripe/numo-01-paste.png",
    alt: "A Numo screen captured on a taller phone",
  },
  {
    // A desktop capture dropped into a phone guide.
    title: "Back up your recovery phrase",
    body: "Tap the gear icon, open Security & Privacy, and write your 12 words down offline.",
    image: "/setup/stripe/01-key-form-desktop.png",
    alt: "A wide desktop screenshot",
    outline: { left: 4, top: 90, width: 92, height: 5.2 },
  },
];

/** A new step added before its screenshot was taken. */
const WORST_PAYOUT_STEPS: SetupStep[] = [
  { title: "Open Withdrawals", body: "From the till, tap the gear icon, then Withdrawals under Payments.", image: "/setup/05-settings.png", alt: "Numo Settings screen" },
  { title: "Choose where payouts go: a Lightning address, an LNURL or a BOLT12 offer", body: `For example ${LN_ADDRESS}.` },
  { title: "Turn on Auto-Withdraw", body: "Switch Auto-Withdraw on.", image: "/setup/06-auto-withdraw.png", alt: "Numo Withdraw screen" },
];

/** One step of the Stripe guide has lost its desktop capture. */
const WORST_KEY_STEPS: SetupStep[] = [
  {
    title: "Open Stripe's key form, sign in, and pick the right account if you have several",
    body: "In Numo, open Settings, then Card payments.",
    image: "/setup/stripe/01-key-form.png",
    alt: "Stripe's key form",
    desktop: { image: "/setup/stripe/01-key-form-desktop.png" },
  },
  { title: "Check the two permissions", body: "Scroll down to Terminal.", image: "/setup/stripe/02-permissions.png", alt: "Stripe permissions" },
  {
    title: "Create the key",
    body: "Keep scrolling to the bottom of the form and tap Create key.",
    image: "/setup/stripe/03-create.png",
    alt: "Stripe's Create key button",
    desktop: { image: "/setup/stripe/03-create-desktop.png" },
  },
];

const many = (steps: SetupStep[], count: number): SetupStep[] =>
  Array.from({ length: count }, (_, i) => ({ ...steps[i % steps.length], title: `${steps[i % steps.length].title} (${i + 1})` }));

const REAL_STEP: SetupStep = {
  title: "Install the app",
  body: "Get it from Zapstore, then tap Get Started.",
  image: "/setup/01-welcome.png",
  alt: "Numo welcome screen with the Get Started button",
};
const REAL_STEPS: SetupStep[] = [
  REAL_STEP,
  { title: "Create your wallet", body: "Tap Create New Wallet.", image: "/setup/02-wallet-choice.png", alt: "Numo Set Up Your Wallet screen" },
  { title: "Pick a mint", body: "Keep the default or choose another, then tap Continue.", image: "/setup/03-select-mint.png", alt: "Numo Your Mints screen" },
  { title: "Enter the till", body: "Wait for Wallet Created, then tap Continue.", image: "/setup/04-ready.png", alt: "Numo Wallet Created screen" },
];

/* ---- Navigation ---------------------------------------------------------- */

/** BTCPay comes back to the bar as a fourth page link. */
const WORST_ROUTE_LINKS: NavItem[] = [
  { label: "Setup", href: "/setup" },
  { label: "Stripe", href: "/setup/stripe" },
  { label: "BTCPay Server", href: "/btcpay" },
  { label: "Releases", href: "/releases" },
];

/* ---- States -------------------------------------------------------------- */

export const FIXTURES: Record<"worst" | "empty" | "one" | "many", BreakData> = {
  worst: {
    releases: WORST_RELEASES,
    walletGroups: WORST_WALLETS,
    faq: WORST_FAQ,
    routeLinks: WORST_ROUTE_LINKS,
    tillSteps: WORST_TILL_STEPS,
    payoutSteps: WORST_PAYOUT_STEPS,
    keySteps: WORST_KEY_STEPS,
  },
  // An empty release list takes /releases down, so the switch leaves that page's
  // releases alone; see EMPTY_ALL.
  empty: {
    walletGroups: [
      { title: "Tap to pay", detail: "Cashu ecash wallets.", nfc: true, wallets: [] },
      { title: "Scan to pay", detail: "Any Bitcoin Lightning wallet.", wallets: [] },
    ],
    faq: [],
    tillSteps: [],
    payoutSteps: [],
    keySteps: [],
    connectSteps: [],
  },
  one: {
    releases: realReleases.slice(0, 1),
    walletGroups: [
      { title: "Tap to pay", detail: "Cashu ecash wallets.", nfc: true, wallets: [{ name: "eNuts", image: "/wallets/enuts.png" }] },
      { title: "Scan to pay", detail: "Any Bitcoin Lightning wallet.", wallets: [{ name: "Zeus", image: "/wallets/zeus.jpg" }] },
    ],
    faq: [{ id: "what", q: "What is Numo?", a: "A Bitcoin point-of-sale app for Android." }],
    tillSteps: [REAL_STEP],
    payoutSteps: [REAL_STEP],
    keySteps: [{ ...REAL_STEP, image: "/setup/stripe/01-key-form.png", desktop: { image: "/setup/stripe/01-key-form-desktop.png" } }],
    connectSteps: [{ ...REAL_STEP, image: "/setup/stripe/numo-01-paste.png" }],
  },
  many: {
    releases: MANY_RELEASES,
    walletGroups: MANY_WALLETS,
    faq: MANY_FAQ,
    tillSteps: many(REAL_STEPS, 12),
    payoutSteps: many(REAL_STEPS, 12),
  },
};

export const EMPTY_ALL: BreakData = { ...FIXTURES.empty, releases: [] };
