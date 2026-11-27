import { LogoMark } from "@/components/Logo";
import { PartnerTile, type Partner } from "./PartnerTile";

export type { Partner };

const NAMES: Record<Partner, string> = {
  btcpay: "BTCPay Server",
  stripe: "Stripe",
};

/** The header layout the pair lives in: text on the left, and from `lg` the
 *  pair hanging on the right with its top edge level with the capitals of the
 *  headline's first line and its right edge on the page's. Put the pair first
 *  in the markup, so it leads on a phone. */
export const PARTNER_HEADER =
  "shell header-y grid items-start gap-y-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16";

/** Numo working with a partner, shown as two app-icon tiles of the same size:
 *  Numo's mint tile and the partner's own. The two tiles slide together once as
 *  the page opens.
 *
 *  From `lg` the pair is large enough to carry the right half of a page header
 *  on its own (see `PARTNER_HEADER`); below that it sits over the headline at
 *  icon size. BTCPay's mark stands on white with a hairline; Stripe's S on
 *  Stripe's own blurple. No "x", no rule, no wordmarks: the headline names them. */
export function PartnerPair({ partner, className = "" }: { partner: Partner; className?: string }) {
  const tile = "h-16 w-16 lg:h-[clamp(11rem,16.5vw,14.5rem)] lg:w-[clamp(11rem,16.5vw,14.5rem)]";

  return (
    <div
      role="img"
      aria-label={`Numo and ${NAMES[partner]}`}
      className={`flex gap-3 lg:order-2 lg:mt-3 lg:gap-6 ${className}`}
    >
      <span className={`partner-dock-left block ${tile}`}>
        <LogoMark className="block h-full w-full" />
      </span>
      <PartnerTile partner={partner} className={`partner-dock-right ${tile}`} />
    </div>
  );
}
