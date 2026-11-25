"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LogoMark } from "@/components/Logo";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type DemoStep = "idle" | "typing" | "qr" | "success";
type PaymentStatus = "pending" | "paid" | null;

/** Simulated Numo Android till (depicted UI; wrapped in `inert` by parent so
 *  keypad buttons never enter keyboard focus or assistive tech trees). */
function POSSystem({
  step,
  amount,
}: {
  step: DemoStep;
  amount: string;
}) {
  const showQR = step === "qr" || step === "success";

  return (
    <div className="relative mx-auto h-[500px] w-[264px] shrink-0 overflow-hidden rounded-[34px] bg-ink-deep p-[6px] shadow-[var(--shadow-device)] sm:h-[536px] sm:w-[280px]">
      {/* Android punch-hole camera */}
      <div className="absolute left-1/2 top-4 z-30 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink-deep" />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-white">
        {/* Status Bar */}
        <div className="z-20 flex h-12 w-full items-center justify-between bg-white px-5 pt-2">
          <span className="text-xs font-semibold text-navy/70">Numo</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-4 rounded-[1px] bg-navy/60" />
            <div className="h-2.5 w-0.5 rounded-[1px] bg-navy/60" />
          </div>
        </div>

        {/* Screen views */}
        <div className="relative flex flex-1 flex-col bg-white">
          {/* Keypad View */}
          <div
            className={`absolute inset-0 flex flex-col bg-white transition-opacity duration-300 ${
              showQR ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex flex-1 flex-col items-center justify-center bg-white px-6">
              <div className="mb-1.5 text-xs font-medium text-navy/65">Enter amount</div>
              <div className="tabular flex items-baseline text-4xl font-medium text-navy sm:text-5xl">
                <span className="mr-1 text-2xl text-navy/55 sm:text-3xl">$</span>
                {amount || "0"}
                <span
                  className={`ml-1 h-7 w-0.5 bg-mint ${
                    step === "typing" ? "animate-pulse opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>

            <div className="flex h-[58%] flex-col justify-center border-t border-gray-100 bg-white px-5 pb-6 pt-4">
              <div className="mx-auto grid w-full max-w-[216px] grid-cols-3 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="flex items-center justify-center">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-xl font-medium text-navy transition-all duration-150 ${
                        (amount === "2" && num === 2) || (amount === "21" && num === 1)
                          ? "scale-95 bg-sunken"
                          : ""
                      }`}
                    >
                      {num}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full text-xl font-medium text-navy">
                    .
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full text-xl font-medium text-navy">
                    0
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full text-navy">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code View */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-white px-5 transition-opacity duration-500 ease-[var(--ease-out-expo)] ${
              step === "qr" ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="mb-5 text-center">
              <div className="mb-1 text-xs font-medium text-navy/65">Total to pay</div>
              <div className="tabular text-4xl font-semibold text-navy">$21.00</div>
            </div>

            <div className="relative mb-5 rounded-xl border border-gray-200 bg-white p-2.5">
              <svg className="h-40 w-40" viewBox="0 0 660 660" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 0h660v660h-660z" fill="#fff" />
                <g shapeRendering="crispEdges">
                  <path d="m280 80h20v20h-20z" /><path d="m300 80h20v20h-20z" /><path d="m320 80h20v20h-20z" /><path d="m360 80h20v20h-20z" /><path d="m380 80h20v20h-20z" /><path d="m260 100h20v20h-20z" /><path d="m280 100h20v20h-20z" /><path d="m300 100h20v20h-20z" /><path d="m340 100h20v20h-20z" /><path d="m360 100h20v20h-20z" /><path d="m380 100h20v20h-20z" /><path d="m240 120h20v20h-20z" /><path d="m260 120h20v20h-20z" /><path d="m280 120h20v20h-20z" /><path d="m300 120h20v20h-20z" /><path d="m320 120h20v20h-20z" /><path d="m400 120h20v20h-20z" /><path d="m240 140h20v20h-20z" /><path d="m340 140h20v20h-20z" /><path d="m380 140h20v20h-20z" /><path d="m240 160h20v20h-20z" /><path d="m260 160h20v20h-20z" /><path d="m280 160h20v20h-20z" /><path d="m360 160h20v20h-20z" /><path d="m380 160h20v20h-20z" /><path d="m240 180h20v20h-20z" /><path d="m260 180h20v20h-20z" /><path d="m300 180h20v20h-20z" /><path d="m320 180h20v20h-20z" /><path d="m340 180h20v20h-20z" /><path d="m360 180h20v20h-20z" /><path d="m380 180h20v20h-20z" /><path d="m400 180h20v20h-20z" /><path d="m240 200h20v20h-20z" /><path d="m280 200h20v20h-20z" /><path d="m320 200h20v20h-20z" /><path d="m360 200h20v20h-20z" /><path d="m400 200h20v20h-20z" /><path d="m240 220h20v20h-20z" /><path d="m260 220h20v20h-20z" /><path d="m400 220h20v20h-20z" /><path d="m80 240h20v20h-20z" /><path d="m120 240h20v20h-20z" /><path d="m140 240h20v20h-20z" /><path d="m160 240h20v20h-20z" /><path d="m180 240h20v20h-20z" /><path d="m200 240h20v20h-20z" /><path d="m260 240h20v20h-20z" /><path d="m280 240h20v20h-20z" /><path d="m320 240h20v20h-20z" /><path d="m360 240h20v20h-20z" /><path d="m380 240h20v20h-20z" /><path d="m400 240h20v20h-20z" /><path d="m440 240h20v20h-20z" /><path d="m460 240h20v20h-20z" /><path d="m480 240h20v20h-20z" /><path d="m500 240h20v20h-20z" /><path d="m520 240h20v20h-20z" /><path d="m120 260h20v20h-20z" /><path d="m180 260h20v20h-20z" /><path d="m220 260h20v20h-20z" /><path d="m280 260h20v20h-20z" /><path d="m320 260h20v20h-20z" /><path d="m360 260h20v20h-20z" /><path d="m420 260h20v20h-20z" /><path d="m560 260h20v20h-20z" /><path d="m80 280h20v20h-20z" /><path d="m100 280h20v20h-20z" /><path d="m120 280h20v20h-20z" /><path d="m160 280h20v20h-20z" /><path d="m180 280h20v20h-20z" /><path d="m200 280h20v20h-20z" /><path d="m220 280h20v20h-20z" /><path d="m240 280h20v20h-20z" /><path d="m320 280h20v20h-20z" /><path d="m340 280h20v20h-20z" /><path d="m380 280h20v20h-20z" /><path d="m400 280h20v20h-20z" /><path d="m420 280h20v20h-20z" /><path d="m440 280h20v20h-20z" /><path d="m480 280h20v20h-20z" /><path d="m520 280h20v20h-20z" /><path d="m160 300h20v20h-20z" /><path d="m240 300h20v20h-20z" /><path d="m260 300h20v20h-20z" /><path d="m280 300h20v20h-20z" /><path d="m300 300h20v20h-20z" /><path d="m320 300h20v20h-20z" /><path d="m340 300h20v20h-20z" /><path d="m400 300h20v20h-20z" /><path d="m460 300h20v20h-20z" /><path d="m80 320h20v20h-20z" /><path d="m100 320h20v20h-20z" /><path d="m160 320h20v20h-20z" /><path d="m180 320h20v20h-20z" /><path d="m200 320h20v20h-20z" /><path d="m220 320h20v20h-20z" /><path d="m300 320h20v20h-20z" /><path d="m320 320h20v20h-20z" /><path d="m340 320h20v20h-20z" /><path d="m360 320h20v20h-20z" /><path d="m380 320h20v20h-20z" /><path d="m440 320h20v20h-20z" /><path d="m460 320h20v20h-20z" /><path d="m480 320h20v20h-20z" /><path d="m500 320h20v20h-20z" /><path d="m540 320h20v20h-20z" /><path d="m560 320h20v20h-20z" /><path d="m80 340h20v20h-20z" /><path d="m100 340h20v20h-20z" /><path d="m160 340h20v20h-20z" /><path d="m180 340h20v20h-20z" /><path d="m220 340h20v20h-20z" /><path d="m240 340h20v20h-20z" /><path d="m260 340h20v20h-20z" /><path d="m280 340h20v20h-20z" /><path d="m360 340h20v20h-20z" /><path d="m400 340h20v20h-20z" /><path d="m420 340h20v20h-20z" /><path d="m440 340h20v20h-20z" /><path d="m460 340h20v20h-20z" /><path d="m480 340h20v20h-20z" /><path d="m540 340h20v20h-20z" /><path d="m80 360h20v20h-20z" /><path d="m120 360h20v20h-20z" /><path d="m140 360h20v20h-20z" /><path d="m180 360h20v20h-20z" /><path d="m200 360h20v20h-20z" /><path d="m240 360h20v20h-20z" /><path d="m260 360h20v20h-20z" /><path d="m300 360h20v20h-20z" /><path d="m320 360h20v20h-20z" /><path d="m420 360h20v20h-20z" /><path d="m440 360h20v20h-20z" /><path d="m480 360h20v20h-20z" /><path d="m520 360h20v20h-20z" /><path d="m560 360h20v20h-20z" /><path d="m80 380h20v20h-20z" /><path d="m140 380h20v20h-20z" /><path d="m160 380h20v20h-20z" /><path d="m180 380h20v20h-20z" /><path d="m260 380h20v20h-20z" /><path d="m280 380h20v20h-20z" /><path d="m300 380h20v20h-20z" /><path d="m420 380h20v20h-20z" /><path d="m540 380h20v20h-20z" /><path d="m560 380h20v20h-20z" /><path d="m80 400h20v20h-20z" /><path d="m120 400h20v20h-20z" /><path d="m200 400h20v20h-20z" /><path d="m220 400h20v20h-20z" /><path d="m240 400h20v20h-20z" /><path d="m260 400h20v20h-20z" /><path d="m280 400h20v20h-20z" /><path d="m300 400h20v20h-20z" /><path d="m380 400h20v20h-20z" /><path d="m400 400h20v20h-20z" /><path d="m420 400h20v20h-20z" /><path d="m440 400h20v20h-20z" /><path d="m460 400h20v20h-20z" /><path d="m480 400h20v20h-20z" /><path d="m500 400h20v20h-20z" /><path d="m560 400h20v20h-20z" /><path d="m240 420h20v20h-20z" /><path d="m260 420h20v20h-20z" /><path d="m280 420h20v20h-20z" /><path d="m320 420h20v20h-20z" /><path d="m340 420h20v20h-20z" /><path d="m400 420h20v20h-20z" /><path d="m480 420h20v20h-20z" /><path d="m560 420h20v20h-20z" /><path d="m260 440h20v20h-20z" /><path d="m280 440h20v20h-20z" /><path d="m340 440h20v20h-20z" /><path d="m360 440h20v20h-20z" /><path d="m380 440h20v20h-20z" /><path d="m400 440h20v20h-20z" /><path d="m440 440h20v20h-20z" /><path d="m480 440h20v20h-20z" /><path d="m520 440h20v20h-20z" /><path d="m540 440h20v20h-20z" /><path d="m560 440h20v20h-20z" /><path d="m240 460h20v20h-20z" /><path d="m280 460h20v20h-20z" /><path d="m320 460h20v20h-20z" /><path d="m340 460h20v20h-20z" /><path d="m400 460h20v20h-20z" /><path d="m480 460h20v20h-20z" /><path d="m500 460h20v20h-20z" /><path d="m240 480h20v20h-20z" /><path d="m260 480h20v20h-20z" /><path d="m320 480h20v20h-20z" /><path d="m360 480h20v20h-20z" /><path d="m380 480h20v20h-20z" /><path d="m400 480h20v20h-20z" /><path d="m420 480h20v20h-20z" /><path d="m440 480h20v20h-20z" /><path d="m460 480h20v20h-20z" /><path d="m480 480h20v20h-20z" /><path d="m500 480h20v20h-20z" /><path d="m240 500h20v20h-20z" /><path d="m260 500h20v20h-20z" /><path d="m280 500h20v20h-20z" /><path d="m400 500h20v20h-20z" /><path d="m440 500h20v20h-20z" /><path d="m460 500h20v20h-20z" /><path d="m480 500h20v20h-20z" /><path d="m500 500h20v20h-20z" /><path d="m540 500h20v20h-20z" /><path d="m560 500h20v20h-20z" /><path d="m240 520h20v20h-20z" /><path d="m260 520h20v20h-20z" /><path d="m300 520h20v20h-20z" /><path d="m320 520h20v20h-20z" /><path d="m420 520h20v20h-20z" /><path d="m460 520h20v20h-20z" /><path d="m480 520h20v20h-20z" /><path d="m520 520h20v20h-20z" /><path d="m560 520h20v20h-20z" /><path d="m280 540h20v20h-20z" /><path d="m300 540h20v20h-20z" /><path d="m360 540h20v20h-20z" /><path d="m380 540h20v20h-20z" /><path d="m420 540h20v20h-20z" /><path d="m440 540h20v20h-20z" /><path d="m480 540h20v20h-20z" /><path d="m500 540h20v20h-20z" /><path d="m520 540h20v20h-20z" /><path d="m540 540h20v20h-20z" /><path d="m240 560h20v20h-20z" /><path d="m300 560h20v20h-20z" /><path d="m380 560h20v20h-20z" /><path d="m400 560h20v20h-20z" /><path d="m500 560h20v20h-20z" /><path d="m520 560h20v20h-20z" /><path d="m540 560h20v20h-20z" /><path d="m560 560h20v20h-20z" /><path d="m80 80h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd" /><path d="m440 80h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd" /><path d="m120 120h60v60h-60z" /><path d="m480 120h60v60h-60z" /><path d="m80 440h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd" /><path d="m120 480h60v60h-60z" />
                </g>
              </svg>
              <LogoMark className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-navy/65">
              <svg className="h-4 w-4 animate-spin text-navy" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Waiting for payment...</span>
            </div>
          </div>

          {/* Success View — exponential ease-out, Fresh Paint Mint coat */}
          <div
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-mint transition-opacity duration-400 ease-[var(--ease-smooth)] ${
              step === "success" ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              className={`flex flex-col items-center justify-center transition-all duration-300 ease-[var(--ease-out-expo)] ${
                step === "success" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                  step === "success" ? "scale-100" : "scale-95"
                }`}
              >
                <svg className="h-8 w-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-lg font-semibold tracking-tight text-navy">Payment Received</div>
              <div className="tabular mt-1 text-sm font-medium text-navy/75">$21.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BTCPAY_INVOICES = [
  { date: "02/28 3:05 PM", orderId: "PAY_REQ_cd4", status: "Paid", amount: "0.00006150 BTC" },
  { date: "02/28 12:39 PM", orderId: "PAY_REQ_a9f", status: "Paid", amount: "0.00248731 BTC" },
  { date: "02/28 10:12 PM", orderId: "PAY_REQ_7d4", status: "Paid", amount: "0.00090384 BTC" },
  { date: "02/28 8:09 PM", orderId: "PAY_REQ_f3b", status: "Paid", amount: "0.01572946 BTC" },
  { date: "02/27 10:46 PM", orderId: "PAY_REQ_0c8", status: "Paid", amount: "0.00001892 BTC" },
];

/** Fluid BTCPay Server dashboard view where Date, Order ID, Status
 *  (Processing -> Paid), and Amount ALWAYS remain visible without right-edge clipping. */
function BTCPayInterface({ paymentStatus }: { paymentStatus: PaymentStatus }) {
  const showNewRow = paymentStatus !== null;
  const isPaid = paymentStatus === "paid";

  return (
    <div className="flex min-h-[420px] select-none bg-[#f8f9fa] font-sans text-xs md:min-h-[536px] md:text-sm">
      {/* Sidebar shown only at xl so the invoices table always keeps generous room */}
      <div className="hidden w-[164px] shrink-0 flex-col border-r border-gray-200 bg-[#f8f9fa] xl:flex">
        <div className="mb-2 flex items-center justify-between p-4">
          <Image src="/btcpay-logo.svg" alt="" width={86} height={40} className="h-6 w-auto" />
          <div className="relative">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 px-3 py-1">
          <div className="mb-5 flex items-center justify-between rounded border border-gray-200 bg-white px-2.5 py-2 text-gray-700">
            <span className="truncate text-xs font-semibold">Nuthouse</span>
            <svg className="h-3 w-3 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="mb-5 space-y-1 text-xs">
            <div className="px-2.5 py-1.5 font-medium text-gray-600">Dashboard</div>
            <div className="px-2.5 py-1.5 font-medium text-gray-600">Settings</div>
          </div>

          <div className="mb-5">
            <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Wallets
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2 px-2.5 py-1.5 font-medium text-gray-700">
                <span className="h-2 w-2 rounded-full bg-[#3f9130]" />
                Bitcoin
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 font-medium text-gray-700">
                <span className="h-2 w-2 rounded-full bg-[#3f9130]" />
                Cashu
              </div>
            </div>
          </div>

          <div>
            <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Payments
            </p>
            <div className="space-y-1 text-xs">
              <div className="px-2.5 py-1.5 font-medium text-gray-600">Requests</div>
              <div className="rounded bg-[#e9f5e6] px-2.5 py-1.5 font-semibold text-[#236319]">
                Invoices
              </div>
              <div className="px-2.5 py-1.5 font-medium text-gray-600">Payouts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex min-w-0 flex-1 flex-col bg-white p-4 sm:p-6">
        {/* Live Payment Confirmed Toast */}
        <div
          className={`absolute right-4 top-4 z-20 flex items-center gap-2 rounded-lg border border-[#b7dfb9] bg-[#e6f6e8] px-3 py-2 text-[#155724] shadow-sm transition-all duration-300 ease-[var(--ease-out-expo)] ${
            isPaid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <svg className="h-4 w-4 shrink-0 text-[#1e7e34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold">New payment received</span>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Image
              src="/btcpay-logo.svg"
              alt=""
              width={86}
              height={40}
              className="h-5 w-auto xl:hidden"
            />
            <div className="text-lg font-semibold text-gray-900 sm:text-xl">Invoices</div>
          </div>
          <div className="rounded bg-[#2f7d24] px-3 py-1.5 text-xs font-semibold text-white">
            Create Invoice
          </div>
        </div>

        {/* Clean non-clipping toolbar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex min-w-[160px] flex-1 items-center gap-2 rounded border border-gray-200 bg-[#f8f9fa] px-3 py-1.5 text-xs text-gray-600">
            <svg className="h-3.5 w-3.5 shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="truncate">Search invoices...</span>
          </div>
          <div className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700">
            All invoices
          </div>
          <div className="hidden rounded border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 sm:block">
            All time
          </div>
        </div>

        {/* Fluid table: Date, Order ID, Status, Amount ALWAYS visible with zero clipping */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="border-b border-gray-200 bg-[#f8f9fa] text-[11px] font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th className="hidden px-3 py-2.5 sm:table-cell">Date</th>
                <th className="px-3 py-2.5">Order ID</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {showNewRow && (
                <tr className="bg-[#f3fbf4]">
                  <td className="hidden whitespace-nowrap px-3 py-3 font-medium text-gray-900 sm:table-cell">
                    Just now
                  </td>
                  <td className="tabular whitespace-nowrap px-3 py-3 font-semibold text-[#236319]">
                    NUMO_REQUEST
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {isPaid ? (
                      <span className="inline-block rounded bg-[#d4edda] px-2 py-0.5 text-[11px] font-semibold text-[#155724]">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-block rounded bg-[#fff3cd] px-2 py-0.5 text-[11px] font-semibold text-[#7a5a00]">
                        Processing
                      </span>
                    )}
                  </td>
                  <td className="tabular whitespace-nowrap px-3 py-3 text-right font-semibold text-gray-900">
                    0.00025439 BTC
                  </td>
                </tr>
              )}

              {BTCPAY_INVOICES.map((inv) => (
                <tr key={inv.orderId} className="bg-white">
                  <td className="hidden whitespace-nowrap px-3 py-3 text-gray-700 sm:table-cell">
                    {inv.date}
                  </td>
                  <td className="tabular whitespace-nowrap px-3 py-3 font-medium text-[#236319]">
                    {inv.orderId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="inline-block rounded bg-[#d4edda] px-2 py-0.5 text-[11px] font-semibold text-[#155724]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="tabular whitespace-nowrap px-3 py-3 text-right text-gray-700">
                    {inv.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Synchronized BTCPay + Numo till illustration.
 *  - Both depicted mockups are `inert` so zero fake buttons/inputs enter Tab order.
 *  - Honors `prefers-reduced-motion` by holding a clean static settled frame.
 *  - Provides Pause / Replay controls so visitors can inspect any step. */
export function BTCPayDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState<DemoStep>("idle");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Derive settled frame directly when reduced motion is preferred (no effect setState).
  const displayedStep: DemoStep = reducedMotion ? "success" : step;
  const displayedAmount = reducedMotion ? "21" : amount;
  const displayedStatus: PaymentStatus = reducedMotion ? "paid" : paymentStatus;

  // Animated loop when motion is enabled, visible, and not paused.
  useEffect(() => {
    if (reducedMotion || !isInView || isPaused) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    timeouts.push(
      setTimeout(() => {
        setStep("idle");
        setAmount("");
        setPaymentStatus(null);
      }, 0)
    );

    timeouts.push(
      setTimeout(() => {
        setStep("typing");
        timeouts.push(setTimeout(() => setAmount("2"), 450));
        timeouts.push(setTimeout(() => setAmount("21"), 900));
        timeouts.push(
          setTimeout(() => {
            setStep("qr");
            setPaymentStatus("pending");
          }, 1700)
        );
        timeouts.push(
          setTimeout(() => {
            setStep("success");
            timeouts.push(setTimeout(() => setPaymentStatus("paid"), 260));
          }, 4200)
        );
        timeouts.push(
          setTimeout(() => {
            setCycle((c) => c + 1);
          }, 8400)
        );
      }, 600)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [cycle, isInView, isPaused, reducedMotion]);

  const handleReplay = useCallback(() => {
    setIsPaused(false);
    setCycle((c) => c + 1);
  }, []);

  return (
    <div ref={ref}>
      {/* Phone sits on the left on mobile so the charge triggers right above the synced invoice */}
      <div className="grid items-center gap-8 rounded-[24px] bg-paper p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 lg:p-10">
        <div
          className="order-2 w-full overflow-hidden rounded-card shadow-[var(--shadow-device)] lg:order-1"
          inert
        >
          <BTCPayInterface paymentStatus={displayedStatus} />
        </div>

        <div className="order-1 flex w-full justify-center lg:order-2" inert>
          <POSSystem step={displayedStep} amount={displayedAmount} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-caption text-navy/70">Sample store and invoice data.</p>

        {!reducedMotion && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="inline-flex min-h-9 cursor-pointer items-center rounded-chip border border-line-strong bg-surface px-3 text-xs font-medium text-navy transition-colors duration-150 hover:bg-paper"
            >
              {isPaused ? "Resume demo" : "Pause demo"}
            </button>
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex min-h-9 cursor-pointer items-center rounded-chip border border-line-strong bg-surface px-3 text-xs font-medium text-navy transition-colors duration-150 hover:bg-paper"
            >
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
