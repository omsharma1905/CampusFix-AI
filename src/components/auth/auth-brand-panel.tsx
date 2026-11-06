"use client";

import React from "react";
import Image from "next/image";
import { Cpu, ShieldCheck, RefreshCw, Activity, Network } from "lucide-react";

export function AuthBrandPanel() {
  return (
    <div className="flex flex-col justify-between space-y-6">
      <div>
        {/* Pill Overline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8f30c]/20 text-[#c8f30c] text-[11px] font-mono tracking-wider uppercase mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
          NEXT-GENERATION INSTITUTIONAL INTELLIGENCE
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#f0f2e4] tracking-tight leading-[1.12]">
          Start building your
          <br />
          <span className="italic text-[#c8f30c]">connected campus.</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-4 font-sans text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed font-light">
          Intelligent operations from day one. Join facility directors, technicians, and campus engineers orchestrating high-density physical assets, proactive maintenance workflows, and spatial telemetry automation.
        </p>
      </div>

      {/* Integrated Campus Infrastructure Telemetry View */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black/80 shadow-inner group border border-white/10">
        {/* Live Telemetry Overlays */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded bg-[#262a22]/90 backdrop-blur-md font-mono text-xs text-[#c8f30c] shadow-sm border border-white/10">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c8f30c] animate-ping" />
          <span>SMART-GRID 29G-A625 // LATENCY: 2.1ms</span>
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#262a22]/90 backdrop-blur-md font-mono text-[11px] text-white shadow-sm border border-white/10">
          <Network size={13} className="text-blue-400" />
          <span>QUAD_SEC_BOUND :: ACTIVE</span>
        </div>

        {/* Architectural Visual Asset */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src="/images/hero-campus-isometric.jpg"
            alt="Photorealistic 3D architectural digital twin of a university research campus"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262a22] via-transparent to-[#262a22]/40 pointer-events-none" />
        </div>

        {/* Micro Sensor Status Strip */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-[#262a22]/95 backdrop-blur-md flex items-center justify-between text-zinc-300 font-mono text-xs border-t border-white/10">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#c8f30c]" />
            <span>1,420 ACTIVE IOT SENSORS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-200">PEAK EFFICIENCY</span>
            <span className="px-1.5 py-0.5 rounded bg-[#c8f30c]/20 text-[#c8f30c] text-[11px] font-bold">
              99.4%
            </span>
          </div>
        </div>
      </div>

      {/* Telemetry Triad Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[#c8f30c] mb-1">
            <Cpu size={15} />
            <span className="font-sans font-semibold text-xs text-white">Self-Service</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            Automated schema mapping &amp; spatial telemetry sync.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[#c8f30c] mb-1">
            <ShieldCheck size={15} />
            <span className="font-sans font-semibold text-xs text-white">Unified Tiers</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            Institutional credential role delegation &amp; audit rails.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[#c8f30c] mb-1">
            <RefreshCw size={15} />
            <span className="font-sans font-semibold text-xs text-white">SSO Sync</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            EduPass, InCommon, Okta &amp; SAML 2.0 enclaves.
          </p>
        </div>
      </div>

      {/* Compliance Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 font-mono text-[11px] text-zinc-400 border-t border-white/10 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
          Intelligent infrastructure. Better campus operations.
        </span>
        <span className="text-zinc-400 font-mono">ISO-55001 • SOC2 TYPE II</span>
      </div>
    </div>
  );
}
