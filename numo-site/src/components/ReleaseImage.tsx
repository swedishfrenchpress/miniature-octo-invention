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
   full four seconds in. A single butcher-paper tone is enough: these are app
   screenshots on light grounds, so the page reads as paper settling rather than
   as gaps waiting to fill. */
const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzYyLjExLjEwMAD/2wBDAAgYGBwYHCEhISEhISckJygoKCcnJycoKCgrKyszMzMrKysoKCsrMDAzMzc5NzQ0MzQ5OTw8PEhIRUVUVFdnZ3z/xABMAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAgMQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAGAAgDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC4gJG//9k=";

export function ReleaseImage({ image, priority, sizes = DEFAULT_SIZES }: Props) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl bg-cream ring-1 ring-navy/5">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR}
          className="block w-full h-auto"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 max-w-[43rem] text-sm italic leading-relaxed text-navy/65">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
