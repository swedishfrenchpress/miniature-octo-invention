import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";
import type { ReactNode } from "react";
import { SetupExtras } from "@/components/SetupExtras";
import { SetupSequence, type SetupStep } from "@/components/SetupSequence";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "@/components/DownloadMenu";
import { breakData } from "@/breakdata";
import { checkGuide, withExistingScreenshots } from "@/data/checkContent";

export const metadata: Metadata = pageMetadata({
  title: "Setup guide - Numo",
  description:
    "Install Numo on Android, pick a mint, turn on automatic Lightning payouts, or connect BTCPay Server and Stripe cards.",
});

/* The guide is set in four type styles (display, h2, title, lead) and shows one
   screen at a time. Step copy carries no bold or emphasis: on-screen labels are
   written as the app capitalizes them, and that is enough to pick them out. */
const section = "section-anchor section-y border-t border-line";
const linkClass =
  "underline decoration-navy/40 underline-offset-[3px] transition-colors duration-150 hover:text-navy hover:decoration-navy active:opacity-60";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const tillSteps: SetupStep[] = [
  {
    title: "Install the app",
    body: (
      <>
        Get it from <ExternalLink href={ZAPSTORE_URL}>Zapstore</ExternalLink>, which keeps it
        updated, or download the APK from{" "}
        <ExternalLink href={DOWNLOAD_APK_URL}>GitHub</ExternalLink>. Approve Android&rsquo;s install
        prompt, then tap Get Started.
      </>
    ),
    image: "/setup/01-welcome.png",
    alt: "Numo welcome screen with the Get Started button",
  },
  {
    title: "Create your wallet",
    body: <>Tap Create New Wallet. Already have a 12-word phrase? Choose Restore From Backup.</>,
    image: "/setup/02-wallet-choice.png",
    alt: "Numo Set Up Your Wallet screen",
  },
  {
    title: "Pick a mint",
    body: (
      <>
        Keep the default or choose another, then tap Continue. Your mint, not Numo, holds the
        bitcoin backing incoming ecash. You can switch any time in Settings.
      </>
    ),
    image: "/setup/03-select-mint.png",
    alt: "Numo Your Mints screen showing the default and popular mints",
  },
  {
    title: "Enter the till",
    body: <>Wait for Wallet Created, then tap Continue. The green keypad is your till.</>,
    image: "/setup/04-ready.png",
    alt: "Numo Wallet Created confirmation screen",
  },
  {
    title: "Back up your recovery phrase",
    body: (
      <>
        Tap the gear icon, open Security &amp; Privacy, and write your 12 words down offline. It is
        the only way to restore ecash from your mints if you lose this phone.
      </>
    ),
    image: "/setup/05-settings.png",
    alt: "Numo Settings screen with the Security & Privacy row outlined.",
    outline: { left: 4, top: 90, width: 92, height: 5.2 },
  },
];

const payoutSteps: SetupStep[] = [
  {
    title: "Open Withdrawals",
    body: <>From the till, tap the gear icon, then Withdrawals under Payments.</>,
    image: "/setup/05-settings.png",
    alt: "Numo Settings screen with the Withdrawals row outlined under the Payments heading.",
    outline: { left: 4, top: 70.4, width: 92, height: 5.2 },
  },
  {
    title: "Turn on Auto-Withdraw",
    body: (
      <>
        Switch Auto-Withdraw on. Status flips from Inactive to Active and the payout fields appear
        below.
      </>
    ),
    image: "/setup/06-auto-withdraw.png",
    alt: "Numo Withdraw screen with the status reading Inactive and the Auto-Withdraw switch turned off.",
    outline: { left: 84.5, top: 36.7, width: 11, height: 4.1 },
  },
  {
    title: "Set your payout details",
    body: (
      <>
        Enter your Lightning address and wait for Valid Lightning address. By default Numo sends 95%
        once your balance passes 50,000 sats, and the remainder covers network fees.
      </>
    ),
    image: "/setup/07-payout-details.png",
    alt: "Numo Withdraw screen with Auto-Withdraw active, showing the Lightning Address field, a 50,000 sat Balance Threshold, and a 95% Withdraw Amount.",
    outline: { left: 8.8, top: 56.6, width: 82.4, height: 7.7 },
  },
];

// Warns if a screenshot is missing or is not the shape of its frame.
checkGuide("src/app/(site)/setup/page.tsx", "Open your till.", tillSteps, "phone");
checkGuide("src/app/(site)/setup/page.tsx", "Automatic payouts.", payoutSteps, "phone");

export default async function SetupPage() {
  const swap = await breakData();
  // A part with no steps is left out whole; checkGuide warns about it at build.
  const till = withExistingScreenshots(swap.tillSteps ?? tillSteps);
  const payouts = withExistingScreenshots(swap.payoutSteps ?? payoutSteps);

  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className="shell header-y">
          <h1 className="text-display max-w-[8em] text-navy">From download to first sale.</h1>
          <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
            Five minutes on an Android phone with NFC and internet. For payouts, bring a Lightning
            address from Strike, Alby Go, Blink, Wallet of Satoshi, or any wallet that provides one.
          </p>
        </div>
      </header>

      {till.length > 0 && (
        <section
          id="onboarding"
          aria-labelledby="onboarding-heading"
          className={`${section} bg-paper`}
        >
          <SetupSequence heading="Open your till." headingId="onboarding-heading" steps={till} />
        </section>
      )}

      {payouts.length > 0 && (
        <section id="lightning" aria-labelledby="lightning-heading" className={`${section} bg-paper`}>
          <SetupSequence
            heading="Automatic payouts."
            headingId="lightning-heading"
            intro="Enter your Lightning address, which reads like you@wallet.com, and sales sweep to your own wallet automatically."
            steps={payouts}
          />
        </section>
      )}

      {/* `#btcpay` and `#cards` (inside) are kept as stable anchors for links from
          outside the site; nothing on the site links to them now. */}
      <section id="btcpay" aria-labelledby="extras-heading" className={`${section} bg-paper`}>
        <SetupExtras />
      </section>
    </>
  );
}
