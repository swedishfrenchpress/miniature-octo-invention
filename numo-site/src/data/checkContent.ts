import { closeSync, existsSync, openSync, readSync } from "node:fs";
import path from "node:path";
import { SCREEN_SIZE, type ScreenKind } from "@/components/setupScreens";
import type { Release } from "./releases";

/* Checks on the site's hand-written content: release notes, wallet lists and
   guide steps. They run when the site is built (and when a page first loads in
   development) and print a plain warning for each slip in a data file: a date
   that is not real, a version listed twice, a picture that is missing or the
   wrong shape.

   They never stop the build. The pages are written to shrug these slips off
   instead: a date that cannot be read is left out, a picture whose file is
   missing is not shown, a guide step without a screenshot simply has none. The
   one exception is an empty release list, which the releases page cannot draw.

   They read files, so they only ever run on the server. */

type Picture = { src: string; width?: number; height?: number };

const inPublic = (src: string) => path.join(process.cwd(), "public", src.replace(/^\//, ""));

/** Whether a picture's file is really there. */
export const hasPicture = (src: string) => existsSync(inPublic(src));

/** Width and height of a PNG, from its header. Null for any other kind of file. */
function pngSize(file: string) {
  const header = Buffer.alloc(24);
  const handle = openSync(file, "r");
  try {
    readSync(handle, header, 0, 24, 0);
  } finally {
    closeSync(handle);
  }
  if (header.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

const sameShape = (a: { width: number; height: number }, b: { width: number; height: number }) =>
  Math.abs(a.width / a.height - b.width / b.height) / (b.width / b.height) < 0.01;

/** Adds a problem if the picture is missing, or is not the shape it is said to be. */
function checkPicture(picture: Picture, where: string, problems: string[], shape?: string) {
  const file = inPublic(picture.src);
  if (!existsSync(file)) {
    problems.push(`${where}: the picture ${picture.src} is not in the public folder.`);
    return;
  }
  const actual = pngSize(file);
  if (!actual || !picture.width || !picture.height) return;
  if (!sameShape(actual, { width: picture.width, height: picture.height })) {
    problems.push(
      `${where}: ${picture.src} is ${actual.width} x ${actual.height}, but ${
        shape ?? `it is listed as ${picture.width} x ${picture.height}`
      }.`,
    );
  }
}

const warned = new Set<string>();

/** Prints each set of problems once, as a warning. */
function report(file: string, problems: string[]) {
  if (problems.length === 0) return;
  const message = `\nContent warning in ${file}:\n${problems.map((problem) => `  - ${problem}`).join("\n")}\n`;
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(message);
}

/** True for a date written YYYY-MM-DD that exists on the calendar. */
export function isRealDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function checkReleases(releases: Release[]) {
  if (releases.length === 0) {
    throw new Error("\n\nsrc/data/releases.ts: the list of releases is empty. The page needs at least one.\n");
  }
  const problems: string[] = [];

  const seen = new Set<string>();
  for (const release of releases) {
    const version = release.version.replace(/^v/i, "");
    const where = `Release ${version || "(no version)"}`;
    if (!version.trim()) problems.push("A release has no version.");
    if (seen.has(version)) problems.push(`${where}: this version is listed twice.`);
    seen.add(version);
    if (!isRealDate(release.date)) {
      problems.push(`${where}: the date "${release.date}" is not a real date. Write it as YYYY-MM-DD, for example 2026-11-25.`);
    }
    if (!release.title.trim()) problems.push(`${where}: the title is empty.`);
    if (!release.summary.trim()) problems.push(`${where}: the summary is empty.`);
    if (release.heroImage) checkPicture(release.heroImage, where, problems);
    for (const highlight of release.highlights ?? []) {
      if (!highlight.title.trim()) problems.push(`${where}: a highlight has no title.`);
      if (highlight.image) checkPicture(highlight.image, where, problems);
      if (highlight.secondImage) checkPicture(highlight.secondImage, where, problems);
    }
  }
  report("src/data/releases.ts", problems);
}

/** Wallet icons: each file must exist, and a PNG icon must be square. */
export function checkWalletIcons(wallets: { name: string; image: string }[]) {
  const problems: string[] = [];
  for (const wallet of wallets) {
    checkPicture({ src: wallet.image, width: 1, height: 1 }, wallet.name, problems, "a wallet icon must be square");
  }
  report("src/components/home/Wallets.tsx", problems);
}

/** One part of a guide: every screenshot must exist and be the shape of its frame. */
export function checkGuide(
  file: string,
  heading: string,
  steps: readonly { title: string; image?: string; desktop?: { image: string } }[],
  screen: ScreenKind,
) {
  const problems: string[] = [];
  const size = SCREEN_SIZE[screen];
  for (const step of steps) {
    const where = `"${heading}", step "${step.title}"`;
    if (step.image) {
      checkPicture({ src: step.image, ...size }, where, problems, `this part's screens are ${size.width} x ${size.height} (${screen})`);
    }
    if (step.desktop) {
      const desktop = SCREEN_SIZE.desktopWeb;
      checkPicture({ src: step.desktop.image, ...desktop }, where, problems, `a desktop capture is ${desktop.width} x ${desktop.height}`);
    }
  }
  report(file, problems);
}

/** The releases as the page should draw them: a picture whose file is missing is
 *  left out, so the page shows the words without a broken image. */
export function withExistingReleasePictures(releases: Release[]): Release[] {
  // A picture listed at the wrong shape (a tall screenshot entered as a wide one)
  // is drawn at the shape of the file itself, so its space and its size limit
  // are right whatever the data says.
  const kept = <T extends { src: string; width: number; height: number }>(picture?: T) => {
    if (!picture || !hasPicture(picture.src)) return undefined;
    const actual = pngSize(inPublic(picture.src));
    return actual && !sameShape(actual, picture) ? { ...picture, ...actual } : picture;
  };
  return releases.map((release) => ({
    ...release,
    heroImage: kept(release.heroImage),
    highlights: release.highlights?.map((highlight) => ({
      ...highlight,
      image: kept(highlight.image),
      secondImage: kept(highlight.secondImage),
    })),
  }));
}

/** Guide steps as the page should draw them: a screenshot whose file is missing
 *  is left out, and that step is shown without one. */
export function withExistingScreenshots<
  Step extends { image?: string; desktop?: { image: string } },
>(steps: readonly Step[]): Step[] {
  return steps.map((step) => ({
    ...step,
    image: step.image && hasPicture(step.image) ? step.image : undefined,
    desktop: step.desktop && hasPicture(step.desktop.image) ? step.desktop : undefined,
  }));
}
