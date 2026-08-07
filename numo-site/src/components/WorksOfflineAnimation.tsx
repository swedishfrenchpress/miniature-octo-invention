import React from "react";

type WorksOfflineAnimationProps = {
  /** Scale and layout for the scene. The devices are drawn at a fixed size; the
   *  caller decides how big that reads in its own context. */
  className?: string;
};

/** The offline sale: a phone with no signal, ecash crossing the gap anyway, and
 *  the till confirming. Single source for both the homepage bento card and the
 *  /export/offline still — they had forked, and the copy here was still drawing
 *  an iPhone notch and a terminal with a base after the homepage had moved on. */
export default function WorksOfflineAnimation({ className = "" }: WorksOfflineAnimationProps) {
  return (
    <div className={`flex items-center gap-4 origin-center ${className}`} aria-hidden="true">
      {/* Customer's phone, offline. The original device treatment — deep
          bezel, recessed screen, big amber airplane badge — on an Android
          body: punch-hole rather than a notch, since Numo is Android-only. */}
      <div className="relative flex-shrink-0 z-10">
        <div className="w-28 h-56 bg-[#1a1a2e] rounded-[1.5rem] relative overflow-hidden shadow-2xl border-[4px] border-[#2a2a3e]">
          {/* Punch-hole camera */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3a3a4e] rounded-full z-10"></div>

          <div className="absolute inset-[4px] bg-gradient-to-b from-[#1e1e3f] to-[#12122a] rounded-[1.2rem] flex items-center justify-center">
             {/* Airplane mode */}
             <div className="w-20 h-20 rounded-full bg-[#FF9500] flex items-center justify-center shadow-lg">
               <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"/>
               </svg>
             </div>
           </div>

           {/* Android gesture bar */}
           <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-white/30 rounded-full"></div>
         </div>

         {/* No signal badge — the one red mark in the system, and it means "cut off" */}
        <div className="absolute -top-2 -right-2 w-9 h-9 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-lg border-[3px] border-white z-20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Money flying animation - staggered trail with more space */}
      <div className="relative h-32 w-[180px] overflow-visible">
        {/* Bill 1 - Orange Bitcoin ₿ */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ animation: 'money-fly-1 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
        >
          <div className="w-16 h-9 bg-gradient-to-r from-[#F7931A] to-[#FFB84D] rounded shadow-lg flex items-center justify-center border border-[#FFB84D]/30">
            <span className="text-white font-semibold text-lg drop-shadow-md">₿</span>
          </div>
        </div>

        {/* Bill 2 - Green $ */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ animation: 'money-fly-2 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
        >
          <div className="w-14 h-8 bg-gradient-to-r from-[#34C759] to-[#5DD97C] rounded shadow-lg flex items-center justify-center border border-[#5DD97C]/30">
            <span className="text-white font-semibold text-base drop-shadow-md">$</span>
          </div>
        </div>

        {/* Bill 3 - Orange Bitcoin ₿ */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ animation: 'money-fly-3 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
        >
          <div className="w-16 h-8 bg-gradient-to-r from-[#F7931A] to-[#FFCC66] rounded shadow-lg flex items-center justify-center border border-[#FFCC66]/30">
            <span className="text-white font-semibold text-base drop-shadow-md">₿</span>
          </div>
        </div>

        {/* Bill 4 - Green $ */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ animation: 'money-fly-4 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
        >
          <div className="w-14 h-8 bg-gradient-to-r from-[#2DB84C] to-[#4ADE80] rounded shadow-lg flex items-center justify-center border border-[#4ADE80]/30">
            <span className="text-white font-semibold text-base drop-shadow-md">$</span>
          </div>
        </div>

        {/* Bill 5 - Orange Bitcoin ₿ */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ animation: 'money-fly-5 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
        >
          <div className="w-16 h-8 bg-gradient-to-r from-[#E8850F] to-[#F7931A] rounded shadow-lg flex items-center justify-center border border-[#F7931A]/30">
            <span className="text-white font-semibold text-base drop-shadow-md">₿</span>
          </div>
        </div>
      </div>

      {/* The receiving device. The original's heavy dark body and recessed
          screen, but a phone — no card-reader slot and no terminal base,
          because Numo runs on the merchant's own handset. */}
      <div className="relative flex-shrink-0 z-10">
        <div className="w-32 h-60 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-[1.75rem] relative shadow-2xl border-[4px] border-[#3a3a3a] overflow-hidden">
          {/* Punch-hole camera */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4a4a4a] rounded-full z-10"></div>

          {/* Till screen — flashes mint the moment the ecash lands */}
          <div className="absolute inset-[5px] rounded-[1.4rem] overflow-hidden bg-[#0d0d0d]">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: 'pos-success 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
            >
              <span
                className="font-display text-3xl leading-none text-white"
                style={{ animation: 'till-amount-offline 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
              >
                $12.00
              </span>
              <svg
                className="absolute w-14 h-14 text-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ animation: 'checkmark-appear 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Android gesture bar */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/30 rounded-full z-20"></div>
        </div>
      </div>
    </div>
  );
}
