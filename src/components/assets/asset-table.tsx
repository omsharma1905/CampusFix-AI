"use client";

import React from "react";
import {
  QrCode,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { AssetRecord } from "./types";

interface AssetTableProps {
  assets: AssetRecord[];
  selectedIds: string[];
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  visibleColumns: Record<string, boolean>;
  onOpenQrPreview: (asset: AssetRecord) => void;
  onViewAsset: (asset: AssetRecord) => void;
  sortBy: keyof AssetRecord | "none";
  sortOrder: "asc" | "desc";
  onSortChange: (column: keyof AssetRecord) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalAssetsCount: number;
}

export function AssetTable({
  assets,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  visibleColumns,
  onOpenQrPreview,
  onViewAsset,
  sortBy,
  sortOrder,
  onSortChange,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalAssetsCount,
}: AssetTableProps) {
  const allSelected = assets.length > 0 && selectedIds.length === assets.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < assets.length;

  const renderSortIcon = (col: keyof AssetRecord) => {
    if (sortBy === col) {
      return sortOrder === "asc" ? (
        <ArrowUp size={11} className="text-[#1558C9]" />
      ) : (
        <ArrowDown size={11} className="text-[#1558C9]" />
      );
    }
    return <ArrowUpDown size={11} />;
  };

  const renderConditionBadge = (asset: AssetRecord) => {
    switch (asset.condition) {
      case "Healthy":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4FF24]/20 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#030407] border border-[#D4FF24]">
            <span className="size-1.5 rounded-full bg-[#536600]" />
            Healthy
          </span>
        );
      case "Operational":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1558C9]/10 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#1558C9] border border-[#1558C9]/30">
            <span className="size-1.5 rounded-full bg-[#1558C9]" />
            Operational
          </span>
        );
      case "Maintenance Required":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8D2B5] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#030407] border border-[#A5A79B]/50">
            <span className="size-1.5 rounded-full bg-[#73766C]" />
            Maintenance Required
          </span>
        );
      case "Critical":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#590907] px-2.5 py-0.5 font-sans text-[11px] font-bold text-white shadow-2xs">
            <AlertTriangle size={12} className="text-[#D4FF24] animate-pulse" />
            {asset.conditionDetail || "Critical"}
          </span>
        );
      case "Retired":
        return (
          <span className="inline-flex items-center rounded-full bg-transparent px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#73766C] border border-[#A5A79B]">
            Retired
          </span>
        );
    }
  };

  const renderHealthGauge = (score: number | null) => {
    if (score === null) {
      return <span className="font-mono text-xs text-[#73766C]">—</span>;
    }

    let trackColor = "bg-[#D4FF24]";
    let textColor = "text-[#030407]";

    if (score < 40) {
      trackColor = "bg-[#590907]";
      textColor = "text-[#590907] font-bold";
    } else if (score < 70) {
      trackColor = "bg-[#A5A79B]";
      textColor = "text-[#030407]";
    } else if (score < 85) {
      trackColor = "bg-[#1558C9]";
      textColor = "text-[#1558C9]";
    }

    return (
      <div className="flex items-center gap-2">
        <span className={`w-8 font-mono text-xs font-semibold ${textColor}`}>{score}%</span>
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#EEEEE8]">
          <div
            className={`h-full rounded-full transition-all duration-300 ${trackColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden border border-[#E2E4DE] bg-white shadow-sm">
      {/* Scrollable Table Area */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left whitespace-nowrap text-xs">
          <thead>
            <tr className="h-9 border-b border-[#E2E4DE] bg-[#F7F8EF] font-mono text-[11px] font-bold uppercase tracking-wider text-[#73766C] select-none">
              <th scope="col" className="w-10 px-3 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={onToggleSelectAll}
                  className="size-3.5 rounded bg-white accent-[#1558C9] cursor-pointer"
                  aria-label="Select all assets"
                />
              </th>

              {visibleColumns.assetId && (
                <th
                  scope="col"
                  onClick={() => onSortChange("id")}
                  className="cursor-pointer px-3 hover:text-[#030407]"
                >
                  <div className="flex items-center gap-1">
                    <span>Asset ID</span>
                    {renderSortIcon("id")}
                  </div>
                </th>
              )}

              {visibleColumns.nameSpec && (
                <th
                  scope="col"
                  onClick={() => onSortChange("name")}
                  className="min-w-[240px] cursor-pointer px-3 hover:text-[#030407]"
                >
                  <div className="flex items-center gap-1">
                    <span>Asset Name & Spec</span>
                    {renderSortIcon("name")}
                  </div>
                </th>
              )}

              {visibleColumns.category && <th scope="col" className="px-3">Category</th>}

              {visibleColumns.location && (
                <th scope="col" className="min-w-[200px] px-3">Campus Location</th>
              )}

              {visibleColumns.department && <th scope="col" className="px-3">Department</th>}

              {visibleColumns.condition && <th scope="col" className="px-3">Condition</th>}

              {visibleColumns.healthScore && (
                <th
                  scope="col"
                  onClick={() => onSortChange("healthScore")}
                  className="min-w-[140px] cursor-pointer px-3 hover:text-[#030407]"
                >
                  <div className="flex items-center gap-1">
                    <span>Health Score</span>
                    {renderSortIcon("healthScore")}
                  </div>
                </th>
              )}

              {visibleColumns.lastService && <th scope="col" className="px-3">Last Service</th>}

              {visibleColumns.actions && (
                <th scope="col" className="px-3 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F0EBE1] font-sans text-xs text-[#030407]">
            {assets.map((asset) => {
              const isSelected = selectedIds.includes(asset.id);
              const isCritical = asset.condition === "Critical";
              const isRetired = asset.isRetired || asset.condition === "Retired";

              let rowClass = "h-12 transition-colors group ";
              if (isCritical) {
                rowClass += "bg-[#590907]/[0.04] hover:bg-[#590907]/[0.08]";
              } else if (isRetired) {
                rowClass += "bg-white hover:bg-[#F7F8EF]/60 opacity-80";
              } else {
                rowClass += "bg-white hover:bg-[#F7F8EF]/70";
              }

              if (isSelected) {
                rowClass += " bg-[#1558C9]/[0.06]";
              }

              return (
                <tr key={asset.id} className={rowClass}>
                  {/* Selection Checkbox */}
                  <td className="px-3 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectRow(asset.id)}
                      className="size-3.5 rounded bg-white accent-[#1558C9] cursor-pointer"
                      aria-label={`Select ${asset.name}`}
                    />
                  </td>

                  {/* Asset ID & QR Action */}
                  {visibleColumns.assetId && (
                    <td className="px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewAsset(asset)}
                          className={`font-mono text-xs font-semibold hover:underline ${
                            isCritical ? "text-[#590907] font-bold" : "text-[#1558C9]"
                          }`}
                        >
                          {asset.id}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenQrPreview(asset)}
                          title="View Quick QR"
                          className="rounded p-1 text-[#73766C] hover:bg-[#F7F8EF] hover:text-[#1558C9]"
                        >
                          <QrCode size={14} />
                        </button>
                      </div>
                    </td>
                  )}

                  {/* Asset Name & Spec */}
                  {visibleColumns.nameSpec && (
                    <td className="px-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-sans text-xs font-semibold leading-none ${
                              isRetired ? "line-through text-[#73766C]" : "text-[#030407]"
                            }`}
                          >
                            {asset.name}
                          </span>
                          {isCritical && (
                            <span className="size-1.5 rounded-full bg-[#590907] animate-ping" />
                          )}
                        </div>
                        <span className="mt-0.5 font-sans text-[11px] text-[#73766C]">
                          {asset.specification}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Category Pill */}
                  {visibleColumns.category && (
                    <td className="px-3">
                      <span className="rounded-full bg-[#F7F8EF] px-2.5 py-0.5 font-mono text-[10px] text-[#73766C] border border-[#E2E4DE]">
                        {asset.category}
                      </span>
                    </td>
                  )}

                  {/* Campus Location */}
                  {visibleColumns.location && (
                    <td className="px-3">
                      <div className="flex flex-col">
                        <span className="font-sans text-xs leading-none text-[#030407]">
                          {asset.campus} • {asset.building}
                        </span>
                        <span className="mt-0.5 font-sans text-[11px] text-[#73766C]">
                          {asset.space}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Department */}
                  {visibleColumns.department && (
                    <td className="px-3">
                      <span className="font-sans text-xs text-[#030407]">
                        {asset.department}
                      </span>
                    </td>
                  )}

                  {/* Condition Badge */}
                  {visibleColumns.condition && (
                    <td className="px-3">{renderConditionBadge(asset)}</td>
                  )}

                  {/* Health Score Micro-Gauge */}
                  {visibleColumns.healthScore && (
                    <td className="px-3">{renderHealthGauge(asset.healthScore)}</td>
                  )}

                  {/* Last Service Date */}
                  {visibleColumns.lastService && (
                    <td className="px-3 font-mono text-[11px]">
                      {asset.isOverdue ? (
                        <span className="font-bold text-[#590907]">
                          {asset.lastService}
                        </span>
                      ) : (
                        <span className="text-[#73766C]">{asset.lastService}</span>
                      )}
                    </td>
                  )}

                  {/* Actions Column */}
                  {visibleColumns.actions && (
                    <td className="px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onViewAsset(asset)}
                          className={`rounded px-2.5 py-1 font-sans text-xs font-semibold transition ${
                            isCritical
                              ? "bg-[#590907] text-white hover:bg-[#430605]"
                              : isRetired
                              ? "text-[#73766C] hover:bg-[#F7F8EF] hover:text-[#030407]"
                              : "text-[#1558C9] hover:bg-[#1558C9]/10"
                          }`}
                        >
                          {isCritical ? "Triage →" : isRetired ? "Audit →" : "View →"}
                        </button>

                        <button
                          type="button"
                          onClick={() => onViewAsset(asset)}
                          className="rounded p-1 text-[#73766C] hover:bg-[#F7F8EF] hover:text-[#030407]"
                          title="More options"
                        >
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footnote & Paging Orchestrator */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E2E4DE] bg-[#F7F8EF] px-4 py-3 text-xs sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="text-[#73766C]">
            Showing <strong className="text-[#030407]">1</strong> to{" "}
            <strong className="text-[#030407]">{assets.length}</strong> of{" "}
            <strong className="text-[#030407]">{totalAssetsCount.toLocaleString()}</strong> registered assets
          </span>

          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] font-bold text-[#73766C] uppercase">Display:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded border border-[#E2E4DE] bg-white px-2 py-1 font-sans text-xs font-semibold text-[#030407] shadow-2xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            >
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
              <option value={100}>100 rows</option>
              <option value={250}>250 rows</option>
            </select>
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 rounded bg-[#F7F8EF] px-2.5 py-1.5 font-sans text-xs font-semibold text-[#73766C] transition hover:bg-white hover:text-[#030407] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            type="button"
            className="grid size-8 place-items-center rounded bg-[#1558C9] font-sans text-xs font-bold text-white shadow-2xs"
          >
            1
          </button>
          <button
            type="button"
            className="grid size-8 place-items-center rounded font-sans text-xs font-semibold text-[#030407] transition hover:bg-white"
          >
            2
          </button>
          <button
            type="button"
            className="grid size-8 place-items-center rounded font-sans text-xs font-semibold text-[#030407] transition hover:bg-white"
          >
            3
          </button>
          <span className="px-1 font-mono text-[#73766C]">...</span>
          <button
            type="button"
            className="grid size-8 place-items-center rounded font-sans text-xs font-semibold text-[#030407] transition hover:bg-white"
          >
            482
          </button>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 rounded border border-[#E2E4DE] bg-white px-2.5 py-1.5 font-sans text-xs font-semibold text-[#030407] shadow-2xs transition hover:bg-[#F7F8EF]"
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
