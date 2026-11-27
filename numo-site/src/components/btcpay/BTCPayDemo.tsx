"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { BTCPayInvoices, type Invoice } from "./BTCPayInvoices";
import { NumoApp, type NumoAppState } from "./NumoApp";
import styles from "./BTCPayDemo.module.css";

/* ---- Sample data ---------------------------------------------------------
   One afternoon at a fictional coffee counter. Amounts are entered in dollars
   on the till and land in BTCPay in sats, which is how Numo creates its
   invoices. The rate is fixed so the two screens always agree. */

const SATS_PER_CENT = 28193 / 2100;
const DAY = "11/25/26";
const OPENING_MINUTE = 14 * 60 + 41; // 2:41 PM

/** Each sale: cents rung up, and minutes until the next customer. */
const SALES = [
  { cents: 2100, gap: 3 },
  { cents: 650, gap: 5 },
  { cents: 1400, gap: 2 },
  { cents: 3825, gap: 6 },
  { cents: 900, gap: 4 },
];

const EARLIER: [time: string, id: string, sats: number][] = [
  ["2:36 PM", "8HcJq2ZsNf5VtM7uAw4xKg", 8726],
  ["2:18 PM", "Kp3WdY9bXr6TzLm2QsE8hN", 18795],
  ["1:52 PM", "4VfGt8MnBq2ZxR7cJw5LyD", 51351],
  ["1:07 PM", "Tz6QhN3mKs9WbX4pEr8FvC", 12083],
  ["12:44 PM", "Jm7RxC2vNb5QwK9sLt3YfH", 6712],
  ["12:31 PM", "Wq4ZnP8dGs6TyB2mXc7VkR", 33562],
  ["12:09 PM", "9LsFv3KhJx5NqW8bMz2TpD", 9397],
  ["11:48 AM", "Bx2TmQ7wRc4YnH9sKp6LvF", 24836],
  ["11:15 AM", "Hd8NkS3zVq5JwM2xTb7RcG", 14767],
  ["10:52 AM", "Ys5PbW9mFx3LqC7tKn4ZhJ", 5370],
  ["10:20 AM", "3QvRzK8mN2pB7dWs9TxL4c", 40275],
  ["9:47 AM", "Fn6XcH2sMw8JtQ4bVk9LyP", 11411],
  ["9:12 AM", "Rt4LwB7xKq3ZmN8sHc5YdV", 20138],
  ["8:38 AM", "Mk9SdT5vWn2QxJ6bLp3ZrC", 7384],
];

const EARLIER_INVOICES: Invoice[] = EARLIER.map(([time, id, sats]) => ({
  id,
  date: `${DAY}, ${time}`,
  status: "Settled",
  sats,
}));

/** The page shows eight whole rows; one more is kept so the oldest can slide out. */
const MAX_ROWS = 9;

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const sats = (cents: number) => Math.round(cents * SATS_PER_CENT);
const satsLabel = (cents: number) => `${sats(cents).toLocaleString("en-US")} sat`;
const clockLabel = (minute: number) =>
  `${((Math.floor(minute / 60) + 11) % 12) + 1}:${String(minute % 60).padStart(2, "0")}`;
const meridiem = (minute: number) => (minute >= 12 * 60 ? "PM" : "AM");

/** A deterministic 22-character id in the shape BTCPay gives its invoices. */
function invoiceId(seed: number) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let state = (seed + 1) * 0x9e3779b1;
  let id = "";
  for (let i = 0; i < 22; i++) {
    state = Math.imul(state ^ (state >>> 15), 0x2c1b3c6d) + 0x6d2b79f5;
    id += alphabet[(state >>> 8) % alphabet.length];
  }
  return id;
}

function saleAt(index: number) {
  let minute = OPENING_MINUTE;
  for (let i = 0; i < index; i++) minute += SALES[i % SALES.length].gap;
  const { cents } = SALES[index % SALES.length];
  return {
    cents,
    minute,
    digits: String(cents).split(""),
    qr: (index % 3) + 1,
    invoice: {
      id: invoiceId(index),
      date: `${DAY}, ${clockLabel(minute)} ${meridiem(minute)}`,
      status: "New",
      sats: sats(cents),
      fresh: true,
    } satisfies Invoice,
  };
}

type DemoState = {
  app: NumoAppState;
  invoices: Invoice[];
};

const HIDDEN_TOUCH = { x: 192, y: 620, shown: false, down: false };

