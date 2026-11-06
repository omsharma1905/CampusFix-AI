"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowUp, ShieldCheck, Activity } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingFooter() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      className={`w-full border-t transition-colors duration-300 relative overflow-hidden ${
        isDark
          ? "bg-[#020306] border-white/10 text-[#A5A79B]"
          : "bg-[#F7F8F0] border-[#DCE0D4] text-[#53574A]"
      }`}
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-12 flex flex-col gap-16 relative z-10">
        {/* Upper Footer: Brand Info on Left, Multi-Column Links on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Info & Mission Statement (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${
                    isDark
                      ? "bg-white/10 text-[#C5EA32] border border-white/15"
                      : "bg-[#030407] text-[#C5EA32]"
                  }`}
                >
                  <Layers size={17} strokeWidth={2.5} />
                </div>
                <span
                  className={`font-serif text-xl tracking-tight font-medium ${
                    isDark ? "text-white" : "text-[#1A1D15]"
                  }`}
                >
                  CampusFix AI
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C5EA32]/15 text-[#3D4C00] dark:text-[#C5EA32] font-bold border border-[#C5EA32]/30">
                  ENTERPRISE OS
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm font-light leading-relaxed max-w-sm ${
                  isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                }`}
              >
                Autonomous physical infrastructure intelligence, spatial telemetry, and closed-loop dispatch protocols for higher education and research campuses.
              </p>
            </div>

            {/* Operational Telemetry Badge */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5EA32]/15 text-[#3D4C00] dark:text-[#C5EA32]">
                <Activity size={12} className="animate-pulse" />
              </span>
              <span className="text-[11px] font-semibold text-[#1558C9] dark:text-[#C5EA32]">
                ALL TELEMETRY MESH NODES NOMINAL
              </span>
            </div>
          </div>

          {/* Right Columns: Platform, Workspaces, Security & Governance (Cols 5-12) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Platform */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span
                className={`text-[11px] font-semibold tracking-wider uppercase ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Platform
              </span>
              <div className="flex flex-col gap-2 font-normal text-[11px]">
                <a href="#hero" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Spatial Twin
                </a>
                <a href="#connected-campus" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Campus Continuum
                </a>
                <a href="#how-it-works" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Resolution Protocol
                </a>
                <a href="#capabilities" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Core Capabilities
                </a>
                <a href="#intelligence" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Predictive Diagnostics
                </a>
              </div>
            </div>

            {/* Column 2: Workspaces */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span
                className={`text-[11px] font-semibold tracking-wider uppercase ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Workspaces
              </span>
              <div className="flex flex-col gap-2 font-normal text-[11px]">
                <Link href="/dashboard" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Facilities Dashboard
                </Link>
                <Link href="/assets" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Spatial Asset Registry
                </Link>
                <Link href="/assets/new" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Commission Asset
                </Link>
                <Link href="/assets/registration-success" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Transponder Receipt
                </Link>
              </div>
            </div>

            {/* Column 3: Security & Access */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span
                className={`text-[11px] font-semibold tracking-wider uppercase ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Access
              </span>
              <div className="flex flex-col gap-2 font-normal text-[11px]">
                <Link href="/signin" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Enterprise Sign In
                </Link>
                <Link href="/signup" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Onboard Institution
                </Link>
                <Link href="/forgot-password" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Identity Recovery
                </Link>
                <Link href="/verify-email" className="hover:text-white dark:hover:text-[#C5EA32] transition-colors">
                  Direct Verification
                </Link>
              </div>
            </div>

            {/* Column 4: Governance */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span
                className={`text-[11px] font-semibold tracking-wider uppercase ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Compliance
              </span>
              <div className="flex flex-col gap-2 font-normal text-[11px]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#1558C9] dark:text-[#C5EA32]" />
                  <span>ISO-55001 Asset Standard</span>
                </span>
                <span>FIPS 140-3 Cryptographic HSM</span>
                <span>EduPass Federated SSO</span>
                <span>Zero-Privilege Mesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* SafariX-Inspired Integrated Back To Top Anchor & Transition */}
        <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#737785]">
            CAMPUS OPERATIONS TELEMETRY SYSTEM // v4.12
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
              isDark
                ? "bg-white/[0.04] hover:bg-white/[0.1] border-white/10 text-white hover:border-[#C5EA32]/50 hover:text-[#C5EA32]"
                : "bg-white hover:bg-[#F0F2E4] border-[#DCE0D4] text-[#1A1D15] hover:border-[#1558C9]/40 hover:text-[#1558C9] shadow-2xs"
            }`}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Large Typographic Brand Signature (Low-contrast background architectural depth) */}
        <div className="w-full flex items-center justify-center select-none pointer-events-none py-2 overflow-hidden">
          <span
            className={`font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[132px] tracking-tight whitespace-nowrap font-normal leading-none transition-colors duration-300 ${
              isDark ? "text-white/[0.04]" : "text-black/[0.04]"
            }`}
          >
            CampusFix AI
          </span>
        </div>

        {/* Bottom Horizontal Divider & Legal Copyright Row */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#737785]">
          <p>© 2026 CampusFix AI Enterprise. Mission-critical predictive facilities telemetry.</p>
          <div className="flex items-center gap-6">
            <Link href="/signup" className="hover:underline hover:text-[#1A1D15] dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/signup" className="hover:underline hover:text-[#1A1D15] dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/signin" className="hover:underline hover:text-[#1A1D15] dark:hover:text-white transition-colors">
              Security Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
