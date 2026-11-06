"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  ArrowLeft,
  ArrowRight,
  Shield,
  FileCheck,
  Check,
  X,
  Fingerprint,
  Key,
} from "lucide-react";
import {
  Step01BasicInfoData,
  Step02ClassificationData,
  Step03LocationData,
  Step04LifecycleData,
  Step05MaintenanceData,
  DEFAULT_INSPECTION_TASKS,
  RegisteredAssetConfirmation,
  saveRegisteredAssetConfirmation,
  convertDraftIdToPermanent,
  generateDemoTxReference,
} from "./register-types";
import { AssetQrSvg } from "../details/asset-detail-qr";

interface Step06ReviewProps {
  step01Data: Step01BasicInfoData;
  step02Data: Step02ClassificationData;
  step03Data: Step03LocationData;
  step04Data: Step04LifecycleData;
  step05Data: Step05MaintenanceData;
  onEditStep: (stepNumber: number) => void;
  isConfirmed: boolean;
  onToggleConfirm: (confirmed: boolean) => void;
  onPrevious: () => void;
  onRegisterSuccess?: (confirmation?: RegisteredAssetConfirmation) => void;
  showToast: (msg: string) => void;
}

export function Step06Review({
  step01Data,
  step02Data,
  step03Data,
  step04Data,
  step05Data,
  onEditStep,
  isConfirmed,
  onToggleConfirm,
  onPrevious,
  onRegisterSuccess,
  showToast,
}: Step06ReviewProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Combine default and custom tasks to resolve descriptions
  const allTasks = [...DEFAULT_INSPECTION_TASKS, ...step05Data.customTasks];
  const selectedTasks = allTasks.filter((task) =>
    step05Data.selectedTaskIds.includes(task.id)
  );

  // Short label cleaner for protocol tags
  const getCleanTaskLabel = (name: string): string => {
    if (name.toLowerCase().includes("optical")) return "Optical alignment";
    if (name.toLowerCase().includes("cooling") || name.toLowerCase().includes("fan"))
      return "Cooling airflow test";
    if (name.toLowerCase().includes("filter")) return "Electrostatic filter purge";
    if (name.toLowerCase().includes("runtime") || name.toLowerCase().includes("laser"))
      return "Laser diode lum balance";
    if (name.toLowerCase().includes("firmware") || name.toLowerCase().includes("crestron"))
      return "Firmware telemetry sync";
    if (name.toLowerCase().includes("tether") || name.toLowerCase().includes("torque"))
      return "Ceiling tether torque";
    return name.slice(0, 24);
  };

  const visibleProtocolTags = selectedTasks.slice(0, 5);
  const remainingProtocolsCount = Math.max(0, selectedTasks.length - 5);

  // Squad and Lead clean formatting
  const squadClean = step05Data.responsibleTeam.includes("Squad 04")
    ? "Media Ops Squad 04"
    : step05Data.responsibleTeam.split(" (")[0];

  // SVG Tag Download Handler
  const handleDownloadSvgTag = () => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 420" width="320" height="420">
  <rect width="100%" height="100%" fill="#ffffff" rx="16"/>
  <rect x="12" y="12" width="296" height="396" fill="none" stroke="#030407" stroke-width="2" rx="12"/>
  <text x="24" y="44" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#1558C9" letter-spacing="1.5">CAMPUSFIX AI INSTITUTION OS</text>
  <text x="24" y="74" font-family="monospace" font-size="20" font-weight="800" fill="#1A1D15">${step01Data.reservedId}</text>
  <text x="24" y="96" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#434653">${step01Data.name}</text>
  <rect x="60" y="116" width="200" height="200" fill="#f3f5e7" rx="8" stroke="#E8E9DC"/>
  <text x="160" y="210" font-family="monospace" font-size="12" text-anchor="middle" font-weight="700" fill="#1558C9">${step01Data.reservedId}</text>
  <text x="160" y="230" font-family="-apple-system, sans-serif" font-size="10" text-anchor="middle" fill="#737785">Dynamic NFC + 2D Matrix</text>
  <text x="24" y="348" font-family="monospace" font-size="11" fill="#1A1D15">S/N: ${step01Data.serialNumber}</text>
  <text x="24" y="366" font-family="monospace" font-size="11" fill="#586c00">RFID: ${step01Data.rfidTag}</text>
  <text x="24" y="386" font-family="-apple-system, sans-serif" font-size="10" fill="#737785">${step03Data.tenantName} · ${step03Data.campus}</text>
</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CampusFix_Tag_${step01Data.reservedId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded SVG Asset Tag for ${step01Data.reservedId}.`);
  };

  // Tag Print Handler
  const handlePrintTag = () => {
    const printWindow = window.open("", "_blank", "width=520,height=580");
    if (!printWindow) {
      showToast("Pop-up blocked. Please allow pop-ups to print the asset tag.");
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Asset Tag Label - ${step01Data.reservedId}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 24px; text-align: center; background: #fafafa; }
            .card { width: 340px; margin: 0 auto; border: 2px solid #030407; border-radius: 12px; padding: 20px; text-align: left; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
            .header { font-size: 11px; font-family: monospace; font-weight: bold; color: #1558C9; margin-bottom: 6px; letter-spacing: 1px; }
            .id { font-size: 22px; font-weight: 800; font-family: monospace; color: #030407; }
            .name { font-size: 14px; font-weight: 600; margin: 4px 0 16px 0; color: #1A1D15; }
            .qr-box { width: 150px; height: 150px; margin: 0 auto 16px auto; background: #f3f5e7; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; font-size: 12px; text-align: center; border: 1px solid #E8E9DC; }
            .meta { font-size: 11px; color: #434653; font-family: monospace; margin: 4px 0; }
            .badge { display: inline-block; background: #C5EA32; color: #171e00; font-weight: bold; font-size: 10px; padding: 3px 8px; border-radius: 4px; margin-top: 12px; letter-spacing: 0.5px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">CAMPUSFIX AI INSTITUTION OS</div>
            <div class="id">${step01Data.reservedId}</div>
            <div class="name">${step01Data.name}</div>
            <div class="qr-box">
              <strong style="color: #1558C9;">${step01Data.reservedId}</strong>
              <span style="font-size: 9px; color: #737785; margin-top: 4px;">Dynamic NFC Tag</span>
            </div>
            <div class="meta"><strong>S/N:</strong> ${step01Data.serialNumber}</div>
            <div class="meta"><strong>OEM:</strong> ${step01Data.manufacturer} · ${step01Data.model}</div>
            <div class="meta"><strong>RFID:</strong> ${step01Data.rfidTag}</div>
            <div class="meta"><strong>LOCATION:</strong> ${step03Data.campus} · ${step03Data.space.split(" (")[0]}</div>
            <div class="badge">PROVISIONAL ASSET TAG • READY FOR COMMIT</div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
    showToast(`Print window opened for ${step01Data.reservedId}.`);
  };

  // Final Commit Handler
  const handleFinalRegister = () => {
    setValidationError(null);

    // Validation across all steps
    if (!step01Data.name.trim() || !step01Data.serialNumber.trim()) {
      setValidationError("Asset identity in Step 01 is missing required information.");
      showToast("Validation failed: Please complete Step 01.");
      return;
    }

    if (!isConfirmed) {
      setValidationError(
        "Institutional Custody & Accuracy Confirmation must be checked before committing registration."
      );
      showToast("Please acknowledge the custody confirmation checkbox.");
      return;
    }

    setIsSubmitting(true);
    // Persist registered asset confirmation record & transition to confirmation receipt
    setTimeout(() => {
      const permanentId = convertDraftIdToPermanent(step01Data.reservedId);
      const txReference = generateDemoTxReference();
      const now = new Date();
      const formattedTimestamp = `Today, ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })} UTC`;
      const payloadUrl = `https://apex.campusfix.ai/a/${permanentId}`;

      const confirmation: RegisteredAssetConfirmation = {
        version: 1,
        registeredAt: now.toISOString(),
        formattedTimestamp,
        txReference,
        permanentId,
        convertedFromDraftId: step01Data.reservedId,
        step01Data,
        step02Data,
        step03Data,
        step04Data,
        step05Data,
        payloadUrl,
      };

      saveRegisteredAssetConfirmation(confirmation);
      onRegisterSuccess?.(confirmation);
      setIsSubmitting(false);
      router.push("/assets/registration-success");
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">
      {/* Left Main Review Card (8 Cols) */}
      <div className="xl:col-span-8 flex flex-col space-y-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E8E9DC] space-y-8">
          {/* Card Title & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 bg-[#f3f5e7]/40 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-6 sm:p-8 rounded-t-2xl gap-4 border-b border-[#E8E9DC]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-serif text-2xl text-[#1A1D15] font-normal leading-tight">
                  Review &amp; Register
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#dae2ff] text-[#00419f] font-mono text-[11px] font-semibold tracking-wider">
                  FINAL VERIFICATION
                </span>
              </div>
              <p className="text-xs text-[#434653] max-w-2xl mt-0.5">
                Review the complete asset record before adding it to your institutional inventory.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5EA32] animate-pulse" />
              <span className="font-mono text-[11px] text-[#1A1D15] uppercase tracking-wider font-semibold">
                Schema V4.2 Locked
              </span>
            </div>
          </div>

          {/* Section 1: Asset Identity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#1558C9] rounded-full" />
                <h3 className="font-serif text-lg text-[#1A1D15]">1. Asset Identity</h3>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="font-medium text-xs text-[#1558C9] hover:underline flex items-center gap-1 transition-colors"
              >
                <span>Edit</span>
                <Edit size={13} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#f3f5e7] flex flex-col md:flex-row items-center gap-6 border border-[#E8E9DC]">
              <div className="w-full md:w-44 h-32 rounded-lg overflow-hidden bg-[#e8e9dc] shrink-0 shadow-2xs relative">
                <Image
                  src={
                    step01Data.photo?.url ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZyN3p5XOgWwJdTw6WPxBQdFBjvD2LN3m5h5Ik_jdhb-cFTuFPZ6pHyJ8xouw2zxWrRJ7Tfowsn56y9VZp6DOJBeNCfJpx2a5SZufj7mz0OnbPZ1ThB_khZn9DfhoOblCnPAs888UgVaDKxlQF1fqnEgDLXFgFCrORWjdITZiJ2bV0Ki99SDErzDkzp79grR_V3gr7nt33Fnk-UvdUthZbejc90BEx-07CguLT6s"
                  }
                  alt={step01Data.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-white/90 font-mono text-[10px] text-[#1A1D15] font-semibold shadow-2xs">
                  {step01Data.reservedId.split("-")[0] || "AST-2024"}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-left">
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Asset Name
                  </span>
                  <span className="text-xs font-semibold text-[#1A1D15]">
                    {step01Data.name}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Assigned ID
                  </span>
                  <span className="font-mono text-xs text-[#1558C9] font-bold">
                    {step01Data.reservedId}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    OEM / Maker
                  </span>
                  <span className="text-xs text-[#1A1D15]">{step01Data.manufacturer}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Model Number
                  </span>
                  <span className="font-mono text-xs text-[#1A1D15] font-medium">
                    {step01Data.model}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Serial Number
                  </span>
                  <span className="font-mono text-xs text-[#1A1D15]">
                    {step01Data.serialNumber}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    RFID EPC Tag
                  </span>
                  <span className="font-mono text-xs text-[#536600] font-semibold">
                    {step01Data.rfidTag}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Classification */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#1558C9] rounded-full" />
                <h3 className="font-serif text-lg text-[#1A1D15]">2. Classification</h3>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="font-medium text-xs text-[#1558C9] hover:underline flex items-center gap-1 transition-colors"
              >
                <span>Edit</span>
                <Edit size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#f3f5e7] border border-[#E8E9DC]">
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Category
                </span>
                <span className="text-xs text-[#1A1D15] font-medium block">
                  {step02Data.category}
                </span>
                <span className="font-mono text-[10px] text-[#737785] block mt-0.5">
                  {step02Data.subcategory}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Physical Type
                </span>
                <span className="text-xs text-[#1A1D15] font-medium">
                  {step02Data.discipline} / Optical
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Criticality Tier
                </span>
                <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded bg-[#ffdad5] text-[#410001] font-medium text-xs border border-[#ffb4aa]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#822820]" />
                  <span>{step02Data.criticality} Criticality</span>
                </div>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Design Life / Class
                </span>
                <span className="font-mono text-xs text-[#1A1D15] font-medium">
                  {step02Data.expectedUsefulLife} Years ({step02Data.operationalClassification})
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Location & Ownership */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#1558C9] rounded-full" />
                <h3 className="font-serif text-lg text-[#1A1D15]">3. Location &amp; Ownership</h3>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="font-medium text-xs text-[#1558C9] hover:underline flex items-center gap-1 transition-colors"
              >
                <span>Edit</span>
                <Edit size={13} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#f3f5e7] space-y-3 border border-[#E8E9DC]">
              {/* Horizontal Campus Breadcrumb */}
              <div className="flex items-center flex-wrap gap-2 text-[#1A1D15] text-xs">
                <span className="px-2 py-0.5 rounded bg-[#e2e4d6] font-mono text-[10px] font-bold text-[#434653]">
                  CAMPUS HIERARCHY
                </span>
                <span className="font-medium">{step03Data.tenantName.split(" of")[0] || "Apex Institute"}</span>
                <span className="text-[#737785]">→</span>
                <span className="font-medium">{step03Data.campus}</span>
                <span className="text-[#737785]">→</span>
                <span className="font-medium">{step03Data.building.split(" (")[0]}</span>
                <span className="text-[#737785]">→</span>
                <span className="font-medium">{step03Data.floor.split(" (")[0]}</span>
                <span className="text-[#737785]">→</span>
                <span className="px-2 py-0.5 rounded bg-[#C5EA32] text-[#171e00] font-mono text-xs font-bold shadow-2xs border border-[#536600]/20">
                  {step03Data.space.split(" (")[0]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E8E9DC]/60">
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Department Owner
                  </span>
                  <span className="text-xs text-[#1A1D15] font-medium">
                    {step03Data.owningDepartment}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Designated Custodian
                  </span>
                  <span className="text-xs text-[#1A1D15] font-medium">
                    {step03Data.custodian.name}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Primary Response Team
                  </span>
                  <span className="text-xs text-[#1A1D15] font-medium">
                    {squadClean}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Acquisition & Lifecycle */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#1558C9] rounded-full" />
                <h3 className="font-serif text-lg text-[#1A1D15]">
                  4. Acquisition &amp; Lifecycle
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="font-medium text-xs text-[#1558C9] hover:underline flex items-center gap-1 transition-colors"
              >
                <span>Edit</span>
                <Edit size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#f3f5e7] border border-[#E8E9DC]">
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Purchase Order
                </span>
                <span className="font-mono text-xs text-[#1A1D15] font-bold">
                  {step04Data.purchaseOrderReference}
                </span>
                <span className="font-mono text-[10px] text-[#737785] block mt-0.5">
                  ${step04Data.acquisitionCost?.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Authorized Vendor
                </span>
                <span className="text-xs text-[#1A1D15] font-medium">
                  {step04Data.procurementVendor}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Acquisition / Install
                </span>
                <span className="font-mono text-xs text-[#1A1D15] font-medium">
                  {step04Data.acquisitionDate} / {step04Data.installationDate}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                  Warranty Status
                </span>
                <span className="font-mono text-xs text-[#536600] font-semibold">
                  Active thru {step04Data.warrantyExpiryDate.slice(-8) || "Aug 2029"}
                </span>
                <span className="font-mono text-[10px] text-[#737785] block mt-0.5">
                  ${step04Data.residualSalvageValue?.toLocaleString("en-US")} Residual (SLD)
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Maintenance Configuration */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#1558C9] rounded-full" />
                <h3 className="font-serif text-lg text-[#1A1D15]">
                  5. Maintenance Configuration
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(5)}
                className="font-medium text-xs text-[#1558C9] hover:underline flex items-center gap-1 transition-colors"
              >
                <span>Edit</span>
                <Edit size={13} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#f3f5e7] space-y-4 border border-[#E8E9DC]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Service Strategy
                  </span>
                  <span className="text-xs text-[#1A1D15] font-medium">
                    {step05Data.strategy}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Inspection Cadence
                  </span>
                  <span className="font-mono text-xs text-[#1A1D15] font-medium">
                    {step05Data.strategy === "Reactive Only"
                      ? "On-Demand (Reactive)"
                      : "Quarterly (90-Day Cycle)"}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Next Scheduled PM
                  </span>
                  <span className="font-mono text-xs text-[#1558C9] font-bold">
                    {step05Data.strategy === "Reactive Only"
                      ? "None (Event Driven)"
                      : "Q4 2024 (15 Nov 2024)"}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block">
                    Assigned Team
                  </span>
                  <span className="text-xs text-[#1A1D15] font-medium">{squadClean}</span>
                </div>
              </div>

              {/* Protocol tags */}
              <div className="pt-2 border-t border-[#E8E9DC]/60">
                <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider block mb-2">
                  Active Protocol Checklist ({selectedTasks.length} Automated Steps)
                </span>
                <div className="flex flex-wrap gap-2">
                  {visibleProtocolTags.map((task) => (
                    <span
                      key={task.id}
                      className="px-2.5 py-1 rounded-md bg-[#e2e4d6] text-[#1A1D15] font-mono text-[11px] flex items-center gap-1.5 border border-[#E8E9DC]"
                    >
                      <Check size={12} className="text-[#536600]" strokeWidth={2.5} />
                      <span>{getCleanTaskLabel(task.name)}</span>
                    </span>
                  ))}
                  {remainingProtocolsCount > 0 && (
                    <span className="px-2.5 py-1 rounded-md bg-[#e2e4d6] text-[#737785] font-mono text-[11px] border border-[#E8E9DC]">
                      +{remainingProtocolsCount} additional protocols
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mandatory Sign-off Section */}
          <div className="p-4 rounded-xl bg-[#f3f5e7] border border-[#E8E9DC] space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => onToggleConfirm(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-[#1558C9] cursor-pointer shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-[#1A1D15]">
                  Institutional Custody &amp; Accuracy Confirmation
                </span>
                <span className="text-xs text-[#434653] mt-0.5 leading-relaxed">
                  I confirm that the information provided is accurate, meets state regulatory compliance standards, and that this physical asset belongs to {step03Data.tenantName || "Apex Institute of Technology"}.
                </span>
              </div>
            </label>
            {validationError && (
              <p className="text-xs text-[#ba1a1a] flex items-center gap-1 font-medium pt-1">
                <AlertCircle size={14} />
                <span>{validationError}</span>
              </p>
            )}
          </div>

          {/* Bottom Action Navigation Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8E9DC]/80">
            <button
              type="button"
              onClick={onPrevious}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#eeefe2] hover:bg-[#e8e9dc] text-[#1A1D15] font-semibold text-xs transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Previous Step</span>
            </button>

            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#737785] hidden sm:block">
              Step 6 of 6 · Ready for Commit
            </div>

            <button
              type="button"
              onClick={handleFinalRegister}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold text-xs shadow-md transition-all active:scale-[0.99] ${
                isConfirmed && !isSubmitting
                  ? "bg-[#1558C9] hover:bg-[#0041a0]"
                  : "bg-[#737785]/70 cursor-not-allowed opacity-60"
              }`}
            >
              <FileCheck size={16} />
              <span>{isSubmitting ? "Committing Record..." : "Register Asset →"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Supporting Panel (4 Cols) */}
      <div className="xl:col-span-4 flex flex-col space-y-6">
        {/* Asset Provisioning Readiness Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E8E9DC] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#1A1D15]">Provisioning Readiness</h3>
            <span className="px-2 py-0.5 rounded bg-[#C5EA32] text-[#171e00] font-mono text-[11px] font-bold shadow-2xs border border-[#536600]/20">
              100% READY
            </span>
          </div>

          {/* Readiness Bar Gauge */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#434653] font-medium">Ledger Ingestion Readiness</span>
              <span className="font-mono font-bold text-[#536600]">Optimal (100%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eeefe2] overflow-hidden">
              <div className="w-full h-full bg-[#C5EA32] rounded-full" />
            </div>
          </div>

          {/* Data Integrity Checks */}
          <div className="space-y-2.5 pt-1">
            <div className="p-3 rounded-lg bg-[#f3f5e7] flex items-center justify-between border border-[#E8E9DC]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#536600]" />
                <span className="text-xs text-[#1A1D15] font-semibold">OEM Validation</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#C5EA32]/40 text-[#171e00] font-bold border border-[#536600]/20">
                PASSED (LOCAL)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#f3f5e7] flex items-center justify-between border border-[#E8E9DC]">
              <div className="flex items-center gap-2.5">
                <Fingerprint size={18} className="text-[#536600]" />
                <span className="text-xs text-[#1A1D15] font-semibold">Serial Collision Check</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#C5EA32]/40 text-[#171e00] font-bold border border-[#536600]/20">
                ZERO MATCHES
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#f3f5e7] flex items-center justify-between border border-[#E8E9DC]">
              <div className="flex items-center gap-2.5">
                <Key size={18} className="text-[#536600]" />
                <span className="text-xs text-[#1A1D15] font-semibold">Transponder Key</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#C5EA32]/40 text-[#171e00] font-bold border border-[#536600]/20">
                GENERATED
              </span>
            </div>
          </div>

          {/* Embedded QR Identity Preview */}
          <div className="pt-2 space-y-3 border-t border-[#E8E9DC]/70">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#1A1D15]">
                Live Tag Transponder
              </span>
              <span className="font-mono text-[11px] text-[#737785]">
                {step01Data.reservedId}
              </span>
            </div>

            <div className="p-5 rounded-xl bg-[#f3f5e7] flex flex-col items-center justify-center text-center space-y-3 border border-[#E8E9DC]">
              <div className="w-36 h-36 bg-white p-2.5 rounded-xl shadow-sm flex items-center justify-center border border-[#E8E9DC]">
                <AssetQrSvg payload={`CF://${step01Data.reservedId}`} size={128} />
              </div>

              <div>
                <span className="font-mono text-xs text-[#1A1D15] font-bold block">
                  CampusFix AI Tag {step01Data.reservedId}
                </span>
                <span className="font-mono text-[10px] text-[#737785]">
                  Dynamic NFC + Secure 2D Matrix
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full pt-1">
                <button
                  type="button"
                  onClick={handleDownloadSvgTag}
                  className="w-full px-2.5 py-2 rounded-lg bg-[#eeefe2] hover:bg-[#e8e9dc] text-[#1A1D15] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#E8E9DC]"
                >
                  <Download size={14} />
                  <span>SVG Tag</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintTag}
                  className="w-full px-2.5 py-2 rounded-lg bg-[#eeefe2] hover:bg-[#e8e9dc] text-[#1A1D15] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#E8E9DC]"
                >
                  <Printer size={14} />
                  <span>Print (1)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Telemetry Metadata Summary */}
          <div className="p-3.5 rounded-xl bg-[#e8e9dc]/60 space-y-2 border border-[#E8E9DC]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#434653]">Telemetry Ingestion Engine</span>
              <span className="font-mono font-medium text-[#1A1D15]">Auto-Listen (UDP/MQTT)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#434653]">Audit Trail Status</span>
              <span className="font-mono font-medium text-[#1A1D15]">Immutable Hash Ready</span>
            </div>
          </div>
        </div>

        {/* System Governance Micro-Note */}
        <div className="p-4 rounded-xl bg-white shadow-sm border border-[#E8E9DC] flex items-start gap-3">
          <Shield size={20} className="text-[#1558C9] shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-[#1A1D15]">
              Institutional Governance Policy 8.2
            </span>
            <span className="text-xs text-[#434653] leading-relaxed mt-0.5">
              Registration commits serial allocation to the centralized state higher-education assets audit ledger. (Advisory reference)
            </span>
          </div>
        </div>
      </div>

      {/* Success Modal Notification Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#030407]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 border border-[#E8E9DC]">
            {/* Top Success Icon & Close */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#C5EA32] text-[#171e00] flex items-center justify-center shadow-md border border-[#536600]/20">
                <CheckCircle2 size={26} strokeWidth={2.5} />
              </div>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="p-1.5 rounded-lg text-[#737785] hover:bg-[#f3f5e7] hover:text-[#1A1D15] transition-colors"
                title="Dismiss modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Heading & Core Message */}
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] font-bold text-[#536600] uppercase tracking-widest">
                TRANSACTION COMMITTED • DEMONSTRATION
              </span>
              <h3 className="font-serif text-2xl text-[#1A1D15]">
                Asset Successfully Registered
              </h3>
              <p className="text-xs text-[#434653] leading-relaxed">
                The hardware record for <strong className="text-[#1A1D15] font-semibold">{step01Data.name}</strong> is now saved in the active institutional session.
              </p>
            </div>

            {/* Quick Registry Receipt Tile */}
            <div className="p-4 rounded-xl bg-[#f3f5e7] space-y-2.5 font-mono text-xs border border-[#E8E9DC]">
              <div className="flex justify-between items-center pb-2 bg-white p-2.5 rounded-lg border border-[#E8E9DC]">
                <span className="text-[#737785]">SYSTEM ASSET ID:</span>
                <span className="text-[#1558C9] font-bold text-sm">
                  {step01Data.reservedId}
                </span>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[#737785]">PHYSICAL LOCATION:</span>
                <span className="text-[#1A1D15] font-medium">
                  {(step03Data.building || "Turing Hall").split(" (")[0]} · {(step03Data.space || "Auditorium 101").split(" (")[0]}
                </span>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[#737785]">OPERATIONAL DISPATCH:</span>
                <span className="text-[#1A1D15] font-medium">{squadClean}</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[#737785]">FIRST PM DISPATCH:</span>
                <span className="text-[#1A1D15] font-medium">15 Nov 2024 (Q4 Window)</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#eeefe2] border border-[#E8E9DC] text-[11px] text-[#434653] leading-relaxed">
              <strong className="text-[#1A1D15]">Prototype Demonstration Notice:</strong> In this frontend demonstration, asset records are maintained in active browser state. No remote institutional SQL backend or state asset ledger was modified.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href={`/assets/${convertDraftIdToPermanent(step01Data.reservedId)}`}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-[#1558C9] hover:bg-[#0041a0] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>View Asset Details</span>
                <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                onClick={handlePrintTag}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#eeefe2] hover:bg-[#e8e9dc] text-[#1A1D15] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#E8E9DC]"
              >
                <Printer size={15} />
                <span>Print Tag Label</span>
              </button>
              <Link
                href="/assets"
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#f3f5e7] hover:bg-[#eeefe2] text-[#434653] font-semibold text-xs text-center transition-colors border border-[#E8E9DC]"
              >
                Return to Registry
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

