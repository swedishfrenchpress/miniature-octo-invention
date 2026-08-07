import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "./Button";

/** Every route outside the homepage used to end differently: /setup and /privacy
 *  each had their own hand-rolled cream strip, and /releases ended on a hairline
 *  and a single sentence with no way out of the page at all. This is that ending,
 *  once — the ask, then the links every page owes a reader who arrived from search.
 *
 *  The homepage keeps its own footer. That one is a display-scale CTA carrying the
 *  Grandstander wordmark; it is the page's closing statement, not shared chrome. */

const LINKS = [
  { label: "Releases", href: "/releases" },
  { label: "Setup guide", href: "/setup" },
  { label: "Privacy & Terms", href: "/privacy" },
] as const;

const EXTERNAL = [
  { label: "Cashu.space", href: "https://cashu.space/" },
  { label: "GitHub", href: "https://github.com/cashubtc/Numo" },
  { label: "X", href: "https://x.com/numopayapp" },
] as const;

const linkClass =
  "-my-2 inline-flex min-h-11 items-center py-2 text-sm font-medium text-navy/65 transition-colors hover:text-navy";

export function SiteFooter({ note }: { note?: ReactNode }) {
  return (
    <footer className="bg-cream-warm px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-4xl [text-wrap:balance] text-navy md:text-5xl">Get the app.</p>
            <p className="mt-2 max-w-[38rem] leading-[1.6] [text-wrap:pretty] text-navy/70">
              {note ?? "Numo is free and open source. Android 8+ with NFC is all you need."}
            </p>
          </div>
          <Button href="https://github.com/cashubtc/Numo/releases" variant="dark" external>
            Download the APK
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-1 border-t border-navy/10 pt-6">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
          {EXTERNAL.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
