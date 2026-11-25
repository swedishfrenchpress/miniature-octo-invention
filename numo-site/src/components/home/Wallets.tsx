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

function WalletGroup({
  title,
  detail,
  wallets,
  nfc,
}: {
  title: string;
  detail: string;
  wallets: Wallet[];
  nfc?: boolean;
}) {
  return (
    <div className="grid gap-8 border-t border-line py-10 md:grid-cols-[1fr_2.1fr] md:gap-14 md:py-12">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-title text-navy">{title}</h3>
          {nfc && <NfcIcon />}
        </div>
        <p className="mt-2.5 max-w-[19rem] text-navy/70 [text-wrap:pretty]">{detail}</p>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {wallets.map((wallet) => (
          <li
            key={wallet.name}
            className="flex items-center gap-3 rounded-[14px] border border-line bg-surface px-3.5 py-2.5"
          >
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[10px] bg-surface ring-1 ring-inset ring-navy/10">
              <Image
                src={wallet.image}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-sm font-medium leading-tight text-navy">{wallet.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Wallets() {
  return (
    <section
      id="wallets"
      className="section-anchor border-y border-line bg-sunken py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-display max-w-[16ch] text-navy">
          Your customers already have the wallet.
        </h2>
        <p className="text-lead mt-4 max-w-[34rem] text-navy/70">
          Works with any Lightning wallet. Tap to pay works with Cashu wallets.
        </p>

        <div className="mt-12 md:mt-16">
          <WalletGroup
            title="Tap to pay"
            detail="Cashu ecash wallets."
            wallets={NFC_WALLETS}
            nfc
          />
          <WalletGroup
            title="Scan to pay"
            detail="Any Bitcoin Lightning wallet."
            wallets={LIGHTNING_WALLETS}
          />
        </div>
      </div>
    </section>
  );
}
