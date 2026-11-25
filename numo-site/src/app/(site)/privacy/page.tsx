import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Terms - Numo",
  description:
    "Privacy policy and terms for the Numo Android app — a Bitcoin point-of-sale app built on Cashu ecash.",
};

const NETWORK_SERVICES = [
  "Cashu mints (to issue and redeem ecash tokens)",
  "Price APIs (to fetch live exchange rates)",
  "Nostr relays (for optional encrypted wallet backup)",
  "BTCPay Server (only if you connect your own BTCPay store)",
  "Stripe (only if you connect a Stripe account for contactless card payments)",
];

const linkClass =
  "font-medium text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy";

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:pb-16 md:pt-24">
          <h1 className="text-display text-navy">Privacy policy</h1>
          <p className="text-lead mt-5 max-w-[34rem] text-navy/70">
            Covers the Numo Android app. This website uses privacy-friendly Vercel Analytics.
          </p>
        </div>
      </header>

      <div className="border-t border-line bg-sunken pb-24 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[36rem] space-y-10">
            <section>
              <h2 className="text-h3 text-navy">Data collection</h2>
              <p className="mt-3 leading-[1.65] text-navy/70 [text-wrap:pretty]">
                Numo does not collect, store, or transmit any personal data. The app runs
                entirely on your device.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-navy">Wallet data</h2>
              <p className="mt-3 leading-[1.65] text-navy/70 [text-wrap:pretty]">
                Your seed phrase and wallet data are stored locally on your device. We have no
                access to this information.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-navy">Network communications</h2>
              <p className="mt-3 leading-[1.65] text-navy/70">The app communicates with:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-[1.6] text-navy/70">
                {NETWORK_SERVICES.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <p className="mt-3 leading-[1.65] text-navy/70 [text-wrap:pretty]">
                These services operate independently and have their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-navy">Analytics</h2>
              <p className="mt-3 leading-[1.65] text-navy/70 [text-wrap:pretty]">
                The Numo Android app does not include any analytics or tracking SDKs.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-navy">Third-party mints</h2>
              <p className="mt-3 leading-[1.65] text-navy/70 [text-wrap:pretty]">
                When using ecash mints, the mint operator may see transaction amounts and
                timing. Choose mints you trust.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-navy">Backup</h2>
              <p className="mt-3 leading-[1.65] text-navy/70 [text-wrap:pretty]">
                If you enable optional Nostr or encrypted cloud backup, encrypted wallet data is
                stored externally so you can restore your till. Only you can decrypt this data
                with your recovery phrase.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-navy">Contact</h2>
              <p className="mt-3 leading-[1.65] text-navy/70">
                For privacy questions:{" "}
                <a href="mailto:numopay@proton.me" className={linkClass}>
                  numopay@proton.me
                </a>
              </p>
            </section>

            <p className="border-t border-line pt-8 text-sm text-navy/70">
              Last updated: November 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
