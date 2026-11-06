"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  QrCode,
  MapPin,
  Pencil,
  PlusCircle,
  MoreVertical,
  ArrowLeftRight,
  RefreshCw,
  ShieldCheck,
  Archive,
} from "lucide-react";
import { AssetDetailRecord } from "../types";

export function AssetDetailHeader({
  asset,
  onDownloadQr,
  onEditAsset,
  onCreateWorkOrder,
  onOpenAuditLog,
  onRetireAsset,
}: {
  asset: AssetDetailRecord;
  onDownloadQr: () => void;
  onEditAsset: () => void;
  onCreateWorkOrder: () => void;
  onOpenAuditLog: () => void;
  onRetireAsset: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getConditionBadge = () => {
    switch (asset.condition) {
      case "Healthy":
      case "Operational":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c8f30c]/20 text-[#1A1D15] font-semibold text-[11px] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#536600]"></span>
            {asset.condition === "Operational" ? "Operational" : "Healthy"}
          </span>
        );
      case "Maintenance Required":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdad5] text-[#822820] font-semibold text-[11px] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#822820]"></span>
            Maintenance Required
          </span>
        );
      case "Critical":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-semibold text-[11px] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
            Critical Alert
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E2E4D6] text-[#1A1D15] font-semibold text-[11px] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#737785]"></span>
            {asset.condition}
          </span>
        );
    }
  };

  return (
    <div className="bg-[#FFFFFF] px-6 py-4 shadow-sm border-b border-[#EEF0E5] flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-[#434653] mb-1">
          <Link href="/dashboard" className="hover:text-[#0041a0] transition-colors">
            Asset Management
          </Link>
          <span className="text-[#C3C6D6] font-mono text-xs">/</span>
          <Link href="/assets" className="hover:text-[#0041a0] transition-colors">
            Asset Registry
          </Link>
          <span className="text-[#C3C6D6] font-mono text-xs">/</span>
          <span className="font-mono font-medium text-[#1A1D15]">{asset.id}</span>
        </nav>

        {/* Title & Badges Row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h1 className="font-serif text-[24px] text-[#1A1D15] tracking-tight leading-tight">
            {asset.name}
          </h1>
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Asset ID Badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8E9DC] text-[#1A1D15] font-mono text-[12px] font-medium">
              <QrCode size={12} className="text-[#737785]" />
              {asset.id}
            </span>

            {/* Category */}
            <span className="px-2 py-0.5 rounded bg-[#EEEFE2] text-[#434653] text-[12px]">
              {asset.category}
            </span>

            {/* Status */}
            {getConditionBadge()}

            {/* Location */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EEEFE2] text-[#434653] text-[12px]">
              <MapPin size={13} className="text-[#737785]" />
              {asset.location || `${asset.building} • ${asset.space}`}
            </span>

            {/* Criticality */}
            <span className="px-2 py-0.5 rounded bg-[#A13F35]/15 text-[#822820] text-[11px] font-semibold tracking-wide">
              {asset.criticality}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center gap-2 self-start md:self-auto shrink-0 pt-1 md:pt-0">
        <button
          type="button"
          onClick={onDownloadQr}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3F5E7] text-[#1A1D15] hover:bg-[#E8E9DC] transition-colors text-[13px] font-medium shadow-sm"
        >
          <QrCode size={15} className="text-[#434653]" />
          <span>Download QR</span>
        </button>

        <button
          type="button"
          onClick={onEditAsset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3F5E7] text-[#1A1D15] hover:bg-[#E8E9DC] transition-colors text-[13px] font-medium shadow-sm"
        >
          <Pencil size={15} className="text-[#434653]" />
          <span>Edit Asset</span>
        </button>

        <button
          type="button"
          onClick={onCreateWorkOrder}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1558C9] text-white hover:bg-[#0041a0] transition-colors text-[13px] font-semibold shadow-md"
        >
          <PlusCircle size={16} className="text-white" />
          <span>Create Work Order</span>
        </button>

        {/* Dropdown Menu */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            type="button"
            aria-label="More actions"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1.5 rounded-lg bg-[#F3F5E7] text-[#434653] hover:bg-[#E8E9DC] hover:text-[#1A1D15] transition-colors shadow-sm"
          >
            <MoreVertical size={18} className="text-[#434653]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-[#A5A79B]/30 p-1 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onEditAsset();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded text-[13px] text-[#1A1D15] hover:bg-[#F3F5E7] transition-colors text-left"
              >
                <ArrowLeftRight size={15} className="text-[#737785]" />
                Transfer Asset
              </button>

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onEditAsset();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded text-[13px] text-[#1A1D15] hover:bg-[#F3F5E7] transition-colors text-left"
              >
                <RefreshCw size={15} className="text-[#737785]" />
                Update Status
              </button>

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenAuditLog();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded text-[13px] text-[#1A1D15] hover:bg-[#F3F5E7] transition-colors text-left"
              >
                <ShieldCheck size={15} className="text-[#737785]" />
                View Audit History
              </button>

              <div className="h-px bg-[#EEEFE2] my-1" />

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onRetireAsset();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded text-[13px] text-[#822820] hover:bg-[#ffdad6]/40 transition-colors text-left"
              >
                <Archive size={15} className="text-[#822820]" />
                Retire Asset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
