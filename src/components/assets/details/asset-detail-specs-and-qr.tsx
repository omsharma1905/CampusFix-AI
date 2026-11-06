"use client";

import React, { useState } from "react";
import { ZoomIn, Printer, Copy, Check, Sliders, Building2 } from "lucide-react";
import { AssetDetailRecord } from "../types";
import { AssetQrSvg, printAssetTag } from "./asset-detail-qr";

export function AssetDetailSpecsAndQr({
  asset,
  onInspectFrame,
}: {
  asset: AssetDetailRecord;
  onInspectFrame: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleBatchCopy = () => {
    const payload = `${asset.id} | ${asset.name} | SN: ${asset.serialNumber} | Loc: ${asset.location || `${asset.building} • ${asset.space}`} | Custodian: ${asset.designatedCustodian}`;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    printAssetTag(asset);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Asset Visual & QR Identification Card */}
      <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl shadow-sm p-4 border border-[#A5A79B]/20 flex flex-col gap-4">
        {/* Visual Container with Tag Overlay */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#F3F5E7] flex items-center justify-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.imageUrl}
            alt={asset.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-black/75 backdrop-blur-sm text-white font-mono text-[11px] flex items-center gap-1.5 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24]" />
            <span>
              {asset.id} | {asset.modelVariant.split("/")[0].trim()}
            </span>
          </div>

          <button
            type="button"
            onClick={onInspectFrame}
            className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-white/90 hover:bg-white text-[#1A1D15] font-semibold text-[12px] flex items-center gap-1.5 shadow-sm backdrop-blur transition-all"
          >
            <ZoomIn size={14} className="text-[#1A1D15]" />
            <span>Inspect Frame</span>
          </button>
        </div>

        {/* Quick Identification Strip */}
        <div className="bg-[#F3F5E7] rounded-lg p-3 flex items-center gap-3">
          <div className="w-16 h-16 shrink-0 rounded bg-white p-1 shadow-sm flex items-center justify-center">
            <AssetQrSvg payload={asset.qrPayload || asset.id} size={56} />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-semibold text-[13px] text-[#1A1D15] truncate">
                Physical Asset Tag
              </span>
              <span className="font-mono text-[10px] text-[#586c00] bg-[#c8f30c]/30 border border-[#c8f30c] px-1.5 py-0.5 rounded font-semibold uppercase">
                Encrypted
              </span>
            </div>
            <p className="text-[11px] text-[#434653] truncate">
              Tag: Active • SHA-256 Verified
            </p>
            <p className="text-[11px] text-[#737785] truncate">
              Last Scanned: {asset.qrLastScanned}
            </p>
            <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-[#E8E9DC]">
              <button
                type="button"
                onClick={handlePrint}
                className="font-semibold text-[#1558C9] text-[12px] hover:underline inline-flex items-center gap-1"
              >
                <Printer size={13} className="text-[#1558C9]" />
                <span>Print Tag</span>
              </button>
              <span className="text-[#C3C6D6] font-mono text-xs">•</span>
              <button
                type="button"
                onClick={handleBatchCopy}
                className="font-semibold text-[#1558C9] text-[12px] hover:underline inline-flex items-center gap-1"
              >
                {copied ? (
                  <Check size={13} className="text-[#536600]" />
                ) : (
                  <Copy size={13} className="text-[#1558C9]" />
                )}
                <span>{copied ? "Copied!" : "Batch Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Operational Specs & Ownership Breakdown */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Specs Tile */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-5 border border-[#A5A79B]/20">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EEEFE2]">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-[#1558C9]" />
              <h2 className="font-serif text-[18px] text-[#1A1D15] font-semibold">
                Equipment Specifications
              </h2>
            </div>
            <span className="font-mono text-[11px] text-[#737785] uppercase tracking-wider">
              Hardware Telemetry Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Manufacturer
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.manufacturer}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Model Variant
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.modelVariant}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Serial Number
              </span>
              <span className="font-mono text-[14px] text-[#1A1D15] font-semibold mt-0.5">
                {asset.serialNumber}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Optical Source
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.opticalSource}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Native Resolution
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.nativeResolution}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Brightness Rating
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.brightnessRating}
              </span>
            </div>

            <div className="flex flex-col sm:col-span-2">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Nominal Power Draw
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[14px] text-[#1A1D15] font-medium">
                  {asset.nominalPowerDraw}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#EEEFE2] text-[#434653] font-mono text-[11px]">
                  Standby: {asset.standbyPower}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ownership & Allocation Tile */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-5 border border-[#A5A79B]/20">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EEEFE2]">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-[#1558C9]" />
              <h2 className="font-serif text-[18px] text-[#1A1D15] font-semibold">
                Location &amp; Custodianship
              </h2>
            </div>
            <span className="font-mono text-[11px] text-[#737785] uppercase tracking-wider">
              Asset Registry Node
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Institution / Campus
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.institution}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Precise Enclosure
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.preciseEnclosure}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Academic Department
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.department}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Designated Custodian
              </span>
              <span className="text-[14px] text-[#1A1D15] font-medium mt-0.5">
                {asset.designatedCustodian}
              </span>
            </div>

            <div className="flex flex-col sm:col-span-2">
              <span className="text-[11px] text-[#737785] uppercase tracking-wider font-semibold">
                Field Support Dispatch
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-[14px] text-[#1A1D15] font-medium">
                  {asset.fieldSupportSquad}
                </span>
                <span className="text-[#C3C6D6] font-mono text-xs">•</span>
                <span className="text-[13px] text-[#737785]">
                  Primary Contact: {asset.primaryContact}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
