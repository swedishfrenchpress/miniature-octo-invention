import Image from "next/image";
import { checkWalletGroups, checkWalletIcons, hasPicture } from "@/data/checkContent";

const NFC_WALLETS = [
  { name: "eNuts", image: "/wallets/enuts.png" },
  { name: "Sovran", image: "/wallets/sovran.jpg" },
  { name: "Macadamia", image: "/wallets/macadamia.png" },
  { name: "Cashu.me", image: "/wallets/cashume.png" },
  { name: "Minibits", image: "/wallets/minibits.jpg" },
  { name: "Phoenix", image: "/wallets/phoenix.jpg" },
  { name: "Bey", image: "/wallets/bey.png" },
];

const LIGHTNING_WALLETS = [
  { name: "Alby Go", image: "/wallets/albygo.webp" },
  { name: "Blink Wallet", image: "/wallets/blinkwallet.jpg" },
  { name: "Cash App", image: "/wallets/cashapp.svg" },
  { name: "Fedi", image: "/wallets/fedi.jpg" },
  { name: "Muun", image: "/wallets/muun.png" },
  { name: "Strike", image: "/wallets/strike.png" },
  { name: "Wallet of Satoshi", image: "/wallets/walletofsatoshi.png" },
  { name: "Zeus", image: "/wallets/zeus.jpg" },
];

type Wallet = { name: string; image: string };

export type WalletGroupData = {
  title: string;
  detail: string;
  wallets: Wallet[];
  /** Shows the NFC mark beside the title. */
  nfc?: boolean;
};

export const WALLET_GROUPS: WalletGroupData[] = [
  { title: "Tap to pay", detail: "Cashu ecash wallets.", wallets: NFC_WALLETS, nfc: true },
  { title: "Scan to pay", detail: "Any Bitcoin Lightning wallet.", wallets: LIGHTNING_WALLETS },
];

// Warns if an icon file is missing or is not square. Icons are square app icons:
// a wide logo would be cropped to its middle.
checkWalletIcons([...NFC_WALLETS, ...LIGHTNING_WALLETS]);
checkWalletGroups(WALLET_GROUPS);

/** The first letter of a wallet's name, for a tile whose icon file is missing. */
const initial = (name: string) =>
  ([...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(name)][0]?.segment ?? "").toUpperCase();

function NfcIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-navy"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5.5 5.5a3.6 3.6 0 0 1 0 5" />
      <path d="M8.3 3.8a6.2 6.2 0 0 1 0 8.4" />
      <path d="M11 2.2a8.8 8.8 0 0 1 0 11.6" />
    </svg>
  );
}

function WalletGroup({ title, detail, wallets, nfc }: WalletGroupData) {
  return (
    // The last group drops its bottom padding: nothing follows it inside the
    // section, so the section's own space is the whole gap to the next hairline.
    <div className="grid gap-8 border-t border-line py-12 last:pb-0 md:grid-cols-[1fr_2.1fr] md:gap-14 md:py-16 md:last:pb-0">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-title text-navy">{title}</h3>
          {nfc && <NfcIcon />}
        </div>
        <p className="mt-2.5 max-w-[19rem] text-navy/70 [text-wrap:pretty]">{detail}</p>
      </div>
      {/* A tile has to hold a 40px icon and a one-word name as long as
          "LightningTipBot" on one line, so the list decides its own columns from
          its own width: three once it is 40rem wide, never four. The two-up step
          is 375px written in rem, so it still starts on a 375px phone and also
          waits for room when text is enlarged. */}
      <div className="@container">
        <ul className="grid grid-cols-1 gap-2.5 min-[23.4375rem]:grid-cols-2 sm:gap-3 @min-[40rem]:grid-cols-3">
          {wallets.map((wallet) => (
            <li
              key={wallet.name}
              className="flex items-center gap-2.5 rounded-[14px] border border-line bg-surface px-3 py-2.5 sm:gap-3 sm:px-3.5"
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[10px] bg-surface after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-navy/10 after:content-['']">
                {/* A missing icon file shows the wallet's first letter, not a
                    broken image or an empty box. The build warns about the file.
                    The hairline is drawn over the icon, not under it: an icon on
                    white (Phoenix, Fedi) covers a ring painted beneath it and loses
                    its tile's edge against the white tile. */}
                {hasPicture(wallet.image) ? (
                  <Image
                    src={wallet.image}
                    alt=""
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center bg-sunken text-[0.9375rem] font-semibold text-navy/60"
                  >
                    {initial(wallet.name)}
                  </span>
                )}
              </span>
              <span className="min-w-0 text-sm font-medium leading-tight text-navy">{wallet.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Wallets({ groups = WALLET_GROUPS }: { groups?: WalletGroupData[] }) {
  // A group with no wallets is left out; with none left, so is the section,
  // and the layout drops the nav and footer links to it.
  const shown = groups.filter((group) => group.wallets.length > 0);
  if (shown.length === 0) return null;

  return (
    <section
      id="wallets"
      className="section-anchor section-y border-y border-line bg-paper"
    >
      <div className="shell">
        <h2 className="text-display max-w-[8em] text-navy">
          Your customers already have the wallet.
        </h2>
        <p className="text-lead measure mt-5 text-navy/70 md:mt-6">
          Works with any Lightning wallet. Tap to pay works with Cashu wallets.
        </p>

        <div className="mt-block">
          {shown.map((group) => (
            <WalletGroup key={group.title} {...group} />
          ))}
        </div>
      </div>
    </section>
  );
}
