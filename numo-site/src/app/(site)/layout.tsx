import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";

/** Chrome shared by every public page: skip link, bar, footer. `/export/offline`
 *  sits outside this group on purpose — it is a bare capture surface. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      {/* tabIndex -1 so the skip link moves focus into main, not just the scroll position */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
