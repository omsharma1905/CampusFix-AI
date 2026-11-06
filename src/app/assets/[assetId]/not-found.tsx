import React from "react";
import Link from "next/link";
import { PackageX, ArrowLeft } from "lucide-react";

export default function AssetNotFound() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#ffdad5] text-[#822820] flex items-center justify-center mb-4">
        <PackageX size={32} />
      </div>

      <span className="font-mono text-xs text-[#737785] tracking-wider uppercase font-semibold">
        Registry Lookup Error
      </span>
      <h1 className="font-serif text-3xl font-semibold text-[#1A1D15] mt-1 mb-2">
        Asset Record Not Found
      </h1>
      <p className="max-w-md text-sm text-[#434653] mb-6 leading-relaxed">
        The requested asset identifier could not be verified across the institutional registry ledger.
        It may have been decommissioned, re-indexed, or entered incorrectly.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/assets"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1558C9] text-white text-xs font-semibold shadow-sm hover:bg-[#0041a0] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Return to Asset Registry</span>
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#A5A79B]/40 text-[#1A1D15] text-xs font-semibold shadow-sm hover:bg-[#F3F5E7] transition-colors"
        >
          <span>Operations Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
