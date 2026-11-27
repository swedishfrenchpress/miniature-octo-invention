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
  "relative inline-flex max-w-full shrink-0 cursor-pointer select-none items-center justify-center gap-2 text-center [text-wrap:balance] rounded-control font-medium tracking-[-0.005em] [transition:background-color_200ms_ease,box-shadow_200ms_ease,color_200ms_ease,scale_150ms_var(--ease-out-expo)] active:scale-[0.97]";

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  // A pill's round ends eat into its sides, so each size carries a little more
  // side padding than a squared button would.
  //
  // A label stays on one line unless the button would be wider than its column
  // (a long translated label on a phone with enlarged text); then it wraps,
  // balanced, and the pill grows taller. So each size is a minimum height plus
  // the padding that gives exactly that height on one line, never a fixed one.
  sm: "min-h-9 py-2 px-4 text-sm after:absolute after:-inset-y-1 after:inset-x-0 after:content-['']",
  md: "min-h-11 py-2.5 px-6 text-[0.9375rem]",
  lg: "min-h-12 py-3 px-7 text-[0.9375rem]",
};

/* Hover (and, under a finger, press) never fades a button. A filled button's
   colour takes one small step toward its opposite; an outlined button's outline
   firms up. The colour eases over 200ms; the press shrink is quicker and snappier. */
export const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-navy-light",
  secondary: "bg-surface text-navy ring-1 ring-navy/50 hover:bg-surface-tint hover:ring-navy",
  mint: "bg-mint font-semibold text-navy hover:bg-mint-deep",
  inverse: "bg-white text-navy hover:bg-surface-tint",
  "ghost-inverse":
    "bg-white/10 text-white ring-1 ring-inset ring-white/[0.22] hover:bg-white/[0.16] hover:ring-white/40",
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
