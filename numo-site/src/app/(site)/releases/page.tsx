import type { Metadata } from "next";
import { FULL_RELEASE_NOTES_URL, releases } from "@/data/releases";
import {
  ReleaseEntry,
  formatReleaseDate,
  unbrokenHyphens,
  versionTag,
} from "@/components/ReleaseEntry";
import { ReleaseImage } from "@/components/ReleaseImage";
import { Button } from "@/components/Button";
import { breakData } from "@/breakdata";
import { checkReleases, withExistingReleasePictures } from "@/data/checkContent";

export const metadata: Metadata = {
  title: "Releases - Numo",
  description:
    "Release notes for Numo: what's shipping in the Bitcoin POS app, new features, improvements, and the story behind each version.",
};

const DEFAULT_DOWNLOAD = FULL_RELEASE_NOTES_URL;

// Warns about a date that is not real, a version listed twice, an empty title,
// or a picture that is missing or the wrong shape. It does not stop the build.
checkReleases(releases);

export default async function ReleasesPage() {
  const [latest, ...older] = withExistingReleasePictures((await breakData()).releases ?? releases);
  const latestHighlights = latest.highlights ?? [];
  const latestDate = formatReleaseDate(latest.date);

  return (
    <>
      <header className="bg-paper pt-[72px] md:pt-[84px]">
        <div className="shell header-y">
          <h1 className="text-display max-w-[14ch] text-navy">What&rsquo;s new in Numo.</h1>
          <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
            What&rsquo;s shipping in Numo, written for shop owners.
          </p>
        </div>
      </header>

      {/* Featured latest release, set apart by its hairline and its space */}
      <section
        id={versionTag(latest.version)}
        aria-labelledby="latest-title"
        className="section-y scroll-mt-28 border-t border-line bg-paper"
      >
        <div className="shell">
          <p className="flex flex-wrap items-center gap-x-3 text-sm text-navy/70">
            <span className="tabular inline-flex items-center rounded-full bg-mint-soft px-2.5 py-0.5 font-semibold text-navy ring-1 ring-inset ring-navy/10">
              Latest
            </span>
            <span className="tabular font-semibold text-navy">{versionTag(latest.version)}</span>
            {latestDate && <time dateTime={latest.date}>{latestDate}</time>}
          </p>

          <h2 id="latest-title" className="text-h2 mt-4 max-w-[14em] text-navy">
            {unbrokenHyphens(latest.title)}
          </h2>
          <p className="text-lead measure mt-4 text-navy/70 md:mt-5">{latest.summary}</p>

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
                  {h.body && (
                    <dd className="mt-2 max-w-[35rem] text-navy/70 [text-wrap:pretty]">{h.body}</dd>
                  )}
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
              Download {versionTag(latest.version)}
            </Button>
          </div>
        </div>
      </section>

      {/* Earlier releases timeline */}
      {older.length > 0 && (
        <section
          aria-labelledby="earlier-releases"
          className="border-t border-line bg-paper pb-(--section-space)"
        >
          <div className="shell">
            <h2 id="earlier-releases" className="text-title pb-2 pt-16 text-navy md:pt-20">
              Earlier releases
            </h2>
            <div>
              {/* The position is part of the key, so a version listed twice by
                  mistake still draws both entries. */}
              {older.map((release, i) => (
                <ReleaseEntry key={`${release.version}-${i}`} release={release} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
