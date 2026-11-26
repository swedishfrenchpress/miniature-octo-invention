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
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium tracking-[-0.005em] transition-[background-color,color,scale] duration-150 ease-[var(--ease-out-expo)] active:scale-[0.97]";

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm after:absolute after:-inset-y-1 after:inset-x-0 after:content-['']",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem]",
};

export const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-light",
  secondary:
    "bg-surface text-navy ring-1 ring-navy/50 hover:bg-sunken/70",
  mint:
    "bg-mint font-semibold text-navy hover:bg-[#7DFFD0]",
  inverse: "bg-white text-navy hover:bg-white/90",
  "ghost-inverse":
    "bg-white/10 text-white ring-1 ring-inset ring-white/[0.22] hover:bg-white/[0.18]",
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
