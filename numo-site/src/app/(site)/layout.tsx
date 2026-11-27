import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { breakData } from "@/breakdata";
import { FAQ_ITEMS } from "@/data/faq";
import { WALLET_GROUPS } from "@/components/home/Wallets";

/** Chrome shared by every public page: skip link, bar, footer. `/export/offline`
 *  sits outside this group on purpose — it is a bare capture surface. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Stress-test switch (see src/breakdata). In a production build `breakData`
  // returns nothing and the switch is never imported.
  const { mode, routeLinks, faq, walletGroups } = await breakData();
  // A home section with nothing in it is left out (Faq, Wallets), so the nav and
  // footer drop their links to it rather than point at nothing.
  const hiddenAnchors = [
    ...((walletGroups ?? WALLET_GROUPS).some((group) => group.wallets.length > 0) ? [] : ["wallets"]),
    ...((faq ?? FAQ_ITEMS).length > 0 ? [] : ["faq"]),
  ];
  const BreakToggle =
    process.env.NODE_ENV === "development"
      ? (await import("@/breakdata/BreakToggle")).BreakToggle
      : null;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation routeLinks={routeLinks} hiddenAnchors={hiddenAnchors} />
      {/* tabIndex -1 so the skip link moves focus into main, not just the scroll position */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter hiddenAnchors={hiddenAnchors} />
      {BreakToggle && <BreakToggle mode={mode} />}
    </>
  );
}
