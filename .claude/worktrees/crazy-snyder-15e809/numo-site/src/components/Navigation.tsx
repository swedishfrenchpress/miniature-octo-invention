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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on Escape, or when viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  const isLight = isScrolled || isMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "backdrop-blur-xl bg-white/90 shadow-sm border-b border-gray-200/60"
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

          {/* Desktop links */}
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

          {/* Right side — desktop CTA + mobile menu button */}
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

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={`md:hidden relative w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                isLight ? "text-navy hover:bg-navy/10" : "text-white hover:bg-white/10"
              }`}
            >
              <span className="relative block w-5 h-4" aria-hidden="true">
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-current rounded-full top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel — slides open via grid-template-rows */}
      <div
        id="mobile-menu"
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 pb-6 pt-2">
            <ul
              style={{ fontFamily: "var(--font-display)" }}
              className="flex flex-col uppercase text-lg tracking-[0.2em] font-semibold"
            >
              {NAV_LINKS.map((link) => (
                <li
                  key={link.href}
                  className="border-t border-navy/10 first:border-t-0"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 text-navy/85 hover:text-navy transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <Button
              href="https://github.com/cashubtc/Numo/releases"
              variant="dark"
              size="sm"
              external
              className="mt-5 w-full"
            >
              Download APK
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
