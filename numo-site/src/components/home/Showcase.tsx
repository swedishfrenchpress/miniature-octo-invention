import type { ReactNode } from "react";
import Image from "next/image";

/** The product, told as five large rows: one claim, one big picture, alternating
 *  sides. No frames, grids or colour panels — the pictures sit straight on the
 *  page and are the structure.
 *
 *  Three of the pictures are studio renders of the real hardware (a SUNMI V3 till,
 *  an iPhone) whose screens are captures of the real apps. They are clean
 *  cut-outs — transparent ground, no cast shadow — so they take the page colour.
 *  Sources: the numo-promo Blender kit; see DESIGN.md. */
function Render({
  src,
  alt,
  scale = "",
}: {
  src: string;
  alt: string;
  /** Per-image framing, e.g. "scale-[1.4]". The renders are shot wide. */
  scale?: string;
}) {
  return (
    <div className="relative aspect-[5/4]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 640px, 100vw"
        className={`object-contain ${scale}`}
      />
    </div>
  );
}

/** Where the money goes: the merchant's own accounts saying it arrived. Two
 *  notifications in the iOS style — bitcoin landing in a Lightning wallet, a
 *  card payment landing in Stripe. An illustration with sample amounts: the
 *  Stripe line follows the wording of Stripe's own payment notification, the
 *  wallet line stands in for the wallet's. 47,500 sats is the app's default
 *  payout, 95% of a 50,000 sat threshold. */
function AppIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[12px] ${className}`}>
      {children}
    </span>
  );
}

const NOTIFICATIONS = [
  {
    app: "Stripe",
    when: "now",
    text: "Payment of US$38.00 from Numo",
    icon: (
      <AppIcon className="bg-[#635BFF]">
        <span
          className="block h-6 w-6 bg-white"
          style={{
            mask: "url(/logos/stripe-mark.svg) center / contain no-repeat",
            WebkitMask: "url(/logos/stripe-mark.svg) center / contain no-repeat",
          }}
        />
      </AppIcon>
    ),
  },
  {
    app: "Strike",
    when: "2m ago",
    text: "You received 47,500 sats",
    icon: (
      <AppIcon>
        <Image src="/wallets/strike.png" alt="" width={48} height={48} className="h-full w-full object-cover" />
      </AppIcon>
    ),
  },
];

function PayoutNotifications() {
  return (
    <div className="mx-auto w-full max-w-[460px]">
      <ul
        aria-label="Example notifications as payments arrive in Stripe and in a Lightning wallet"
        className="flex flex-col gap-3"
        // Depicted iOS UI, so it is set in the system face rather than Sora.
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif" }}
      >
        {NOTIFICATIONS.map((n) => (
          <li
            key={n.app}
            className="flex items-center gap-4 rounded-[26px] border border-line bg-white px-[1.125rem] py-4"
          >
            {n.icon}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[1.0625rem] font-semibold leading-tight text-black">{n.app}</span>
                <span className="text-[0.875rem] leading-tight text-black/45">{n.when}</span>
              </div>
              <p className="mt-0.5 text-[1.0625rem] leading-snug text-black/80">{n.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-caption mt-4 text-navy/70">Illustration. Sample amounts.</p>
    </div>
  );
}

/** A platform fee, cut in half, at poster scale. Timing lives in globals.css
 *  (`fee-*`, 12s loop). The one picture that is type rather than hardware. */
function FeeStage() {
  const figure =
    "tabular text-[clamp(4.5rem,11vw,9rem)] font-medium leading-none tracking-[-0.05em] text-navy";
  const fees = [
    { text: "2.9%", n: 1, place: "left-[6%] top-[14%]", tilt: "rotate(-4deg)" },
    { text: "30¢", n: 2, place: "bottom-[14%] right-[6%]", tilt: "rotate(3deg)" },
  ];
  return (
    <div className="relative aspect-[5/4] overflow-hidden" aria-hidden="true">
      {fees.map((fee) => (
        <div
          key={fee.text}
          className={`absolute ${fee.place}`}
          style={{ animation: `fee-${fee.n}-container 12s ease-in-out infinite`, transform: fee.tilt }}
        >
          <div className="relative inline-block">
            <span
              className={`${figure} inline-block`}
              style={{ clipPath: "inset(0 0 50% 0)", animation: `fee-${fee.n}-slice-top 12s ease-in-out infinite` }}
            >
              {fee.text}
            </span>
            <span
              className={`${figure} absolute left-0 top-0`}
              style={{ clipPath: "inset(50% 0 0 0)", animation: `fee-${fee.n}-slice-bottom 12s ease-in-out infinite` }}
            >
              {fee.text}
            </span>
          </div>
          <div
            className="absolute -inset-x-3 top-1/2 h-[3px] origin-left bg-navy"
            style={{ animation: `slice-line-${fee.n} 12s ease-in-out infinite` }}
          />
        </div>
      ))}
    </div>
  );
}

/** What, then how. Plain rows under the copy, divided by hairlines. */
function SpecList({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-8 border-t border-line">
      {items.map(([term, detail]) => (
        <div key={term} className="grid gap-x-6 gap-y-0.5 border-b border-line py-3.5 sm:grid-cols-[11rem_1fr]">
          <dt className="font-semibold text-navy">{term}</dt>
          <dd className="text-navy/70">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

function Row({
  title,
  children,
  visual,
  flip,
}: {
  title: string;
  children: ReactNode;
  visual: ReactNode;
  /** Put the picture on the right. */
  flip?: boolean;
}) {
  return (
    <div className={`grid items-center gap-8 md:gap-12 lg:gap-16 ${flip ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"}`}>
      <div className={flip ? "md:order-2" : ""}>{visual}</div>
      <div className="max-w-[32rem]">
        <h3 className="text-h2 text-navy">{title}</h3>
        {children}
      </div>
    </div>
  );
}

