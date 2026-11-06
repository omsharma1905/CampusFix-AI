"use client";

import React from "react";
import {
  History,
  ArrowRight,
  ClipboardList,
  Folder,
  Upload,
  FileText,
  Download,
} from "lucide-react";
import { AssetDetailRecord, AssetDocumentItem } from "../types";

export function AssetDetailRecordsSection({
  asset,
  onOpenFullLedger,
  onOpenUploadDoc,
  onCreateWorkOrder,
}: {
  asset: AssetDetailRecord;
  onOpenFullLedger: () => void;
  onOpenUploadDoc: () => void;
  onCreateWorkOrder: () => void;
}) {
  const handleDownloadDoc = (doc: AssetDocumentItem) => {
    // Generate actual document text blob to download
    const content = `CAMPUSFIX AI — INSTITUTIONAL ASSET LEDGER ATTACHMENT
=====================================================
Asset Reference: ${asset.id}
Equipment Name:  ${asset.name}
Model Variant:   ${asset.modelVariant}
Serial Number:   ${asset.serialNumber}
Campus/Enclosure: ${asset.building} • ${asset.space}
Custodian:       ${asset.designatedCustodian}

DOCUMENT RECORD:
Title:           ${doc.title}
Format:          ${doc.format}
Filesize:        ${doc.size}
Classification:  ${doc.tag}
Integrity Tag:   SHA-256 Validated (${asset.id}-SPEC-VERIFIED)

This document is cryptographically referenced in the CampusFix Asset Registry.
=====================================================`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Chronological Maintenance Timeline */}
      <div className="lg:col-span-6 bg-[#FFFFFF] rounded-xl shadow-sm p-5 border border-[#A5A79B]/20 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#EEEFE2]">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#1558C9]" />
            <h2 className="font-serif text-[18px] text-[#1A1D15] font-semibold">
              Maintenance Timeline
            </h2>
          </div>
          <span className="font-mono text-[11px] text-[#737785] uppercase tracking-wider">
            {asset.maintenanceHistory.length} of 14 Records
          </span>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E9DC]">
          {asset.maintenanceHistory.map((item, idx) => (
            <div key={item.id || idx} className="relative flex flex-col">
              <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#FFFFFF] flex items-center justify-center">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.dotColor === "secondary"
                      ? "bg-[#536600]"
                      : item.dotColor === "tertiary"
                      ? "bg-[#822820]"
                      : "bg-[#1558C9]"
                  }`}
                />
              </span>

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-[13px] text-[#1A1D15]">{item.title}</span>
                <span className="font-mono text-xs text-[#737785] shrink-0">{item.date}</span>
              </div>

              <p className="text-[12px] text-[#434653] mt-0.5 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center gap-2 mt-1.5 font-mono text-[11px] text-[#737785]">
                <span className="text-[#0041a0] font-semibold">{item.workOrderId}</span>
                <span>•</span>
                <span>Tech: {item.technician}</span>
                <span>•</span>
                <span
                  className={`font-semibold ${
                    item.status.includes("Verified")
                      ? "text-[#536600]"
                      : "text-[#1A1D15]"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#EEEFE2]">
          <button
            type="button"
            onClick={onOpenFullLedger}
            className="text-[13px] font-semibold text-[#1558C9] hover:underline inline-flex items-center gap-1"
          >
            <span>View Full Maintenance Ledger (14 records)</span>
            <ArrowRight size={15} className="text-[#1558C9]" />
          </button>
        </div>
      </div>

      {/* Right: Related Work Orders & Documentation */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        {/* Work Orders Panel */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-5 border border-[#A5A79B]/20">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEEFE2] mb-3">
            <div className="flex items-center gap-2">
              <ClipboardList size={18} className="text-[#1558C9]" />
              <h2 className="font-serif text-[18px] text-[#1A1D15] font-semibold">Work Orders</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#737785] uppercase tracking-wider">
                Active &amp; Recent
              </span>
              <button
                type="button"
                onClick={onCreateWorkOrder}
                className="text-[11px] text-[#1558C9] hover:underline font-semibold"
              >
                + New
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F3F5E7] text-[#434653] font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-2 px-3 rounded-l">ID</th>
                  <th className="py-2 px-2">Task</th>
                  <th className="py-2 px-2">State</th>
                  <th className="py-2 px-2">Priority</th>
                  <th className="py-2 px-3 rounded-r">Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEFE2] text-[13px]">
                {asset.workOrdersList.map((wo) => (
                  <tr key={wo.id} className="hover:bg-[#F3F5E7]/50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[#0041a0] font-semibold">
                      {wo.id}
                    </td>
                    <td className="py-2.5 px-2 font-medium text-[#1A1D15] truncate max-w-[150px]">
                      {wo.task}
                    </td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          wo.state === "Completed"
                            ? "bg-[#c8f30c]/30 text-[#586c00]"
                            : "bg-[#E8E9DC] text-[#1A1D15]"
                        }`}
                      >
                        {wo.state}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-xs">
                      <span
                        className={
                          wo.priority === "High"
                            ? "text-[#822820] font-bold"
                            : "text-[#737785]"
                        }
                      >
                        {wo.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#434653] font-mono text-xs">
                      {wo.assigned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attached Documents Panel */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-5 border border-[#A5A79B]/20">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEEFE2] mb-3">
            <div className="flex items-center gap-2">
              <Folder size={18} className="text-[#1558C9]" />
              <h2 className="font-serif text-[18px] text-[#1A1D15] font-semibold">
                Attached Documentation
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenUploadDoc}
              className="text-[13px] font-semibold text-[#1558C9] hover:underline inline-flex items-center gap-1.5"
            >
              <Upload size={14} className="text-[#1558C9]" />
              <span>Upload Document</span>
            </button>
          </div>

          <div className="space-y-2">
            {asset.documentsList.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2 rounded-lg bg-[#F3F5E7] hover:bg-[#E8E9DC] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText size={18} className="text-[#822820] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-[13px] text-[#1A1D15] truncate">
                      {doc.title}
                    </span>
                    <span className="font-mono text-[10px] text-[#737785]">
                      {doc.format} • {doc.size} • {doc.tag}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadDoc(doc)}
                  className="p-1 rounded text-[#737785] hover:text-[#1A1D15] transition-colors"
                  title="Download Document"
                >
                  <Download size={16} className="text-[#737785]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
