/** The Numo mark: a mint tile carrying a condensed N. Drawn as a path so the mark
 *  never depends on a display font being loaded. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden="true">
      <rect width="26" height="26" rx="7" fill="var(--mint)" />
      <path
        d="M8.2 6h2.5l4.6 8.6V6h2.5v14h-2.5l-4.6-8.6V20H8.2z"
        fill="var(--navy)"
      />
    </svg>
  );
}

export function Logo({
  tone = "ink",
  size = "md",
}: {
  tone?: "ink" | "inverse";
  size?: "md" | "lg";
}) {
  const isLarge = size === "lg";
  return (
    <span className={`flex items-center ${isLarge ? "gap-2 lg:gap-2.5" : "gap-2"}`}>
      <LogoMark
        className={isLarge ? "h-8 w-8 lg:h-9 lg:w-9" : "h-[26px] w-[26px]"}
      />
      <span
        className={`font-display font-semibold leading-none tracking-normal transition-colors duration-200 ${
          isLarge ? "text-[1.3125rem] lg:text-[1.5625rem]" : "text-[1.125rem]"
        } ${tone === "ink" ? "text-navy" : "text-white"}`}
      >
        Numo
      </span>
    </span>
  );
}