const body = "text-lead mt-5 text-navy/70";

export function Showcase() {
  return (
    <section id="features" className="section-anchor overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-display max-w-[17ch] text-navy">
          A full point of sale on the phone you already have.
        </h2>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-32">
          <Row
            title="Tap to pay"
            visual={
              <Render
                src="/ui/numo-tap.png"
                alt="An iPhone showing Cashu.me's Ready to Scan sheet, held over the head of a handheld till running Numo, whose screen shows an amount in sats, a QR code and the words Scan or Tap to Pay"
                scale="scale-[1.25]"
              />
            }
          >
            <p className={body}>
              Your customer holds their phone to yours and the sale is done. Numo takes
              Cashu ecash, bearer tokens that move device to device, which is what makes it
              a real tap. Anyone else scans the same screen with a Lightning wallet.
            </p>
          </Row>

          <Row
            flip
            title="Bitcoin and cards, one till."
            visual={
              <Render
                src="/ui/numo-card-tap-2.png"
                alt="A Chase Sapphire Reserve card held over the reader on a handheld till, whose screen shows Stripe's tap to pay prompt and a total of $38.00"
                scale="scale-[1.12]"
              />
            }
          >
            <p className={body}>
              Have a Stripe account? Connect it and customers tap a card, phone or watch on
              the same device. No card reader needed. Card payments go to your Stripe
              account and stay separate from your bitcoin in Numo.
            </p>
            <SpecList
              items={[
                ["Ecash", "Tap to pay from any compatible Cashu wallet"],
                ["Lightning", "Scan to pay from any Bitcoin Lightning wallet"],
                ["Cards and Apple Pay", "Tap to pay, through your own Stripe account"],
              ]}
            />
          </Row>

          <Row title="Zero platform fees" visual={<FeeStage />}>
            <p className={body}>
              Numo takes no cut of your Bitcoin sales. No 2.9% + 30¢. Just tiny Bitcoin
              network fees, and the money is yours in seconds, not days. No chargebacks,
              no holds, no waiting for funds to clear.
            </p>
          </Row>

          <Row
            flip
            title="Automatic payouts"
            visual={
              <PayoutNotifications />
            }
          >
            <p className={body}>
              Set a threshold amount. Once your ecash balance reaches it, funds
automatically transfer to your own Lightning address, in a wallet like
              Strike or River. Card payments land in your Stripe account.
            </p>
          </Row>

          <Row
            title="Inventory, tax and reports, built in."
            visual={
              <Render
                src="/ui/numo-sales.png"
                alt="A handheld till running Numo's Sales screen: $1,470.00 over the last 7 days, a bar chart by day, and a list of itemised sales"
                scale="scale-[1.1]"
              />
            }
          >
            <p className={body}>
              Build a catalog with categories and sizes, then tap once to charge a preset
              price. Numo keeps track of what you sold and what you have left.
            </p>
            <SpecList
              items={[
                ["Inventory", "Items, sizes and stock in one catalog"],
                ["Taxes", "Applied at the till, item by item"],
                ["Sales reports", "What sold, and when"],
                ["CSV exports", "Ready for your accounting"],
              ]}
            />
          </Row>
        </div>
      </div>
    </section>
  );
}
