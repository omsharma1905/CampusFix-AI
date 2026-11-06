"use client";

import React from "react";
import { Activity, CheckCircle2, Clock, Calendar } from "lucide-react";
import { AssetDetailRecord } from "../types";

export function AssetDetailLifecycleSection({ asset }: { asset: AssetDetailRecord }) {
  const { lifecycle } = asset;

  return (
    <section className="bg-[#FFFFFF] rounded-xl shadow-sm p-5 lg:p-6 border border-[#A5A79B]/20 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EEEFE2] gap-2">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[#1558C9]" />
          <h2 className="font-serif text-[18px] text-[#1A1D15] font-semibold">
            Asset Lifecycle &amp; Capital Depreciation
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase text-[#737785] tracking-wider">
            Current Stage:
          </span>
          <span className="px-2.5 py-0.5 rounded bg-[#dae2ff] text-[#001946] text-xs font-semibold">
            {lifecycle.stageTimelineSummary}
          </span>
        </div>
      </div>

      {/* Stepper Visual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 pt-2">
        {lifecycle.stages.map((stage) => {
          const isActive = stage.status === "ACTIVE";
          const isCompleted = stage.status === "COMPLETED";

          return (
            <div
              key={stage.number}
              className={`p-3.5 rounded-lg flex flex-col justify-between border transition-all ${
                isActive
                  ? "bg-[#E8E9DC] border-[#A5A79B]/50 shadow-sm ring-1 ring-[#1558c9]/20"
                  : isCompleted
                  ? "bg-[#F3F5E7] border-[#A5A79B]/15"
                  : "bg-[#F3F5E7]/70 border-[#A5A79B]/15 opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive || isCompleted ? "text-[#0041a0]" : "text-[#737785]"
                  }`}
                >
                  {stage.number}
                </span>

                {isCompleted && (
                  <CheckCircle2 size={16} className="text-[#536600]" />
                )}
                {isActive && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#c8f30c] text-[#171e00] text-[10px] font-bold uppercase tracking-wider">
                    Active
                  </span>
                )}
                {stage.status === "UPCOMING" && (
                  <Clock size={16} className="text-[#737785]" />
                )}
                {stage.status === "PROJECTED" && (
                  <Calendar size={16} className="text-[#737785]" />
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-[13px] text-[#1A1D15] ${
                    isActive ? "font-bold" : "font-semibold"
                  }`}
                >
                  {stage.title}
                </span>
                <span className="text-[11px] text-[#737785] mt-0.5">{stage.dateAndVendor}</span>
                <span
                  className={`font-mono text-xs mt-1 ${
                    isActive ? "text-[#0041a0] font-semibold" : "text-[#434653] font-medium"
                  }`}
                >
                  {stage.reference}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
