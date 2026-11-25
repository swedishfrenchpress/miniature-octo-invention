"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { DownloadMenu } from "@/components/DownloadMenu";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Two counter clips, played back to back and crossfaded. */
const HERO_VIDEOS = ["/1.mp4", "/2.mp4"];

/** Ink-tinted scrim so counter footage keeps Numo's palette and both the top nav
 *  and bottom display headline stay cleanly legible over moving video. */
const SCRIM =
  "bg-[linear-gradient(to_top,rgb(6_24_43/0.92)_0%,rgb(6_24_43/0.58)_42%,rgb(6_24_43/0.26)_70%,rgb(6_24_43/0.62)_100%)]";

/** Monochrome payment & integration marks scrolling smoothly along the hero foot. */
const ACCEPTS = [
  { name: "Bitcoin", src: "/logos/bitcoin.svg", w: 30, h: 30 },
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

/** Slow rolling monochrome band along the foot of the hero. Four copies keep
 *  wide viewports full and loop seamlessly; static under reduced motion. */
function AcceptsMarquee() {
  return (
    <div className="relative border-t border-white/15">
      <div
        className="marquee-mask shell overflow-hidden"
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

  useEffect(() => {
    const video = videos.current[current];
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay can be refused; the poster frame stands in.
    });
  }, [current, reducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[640px] flex-col justify-end bg-ink-deep pt-28 md:h-[90svh] md:max-h-[900px]"
    >
      {/* Clipped media backdrop kept separate so the DownloadMenu popover never clips */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {HERO_VIDEOS.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              videos.current[index] = el;
            }}
            src={src}
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

      <div className="shell relative z-10 pb-12 pt-16 md:pb-20">
        <h1 className="text-display max-w-[48rem] text-white">
          Bitcoin payments as easy as Apple Pay.
        </h1>
        <p className="text-lead mt-5 md:mt-6 max-w-[30rem] text-white/85">
          Tap to take Bitcoin on any Android with NFC. Zero platform fees.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
          <DownloadMenu variant="mint" size="lg" align="left" direction="up" />
          <Button href="/setup" variant="ghost-inverse" size="lg">
            Setup guide
          </Button>
        </div>
      </div>

      <AcceptsMarquee />
    </section>
  );
}
