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

  return (
    <article
      id={`v${release.version}`}
      className="scroll-mt-28 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-12 py-14 border-t border-navy/10"
    >
      {/* Version rail — desktop: left column; mobile: inline above content */}
      <header className="md:pt-1">
        <div className="font-display text-4xl md:text-5xl text-navy leading-none">
          v{release.version}
        </div>
        <time
          dateTime={release.date}
          className="mt-2 block text-xs uppercase tracking-[0.2em] font-semibold text-navy/55"
        >
          {formatDate(release.date)}
        </time>
      </header>

      {/* Content column */}
      <div>
        <h2 className="font-display text-3xl md:text-4xl text-navy leading-[0.95] font-bold mb-4 max-w-[22ch] [text-wrap:balance]">
          {release.title}
        </h2>
        <p className="text-lg text-navy/75 leading-relaxed max-w-[65ch] [text-wrap:pretty]">
          {release.summary}
        </p>

        {release.heroImage && (
          <div className="mt-10">
            <ReleaseImage image={release.heroImage} />
          </div>
        )}

        {highlights.length > 0 && (
          <dl className="mt-12 space-y-10">
            {highlights.map((h, i) => (
              <div key={i}>
                <dt className="font-display text-xl md:text-2xl text-navy leading-[0.95] mb-2 max-w-[28ch]">
                  {h.title}
                </dt>
                <dd className="text-base md:text-lg text-navy/75 leading-relaxed max-w-[60ch]">
                  {h.body}
                </dd>
                {h.image && (
                  <div className="mt-5 max-w-[640px]">
                    <ReleaseImage image={h.image} />
                  </div>
                )}
              </div>
            ))}
          </dl>
        )}

        <a
          href={FULL_RELEASE_NOTES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-navy/55 hover:text-navy transition-colors duration-200 underline underline-offset-4 decoration-navy/30 hover:decoration-navy/60"
        >
          Full release notes on GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
