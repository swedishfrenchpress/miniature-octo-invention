"use client";

import { useState, useEffect } from "react";

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <span className="text-white text-lg font-display">N</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="bg-white pt-28 pb-24 relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Tagline */}
        <p className="text-navy/50 text-sm font-medium tracking-wide mb-4">MEET NUMO</p>

        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-navy leading-[0.9] mb-8 max-w-5xl mx-auto font-bold">
          YOUR POCKET POS FOR ACCEPTING BITCOIN, ONE TAP AT A TIME.
        </h1>

        {/* App Store Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-navy rounded-full text-white text-sm font-medium hover:bg-navy/80 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
          <a href="#" className="flex items-center gap-2 px-5 py-2.5 border border-navy/30 rounded-full text-navy text-sm font-medium hover:bg-navy hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19L17.69 15l-2.5-2.5 2.5-2.5 2.47 1.81zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            Google Play
          </a>
        </div>

        {/* Phone Mockups */}
        <div className="relative flex justify-center items-end h-[380px]">
          {/* Left phone */}
          <div className="absolute left-1/2 -translate-x-[160%] bottom-0 w-44 h-[320px] bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden rotate-[-8deg] animate-float">
            <div className="bg-gradient-to-b from-mint/20 to-white h-full p-3">
              <div className="text-[8px] text-center text-gray-400 mb-3">9:41</div>
              <div className="text-center">
                <div className="w-8 h-8 bg-navy rounded-lg mx-auto mb-1 flex items-center justify-center">
                  <span className="text-white text-xs font-display">N</span>
                </div>
                <p className="font-display text-navy text-[10px]">NUMO POS</p>
              </div>
              <div className="mt-3 bg-gray-50 rounded-xl p-3">
                <p className="text-[8px] text-gray-400">AMOUNT</p>
                <p className="font-display text-xl text-navy">$24.00</p>
              </div>
            </div>
          </div>

          {/* Center phone */}
          <div className="relative z-10 w-52 h-[380px] bg-white rounded-[2rem] shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-b from-mint/20 to-white h-full p-4">
              <div className="text-[9px] text-center text-gray-400 mb-3">9:41</div>
              <div className="text-center">
                <div className="w-10 h-10 bg-navy rounded-xl mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-display">N</span>
                </div>
                <p className="font-display text-navy text-sm">NUMO POS</p>
              </div>
              <div className="mt-4 bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <p className="text-[10px] text-gray-400">AMOUNT DUE</p>
                <p className="font-display text-3xl text-navy leading-none">$12.50</p>
                <p className="text-xs text-mint-dark mt-1">≈ 12,847 sats</p>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="w-14 h-14 rounded-full bg-yellow/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">Ready for tap...</p>
            </div>
          </div>

          {/* Right phone */}
          <div className="absolute left-1/2 translate-x-[60%] bottom-0 w-44 h-[320px] bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden rotate-[8deg] animate-float-reverse animation-delay-500">
            <div className="bg-gradient-to-b from-yellow/20 to-white h-full p-3">
              <div className="text-[8px] text-center text-gray-400 mb-3">9:41</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-mint rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-display text-navy text-[10px]">PAYMENT RECEIVED</p>
                <p className="font-display text-2xl text-navy mt-1 leading-none">$12.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Bento Box Feature Section - Abode-style layout
