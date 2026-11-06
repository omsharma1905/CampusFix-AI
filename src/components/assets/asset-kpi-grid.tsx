"use client";

import React from "react";
import { Layers, CheckCircle2, Wrench, AlertTriangle } from "lucide-react";
import { AssetKpiSummary } from "./types";
import { KPI_SUMMARY } from "./mock-data";

interface AssetKpiGridProps {
  summary?: AssetKpiSummary;
}

export function AssetKpiGrid({ summary = KPI_SUMMARY }: AssetKpiGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* KPI 1: Total Registered Assets */}
      <div className="group relative flex min-h-[115px] flex-col justify-between overflow-hidden rounded-xl border border-[#E2E4DE] bg-white p-4 shadow-xs transition-all hover:border-[#1558C9]/40 hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#73766C] uppercase">
              Total Registered Assets
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#030407] sm:text-3xl">
                {summary.totalAssets.count}
              </span>
              <span className="font-mono text-[11px] font-medium text-[#73766C]">
                {summary.totalAssets.delta}
              </span>
            </div>
          </div>
          <span className="grid size-9 place-items-center rounded-lg bg-[#F7F6F3] text-[#73766C] transition-colors group-hover:bg-[#1558C9]/10 group-hover:text-[#1558C9]">
            <Layers size={20} />
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEEE8]">
            <div
              className="h-full rounded-full bg-[#1558C9] transition-all duration-300"
              style={{ width: `${summary.totalAssets.progress}%` }}
            />
          </div>
          <span className="shrink-0 font-mono text-[10px] text-[#73766C]">
            {summary.totalAssets.label}
          </span>
        </div>
      </div>

      {/* KPI 2: Fully Operational */}
      <div className="group relative flex min-h-[115px] flex-col justify-between overflow-hidden rounded-xl border border-[#E2E4DE] bg-white p-4 shadow-xs transition-all hover:border-[#1558C9]/40 hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#73766C] uppercase">
              Fully Operational
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#030407] sm:text-3xl">
                {summary.fullyOperational.count}
              </span>
              <span className="inline-flex items-center rounded-xs bg-[#D4FF24] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#030407] border border-[#b2d919]">
                {summary.fullyOperational.rate}
              </span>
            </div>
          </div>
          <span className="grid size-9 place-items-center rounded-lg bg-[#F7F6F3] text-[#536600]">
            <CheckCircle2 size={20} className="text-[#1558C9]" />
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEEE8]">
            <div
              className="h-full rounded-full bg-[#1558C9] transition-all duration-300"
              style={{ width: `${summary.fullyOperational.progress}%` }}
            />
          </div>
          <span className="shrink-0 font-mono text-[10px] text-[#73766C]">
            {summary.fullyOperational.label}
          </span>
        </div>
      </div>

      {/* KPI 3: Maintenance Required */}
      <div className="group relative flex min-h-[115px] flex-col justify-between overflow-hidden rounded-xl border border-[#E2E4DE] bg-white p-4 shadow-xs transition-all hover:border-[#1558C9]/40 hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#73766C] uppercase">
              Maintenance Required
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#030407] sm:text-3xl">
                {summary.maintenanceRequired.count}
              </span>
              <span className="inline-flex items-center rounded-xs bg-[#E8D2B5] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#030407]">
                {summary.maintenanceRequired.rate}
              </span>
            </div>
          </div>
          <span className="grid size-9 place-items-center rounded-lg bg-[#F7F6F3] text-[#73766C]">
            <Wrench size={20} />
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEEE8]">
            <div
              className="h-full rounded-full bg-[#A5A79B] transition-all duration-300"
              style={{ width: `${summary.maintenanceRequired.progress * 4}%` }}
            />
          </div>
          <span className="shrink-0 font-mono text-[10px] text-[#73766C]">
            {summary.maintenanceRequired.label}
          </span>
        </div>
      </div>

      {/* KPI 4: Critical Telemetry */}
      <div className="group relative flex min-h-[115px] flex-col justify-between overflow-hidden rounded-xl border border-[#590907]/30 bg-white p-4 shadow-xs transition-all hover:border-[#590907] hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#590907] uppercase">
              Critical Telemetry
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#590907] sm:text-3xl">
                {summary.criticalTelemetry.count}
              </span>
              <span className="inline-flex items-center rounded-xs bg-[#590907] px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-2xs">
                {summary.criticalTelemetry.alert}
              </span>
            </div>
          </div>
          <span className="relative grid size-9 place-items-center rounded-lg bg-[#590907]/10 text-[#590907]">
            <span className="absolute size-2.5 rounded-full bg-[#590907] animate-ping opacity-60" />
            <AlertTriangle size={20} className="relative z-10" />
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEEE8]">
            <div
              className="h-full rounded-full bg-[#590907] transition-all duration-300"
              style={{ width: `${summary.criticalTelemetry.progress}%` }}
            />
          </div>
          <span className="shrink-0 font-mono text-[10px] font-semibold text-[#590907]">
            {summary.criticalTelemetry.label}
          </span>
        </div>
      </div>
    </div>
  );
}

