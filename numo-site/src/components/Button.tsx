import type { ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "mint" | "inverse" | "ghost-inverse";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** 'primary' = navy. 'secondary' = white with hairline. On dark grounds:
   *  'mint' = Fresh Paint Mint primary CTA, 'inverse' = white, 'ghost-inverse' = outlined. */
  variant: ButtonVariant;
  /** 'sm' = 36px (+44px hit extension), 'md' = 44px (default), 'lg' = 48px (hero/footer). */
  size?: ButtonSize;
  /** If true, opens in a new tab with safe rel attributes. */
  external?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: "menu" | "dialog" | "listbox";
  className?: string;
};

export const BUTTON_BASE =
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium tracking-[-0.005em] transition-[background-color,box-shadow,color,transform] duration-150 active:scale-[0.98]";

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm after:absolute after:-inset-y-1 after:inset-x-0 after:content-['']",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem]",
};

export const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(10_37_64/0.24)] hover:bg-navy-light",
  secondary:
    "bg-surface text-navy shadow-[0_0_0_1px_rgb(10_37_64/0.48),0_1px_2px_rgb(10_37_64/0.08)] hover:bg-sunken/70",
  mint:
    "bg-mint font-semibold text-navy shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_2px_8px_rgb(6_24_43/0.28)] hover:bg-[#7DFFD0]",
  inverse: "bg-white text-navy shadow-[0_1px_2px_rgb(6_24_43/0.3)] hover:bg-white/90",
  "ghost-inverse":
    "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.22)] hover:bg-white/[0.18]",
};

export function Button({
  children,
  href,
  onClick,
  variant,
  size = "md",
  external,
  ariaLabel,
  ariaExpanded,
  ariaHaspopup,
  className,
}: ButtonProps) {
  const classes = [BUTTON_BASE, BUTTON_SIZE[size], BUTTON_VARIANT[variant], className]
    .filter(Boolean)
    .join(" ");

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
      >
        {children}
      </button>
    );
  }

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
