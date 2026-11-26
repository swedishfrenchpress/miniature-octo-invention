/* The Numo logo, drawn as paths from the brand's own files
   (public/logos/numo-wordmark-white.svg and numo-app-icon.svg), so it never
   depends on a font being loaded. */

const WORDMARK_PATHS = [
  "M0 5.5285H76.2929L135.447 237.171H136.553V5.5285H190.732V392.521H128.26L55.2847 110.017H54.179V392.521H0V5.5285Z",
  "M313.331 398.05C283.846 398.05 261.363 389.757 245.883 373.172C230.404 356.218 222.664 332.077 222.664 300.749V5.5285H283.477V305.172C283.477 318.44 286.057 328.023 291.217 333.92C296.745 339.817 304.485 342.765 314.437 342.765C324.388 342.765 331.943 339.817 337.103 333.92C342.632 328.023 345.396 318.44 345.396 305.172V5.5285H403.998V300.749C403.998 332.077 396.258 356.218 380.778 373.172C365.298 389.757 342.816 398.05 313.331 398.05Z",
  "M436.253 5.5285H523.05L561.75 282.505H562.855L601.555 5.5285H688.352V392.521H630.855V99.5125H629.75L585.522 392.521H534.66L490.432 99.5125H489.327V392.521H436.253V5.5285Z",
  "M810.577 398.05C780.723 398.05 757.872 389.573 742.024 372.619C726.175 355.665 718.251 331.708 718.251 300.749V97.301C718.251 66.3416 726.175 42.3849 742.024 25.431C757.872 8.47699 780.723 0 810.577 0C840.43 0 863.281 8.47699 879.13 25.431C894.978 42.3849 902.902 66.3416 902.902 97.301V300.749C902.902 331.708 894.978 355.665 879.13 372.619C863.281 389.573 840.43 398.05 810.577 398.05ZM810.577 342.765C831.585 342.765 842.089 330.05 842.089 304.619V93.4311C842.089 68.0002 831.585 55.2847 810.577 55.2847C789.568 55.2847 779.064 68.0002 779.064 93.4311V304.619C779.064 330.05 789.568 342.765 810.577 342.765Z"
];

/** The wordmark: NUMO in the brand's condensed capitals. It takes the current
 *  text colour, and is hidden from assistive tech: the link or heading around
 *  it carries the name. */
export function Wordmark({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 903 399" className={className} fill="currentColor" aria-hidden="true">
      {WORDMARK_PATHS.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </svg>
  );
}

/** The app icon: the wordmark's N on a mint tile, with an app icon's rounding.
 *  Used where Numo stands as an app beside other apps, never as the site logo. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 398.05 398.05" className={className} aria-hidden="true">
      <rect width="398.05" height="398.05" rx="107.5" fill="var(--mint)" />
      <path d="M123.138 45.0509H183.848L230.92 229.38H231.799V45.0509H274.912V352.999H225.201L167.13 128.197H166.251V352.999H123.138V45.0509Z" fill="var(--navy)" />
    </svg>
  );
}

/** The site logo: the wordmark alone, in ink on light grounds and white on dark. */
export function Logo({
  tone = "ink",
  size = "md",
}: {
  tone?: "ink" | "inverse";
  size?: "md" | "lg";
}) {
  return (
    <Wordmark
      className={`block w-auto transition-colors duration-200 ${
        size === "lg" ? "h-6 lg:h-7" : "h-[22px]"
      } ${tone === "ink" ? "text-navy" : "text-white"}`}
    />
  );
}
