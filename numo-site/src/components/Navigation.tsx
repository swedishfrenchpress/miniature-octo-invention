"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { DownloadMenu, DOWNLOAD_APK_URL, ZAPSTORE_URL } from "./DownloadMenu";
import { Logo } from "./Logo";
import { prefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type NavItem = { label: string; href: string; id?: string };

/** On-page anchors (scroll in place on home). */
const ANCHOR_LINKS: NavItem[] = [
  { label: "Features", href: "/#features", id: "features" },
  { label: "Wallets", href: "/#wallets", id: "wallets" },
  { label: "FAQ", href: "/#faq", id: "faq" },
];

/** Dedicated routes (client-side page navigation). */
const ROUTE_LINKS: NavItem[] = [
  { label: "Setup", href: "/setup" },
  { label: "Stripe", href: "/setup/stripe" },
  { label: "Releases", href: "/releases" },
];

const SPY_IDS = ["features", "wallets", "faq"];

const GITHUB_URL = "https://github.com/cashubtc/Numo";

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
  onDark,
  mobile,
}: {
  item: NavItem;
  active: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onDark?: boolean;
  mobile?: boolean;
}) {
  const desktopClass = `inline-flex h-11 items-center rounded-control px-2.5 text-sm font-medium transition-colors duration-150 lg:px-3.5 lg:text-[0.9375rem] xl:px-4 xl:text-base ${
    onDark
      ? active
        ? "bg-white/15 text-white"
        : "text-white/85 hover:bg-white/10 hover:text-white"
      : active
        ? "bg-sunken text-navy ring-1 ring-inset ring-navy/10"
        : "text-navy/65 hover:bg-navy/[0.04] hover:text-navy"
  }`;

  const mobileClass = `flex min-h-[54px] w-full items-center justify-between text-[1.0625rem] font-medium transition-colors duration-150 ${
    active ? "text-navy" : "text-navy/70"
  }`;

  const content = mobile ? (
    <>
      <span>{item.label}</span>
      {active && (
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint ring-1 ring-navy/25" />
      )}
    </>
  ) : (
    item.label
  );

  const props = {
    href: item.href,
    onClick,
    "aria-current": active ? ((item.id ? "location" : "page") as "location" | "page") : undefined,
    className: mobile ? mobileClass : desktopClass,
  };

  return item.id ? <a {...props}>{content}</a> : <Link {...props}>{content}</Link>;
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

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);

      if (!isHome) {
        setActiveSection(null);
        return;
      }
      const line = 132;
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

  // A route link is current on its own page and the pages beneath it, unless a
  // more specific link claims the page: on /setup/stripe that is Stripe, not Setup.
  const matches = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (item: NavItem) =>
    item.id
      ? isHome && activeSection === item.id
      : matches(item.href) &&
        !ROUTE_LINKS.some((other) => other.href.length > item.href.length && matches(other.href));

  const closeMenu = () => setIsMenuOpen(false);

  const onLinkClick = (item: NavItem) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (!item.id) return;
    if (!isHome || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (scrollToSection(item.id, prefersReducedMotion() ? "auto" : "smooth")) {
      window.history.pushState(null, "", item.href);
    }
  };

  /** Transparent editorial masthead over the home video hero; solid opaque paper
   *  board everywhere else (never translucent frosted blur). */
  const onDark = isHome && !isScrolled && !isMenuOpen;
  // No rule under the bar at rest, on any page. One appears only once content is
  // sliding beneath it, where it marks the edge of the bar.
  const showLine = !onDark && (isScrolled || isMenuOpen);

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        onDark
          ? "border-transparent bg-transparent"
          : `bg-paper ${showLine ? "border-line" : "border-transparent"}`
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-4 md:h-[84px]">
        <Link
          href="/"
          aria-label="Numo home"
          className="-ml-1.5 flex h-12 shrink-0 items-center rounded-control px-1.5"
        >
          <Logo tone={onDark ? "inverse" : "ink"} size="lg" />
        </Link>

        {/* Desktop rail: anchors | hairline | dedicated pages */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-0.5">
            {ANCHOR_LINKS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isActive(item)}
                onClick={onLinkClick(item)}
                onDark={onDark}
              />
            ))}
          </div>

          <span
            aria-hidden="true"
            className={`mx-1.5 h-5 w-px lg:mx-3 ${onDark ? "bg-white/25" : "bg-line-strong"}`}
          />

          <div className="flex items-center gap-0.5">
            {ROUTE_LINKS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isActive(item)}
                onClick={onLinkClick(item)}
                onDark={onDark}
              />
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden h-11 items-center gap-2 rounded-control px-3 text-[0.9375rem] font-medium transition-colors duration-150 lg:inline-flex xl:px-3.5 xl:text-base ${
              onDark
                ? "text-white/85 hover:bg-white/10 hover:text-white"
                : "text-navy/65 hover:bg-navy/[0.04] hover:text-navy"
            }`}
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
            GitHub
          </a>

          {/* Over the hero, keep nav Download quiet so the hero's Fresh Paint Mint
              primary button owns the viewport; once scrolled, flip to solid navy.
              Below 360px there is no room for it beside the menu button, and the
              menu carries both downloads, so it steps aside. */}
          <div className={onDark ? "hidden md:block" : "hidden min-[360px]:block"}>
            <DownloadMenu variant={onDark ? "ghost-inverse" : "primary"} size="md" align="right" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-control transition-colors duration-150 md:hidden ${
              onDark ? "text-white hover:bg-white/10" : "text-navy hover:bg-navy/[0.05]"
            }`}
          >
            <span className="relative block h-3.5 w-[22px]" aria-hidden="true">
              <span
                className={`absolute inset-x-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-[var(--ease-smooth)] ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute inset-x-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-[var(--ease-smooth)] ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile disclosure panel */}
      <div
        id="mobile-menu"
        className={`grid bg-paper transition-[grid-template-rows,visibility] duration-300 ease-[var(--ease-smooth)] md:hidden ${
          isMenuOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div
          ref={panelRef}
          className="overflow-hidden"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
        >
          <div className="shell pb-6">
            <ul className="border-t border-line">
              {ANCHOR_LINKS.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <NavLink item={item} active={isActive(item)} onClick={onLinkClick(item)} mobile />
                </li>
              ))}
              {ROUTE_LINKS.map((item, i) => (
                <li
                  key={item.href}
                  className={`border-b border-line ${i === 0 ? "border-t border-t-line-strong" : ""}`}
                >
                  <NavLink item={item} active={isActive(item)} onClick={onLinkClick(item)} mobile />
                </li>
              ))}
              <li className="border-b border-line">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex min-h-[54px] w-full items-center gap-2.5 text-[1.0625rem] font-medium text-navy/70"
                >
                  <GitHubIcon className="h-[18px] w-[18px]" />
                  GitHub
                </a>
              </li>
            </ul>

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Button href={DOWNLOAD_APK_URL} variant="primary" external className="w-full">
                Download APK (GitHub)
              </Button>
              <Button href={ZAPSTORE_URL} variant="secondary" external className="w-full">
                Get it on Zapstore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
