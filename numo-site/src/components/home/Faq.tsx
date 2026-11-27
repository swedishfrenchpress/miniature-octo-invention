"use client";

import { useState } from "react";
import { FAQ_ITEMS, type FaqItem } from "@/data/faq";

export type { FaqItem };

export function Faq({ items = FAQ_ITEMS }: { items?: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // No questions: no section. The layout hides the nav's FAQ link to match.
  if (items.length === 0) return null;

  return (
    <section id="faq" className="section-anchor section-y bg-paper">
      <div className="shell grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
        <h2 className="text-h2 text-navy">Frequently asked questions</h2>

        <div className="border-t border-line">
          {items.map((faq) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-${faq.id}`}
                    onClick={() => setOpenId(open ? null : faq.id)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-lead font-medium text-navy">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        open
                          ? "border-navy bg-navy text-mint"
                          : "border-line-strong bg-surface text-navy/70 group-hover:border-navy group-hover:text-navy"
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
