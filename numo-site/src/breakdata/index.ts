import type { Release } from "@/data/releases";
import type { FaqItem } from "@/components/home/Faq";
import type { WalletGroupData } from "@/components/home/Wallets";
import type { NavItem } from "@/components/Navigation";
import type { SetupStep } from "@/components/SetupSequence";
import { BREAK_COOKIE, BREAK_MODES, type BreakMode } from "./modes";

/** What a stress state replaces. A key that is absent leaves the real content. */
export type BreakData = {
  releases?: Release[];
  walletGroups?: WalletGroupData[];
  faq?: FaqItem[];
  routeLinks?: NavItem[];
  tillSteps?: SetupStep[];
  payoutSteps?: SetupStep[];
  keySteps?: SetupStep[];
  connectSteps?: SetupStep[];
};

/** The stress state chosen with the on-page switch, and the content it swaps in.
 *
 *  In a production build this returns at once with nothing: it never reads the
 *  cookie, so every page stays static, and the fixtures are never imported. */
export async function breakData(): Promise<BreakData & { mode: BreakMode }> {
  if (process.env.NODE_ENV !== "development") return { mode: "demo" };

  const { cookies } = await import("next/headers");
  const value = (await cookies()).get(BREAK_COOKIE)?.value ?? "demo";
  // "empty-all" is not on the switch: it also empties the release list, which
  // takes /releases down, so it is only ever set by a test.
  const mode = (BREAK_MODES as readonly string[]).includes(value) ? (value as BreakMode) : "demo";
  if (value !== "empty-all" && (mode === "demo" || mode === "german")) return { mode };

  const { FIXTURES, EMPTY_ALL } = await import("./fixtures");
  if (value === "empty-all") return { mode: "empty", ...EMPTY_ALL };
  return { mode, ...FIXTURES[mode as "worst" | "empty" | "one" | "many"] };
}
