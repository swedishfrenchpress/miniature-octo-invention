import Image from "next/image";
import type { ReleaseImage as ReleaseImageData } from "@/data/releases";

/** The columns a release picture can sit in on /releases: the `sizes` hint for
 *  each, and the widest it ever gets. The page is the window less its gutters
 *  (1.5rem a side, 2.5rem from `md`, 3rem from `lg`) up to 72rem; an earlier
 *  release gives up 13rem of that to its version column from `md`. In `em`, as
 *  the breakpoints and the rem resolve. If the layout changes, change these, or
 *  every screenshot is fetched at the wrong width. */
const COLUMNS = {
  /** The latest release's cover, across the page. */
  page: {
    sizes: "(min-width: 78em) 72em, (min-width: 64em) calc(100vw - 6em), (min-width: 48em) calc(100vw - 5em), calc(100vw - 3em)",
    max: 72 * 16,
  },
  /** A highlight of the latest release, held to 720px. */
  pageHighlight: {
    sizes: "(min-width: 50em) 720px, (min-width: 48em) calc(100vw - 5em), calc(100vw - 3em)",
    max: 720,
  },
  /** An earlier release's cover, beside its version column. */
  entry: {
    sizes: "(min-width: 78em) 59em, (min-width: 64em) calc(100vw - 19em), (min-width: 48em) calc(100vw - 18em), calc(100vw - 3em)",
    max: 59 * 16,
  },
  /** A highlight of an earlier release, held to 640px. */
  entryHighlight: {
    sizes: "(min-width: 58em) 640px, (min-width: 48em) calc(100vw - 18em), calc(100vw - 3em)",
    max: 640,
  },
} as const;

type Props = {
  image: ReleaseImageData;
  /** Set true on above-the-fold hero images so Next.js preloads them. */
  priority?: boolean;
  /** Which column the picture sits in, for its `sizes` hint. */
  column: keyof typeof COLUMNS;
};

/* Release screenshots are plain paths, so next/image has no build-time blur to
   derive. Without a placeholder the reserved box paints nothing and /releases
   arrives as a column of holes — sixteen of them, of which three had loaded a
   full four seconds in. A single tone is enough: the light tint, the same as the
   frame behind the picture, so the page reads as a picture settling rather than
   as gaps waiting to fill. */
const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AK8AH//Z";

/** The frame below never grows past `min(width, 44rem * width / height)`. When
 *  that is narrower than the column, the hint says so, or a phone screenshot
 *  shown 300px wide would be fetched at the column's full width. The height
 *  limit is given in `em`, so it grows with a raised text size as the rem does. */
function sizesFor(image: ReleaseImageData, column: keyof typeof COLUMNS) {
  const tallEm = Math.ceil(((44 * image.width) / image.height) * 10) / 10;
  if (Math.min(image.width, tallEm * 16) >= COLUMNS[column].max) return COLUMNS[column].sizes;
  const cap = image.width <= tallEm * 16 ? `${image.width}px` : `${tallEm}em`;
  return `(min-width: ${cap}) ${cap}, calc(100vw - 3em)`;
}

export function ReleaseImage({ image, priority, column }: Props) {
  return (
    <figure>
      {/* A wide picture fills the column. Two kinds are held back, by a limit on
          the frame's width worked out from the size the picture is listed at, so
          its space is still reserved before it loads:
          - a tall one (a phone screenshot dropped in as it came) is never more
            than 44rem high, instead of running three screens tall;
          - a small one is never stretched past its own width until it blurs. */}
      <div
        className="overflow-hidden rounded-card border border-line bg-sunken"
        style={{ maxWidth: `min(${image.width}px, calc(44rem * ${image.width} / ${image.height}))` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes={sizesFor(image, column)}
          placeholder="blur"
          blurDataURL={BLUR}
          className="block h-auto w-full"
        />
      </div>
      {image.caption && (
        <figcaption className="text-caption mt-3 max-w-[43rem] text-navy/70">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
