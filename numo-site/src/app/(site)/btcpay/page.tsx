import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { DownloadMenu } from "@/components/DownloadMenu";
import { LogoMark } from "@/components/Logo";
import { BTCPayDemo } from "@/components/btcpay/BTCPayDemo";

export const metadata: Metadata = {
  title: "Numo for BTCPay Server",
  description:
    "Numo connects directly to your BTCPay Server store: it generates invoices, accepts Lightning or Cashu, and keeps your point-of-sale inventory in sync.",
};

const POINTS = [
  {
    title: "Invoices from the till",
    body: "Every sale creates an invoice in your BTCPay store.",
  },
  {
    title: "Lightning or Cashu",
    body: "Customers pay how they prefer. Both record to your store.",
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
        <div className="shell header-y">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span aria-hidden="true" className="text-sm font-medium text-navy/60">
              ×
            </span>
            <Image
              src="/btcpay-logo.svg"
              alt="BTCPay Server"
              width={86}
              height={40}
              className="h-7 w-auto"
            />
          </div>
          <h1 className="text-display mt-8 max-w-[16ch] text-navy">
            The till for your BTCPay Server store.
          </h1>
          <p className="text-lead mt-5 md:mt-6 max-w-[32rem] text-navy/70">
            Connect Numo to ring up in-person sales directly into BTCPay.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <DownloadMenu variant="primary" size="md" align="left" />
            <Button href="/setup#btcpay" variant="secondary" size="md">
              Setup guide
            </Button>
          </div>
        </div>
      </header>

      <section className="section-y border-t border-line bg-sunken">
        <div className="shell">
          <BTCPayDemo />

          <div className="mt-block grid overflow-hidden rounded-card border border-line bg-surface md:grid-cols-3">
            {POINTS.map((point, i) => (
              <div
                key={point.title}
                className={`p-8 md:p-10 ${
                  i < POINTS.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""
                }`}
              >
                <h2 className="text-h3 text-navy">{point.title}</h2>
                <p className="mt-2.5 text-navy/70 [text-wrap:pretty]">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
