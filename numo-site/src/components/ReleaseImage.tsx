import Image from "next/image";
import type { ReleaseImage as ReleaseImageData } from "@/data/releases";

type Props = {
  image: ReleaseImageData;
  /** Set true on above-the-fold hero images so Next.js preloads them. */
  priority?: boolean;
  /** Override the default sizes hint when rendered inside a multi-column grid. */
  sizes?: string;
};

const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px";

/* Release screenshots are plain paths, so next/image has no build-time blur to
   derive. Without a placeholder the reserved box paints nothing and /releases
   arrives as a column of holes — sixteen of them, of which three had loaded a
   full four seconds in. A single paper tone is enough: these are app
   screenshots on light grounds, so the page reads as paper settling rather than
   as gaps waiting to fill. */
const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzYyLjExLjEwMAD/2wBDAAgYGBwYHCEhISEhISckJygoKCcnJycoKCgrKyszMzMrKysoKCsrMDAzMzc5NzQ0MzQ5OTw8PEhIRUVUVFdnZ3z/xABMAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAgMQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAGAAgDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC4gJG//9k=";

export function ReleaseImage({ image, priority, sizes = DEFAULT_SIZES }: Props) {
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
          sizes={sizes}
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