const OPENING: DemoState = {
  app: {
    screen: "keypad",
    clock: clockLabel(OPENING_MINUTE),
    amount: usd(0),
    sats: satsLabel(0),
    pressed: null,
    charging: false,
    qr: 1,
    qrReady: false,
    touch: HIDDEN_TOUCH,
  },
  invoices: EARLIER_INVOICES.slice(0, MAX_ROWS),
};

const FIRST_SALE_SETTLED: Invoice = { ...saleAt(0).invoice, status: "Settled", fresh: false };

/** The frame that tells the story on its own: the first sale received on the
 *  till and settled in the store. Shown when motion is reduced. */
const POSTER: DemoState = {
  app: {
    ...OPENING.app,
    screen: "received",
    amount: usd(SALES[0].cents),
    sats: satsLabel(SALES[0].cents),
    qrReady: true,
  },
  invoices: [FIRST_SALE_SETTLED, ...EARLIER_INVOICES].slice(0, MAX_ROWS),
};

/* ---- Timeline -------------------------------------------------------------
   A clock whose waits can be paused and cancelled, so the script below reads
   top to bottom as the sale it describes. */

const CANCELLED = Symbol("cancelled");

class Clock {
  private pending: {
    remaining: number;
    armedAt: number;
    timer?: number;
    done: () => void;
    fail: (reason: unknown) => void;
  } | null = null;
  private paused = false;
  private dead = false;

  wait(ms: number) {
    return new Promise<void>((done, fail) => {
      if (this.dead) return fail(CANCELLED);
      this.pending = { remaining: ms, armedAt: 0, done, fail };
      if (!this.paused) this.arm();
    });
  }

  private arm() {
    const wait = this.pending;
    if (!wait) return;
    wait.armedAt = performance.now();
    wait.timer = window.setTimeout(() => {
      this.pending = null;
      wait.done();
    }, wait.remaining);
  }

  setPaused(paused: boolean) {
    if (paused === this.paused || this.dead) return;
    this.paused = paused;
    const wait = this.pending;
    if (!wait) return;
    if (paused) {
      window.clearTimeout(wait.timer);
      wait.remaining = Math.max(0, wait.remaining - (performance.now() - wait.armedAt));
    } else {
      this.arm();
    }
  }

  cancel() {
    this.dead = true;
    if (this.pending) {
      window.clearTimeout(this.pending.timer);
      this.pending.fail(CANCELLED);
      this.pending = null;
    }
  }
}

/** Where the finger lands on a marked control, in the app's own coordinates.
 *  Measured from the layout rather than hard-coded, and aimed off the label so
 *  the dot never covers the word it presses. */
