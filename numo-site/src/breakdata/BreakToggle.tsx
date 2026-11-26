"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BREAK_COOKIE, BREAK_LABELS, BREAK_MODES, type BreakMode } from "./modes";
import { GERMAN } from "./german";

const clean = (text: string) => text.replace(/\s+/g, " ").replace(/[’‘]/g, "'").trim();

/** Swaps text the way a browser's translator does: text node by text node, in
 *  place. It skips the depicted screens (inert) and this switch itself. */
function translate(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const el = node.parentElement;
    if (!el || el.closest("[inert], [data-break-toggle], script, style")) continue;
    const value = node.nodeValue ?? "";
    const german = GERMAN[clean(value)];
    if (german) node.nodeValue = value.replace(value.trim(), german);
  }
}

function remember(mode: BreakMode) {
  document.cookie = `${BREAK_COOKIE}=${mode}; path=/; max-age=86400; samesite=lax`;
}

/** The stress-test switch. Development only: the layout renders it only when
 *  `NODE_ENV` is "development".
 *
 *  It is deliberately not styled like the site. It is test equipment, so it is
 *  a plain grey control in the system font that nobody could mistake for part
 *  of the design under test. */
export function BreakToggle({ mode }: { mode: BreakMode }) {
  const router = useRouter();

  useEffect(() => {
    if (mode !== "german") return;
    translate(document.body);
    // Content that mounts later (the download menu, a page change) is translated too.
    const observer = new MutationObserver(() => translate(document.body));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [mode]);

  const choose = (next: BreakMode) => {
    remember(next);
    // German rewrites text in place, so leaving it needs a clean page.
    if (mode === "german") window.location.reload();
    else router.refresh();
  };

  return (
    <div
      data-break-toggle
      role="group"
      aria-label="Stress-test data"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 12,
        transform: "translateX(-50%)",
        zIndex: 2147483000,
        display: "flex",
        gap: 2,
        padding: 3,
        borderRadius: 10,
        background: "#d4d4d8",
        font: "500 12px/1 system-ui, sans-serif",
        maxWidth: "calc(100vw - 16px)",
        overflowX: "auto",
      }}
    >
      {BREAK_MODES.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === mode}
          onClick={() => choose(option)}
          style={{
            padding: "7px 10px",
            borderRadius: 7,
            border: 0,
            whiteSpace: "nowrap",
            cursor: "pointer",
            color: option === mode ? "#18181b" : "#52525b",
            background: option === mode ? "#fff" : "transparent",
          }}
        >
          {BREAK_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
