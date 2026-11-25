import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Terms - Numo",
  description:
    "Privacy policy and terms for the Numo Android app — a Bitcoin point-of-sale app built on Cashu ecash.",
};

const sections = [
  {
    title: "Data collection",
    body: "Numo does not collect, store, or transmit any personal data. The app runs entirely on your device.",
  },
  {
    title: "Wallet data",
    body: "Your seed phrase and wallet data are stored locally on your device. We have no access to this information.",
  },
  {
    title: "Network communications",
    body: "The app communicates with:\n\u2022 Cashu mints (to manage ecash tokens)\n\u2022 Price APIs (to fetch exchange rates)\n\u2022 Nostr relays (for optional backup features)\n\nThese services may have their own privacy policies.",
  },
  {
    title: "Analytics",
    body: "We do not use any analytics or tracking services.",
  },
  {
    title: "Third-party mints",
    body: "When using ecash mints, the mint operator may see transaction amounts and timing. Choose trusted mints.",
  },
  {
    title: "Backup",
    body: "If you enable Nostr backup, encrypted wallet data is published to Nostr relays. Only you can decrypt this data with your seed phrase.",
  },
  {
    title: "Contact",
    body: "For privacy questions: numopay@proton.me",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="pt-[60px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:pb-16 md:pt-24">
          <h1 className="text-display text-navy">Privacy policy</h1>
          <p className="text-lead mt-6 max-w-[36rem] text-navy/70">
            This policy covers the Numo Android app. It does not describe numopay.org, which
            uses privacy-friendly page analytics.
          </p>
        </div>
      </header>

      <div className="border-t border-line pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[680px] space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-h3 text-navy">{section.title}</h2>
                <p className="mt-3 whitespace-pre-line leading-[1.65] text-navy/70">{section.body}</p>
              </section>
            ))}
            <p className="border-t border-line pt-8 text-sm text-navy/70">Last updated: April 2026</p>
          </div>
        </div>
      </div>
    </>
  );
}
