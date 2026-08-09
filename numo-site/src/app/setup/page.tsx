import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { PayoutSetupGuide } from "@/components/PayoutSetupGuide";

export const metadata: Metadata = {
  title: "Set up Numo - Merchant Guide",
  description:
    "Install Numo, pick a mint, and switch on auto-withdraw so sales move to your own Lightning wallet.",
};

function AppScreenshot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-[2rem] bg-black p-2 shadow-[0_28px_60px_rgba(10,37,64,.2)] ring-1 ring-black/10">
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={2340}
          sizes="(min-width: 1024px) 272px, (min-width: 400px) 352px, calc(100vw - 3rem)"
          className="h-auto w-full rounded-[1.55rem]"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs leading-[1.45] [text-wrap:pretty] text-navy/70 lg:text-left">
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
          className="font-semibold text-navy underline underline-offset-2 hover:text-navy/70"
        >
          GitHub releases
        </a>{" "}
        or{" "}
        <a
          href="https://zapstore.dev/apps/naddr1qqtkxmmd9ejkcetrw3exjcmywfjkzmtn9eh82mt0qyv8wumn8ghj7un9d3shjtn6v9c8xar0wfjjuer9wcpzpcluvulut7vuc42dpl68w4ne2erayh9kuejclyfdz99wvs5axhf4qvzqqqr7pvu7jrcc"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy underline underline-offset-2 hover:text-navy/70"
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
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <section className="noise-overlay relative overflow-hidden bg-navy px-6 pb-20 pt-36 text-white md:pb-28 md:pt-44">
          <div className="relative z-10 mx-auto max-w-6xl">
            <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,8rem)] [text-wrap:balance]">
              <span className="block">From download</span>
              <span className="block">to first sale.</span>
            </h1>
            <p className="mt-9 max-w-[38rem] text-lg leading-[1.6] tracking-[0.005em] [text-wrap:pretty] text-white/75 md:text-xl">
              Part one opens the till. Part two points it at your own Lightning wallet.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full border-[48px] border-mint/10 md:h-[30rem] md:w-[30rem]"
          />
        </section>

        <section aria-labelledby="youll-need" className="border-b border-navy/10 bg-mint px-6 py-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <h2 id="youll-need" className="shrink-0 font-display text-3xl [text-wrap:balance] text-navy md:text-4xl">You&rsquo;ll need</h2>
            <ul className="flex flex-col gap-2 text-sm font-semibold text-navy md:flex-row md:flex-wrap md:items-center md:gap-x-8">
              <li>About 5 minutes</li>
              <li>An NFC-enabled Android phone</li>
              <li>
                A Lightning address for payouts, from any{" "}
                <a href="/#wallets" className="underline decoration-navy/40 underline-offset-4 hover:decoration-navy">
                  supported wallet
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="onboarding" className="section-anchor bg-cream-warm px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[.25em] text-navy/70">Part one</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(3rem,5vw,4.5rem)] [text-wrap:balance] text-navy">Set up your terminal.</h2>
            <p className="mt-5 max-w-xl text-lg leading-[1.6] [text-wrap:pretty] text-navy/70">
              These four screens create the wallet your terminal takes payments into. Then you are trading.
            </p>
            <p className="mt-6 max-w-[38rem] rounded-2xl bg-white/70 p-5 text-sm leading-[1.6] [text-wrap:pretty] text-navy/75">
              <strong className="font-semibold text-navy">What is a mint?</strong> The service that issues and holds
              the Cashu balance your terminal takes in. It is not your payout wallet. You pick a mint in step 3, and
              Part two moves the money on to a wallet you own.
            </p>

            <ol className="mt-14 max-w-4xl space-y-20 md:space-y-28">
              {onboardingSteps.map((step, index) => (
                <li key={step.title} className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-center lg:gap-14">
                  {/* Below sm the badge sits in the heading row, not a gutter, so prose
                      keeps the full column instead of dropping to ~26 characters a line. */}
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint font-display text-xl text-navy">
                        {index + 1}
                      </span>
                      <h3 className="font-display text-3xl [text-wrap:balance] text-navy md:text-4xl">{step.title}</h3>
                    </div>
                    <div className="sm:pl-14">
                      <p className="mt-4 max-w-[36rem] text-lg leading-[1.65] [text-wrap:pretty] text-navy/70">
                        {step.body}
                      </p>
                      {step.warning && (
                        <p className="mt-6 max-w-[35rem] rounded-2xl bg-navy p-5 text-base leading-[1.7] tracking-[0.005em] [text-wrap:pretty] text-white">
                          {step.warning}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none">
                    <AppScreenshot src={step.image} alt={step.alt} caption={step.caption} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="lightning" className="section-anchor bg-navy px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[.25em] text-mint">Part two</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(3rem,5vw,4.5rem)] [text-wrap:balance]">Send sales to your wallet.</h2>
            <p className="mt-5 max-w-xl text-lg leading-[1.7] tracking-[0.005em] [text-wrap:pretty] text-white/75">
              A Lightning address looks like an email address, for example{" "}
              <span className="text-white">shop@wallet.com</span>. Numo sends funds there every time the terminal
              balance reaches an amount you set.
            </p>
            <PayoutSetupGuide />
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-cream-warm p-8 md:p-12">
              <h2 className="font-display text-[clamp(3rem,5vw,4.5rem)] [text-wrap:balance] text-navy">
                <span className="block">50,000 sats in.</span>
                <span className="block">95% out.</span>
              </h2>
              <p className="mt-5 max-w-[36rem] text-lg leading-[1.6] [text-wrap:pretty] text-navy/70">
                Numo ships with those two values. Change either to match a day&rsquo;s takings. A busy counter can sit
                on a higher threshold. A market stall usually wants a lower one.
              </p>
            </div>
            <div className="rounded-[2rem] bg-cream p-8 md:p-12">
              <h2 className="font-display text-4xl [text-wrap:balance] text-navy">Check after the test sale</h2>
              <ul className="mt-7 space-y-4 text-base leading-[1.5] text-navy/75">
                {preflight.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 border-navy/40"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter note="Numo is free and open source. Step one starts at the GitHub releases page." />
    </>
  );
}
