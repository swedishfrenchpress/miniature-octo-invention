import type { ReactNode } from "react";
import Image from "next/image";

/** Consistent warm sunken stage so hardware renders, the slashed fee graphic,
 *  and payout notifications share the same architectural frame and visual gravity.
 *  `padding` replaces the default margin rather than adding to it. */
function Stage({
  children,
  padding = "p-6 sm:p-8 lg:p-10",
}: {
  children: ReactNode;
  padding?: string;
}) {
  return (
    <div
      className={`relative flex aspect-[5/4] w-full items-center justify-center overflow-hidden rounded-[24px] bg-sunken ${padding}`}
    >
      {children}
    </div>
  );
}

/** Cut-out studio renders hosted inside the shared sunken stage. The files are
 *  trimmed to the device itself, so `object-contain` fits each one to the stage:
 *  the device stands nearly as tall as its tile, with one even margin around it. */
function Render({ src, alt }: { src: string; alt: string }) {
  return (
    <Stage padding="p-4 sm:p-5 lg:p-6">
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 680px, (min-width: 768px) 52vw, 100vw"
          className="object-contain"
        />
      </div>
    </Stage>
  );
}

function AppIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] ${className}`}
    >
      {children}
    </span>
  );
}

const NOTIFICATIONS = [
  {
    app: "Strike",
    when: "Just now",
    text: "You received 47,500 sats",
    icon: (
      <AppIcon className="bg-black">
        <Image
          src="/wallets/strike.png"
          alt=""
          width={44}
          height={44}
          className="h-full w-full object-cover"
        />
      </AppIcon>
    ),
  },
  {
    app: "Stripe",
    when: "2m ago",
    text: "Payment of US$38.00 from Numo",
    icon: (
      <AppIcon className="bg-[#635BFF]">
        <span
          className="block h-5 w-5 bg-white"
          style={{
            mask: "url(/logos/stripe-mark.svg) center / contain no-repeat",
            WebkitMask: "url(/logos/stripe-mark.svg) center / contain no-repeat",
          }}
        />
      </AppIcon>
    ),
  },
];

/** Android/neutral settlement notifications showing funds arriving directly in
 *  the merchant's own Lightning wallet and Stripe account. */
function PayoutNotifications() {
  return (
    <Stage>
      <div className="w-full max-w-[420px]">
        <ul
          aria-label="Example notifications as payments land in a Lightning wallet and in Stripe"
          className="flex flex-col gap-3.5"
        >
          {NOTIFICATIONS.map((n) => (
            <li
              key={n.app}
              className="flex items-center gap-4 rounded-[18px] bg-surface px-4 py-4"
            >
              {n.icon}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.9375rem] font-semibold leading-tight text-navy">
                    {n.app}
                  </span>
                  <span className="text-caption leading-tight text-navy/65">{n.when}</span>
                </div>
                <p className="mt-1 text-[0.9375rem] leading-snug text-navy/80">{n.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

/** Slashed card-processor fee resolving into Numo's 0% Bitcoin platform fee.
 *  Even in a single still frame or under reduced motion, 2.9% + 30¢ is visibly
 *  cut through so it never reads as an active fee. */
function FeeStage() {
  return (
    <Stage>
      <div className="flex w-full max-w-[420px] flex-col items-center gap-6 text-center" aria-hidden="true">
        {/* Slashed legacy card fee */}
        <div className="relative inline-flex items-baseline gap-2.5 px-3 py-1">
          <span className="fee-old-value tabular text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-none tracking-[-0.03em] text-navy">
            2.9% + 30¢
          </span>
          <span className="fee-strike-line pointer-events-none absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 -rotate-[3deg] rounded-full bg-slash" />
        </div>

        {/* Fresh Paint Mint payoff on Signwriter's Ink */}
        <div className="fee-zero-badge flex w-full items-center justify-between gap-4 rounded-[18px] bg-navy px-6 py-5 text-left text-white">
          <div className="text-base font-medium text-white/90">Numo fee</div>
          <div className="tabular text-[clamp(2.5rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-mint">
            0%
          </div>
        </div>
      </div>
    </Stage>
  );
}

function SpecList({ items }: { items: [string, string][] }) {
  return (
    <dl className="@container mt-7 border-t border-line">
      {items.map(([term, detail]) => (
        <div
          key={term}
          className="grid gap-x-6 gap-y-0.5 border-b border-line py-3.5 @md:grid-cols-[11rem_1fr]"
        >
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
  flip?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-8 md:gap-12 lg:gap-20 ${
        flip
          ? "md:grid-cols-[1fr_1.15fr] xl:grid-cols-[1fr_1.3fr]"
          : "md:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.3fr_1fr]"
      }`}
    >
      <div className={flip ? "md:order-2" : ""}>{visual}</div>
      <div className="max-w-[32rem]">
        <h3 className="text-h2 text-navy">{title}</h3>
        {children}
      </div>
    </div>
  );
}

