import Image from "next/image";
import type { ReactNode } from "react";
import { PhoneFrame } from "./PhoneFrame";

/** Warm paper blur placeholder so below-fold app screenshots settle gently
 *  instead of flashing solid dark bezels before decoding. */
const SCREENSHOT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzYyLjExLjEwMAD/2wBDAAgYGBwYHCEhISEhISckJygoKCcnJycoKCgrKyszMzMrKysoKCsrMDAzMzc5NzQ0MzQ5OTw8PEhIRUVUVFdnZ3z/xABMAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAgMQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAGAAgDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC4gJG//9k=";

export type SetupStep = {
  title: string;
  body: ReactNode;
  image: string;
  alt: string;
  /** The control this step asks the reader to tap, as a box in percent of the
   *  screenshot's width and height. */
  outline?: { left: number; top: number; width: number; height: number };
};

/** Every step in the setup guide is the same unit: a numbered title, one
 *  paragraph, one real app screenshot. Screenshots bottom-align across a row,
 *  and both step sections share this grid so the phones line up down the page. */
export function SetupSteps({ steps }: { steps: readonly SetupStep[] }) {
  return (
    <ol className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col">
          <h3 className="text-h3 text-navy">
            <span className="tabular text-navy/65">{index + 1}.</span> {step.title}
          </h3>
          <p className="mt-2 text-navy/70 [text-wrap:pretty]">{step.body}</p>
          <div className="mt-auto w-full max-w-[270px] pt-6">
            <PhoneFrame>
              <Image
                src={step.image}
                alt={step.alt}
                width={1080}
                height={2340}
                placeholder="blur"
                blurDataURL={SCREENSHOT_BLUR}
                sizes="270px"
                className="h-auto w-full"
              />
              {step.outline && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-[7px] ring-2 ring-navy"
                  style={{
                    left: `${step.outline.left}%`,
                    top: `${step.outline.top}%`,
                    width: `${step.outline.width}%`,
                    height: `${step.outline.height}%`,
                  }}
                />
              )}
            </PhoneFrame>
          </div>
        </li>
      ))}
    </ol>
  );
}
