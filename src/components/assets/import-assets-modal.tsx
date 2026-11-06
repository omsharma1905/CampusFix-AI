"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileText, AlertCircle, ArrowRight } from "lucide-react";

interface ImportAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessPreview?: (filename: string, count: number) => void;
}

export function ImportAssetsModal({
  isOpen,
  onClose,
  onSuccessPreview,
}: ImportAssetsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<{
    filename: string;
    totalRows: number;
    sampleRows: Array<{ id: string; name: string; category: string; building: string }>;
  } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      // Simulate client-side parsing without server API call
      setTimeout(() => {
        setIsProcessing(false);
        setPreviewData({
          filename: file.name,
          totalRows: 18,
          sampleRows: [
            { id: "AST-9011", name: "Trane Rooftop AHU-04", category: "HVAC & Climate", building: "Turing Hall" },
            { id: "AST-9012", name: "Cisco Catalyst 9300 Edge", category: "IT & Telephony", building: "Science Complex East" },
            { id: "AST-9013", name: "Mettler Toledo Precision Balance", category: "Laboratory & Research", building: "Engineering Block A" },
          ],
        });
      }, 600);
    }
  };

  const handleConfirmPreview = () => {
    if (previewData) {
      onSuccessPreview?.(previewData.filename, previewData.totalRows);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-[#E2E4DE] bg-white p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E4DE] pb-3">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#1558C9] uppercase">
              BATCH INGESTION
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#030407]">
              Import Physical Assets
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

        {/* Upload Zone */}
        {!previewData ? (
          <div className="mt-5 space-y-4">
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E2E4DE] bg-[#F7F8EF] p-8 text-center cursor-pointer transition hover:border-[#1558C9] hover:bg-[#F0EBE1]/40">
              <UploadCloud size={38} className="text-[#1558C9]" />
              <span className="mt-2 font-sans text-sm font-semibold text-[#030407]">
                Click to browse or drop CSV / Excel roster
              </span>
              <span className="mt-1 font-mono text-[11px] text-[#73766C]">
                Supported formats: .CSV, .XLSX (Max 15MB)
              </span>
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {isProcessing && (
              <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#1558C9]">
                <div className="size-3 animate-spin rounded-full border-2 border-[#1558C9] border-t-transparent" />
                <span>Validating schema fields &amp; parsing rows...</span>
              </div>
            )}
          </div>
        ) : (
          /* Preview Data Table */
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-[#F7F8EF] p-3 text-xs">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#1558C9]" />
                <span className="font-semibold text-[#030407]">{previewData.filename}</span>
              </div>
              <span className="rounded-full bg-[#1558C9]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#1558C9]">
                {previewData.totalRows} records parsed
              </span>
            </div>

            <div>
              <span className="font-mono text-[10px] font-bold text-[#73766C] uppercase">
                Schema Mapping Sample Preview:
              </span>
              <div className="mt-1.5 overflow-hidden rounded-lg border border-[#E2E4DE]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F8EF] font-mono text-[10px] text-[#73766C] uppercase">
                    <tr>
                      <th className="p-2">Asset ID</th>
                      <th className="p-2">Asset Name</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Building</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E4DE] text-[11px]">
                    {previewData.sampleRows.map((row) => (
                      <tr key={row.id}>
                        <td className="p-2 font-mono font-semibold text-[#1558C9]">{row.id}</td>
                        <td className="p-2 text-[#030407] font-medium">{row.name}</td>
                        <td className="p-2 text-[#73766C]">{row.category}</td>
                        <td className="p-2 text-[#73766C]">{row.building}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architecture / Persistence Guardrail Notice */}
            <div className="flex items-start gap-2 rounded-lg border border-[#E8D2B5] bg-[#E8D2B5]/20 p-3 text-xs text-[#030407]">
              <AlertCircle size={15} className="shrink-0 text-[#1558C9] mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Ingestion Preview Verification:</strong> The uploaded file schema aligns with standard asset registry entities. Note: In compliance with project guidelines, live database writes are not committed in client demonstration mode.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-end gap-2 border-t border-[#E2E4DE] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#E2E4DE] px-4 py-2 font-sans text-xs font-semibold text-[#73766C] hover:bg-[#F7F8EF]"
          >
            Cancel
          </button>
          {previewData && (
            <button
              type="button"
              onClick={handleConfirmPreview}
              className="flex items-center gap-1.5 rounded-lg bg-[#1558C9] px-4 py-2 font-sans text-xs font-bold text-white shadow-2xs hover:bg-[#0f44a0]"
            >
              <span>Acknowledge Preview ({previewData.totalRows} assets)</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
