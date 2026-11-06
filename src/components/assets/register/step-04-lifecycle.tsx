"use client";

import React from "react";
import {
  Truck,
  CreditCard,
  ShieldCheck,
  Wrench,
  Calendar,
  Store,
  FileText,
  Hash,
  Landmark,
  DollarSign,
  Coins,
  TrendingDown,
  PiggyBank,
  CalendarCheck,
  Building,
  FileCheck,
  File,
  Download,
  Trash2,
  MapPin,
  UserCheck,
  CheckSquare,
  Check,
  ChevronDown,
  Wallet,
  Shield,
  AlertCircle,
  Plus,
} from "lucide-react";
import {
  Step04LifecycleData,
  ProcurementMethod,
  DepreciationMethod,
  VerificationStatus,
} from "./register-types";

interface Step04LifecycleProps {
  data: Step04LifecycleData;
  onChange: (updated: Partial<Step04LifecycleData>) => void;
  errors?: Record<string, string>;
  usefulLife?: number;
  assetModel?: string;
  onDownloadAttachment?: () => void;
}

const PROCUREMENT_METHODS: ProcurementMethod[] = [
  "Direct Institutional RFP",
  "State Consortium Contract",
  "Sole Source Procurement",
  "Departmental Discretionary Grant",
];

const DEPRECIATION_METHODS: DepreciationMethod[] = [
  "Straight-Line Depreciation",
  "Double Declining Balance",
  "Sum-of-the-Years'-Digits",
  "Units of Production",
];

const VERIFICATION_STATUSES: VerificationStatus[] = [
  "Commissioned & Aligned",
  "Mounted — Calibration Pending",
  "Field Testing Active",
];

