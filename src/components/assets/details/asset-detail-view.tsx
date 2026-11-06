"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AssetDetailRecord, AssetWorkOrderItem, AssetDocumentItem } from "../types";
import { AssetDetailHeader } from "./asset-detail-header";
import { AssetDetailSpecsAndQr } from "./asset-detail-specs-and-qr";
import { AssetDetailHealthSection } from "./asset-detail-health-section";
import { AssetDetailLifecycleSection } from "./asset-detail-lifecycle-section";
import { AssetDetailRecordsSection } from "./asset-detail-records-section";
import { AssetDetailAuditStrip } from "./asset-detail-audit-strip";
import { downloadAssetQrImage } from "./asset-detail-qr";
import {
  CreateWorkOrderModal,
  EditAssetModal,
  UploadDocumentModal,
  FullMaintenanceLedgerModal,
  FullAuditLogModal,
  InspectFrameModal,
} from "./asset-detail-modals";
import { Check, X } from "lucide-react";

export function AssetDetailView({ initialAsset }: { initialAsset: AssetDetailRecord }) {
  const router = useRouter();
  const [asset, setAsset] = useState<AssetDetailRecord>(initialAsset);

  // App Shell States
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("apex-main");
  const [headerSearch, setHeaderSearch] = useState("");

  // Modals Visibility
  const [isWorkOrderModalOpen, setIsWorkOrderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Actions
  const handleDownloadQr = () => {
    downloadAssetQrImage(asset);
    showToast(`Downloading high-resolution QR asset tag for ${asset.id}...`);
  };

  const handleWorkOrderCreated = (wo: AssetWorkOrderItem) => {
    setAsset((prev) => ({
      ...prev,
      workOrdersList: [wo, ...prev.workOrdersList],
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          message: `Work Order ${wo.id} created: "${wo.task}"`,
          actor: "Marcus Vance",
          timestamp: "Just now",
          dotColor: "primary",
        },
        ...prev.auditLog,
      ],
    }));
    showToast(`Work order ${wo.id} created successfully.`);
  };

  const handleDocumentUploaded = (doc: AssetDocumentItem) => {
    setAsset((prev) => ({
      ...prev,
      documentsList: [doc, ...prev.documentsList],
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          message: `Document attached: "${doc.title}"`,
          actor: "Marcus Vance",
          timestamp: "Just now",
          dotColor: "secondary",
        },
        ...prev.auditLog,
      ],
    }));
    showToast(`Document "${doc.title}" uploaded to encrypted vault.`);
  };

  const handleSaveAssetEdit = (updated: Partial<AssetDetailRecord>) => {
    setAsset((prev) => ({
      ...prev,
      ...updated,
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          message: `Asset specifications and status updated`,
          actor: "Marcus Vance",
          timestamp: "Just now",
          dotColor: "primary",
        },
        ...prev.auditLog,
      ],
    }));
    showToast("Asset properties successfully updated in registry.");
  };

  const handleRetireAsset = () => {
    const confirmed = window.confirm(
      `Are you sure you want to retire asset ${asset.id} (${asset.name})? This will mark it as Retired in the central inventory.`
    );
    if (confirmed) {
      handleSaveAssetEdit({ condition: "Retired" });
      showToast(`Asset ${asset.id} marked as retired.`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F3] text-[#1A1D15]">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#030407] bg-[#030407] px-4 py-3 text-xs font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="flex size-4 items-center justify-center rounded-full bg-[#D4FF24] text-[#030407]">
            <Check size={11} strokeWidth={3} />
          </span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Shared Application Shell Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        activeNav="assets"
        unreadNotificationsCount={3}
        onOpenNotifications={() => showToast("Viewing operational notifications...")}
        onOpenHelp={() => showToast("Equipment Profile Guide: Asset diagnostics & maintenance telemetry.")}
        onOpenSettings={() => showToast("Asset Operations Config: Telemetry sampling 22ms.")}
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
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
          selectedInstitutionId={selectedInstitutionId}
          onSelectInstitution={setSelectedInstitutionId}
        />

        {/* Operational Workspace Body */}
        <main className="flex-1 w-full bg-[#F7F6F3]">
          {/* Sub-Header / Breadcrumb & Primary Command Bar */}
          <AssetDetailHeader
            asset={asset}
            onDownloadQr={handleDownloadQr}
            onEditAsset={() => setIsEditModalOpen(true)}
            onCreateWorkOrder={() => setIsWorkOrderModalOpen(true)}
            onOpenAuditLog={() => setIsAuditModalOpen(true)}
            onRetireAsset={handleRetireAsset}
          />

          {/* Main Content Area */}
          <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {/* Section 1: Visual Identity & Telemetry Specs Grid */}
            <AssetDetailSpecsAndQr
              asset={asset}
              onInspectFrame={() => setIsInspectModalOpen(true)}
            />

            {/* Section 2: Asset Health & Deterministic Telemetry */}
            <AssetDetailHealthSection asset={asset} />

            {/* Section 3: Lifecycle Progress & Depreciation */}
            <AssetDetailLifecycleSection asset={asset} />

            {/* Section 4: Split Grid (Operational Records) */}
            <AssetDetailRecordsSection
              asset={asset}
              onOpenFullLedger={() => setIsLedgerModalOpen(true)}
              onOpenUploadDoc={() => setIsUploadDocModalOpen(true)}
              onCreateWorkOrder={() => setIsWorkOrderModalOpen(true)}
            />

            {/* Section 5: Recent Audit Trail (Bottom Compact Strip) */}
            <AssetDetailAuditStrip
              asset={asset}
              onOpenAuditLog={() => setIsAuditModalOpen(true)}
            />
          </div>
        </main>
      </div>

      {/* Supporting Modals */}
      <CreateWorkOrderModal
        isOpen={isWorkOrderModalOpen}
        onClose={() => setIsWorkOrderModalOpen(false)}
        asset={asset}
        onWorkOrderCreated={handleWorkOrderCreated}
      />

      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        asset={asset}
        onSave={handleSaveAssetEdit}
      />

      <UploadDocumentModal
        isOpen={isUploadDocModalOpen}
        onClose={() => setIsUploadDocModalOpen(false)}
        assetId={asset.id}
        onDocumentUploaded={handleDocumentUploaded}
      />

      <FullMaintenanceLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        records={asset.maintenanceHistory}
        assetName={asset.name}
        assetId={asset.id}
      />

      <FullAuditLogModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        assetId={asset.id}
      />

      <InspectFrameModal
        isOpen={isInspectModalOpen}
        onClose={() => setIsInspectModalOpen(false)}
        imageUrl={asset.imageUrl}
        assetTitle={asset.name}
        assetId={asset.id}
      />
    </div>
  );
}
