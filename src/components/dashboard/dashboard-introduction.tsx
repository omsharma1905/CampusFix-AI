"use client";

import React from "react";
import {
  Calendar,
  ChevronDown,
  MapPin,
  Plus,
  Radio,
  Server,
  AlertTriangle,
} from "lucide-react";
import { ZONES } from "./mock-data";

interface DashboardIntroProps {
  selectedZone: string;
  onSelectZone: (zone: string) => void;
  onOpenReportIssue?: () => void;
  onOpenRegisterAsset?: () => void;
}

export function DashboardIntroduction({
  selectedZone,
  onSelectZone,
  onOpenReportIssue,
  onOpenRegisterAsset,
}: DashboardIntroProps) {
  const [zoneDropdownOpen, setZoneDropdownOpen] = React.useState(false);

  return (
    <section className="w-full max-w-full overflow-hidden border-b border-[#E7E9DC] bg-white px-4 py-5 sm:px-6 md:px-8 sm:py-6">
      {/* Top Metadata Row: Breadcrumbs, Date & System Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-[11px] text-[#73766C]">
        {/* Breadcrumb Hierarchy */}
        <div className="flex flex-wrap items-center gap-1.5 font-medium">
          <span className="text-[#1558C9]">Apex University</span>
          <span>/</span>
          <span className="text-[#151710]">Central Facilities</span>
          <span>/</span>
          <span className="rounded-sm bg-[#F7F8EF] px-1.5 py-0.5 font-mono text-[10px] text-[#73766C]">
            ADMIN-OPS
          </span>
        </div>

        {/* Monitoring Period & Real-time Metadata */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#1558C9]" />
            <span>Shift 02 (Active)</span>
          </div>
          <span className="hidden text-[#E7E9DC] sm:inline">|</span>
          <div className="hidden items-center gap-1.5 text-[#151710] sm:flex">
            <Radio size={12} className="text-[#1558C9]" />
            <span>Telemetry: Live (22ms)</span>
          </div>
          <span className="hidden text-[#E7E9DC] md:inline">|</span>
          <div className="hidden items-center gap-1 text-[#73766C] md:flex">
            <Server size={12} />
            <span>v2.4.0-PROD</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero: Heading & Zone Controller */}
      <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-3xl min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-[#1558C9]" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1558C9] uppercase">
              INSTITUTIONAL OPERATIONS DISPATCH
            </span>
          </div>

          <h1 className="font-serif text-2xl font-normal tracking-tight text-[#030407] sm:text-4xl lg:text-[42px] lg:leading-[1.15] break-words">
            Welcome back,{" "}
            <span className="font-serif italic text-[#1558C9]">Facilities Operations</span>
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-[#73766C] sm:text-sm">
            Campus physical infrastructure is operating within standard tolerances.{" "}
            <span className="font-semibold text-[#590907]">3 critical SLAs</span> require technician
            intervention before 18:00 today.
          </p>
        </div>

        {/* Right Controls: Zone Selector & Hero Actions */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Selected Zone Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setZoneDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] px-3.5 py-2 text-xs font-medium text-[#151710] transition hover:border-[#1558C9] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#1558C9]"
              aria-label="Filter dashboard by zone"
              aria-expanded={zoneDropdownOpen}
            >
              <MapPin size={14} className="text-[#1558C9]" />
              <div className="flex flex-col text-left">
                <span className="font-mono text-[9px] text-[#73766C] uppercase">Active Zone</span>
                <span className="font-semibold text-[#030407]">{selectedZone}</span>
              </div>
              <ChevronDown
                size={14}
                className={`ml-1 text-[#73766C] transition-transform ${
                  zoneDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {zoneDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setZoneDropdownOpen(false)}
                />
                <div className="absolute right-0 z-50 mt-1.5 w-56 rounded-xl border border-[#E7E9DC] bg-white p-1.5 shadow-xl shadow-black/5">
                  <div className="px-2.5 py-1 text-[9px] font-bold tracking-wider text-[#73766C] uppercase">
                    Filter Facilities Zone
                  </div>
                  {ZONES.map((zone) => {
                    const isSelected = zone === selectedZone;
                    return (
                      <button
                        key={zone}
                        type="button"
                        onClick={() => {
                          onSelectZone(zone);
                          setZoneDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                          isSelected
                            ? "bg-[#1558C9]/10 font-semibold text-[#1558C9]"
                            : "text-[#151710] hover:bg-[#F7F8EF]"
                        }`}
                      >
                        <span>{zone}</span>
                        {isSelected && <span className="size-1.5 rounded-full bg-[#1558C9]" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Quick Action: Report Issue */}
          <button
            type="button"
            onClick={onOpenReportIssue}
            className="flex items-center gap-1.5 rounded-lg border border-[#E7E9DC] bg-white px-3.5 py-2 text-xs font-semibold text-[#151710] shadow-2xs transition hover:border-[#590907] hover:text-[#590907] focus:outline-none focus:ring-2 focus:ring-[#590907]"
          >
            <AlertTriangle size={14} className="text-[#590907]" />
            <span>Report Issue</span>
          </button>

          {/* Primary Action: Register Asset */}
          <button
            type="button"
            onClick={onOpenRegisterAsset}
            className="flex items-center gap-1.5 rounded-lg bg-[#D4FF24] px-4 py-2 text-xs font-bold text-[#030407] shadow-sm transition hover:bg-[#c3ec1e] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#030407]"
          >
            <Plus size={15} className="stroke-[2.5]" />
            <span>Register Asset</span>
          </button>
        </div>
      </div>
    </section>
  );
}
