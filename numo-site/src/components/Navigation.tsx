"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";

/** On-page anchors. Order matters — the scroll spy takes the last one whose top has passed the bar. */
const SECTION_LINKS = [
  { label: "Features", href: "/#features", id: "features" },
  { label: "Wallets", href: "/#wallets", id: "wallets" },
  { label: "Integration", href: "/#integration", id: "integration" },
  { label: "FAQ", href: "/#faq", id: "faq" },
];

/** Real routes. Kept visually separate from the anchors — they go somewhere else. */
const PAGE_LINKS = [
  { label: "Setup", href: "/setup" },
  { label: "Releases", href: "/releases" },
];

const SMOOTH = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/** Scroll an on-page section into view. `.section-anchor`'s scroll-margin-top
 *  keeps it clear of the bar. Returns false when the section isn't in the DOM yet. */
function scrollToSection(id: string, behavior: ScrollBehavior) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The scrim under the transparent bar. One long fade, so no band edge is visible over the hero video. */
const SCRIM =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.34)_40%,rgba(0,0,0,0.13)_72%,rgba(0,0,0,0)_100%)]";

type LinkTone = {
  /** True while the bar is transparent over the hero — lettering is white, the paint stroke is mint. */
  onDark: boolean;
};

function NavLink({
  href,
  label,
  active,
  onDark,
  current,
  onClick,
  className = "",
}: LinkTone & {
  href: string;
  label: string;
  active: boolean;
  current: "page" | "location";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  // The label and its paint stroke live in an inner box, so the anchor itself can
  // carry the padding that makes a 23px line of Bebas into a 44px tap target
  // without dragging the underline away from the text.
  const body = (
    <span className="relative inline-block pb-1.5">
      {label}
      {/* The coat of paint: wipes in from the left on hover, stays put on the current section.
          Mint carries over the video; on the cream board mint reads at ~1.2:1, so it paints in ink. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full transition-transform duration-200 ${SMOOTH} ${
          onDark ? "bg-mint" : "bg-navy"
        } ${
          active
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
        }`}
      />
    </span>
  );

  const classes = `group inline-flex min-h-11 items-center whitespace-nowrap transition-colors duration-200 ${
    onDark
      ? active
        ? "text-white"
        : "text-white/75 hover:text-white"
      : active
        ? "text-navy"
        : "text-navy/70 hover:text-navy"
  } ${className}`;

  // Anchors stay plain <a> so they scroll in place; routes get client-side navigation.
  return href.startsWith("/#") ? (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? current : undefined}
      className={classes}
    >
      {body}
    </a>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? current : undefined}
      className={classes}
    >
      {body}
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHome = pathname === "/";

  // One rAF-batched listener drives both the board state and the scroll spy.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 20);

      if (!isHome) return;
      // The line just below the bar. A section owns the nav from the moment its
      // top crosses that line until the next one does — so the untitled sections
      // in between don't blank the indicator out. Sits clear of the 96px
      // scroll-margin so a clicked anchor registers on landing.
      const line = 120;
      let current: string | null = null;
      for (const { id } of SECTION_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Close menu on Escape, or when the viewport grows past the mobile breakpoint.
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

  // Arriving at /#faq from /setup or /releases, the browser resolves the fragment
  // before this client tree has rendered the section, so it lands at scrollY 0 with
  // the target 5,000px below. Re-resolve it once the section actually exists.
  useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.slice(1);
    if (!id) return;

    let frame = 0;
    let attempts = 0;
    const resolve = () => {
      if (scrollToSection(id, "auto") || (attempts += 1) > 30) return;
      frame = requestAnimationFrame(resolve);
    };
    frame = requestAnimationFrame(resolve);
    return () => cancelAnimationFrame(frame);
  }, [isHome]);

  /** The bar is a painted cream board once it leaves the hero, and while the menu is open. */
  const isBoard = isScrolled || isMenuOpen;
  const onDark = !isBoard;

  const isActive = (href: string, id?: string) =>
    id ? isHome && activeSection === id : pathname === href;

  const closeMenu = () => setIsMenuOpen(false);

  /** On the home page, drive the scroll ourselves so it can be smooth for people
   *  who want motion and instant for people who don't. Off the home page, let the
   *  browser navigate — the effect above finishes the job on arrival. */
  const onAnchorClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (!isHome || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const id = href.slice(2);
    e.preventDefault();
    if (scrollToSection(id, prefersReducedMotion() ? "auto" : "smooth")) {
      window.history.pushState(null, "", href);
    }
  };

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${SMOOTH} ${
        isBoard
          ? "noise-overlay border-navy/10 bg-cream"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[190%] transition-opacity duration-300 ${SCRIM} ${
          isBoard ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`relative z-[2] mx-auto flex max-w-7xl items-center px-6 transition-[padding] duration-300 ${SMOOTH} ${
          isBoard ? "py-3" : "py-5"
        }`}
      >
        {/* Masthead — the mark, then the name. The mark stands on its own below lg. */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Numo home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint shadow-sm transition-transform duration-200 group-hover:scale-[1.04] group-active:scale-[0.97]">
            {/* Bebas sits its caps high in the line box, so centring the box leaves the
                glyph 0.05em above the square's true middle. Both halves of the lockup
                carry the same correction, which keeps them on one line. */}
            <span className="translate-y-[0.05em] font-display text-[2.5rem] leading-none text-navy">
              N
            </span>
          </span>
          {/* Same box as the chip — h-11 centring an identical inline glyph — so the
              wordmark lands on the mark's optical centre instead of its line box. */}
          <span className="hidden h-11 items-center lg:flex">
            <span
              className={`translate-y-[0.05em] font-display text-[2.5rem] leading-none tracking-[0.01em] transition-colors duration-300 ${
                onDark ? "text-white" : "text-navy"
              }`}
            >
              Numo
            </span>
          </span>
        </Link>

        {/* The rail. Anchors first, then a hairline, then the pages that actually go somewhere. */}
        <div
          className="ml-5 hidden items-center gap-3 font-display text-[1.2rem] tracking-[0.06em] md:flex lg:ml-8 lg:gap-5 lg:text-[1.5rem] lg:tracking-[0.09em] xl:ml-10 xl:gap-7 xl:text-[1.7rem] xl:tracking-[0.11em]"
        >
          {SECTION_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href, link.id)}
              current="location"
              onDark={onDark}
              onClick={onAnchorClick(link.href)}
            />
          ))}

          <span
            aria-hidden="true"
            className={`mx-1 h-4 w-px shrink-0 transition-colors duration-300 lg:mx-2 ${
              onDark ? "bg-white/30" : "bg-navy/20"
            }`}
          />

          {PAGE_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
              current="page"
              onDark={onDark}
            />
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 pl-4">
          {/* Wrapper, not a `hidden` class on the Button — the Button's own
              `inline-flex` wins the cascade and the header CTA leaks onto mobile. */}
          <div className="hidden sm:block">
            <Button
              href="https://github.com/cashubtc/Numo/releases"
              variant={isBoard ? "dark" : "accent"}
              size="sm"
              external
            >
              Download APK
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`relative flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200 md:hidden ${
              isBoard ? "text-navy hover:bg-navy/10" : "text-white hover:bg-white/15"
            }`}
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 right-0 h-0.5 rounded-full bg-current transition-all duration-300 ${SMOOTH} ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 rounded-full bg-current transition-all duration-300 ${SMOOTH} ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel — same board, links stepped up to signage scale. */}
      <div
        id="mobile-menu"
        className={`relative z-[2] grid transition-[grid-template-rows] duration-300 md:hidden ${SMOOTH} ${
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        {/* inert keeps the collapsed links out of the tab order and the a11y tree —
            grid-rows-[0fr] hides them visually but leaves them focusable on their own. */}
        <div className="overflow-hidden" inert={!isMenuOpen}>
          <div className="mx-auto max-w-7xl px-6 pb-6">
            <ul className="font-display text-[1.6rem] tracking-[0.1em]">
              {SECTION_LINKS.map((link) => (
                <li key={link.href} className="border-t border-navy/10 first:border-t-0">
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={isActive(link.href, link.id)}
                    current="location"
                    onDark={false}
                    onClick={onAnchorClick(link.href)}
                    className="w-full min-h-14"
                  />
                </li>
              ))}
              {PAGE_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  className={`border-t ${i === 0 ? "border-navy/25" : "border-navy/10"}`}
                >
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={isActive(link.href)}
                    current="page"
                    onDark={false}
                    onClick={closeMenu}
                    className="w-full min-h-14"
                  />
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
