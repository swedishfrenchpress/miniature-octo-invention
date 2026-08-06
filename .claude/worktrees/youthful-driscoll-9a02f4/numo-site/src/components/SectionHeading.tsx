import type { ReactNode } from "react";

type Size = "sm" | "md";

type SectionHeadingProps = {
  children: ReactNode;
  /** Semantic element. Visual size is controlled by `size`. Default 'h2'. */
  as?: "h2" | "h3";
  /** 'sm' = text-4xl md:text-5xl. 'md' = text-5xl md:text-6xl (default). */
  size?: Size;
  /** Optional explicit alignment. When undefined, inherits from parent. */
  align?: "left" | "center";
  /** Extra classes for margin-bottom, flex-1, etc. */
  className?: string;
};

const SIZE: Record<Size, string> = {
  sm: "text-4xl md:text-5xl",
  md: "text-5xl md:text-6xl",
};

const ALIGN = {
  left: "text-left",
  center: "text-center",
} as const;

export function SectionHeading({
  children,
  as: Tag = "h2",
  size = "md",
  align,
  className,
}: SectionHeadingProps) {
  const classes = [
    "font-display text-navy leading-[0.9] font-bold",
    SIZE[size],
    align && ALIGN[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
