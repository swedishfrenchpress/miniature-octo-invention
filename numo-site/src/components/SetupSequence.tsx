"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Warm paper blur placeholder so a screenshot settles gently instead of
 *  flashing an empty rounded rectangle before it decodes. */
const SCREENSHOT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzYyLjExLjEwMAD/2wBDAAgYGBwYHCEhISEhISckJygoKCcnJycoKCgrKyszMzMrKysoKCsrMDAzMzc5NzQ0MzQ5OTw8PEhIRUVUVFdnZ3z/xABMAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAgMQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAGAAgDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC4gJG//9k=";

/** A control picked out on a screenshot, as a box in percent of the
 *  screenshot's width and height. */
type Outline = { left: number; top: number; width: number; height: number };

export type SetupStep = {
  title: string;
  body: ReactNode;
  /** A real screenshot of this step. A sequence either illustrates every step
   *  or none of them. */
  image?: string;
  alt?: string;
  /** The control this step asks the reader to tap. */
  outline?: Outline;
  /** The same step captured as a whole desktop browser window, for a web page
   *  the reader may just as well open on a computer. When every step has one,
   *  phones keep `image` and anything wider shows this, so the screenshot always
   *  looks like the screen the reader is on. */
  desktop?: { image: string; outline?: Outline };
};

/** What the screenshots in a sequence are of. Every image in one sequence shares
 *  the shape, so they can stack and cross-fade in one frame. */
const SCREENS = {
  /** A phone screen, 1080 x 2340. */
  phone: { width: 1080, height: 2340, radius: "rounded-[2.25rem]", inline: "max-w-[17.5rem]" },
  /** A taller phone screen, 1080 x 2400. */
  phoneTall: { width: 1080, height: 2400, radius: "rounded-[2.25rem]", inline: "max-w-[17.5rem]" },
  /** A web page as it appears in a phone's browser, cropped to the page itself:
   *  824 x 1358. */
  mobileWeb: { width: 824, height: 1358, radius: "rounded-[1.5rem]", inline: "max-w-[20rem]" },
  /** A whole desktop browser window, top bar to bottom bar, 16:9: 2176 x 1224.
   *  It is never set wider than fits in the window under the nav. */
  desktopWeb: {
    width: 2176,
    height: 1224,
    radius: "rounded-card",
    inline: "md:tall:max-w-[calc((100svh-84px-4rem)*16/9)]",
  },
} as const;

export type ScreenKind = keyof typeof SCREENS;

/** A real screenshot shown bare: rounded like the screen it came from and edged
 *  with one hairline, with no drawn device, browser or shadow around it. */
