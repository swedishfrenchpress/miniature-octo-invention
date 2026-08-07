import Image from "next/image";

/**
 * Regions are expressed as percentages of the screenshot, so an annotation
 * outlines the control instead of covering it.
 */
type Region = { left: number; top: number; width: number; height: number };

const REGION = {
  withdrawalsRow: { left: 3.5, top: 70.7, width: 36, height: 4.5 },
  toggle: { left: 84.5, top: 36.7, width: 11, height: 4.1 },
  address: { left: 8.8, top: 56.6, width: 82.4, height: 7.7 },
  threshold: { left: 62.9, top: 77.8, width: 28, height: 6.5 },
  amount: { left: 72.3, top: 87.9, width: 18.7, height: 6.4 },
} satisfies Record<string, Region>;

/** `markerAt` picks the corner with empty screen behind it, so a marker never sits on a label. */
type Annotation = { region: Region; marker?: string; markerAt?: "left" | "right" };

function Screenshot({
  src,
  alt,
  sizes,
  annotations = [],
}: {
  src: string;
  alt: string;
  sizes: string;
  annotations?: readonly Annotation[];
}) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-black p-1.5 shadow-[0_32px_80px_rgba(0,0,0,.35)] ring-1 ring-white/15">
      <div className="relative overflow-hidden rounded-[1.4rem]">
        <Image src={src} alt={alt} width={1080} height={2340} sizes={sizes} className="h-auto w-full" />
        {annotations.map(({ region, marker, markerAt = "left" }) => (
          <span
            key={`${region.left}-${region.top}`}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-lg ring-2 ring-navy"
            style={{
              left: `${region.left}%`,
              top: `${region.top}%`,
              width: `${region.width}%`,
              height: `${region.height}%`,
            }}
          >
            {marker && (
              <span
                className={`absolute -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy font-display text-sm text-mint ${
                  markerAt === "right" ? "-right-2" : "-left-2"
                }`}
              >
                {marker}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Below `sm` the badge shares the heading row rather than sitting in a gutter —
 * a 40px badge plus its gap costs 60px of a 342px phone column, which drops the
 * instruction text to roughly 26 characters a line.
 */
function StepHeading({ number, children }: { number: string; children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint font-display text-xl text-navy">
        {number}
      </span>
      <h3 className="font-display text-3xl [text-wrap:balance] text-white md:text-4xl">{children}</h3>
    </div>
  );
}

const settings = [
  {
    marker: "A",
    name: "Lightning Address",
    body: (
      <>
        Tap the field and enter the address your Lightning wallet gave you. Wait for the green{" "}
        <strong className="font-semibold text-white">Valid Lightning address</strong> message before moving on.
      </>
    ),
    region: REGION.address,
    markerAt: "right" as const,
  },
  {
    marker: "B",
    name: "Balance Threshold",
    body: (
      <>
        The balance that triggers a payout. Numo checks your address and raises this figure if your wallet needs a
        larger minimum.
      </>
    ),
    region: REGION.threshold,
  },
  {
    marker: "C",
    name: "Withdraw Amount",
    body: <>The share of the balance to send. The remainder stays on the terminal to cover network fees.</>,
    region: REGION.amount,
  },
];

export function PayoutSetupGuide() {
  return (
    <>
      <ol className="mt-14 max-w-4xl space-y-20 md:space-y-28">
        <li className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-14">
          <div>
            <StepHeading number="1">Open Withdrawals</StepHeading>
            <div className="sm:pl-14">
              <p className="mt-4 max-w-[36rem] text-lg leading-[1.75] tracking-[0.005em] [text-wrap:pretty] text-white/75">
                From the till, tap the <strong className="font-semibold text-white">gear in the top-right corner</strong>.
                Under Payments, tap <strong className="font-semibold text-white">Withdrawals</strong>.
              </p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none">
            <Screenshot
              src="/setup/05-settings.png"
              alt="Numo Settings screen. Withdrawals sits under the Payments heading."
              sizes="(min-width: 1024px) 272px, min(22rem, 100vw - 3rem)"
              annotations={[{ region: REGION.withdrawalsRow }]}
            />
            <figcaption className="mt-4 text-center text-xs leading-[1.45] tracking-[0.01em] [text-wrap:pretty] text-white/70 lg:text-left">
              Settings, with Withdrawals outlined.
            </figcaption>
          </figure>
        </li>

        <li className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-14">
          <div>
            <StepHeading number="2">Switch on Auto-Withdraw</StepHeading>
            <div className="sm:pl-14">
              <p className="mt-4 max-w-[36rem] text-lg leading-[1.75] tracking-[0.005em] [text-wrap:pretty] text-white/75">
                The Withdraw screen opens with the status reading{" "}
                <strong className="font-semibold text-white">Inactive</strong>. Turn on the{" "}
                <strong className="font-semibold text-white">Auto-Withdraw</strong> switch. The status flips to Active,
                and the destination and trigger settings appear underneath, as in step 3.
              </p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none">
            <Screenshot
              src="/setup/06-auto-withdraw.png"
              alt="Numo Withdraw screen with the status reading Inactive and the Auto-Withdraw switch turned off."
              sizes="(min-width: 1024px) 272px, min(22rem, 100vw - 3rem)"
              annotations={[{ region: REGION.toggle }]}
            />
            <figcaption className="mt-4 text-center text-xs leading-[1.45] tracking-[0.01em] [text-wrap:pretty] text-white/70 lg:text-left">
              Before the switch: no destination, no trigger settings.
            </figcaption>
          </figure>
        </li>

        <li className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-14">
          <div>
            <StepHeading number="3">Fill in the three settings</StepHeading>
            <div className="sm:pl-14">
              <p className="mt-4 max-w-[36rem] text-lg leading-[1.75] tracking-[0.005em] [text-wrap:pretty] text-white/75">
                They all live on this one screen. There is no Save button, because Numo stores each value as you
                change it.
              </p>
              <dl className="mt-8 max-w-lg divide-y divide-white/15 border-y border-white/15">
                {settings.map((setting) => (
                  <div key={setting.marker} className="flex gap-4 py-5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm text-navy"
                    >
                      {setting.marker}
                    </span>
                    <div>
                      <dt className="text-base font-semibold tracking-[0.01em] text-white">
                        <span className="sr-only">{setting.marker}. </span>
                        {setting.name}
                      </dt>
                      <dd className="mt-1.5 max-w-[28rem] text-sm leading-[1.7] tracking-[0.005em] [text-wrap:pretty] text-white/75">
                        {setting.body}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none">
            <Screenshot
              src="/setup/07-payout-details.png"
              alt="Numo Withdraw screen with Auto-Withdraw active, showing the Lightning Address field, a 50,000 sat Balance Threshold and a 95% Withdraw Amount."
              sizes="(min-width: 1024px) 272px, min(22rem, 100vw - 3rem)"
              annotations={settings.map(({ region, marker, markerAt }) => ({ region, marker, markerAt }))}
            />
            <figcaption className="mt-4 text-center text-xs leading-[1.45] tracking-[0.01em] [text-wrap:pretty] text-white/70 lg:text-left">
              After the switch: Destination and Trigger Settings have appeared. A, B and C mark the three values to
              set.
            </figcaption>
          </figure>
        </li>
      </ol>

      <div className="mt-20 max-w-4xl rounded-[2rem] bg-mint p-8 text-navy md:mt-28 md:p-12">
        <h3 className="font-display text-4xl [text-wrap:balance] md:text-5xl">That&rsquo;s the till open.</h3>
        <p className="mt-4 max-w-[36rem] text-lg leading-[1.6] [text-wrap:pretty] text-navy/75">
          When the badge at the top of the Withdraw screen reads Active, sales land on the terminal and move to your
          Lightning wallet without you touching anything. Take one small payment and watch a full round trip before
          you trade.
        </p>
      </div>
    </>
  );
}
