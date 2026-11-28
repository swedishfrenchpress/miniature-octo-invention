import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found - Numo",
};

/** Any address the site does not have. It renders outside the `(site)` group,
 *  so it brings the same chrome itself: skip link, bar, footer. The heading
 *  keeps to the letters GC Protage's demo cut has (no apostrophe, no digits). */
export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <header className="bg-paper pt-[72px] md:pt-[84px]">
          <div className="shell header-y">
            <h1 className="text-display max-w-[8em] text-navy">Nothing at this address.</h1>
            <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
              The link may be out of date, or the address has a typo.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <Button href="/" variant="primary" size="md">
                Home page
              </Button>
              <Button href="/setup" variant="secondary" size="md">
                Setup guide
              </Button>
            </div>
          </div>
        </header>
      </main>
      <SiteFooter />
    </>
  );
}
