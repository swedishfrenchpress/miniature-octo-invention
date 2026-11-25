"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** One-off check, for event handlers. */
export function prefersReducedMotion() {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Live preference, for components whose motion is driven by JS timers. The global
 *  CSS block only shortens CSS animations; a timer-driven sequence keeps cycling
 *  unless the component itself stops it. False on the server. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false);
}
