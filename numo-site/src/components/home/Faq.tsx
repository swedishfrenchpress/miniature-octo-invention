import { FAQ_ITEMS, type FaqItem } from "@/data/faq";

export type { FaqItem };

export function Faq({ items = FAQ_ITEMS }: { items?: FaqItem[] }) {
  // No questions: no section. The layout hides the nav's FAQ link to match.
  if (items.length === 0) return null;

  return (
    <section id="faq" className="section-anchor section-y bg-paper">
      <div className="shell grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
        <h2 className="text-h2 text-navy">Frequently asked questions</h2>

        <div className="border-t border-line">
          {items.map((faq) => (
            <details key={faq.id} name="faq" className="group border-b border-line">
              <summary className="group/summary flex w-full cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-lead font-medium text-navy">{faq.q}</h3>
                <span
                  aria-hidden="true"
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-navy/70 transition-colors duration-200 group-hover/summary:border-navy group-hover/summary:text-navy group-open:border-navy group-open:bg-navy group-open:text-mint"
                >
                  <span className="relative block h-3.5 w-3.5">
                    <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-smooth)] group-open:rotate-90" />
                  </span>
                </span>
              </summary>
              <p className="max-w-[36rem] pb-6 text-navy/70 [text-wrap:pretty]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
