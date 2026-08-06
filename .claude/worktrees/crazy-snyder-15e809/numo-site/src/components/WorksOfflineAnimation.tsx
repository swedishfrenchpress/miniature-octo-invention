import React from "react";

type WorksOfflineAnimationProps = {
  className?: string;
};

export default function WorksOfflineAnimation({ className }: WorksOfflineAnimationProps) {
  return (
    <div className={className}>
      {/* Offline payment animation */}
      <div className="flex items-center justify-center gap-6">
        {/* iPhone with airplane mode */}
        <div className="relative flex-shrink-0 z-10">
          <div className="w-28 h-56 bg-[#1a1a2e] rounded-[1.5rem] relative overflow-hidden shadow-2xl border-[4px] border-[#2a2a3e]">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10"></div>

            <div className="absolute inset-[4px] bg-gradient-to-b from-[#1e1e3f] to-[#12122a] rounded-[1.2rem] flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FF9500] flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-white/30 rounded-full"></div>
          </div>

          <div className="absolute -top-2 -right-2 w-9 h-9 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-lg border-[3px] border-white z-20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Money trail */}
        <div className="relative h-32 w-[180px] overflow-visible" aria-hidden="true">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ animation: "money-fly-1 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
          >
            <div className="w-16 h-9 bg-gradient-to-r from-[#F7931A] to-[#FFB84D] rounded shadow-lg flex items-center justify-center border border-[#FFB84D]/30">
              <span className="text-white font-bold text-lg drop-shadow-md">₿</span>
            </div>
          </div>

          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ animation: "money-fly-2 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
          >
            <div className="w-14 h-8 bg-gradient-to-r from-[#34C759] to-[#5DD97C] rounded shadow-lg flex items-center justify-center border border-[#5DD97C]/30">
              <span className="text-white font-bold text-base drop-shadow-md">$</span>
            </div>
          </div>

          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ animation: "money-fly-3 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
          >
            <div className="w-15 h-8 bg-gradient-to-r from-[#F7931A] to-[#FFCC66] rounded shadow-lg flex items-center justify-center border border-[#FFCC66]/30">
              <span className="text-white font-bold text-base drop-shadow-md">₿</span>
            </div>
          </div>

          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ animation: "money-fly-4 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
          >
            <div className="w-14 h-8 bg-gradient-to-r from-[#2DB84C] to-[#4ADE80] rounded shadow-lg flex items-center justify-center border border-[#4ADE80]/30">
              <span className="text-white font-bold text-base drop-shadow-md">$</span>
            </div>
          </div>

          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ animation: "money-fly-5 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
          >
            <div className="w-15 h-8 bg-gradient-to-r from-[#E8850F] to-[#F7931A] rounded shadow-lg flex items-center justify-center border border-[#F7931A]/30">
              <span className="text-white font-bold text-base drop-shadow-md">₿</span>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="relative flex-shrink-0 z-10">
          <div className="w-28 h-48 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-2xl relative shadow-2xl">
            <div className="absolute top-4 left-3 right-3 bg-[#0d0d0d] rounded-xl overflow-hidden" style={{ height: "100px" }}>
              <div
                className="absolute inset-2 rounded-lg flex items-center justify-center"
                style={{ animation: "pos-success 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
              >
                <svg
                  className="w-14 h-14 text-navy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ animation: "checkmark-appear 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-5 left-3 right-3 h-14 grid grid-cols-3 gap-1.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-[#3a3a3a] rounded-sm"></div>
              ))}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#4a4a4a] rounded-l"></div>
          </div>

          <div className="w-16 h-5 bg-gradient-to-b from-[#3d3d3d] to-[#252525] rounded-b-xl mx-auto -mt-0.5 shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}

