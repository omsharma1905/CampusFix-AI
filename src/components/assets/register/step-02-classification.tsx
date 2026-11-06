"use client";

import React from "react";
import {
  Layers,
  Video,
  Check,
  CheckCircle2,
  ChevronDown,
  Brain,
  Filter,
  Thermometer,
  Wind,
  Timer,
  AlertCircle,
} from "lucide-react";
import {
  AssetCategory,
  AssetDiscipline,
  CriticalityLevel,
  OperationalClassification,
  Step02ClassificationData,
  CATEGORY_SUBCATEGORIES_MAP,
} from "./register-types";

interface Step02ClassificationProps {
  data: Step02ClassificationData;
  onChange: (updated: Partial<Step02ClassificationData>) => void;
  errors?: Record<string, string>;
}

const CATEGORY_OPTIONS: AssetCategory[] = [
  "Audio Visual & Media",
  "HVAC & Climate Control",
  "Power & Electrical",
  "Laboratory Instrumentation",
  "Physical Security",
];

const DISCIPLINE_OPTIONS: AssetDiscipline[] = [
  "Electrical",
  "Mechanical",
  "Electronic",
  "Civil / Structural",
  "Information Tech (IT)",
  "Specialized Lab",
];

const OPERATIONAL_OPTIONS: OperationalClassification[] = [
  "Fixed Asset",
  "Movable",
  "Infras.",
  "Portable",
];

