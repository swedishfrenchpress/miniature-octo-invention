import type { ReactNode } from "react";
import Link from "next/link";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "@/lib/links";

/* The FAQ's questions and answers. Plain data, not a client module, so the
   layout can see whether there are any (an empty FAQ hides its section and the
   nav's FAQ link). */

const linkClass =
  "text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy active:opacity-60";

export type FaqItem = { id: string; q: string; a: ReactNode };

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what",
    q: "What is Numo?",
    a: "A Bitcoin point-of-sale app for Android. Take Bitcoin with an NFC tap or Lightning QR code, and optionally connect Stripe to take cards on the same device.",
  },
  {
    id: "customer-app",
    q: "Do my customers need a special app?",
    a: "No. Any Bitcoin Lightning wallet works by QR scan. Cashu wallets pay with an NFC tap, and cards work if you connect Stripe.",
  },
  {
    id: "hardware",
    q: "Do I need any extra hardware?",
    a: "No. Any Android phone with NFC works. Handheld Android terminals work too.",
  },
  {
    id: "price",
    q: "Is it really free?",
    a: "Yes. Numo charges 0% on Bitcoin sales, with only tiny network fees (usually under a cent). Card payments through your Stripe account follow Stripe’s standard fees.",
  },
  {
    id: "custody",
    q: "Who holds the funds?",
    a: (
      <>
        The mint you choose during{" "}
        <Link href="/setup" className={linkClass}>
          setup
        </Link>
        , not Numo. Bitcoin sales are Cashu ecash backed by that mint. Withdraw to your own
        Lightning address any time, or turn on auto-withdraw.
      </>
    ),
  },
  {
    id: "offline",
    q: "What if I have bad internet?",
    a: "Taking a new payment requires internet so the mint can verify it. If your connection drops, Numo shows an offline banner and waits until you reconnect.",
  },
  {
    id: "get-started",
    q: "How do I get started?",
    a: (
      <>
        Install Numo from{" "}
        <a
          href={DOWNLOAD_APK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          GitHub releases
          <span className="sr-only"> (opens in a new tab)</span>
        </a>{" "}
        or{" "}
        <a
          href={ZAPSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Zapstore
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        , then follow the{" "}
        <Link href="/setup" className={linkClass}>
          setup guide
        </Link>
        . Four screens and your till is open.
      </>
    ),
  },
  {
    id: "play-store",
    q: "Can I download Numo on the Google Play Store?",
    a: "Not yet, it’s coming soon. Until then, install from GitHub releases or Zapstore.",
  },
];
