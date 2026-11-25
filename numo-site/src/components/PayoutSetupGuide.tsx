import Image from "next/image";
import { PhoneFrame } from "./PhoneFrame";

/** Warm paper blur placeholder so below-fold app screenshots settle gently
 *  instead of flashing solid dark bezels before decoding. */
export const SCREENSHOT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzYyLjExLjEwMAD/2wBDAAgYGBwYHCEhISEhISckJygoKCcnJycoKCgrKyszMzMrKysoKCsrMDAzMzc5NzQ0MzQ5OTw8PEhIRUVUVFdnZ3z/xABMAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAgMQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAGAAgDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC4gJG//9k=";

type Region = { left: number; top: number; width: number; height: number };

const REGION = {
  withdrawalsRow: { left: 4, top: 70.4, width: 92, height: 5.2 },
  toggle: { left: 84.5, top: 36.7, width: 11, height: 4.1 },
  address: { left: 8.8, top: 56.6, width: 82.4, height: 7.7 },
  threshold: { left: 62.9, top: 77.8, width: 28, height: 6.5 },
  amount: { left: 72.3, top: 87.9, width: 18.7, height: 6.4 },
} satisfies Record<string, Region>;

export type Annotation = { region: Region; marker?: string; markerAt?: "left" | "right" };

const STAGE_SIZE = {
  compact: {
    figure: "",
    stage: "rounded-[20px] px-4 py-5 sm:px-5 sm:py-6",
    phone: "max-w-[224px] xl:max-w-[222px]",
    sizes: "(min-width: 1280px) 222px, (min-width: 640px) 224px, calc(100vw - 5rem)",
  },
  medium: {
    figure: "",
    stage: "rounded-[24px] px-6 py-7 sm:px-8 sm:py-8",
    phone: "max-w-[244px]",
    sizes: "(min-width: 1024px) 244px, (min-width: 640px) 244px, calc(100vw - 5rem)",
  },
  feature: {
    figure: "max-w-[384px]",
    stage: "rounded-[24px] px-7 py-7 sm:px-9 sm:py-8",
    phone: "max-w-[252px]",
    sizes: "(min-width: 1024px) 252px, (min-width: 400px) 252px, calc(100vw - 6rem)",
  },
} as const;

/** Framed device stage matching Showcase.tsx's architectural stage geometry.
 *  Alternates surface tone against its parent section (`paper` on sunken,
 *  `sunken` on paper) so screenshots sit in a deliberate physical frame. */
export function StepScreenshot({
  src,
  alt,
  caption,
  stageTone,
  size = "compact",
  annotations = [],
}: {
  src: string;
  alt: string;
  caption: string;
  stageTone: "paper" | "sunken";
  size?: "compact" | "medium" | "feature";
  annotations?: readonly Annotation[];
}) {
  const layout = STAGE_SIZE[size];
  return (
    <figure className={`w-full ${layout.figure}`}>
      <div
        className={`flex justify-center ${layout.stage} ${
          stageTone === "paper" ? "bg-paper" : "bg-sunken"
        }`}
      >
        <div className={`w-full ${layout.phone}`}>
          <PhoneFrame>
            <Image
              src={src}
              alt={alt}
              width={1080}
              height={2340}
              placeholder="blur"
              blurDataURL={SCREENSHOT_BLUR}
              sizes={layout.sizes}
              className="h-auto w-full"
            />
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
        </div>
      </div>
      <figcaption className="text-caption mt-3 text-left text-navy/65 [text-wrap:pretty] sm:min-h-[1.25rem]">
        {caption}
      </figcaption>
    </figure>
  );
}

const settings = [
  {
    marker: "A",
    name: "Lightning Address",
    body: (
      <>
        Enter your wallet&rsquo;s Lightning address (like{" "}
        <span className="font-medium text-navy">you@wallet.com</span>) and wait for{" "}
        <strong className="font-semibold text-navy">Valid Lightning address</strong>.
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
        Balance that triggers a payout. Numo raises it automatically if your wallet requires a
        higher minimum.
      </>
    ),
    region: REGION.threshold,
  },
  {
    marker: "C",
    name: "Withdraw Amount",
    body: <>Percentage sent each payout. The remainder covers network fees.</>,
    region: REGION.amount,
  },
];

