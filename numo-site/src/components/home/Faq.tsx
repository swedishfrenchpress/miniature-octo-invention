"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "@/components/DownloadMenu";

const linkClass =
  "font-medium text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy";

const FAQ_DATA: { id: string; q: string; a: ReactNode }[] = [
  {
    id: "what",
    q: "What is Numo?",
    a: "A Bitcoin point-of-sale app for Android. Take Bitcoin with an NFC tap or Lightning QR code, and optionally connect Stripe to take cards on the same device.",
  },
  {
    id: "customer-app",
    q: "Do my customers need a special app?",
    a: "No. Any Bitcoin Lightning wallet works by QR scan. Cashu wallets pay with an NFC tap, and cards work if you connect Stripe.",
  },
  {
    id: "hardware",
    q: "Do I need any extra hardware?",
    a: "No. Any Android phone with NFC works. Handheld Android terminals work too.",
  },
  {
    id: "price",
    q: "Is it really free?",
    a: "Yes. Numo charges 0% on Bitcoin sales, with only tiny network fees (usually under a cent). Card payments through your Stripe account follow Stripe's standard fees.",
  },
  {
    id: "custody",
    q: "Is Numo custodial?",
    a: (
      <>
        Yes. Bitcoin sales are Cashu ecash backed by the mint you choose during{" "}
        <Link href="/setup" className={linkClass}>
          setup
        </Link>
        . That mint holds the backing bitcoin, not Numo. Withdraw to your own Lightning
        address any time, or turn on auto-withdraw.
      </>
    ),
  },
  {
    id: "offline",
    q: "What if I have bad internet?",
    a: "Taking a new payment requires internet so the mint can verify it. If your connection drops, Numo shows an offline banner and waits until you reconnect.",
  },
  {
    id: "get-started",
    q: "How do I get started?",
    a: (
      <>
        Install Numo from{" "}
        <a
          href={DOWNLOAD_APK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          GitHub releases
        </a>{" "}
        or{" "}
        <a
          href={ZAPSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Zapstore
        </a>
        , then follow the{" "}
        <Link href="/setup" className={linkClass}>
          setup guide
        </Link>
        . Four screens and your till is open.
      </>
    ),
  },
  {
    id: "play-store",
    q: "Can I download Numo on the Google Play Store?",
    a: "Not yet, it's coming soon. Until then, install from GitHub releases or Zapstore.",
  },
];

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="section-anchor bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-[1fr_1.7fr] md:gap-16">
        <h2 className="text-h2 text-navy">Frequently asked questions</h2>

        <div className="border-t border-line">
          {FAQ_DATA.map((faq) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-${faq.id}`}
                    onClick={() => setOpenId(open ? null : faq.id)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-lead font-medium text-navy">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        open
                          ? "border-navy bg-navy text-mint"
                          : "border-line-strong bg-surface text-navy/70 group-hover:border-navy group-hover:bg-navy group-hover:text-white"
                      }`}
                    >
                      <span className="relative block h-3.5 w-3.5">
                        <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current" />
                        <span
                          className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-smooth)] ${
                            open ? "rotate-90" : ""
                          }`}
                        />
                      </span>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${faq.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-smooth)] ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden" inert={!open}>
                    <p className="max-w-[36rem] pb-6 text-navy/70 [text-wrap:pretty]">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
