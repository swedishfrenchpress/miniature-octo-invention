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

/** One tier of wallets: what the tier means on the left, who is in it on the right.
 *  No frame — a single hairline separates the two tiers. */
function WalletGroup({
  title,
  detail,
  wallets,
}: {
  title: string;
  detail: string;
  wallets: Wallet[];
}) {
  return (
    <div className="grid gap-8 border-t border-line py-10 md:grid-cols-[1fr_2fr] md:gap-16 md:py-14">
      <div>
        <h3 className="text-title text-navy">{title}</h3>
        <p className="mt-2 max-w-[18rem] text-navy/70 [text-wrap:pretty]">{detail}</p>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
        {wallets.map((wallet) => (
          <li key={wallet.name} className="flex items-center gap-3.5">
            <Image
              src={wallet.image}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-[11px] object-cover"
            />
            <span className="font-medium text-navy">{wallet.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Wallets() {
  return (
    <section id="wallets" className="section-anchor py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-display max-w-[15ch] text-navy">Your customers already have the wallet.</h2>
        <p className="text-lead mt-6 max-w-[34rem] text-navy/70">
          Works with any Bitcoin Lightning wallet. Tap to pay is available for ecash
          wallets.
        </p>

        <div className="mt-16 md:mt-24">
          <WalletGroup
            title="Tap to pay"
            detail="Cashu ecash wallets that pay with an NFC tap."
            wallets={NFC_WALLETS}
          />
          <WalletGroup
            title="Scan to pay"
            detail="These, and every other Bitcoin Lightning wallet."
            wallets={LIGHTNING_WALLETS}
          />
        </div>
      </div>
    </section>
  );
}
