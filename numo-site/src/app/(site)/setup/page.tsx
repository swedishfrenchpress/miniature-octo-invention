import type { Metadata } from "next";
import Image from "next/image";
import { PhoneFrame } from "@/components/PhoneFrame";
import Link from "next/link";
import { PayoutSetupGuide, StepHeading } from "@/components/PayoutSetupGuide";

export const metadata: Metadata = {
  title: "Set up Numo - Merchant Guide",
  description:
    "Install Numo, pick a mint, and switch on auto-withdraw so sales move to your own Lightning wallet.",
};

function AppScreenshot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="w-full">
      <PhoneFrame>
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={2340}
          sizes="(min-width: 1024px) 272px, (min-width: 400px) 352px, calc(100vw - 3rem)"
          className="h-auto w-full"
        />
      </PhoneFrame>
      <figcaption className="text-caption mt-4 text-center text-navy/70 [text-wrap:pretty] lg:text-left">
        {caption}
      </figcaption>
    </figure>
  );
}

const onboardingSteps = [
  {
    title: "Install the app",
    body: (
      <>
        Download the latest APK from{" "}
        <a
          href="https://github.com/cashubtc/Numo/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-navy underline decoration-navy/30 underline-offset-[3px] hover:decoration-navy"
        >
          GitHub releases
        </a>{" "}
        or{" "}
        <a
          href="https://zapstore.dev/apps/naddr1qqtkxmmd9ejkcetrw3exjcmywfjkzmtn9eh82mt0qyv8wumn8ghj7un9d3shjtn6v9c8xar0wfjjuer9wcpzpcluvulut7vuc42dpl68w4ne2erayh9kuejclyfdz99wvs5axhf4qvzqqqr7pvu7jrcc"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-navy underline decoration-navy/30 underline-offset-[3px] hover:decoration-navy"
        >
          Zapstore
        </a>
        . When you open the file, Android asks you to allow installs from this source. That
        prompt is normal for any app from outside the Play Store. Approve it, finish the
        install, then tap the white{" "}
        <strong className="font-semibold text-navy">Get Started</strong> button.
      </>
    ),
    image: "/setup/01-welcome.png",
    alt: "Numo welcome screen with the Get Started button",
    caption: "Tap Get Started on the welcome screen.",
  },
  {
    title: "Create your wallet",
    body: (
      <>
        Tap <strong className="font-semibold text-navy">Create New Wallet</strong>. Only choose{" "}
        <strong className="font-semibold text-navy">Restore From Backup</strong> if you already have a Numo 12-word
        recovery phrase.
      </>
    ),
    image: "/setup/02-wallet-choice.png",
    alt: "Numo Set Up Your Wallet screen",
    caption: "New merchants should choose Create New Wallet.",
  },
  {
    title: "Keep or change the default mint",
    body: (
      <>
        Numo picks a default mint for you. Leave it and tap{" "}
        <strong className="font-semibold text-navy">Continue</strong> to start trading soonest. To use a different one,
        tap any mint in the popular list, or use{" "}
        <strong className="font-semibold text-navy">Add New Mint</strong> if your business already has one.
      </>
    ),
    image: "/setup/03-select-mint.png",
    alt: "Numo Your Mints screen showing the default and popular mints",
    caption: "The top card is where incoming Cashu payments are held.",
  },
  {
    title: "Enter the till",
    body: (
      <>
        Wait for <strong className="font-semibold text-navy">Wallet Created</strong>, then tap{" "}
        <strong className="font-semibold text-navy">Continue</strong>. The green keypad is your till.
      </>
    ),
    warning: (
      <>
        Before you trade, open <strong className="font-semibold">Settings → Security &amp; Privacy</strong> and write
        your recovery phrase down offline. It is the only way back into this wallet.
      </>
    ),
    image: "/setup/04-ready.png",
    alt: "Numo Wallet Created confirmation screen",
    caption: "This confirmation means the terminal is ready.",
  },
];

// The closing card of Part two already tells the merchant to take a test payment,
// so this list is what to check once they have. Repeating the instruction here
// made the page say the same thing twice in consecutive blocks.
const preflight = [
  "The sale appears in Activity",
  "The payout badge still reads Active",
  "Your Lightning address still shows as valid",
  "The terminal is charged and connected",
];

