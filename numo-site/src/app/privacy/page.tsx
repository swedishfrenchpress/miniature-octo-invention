import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy & Terms - Numo",
  description:
    "Privacy policy and terms for the Numo Android app — a Bitcoin point-of-sale app built on Cashu ecash.",
};

const sections = [
  {
    title: "DATA COLLECTION",
    body: "Numo does not collect, store, or transmit any personal data. The app runs entirely on your device.",
  },
  {
    title: "WALLET DATA",
    body: "Your seed phrase and wallet data are stored locally on your device. We have no access to this information.",
  },
  {
    title: "NETWORK COMMUNICATIONS",
    body: "The app communicates with:\n\u2022 Cashu mints (to manage ecash tokens)\n\u2022 Price APIs (to fetch exchange rates)\n\u2022 Nostr relays (for optional backup features)\n\nThese services may have their own privacy policies.",
  },
  {
    title: "ANALYTICS",
    body: "We do not use any analytics or tracking services.",
  },
  {
    title: "THIRD-PARTY MINTS",
    body: "When using ecash mints, the mint operator may see transaction amounts and timing. Choose trusted mints.",
  },
  {
    title: "BACKUP",
    body: "If you enable Nostr backup, encrypted wallet data is published to Nostr relays. Only you can decrypt this data with your seed phrase.",
  },
  {
    title: "CONTACT",
    body: "For privacy questions: numopay@proton.me",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navigation />

      {/* Header */}
      <header className="bg-navy pt-36 pb-12 px-6 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-white leading-[0.9]">
            NUMO PAY
          </h1>
          <p className="font-display text-3xl md:text-4xl text-mint mt-2">
            PRIVACY POLICY
          </p>
          <p className="mt-4 max-w-[35rem] leading-relaxed text-white/70 [text-wrap:pretty]">
            This policy covers the Numo Android app. It does not describe numopay.org, which
            uses privacy-friendly page analytics.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="bg-cream py-16 px-6 min-h-[60vh]">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl text-navy mb-3">
                  {section.title}
                </h2>
                <p className="text-navy/70 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-navy/10">
            <p className="text-navy/65 text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </main>

      <SiteFooter note="Numo is free and open source. The five-minute setup guide is the fastest way in." />
    </>
  );
}
