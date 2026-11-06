"use client";

import React from "react";
import { Cpu, Activity, Share2 } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingIntelligence() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="intelligence"
      className={`w-full py-28 px-5 sm:px-8 border-t transition-colors duration-300 relative overflow-hidden ${
        isDark ? "border-white/10 bg-[#030407]" : "border-[#E2E4DE] bg-[#F9F9FC]"
      }`}
    >
      {/* Matrix grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C5EA32 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        {/* Section Header: Open & Editorial */}
        <div className="max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#1558C9] dark:text-[#C5EA32] font-semibold">
              Predictive Infrastructure Core
            </span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight ${
              isDark ? "text-white" : "text-[#1A1D15]"
            }`}
          >
            Not just maintenance tracking. <br />
            <span className="text-[#1558C9] italic font-light">Operational intelligence.</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light max-w-2xl ${
              isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
            }`}
          >
            Realistic diagnostics grounded in physics and mechanical parameters — zero synthetic hype, complete auditability.
          </p>
        </div>

        {/* 3 Computing Pods: Open Technical Architecture (No nested repetitive card boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 relative divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
          {/* Intelligence Column 1: Explainable Health Scoring */}
          <div className="flex flex-col justify-between pt-6 md:pt-0 md:pr-8 first:pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#1558C9] dark:text-sky-400 uppercase tracking-widest font-semibold">
                  01 · TRANSPARENT MATH
                </span>
                <div
                  className={`p-2 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-sky-400"
                      : "bg-[#F5F7EE] border-[#E2E4DE] text-[#1558C9]"
                  }`}
                >
                  <Cpu size={16} />
                </div>
              </div>

              <h3
                className={`font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-tight ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Explainable Health Scoring
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                }`}
              >
                Scoring models factor operating runtime, vibration variances, and manufacturer MTBF curves — never opaque black-box guesses.
              </p>
            </div>

            {/* Formula Pill Callout */}
            <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#737785] text-[11px]">Formula</span>
              <span className="text-[#3F5200] dark:text-[#C5EA32] font-semibold text-[11px]">
                H(a) = w₁(M) + w₂(T) - δ(r)
              </span>
            </div>
          </div>

          {/* Intelligence Column 2: Harmonic Vibration Anomaly Catch */}
          <div className="flex flex-col justify-between pt-6 md:pt-0 md:px-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#3F5200] dark:text-[#C5EA32] uppercase tracking-widest font-semibold">
                  02 · ACOUSTIC SENSING
                </span>
                <div
                  className={`p-2 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-[#C5EA32]"
                      : "bg-[#F5F7EE] border-[#E2E4DE] text-[#3F5200]"
                  }`}
                >
                  <Activity size={16} />
                </div>
              </div>

              <h3
                className={`font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-tight ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Vibration Anomaly Catch
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                }`}
              >
                Detects subtle harmonic bearing degradation in central chillers 14 to 28 days before catastrophic plant shut-offs.
              </p>
            </div>

            {/* Delta Callout */}
            <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#737785] text-[11px]">Harmonic Delta</span>
              <span className="text-[#3F5200] dark:text-[#C5EA32] font-semibold text-[11px]">
                +1.84 mm/s RMS (Flagged)
              </span>
            </div>
          </div>

          {/* Intelligence Column 3: Failure Clustering Matrix */}
          <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#737785] uppercase tracking-widest font-semibold">
                  03 · SPATIAL CORRELATION
                </span>
                <div
                  className={`p-2 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-[#E8D2B5]"
                      : "bg-[#F5F7EE] border-[#E2E4DE] text-[#5A4528]"
                  }`}
                >
                  <Share2 size={16} />
                </div>
              </div>

              <h3
                className={`font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-tight ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                Failure Clustering Matrix
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                }`}
              >
                Cross-references voltage drops in Academic Hall with chiller relay trips to preempt grid-wide cascading outages.
              </p>
            </div>

            {/* Confidence Callout */}
            <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#737785] text-[11px]">Confidence Index</span>
              <span className="text-[#1558C9] dark:text-[#E8D2B5] font-semibold text-[11px]">
                99.1% Confidence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
