import Image from "next/image";
import { PhoneFrame } from "./PhoneFrame";

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
    <PhoneFrame>
        <Image src={src} alt={alt} width={1080} height={2340} sizes={sizes} className="h-auto w-full" />
        {annotations.map(({ region, marker, markerAt = "left" }) => (
          <span
            key={`${region.left}-${region.top}`}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-[7px] ring-2 ring-navy"
            style={{
              left: `${region.left}%`,
              top: `${region.top}%`,
              width: `${region.width}%`,
              height: `${region.height}%`,
            }}
          >
            {marker && (
              <span
                className={`text-caption absolute -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy font-semibold text-white ${
                  markerAt === "right" ? "-right-2" : "-left-2"
                }`}
              >
                {marker}
              </span>
            )}
          </span>
        ))}
    </PhoneFrame>
  );
}

/** A numbered step title, shared by both parts of the setup guide. The numeral is
 *  quiet type, not a badge. */
export function StepHeading({ number, children }: { number: string; children: string }) {
  return (
    <h3 className="text-title flex items-baseline gap-3 text-navy [text-wrap:balance]">
      <span aria-hidden="true" className="tabular text-navy/35">
        {number}
      </span>
      <span>
        <span className="sr-only">Step {number}: </span>
        {children}
      </span>
    </h3>
  );
}

const settings = [
  {
    marker: "A",
    name: "Lightning Address",
    body: (
      <>
        Tap the field and enter the address your Lightning wallet gave you. Wait for the green{" "}
        <strong className="font-semibold text-navy">Valid Lightning address</strong> message before moving on.
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
      <ol className="mt-16 max-w-[56rem] space-y-20 md:space-y-28">
        <li className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-16">
          <div>
            <StepHeading number="1">Open Withdrawals</StepHeading>
            <div>
              <p className="mt-4 max-w-[36rem] leading-[1.65] text-navy/70 [text-wrap:pretty]">
                From the till, tap the <strong className="font-semibold text-navy">gear in the top-right corner</strong>.
                Under Payments, tap <strong className="font-semibold text-navy">Withdrawals</strong>.
              </p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
            <Screenshot
              src="/setup/05-settings.png"
              alt="Numo Settings screen. Withdrawals sits under the Payments heading."
              sizes="(min-width: 1024px) 272px, (min-width: 400px) 352px, calc(100vw - 3rem)"
              annotations={[{ region: REGION.withdrawalsRow }]}
            />
            <figcaption className="text-caption mt-4 text-center text-navy/70 [text-wrap:pretty] lg:text-left">
              Settings, with Withdrawals outlined.
            </figcaption>
          </figure>
        </li>

        <li className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-16">
          <div>
            <StepHeading number="2">Switch on Auto-Withdraw</StepHeading>
            <div>
              <p className="mt-4 max-w-[36rem] leading-[1.65] text-navy/70 [text-wrap:pretty]">
                The Withdraw screen opens with the status reading{" "}
                <strong className="font-semibold text-navy">Inactive</strong>. Turn on the{" "}
                <strong className="font-semibold text-navy">Auto-Withdraw</strong> switch. The status flips to Active,
                and the destination and trigger settings appear underneath, as in step 3.
              </p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
            <Screenshot
              src="/setup/06-auto-withdraw.png"
              alt="Numo Withdraw screen with the status reading Inactive and the Auto-Withdraw switch turned off."
              sizes="(min-width: 1024px) 272px, (min-width: 400px) 352px, calc(100vw - 3rem)"
              annotations={[{ region: REGION.toggle }]}
            />
            <figcaption className="text-caption mt-4 text-center text-navy/70 [text-wrap:pretty] lg:text-left">
              Before the switch: no destination, no trigger settings.
            </figcaption>
          </figure>
        </li>

        <li className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-16">
          <div>
            <StepHeading number="3">Fill in the three settings</StepHeading>
            <div>
              <p className="mt-4 max-w-[36rem] leading-[1.65] text-navy/70 [text-wrap:pretty]">
                They all live on this one screen. There is no Save button, because Numo stores each value as you
                change it.
              </p>
              <dl className="mt-8 max-w-lg divide-y divide-line border-y border-line">
                {settings.map((setting) => (
                  <div key={setting.marker} className="flex gap-4 py-5">
                    <span
                      aria-hidden="true"
                      className="text-caption mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy font-semibold text-white"
                    >
                      {setting.marker}
                    </span>
                    <div>
                      <dt className="font-semibold text-navy">
                        <span className="sr-only">{setting.marker}. </span>
                        {setting.name}
                      </dt>
                      <dd className="mt-1.5 max-w-[28rem] text-sm leading-[1.6] text-navy/70 [text-wrap:pretty]">
                        {setting.body}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
            <Screenshot
              src="/setup/07-payout-details.png"
              alt="Numo Withdraw screen with Auto-Withdraw active, showing the Lightning Address field, a 50,000 sat Balance Threshold and a 95% Withdraw Amount."
              sizes="(min-width: 1024px) 272px, (min-width: 400px) 352px, calc(100vw - 3rem)"
              annotations={settings.map(({ region, marker, markerAt }) => ({ region, marker, markerAt }))}
            />
            <figcaption className="text-caption mt-4 text-center text-navy/70 [text-wrap:pretty] lg:text-left">
              After the switch: Destination and Trigger Settings have appeared. A, B and C mark the three values to
              set.
            </figcaption>
          </figure>
        </li>
      </ol>

      <div className="mt-20 max-w-[56rem] rounded-card border border-line bg-surface p-7 md:mt-28 md:p-10">
        <h3 className="text-title flex items-center gap-3 text-navy">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint ring-1 ring-navy/25" />
          That&rsquo;s the till open.
        </h3>
        <p className="mt-4 max-w-[36rem] text-navy/70 [text-wrap:pretty]">
          When the badge at the top of the Withdraw screen reads Active, sales land on the terminal and move to your
          Lightning wallet without you touching anything. Take one small payment and watch a full round trip before
          you trade.
        </p>
      </div>
    </>
  );
}