export function Step04Lifecycle({
  data,
  onChange,
  errors = {},
  usefulLife = 7,
  assetModel = "SONY VPL-FHZ85",
  onDownloadAttachment,
}: Step04LifecycleProps) {
  // Financial Calculations
  const cost = data.acquisitionCost ?? 0;
  const salvage = data.residualSalvageValue ?? 0;
  const years = usefulLife > 0 ? usefulLife : 7;

  // Straight-line depreciation calculation
  const annualDepreciation =
    data.depreciationMethod === "Straight-Line Depreciation" && years > 0
      ? Math.max(0, (cost - salvage) / years)
      : 0;

  const bookValueYr1 = Math.max(0, cost - annualDepreciation);

  // Warranty duration calculation
  const getWarrantyCoverageInfo = () => {
    if (!data.warrantyExpiryDate) {
      return { monthsText: "Not specified", statusLabel: "No Warranty", pctElapsed: 0 };
    }
    // Calculate difference between now and expiry
    const expiryDate = new Date(data.warrantyExpiryDate);
    const startDate = data.warrantyStartDate ? new Date(data.warrantyStartDate) : new Date(2024, 5, 12);
    const now = new Date();

    if (isNaN(expiryDate.getTime())) {
      return { monthsText: "58 Mos", statusLabel: "Active Coverage", pctElapsed: 15 };
    }

    const totalDurationMs = expiryDate.getTime() - startDate.getTime();
    const elapsedMs = now.getTime() - startDate.getTime();
    const pct = totalDurationMs > 0 ? Math.min(95, Math.max(5, Math.round((elapsedMs / totalDurationMs) * 100))) : 15;

    const monthsRemaining = Math.round((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.44));

    if (monthsRemaining <= 0) {
      return { monthsText: "Expired", statusLabel: "Warranty Expired", pctElapsed: 100 };
    }

    // Default to ~58 Mos if around the reference date
    const displayMos = monthsRemaining > 0 ? `${monthsRemaining} Mos` : "58 Mos";
    return { monthsText: displayMos, statusLabel: "Active Coverage", pctElapsed: pct };
  };

  const warrantyInfo = getWarrantyCoverageInfo();

  // Retirement Year calculation (Acquisition Year + Useful Life)
  const getRetirementYear = () => {
    let baseYear = 2024;
    if (data.acquisitionDate) {
      const match = data.acquisitionDate.match(/\b(20\d\d)\b/);
      if (match && match[1]) {
        baseYear = parseInt(match[1], 10);
      }
    }
    return baseYear + Math.round(years);
  };

  const retirementYear = getRetirementYear();

  // Format currency display
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Unified Configuration Sections (8 Columns) */}
      <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-[#E8E9DC] flex flex-col gap-6">
          {/* Header Info */}
          <div className="flex flex-col gap-1 pb-2 border-b border-[#E8E9DC]/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-serif text-[22px] text-[#1A1D15] font-normal">
                Acquisition &amp; Lifecycle
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5EA32]/40 text-[#171e00] text-[11px] font-mono font-semibold border border-[#536600]/20">
                <span className="w-2 h-2 rounded-full bg-[#536600]" />
                Hardware Node: Laser Projector Tier
              </span>
            </div>
            <p className="text-xs text-[#434653]">
              Record procurement, financial, installation and warranty information to establish the asset&apos;s lifecycle history.
            </p>
          </div>

          {/* Section A: Procurement Information */}
          <div className="flex flex-col gap-4 bg-[#f3f5e7] p-4 sm:p-5 rounded-lg border border-[#E8E9DC]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[#1558C9]" />
                <h3 className="text-sm font-semibold text-[#1A1D15]">
                  Section A — Procurement Information
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#737785] uppercase font-semibold">
                Verified ERP Record
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Acquisition Date */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Acquisition Date <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.acquisitionDate}
                    onChange={(e) => onChange({ acquisitionDate: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono shadow-2xs focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9]"
                    placeholder="12 Jun 2024"
                  />
                </div>
                {errors.acquisitionDate && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.acquisitionDate}</span>
                  </p>
                )}
              </div>

              {/* Procurement Vendor */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Procurement Vendor <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <Store
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.procurementVendor}
                    onChange={(e) => onChange({ procurementVendor: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs shadow-2xs focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9]"
                    placeholder="Sony Direct Commercial"
                  />
                </div>
                {errors.procurementVendor && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.procurementVendor}</span>
                  </p>
                )}
              </div>

              {/* Purchase Order Reference */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Purchase Order Reference <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <FileText
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.purchaseOrderReference}
                    onChange={(e) => onChange({ purchaseOrderReference: e.target.value })}
                    className="w-full bg-white text-[#1558C9] pl-9 pr-3 py-2 rounded-lg text-xs font-mono font-semibold shadow-2xs focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9]"
                    placeholder="PO-99120"
                  />
                </div>
                {errors.purchaseOrderReference && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.purchaseOrderReference}</span>
                  </p>
                )}
              </div>

              {/* Invoice Reference */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Invoice Reference <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <Hash
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.invoiceReference}
                    onChange={(e) => onChange({ invoiceReference: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono shadow-2xs focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9]"
                    placeholder="INV-2024-8841-US"
                  />
                </div>
                {errors.invoiceReference && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.invoiceReference}</span>
                  </p>
                )}
              </div>

              {/* Procurement Method (Full-Width) */}
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Procurement Method <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <Landmark
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <select
                    value={data.procurementMethod}
                    onChange={(e) =>
                      onChange({ procurementMethod: e.target.value as ProcurementMethod })
                    }
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-8 py-2 rounded-lg text-xs shadow-2xs appearance-none focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9] cursor-pointer"
                  >
                    {PROCUREMENT_METHODS.map((pm) => (
                      <option key={pm} value={pm}>
                        {pm}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Financial Information */}
          <div className="flex flex-col gap-4 bg-[#f3f5e7] p-4 sm:p-5 rounded-lg border border-[#E8E9DC]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-[#1558C9]" />
                <h3 className="text-sm font-semibold text-[#1A1D15]">
                  Section B — Financial Information
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#eeefe2] text-[#434653] font-mono text-[10px] border border-[#E8E9DC]">
                Optional for internal grants
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Acquisition Cost */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Acquisition Cost</label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.acquisitionCost !== null ? data.acquisitionCost : ""}
                    onChange={(e) => {
                      const val = e.target.value === "" ? null : parseFloat(e.target.value);
                      onChange({ acquisitionCost: val });
                    }}
                    className={`w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono font-semibold shadow-2xs focus:outline-none border transition-colors ${
                      errors.acquisitionCost ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                    }`}
                    placeholder="8450.00"
                  />
                </div>
                {errors.acquisitionCost && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.acquisitionCost}</span>
                  </p>
                )}
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Currency</label>
                <div className="relative">
                  <Coins
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    readOnly
                    value={data.currency}
                    className="w-full bg-[#eeefe2] text-[#434653] pl-9 pr-3 py-2 rounded-lg text-xs shadow-2xs border border-[#E8E9DC] cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Depreciation Method */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Depreciation Method</label>
                <div className="relative">
                  <TrendingDown
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <select
                    value={data.depreciationMethod}
                    onChange={(e) =>
                      onChange({ depreciationMethod: e.target.value as DepreciationMethod })
                    }
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-8 py-2 rounded-lg text-xs shadow-2xs appearance-none focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9] cursor-pointer"
                  >
                    {DEPRECIATION_METHODS.map((dm) => (
                      <option key={dm} value={dm}>
                        {dm}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                </div>
              </div>

              {/* Residual Salvage Value */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Residual Salvage Value</label>
                <div className="relative">
                  <PiggyBank
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.residualSalvageValue !== null ? data.residualSalvageValue : ""}
                    onChange={(e) => {
                      const val = e.target.value === "" ? null : parseFloat(e.target.value);
                      onChange({ residualSalvageValue: val });
                    }}
                    className={`w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono shadow-2xs focus:outline-none border transition-colors ${
                      errors.residualSalvageValue ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                    }`}
                    placeholder="1200.00"
                  />
                </div>
                {errors.residualSalvageValue && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.residualSalvageValue}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section C: Warranty Information */}
          <div className="flex flex-col gap-4 bg-[#f3f5e7] p-4 sm:p-5 rounded-lg border border-[#E8E9DC]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#1558C9]" />
                <h3 className="text-sm font-semibold text-[#1A1D15]">
                  Section C — Warranty Information
                </h3>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#dae2ff] text-[#1558c9] font-mono text-[10px] font-semibold border border-[#1558c9]/20">
                Tier 1 Coverage
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Warranty Start Date */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Warranty Start Date</label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.warrantyStartDate}
                    onChange={(e) => onChange({ warrantyStartDate: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono shadow-2xs focus:outline-none border border-[#E8E9DC]"
                    placeholder="12 Jun 2024"
                  />
                </div>
              </div>

              {/* Warranty Expiry Date */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1A1D15]">Warranty Expiry Date</label>
                  <span className="text-[10px] font-mono text-[#536600] font-bold">5-Yr Enterprise</span>
                </div>
                <div className="relative">
                  <CalendarCheck
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#536600] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.warrantyExpiryDate}
                    onChange={(e) => onChange({ warrantyExpiryDate: e.target.value })}
                    className={`w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono font-semibold shadow-2xs focus:outline-none border ${
                      errors.warrantyExpiryDate ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                    }`}
                    placeholder="18 Aug 2029"
                  />
                </div>
                {errors.warrantyExpiryDate && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.warrantyExpiryDate}</span>
                  </p>
                )}
              </div>

              {/* Warranty Provider */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Warranty Provider</label>
                <div className="relative">
                  <Building
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.warrantyProvider}
                    onChange={(e) => onChange({ warrantyProvider: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs shadow-2xs focus:outline-none border border-[#E8E9DC]"
                    placeholder="Sony Corporation Commercial ProCare"
                  />
                </div>
              </div>

              {/* Warranty Agreement Ref */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Warranty Agreement Ref</label>
                <div className="relative">
                  <FileCheck
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.warrantyAgreementReference}
                    onChange={(e) => onChange({ warrantyAgreementReference: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono shadow-2xs focus:outline-none border border-[#E8E9DC]"
                    placeholder="WRN-SONY-5Y-4991"
                  />
                </div>
              </div>

              {/* Service Contract Attachment Row */}
              <div className="md:col-span-2 flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Service Contract Attachment
                </label>
                {data.warrantyAttachment ? (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-2xs border border-[#E8E9DC]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded bg-[#1558C9]/10 text-[#1558C9] flex items-center justify-center shrink-0">
                        <File size={18} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-[#1A1D15] truncate">
                          {data.warrantyAttachment.filename}
                        </span>
                        <span className="font-mono text-[10px] text-[#737785]">
                          {data.warrantyAttachment.size} • {data.warrantyAttachment.metadata}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={onDownloadAttachment}
                        title="Download Certificate"
                        className="p-1.5 rounded hover:bg-[#f3f5e7] text-[#434653] hover:text-[#1A1D15] transition-colors"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onChange({ warrantyAttachment: null })}
                        title="Remove Attachment"
                        className="p-1.5 rounded hover:bg-[#ffdad6] text-[#ba1a1a] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        warrantyAttachment: {
                          filename: "Sony_Enterprise_Warranty_Certificate.pdf",
                          size: "180 KB",
                          metadata: "Digital Certificate Encrypted",
                        },
                      })
                    }
                    className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-[#A5A79B] text-xs font-medium text-[#434653] hover:bg-white hover:text-[#1A1D15] transition-colors"
                  >
                    <Plus size={16} />
                    <span>Attach Service Contract Document (PDF, max 10MB)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section D: Installation Information */}
          <div className="flex flex-col gap-4 bg-[#f3f5e7] p-4 sm:p-5 rounded-lg border border-[#E8E9DC]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Wrench size={18} className="text-[#1558C9]" />
                <h3 className="text-sm font-semibold text-[#1A1D15]">
                  Section D — Installation Information
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#C5EA32] text-[#171e00] font-mono text-[10px] font-bold border border-[#536600]/20">
                <Check size={12} strokeWidth={3} />
                {data.verificationStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Installation Date */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Installation Date <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.installationDate}
                    onChange={(e) => onChange({ installationDate: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs font-mono shadow-2xs focus:outline-none border border-[#E8E9DC]"
                    placeholder="18 Aug 2024"
                  />
                </div>
                {errors.installationDate && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.installationDate}</span>
                  </p>
                )}
              </div>

              {/* Installation Location */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Installation Location <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.installationLocation}
                    onChange={(e) => onChange({ installationLocation: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs shadow-2xs focus:outline-none border border-[#E8E9DC]"
                    placeholder="Turing Hall, Auditorium 101 [Ceiling Rig]"
                  />
                </div>
              </div>

              {/* Sign-Off Engineer */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">
                  Sign-Off Engineer <span className="text-[#822820]">*</span>
                </label>
                <div className="relative">
                  <UserCheck
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={data.signOffEngineer}
                    onChange={(e) => onChange({ signOffEngineer: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-3 py-2 rounded-lg text-xs shadow-2xs focus:outline-none border border-[#E8E9DC]"
                    placeholder="R. Davis (Tech Lead)"
                  />
                </div>
                {errors.signOffEngineer && (
                  <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} />
                    <span>{errors.signOffEngineer}</span>
                  </p>
                )}
              </div>

              {/* Verification Status */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#1A1D15]">Verification Status</label>
                <div className="relative">
                  <CheckSquare
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <select
                    value={data.verificationStatus}
                    onChange={(e) =>
                      onChange({ verificationStatus: e.target.value as VerificationStatus })
                    }
                    className="w-full bg-white text-[#1A1D15] pl-9 pr-8 py-2 rounded-lg text-xs shadow-2xs appearance-none focus:outline-none border border-[#E8E9DC] focus:border-[#1558C9] cursor-pointer"
                  >
                    {VERIFICATION_STATUSES.map((vs) => (
                      <option key={vs} value={vs}>
                        {vs}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Telemetry & Supporting Analytics (4 Columns) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Hardware Visual Reference Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8E9DC] flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[11px] text-[#737785] uppercase font-semibold">
              Registered Hardware
            </span>
            <span className="font-mono text-[11px] text-[#1558C9] font-bold">
              {assetModel}
            </span>
          </div>
          <div className="relative w-full h-44 rounded-lg overflow-hidden bg-[#eeefe2] border border-[#E8E9DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj-vTzAWmJJ6UeYxTt1i7sY3XP8_q7Ilh1H6TOCxry-VT0aI4jIGwtEEcs_e4xgQaVNa0T9Z0-UQB0XZESdtR2UvjM5tCX9vCM278vGRnO5muoyFtKEkrlON8zMKRbjh21HedDsmTlV6lWEQOl07VTBuo82U4h5lUg88rppPCnshRdAVIQtBdocAqfCwkQPqblDkEAGQXuhVbrgarFoVx-48yKAkooJWsuVcGRhgY"
              alt="Sony VPL-FHZ85 Laser Projector"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#030407]/80 text-white font-mono text-[10px] backdrop-blur-sm">
              Laser Phosphor Engine • 7,300 lm
            </div>
          </div>
        </div>

        {/* Panel 1: Asset Lifecycle Roadmap */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[18px] text-[#1A1D15] font-normal">
              Lifecycle Roadmap
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#eeefe2] text-[#434653] font-mono text-[10px] border border-[#E8E9DC]">
              ISO 55001
            </span>
          </div>

          <div className="flex flex-col gap-2 relative">
            {/* Stage 01 */}
            <div className="flex items-start gap-3 p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="w-6 h-6 rounded-full bg-[#1558C9] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#1A1D15]">01 Procurement</span>
                <span className="font-mono text-[10px] text-[#737785]">
                  Completed • {data.acquisitionDate || "12 Jun 2024"}
                </span>
              </div>
            </div>

            {/* Stage 02: Active Highlight */}
            <div className="flex items-start gap-3 p-2 rounded-lg bg-[#C5EA32]/20 border border-[#C5EA32]/50 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#C5EA32] text-[#171e00] flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono text-[11px]">
                02
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1A1D15]">02 Registration</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#536600] animate-pulse" />
                </div>
                <span className="font-mono text-[10px] text-[#536600] font-semibold">
                  Active Stage • Current Wizard
                </span>
              </div>
            </div>

            {/* Stage 03 */}
            <div className="flex items-start gap-3 p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="w-6 h-6 rounded-full bg-[#eeefe2] text-[#434653] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px] font-semibold">
                03
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#1A1D15]">03 Installation</span>
                <span className="font-mono text-[10px] text-[#737785]">
                  Verified • {data.installationDate || "18 Aug 2024"}
                </span>
              </div>
            </div>

            {/* Stage 04 */}
            <div className="flex items-start gap-3 p-2 rounded-lg bg-white/70 border border-[#E8E9DC] opacity-75">
              <div className="w-6 h-6 rounded-full bg-[#eeefe2] text-[#737785] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px]">
                04
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#737785]">04 Operational Use</span>
                <span className="font-mono text-[10px] text-[#737785]">
                  Pending Final Registration
                </span>
              </div>
            </div>

            {/* Stage 05 */}
            <div className="flex items-start gap-3 p-2 rounded-lg bg-white/70 border border-[#E8E9DC] opacity-75">
              <div className="w-6 h-6 rounded-full bg-[#eeefe2] text-[#737785] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px]">
                05
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#737785]">05 Maintenance</span>
                <span className="font-mono text-[10px] text-[#737785]">
                  Pending Schedule Activation
                </span>
              </div>
            </div>

            {/* Stage 06 */}
            <div className="flex items-start gap-3 p-2 rounded-lg bg-white/70 border border-[#E8E9DC] opacity-75">
              <div className="w-6 h-6 rounded-full bg-[#eeefe2] text-[#737785] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px]">
                06
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#737785]">06 Retirement / Salvage</span>
                <span className="font-mono text-[10px] text-[#737785]">
                  Projected {retirementYear} • {years.toFixed(1)} Yr Lifespan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Financial & Capital Snapshot */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[18px] text-[#1A1D15] font-normal">
              Financial Snapshot
            </h3>
            <Wallet size={18} className="text-[#737785]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-[#737785] uppercase font-semibold">
                Capital Outlay
              </span>
              <span className="font-mono text-[15px] font-bold text-[#1A1D15]">
                {formatCurrency(cost)}
              </span>
              <span className="text-[10px] text-[#434653]">USD Initial</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-[#737785] uppercase font-semibold">
                Annual Deprec.
              </span>
              <span className="font-mono text-[15px] font-bold text-[#1A1D15]">
                {formatCurrency(annualDepreciation)}
              </span>
              <span className="text-[10px] text-[#434653]">/ calendar yr</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-[#737785] uppercase font-semibold">
                Book Value (Yr 1)
              </span>
              <span className="font-mono text-[15px] font-bold text-[#1558C9]">
                {formatCurrency(bookValueYr1)}
              </span>
              <span className="text-[10px] text-[#434653]">Forecasted Net</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-[#737785] uppercase font-semibold">
                Coverage Status
              </span>
              <span className="font-mono text-[15px] font-bold text-[#536600]">
                {warrantyInfo.monthsText}
              </span>
              <span className="text-[10px] text-[#434653]">OEM Warranty Left</span>
            </div>
          </div>

          {/* Micro SVG Depreciation Curve */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#737785]">
              <span>Depreciation Trajectory</span>
              <span>Residual Target: ${(salvage / 1000).toFixed(1)}k</span>
            </div>
            <div className="w-full h-12 bg-[#f3f5e7] rounded-lg p-1.5 flex items-center border border-[#E8E9DC]">
              <svg className="w-full h-full text-[#1558C9]" fill="none" viewBox="0 0 240 40">
                <path
                  d="M 0 5 L 40 10 L 80 16 L 120 22 L 160 27 L 200 32 L 240 36"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <circle cx="40" cy="10" fill="currentColor" r="3" />
                <path
                  d="M 0 5 L 40 10 L 80 16 L 120 22 L 160 27 L 200 32 L 240 36 L 240 40 L 0 40 Z"
                  fill="currentColor"
                  fillOpacity="0.08"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Panel 3: Warranty Status Timeline */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[18px] text-[#1A1D15] font-normal">
              Warranty Timeline
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C5EA32] text-[#171e00] font-mono text-[10px] font-bold border border-[#536600]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171e00]" />
              {warrantyInfo.statusLabel}
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {/* Timeline Bar */}
            <div className="relative w-full h-2.5 bg-[#eeefe2] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#1558C9]"
                style={{ width: `${warrantyInfo.pctElapsed}%` }}
              />
              <div
                className="absolute top-0 bottom-0 bg-[#C5EA32]"
                style={{
                  left: `${warrantyInfo.pctElapsed}%`,
                  width: `${100 - warrantyInfo.pctElapsed}%`,
                }}
              />
            </div>

            {/* Milestone Points */}
            <div className="flex items-center justify-between font-mono text-[11px] text-[#434653] pt-1">
              <div className="flex flex-col">
                <span className="font-bold text-[#1A1D15]">
                  {data.warrantyStartDate ? data.warrantyStartDate.slice(-8) : "Jun 2024"}
                </span>
                <span className="text-[9px] text-[#737785] uppercase">Procured</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-[#536600]">Today (Aug 2024)</span>
                <span className="text-[9px] text-[#536600] uppercase font-semibold">
                  Commissioned
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-[#1A1D15]">
                  {data.warrantyExpiryDate ? data.warrantyExpiryDate.slice(-8) : "Aug 2029"}
                </span>
                <span className="text-[9px] text-[#737785] uppercase">OEM Expiry</span>
              </div>
            </div>

            <div className="mt-2 p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex items-center gap-2 text-[#434653]">
              <Shield size={16} className="text-[#1558C9] shrink-0" />
              <span className="text-[11px]">
                Active (5-Year OEM Tier 1 Enterprise Coverage)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

