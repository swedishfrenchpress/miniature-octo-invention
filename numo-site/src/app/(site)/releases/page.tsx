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
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:pb-16 md:pt-24">
          <h1 className="text-display max-w-[14ch] text-navy">What&rsquo;s new in Numo.</h1>
          <p className="text-lead mt-5 max-w-[32rem] text-navy/70">
            What&rsquo;s shipping in Numo, written for shop owners.
          </p>
        </div>
      </header>

      {/* Featured latest release on warm sunken ground */}
      <section
        id={`v${latest.version}`}
        aria-labelledby="latest-title"
        className="scroll-mt-28 border-t border-line bg-sunken py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="flex flex-wrap items-center gap-x-3 text-sm text-navy/70">
            <span className="tabular inline-flex items-center rounded-full bg-mint-soft px-2.5 py-0.5 font-semibold text-navy ring-1 ring-inset ring-navy/10">
              Latest
            </span>
            <span className="tabular font-semibold text-navy">v{latest.version}</span>
            <time dateTime={latest.date}>{formatFullDate(latest.date)}</time>
          </p>

          <h2 id="latest-title" className="text-h2 mt-4 max-w-[24ch] text-navy">
            {latest.title}
          </h2>
          <p className="text-lead mt-4 max-w-[38rem] text-navy/70">{latest.summary}</p>

          {latest.heroImage && (
            <div className="mt-10">
              <ReleaseImage image={latest.heroImage} priority />
            </div>
          )}

          {latestHighlights.length > 0 && (
            <dl className="mt-12 space-y-12">
              {latestHighlights.map((h, i) => (
                <div key={i}>
                  <dt className="text-h3 max-w-[35rem] text-navy">{h.title}</dt>
                  <dd className="mt-2 max-w-[35rem] text-navy/70 [text-wrap:pretty]">{h.body}</dd>
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

          <div className="mt-12">
            <Button href={latest.downloadUrl ?? DEFAULT_DOWNLOAD} variant="primary" size="md" external>
              Download v{latest.version}
            </Button>
          </div>
        </div>
      </section>

      {/* Earlier releases timeline */}
      {older.length > 0 && (
        <section
          aria-labelledby="earlier-releases"
          className="border-t border-line bg-paper pb-20 md:pb-28"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 id="earlier-releases" className="text-title pb-2 pt-14 text-navy">
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
