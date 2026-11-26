/* Worst-case content for stress-testing the site. Development only: nothing in
   this folder is rendered, or even loaded, in a production build. See README.md. */

export const BREAK_MODES = ["demo", "worst", "empty", "one", "many", "german"] as const;

export type BreakMode = (typeof BREAK_MODES)[number];

export const BREAK_LABELS: Record<BreakMode, string> = {
  demo: "Demo data",
  worst: "Worst case",
  empty: "Empty",
  one: "One",
  many: "Many",
  german: "German",
};

/** The switch is a cookie, so it holds across pages and reloads. */
export const BREAK_COOKIE = "break-ui";
