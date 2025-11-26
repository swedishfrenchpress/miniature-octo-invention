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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
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
    <section className="bg-mint pt-28 pb-48 relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Tagline */}
        <p className="text-navy/50 text-sm font-medium tracking-wide mb-4">MEET NUMO</p>

        {/* Main Headline */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-navy leading-[0.9] mb-8 max-w-4xl mx-auto">
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

// Combined section: Statement card floating over colored background
function StatementSection() {
  return (
    <section className="relative">
      {/* Background that extends behind the card */}
      <div className="absolute inset-0 top-40 bg-gray-100"></div>
      
      {/* Floating white card */}
      <div className="relative z-10 -mt-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-[3rem] pt-16 pb-16 px-8 border border-gray-100">
            <div className="max-w-3xl mx-auto text-center">
              {/* Cursive tagline - angled */}
              <p className="font-cursive text-2xl md:text-3xl text-navy/60 mb-8 -rotate-2">
                Numo started with one simple idea
              </p>
              
              {/* Big statement */}
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-navy leading-[0.85]">
                BITCOIN PAYMENTS
              </h2>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-navy leading-[0.85] mt-1">
                SHOULD FEEL
              </h2>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-navy leading-[0.85] mt-1">
                NORMAL.
              </h2>
              
              {/* Subtitle lines */}
              <div className="mt-10 space-y-1">
                <p className="text-navy/50 text-lg">No QR codes to scan.</p>
                <p className="text-navy/50 text-lg">No addresses to copy.</p>
                <p className="text-navy/50 text-lg">Just tap your phone and go.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* "NUMO IS FOR" content on the gray background */}
      <div className="relative z-0 bg-gray-100 pt-20 pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.85]">
            NUMO IS FOR<br/>
            EVERY MERCHANT<br/>
            WHO WANTS TO<br/>
            ACCEPT BITCOIN<br/>
            WITHOUT THE<br/>
            HASSLE.
          </h2>
        </div>
      </div>
    </section>
  );
}

// How It Works - Vertical
function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="max-w-xl mx-auto px-6">
        {/* Step 1 */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 rounded-full bg-mint text-navy font-display text-2xl flex items-center justify-center mx-auto mb-5">
            1
          </div>
          <h3 className="font-display text-3xl text-navy mb-3">ENTER AMOUNT</h3>
          <p className="text-gray-500">Type in the price. Numo shows the sats equivalent.</p>
        </div>

        {/* Connector */}
        <div className="w-px h-12 bg-gray-200 mx-auto mb-16"></div>

        {/* Step 2 */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 rounded-full bg-mint text-navy font-display text-2xl flex items-center justify-center mx-auto mb-5">
            2
          </div>
          <h3 className="font-display text-3xl text-navy mb-3">CUSTOMER TAPS</h3>
          <p className="text-gray-500">They hold their phone near yours. NFC handles the rest.</p>
        </div>

        {/* Connector */}
        <div className="w-px h-12 bg-gray-200 mx-auto mb-16"></div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-mint text-navy font-display text-2xl flex items-center justify-center mx-auto mb-5">
            3
          </div>
          <h3 className="font-display text-3xl text-navy mb-3">DONE</h3>
          <p className="text-gray-500">Payment confirms instantly. Bitcoin in your wallet.</p>
        </div>
      </div>
    </section>
  );
}

// Value Props - one centered block
function ValueProps() {
  return (
    <section className="bg-mint py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-6xl text-navy leading-[0.85]">
          INSTANT.<br/>
          WORKS OFFLINE.<br/>
          ZERO FEES.
        </h2>
        <p className="text-navy/50 text-lg mt-8 max-w-lg mx-auto">
          Bitcoin goes straight to your wallet. You hold your keys. 
          No third party ever touches your funds.
        </p>
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
      <StatementSection />
      <HowItWorks />
      <ValueProps />
      <FAQ />
      <Footer />
    </main>
  );
}
