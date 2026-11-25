import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PayoutSetupGuide, StepScreenshot } from "@/components/PayoutSetupGuide";
import { PreflightChecklist } from "@/components/PreflightChecklist";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "@/components/DownloadMenu";

const ISSUES_URL = "https://github.com/cashubtc/Numo/issues";

export const metadata: Metadata = {
  title: "Set up Numo - Merchant Guide",
  description:
    "Install Numo on Android, pick a mint, turn on automatic Lightning payouts, or connect BTCPay Server and Stripe cards.",
  openGraph: {
    title: "Set up Numo - Merchant Guide",
    description:
      "Install Numo on Android, pick a mint, turn on automatic Lightning payouts, or connect BTCPay Server and Stripe cards.",
    type: "website",
    siteName: "Numo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Set up Numo - Merchant Guide",
    description:
      "Install Numo on Android, pick a mint, turn on automatic Lightning payouts, or connect BTCPay Server and Stripe cards.",
  },
};

const linkClass =
  "font-medium text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy";

const onboardingSteps = [
  {
    title: "Install the app",
    body: (
      <>
        Install from{" "}
        <a href={ZAPSTORE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Zapstore
          <span className="sr-only"> (opens in a new tab)</span>
        </a>{" "}
        (signed auto-updates) or download the <span className="font-medium text-navy">.apk</span>{" "}
        under the latest{" "}
        <a href={DOWNLOAD_APK_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          GitHub release
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        . Approve Android&rsquo;s prompt for apps outside the Play Store, then tap{" "}
        <strong className="font-semibold text-navy">Get Started</strong>.
      </>
    ),
    image: "/setup/01-welcome.png",
    alt: "Numo welcome screen with the Get Started button",
    caption: "Tap Get Started.",
  },
  {
    title: "Create your wallet",
    body: (
      <>
        Tap <strong className="font-semibold text-navy">Create New Wallet</strong>. Choose{" "}
        <strong className="font-semibold text-navy">Restore From Backup</strong> only if you
        already have a 12-word phrase.
      </>
    ),
    image: "/setup/02-wallet-choice.png",
    alt: "Numo Set Up Your Wallet screen",
    caption: "Choose Create New Wallet.",
  },
  {
    title: "Pick a mint",
    body: (
      <>
        Keep the default mint and tap <strong className="font-semibold text-navy">Continue</strong>,
        or choose another. Numo holds nothing; the mint backs incoming ecash until it sweeps out.
        Switch mints anytime in Settings under Mints.
      </>
    ),
    image: "/setup/03-select-mint.png",
    alt: "Numo Your Mints screen showing the default and popular mints",
    caption: "Top card holds incoming payments.",
  },
  {
    title: "Enter the till",
    body: (
      <>
        Wait for <strong className="font-semibold text-navy">Wallet Created</strong>, then tap{" "}
        <strong className="font-semibold text-navy">Continue</strong>. The green keypad is your
        till.
      </>
    ),
    image: "/setup/04-ready.png",
    alt: "Numo Wallet Created confirmation screen",
    caption: "Your till is ready.",
  },
];

const BTCPAY_SPECS: [string, string][] = [
  ["Location", "BTCPay Server under Payments in Settings"],
  ["What syncs", "Store invoices, Lightning and Cashu sales, and catalog"],
];

export default function SetupPage() {
  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-12 md:pb-14 md:pt-16">
          <h1 className="text-display max-w-[14ch] text-navy">From download to first sale.</h1>
          <p className="text-lead mt-4 max-w-[40rem] text-navy/70">
            Open the till in{" "}
            <a href="#onboarding" className={linkClass}>
              Part one
            </a>
            , set up payouts in{" "}
            <a href="#lightning" className={linkClass}>
              Part two
            </a>
            , run a{" "}
            <a href="#ready" className={linkClass}>
              test sale
            </a>
            , or jump to{" "}
            <a href="#btcpay" className={linkClass}>
              BTCPay and cards
            </a>
            .
          </p>

          <section
            aria-labelledby="youll-need"
            className="mt-10 border-t border-line pt-6 md:mt-12 md:pt-7"
          >
            <div className="grid gap-y-5 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-x-14">
              <h2 id="youll-need" className="text-sm font-semibold text-navy">
                You&rsquo;ll need
              </h2>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-[auto_auto_1fr] lg:gap-x-12">
                <div>
                  <dt className="text-caption text-navy/65">Time</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium text-navy">5 minutes</dd>
                </div>
                <div>
                  <dt className="text-caption text-navy/65">Device</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium text-navy">
                    Android with NFC and internet
                  </dd>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <dt className="text-caption text-navy/65">Payout wallet</dt>
                  <dd className="mt-1 max-w-[34rem] text-[0.9375rem] leading-[1.55] text-navy/70 [text-wrap:pretty]">
                    A Lightning address (like{" "}
                    <span className="font-medium text-navy">you@wallet.com</span>) from{" "}
                    <strong className="font-medium text-navy">Strike</strong>,{" "}
                    <strong className="font-medium text-navy">Alby Go</strong>,{" "}
                    <strong className="font-medium text-navy">Blink</strong>,{" "}
                    <strong className="font-medium text-navy">Wallet of Satoshi</strong>, or any
                    wallet that provides one.
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </header>

      <section
        id="onboarding"
        aria-labelledby="onboarding-heading"
        className="section-anchor border-t border-line bg-sunken py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 id="onboarding-heading" className="text-h2 max-w-[20ch] text-navy">
            Part one: open your till.
          </h2>
          <p className="text-lead mt-3.5 max-w-[34rem] text-navy/70">
            Four screens to start taking payments.
          </p>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4 xl:gap-6">
            {onboardingSteps.map((step, index) => (
              <li key={step.title} className="flex flex-col border-t border-line pt-5">
                <h3 className="text-h3 flex items-baseline gap-2.5 text-navy [text-wrap:balance]">
                  <span
                    aria-hidden="true"
                    className="tabular font-sans text-sm font-semibold text-navy/65"
                  >
                    {index + 1}.
                  </span>
                  <span>
                    <span className="sr-only">
                      Step {index + 1} of {onboardingSteps.length}:{" "}
                    </span>
                    {step.title}
                  </span>
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-navy/70 [text-wrap:pretty]">
                  {step.body}
                </p>
                <div className="mt-auto pt-6">
                  <StepScreenshot
                    src={step.image}
                    alt={step.alt}
                    caption={step.caption}
                    stageTone="paper"
                  />
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-card bg-navy p-6 text-white md:p-7">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <svg
                  className="h-4 w-4 shrink-0 text-mint"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="7.5" cy="10" r="3.5" />
                  <path d="M11 10h6.5M15 10v2.5M17.5 10v2" />
                </svg>
                <span>Back up your recovery phrase</span>
              </h3>
              <p className="mt-2.5 max-w-[38rem] text-sm leading-[1.65] text-white/80 [text-wrap:pretty]">
                From the till, tap the top-right{" "}
                <strong className="font-semibold text-white">gear icon</strong>, open{" "}
                <strong className="font-semibold text-white">Security &amp; Privacy</strong>, and
                write your 12 words down offline. It is the only way to restore ecash from your
                mints if you lose this phone.
              </p>
            </div>

            <aside
              aria-labelledby="mint-custody-heading"
              className="rounded-card border border-line bg-paper p-6 md:p-7"
            >
              <h3 id="mint-custody-heading" className="text-sm font-semibold text-navy">
                What is a mint?
              </h3>
              <p className="mt-2 text-sm leading-[1.65] text-navy/70 [text-wrap:pretty]">
                Your chosen mint holds the bitcoin backing incoming Cashu ecash, not Numo. Pick one
                in step 3, switch or add your own mint anytime in Settings under Mints, and use
                Part two to sweep balances out to your own wallet.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="lightning"
        aria-labelledby="lightning-heading"
        className="section-anchor border-t border-line bg-paper py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 id="lightning-heading" className="text-h2 max-w-[20ch] text-navy">
            Part two: automatic payouts.
          </h2>
          <p className="text-lead mt-3.5 max-w-[36rem] text-navy/70">
            Enter your Lightning address (like{" "}
            <span className="font-medium text-navy">you@wallet.com</span>) so sales sweep to your
            wallet automatically.
          </p>
          <PayoutSetupGuide />
        </div>
      </section>

      {/* Post-setup test sale, defaults, and persistent checklist */}
      <section
        id="ready"
        aria-labelledby="ready-heading"
        className="section-anchor border-t border-line bg-sunken py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <h2 id="ready-heading" className="text-h2 text-navy">
              That&rsquo;s the till open.
            </h2>
            <p className="text-lead mt-3.5 max-w-[33rem] text-navy/70">
              Once Auto-Withdraw is Active and your Lightning address reads Valid, sales sweep to
              your wallet automatically.
            </p>
            <p className="mt-4 max-w-[33rem] text-[0.9375rem] leading-[1.6] text-navy/70 [text-wrap:pretty]">
              Before taking customers, enter a small amount on the green keypad, scan the QR with
              your own wallet, and check{" "}
              <strong className="font-semibold text-navy">Activity</strong> to confirm it landed.
              Small tests below 50,000 sats stay in Numo until you cross the threshold, or you can
              send them right away with{" "}
              <strong className="font-semibold text-navy">Withdraw Now</strong>.
            </p>

            <div className="mt-8 max-w-[33rem] border-t border-line pt-7">
              <p className="text-title tabular text-navy">50,000 sats in. 95% out.</p>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-navy/70 [text-wrap:pretty]">
                Built-in defaults. Raise the threshold for a busy counter, or lower it for a
                market stall.
              </p>
            </div>

            <p className="text-caption mt-6 text-navy/65">
              Hit a snag? Check the{" "}
              <Link href="/#faq" className={linkClass}>
                FAQ
              </Link>{" "}
              or open an issue on{" "}
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>

          <PreflightChecklist />
        </div>
      </section>

      {/* Optional add-ons: BTCPay Server + Stripe contactless cards */}
      <section
        id="btcpay"
        aria-labelledby="btcpay-heading"
        className="section-anchor border-t border-line bg-paper py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
            <div>
              <h2 id="btcpay-heading" className="text-h2 max-w-[18ch] text-navy">
                Optional: connect BTCPay Server.
              </h2>
              <p className="text-lead mt-3.5 max-w-[32rem] text-navy/70">
                Open <strong className="font-semibold text-navy">Settings</strong> and tap{" "}
                <strong className="font-semibold text-navy">BTCPay Server</strong> under Payments
                to link your store. Numo generates store invoices at the till and keeps your
                catalog synced.
              </p>
              <div className="mt-7">
                <Button href="/btcpay" variant="secondary" size="md">
                  View the BTCPay demo
                </Button>
              </div>
            </div>

            <dl className="border-t border-line lg:mt-2">
              {BTCPAY_SPECS.map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="font-semibold text-navy">{term}</dt>
                  <dd className="text-navy/70 [text-wrap:pretty]">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            id="cards"
            className="mt-12 grid gap-6 border-t border-line pt-10 md:mt-14 md:pt-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16"
          >
            <h3 className="text-title text-navy">Take contactless cards with Stripe.</h3>
            <p className="max-w-[34rem] text-[0.9375rem] leading-[1.65] text-navy/70 [text-wrap:pretty]">
              Connect your own Stripe account in{" "}
              <strong className="font-semibold text-navy">Settings</strong> to accept contactless
              cards, Apple Pay, and Google Pay on the same device. Card sales settle directly to
              Stripe at Stripe&rsquo;s standard card processing fees and stay separate from Bitcoin
              in Numo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
