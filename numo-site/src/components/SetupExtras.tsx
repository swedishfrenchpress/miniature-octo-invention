import type { ReactNode } from "react";
import { Button } from "./Button";
import { PartnerIcon3D } from "./PartnerIcon3D";
import type { Partner } from "./PartnerPair";

/** One optional extra: the partner's app icon as a live 3D object on a dark
 *  stage, a faint halo of its own colour behind it, and under it the question a
 *  merchant would ask themselves, one line, and the way in. */
function Extra({
  id,
  partner,
  glow,
  label,
  title,
  body,
  action,
}: {
  id?: string;
  partner: Partner;
  glow: string;
  label: string;
  title: string;
  body: string;
  action: ReactNode;
}) {
  return (
    <div id={id} className={id ? "section-anchor" : undefined}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink-deep">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `radial-gradient(62% 58% at 50% 52%, ${glow}, transparent 74%)` }}
        />
        <PartnerIcon3D partner={partner} label={label} />
      </div>
      <h3 className="text-title mt-8 text-navy md:mt-9">{title}</h3>
      <p className="text-lead measure mt-3 text-navy/70">{body}</p>
      <div className="mt-7">{action}</div>
    </div>
  );
}

/** The end of the setup guide: the two things a merchant can add, side by side.
 *  Either, both or neither. The two buttons are the same solid pill; the colour
 *  belongs to the icons. */
export function SetupExtras() {
  return (
    <div className="shell">
      <h2 id="extras-heading" className="text-display text-navy">
        Optional extras.
      </h2>

      <div className="mt-block grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-10">
        <Extra
          partner="btcpay"
          glow="rgb(120 200 50 / 0.16)"
          label="The BTCPay Server app icon"
          title="Run a BTCPay Server store?"
          body="Connect it, and every sale at the till becomes an invoice in your store."
          action={
            <Button href="/btcpay" variant="primary" size="lg">
              Connect BTCPay Server
            </Button>
          }
        />
        {/* `#cards` is kept as a stable anchor for the card option. */}
        <Extra
          id="cards"
          partner="stripe"
          glow="rgb(99 91 255 / 0.3)"
          label="The Stripe app icon"
          title="Want to take cards?"
          body="Connect your Stripe account, and the same phone takes contactless cards, Apple Pay and Google Pay."
          action={
            <Button href="/setup/stripe" variant="primary" size="lg">
              Set up Stripe
            </Button>
          }
        />
      </div>
    </div>
  );
}