const body = "text-lead mt-4 text-navy/70 md:mt-5";

export function Showcase() {
  return (
    <section id="features" className="section-anchor section-y bg-paper">
      <div className="shell">
        <h2 className="text-display max-w-[9.25em] text-navy">
          A full point of sale on any Android.
        </h2>
        <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
          Use your own phone or a handheld Android terminal.
        </p>

        <div className="mt-block space-y-20 md:space-y-28 lg:space-y-36">
          <Row
            title="Tap to pay"
            visual={
              <Render
                src="/ui/till-tap.png"
                alt="A customer phone showing Cashu.me's Ready to Scan sheet held over a handheld till running Numo, whose screen displays an amount in sats, a QR code, and Scan or Tap to Pay"
              />
            }
          >
            <p className={body}>
              Customers tap their phone to yours with Cashu ecash. No ecash wallet? They
              scan the same screen with any Lightning wallet.
            </p>
          </Row>

          <Row
            flip
            title="Bitcoin & cards all in one."
            visual={
              <Render
                src="/ui/till-card.png"
                alt="A contactless credit card held over the reader on a handheld till running Numo, showing Stripe's tap-to-pay prompt for $38.00"
              />
            }
          >
            <p className={body}>
              Connect your Stripe account to take contactless cards, Apple Pay, and Google
              Pay on the same device. Card sales settle to Stripe at Stripe&rsquo;s
              standard rates.
            </p>
            <SpecList
              items={[
                ["Ecash", "Tap with a Cashu wallet"],
                ["Lightning", "Scan with any Lightning wallet"],
                ["Cards", "Tap via your Stripe account"],
              ]}
            />
          </Row>

          <Row title="Zero platform fees" visual={<FeeStage />}>
            <p className={body}>
              Numo takes 0% on Bitcoin sales. Pay only tiny network fees, usually under a
              cent. Instant settlement, no chargebacks.
            </p>
          </Row>

          <Row flip title="Automatic payouts" visual={<PayoutNotifications />}>
            <p className={body}>
              Set a threshold. Once reached, Bitcoin sweeps automatically to your Lightning
              address, like Strike or Blink. Card sales land in Stripe.
            </p>
          </Row>

          <Row
            title="Inventory, tax and reports, built in."
            visual={
              <Render
                src="/ui/till-sales.png"
                alt="A handheld till running Numo's Sales screen: $1,470.00 over the last 7 days, a daily bar chart, and a list of itemised sales"
              />
            }
          >
            <p className={body}>
              Set up your catalog once, then tap to ring up items in seconds.
            </p>
            <SpecList
              items={[
                ["Inventory", "Categories, sizes, and stock counts"],
                ["Taxes", "Applied per item at checkout"],
                ["Sales reports", "Daily totals and tips"],
                ["CSV exports", "Ready for accounting"],
              ]}
            />
          </Row>
        </div>
      </div>
    </section>
  );
}
