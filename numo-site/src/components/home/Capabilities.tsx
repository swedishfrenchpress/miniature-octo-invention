"use client";

import { useEffect, useRef, useState } from "react";

/** Below-the-fold demo footage. Holds its poster frame until the block is near the
 *  viewport, then loads and plays — the hero should own the first megabyte. The
 *  poster is painted onto the frame itself, so footage that never arrives reads as
 *  a still screenshot rather than a hole.
 *
 *  PLACEHOLDER FOOTAGE: both clips show an older build of the app and are due to
 *  be replaced with captures of the current UI. */
function DemoVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] overflow-hidden rounded-frame border border-line bg-sunken bg-cover bg-center"
      style={{ backgroundImage: `url(${poster})` }}
    >
      {shouldLoad && (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

/** A short spec list: what, then how. Hairlines only. */
function SpecList({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-8 border-t border-line">
      {items.map(([term, detail]) => (
        <div
          key={term}
          className="grid gap-x-6 gap-y-0.5 border-b border-line py-3.5 sm:grid-cols-[10.5rem_1fr]"
        >
          <dt className="font-semibold text-navy">{term}</dt>
          <dd className="text-navy/70">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Capabilities() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Every way to pay — media leads, copy explains */}
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <DemoVideo src="/ln-checkout.mp4" poster="/ln-checkout-poster.jpg" />

          <div>
            <h2 className="text-h2 text-navy">Bitcoin and cards, one till.</h2>
            <p className="text-lead mt-5 max-w-[34rem] text-navy/70">
              Take Bitcoin over ecash and Lightning. Connect a Stripe account and the
              same till takes cards and Apple Pay too, with the same tap.
            </p>
            <SpecList
              items={[
                ["Ecash", "Tap to pay from any compatible Cashu wallet"],
                ["Lightning", "Scan to pay from any Bitcoin Lightning wallet"],
                ["Cards and Apple Pay", "Tap to pay, through your own Stripe account"],
              ]}
            />
          </div>
        </div>

        {/* Running the shop — copy rail, footage running wider */}
        <div className="mt-24 grid items-center gap-10 md:mt-32 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <h2 className="text-h2 text-navy">Inventory, tax and reports, built in.</h2>
            <p className="text-lead mt-5 max-w-[34rem] text-navy/70">
              Build a catalog with categories and sizes, then tap once to charge a preset
              price. Numo keeps track of what you sold and what you have left.
            </p>
            <SpecList
              items={[
                ["Inventory", "Items, sizes and stock in one catalog"],
                ["Taxes", "Applied at the till, item by item"],
                ["Sales reports", "What sold, and when"],
                ["CSV exports", "Ready for your accounting"],
              ]}
            />
          </div>

          <DemoVideo src="/cart.mp4" poster="/cart-poster.jpg" />
        </div>
      </div>
    </section>
  );
}
