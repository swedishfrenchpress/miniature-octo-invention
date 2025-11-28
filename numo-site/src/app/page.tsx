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
          <a href="#" className="flex items-center gap-3 px-8 py-4 bg-navy rounded-full text-white text-base font-medium hover:bg-white hover:text-navy hover:scale-105 transition-all shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Github
          </a>
          <a href="#" className="flex items-center gap-3 px-8 py-4 bg-[#34C759] rounded-full text-white text-base font-medium hover:bg-white hover:text-[#34C759] hover:scale-105 transition-all shadow-lg">
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
            <div className="flex items-start justify-between mb-4 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                TAP TO PAY<br/>
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 14.4636 23.222" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1019 11.6159C14.1019 7.48502 12.8129 3.63737 10.5179 0.453773C9.81482-0.532555 8.37928 0.32682 9.141 1.35221C11.2797 4.29166 12.4222 7.83659 12.4222 11.6159C12.4222 15.3952 11.2699 18.9303 9.141 21.8698C8.39881 22.8854 9.78553 23.7936 10.5179 22.778C12.8129 19.5846 14.1019 15.737 14.1019 11.6159Z" fill="white" fillOpacity="0.85"/>
                    <path d="M8.77967 11.6159C8.77967 8.54948 7.81287 5.66862 6.07459 3.33463C5.29334 2.28971 3.93592 3.29557 4.66834 4.2526C6.26014 6.34245 7.10975 8.89127 7.10975 11.6159C7.10975 14.3405 6.26014 16.8893 4.66834 18.9792C3.93592 19.9362 5.29334 20.9421 6.07459 19.8874C7.81287 17.5534 8.77967 14.6823 8.77967 11.6159Z" fill="white" fillOpacity="0.85"/>
                    <path d="M3.47693 11.6159C3.47693 9.60416 2.78357 7.72916 1.55311 6.26432C0.742558 5.30729-0.439082 6.39127 0.166386 7.17252C1.34803 8.6569 1.79725 9.89713 1.79725 11.6159C1.79725 13.3346 1.34803 14.5749 0.166386 16.0592C-0.429317 16.8307 0.752324 17.9049 1.55311 16.9577C2.78357 15.5026 3.47693 13.6276 3.47693 11.6159Z" fill="white" fillOpacity="0.85"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Tap-to-pay for Cashu wallets. Skip the QR codes and Lightning invoices—unless you prefer them.
            </p>
          </div>

          {/* Row 1 - Right: Instant settlement */}
          <div className="bg-mint-soft rounded-[2rem] p-8 flex flex-col">
            <div className="flex items-start justify-between mb-4 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                Instant settlement
              </h3>
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

          {/* Row 2 - Left: Works Offline with animation */}
          <div className="bg-cream-warm rounded-[2rem] p-8 flex flex-col">
            <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-4">
              Works offline
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Bad signal? No problem. Numo uses Cashu ecash. Payments sync when you&apos;re back online.
            </p>
            
            {/* Offline payment animation - centered vertically and horizontally */}
            <div className="flex-1 flex items-center justify-center gap-6">
              {/* iPhone with airplane mode - larger */}
              <div className="relative flex-shrink-0 z-10">
                {/* iPhone frame - significantly bigger */}
                <div className="w-28 h-56 bg-[#1a1a2e] rounded-[1.5rem] relative overflow-hidden shadow-2xl border-[4px] border-[#2a2a3e]">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10"></div>
                  
                  {/* iPhone screen */}
                  <div className="absolute inset-[4px] bg-gradient-to-b from-[#1e1e3f] to-[#12122a] rounded-[1.2rem] flex items-center justify-center">
                    {/* Airplane mode icon - just the icon, no text */}
                    <div className="w-20 h-20 rounded-full bg-[#FF9500] flex items-center justify-center shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-white/30 rounded-full"></div>
                </div>
                
                {/* No WiFi badge */}
                <div className="absolute -top-2 -right-2 w-9 h-9 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-lg border-[3px] border-white z-20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              {/* Money flying animation - staggered trail with more space */}
              <div className="relative h-32 w-[180px] overflow-visible">
                {/* Bill 1 - Orange Bitcoin ₿ */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ animation: 'money-fly-1 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                >
                  <div className="w-16 h-9 bg-gradient-to-r from-[#F7931A] to-[#FFB84D] rounded shadow-lg flex items-center justify-center border border-[#FFB84D]/30">
                    <span className="text-white font-bold text-lg drop-shadow-md">₿</span>
                  </div>
                </div>
                
                {/* Bill 2 - Green $ */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ animation: 'money-fly-2 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                >
                  <div className="w-14 h-8 bg-gradient-to-r from-[#34C759] to-[#5DD97C] rounded shadow-lg flex items-center justify-center border border-[#5DD97C]/30">
                    <span className="text-white font-bold text-base drop-shadow-md">$</span>
                  </div>
                </div>
                
                {/* Bill 3 - Orange Bitcoin ₿ */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ animation: 'money-fly-3 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                >
                  <div className="w-15 h-8 bg-gradient-to-r from-[#F7931A] to-[#FFCC66] rounded shadow-lg flex items-center justify-center border border-[#FFCC66]/30">
                    <span className="text-white font-bold text-base drop-shadow-md">₿</span>
                  </div>
                </div>
                
                {/* Bill 4 - Green $ */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ animation: 'money-fly-4 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                >
                  <div className="w-14 h-8 bg-gradient-to-r from-[#2DB84C] to-[#4ADE80] rounded shadow-lg flex items-center justify-center border border-[#4ADE80]/30">
                    <span className="text-white font-bold text-base drop-shadow-md">$</span>
                  </div>
                </div>
                
                {/* Bill 5 - Orange Bitcoin ₿ */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ animation: 'money-fly-5 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                >
                  <div className="w-15 h-8 bg-gradient-to-r from-[#E8850F] to-[#F7931A] rounded shadow-lg flex items-center justify-center border border-[#F7931A]/30">
                    <span className="text-white font-bold text-base drop-shadow-md">₿</span>
                  </div>
                </div>
              </div>

              {/* Android POS Terminal - larger, handheld style */}
              <div className="relative flex-shrink-0 z-10">
                {/* POS body - significantly bigger handheld terminal */}
                <div className="w-28 h-48 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-2xl relative shadow-2xl">
                  {/* Screen bezel */}
                  <div className="absolute top-4 left-3 right-3 bg-[#0d0d0d] rounded-xl overflow-hidden" style={{ height: '100px' }}>
                    {/* POS screen - animates to green on success */}
                    <div 
                      className="absolute inset-2 rounded-lg flex items-center justify-center"
                      style={{ animation: 'pos-success 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                    >
                      {/* Checkmark - appears when money arrives */}
                      <svg 
                        className="w-14 h-14 text-navy" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ animation: 'checkmark-appear 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Keypad area */}
                  <div className="absolute bottom-5 left-3 right-3 h-14 grid grid-cols-3 gap-1.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-[#3a3a3a] rounded-sm"></div>
                    ))}
                  </div>
                  
                  {/* Card reader slot on side */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#4a4a4a] rounded-l"></div>
                </div>
                
                {/* POS base/handle */}
                <div className="w-16 h-5 bg-gradient-to-b from-[#3d3d3d] to-[#252525] rounded-b-xl mx-auto -mt-0.5 shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Row 2 - Right: Two stacked cards */}
          <div className="flex flex-col gap-4">
            {/* Self custody card with animated toasts */}
            <AutoCustodyBento />

            {/* Works offline card */}
            <div className="bg-gray-100 rounded-[2rem] p-8 flex-1">
              <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-3">
                Fully open-source and free
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                No vendor lock-in, no hidden fees, no subscriptions. You own your payment infrastructure.
              </p>
            </div>
          </div>

          {/* Row 3 - Full width CTA */}
          <div className="bg-cream rounded-[2rem] p-8 md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-2">
                  Zero platform{" "}
                  <span className="zero-slice-container">
                    <span className="zero-slice-top">fees</span>
                    <span className="zero-slice-bottom">fees</span>
                  </span>
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
  // NFC-enabled wallets (tap-to-pay) - featured prominently
  const nfcWallets = [
    { name: "eNuts", image: "/wallets/enuts.png" },
    { name: "Sovran", image: "/wallets/sovran.jpg" },
    { name: "Macadamia", image: "/wallets/macadamia.jpg" },
    { name: "Cashu.me", image: "/wallets/cashume.png" },
  ];

  // Lightning wallets (standard support)
  const lightningWallets = [
    { name: "Alby", image: "/wallets/albygo.webp" },
    { name: "Blink Wallet", image: "/wallets/blinkwallet.jpg" },
    { name: "Boardwalk Cash", image: "/wallets/boardwalkcash.jpg" },
    { name: "Cash App", image: "/wallets/cashapp.svg" },
    { name: "Fedi", image: "/wallets/fedi.jpg" },
    { name: "Minibits", image: "/wallets/minibits.jpg" },
    { name: "Muun", image: "/wallets/muun.png" },
    { name: "Phoenix", image: "/wallets/phoenix.jpg" },
    { name: "Strike", image: "/wallets/strike.png" },
    { name: "Wallet of Satoshi", image: "/wallets/walletofsatoshi.png" },
    { name: "Zeus", image: "/wallets/zeus.jpg" },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bento-style container */}
        <div className="bg-cream rounded-[2rem] p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-4 font-bold">
              SUPPORTED WALLETS
            </h2>
            <p className="text-lg text-gray-600">
              Works with any Bitcoin Lightning wallet. Tap-to-pay available for ecash wallets.
            </p>
          </div>

          {/* NFC Wallets - Featured Section */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 14.4636 23.222" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1019 11.6159C14.1019 7.48502 12.8129 3.63737 10.5179 0.453773C9.81482-0.532555 8.37928 0.32682 9.141 1.35221C11.2797 4.29166 12.4222 7.83659 12.4222 11.6159C12.4222 15.3952 11.2699 18.9303 9.141 21.8698C8.39881 22.8854 9.78553 23.7936 10.5179 22.778C12.8129 19.5846 14.1019 15.737 14.1019 11.6159Z" fill="white" fillOpacity="0.85"/>
                  <path d="M8.77967 11.6159C8.77967 8.54948 7.81287 5.66862 6.07459 3.33463C5.29334 2.28971 3.93592 3.29557 4.66834 4.2526C6.26014 6.34245 7.10975 8.89127 7.10975 11.6159C7.10975 14.3405 6.26014 16.8893 4.66834 18.9792C3.93592 19.9362 5.29334 20.9421 6.07459 19.8874C7.81287 17.5534 8.77967 14.6823 8.77967 11.6159Z" fill="white" fillOpacity="0.85"/>
                  <path d="M3.47693 11.6159C3.47693 9.60416 2.78357 7.72916 1.55311 6.26432C0.742558 5.30729-0.439082 6.39127 0.166386 7.17252C1.34803 8.6569 1.79725 9.89713 1.79725 11.6159C1.79725 13.3346 1.34803 14.5749 0.166386 16.0592C-0.429317 16.8307 0.752324 17.9049 1.55311 16.9577C2.78357 15.5026 3.47693 13.6276 3.47693 11.6159Z" fill="white" fillOpacity="0.85"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-navy font-bold">TAP-TO-PAY</h3>
            </div>
            
            {/* NFC Wallet Cards - Premium feel */}
            <div className="flex flex-wrap justify-center gap-4">
              {nfcWallets.map((wallet, index) => (
                <div 
                  key={index} 
                  className="relative bg-white rounded-full p-4 border-2 border-navy/20"
                >
                  {/* NFC Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy flex items-center justify-center shadow-md z-10">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14.4636 23.222" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1019 11.6159C14.1019 7.48502 12.8129 3.63737 10.5179 0.453773C9.81482-0.532555 8.37928 0.32682 9.141 1.35221C11.2797 4.29166 12.4222 7.83659 12.4222 11.6159C12.4222 15.3952 11.2699 18.9303 9.141 21.8698C8.39881 22.8854 9.78553 23.7936 10.5179 22.778C12.8129 19.5846 14.1019 15.737 14.1019 11.6159Z" fill="white" fillOpacity="0.85"/>
                      <path d="M8.77967 11.6159C8.77967 8.54948 7.81287 5.66862 6.07459 3.33463C5.29334 2.28971 3.93592 3.29557 4.66834 4.2526C6.26014 6.34245 7.10975 8.89127 7.10975 11.6159C7.10975 14.3405 6.26014 16.8893 4.66834 18.9792C3.93592 19.9362 5.29334 20.9421 6.07459 19.8874C7.81287 17.5534 8.77967 14.6823 8.77967 11.6159Z" fill="white" fillOpacity="0.85"/>
                      <path d="M3.47693 11.6159C3.47693 9.60416 2.78357 7.72916 1.55311 6.26432C0.742558 5.30729-0.439082 6.39127 0.166386 7.17252C1.34803 8.6569 1.79725 9.89713 1.79725 11.6159C1.79725 13.3346 1.34803 14.5749 0.166386 16.0592C-0.429317 16.8307 0.752324 17.9049 1.55311 16.9577C2.78357 15.5026 3.47693 13.6276 3.47693 11.6159Z" fill="white" fillOpacity="0.85"/>
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Large wallet icon */}
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={wallet.image}
                        alt={wallet.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-navy text-lg">{wallet.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-navy/10"></div>
            <span className="text-sm text-gray-500 font-medium">FULLY COMPATIBLE WITH</span>
            <div className="flex-1 h-px bg-navy/10"></div>
          </div>

          {/* Lightning Wallets - Simpler presentation */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {lightningWallets.map((wallet, index) => (
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
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-6 font-bold">
              Lightning and ecash, unified
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Numo isn&apos;t just an ecash POS—it&apos;s both. Ecash unlocks the optimal tap-to-pay experience. 
              If your customers don&apos;t have an ecash wallet, Lightning payments work seamlessly. 
              You get the benefits of both systems in one platform.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cream-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-navy">Tap-to-pay with ecash wallets</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cream-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg text-navy">Full Lightning Network support</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cream-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-lg text-navy">Best of both payment systems</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row - Text left, Phone right */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* Text Content - Column 1, aligns with top image column */}
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-6 font-bold">
              Easy inventory management
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Built-in inventory management makes selling easy. Create categories for items and sizes, 
              then tap to request a pre-determined payment. Track everything you sell.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <span className="text-lg text-navy">Organize items by category and size</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-lg text-navy">Tap to request pre-determined payments</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-mint-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-lg text-navy">Export sales reports by item</span>
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
      q: "Is Numo custodial?",
      a: "Bitcoin is stored in the form of ecash on a mint. You can withdraw it to your preferred lightning wallet at any time, or you can set a threshold amount and automatically transfer funds to your Lightning address when it's reached.",
    },
    {
      q: "What if I have bad internet?",
      a: "Numo works offline too with Cashu wallets when paying cashu requests. Payments sync when you're back online. No lost sales.",
    },
    {
      q: "How do I get started?",
      a: "Download Numo from the Google Play, set up your wallet, and you're ready to accept Bitcoin payments.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Fully rounded FAQ container */}
        <div className="bg-cream rounded-[3rem] p-8 md:p-12">
          <h2 className="font-display text-5xl md:text-6xl text-navy text-center mb-10 leading-[0.9] font-bold">
            FREQUENTLY ASKED QUESTIONS
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
          <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 bg-navy rounded-full text-white text-base font-medium hover:bg-white hover:text-navy hover:scale-105 transition-all shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Github
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
