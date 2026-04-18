import type { Metadata } from "next";
import { FULL_RELEASE_NOTES_URL, releases } from "@/data/releases";
import { ReleaseEntry } from "@/components/ReleaseEntry";
import { ReleaseImage } from "@/components/ReleaseImage";
import { Button } from "@/components/Button";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Releases — Numo",
  description:
    "Release notes for Numo. What's shipping in the Bitcoin POS app — new features, improvements, and the story behind each version.",
};

const DEFAULT_DOWNLOAD = FULL_RELEASE_NOTES_URL;

function formatFullDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReleasesPage() {
  const [latest, ...older] = releases;
  const latestHighlights = latest.highlights ?? [];

  return (
    <>
      <Navigation />

      {/* Page header */}
      <header className="bg-navy px-6 pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-mint mb-4">
            Releases
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-[0.9] font-bold">
            WHAT&apos;S NEW IN NUMO
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-[52ch]">
            Every feature, improvement, and fix that ships — written for the
            people running the terminal, not the people writing the commits.
          </p>
        </div>
      </header>

      <main className="bg-cream-warm">
        {/* Featured latest release */}
        <section
          id={`v${latest.version}`}
          aria-labelledby="latest-title"
          className="scroll-mt-28 max-w-5xl mx-auto px-6 py-16 md:py-24"
        >
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6">
            <span className="font-display text-6xl md:text-8xl text-navy leading-none">
              v{latest.version}
            </span>
            <time
              dateTime={latest.date}
              className="text-xs md:text-sm uppercase tracking-[0.22em] font-semibold text-navy/55"
            >
              {formatFullDate(latest.date)}
            </time>
          </div>

          <h2
            id="latest-title"
            className="font-display text-4xl md:text-6xl text-navy leading-[0.9] font-bold mb-6 [text-wrap:balance]"
          >
            {latest.title}
          </h2>
          <p className="text-xl md:text-2xl text-navy/80 leading-[1.4] max-w-[58ch] [text-wrap:pretty]">
            {latest.summary}
          </p>

          {latest.heroImage && (
            <div className="mt-12">
              <ReleaseImage image={latest.heroImage} priority />
            </div>
          )}

          {latestHighlights.length > 0 && (
            <dl className="mt-14 space-y-12">
              {latestHighlights.map((h, i) => (
                <div key={i}>
                  <dt className="font-display text-2xl md:text-3xl text-navy leading-[0.95] mb-2 max-w-[28ch]">
                    {h.title}
                  </dt>
                  <dd className="text-base md:text-lg text-navy/70 leading-relaxed max-w-[60ch]">
                    {h.body}
                  </dd>
                  {h.image && (
                    <div className="mt-6 max-w-[720px]">
                      <ReleaseImage image={h.image} />
                    </div>
                  )}
                </div>
              ))}
            </dl>
          )}

          <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <Button
              href={latest.downloadUrl ?? DEFAULT_DOWNLOAD}
              variant="accent"
              external
            >
              Download v{latest.version}
            </Button>
            <a
              href={FULL_RELEASE_NOTES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy transition-colors underline underline-offset-4 decoration-navy/20 hover:decoration-navy"
            >
              Full release notes on GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* Earlier releases timeline */}
        {older.length > 0 && (
          <section
            aria-labelledby="earlier-releases"
            className="max-w-5xl mx-auto px-6 pb-20"
          >
            <h3
              id="earlier-releases"
              className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-navy/50 mb-2"
            >
              Earlier releases
            </h3>
            <div>
              {older.map((release) => (
                <ReleaseEntry key={release.version} release={release} />
              ))}
            </div>
          </section>
        )}

        {/* Footer strip */}
        <footer className="border-t border-navy/10 px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm text-navy/50">
              Release notes are updated as features ship.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
