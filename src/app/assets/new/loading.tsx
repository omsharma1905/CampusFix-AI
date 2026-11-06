import React from "react";

export default function RegisterAssetLoading() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] md:pl-20">
      <div className="h-14 border-b border-[#EEF0E5] bg-[#FFFFFF] px-6 flex items-center justify-between animate-pulse">
        <div className="h-5 w-64 bg-[#E8E9DC] rounded" />
        <div className="h-8 w-40 bg-[#E8E9DC] rounded-full" />
      </div>

      <div className="bg-[#FFFFFF] px-8 pt-6 pb-4 border-b border-[#EEF0E5] space-y-4 animate-pulse">
        <div className="h-4 w-48 bg-[#E8E9DC] rounded" />
        <div className="h-8 w-72 bg-[#E8E9DC] rounded" />
        <div className="h-10 w-full max-w-4xl bg-[#E8E9DC] rounded-full mt-4" />
      </div>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
        <div className="lg:col-span-8 h-96 bg-white rounded-xl border border-[#A5A79B]/20" />
        <div className="lg:col-span-4 h-96 bg-white rounded-xl border border-[#A5A79B]/20" />
      </div>
    </div>
  );
}

