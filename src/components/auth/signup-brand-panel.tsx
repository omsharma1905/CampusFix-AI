"use client";

import React from "react";
import Image from "next/image";
import { Cpu, ShieldCheck, RefreshCw } from "lucide-react";

export function SignupBrandPanel() {
  return (
    <div className="flex flex-col justify-between space-y-6">
      <div>
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] text-[#c8f30c] font-mono text-[11px] uppercase tracking-wider mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
          WORKSPACE ONBOARDING
        </div>

        {/* Editorial Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-[1.12]">
          Start building your <br />
          <span className="italic text-[#c8f30c]">connected campus.</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-lg font-light">
          <span className="italic text-white font-medium">Intelligent operations from day one.</span>{" "}
          Join facility directors, technicians, and campus engineers orchestrating high-density physical assets, proactive maintenance workflows, and spatial telemetry automation across global facilities.
        </p>

        {/* Interactive Campus Visual Container */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black/80 shadow-inner group border border-white/10 mt-6">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src="/images/hero-campus-isometric.jpg"
              alt="3D isometric high-density campus digital twin schematic with glowing electrical routing and data nodes"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#262a22] via-transparent to-[#262a22]/40 pointer-events-none" />

            {/* Top Left: Latency overlay */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#262a22]/90 backdrop-blur-md font-mono text-[11px] text-[#c8f30c] shadow-sm border border-white/10">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c8f30c] animate-ping" />
              <span>SMART-GRID 29G-A625 // LATENCY: 2.1ms</span>
            </div>

            {/* Bottom Right: Security bound */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1558c9] text-white font-mono text-[11px] font-medium tracking-wider shadow-sm">
              <span>QUAD_SEC_BOUND :: ACTIVE</span>
            </div>

            {/* Bottom Left: Spatial Node */}
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 font-sans text-xs font-semibold text-white drop-shadow-md">
              <span className="text-[#c8f30c] text-sm">◈</span>
              <span>Spatial Node 44-B (Research Quad)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Triad Badges */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[#c8f30c] mb-1">
            <Cpu size={14} />
            <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">Self-Service</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            Automated schema mapping &amp; telemetry pipelines
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[#dae2ff] mb-1">
            <ShieldCheck size={14} />
            <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">Credentials</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            Verified member tier with strict identity governance
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[#afd500] mb-1">
            <RefreshCw size={14} />
            <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">Directory</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            EduPass, InCommon &amp; SAML 2.0 federated sync
          </p>
        </div>
      </div>

      {/* Infrastructure Cert Stamp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 font-mono text-[11px] text-zinc-400 border-t border-white/10 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
          <span>Intelligent infrastructure. Better campus operations.</span>
        </span>
        <span className="text-zinc-400 font-mono">ISO-55001 COMPLIANT</span>
      </div>
    </div>
  );
}
