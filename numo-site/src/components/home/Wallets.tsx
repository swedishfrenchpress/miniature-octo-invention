import Image from "next/image";

const NFC_WALLETS = [
  { name: "eNuts", image: "/wallets/enuts.png" },
  { name: "Sovran", image: "/wallets/sovran.jpg" },
  { name: "Macadamia", image: "/wallets/macadamia.jpg" },
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

/** One tier of wallets: what the tier means on the left, who is in it on the right. */
function WalletGroup({
  title,
  detail,
  wallets,
  last,
}: {
  title: string;
  detail: string;
  wallets: Wallet[];
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-6 p-7 md:grid-cols-[15rem_1fr] md:gap-10 md:p-9 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <div>
        <h3 className="text-h3 text-navy">{title}</h3>
        <p className="mt-1.5 text-sm text-navy/70 [text-wrap:pretty]">{detail}</p>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
        {wallets.map((wallet) => (
          <li key={wallet.name} className="flex items-center gap-3">
            <Image
              src={wallet.image}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-[8px] object-cover ring-1 ring-line"
            />
            <span className="text-sm font-medium text-navy">{wallet.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Wallets() {
  return (
    <section id="wallets" className="section-anchor border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-h2 text-navy">Supported wallets</h2>
        <p className="text-lead mt-5 max-w-[34rem] text-navy/70">
          Works with any Bitcoin Lightning wallet. Tap to pay is available for ecash
          wallets.
        </p>

        <div className="mt-12 overflow-hidden rounded-card border border-line bg-surface md:mt-16">
          <WalletGroup
            title="Tap to pay"
            detail="Cashu ecash wallets that pay with an NFC tap."
            wallets={NFC_WALLETS}
          />
          <WalletGroup
            title="Scan to pay"
            detail="These, and every other Bitcoin Lightning wallet."
            wallets={LIGHTNING_WALLETS}
            last
          />
        </div>
      </div>
    </section>
  );
}