export function PayoutSetupGuide() {
  return (
    <ol className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
      {/* Steps 1 & 2: stacked cleanly in two balanced columns with larger screenshots */}
      <li className="flex flex-col border-t border-line pt-6">
        <h3 className="text-h3 flex items-baseline gap-2.5 text-navy [text-wrap:balance]">
          <span aria-hidden="true" className="tabular font-sans text-sm font-semibold text-navy/65">
            1.
          </span>
          <span>
            <span className="sr-only">Step 1 of 3: </span>
            Open Withdrawals
          </span>
        </h3>
        <p className="mt-2.5 max-w-[30rem] text-[0.9375rem] leading-[1.6] text-navy/70 [text-wrap:pretty]">
          From the till, tap the top-right{" "}
          <strong className="font-semibold text-navy">gear icon</strong>, then tap{" "}
          <strong className="font-semibold text-navy">Withdrawals</strong> under Payments.
        </p>
        <div className="mt-auto pt-6">
          <StepScreenshot
            src="/setup/05-settings.png"
            alt="Numo Settings screen with the Withdrawals row outlined under the Payments heading."
            caption="Settings with Withdrawals outlined."
            stageTone="sunken"
            size="medium"
            annotations={[{ region: REGION.withdrawalsRow }]}
          />
        </div>
      </li>

      <li className="flex flex-col border-t border-line pt-6">
        <h3 className="text-h3 flex items-baseline gap-2.5 text-navy [text-wrap:balance]">
          <span aria-hidden="true" className="tabular font-sans text-sm font-semibold text-navy/65">
            2.
          </span>
          <span>
            <span className="sr-only">Step 2 of 3: </span>
            Turn on Auto-Withdraw
          </span>
        </h3>
        <p className="mt-2.5 max-w-[30rem] text-[0.9375rem] leading-[1.6] text-navy/70 [text-wrap:pretty]">
          Switch <strong className="font-semibold text-navy">Auto-Withdraw</strong> on. Status
          flips from Inactive to Active and the payout fields appear below.
        </p>
        <div className="mt-auto pt-6">
          <StepScreenshot
            src="/setup/06-auto-withdraw.png"
            alt="Numo Withdraw screen with the status reading Inactive and the Auto-Withdraw switch turned off."
            caption="Switch Auto-Withdraw on."
            stageTone="sunken"
            size="medium"
            annotations={[{ region: REGION.toggle }]}
          />
        </div>
      </li>

      {/* Step 3: dedicated A / B / C configuration workbench */}
      <li className="grid gap-10 border-t border-line pt-10 md:col-span-2 md:pt-14 lg:grid-cols-[1fr_360px] lg:items-center lg:gap-16 xl:grid-cols-[1fr_384px]">
        <div>
          <h3 className="text-h3 flex items-baseline gap-2.5 text-navy [text-wrap:balance]">
            <span aria-hidden="true" className="tabular font-sans text-sm font-semibold text-navy/65">
              3.
            </span>
            <span>
              <span className="sr-only">Step 3 of 3: </span>
              Set your payout details
            </span>
          </h3>
          <p className="mt-2.5 max-w-[32rem] text-[0.9375rem] leading-[1.6] text-navy/70 [text-wrap:pretty]">
            Everything saves automatically as you type.
          </p>

          <dl className="mt-7 max-w-[34rem] divide-y divide-line border-y border-line">
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

        <StepScreenshot
          src="/setup/07-payout-details.png"
          alt="Numo Withdraw screen with Auto-Withdraw active, showing the Lightning Address field, a 50,000 sat Balance Threshold, and a 95% Withdraw Amount."
          caption="Fields A, B, and C to configure."
          stageTone="sunken"
          size="feature"
          annotations={settings.map(({ region, marker, markerAt }) => ({
            region,
            marker,
            markerAt,
          }))}
        />
      </li>
    </ol>
  );
}