export function Step02Classification({
  data,
  onChange,
  errors = {},
}: Step02ClassificationProps) {
  // Category change also auto-correlates the subcategory
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as AssetCategory;
    const availableSubcategories = CATEGORY_SUBCATEGORIES_MAP[newCategory] || [];
    onChange({
      category: newCategory,
      subcategory: availableSubcategories[0] || "",
    });
  };

  const handleUsefulLifeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onChange({
      expectedUsefulLife: isNaN(val) ? 0 : val,
    });
  };

  // Criticality metadata mapping
  const getCriticalitySummary = (crit: CriticalityLevel) => {
    switch (crit) {
      case "Low":
        return {
          label: "Low Criticality (Tier 4 Monitoring)",
          dotClass: "bg-[#737785]",
        };
      case "Normal":
        return {
          label: "Normal Criticality (Tier 3 Standard Maintenance)",
          dotClass: "bg-[#536600]",
        };
      case "High":
        return {
          label: "High Criticality (Tier 2 Audit Required)",
          dotClass: "bg-[#1558C9]",
        };
      case "Critical":
        return {
          label: "Critical Infrastructure (Tier 1 Immediate Priority)",
          dotClass: "bg-[#822820]",
        };
    }
  };

  const criticalitySummary = getCriticalitySummary(data.criticality);
  const currentSubcategories =
    CATEGORY_SUBCATEGORIES_MAP[data.category] || [data.subcategory];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Main Form Column (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E8E9DC]">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 bg-[#f3f5e7] px-4 py-3 rounded-xl gap-2 border border-[#E8E9DC]">
          <div>
            <h2 className="font-serif text-[20px] text-[#1A1D15] font-normal">
              Asset Classification
            </h2>
            <p className="text-xs text-[#434653] mt-0.5">
              Define the operational category, criticality and expected service life of this asset.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#C5EA32] text-[#171e00] font-mono text-[10px] tracking-wider self-start sm:self-auto font-bold border border-[#536600]/20">
            REQUIRED FIELDS *
          </span>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Category and Subcategory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field 1: Asset Category */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="asset-category"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>
                  Asset Category <span className="text-[#822820]">*</span>
                </span>
                <span className="font-mono text-[11px] text-[#737785]">Taxonomy v4.2</span>
              </label>
              <div className="relative">
                <Layers
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="asset-category"
                  value={data.category}
                  onChange={handleCategoryChange}
                  className={`w-full bg-[#f3f5e7] text-[#1A1D15] text-xs rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none focus:bg-white shadow-2xs cursor-pointer border transition-colors ${
                    errors.category ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
              </div>
              {errors.category && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>

            {/* Field 2: Subcategory */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="asset-subcategory"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>
                  Subcategory <span className="text-[#822820]">*</span>
                </span>
                <span className="font-medium text-[11px] text-[#536600]">Auto-correlated</span>
              </label>
              <div className="relative">
                <Video
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="asset-subcategory"
                  value={data.subcategory}
                  onChange={(e) => onChange({ subcategory: e.target.value })}
                  className={`w-full bg-[#f3f5e7] text-[#1A1D15] text-xs rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none focus:bg-white shadow-2xs cursor-pointer border transition-colors ${
                    errors.subcategory ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {currentSubcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
              </div>
              {errors.subcategory && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.subcategory}</span>
                </p>
              )}
            </div>
          </div>

          {/* Field 3: Asset Discipline & Type (Pills) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#1A1D15]">Asset Discipline & Type</label>
            <div className="flex flex-wrap gap-2">
              {DISCIPLINE_OPTIONS.map((discipline) => {
                const isSelected = data.discipline === discipline;
                return (
                  <button
                    key={discipline}
                    type="button"
                    onClick={() => onChange({ discipline })}
                    className={`px-3.5 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#1558C9] text-white font-semibold shadow-xs"
                        : "bg-[#eeefe2] text-[#434653] font-medium hover:bg-[#e8e9dc]"
                    }`}
                  >
                    {isSelected && <Check size={13} strokeWidth={2.5} />}
                    <span>{discipline}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 4: Criticality Level (4 Cards Grid) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#1A1D15]">
                Criticality Level <span className="text-[#822820]">*</span>
              </label>
              <span className="font-mono text-[11px] text-[#737785]">SLA Response Tier</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {/* Low */}
              <button
                type="button"
                onClick={() => onChange({ criticality: "Low" })}
                className={`flex flex-col justify-between p-3.5 rounded-xl text-left transition-all ${
                  data.criticality === "Low"
                    ? "bg-white shadow-md relative overflow-hidden ring-1 ring-[#1558C9]/30"
                    : "bg-[#f3f5e7] hover:bg-[#eeefe2] border border-[#E8E9DC]"
                }`}
              >
                {data.criticality === "Low" && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1558C9]" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs ${
                        data.criticality === "Low"
                          ? "text-[#1558C9] font-bold"
                          : "text-[#1A1D15] font-semibold"
                      }`}
                    >
                      Low
                    </span>
                    {data.criticality === "Low" ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#1558C9] text-white font-mono text-[9px] uppercase tracking-wide font-bold">
                        Selected
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#737785]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#434653] leading-tight">
                    Limited operational impact. Non-disruptive failure window.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#737785] mt-3 block">
                  SLA: 72 hrs
                </span>
              </button>

              {/* Normal */}
              <button
                type="button"
                onClick={() => onChange({ criticality: "Normal" })}
                className={`flex flex-col justify-between p-3.5 rounded-xl text-left transition-all ${
                  data.criticality === "Normal"
                    ? "bg-white shadow-md relative overflow-hidden ring-1 ring-[#1558C9]/30"
                    : "bg-[#f3f5e7] hover:bg-[#eeefe2] border border-[#E8E9DC]"
                }`}
              >
                {data.criticality === "Normal" && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1558C9]" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs ${
                        data.criticality === "Normal"
                          ? "text-[#1558C9] font-bold"
                          : "text-[#1A1D15] font-semibold"
                      }`}
                    >
                      Normal
                    </span>
                    {data.criticality === "Normal" ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#1558C9] text-white font-mono text-[9px] uppercase tracking-wide font-bold">
                        Selected
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C5EA32] ring-1 ring-[#536600]/30" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#434653] leading-tight">
                    Standard operational importance across routine academic schedules.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#737785] mt-3 block">
                  SLA: 24 hrs
                </span>
              </button>

              {/* High (Selected by default) */}
              <button
                type="button"
                onClick={() => onChange({ criticality: "High" })}
                className={`flex flex-col justify-between p-3.5 rounded-xl text-left transition-all ${
                  data.criticality === "High"
                    ? "bg-white shadow-md relative overflow-hidden ring-1 ring-[#1558C9]/30"
                    : "bg-[#f3f5e7] hover:bg-[#eeefe2] border border-[#E8E9DC]"
                }`}
              >
                {data.criticality === "High" && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1558C9]" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs ${
                        data.criticality === "High"
                          ? "text-[#1558C9] font-bold"
                          : "text-[#1A1D15] font-semibold"
                      }`}
                    >
                      High
                    </span>
                    {data.criticality === "High" ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#1558C9] text-white font-mono text-[9px] uppercase tracking-wide font-bold">
                        Selected
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1558C9]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#1A1D15] leading-tight font-medium">
                    Significant departmental impact. Direct disruption to primary auditorium.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#1558C9] font-semibold mt-3 block">
                  SLA: 4 hrs (Tier 2)
                </span>
              </button>

              {/* Critical */}
              <button
                type="button"
                onClick={() => onChange({ criticality: "Critical" })}
                className={`flex flex-col justify-between p-3.5 rounded-xl text-left transition-all ${
                  data.criticality === "Critical"
                    ? "bg-white shadow-md relative overflow-hidden ring-1 ring-[#822820]/40"
                    : "bg-[#ffdad5]/30 hover:bg-[#ffdad5]/50 border border-[#ffdad5]"
                }`}
              >
                {data.criticality === "Critical" && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#822820]" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#822820] font-bold">Critical</span>
                    {data.criticality === "Critical" ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#822820] text-white font-mono text-[9px] uppercase tracking-wide font-bold">
                        Selected
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#822820]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#1A1D15] leading-tight">
                    Essential infrastructure or life safety. Immediate campus shutdown risk.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#822820] font-bold mt-3 block">
                  SLA: 1 hr (Tier 1)
                </span>
              </button>
            </div>
            {errors.criticality && (
              <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} />
                <span>{errors.criticality}</span>
              </p>
            )}
          </div>

          {/* Field 5 & 6 Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Field 5: Expected Useful Life */}
            <div className="md:col-span-5 flex flex-col gap-1.5">
              <label
                htmlFor="useful-life"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>Expected Useful Life</span>
                <span className="font-mono text-[11px] text-[#737785]">Depr: Straight-Line</span>
              </label>
              <div
                className={`flex rounded-lg shadow-2xs bg-[#f3f5e7] overflow-hidden border transition-colors ${
                  errors.expectedUsefulLife ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                }`}
              >
                <input
                  id="useful-life"
                  type="number"
                  min={1}
                  max={50}
                  value={data.expectedUsefulLife || ""}
                  onChange={handleUsefulLifeChange}
                  className="w-full bg-transparent px-3 py-2 text-xs font-mono text-[#1A1D15] focus:outline-none"
                />
                <div className="bg-[#eeefe2] px-3 py-2 flex items-center text-xs font-medium text-[#434653]">
                  Years
                </div>
              </div>
              {errors.expectedUsefulLife && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.expectedUsefulLife}</span>
                </p>
              )}
            </div>

            {/* Field 6: Operational Classification */}
            <div className="md:col-span-7 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1A1D15]">
                Operational Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-lg bg-[#f3f5e7] text-xs border border-[#E8E9DC]">
                {OPERATIONAL_OPTIONS.map((opt) => {
                  const isSelected = data.operationalClassification === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange({ operationalClassification: opt })}
                      className={`py-1.5 px-2 rounded-md text-center transition-all ${
                        isSelected
                          ? "bg-white font-semibold text-[#1A1D15] shadow-xs"
                          : "text-[#434653] hover:text-[#1A1D15]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Taxonomy Match Confidence Sub-Panel */}
          <div className="p-4 rounded-xl bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1558C9]" />
                <span className="font-semibold text-xs text-[#1A1D15]">
                  AI Taxonomy Match Confidence
                </span>
              </div>
              <span className="font-mono text-xs text-[#536600] font-bold">98.4% Match</span>
            </div>
            <div className="w-full bg-[#eeefe2] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#C5EA32] h-full rounded-full transition-all duration-300"
                style={{ width: "98.4%" }}
              />
            </div>
            <p className="text-[12px] text-[#434653] leading-relaxed">
              Matched against SONY VPL-FHZ Series documentation. Recommended maintenance protocols automatically staged for Step 05.
            </p>
          </div>
        </form>
      </div>

      {/* Right Supporting Intelligence Panel (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Photographic Asset Verification Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
              Identified Hardware
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#eeefe2] font-mono text-[10px] text-[#1A1D15] font-medium border border-[#E8E9DC]">
              3LCD Laser
            </span>
          </div>

          <div className="w-full h-44 rounded-xl overflow-hidden bg-[#eeefe2] relative border border-[#E8E9DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeqp3QkuBGoWiGGeEz_ELh5P9_kqqCH-fa4ThxGALvqwoDO-P8gIVNottAAOHT6IvqQFtMDlQYbWBfJc5qd102TAxv5t6icnpvltGNu_O0yMn4fySZlkyOPBoawvCCE71H782LrJkpoB0_WJcffaic7e7-aFut0OkzgxvgzZ9c17OAl65xNmxNwhc3DxRWmb5WrDBseJYNu22hxIcLXHwpgPSjbzs9JNxQoKevQps"
              alt="Sony VPL-FHZ85 Laser Projector"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-[#030407]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded font-mono text-[11px] shadow-sm">
              Sony VPL-FHZ85 / White
            </div>
          </div>
        </div>

        {/* Classification Intelligence Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E9DC] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base text-[#1A1D15] font-normal">
              Classification Intelligence
            </h3>
            <Brain size={20} className="text-[#1558C9]" />
          </div>

          {/* Active Trajectory */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
              Active Trajectory
            </span>
            <div className="px-3 py-2 rounded-lg bg-[#f3f5e7] text-xs font-semibold text-[#1A1D15] flex items-center justify-between border border-[#E8E9DC]">
              <span className="truncate">{data.category}</span>
              <span className="text-[#737785] px-1">→</span>
              <span className="text-[#1558C9] font-bold truncate">{data.subcategory}</span>
            </div>
          </div>

          {/* Criticality Indicator Pill */}
          <div className="p-3 rounded-lg bg-[#eeefe2] flex items-center gap-2.5 border border-[#E8E9DC]">
            <span className={`w-2 h-2 rounded-full ${criticalitySummary.dotClass} animate-pulse shrink-0`} />
            <span className="text-xs text-[#1A1D15] font-semibold">
              {criticalitySummary.label}
            </span>
          </div>

          {/* Suggested Maintenance Considerations */}
          <div className="flex flex-col gap-2.5 pt-1">
            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
              Suggested Maintenance Considerations
            </span>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2.5 text-xs text-[#1A1D15]">
                <Filter size={15} className="text-[#536600] shrink-0 mt-0.5" />
                <span className="text-[12px] leading-tight">
                  Optical engine dust purge (Quarterly schedule)
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1A1D15]">
                <Thermometer size={15} className="text-[#1558C9] shrink-0 mt-0.5" />
                <span className="text-[12px] leading-tight">
                  Cooling system exhaust delta-T continuous monitoring
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1A1D15]">
                <Wind size={15} className="text-[#737785] shrink-0 mt-0.5" />
                <span className="text-[12px] leading-tight">
                  Air filter static resistance delta validation
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1A1D15]">
                <Timer size={15} className="text-[#822820] shrink-0 mt-0.5" />
                <span className="text-[12px] leading-tight">
                  Laser diode runtime threshold logging (20,000h hardware cap)
                </span>
              </li>
            </ul>
          </div>

          {/* Micro Telemetry Longevity Curve */}
          <div className="p-3 rounded-xl bg-[#f3f5e7] flex flex-col gap-2 border border-[#E8E9DC]">
            <div className="flex justify-between items-center text-[11px] font-semibold text-[#434653]">
              <span>Expected Longevity Curve</span>
              <span className="font-mono font-bold text-[#1A1D15]">
                {Number(data.expectedUsefulLife || 7).toFixed(1)} Yrs
              </span>
            </div>
            <div className="h-8 w-full flex items-end gap-1 pt-1">
              <div className="flex-1 bg-[#1558C9]/40 rounded-t h-full" title="Year 1" />
              <div className="flex-1 bg-[#1558C9]/50 rounded-t h-[92%]" title="Year 2" />
              <div className="flex-1 bg-[#1558C9]/60 rounded-t h-[84%]" title="Year 3" />
              <div className="flex-1 bg-[#1558C9]/70 rounded-t h-[75%]" title="Year 4" />
              <div className="flex-1 bg-[#1558C9]/80 rounded-t h-[64%]" title="Year 5" />
              <div className="flex-1 bg-[#1558C9]/90 rounded-t h-[52%]" title="Year 6" />
              <div className="flex-1 bg-[#1558C9] rounded-t h-[40%]" title="Year 7" />
            </div>
          </div>

          {/* Advisory note */}
          <div className="bg-[#f3f5e7] p-3 rounded-lg border border-[#E8E9DC]">
            <p className="text-[11px] text-[#434653] italic leading-normal">
              Advisory note: Recommendations are derived from IEEE-1413 AV standards and OEM operational benchmarks for tier-1 lecture halls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
