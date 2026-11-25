"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LogoMark } from "@/components/Logo";

// POS System Animation Component
function POSSystem({ onPaymentComplete, onQRShown, onReset }: { onPaymentComplete: () => void, onQRShown?: () => void, onReset?: () => void }) {
  const [step, setStep] = useState<'idle' | 'typing' | 'qr' | 'success'>('idle');
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Store callbacks in refs to avoid re-triggering useEffect
  const onPaymentCompleteRef = useRef(onPaymentComplete);
  const onQRShownRef = useRef(onQRShown);
  const onResetRef = useRef(onReset);
  
  useEffect(() => {
    onPaymentCompleteRef.current = onPaymentComplete;
    onQRShownRef.current = onQRShown;
    onResetRef.current = onReset;
  }, [onPaymentComplete, onQRShown, onReset]);

  useEffect(() => {
    // Reset BTCPay status when animation restarts (but not on first load)
    if (animationKey > 0 && onResetRef.current) {
      onResetRef.current();
    }
    
    const timeouts: NodeJS.Timeout[] = [];
    
    // Start animation sequence
    timeouts.push(setTimeout(() => {
      setStep('typing');
      
      // Type "2"
      timeouts.push(setTimeout(() => setAmount('2'), 500));
      // Type "1"
      timeouts.push(setTimeout(() => setAmount('21'), 1000));
      
      // Show QR after typing
      timeouts.push(setTimeout(() => {
        setStep('qr');
        setShowQR(true);
        if (onQRShownRef.current) onQRShownRef.current();
      }, 2000));

      // Payment Received State - Show success on device first
      timeouts.push(setTimeout(() => {
        setStep('success');
        // Delay the BTCPay update slightly so it syncs visually with the device success screen
        timeouts.push(setTimeout(() => onPaymentCompleteRef.current(), 300));
      }, 4500));
      
      // Hold success screen for 4 seconds, then restart the loop
      timeouts.push(setTimeout(() => {
        setStep('idle');
        setAmount('');
        setShowQR(false);
        setAnimationKey(k => k + 1);
      }, 9000));
      
    }, 1000));

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [animationKey]);

  return (
    <div className="relative w-[300px] h-[600px] bg-navy rounded-[3rem] shadow-device border-[8px] border-navy mx-auto overflow-hidden">
      {/* Punch-hole camera. Numo is Android-only, so this device is not an iPhone
          and must not be drawn as one — no Dynamic Island, no 9:41. */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy rounded-full z-30"></div>

      {/* Screen Area - Explicit white background and full coverage */}
      <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden flex flex-col z-10">
        {/* Status Bar */}
        <div className="h-14 w-full flex justify-between items-center px-6 pt-3 bg-white z-20">
           <span className="text-sm font-semibold text-gray-600">Numo</span>
           <div className="flex items-center gap-1.5">
             <div className="w-5 h-3 bg-gray-600 rounded-[1px]"></div>
             <div className="w-0.5 h-3 bg-gray-600 rounded-[1px]"></div>
           </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col relative bg-white">
          
          {/* Keypad View */}
          <div className={`absolute inset-0 flex flex-col bg-white transition-opacity duration-500 ${showQR ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             {/* Display Area - Centered */}
             <div className="flex-1 flex flex-col items-center justify-center px-8 bg-white">
                <div className="text-gray-400 text-sm font-medium mb-2">Enter amount</div>
                <div className="text-5xl font-medium text-[#0A2540] flex items-baseline">
                  <span className="text-3xl text-gray-400 mr-1">$</span>
                  {amount || '0'}
                  <span className={`w-0.5 h-8 bg-mint ml-1 animate-pulse ${step === 'typing' ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
             </div>

             {/* Keypad - White Background with Black Keys */}
             <div className="bg-white h-[60%] p-6 pb-10 flex flex-col justify-center border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 w-full max-w-[240px] mx-auto">
                   {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                     <div key={num} className="flex items-center justify-center">
                        <button 
                          className={`w-14 h-14 rounded-full text-2xl font-medium text-[#0A2540] transition-all duration-150 active:scale-90 ${
                            (amount === '2' && num === 2) || (amount === '21' && num === 1) 
                              ? 'bg-gray-200 scale-95' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {num}
                        </button>
                     </div>
                   ))}
                   <div className="flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full text-2xl font-medium text-[#0A2540] hover:bg-gray-100 active:scale-90">.</button>
                   </div>
                   <div className="flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full text-2xl font-medium text-[#0A2540] hover:bg-gray-100 active:scale-90">0</button>
                   </div>
                   <div className="flex items-center justify-center">
                      <button className="w-14 h-14 rounded-full flex items-center justify-center text-[#0A2540] hover:bg-gray-100 active:scale-90">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" /></svg>
                      </button>
                   </div>
                </div>
             </div>
          </div>

          {/* QR Code View - Clean Static Design */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white transition-all duration-700 ease-out ${showQR && step !== 'success' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <div className="text-center mb-6">
               <div className="text-gray-400 text-sm font-medium mb-1">Total to pay</div>
               <div className="text-5xl font-semibold text-[#0A2540]">$21.00</div>
             </div>
             
             {/* QR Code Container */}
             <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-lg mb-6 relative">
               <svg className="w-44 h-44" viewBox="0 0 660 660" xmlns="http://www.w3.org/2000/svg">
                 <path d="m0 0h660v660h-660z" fill="#fff"/>
                 <g shapeRendering="crispEdges">
                   <path d="m280 80h20v20h-20z"/><path d="m300 80h20v20h-20z"/><path d="m320 80h20v20h-20z"/><path d="m360 80h20v20h-20z"/><path d="m380 80h20v20h-20z"/><path d="m260 100h20v20h-20z"/><path d="m280 100h20v20h-20z"/><path d="m300 100h20v20h-20z"/><path d="m340 100h20v20h-20z"/><path d="m360 100h20v20h-20z"/><path d="m380 100h20v20h-20z"/><path d="m240 120h20v20h-20z"/><path d="m260 120h20v20h-20z"/><path d="m280 120h20v20h-20z"/><path d="m300 120h20v20h-20z"/><path d="m320 120h20v20h-20z"/><path d="m400 120h20v20h-20z"/><path d="m240 140h20v20h-20z"/><path d="m340 140h20v20h-20z"/><path d="m380 140h20v20h-20z"/><path d="m240 160h20v20h-20z"/><path d="m260 160h20v20h-20z"/><path d="m280 160h20v20h-20z"/><path d="m360 160h20v20h-20z"/><path d="m380 160h20v20h-20z"/><path d="m240 180h20v20h-20z"/><path d="m260 180h20v20h-20z"/><path d="m300 180h20v20h-20z"/><path d="m320 180h20v20h-20z"/><path d="m340 180h20v20h-20z"/><path d="m360 180h20v20h-20z"/><path d="m380 180h20v20h-20z"/><path d="m400 180h20v20h-20z"/><path d="m240 200h20v20h-20z"/><path d="m280 200h20v20h-20z"/><path d="m320 200h20v20h-20z"/><path d="m360 200h20v20h-20z"/><path d="m400 200h20v20h-20z"/><path d="m240 220h20v20h-20z"/><path d="m260 220h20v20h-20z"/><path d="m400 220h20v20h-20z"/><path d="m80 240h20v20h-20z"/><path d="m120 240h20v20h-20z"/><path d="m140 240h20v20h-20z"/><path d="m160 240h20v20h-20z"/><path d="m180 240h20v20h-20z"/><path d="m200 240h20v20h-20z"/><path d="m260 240h20v20h-20z"/><path d="m280 240h20v20h-20z"/><path d="m320 240h20v20h-20z"/><path d="m360 240h20v20h-20z"/><path d="m380 240h20v20h-20z"/><path d="m400 240h20v20h-20z"/><path d="m440 240h20v20h-20z"/><path d="m460 240h20v20h-20z"/><path d="m480 240h20v20h-20z"/><path d="m500 240h20v20h-20z"/><path d="m520 240h20v20h-20z"/><path d="m120 260h20v20h-20z"/><path d="m180 260h20v20h-20z"/><path d="m220 260h20v20h-20z"/><path d="m280 260h20v20h-20z"/><path d="m320 260h20v20h-20z"/><path d="m360 260h20v20h-20z"/><path d="m420 260h20v20h-20z"/><path d="m560 260h20v20h-20z"/><path d="m80 280h20v20h-20z"/><path d="m100 280h20v20h-20z"/><path d="m120 280h20v20h-20z"/><path d="m160 280h20v20h-20z"/><path d="m180 280h20v20h-20z"/><path d="m200 280h20v20h-20z"/><path d="m220 280h20v20h-20z"/><path d="m240 280h20v20h-20z"/><path d="m320 280h20v20h-20z"/><path d="m340 280h20v20h-20z"/><path d="m380 280h20v20h-20z"/><path d="m400 280h20v20h-20z"/><path d="m420 280h20v20h-20z"/><path d="m440 280h20v20h-20z"/><path d="m480 280h20v20h-20z"/><path d="m520 280h20v20h-20z"/><path d="m160 300h20v20h-20z"/><path d="m240 300h20v20h-20z"/><path d="m260 300h20v20h-20z"/><path d="m280 300h20v20h-20z"/><path d="m300 300h20v20h-20z"/><path d="m320 300h20v20h-20z"/><path d="m340 300h20v20h-20z"/><path d="m400 300h20v20h-20z"/><path d="m460 300h20v20h-20z"/><path d="m80 320h20v20h-20z"/><path d="m100 320h20v20h-20z"/><path d="m160 320h20v20h-20z"/><path d="m180 320h20v20h-20z"/><path d="m200 320h20v20h-20z"/><path d="m220 320h20v20h-20z"/><path d="m300 320h20v20h-20z"/><path d="m320 320h20v20h-20z"/><path d="m340 320h20v20h-20z"/><path d="m360 320h20v20h-20z"/><path d="m380 320h20v20h-20z"/><path d="m440 320h20v20h-20z"/><path d="m460 320h20v20h-20z"/><path d="m480 320h20v20h-20z"/><path d="m500 320h20v20h-20z"/><path d="m540 320h20v20h-20z"/><path d="m560 320h20v20h-20z"/><path d="m80 340h20v20h-20z"/><path d="m100 340h20v20h-20z"/><path d="m160 340h20v20h-20z"/><path d="m180 340h20v20h-20z"/><path d="m220 340h20v20h-20z"/><path d="m240 340h20v20h-20z"/><path d="m260 340h20v20h-20z"/><path d="m280 340h20v20h-20z"/><path d="m360 340h20v20h-20z"/><path d="m400 340h20v20h-20z"/><path d="m420 340h20v20h-20z"/><path d="m440 340h20v20h-20z"/><path d="m460 340h20v20h-20z"/><path d="m480 340h20v20h-20z"/><path d="m540 340h20v20h-20z"/><path d="m80 360h20v20h-20z"/><path d="m120 360h20v20h-20z"/><path d="m140 360h20v20h-20z"/><path d="m180 360h20v20h-20z"/><path d="m200 360h20v20h-20z"/><path d="m240 360h20v20h-20z"/><path d="m260 360h20v20h-20z"/><path d="m300 360h20v20h-20z"/><path d="m320 360h20v20h-20z"/><path d="m420 360h20v20h-20z"/><path d="m440 360h20v20h-20z"/><path d="m480 360h20v20h-20z"/><path d="m520 360h20v20h-20z"/><path d="m560 360h20v20h-20z"/><path d="m80 380h20v20h-20z"/><path d="m140 380h20v20h-20z"/><path d="m160 380h20v20h-20z"/><path d="m180 380h20v20h-20z"/><path d="m260 380h20v20h-20z"/><path d="m280 380h20v20h-20z"/><path d="m300 380h20v20h-20z"/><path d="m420 380h20v20h-20z"/><path d="m540 380h20v20h-20z"/><path d="m560 380h20v20h-20z"/><path d="m80 400h20v20h-20z"/><path d="m120 400h20v20h-20z"/><path d="m200 400h20v20h-20z"/><path d="m220 400h20v20h-20z"/><path d="m240 400h20v20h-20z"/><path d="m260 400h20v20h-20z"/><path d="m280 400h20v20h-20z"/><path d="m300 400h20v20h-20z"/><path d="m380 400h20v20h-20z"/><path d="m400 400h20v20h-20z"/><path d="m420 400h20v20h-20z"/><path d="m440 400h20v20h-20z"/><path d="m460 400h20v20h-20z"/><path d="m480 400h20v20h-20z"/><path d="m500 400h20v20h-20z"/><path d="m560 400h20v20h-20z"/><path d="m240 420h20v20h-20z"/><path d="m260 420h20v20h-20z"/><path d="m280 420h20v20h-20z"/><path d="m320 420h20v20h-20z"/><path d="m340 420h20v20h-20z"/><path d="m400 420h20v20h-20z"/><path d="m480 420h20v20h-20z"/><path d="m560 420h20v20h-20z"/><path d="m260 440h20v20h-20z"/><path d="m280 440h20v20h-20z"/><path d="m340 440h20v20h-20z"/><path d="m360 440h20v20h-20z"/><path d="m380 440h20v20h-20z"/><path d="m400 440h20v20h-20z"/><path d="m440 440h20v20h-20z"/><path d="m480 440h20v20h-20z"/><path d="m520 440h20v20h-20z"/><path d="m540 440h20v20h-20z"/><path d="m560 440h20v20h-20z"/><path d="m240 460h20v20h-20z"/><path d="m280 460h20v20h-20z"/><path d="m320 460h20v20h-20z"/><path d="m340 460h20v20h-20z"/><path d="m400 460h20v20h-20z"/><path d="m480 460h20v20h-20z"/><path d="m500 460h20v20h-20z"/><path d="m240 480h20v20h-20z"/><path d="m260 480h20v20h-20z"/><path d="m320 480h20v20h-20z"/><path d="m360 480h20v20h-20z"/><path d="m380 480h20v20h-20z"/><path d="m400 480h20v20h-20z"/><path d="m420 480h20v20h-20z"/><path d="m440 480h20v20h-20z"/><path d="m460 480h20v20h-20z"/><path d="m480 480h20v20h-20z"/><path d="m500 480h20v20h-20z"/><path d="m240 500h20v20h-20z"/><path d="m260 500h20v20h-20z"/><path d="m280 500h20v20h-20z"/><path d="m400 500h20v20h-20z"/><path d="m440 500h20v20h-20z"/><path d="m460 500h20v20h-20z"/><path d="m480 500h20v20h-20z"/><path d="m500 500h20v20h-20z"/><path d="m540 500h20v20h-20z"/><path d="m560 500h20v20h-20z"/><path d="m240 520h20v20h-20z"/><path d="m260 520h20v20h-20z"/><path d="m300 520h20v20h-20z"/><path d="m320 520h20v20h-20z"/><path d="m420 520h20v20h-20z"/><path d="m460 520h20v20h-20z"/><path d="m480 520h20v20h-20z"/><path d="m520 520h20v20h-20z"/><path d="m560 520h20v20h-20z"/><path d="m280 540h20v20h-20z"/><path d="m300 540h20v20h-20z"/><path d="m360 540h20v20h-20z"/><path d="m380 540h20v20h-20z"/><path d="m420 540h20v20h-20z"/><path d="m440 540h20v20h-20z"/><path d="m480 540h20v20h-20z"/><path d="m500 540h20v20h-20z"/><path d="m520 540h20v20h-20z"/><path d="m540 540h20v20h-20z"/><path d="m240 560h20v20h-20z"/><path d="m300 560h20v20h-20z"/><path d="m380 560h20v20h-20z"/><path d="m400 560h20v20h-20z"/><path d="m500 560h20v20h-20z"/><path d="m520 560h20v20h-20z"/><path d="m540 560h20v20h-20z"/><path d="m560 560h20v20h-20z"/><path d="m80 80h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd"/><path d="m440 80h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd"/><path d="m120 120h60v60h-60z"/><path d="m480 120h60v60h-60z"/><path d="m80 440h140v140h-140zm20 20h100v100h-100z" fillRule="evenodd"/><path d="m120 480h60v60h-60z"/>
                 </g>
               </svg>
               {/* Center N Logo overlay */}
               <LogoMark className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
             </div>

             <div className="flex gap-2 items-center text-gray-400 text-sm font-medium">
               <svg className="w-5 h-5 animate-spin text-mint" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               <span>Waiting for payment...</span>
             </div>
          </div>

          {/* Success View - Full Green Screen with elegant entrance */}
          <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-mint transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${step === 'success' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <div className={`flex flex-col items-center justify-center transition-all duration-400 delay-100 ease-out ${step === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
               <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5 transition-transform duration-400 delay-150 ease-(--ease-spring) ${step === 'success' ? 'scale-100' : 'scale-[0.9]'}`}>
                 <svg className={`w-10 h-10 text-navy transition-all duration-200 delay-300 ${step === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.9]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
                <div className={`text-navy text-xl font-medium tracking-tight transition-all duration-200 delay-200 ${step === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>Payment Received</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// BTCPay invoices data - hoisted outside component
const BTCPAY_INVOICES = [
  { date: "02/28/2026 3:05 PM", orderId: "PAY_REQUEST_cd4...", invoiceId: "EgxBnrivdT...", status: "Paid", amount: "0.00006150 BTC" },
  { date: "02/28/2026 12:39 PM", orderId: "PAY_REQUEST_a9f...", invoiceId: "aP9FZtE3QK...", status: "Paid", amount: "0.00248731 BTC" },
  { date: "02/28/2026 10:12 PM", orderId: "PAY_REQUEST_7d4...", invoiceId: "C5pNQZ6dWv...", status: "Paid", amount: "0.00090384 BTC" },
  { date: "02/28/2026 08:09 PM", orderId: "PAY_REQUEST_f3b...", invoiceId: "WnZxQFJ5A6...", status: "Paid", amount: "0.01572946 BTC" },
  { date: "02/27/2026 10:46 PM", orderId: "PAY_REQUEST_0c8...", invoiceId: "U8N9x5ZC2F...", status: "Paid", amount: "0.00001892 BTC" },
];

// Recreated BTCPay Server Interface Component
function BTCPayInterface({ paymentStatus }: { paymentStatus: 'pending' | 'paid' | null }) {
  // Only show the new row if paymentStatus is not null
  const showNewRow = paymentStatus !== null;
  const isPaid = paymentStatus === 'paid';

  return (
    // The frame, edge and shadow belong to the wrapper in BTCPayDemo.
    <div className="bg-[#f8f9fa] overflow-hidden font-sans flex text-xs md:text-sm select-none h-[560px]">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#f8f9fa] border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center justify-between mb-2">
           <div className="flex items-center">
             <Image src="/btcpay-logo.svg" alt="BTCPay Server" width={100} height={28} />
           </div>
           <div className="relative cursor-pointer">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute -top-1.5 -right-1.5 bg-[#dc3545] text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-semibold px-1 border-2 border-[#f8f9fa]">15</span>
           </div>
        </div>
        
        <div className="px-4 py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden flex-1">
            <div className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded text-gray-700 mb-6 hover:bg-gray-50 cursor-pointer shadow-sm group">
                <div className="flex items-center gap-3 truncate">
                   <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                   <span className="font-semibold truncate text-sm">Nuthouse</span>
                </div>
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>

            <div className="space-y-1 mb-6">
                <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200/50 rounded cursor-pointer transition-colors duration-150">
                    <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg></div>
                    <span className="font-medium">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200/50 rounded cursor-pointer transition-colors duration-150">
                    <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                    <span className="font-medium">Settings</span>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Wallets</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                    <div className="w-5 flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#51b13e]"></div></div>
                    <span className="font-medium">Bitcoin</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                    <div className="w-5 flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#51b13e]"></div></div>
                    <span className="font-medium">Cashu</span>
                  </div>
                  <div className="pl-11 pr-3 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer text-sm font-medium transition-colors duration-150">Wallet</div>
                  <div className="pl-11 pr-3 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer text-sm font-medium transition-colors duration-150">Settings</div>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Payments</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                       <span className="font-medium">Requests</span>
                    </div>
                     <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></div>
                       <span className="font-medium">Pull Payments</span>
                    </div>
                     <div className="flex items-center gap-3 px-3 py-2 text-[#51b13e] rounded cursor-pointer transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg></div>
                       <span className="font-semibold">Invoices</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded cursor-pointer hover:bg-gray-200/50 transition-colors duration-150">
                       <div className="w-5 flex justify-center"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
                       <span className="font-medium">Payouts</span>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white md:bg-[#f8f9fa] relative">
         {/* Toast Notification - appears when payment is confirmed */}
         <div 
           className={`absolute top-4 right-4 z-50 flex items-center gap-2 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-out ${
             isPaid 
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 -translate-y-2 pointer-events-none'
           }`}
         >
           <svg className="w-5 h-5 text-[#28a745] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <span className="text-sm font-medium">New payment received!</span>
         </div>

         <div className="p-4 md:p-8 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between gap-4 mb-6">
               <div className="flex items-center gap-2">
                 {/* Not a real heading — depicted chrome, kept out of the outline */}
                 <div className="text-xl md:text-2xl font-semibold text-gray-800">Invoices</div>
                 <span className="text-gray-400 cursor-help bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
               </div>
               <button className="bg-[#51b13e] hover:bg-[#469d34] active:scale-[0.98] text-white px-4 py-2 rounded shadow-sm font-medium text-sm transition-all duration-150 flex items-center gap-2">
                 <span>Create Invoice</span>
               </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
               <div className="relative flex-1 min-w-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input type="text" placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#51b13e] bg-white text-sm" />
               </div>
               <div className="flex gap-2 text-sm overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden">
                 <div className="bg-white border border-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <span>All invoices</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
                 <div className="bg-white border border-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <span>All time</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
                 <div className="bg-white border border-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <span>Export</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </div>
               </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
               <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
                 <table className="w-full text-xs md:text-sm table-fixed">
                    <thead className="bg-[#f8f9fa]">
                      <tr className="text-gray-500 border-b border-gray-200">
                         <th className="py-3 px-4 text-left w-[40px]">
                            <input type="checkbox" className="rounded border-gray-300 text-[#51b13e] focus:ring-[#51b13e] w-4 h-4" />
                         </th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[140px]">Date</th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[130px]">Order ID</th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[110px] hidden sm:table-cell">Invoice ID</th>
                         <th className="py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider text-gray-500 w-[90px]">Status</th>
                         <th className="py-3 px-4 text-right font-semibold text-xs uppercase tracking-wider text-gray-500 w-[120px]">Amount</th>
                         <th className="py-3 px-4 text-right w-[70px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {/* New Invoice Row - Only rendered when active */}
                       {showNewRow && (
                       <tr className="bg-white">
                          <td className="py-3 px-4 align-middle">
                               <input type="checkbox" className="rounded border-gray-300 text-[#51b13e] w-4 h-4" />
                          </td>
                          <td className="py-3 px-4 text-gray-700 align-middle whitespace-nowrap text-[13px]">
                                Just now
                          </td>
                          <td className="py-3 px-4 text-[#51b13e] tabular text-[11px] align-middle whitespace-nowrap">
                                <div className="max-w-[120px] truncate">NUMO_REQUEST</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 tabular text-[11px] align-middle whitespace-nowrap hidden sm:table-cell">
                                <div className="max-w-[120px] truncate">Nm8XkZq2Yw...</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap align-middle">
                                 {isPaid ? (
                                    <span className="bg-[#d4edda] text-[#155724] px-2 py-1 rounded text-[11px] font-semibold">Paid</span>
                                 ) : (
                                    <span className="bg-[#fff3cd] text-[#856404] px-2 py-1 rounded text-[11px] font-semibold">Processing</span>
                                 )}
                           </td>
                          <td className="py-3 px-4 text-right text-gray-700 align-middle whitespace-nowrap tabular text-[11px]">
                                0.00025439 BTC
                          </td>
                          <td className="py-3 px-4 text-right align-middle whitespace-nowrap">
                                <span className="text-[#51b13e] cursor-pointer hover:underline text-xs font-medium flex items-center justify-end gap-1">
                                   Details
                                </span>
                          </td>
                       </tr>
                       )}

                       {/* Existing Invoices */}
                       {BTCPAY_INVOICES.map((inv, i) => (
                          <tr key={i} className="bg-white hover:bg-gray-50 transition-colors duration-150">
                             <td className="py-3 px-4 align-middle">
                                <input type="checkbox" className="rounded border-gray-300 text-[#51b13e] focus:ring-[#51b13e] w-4 h-4" />
                             </td>
                             <td className="py-3 px-4 text-gray-700 whitespace-nowrap align-middle text-[13px]">{inv.date}</td>
                             <td className="py-3 px-4 text-[#51b13e] tabular text-[11px] whitespace-nowrap align-middle">
                               <div className="max-w-[120px] truncate">{inv.orderId}</div>
                             </td>
                             <td className="py-3 px-4 text-gray-600 tabular text-[11px] whitespace-nowrap align-middle hidden sm:table-cell">
                               <div className="max-w-[120px] truncate">{inv.invoiceId}</div>
                             </td>
                             <td className="py-3 px-4 whitespace-nowrap align-middle">
                                {inv.status === 'Processing' ? (
                                   <span className="bg-[#fff3cd] text-[#856404] px-2 py-1 rounded text-[11px] font-semibold">Processing</span>
                                ) : (
                                   <span className="bg-[#d4edda] text-[#155724] px-2 py-1 rounded text-[11px] font-semibold">Paid</span>
                                )}
                             </td>
                             <td className="py-3 px-4 text-right text-gray-700 whitespace-nowrap tabular text-[11px] align-middle">{inv.amount}</td>
                             <td className="py-3 px-4 text-right whitespace-nowrap align-middle">
                                <span className="text-[#51b13e] cursor-pointer hover:underline text-xs font-medium flex items-center justify-end gap-1">
                                   Details
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

/** The integration, shown rather than described: a charge is rung up on the till
 *  and the matching invoice appears, then settles, in the BTCPay store. */
export function BTCPayDemo() {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleQRShown = useCallback(() => setPaymentStatus("pending"), []);
  const handlePaymentComplete = useCallback(() => setPaymentStatus("paid"), []);
  const handleReset = useCallback(() => setPaymentStatus(null), []);

  return (
    <div ref={ref}>
      <div className="grid items-center gap-10 overflow-hidden rounded-frame border border-line bg-sunken p-5 sm:p-8 lg:grid-cols-[2fr_1fr] lg:gap-12 lg:p-12">
        {/* Depicted third-party software — a picture of a dashboard, not a
            dashboard. `inert` rather than `aria-hidden`, because the mockup
            contains a search field and checkboxes that would stay focusable
            inside an aria-hidden subtree. */}
        <div className="w-full overflow-hidden rounded-card border border-line shadow-device" inert>
          <BTCPayInterface paymentStatus={paymentStatus} />
        </div>

        <div className="flex min-h-[600px] w-full justify-center" aria-hidden="true">
          {isInView && (
            <POSSystem
              onQRShown={handleQRShown}
              onPaymentComplete={handlePaymentComplete}
              onReset={handleReset}
            />
          )}
        </div>
      </div>

      {/* The invoice rows are sample content, not a customer's books. Saying so
          plainly keeps this an illustration rather than an implied claim. */}
      <p className="mt-4 text-sm text-navy/70">
        Illustration. Invoice amounts and store name are sample data.
      </p>
    </div>
  );
}
