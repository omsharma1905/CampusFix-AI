"use client";

import React from "react";
import { X, QrCode, Printer, Copy, Check } from "lucide-react";
import { AssetRecord } from "./types";

interface QrPreviewModalProps {
  asset: AssetRecord | null;
  onClose: () => void;
  onPrint?: () => void;
}

export function QrPreviewModal({ asset, onClose, onPrint }: QrPreviewModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!asset) return null;

  const handleCopyTag = () => {
    navigator.clipboard?.writeText(asset.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E4DE] bg-white p-6 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E4DE] pb-3">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#1558C9] uppercase">
              ASSET IDENTIFICATION
            </span>
            <h3 className="font-serif text-xl font-normal text-[#030407]">
              Quick QR Tag Preview
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#73766C] hover:bg-[#F7F8EF]"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Physical Badge Mockup */}
        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E2E4DE] bg-[#F7F8EF] p-6 text-center">
          <div className="relative grid size-36 place-items-center rounded-lg bg-white p-2 shadow-sm border border-[#E2E4DE]">
            {/* Visual QR Pattern representation */}
            <QrCode size={120} className="text-[#030407]" />
            <span className="absolute bottom-1 right-1 rounded-xs bg-[#D4FF24] px-1 font-mono text-[8px] font-bold text-[#030407]">
              CF-TAG
            </span>
          </div>

          <div className="mt-3">
            <span className="font-mono text-base font-bold tracking-wider text-[#030407]">
              {asset.id}
            </span>
            <div className="font-sans text-xs font-semibold text-[#030407]">
              {asset.name}
            </div>
            <div className="font-mono text-[10px] text-[#73766C]">
              SN: {asset.serialNumber || "N/A"} • {asset.building}
            </div>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="mt-4 space-y-2 rounded-lg border border-[#E2E4DE] bg-[#F7F8EF]/50 p-3 text-xs">
          <div className="flex justify-between">
            <span className="text-[#73766C]">Location Space:</span>
            <span className="font-medium text-[#030407]">{asset.space}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#73766C]">Specification:</span>
            <span className="font-medium text-[#030407]">{asset.specification}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#73766C]">Label Spec:</span>
            <span className="font-mono text-[11px] text-[#1558C9]">Avery Industrial 2x1&quot; Polyester</span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#E2E4DE] pt-4">
          <button
            type="button"
            onClick={handleCopyTag}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2E4DE] bg-white px-3 py-2 font-sans text-xs font-semibold text-[#030407] transition hover:bg-[#F7F8EF]"
          >
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            <span>{copied ? "Copied ID" : "Copy Tag"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E2E4DE] px-3 py-2 font-sans text-xs font-semibold text-[#73766C] hover:bg-[#F7F8EF]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="flex items-center gap-1.5 rounded-lg bg-[#1558C9] px-4 py-2 font-sans text-xs font-bold text-white shadow-2xs hover:bg-[#0f44a0]"
            >
              <Printer size={14} />
              <span>Print Label</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
