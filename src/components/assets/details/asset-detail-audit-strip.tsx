"use client";

import React from "react";
import { Shield, ArrowRight } from "lucide-react";
import { AssetDetailRecord } from "../types";

export function AssetDetailAuditStrip({
  asset,
  onOpenAuditLog,
}: {
  asset: AssetDetailRecord;
  onOpenAuditLog: () => void;
}) {
  const event1 = asset.auditLog[0] || {
    message: "Routine telemetry ping recorded: 38.2°C nominal exhaust",
    actor: "Automation",
    timestamp: "14m ago",
    dotColor: "secondary",
  };
  const event2 = asset.auditLog[1] || {
    message: "Health score updated to 94/100 following Q3 PM",
    actor: "M. Vance",
    timestamp: "12 Sep",
    dotColor: "primary",
  };

  return (
    <section className="bg-[#FFFFFF] rounded-xl shadow-sm p-4 border border-[#A5A79B]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <Shield size={16} className="text-[#737785]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737785]">
            Tamper-Evident Audit Trail
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-[13px] text-[#1A1D15] min-w-0">
          <div className="flex items-center gap-1.5 truncate">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                event1.dotColor === "secondary" ? "bg-[#536600]" : "bg-[#1558C9]"
              }`}
            />
            <span className="truncate">{event1.message}</span>
            <span className="font-mono text-xs text-[#737785] shrink-0">
              ({event1.actor} • {event1.timestamp})
            </span>
          </div>

          <span className="hidden lg:inline text-[#C3C6D6] font-mono">/</span>

          <div className="flex items-center gap-1.5 truncate">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                event2.dotColor === "secondary" ? "bg-[#536600]" : "bg-[#1558C9]"
              }`}
            />
            <span className="truncate">{event2.message}</span>
            <span className="font-mono text-xs text-[#737785] shrink-0">
              ({event2.actor} • {event2.timestamp})
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#EEEFE2]">
        <button
          type="button"
          onClick={onOpenAuditLog}
          className="text-[12px] font-semibold text-[#1558C9] hover:underline inline-flex items-center gap-1"
        >
          <span>View Full Tamper-Evident Audit Log (48 events)</span>
          <ArrowRight size={14} className="text-[#1558C9]" />
        </button>
      </div>
    </section>
  );
}
