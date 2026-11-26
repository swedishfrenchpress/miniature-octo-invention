/** The shapes a guide's screenshots come in, in pixels. Every picture in one
 *  part of a guide must be the same shape, because they share one frame.
 *
 *  This lives outside `SetupSequence.tsx` so the content check, which runs on
 *  the server, can read it too. */
export const SCREEN_SIZE = {
  /** A phone screen, 1080 x 2340. */
  phone: { width: 1080, height: 2340 },
  /** A taller phone screen, 1080 x 2400. */
  phoneTall: { width: 1080, height: 2400 },
  /** A web page as it appears in a phone's browser, cropped to the page itself. */
  mobileWeb: { width: 824, height: 1358 },
  /** A whole desktop browser window, top bar to bottom bar, 16:9. */
  desktopWeb: { width: 2176, height: 1224 },
} as const;

export type ScreenKind = keyof typeof SCREEN_SIZE;
