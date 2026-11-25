"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

const linkClass =
  "text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy";

const FAQ_DATA: { id: string; q: string; a: ReactNode }[] = [
  {
    id: "what",
    q: "What is Numo?",
    a: "Numo is a Bitcoin point-of-sale app that lets you accept Bitcoin payments with a simple tap. Your customers use NFC to pay, just like Apple Pay or Google Pay, but it's all Bitcoin.",
  },
  {
    id: "customer-app",
    q: "Do my customers need a special app?",
    a: "They just need a Bitcoin Lightning wallet and Numo will work. If they want to take advantage of the tap-to-pay UX, they'll need a compatible Cashu wallet.",
  },
  {
    id: "hardware",
    q: "Do I need any extra hardware?",
    a: "No. All you need is an Android phone that supports NFC.",
  },
  {
    id: "price",
    q: "Is it really free?",
    a: "Yes. Numo is free to download and free to use. The Bitcoin network has minimal fees (usually less than a cent), but we don't charge anything.",
  },
  {
    id: "custody",
    q: "Is Numo custodial?",
    a: (
      <>
        Yes. Your sales are Cashu ecash — bearer tokens held on your phone, and the bitcoin
        behind them sits with the mint you pick during{" "}
        <Link href="/setup" className={linkClass}>
          setup
        </Link>
        . That mint is the custodian, so choose one you trust; Numo itself holds nothing and
        cannot move your funds. Withdraw to your own Lightning address any time, or set a
        balance threshold and let auto-withdraw send sales out for you.
      </>
    ),
  },
  {
    id: "offline",
    q: "What if I have bad internet?",
    a: "Numo needs a connection to take a payment, because the mint has to redeem the ecash. If you drop offline the app tells you, and new charges wait until you're back online.",
  },
  {
    id: "get-started",
    q: "How do I get started?",
    a: (
      <>
        Install the app on an NFC Android phone from{" "}
        <a
          href="https://github.com/cashubtc/Numo/releases"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          GitHub releases
        </a>{" "}
        or Zapstore, then follow the{" "}
        <Link href="/setup" className={linkClass}>
          setup guide
        </Link>
        . Four screens and you&apos;re taking payments.
      </>
    ),
  },
  {
    id: "play-store",
    q: "Can I download Numo on the Google Play Store?",
    a: "Numo will be available on the Google Play Store soon. We will update this website once it's available on the Google Play Store.",
  },
];

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="section-anchor border-t border-line py-24 md:py-32">
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
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-lead font-medium text-navy">{faq.q}</span>
                    <span aria-hidden="true" className="relative block h-3.5 w-3.5 shrink-0 text-navy/60">
                      <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          open ? "rotate-90" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${faq.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden" inert={!open}>
                    <p className="max-w-[40rem] pb-6 text-navy/70 [text-wrap:pretty]">{faq.a}</p>
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