function Screen({
  image,
  alt = "",
  outline,
  kind,
  sizes,
  className = "",
}: {
  image: string;
  alt?: string;
  outline?: Outline;
  kind: ScreenKind;
  sizes: string;
  className?: string;
}) {
  const screen = SCREENS[kind];

  return (
    <div className={`overflow-hidden ring-1 ring-navy/10 ${screen.radius} ${className}`}>
      <div className="relative">
        <Image
          src={image}
          alt={alt}
          width={screen.width}
          height={screen.height}
          placeholder="blur"
          blurDataURL={SCREENSHOT_BLUR}
          sizes={sizes}
          className="h-auto w-full"
        />
        {outline && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-[7px] ring-2 ring-navy"
            style={{
              left: `${outline.left}%`,
              top: `${outline.top}%`,
              width: `${outline.width}%`,
              height: `${outline.height}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function StepText({ step, titleClass = "" }: { step: SetupStep; titleClass?: string }) {
  return (
    <>
      <h3 className={`text-title text-navy transition-colors duration-300 ${titleClass}`}>
        {step.title}
      </h3>
      <p className="text-lead measure mt-3 text-navy/70">{step.body}</p>
    </>
  );
}

/** One part of a setup guide: a heading, then its steps in large type. How the
 *  steps are illustrated follows the shape of the screenshots.
 *
 *  Phone screens are tall, so one sits beside the steps and follows along. In a
 *  window at least `md` wide and tall enough to hold it (`md:tall:`), it is
 *  pinned while the steps scroll past, and it shows whichever step has just
 *  scrolled up into view. Each step is a third of the window tall,
 *  which paces the scroll to one step at a time and keeps the screen pinned
 *  until the last step has had its turn. On a phone, upright or on its side,
 *  there is no room to pin anything, so each step carries its own screen. Every step stays fully
 *  readable at all times; the current one is marked only by its title and
 *  numeral stepping up to full ink.
 *
 *  Desktop windows are wide, so they are never squeezed beside the text. When
 *  the steps also carry a `desktop` capture, each step is followed by its whole
 *  window at the full width of the page, and phones keep the phone capture.
 *
 *  When the steps have no screenshots yet, they set in two quiet columns. */
export function SetupSequence({
  heading,
  headingId,
  intro,
  steps,
  screen = "phone",
}: {
  heading: string;
  headingId: string;
  intro?: ReactNode;
  steps: readonly SetupStep[];
  /** What the steps' `image` screenshots are of. */
  screen?: ScreenKind;
}) {
  const [current, setCurrent] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const illustrated = steps.every((step) => step.image);
  const hasDesktop = illustrated && steps.every((step) => step.desktop);
  const pins = illustrated && !hasDesktop;

  useEffect(() => {
    if (!pins) return;
    // The root is squeezed to a line 60% down the window, so exactly one step
    // crosses it at a time: the one that has just scrolled up into view.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrent(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-60% 0px -40% 0px" },
    );
    for (const item of items.current) if (item) observer.observe(item);
    return () => observer.disconnect();
  }, [pins]);

  const header = (
    <>
      <h2 id={headingId} className="text-h2 text-navy">
        {heading}
      </h2>
      {intro && <p className="text-lead measure mt-5 text-navy/70 md:mt-6">{intro}</p>}
    </>
  );

  if (!illustrated) {
    return (
      <div className="shell">
        {header}
        <ol className="mt-block grid gap-x-16 gap-y-14 md:grid-cols-2 md:gap-y-16">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] content-start lg:grid-cols-[3rem_minmax(0,1fr)]"
            >
              <span aria-hidden="true" className="text-title tabular text-navy/55">
                {index + 1}
              </span>
              <div>
                <StepText step={step} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (hasDesktop) {
    return (
      <div className="shell">
        {header}
        <ol className="mt-block">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] content-start pb-14 last:pb-0 md:pb-(--block-space) md:last:pb-0 lg:grid-cols-[3rem_minmax(0,1fr)]"
            >
              <span aria-hidden="true" className="text-title tabular text-navy/55">
                {index + 1}
              </span>
              <div>
                <StepText step={step} />
                <Screen
                  image={step.image!}
                  alt={step.alt}
                  outline={step.outline}
                  kind={screen}
                  sizes="(min-width: 768px) 1px, 420px"
                  className={`mt-8 w-full md:hidden ${SCREENS[screen].inline}`}
                />
              </div>
              {/* The whole window, from the page's left edge to its right. */}
              <Screen
                image={step.desktop!.image}
                alt={step.alt}
                outline={step.desktop!.outline}
                kind="desktopWeb"
                sizes="(min-width: 1280px) 1152px, (min-width: 768px) 92vw, 1px"
                className={`col-span-2 mt-10 hidden w-full md:block lg:mt-12 ${SCREENS.desktopWeb.inline}`}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const { width, height, inline } = SCREENS[screen];

  return (
    <div className="shell grid md:tall:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:tall:gap-x-10 lg:tall:gap-x-16">
      <div>
        {header}
        <ol className="mt-block">
          {steps.map((step, index) => (
            <li
              key={step.title}
              ref={(el) => {
                items.current[index] = el;
              }}
              data-index={index}
              data-current={index === current}
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)] content-start pb-14 last:pb-0 md:tall:min-h-[34svh] md:tall:pb-12 md:tall:last:pb-0 lg:grid-cols-[3rem_minmax(0,1fr)]"
            >
              <span
                aria-hidden="true"
                className="text-title tabular text-navy/55 transition-colors duration-300 md:tall:group-data-[current=true]:text-navy"
              >
                {index + 1}
              </span>
              <div>
                <StepText step={step} titleClass="md:tall:group-data-[current=false]:text-navy/55" />
                <Screen
                  image={step.image!}
                  alt={step.alt}
                  outline={step.outline}
                  kind={screen}
                  sizes="(min-width: 768px) 1px, 420px"
                  className={`mt-8 w-full md:tall:hidden ${inline}`}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* One pinned screen, centered in the window under the nav. The steps'
          screenshots are stacked in it. When the step changes, the new screen
          fades in on top while the old one stays solid underneath and is only
          dropped once it is covered, so two screens never show through each other.
          It is as tall as the window allows and never wider than its column. */}
      <div className="hidden md:tall:block">
        <div
          className="sticky top-[calc(84px+(100svh-84px-var(--screen-h))/2)] mx-auto aspect-(--screen-ratio) w-[min(100%,calc(var(--screen-h)*var(--screen-ratio)))] [--screen-h:min(34rem,calc(100svh-84px-6rem))] lg:[--screen-h:min(40rem,calc(100svh-84px-6rem))]"
          style={{ "--screen-ratio": width / height } as CSSProperties}
        >
          {steps.map((step, index) => (
            <Screen
              key={step.title}
              image={step.image!}
              alt={step.alt}
              outline={step.outline}
              kind={screen}
              sizes="(min-width: 768px) 480px, 1px"
              className={`absolute inset-0 transition-opacity ${
                index === current
                  ? "z-10 opacity-100 duration-500 ease-[var(--ease-smooth)]"
                  : "opacity-0 delay-500 duration-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
