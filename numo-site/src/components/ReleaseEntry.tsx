import { FULL_RELEASE_NOTES_URL, type Release } from "@/data/releases";
import { ReleaseImage } from "./ReleaseImage";

type Props = {
  release: Release;
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ReleaseEntry({ release }: Props) {
  const highlights = release.highlights ?? [];
  const releaseNotesHref = release.downloadUrl ?? FULL_RELEASE_NOTES_URL;

  return (
    <article
      id={`v${release.version}`}
      className="grid scroll-mt-28 grid-cols-1 gap-3 border-b border-line py-12 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-12"
    >
      <header className="text-sm text-navy/70 md:pt-1.5">
        <div className="tabular font-semibold text-navy">v{release.version}</div>
        <time dateTime={release.date} className="mt-1 block">
          {formatDate(release.date)}
        </time>
      </header>

      <div>
        <h3 className="text-title max-w-[28ch] text-navy [text-wrap:balance]">{release.title}</h3>
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
                <dd className="mt-1.5 max-w-[35rem] text-navy/70 [text-wrap:pretty]">{h.body}</dd>
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
          className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-navy underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-navy"
        >
          Full release notes on GitHub
        </a>
      </div>
    </article>
  );
}