export default function SetupPage() {
  return (
    <>
      <header className="pt-[60px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-16 md:pb-20 md:pt-24">
          <h1 className="text-display max-w-[14ch] text-navy">From download to first sale.</h1>
          <p className="text-lead mt-6 max-w-[36rem] text-navy/70">
            Part one opens the till. Part two points it at your own Lightning wallet.
          </p>

          <section
            aria-labelledby="youll-need"
            className="mt-12 grid overflow-hidden rounded-card border border-line bg-surface md:mt-16 md:grid-cols-[auto_1fr_1fr_1.4fr]"
          >
            <h2
              id="youll-need"
              className="border-b border-line px-6 py-4 text-sm font-semibold text-navy md:border-b-0 md:border-r md:py-5"
            >
              You&rsquo;ll need
            </h2>
            <p className="border-b border-line px-6 py-4 text-sm text-navy/70 md:border-b-0 md:border-r md:py-5">
              About 5 minutes
            </p>
            <p className="border-b border-line px-6 py-4 text-sm text-navy/70 md:border-b-0 md:border-r md:py-5">
              An NFC-enabled Android phone
            </p>
            <p className="px-6 py-4 text-sm text-navy/70 md:py-5">
              A Lightning address for payouts, from any{" "}
              <Link
                href="/#wallets"
                className="text-navy underline decoration-navy/30 underline-offset-[3px] hover:decoration-navy"
              >
                supported wallet
              </Link>
            </p>
          </section>
        </div>
      </header>

      <section id="onboarding" className="section-anchor border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-h2 max-w-[20ch] text-navy">Part one: set up your terminal.</h2>
          <p className="text-lead mt-5 max-w-[34rem] text-navy/70">
            These four screens create the wallet your terminal takes payments into. Then you
            are trading.
          </p>
          <p className="mt-8 max-w-[38rem] rounded-card border border-line bg-surface p-5 text-sm leading-[1.6] text-navy/70 [text-wrap:pretty]">
            <strong className="font-semibold text-navy">What is a mint?</strong> The service that
            issues and holds the Cashu balance your terminal takes in. It is not your payout
            wallet. You pick a mint in step 3, and Part two moves the money on to a wallet you
            own.
          </p>

          <ol className="mt-16 max-w-[56rem] space-y-20 md:space-y-28">
            {onboardingSteps.map((step, index) => (
              <li key={step.title} className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-16">
                <div>
                  <StepHeading number={String(index + 1)}>{step.title}</StepHeading>
                  <p className="mt-4 max-w-[36rem] leading-[1.65] text-navy/70 [text-wrap:pretty]">
                    {step.body}
                  </p>
                  {step.warning && (
                    <p className="mt-6 max-w-[36rem] rounded-card border border-line bg-sunken p-5 text-sm leading-[1.6] text-navy [text-wrap:pretty]">
                      {step.warning}
                    </p>
                  )}
                </div>
                <div className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
                  <AppScreenshot src={step.image} alt={step.alt} caption={step.caption} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="lightning" className="section-anchor border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-h2 max-w-[20ch] text-navy">Part two: send sales to your wallet.</h2>
          <p className="text-lead mt-5 max-w-[34rem] text-navy/70">
            A Lightning address looks like an email address, for example{" "}
            <span className="text-navy">shop@wallet.com</span>. Numo sends funds there every
            time the terminal balance reaches an amount you set.
          </p>
          <PayoutSetupGuide />
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid overflow-hidden rounded-card border border-line bg-surface lg:grid-cols-2">
            <div className="border-b border-line p-7 md:p-10 lg:border-b-0 lg:border-r">
              <h2 className="text-h2 text-navy">
                <span className="block">50,000 sats in.</span>
                <span className="block">95% out.</span>
              </h2>
              <p className="mt-5 max-w-[32rem] text-navy/70 [text-wrap:pretty]">
                Numo ships with those two values. Change either to match a day&rsquo;s takings.
                A busy counter can sit on a higher threshold. A market stall usually wants a
                lower one.
              </p>
            </div>
            <div className="p-7 md:p-10">
              <h2 className="text-h3 text-navy">Check after the test sale</h2>
              <ul className="mt-5 border-t border-line">
                {preflight.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line py-3.5 text-navy/70 last:border-b-0 last:pb-0">
                    <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-[5px] border border-line-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
