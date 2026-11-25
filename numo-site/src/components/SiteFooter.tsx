import Link from "next/link";
import { Button } from "./Button";
import { Logo } from "./Logo";

/** The one ending every page shares, and the site's single ink section: the ask,
 *  then every destination, then the wordmark. */

const DOWNLOAD_URL = "https://github.com/cashubtc/Numo/releases";
const ZAPSTORE_URL =
  "https://zapstore.dev/apps/naddr1qqtkxmmd9ejkcetrw3exjcmywfjkzmtn9eh82mt0qyv8wumn8ghj7un9d3shjtn6v9c8xar0wfjjuer9wcpzpcluvulut7vuc42dpl68w4ne2erayh9kuejclyfdz99wvs5axhf4qvzqqqr7pvu7jrcc";

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
      { label: "Download APK", href: DOWNLOAD_URL, external: true },
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

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-white/65 transition-colors duration-150 hover:text-white";

export function SiteFooter() {
  return (
    <footer id="get-started" className="section-anchor overflow-hidden bg-navy text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* The ask */}
        <div className="flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <div>
            <h2 className="text-h2 max-w-[18ch]">Start accepting Bitcoin today.</h2>
            <p className="text-lead mt-4 max-w-[34rem] text-white/65">
              Free to download and free to use, with no platform fees. An Android phone
              with NFC is all you need.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button href={DOWNLOAD_URL} variant="inverse" external>
              Download
            </Button>
            <Button href={ZAPSTORE_URL} variant="ghost-inverse" external>
              Get it on Zapstore
            </Button>
          </div>
        </div>

        {/* Every destination */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Numo home" className="inline-flex">
              <Logo tone="inverse" />
            </Link>
            <p className="mt-4 max-w-[19rem] text-sm leading-relaxed text-white/65">
              Built with support from OpenCash. To support open-source digital cash
              development, consider{" "}
              <a
                href="https://opencash.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 underline underline-offset-[3px] transition-colors duration-150 hover:text-white"
              >
                donating to OpenCash
              </a>
              .
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-caption text-white/55">{column.title}</h3>
              <ul className="mt-3">
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

      {/* The wordmark, cropped by the bottom edge. */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(7rem,27vw,25rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.06]"
      >
        Numo
      </p>
    </footer>
  );
}
