"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AssetKpiGrid } from "./asset-kpi-grid";
import { AssetFilters } from "./asset-filters";
import { AssetTable } from "./asset-table";
import { AssetGridView } from "./asset-grid-view";
import { AssetLowerPanels } from "./asset-lower-panels";
import { QrPreviewModal } from "./qr-preview-modal";
import { ImportAssetsModal } from "./import-assets-modal";
import { INITIAL_ASSET_RECORDS, KPI_SUMMARY } from "./mock-data";
import { AssetRecord, AssetFilterState } from "./types";
import { Download, Upload, Plus, Check, X } from "lucide-react";

export function AssetRegistryShell() {
  const router = useRouter();

  // Navigation & Shell states
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("apex-main");
  const [globalHeaderSearch, setGlobalHeaderSearch] = useState("");

  // Filters State
  const [filters, setFilters] = useState<AssetFilterState>({
    searchQuery: "",
    category: "Category (All 14)",
    campus: "Campus: North Main",
    building: "Building: All Blocks",
    condition: "Condition: All",
    healthScoreRange: "Health Score (All)",
  });

  // Table Orchestration States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortBy, setSortBy] = useState<keyof AssetRecord | "none">("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    assetId: true,
    nameSpec: true,
    category: true,
    location: true,
    department: true,
    condition: true,
    healthScore: true,
    lastService: true,
    actions: true,
  });

  // Modals & Panels
  const [qrModalAsset, setQrModalAsset] = useState<AssetRecord | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Filter Handling
  const handleFilterChange = (newFilters: Partial<AssetFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleToggleColumn = (colId: string) => {
    setVisibleColumns((prev) => ({ ...prev, [colId]: !prev[colId] }));
  };

  // Filtered & Sorted Assets
  const filteredAssets = useMemo(() => {
    let result = [...INITIAL_ASSET_RECORDS];

    // Global Header Search & Inline Search combined
    const effectiveSearch = (filters.searchQuery || globalHeaderSearch).toLowerCase().trim();
    if (effectiveSearch) {
      result = result.filter(
        (a) =>
          a.id.toLowerCase().includes(effectiveSearch) ||
          a.name.toLowerCase().includes(effectiveSearch) ||
          a.specification.toLowerCase().includes(effectiveSearch) ||
          (a.serialNumber && a.serialNumber.toLowerCase().includes(effectiveSearch)) ||
          a.building.toLowerCase().includes(effectiveSearch) ||
          a.department.toLowerCase().includes(effectiveSearch)
      );
    }

    // Category Filter
    if (filters.category !== "Category (All 14)") {
      result = result.filter((a) => a.category === filters.category);
    }

    // Campus Filter
    if (filters.campus !== "Campus: North Main") {
      const targetCampus = filters.campus.replace("Campus: ", "");
      result = result.filter((a) => a.campus.includes(targetCampus));
    }

    // Building Filter
    if (filters.building !== "Building: All Blocks") {
      result = result.filter((a) => a.building === filters.building);
    }

    // Condition Filter
    if (filters.condition !== "Condition: All") {
      if (filters.condition === "Critical Only") {
        result = result.filter((a) => a.condition === "Critical");
      } else {
        result = result.filter((a) => a.condition === filters.condition);
      }
    }

    // Health Score Filter
    if (filters.healthScoreRange !== "Health Score (All)") {
      if (filters.healthScoreRange === "Healthy (80–100%)") {
        result = result.filter((a) => a.healthScore !== null && a.healthScore >= 80);
      } else if (filters.healthScoreRange === "Moderate (50–79%)") {
        result = result.filter(
          (a) => a.healthScore !== null && a.healthScore >= 50 && a.healthScore < 80
        );
      } else if (filters.healthScoreRange === "Degraded (< 50%)") {
        result = result.filter((a) => a.healthScore !== null && a.healthScore < 50);
      }
    }

    // Sorting
    if (sortBy !== "none") {
      result.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (sortOrder === "asc") {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
    }

    return result;
  }, [filters, globalHeaderSearch, sortBy, sortOrder]);

  const handleSortChange = (column: keyof AssetRecord) => {
    if (sortBy === column) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortBy("none");
        setSortOrder("asc");
      }
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Selection Handlers
  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredAssets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAssets.map((a) => a.id));
    }
  };

  // Bulk Actions
  const handleBulkAction = (action: string) => {
    if (action === "EXPORT_SELECTED") {
      handleExportCsv(selectedIds);
    } else if (action === "MAINTENANCE") {
      showToast(`${selectedIds.length} assets flagged for scheduled maintenance triage.`);
      setSelectedIds([]);
    } else if (action === "ASSIGN_TECH") {
      showToast(`Field technician dispatch assigned for ${selectedIds.length} assets.`);
      setSelectedIds([]);
    } else if (action === "GENERATE_QR") {
      showToast(`${selectedIds.length} asset QR tags added to printing queue.`);
      setSelectedIds([]);
    }
  };

  // Real CSV Export
  const handleExportCsv = (onlyIds?: string[]) => {
    const recordsToExport = onlyIds
      ? filteredAssets.filter((a) => onlyIds.includes(a.id))
      : filteredAssets;

    const headers = [
      "Asset ID",
      "Asset Name",
      "Specification",
      "Category",
      "Campus",
      "Building",
      "Space",
      "Department",
      "Condition",
      "Health Score",
      "Last Service",
      "Serial Number",
    ];

    const rows = recordsToExport.map((a) => [
      `"${a.id}"`,
      `"${a.name}"`,
      `"${a.specification}"`,
      `"${a.category}"`,
      `"${a.campus}"`,
      `"${a.building}"`,
      `"${a.space}"`,
      `"${a.department}"`,
      `"${a.condition}"`,
      `"${a.healthScore !== null ? a.healthScore : ""}"`,
      `"${a.lastService}"`,
      `"${a.serialNumber || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `campusfix_assets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${recordsToExport.length} assets to CSV file.`);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#151710] font-sans">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-lg border border-[#030407] bg-[#030407] px-4 py-3 text-xs font-medium text-white shadow-xl animate-fade-in">
          <span className="grid size-5 place-items-center rounded-full bg-[#D4FF24] text-[#030407]">
            <Check size={12} className="stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/50 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Global Navigation Rail (activeNav="assets") */}
      <DashboardSidebar
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        activeNav="assets"
        unreadNotificationsCount={3}
        onOpenNotifications={() => showToast("Viewing operational notifications...")}
        onOpenHelp={() => showToast("Asset Registry Documentation: ISO-55000 compliance guidelines active.")}
        onOpenSettings={() => showToast("Asset Management Config: Inventory sync nominal.")}
        onOpenProfile={() => showToast("Facilities Operations Admin: Logged in via apex.edu directory.")}
      />

      {/* Main Workspace Frame (vertical capsule rail offset) */}
      <div className="flex min-h-screen flex-col md:pl-20">
        {/* Top Application Toolbar */}
        <DashboardHeader
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenReportIssue={() => showToast("Navigating to Issue Reporting...")}
          onOpenRegisterAsset={() => router.push("/assets/new")}
          onOpenNotifications={() => showToast("Viewing notifications...")}
          searchQuery={globalHeaderSearch}
          onSearchChange={setGlobalHeaderSearch}
          selectedInstitutionId={selectedInstitutionId}
          onSelectInstitution={setSelectedInstitutionId}
        />

        {/* Operational Workspace Body */}
        <main className="flex-1 w-full bg-[#F7F6F3]">
          <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            {/* Header & Orchestration Toolbar */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-[#73766C] uppercase">
                    Institutional Inventory System
                  </span>
                  <span className="size-1 rounded-full bg-[#73766C]" />
                  <span className="font-mono text-[11px] font-semibold text-[#1558C9]">
                    v4.2.0 • LIVE SYNC
                  </span>
                </div>

                <h1 className="font-serif text-3xl font-normal tracking-tight text-[#030407] sm:text-4xl">
                  Asset Registry
                </h1>

                <p className="max-w-2xl text-xs leading-relaxed text-[#73766C] sm:text-sm">
                  Manage, monitor and maintain every registered physical asset across institutional campuses with real-time telemetry.
                </p>
              </div>

              {/* Action Triggers */}
              <div className="flex shrink-0 items-center gap-2.5">
                {/* Export Action */}
                <button
                  type="button"
                  onClick={() => handleExportCsv()}
                  className="group flex items-center gap-2 rounded-lg border border-[#E2E4DE] bg-white px-3 py-2 text-xs font-semibold text-[#030407] shadow-2xs transition hover:bg-[#F7F8EF]"
                >
                  <Download size={15} className="text-[#73766C] group-hover:text-[#030407]" />
                  <span>Export</span>
                </button>

                {/* Import Assets Action */}
                <button
                  type="button"
                  onClick={() => setImportModalOpen(true)}
                  className="group flex items-center gap-2 rounded-lg border border-[#E2E4DE] bg-white px-3.5 py-2 text-xs font-semibold text-[#030407] shadow-2xs transition hover:bg-[#F7F8EF]"
                >
                  <Upload size={15} className="text-[#73766C] group-hover:text-[#030407]" />
                  <span>Import Assets</span>
                </button>

                {/* Primary Action: Register Asset (routes to /assets/new) */}
                <button
                  type="button"
                  onClick={() => router.push("/assets/new")}
                  className="flex items-center gap-2 rounded-lg bg-[#1558C9] px-4 py-2 font-sans text-xs font-bold text-white shadow-sm transition hover:bg-[#0f44a0]"
                >
                  <Plus size={16} className="text-[#D4FF24] stroke-[2.5]" />
                  <span>Register Asset</span>
                </button>
              </div>
            </div>

            {/* Telemetry KPI Summary Cards (4 Cards) */}
            <AssetKpiGrid summary={KPI_SUMMARY} />

            {/* Inventory Container: Filter Toolbar + Table / Grid */}
            <div className="overflow-hidden rounded-xl border border-[#E2E4DE] bg-white shadow-md">
              {/* Filter and Controller Toolbar */}
              <AssetFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                selectedCount={selectedIds.length}
                onBulkAction={handleBulkAction}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                visibleColumns={visibleColumns}
                onToggleColumn={handleToggleColumn}
              />

              {/* Main Operational Table or Grid View */}
              {viewMode === "table" ? (
                <AssetTable
                  assets={filteredAssets}
                  selectedIds={selectedIds}
                  onToggleSelectRow={handleToggleSelectRow}
                  onToggleSelectAll={handleToggleSelectAll}
                  visibleColumns={visibleColumns}
                  onOpenQrPreview={(asset) => setQrModalAsset(asset)}
                  onViewAsset={(asset) => router.push(`/assets/${asset.id}`)}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                  totalAssetsCount={4821}
                />
              ) : (
                <AssetGridView
                  assets={filteredAssets}
                  selectedIds={selectedIds}
                  onToggleSelectRow={handleToggleSelectRow}
                  onOpenQrPreview={(asset) => setQrModalAsset(asset)}
                  onViewAsset={(asset) => router.push(`/assets/${asset.id}`)}
                />
              )}
            </div>

            {/* Campus Asset Fleet Telemetry Lower Mini-Panels (3 Panels) */}
            <AssetLowerPanels
              onOpenDiagnosticsQueue={() =>
                showToast("Opening Predictive Risk AI diagnostics queue...")
              }
              onOpenGisLayer={() =>
                showToast("Loading Spatial GIS campus placement map layer...")
              }
              onConfigureTagSpec={() =>
                showToast("Opening Avery label template specifications...")
              }
              onPrintQueue={() =>
                showToast("Dispatching print queue batch: 48 Avery 2x1 labels...")
              }
            />
          </div>
        </main>
      </div>

      {/* QR Preview Modal */}
      <QrPreviewModal
        asset={qrModalAsset}
        onClose={() => setQrModalAsset(null)}
        onPrint={() => {
          showToast(`Print command queued for ${qrModalAsset?.id}`);
          setQrModalAsset(null);
        }}
      />

      {/* Import Assets Modal */}
      <ImportAssetsModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onSuccessPreview={(filename, count) => {
          showToast(`Ingestion preview verified for ${filename} (${count} records).`);
        }}
      />
    </div>
  );
}
