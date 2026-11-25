"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "numo-setup-preflight-v1";

const ITEMS = [
  "Recovery phrase written down offline",
  "Test sale appears in Activity",
  "Auto-Withdraw reads Active with a valid Lightning address",
  "Terminal is charged and connected to the internet",
];

/** Real interactive merchant preflight checklist persisted in localStorage so
 *  counter operators keep their place when switching between Chrome, Numo,
 *  and their Lightning wallet on mobile. */
export function PreflightChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, unknown>;
        if (parsed && typeof parsed === "object") {
          const valid: Record<string, boolean> = {};
          for (const item of ITEMS) {
            if (parsed[item] === true) valid[item] = true;
          }
          setChecked(valid);
        }
      }
    } catch {
      // Storage unavailable (private mode or restricted WebView); stay in memory.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // Ignore quota or storage restrictions gracefully.
    }
  }, [checked, hydrated]);

  const toggle = (item: string) =>
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));

  const reset = () => setChecked({});

  const doneCount = ITEMS.filter((item) => checked[item]).length;
  const allDone = doneCount === ITEMS.length;

  return (
    <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 className="text-h3 text-navy">Check before you open</h3>
        <div className="flex items-center gap-2.5">
          <span
            aria-live="polite"
            className={`tabular text-caption shrink-0 font-medium transition-colors duration-150 ${
              allDone
                ? "rounded-full bg-mint-soft px-2.5 py-0.5 font-semibold text-navy ring-1 ring-inset ring-navy/10"
                : "text-navy/65"
            }`}
          >
            {doneCount} of {ITEMS.length} checked
          </span>
          {doneCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="text-caption inline-flex min-h-11 cursor-pointer items-center rounded-chip px-2 font-medium text-navy/70 underline decoration-navy/30 underline-offset-[3px] transition-colors duration-150 hover:text-navy hover:decoration-navy"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <ul className="mt-4 border-t border-line">
        {ITEMS.map((item) => {
          const isChecked = !!checked[item];
          return (
            <li key={item} className="border-b border-line last:border-b-0">
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(item)}
                className="flex min-h-[52px] w-full cursor-pointer items-center gap-3.5 py-3 text-left transition-colors duration-150 hover:text-navy"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors duration-150 ${
                    isChecked
                      ? "border-navy bg-mint text-navy"
                      : "border-navy/60 bg-surface text-transparent"
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                  >
                    <path d="M3.5 8.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span
                  className={`text-[0.9375rem] leading-snug ${
                    isChecked ? "text-navy line-through decoration-navy/35" : "text-navy/75"
                  }`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {allDone && (
        <p
          role="status"
          className="mt-5 rounded-[12px] bg-mint-soft px-4 py-3 text-sm font-medium text-navy ring-1 ring-inset ring-navy/10"
        >
          All set. Your till is ready for live sales.
        </p>
      )}
    </div>
  );
}
