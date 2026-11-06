"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingCta() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`w-full py-32 px-5 sm:px-8 border-t transition-colors duration-300 relative overflow-hidden ${
        isDark ? "border-white/10 bg-[#030407]" : "border-[#E2E4DE] bg-[#F5F7EE]/60"
      }`}
    >
      {/* Background Soft Refined Ambient Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? "bg-[#1558C9]/15" : "bg-[#C5EA32]/10"
        }`}
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        {/* Subtle pill tag */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase font-semibold ${
            isDark
              ? "bg-white/5 border-white/10 text-[#C5EA32]"
              : "bg-[#F3F5E7] border-[#E2E4DE] text-[#3F5200]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#C5EA32]" />
          <span>Zero Academic Downtime Transition</span>
        </div>

        <h2
          className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] ${
            isDark ? "text-white" : "text-[#1A1D15]"
          }`}
        >
          A better way to care for your campus <br />
          <span className="text-[#3F5200] dark:text-[#C5EA32] italic font-normal">
            starts here.
          </span>
        </h2>

        <p
          className={`text-base sm:text-lg max-w-2xl leading-relaxed font-light ${
            isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
          }`}
        >
          Bring your assets, maintenance crews, and physical facilities operations into one connected system. Rapid deployment across any campus in under 14 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#C5EA32] text-[#030407] font-bold text-sm tracking-wide shadow-md shadow-[#C5EA32]/20 hover:bg-[#B3D922] hover:shadow-lg hover:shadow-[#C5EA32]/30 hover:scale-[1.02] transition-all"
          >
            <span>Register Your Institution</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>

          <Link
            href="/dashboard"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border font-medium text-sm transition-all ${
              isDark
                ? "bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/30"
                : "bg-white border-[#E2E4DE] text-[#1A1D15] hover:bg-[#F3F5E7] shadow-xs"
            }`}
          >
            <span>Explore CampusFix AI</span>
            <ExternalLink size={16} className={isDark ? "text-[#A5A79B]" : "text-[#5E6270]"} />
          </Link>
        </div>

        {/* Trust Strip */}
        <div
          className={`pt-8 border-t flex flex-wrap items-center justify-center gap-6 text-xs font-mono ${
            isDark ? "border-white/10 text-[#A5A79B]" : "border-[#E2E4DE] text-[#5E6270]"
          }`}
        >
          <span>FERPA &amp; SOC2 COMPLIANT</span>
          <span>•</span>
          <span>WHITE-GLOVE DATA MIGRATION</span>
          <span>•</span>
          <span>MULTI-CAMPUS READY</span>
        </div>
      </div>
    </section>
  );
}
