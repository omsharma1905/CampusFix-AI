"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log telemetry error to facilities console
    console.error("Dashboard operations telemetry exception:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F8EF] p-6 text-center text-[#151710] md:pl-20">
      <div className="max-w-md rounded-2xl border border-[#E7E9DC] bg-white p-8 shadow-xl">
        <div className="mx-auto grid size-12 place-items-center rounded-xl bg-[#590907]/10 text-[#590907]">
          <AlertTriangle size={24} />
        </div>

        <span className="mt-4 block font-mono text-[10px] font-bold tracking-widest text-[#590907] uppercase">
          OPERATIONS TELEMETRY FAULT
        </span>

        <h2 className="mt-2 font-serif text-2xl font-normal text-[#030407]">
          Facilities Stream Interrupted
        </h2>

        <p className="mt-2 text-xs leading-relaxed text-[#73766C]">
          An unexpected error occurred while synchronizing real-time campus sensors and ticket feeds.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-lg bg-[#1558C9] px-4 py-2 font-sans text-xs font-semibold text-white shadow-xs transition hover:bg-[#0f44a0]"
          >
            <RefreshCw size={14} />
            <span>Reconnect Telemetry Stream</span>
          </button>
        </div>
      </div>
    </div>
  );
}

