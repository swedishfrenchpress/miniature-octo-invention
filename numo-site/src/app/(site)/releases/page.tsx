import type { Metadata } from "next";
import { FULL_RELEASE_NOTES_URL, releases } from "@/data/releases";
import { ReleaseEntry } from "@/components/ReleaseEntry";
import { ReleaseImage } from "@/components/ReleaseImage";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Releases - Numo",
  description:
    "Release notes for Numo: what's shipping in the Bitcoin POS app, new features, improvements, and the story behind each version.",
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
      <header className="pt-[60px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-16 md:pb-20 md:pt-24">
          <h1 className="text-display max-w-[14ch] text-navy">What&rsquo;s new in Numo.</h1>
          <p className="text-lead mt-6 max-w-[36rem] text-navy/70">
            Every feature, improvement, and fix that ships, written for the people running
            the terminal, not the people writing the commits.
          </p>
        </div>
      </header>

      {/* Featured latest release */}
      <section
        id={`v${latest.version}`}
        aria-labelledby="latest-title"
        className="scroll-mt-24 border-t border-line py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="flex flex-wrap items-baseline gap-x-3 text-sm text-navy/70">
            <span className="tabular font-semibold text-navy">v{latest.version}</span>
            <time dateTime={latest.date}>{formatFullDate(latest.date)}</time>
          </p>

          <h2 id="latest-title" className="text-h2 mt-4 max-w-[24ch] text-navy">
            {latest.title}
          </h2>
          <p className="text-lead mt-5 max-w-[44rem] text-navy/70">{latest.summary}</p>

          {latest.heroImage && (
            <div className="mt-12">
              <ReleaseImage image={latest.heroImage} priority />
            </div>
          )}

          {latestHighlights.length > 0 && (
            <dl className="mt-14 space-y-12">
              {latestHighlights.map((h, i) => (
                <div key={i}>
                  <dt className="text-h3 max-w-[720px] text-navy">{h.title}</dt>
                  <dd className="mt-2 max-w-[720px] text-navy/70 [text-wrap:pretty]">{h.body}</dd>
                  {h.image && (
                    <div className="mt-6 max-w-[720px]">
                      <ReleaseImage image={h.image} />
                    </div>
                  )}
                  {h.secondImage && (
                    <div className="mt-4 max-w-[720px]">
                      <ReleaseImage image={h.secondImage} />
                    </div>
                  )}
                </div>
              ))}
            </dl>
          )}

          <div className="mt-14">
            <Button href={latest.downloadUrl ?? DEFAULT_DOWNLOAD} variant="primary" external>
              Download v{latest.version}
            </Button>
          </div>
        </div>
      </section>

      {/* Earlier releases timeline */}
      {older.length > 0 && (
        <section aria-labelledby="earlier-releases" className="pb-24 md:pb-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 id="earlier-releases" className="text-title border-t border-line pb-2 pt-14 text-navy">
              Earlier releases
            </h2>
            <div>
              {older.map((release) => (
                <ReleaseEntry key={release.version} release={release} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
