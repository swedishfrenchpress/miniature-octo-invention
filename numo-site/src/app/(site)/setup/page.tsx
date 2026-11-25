import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SetupSteps, type SetupStep } from "@/components/SetupSteps";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "@/components/DownloadMenu";

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

/* The whole page is set in five type styles (display, lead, h2, h3, body) and
   three gaps (mt-2 inside a unit, mt-6 around it, mt-12 between blocks, which
   opens to mt-16 from md up). Body copy has exactly one emphasis: the label
   the reader has to find on screen. */
const section = "section-anchor section-y border-t border-line";
const container = "shell";
const prose = "text-navy/70 [text-wrap:pretty]";

function Label({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-navy">{children}</strong>;
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy"
    >
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
        Install from <ExternalLink href={ZAPSTORE_URL}>Zapstore</ExternalLink> for automatic
        updates, or download the APK from the latest{" "}
        <ExternalLink href={DOWNLOAD_APK_URL}>GitHub release</ExternalLink>. Approve Android&rsquo;s
        install prompt, then tap <Label>Get Started</Label>.
      </>
    ),
    image: "/setup/01-welcome.png",
    alt: "Numo welcome screen with the Get Started button",
  },
  {
    title: "Create your wallet",
    body: (
      <>
        Tap <Label>Create New Wallet</Label>. Choose <Label>Restore From Backup</Label> only if you
        already have a 12-word phrase.
      </>
    ),
    image: "/setup/02-wallet-choice.png",
    alt: "Numo Set Up Your Wallet screen",
  },
  {
    title: "Pick a mint",
    body: (
      <>
        Keep the default or choose another, then tap <Label>Continue</Label>. Your mint, not Numo,
        holds the bitcoin backing incoming ecash. Switch anytime in Settings under Mints.
      </>
    ),
    image: "/setup/03-select-mint.png",
    alt: "Numo Your Mints screen showing the default and popular mints",
  },
  {
    title: "Enter the till",
    body: (
      <>
        Wait for <Label>Wallet Created</Label>, then tap <Label>Continue</Label>. The green keypad
        is your till.
      </>
    ),
    image: "/setup/04-ready.png",
    alt: "Numo Wallet Created confirmation screen",
  },
];

const payoutSteps: SetupStep[] = [
  {
    title: "Open Withdrawals",
    body: (
      <>
        From the till, tap the gear icon, then <Label>Withdrawals</Label> under Payments.
      </>
    ),
    image: "/setup/05-settings.png",
    alt: "Numo Settings screen with the Withdrawals row outlined under the Payments heading.",
    outline: { left: 4, top: 70.4, width: 92, height: 5.2 },
  },
  {
    title: "Turn on Auto-Withdraw",
    body: (
      <>
        Switch <Label>Auto-Withdraw</Label> on. Status flips from Inactive to Active and the payout
        fields appear below.
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
        Enter your Lightning address and wait for <Label>Valid Lightning address</Label>. The
        defaults send 95% once your balance passes 50,000 sats, and the remainder covers network
        fees. Changes save as you type.
      </>
    ),
    image: "/setup/07-payout-details.png",
    alt: "Numo Withdraw screen with Auto-Withdraw active, showing the Lightning Address field, a 50,000 sat Balance Threshold, and a 95% Withdraw Amount.",
    outline: { left: 8.8, top: 56.6, width: 82.4, height: 7.7 },
  },
];

export default function SetupPage() {
  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className={`${container} header-y`}>
          <h1 className="text-display max-w-[8em] text-navy">From download to first sale.</h1>
          <p className="text-lead mt-5 md:mt-6 max-w-[38rem] text-navy/70">
            Five minutes on an Android phone with NFC and internet. For payouts, bring a Lightning
            address from Strike, Alby Go, Blink, Wallet of Satoshi, or any wallet that provides
            one.
          </p>
        </div>
      </header>

      <section
        id="onboarding"
        aria-labelledby="onboarding-heading"
        className={`${section} bg-sunken`}
      >
        <div className={container}>
          <h2 id="onboarding-heading" className="text-h2 text-navy">
            Open your till.
          </h2>
          <SetupSteps steps={tillSteps} />
          <div className="mt-12 max-w-[35rem] md:mt-16">
            <h3 className="text-h3 text-navy">Back up your recovery phrase</h3>
            <p className={`mt-2 ${prose}`}>
              From the till, tap the gear icon, open <Label>Security &amp; Privacy</Label>, and
              write your 12 words down offline. It is the only way to restore ecash from your mints
              if you lose this phone.
            </p>
          </div>
        </div>
      </section>

      <section id="lightning" aria-labelledby="lightning-heading" className={`${section} bg-paper`}>
        <div className={container}>
          <h2 id="lightning-heading" className="text-h2 text-navy">
            Automatic payouts.
          </h2>
          <p className={`mt-6 max-w-[35rem] ${prose}`}>
            Enter your Lightning address, which reads like you@wallet.com, and sales sweep to your
            own wallet automatically.
          </p>
          <SetupSteps steps={payoutSteps} />
        </div>
      </section>

      {/* `#btcpay` is linked from /btcpay; `#cards` is kept as a stable anchor. */}
      <section id="btcpay" aria-labelledby="extras-heading" className={`${section} bg-sunken`}>
        <div className={`${container} grid gap-12 md:gap-16 lg:grid-cols-2 lg:gap-6`}>
          <h2 id="extras-heading" className="text-h2 text-navy">
            Optional extras.
          </h2>
          <div className="border-t border-line">
            <div className="border-b border-line py-6">
              <h3 className="text-h3 text-navy">Connect BTCPay Server</h3>
              <p className={`mt-2 ${prose}`}>
                Open <Label>Settings</Label> and tap <Label>BTCPay Server</Label> under Payments to
                link your store. Numo generates store invoices at the till and syncs your catalog
                and your Lightning and Cashu sales.
              </p>
            </div>
            <div id="cards" className="section-anchor border-b border-line py-6">
              <h3 className="text-h3 text-navy">Take contactless cards with Stripe</h3>
              <p className={`mt-2 ${prose}`}>
                Connect your own Stripe account in <Label>Settings</Label> to accept contactless
                cards, Apple Pay, and Google Pay on the same device. Card sales settle directly to
                Stripe at Stripe&rsquo;s standard card processing fees and stay separate from
                Bitcoin in Numo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
