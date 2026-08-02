import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Navigation } from "@/components/Navigation";
import { PayoutSetupGuide } from "@/components/PayoutSetupGuide";

export const metadata: Metadata = {
  title: "Set up Numo — Merchant Guide",
  description:
    "A practical guide to setting up Numo, choosing a mint, and sending sales to your Lightning wallet automatically.",
};

const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
  </svg>
);

function AppScreenshot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mx-auto w-full max-w-[320px]">
      <div className="overflow-hidden rounded-[2rem] bg-black p-2 shadow-[0_28px_60px_rgba(10,37,64,.2)] ring-1 ring-black/10">
        <Image src={src} alt={alt} width={1080} height={2340} className="h-auto w-full rounded-[1.55rem]" />
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-navy/50">{caption}</figcaption>
    </figure>
  );
}

const onboardingSteps = [
  { number: "01", title: "Open Numo", body: <>Download the latest APK, install it on an NFC-enabled Android device, then tap the white <strong>Get Started</strong> button.</>, image: "/setup/01-welcome.png", alt: "Numo welcome screen with the Get Started button", caption: "Tap Get Started on the welcome screen." },
  { number: "02", title: "Create your wallet", body: <>Tap <strong>Create New Wallet</strong>. Only choose <strong>Restore From Backup</strong> if you already have a Numo 12-word recovery phrase.</>, image: "/setup/02-wallet-choice.png", alt: "Numo Set Up Your Wallet screen", caption: "New merchants should choose Create New Wallet." },
  { number: "03", title: "Keep or change the default mint", body: <>Numo selects a default mint for you. For the quickest setup, leave it selected and tap <strong>Continue</strong>. You can tap a popular mint to make it the default, or use <strong>Add New Mint</strong> if your business already has one.</>, image: "/setup/03-select-mint.png", alt: "Numo Your Mints screen showing the default and popular mints", caption: "The top card is where incoming Cashu payments are held." },
  { number: "04", title: "Enter the till", body: <>Wait for <strong>Wallet Created</strong>, then tap <strong>Continue</strong>. The green keypad is your till. Before trading, open <strong>Settings → Security & Privacy</strong> and store your recovery phrase somewhere private and offline.</>, image: "/setup/04-ready.png", alt: "Numo Wallet Created confirmation screen", caption: "This confirmation means the terminal is ready." },
];

export default function SetupPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <header className="noise-overlay relative overflow-hidden bg-navy px-6 pb-20 pt-36 text-white md:pb-28 md:pt-44">
          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[.28em] text-mint">The opening checklist</p>
            <h1 className="max-w-5xl font-display text-6xl leading-[.86] sm:text-7xl md:text-8xl lg:text-[7.5rem]">FROM DOWNLOAD<br />TO FIRST SALE.</h1>
            <div className="mt-9 flex max-w-3xl flex-col gap-7 border-l-2 border-mint pl-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">Set up Numo, choose where payments arrive, and automatically move sales to your own Lightning wallet.</p>
              <a href="#onboarding" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-mint hover:text-white">Start the guide <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div aria-hidden="true" className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full border-[48px] border-mint/10 md:h-[30rem] md:w-[30rem]" />
        </header>

        <section className="border-b border-navy/10 bg-mint px-6 py-5">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-10 gap-y-3 text-sm font-semibold text-navy">
            <span className="flex items-center gap-2"><Check /> About 5 minutes</span>
            <span className="flex items-center gap-2"><Check /> NFC-enabled Android</span>
            <span className="flex items-center gap-2"><Check /> A Lightning address for payouts</span>
          </div>
        </section>

        <section id="onboarding" className="section-anchor bg-cream-warm px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p className="text-sm font-semibold uppercase tracking-[.25em] text-navy/45">Part one</p>
                <h2 className="mt-4 font-display text-5xl text-navy md:text-7xl">OPEN YOUR TILL.</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-navy/65">Onboarding creates the wallet your terminal uses to receive payments. You do not need to understand Bitcoin infrastructure to get started.</p>
                <div className="mt-8 rounded-2xl border border-navy/10 bg-white/55 p-5 text-sm leading-relaxed text-navy/65">
                  <strong className="text-navy">What is a mint?</strong><br />It is the service that issues and holds the Cashu balance received by this terminal. It is not your final payout wallet.
                </div>
              </div>
              <ol className="border-t border-navy/15">
                {onboardingSteps.map((step) => (
                  <li key={step.number} className="grid gap-4 border-b border-navy/15 py-9 sm:grid-cols-[72px_1fr] md:py-12">
                    <span className="font-display text-4xl text-navy/25">{step.number}</span>
                    <div>
                      <h3 className="font-display text-3xl text-navy md:text-4xl">{step.title}</h3>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-navy/65">{step.body}</p>
                      <div className="mt-7 rounded-[2rem] bg-white/60 p-5 sm:p-7">
                        <AppScreenshot src={step.image} alt={step.alt} caption={step.caption} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="lightning" className="section-anchor bg-navy px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.25em] text-mint">Part two</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl md:text-7xl">SEND SALES TO YOUR WALLET.</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">A Lightning address looks like an email address—such as <span className="text-white">shop@wallet.com</span>. Numo can send funds there whenever the terminal balance reaches an amount you choose.</p>
            </div>
            <PayoutSetupGuide />
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-[2rem] bg-mint p-8 md:p-12">
                <p className="text-sm font-semibold uppercase tracking-[.2em] text-navy/50">A sensible first setup</p>
                <p className="mt-5 font-display text-5xl text-navy md:text-6xl">50,000 SATS IN.<br />95% OUT.</p>
                <p className="mt-5 max-w-lg leading-relaxed text-navy/65">Numo starts with a 50,000 sat threshold and a 95% payout. When the balance crosses the threshold, it sends 95% to your Lightning address and leaves a small amount for fees. Adjust both values to suit your sales.</p>
              </div>
              <div className="rounded-[2rem] bg-cream p-8 md:p-12">
                <h2 className="font-display text-4xl text-navy">BEFORE THE FIRST CUSTOMER</h2>
                <ul className="mt-7 space-y-4 text-sm text-navy/70">
                  {["Make one small test payment", "Confirm the sale appears in Activity", "Check that your Lightning address is valid", "Keep the device charged and connected"].map((item) => <li key={item} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-navy"><Check /></span>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-cream-warm px-6 py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div><p className="font-display text-4xl text-navy md:text-5xl">READY TO OPEN?</p><p className="mt-2 text-navy/55">Download Numo and take a small test payment first.</p></div>
            <Button href="https://github.com/cashubtc/Numo/releases" variant="dark" external>Download the APK</Button>
          </div>
        </footer>
      </main>
    </>
  );
}