function aim(screen: HTMLElement, target: string) {
  const el = screen.querySelector<HTMLElement>(`[data-target="${target}"]`);
  if (!el) return null;
  const isKey = target.startsWith("key-");
  let x = el.offsetWidth * (isKey ? 0.5 : 0.74) + (isKey ? 15 : 0);
  let y = el.offsetHeight * 0.5 + (isKey ? 15 : 6);
  for (
    let node: HTMLElement | null = el;
    node && node !== screen;
    node = node.offsetParent as HTMLElement | null
  ) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

/** Synchronized BTCPay Server and Numo demo: a sale rung up on the till arrives
 *  in the store's invoice list as New and turns Settled when the customer pays.
 *
 *  - Both products are depicted from their real interfaces, frameless and side
 *    by side, and wrapped in `inert` so no simulated control enters the tab order.
 *  - Sales accumulate instead of rewinding: each loop is the next customer.
 *  - Reduced motion holds a single settled frame. The one control pauses and
 *    resumes the loop. */
export function BTCPayDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<DemoState>(OPENING);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<Clock | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const holding = isPaused || !inView;

  useEffect(() => {
    clockRef.current?.setPaused(holding);
  }, [holding]);

  useEffect(() => {
    if (reducedMotion || !hasStarted) return;

    const clock = new Clock();
    clockRef.current = clock;
    const screen = stageRef.current?.querySelector<HTMLElement>("[data-screen]");

    const app = (patch: Partial<NumoAppState>) =>
      setState((s) => ({ ...s, app: { ...s.app, ...patch } }));
    const touch = (patch: Partial<NumoAppState["touch"]>) =>
      setState((s) => ({ ...s, app: { ...s.app, touch: { ...s.app.touch, ...patch } } }));

    async function tap(target: string, onPress: () => void) {
      const point = screen && aim(screen, target);
      if (point) touch({ ...point, shown: true });
      await clock.wait(400);
      touch({ down: true });
      app({ pressed: target.replace("key-", "") });
      await clock.wait(110);
      touch({ down: false });
      app({ pressed: null });
      onPress();
      await clock.wait(130);
    }

    async function play() {
      setState(OPENING);
      await clock.wait(700);

      for (let index = 0; ; index++) {
        const sale = saleAt(index);

        // Ring it up, one key at a time, the way the till fills in cents.
        let typed = "";
        for (const digit of sale.digits) {
          await tap(`key-${digit}`, () => {
            typed += digit;
            app({ amount: usd(Number(typed)), sats: satsLabel(Number(typed)) });
          });
        }

        // Charge: Numo asks the store for an invoice.
        await tap("charge", () => app({ charging: true, qr: sale.qr, qrReady: false }));
        await clock.wait(420);
        app({ screen: "pay" });
        touch({ shown: false });
        await clock.wait(260);
        setState((s) => ({
          ...s,
          invoices: [sale.invoice, ...s.invoices.map((i) => ({ ...i, fresh: false }))].slice(
            0,
            MAX_ROWS,
          ),
        }));
        await clock.wait(460);
        app({ qrReady: true, charging: false });

        // The customer pays. BTCPay settles the invoice, then the till hears of it.
        await clock.wait(2300);
        setState((s) => ({
          ...s,
          invoices: s.invoices.map((i) =>
            i.id === sale.invoice.id ? { ...i, status: "Settled" } : i,
          ),
        }));
        await clock.wait(280);
        app({ screen: "received" });
        await clock.wait(2500);

        // Close returns to an empty till, a few minutes later, for the next customer.
        await tap("close", () => {
          const next = saleAt(index + 1);
          app({
            screen: "keypad",
            amount: usd(0),
            sats: satsLabel(0),
            clock: clockLabel(next.minute),
          });
        });
        touch({ shown: false });
        await clock.wait(900);
      }
    }

    play().catch((reason) => {
      if (reason !== CANCELLED) throw reason;
    });

    return () => clock.cancel();
  }, [hasStarted, reducedMotion]);

  const shown = reducedMotion ? POSTER : state;

  return (
    <div className={styles.root}>
      <div
        ref={stageRef}
        className={styles.stage}
        role="img"
        aria-label="A sale rung up in the Numo app appears in a BTCPay Server store's invoice list as New, then turns Settled when the customer pays."
        data-paused={holding || undefined}
      >
        <div className={styles.canvas} inert>
          <div className={styles.app}>
            <div className={styles.appContent}>
              <NumoApp state={shown.app} still={reducedMotion} />
            </div>
          </div>

          <div className={styles.store}>
            <div className={styles.storeContent}>
              <BTCPayInvoices invoices={shown.invoices} className={styles.btcpay} />
            </div>
          </div>
        </div>
      </div>

      {/* The demo's one control. Reduced motion holds a still frame, so there is
          nothing to pause and the row is left out. */}
      {!reducedMotion && (
        <div className="mt-6 flex justify-end md:mt-8">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Play the demo" : "Pause the demo"}
            className="relative flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-sunken text-navy ring-1 ring-navy/0 [transition:box-shadow_200ms_ease,scale_150ms_var(--ease-out-expo)] hover:ring-navy/30 active:scale-[0.97]"
          >
            {/* Both icons are always there; the one that applies fades and grows
                in as the other fades and shrinks out, so the swap is not a jump. */}
            {[true, false].map((play) => (
              <svg
                key={play ? "play" : "pause"}
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className={`absolute size-4 transition-[opacity,scale,filter] duration-150 ease-[var(--ease-out-expo)] ${
                  play === isPaused ? "" : "scale-75 opacity-0 blur-[2px]"
                }`}
              >
                {play ? (
                  <path d="M4.75 2.87v10.26a.75.75 0 0 0 1.14.64l8.3-5.13a.75.75 0 0 0 0-1.28l-8.3-5.13a.75.75 0 0 0-1.14.64Z" />
                ) : (
                  <>
                    <rect x="3.25" y="2.5" width="3.25" height="11" rx="1" />
                    <rect x="9.5" y="2.5" width="3.25" height="11" rx="1" />
                  </>
                )}
              </svg>
            ))}
          </button>
        </div>
      )}
    </div>
  );
}
