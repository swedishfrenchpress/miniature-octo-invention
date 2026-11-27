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
    <div className="hero-fade relative">
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
  const section = useRef<HTMLElement>(null);
  // Starts true: the hero is the top of the page, so it should not wait a tick to play.
  const [inView, setInView] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  const onEnded = useCallback(() => {
    setCurrent((i) => (i + 1) % HERO_VIDEOS.length);
  }, []);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A video starts from its first frame when its turn comes.
  useEffect(() => {
    const video = videos.current[current];
    if (video) video.currentTime = 0;
  }, [current]);

  // It plays only while the hero is on screen. Scrolled away, it holds its
  // frame instead of decoding video nobody is watching, and picks up where it
  // stopped when the hero comes back.
  useEffect(() => {
    const video = videos.current[current];
    if (!video) return;
    if (reducedMotion || !inView) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      // Autoplay can be refused; the poster frame stands in.
    });
  }, [current, reducedMotion, inView]);

  return (
    <section
      ref={section}
      id="hero"
      className="relative flex min-h-[640px] flex-col justify-end bg-ink-deep pt-28 md:h-svh md:max-h-[1000px]"
    >
      {/* Clipped media backdrop kept separate so the DownloadMenu popover never clips.
          When a clip ends, the next one fades in on top of it while the finished
          clip stays solid underneath, and is dropped only once it is covered. Two
          clips fading through each other would let the dark ground show between
          them, a dip toward black at every swap. */}
      <div className="absolute inset-0 isolate overflow-hidden" aria-hidden="true">
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity ${
              index === current
                ? "z-10 opacity-100 duration-1000"
                : "opacity-0 delay-1000 duration-0"
            }`}
          />
        ))}
        <div className={`absolute inset-0 z-20 ${SCRIM}`} />
      </div>

      {/* From md the hero is the window's height, and text-hero sizes the
          headline to it; the nav clearance above is the section's own pt-28. */}
      <div className="shell relative z-10 pb-12 pt-10 md:pb-14 md:pt-0">
        <h1 className="hero-rise text-hero text-white">
          Bitcoin payments as easy as Apple Pay.
        </h1>
        <p className="hero-rise text-lead mt-5 max-w-[30rem] text-white/85 [--i:1] md:mt-6">
          Tap to take Bitcoin on any Android with&nbsp;NFC.{" "}
          <span className="whitespace-nowrap">Zero platform fees.</span>
        </p>
        <div className="hero-rise mt-8 flex flex-wrap items-center gap-3 [--i:2] md:mt-10">
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
