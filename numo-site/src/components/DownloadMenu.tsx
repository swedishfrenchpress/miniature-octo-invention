"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BUTTON_BASE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
  type ButtonSize,
  type ButtonVariant,
} from "./Button";

import { DOWNLOAD_APK_URL, ZAPSTORE_URL } from "@/lib/links";

export { DOWNLOAD_APK_URL, ZAPSTORE_URL };

type DownloadMenuProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  align?: "left" | "right";
  direction?: "down" | "up";
  className?: string;
};

/** Non-blocking install chooser: makes Android APK sideloading and Zapstore
 *  transparent at the moment of click instead of dropping merchants cold onto
 *  a raw GitHub releases list. Built on native `<details>` so the menu still
 *  opens without JavaScript, enhanced with Escape and outside-click dismiss. */
/** The corner of the panel that touches its button, which it grows out of. */
const ORIGIN = {
  down: { left: "origin-top-left", right: "origin-top-right" },
  up: { left: "origin-bottom-left", right: "origin-bottom-right" },
} as const;

export function DownloadMenu({
  variant,
  size = "md",
  label = "Download",
  align = "left",
  direction = "down",
  className,
}: DownloadMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const popoverId = useId();
  const isSetup = pathname === "/setup" || pathname.startsWith("/setup/");

  const close = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!detailsRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleBlur = (e: React.FocusEvent<HTMLDetailsElement>) => {
    if (open && !detailsRef.current?.contains(e.relatedTarget as Node | null)) {
      close();
    }
  };

  const triggerClasses = [
    BUTTON_BASE,
    BUTTON_SIZE[size],
    BUTTON_VARIANT[variant],
    "list-none [&::-webkit-details-marker]:hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <details
      ref={detailsRef}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      onBlur={handleBlur}
      className="group relative inline-block"
    >
      <summary ref={triggerRef} aria-controls={popoverId} className={triggerClasses}>
        <span>{label}</span>
        <svg
          className="h-3.5 w-3.5 opacity-75 transition-transform duration-150 ease-[var(--ease-in-out)] group-open:rotate-180"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <div
        id={popoverId}
        role="group"
        aria-label="Download options for Android"
        className={`absolute z-50 w-[296px] max-w-[calc(100vw-2rem)] rounded-card bg-surface p-2 text-left text-navy ring-1 ring-navy/15 transition-[opacity,scale] duration-150 ease-[var(--ease-out-expo)] starting:scale-[0.97] starting:opacity-0 ${
          direction === "up" ? "bottom-full mb-2.5" : "top-full mt-2.5"
        } ${align === "right" ? "right-0" : "left-0"} ${ORIGIN[direction][align]}`}
      >
        <a
          href={DOWNLOAD_APK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="flex min-h-11 items-start justify-between gap-3 rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-sunken"
        >
          <div>
            <div className="text-sm font-semibold text-navy">Download APK</div>
            <div className="text-caption mt-0.5 text-navy/70">
              Direct from GitHub Releases
              <span className="sr-only"> (opens in a new tab)</span>
            </div>
          </div>
        </a>

        <a
          href={ZAPSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-0.5 flex min-h-11 items-start justify-between gap-3 rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-sunken"
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <span>Zapstore</span>
              <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[11px] font-semibold text-navy">
                Auto-updates
              </span>
            </div>
            <div className="text-caption mt-0.5 text-navy/70">
              Signed Android app
              <span className="sr-only"> (opens in a new tab)</span>
            </div>
          </div>
        </a>

        {/* The guide link answers like the rows above it (the One Link Style
            Rule): same tint under the pointer, no underline. */}
        <div className="mt-2 flex items-center justify-between border-t border-line pb-0.5 pl-3 pt-1.5">
          <span className="text-caption text-navy/70">Android with NFC</span>
          {!isSetup && (
            <Link
              href="/setup"
              onClick={close}
              className="text-caption inline-flex min-h-11 items-center rounded-[10px] px-3 font-semibold text-navy transition-colors duration-150 hover:bg-sunken"
            >
              Setup guide
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}
