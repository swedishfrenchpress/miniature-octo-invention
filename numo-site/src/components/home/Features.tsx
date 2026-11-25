import Image from "next/image";

/** The features grid: one framed surface, cells divided by hairlines. Where a
 *  feature has a screen in the app, the cell shows that screen — real captures,
 *  not drawings. The fee cell keeps its one running illustration. */

const cell = "relative flex flex-col overflow-hidden p-7 md:p-9";
const copy = "mt-2.5 max-w-[26rem] text-navy/70 [text-wrap:pretty]";

/** A real capture of the app, shown as the top of a handset rising out of the
 *  cell's bottom edge. */
function Screen({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className="-mb-7 mt-auto pt-10 md:-mb-9">
    <div
      className={`overflow-hidden rounded-t-[28px] bg-ink-deep p-[5px] pb-0 shadow-device ${className}`}
    >
      <div className="h-full overflow-hidden rounded-t-[23px] bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="280px"
          className={`block h-auto w-full ${imageClassName}`}
        />
      </div>
    </div>
    </div>
  );
}

/** A platform fee, cut in half. Timing lives in globals.css (`fee-*`, 12s loop). */
function FeeSlice() {
  const figure = "tabular text-6xl font-medium tracking-[-0.045em] text-navy md:text-7xl";
  const fees = [
    { text: "2.9%", n: 1, place: "left-0 top-2", tilt: "rotate(-4deg)" },
    { text: "30¢", n: 2, place: "bottom-4 right-0", tilt: "rotate(3deg)" },
  ];
  return (
    <div className="relative mt-8 h-[190px] overflow-hidden" aria-hidden="true">
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
            className="absolute -inset-x-2 top-1/2 h-[2px] origin-left bg-navy"
            style={{ animation: `slice-line-${fee.n} 12s ease-in-out infinite` }}
          />
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="section-anchor py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-h2 max-w-[20ch] text-navy">
          A full point of sale on the phone you already have.
        </h2>

        <div className="mt-12 grid overflow-hidden rounded-card border border-line bg-surface md:mt-16 md:grid-cols-12">
          {/* Tap to pay — the claim a Lightning-only till cannot make */}
          <div className={`${cell} border-b border-line md:col-span-6 md:border-r`}>
            <h3 className="text-h3 text-navy">Tap to pay</h3>
            <p className={copy}>
              Your customer holds their phone to yours and the sale is done. Numo takes
              Cashu ecash, bearer tokens that move device to device, which is what makes
              it a real tap. Anyone else scans the same screen with a Lightning wallet.
            </p>
            <Screen
              src="/ui/pay-screen.png"
              alt="Numo's payment screen: an amount in sats above a QR code, labelled Scan or Tap to Pay"
              width={496}
              height={900}
              className="mx-auto h-[340px] w-[248px] md:h-[380px]"
            />
          </div>

          {/* Cards, through Stripe — the other half of the till.
              TODO: replace the tender list with a capture of the card flow once
              current app screens are available. */}
          <div className={`${cell} border-b border-line md:col-span-6`}>
            <h3 className="text-h3 text-navy">Cards, through Stripe</h3>
            <p className={copy}>
              Have a Stripe account? Connect it and accept cards and Apple Pay with tap
              to pay, the same way you take Bitcoin. One phone on the counter for every
              customer who walks in.
            </p>
            <dl className="mt-10 border-t border-line md:mt-auto">
              {[
                ["Contactless cards", "Tap to pay"],
                ["Apple Pay", "Tap to pay"],
                ["Bitcoin", "Tap or scan"],
              ].map(([tender, how]) => (
                <div
                  key={tender}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5 last:border-b-0 last:pb-0"
                >
                  <dt className="text-h2 text-navy">
                    {tender}
                  </dt>
                  <dd className="shrink-0 text-sm text-navy/70">{how}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Fees and settlement, stacked beside the payouts screen */}
          <div className="flex flex-col border-b border-line md:col-span-5 md:border-b-0 md:border-r">
            <div className={`${cell} flex-1 border-b border-line`}>
              <h3 className="text-h3 text-navy">Zero platform fees</h3>
              <p className={copy}>
                Numo takes no cut of your Bitcoin sales. No 2.9% + 30¢. Just tiny Bitcoin
                network fees.
              </p>
              <FeeSlice />
            </div>
            <div className={cell}>
              <h3 className="text-h3 text-navy">Instant settlement</h3>
              <p className={copy}>
                Seconds, not days. No chargebacks, no holds, no waiting for funds to clear.
              </p>
            </div>
          </div>

          {/* Automatic payouts */}
          <div className={`${cell} md:col-span-7`}>
            <h3 className="text-h3 text-navy">Automatic payouts</h3>
            <p className={copy}>
              Set a threshold amount. Once your ecash balance reaches it, funds
              automatically transfer to your own Lightning address.
            </p>
            <Screen
              src="/setup/07-payout-details.png"
              alt="Numo's Withdraw settings with Auto-Withdraw active, a Lightning address field, a 50,000 sat balance threshold and a 95% withdraw amount"
              width={1080}
              height={2340}
              className="mx-auto h-[340px] w-[248px] md:h-[380px]"
              imageClassName="-mt-[30px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
