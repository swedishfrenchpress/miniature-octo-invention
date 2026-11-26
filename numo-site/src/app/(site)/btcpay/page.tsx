import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { DownloadMenu } from "@/components/DownloadMenu";
import { PARTNER_HEADER, PartnerPair } from "@/components/PartnerPair";
import { BTCPayDemo } from "@/components/btcpay/BTCPayDemo";
import { BTCNUTSERVER_GITHUB_URL, BTCNUTSERVER_PLUGIN_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Numo for BTCPay Server",
  description:
    "Numo connects directly to your BTCPay Server store: it generates invoices, accepts Lightning or Cashu, and keeps your point-of-sale inventory in sync.",
};

/* Links inside a sentence: marked by underline alone, at the paragraph's weight. */
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

const POINTS: { title: string; body: ReactNode }[] = [
  {
    title: "Invoices from the till",
    body: "Every sale creates an invoice in your BTCPay store.",
  },
  {
    title: "Lightning or Cashu",
    body: (
      <>
        Customers pay how they prefer. Both record to your store. Taking Cashu needs the{" "}
        <ExternalLink href={BTCNUTSERVER_PLUGIN_URL}>BTCNutServer plugin</ExternalLink> in your
        store, which is in early beta. Its code is on{" "}
        <ExternalLink href={BTCNUTSERVER_GITHUB_URL}>GitHub</ExternalLink>.
      </>
    ),
  },
  {
    title: "Inventory in sync",
    body: "Your till catalog stays matched with BTCPay automatically.",
  },
];

export default function BTCPayPage() {
  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className={PARTNER_HEADER}>
          <PartnerPair partner="btcpay" />
          <div>
            <h1 className="text-display max-w-[16ch] text-navy">
              The till for your BTCPay Server store.
            </h1>
            <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
              Connect Numo to ring up in-person sales directly into BTCPay. In Numo, open Settings
              and tap BTCPay Server under Payments to link your store.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <DownloadMenu variant="primary" size="md" align="left" />
              <Button href="/setup" variant="secondary" size="md">
                Setup guide
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="section-y border-t border-line bg-sunken">
        <div className="shell">
          <BTCPayDemo />
        </div>
      </section>

      {/* Three parallel facts, so a list: a heading that names the group and
          plain rows parted by hairlines. No cards, no columns of boxes. */}
      <section aria-labelledby="sync-heading" className="section-y border-t border-line bg-paper">
        <div className="shell grid gap-y-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-x-12 lg:gap-x-20">
          <h2 id="sync-heading" className="text-h2 text-navy">
            What stays in sync.
          </h2>
          <dl className="divide-y divide-line">
            {POINTS.map((point) => (
              <div key={point.title} className="py-7 first:pt-0 last:pb-0 md:py-8">
                <dt className="text-title text-navy">{point.title}</dt>
                <dd className="text-lead measure mt-2.5 text-navy/70">{point.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
