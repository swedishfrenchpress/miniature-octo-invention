import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "inverse" | "ghost-inverse";
/** Names from the previous system, still used by sections not yet converted. */
type LegacyVariant = "dark" | "light" | "accent";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href: string;
  /** 'primary' = navy. 'secondary' = white with a hairline. On the navy section:
   *  'inverse' = white, 'ghost-inverse' = outlined. */
  variant: Variant | LegacyVariant;
  /** 'sm' = 36px, for the nav. 'md' = 44px (default). */
  size?: Size;
  /** If true, opens in new tab with safe rel attributes. */
  external?: boolean;
  ariaLabel?: string;
  className?: string;
};

const BASE =
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control text-sm font-medium tracking-[-0.005em] transition-[background-color,box-shadow] duration-150";

// Buttons are deliberately slim (36px in the bar, 40px elsewhere); the ::after
// extends the hit area to 44px so they stay comfortable touch targets.
const SIZE: Record<Size, string> = {
  sm: "h-9 px-3.5 after:absolute after:-inset-y-1 after:inset-x-0 after:content-['']",
  md: "h-10 px-[1.125rem] after:absolute after:-inset-y-0.5 after:inset-x-0 after:content-['']",
  lg: "h-10 px-[1.125rem] after:absolute after:-inset-y-0.5 after:inset-x-0 after:content-['']",
};

// Edges are drawn with 1px shadows rather than borders: a lit top edge on the ink
// button, a hairline plus a faint drop on the white one. That is the whole of a
// button's depth. On footage or ink, the quiet button is frosted glass.
const VARIANT: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(10_37_64/0.24)] hover:bg-navy-light",
  secondary:
    "bg-surface text-navy shadow-[0_0_0_1px_rgb(10_37_64/0.12),0_1px_2px_rgb(10_37_64/0.06)] hover:bg-paper",
  inverse: "bg-white text-navy shadow-[0_1px_2px_rgb(6_24_43/0.3)] hover:bg-white/90",
  "ghost-inverse":
    "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] backdrop-blur-md hover:bg-white/[0.16]",
};

const LEGACY: Record<LegacyVariant, Variant> = {
  dark: "primary",
  light: "secondary",
  accent: "primary",
};

export function Button({
  children,
  href,
  variant,
  size = "md",
  external,
  ariaLabel,
  className,
}: ButtonProps) {
  const resolved = variant in LEGACY ? LEGACY[variant as LegacyVariant] : (variant as Variant);
  const classes = [BASE, SIZE[size], VARIANT[resolved], className].filter(Boolean).join(" ");

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
