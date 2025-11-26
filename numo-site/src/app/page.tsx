"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
        ? "bg-white/80 backdrop-blur-xl" 
        : "bg-navy"
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
  return (
    <section className="bg-white pt-40 pb-24 relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Tagline */}
        <p className="text-navy/50 text-base font-medium tracking-wide mb-4">MEET NUMO</p>

        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-navy leading-[0.9] mb-8 max-w-5xl mx-auto font-bold">
          YOUR POCKET POS FOR ACCEPTING BITCOIN, ONE TAP AT A TIME.
        </h1>

        {/* App Store Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="flex items-center gap-3 px-8 py-4 bg-mint rounded-full text-navy text-base font-medium hover:bg-mint/80 transition-colors shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
          <a href="#" className="flex items-center gap-3 px-8 py-4 bg-navy rounded-full text-white text-base font-medium hover:bg-navy/80 transition-colors shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19L17.69 15l-2.5-2.5 2.5-2.5 2.47 1.81zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            Google Play
          </a>
        </div>

        {/* Hero Image */}
        <div className="relative flex justify-center items-center h-[500px]">
          <div className="relative w-full max-w-4xl h-full">
            <Image
              src="/hero.png"
              alt="Numo POS interface"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
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
            <p className="text-lg text-gray-600 mb-6">
              No vendor lock-in, no hidden fees, no subscriptions. Built by the Bitcoin community, 
              for the Bitcoin community. You own your payment infrastructure.
            </p>
            
            {/* Illustration - multiple merchant types */}
            <div className="mt-auto relative">
              <div className="flex flex-wrap gap-3">
                <div className="bg-white rounded-xl p-3 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-cream-warm flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Café</p>
                </div>
                <div className="bg-mint-soft rounded-xl p-3 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-mint/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 5h8m-4-9v18m-7-4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Food Truck</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-cream-warm flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Market</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-3 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Pop-up</p>
                </div>
                <div className="bg-mint-soft rounded-xl p-3 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-mint/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 - Right: Two stacked cards */}
          <div className="flex flex-col gap-4">
            {/* Self custody card */}
            <div className="bg-mint-pale rounded-[2rem] p-8 flex-1">
              <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-3">
                Automatic self-custody
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Set a threshold amount. Once your ecash balance reaches it, we automatically transfers funds to your Lightning address.
              </p>
              {/* Mini notification style */}
              <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3 hover:scale-[1.02] transition-transform">
                <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-navy text-sm">Threshold reached!</p>
                  <p className="text-sm text-gray-600">Auto-transferring to your wallet</p>
                </div>
              </div>
            </div>

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
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-navy text-sm font-medium shadow-lg">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Auto-sync
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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-mint flex items-center justify-center">
                  <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <a href="#get-started" className="px-8 py-4 bg-navy rounded-full text-white font-medium hover:bg-navy-light hover:scale-105 transition-all shadow-lg">
                  Get Started Free
                </a>
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
          
          {/* +Many More */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-navy/5 border-2 border-navy/20">
            <span className="font-medium text-navy">+ Many More</span>
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
