"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { BentoCard } from "@/components/BentoCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { Navigation } from "@/components/Navigation";
import WorksOfflineAnimation from "@/components/WorksOfflineAnimation";

/** The NFC mark. Used at three scales: the tap card, the wallets heading, and the
 *  badge that marks a wallet as tap-capable. */
function NfcGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14.4636 23.222" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14.1019 11.6159C14.1019 7.48502 12.8129 3.63737 10.5179 0.453773C9.81482-0.532555 8.37928 0.32682 9.141 1.35221C11.2797 4.29166 12.4222 7.83659 12.4222 11.6159C12.4222 15.3952 11.2699 18.9303 9.141 21.8698C8.39881 22.8854 9.78553 23.7936 10.5179 22.778C12.8129 19.5846 14.1019 15.737 14.1019 11.6159Z" fill="currentColor" fillOpacity="0.85"/>
      <path d="M8.77967 11.6159C8.77967 8.54948 7.81287 5.66862 6.07459 3.33463C5.29334 2.28971 3.93592 3.29557 4.66834 4.2526C6.26014 6.34245 7.10975 8.89127 7.10975 11.6159C7.10975 14.3405 6.26014 16.8893 4.66834 18.9792C3.93592 19.9362 5.29334 20.9421 6.07459 19.8874C7.81287 17.5534 8.77967 14.6823 8.77967 11.6159Z" fill="currentColor" fillOpacity="0.85"/>
      <path d="M3.47693 11.6159C3.47693 9.60416 2.78357 7.72916 1.55311 6.26432C0.742558 5.30729-0.439082 6.39127 0.166386 7.17252C1.34803 8.6569 1.79725 9.89713 1.79725 11.6159C1.79725 13.3346 1.34803 14.5749 0.166386 16.0592C-0.429317 16.8307 0.752324 17.9049 1.55311 16.9577C2.78357 15.5026 3.47693 13.6276 3.47693 11.6159Z" fill="currentColor" fillOpacity="0.85"/>
    </svg>
  );
}

// Notification data pool - cycles through these
// Auto-withdraw sends to the merchant's own Lightning address, so the address is
// constant across notifications and only the amount moves — the earlier pool
// showed six different people's handles at real providers, which was both
// inaccurate to the feature and invented data on companies' real domains.
const PAYOUT_ADDRESS = "shop@wallet.com";
const notificationPool = [
  { amount: "$20.00", address: PAYOUT_ADDRESS },
  { amount: "$35.00", address: PAYOUT_ADDRESS },
  { amount: "$50.00", address: PAYOUT_ADDRESS },
  { amount: "$100.00", address: PAYOUT_ADDRESS },
  { amount: "$75.00", address: PAYOUT_ADDRESS },
  { amount: "$45.00", address: PAYOUT_ADDRESS },
];

interface StackNotification {
  id: number;
  amount: string;
  address: string;
  position: number; // 0 = front/bottom, 1 = middle, 2 = back/top, 3 = exiting, -1 = entering
}

// Stack position configs - hoisted outside component for performance
// Position: -1 = entering, 0 = front, 1 = middle, 2 = back, 3 = exiting
const STACK_CONFIGS: Record<number, { y: string; scale: number; opacity: number; zIndex: number }> = {
  [-1]: { y: 'calc(-50% + 60px)', scale: 1, opacity: 0, zIndex: 4 },      // Entering from below
  0: { y: '-50%', scale: 1, opacity: 1, zIndex: 3 },                       // Front (most visible)
  1: { y: 'calc(-50% - 12px)', scale: 0.96, opacity: 0.85, zIndex: 2 },   // Middle
  2: { y: 'calc(-50% - 24px)', scale: 0.92, opacity: 0.7, zIndex: 1 },    // Back
  3: { y: 'calc(-50% - 50px)', scale: 0.88, opacity: 0, zIndex: 0 },      // Exiting upward
};

