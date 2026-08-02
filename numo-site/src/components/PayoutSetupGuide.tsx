"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Open Withdrawals",
    body: <>From the till, tap the <strong>gear in the top-right corner</strong>. Under Payments, tap <strong>Withdrawals</strong>.</>,
    screens: [
      { src: "/setup/05-settings.png", alt: "Numo Settings screen with Withdrawals under Payments", caption: "Tap Withdrawals under Payments", hotspot: { x: 25, y: 73 } },
      { src: "/setup/06-auto-withdraw.png", alt: "Numo Withdraw screen with Auto-Withdraw switched off", caption: "You land on the Withdraw screen", hotspot: { x: 89, y: 39 } },
    ],
  },
  {
    title: "Switch on Auto-Withdraw",
    body: <>Turn on the <strong>Auto-Withdraw</strong> switch. The destination and trigger settings will appear below it.</>,
    screens: [{ src: "/setup/07-payout-details.png", alt: "Numo Auto-Withdraw screen in its active state", caption: "The green switch means Auto-Withdraw is on", hotspot: { x: 89, y: 39 } }],
  },
  {
    title: "Enter your destination",
    body: <>Tap the <strong>Lightning Address</strong> field and enter the address supplied by your Lightning wallet. Wait for the green <strong>Valid Lightning address</strong> message.</>,
    screens: [{ src: "/setup/07-payout-details.png", alt: "Lightning Address field on the Numo Auto-Withdraw screen", caption: "Enter your address in the Destination section", hotspot: { x: 50, y: 60.5 } }],
  },
  {
    title: "Choose a threshold",
    body: <>Tap the value beside <strong>Balance Threshold</strong> and choose the balance that triggers a payout. Numo checks your address and adjusts the minimum when needed.</>,
    screens: [{ src: "/setup/07-payout-details.png", alt: "Balance Threshold setting on the Numo Auto-Withdraw screen", caption: "The default trigger is 50,000 sat", hotspot: { x: 77, y: 81 } }],
  },
  {
    title: "Choose how much to send",
    body: <>Set the <strong>Withdraw Amount</strong> percentage. Leaving a small balance behind gives fees room to move.</>,
    screens: [{ src: "/setup/07-payout-details.png", alt: "Withdraw Amount percentage on the Numo Auto-Withdraw screen", caption: "The default payout is 95%", hotspot: { x: 81, y: 91 } }],
  },
  {
    title: "Check the green status",
    body: <>Scroll back to the top and confirm the status says <strong>Active</strong>. There is no Save button—Numo stores these settings as you change them.</>,
    screens: [{ src: "/setup/07-payout-details.png", alt: "Active status on the Numo Auto-Withdraw screen", caption: "Active confirms automatic payouts are enabled", hotspot: { x: 20, y: 18.5 } }],
  },
];

export function PayoutSetupGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.step);
        setActiveStep(index);
        setCarouselIndex(0);
      },
      { rootMargin: "-30% 0px -45%", threshold: [0, 0.25, 0.5, 0.75] },
    );

    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const screenCount = steps[activeStep].screens.length;
    if (screenCount < 2) return;
    const timer = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % screenCount);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [activeStep]);

  const activeScreens = steps[activeStep].screens;
  const activeScreen = activeScreens[carouselIndex] ?? activeScreens[0];

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_.8fr] lg:gap-20">
      <ol>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          return (
            <li
              key={step.title}
              ref={(node) => { stepRefs.current[index] = node; }}
              data-step={index}
              className="flex min-h-[58vh] items-center border-t border-white/10 py-16 first:border-t-0 lg:min-h-[68vh]"
            >
              <div className={`flex gap-5 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-35"}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xl transition-colors duration-300 ${isActive ? "bg-mint text-navy" : "border border-white/25 text-white"}`}>{index + 1}</span>
                <div>
                  <h3 className="font-display text-3xl text-white md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-white/60">{step.body}</p>
                  <p className={`mt-5 text-xs font-semibold uppercase tracking-[.18em] text-mint transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}>Shown on the right</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="order-first lg:order-none">
        <div className="sticky top-24 flex min-h-[62vh] items-center justify-center lg:top-28 lg:min-h-[calc(100vh-8rem)]">
          <figure className="w-full max-w-[350px]" aria-live="polite">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-black p-2 shadow-[0_32px_80px_rgba(0,0,0,.35)] ring-1 ring-white/15">
              <div className="overflow-hidden rounded-[1.75rem]">
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {activeScreens.map((screen) => (
                    <div key={`${activeStep}-${screen.src}`} className="relative w-full shrink-0">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={1080}
                        height={2340}
                        priority
                        className="h-auto w-full"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-red-500 bg-red-500/10 shadow-[0_0_0_3px_rgba(255,255,255,.9),0_4px_16px_rgba(0,0,0,.35)]"
                        style={{ left: `${screen.hotspot.x}%`, top: `${screen.hotspot.y}%` }}
                      >
                        <span className="absolute inset-0 animate-ping rounded-full border-2 border-red-500 opacity-60" />
                        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="absolute left-5 top-5 rounded-full bg-navy/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur">Step {activeStep + 1}</span>
            </div>
            <div className="mt-4 flex min-h-8 items-center justify-center gap-3 text-center">
              <figcaption className="text-xs text-white/55">{activeScreen.caption}</figcaption>
              {activeScreens.length > 1 && (
                <div className="flex gap-1.5" aria-label={`Image ${carouselIndex + 1} of ${activeScreens.length}`}>
                  {activeScreens.map((screen, index) => (
                    <button
                      key={screen.src}
                      type="button"
                      onClick={() => setCarouselIndex(index)}
                      aria-label={`Show image ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${index === carouselIndex ? "w-5 bg-mint" : "w-1.5 bg-white/30"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}
