import { FULL_RELEASE_NOTES_URL, type Release } from "@/data/releases";
import { ReleaseImage } from "./ReleaseImage";

type Props = {
  release: Release;
};

/** "November 13, 2026". Nothing at all for a date that is not a real one, so
 *  the page never prints "Invalid Date" or quietly shows a different day. */
export function formatReleaseDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** "v1.10", whether the data says "1.10" or, by habit, "v1.10". */
export function versionTag(version: string) {
  return `v${version.replace(/^v/i, "")}`;
}

/** The longest hyphenated word that is kept whole. Anything longer cannot fit on
 *  one line of a phone at heading size, so it is allowed to break at its hyphens. */
const UNBROKEN_MAX = 16;

/** Keeps a hyphenated word such as "in-app" on one line. A heading may wrap
 *  between words, never at a hyphen, and the body face has no non-breaking hyphen. */
export function unbrokenHyphens(text: string) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 && part.length <= UNBROKEN_MAX ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function ReleaseEntry({ release }: Props) {
  const highlights = release.highlights ?? [];
  const releaseNotesHref = release.downloadUrl ?? FULL_RELEASE_NOTES_URL;
  const date = formatReleaseDate(release.date);

  return (
    <article
      id={versionTag(release.version)}
      className="grid scroll-mt-28 grid-cols-1 gap-3 border-b border-line py-14 last:border-b-0 md:py-16 md:grid-cols-[10rem_1fr] md:gap-12"
    >
      <header className="text-sm text-navy/70 md:pt-1.5">
        <div className="tabular font-semibold text-navy">{versionTag(release.version)}</div>
        {date && (
          <time dateTime={release.date} className="mt-1 block">
            {date}
          </time>
        )}
      </header>

      <div>
        <h3 className="text-title max-w-[15em] text-navy">{unbrokenHyphens(release.title)}</h3>
        <p className="mt-3 max-w-[35rem] text-navy/70 [text-wrap:pretty]">{release.summary}</p>

        {release.heroImage && (
          <div className="mt-8">
            <ReleaseImage image={release.heroImage} />
          </div>
        )}

        {highlights.length > 0 && (
          <dl className="mt-8 space-y-9">
            {highlights.map((h, i) => (
              <div key={i}>
                <dt className="max-w-[35rem] font-semibold text-navy">{h.title}</dt>
                {h.body && (
                  <dd className="mt-1.5 max-w-[35rem] text-navy/70 [text-wrap:pretty]">{h.body}</dd>
                )}
                {h.image && (
                  <div className="mt-5 max-w-[640px]">
                    <ReleaseImage image={h.image} />
                  </div>
                )}
                {h.secondImage && (
                  <div className="mt-4 max-w-[640px]">
                    <ReleaseImage image={h.secondImage} />
                  </div>
                )}
              </div>
            ))}
          </dl>
        )}

        <a
          href={releaseNotesHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy active:opacity-60"
        >
          Full release notes on GitHub
        </a>
      </div>
    </article>
  );
}
