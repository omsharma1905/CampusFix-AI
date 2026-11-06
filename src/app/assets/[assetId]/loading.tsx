import React from "react";

export default function AssetDetailLoading() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] md:pl-20">
      {/* Top Bar Skeleton */}
      <div className="h-14 border-b border-[#EEF0E5] bg-[#FFFFFF] px-6 flex items-center justify-between animate-pulse">
        <div className="h-5 w-64 bg-[#E8E9DC] rounded" />
        <div className="h-8 w-40 bg-[#E8E9DC] rounded-full" />
      </div>

      {/* Sub-Header Skeleton */}
      <div className="bg-[#FFFFFF] px-6 py-4 border-b border-[#EEF0E5] flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-3 w-48 bg-[#E8E9DC] rounded" />
          <div className="h-7 w-72 bg-[#E8E9DC] rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-28 bg-[#E8E9DC] rounded-lg" />
          <div className="h-9 w-36 bg-[#E8E9DC] rounded-lg" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-[1720px] p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-80 bg-[#FFFFFF] rounded-xl border border-[#A5A79B]/20 p-4" />
          <div className="lg:col-span-7 h-80 bg-[#FFFFFF] rounded-xl border border-[#A5A79B]/20 p-4" />
        </div>
        <div className="h-44 bg-[#FFFFFF] rounded-xl border border-[#A5A79B]/20 p-4" />
        <div className="h-32 bg-[#FFFFFF] rounded-xl border border-[#A5A79B]/20 p-4" />
      </div>
    </div>
  );
}

