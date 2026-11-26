import { LogoMark } from "@/components/Logo";
import styles from "./PartnerPair.module.css";

export type Partner = "btcpay" | "stripe";

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

/* Partner marks as inline SVG, so they can sit on a tile at any size. The paths
   are unchanged from each partner's own logo file. */
const BTCPAY_PATHS: [d: string, fill: string][] = [
  [
    "M2.16276 40.0005C1.58916 40.0005 1.03905 39.7533 0.633456 39.3133C0.227861 38.8734 0 38.2766 0 37.6544V2.35044C0 1.72823 0.227861 1.1315 0.633456 0.691532C1.03905 0.251564 1.58916 0.00439453 2.16276 0.00439453C2.73636 0.00439453 3.28646 0.251564 3.69206 0.691532C4.09765 1.1315 4.32551 1.72823 4.32551 2.35044V37.6544C4.32551 38.2766 4.09765 38.8734 3.69206 39.3133C3.28646 39.7533 2.73636 40.0005 2.16276 40.0005V40.0005Z",
    "#CEDC21",
  ],
  [
    "M2.16633 40C1.67578 39.9988 1.20018 39.8167 0.817588 39.4837C0.434999 39.1506 0.168154 38.6864 0.0608503 38.1672C-0.046453 37.6479 0.0121611 37.1045 0.227071 36.6262C0.441981 36.1479 0.800419 35.763 1.24355 35.5347L14.285 28.8211L0.883093 18.1154C0.644816 17.937 0.441989 17.7085 0.286641 17.4434C0.131292 17.1784 0.0265851 16.8822 -0.0212741 16.5725C-0.0691334 16.2627 -0.0591696 15.9457 0.00802668 15.6402C0.0752229 15.3347 0.198282 15.0469 0.369911 14.794C0.541539 14.5411 0.758242 14.3281 1.00717 14.1677C1.2561 14.0073 1.53218 13.9027 1.81905 13.8602C2.10592 13.8177 2.39774 13.8381 2.6772 13.9202C2.95667 14.0023 3.21809 14.1445 3.44596 14.3383L19.7531 27.3705C20.054 27.6116 20.292 27.9331 20.444 28.3038C20.5961 28.6744 20.6569 29.0815 20.6206 29.4853C20.5843 29.8891 20.4521 30.2757 20.2369 30.6075C20.0216 30.9393 19.7308 31.2049 19.3927 31.3783L3.09271 39.7732C2.80362 39.9236 2.48693 40.0011 2.16633 40V40Z",
    "#51B13E",
  ],
  [
    "M2.16667 26.1232C1.71118 26.1232 1.26732 25.9672 0.898359 25.6775C0.529399 25.3878 0.254179 24.9791 0.111942 24.5098C-0.0302958 24.0404 -0.0322892 23.5343 0.106245 23.0636C0.244779 22.5929 0.516768 22.1817 0.883432 21.8886L14.2781 11.1711L1.24389 4.46922C0.986856 4.33752 0.756252 4.15218 0.565247 3.9238C0.374241 3.69542 0.226574 3.42847 0.130678 3.13818C0.0347813 2.8479 -0.00746805 2.53996 0.00634371 2.23197C0.0201555 1.92397 0.089757 1.62194 0.211174 1.34312C0.332592 1.0643 0.503448 0.814158 0.713987 0.606966C0.924525 0.399773 1.17062 0.239592 1.43823 0.135569C1.70584 0.0315457 1.98971 -0.0142841 2.27364 0.000698096C2.55758 0.0156803 2.83601 0.0911818 3.09305 0.222889L19.4002 8.61781C19.7383 8.79125 20.0292 9.05683 20.2444 9.38862C20.4596 9.72041 20.5918 10.1071 20.6281 10.5108C20.6645 10.9146 20.6036 11.3217 20.4516 11.6924C20.2996 12.063 20.0615 12.3846 19.7607 12.6256L3.4463 25.6657C3.07554 25.9621 2.62724 26.1224 2.16667 26.1232Z",
    "#CEDC21",
  ],
  ["M4.32556 15.0381V24.9618L10.5291 20.0039L4.32556 15.0381Z", "#1E7A44"],
  ["M4.32551 10.8778H0V22.3148H4.32551V10.8778Z", "#fff"],
  [
    "M4.32551 2.35044C4.32551 1.72823 4.09765 1.1315 3.69206 0.691532C3.28646 0.251564 2.73636 0.00439453 2.16276 0.00439453C1.58916 0.00439453 1.03905 0.251564 0.633456 0.691532C0.227861 1.1315 0 1.72823 0 2.35044V31.8949H4.32551V2.35044Z",
    "#CEDC21",
  ],
];

function BTCPayMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20.7 40" className={className} aria-hidden="true">
      {BTCPAY_PATHS.map(([d, fill]) => (
        <path key={d.slice(0, 24)} d={d} fill={fill} />
      ))}
    </svg>
  );
}

function StripeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
    </svg>
  );
}

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
      <span className={`${styles.left} block ${tile}`}>
        <LogoMark className="block h-full w-full" />
      </span>
      {partner === "btcpay" ? (
        <span
          className={`${styles.right} flex items-center justify-center rounded-[27%] bg-surface ring-1 ring-inset ring-navy/10 ${tile}`}
        >
          <BTCPayMark className="h-[64%] w-auto" />
        </span>
      ) : (
        <span
          className={`${styles.right} flex items-center justify-center rounded-[27%] bg-[#635BFF] text-white ${tile}`}
        >
          <StripeMark className="h-[54%] w-auto" />
        </span>
      )}
    </div>
  );
}
