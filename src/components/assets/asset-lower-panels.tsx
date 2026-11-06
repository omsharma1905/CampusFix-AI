"use client";

import React from "react";
import {
  ArrowRight,
  QrCode,
  Building2,
  Printer,
} from "lucide-react";
import {
  PREDICTIVE_RISK_ITEMS,
  SPATIAL_DISTRIBUTION_ITEMS,
  TAGGING_HUB_DATA,
} from "./mock-data";

interface LowerPanelsProps {
  onOpenDiagnosticsQueue?: () => void;
  onOpenGisLayer?: () => void;
  onConfigureTagSpec?: () => void;
  onPrintQueue?: () => void;
}

export function AssetLowerPanels({
  onOpenDiagnosticsQueue,
  onOpenGisLayer,
  onConfigureTagSpec,
  onPrintQueue,
}: LowerPanelsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Panel 1: Predictive Failure Alert Quad */}
      <div className="flex flex-col justify-between rounded-xl border border-[#E2E4DE] bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#590907] uppercase">
              Predictive Risk Vector
            </span>
            <span className="size-2 rounded-full bg-[#590907] animate-pulse" />
          </div>

          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407]">
            High-Risk Subsystems
          </h2>
          <p className="mt-0.5 text-xs text-[#73766C]">
            Machine-learning failure probability &gt; 80% within 14 days.
          </p>

          <div className="mt-4 space-y-2">
            {PREDICTIVE_RISK_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-[#E2E4DE] bg-[#F7F8EF] p-2.5"
              >
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-[#030407]">
                    {item.assetName}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-semibold ${
                      item.isCritical ? "text-[#590907]" : "text-[#73766C]"
                    }`}
                  >
                    {item.subsystemFault}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    item.isCritical ? "text-[#590907]" : "text-[#030407]"
                  }`}
                >
                  {item.probability}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenDiagnosticsQueue}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E2E4DE] bg-[#F7F8EF] py-2 font-sans text-xs font-semibold text-[#030407] transition hover:bg-[#EEEEE8]"
        >
          <span>Open AI Diagnostics Queue</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Panel 2: Rapid Spatial Distribution */}
      <div className="flex flex-col justify-between rounded-xl border border-[#E2E4DE] bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#73766C] uppercase">
              Spatial Topography
            </span>
            <span className="font-mono text-[10px] font-semibold text-[#1558C9]">
              4 BUILDINGS ACTIVE
            </span>
          </div>

          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407]">
            North Main Campus Density
          </h2>
          <p className="mt-0.5 text-xs text-[#73766C]">
            Asset placement across core collegiate spaces.
          </p>

          <div className="mt-4 space-y-3">
            {SPATIAL_DISTRIBUTION_ITEMS.map((dist) => (
              <div key={dist.buildingName} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#030407]">{dist.buildingName}</span>
                  <span className="font-mono text-[11px] text-[#73766C]">
                    {dist.assetCount}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEEE8]">
                  <div
                    className="h-full rounded-full bg-[#1558C9] transition-all duration-300"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenGisLayer}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E2E4DE] bg-[#F7F8EF] py-2 font-sans text-xs font-semibold text-[#030407] transition hover:bg-[#EEEEE8]"
        >
          <span>View Spatial GIS Layer</span>
          <Building2 size={14} className="text-[#1558C9]" />
        </button>
      </div>

      {/* Panel 3: Quick Batch Deployment & Barcoding */}
      <div className="flex flex-col justify-between rounded-xl border border-[#E2E4DE] bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#536600] uppercase">
              Field Provisioning
            </span>
            <span className="grid size-6 place-items-center rounded bg-[#D4FF24] text-[#030407]">
              <QrCode size={13} />
            </span>
          </div>

          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407]">
            QR Asset Tagging Hub
          </h2>
          <p className="mt-0.5 text-xs text-[#73766C]">
            Generate high-density weatherized label batches for physical placement.
          </p>

          {/* Avery Template Info Card */}
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#E2E4DE] bg-[#F7F8EF] p-3">
            <div className="grid size-12 shrink-0 place-items-center rounded bg-white text-[#030407] shadow-2xs border border-[#E2E4DE]">
              <QrCode size={26} className="text-[#030407]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate font-sans text-xs font-semibold text-[#030407]">
                {TAGGING_HUB_DATA.templateName}
              </span>
              <span className="font-mono text-[11px] text-[#73766C]">
                {TAGGING_HUB_DATA.statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onConfigureTagSpec}
            className="flex-1 rounded-lg border border-[#E2E4DE] bg-[#F7F8EF] py-2 font-sans text-xs font-semibold text-[#030407] transition hover:bg-[#EEEEE8]"
          >
            Configure Spec
          </button>
          <button
            type="button"
            onClick={onPrintQueue}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#1558C9] py-2 font-sans text-xs font-bold text-white shadow-2xs transition hover:bg-[#0f44a0]"
          >
            <Printer size={13} />
            <span>Print Queue ({TAGGING_HUB_DATA.pendingCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
