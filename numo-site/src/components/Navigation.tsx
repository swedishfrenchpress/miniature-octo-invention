"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Wallets", href: "/#wallets" },
  { label: "Integration", href: "/#integration" },
  { label: "FAQ", href: "/#faq" },
  { label: "Releases", href: "/releases" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/85 shadow-sm border-b border-gray-200/60"
          : "bg-gradient-to-b from-black/55 via-black/30 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="/"
            className="w-12 h-12 rounded-lg flex items-center justify-center bg-mint hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-sm"
            aria-label="Numo home"
          >
            <span className="text-2xl font-display font-bold text-navy">N</span>
          </a>

          {/* Links */}
          <div
            style={{ fontFamily: "var(--font-display)" }}
            className={`hidden md:flex items-center gap-7 lg:gap-9 uppercase text-[15px] lg:text-[16px] tracking-[0.22em] font-semibold absolute left-1/2 -translate-x-1/2 ${
              isScrolled ? "text-navy/80" : "text-white/95"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isScrolled ? "hover:text-navy" : "hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button
              href="https://github.com/cashubtc/Numo/releases"
              variant="dark"
              size="sm"
              external
              className="hidden sm:inline-flex"
            >
              Download APK
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
