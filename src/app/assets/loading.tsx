import React from "react";

export default function AssetsLoading() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] p-6 text-[#151710] md:pl-[96px]">
      <div className="mx-auto max-w-[1720px] animate-pulse space-y-6">
        {/* Header Skeleton */}
        <div className="h-16 w-full rounded-xl bg-white border border-[#E2E4DE]" />

        {/* Title & Actions Skeleton */}
        <div className="h-24 w-full rounded-xl bg-white border border-[#E2E4DE]" />

        {/* 4 KPI Skeletons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-white border border-[#E2E4DE]" />
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="h-96 w-full rounded-xl bg-white border border-[#E2E4DE]" />

        {/* 3 Lower Panels Skeleton */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-white border border-[#E2E4DE]" />
          ))}
        </div>
      </div>
    </div>
  );
}

