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
          className="block w-full h-auto"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-sm italic text-navy/55 leading-relaxed max-w-[60ch]">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
