"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "./DownloadMenu";
import { Logo } from "./Logo";

/** The shared closing band and the site's dark Signwriter's Ink ground:
 *  the Fresh Paint Mint ask (adapted on `/setup` for merchants who just finished
 *  installing), every destination, and the architectural wordmark. */

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
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
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

// 44x44px minimum touch targets even on short labels ("X", "FAQ", "Nostr").
const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-sm text-white/70 transition-colors duration-150 hover:text-white";

export function SiteFooter() {
  const pathname = usePathname();
  const isSetup = pathname === "/setup";

  return (
    <footer id="get-started" className="section-anchor overflow-hidden bg-navy text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* The ask */}
        <div className="flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          {isSetup ? (
            <>
              <div>
                <h2 className="text-h2 max-w-[18ch]">Next at the counter.</h2>
                <p className="text-lead mt-4 max-w-[30rem] text-white/70">
                  See how Numo syncs with BTCPay Server, browse what&rsquo;s shipping, or check the
                  FAQ if anything gets stuck.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Button href="/btcpay" variant="mint" size="lg">
                  View BTCPay demo
                </Button>
                <Button href="/releases" variant="ghost-inverse" size="lg">
                  What&rsquo;s new in Numo
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-h2 max-w-[18ch]">Start accepting Bitcoin today.</h2>
                <p className="text-lead mt-4 max-w-[30rem] text-white/70">
                  Free to use, zero platform fees on Bitcoin. Any Android with NFC works.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Button href={DOWNLOAD_APK_URL} variant="mint" size="lg" external>
                  Download APK
                </Button>
                <Button href={ZAPSTORE_URL} variant="ghost-inverse" size="lg" external>
                  Get it on Zapstore
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Every destination */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Numo home" className="inline-flex min-h-11 items-center">
              <Logo tone="inverse" />
            </Link>
            <p className="mt-3 max-w-[19rem] text-sm leading-relaxed text-white/70">
              Built with support from OpenCash. To support open-source digital cash
              development, consider{" "}
              <a
                href="https://opencash.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline underline-offset-[3px] transition-colors duration-150 hover:text-mint"
              >
                donating to OpenCash
              </a>
              .
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-caption font-medium text-white/60">{column.title}</h3>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith("/#") ? (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* The architectural wordmark, cropped cleanly at the bottom edge. */}
      <p
        aria-hidden="true"
        className="font-display pointer-events-none -mb-[0.18em] select-none text-center text-[clamp(7rem,27vw,25rem)] font-semibold leading-[0.82] tracking-[-0.03em] text-white/[0.06]"
      >
        Numo
      </p>
    </footer>
  );
}
