"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { prefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type NavItem = { label: string; href: string; id?: string };

/** The bar itself: two on-page anchors, then the pages. */
const BAR_LINKS: NavItem[] = [
  { label: "Features", href: "/#features", id: "features" },
  { label: "Wallets", href: "/#wallets", id: "wallets" },
  { label: "BTCPay", href: "/btcpay" },
  { label: "Setup", href: "/setup" },
  { label: "Releases", href: "/releases" },
];

/** The mobile panel has room for every destination, in page order. */
const PANEL_LINKS: NavItem[] = [
  { label: "Features", href: "/#features", id: "features" },
  { label: "Wallets", href: "/#wallets", id: "wallets" },
  { label: "FAQ", href: "/#faq", id: "faq" },
  { label: "BTCPay", href: "/btcpay" },
  { label: "Setup", href: "/setup" },
  { label: "Releases", href: "/releases" },
];

/** Sections the scroll spy tracks. Order matters: the last one whose top has
 *  passed the bar wins, so the FAQ releases the Wallets highlight. */
const SPY_IDS = ["features", "wallets", "faq"];

const GITHUB_URL = "https://github.com/cashubtc/Numo";
const DOWNLOAD_URL = "https://github.com/cashubtc/Numo/releases";

const SMOOTH = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/** Scroll an on-page section into view. `.section-anchor`'s scroll-margin-top
 *  keeps it clear of the bar. Returns false when the section isn't in the DOM yet. */
function scrollToSection(id: string, behavior: ScrollBehavior) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function NavLink({
  item,
  active,
  onClick,
  className,
}: {
  item: NavItem;
  active: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className: string;
}) {
  const props = {
    href: item.href,
    onClick,
    "aria-current": active ? ((item.id ? "location" : "page") as "location" | "page") : undefined,
    className,
  };
  // Anchors stay plain <a> so they scroll in place; routes get client-side navigation.
  return item.id ? <a {...props}>{item.label}</a> : <Link {...props}>{item.label}</Link>;
}

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const isHome = pathname === "/";

  // One rAF-batched listener drives both the hairline and the scroll spy.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);

      if (!isHome) return;
      // The line just below the bar. A section owns the nav from the moment its
      // top crosses that line until the next tracked one does. Sits clear of the
      // 76px scroll-margin so a clicked anchor registers on landing.
      const line = 100;
      let current: string | null = null;
      for (const id of SPY_IDS) {
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

  // Focus follows the menu: into the first link when it opens, back to the button
  // when it closes — but only if focus was inside the panel, so choosing a link
  // doesn't yank focus away from where the page is about to take it.
  useEffect(() => {
    if (isMenuOpen) {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      const active = document.activeElement;
      if (!active || active === document.body || panelRef.current?.contains(active)) {
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    }
    wasOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  // Arriving at /#faq from /setup or /releases, the browser can resolve the
  // fragment before the section has rendered. Re-resolve it once it exists.
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

  const isActive = (item: NavItem) =>
    item.id ? isHome && activeSection === item.id : pathname === item.href;

  const closeMenu = () => setIsMenuOpen(false);

  /** On the home page, drive the scroll ourselves so it can be smooth for people
   *  who want motion and instant for people who don't. Off the home page, let the
   *  browser navigate — the effect above finishes the job on arrival. */
  const onLinkClick = (item: NavItem) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (!item.id) return;
    if (!isHome || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (scrollToSection(item.id, prefersReducedMotion() ? "auto" : "smooth")) {
      window.history.pushState(null, "", item.href);
    }
  };

  const showLine = isScrolled || isMenuOpen;
  /** Over the home page's video hero the bar is clear glass with white lettering.
   *  Everywhere else, and as soon as the page moves, it is the paper bar. */
  const onDark = isHome && !isScrolled && !isMenuOpen;
  const linkTone = (active: boolean) =>
    onDark
      ? `hover:bg-white/10 hover:text-white ${active ? "text-white" : "text-white/80"}`
      : `hover:bg-navy/[0.05] hover:text-navy ${active ? "text-navy" : "text-navy/70"}`;

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        onDark
          ? "bg-transparent"
          : `backdrop-blur-md backdrop-saturate-150 ${isMenuOpen ? "bg-paper" : "bg-paper/80"}`
      } ${showLine ? "border-line" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center px-6">
        <Link
          href="/"
          aria-label="Numo home"
          className="-ml-1 flex h-11 shrink-0 items-center rounded-control px-1"
        >
          <Logo tone={onDark ? "inverse" : "ink"} />
        </Link>

        <div className="ml-6 hidden items-center md:flex">
          {BAR_LINKS.map((item) => {
            const active = isActive(item);
            return (
              <NavLink
                key={item.href}
                item={item}
                active={active}
                onClick={onLinkClick(item)}
                className={`inline-flex h-9 items-center rounded-chip px-3 text-sm font-medium transition-colors duration-150 ${linkTone(active)}`}
              />
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mr-1.5 hidden h-9 items-center gap-2 rounded-chip px-3 text-sm font-medium transition-colors duration-150 md:inline-flex ${linkTone(false)}`}
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>

          <Button href={DOWNLOAD_URL} variant={onDark ? "inverse" : "primary"} size="sm" external>
            Download
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`-mr-2.5 flex h-11 w-11 items-center justify-center rounded-control transition-colors duration-150 md:hidden ${
              onDark ? "text-white hover:bg-white/10" : "text-navy hover:bg-navy/[0.05]"
            }`}
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span
                className={`absolute inset-x-0 h-[1.5px] rounded-full bg-current transition-all duration-300 ${SMOOTH} ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute inset-x-0 h-[1.5px] rounded-full bg-current transition-all duration-300 ${SMOOTH} ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 md:hidden ${SMOOTH} ${
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        {/* inert keeps the collapsed links out of the tab order and the a11y tree —
            grid-rows-[0fr] hides them visually but leaves them focusable on their own. */}
        <div ref={panelRef} className="overflow-hidden" inert={!isMenuOpen}>
          <div className="mx-auto max-w-[1200px] px-6 pb-6">
            <ul className="border-t border-line">
              {PANEL_LINKS.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.href} className="border-b border-line">
                    <NavLink
                      item={item}
                      active={active}
                      onClick={onLinkClick(item)}
                      className={`flex min-h-[52px] w-full items-center text-base font-medium transition-colors duration-150 ${
                        active ? "text-navy" : "text-navy/75"
                      }`}
                    />
                  </li>
                );
              })}
              <li className="border-b border-line">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex min-h-[52px] w-full items-center gap-2.5 text-base font-medium text-navy/75"
                >
                  <GitHubIcon className="h-[18px] w-[18px]" />
                  GitHub
                </a>
              </li>
            </ul>

            <Button href={DOWNLOAD_URL} variant="primary" external className="mt-5 w-full">
              Download
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
