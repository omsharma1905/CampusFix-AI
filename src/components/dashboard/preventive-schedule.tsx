"use client";

import React from "react";
import {
  CalendarDays,
  Download,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PREVENTIVE_SCHEDULE_DATA } from "./mock-data";
import { PreventiveMaintenanceItem } from "./types";

interface PreventiveScheduleProps {
  items?: PreventiveMaintenanceItem[];
  onOpenCalendar?: () => void;
  onDownloadSchedule?: () => void;
}

export function PreventiveSchedule({
  items = PREVENTIVE_SCHEDULE_DATA,
  onOpenCalendar,
  onDownloadSchedule,
}: PreventiveScheduleProps) {
  return (
    <article className="w-full max-w-full min-w-0 rounded-xl border border-[#E7E9DC] bg-white p-5 shadow-xs sm:p-6">
      {/* Header with Title and Calendar Actions */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1558C9] uppercase">
            REGULATORY & STATUTORY CARE
          </span>
          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407] sm:text-2xl">
            Preventive Schedule & Milestones
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownloadSchedule}
            className="flex items-center gap-1.5 rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] px-3 py-1.5 text-xs font-semibold text-[#151710] transition hover:bg-white hover:border-[#1558C9]"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export ICS / PDF</span>
            <span className="sm:hidden">Export</span>
          </button>

          <button
            type="button"
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 rounded-lg bg-[#1558C9] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0f44a0]"
          >
            <CalendarDays size={13} />
            <span>Open PM Calendar</span>
          </button>
        </div>
      </div>

      {/* Scheduled Maintenance List */}
      <div className="mt-5 divide-y divide-[#E7E9DC]">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between gap-3 py-3.5 transition-colors sm:flex-row sm:items-center hover:bg-[#F7F8EF]/60 rounded-lg px-2"
          >
            {/* Left: Date/Time Badge & Details */}
            <div className="flex items-start gap-3">
              {/* Date / Time Block */}
              <div className="flex w-24 shrink-0 flex-col items-center justify-center rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] py-1.5 text-center">
                <span className="font-mono text-[10px] font-bold text-[#1558C9]">
                  {item.scheduledDate}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#030407]">
                  {item.scheduledTime}
                </span>
              </div>

              {/* Maintenance Title & Location Details */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-sans text-xs font-bold text-[#030407] group-hover:text-[#1558C9] sm:text-sm">
                    {item.title}
                  </h3>
                  {item.urgency === "STATUTORY" && (
                    <span className="rounded-xs bg-[#590907] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                      STATUTORY
                    </span>
                  )}
                  {item.urgency === "HIGH_PRIORITY" && (
                    <span className="rounded-xs bg-[#1558C9] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                      PRIORITY
                    </span>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#73766C]">
                  <span>{item.building} · {item.locationRoom}</span>
                  <span>•</span>
                  <span>{item.subsystem}</span>
                </div>
              </div>
            </div>

            {/* Right: Team/Vendor Tag & Compliance Spec */}
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#030407]">
                  {item.contractorOrTeam}
                </span>
                <span className={`rounded-xs px-1.5 py-0.5 font-mono text-[9px] uppercase ${
                  item.isExternalVendor
                    ? "bg-[#E8D2B5] text-[#030407] font-semibold"
                    : "bg-[#F7F8EF] text-[#73766C] border border-[#E7E9DC]"
                }`}>
                  {item.isExternalVendor ? "Vendor Partner" : "Internal Crew"}
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-[10px] text-[#1558C9]">
                <ShieldCheck size={12} className="text-[#1558C9]" />
                <span>{item.complianceSpec}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer notice */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-t border-[#E7E9DC] pt-3 text-[11px] text-[#73766C]">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-[#1558C9]" />
          <span>Statutory compliance checks: 100% on schedule</span>
        </div>
        <span className="font-mono text-[10px] text-[#73766C]">Audited quarterly by Dept of Facilities</span>
      </div>
    </article>
  );
}
