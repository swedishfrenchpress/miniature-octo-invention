import React from "react";
import WorksOfflineAnimation from "@/components/WorksOfflineAnimation";

export default function OfflineAnimationExportPage() {
  return (
    <main className="min-h-screen bg-cream-warm flex items-center justify-center p-10">
      <div className="w-[900px] max-w-full aspect-[16/9] bg-cream rounded-[2rem] shadow-[0_30px_80px_rgba(10,37,64,0.12)] ring-1 ring-black/5 flex items-center justify-center">
        <WorksOfflineAnimation className="flex items-center justify-center scale-[1.15]" />
      </div>
    </main>
  );
}

