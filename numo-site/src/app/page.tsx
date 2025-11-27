"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Notification data pool - cycles through these
const notificationPool = [
  { amount: "$20.00", address: "satoshi@primal.net" },
  { amount: "$35.00", address: "alice@wallet.com" },
  { amount: "$50.00", address: "bob@strike.me" },
  { amount: "$100.00", address: "carol@coinos.io" },
  { amount: "$75.00", address: "dave@getalby.com" },
  { amount: "$45.00", address: "eve@phoenix.io" },
];

interface StackNotification {
  id: number;
  amount: string;
  address: string;
  position: number; // 0 = front/bottom, 1 = middle, 2 = back/top, 3 = exiting, -1 = entering
}

// Animated Self Custody Bento Component with continuous iOS-style stacked notifications
function AutoCustodyBento() {
  const [notifications, setNotifications] = useState<StackNotification[]>([]);
  const [isInView, setIsInView] = useState(false);
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
    if (!isInView) return;

    // Reset counters
    idCounterRef.current = 0;
    dataIndexRef.current = 0;

    // Create initial stack of 3 (using requestAnimationFrame to satisfy linter)
    const initTimeout = requestAnimationFrame(() => {
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
    });

    // Cleanup when going out of view
    return () => {
      cancelAnimationFrame(initTimeout);
      setNotifications([]);
    };
  }, [isInView]);

  // Continuous cycling animation
  useEffect(() => {
    if (!isInView || notifications.length === 0) return;

    const cycleInterval = setInterval(() => {
      setNotifications(prev => {
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
  }, [isInView, notifications.length]);

  // Get styles based on position in stack
  const getStackStyles = (position: number) => {
    // Position: -1 = entering, 0 = front, 1 = middle, 2 = back, 3 = exiting
    const stackConfigs: Record<number, { y: number; scale: number; opacity: number; zIndex: number }> = {
      [-1]: { y: 60, scale: 1, opacity: 0, zIndex: 4 },      // Entering from below
      0: { y: 0, scale: 1, opacity: 1, zIndex: 3 },          // Front (most visible)
      1: { y: -12, scale: 0.96, opacity: 0.85, zIndex: 2 },  // Middle
      2: { y: -24, scale: 0.92, opacity: 0.7, zIndex: 1 },   // Back
      3: { y: -50, scale: 0.88, opacity: 0, zIndex: 0 },     // Exiting upward
    };

    const config = stackConfigs[position] || stackConfigs[3];
    
    return {
      transform: `translateY(${config.y}px) scale(${config.scale})`,
      opacity: config.opacity,
      zIndex: config.zIndex,
    };
  };

  return (
    <div ref={containerRef} className="bg-mint-pale rounded-[2rem] p-6 flex-1 min-h-[320px] flex flex-col relative overflow-hidden">
      <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-2 text-center">
        Automatic self-custody
      </h3>
      <p className="text-lg text-gray-600 mb-2 text-center">
        Set a threshold amount. Once your ecash balance reaches it, funds automatically transfer to your Lightning address.
      </p>
      
      {/* iOS-style stacked notifications container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[380px] h-[160px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="absolute bottom-0 left-0 right-0 flex rounded-2xl shadow-lg ring-1 ring-black/5 items-center p-5 gap-4 pointer-events-none select-none bg-white/95 backdrop-blur-sm"
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
                <p className="text-sm text-gray-500 truncate">Sent to {notification.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "backdrop-blur-xl" 
        : ""
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-mint hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl font-display font-bold text-navy">N</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = ["/1.mp4", "/2.mp4"];
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  const handleVideoEnd = () => {
    // Switch to the next video, loop back to first after the last one
    const nextVideo = (currentVideo + 1) % videos.length;
    setCurrentVideo(nextVideo);
    
    // Ensure the next video starts playing immediately
    const nextVideoRef = videoRefs[nextVideo].current;
    if (nextVideoRef) {
      nextVideoRef.currentTime = 0;
      nextVideoRef.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  };

  // Ensure the current video is always playing
  useEffect(() => {
    const currentVideoRef = videoRefs[currentVideo].current;
    if (currentVideoRef) {
      currentVideoRef.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  return (
    <section className="bg-white pt-40 pb-24 relative overflow-hidden">
      {/* Video Background - Full Width */}
      <div className="absolute inset-0 top-0 bottom-0 overflow-hidden z-0">
        {/* Video container - Full width */}
        <div className="relative w-full h-full">
          {videos.map((video, index) => (
            <video
              key={video}
              ref={videoRefs[index]}
              src={video}
              autoPlay
              muted
              loop={false}
              playsInline
              onEnded={handleVideoEnd}
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentVideo ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>
        
        {/* Gradient overlay - bottom fade only, above video but below content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-20 pointer-events-none" />
      </div>

      {/* Content - above everything */}
      <div className="max-w-5xl mx-auto px-6 text-center relative z-30">
        {/* Tagline */}
        <p className="text-white/80 text-base font-medium tracking-wide mb-4">MEET NUMO</p>

        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-8 max-w-5xl mx-auto font-bold drop-shadow-lg">
          YOUR POCKET POS FOR ACCEPTING BITCOIN, ONE TAP AT A TIME.
        </h1>

        {/* App Store Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="flex items-center gap-3 px-8 py-4 bg-mint rounded-full text-navy text-base font-medium hover:bg-mint/80 transition-colors shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Github
          </a>
          <a href="#" className="flex items-center gap-3 px-8 py-4 bg-navy rounded-full text-white text-base font-medium hover:bg-navy/80 transition-colors shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19L17.69 15l-2.5-2.5 2.5-2.5 2.47 1.81zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            Google Play
          </a>
        </div>
      </div>
    </section>
  );
}

// Bento Box Feature Section - Abode-style layout
function BentoFeatures() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bento Grid - Abode style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Row 1 - Left: Tap to Pay with Cashu wallet support */}
          <div className="bg-cream rounded-[2rem] p-8 flex flex-col">
            <div className="flex items-start justify-between mb-6 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                TAP TO PAY<br/>
                Just like Apple Pay
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.62 8.45c-3.45-3.45-9.04-3.45-12.49 0a.996.996 0 001.41 1.41c2.66-2.66 6.99-2.66 9.67 0a.996.996 0 101.41-1.41z"/>
                    <path d="M17.79 11.28a5.467 5.467 0 00-7.72 0 .996.996 0 001.41 1.41 3.488 3.488 0 014.9 0 .996.996 0 101.41-1.41z"/>
                    <circle cx="13.93" cy="15.93" r="2"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Description text */}
            <div className="mt-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                Numo supports tap-to-pay UX for Cashu wallets, delivering a superior payment experience. 
                No more scanning QR codes or sending to Lightning invoices—unless you want to. 
                Lightning payments are fully supported, giving you the flexibility to choose how your customers pay.
              </p>
            </div>
          </div>

          {/* Row 1 - Right: Instant settlement */}
          <div className="bg-mint-soft rounded-[2rem] p-8 flex flex-col">
            <div className="flex items-start justify-between mb-4 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                Instant settlement
              </h3>
              <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Settlement in seconds, not days. No chargebacks, no holds. Bitcoin moves at the speed of light.
            </p>
            
            {/* Visual illustration - payment animation */}
            <div className="mt-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between">
                <div className="bg-white rounded-xl p-3 shadow-lg hover:scale-105 transition-transform">
                  <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center mb-2">
                    <span className="text-white font-display">N</span>
                  </div>
                  <p className="font-display text-navy text-sm">$42.00</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-navy animate-pulse"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-navy animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-navy animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-lg hover:scale-105 transition-transform">
                  <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-display text-navy text-sm">Done!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 - Left: Open Source & Free */}
          <div className="bg-cream-warm rounded-[2rem] p-8 flex flex-col">
            <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-4">
              Fully open-source and free
            </h3>
            <p className="text-lg text-gray-600">
              No vendor lock-in, no hidden fees, no subscriptions. Built by the Bitcoin community, 
              for the Bitcoin community. You own your payment infrastructure.
            </p>
          </div>

          {/* Row 2 - Right: Two stacked cards */}
          <div className="flex flex-col gap-4">
            {/* Self custody card with animated toasts */}
            <AutoCustodyBento />

            {/* Works offline card */}
            <div className="bg-gray-100 rounded-[2rem] p-8 flex-1">
              <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-3">
                Works offline
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Bad signal? No problem. Numo uses Cashu ecash. Payments sync when you&apos;re back online.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-navy text-sm font-medium shadow-lg">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                  </svg>
                  No WiFi needed
                </span>
              </div>
            </div>
          </div>

          {/* Row 3 - Full width CTA */}
          <div className="bg-cream rounded-[2rem] p-8 md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-2">
                  Zero platform fees
                </h3>
                <p className="text-lg text-gray-600">
                  Keep 100% of what you earn. No 2.9% + 30¢. Just tiny Bitcoin network fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Supported Wallets Section
function SupportedWallets() {
  // Unique colors for each wallet that match design language
  const walletColors = [
    // Each wallet gets a unique color from the palette
    { bg: "bg-[#CCFBF1]", border: "border-[#5EEAD4]", iconBg: "bg-[#5EEAD4]/30" }, // Minibits - Teal
    { bg: "bg-[#E0F2FE]", border: "border-[#7DD3FC]", iconBg: "bg-[#7DD3FC]/30" }, // eNuts - Blue
    { bg: "bg-[#FEF3C7]", border: "border-[#FCD34D]", iconBg: "bg-[#FCD34D]/30" }, // Cashu.me - Yellow
    { bg: "bg-[#FFEDD5]", border: "border-[#FDBA74]", iconBg: "bg-[#FDBA74]/30" }, // Nutstash - Orange
    { bg: "bg-[#F3E8FF]", border: "border-[#C4B5FD]", iconBg: "bg-[#C4B5FD]/30" }, // Macadamia - Purple
    { bg: "bg-[#FEE2E2]", border: "border-[#FCA5A5]", iconBg: "bg-[#FCA5A5]/30" }, // Boardwalk - Red
    { bg: "bg-cream", border: "border-cream-warm", iconBg: "bg-cream-warm" }, // Cashcrab - Cream
    { bg: "bg-gray-100", border: "border-gray-300", iconBg: "bg-gray-200" }, // LNbits - Gray
  ];

  const wallets = [
    { name: "Minibits", nfc: true },
    { name: "eNuts", nfc: true },
    { name: "Cashu.me", nfc: true },
    { name: "Nutstash", nfc: true },
    { name: "Macadamia", nfc: false },
    { name: "Boardwalk", nfc: false },
    { name: "Cashcrab", nfc: false },
    { name: "LNbits", nfc: false },
  ];

  return (
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Grass background covering entire section, fading out at bottom */}
      <div className="absolute inset-0">
        <Image
          src="/grass.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.3 }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 80%, white 100%)'
          }}
        ></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-4 font-bold">
            SUPPORTED WALLETS
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Numo is a full Lightning POS system. Works with any Bitcoin Lightning wallet. Tap-to-pay available for ecash wallets.
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
              <svg className="w-5 h-5 text-navy" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.62 8.45c-3.45-3.45-9.04-3.45-12.49 0a.996.996 0 001.41 1.41c2.66-2.66 6.99-2.66 9.67 0a.996.996 0 101.41-1.41z"/>
                <path d="M17.79 11.28a5.467 5.467 0 00-7.72 0 .996.996 0 001.41 1.41 3.488 3.488 0 014.9 0 .996.996 0 101.41-1.41z"/>
                <circle cx="13.93" cy="15.93" r="2"/>
              </svg>
            </div>
            <span className="text-base text-navy font-medium">Tap-to-Pay (NFC)</span>
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {wallets.map((wallet, index) => {
            const colors = walletColors[index];
            return (
              <div key={index} className="flex items-center gap-1.5 group">
                {/* Wallet icon - outside pill, to the left */}
                <div className={`w-8 h-8 rounded-full ${colors.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <span className="text-xs text-navy font-bold">
                    {wallet.name.charAt(0)}
                  </span>
                </div>
                {/* Pill */}
                <div 
                  className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all group-hover:scale-105 ${colors.bg} ${colors.border}`}
                >
                  <span className="font-medium text-navy">{wallet.name}</span>
                  {wallet.nfc && (
                    <div className="w-5 h-5 rounded-full bg-mint flex items-center justify-center" title="Supports NFC Tap-to-Pay">
                      <svg className="w-3 h-3 text-navy" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.62 8.45c-3.45-3.45-9.04-3.45-12.49 0a.996.996 0 001.41 1.41c2.66-2.66 6.99-2.66 9.67 0a.996.996 0 101.41-1.41z"/>
                        <path d="M17.79 11.28a5.467 5.467 0 00-7.72 0 .996.996 0 001.41 1.41 3.488 3.488 0 014.9 0 .996.996 0 101.41-1.41z"/>
                        <circle cx="13.93" cy="15.93" r="2"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* + ALL BITCOIN LIGHTNING WALLETS */}
          <div className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-navy/5 border-2 border-navy/20 hover:border-yellow-400 transition-all cursor-pointer overflow-visible">
            {/* Lightning bolts continuously streaming out - multiple instances for continuous flow */}
            {[
              { tx: '-20px', ty: '-20px', rot: '-25deg', size: 'w-6 h-6', pos: '-top-4 -left-4', delays: ['0s', '0.27s', '0.53s'] },
              { tx: '25px', ty: '-25px', rot: '45deg', size: 'w-5 h-5', pos: '-top-3 -right-5', delays: ['0.1s', '0.37s', '0.63s'] },
              { tx: '35px', ty: '0px', rot: '90deg', size: 'w-7 h-7', pos: 'top-0 -right-8', delays: ['0.2s', '0.47s', '0.73s'] },
              { tx: '-25px', ty: '25px', rot: '-135deg', size: 'w-6 h-6', pos: '-bottom-4 -left-3', delays: ['0.15s', '0.41s', '0.67s'] },
              { tx: '20px', ty: '20px', rot: '135deg', size: 'w-5 h-5', pos: '-bottom-3 -right-4', delays: ['0.05s', '0.31s', '0.57s'] },
              { tx: '-35px', ty: '0px', rot: '-90deg', size: 'w-7 h-7', pos: 'top-1/2 -left-8 -translate-y-1/2', delays: ['0.12s', '0.38s', '0.64s'] },
              { tx: '0px', ty: '-35px', rot: '0deg', size: 'w-6 h-6', pos: '-top-5 left-1/2 -translate-x-1/2', delays: ['0.08s', '0.34s', '0.6s'] },
              { tx: '0px', ty: '35px', rot: '180deg', size: 'w-6 h-6', pos: '-bottom-5 left-1/2 -translate-x-1/2', delays: ['0.18s', '0.44s', '0.7s'] },
            ].map((bolt, boltIndex) => 
              bolt.delays.map((delay, instanceIndex) => (
                <div 
                  key={`${boltIndex}-${instanceIndex}`}
                  className={`absolute ${bolt.pos} hidden group-hover:block group-hover:animate-lightning`}
                  style={{
                    '--tx': bolt.tx,
                    '--ty': bolt.ty,
                    '--rot': bolt.rot,
                    animationDelay: delay,
                  } as React.CSSProperties}
                >
                  <svg className={`${bolt.size} text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              ))
            )}
            <span className="font-medium text-navy group-hover:text-navy transition-colors uppercase relative z-10">+ ALL BITCOIN LIGHTNING WALLETS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple Two-Column Feature Layout
function SimpleFeatures() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* First Row - Phone left, Text right */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center mb-24">
          {/* Phone Mockup - Column 1 */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[680px]">
              <Image
                src="/b1.jpg"
                alt="Numo POS ready to accept payment"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </div>
          
          {/* Text Content - Column 2 */}
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-[#EA580C] leading-[0.9] mb-6 font-bold">
              Lightning and ecash, unified
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Numo isn&apos;t just an ecash POS—it&apos;s both. Ecash unlocks the optimal tap-to-pay experience. 
              If your customers don&apos;t have an ecash wallet, Lightning payments work seamlessly. 
              You get the benefits of both systems in one platform.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFEDD5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#EA580C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-[#EA580C]">Tap-to-pay with ecash wallets</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFEDD5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#EA580C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg text-[#EA580C]">Full Lightning Network support</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFEDD5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#EA580C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-lg text-[#EA580C]">Best of both payment systems</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row - Text left, Phone right */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* Text Content - Column 1, aligns with top image column */}
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-[#065f46] leading-[0.9] mb-6 font-bold">
              Your phone is your POS
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Built-in inventory management makes selling easy. Create categories for items and sizes, 
              then tap to request a pre-determined payment. Track everything you sell.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#065f46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <span className="text-lg text-[#065f46]">Organize items by category and size</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#065f46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-lg text-[#065f46]">Tap to request pre-determined payments</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#065f46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-lg text-[#065f46]">Export sales reports by item</span>
              </li>
            </ul>
          </div>
          
          {/* Phone Mockup - Column 2, aligns with top text column */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[680px]">
            <Image
                src="/b2.jpg"
                alt="Numo POS payment received confirmation"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section - fully rounded container
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Numo?",
      a: "Numo is a Bitcoin POS app that lets you accept Bitcoin payments with a simple tap. Your customers use NFC to pay, just like Apple Pay or Google Pay, but it's all Bitcoin.",
    },
    {
      q: "Do my customers need a special app?",
      a: "They just need a Bitcoin Lightning wallet and Numo will work. If they want to take advantage of the tap-to-pay UX, they'll need a compatible Cashu wallet such as Cashu.me or Macadamia.",
    },
    {
      q: "Is it really free?",
      a: "Yes. Numo is free to download and free to use. The Bitcoin network has minimal fees (usually less than a cent), but we don't charge anything.",
    },
    {
      q: "What about security?",
      a: "Bitcoin goes directly to your wallet—we never touch it. You control your keys, you control your money. Self-custody by default.",
    },
    {
      q: "What if I have bad internet?",
      a: "Numo works offline too. Payments sync when you're back online. No lost sales.",
    },
    {
      q: "How do I get started?",
      a: "Download Numo from the App Store or Google Play, set up your wallet, and you're ready to accept Bitcoin payments.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Fully rounded FAQ container */}
        <div className="bg-cream rounded-[3rem] p-8 md:p-12">
          <h2 className="font-display text-5xl md:text-6xl text-navy text-center mb-10 leading-[0.9] font-bold">
            OUR FAQS
          </h2>
          
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full py-5 flex items-center justify-between text-left group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-display text-xl md:text-2xl text-navy pr-6 group-hover:text-navy/70 transition-colors">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-navy/30 flex items-center justify-center group-hover:border-navy group-hover:bg-navy transition-colors">
                    <span className={`text-navy/50 group-hover:text-white text-xl leading-none transition-all duration-300 ${openIndex === index ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-5 text-lg text-gray-600 leading-relaxed pr-16">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer CTA
function Footer() {
  return (
    <footer id="get-started" className="bg-navy pt-20 pb-0 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-6 font-bold">
          START ACCEPTING<br/>
          BITCOIN TODAY.
        </h2>
        <p className="text-lg text-white/60 mb-8">Free to download. Free to use. No fees, ever.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 bg-mint rounded-full text-navy text-base font-medium hover:bg-white hover:scale-105 transition-all shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
          <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/40 rounded-full text-white text-base font-medium hover:bg-white hover:text-navy hover:scale-105 transition-all">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19L17.69 15l-2.5-2.5 2.5-2.5 2.47 1.81zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            Google Play
          </a>
        </div>
      </div>
      
      {/* Large NUMO text - full width, resting at bottom baseline */}
      <div className="w-full mt-4 relative overflow-hidden">
        <p 
          className="font-grandstander text-[12rem] md:text-[18rem] lg:text-[22rem] xl:text-[28rem] text-white/10 leading-none w-full text-center"
          style={{ letterSpacing: '-0.02em', marginBottom: '-0.25em', paddingBottom: '0' }}
        >
          NUMO
        </p>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <BentoFeatures />
      <SupportedWallets />
      <SimpleFeatures />
      <FAQ />
      <Footer />
      </main>
  );
}
