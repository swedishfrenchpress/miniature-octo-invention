import type { ReactNode, Ref } from "react";

type Variant = "cream" | "cream-warm" | "mint-pale" | "mint-soft" | "gray";
type Size = "sm" | "md" | "lg";
type Radius = "md" | "lg";

type BentoCardProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  radius?: Radius;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

const BG: Record<Variant, string> = {
  cream: "bg-cream",
  "cream-warm": "bg-cream-warm",
  "mint-pale": "bg-mint-pale",
  "mint-soft": "bg-mint-soft",
  gray: "bg-gray-100",
};

const PADDING: Record<Size, string> = {
  sm: "p-6",
  md: "p-8",
  lg: "p-8 md:p-12",
};

const RADIUS: Record<Radius, string> = {
  md: "rounded-[2rem]",
  lg: "rounded-[3rem]",
};

export function BentoCard({
  children,
  variant = "cream",
  size = "md",
  radius = "md",
  className,
  ref,
}: BentoCardProps) {
  const classes = [
    BG[variant],
    RADIUS[radius],
    PADDING[size],
    "relative noise-overlay",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
