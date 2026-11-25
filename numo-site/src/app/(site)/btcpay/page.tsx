import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
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
    body: "Ring up a sale in Numo and the invoice is generated in your BTCPay Server store.",
  },
  {
    title: "Lightning or Cashu",
    body: "Customers pay the way they already do. Either way, the sale is recorded against your store.",
  },
  {
    title: "Inventory in sync",
    body: "Your point-of-sale inventory stays in step with BTCPay Server automatically.",
  },
];

export default function BTCPayPage() {
  return (
    <>
      <header className="pt-[60px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span aria-hidden="true" className="text-sm text-navy/40">
              ×
            </span>
            <Image src="/btcpay-logo.svg" alt="BTCPay Server" width={100} height={28} />
          </div>
          <h1 className="text-display mt-8 max-w-[16ch] text-navy">
            The till for your BTCPay Server store.
          </h1>
          <p className="text-lead mt-6 max-w-[36rem] text-navy/70">
            Numo connects directly to your BTCPay Server store. It generates invoices,
            accepts Lightning or Cashu, and keeps your point-of-sale inventory in sync
            automatically.
          </p>
          <div className="mt-9 flex flex-wrap gap-2.5">
            <Button href="https://github.com/cashubtc/Numo/releases" variant="primary" external>
              Download
            </Button>
            <Button href="/setup" variant="secondary">
              Setup guide
            </Button>
          </div>
        </div>
      </header>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <BTCPayDemo />

          <div className="mt-16 grid overflow-hidden rounded-card border border-line bg-surface md:mt-20 md:grid-cols-3">
            {POINTS.map((point, i) => (
              <div
                key={point.title}
                className={`p-7 md:p-9 ${
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
