import type { ReactNode } from "react";

/** The bezel every full app screenshot sits in. Android proportions; the capture
 *  itself carries the status bar. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-ink-deep p-[5px] shadow-device">
      <div className="relative overflow-hidden rounded-[23px]">{children}</div>
    </div>
  );
}
