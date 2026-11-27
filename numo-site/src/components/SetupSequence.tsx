"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { SCREEN_SIZE, type ScreenKind } from "./setupScreens";

/** A blur placeholder in the light tint, so a screenshot settles gently instead
 *  of flashing an empty rounded rectangle before it decodes. */
const SCREENSHOT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AK8AH//Z";

/** A control picked out on a screenshot, as a box in percent of the
 *  screenshot's width and height. */
type Outline = { left: number; top: number; width: number; height: number };

export type SetupStep = {
  title: string;
  body: ReactNode;
  /** A real screenshot of this step. A step may go without one: it is then shown
   *  as words alone, and beside it the screen of the step before stays up. */
  image?: string;
  alt?: string;
  /** The control this step asks the reader to tap. */
  outline?: Outline;
  /** The same step captured as a whole desktop browser window, for a web page
   *  the reader may just as well open on a computer. When every step has one,
   *  phones keep `image` and anything wider shows this, so the screenshot always
   *  looks like the screen the reader is on. If any step lacks one, every width
   *  gets the phone captures. */
  desktop?: { image: string; outline?: Outline };
};

/** What the screenshots in a sequence are of. Every image in one sequence shares
 *  the shape, so they can stack and cross-fade in one frame. `inlineEm` is the
 *  `inline` limit again, as a number, for the `sizes` hints below. */
const SCREENS = {
  phone: { ...SCREEN_SIZE.phone, radius: "rounded-[2.25rem]", inline: "max-w-[17.5rem]", inlineEm: 17.5 },
  phoneTall: { ...SCREEN_SIZE.phoneTall, radius: "rounded-[2.25rem]", inline: "max-w-[17.5rem]", inlineEm: 17.5 },
  mobileWeb: { ...SCREEN_SIZE.mobileWeb, radius: "rounded-[1.5rem]", inline: "max-w-[20rem]", inlineEm: 20 },
  /** A desktop window is never set wider than fits in the window under the nav. */
  desktopWeb: {
    ...SCREEN_SIZE.desktopWeb,
    radius: "rounded-card",
    inline: "md:tall:max-w-[calc((100svh-84px-4rem)*16/9)]",
    inlineEm: undefined,
  },
} as const;

export type { ScreenKind };

/* Which file the browser loads for each copy of a screenshot. A copy that is
   hidden asks for a 1px file, so only the copy on screen costs a download.

   These must say exactly what the layout says, or the visible copy loads the
   1px file and shows as a blur. The layout pins from `md` in a window at least
   `tall` (40rem) high, so the hints test both, and in `em`, which is what the
   `rem` breakpoints resolve to. A phone on its side is wide but short: it gets
   the stacked copy, at full size.

   The widths are the screen's own limits, also in `em`, so they grow with a
   raised text size exactly as the layout does: a stacked copy is at most its
   `inline` width, and the pinned one at most 40rem tall. Anything wider makes
   a phone download a file twice the size it shows. */
const PINS = "(min-width: 48em) and (min-height: 40em)";
const stackedSizes = (kind: ScreenKind) => `${PINS} 1px, ${SCREENS[kind].inlineEm ?? 26.25}em`;
const pinnedSizes = (kind: ScreenKind) =>
  `${PINS} ${Math.ceil((40 * SCREENS[kind].width) / SCREENS[kind].height * 10) / 10}em, 1px`;
/* In a guide with desktop captures the phone copy steps aside from `md` at any height. */
const stackedFromMdSizes = (kind: ScreenKind) => `(min-width: 48em) 1px, ${SCREENS[kind].inlineEm ?? 26.25}em`;
const DESKTOP_WINDOW = "(min-width: 80em) 1152px, (min-width: 48em) 92vw, 1px";

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
 *  A step with no screenshot does not cost the others theirs. On a phone it is
 *  simply words; beside the pinned screen, the screen of the last step that had
 *  one stays up while that step is read.
 *
 *  When none of the steps has a screenshot yet, they set in two quiet columns. */
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
  const illustrated = steps.some((step) => step.image);
  const hasDesktop = illustrated && steps.every((step) => step.image && step.desktop);
  const pins = illustrated && !hasDesktop;
  // The pinned screen shows the current step's screenshot, or failing that the
  // nearest earlier one, or failing that the first there is.
  let pinned = current;
  while (pinned >= 0 && !steps[pinned]?.image) pinned -= 1;
  if (pinned < 0) pinned = steps.findIndex((step) => step.image);

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
                  sizes={stackedFromMdSizes(screen)}
                  className={`mt-8 w-full md:hidden ${SCREENS[screen].inline}`}
                />
              </div>
              {/* The whole window, from the page's left edge to its right. */}
              <Screen
                image={step.desktop!.image}
                alt={step.alt}
                outline={step.desktop!.outline}
                kind="desktopWeb"
                sizes={DESKTOP_WINDOW}
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
                {step.image && (
                  <Screen
                    image={step.image}
                    alt={step.alt}
                    outline={step.outline}
                    kind={screen}
                    sizes={stackedSizes(screen)}
                    className={`mt-8 w-full md:tall:hidden ${inline}`}
                  />
                )}
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
          {steps.map(
            (step, index) =>
              step.image && (
                <Screen
                  key={step.title}
                  image={step.image}
                  alt={step.alt}
                  outline={step.outline}
                  kind={screen}
                  sizes={pinnedSizes(screen)}
                  className={`absolute inset-0 transition-opacity ${
                    index === pinned
                      ? "z-10 opacity-100 duration-300 ease-[var(--ease-smooth)]"
                      : "opacity-0 delay-300 duration-0"
                  }`}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
}
