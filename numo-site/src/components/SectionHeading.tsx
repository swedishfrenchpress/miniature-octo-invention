import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg";
type Tone = "ink" | "inverse";

type SectionHeadingProps = {
  children: ReactNode;
  /** Semantic element. Visual size is controlled by `size`. Default 'h2'. */
  as?: "h2" | "h3";
  /** 'sm' = text-4xl md:text-5xl. 'md' = text-5xl md:text-6xl (default). 'lg' = the lead claim on a page. */
  size?: Size;
  /** 'ink' on light grounds (default). 'inverse' on the ink sections. */
  tone?: Tone;
  /** Optional explicit alignment. When undefined, inherits from parent. */
  align?: "left" | "center";
  /** Extra classes for margin-bottom, flex-1, etc. */
  className?: string;
};

const SIZE: Record<Size, string> = {
  sm: "text-4xl md:text-5xl",
  md: "text-5xl md:text-6xl",
  lg: "text-6xl md:text-7xl",
};

const TONE: Record<Tone, string> = {
  ink: "text-navy",
  inverse: "text-white",
};

const ALIGN = {
  left: "text-left",
  center: "text-center",
} as const;

export function SectionHeading({
  children,
  as: Tag = "h2",
  size = "md",
  tone = "ink",
  align,
  className,
}: SectionHeadingProps) {
  // No font-bold: Bebas Neue ships a single weight and browsers synthesize an
  // uneven bold from it, which dulls the condensed silhouette. Emphasis is size.
  const classes = [
    "font-display leading-[0.9]",
    TONE[tone],
    SIZE[size],
    align && ALIGN[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
