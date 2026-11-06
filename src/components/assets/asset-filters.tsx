"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Sliders,
  List,
  LayoutGrid,
  Columns,
  Check,
} from "lucide-react";
import {
  CATEGORIES_FILTER_OPTIONS,
  CAMPUS_FILTER_OPTIONS,
  BUILDING_FILTER_OPTIONS,
  CONDITION_FILTER_OPTIONS,
  HEALTH_SCORE_FILTER_OPTIONS,
} from "./mock-data";
import { AssetFilterState } from "./types";

interface AssetFiltersProps {
  filters: AssetFilterState;
  onFilterChange: (newFilters: Partial<AssetFilterState>) => void;
  selectedCount: number;
  onBulkAction: (action: string) => void;
  viewMode: "table" | "grid";
  onViewModeChange: (mode: "table" | "grid") => void;
  visibleColumns: Record<string, boolean>;
  onToggleColumn: (columnId: string) => void;
}

export function AssetFilters({
  filters,
  onFilterChange,
  selectedCount,
  onBulkAction,
  viewMode,
  onViewModeChange,
  visibleColumns,
  onToggleColumn,
}: AssetFiltersProps) {
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);

  const columnLabels: Record<string, string> = {
    assetId: "Asset ID",
    nameSpec: "Asset Name & Spec",
    category: "Category",
    location: "Campus Location",
    department: "Department",
    condition: "Condition",
    healthScore: "Health Score",
    lastService: "Last Service",
    actions: "Actions",
  };

  return (
    <div className="flex flex-col gap-3 rounded-t-xl border border-b-0 border-[#E2E4DE] bg-[#F7F8EF] p-4">
      {/* Top Row: Search Input & Quick Filter Dropdowns */}
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* Search Input */}
        <div className="relative min-w-[280px] flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#73766C]"
          />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Filter by asset name, ID, or serial number..."
            className="w-full rounded-lg border border-[#E2E4DE] bg-white py-2 pr-4 pl-9 font-sans text-xs text-[#030407] placeholder-[#73766C] shadow-2xs transition focus:border-[#1558C9] focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 font-mono text-[10px] text-[#73766C] hover:text-[#030407]"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="appearance-none rounded-lg border border-[#E2E4DE] bg-white py-2 pr-7 pl-3 font-sans text-xs font-semibold text-[#030407] shadow-2xs cursor-pointer focus:border-[#1558C9] focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            >
              {CATEGORIES_FILTER_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#73766C]"
            />
          </div>

          {/* Campus Filter */}
          <div className="relative">
            <select
              value={filters.campus}
              onChange={(e) => onFilterChange({ campus: e.target.value })}
              className="appearance-none rounded-lg border border-[#E2E4DE] bg-white py-2 pr-7 pl-3 font-sans text-xs font-semibold text-[#030407] shadow-2xs cursor-pointer focus:border-[#1558C9] focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            >
              {CAMPUS_FILTER_OPTIONS.map((cmp) => (
                <option key={cmp} value={cmp}>
                  {cmp}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#73766C]"
            />
          </div>

          {/* Building Filter */}
          <div className="relative">
            <select
              value={filters.building}
              onChange={(e) => onFilterChange({ building: e.target.value })}
              className="appearance-none rounded-lg border border-[#E2E4DE] bg-white py-2 pr-7 pl-3 font-sans text-xs font-semibold text-[#030407] shadow-2xs cursor-pointer focus:border-[#1558C9] focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            >
              {BUILDING_FILTER_OPTIONS.map((bld) => (
                <option key={bld} value={bld}>
                  {bld}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#73766C]"
            />
          </div>

          {/* Condition Filter */}
          <div className="relative">
            <select
              value={filters.condition}
              onChange={(e) => onFilterChange({ condition: e.target.value })}
              className="appearance-none rounded-lg border border-[#E2E4DE] bg-white py-2 pr-7 pl-3 font-sans text-xs font-semibold text-[#030407] shadow-2xs cursor-pointer focus:border-[#1558C9] focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            >
              {CONDITION_FILTER_OPTIONS.map((cnd) => (
                <option key={cnd} value={cnd}>
                  {cnd}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#73766C]"
            />
          </div>

          {/* Health Score Filter */}
          <div className="relative">
            <select
              value={filters.healthScoreRange}
              onChange={(e) => onFilterChange({ healthScoreRange: e.target.value })}
              className="appearance-none rounded-lg border border-[#E2E4DE] bg-white py-2 pr-7 pl-3 font-sans text-xs font-semibold text-[#030407] shadow-2xs cursor-pointer focus:border-[#1558C9] focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            >
              {HEALTH_SCORE_FILTER_OPTIONS.map((hlth) => (
                <option key={hlth} value={hlth}>
                  {hlth}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#73766C]"
            />
          </div>
        </div>
      </div>

      {/* Secondary Toolbar: Selection Context & View Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Bulk Action Trigger & Selected Items Summary */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={() => setBulkMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-semibold transition ${
                selectedCount > 0
                  ? "bg-[#1558C9] text-white shadow-xs cursor-pointer hover:bg-[#0f44a0]"
                  : "bg-[#E8E9DC] text-[#73766C] cursor-not-allowed"
              }`}
            >
              <Sliders size={14} />
              <span>Bulk Actions</span>
              <ChevronDown size={13} />
            </button>

            {/* Bulk Actions Menu */}
            {bulkMenuOpen && selectedCount > 0 && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setBulkMenuOpen(false)}
                />
                <div className="absolute left-0 z-50 mt-1.5 w-52 rounded-xl border border-[#E2E4DE] bg-white p-1.5 shadow-xl">
                  <div className="px-2.5 py-1 font-mono text-[9px] font-bold text-[#73766C] uppercase">
                    Apply to {selectedCount} Selected
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onBulkAction("MAINTENANCE");
                      setBulkMenuOpen(false);
                    }}
                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs text-[#030407] hover:bg-[#F7F8EF]"
                  >
                    Flag Maintenance Required
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onBulkAction("ASSIGN_TECH");
                      setBulkMenuOpen(false);
                    }}
                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs text-[#030407] hover:bg-[#F7F8EF]"
                  >
                    Assign Field Technician
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onBulkAction("GENERATE_QR");
                      setBulkMenuOpen(false);
                    }}
                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs text-[#030407] hover:bg-[#F7F8EF]"
                  >
                    Add to QR Batch Queue
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onBulkAction("EXPORT_SELECTED");
                      setBulkMenuOpen(false);
                    }}
                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs text-[#1558C9] font-medium hover:bg-[#1558C9]/10"
                  >
                    Export Selected CSV
                  </button>
                </div>
              </>
            )}
          </div>

          <span className={`text-xs ${selectedCount > 0 ? "font-semibold text-[#030407]" : "text-[#73766C]"}`}>
            {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
          </span>
        </div>

        {/* View Modes & Column Controls */}
        <div className="flex items-center gap-2">
          {/* List / Grid Toggle */}
          <div className="flex items-center rounded-lg border border-[#E2E4DE] bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              title="Table View"
              className={`rounded p-1 transition ${
                viewMode === "table"
                  ? "bg-[#F7F8EF] text-[#030407] shadow-2xs"
                  : "text-[#73766C] hover:text-[#030407]"
              }`}
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              title="Grid View"
              className={`rounded p-1 transition ${
                viewMode === "grid"
                  ? "bg-[#F7F8EF] text-[#030407] shadow-2xs"
                  : "text-[#73766C] hover:text-[#030407]"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Columns Visibility Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setColumnsMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 rounded-lg border border-[#E2E4DE] bg-white px-2.5 py-1.5 font-sans text-xs font-semibold text-[#030407] shadow-2xs transition hover:bg-[#F7F8EF]"
            >
              <Columns size={14} className="text-[#73766C]" />
              <span>Columns</span>
            </button>

            {columnsMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setColumnsMenuOpen(false)}
                />
                <div className="absolute right-0 z-50 mt-1.5 w-52 rounded-xl border border-[#E2E4DE] bg-white p-2 shadow-xl">
                  <div className="px-2 py-1 font-mono text-[9px] font-bold text-[#73766C] uppercase">
                    Toggle Table Columns
                  </div>
                  <div className="mt-1 space-y-1">
                    {Object.entries(columnLabels).map(([colId, label]) => (
                      <button
                        key={colId}
                        type="button"
                        onClick={() => onToggleColumn(colId)}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs text-[#030407] hover:bg-[#F7F8EF]"
                      >
                        <span>{label}</span>
                        {visibleColumns[colId] && <Check size={14} className="text-[#1558C9]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

