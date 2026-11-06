"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  Building2,
  MapPin,
  Users,
  UserCheck,
  Shield,
  Receipt,
  QrCode,
  Download,
  Printer,
  Smartphone,
  Eye,
  PlusCircle,
  Package,
  FileText,
  Fingerprint,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AssetQrSvg } from "../details/asset-detail-qr";
import {
  RegisteredAssetConfirmation,
  loadRegisteredAssetConfirmation,
  clearRegisteredAssetConfirmation,
} from "../register/register-types";

export function RegistrationSuccessView() {
  const router = useRouter();

  // App Shell States
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("apex-main");
  const [headerSearch, setHeaderSearch] = useState("");

  // Lifecycle & Data States
  const [isHydrated, setIsHydrated] = useState(false);
  const [confirmation, setConfirmation] = useState<RegisteredAssetConfirmation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const loaded = loadRegisteredAssetConfirmation();
    if (loaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfirmation(loaded);
    }
    setIsHydrated(true);
  }, []);

  // Copy demonstration TX hash
  const handleCopyTx = () => {
    if (!confirmation?.txReference) return;
    navigator.clipboard?.writeText(confirmation.txReference);
    showToast("Demonstration transaction reference copied to clipboard");
  };

  // Export SVG Tag
  const handleExportSvg = () => {
    if (!confirmation) return;
    const { permanentId, step01Data, step03Data, payloadUrl } = confirmation;

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 440" width="340" height="440">
  <rect width="100%" height="100%" fill="#ffffff" rx="16"/>
  <rect x="12" y="12" width="316" height="416" fill="none" stroke="#030407" stroke-width="2" rx="12"/>
  <text x="24" y="44" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#1558C9" letter-spacing="1.5">CAMPUSFIX AI INSTITUTION OS</text>
  <text x="24" y="74" font-family="monospace" font-size="22" font-weight="800" fill="#1A1D15">${permanentId}</text>
  <text x="24" y="96" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#434653">${step01Data.name}</text>
  <rect x="70" y="116" width="200" height="200" fill="#f3f5e7" rx="8" stroke="#E2E4DE"/>
  <text x="170" y="222" font-family="monospace" font-size="12" font-weight="600" fill="#1558C9" text-anchor="middle">QR PAYLOAD: ${payloadUrl}</text>
  <text x="24" y="344" font-family="monospace" font-size="11" fill="#737785">S/N: ${step01Data.serialNumber}</text>
  <text x="24" y="364" font-family="-apple-system, sans-serif" font-size="11" fill="#737785">LOCATION: ${step03Data.campus} · ${step03Data.space?.split(" (")[0]}</text>
  <rect x="24" y="382" width="292" height="26" fill="#C5EA32" rx="6"/>
  <text x="170" y="399" font-family="monospace" font-size="10" font-weight="700" fill="#171e00" text-anchor="middle">REGISTERED INSTITUTIONAL ASSET</text>
</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${permanentId}-Asset-Tag.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Asset tag SVG exported for ${permanentId}`);
  };

  // Print Label Tag
  const handlePrintLabel = () => {
    if (!confirmation) return;
    const { permanentId, step01Data, step03Data } = confirmation;

    const printWindow = window.open("", "_blank", "width=600,height=560");
    if (!printWindow) {
      showToast("Please allow popups to print asset label.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Asset Label - ${permanentId}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 24px; display: flex; justify-content: center; background: #fafafa; }
            .label-card { width: 340px; border: 2px solid #030407; border-radius: 12px; padding: 20px; background: #fff; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
            .inst { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: #1558C9; text-transform: uppercase; margin-bottom: 8px; }
            .qr-box { display: inline-block; padding: 12px; background: #f3f5e7; border: 1px solid #e2e4de; border-radius: 8px; margin: 10px 0; }
            .id { font-size: 24px; font-weight: 800; font-family: monospace; color: #030407; margin-top: 4px; }
            .name { font-size: 14px; font-weight: 600; color: #1A1D15; margin-top: 2px; }
            .meta { font-size: 11px; color: #434653; margin-top: 6px; font-family: monospace; }
            .badge { font-size: 10px; font-weight: bold; background: #C5EA32; color: #171e00; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 12px; font-family: monospace; }
            @media print { body { padding: 0; background: #fff; } .label-card { box-shadow: none; border-width: 1.5px; } }
          </style>
        </head>
        <body>
          <div class="label-card">
            <div class="inst">CAMPUSFIX AI • APEX INSTITUTE</div>
            <div class="id">${permanentId}</div>
            <div class="name">${step01Data.name}</div>
            <div class="qr-box">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <rect width="140" height="140" fill="#fff"/>
                <rect x="10" y="10" width="40" height="40" fill="#030407"/>
                <rect x="90" y="10" width="40" height="40" fill="#030407"/>
                <rect x="10" y="90" width="40" height="40" fill="#030407"/>
                <rect x="18" y="18" width="24" height="24" fill="#fff"/>
                <rect x="98" y="18" width="24" height="24" fill="#fff"/>
                <rect x="18" y="98" width="24" height="24" fill="#fff"/>
                <rect x="24" y="24" width="12" height="12" fill="#030407"/>
                <rect x="104" y="24" width="12" height="12" fill="#030407"/>
                <rect x="24" y="104" width="12" height="12" fill="#030407"/>
                <rect x="60" y="20" width="10" height="20" fill="#030407"/>
                <rect x="60" y="60" width="20" height="20" fill="#030407"/>
                <rect x="90" y="60" width="30" height="10" fill="#030407"/>
                <rect x="30" y="60" width="20" height="10" fill="#030407"/>
                <rect x="60" y="90" width="15" height="30" fill="#030407"/>
                <rect x="90" y="90" width="25" height="15" fill="#030407"/>
              </svg>
            </div>
            <div class="meta">S/N: ${step01Data.serialNumber} · RFID: ${step01Data.rfidTag}</div>
            <div class="meta">${step03Data.campus} · ${step03Data.space?.split(" (")[0]}</div>
            <div class="badge">PROVISIONED ASSET TRANSPONDER</div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
    showToast(`Print window opened for ${permanentId}.`);
  };

  // Dispatch digital transponder (demonstration)
  const handleDispatchTransponder = () => {
    if (!confirmation) return;
    const custodianName = confirmation.step03Data.custodian?.name || "Assigned Custodian";
    showToast(`Demonstration transponder notification queued for ${custodianName}.`);
  };

  // Register Another Asset
  const handleRegisterAnother = () => {
    clearRegisteredAssetConfirmation();
    router.push("/assets/new?reset=true");
  };

  // Download registration summary CSV
  const handleDownloadSummary = () => {
    if (!confirmation) return;
    const { permanentId, convertedFromDraftId, step01Data, step02Data, step03Data, step04Data, step05Data, registeredAt } = confirmation;

    const headers = [
      "Registered Timestamp",
      "Permanent Asset ID",
      "Converted Draft ID",
      "Asset Common Name",
      "Manufacturer / OEM",
      "Model Number",
      "Serial Number",
      "RFID Transponder",
      "Category",
      "Subcategory",
      "Discipline",
      "Criticality",
      "Campus",
      "Building",
      "Floor",
      "Space / Room",
      "Owning Department",
      "Maintenance Squad",
      "Assigned Custodian",
      "Procurement Vendor",
      "Purchase Order",
      "Invoice Reference",
      "Acquisition Date",
      "Acquisition Cost",
      "Currency",
      "Maintenance Strategy",
      "Inspection Cadence",
    ];

    const values = [
      registeredAt,
      permanentId,
      convertedFromDraftId,
      `"${step01Data.name.replace(/"/g, '""')}"`,
      `"${step01Data.manufacturer.replace(/"/g, '""')}"`,
      `"${step01Data.model.replace(/"/g, '""')}"`,
      `"${step01Data.serialNumber.replace(/"/g, '""')}"`,
      `"${step01Data.rfidTag}"`,
      `"${step02Data.category}"`,
      `"${step02Data.subcategory}"`,
      `"${step02Data.discipline}"`,
      `"${step02Data.criticality}"`,
      `"${step03Data.campus}"`,
      `"${step03Data.building?.replace(/"/g, '""')}"`,
      `"${step03Data.floor?.replace(/"/g, '""')}"`,
      `"${step03Data.space?.replace(/"/g, '""')}"`,
      `"${step03Data.owningDepartment?.replace(/"/g, '""')}"`,
      `"${step05Data.responsibleTeam?.replace(/"/g, '""')}"`,
      `"${step03Data.custodian?.name?.replace(/"/g, '""')}"`,
      `"${step04Data.procurementVendor?.replace(/"/g, '""')}"`,
      `"${step04Data.purchaseOrderReference}"`,
      `"${step04Data.invoiceReference}"`,
      `"${step04Data.acquisitionDate}"`,
      step04Data.acquisitionCost ?? "",
      step04Data.currency,
      `"${step05Data.strategy}"`,
      `"${step05Data.recurrenceCadence}"`,
    ];

    const csvContent = `${headers.join(",")}\n${values.join(",")}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${permanentId}-Registration-Summary.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Registration summary CSV downloaded for ${permanentId}`);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F3] text-[#1A1D15]">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#030407] bg-[#030407] px-4 py-3 text-xs font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="flex size-4 items-center justify-center rounded-full bg-[#C5EA32] text-[#030407]">
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
        onOpenHelp={() => showToast("Registration Receipt Guide: Cryptographic verification details.")}
        onOpenSettings={() => showToast("Operations Configuration: Ledger sync nominal.")}
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
        <main className="flex-1 w-full bg-[#F7F6F3]" data-route-id="main-operational-workspace">
          {!isHydrated ? (
            <div className="max-w-7xl mx-auto p-6 sm:p-8 flex items-center justify-center min-h-[500px]">
              <div className="w-8 h-8 rounded-full border-2 border-[#1558C9] border-t-transparent animate-spin" />
            </div>
          ) : !confirmation ? (
            /* Empty / Corrupted Fallback State */
            <div className="max-w-3xl mx-auto p-6 sm:p-12 my-12">
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#E2E4DE] text-center flex flex-col items-center gap-4">
                <span className="p-4 rounded-full bg-[#F3F5E7] text-[#1558C9] mb-2">
                  <AlertCircle size={36} />
                </span>
                <h2 className="font-serif text-2xl text-[#1A1D15]">
                  No Active Registration Record Found
                </h2>
                <p className="text-xs text-[#434653] max-w-md leading-relaxed">
                  No recently completed asset registration was located in this browser session. Completed registrations from the wizard appear here with digital transponder credentials and receipt manifests.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full justify-center">
                  <Link
                    href="/assets/new"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#1558C9] hover:bg-[#0041a0] text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    Start Asset Registration
                  </Link>
                  <Link
                    href="/assets"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#f3f5e7] hover:bg-[#eeefe2] text-[#1A1D15] font-semibold text-xs transition-colors border border-[#E2E4DE]"
                  >
                    Return to Asset Registry
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Status & Transaction Confirmation Header */}
              <section className="w-full px-6 sm:px-8 py-6 bg-[#FFFFFF] border-b border-[#EEF0E5]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#737785]">
                      <Link href="/dashboard" className="hover:text-[#0041a0] transition-colors">
                        Asset Management
                      </Link>
                      <span>/</span>
                      <Link href="/assets" className="hover:text-[#0041a0] transition-colors">
                        Asset Registry
                      </Link>
                      <span>/</span>
                      <span className="text-[#0041a0] font-semibold">Registration Confirmed</span>
                    </nav>

                    <h1 className="font-serif text-3xl md:text-4xl text-[#1A1D15] leading-tight font-normal mt-1">
                      Asset Successfully Registered
                    </h1>
                    <p className="text-xs text-[#434653] max-w-2xl mt-0.5">
                      The asset has been added to your institution&apos;s central inventory and its unique identification transponder has been provisioned.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5EA32] text-[#171e00] font-mono text-xs font-semibold border border-[#536600]/20 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#1558c9] animate-pulse" />
                      <span className="tracking-wider">REGISTRATION COMPLETE</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyTx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#f3f5e7] hover:bg-[#e8e9dc] text-[#1A1D15] transition-colors text-xs font-mono border border-[#E2E4DE]"
                      title="Click to copy demonstration transaction reference"
                    >
                      <Fingerprint size={14} className="text-[#434653]" />
                      <span>
                        TX:{" "}
                        {confirmation.txReference && confirmation.txReference.length > 10
                          ? `${confirmation.txReference.slice(0, 6)}...${confirmation.txReference.slice(-4)}`
                          : confirmation.txReference || "DEMO-TX-001"}
                      </span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Main Telemetry Grid */}
              <section className="w-full px-6 sm:px-8 py-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Asset Profile & Metadata (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Card 1: Newly Registered Asset Record */}
                    <div className="bg-white rounded-xl shadow-xs border border-[#E2E4DE] overflow-hidden flex flex-col">
                      {/* Card Header Bar */}
                      <div className="px-5 py-3 bg-[#f3f5e7] border-b border-[#E2E4DE] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex size-5 items-center justify-center rounded-full bg-[#1558C9]/10 text-[#1558C9]">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1A1D15]">
                            Newly Registered Asset Record
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#434653] bg-[#e8e9dc] px-2 py-0.5 rounded font-medium">
                          STATE: PERSISTED
                        </span>
                      </div>

                      <div className="p-6 flex flex-col gap-6">
                        {/* Asset Title Block with Converted Permanent ID Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E4DE]/60">
                          <div className="flex flex-col">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#737785] font-semibold">
                              Equipment Classification
                            </span>
                            <h2 className="font-serif text-2xl text-[#1A1D15] mt-0.5">
                              {confirmation.step01Data.name}
                            </h2>
                            <span className="text-xs text-[#434653]">
                              {confirmation.step01Data.model ? `${confirmation.step01Data.model} Spatial Rig` : "High-Output Hardware Node"}
                            </span>
                          </div>

                          {/* Permanent ID Pill */}
                          <div className="flex flex-col items-end bg-[#dae2ff]/40 border border-[#1558c9]/20 px-4 py-2.5 rounded-lg text-right">
                            <span className="font-mono text-[10px] text-[#1558C9] uppercase font-bold tracking-widest">
                              Permanent ID
                            </span>
                            <span className="font-mono text-2xl text-[#1558C9] font-bold">
                              {confirmation.permanentId}
                            </span>
                            <span className="font-mono text-[10px] text-[#737785] mt-0.5">
                              Draft {confirmation.convertedFromDraftId} Converted
                            </span>
                          </div>
                        </div>

                        {/* Telemetry Attributes Matrix */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-1">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Institutional Record
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Building2 size={16} className="text-[#434653]" />
                              <span className="font-semibold text-xs text-[#1A1D15]">
                                {confirmation.step03Data.tenantName || "Apex Institute of Technology"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Operational Baseline
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C5EA32]/40 text-[#171e00] font-mono text-xs font-semibold border border-[#536600]/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#536600]" />
                                Healthy / Operational
                              </span>
                              <span className="font-mono text-[11px] text-[#737785]">Health: 98/100</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5 sm:col-span-2">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Primary Location Path
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#1A1D15] bg-[#f3f5e7] p-2.5 rounded-lg border border-[#E2E4DE]/60 flex-wrap">
                              <MapPin size={15} className="text-[#1558C9] shrink-0" />
                              <span className="font-medium">{confirmation.step03Data.campus || "North Main Campus"}</span>
                              <span className="text-[#A5A79B]">›</span>
                              <span>{confirmation.step03Data.building?.split(" (")[0] || "Turing Hall"}</span>
                              <span className="text-[#A5A79B]">›</span>
                              <span>{confirmation.step03Data.floor?.split(" (")[0] || "First Floor"}</span>
                              <span className="text-[#A5A79B]">›</span>
                              <span className="font-semibold text-[#1558C9]">
                                {confirmation.step03Data.space?.split(" (")[0] || "Auditorium 101"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Department &amp; Squad
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Users size={16} className="text-[#434653]" />
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-[#1A1D15]">
                                  {confirmation.step03Data.owningDepartment || "Academic Tech & Research"}
                                </span>
                                <span className="text-[11px] text-[#737785]">
                                  {confirmation.step05Data.responsibleTeam?.split(" (")[0] || "Media Ops Squad 04"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Assigned Custodian
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <UserCheck size={16} className="text-[#434653]" />
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-[#1A1D15]">
                                  {confirmation.step03Data.custodian?.name || "Dr. Elena Rostova"}
                                </span>
                                <span className="text-[11px] text-[#737785]">
                                  {confirmation.step03Data.custodian?.role || "Direct Stewardship Lead"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Criticality Tier
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#822820]/10 text-[#822820] font-mono text-[10px] font-semibold">
                                <Shield size={11} />
                                Tier {confirmation.step02Data.criticality === "High" ? 2 : confirmation.step02Data.criticality === "Critical" ? 1 : 3} • {confirmation.step02Data.criticality} Criticality
                              </span>
                              <span className="text-[11px] text-[#737785]">Bi-Weekly Audits</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                              Serial &amp; Model
                            </span>
                            <span className="font-mono text-xs text-[#1A1D15] mt-0.5">
                              SN: {confirmation.step01Data.serialNumber || "SN-882910-4K-LX"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: System Registration Metadata */}
                    <div className="bg-white rounded-xl shadow-xs border border-[#E2E4DE] p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E2E4DE]/60">
                        <div className="flex items-center gap-2">
                          <Receipt size={17} className="text-[#434653]" />
                          <h3 className="font-mono text-xs uppercase tracking-wider text-[#1A1D15] font-semibold">
                            System Registration Metadata
                          </h3>
                        </div>
                        <span className="font-mono text-[10px] text-[#737785]">
                          LEDGER NODE: #US-EAST-APEX-01
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col p-3 rounded-lg bg-[#f3f5e7] border border-[#E2E4DE]/60">
                          <span className="font-mono text-[10px] text-[#737785] uppercase">
                            Registration Timestamp
                          </span>
                          <span className="font-mono text-xs text-[#1A1D15] font-semibold mt-1">
                            {confirmation.formattedTimestamp}
                          </span>
                          <span className="text-[10px] text-[#737785] mt-0.5">
                            Client Timestamp Synchronized
                          </span>
                        </div>

                        <div className="flex flex-col p-3 rounded-lg bg-[#f3f5e7] border border-[#E2E4DE]/60">
                          <span className="font-mono text-[10px] text-[#737785] uppercase">
                            Registered By
                          </span>
                          <span className="text-xs text-[#1A1D15] font-medium mt-1">
                            Marcus Vance
                          </span>
                          <span className="text-[10px] text-[#737785] mt-0.5">
                            Head of Facilities &amp; Assets
                          </span>
                        </div>

                        <div className="flex flex-col p-3 rounded-lg bg-[#f3f5e7] border border-[#E2E4DE]/60">
                          <span className="font-mono text-[10px] text-[#737785] uppercase">
                            Maintenance Strategy
                          </span>
                          <span className="text-xs text-[#1A1D15] font-medium mt-1">
                            {confirmation.step05Data.strategy}
                          </span>
                          <span className="text-[10px] text-[#737785] mt-0.5">
                            Q4 2024 First Inspection Window
                          </span>
                        </div>

                        <div className="flex flex-col p-3 rounded-lg bg-[#f3f5e7] border border-[#E2E4DE]/60">
                          <span className="font-mono text-[10px] text-[#737785] uppercase">
                            Registration Mode
                          </span>
                          <div className="flex items-center gap-1 text-[#1558C9] mt-1 font-mono text-xs font-semibold">
                            <Sparkles size={12} />
                            <span>Frontend Demonstration</span>
                          </div>
                          <span className="text-[10px] text-[#737785] mt-0.5">
                            Session-stored hardware manifest
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Physical Identification & Next Workflow (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Card 1: Physical Asset Identification (QR & RFID) */}
                    <div className="bg-white rounded-xl shadow-xs border border-[#E2E4DE] overflow-hidden flex flex-col">
                      <div className="px-5 py-3 bg-[#f3f5e7] border-b border-[#E2E4DE] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <QrCode size={17} className="text-[#1558C9]" />
                          <span className="font-mono text-xs uppercase tracking-wider text-[#1A1D15] font-semibold">
                            Physical Asset Identification
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#434653] bg-[#e8e9dc] px-2 py-0.5 rounded font-medium">
                          NFC • RFID GEN2
                        </span>
                      </div>

                      <div className="p-6 flex flex-col items-center text-center gap-4">
                        {/* QR Badge Frame */}
                        <div className="relative p-5 rounded-2xl bg-[#f3f5e7] flex flex-col items-center justify-center border border-[#E2E4DE] shadow-inner w-full">
                          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#E2E4DE] flex items-center justify-center">
                            <AssetQrSvg
                              payload={confirmation.payloadUrl}
                              size={160}
                            />
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#1A1D15] tracking-wider">
                              {confirmation.permanentId}
                            </span>
                            <span className="text-[#A5A79B] text-xs">•</span>
                            <span className="font-mono text-[11px] text-[#737785] uppercase">
                              {confirmation.step01Data.model || "Sony VPL-4K"}
                            </span>
                          </div>
                        </div>

                        {/* Transponder Telemetry */}
                        <div className="w-full bg-[#f3f5e7] p-3 rounded-lg flex flex-col gap-1.5 text-left border border-[#E2E4DE]/60 font-mono text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#737785] uppercase">Dynamic Matrix</span>
                            <span className="text-[11px] text-[#1A1D15] font-semibold">2D ECC200 High Density</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#737785] uppercase">Transponder EPC</span>
                            <span className="text-[11px] text-[#1558C9] font-bold">
                              {confirmation.step01Data.rfidTag || "EPC-992-88102-X"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#737785] uppercase">Payload URL</span>
                            <span className="text-[10px] text-[#737785] truncate max-w-[200px]">
                              {confirmation.payloadUrl}
                            </span>
                          </div>
                        </div>

                        {/* Quick Physical Tag Actions */}
                        <div className="w-full flex flex-col gap-2 pt-1">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={handleExportSvg}
                              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#e8e9dc] hover:bg-[#dadbce] text-[#1A1D15] font-semibold text-xs transition-colors shadow-2xs"
                            >
                              <Download size={14} />
                              <span>Export SVG</span>
                            </button>
                            <button
                              type="button"
                              onClick={handlePrintLabel}
                              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#e8e9dc] hover:bg-[#dadbce] text-[#1A1D15] font-semibold text-xs transition-colors shadow-2xs"
                            >
                              <Printer size={14} />
                              <span>Print Label</span>
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={handleDispatchTransponder}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#f3f5e7] hover:bg-[#eeefe2] text-[#1A1D15] text-xs font-medium transition-colors border border-[#E2E4DE]"
                          >
                            <Smartphone size={14} className="text-[#1558C9]" />
                            <span>Dispatch Digital Transponder to Custodian</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Next Workflow Actions */}
                    <div className="bg-white rounded-xl shadow-xs border border-[#E2E4DE] p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between pb-1 border-b border-[#E2E4DE]/60">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#1A1D15] font-semibold">
                          Next Workflow Actions
                        </h3>
                        <span className="font-mono text-[11px] font-bold text-[#536600] bg-[#C5EA32]/40 px-2 py-0.5 rounded-full">
                          READY
                        </span>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {/* Primary Action: View Asset Details */}
                        <Link
                          href={`/assets/${confirmation.permanentId}`}
                          className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg bg-[#1558C9] text-white font-semibold text-xs hover:bg-[#0041a0] transition-all shadow-sm group"
                        >
                          <div className="flex items-center gap-2">
                            <Eye size={16} />
                            <span className="text-sm">View Asset Details</span>
                          </div>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>

                        {/* Secondary Action: Register Another Asset */}
                        <button
                          type="button"
                          onClick={handleRegisterAnother}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#f3f5e7] hover:bg-[#eeefe2] text-[#1A1D15] font-semibold text-xs transition-colors border border-[#E2E4DE]"
                        >
                          <PlusCircle size={15} />
                          <span>Register Another Asset</span>
                        </button>

                        {/* Tertiary Action: Return to Asset Registry */}
                        <Link
                          href="/assets"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[#434653] hover:text-[#1A1D15] hover:bg-[#f3f5e7] text-xs font-medium transition-colors"
                        >
                          <Package size={15} />
                          <span>Return to Asset Registry</span>
                        </Link>
                      </div>

                      {/* Download Registration Summary Manifest */}
                      <div className="pt-2 border-t border-[#E2E4DE]/60">
                        <button
                          type="button"
                          onClick={handleDownloadSummary}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#f3f5e7] hover:bg-[#eeefe2] transition-colors text-left border border-[#E2E4DE]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex size-7 items-center justify-center rounded bg-[#822820]/10 text-[#822820]">
                              <FileText size={16} />
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-[#1A1D15]">
                                Download Registration Summary
                              </span>
                              <span className="text-[10px] text-[#737785]">
                                Institutional CSV registration manifest
                              </span>
                            </div>
                          </div>
                          <Download size={15} className="text-[#737785]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
