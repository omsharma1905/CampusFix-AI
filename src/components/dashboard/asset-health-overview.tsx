"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ASSET_HEALTH_DATA, DOMAIN_FILTERS } from "./mock-data";
import { AssetHealthBreakdown } from "./types";

interface AssetHealthProps {
  data?: AssetHealthBreakdown;
  onGenerateWorkOrder?: (recommendationId: string) => void;
  onSelectDomain?: (domainId: string) => void;
}

export function AssetHealthOverview({
  data = ASSET_HEALTH_DATA,
  onGenerateWorkOrder,
  onSelectDomain,
}: AssetHealthProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const totalAssets =
    data.healthy.count + data.attention.count + data.critical.count + data.overhaul.count;

  return (
    <div className="w-full max-w-full min-w-0 grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_1fr]">
      {/* Left Column: Asset Health Progress & Metrics */}
      <article className="w-full max-w-full min-w-0 flex flex-col justify-between rounded-xl border border-[#E7E9DC] bg-white p-5 shadow-xs sm:p-6">
        <div>
          {/* Header */}
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1558C9] uppercase">
                INFRASTRUCTURE TELEMETRY
              </span>
              <h2 className="mt-1 font-serif text-xl font-normal text-[#030407] sm:text-2xl">
                Asset Health Overview
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#73766C]">
                Total Assets Monitored: <strong className="text-[#030407]">{totalAssets.toLocaleString()}</strong>
              </span>
            </div>
          </div>

          {/* Domain Quick Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-y border-[#E7E9DC]/70 py-2.5">
            <span className="font-mono text-[10px] text-[#73766C] uppercase pr-1">Filter Domain:</span>
            {DOMAIN_FILTERS.map((domain) => {
              const isSelected = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => {
                    setSelectedDomain(domain.id);
                    onSelectDomain?.(domain.id);
                  }}
                  className={`rounded-md px-2.5 py-1 text-xs transition ${
                    isSelected
                      ? "bg-[#1558C9] font-semibold text-white shadow-xs"
                      : "bg-[#F7F8EF] text-[#73766C] hover:bg-white hover:text-[#030407]"
                  }`}
                >
                  {domain.label}
                </button>
              );
            })}
          </div>

          {/* Segmented Asset Health Progress Bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#151710]">
              <span>Campus Distribution by Operating State</span>
              <span className="font-mono text-[11px] text-[#1558C9]">78.0% Healthy</span>
            </div>

            {/* Visual Stacked Progress Bar */}
            <div className="mt-2.5 flex h-4 w-full overflow-hidden rounded-md bg-[#F7F8EF] p-0.5 border border-[#E7E9DC]">
              <div
                style={{ width: `${data.healthy.percentage}%` }}
                className="h-full rounded-l-xs bg-[#1558C9] transition-all duration-300"
                title={`Healthy: ${data.healthy.percentage}% (${data.healthy.count} assets)`}
              />
              <div
                style={{ width: `${data.attention.percentage}%` }}
                className="h-full bg-[#E8D2B5] transition-all duration-300"
                title={`Attention Needed: ${data.attention.percentage}% (${data.attention.count} assets)`}
              />
              <div
                style={{ width: `${data.critical.percentage}%` }}
                className="h-full bg-[#590907] transition-all duration-300"
                title={`Critical State: ${data.critical.percentage}% (${data.critical.count} assets)`}
              />
              <div
                style={{ width: `${data.overhaul.percentage}%` }}
                className="h-full rounded-r-xs bg-[#A5A79B] transition-all duration-300"
                title={`Under Overhaul: ${data.overhaul.percentage}% (${data.overhaul.count} assets)`}
              />
            </div>
          </div>

          {/* 4 Health Status Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Healthy Assets */}
            <div className="rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/60 p-3">
              <div className="flex items-center gap-1.5 text-[#1558C9]">
                <span className="size-2 rounded-full bg-[#1558C9]" />
                <span className="font-mono text-[9px] font-bold tracking-wider uppercase">
                  Healthy
                </span>
              </div>
              <div className="mt-2 font-serif text-2xl font-normal text-[#030407]">
                {data.healthy.count.toLocaleString()}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#73766C]">
                {data.healthy.percentage}% of fleet
              </div>
            </div>

            {/* Attention Needed */}
            <div className="rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/60 p-3">
              <div className="flex items-center gap-1.5 text-[#030407]">
                <span className="size-2 rounded-full bg-[#E8D2B5] border border-[#030407]/40" />
                <span className="font-mono text-[9px] font-bold tracking-wider uppercase">
                  Attention
                </span>
              </div>
              <div className="mt-2 font-serif text-2xl font-normal text-[#030407]">
                {data.attention.count.toLocaleString()}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#73766C]">
                {data.attention.percentage}% wear warning
              </div>
            </div>

            {/* Critical State */}
            <div className="rounded-lg border border-[#590907]/20 bg-[#590907]/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-[#590907]">
                <span className="size-2 rounded-full bg-[#590907]" />
                <span className="font-mono text-[9px] font-bold tracking-wider uppercase">
                  Critical
                </span>
              </div>
              <div className="mt-2 font-serif text-2xl font-normal text-[#590907]">
                {data.critical.count.toLocaleString()}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#590907]/80">
                {data.critical.percentage}% urgent risk
              </div>
            </div>

            {/* Under Overhaul */}
            <div className="rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/60 p-3">
              <div className="flex items-center gap-1.5 text-[#73766C]">
                <span className="size-2 rounded-full bg-[#A5A79B]" />
                <span className="font-mono text-[9px] font-bold tracking-wider uppercase">
                  Overhaul
                </span>
              </div>
              <div className="mt-2 font-serif text-2xl font-normal text-[#030407]">
                {data.overhaul.count.toLocaleString()}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#73766C]">
                {data.overhaul.percentage}% scheduled rebuild
              </div>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-t border-[#E7E9DC]/70 pt-3 text-[11px] text-[#73766C]">
          <span>Telemetry updated 3 mins ago via automated building management grid</span>
          <span className="font-mono text-[10px] font-medium text-[#1558C9]">ISO 55000 Baseline</span>
        </div>
      </article>

      {/* Right Column: AI Preventive Recommendation Card */}
      <article className="w-full max-w-full min-w-0 flex flex-col justify-between rounded-xl bg-[#030407] p-5 text-white shadow-md sm:p-6">
        <div>
          {/* AI Header Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-[#D4FF24]/20 text-[#D4FF24]">
                <Sparkles size={14} />
              </span>
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#D4FF24] uppercase">
                CAMPUSFIX AI INSIGHT
              </span>
            </div>
            <span className="rounded-xs bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
              HIGH CONFIDENCE (98%)
            </span>
          </div>

          <h3 className="mt-4 font-serif text-xl font-normal text-white sm:text-2xl">
            Vibration Variance on Chiller Unit #02
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-white/70">
            Turing Science Complex basement chiller exhibits a 14% bearing vibration anomaly above normal baseline. Predictive failure modeling projects bearing seizure within 48 to 72 operational hours if lubricant viscosity is not replenished.
          </p>

          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-[11px]">
            <div className="flex justify-between text-white/80">
              <span>Asset:</span>
              <span className="text-[#D4FF24]">HVAC-CH-02-TSC</span>
            </div>
            <div className="mt-1 flex justify-between text-white/80">
              <span>Estimated Cost Impact:</span>
              <span className="text-white">$14,200 if unmitigated</span>
            </div>
            <div className="mt-1 flex justify-between text-white/80">
              <span>Preventive Action Window:</span>
              <span className="text-[#D4FF24]">Before Nov 06, 18:00</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-2">
          <button
            type="button"
            onClick={() => onGenerateWorkOrder?.("REC-CHILLER-02")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4FF24] py-2.5 font-sans text-xs font-bold text-[#030407] shadow-sm transition hover:bg-[#c3ec1e] focus:outline-none focus:ring-2 focus:ring-[#D4FF24]"
          >
            <span>Generate Preventive Work Order</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </article>
    </div>
  );
}