// Animated Self Custody Bento Component with continuous iOS-style stacked notifications
function AutoCustodyBento() {
  const [notifications, setNotifications] = useState<StackNotification[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);
  const dataIndexRef = useRef(0);

  // Intersection observer to start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize stack with 3 notifications when coming into view
  useEffect(() => {
    if (!isInView) {
      setIsInitialized(false);
      setNotifications([]);
      return;
    }

    // Reset counters
    idCounterRef.current = 0;
    dataIndexRef.current = 0;

    // Create initial stack of 3
    const initialStack: StackNotification[] = [];
    for (let i = 0; i < 3; i++) {
      const data = notificationPool[dataIndexRef.current % notificationPool.length];
      initialStack.push({
        id: idCounterRef.current++,
        ...data,
        position: 2 - i, // 2, 1, 0 (back to front)
      });
      dataIndexRef.current++;
    }
    setNotifications(initialStack);
    setIsInitialized(true);
  }, [isInView]);

  // Continuous cycling animation
  useEffect(() => {
    if (!isInView || !isInitialized) return;

    const cycleInterval = setInterval(() => {
      setNotifications(prev => {
        // Skip if not initialized yet
        if (prev.length === 0) return prev;
        
        // Move all existing notifications up one position
        const updated = prev.map(n => ({
          ...n,
          position: n.position + 1,
        }));

        // Add a new notification entering from the bottom
        const newData = notificationPool[dataIndexRef.current % notificationPool.length];
        dataIndexRef.current++;
        
        updated.push({
          id: idCounterRef.current++,
          ...newData,
          position: -1, // Entering position
        });

        // After a brief moment, move the entering notification to position 0
        setTimeout(() => {
          setNotifications(current => 
            current.map(n => n.position === -1 ? { ...n, position: 0 } : n)
          );
        }, 50);

        // Remove notifications that have exited (position > 3)
        return updated.filter(n => n.position <= 3);
      });
    }, 2500); // New notification every 2.5 seconds

    return () => clearInterval(cycleInterval);
  }, [isInView, isInitialized]);

  // Get styles based on position in stack - uses hoisted config
  const getStackStyles = useCallback((position: number) => {
    const config = STACK_CONFIGS[position] || STACK_CONFIGS[3];
    return {
      transform: `translateY(${config.y}) scale(${config.scale})`,
      opacity: config.opacity,
      zIndex: config.zIndex,
    };
  }, []);

  return (
    <BentoCard
      ref={containerRef}
      variant="mint-pale"
      size="sm"
      className="flex-1 min-h-[320px] flex flex-col overflow-hidden"
    >
      <SectionHeading as="h2" size="sm" className="mb-3">
        Automatic payouts
      </SectionHeading>
      <p className="text-lg text-navy/75 mb-2">
        Set a threshold amount. Once your ecash balance reaches it, funds automatically transfer to your own Lightning address.
      </p>
      
      {/* iOS-style stacked notifications container */}
      <div className="flex-1 flex items-center justify-center" aria-hidden="true">
        <div className="relative w-full max-w-[380px] h-[140px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="absolute top-1/2 left-0 right-0 flex rounded-2xl shadow-lg ring-1 ring-black/5 items-center p-5 gap-4 pointer-events-none select-none bg-white/95 backdrop-blur-sm"
              style={{
                ...getStackStyles(notification.position),
                transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="w-14 h-14 rounded-xl bg-mint flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-navy">{notification.amount} Threshold Reached</p>
                <p className="text-sm text-navy/65 truncate">Sent to {notification.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

// Hero video sources - hoisted outside component to avoid recreation
const HERO_VIDEOS = ["/1.mp4", "/2.mp4"];

// Hero Section
function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRefs = [videoRef0, videoRef1];

  const handleVideoEnd = useCallback(() => {
    // Use functional setState to avoid stale closure
    setCurrentVideo(curr => (curr + 1) % HERO_VIDEOS.length);
  }, []);

  // Ensure the current video is always playing
  useEffect(() => {
    const currentVideoRef = videoRefs[currentVideo].current;
    if (currentVideoRef) {
      currentVideoRef.currentTime = 0;
      currentVideoRef.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }, [currentVideo, videoRefs]);

  return (
    <section id="hero" className="section-anchor bg-white pt-36 md:pt-40 pb-24 relative overflow-hidden">
      {/* Video Background - Full Width. The ink ground under it is what a viewer
          sees if even the poster is still in flight, so the white hero type never
          lands on white. */}
      <div className="absolute inset-0 top-0 bottom-0 overflow-hidden z-0 bg-navy">
        {/* Video container - Full width */}
        <div className="relative w-full h-full">
          {HERO_VIDEOS.map((video, index) => (
            <video
              key={video}
              ref={videoRefs[index]}
              src={video}
              // The poster is frame 0 of the video itself, so a slow or blocked
              // connection shows the opening shot rather than an empty box.
              poster="/hero-poster.jpg"
              autoPlay
              muted
              loop={false}
              playsInline
              onEnded={handleVideoEnd}
              preload={index === 0 ? "auto" : "metadata"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentVideo ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>
        
        {/* Dark overlay - adds subtle darkness to improve text readability */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        
        {/* Gradient overlay - bottom fade only, above video but below content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-20 pointer-events-none" />
      </div>

      {/* Content - above everything */}
      <div className="max-w-5xl mx-auto px-6 text-center relative z-30">
        {/* Main Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-6 max-w-5xl mx-auto drop-shadow-lg [text-wrap:balance]">
          BITCOIN PAYMENTS AS EASY AS APPLE PAY. <br />TAP. DONE.
        </h1>

        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10">
          Accept Bitcoin with a tap on any NFC-enabled Android.
        </p>

        {/* The guide leads, not the raw APK link — a merchant meeting this product
            for the first time needs the five-minute path before the download. The
            nav bar keeps the direct download one click away throughout. */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 px-4 sm:px-0">
          <Button href="/setup" variant="dark">
            Setup in minutes
          </Button>
          <Button
            href="https://github.com/cashubtc/Numo/releases"
            variant="light"
            external
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Download APK
          </Button>
        </div>
      </div>
    </section>
  );
}

// Bento Box Feature Section - Abode-style layout
function BentoFeatures() {
  return (
    <section id="features" className="section-anchor bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bento Grid - Abode style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Row 1 - The claim no Lightning-only product can copy, at double width
              and the only lg heading on the page. Everything below it is support. */}
          <BentoCard variant="cream" className="md:col-span-2 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <div className="md:w-[38%] md:shrink-0">
              <SectionHeading as="h2" size="lg" className="mb-4">
                Tap to pay
              </SectionHeading>
              <p className="text-lg text-navy/75 leading-relaxed">
                Your customer holds their phone to yours and the sale is done. Numo pays in
                Cashu ecash — bearer tokens that move device to device — which is why this is
                a real tap and not a QR code to scan.
              </p>
            </div>

            {/* Customer's phone held over the terminal, waves in the gap, the sale
                confirming. Terminal proportions — squat body, screen up top, physical
                keypad below, reader slot on the edge — which is what makes it read as
                a POS device rather than a handset. */}
            <div className="relative flex min-h-[480px] flex-1 items-center justify-center overflow-hidden py-6" aria-hidden="true">
              <div className="relative flex scale-[0.82] flex-col items-center sm:scale-90 lg:scale-100">
                {/* Customer phone, landscape, held up to the terminal */}
                <div
                  className="relative z-20 mb-8"
                  style={{ animation: "phone-hover 5s ease-in-out infinite" }}
                >
                  <div className="relative h-[86px] w-40 rounded-[1.15rem] bg-navy p-[5px] shadow-[0_25px_50px_-12px_rgb(0_0_0/0.25)]">
                    <div className="flex h-full w-full items-center justify-center rounded-[0.85rem] bg-navy-light">
                      <span className="font-display text-3xl leading-none text-mint">₿</span>
                    </div>
                    <div className="absolute left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/25" />
                    <div className="absolute -top-[3px] right-8 h-[3px] w-9 rounded-t-sm bg-navy/70" />
                  </div>
                </div>

                {/* NFC waves, behind both devices so they read as coming from the gap */}
                <div
                  className="pointer-events-none absolute left-1/2 top-[62px] z-0 h-28 w-28 -translate-x-1/2"
                  style={{ animation: "nfc-waves-visibility 5s ease-in-out infinite" }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-mint" style={{ animation: "nfc-pulse-1 5s ease-in-out infinite" }} />
                  <div className="absolute inset-0 rounded-full border-2 border-mint/70" style={{ animation: "nfc-pulse-2 5s ease-in-out infinite" }} />
                  <div className="absolute inset-0 rounded-full border-2 border-mint/45" style={{ animation: "nfc-pulse-3 5s ease-in-out infinite" }} />
                </div>

                {/* The terminal */}
                <div className="relative z-10 h-[330px] w-52 rounded-[1.75rem] bg-gradient-to-b from-navy-light to-navy shadow-[0_25px_50px_-12px_rgb(0_0_0/0.25)]">
                  {/* Contactless target strip across the top — where a card or phone taps */}
                  <div className="absolute inset-x-0 top-0 flex h-7 items-center justify-center gap-2 rounded-t-[1.75rem] bg-mint">
                    <NfcGlyph className="h-3.5 w-3.5 text-navy" />
                    <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-navy">Tap here</span>
                  </div>

                  {/* Screen */}
                  <div className="absolute inset-x-4 top-11 h-[124px] overflow-hidden rounded-xl bg-navy ring-1 ring-white/10">
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{ animation: "till-amount 5s ease-in-out infinite" }}
                    >
                      <span className="text-[0.5rem] font-medium uppercase tracking-[0.2em] text-white/45">
                        Total to pay
                      </span>
                      <span className="mt-1.5 font-display text-4xl leading-none text-white">$21.00</span>
                    </div>
                    <div
                      className="absolute inset-0 z-10 flex items-center justify-center"
                      style={{ animation: "pos-screen-success 5s ease-in-out infinite" }}
                    >
                      <svg
                        className="h-14 w-14 text-navy"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ animation: "checkmark-fade-in 5s ease-in-out infinite" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Physical keypad — moulded keys, which is the tell of a terminal */}
                  <div className="absolute inset-x-4 bottom-5 grid grid-cols-3 gap-1.5">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                      <span
                        key={k}
                        className="flex h-7 items-center justify-center rounded-md bg-white/10 font-sans text-[0.625rem] text-white/70 shadow-[inset_0_-1px_0_rgb(0_0_0/0.25)]"
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  {/* Card reader slot on the right edge */}
                  <div className="absolute -right-[3px] top-[150px] h-14 w-[3px] rounded-r-sm bg-navy/80" />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Row 2 - Left: Zero platform fees */}
          <BentoCard variant="mint-soft" className="flex flex-col">
            <div className="flex items-start justify-between mb-4 gap-4">
              <SectionHeading as="h2" size="sm" className="flex-1">
                Zero platform fees
              </SectionHeading>
            </div>
            <p className="text-lg text-navy/75 mb-6">
              Keep 100% of what you earn. No 2.9% + 30¢. Just tiny Bitcoin network fees.
            </p>
            
            {/* Fee Slicing Animation */}
            <div className="flex-1 relative min-h-[180px] overflow-hidden">
              {/* First fee: 2.9% - positioned upper left, slight angle */}
              <div 
                className="absolute left-4 top-2"
                style={{ 
                  animation: 'fee-1-container 12s ease-in-out infinite',
                  transform: 'rotate(-4deg)'
                }}
              >
                <div className="relative inline-block">
                  {/* Top half */}
                  <span 
                    className="font-display text-6xl md:text-8xl text-navy inline-block"
                    style={{ 
                      clipPath: 'inset(0 0 50% 0)',
                      animation: 'fee-1-slice-top 12s ease-in-out infinite'
                    }}
                  >
                    2.9%
                  </span>
                  {/* Bottom half */}
                  <span 
                    className="font-display text-6xl md:text-8xl text-navy absolute left-0 top-0"
                    style={{ 
                      clipPath: 'inset(50% 0 0 0)',
                      animation: 'fee-1-slice-bottom 12s ease-in-out infinite'
                    }}
                  >
                    2.9%
                  </span>
                </div>
                {/* Slice line for first fee */}
                <div 
                  className="absolute left-0 right-0 top-1/2 h-1 bg-[#FF3B30] origin-left"
                  style={{ animation: 'slice-line-1 12s ease-in-out infinite' }}
                ></div>
              </div>

              {/* Second fee: 30¢ - positioned lower right, different angle */}
              <div 
                className="absolute right-4 bottom-2"
                style={{ 
                  animation: 'fee-2-container 12s ease-in-out infinite',
                  transform: 'rotate(3deg)'
                }}
              >
                <div className="relative inline-block">
                  {/* Top half */}
                  <span 
                    className="font-display text-6xl md:text-8xl text-navy inline-block"
                    style={{ 
                      clipPath: 'inset(0 0 50% 0)',
                      animation: 'fee-2-slice-top 12s ease-in-out infinite'
                    }}
                  >
                    30¢
                  </span>
                  {/* Bottom half */}
                  <span 
                    className="font-display text-6xl md:text-8xl text-navy absolute left-0 top-0"
                    style={{ 
                      clipPath: 'inset(50% 0 0 0)',
                      animation: 'fee-2-slice-bottom 12s ease-in-out infinite'
                    }}
                  >
                    30¢
                  </span>
                </div>
                {/* Slice line for second fee */}
                <div
                  className="absolute left-0 right-0 top-1/2 h-1 bg-[#FF3B30] origin-left"
                  style={{ animation: 'slice-line-2 12s ease-in-out infinite' }}
                ></div>
              </div>
            </div>
          </BentoCard>

          {/* Row 2 - Right: Works Offline with animation */}
          <BentoCard variant="cream-warm" className="flex flex-col">
            <SectionHeading as="h2" size="sm" className="mb-4">
              Works offline
            </SectionHeading>
            <p className="text-lg text-navy/75 mb-6">
              Bad signal? No problem. Numo uses Cashu ecash. Payments sync when you&apos;re back online.
            </p>
            
            {/* Offline payment animation - centered vertically and horizontally */}
            <div className="flex-1 flex items-center justify-center overflow-hidden" aria-hidden="true">
              <WorksOfflineAnimation className="scale-[0.62] sm:scale-[0.8] md:scale-[0.82] lg:scale-90" />
            </div>
          </BentoCard>

          {/* Row 3 - Left: payouts, with the notification stack */}
          <AutoCustodyBento />

          {/* Row 3 - Right: the two short claims, stacked so neither is left in a
              half-empty slab of its own */}
          <div className="flex flex-col gap-4">
            <BentoCard variant="cream" className="flex-1">
              <SectionHeading as="h2" size="sm" className="mb-3">
                Instant settlement
              </SectionHeading>
              <p className="text-lg text-navy/75">
                Seconds, not days. No chargebacks, no holds, no waiting for funds to clear.
              </p>
            </BentoCard>

            <BentoCard variant="gray" className="flex-1">
              <SectionHeading as="h2" size="sm" className="mb-3">
                Fully open-source and free
              </SectionHeading>
              <p className="text-lg text-navy/75">
                No vendor lock-in, no hidden fees, no subscriptions. You own your payment infrastructure.
              </p>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// NFC-enabled wallets (tap-to-pay) - hoisted outside component
const NFC_WALLETS = [
  { name: "eNuts", image: "/wallets/enuts.png" },
  { name: "Sovran", image: "/wallets/sovran.jpg" },
  { name: "Macadamia", image: "/wallets/macadamia.png" },
  { name: "Cashu.me", image: "/wallets/cashume.png" },
  { name: "Minibits", image: "/wallets/minibits.jpg" },
  { name: "Phoenix", image: "/wallets/phoenix.jpg" },
  { name: "Bey", image: "/wallets/bey.png" },
];

// Lightning wallets (standard support) - hoisted outside component
const LIGHTNING_WALLETS = [
  { name: "Alby Go", image: "/wallets/albygo.webp" },
  { name: "Blink Wallet", image: "/wallets/blinkwallet.jpg" },
  { name: "Agicash", image: "/wallets/agicash.png" },
  { name: "Cash App", image: "/wallets/cashapp.svg" },
  { name: "Fedi", image: "/wallets/fedi.jpg" },
  { name: "Muun", image: "/wallets/muun.png" },
  { name: "Strike", image: "/wallets/strike.png" },
  { name: "Wallet of Satoshi", image: "/wallets/walletofsatoshi.png" },
  { name: "Zeus", image: "/wallets/zeus.jpg" },
];

// Supported Wallets Section.
// Runs on butcher paper with the white pills sitting straight on the ground. The
// cream panel that used to hold them made a card inside a card and cost the pills
// their contrast — the ground does that job better.
function SupportedWallets() {
  return (
    <section id="wallets" className="section-anchor bg-cream-warm py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div>
          {/* Header */}
          <div className="text-center mb-12">
            <SectionHeading className="mb-4">
              SUPPORTED WALLETS
            </SectionHeading>
            <p className="text-lg text-navy/75 mx-auto max-w-[35rem] [text-wrap:pretty]">
              Works with any Bitcoin Lightning wallet. Tap-to-pay available for ecash wallets.
            </p>
          </div>

          {/* NFC Wallets - Featured Section */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white">
                <NfcGlyph className="w-4 h-4" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-navy">TAP-TO-PAY</h3>
            </div>

            {/* NFC Wallet Cards */}
            <div className="flex flex-wrap justify-center gap-3">
              {NFC_WALLETS.map((wallet, index) => (
                <div 
                  key={index} 
                  className="relative flex items-center gap-3 bg-white rounded-full px-4 py-2.5"
                >
                  {/* NFC badge — the only thing telling the two wallet tiers apart */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-navy flex items-center justify-center shadow-md z-10 text-white">
                    <NfcGlyph className="w-2.5 h-2.5" />
                  </div>
                  
                  {/* Wallet icon */}
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={wallet.image}
                      alt={wallet.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-navy">{wallet.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-navy/10"></div>
            <span className="text-sm text-navy/65 font-medium">FULLY COMPATIBLE WITH</span>
            <div className="flex-1 h-px bg-navy/10"></div>
          </div>

          {/* Lightning Wallets - Simpler presentation */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {LIGHTNING_WALLETS.map((wallet, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5"
              >
                {/* Wallet icon */}
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={wallet.image}
                    alt={wallet.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-navy">{wallet.name}</span>
              </div>
            ))}
          </div>

          {/* Handwritten annotation */}
          <div className="text-center">
            <p 
              className="text-navy text-2xl md:text-3xl"
              style={{ 
                fontFamily: 'Solitreo, cursive',
                transform: 'rotate(-2deg)',
                display: 'inline-block'
              }}
            >
              + all bitcoin lightning wallets!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Below-the-fold demo footage. Holds its poster frame until the block is near the
 *  viewport, then loads and plays — the hero should own the first megabyte. The
 *  poster is painted onto the frame itself, so footage that never arrives reads as
 *  a still screenshot rather than a hole. */
function DemoVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
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

  // No bezel. The footage carries its own light ground, which is enough to read
  // as a frame on a cream section — a black border around it only added weight.
  return (
    <div ref={ref} className={className}>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream-warm bg-cover bg-center"
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
            className="absolute inset-0 h-full w-full object-cover"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>
    </div>
  );
}

/** Two capability blocks. They used to be one template mirrored — same grid ratio,
 *  same three checkmark-in-a-circle bullets, same heading size — which is the
 *  stock B2B feature block run twice. Now the first carries an editorial spec list
 *  and the second carries none, at a different column ratio. */
function SimpleFeatures() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Block one — media leads, copy explains */}
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <DemoVideo src="/ln-checkout.mp4" poster="/ln-checkout-poster.jpg" />

          <div>
            <SectionHeading className="mb-6">
              Lightning and ecash, unified
            </SectionHeading>
            <p className="mb-8 max-w-[38rem] text-lg text-navy/75 [text-wrap:pretty]">
              Ecash is what makes the tap work. When a customer doesn&apos;t carry an ecash
              wallet, Numo falls back to a Lightning invoice and the sale still closes. One
              till, both rails.
            </p>
            <dl className="border-t border-navy/10">
              {[
                ["Tap to pay", "Any compatible Cashu ecash wallet"],
                ["Scan to pay", "Any Bitcoin Lightning wallet"],
                ["Either way", "Lands in the same balance"],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-navy/10 py-4"
                >
                  <dt className="font-display text-2xl leading-none text-navy">{term}</dt>
                  <dd className="text-lg text-navy/65">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Block two — narrow copy rail, footage running wider */}
        <div className="mt-24 grid items-center gap-10 md:mt-32 md:grid-cols-[1fr_1.35fr] md:gap-14">
          <div>
            <SectionHeading className="mb-6">
              Easy inventory management
            </SectionHeading>
            <p className="max-w-[31rem] text-lg text-navy/75 [text-wrap:pretty]">
              Build categories for items and sizes, then tap once to charge a preset price.
              Every sale is tracked, and the whole ledger exports per item when you need it.
            </p>
          </div>

          <DemoVideo src="/cart.mp4" poster="/cart-poster.jpg" />
        </div>
      </div>
    </section>
  );
}



// POS System Animation Component
function POSSystem({ onPaymentComplete, onQRShown, onReset }: { onPaymentComplete: () => void, onQRShown?: () => void, onReset?: () => void }) {
  const [step, setStep] = useState<'idle' | 'typing' | 'qr' | 'success'>('idle');
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Store callbacks in refs to avoid re-triggering useEffect
  const onPaymentCompleteRef = useRef(onPaymentComplete);
  const onQRShownRef = useRef(onQRShown);
  const onResetRef = useRef(onReset);
  
  useEffect(() => {
    onPaymentCompleteRef.current = onPaymentComplete;
    onQRShownRef.current = onQRShown;
    onResetRef.current = onReset;
  }, [onPaymentComplete, onQRShown, onReset]);

  useEffect(() => {
    // Reset state for new animation cycle
    setStep('idle');
    setAmount('');
    setShowQR(false);
    
    // Reset BTCPay status when animation restarts (but not on first load)
    if (animationKey > 0 && onResetRef.current) {
      onResetRef.current();
    }
    
    const timeouts: NodeJS.Timeout[] = [];
    
    // Start animation sequence
    timeouts.push(setTimeout(() => {
      setStep('typing');
      
      // Type "2"
      timeouts.push(setTimeout(() => setAmount('2'), 500));
      // Type "1"
      timeouts.push(setTimeout(() => setAmount('21'), 1000));
      
      // Show QR after typing
      timeouts.push(setTimeout(() => {
        setStep('qr');
        setShowQR(true);
        if (onQRShownRef.current) onQRShownRef.current();
      }, 2000));

      // Payment Received State - Show success on device first
      timeouts.push(setTimeout(() => {
        setStep('success');
        // Delay the BTCPay update slightly so it syncs visually with the device success screen
        timeouts.push(setTimeout(() => onPaymentCompleteRef.current(), 300));
      }, 4500));
      
      // Hold success screen for 4 seconds, then restart the loop
      timeouts.push(setTimeout(() => {
        setAnimationKey(k => k + 1);
      }, 9000));
      
    }, 1000));

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [animationKey]);

  return (
    <div className="relative w-[300px] h-[600px] bg-navy rounded-[3rem] shadow-[0_25px_50px_-12px_rgb(0_0_0/0.25)] border-[8px] border-navy mx-auto transform hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
      {/* Punch-hole camera. Numo is Android-only, so this device is not an iPhone
          and must not be drawn as one — no Dynamic Island, no 9:41. */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy rounded-full z-30"></div>

      {/* Screen Area - Explicit white background and full coverage */}
      <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden flex flex-col z-10">
        {/* Status Bar */}
        <div className="h-14 w-full flex justify-between items-center px-6 pt-3 bg-white z-20">
           <span className="text-sm font-semibold text-gray-600">Numo</span>
           <div className="flex items-center gap-1.5">
             <div className="w-5 h-3 bg-gray-600 rounded-[1px]"></div>
             <div className="w-0.5 h-3 bg-gray-600 rounded-[1px]"></div>
           </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col relative bg-white">
          
          {/* Keypad View */}
          <div className={`absolute inset-0 flex flex-col bg-white transition-opacity duration-500 ${showQR ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             {/* Display Area - Centered */}
             <div className="flex-1 flex flex-col items-center justify-center px-8 bg-white">
                <div className="text-gray-400 text-sm font-medium mb-2">Enter amount</div>
                <div className="text-5xl font-medium text-[#0A2540] flex items-baseline">
                  <span className="text-3xl text-gray-400 mr-1">$</span>
                  {amount || '0'}
                  <span className={`w-0.5 h-8 bg-mint ml-1 animate-pulse ${step === 'typing' ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
             </div>

             {/* Keypad - White Background with Black Keys */}
             <div className="bg-white h-[60%] p-6 pb-10 flex flex-col justify-center border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 w-full max-w-[240px] mx-auto">
                   {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                     <div key={num} className="flex items-center justify-center">
                        <button 
                          className={`w-14 h-14 rounded-full text-2xl font-medium text-[#0A2540] transition-all duration-150 active:scale-90 ${
                            (amount === '2' && num === 2) || (amount === '21' && num === 1) 
                              ? 'bg-gray-200 scale-95' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {num}
                        </button>
                     </div>
                   ))}
                   <div className="flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full text-2xl font-medium text-[#0A2540] hover:bg-gray-100 active:scale-90">.</button>
                   </div>
                   <div className="flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full text-2xl font-medium text-[#0A2540] hover:bg-gray-100 active:scale-90">0</button>
                   </div>
                   <div className="flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full flex items-center justify-center text-[#0A2540] hover:bg-gray-100 active:scale-90">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" /></svg>
                      </button>
                   </div>
                </div>
             </div>
          </div>

          {/* QR Code View - Clean Static Design */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white transition-all duration-700 ease-out ${showQR && step !== 'success' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <div className="text-center mb-6">
               <div className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Total to pay</div>
               <div className="text-5xl font-semibold text-[#0A2540]">$21.00</div>
             </div>
             
             {/* QR Code Container */}
             <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-lg mb-6 relative">
               <svg className="w-44 h-44" viewBox="0 0 660 660" xmlns="http://www.w3.org/2000/svg">
                 <path d="m0 0h660v660h-660z" fill="#fff"/>
                 <g shapeRendering="crispEdges">
                   <path d="m280 80h20v20h-20z"/><path d="m300 80h20v20h-20z"/><path d="m320 80h20v20h-20z"/><path d="m360 80h20v20h-20z"/><path d="m380 80h20v20h-20z"/><path d="m260 100h20v20h-20z"/><path d="m280 100h20v20h-20z"/><path d="m300 100h20v20h-20z"/><path d="m340 100h20v20h-20z"/><path d="m360 100h20v20h-20z"/><path d="m380 100h20v20h-20z"/><path d="m240 120h20v20h-20z"/><path d="m260 120h20v20h-20z"/><path d="m280 120h20v20h-20z"/><path d="m300 120h20v20h-20z"/><path d="m320 120h20v20h-20z"/><path d="m400 120h20v20h-20z"/><path d="m240 140h20v20h-20z"/><path d="m340 140h20v20h-20z"/><path d="m380 140h20v20h-20z"/><path d="m240 160h20v20h-20z"/><path d="m260 160h20v20h-20z"/><path d="m280 160h20v20h-20z"/><path d="m360 160h20v20h-20z"/><path d="m380 160h20v20h-20z"/><path d="m240 180h20v20h-20z"/><path d="m260 180h20v20h-20z"/><path d="m300 180h20v20h-20z"/><path d="m320 180h20v20h-20z"/><path d="m340 180h20v20h-20z"/><path d="m360 180h20v20h-20z"/><path d="m380 180h20v20h-20z"/><path d="m400 180h20v20h-20z"/><path d="m240 200h20v20h-20z"/><path d="m280 200h20v20h-20z"/><path d="m320 200h20v20h-20z"/><path d="m360 200h20v20h-20z"/><path d="m400 200h20v20h-20z"/><path d="m240 220h20v20h-20z"/><path d="m260 220h20v20h-20z"/><path d="m400 220h20v20h-20z"/><path d="m80 240h20v20h-20z"/><path d="m120 240h20v20h-20z"/><path d="m140 240h20v20h-20z"/><path d="m160 240h20v20h-20z"/><path d="m180 240h20v20h-20z"/><path d="m200 240h20v20h-20z"/><path d="m260 240h20v20h-20z"/><path d="m280 240h20v20h-20z"/><path d="m320 240h20v20h-20z"/><path d="m360 240h20v20h-20z"/><path d="m380 240h20v20h-20z"/><path d="m400 240h20v20h-20z"/><path d="m440 240h20v20h-20z"/><path d="m460 240h20v20h-20z"/><path d="m480 240h20v20h-20z"/><path d="m500 240h20v20h-20z"/><path d="m520 240h20v20h-20z"/><path d="m120 260h20v20h-20z"/><path d="m180 260h20v20h-20z"/><path d="m220 260h20v20h-20z"/><path d="m280 260h20v20h-20z"/><path d="m320 260h20v20h-20z"/><path d="m360 260h20v20h-20z"/><path d="m420 260h20v20h-20z"/><path d="m560 260h20v20h-20z"/><path d="m80 280h20v20h-20z"/><path d="m100 280h20v20h-20z"/><path d="m120 280h20v20h-20z"/><path d="m160 280h20v20h-20z"/><path d="m180 280h20v20h-20z"/><path d="m200 280h20v20h-20z"/><path d="m220 280h20v20h-20z"/><path d="m240 280h20v20h-20z"/><path d="m320 280h20v20h-20z"/><path d="m340 280h20v20h-20z"/><path d="m380 280h20v20h-20z"/><path d="m400 280h20v20h-20z"/><path d="m420 280h20v20h-20z"/><path d="m440 280h20v20h-20z"/><path d="m480 280h20v20h-20z"/><path d="m520 280h20v20h-20z"/><path d="m160 300h20v20h-20z"/><path d="m240 300h20v20h-20z"/><path d="m260 300h20v20h-20z"/><path d="m280 300h20v20h-20z"/><path d="m300 300h20v20h-20z"/><path d="m320 300h20v20h-20z"/><path d="m340 300h20v20h-20z"/><path d="m400 300h20v20h-20z"/><path d="m460 300h20v20h-20z"/><path d="m80 320h20v20h-20z"/><path d="m100 320h20v20h-20z"/><path d="m160 320h20v20h-20z"/><path d="m180 320h20v20h-20z"/><path d="m200 320h20v20h-20z"/><path d="m220 320h20v20h-20z"/><path d="m300 320h20v20h-20z"/><path d="m320 320h20v20h-20z"/><path d="m340 320h20v20h-20z"/><path d="m360 320h20v20h-20z"/><path d="m380 320h20v20h-20z"/><path d="m440 320h20v20h-20z"/><path d="m460 320h20v20h-20z"/><path d="m480 320h20v20h-20z"/><path d="m500 320h20v20h-20z"/><path d="m540 320h20v20h-20z"/><path d="m560 320h20v20h-20z"/><path d="m80 340h20v20h-20z"/><path d="m100 340h20v20h-20z"/><path d="m160 340h20v20h-20z"/><path d="m180 340h20v20h-20z"/><path d="m220 340h20v20h-20z"/><path d="m240 340h20v20h-20z"/><path d="m260 340h20v20h-20z"/><path d="m280 340h20v20h-20z"/><path d="m360 340h20v20h-20z"/><path d="m400 340h20v20h-20z"/><path d="m420 340h20v20h-20z"/><path d="m440 340h20v20h-20z"/><path d="m460 340h20v20h-20z"/><path d="m480 340h20v20h-20z"/><path d="m540 340h20v20h-20z"/><path d="m80 360h20v20h-20z"/><path d="m120 360h20v20h-20z"/><path d="m140 360h20v20h-20z"/><path d="m180 360h20v20h-20z"/><path d="m200 360h20v20h-20z"/><path d="m240 360h20v20h-20z"/><path d="m260 360h20v20h-20z"/><path d="m300 360h20v20h-20z"/><path d="m320 360h20v20h-20z"/><path d="m420 360h20v20h-20z"/><path d="m440 360h20v20h-20z"/><path d="m480 360h20v20h-20z"/><path d="m520 360h20v20h-20z"/><path d="m560 360h20v20h-20z"/><path d="m80 380h20v20h-20z"/><path d="m140 380h20v20h-20z"/><path d="m160 380h20v20h-20z"/><path d="m180 380h20v20h-20z"/><path d="m260 380h20v20h-20z"/><path d="m280 380h20v20h-20z"/><path d="m300 380h20v20h-20z"/><path d="m420 380h20v20h-20z"/><path d="m540 380h20v20h-20z"/><path d="m560 380h20v20h-20z"/><path d="m80 400h20v20h-20z"/><path d="m120 400h20v20h-20z"/><path d="m200 400h20v20h-20z"/><path d="m220 400h20v20h-20z"/><path d="m240 400h20v20h-20z"/><path d="m260 400h20v20h-20z"/><path d="m280 400h20v20h-20z"/><path d="m300 400h20v20h-20z"/><path d="m380 400h20v20h-20z"/><path d="m400 400h20v20h-20z"/><path d="m420 400h20v20h-20z"/><path d="m440 400h20v20h-20z"/><path d="m460 400h20v20h-20z"/><path d="m480 400h20v20h-20z"/><path d="m500 400h20v20h-20z"/><path d="m560 400h20v20h-20z"/><path d="m240 420h20v20h-20z"/><path d="m260 420h20v20h-20z"/><path d="m280 420h20v20h-20z"/><path d="m320 420h20v20h-20z"/><path d="m340 420h20v20h-20z"/><path d="m400 420h20v20h-20z"/><path d="m480 420h20v20h-20z"/><path d="m560 420h20v20h-20z"/><path d="m260 440h20v20h-20z"/><path d="m280 440h20v20h-20z"/><path d="m340 440h20v20h-20z"/><path d="m360 440h20v20h-20z"/><path d="m380 440h20v20h-20z"/><path d="m400 440h20v20h-20z"/><path d="m440 440h20v20h-20z"/><path d="m480 440h20v20h-20z"/><path d="m520 440h20v20h-20z"/><path d="m540 440h20v20h-20z"/><path d="m560 440h20v20h-20z"/><path d="m240 460h20v20h-20z"/><path d="m280 460h20v20h-20z"/><path d="m320 460h20v20h-20z"/><path d="m340 460h20v20h-20z"/><path d="m400 460h20v20h-20z"/><path d="m480 460h20v20h-20z"/><path d="m500 460h20v20h-20z"/><path d="m240 480h20v20h-20z"/><path d="m260 480h20v20h-20z"/><path d="m320 480h20v20h-20z"/><path d="m360 480h20v20h-20z"/><path d="m380 480h20v20h-20z"/><path d="m400 480h20v20h-20z"/><path d="m420 480h20v20h-20z"/><path d="m440 480h20v20h-20z"/><path d="m460 480h20v20h-20z"/><path d="m480 480h20v20h-20z"/><path d="m500 480h20v20h-20z"/><path d="m240 500h20v20h-20z"/><path d="m260 500h20v20h-20z"/><path d="m280 500h20v20h-20z"/><path d="m400 500h20v20h-20z"/><path d="m440 500h20v20h-20z"/><path d="m460 500h20v20h-20z"/><path d="m480 500h20v20h-20z"/><path d="m500 500h20v20h-20z"/><path d="m540 500h20v20h-20z"/><path d="m560 500h20v20h-20z"/><path d="m240 520h20v20h-20z"/><path d="m260 520h20v20h-20z"/><path d="m300 520h20v20h-20z"/><path d="m320 520h20v20h-20z"/><path d="m420 520h20v20h-20z"/><path d="m460 520h20v20h-20z"/><path d="m480 520h20v20h-20z"/><path d="m520 520h20v20h-20z"/><path d="m560 520h20v20h-20z"/><path d="m280 540h20v20h-20z"/><path d="m300 540h20v20h-20z"/><path d="m360 540h20v20h-20z"/><path d="m380 540h20v20h-20z"/><path d="m420 540h20v20h-20z"/><path d="m440 540h20v20h-20z"/><path d="m480 540h20v20h-20z"/><path d="m500 540h20v20h-20z"/><path d="m520 540h20v20h-20z"/><path d="m540 540h20v20h-20z"/><path d="m240 560h20v20h-20z"/><path d="m300 560h20v20h-20z"/><path d="m380 560h20v20h-20z"/><path d="m400 560h20v20h-20z"/><path d="m500 560h20v20h-20z"/><path d="m520 560h20v20h-20z"/><path d="m540 560h20v20h-20z"/><path d="m560 560h20v20h-20z"/><path d="m80 80h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd"/><path d="m440 80h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd"/><path d="m120 120h60v60h-60z"/><path d="m480 120h60v60h-60z"/><path d="m80 440h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd"/><path d="m120 480h60v60h-60z"/>
                 </g>
               </svg>
               {/* Center N Logo overlay */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-mint rounded-lg flex items-center justify-center shadow-sm">
                 <span className="font-display text-navy text-xl">N</span>
               </div>
             </div>

             <div className="flex gap-2 items-center text-gray-400 text-sm font-medium">
               <svg className="w-5 h-5 animate-spin text-mint" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               <span>Waiting for payment...</span>
             </div>
          </div>

          {/* Success View - Full Green Screen with elegant entrance */}
          <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-mint transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${step === 'success' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <div className={`flex flex-col items-center justify-center transition-all duration-400 delay-100 ease-out ${step === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
               <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5 transition-transform duration-400 delay-150 ease-(--ease-spring) ${step === 'success' ? 'scale-100' : 'scale-[0.9]'}`}>
                 <svg className={`w-10 h-10 text-navy transition-all duration-200 delay-300 ${step === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.9]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
                <div className={`text-navy text-xl font-medium tracking-tight transition-all duration-200 delay-200 ${step === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>Payment Received</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// BTCPay invoices data - hoisted outside component
const BTCPAY_INVOICES = [
  { date: "02/28/2026 3:05 PM", orderId: "PAY_REQUEST_cd4...", invoiceId: "EgxBnrivdT...", status: "Paid", amount: "0.00006150 BTC" },
  { date: "02/28/2026 12:39 PM", orderId: "PAY_REQUEST_a9f...", invoiceId: "aP9FZtE3QK...", status: "Paid", amount: "0.00248731 BTC" },
  { date: "02/28/2026 10:12 PM", orderId: "PAY_REQUEST_7d4...", invoiceId: "C5pNQZ6dWv...", status: "Paid", amount: "0.00090384 BTC" },
  { date: "02/28/2026 08:09 PM", orderId: "PAY_REQUEST_f3b...", invoiceId: "WnZxQFJ5A6...", status: "Paid", amount: "0.01572946 BTC" },
  { date: "02/27/2026 10:46 PM", orderId: "PAY_REQUEST_0c8...", invoiceId: "U8N9x5ZC2F...", status: "Paid", amount: "0.00001892 BTC" },
];

// Recreated BTCPay Server Interface Component
function BTCPayInterface({ paymentStatus }: { paymentStatus: 'pending' | 'paid' | null }) {
  // Only show the new row if paymentStatus is not null
  const showNewRow = paymentStatus !== null;
  const isPaid = paymentStatus === 'paid';

  return (
    // A depicted object on the ink ground, so it earns a real shadow and a defined
    // edge. rounded-[2rem] matches the screenshot frame used elsewhere.
    <div className="bg-[#f8f9fa] rounded-t-[2rem] overflow-hidden font-sans ring-1 ring-navy/10 shadow-[0_28px_60px_rgba(10,37,64,.2)] flex text-xs md:text-sm select-none h-[640px]">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#f8f9fa] border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center justify-between mb-2">
           <div className="flex items-center">
             <Image src="/btcpay-logo.svg" alt="BTCPay Server" width={100} height={28} />
           </div>
           <div className="relative cursor-pointer">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute -top-1.5 -right-1.5 bg-[#dc3545] text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-semibold px-1 border-2 border-[#f8f9fa]">15</span>
           </div>
        </div>
        
        <div className="px-4 py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden flex-1">
            <div className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded text-gray-700 mb-6 hover:bg-gray-50 cursor-pointer shadow-sm group">
                <div className="flex items-center gap-3 truncate">
                   <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                   <span className="font-semibold truncate text-sm">Nuthouse</span>
                </div>
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>

            <div className="space-y-1 mb-6">
                <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200/50 rounded cursor-pointer transition-colors duration-150">
                    <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg></div>
                    <span className="font-medium">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200/50 rounded cursor-pointer transition-colors duration-150">
                    <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                    <span className="font-medium">Settings</span>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Wallets</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                    <div className="w-5 flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#51b13e]"></div></div>
                    <span className="font-medium">Bitcoin</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                    <div className="w-5 flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#51b13e]"></div></div>
                    <span className="font-medium">Cashu</span>
                  </div>
                  <div className="pl-11 pr-3 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer text-sm font-medium transition-colors duration-150">Wallet</div>
                  <div className="pl-11 pr-3 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer text-sm font-medium transition-colors duration-150">Settings</div>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Payments</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                       <span className="font-medium">Requests</span>
                    </div>
                     <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></div>
                       <span className="font-medium">Pull Payments</span>
                    </div>
                     <div className="flex items-center gap-3 px-3 py-2 text-[#51b13e] rounded cursor-pointer transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg></div>
                       <span className="font-semibold">Invoices</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
                       <span className="font-medium">Payouts</span>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white md:bg-[#f8f9fa] relative">
         {/* Toast Notification - appears when payment is confirmed */}
         <div 
           className={`absolute top-4 right-4 z-50 flex items-center gap-2 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-out ${
             isPaid 
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 -translate-y-2 pointer-events-none'
           }`}
         >
           <svg className="w-5 h-5 text-[#28a745] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <span className="text-sm font-medium">New payment received!</span>
         </div>

         <div className="p-4 md:p-8 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between gap-4 mb-6">
               <div className="flex items-center gap-2">
                 {/* Not a real heading — depicted chrome, kept out of the outline */}
                 <div className="text-xl md:text-2xl font-semibold text-gray-800">Invoices</div>
                 <span className="text-gray-400 cursor-help bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
               </div>
               <button className="bg-[#51b13e] hover:bg-[#469d34] active:scale-[0.98] text-white px-4 py-2 rounded shadow-sm font-medium text-sm transition-all duration-150 flex items-center gap-2">
                 <span>Create Invoice</span>
               </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
               <div className="relative flex-1 min-w-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input type="text" placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#51b13e] bg-white text-sm" />
               </div>
               <div className="flex gap-2 text-sm overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden">
                 <div className="bg-white border border-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <span>All invoices</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
                 <div className="bg-white border border-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <span>All time</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
                 <div className="bg-white border border-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <span>Export</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
               </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
               <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
                 <table className="w-full text-xs md:text-sm table-fixed">
                    <thead className="bg-[#f8f9fa]">
                      <tr className="text-gray-500 border-b border-gray-200">
                         <th className="py-3 px-4 text-left w-[40px]">
                            <input type="checkbox" className="rounded border-gray-300 text-[#51b13e] focus:ring-[#51b13e] w-4 h-4" />
                         </th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[140px]">Date</th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[130px]">Order ID</th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[110px] hidden sm:table-cell">Invoice ID</th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[90px]">Status</th>
                         <th className="py-3 px-4 text-right font-semibold text-xs uppercase tracking-wider text-gray-500 w-[120px]">Amount</th>
                         <th className="py-3 px-4 text-right w-[70px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {/* New Invoice Row - Only rendered when active */}
                       {showNewRow && (
                       <tr className="bg-white">
                          <td className="py-3 px-4 align-middle">
                               <input type="checkbox" className="rounded border-gray-300 text-[#51b13e] w-4 h-4" />
                          </td>
                          <td className="py-3 px-4 text-gray-700 align-middle whitespace-nowrap text-[13px]">
                                Just now
                          </td>
                          <td className="py-3 px-4 text-[#51b13e] font-mono text-[11px] align-middle whitespace-nowrap">
                                <div className="max-w-[120px] truncate">NUMO_REQUEST</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 font-mono text-[11px] align-middle whitespace-nowrap hidden sm:table-cell">
                                <div className="max-w-[120px] truncate">Nm8XkZq2Yw...</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap align-middle">
                                 {isPaid ? (
                                    <span className="bg-[#d4edda] text-[#155724] px-2 py-1 rounded text-[11px] font-semibold">Paid</span>
                                 ) : (
                                    <span className="bg-[#fff3cd] text-[#856404] px-2 py-1 rounded text-[11px] font-semibold">Processing</span>
                                 )}
                           </td>
                          <td className="py-3 px-4 text-right text-gray-700 align-middle whitespace-nowrap font-mono text-[11px]">
                                0.00025439 BTC
                          </td>
                          <td className="py-3 px-4 text-right align-middle whitespace-nowrap">
                                <span className="text-[#51b13e] cursor-pointer hover:underline text-xs font-medium flex items-center justify-end gap-1">
                                   Details
                                </span>
                          </td>
                       </tr>
                       )}

                       {/* Existing Invoices */}
                       {BTCPAY_INVOICES.map((inv, i) => (
                          <tr key={i} className="bg-white hover:bg-gray-50 transition-colors duration-150">
                             <td className="py-3 px-4 align-middle">
                                <input type="checkbox" className="rounded border-gray-300 text-[#51b13e] focus:ring-[#51b13e] w-4 h-4" />
                             </td>
                             <td className="py-3 px-4 text-gray-700 whitespace-nowrap align-middle text-[13px]">{inv.date}</td>
                             <td className="py-3 px-4 text-[#51b13e] font-mono text-[11px] whitespace-nowrap align-middle">
                               <div className="max-w-[120px] truncate">{inv.orderId}</div>
                             </td>
                             <td className="py-3 px-4 text-gray-600 font-mono text-[11px] whitespace-nowrap align-middle hidden sm:table-cell">
                               <div className="max-w-[120px] truncate">{inv.invoiceId}</div>
                             </td>
                             <td className="py-3 px-4 whitespace-nowrap align-middle">
                                {inv.status === 'Processing' ? (
                                   <span className="bg-[#fff3cd] text-[#856404] px-2 py-1 rounded text-[11px] font-semibold">Processing</span>
                                ) : (
                                   <span className="bg-[#d4edda] text-[#155724] px-2 py-1 rounded text-[11px] font-semibold">Paid</span>
                                )}
                             </td>
                             <td className="py-3 px-4 text-right text-gray-700 whitespace-nowrap font-mono text-[11px] align-middle">{inv.amount}</td>
                             <td className="py-3 px-4 text-right whitespace-nowrap align-middle">
                                <span className="text-[#51b13e] cursor-pointer hover:underline text-xs font-medium flex items-center justify-end gap-1">
                                   Details
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

// BTCPay Server Integration Section
function BTCPayIntegration() {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Callbacks for the POS system
  const handleQRShown = useCallback(() => {
    setPaymentStatus('pending');
  }, []);
  
  const handlePaymentComplete = useCallback(() => {
    setPaymentStatus('paid');
  }, []);
  
  const handleReset = useCallback(() => {
    setPaymentStatus(null);
  }, []);

  return (
    <section id="integration" ref={sectionRef} className="section-anchor bg-cream-warm py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionHeading className="mb-6">
            BTCPay Server x Numo Integration
          </SectionHeading>
          <p className="text-lg text-navy/75 max-w-[38rem] mx-auto [text-wrap:pretty]">
            Numo connects directly to your BTCPay Server store. It generates invoices, accepts Lightning or Cashu, and keeps your Point-of-Sale inventory in sync automatically.
          </p>
        </div>

        {/* Integration Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
           {/* Left: BTCPay UI. Depicted third-party software — a picture of a
               dashboard, not a dashboard. It carries no information a screen
               reader needs and its controls are inert, so it leaves the a11y tree
               and the tab order entirely. `inert` rather than `aria-hidden`,
               because the mockup contains a search field and six checkboxes that
               would stay focusable inside an aria-hidden subtree. */}
           {/* Masked rather than overlaid. A navy scrim laid over the white
               dashboard turned it grey and still ended on a hard edge; masking
               dissolves the artwork itself into the ink ground with nothing on top. */}
           <div
              className="w-full relative"
              inert
              style={{
                maskImage: "linear-gradient(to bottom, #000 0%, #000 68%, transparent 99%)",
                WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 68%, transparent 99%)",
              }}
           >
              <BTCPayInterface paymentStatus={paymentStatus} />
           </div>

           {/* Right: POS Animation */}
           <div className="flex justify-center w-full">
              {isInView && (
                <POSSystem 
                  onQRShown={handleQRShown}
                  onPaymentComplete={handlePaymentComplete}
                  onReset={handleReset}
                />
              )}
           </div>
        </div>

        {/* The invoice rows are sample content, not a customer's books. PRODUCT.md
            bans fabricated proof; saying so plainly keeps this an illustration
            rather than an implied claim about volume. */}
        <p className="mt-10 text-center text-sm text-navy/65">
          Illustration. Invoice amounts and store name are sample data.
        </p>
      </div>
    </section>
  );
}

// FAQ data - hoisted outside component. `a: null` means the answer carries links
// and is rendered as JSX in renderAnswer, keyed on `id` rather than on position.
const FAQ_DATA = [
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
    a: null, // Rendered with JSX inline
  },
  {
    id: "offline",
    q: "What if I have bad internet?",
    a: "Numo works offline too with Cashu wallets when paying cashu requests. Payments sync when you're back online. No lost sales.",
  },
  {
    id: "get-started",
    q: "How do I get started?",
    a: null, // Rendered with JSX inline
  },
  {
    id: "play-store",
    q: "Can I download Numo on the Google Play Store?",
    a: "Numo will be available on the Google Play Store soon. We will update this website once it's available on the Google Play Store.",
  },
] as const;

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Render FAQ answer - handles the cases that carry links
  const renderAnswer = (id: string, answer: string | null) => {
    if (id === "custody") {
      return (
        <>
          Yes. Your sales are Cashu ecash — bearer tokens held on your phone, and the bitcoin
          behind them sits with the mint you pick during{" "}
          <Link
            href="/setup"
            className="text-navy underline hover:text-navy/70 transition-colors"
          >
            setup
          </Link>
          . That mint is the custodian, so choose one you trust; Numo itself holds nothing and
          cannot move your funds. Withdraw to your own Lightning address any time, or set a
          balance threshold and let auto-withdraw send sales out for you.
        </>
      );
    }
    if (id === "get-started") {
      return (
        <>
          Install the app on an NFC Android phone from{" "}
          <a
            href="https://github.com/cashubtc/Numo/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy underline hover:text-navy/70 transition-colors"
          >
            GitHub releases
          </a>{" "}
          or Zapstore, then follow the{" "}
          <Link
            href="/setup"
            className="text-navy underline hover:text-navy/70 transition-colors"
          >
            setup guide
          </Link>
          . Four screens and you&apos;re taking payments.
        </>
      );
    }
    return answer;
  };

  return (
    <section id="faq" className="section-anchor bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Fully rounded FAQ container */}
        <BentoCard variant="cream" size="lg" radius="lg">
          <SectionHeading align="center" className="mb-10">
            FREQUENTLY ASKED QUESTIONS
          </SectionHeading>
          
          <div className="space-y-0">
            {FAQ_DATA.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full py-5 flex items-center justify-between text-left group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-display text-xl md:text-2xl text-navy pr-6 group-hover:text-navy/75 transition-colors duration-150">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-navy/30 flex items-center justify-center group-hover:border-navy group-hover:bg-navy transition-all duration-200 active:scale-95">
                    <span className={`text-navy/65 group-hover:text-white text-xl leading-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${openIndex === index ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </div>
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 pr-4 text-lg leading-relaxed text-navy/75 sm:pr-16">
                      {renderAnswer(faq.id, faq.a)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

// Footer CTA
function Footer() {
  return (
    <footer id="get-started" className="section-anchor bg-navy pt-20 pb-0 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-6">
          START ACCEPTING<br/>
          BITCOIN TODAY.
        </h2>
        <p className="text-lg text-white/60 mb-8">Free to download. Free to use. No fees, ever.</p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 px-4 sm:px-0">
          <Button
            href="https://github.com/cashubtc/Numo/releases"
            variant="accent"
            external
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Download APK
          </Button>
          <Button
            href="https://zapstore.dev/apps/naddr1qqtkxmmd9ejkcetrw3exjcmywfjkzmtn9eh82mt0qyv8wumn8ghj7un9d3shjtn6v9c8xar0wfjjuer9wcpzpcluvulut7vuc42dpl68w4ne2erayh9kuejclyfdz99wvs5axhf4qvzqqqr7pvu7jrcc"
            variant="light"
            external
            ariaLabel="Download on Zapstore"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" />
            </svg>
            Download on Zapstore
          </Button>
        </div>


        {/* Support acknowledgment and links */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-base text-white/50 mb-6 max-w-2xl mx-auto">
            This project was built with support from OpenCash. To support open-source digital cash development, please consider{' '}
            <a 
              href="https://opencash.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline underline-offset-2 transition-colors duration-150"
            >
              donating to OpenCash
            </a>.
          </p>
          
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a
              href="/releases"
              className="-my-3 inline-flex min-h-11 items-center py-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Releases
            </a>
            <span className="text-white/20">·</span>
            <a
              href="/privacy"
              className="-my-3 inline-flex min-h-11 items-center py-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Privacy &amp; Terms
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://cashu.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3 inline-flex min-h-11 items-center py-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Visit Cashu.space
            </a>
            <span className="text-white/20">·</span>
            <a 
              href="https://x.com/numopayapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="-my-3 inline-flex min-h-11 items-center gap-1.5 py-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow On X
            </a>
            <span className="text-white/20">·</span>
            <a 
              href="https://primal.net/p/nprofile1qqs0y3tvskgs9gpgxxu5ahgz3fmms3rzmxt504qceqtz4a6pdgfwlkghwl6j8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="-my-3 inline-flex min-h-11 items-center gap-1.5 py-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                <path d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/>
              </svg>
              Follow On Nostr
            </a>
          </div>
        </div>
      </div>
      
      {/* Large NUMO text - full width, resting at bottom baseline */}
      <div className="w-full mt-4 relative overflow-hidden">
        <p 
          className="font-grandstander text-[clamp(6rem,20vw,20rem)] text-white/10 leading-none w-full text-center break-words"
          style={{ letterSpacing: '-0.02em', marginBottom: '-0.25em', paddingBottom: '0' }}
        >
          <span className="block sm:inline">NUMO</span>
        </p>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* tabIndex -1 so the skip link moves focus into main, not just the scroll position */}
      <main id="main-content" tabIndex={-1}>
      <Navigation />
      <Hero />
      <BentoFeatures />
      <SupportedWallets />
      <SimpleFeatures />
      <BTCPayIntegration />
      <FAQ />
      <Footer />
      </main>
    </>
  );
}
