"use client";

import React from "react";
import { QrCode } from "lucide-react";
import { AssetRecord } from "./types";

interface AssetGridViewProps {
  assets: AssetRecord[];
  selectedIds: string[];
  onToggleSelectRow: (id: string) => void;
  onOpenQrPreview: (asset: AssetRecord) => void;
  onViewAsset: (asset: AssetRecord) => void;
}

export function AssetGridView({
  assets,
  selectedIds,
  onToggleSelectRow,
  onOpenQrPreview,
  onViewAsset,
}: AssetGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4 bg-white border border-[#E2E4DE] rounded-b-xl">
      {assets.map((asset) => {
        const isSelected = selectedIds.includes(asset.id);
        const isCritical = asset.condition === "Critical";

        return (
          <div
            key={asset.id}
            className={`group flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
              isCritical
                ? "border-[#590907]/40 bg-[#590907]/[0.03] hover:border-[#590907]"
                : isSelected
                ? "border-[#1558C9] bg-[#1558C9]/[0.04]"
                : "border-[#E2E4DE] bg-white hover:border-[#1558C9]/40 hover:shadow-xs"
            }`}
          >
            {/* Top row: Checkbox, ID, Category & QR */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectRow(asset.id)}
                    className="size-3.5 rounded bg-white accent-[#1558C9] cursor-pointer"
                  />
                  <span
                    className={`font-mono text-xs font-bold ${
                      isCritical ? "text-[#590907]" : "text-[#1558C9]"
                    }`}
                  >
                    {asset.id}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-[#F7F8EF] px-2 py-0.5 font-mono text-[9px] text-[#73766C] border border-[#E2E4DE]">
                    {asset.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenQrPreview(asset)}
                    className="rounded p-1 text-[#73766C] hover:bg-[#F7F8EF] hover:text-[#1558C9]"
                    title="Quick QR"
                  >
                    <QrCode size={14} />
                  </button>
                </div>
              </div>

              {/* Asset Name & Specification */}
              <div className="mt-3">
                <h3 className="font-sans text-sm font-semibold text-[#030407] group-hover:text-[#1558C9]">
                  {asset.name}
                </h3>
                <p className="mt-0.5 font-sans text-xs text-[#73766C]">
                  {asset.specification}
                </p>
              </div>

              {/* Location & Department */}
              <div className="mt-3 rounded-lg border border-[#E2E4DE] bg-[#F7F8EF]/60 p-2 text-xs">
                <div className="font-medium text-[#030407]">{asset.campus} • {asset.building}</div>
                <div className="text-[11px] text-[#73766C]">{asset.space}</div>
                <div className="mt-1 font-mono text-[10px] text-[#73766C] uppercase">
                  Dept: {asset.department}
                </div>
              </div>
            </div>

            {/* Bottom Row: Condition, Health Gauge & Action */}
            <div className="mt-4 border-t border-[#E2E4DE] pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-[#73766C]">Health Score:</span>
                <span className="font-mono text-xs font-bold text-[#030407]">
                  {asset.healthScore !== null ? `${asset.healthScore}%` : "—"}
                </span>
              </div>

              {asset.healthScore !== null && (
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EEEEE8]">
                  <div
                    className={`h-full rounded-full ${
                      asset.healthScore < 40
                        ? "bg-[#590907]"
                        : asset.healthScore < 70
                        ? "bg-[#A5A79B]"
                        : "bg-[#1558C9]"
                    }`}
                    style={{ width: `${asset.healthScore}%` }}
                  />
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#73766C]">
                  Service: {asset.lastService}
                </span>

                <button
                  type="button"
                  onClick={() => onViewAsset(asset)}
                  className={`rounded px-3 py-1 font-sans text-xs font-semibold ${
                    isCritical
                      ? "bg-[#590907] text-white"
                      : "bg-[#1558C9] text-white hover:bg-[#0f44a0]"
                  }`}
                >
                  {isCritical ? "Triage →" : "View →"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
