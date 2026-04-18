import type { ReactNode } from "react";

type Variant = "dark" | "light" | "accent";
type Size = "sm" | "lg";

type ButtonProps = {
  children: ReactNode;
  href: string;
  /** 'dark' = navy bg / white text. 'light' = white/90 bg / navy text. 'accent' = mint bg / navy text. */
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
  sm: "inline-flex px-5 py-2.5 text-sm",
  lg: "flex gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-base shadow-lg ease-out w-full sm:w-auto min-w-[200px] sm:min-w-0",
};

const VARIANT: Record<Size, Record<Variant, string>> = {
  sm: {
    dark: "bg-navy text-white font-medium hover:bg-navy-light",
    light: "bg-white/90 text-navy font-semibold hover:bg-white",
    accent: "bg-mint text-navy font-medium hover:bg-white",
  },
  lg: {
    dark: "bg-navy text-white font-medium hover:bg-white hover:text-navy",
    light: "bg-white/90 text-navy font-semibold hover:bg-white",
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
