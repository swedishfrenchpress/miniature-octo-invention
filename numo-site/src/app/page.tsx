"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
    // y values include -50% for centering
    const stackConfigs: Record<number, { y: string; scale: number; opacity: number; zIndex: number }> = {
      [-1]: { y: 'calc(-50% + 60px)', scale: 1, opacity: 0, zIndex: 4 },      // Entering from below
      0: { y: '-50%', scale: 1, opacity: 1, zIndex: 3 },                       // Front (most visible)
      1: { y: 'calc(-50% - 12px)', scale: 0.96, opacity: 0.85, zIndex: 2 },   // Middle
      2: { y: 'calc(-50% - 24px)', scale: 0.92, opacity: 0.7, zIndex: 1 },    // Back
      3: { y: 'calc(-50% - 50px)', scale: 0.88, opacity: 0, zIndex: 0 },      // Exiting upward
    };

    const config = stackConfigs[position] || stackConfigs[3];
    
    return {
      transform: `translateY(${config.y}) scale(${config.scale})`,
      opacity: config.opacity,
      zIndex: config.zIndex,
    };
  };

  return (
    <div ref={containerRef} className="bg-mint-pale rounded-[2rem] p-6 flex-1 min-h-[320px] flex flex-col relative overflow-hidden noise-overlay">
      <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-2 text-center">
        Automatic self-custody
      </h3>
      <p className="text-lg text-gray-600 mb-2 text-center">
        Set a threshold amount. Once your ecash balance reaches it, funds automatically transfer to your Lightning address.
      </p>
      
      {/* iOS-style stacked notifications container */}
      <div className="flex-1 flex items-center justify-center">
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
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-mint hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer">
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
        
        {/* Dark overlay - adds subtle darkness to improve text readability */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
        
        {/* Gradient overlay - bottom fade only, above video but below content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-20 pointer-events-none" />
      </div>

      {/* Content - above everything */}
      <div className="max-w-5xl mx-auto px-6 text-center relative z-30">
        {/* Tagline */}
        <p className="text-white/80 text-base font-medium tracking-wide mb-4">MEET NUMO</p>

        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-8 max-w-5xl mx-auto font-bold drop-shadow-lg">
        BITCOIN PAYMENTS AS EASY AS APPLE PAY. <br></br>TAP. DONE.
        </h1>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 px-4 sm:px-0">
          <a href="https://github.com/cashubtc/Numo/releases" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-navy rounded-full text-white text-base font-medium hover:bg-white hover:text-navy hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(94,255,194,0.4)] active:scale-[0.98] transition-all duration-200 ease-out shadow-lg w-full sm:w-auto min-w-[200px] sm:min-w-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Download now
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
          <div className="bg-cream rounded-[2rem] p-8 flex flex-col relative noise-overlay">
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
            Apple Pay-like experience for Bitcoin payments.
            </p>
            
            {/* Tap to Pay Animation */}
            <div className="flex-1 flex items-center justify-center min-h-[280px] relative">
              {/* Centered animation container */}
              <div className="relative flex flex-col items-center">
                {/* Phone (horizontal/landscape) - fades in and hovers gently */}
                <div 
                  className="relative z-10 mb-3"
                  style={{
                    animation: 'phone-hover 5s ease-in-out infinite'
                  }}
                >
                  {/* Phone in landscape orientation */}
                  <div className="w-36 h-[72px] bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-2xl shadow-2xl border-2 border-[#3a3a3a] relative overflow-hidden">
                    {/* Phone screen bezel */}
                    <div className="absolute inset-1.5 bg-gradient-to-br from-[#1a1a2a] to-[#0d0d15] rounded-xl flex items-center justify-center">
                      {/* Bitcoin symbol on screen */}
                      <span className="text-[#F7931A] font-bold text-4xl drop-shadow-[0_0_12px_rgba(247,147,26,0.6)]">₿</span>
                    </div>
                    {/* Dynamic Island / Notch area */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 w-1 h-3 bg-[#1a1a1a] rounded-full"></div>
                    {/* Side button (power) */}
                    <div className="absolute -right-0.5 top-4 w-1 h-5 bg-[#4a4a4a] rounded-l"></div>
                    {/* Volume buttons */}
                    <div className="absolute -left-0.5 top-3 w-1 h-3 bg-[#4a4a4a] rounded-r"></div>
                    <div className="absolute -left-0.5 top-7 w-1 h-3 bg-[#4a4a4a] rounded-r"></div>
                  </div>
                </div>
                
                {/* NFC Signal Waves - pulse from between phone and Terminal */}
                <div 
                  className="absolute top-[72px] left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-20"
                  style={{
                    animation: 'nfc-waves-visibility 5s ease-in-out infinite'
                  }}
                >
                  {/* Wave 1 */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-[#F7931A]/60"
                    style={{
                      animation: 'nfc-pulse-1 5s ease-in-out infinite'
                    }}
                  ></div>
                  {/* Wave 2 */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-[#F7931A]/45"
                    style={{
                      animation: 'nfc-pulse-2 5s ease-in-out infinite'
                    }}
                  ></div>
                  {/* Wave 3 */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-[#F7931A]/30"
                    style={{
                      animation: 'nfc-pulse-3 5s ease-in-out infinite'
                    }}
                  ></div>
                </div>

                {/* Terminal - Black and Orange */}
                <div className="relative w-44 h-56 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-3xl shadow-2xl border-2 border-[#F7931A]/40">
                  {/* Orange accent strip at top */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F7931A] to-[#FFB84D] rounded-t-3xl"></div>
                  
                  {/* Terminal Screen - Large display */}
                  <div className="absolute top-5 left-4 right-4 h-28 bg-[#0a0a0a] rounded-2xl overflow-hidden border-2 border-[#333]">
                    {/* Screen content - shows checkmark on success */}
                    <div 
                      className="absolute inset-2 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{ 
                        animation: 'pos-screen-success 5s ease-in-out infinite'
                      }}
                    >
                      {/* Checkmark appears on success */}
                      <svg 
                        className="w-16 h-16 text-navy"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ 
                          animation: 'checkmark-fade-in 5s ease-in-out infinite'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Keypad area - 3x4 grid like real Terminal */}
                  <div className="absolute bottom-4 left-4 right-4 h-16 grid grid-cols-3 grid-rows-4 gap-1.5">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-[#2a2a2a] rounded-lg border border-[#F7931A]/15 shadow-inner"></div>
                    ))}
                  </div>
                  
                  {/* Orange LED indicator */}
                  <div className="absolute top-6 right-5 w-2.5 h-2.5 rounded-full bg-[#F7931A] shadow-[0_0_8px_#F7931A]"></div>
                  
                  {/* Card reader slot on right side */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[#222] rounded-l-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 1 - Right: Zero platform fees */}
          <div className="bg-mint-soft rounded-[2rem] p-8 flex flex-col relative noise-overlay">
            <div className="flex items-start justify-between mb-4 gap-4">
              <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold flex-1">
                Zero platform{" "}
                <span className="zero-slice-container">
                  <span className="zero-slice-top">fees</span>
                  <span className="zero-slice-bottom">fees</span>
                </span>
              </h3>
            </div>
            <p className="text-lg text-gray-600 mb-6">
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
                    className="font-display text-7xl md:text-8xl text-navy font-bold inline-block"
                    style={{ 
                      clipPath: 'inset(0 0 50% 0)',
                      animation: 'fee-1-slice-top 12s ease-in-out infinite'
                    }}
                  >
                    2.9%
                  </span>
                  {/* Bottom half */}
                  <span 
                    className="font-display text-7xl md:text-8xl text-navy font-bold absolute left-0 top-0"
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
                    className="font-display text-7xl md:text-8xl text-navy font-bold inline-block"
                    style={{ 
                      clipPath: 'inset(0 0 50% 0)',
                      animation: 'fee-2-slice-top 12s ease-in-out infinite'
                    }}
                  >
                    30¢
                  </span>
                  {/* Bottom half */}
                  <span 
                    className="font-display text-7xl md:text-8xl text-navy font-bold absolute left-0 top-0"
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
          </div>

          {/* Row 2 - Left: Works Offline with animation */}
          <div className="bg-cream-warm rounded-[2rem] p-8 flex flex-col relative noise-overlay">
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
                   
                   {/* Home indicator - Removed Thunderbolt */}
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

              {/* Android Terminal - larger, handheld style */}
              <div className="relative flex-shrink-0 z-10">
                {/* Terminal body - significantly bigger handheld terminal */}
                <div className="w-28 h-48 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-2xl relative shadow-2xl">
                  {/* Screen bezel */}
                  <div className="absolute top-4 left-3 right-3 bg-[#0d0d0d] rounded-xl overflow-hidden" style={{ height: '100px' }}>
                    {/* Terminal screen - animates to green on success */}
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
                
                {/* Terminal base/handle */}
                <div className="w-16 h-5 bg-gradient-to-b from-[#3d3d3d] to-[#252525] rounded-b-xl mx-auto -mt-0.5 shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Row 2 - Right: Two stacked cards */}
          <div className="flex flex-col gap-4">
            {/* Self custody card with animated toasts */}
            <AutoCustodyBento />

            {/* Works offline card */}
            <div className="bg-gray-100 rounded-[2rem] p-8 flex-1 relative noise-overlay">
              <h3 className="font-display text-4xl md:text-5xl text-navy leading-[0.9] font-bold mb-3">
                Fully open-source and free
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                No vendor lock-in, no hidden fees, no subscriptions. You own your payment infrastructure.
              </p>
            </div>
          </div>

          {/* Row 3 - Full width CTA */}
          <div className="bg-cream rounded-[2rem] p-8 md:col-span-2 relative noise-overlay">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] font-bold mb-2">
                  Instant settlement
                </h3>
                <p className="text-lg text-gray-600">
                  Settlement in seconds, not days. No chargebacks, no holds or waiting for funds to clear.
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
    { name: "Minibits", image: "/wallets/minibits.jpg" },
    { name: "Phoenix", image: "/wallets/phoenix.jpg" },
  ];

  // Lightning wallets (standard support)
  const lightningWallets = [
    { name: "Alby", image: "/wallets/albygo.webp" },
    { name: "Blink Wallet", image: "/wallets/blinkwallet.jpg" },
    { name: "Boardwalk Cash", image: "/wallets/boardwalkcash.jpg" },
    { name: "Cash App", image: "/wallets/cashapp.svg" },
    { name: "Fedi", image: "/wallets/fedi.jpg" },
    { name: "Muun", image: "/wallets/muun.png" },
    { name: "Strike", image: "/wallets/strike.png" },
    { name: "Wallet of Satoshi", image: "/wallets/walletofsatoshi.png" },
    { name: "Zeus", image: "/wallets/zeus.jpg" },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bento-style container */}
        <div className="bg-cream rounded-[2rem] p-8 md:p-12 relative noise-overlay">
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
            
            {/* NFC Wallet Cards */}
            <div className="flex flex-wrap justify-center gap-3">
              {nfcWallets.map((wallet, index) => (
                <div 
                  key={index} 
                  className="relative flex items-center gap-3 bg-white rounded-full px-4 py-2.5"
                >
                  {/* NFC Badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-navy flex items-center justify-center shadow-md z-10">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 14.4636 23.222" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1019 11.6159C14.1019 7.48502 12.8129 3.63737 10.5179 0.453773C9.81482-0.532555 8.37928 0.32682 9.141 1.35221C11.2797 4.29166 12.4222 7.83659 12.4222 11.6159C12.4222 15.3952 11.2699 18.9303 9.141 21.8698C8.39881 22.8854 9.78553 23.7936 10.5179 22.778C12.8129 19.5846 14.1019 15.737 14.1019 11.6159Z" fill="white" fillOpacity="0.85"/>
                      <path d="M8.77967 11.6159C8.77967 8.54948 7.81287 5.66862 6.07459 3.33463C5.29334 2.28971 3.93592 3.29557 4.66834 4.2526C6.26014 6.34245 7.10975 8.89127 7.10975 11.6159C7.10975 14.3405 6.26014 16.8893 4.66834 18.9792C3.93592 19.9362 5.29334 20.9421 6.07459 19.8874C7.81287 17.5534 8.77967 14.6823 8.77967 11.6159Z" fill="white" fillOpacity="0.85"/>
                      <path d="M3.47693 11.6159C3.47693 9.60416 2.78357 7.72916 1.55311 6.26432C0.742558 5.30729-0.439082 6.39127 0.166386 7.17252C1.34803 8.6569 1.79725 9.89713 1.79725 11.6159C1.79725 13.3346 1.34803 14.5749 0.166386 16.0592C-0.429317 16.8307 0.752324 17.9049 1.55311 16.9577C2.78357 15.5026 3.47693 13.6276 3.47693 11.6159Z" fill="white" fillOpacity="0.85"/>
                    </svg>
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
          {/* Video - Column 1 */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <video
                src="/ln-checkout.mp4"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload"
                className="w-full h-full object-cover rounded-lg"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </div>
          
          {/* Text Content - Column 2 */}
          <div>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-6 font-bold">
              Lightning and ecash, unified
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Numo isn&apos;t just an ecash app—it&apos;s both. Ecash unlocks the optimal tap-to-pay experience. 
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
                <span className="text-lg text-navy">Export sales reports by item.</span>
              </li>
            </ul>
          </div>
          
          {/* Video - Column 2, aligns with top text column */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <video
                src="/cart.mp4"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload"
                className="w-full h-full object-cover rounded-lg"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </div>
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
    <div className="relative w-[300px] h-[600px] bg-[#1a1a1a] rounded-[3rem] shadow-2xl border-[8px] border-[#333] mx-auto transform hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
      {/* Dynamic Island / Speaker */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30"></div>

      {/* Screen Area - Explicit white background and full coverage */}
      <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden flex flex-col z-10">
        {/* Status Bar */}
        <div className="h-14 w-full flex justify-between items-center px-6 pt-3 bg-white z-20">
           <span className="text-sm font-bold text-gray-800">9:41</span>
           <div className="flex gap-1.5">
             <div className="w-5 h-3 bg-gray-800 rounded-[1px]"></div>
             <div className="w-0.5 h-3 bg-gray-800 rounded-[1px]"></div>
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
               <div className="text-5xl font-bold text-[#0A2540]">$21.00</div>
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
                 <span className="font-display font-bold text-navy text-xl">N</span>
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
               <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5 transition-transform duration-400 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step === 'success' ? 'scale-100' : 'scale-[0.9]'}`}>
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

// Recreated BTCPay Server Interface Component
function BTCPayInterface({ paymentStatus }: { paymentStatus: 'pending' | 'paid' | null }) {
  // Only show the new row if paymentStatus is not null
  const showNewRow = paymentStatus !== null;
  const isPaid = paymentStatus === 'paid';

  const invoices = [
    { date: "02/28/2026 3:05 PM", orderId: "PAY_REQUEST_cd4...", invoiceId: "EgxBnrivdT...", status: "Paid", amount: "0.00006150 BTC" },
    { date: "02/28/2026 12:39 PM", orderId: "PAY_REQUEST_a9f...", invoiceId: "aP9FZtE3QK...", status: "Paid", amount: "0.00248731 BTC" },
    { date: "02/28/2026 10:12 PM", orderId: "PAY_REQUEST_7d4...", invoiceId: "C5pNQZ6dWv...", status: "Paid", amount: "0.00090384 BTC" },
    { date: "02/28/2026 08:09 PM", orderId: "PAY_REQUEST_f3b...", invoiceId: "WnZxQFJ5A6...", status: "Paid", amount: "0.01572946 BTC" },
    { date: "02/27/2026 10:46 PM", orderId: "PAY_REQUEST_0c8...", invoiceId: "U8N9x5ZC2F...", status: "Paid", amount: "0.00001892 BTC" },
  ];

  return (
    <div className="bg-[#f8f9fa] rounded-lg shadow-xl overflow-hidden font-sans border border-gray-200 flex text-xs md:text-sm select-none h-[640px]">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#f8f9fa] border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center justify-between mb-2">
           <div className="flex items-center">
             <Image src="/btcpay-logo.svg" alt="BTCPay Server" width={100} height={28} />
           </div>
           <div className="relative cursor-pointer">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute -top-1.5 -right-1.5 bg-[#dc3545] text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-bold px-1 border-2 border-[#f8f9fa]">15</span>
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
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Wallets</p>
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
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Payments</p>
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
      <div className="flex-1 flex flex-col min-w-0 bg-white md:bg-[#f8f9fa]">
         <div className="p-4 md:p-8 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between gap-4 mb-6">
               <div className="flex items-center gap-2">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-800">Invoices</h2>
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
                                <div className="max-w-[120px] truncate">PAY_REQUEST_NEW</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 font-mono text-[11px] align-middle whitespace-nowrap hidden sm:table-cell">
                                <div className="max-w-[120px] truncate">PENDING...</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap align-middle">
                                 {isPaid ? (
                                    <span className="bg-[#d4edda] text-[#155724] px-2 py-1 rounded text-[11px] font-bold">Paid</span>
                                 ) : (
                                    <span className="bg-[#fff3cd] text-[#856404] px-2 py-1 rounded text-[11px] font-bold">Processing</span>
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
                       {invoices.map((inv, i) => (
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
                                   <span className="bg-[#fff3cd] text-[#856404] px-2 py-1 rounded text-[11px] font-bold">Processing</span>
                                ) : (
                                   <span className="bg-[#d4edda] text-[#155724] px-2 py-1 rounded text-[11px] font-bold">Paid</span>
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
    <section ref={sectionRef} className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.9] mb-6 font-bold">
            BTCPay Server x Numo Integration
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A direct integration between BTCPay Server and Numo is currently under development. Coming soon.
          </p>
        </div>

        {/* Integration Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
           {/* Left: BTCPay UI */}
           <div className="w-full">
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
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Numo?",
      a: "Numo is a Bitcoin (point of sale) app that lets you accept Bitcoin payments with a simple tap. Your customers use NFC to pay, just like Apple Pay or Google Pay, but it's all Bitcoin.",
    },
    {
      q: "Do my customers need a special app?",
      a: "They just need a Bitcoin Lightning wallet and Numo will work. If they want to take advantage of the tap-to-pay UX, they'll need a compatible Cashu wallet.",
    },
    {
      q: "Do I need any extra hardware?",
      a: "No. All you need is an Android phone that supports NFC.",
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
      a: (
        <>
          You can download the official{" "}
          <a 
            href="https://github.com/cashubtc/Numo/releases" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-navy underline hover:text-navy/70 transition-colors"
          >
            APK release
          </a>{" "}
          from the Numo GitHub repository. Once downloaded, set up your wallet and you&apos;re ready to accept Bitcoin payments.
        </>
      ),
    },
    {
      q: "Can I download Numo on the Google Play Store?",
      a: "Numo will be available on the Google Play Store soon. We will update this website once it's available on the Google Play Store.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Fully rounded FAQ container */}
        <div className="bg-cream rounded-[3rem] p-8 md:p-12 relative noise-overlay">
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
                  <span className="font-display text-xl md:text-2xl text-navy pr-6 group-hover:text-navy/70 transition-colors duration-150">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-navy/30 flex items-center justify-center group-hover:border-navy group-hover:bg-navy transition-all duration-200 active:scale-95">
                    <span className={`text-navy/50 group-hover:text-white text-xl leading-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${openIndex === index ? "rotate-45" : ""}`}>
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
                    <div className="pb-5 text-lg text-gray-600 leading-relaxed pr-16">
                      {faq.a}
                    </div>
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
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 px-4 sm:px-0">
          <a href="https://github.com/cashubtc/Numo/releases" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-mint rounded-full text-navy text-base font-medium hover:bg-white hover:text-navy hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out shadow-lg w-full sm:w-auto min-w-[200px] sm:min-w-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Download now
          </a>
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
          
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://cashu.space/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white text-sm font-medium transition-colors"
            >
              Visit Cashu.space
            </a>
            <span className="text-white/20">·</span>
            <a 
              href="https://x.com/cashubtc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
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
              className="text-white/50 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
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
          className="font-grandstander text-[6rem] sm:text-[6rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] text-white/10 leading-none w-full text-center break-words"
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
    <main>
      <Navigation />
      <Hero />
      <BentoFeatures />
      <SupportedWallets />
      <SimpleFeatures />
      <BTCPayIntegration />
      <FAQ />
      <Footer />
      </main>
  );
}
