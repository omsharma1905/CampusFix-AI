"use client";

import React from "react";
import {
  ScanLine,
  Timer,
  CalendarCheck,
  Activity,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingCapabilities() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="capabilities"
      className={`w-full py-28 px-5 sm:px-8 border-t transition-colors duration-300 ${
        isDark ? "border-white/10 bg-[#030407]" : "border-[#E2E4DE] bg-[#F9F9FC]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Section Header: Open & Editorial */}
        <div className="max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#1558C9] dark:text-[#C5EA32] font-semibold">
              Comprehensive Capabilities
            </span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight ${
              isDark ? "text-white" : "text-[#1A1D15]"
            }`}
          >
            Everything your facilities team needs. <br />
            <span className={`italic font-light ${isDark ? "text-[#E8D2B5]" : "text-[#1558C9]"}`}>
              Nothing disconnected.
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light max-w-2xl ${
              isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
            }`}
          >
            Six cohesive operational capabilities built to replace fragmented point-solutions with institutional-grade automation and complete spatial clarity.
          </p>
        </div>

        {/* ================= OPEN CAPABILITY SHOWCASE ================= */}
        <div className="flex flex-col gap-12">
          {/* Top Feature: Intelligent Asset Registry (Open Blueprint Presentation) */}
          <div
            className={`p-8 sm:p-10 rounded-3xl border transition-all ${
              isDark
                ? "bg-gradient-to-br from-[#060a14] to-[#04060c] border-white/10"
                : "bg-white border-[#E2E4DE] shadow-sm"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#1558C9] dark:text-[#C5EA32] uppercase tracking-widest font-semibold">
                    01 · ARCHITECTURAL LEDGER
                  </span>
                  <span className="text-xs text-[#737785] font-mono">•</span>
                  <span className="text-xs text-[#737785] font-mono">CORE SYSTEM</span>
                </div>

                <h3
                  className={`font-serif text-3xl sm:text-4xl font-normal tracking-tight ${
                    isDark ? "text-white" : "text-[#1A1D15]"
                  }`}
                >
                  Intelligent Asset Registry
                </h3>

                <p
                  className={`text-sm sm:text-base leading-relaxed font-light max-w-xl ${
                    isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                  }`}
                >
                  Every physical apparatus receives a cryptographic QR code, immutable serial registry, warranty tracker, and digital maintenance timeline linked to campus GIS coords.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#737785]">
                    Dynamic NFC/RFID EPC
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#737785]">
                    Depreciation Ledger
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#737785]">
                    Custody Tracking
                  </span>
                </div>
              </div>

              {/* Technical Schematic Viewport */}
              <div
                className={`lg:col-span-5 p-6 rounded-2xl border font-mono text-xs space-y-4 ${
                  isDark
                    ? "bg-[#030407]/90 border-white/10"
                    : "bg-[#F9F9FC] border-[#E2E4DE]"
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5EA32]" />
                    <span className={`font-bold ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                      DAIKIN-VRF-LAB304
                    </span>
                  </div>
                  <span className="text-[11px] text-[#737785]">SERIAL #DK-882190</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-[#737785] block uppercase text-[10px]">Location</span>
                    <span className={`font-medium ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                      L3 East Wing · Rm 304
                    </span>
                  </div>
                  <div>
                    <span className="text-[#737785] block uppercase text-[10px]">Thermal Rating</span>
                    <span className={`font-medium ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                      14.2 kW Cooling
                    </span>
                  </div>
                  <div>
                    <span className="text-[#737785] block uppercase text-[10px]">Commissioned</span>
                    <span className={`font-medium ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                      Oct 2024 (Verified)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#737785] block uppercase text-[10px]">Health Index</span>
                    <span className="text-[#3F5200] dark:text-[#C5EA32] font-bold">
                      92 / 100 · Nominal
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-[#737785]">Maintenance Strategy</span>
                  <span className="text-[#1558C9] dark:text-sky-400 font-semibold">
                    Preventive + Continuous Telemetry
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: 4 Modules in an Open, Typography-Led Layout (No heavy nested boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 02. Smart Issue Reporting */}
            <div className="flex flex-col justify-between pt-2 pb-1 border-t border-black/10 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1558C9] dark:text-[#C5EA32] font-semibold">
                    02 · INTAKE
                  </span>
                  <ScanLine size={16} className="text-[#737785]" />
                </div>
                <h4
                  className={`font-serif text-2xl font-normal leading-snug mt-1 ${
                    isDark ? "text-white" : "text-[#1A1D15]"
                  }`}
                >
                  Smart Issue Reporting
                </h4>
                <p className="text-xs text-[#737785] leading-relaxed font-light">
                  Camera-first QR scan for campus occupants. Automated duplicate filter flags already reported issues to stop redundant work.
                </p>
              </div>

              {/* Status Pill */}
              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center gap-2 text-xs font-mono text-red-500">
                <AlertCircle size={14} className="shrink-0" />
                <span className="text-[11px] truncate">AI Duplicate Screen: 0 redundant jobs</span>
              </div>
            </div>

            {/* 03. Work Order Lifecycle */}
            <div className="flex flex-col justify-between pt-2 pb-1 border-t border-black/10 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1558C9] dark:text-[#C5EA32] font-semibold">
                    03 · SLA DISPATCH
                  </span>
                  <Timer size={16} className="text-[#737785]" />
                </div>
                <h4
                  className={`font-serif text-2xl font-normal leading-snug mt-1 ${
                    isDark ? "text-white" : "text-[#1A1D15]"
                  }`}
                >
                  Work Order Lifecycle
                </h4>
                <p className="text-xs text-[#737785] leading-relaxed font-light">
                  Automated crew routing by trade license, building vicinity, and SLA clock urgency with live checklist sign-off.
                </p>
              </div>

              {/* Status Pill */}
              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#737785] text-[11px]">Tier-1 HVAC SLA</span>
                <span className="text-[#3F5200] dark:text-[#C5EA32] font-bold text-[11px]">
                  1h 18m Target
                </span>
              </div>
            </div>

            {/* 04. Preventive Care */}
            <div className="flex flex-col justify-between pt-2 pb-1 border-t border-black/10 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1558C9] dark:text-[#C5EA32] font-semibold">
                    04 · RECURRENCE
                  </span>
                  <CalendarCheck size={16} className="text-[#737785]" />
                </div>
                <h4
                  className={`font-serif text-2xl font-normal leading-snug mt-1 ${
                    isDark ? "text-white" : "text-[#1A1D15]"
                  }`}
                >
                  Preventive Care
                </h4>
                <p className="text-xs text-[#737785] leading-relaxed font-light">
                  Automated recurring inspection protocols for chillers, fire suppression systems, electrical vaults, and elevators.
                </p>
              </div>

              {/* Status Pill */}
              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#737785] text-[11px]">PM Compliance</span>
                <span className="text-[#1558C9] dark:text-sky-400 font-bold text-[11px]">
                  94.6% Completed
                </span>
              </div>
            </div>

            {/* 05. Asset Intelligence */}
            <div className="flex flex-col justify-between pt-2 pb-1 border-t border-black/10 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1558C9] dark:text-[#C5EA32] font-semibold">
                    05 · PREDICTIVE
                  </span>
                  <Activity size={16} className="text-[#737785]" />
                </div>
                <h4
                  className={`font-serif text-2xl font-normal leading-snug mt-1 ${
                    isDark ? "text-white" : "text-[#1A1D15]"
                  }`}
                >
                  Asset Intelligence
                </h4>
                <p className="text-xs text-[#737785] leading-relaxed font-light">
                  Harmonic vibration telemetry catches bearing breakdown and lubricant breakdown weeks before critical failure.
                </p>
              </div>

              {/* Status Pill */}
              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#737785] text-[11px]">Telemetry Grid</span>
                <span className="text-[#3F5200] dark:text-[#C5EA32] font-bold text-[11px]">
                  +1.84 mm/s Flagged
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Module: 06. MTTR & Operational Analytics (Open Architectural Benchmarking Bar) */}
          <div
            className={`p-8 rounded-3xl border transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 ${
              isDark
                ? "bg-[#070b14] border-white/10"
                : "bg-white border-[#E2E4DE] shadow-xs"
            }`}
          >
            <div className="max-w-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-[#1558C9] dark:text-[#C5EA32]" />
                <span className="text-[11px] font-mono text-[#1558C9] dark:text-[#C5EA32] uppercase tracking-widest font-semibold">
                  06 · EXECUTIVE BENCHMARKING
                </span>
              </div>
              <h3
                className={`font-serif text-2xl sm:text-3xl font-normal tracking-tight ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                MTTR &amp; Operational Analytics
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                }`}
              >
                Mean-Time-To-Resolution tracking categorized across campus quarters: Science Quad, Engineering Hall, Chiller Plant, and Student Residences.
              </p>
            </div>

            {/* Department MTTR Visualizer */}
            <div className="flex items-end gap-5 h-20 self-stretch sm:self-auto justify-between sm:justify-start pt-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 rounded-t h-10 ${isDark ? "bg-white/20" : "bg-black/15"}`} />
                <span className="text-[10px] font-mono text-[#737785]">ENG</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 rounded-t h-14 ${isDark ? "bg-white/20" : "bg-black/15"}`} />
                <span className="text-[10px] font-mono text-[#737785]">SCI</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 bg-[#C5EA32] rounded-t h-18 shadow-sm shadow-[#C5EA32]/25" />
                <span className="text-[10px] font-mono text-[#3F5200] dark:text-[#C5EA32] font-bold">
                  CHILL
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 bg-[#1558C9] rounded-t h-8" />
                <span className="text-[10px] font-mono text-[#1558C9] dark:text-sky-400">RES</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 rounded-t h-6 ${isDark ? "bg-white/20" : "bg-black/20"}`} />
                <span className="text-[10px] font-mono text-[#737785]">ARTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
