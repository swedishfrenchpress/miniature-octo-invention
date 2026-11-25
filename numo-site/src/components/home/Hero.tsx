"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DOWNLOAD_URL = "https://github.com/cashubtc/Numo/releases";

/** Two clips, played back to back and crossfaded. */
const HERO_VIDEOS = ["/1.mp4", "/2.mp4"];

/** Ink, not black, so the footage keeps the site's colour. Heaviest at the bottom
 *  where the type sits, with a second band at the top to carry the nav. */
const SCRIM =
  "bg-[linear-gradient(to_top,rgb(6_24_43/0.88)_0%,rgb(6_24_43/0.5)_38%,rgb(6_24_43/0.22)_68%,rgb(6_24_43/0.55)_100%)]";

/** Everything the till accepts, and what it plugs into: Bitcoin first, then what a
 *  connected Stripe account adds, then the two integrations. Each mark is drawn
 *  from its own SVG as a white silhouette (CSS mask), so the band is one colour.
 *  `w`/`h` are tuned per mark so they read at the same optical size — the source
 *  files all share a 24px box but fill very different amounts of it. */
const ACCEPTS = [
  { name: "Bitcoin", src: "/logos/bitcoin.svg", w: 26, h: 26 },
  { name: "Visa", src: "/logos/visa.svg", w: 58, h: 58 },
  { name: "Mastercard", src: "/logos/mastercard.svg", w: 40, h: 40 },
  { name: "Apple Pay", src: "/logos/applepay.svg", w: 56, h: 56 },
  { name: "Google Pay", src: "/logos/googlepay.svg", w: 58, h: 58 },
  { name: "Stripe", src: "/logos/stripe.svg", w: 62, h: 26 },
  { name: "BTCPay Server", src: "/btcpay-logo.svg", w: 100, h: 30 },
];

function AcceptsRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex h-8 shrink-0 items-center">
      {ACCEPTS.map((logo) => (
        <li key={logo.name} className="mx-7 flex items-center md:mx-10">
          <span
            role="img"
            aria-label={logo.name}
            className="block bg-white/85"
            style={{
              width: logo.w,
              height: logo.h,
              mask: `url(${logo.src}) center / contain no-repeat`,
              WebkitMask: `url(${logo.src}) center / contain no-repeat`,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

/** A slow rolling band along the foot of the hero. Four copies of the row: one is
 *  read, the rest keep the band full on wide screens and make the loop seamless
 *  (the track slides by exactly one copy). With reduced motion it stands still. */
function AcceptsMarquee() {
  return (
    <div className="relative border-t border-white/15">
      <div
        className="marquee-mask mx-auto max-w-[1200px] overflow-hidden px-6"
        aria-label="Numo accepts"
        role="group"
      >
        <div className="marquee-track flex w-max py-5">
          <AcceptsRow />
          <AcceptsRow hidden />
          <AcceptsRow hidden />
          <AcceptsRow hidden />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  const onEnded = useCallback(() => {
    setCurrent((i) => (i + 1) % HERO_VIDEOS.length);
  }, []);

  // Keep the current clip playing from its start. With reduced motion the footage
  // stays on its poster frame.
  useEffect(() => {
    const video = videos.current[current];
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay can be refused; the poster stands in.
    });
  }, [current, reducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex h-[92svh] max-h-[920px] min-h-[620px] flex-col justify-end overflow-hidden bg-ink-deep"
    >
      {/* The ink ground is what shows if even the poster is still in flight, so the
          white type never lands on white. */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_VIDEOS.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              videos.current[index] = el;
            }}
            src={src}
            // Frame 0 of the first clip, so a slow connection shows the opening shot.
            poster="/hero-poster.jpg"
            muted
            playsInline
            onEnded={onEnded}
            preload={index === 0 ? "auto" : "metadata"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className={`absolute inset-0 ${SCRIM}`} />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-12 md:pb-16">
        <h1 className="text-display max-w-[15ch] text-white">
          Bitcoin payments as easy as Apple Pay.
        </h1>
        <p className="text-lead mt-6 max-w-[33rem] text-white/80">
          Accept Bitcoin with a tap on any NFC-enabled Android. No extra hardware, no
          platform fees.
        </p>
        <div className="mt-9 flex flex-wrap gap-2.5">
          <Button href={DOWNLOAD_URL} variant="inverse" external>
            Download
          </Button>
          <Button href="/setup" variant="ghost-inverse">
            Setup in minutes
          </Button>
        </div>
      </div>

      <AcceptsMarquee />
    </section>
  );
}
