"use client";

import React from "react";
import { AssetDetailRecord } from "../types";

export function AssetDetailHealthSection({ asset }: { asset: AssetDetailRecord }) {
  const { healthMetrics } = asset;
  const score = healthMetrics.score;

  return (
    <section className="bg-[#FFFFFF] rounded-xl shadow-sm p-5 lg:p-6 border border-[#A5A79B]/20 flex flex-col gap-5">
      {/* Header / Banner Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EEEFE2]">
        <div className="flex items-start gap-4">
          {/* Circular Gauge Indicator */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E8E9DC]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={score >= 80 ? "text-[#536600]" : score >= 50 ? "text-[#1558c9]" : "text-[#822820]"}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif text-[20px] text-[#1A1D15] font-semibold leading-none">
                {score}
              </span>
              <span className="font-mono text-[10px] text-[#737785] uppercase">/100</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-[22px] text-[#1A1D15] font-semibold">
                Asset Health Score
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#c8f30c]/30 text-[#586c00] text-[11px] font-semibold tracking-wide">
                {healthMetrics.statusLabel}
              </span>
            </div>
            <p className="text-[12px] text-[#434653] max-w-2xl mt-1">
              {healthMetrics.explanation}
            </p>
          </div>
        </div>

        {/* Micro Trend Chart Block */}
        <div className="flex flex-col md:items-end shrink-0 bg-[#F3F5E7] p-3 rounded-lg border border-[#A5A79B]/20">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1.5">
            6-Quarter Health Trend
          </span>
          <div className="flex items-center gap-2">
            {/* Sparkline Trend SVG */}
            <svg className="w-36 h-7 overflow-visible" fill="none" viewBox="0 0 140 28">
              <polyline
                fill="none"
                points="0,6 28,9 56,15 84,9 112,12 140,12"
                stroke="#1558C9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <circle cx="0" cy="6" fill="#1558C9" r="2.5" />
              <circle cx="28" cy="9" fill="#1558C9" r="2.5" />
              <circle cx="56" cy="15" fill="#1558C9" r="2.5" />
              <circle cx="84" cy="9" fill="#1558C9" r="2.5" />
              <circle cx="112" cy="12" fill="#1558C9" r="2.5" />
              <circle cx="140" cy="12" fill="#D4FF24" r="3" stroke="#0041a0" strokeWidth="1.5" />
            </svg>
            <span className="font-mono text-xs font-semibold text-[#0041a0]">
              {healthMetrics.trendAverage}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#737785] mt-1">
            {healthMetrics.trendPeriod}
          </span>
        </div>
      </div>

      {/* Telemetry Strip (5 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
        {/* Metric 1 */}
        <div className="bg-[#F3F5E7] p-3 rounded-lg flex flex-col justify-between border border-[#A5A79B]/10">
          <span className="text-[11px] font-semibold uppercase text-[#737785] tracking-wide">
            Laser Diode Runtime
          </span>
          <div className="my-1.5">
            <span className="font-mono text-[16px] font-semibold text-[#1A1D15]">
              {healthMetrics.laserRuntime.current.toLocaleString()}{" "}
              <span className="font-normal text-xs text-[#737785]">
                / {Math.round(healthMetrics.laserRuntime.max / 1000)}k hrs
              </span>
            </span>
            <div className="w-full bg-[#E8E9DC] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#1558c9] h-full rounded-full"
                style={{ width: `${healthMetrics.laserRuntime.percentConsumed}%` }}
              />
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#434653]">
            {healthMetrics.laserRuntime.label}
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#F3F5E7] p-3 rounded-lg flex flex-col justify-between border border-[#A5A79B]/10">
          <span className="text-[11px] font-semibold uppercase text-[#737785] tracking-wide">
            Cooling Exhaust Delta
          </span>
          <div className="my-1.5">
            <span className="font-mono text-[16px] font-semibold text-[#1A1D15]">
              {healthMetrics.coolingDelta.value}
            </span>
            <div className="w-full bg-[#E8E9DC] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#afd500] h-full rounded-full"
                style={{ width: `${healthMetrics.coolingDelta.barPercent}%` }}
              />
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#536600]">
            {healthMetrics.coolingDelta.label}
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#F3F5E7] p-3 rounded-lg flex flex-col justify-between border border-[#A5A79B]/10">
          <span className="text-[11px] font-semibold uppercase text-[#737785] tracking-wide">
            Breakdown Incidents
          </span>
          <div className="my-1.5">
            <span className="font-mono text-[16px] font-semibold text-[#1A1D15]">
              {healthMetrics.incidents.count} Events
            </span>
            <div className="w-full bg-[#E8E9DC] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#c8f30c] h-full rounded-full"
                style={{ width: healthMetrics.incidents.count === 0 ? "100%" : "25%" }}
              />
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#434653]">
            {healthMetrics.incidents.label}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#F3F5E7] p-3 rounded-lg flex flex-col justify-between border border-[#A5A79B]/10">
          <span className="text-[11px] font-semibold uppercase text-[#737785] tracking-wide">
            PM Compliance
          </span>
          <div className="my-1.5">
            <span className="font-mono text-[16px] font-semibold text-[#1A1D15]">
              {healthMetrics.pmCompliance.rate}
            </span>
            <div className="w-full bg-[#E8E9DC] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#afd500] h-full rounded-full"
                style={{ width: healthMetrics.pmCompliance.rate }}
              />
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#434653]">
            Last PM: {healthMetrics.pmCompliance.lastDate}
          </span>
        </div>

        {/* Metric 5 */}
        <div className="bg-[#F3F5E7] p-3 rounded-lg flex flex-col justify-between col-span-2 md:col-span-1 border border-[#A5A79B]/10">
          <span className="text-[11px] font-semibold uppercase text-[#737785] tracking-wide">
            Service Delay Burden
          </span>
          <div className="my-1.5">
            <span className="font-mono text-[16px] font-semibold text-[#1A1D15]">
              {healthMetrics.serviceDelay.value}
            </span>
            <div className="w-full bg-[#E8E9DC] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#1558c9] h-full rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#536600]">
            {healthMetrics.serviceDelay.label}
          </span>
        </div>
      </div>
    </section>
  );
}
