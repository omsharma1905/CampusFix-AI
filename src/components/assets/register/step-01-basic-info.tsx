"use client";

import React, { useRef } from "react";
import {
  Camera,
  CheckCircle,
  Sparkles,
  Trash2,
  AlertCircle,
  Tag,
  Radio,
} from "lucide-react";
import { Step01BasicInfoData, AssetIdSchemaOption } from "./register-types";

interface Step01BasicInfoProps {
  data: Step01BasicInfoData;
  onChange: (updated: Partial<Step01BasicInfoData>) => void;
  errors: Record<string, string>;
}

export function Step01BasicInfo({ data, onChange, errors }: Step01BasicInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSchemaChange = (schema: AssetIdSchemaOption) => {
    let reservedId = "AST-2024-2849";
    let barcode = "Code128 / 2849";

    if (schema === "AV-MED-[NUM]") {
      reservedId = "AV-MED-8491";
      barcode = "Code128 / 8491";
    } else if (schema === "CAMPUS-TECH-[NUM]") {
      reservedId = "CAMPUS-TECH-0492";
      barcode = "Code128 / 0492";
    } else if (schema === "CUSTOM") {
      reservedId = "AST-CUSTOM-001";
      barcode = "Code128 / 0001";
    }

    onChange({ idSchema: schema, reservedId, barcode });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 25MB)
    const maxBytes = 25 * 1024 * 1024;
    if (file.size > maxBytes) {
      alert("File size exceeds 25 MB limit.");
      return;
    }

    // Validate type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic", "image/webp"];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".heic")) {
      alert("Invalid format. Please select PNG, JPG, JPEG or HEIC.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const url = loadEvt.target?.result as string;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      onChange({
        photo: {
          url,
          filename: file.name,
          size: sizeMb,
          isVerifiedAttachment: true,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ photo: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
      {/* Left Column: Form Fields (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6 w-full min-w-0">
        <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-xs border border-[#DCE0D4] flex flex-col gap-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EEF0E5] gap-2">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A1D15] font-medium tracking-tight">
                Asset Identity &amp; Specifications
              </h2>
              <p className="text-xs text-[#53574A] mt-0.5 leading-relaxed">
                Core serial identifiers, manufacturer taxonomy, and operational nomenclature.
              </p>
            </div>
            <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#1558C9]/10 text-[#1558C9] uppercase tracking-wider font-semibold border border-[#1558C9]/20">
              Required Fields *
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {/* Primary Asset Common Name */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="asset-name" className="text-xs font-semibold text-[#1A1D15] flex items-center gap-1">
                <span>Primary Asset Common Name</span>
                <span className="text-[#BA1A1A]">*</span>
              </label>
              <input
                id="asset-name"
                type="text"
                value={data.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder="e.g. Sony 4K Laser Projector"
                className={`w-full h-11 px-4 rounded-xl bg-white text-[#1A1D15] text-sm placeholder:text-[#8A8E80] border ${
                  errors.name ? "border-[#BA1A1A] ring-1 ring-[#BA1A1A]" : "border-[#DCE0D4]"
                } focus:outline-none focus:border-[#1558C9] focus:ring-2 focus:ring-[#1558C9]/20 transition-all shadow-2xs`}
              />
              {errors.name ? (
                <span className="text-xs text-[#BA1A1A] font-medium flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {errors.name}
                </span>
              ) : (
                <span className="text-[11px] text-[#737785]">
                  Clear technical naming recognized by staff and faculty technicians.
                </span>
              )}
            </div>

            {/* Full-Width Schema & Reserved ID Container (Fixes Previous Overlap) */}
            <div className="md:col-span-2 p-4 rounded-xl bg-[#F4F5EB] border border-[#DCE0D4] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-semibold text-[#53574A] flex items-center gap-1.5">
                  <Tag size={14} className="text-[#1558C9]" />
                  <span>Asset Identifier Provisioning</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#C5EA32] text-[#0A0C10] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1558C9] animate-pulse" />
                  Auto-Reserved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID Schema Select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="id-schema" className="text-[11px] font-mono uppercase font-semibold text-[#53574A]">
                    Schema Pattern <span className="text-[#BA1A1A]">*</span>
                  </label>
                  <select
                    id="id-schema"
                    value={data.idSchema}
                    onChange={(e) => handleSchemaChange(e.target.value as AssetIdSchemaOption)}
                    className="w-full h-11 px-3.5 rounded-xl bg-white text-[#1A1D15] font-mono text-xs border border-[#DCE0D4] focus:border-[#1558C9] focus:ring-2 focus:ring-[#1558C9]/20 focus:outline-none transition-all shadow-2xs cursor-pointer"
                  >
                    <option value="AST-[YYYY]-[AUTO]">AST-[YYYY]-[AUTO]</option>
                    <option value="AV-MED-[NUM]">AV-MED-[NUM]</option>
                    <option value="CAMPUS-TECH-[NUM]">CAMPUS-TECH-[NUM]</option>
                    <option value="CUSTOM">Custom Schema</option>
                  </select>
                </div>

                {/* Reserved Asset Identifier Preview */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reserved-id" className="text-[11px] font-mono uppercase font-semibold text-[#53574A]">
                    Reserved Asset Identifier
                  </label>
                  <div className="relative">
                    <input
                      id="reserved-id"
                      type="text"
                      disabled
                      value={data.reservedId}
                      className="w-full h-11 px-4 rounded-xl bg-[#EEF0E5] text-[#1A1D15] font-mono text-sm font-bold border border-[#DCE0D4] cursor-not-allowed select-all"
                      title="Reserved Asset Identifier Preview"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-600 font-semibold uppercase">
                      LOCKED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturer / OEM */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="asset-mfg" className="text-xs font-semibold text-[#1A1D15] flex items-center gap-1">
                <span>Manufacturer / OEM</span>
                <span className="text-[#BA1A1A]">*</span>
              </label>
              <input
                id="asset-mfg"
                type="text"
                value={data.manufacturer}
                onChange={(e) => onChange({ manufacturer: e.target.value })}
                placeholder="e.g. Sony Corporation"
                className={`w-full h-11 px-4 rounded-xl bg-white text-[#1A1D15] text-sm placeholder:text-[#8A8E80] border ${
                  errors.manufacturer ? "border-[#BA1A1A] ring-1 ring-[#BA1A1A]" : "border-[#DCE0D4]"
                } focus:outline-none focus:border-[#1558C9] focus:ring-2 focus:ring-[#1558C9]/20 transition-all shadow-2xs`}
              />
              {errors.manufacturer && (
                <span className="text-xs text-[#BA1A1A] font-medium flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {errors.manufacturer}
                </span>
              )}
            </div>

            {/* Model Number / Series */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="asset-model" className="text-xs font-semibold text-[#1A1D15] flex items-center gap-1">
                <span>Model Number / Series</span>
                <span className="text-[#BA1A1A]">*</span>
              </label>
              <input
                id="asset-model"
                type="text"
                value={data.model}
                onChange={(e) => onChange({ model: e.target.value })}
                placeholder="e.g. VPL-FHZ85"
                className={`w-full h-11 px-4 rounded-xl bg-white text-[#1A1D15] text-sm placeholder:text-[#8A8E80] border ${
                  errors.model ? "border-[#BA1A1A] ring-1 ring-[#BA1A1A]" : "border-[#DCE0D4]"
                } focus:outline-none focus:border-[#1558C9] focus:ring-2 focus:ring-[#1558C9]/20 transition-all shadow-2xs`}
              />
              {errors.model && (
                <span className="text-xs text-[#BA1A1A] font-medium flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {errors.model}
                </span>
              )}
            </div>

            {/* Serial Number (S/N) */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <div className="flex items-center justify-between">
                <label htmlFor="asset-sn" className="text-xs font-semibold text-[#1A1D15] flex items-center gap-1">
                  <span>Serial Number (S/N)</span>
                  <span className="text-[#BA1A1A]">*</span>
                </label>
                <span className="text-[10px] font-mono text-[#53574A] uppercase font-semibold">
                  Unique Hardware Serial
                </span>
              </div>
              <div className="relative">
                <input
                  id="asset-sn"
                  type="text"
                  value={data.serialNumber}
                  onChange={(e) => onChange({ serialNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g. SN-VPL-99824-KT"
                  className={`w-full h-11 pl-4 pr-10 rounded-xl bg-white text-[#1A1D15] font-mono text-sm uppercase placeholder:text-[#8A8E80] border ${
                    errors.serialNumber ? "border-[#BA1A1A] ring-1 ring-[#BA1A1A]" : "border-[#DCE0D4]"
                  } focus:outline-none focus:border-[#1558C9] focus:ring-2 focus:ring-[#1558C9]/20 transition-all shadow-2xs`}
                />
                {data.serialNumber.trim().length >= 4 && !errors.serialNumber && (
                  <span
                    title="Format verified"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-emerald-600"
                  >
                    <CheckCircle size={16} />
                  </span>
                )}
              </div>
              {errors.serialNumber && (
                <span className="text-xs text-[#BA1A1A] font-medium flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {errors.serialNumber}
                </span>
              )}
            </div>

            {/* Detailed Operational Description */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="asset-desc" className="text-xs font-semibold text-[#1A1D15]">
                Detailed Operational Description
              </label>
              <textarea
                id="asset-desc"
                rows={3}
                value={data.description}
                onChange={(e) => onChange({ description: e.target.value })}
                placeholder="High-output 7,300 lumens 3LCD laser installation projector mounted on heavy-duty ceiling bracket. Primary audio-visual feed for Turing Hall main theater lectures."
                className="w-full p-4 rounded-xl bg-white text-[#1A1D15] text-sm placeholder:text-[#8A8E80] border border-[#DCE0D4] focus:outline-none focus:border-[#1558C9] focus:ring-2 focus:ring-[#1558C9]/20 transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Telemetry & Tag Allocation (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6 w-full min-w-0">
        {/* Equipment Visual Proof Card */}
        <div className="p-6 rounded-2xl bg-white shadow-xs border border-[#DCE0D4] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1A1D15] font-mono uppercase tracking-wider">
              Equipment Visual Proof
            </span>
            <span className="font-mono text-[10px] text-[#334200] uppercase bg-[#C5EA32] border border-[#B5DC28] px-2 py-0.5 rounded-full font-bold">
              Verified Attachment
            </span>
          </div>

          {/* Image Container / Preview with Responsive Protection */}
          {data.photo ? (
            <div className="relative rounded-xl overflow-hidden bg-[#EEF0E5] group aspect-video border border-[#DCE0D4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.photo.url}
                alt="Equipment proof"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-[#030407]/85 backdrop-blur-md text-white flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-[11px] truncate flex-1">{data.photo.filename}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[#C5EA32]">{data.photo.size}</span>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-white/70 hover:text-white transition-colors cursor-pointer p-0.5"
                    title="Remove Photo"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-[#DCE0D4] bg-[#F4F5EB] p-6 text-center">
              <Camera size={26} className="text-[#737785] mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-[#1A1D15]">No photo attached yet</p>
              <p className="text-[11px] text-[#737785] mt-0.5">Upload a diagnostic image below</p>
            </div>
          )}

          {/* Add Diagnostic Photo Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.heic,.webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3 rounded-xl bg-[#F4F5EB] hover:bg-[#EEF0E5] border border-[#DCE0D4] flex items-center gap-3 cursor-pointer transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1558C9] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Camera size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#1A1D15] truncate">
                {data.photo ? "Replace Diagnostic Photo" : "Add Diagnostic Photo"}
              </span>
              <span className="text-[10px] text-[#737785]">PNG, JPG, HEIC up to 25MB</span>
            </div>
          </button>

          {/* OCR Telemetry Detection Widget */}
          <div className="p-3.5 rounded-xl bg-[#F4F5EB] flex flex-col gap-1.5 border border-[#DCE0D4]">
            <div className="flex items-center gap-1.5 text-[#334200]">
              <Sparkles size={15} className="text-[#1558C9]" />
              <span className="text-xs font-semibold font-mono">Optical OCR Extraction Active</span>
            </div>
            <p className="text-[11px] text-[#53574A] leading-relaxed">
              Nameplate extracted automatically: Serial number validated against institutional hardware catalog.
            </p>
          </div>
        </div>

        {/* Institution Tag Allocation Card */}
        <div className="p-5 rounded-2xl bg-[#F4F5EB] border border-[#DCE0D4] flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Radio size={13} className="text-[#1558C9]" />
              <span>Institution Tag Allocation</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">SYNCHRONIZED</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-[#E2E4DE]">
            <span className="text-[#53574A]">RFID Micro-transponder:</span>
            <span className="font-mono text-[#1558C9] font-bold">{data.rfidTag}</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-[#53574A]">Physical Barcode:</span>
            <span className="font-mono text-[#1A1D15] font-medium">{data.barcode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
