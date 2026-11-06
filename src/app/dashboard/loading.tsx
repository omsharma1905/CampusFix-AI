import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F7F8EF] p-6 text-[#151710] md:pl-[96px]">
      <div className="animate-pulse space-y-6">
        {/* Header Skeleton */}
        <div className="h-16 w-full rounded-xl bg-white border border-[#E7E9DC]" />

        {/* Introduction Skeleton */}
        <div className="h-36 w-full rounded-xl bg-white border border-[#E7E9DC]" />

        {/* 5 KPI Skeletons */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-white border border-[#E7E9DC]" />
          ))}
        </div>

        {/* Ticket Queue Skeleton */}
        <div className="h-96 w-full rounded-xl bg-white border border-[#E7E9DC]" />

        {/* Asset Health Skeleton */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_1fr]">
          <div className="h-80 rounded-xl bg-white border border-[#E7E9DC]" />
          <div className="h-80 rounded-xl bg-[#030407]" />
        </div>
      </div>
    </div>
  );
}

