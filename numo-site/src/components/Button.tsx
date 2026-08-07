import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "dark" | "light" | "accent";
type Size = "sm" | "lg";

type ButtonProps = {
  children: ReactNode;
  href: string;
  /** 'dark' = navy bg / white text. 'light' = white bg / navy text, ringed. 'accent' = mint bg / navy text. */
  variant: Variant;
  /** 'sm' = compact nav style. 'lg' = full hero/footer CTA (default). */
  size?: Size;
  /** If true, opens in new tab with safe rel attributes. */
  external?: boolean;
  ariaLabel?: string;
  className?: string;
};

const BASE =
  "items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

const SIZE: Record<Size, string> = {
  sm: "inline-flex min-h-11 px-5 py-2.5 text-sm",
  lg: "flex gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-base shadow-lg ease-out w-full sm:w-auto min-w-[200px] sm:min-w-0",
};

// `dark` and `accent` invert to a white fill on hover — the system's signature lift.
// `light` therefore carries a permanent ink hairline: without it, a hovered `dark`
// button and a resting `light` button resolve to the same white pill and the
// primary/secondary hierarchy collapses at the moment of the click.
const VARIANT: Record<Size, Record<Variant, string>> = {
  sm: {
    dark: "bg-navy text-white font-medium hover:bg-navy-light",
    light: "bg-white text-navy font-semibold ring-1 ring-navy/20 hover:ring-navy/40",
    accent: "bg-mint text-navy font-medium hover:bg-white",
  },
  lg: {
    dark: "bg-navy text-white font-medium hover:bg-white hover:text-navy",
    light: "bg-white text-navy font-semibold ring-1 ring-navy/20 hover:ring-navy/40",
    accent: "bg-mint text-navy font-medium hover:bg-white hover:text-navy",
  },
};

export function Button({
  children,
  href,
  variant,
  size = "lg",
  external,
  ariaLabel,
  className,
}: ButtonProps) {
  const classes = [BASE, SIZE[size], VARIANT[size][variant], className]
    .filter(Boolean)
    .join(" ");

  // Internal routes get client-side navigation; everything else is a plain anchor.
  if (!external && href.startsWith("/")) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