function BentoFeatures() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bento Grid - Abode style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Row 1 - Left: Tap to Pay with mini feature cards (like "Interactive magnets") */}
          <div className="bg-[#FFF5EB] rounded-[2rem] p-8 flex flex-col">
            <div className="flex items-start justify-between mb-6 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                Tap to pay, just like Apple Pay
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.62 8.45c-3.45-3.45-9.04-3.45-12.49 0a.996.996 0 001.41 1.41c2.66-2.66 6.99-2.66 9.67 0a.996.996 0 101.41-1.41z"/>
                    <path d="M17.79 11.28a5.467 5.467 0 00-7.72 0 .996.996 0 001.41 1.41 3.488 3.488 0 014.9 0 .996.996 0 101.41-1.41z"/>
                    <circle cx="13.93" cy="15.93" r="2"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Mini feature cards grid */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="bg-white/60 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-mint/50 flex items-center justify-center mb-2">
                  <span className="text-lg">⚡</span>
                </div>
                <p className="font-display text-sm text-navy">Instant</p>
                <p className="text-xs text-gray-500">Sub-second payments</p>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-yellow/50 flex items-center justify-center mb-2">
                  <span className="text-lg">🔐</span>
                </div>
                <p className="font-display text-sm text-navy">Self-custody</p>
                <p className="text-xs text-gray-500">Your keys, your Bitcoin</p>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-purple-200 flex items-center justify-center mb-2">
                  <span className="text-lg">📴</span>
                </div>
                <p className="font-display text-sm text-navy">Offline</p>
                <p className="text-xs text-gray-500">Works without internet</p>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-red-200 flex items-center justify-center mb-2">
                  <span className="text-lg">💸</span>
                </div>
                <p className="font-display text-sm text-navy">Zero Fees</p>
                <p className="text-xs text-gray-500">Keep what you earn</p>
              </div>
            </div>
          </div>

          {/* Row 1 - Right: Instant settlement (like "Live audio with a tap") */}
          <div className="bg-[#E8F4FD] rounded-[2rem] p-8 flex flex-col">
            <div className="flex items-start justify-between mb-4 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                Instant settlement
              </h3>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-navy/60 mb-6">
              Settlement in seconds, not days. No chargebacks, no holds. Bitcoin moves at the speed of light.
            </p>
            
            {/* Visual illustration - payment animation */}
            <div className="mt-auto bg-blue-400/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center mb-2">
                    <span className="text-white font-display">N</span>
                  </div>
                  <p className="font-display text-navy text-sm">$42.00</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-mint animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-mint animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-mint animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-lg">
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

          {/* Row 2 - Left: Accept Anywhere (like "A new way to have fun") */}
          <div className="bg-[#FDF2F8] rounded-[2rem] p-8 flex flex-col">
            <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-4">
              Accept payments anywhere
            </h3>
            <p className="text-navy/60 mb-6">
              Coffee shops, food trucks, farmers markets, pop-ups. Your phone is your POS.
            </p>
            
            {/* Illustration - multiple merchant types */}
            <div className="mt-auto relative">
              <div className="flex flex-wrap gap-3">
                <div className="bg-white rounded-xl p-3 shadow-md transform -rotate-3">
                  <span className="text-2xl">☕</span>
                  <p className="text-xs text-gray-600 mt-1">Café</p>
                </div>
                <div className="bg-yellow-100 rounded-xl p-3 shadow-md transform rotate-2">
                  <span className="text-2xl">🚚</span>
                  <p className="text-xs text-gray-600 mt-1">Food Truck</p>
                </div>
                <div className="bg-green-100 rounded-xl p-3 shadow-md transform -rotate-2">
                  <span className="text-2xl">🥬</span>
                  <p className="text-xs text-gray-600 mt-1">Market</p>
                </div>
                <div className="bg-purple-100 rounded-xl p-3 shadow-md transform rotate-3">
                  <span className="text-2xl">🎨</span>
                  <p className="text-xs text-gray-600 mt-1">Pop-up</p>
                </div>
                <div className="bg-blue-100 rounded-xl p-3 shadow-md transform -rotate-1">
                  <span className="text-2xl">💻</span>
                  <p className="text-xs text-gray-600 mt-1">Online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 - Right: Two stacked cards (like "Stay in the loop") */}
          <div className="flex flex-col gap-4">
            {/* Self custody card */}
            <div className="bg-[#F0FDF4] rounded-[2rem] p-8 flex-1">
              <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-3">
                True self-custody
              </h3>
              <p className="text-navy/60 mb-4">
                We never touch your funds. Bitcoin goes directly to your wallet. You control your keys.
              </p>
              {/* Mini notification style */}
              <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-navy text-sm">Payment received!</p>
                  <p className="text-xs text-gray-500">0.00042 BTC → Your wallet</p>
                </div>
              </div>
            </div>

            {/* Works offline card */}
            <div className="bg-[#FDF4FF] rounded-[2rem] p-8 flex-1">
              <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-3">
                Works offline
              </h3>
              <p className="text-navy/60 mb-4">
                Bad signal? No problem. Numo uses Cashu ecash. Payments sync when you&apos;re back online.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-white rounded-full text-navy text-xs font-medium shadow-sm">
                  📴 No WiFi needed
                </span>
                <span className="px-3 py-1.5 bg-white rounded-full text-navy text-xs font-medium shadow-sm">
                  🔄 Auto-sync
                </span>
              </div>
            </div>
          </div>

          {/* Row 3 - Full width CTA (like "Have Fun!") */}
          <div className="bg-[#FFFBEB] rounded-[2rem] p-8 md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-2">
                  Zero platform fees
                </h3>
                <p className="text-navy/60">
                  Keep 100% of what you earn. No 2.9% + 30¢. Just tiny Bitcoin network fees.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center">
                  <span className="text-3xl">💰</span>
                </div>
                <a href="#get-started" className="px-6 py-3 bg-navy rounded-full text-white font-medium hover:bg-navy/80 transition-colors">
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
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-[0.85] mb-4">
            SUPPORTED WALLETS
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Works with any Cashu-compatible wallet. More wallets adding support every day.
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-navy" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.62 8.45c-3.45-3.45-9.04-3.45-12.49 0a.996.996 0 001.41 1.41c2.66-2.66 6.99-2.66 9.67 0a.996.996 0 101.41-1.41z"/>
                <path d="M17.79 11.28a5.467 5.467 0 00-7.72 0 .996.996 0 001.41 1.41 3.488 3.488 0 014.9 0 .996.996 0 101.41-1.41z"/>
                <circle cx="13.93" cy="15.93" r="2"/>
              </svg>
            </div>
            <span className="text-sm text-navy font-medium">Tap-to-Pay (NFC)</span>
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {wallets.map((wallet, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all hover:scale-105 ${
                wallet.nfc 
                  ? "bg-mint/10 border-mint" 
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {/* Wallet icon placeholder */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-medium">
                  {wallet.name.charAt(0)}
                </span>
              </div>
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
          ))}
          
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
      <div className="max-w-6xl mx-auto px-6">
        {/* First Row - Phone left, Text right */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          {/* Phone Mockup */}
          <div className="flex justify-center md:justify-start">
            <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                <div className="bg-gradient-to-b from-mint/10 to-white h-full p-6">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                  
                  {/* Numo POS Interface */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-navy rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl font-display">N</span>
                    </div>
                    <p className="font-display text-navy text-lg mb-1">NUMO POS</p>
                    <p className="text-xs text-gray-400">Ready to accept payments</p>
                  </div>
                  
                  {/* Payment card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4">
                    <p className="text-xs text-gray-400 mb-2">AMOUNT DUE</p>
                    <p className="font-display text-4xl text-navy leading-none mb-2">$42.00</p>
                    <p className="text-sm text-mint-dark">≈ 43,268 sats</p>
                  </div>
                  
                  {/* Tap indicator */}
                  <div className="flex justify-center mt-8">
                    <div className="w-20 h-20 rounded-full bg-yellow/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-yellow flex items-center justify-center">
                        <svg className="w-7 h-7 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-4">Tap your phone to pay</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-6">
              Bitcoin payments<br/>
              made simple
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              No QR codes to scan. No addresses to copy. Just tap your phone and go. 
              Bitcoin payments should feel as normal as using a credit card.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Tap-to-Pay, Just Like Apple Pay</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Instant Settlement, No Chargebacks</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Self-Custody, Your Keys, Your Bitcoin</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row - Text left, Phone right */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-6">
              Your phone is<br/>
              your POS
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Accept Bitcoin payments anywhere. Coffee shops, food trucks, farmers markets, pop-ups. 
              Set up takes seconds. Start accepting payments immediately.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Works Offline, Syncs When Online</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Zero Platform Fees, Keep 100%</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Set Up in Seconds, Start Accepting Now</span>
              </li>
            </ul>
          </div>
          
          {/* Phone Mockup */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                <div className="bg-gradient-to-b from-white to-gray-50 h-full p-6">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                  
                  {/* Success screen */}
                  <div className="text-center mt-12">
                    <div className="w-24 h-24 bg-mint rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-display text-navy text-2xl mb-2">PAYMENT RECEIVED</p>
                    <p className="font-display text-4xl text-navy mb-4">$42.00</p>
                    <p className="text-sm text-gray-500 mb-8">≈ 43,268 sats</p>
                    
                    {/* Transaction details */}
                    <div className="bg-gray-50 rounded-xl p-4 text-left">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">Transaction ID</span>
                        <span className="text-xs text-gray-600 font-mono">abc123...</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Status</span>
                        <span className="text-xs text-mint-dark font-medium">Confirmed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      a: "They just need any Bitcoin wallet that supports NFC payments. Most modern Bitcoin wallets do. They tap, they pay, done.",
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
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Fully rounded FAQ container */}
        <div className="bg-gray-100 rounded-[3rem] p-8 md:p-12">
          <h2 className="font-display text-4xl md:text-5xl text-navy text-center mb-10 leading-[0.85]">
            OUR FAQS
          </h2>
          
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full py-5 flex items-center justify-between text-left group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-display text-lg md:text-xl text-navy pr-6 group-hover:text-navy/70 transition-colors">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-navy/30 flex items-center justify-center group-hover:border-navy group-hover:bg-navy transition-colors">
                    <span className={`text-navy/50 group-hover:text-white text-lg leading-none transition-all ${openIndex === index ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="pb-5 text-gray-500 leading-relaxed pr-16">
                    {faq.a}
                  </div>
                )}
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
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.9] mb-6">
          START ACCEPTING<br/>
          BITCOIN TODAY.
        </h2>
        <p className="text-white/40 mb-8">Free to download. Free to use. No fees, ever.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
          <a href="#" className="flex items-center justify-center gap-2 px-6 py-3 bg-mint rounded-full text-navy font-medium hover:bg-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
          <a href="#" className="flex items-center justify-center gap-2 px-6 py-3 border border-white/30 rounded-full text-white font-medium hover:bg-white hover:text-navy transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
