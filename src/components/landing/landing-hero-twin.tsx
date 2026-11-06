"use client";

import React from "react";
import Image from "next/image";
import { Radio, Cpu, Wrench, Layers } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingHeroTwin() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full h-[380px] sm:h-[460px] md:h-[500px] lg:h-[530px] xl:h-[560px] rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-all duration-500 group ${
        isDark
          ? "bg-[#050811] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(21,88,201,0.25)]"
          : "bg-white border-[#E2E4DE] shadow-[0_20px_50px_rgba(3,4,7,0.08)]"
      }`}
    >
      {/* Primary Futuristic Campus Isometric Visual */}
      <div className="relative w-full h-full select-none">
        <Image
          src="/images/hero-campus-isometric.jpg"
          alt="CampusFix AI Futuristic Isometric Campus Infrastructure Visual"
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority
          className="object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Masks for Seamless Edge Integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/90 via-[#030407]/20 to-[#030407]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030407]/60 via-transparent to-[#030407]/40 pointer-events-none" />

        {/* Subtle Technical Grid Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#1558C9 1px, transparent 1px), radial-gradient(#C5EA32 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />
      </div>

      {/* Top Cockpit Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div
          className={`px-3 py-1.5 rounded-xl flex items-center gap-2.5 text-[11px] font-mono border backdrop-blur-md shadow-md ${
            isDark
              ? "bg-[#030407]/85 border-white/15 text-white"
              : "bg-white/90 border-[#E2E4DE] text-[#1A1D15]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#C5EA32] animate-pulse" />
          <span className="font-semibold tracking-wider">CAMPUS TWIN : LIVE</span>
          <span className={isDark ? "text-[#737785]" : "text-[#8A90A2]"}>
            {"// US-NE-CAM-889"}
          </span>
        </div>

        <div
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono border backdrop-blur-md shadow-md ${
            isDark
              ? "bg-[#030407]/85 border-white/15 text-[#A5A79B]"
              : "bg-white/90 border-[#E2E4DE] text-[#5E6270]"
          }`}
        >
          <Radio size={13} className="text-[#1558C9] animate-pulse" />
          <span>7 ACTIVE SECTORS</span>
        </div>
      </div>

      {/* ================= CONTEXTUAL FLOATING TELEMETRY LABELS ================= */}

      {/* Floating Element 1: Campus Asset Network (Top-Right / Center-Right) */}
      <div
        className="absolute top-16 right-4 sm:right-6 z-20 pointer-events-none animate-in fade-in duration-500"
        style={{ animationDelay: "200ms" }}
      >
        <div className="px-3.5 py-2.5 rounded-xl bg-[#030407]/85 backdrop-blur-md border border-white/15 shadow-xl max-w-[210px] transition-transform hover:scale-105 pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1558C9] shadow-[0_0_8px_#1558C9]" />
            <span className="font-mono text-[10px] uppercase font-bold text-[#A5A79B] tracking-wider">
              Asset Layer
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={13} className="text-[#1558C9] shrink-0" />
            <span className="font-mono text-xs font-semibold text-white tracking-tight">
              Campus Asset Network
            </span>
          </div>
          <div className="mt-1 text-[10px] font-mono text-[#C5EA32] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
            <span>Digital Twin Synced</span>
          </div>
        </div>
      </div>

      {/* Floating Element 2: Maintenance Node (Center-Left / Mid-Left) */}
      <div
        className="absolute bottom-24 left-4 sm:left-6 z-20 pointer-events-none animate-in fade-in duration-500"
        style={{ animationDelay: "400ms" }}
      >
        <div className="px-3.5 py-2.5 rounded-xl bg-[#030407]/85 backdrop-blur-md border border-white/15 border-l-3 border-l-[#C5EA32] shadow-xl max-w-[220px] transition-transform hover:scale-105 pointer-events-auto">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5EA32] animate-pulse" />
              <span className="font-mono text-[10px] uppercase font-bold text-[#C5EA32] tracking-wider">
                Telemetry Node
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#A5A79B] px-1 rounded bg-white/10">
              SECTOR 04
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wrench size={13} className="text-[#C5EA32] shrink-0" />
            <span className="font-mono text-xs font-semibold text-white tracking-tight">
              Maintenance Node
            </span>
          </div>
          <div className="mt-1 text-[10px] font-mono text-[#A5A79B]">
            Automated Protocol Ready
          </div>
        </div>
      </div>

      {/* Floating Element 3: Campus Infrastructure (Bottom-Right) */}
      <div
        className="absolute bottom-4 right-4 sm:right-6 z-20 pointer-events-none animate-in fade-in duration-500"
        style={{ animationDelay: "600ms" }}
      >
        <div className="px-3.5 py-2.5 rounded-xl bg-[#030407]/85 backdrop-blur-md border border-white/15 shadow-xl max-w-[220px] transition-transform hover:scale-105 pointer-events-auto">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#A5A79B] tracking-wider">
              Central Grid
            </span>
            <span className="font-mono text-[10px] font-bold text-[#C5EA32]">
              99.8% NOMINAL
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu size={13} className="text-[#1558C9] shrink-0" />
            <span className="font-mono text-xs font-semibold text-white tracking-tight">
              Campus Infrastructure
            </span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#C5EA32] h-full rounded-full" style={{ width: "99.8%" }} />
          </div>
        </div>
      </div>

      {/* Subtle Bottom-Left Coordinate Watermark */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 text-[10px] font-mono text-[#737785] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1558C9]" />
        <span>APEX SPATIAL TELEMETRY · 3D TWIN ENGINE</span>
      </div>
    </div>
  );
}
