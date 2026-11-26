"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A block that arrives once, the first time it scrolls into view.
 *
 *  It is built so that nothing can ever be left hidden. The page is rendered
 *  visible. Only after the script runs, and only for a block still below the
 *  window, is the block hidden (`data-reveal="armed"`) and then shown again as
 *  it comes into view (`data-reveal="in"`). A block that is already on screen,
 *  a visitor who asks for reduced motion, or a page whose script never runs all
 *  simply keep the block as it was drawn.
 *
 *  The motion itself is CSS in `globals.css`, keyed on that attribute:
 *  - `.reveal-part` children rise and fade in, each after its `--reveal-delay`.
 *  - `.reveal-drop` descendants land from above, for things that arrive.
 *  The attribute is set on the element directly rather than through state, so
 *  arming a block below the fold costs no re-render. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen when the script wakes up: leave it be, or it would blink.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        observer.disconnect();
      },
      // It has to be a little way into the window before it arrives.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
