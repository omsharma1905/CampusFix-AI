"use client";

import React from "react";
import { X, Printer, CheckCircle } from "lucide-react";
import { Step01BasicInfoData } from "./register-types";
import { AssetQrSvg } from "../details/asset-detail-qr";

interface TagPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Step01BasicInfoData;
}

export function TagPreviewModal({ isOpen, onClose, data }: TagPreviewModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=500,height=500");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview Tag - ${data.reservedId}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 24px; text-align: center; }
            .card { width: 320px; margin: 0 auto; border: 2px dashed #030407; border-radius: 8px; padding: 16px; }
            .watermark { font-size: 10px; color: #822820; font-weight: bold; margin-bottom: 8px; }
            .id { font-size: 20px; font-weight: 800; font-family: monospace; color: #1558c9; }
            .name { font-size: 13px; font-weight: 600; margin: 6px 0; }
            .meta { font-size: 11px; color: #737785; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="watermark">[ PROVISIONAL PREVIEW TAG • PENDING SUBMISSION ]</div>
            <div class="id">${data.reservedId}</div>
            <div class="name">${data.name || "Untitled Asset"}</div>
            <div class="meta">S/N: ${data.serialNumber || "N/A"} • ${data.manufacturer}</div>
            <div class="meta">RFID: ${data.rfidTag}</div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E8E9DC] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E9DC] bg-[#f3f5e7]/50">
          <div>
            <span className="font-mono text-[10px] text-[#822820] font-bold tracking-wider uppercase">
              Provisional Verification
            </span>
            <h3 className="font-serif text-lg text-[#1A1D15] font-semibold">Provisional Asset Tag</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737785] hover:text-[#1A1D15] hover:bg-[#E8E9DC]/50 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-full p-4 rounded-xl border-2 border-dashed border-[#1558C9]/40 bg-[#f3f5e7]/30 flex flex-col items-center relative overflow-hidden">
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#dae2ff] text-[#00419f] font-mono text-[9px] font-bold tracking-wider uppercase">
              Draft ID
            </span>

            <div className="font-mono text-2xl font-black text-[#1558C9] tracking-wider mt-2">
              {data.reservedId}
            </div>
            <div className="font-sans text-sm font-semibold text-[#1A1D15] mt-1 max-w-xs truncate">
              {data.name || "Untitled Asset"}
            </div>
            <div className="font-mono text-xs text-[#737785] mt-0.5">
              S/N: {data.serialNumber || "PENDING"} · {data.manufacturer || "OEM UNSET"}
            </div>

            {/* QR Mock */}
            <div className="my-4 p-2 bg-white rounded-lg border border-[#E8E9DC] shadow-xs">
              <AssetQrSvg payload={`CF://ASSET/DRAFT/${data.reservedId}`} size={120} />
            </div>

            <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#737785] border-t border-[#E8E9DC] pt-3 px-2">
              <span>RFID: {data.rfidTag || "AUTO"}</span>
              <span className="flex items-center gap-1 text-[#536600]">
                <CheckCircle size={12} />
                <span>Format Verified</span>
              </span>
            </div>
          </div>

          <p className="font-sans text-xs text-[#434653] leading-relaxed">
            This tag is temporary and serves for pre-installation staging. Upon Step 06 final
            submission, a cryptographically signed permanent tag with official QR transponder will
            be minted.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f3f5e7]/50 border-t border-[#E8E9DC] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#434653] hover:bg-[#E8E9DC]/60 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#030407] text-white hover:bg-[#1558c9] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer size={14} />
            <span>Print Staging Tag</span>
          </button>
        </div>
      </div>
    </div>
  );
}

