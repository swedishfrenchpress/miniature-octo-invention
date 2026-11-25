import { Roboto } from "next/font/google";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./NumoApp.module.css";

// Android's system face, which the Numo app is set in. Loaded only on the
// route that depicts the app.
const roboto = Roboto({
  variable: "--font-android",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export type NumoScreen = "keypad" | "pay" | "received";

export type NumoAppState = {
  screen: NumoScreen;
  /** Status-bar clock, e.g. "2:41". */
  clock: string;
  /** Fiat amount as the app prints it, e.g. "$21.00". */
  amount: string;
  /** Sats equivalent, e.g. "28,193 sat". */
  sats: string;
  /** Which control is under the finger: a keypad label, "charge" or "close". */
  pressed: string | null;
  /** Charge has been tapped and the invoice is being created. */
  charging: boolean;
  /** Which of the demo's QR codes the Pay screen shows, once it has loaded. */
  qr: number;
  qrReady: boolean;
  touch: { x: number; y: number; shown: boolean; down: boolean };
};

/* The app's own Material Symbols drawables (res/drawable/ic_*.xml), which use a
   960-unit grid, and Android's three status-bar glyphs on the 24-unit grid. */
const SYMBOLS = {
  catalog:
    "M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z",
  history:
    "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z",
  settings:
    "m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z",
  switchCurrency:
    "M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z",
  close:
    "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
  share:
    "M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z",
  check: "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z",
  contactless:
    "M336-374q9-24 14.5-50.5T356-480q0-29-5.5-55.5T336-586l-74 30q6 18 10 37t4 39q0 20-4 39t-10 37l74 30Zm128 54q17-38 24.5-78t7.5-82q0-42-7.5-82T464-640l-74 30q14 30 20 62.5t6 67.5q0 35-6 67.5T390-350l74 30Zm130 54q21-50 31.5-103.5T636-480q0-57-10.5-110.5T594-694l-74 32q18 42 27 88t9 94q0 48-9 94t-27 88l74 32ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
  lightning:
    "m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z",
} as const;

const SYSTEM = {
  wifi: "M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z",
  signal: "M2 22h20V2z",
  battery:
    "M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z",
} as const;

function Symbol({ name }: { name: keyof typeof SYMBOLS }) {
  return (
    <svg className={styles.icon} viewBox="0 -960 960 960" aria-hidden="true">
      <path d={SYMBOLS[name]} />
    </svg>
  );
}

function SystemGlyph({ name }: { name: keyof typeof SYSTEM }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={SYSTEM[name]} />
    </svg>
  );
}

function Spinner({ shown, size }: { shown: boolean; size?: number }) {
  return (
    <svg
      className={styles.spinner}
      viewBox="0 0 48 48"
      data-shown={shown || undefined}
      style={size ? ({ "--size": `${size}px` } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" />
    </svg>
  );
}

/** The keypad order the app builds in KeypadManager. */
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "<"];

/** Three real screens of the Numo app: the keypad, the payment request and the
 *  payment-received confirmation. Purely presentational; `data-target` marks
 *  what the demo's finger can tap. */
export function NumoApp({ state, still = false }: { state: NumoAppState; still?: boolean }) {
  const { screen, pressed, touch } = state;

  return (
    <div
      className={`${styles.screen} ${roboto.variable}`}
      data-screen={screen}
      data-still={still || undefined}
    >
      <div className={styles.statusBar}>
        <span>{state.clock}</span>
        <span className={styles.statusIcons}>
          <SystemGlyph name="wifi" />
          <SystemGlyph name="signal" />
          <SystemGlyph name="battery" />
        </span>
      </div>

      <div className={styles.pos}>
        <div className={styles.posBar}>
          <span>
            <Symbol name="catalog" />
          </span>
          <span>
            <Symbol name="history" />
          </span>
          <span>
            <Symbol name="settings" />
          </span>
        </div>

        <div className={styles.posAmount}>
          <div className={styles.amount}>{state.amount}</div>
          <div className={styles.secondary}>
            {state.sats}
            <Symbol name="switchCurrency" />
          </div>
        </div>

        <div className={styles.keypad}>
          {KEYS.map((key) => (
            <div
              key={key}
              className={styles.key}
              data-target={`key-${key}`}
              data-pressed={pressed === key || undefined}
            >
              {key}
            </div>
          ))}
        </div>

        <div
          className={styles.charge}
          data-target="charge"
          data-pressed={pressed === "charge" || undefined}
          data-busy={state.charging || undefined}
        >
          <span>Charge</span>
          <Spinner shown={state.charging} />
        </div>
      </div>

      <div className={styles.sheet} data-shown={screen !== "keypad" || undefined}>
        <div className={styles.sheetBar}>
          <span>
            <Symbol name="close" />
          </span>
          <span>
            <Symbol name="share" />
          </span>
        </div>
        <div className={styles.payLabel}>Pay</div>
        <div className={styles.payAmount}>{state.amount}</div>
        <div className={styles.payConverted}>{state.sats}</div>
        <div className={styles.qrCard}>
          <Spinner shown={!state.qrReady} size={48} />
          {/* Decorative here; the stage carries the description. */}
          <Image
            src={`/btcpay/qr-${state.qr}.svg`}
            alt=""
            width={272}
            height={272}
            unoptimized
            className={styles.qr}
            data-shown={state.qrReady || undefined}
          />
        </div>
        <div className={styles.instruction}>
          <Symbol name="contactless" />
          Scan or Tap to Pay
        </div>
        <div className={styles.payStatus}>Waiting for payment...</div>
        <div className={styles.tabs}>
          <span className={styles.tab} data-selected>
            Unified
          </span>
          <span className={styles.tab}>
            <Image src="/btcpay/cashu.png" alt="" width={20} height={20} unoptimized />
          </span>
          <span className={styles.tab}>
            <Symbol name="lightning" />
          </span>
        </div>
      </div>

      <div
        className={`${styles.sheet} ${styles.received}`}
        data-shown={screen === "received" || undefined}
      >
        <div className={styles.sheetBar}>
          <span>
            <Symbol name="close" />
          </span>
          <span>
            <Symbol name="share" />
          </span>
        </div>
        <div className={styles.receivedBody}>
          <div className={styles.receivedAmount}>{state.amount} received.</div>
          <div className={styles.check}>
            <Symbol name="check" />
          </div>
        </div>
        <div className={styles.textButton}>View Details</div>
        <div
          className={styles.grayButton}
          data-target="close"
          data-pressed={pressed === "close" || undefined}
        >
          Close
        </div>
      </div>

      <div className={styles.navPill} />

      <div
        className={styles.touch}
        data-shown={touch.shown || undefined}
        data-down={touch.down || undefined}
        style={{ "--x": `${touch.x}px`, "--y": `${touch.y}px` } as CSSProperties}
      />
    </div>
  );
}
