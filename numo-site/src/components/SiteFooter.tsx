"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "./DownloadMenu";

/** The shared closing panel: one rounded Signwriter's Ink object set into the
 *  page, with a margin of the page's own ground all round it. It holds the
 *  Fresh Paint Mint ask (adapted on `/setup` for merchants who have just
 *  installed), every destination, and a closing line. No rules inside it and
 *  no wordmark: space parts the groups, and the bar already carries the logo.
 *
 *  Four type roles, each with one job:
 *  - the ask: the site's h2 and lead. The lead runs to the reading measure and
 *    each sentence takes its own line, so it never breaks mid-thought.
 *  - group labels: medium weight in full white, leading their links by weight
 *    and tone, not size.
 *  - links: the labels' size, which is also the buttons' text size, in regular
 *    weight at 65% white.
 *  - the closing line: caption size, opened up a little for light on dark. */

type FooterLink = { label: string; href: string; external?: boolean };

type Ask = {
  heading: string;
  lead: string;
  primary: FooterLink;
  secondary: FooterLink;
};

const HOME_ASK: Ask = {
  heading: "Start accepting Bitcoin today.",
  lead: "Free to use, zero platform fees on Bitcoin. Any Android with NFC works.",
  primary: { label: "Download APK", href: DOWNLOAD_APK_URL, external: true },
  secondary: { label: "Get it on Zapstore", href: ZAPSTORE_URL, external: true },
};

const SETUP_ASK: Ask = {
  heading: "Next at the counter.",
  lead: "See how Numo syncs with BTCPay Server, browse what’s shipping, or check the FAQ if anything gets stuck.",
  primary: { label: "View BTCPay demo", href: "/btcpay" },
  secondary: { label: "What’s new in Numo", href: "/releases" },
};

const GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Wallets", href: "/#wallets" },
      { label: "BTCPay Server", href: "/btcpay" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Setup guide", href: "/setup" },
      { label: "Stripe guide", href: "/setup/stripe" },
      { label: "Releases", href: "/releases" },
      { label: "Download APK", href: DOWNLOAD_APK_URL, external: true },
      { label: "Zapstore", href: ZAPSTORE_URL, external: true },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: "https://github.com/cashubtc/Numo", external: true },
      { label: "Cashu.space", href: "https://cashu.space/", external: true },
      { label: "X", href: "https://x.com/numopayapp", external: true },
      {
        label: "Nostr",
        href: "https://primal.net/p/nprofile1qqs0y3tvskgs9gpgxxu5ahgz3fmms3rzmxt504qceqtz4a6pdgfwlkghwl6j8",
        external: true,
      },
    ],
  },
];

// Standalone links, like every other link here: no underline, and pointing at
// one only brightens it.
const CLOSING_LINKS: FooterLink[] = [
  { label: "Donate to OpenCash", href: "https://opencash.dev/", external: true },
  { label: "Privacy", href: "/privacy" },
];

// 44x44px minimum touch targets even on short labels ("X", "FAQ", "Nostr").
// A label wraps rather than run past the panel's edge, where it would be cut off.
const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-[0.9375rem] text-white/65 transition-colors duration-150 hover:text-white";

const closingLinkClass =
  "inline-flex min-h-11 min-w-11 items-center whitespace-nowrap text-white/60 transition-colors duration-150 hover:text-white";

/** A new tab for external links, a plain anchor for on-page hashes (so the
 *  home page's scroll handling sees them), a Link for routes. */
function FooterAnchor({ link, className }: { link: FooterLink; className: string }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (link.href.startsWith("/#")) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

/** One sentence to a line, broken only where a sentence ends. A lead with a
 *  single sentence simply wraps. */
function sentences(text: string) {
  return text.split(/(?<=\.)\s+/);
}

export function SiteFooter({ hiddenAnchors = [] }: { hiddenAnchors?: string[] }) {
  // A home section left out for being empty takes its footer link with it.
  const groups = GROUPS.map((group) => ({
    ...group,
    links: group.links.filter((link) => !hiddenAnchors.some((id) => link.href === `/#${id}`)),
  }));
  const pathname = usePathname();
  const isSetup = pathname === "/setup" || pathname.startsWith("/setup/");
  const ask = isSetup ? SETUP_ASK : HOME_ASK;

  return (
    <footer id="get-started" className="section-anchor bg-paper p-2 md:p-3">
      <div className="overflow-hidden rounded-frame bg-navy text-white">
        <div className="shell pt-16 md:pt-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <h2 className="text-h2 max-w-[11em]">{ask.heading}</h2>
              <p className="text-lead measure mt-5 text-white/70 md:mt-6">
                {sentences(ask.lead).map((sentence) => (
                  <span key={sentence} className="block [text-wrap:balance]">
                    {sentence}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Button
                href={ask.primary.href}
                variant="mint"
                size="lg"
                external={ask.primary.external}
              >
                {ask.primary.label}
              </Button>
              <Button
                href={ask.secondary.href}
                variant="ghost-inverse"
                size="lg"
                external={ask.secondary.external}
              >
                {ask.secondary.label}
              </Button>
            </div>
          </div>

          {/* Three columns set from the heading's left edge, not spread to fill
              the width, so they read as one block under the ask. Below 22.5rem
              (360px at the usual text size) a half-width column cannot hold a
              long label such as a translated "Setup guide", so the groups stack. */}
          <nav
            aria-label="Footer"
            className="mt-block grid grid-cols-1 gap-x-6 gap-y-10 min-[22.5rem]:grid-cols-2 md:grid-cols-[repeat(3,minmax(0,13rem))] md:gap-x-12"
          >
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[0.9375rem] font-medium text-white">{group.title}</h3>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} className={linkClass} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="text-caption mt-14 flex flex-col gap-1 pb-4 tracking-[0.01em] text-white/60 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-5">
            <p className="py-2.5">Built with support from OpenCash.</p>
            <ul className="flex flex-wrap gap-x-6">
              {CLOSING_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterAnchor link={link} className={closingLinkClass} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
