"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Layers,
  Sparkles,
  Wrench,
  Activity,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

interface RunningPoint {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag: string;
}

const RUNNING_POINTS: RunningPoint[] = [
  {
    id: "asset-identity",
    code: "NODE 01 // IDENTITY",
    title: "Spatial Asset Registry",
    description:
      "Physical apparatus mapped via campus GIS with tamper-proof 2D matrix tags and immutable serial profiles.",
    icon: Layers,
    tag: "Physical-to-Digital",
  },
  {
    id: "issue-triage",
    code: "NODE 02 // TRIAGE",
    title: "Intelligent Issue Ingestion",
    description:
      "Rapid photo & voice intake with automated spatial duplicate screening to eliminate redundant work orders.",
    icon: Sparkles,
    tag: "Automated Routing",
  },
  {
    id: "work-dispatch",
    code: "NODE 03 // DISPATCH",
    title: "Precision Work Orders",
    description:
      "Skill-matched crew allocation with required tools, verified safety permits, and live component manifests.",
    icon: Wrench,
    tag: "Field Execution",
  },
  {
    id: "preventive-care",
    code: "NODE 04 // PREVENTIVE",
    title: "Physics-Informed Modeling",
    description:
      "Vibration variance, thermal thresholds, and mechanical wear curves to preempt failures before academic disruption.",
    icon: Activity,
    tag: "Predictive Care",
  },
  {
    id: "verified-audit",
    code: "NODE 05 // RECORD",
    title: "Immutable Chain of Custody",
    description:
      "Photographic sign-off, parts ledger synchronization, and permanent institutional lifecycle history.",
    icon: ShieldCheck,
    tag: "ISO-55000 Ready",
  },
];

export function LandingRunningLine() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    // Check user preference for motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start illuminating as the section enters comfortable view
      const startOffset = windowHeight * 0.8;
      // Complete illumination when the section is centered / fully traversed
      const endOffset = windowHeight * 0.15;
      
      const totalDistance = startOffset - endOffset;
      const distanceTraveled = startOffset - rect.top;

      let progress = 0;
      if (distanceTraveled <= 0) {
        progress = 0; // State 1: Inactive / Not yet reached
      } else if (distanceTraveled >= totalDistance) {
        progress = 1; // State 3: Fully traversed (all 5 nodes complete)
      } else {
        progress = distanceTraveled / totalDistance; // State 2: Currently progressing
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 px-5 sm:px-8 border-y transition-colors duration-300 relative overflow-hidden ${
        isDark
          ? "border-white/10 bg-[#04060b]"
          : "border-[#E2E4DE] bg-[#F5F7EE]/60"
      }`}
      aria-label="CampusFix Operational Continuum"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Lead-in */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#1558C9] dark:text-[#C5EA32] font-semibold">
                Operational Continuum
              </span>
              <span className="text-[#737785] hidden sm:inline">•</span>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all ${
                  scrollProgress >= 1
                    ? "bg-[#C5EA32]/20 border-[#C5EA32]/50 text-[#3D4C00] dark:text-[#C5EA32] font-bold"
                    : scrollProgress > 0
                    ? "bg-[#1558C9]/15 border-[#1558C9]/30 text-[#1558C9] dark:text-sky-300 font-medium"
                    : isDark
                    ? "bg-white/5 border-white/10 text-[#7A8090]"
                    : "bg-[#EAECE0] border-[#DCE0D4] text-[#737785]"
                }`}
              >
                {scrollProgress >= 1
                  ? "5/5 Nodes Locked • 100% Traversed"
                  : scrollProgress > 0
                  ? `Bus Active • ${Math.round(scrollProgress * 100)}% Traversed`
                  : "Standby • Scroll to Engage"}
              </span>
            </div>
            <h2
              className={`font-serif text-3xl sm:text-4xl font-normal tracking-tight ${
                isDark ? "text-white" : "text-[#1A1D15]"
              }`}
            >
              One unbroken thread from detection to resolution.
            </h2>
          </div>
          <p
            className={`text-xs sm:text-sm font-light max-w-md leading-relaxed ${
              isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
            }`}
          >
            Every campus asset communicates through a continuous operational bus, linking field personnel, spatial inventory, and predictive diagnostics.
          </p>
        </div>

        {/* ================= DESKTOP RUNNING TRACK WITH HANGING NODES ================= */}
        <div className="hidden lg:block relative pt-10 pb-6">
          {/* Main Horizontal Track Rail */}
          <div className="relative w-full h-[2px]">
            {/* Background Base Rail */}
            <div
              className={`absolute inset-0 w-full h-full ${
                isDark ? "bg-white/10" : "bg-[#D8DBD0]"
              }`}
            />

            {/* Scroll-Activated Energy Flow Line */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1558C9] via-[#C5EA32] to-[#1558C9] transition-all duration-300 ease-out"
              style={{
                width: prefersReducedMotion ? "100%" : `${scrollProgress * 100}%`,
              }}
            />

            {/* Glowing Traveling Pulse Head */}
            {!prefersReducedMotion && scrollProgress > 0 && (
              <div
                className={`absolute -top-[5px] -translate-x-1/2 w-3 h-3 rounded-full bg-[#C5EA32] shadow-sm shadow-[#C5EA32]/50 transition-all duration-150 ease-out ${
                  scrollProgress >= 1 ? "ring-4 ring-[#C5EA32]/30 animate-pulse" : ""
                }`}
                style={{
                  left: `${Math.max(1, Math.min(99, scrollProgress * 100))}%`,
                }}
              />
            )}
          </div>

          {/* 5 Hanging Information Stations */}
          <div className="grid grid-cols-5 gap-5 relative">
            {RUNNING_POINTS.map((point, index) => {
              const Icon = point.icon;
              const threshold = (index + 0.5) / 5;
              const isPassed = prefersReducedMotion || scrollProgress >= threshold;

              // Gentle dynamic offset based on scroll
              const yOffset = prefersReducedMotion
                ? 0
                : Math.sin(scrollProgress * Math.PI + index * 0.7) * 4;

              return (
                <div
                  key={point.id}
                  className="relative flex flex-col items-center pt-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(${yOffset}px)`,
                  }}
                >
                  {/* Vertical Hanging Stem Connector */}
                  <div className="relative flex flex-col items-center">
                    {/* Track Attachment Ring */}
                    <div
                      className={`-mt-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                        isPassed
                          ? isDark
                            ? "bg-[#C5EA32] border-[#030407]"
                            : "bg-[#1558C9] border-white shadow-xs"
                          : isDark
                          ? "bg-[#04060b] border-white/30"
                          : "bg-white border-[#A5A79B]"
                      }`}
                    />

                    {/* Vertical Hanging Connector Stem */}
                    <div
                      className={`w-[1px] h-8 transition-colors duration-300 ${
                        isPassed
                          ? isDark
                            ? "bg-gradient-to-b from-[#C5EA32] to-white/20"
                            : "bg-gradient-to-b from-[#1558C9] to-[#E2E4DE]"
                          : isDark
                          ? "bg-white/15"
                          : "bg-[#D8DBD0]"
                      }`}
                    />

                    {/* Small Connector Arrowhead */}
                    <ChevronDown
                      size={12}
                      className={`-mt-1.5 transition-colors duration-300 ${
                        isPassed
                          ? isDark
                            ? "text-[#C5EA32]"
                            : "text-[#1558C9]"
                          : isDark
                          ? "text-white/25"
                          : "text-[#A5A79B]"
                      }`}
                    />
                  </div>

                  {/* Hanging Information Capsule */}
                  <div
                    className={`mt-2 w-full p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[190px] ${
                      isPassed
                        ? isDark
                          ? "bg-white/[0.04] border-white/15 shadow-lg"
                          : "bg-white border-[#E2E4DE] shadow-sm"
                        : isDark
                        ? "bg-white/[0.02] border-white/5 opacity-80"
                        : "bg-white/60 border-[#E2E4DE]/60 opacity-80"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[9px] font-mono tracking-wider uppercase font-semibold ${
                            isPassed
                              ? isDark
                                ? "text-[#C5EA32]"
                                : "text-[#1558C9]"
                              : "text-[#737785]"
                          }`}
                        >
                          {point.code}
                        </span>
                        <div
                          className={`p-1.5 rounded-lg border ${
                            isDark
                              ? "bg-white/5 border-white/10 text-white"
                              : "bg-[#F5F7EE] border-[#E2E4DE] text-[#1A1D15]"
                          }`}
                        >
                          <Icon size={13} />
                        </div>
                      </div>

                      <h3
                        className={`font-serif text-base font-medium leading-snug mt-1 ${
                          isDark ? "text-white" : "text-[#1A1D15]"
                        }`}
                      >
                        {point.title}
                      </h3>

                      <p
                        className={`text-[11px] leading-relaxed line-clamp-3 font-light ${
                          isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                        }`}
                      >
                        {point.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-[#737785]">
                      <span>{point.tag}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPassed ? "bg-[#C5EA32]" : "bg-white/20"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE / TABLET ADAPTIVE CONTINUUM ================= */}
        <div className="lg:hidden relative pl-6 transition-colors duration-300 flex flex-col gap-6">
          {/* Base Inactive Vertical Rail */}
          <div
            className={`absolute left-[-2px] top-0 bottom-0 w-[2px] ${
              isDark ? "bg-white/10" : "bg-[#D8DBD0]"
            }`}
          />
          {/* Scroll-Activated Vertical Energy Flow Line */}
          <div
            className="absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-[#1558C9] via-[#C5EA32] to-[#1558C9] transition-all duration-300 ease-out"
            style={{
              height: prefersReducedMotion ? "100%" : `${scrollProgress * 100}%`,
            }}
          />

          {RUNNING_POINTS.map((point, index) => {
            const Icon = point.icon;
            const threshold = (index + 0.5) / 5;
            const isPassed = prefersReducedMotion || scrollProgress >= threshold;
            return (
              <div key={point.id} className="relative flex flex-col gap-2">
                {/* Connector Pin Hanging from Left Vertical Rail */}
                <div
                  className={`absolute -left-[31px] top-4 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isPassed
                      ? isDark
                        ? "bg-[#C5EA32] border-[#030407]"
                        : "bg-[#1558C9] border-white shadow-xs"
                      : isDark
                      ? "bg-[#04060b] border-white/30"
                      : "bg-white border-[#A5A79B]"
                  }`}
                />

                <div
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isPassed
                      ? isDark
                        ? "bg-white/[0.04] border-white/15 shadow-md"
                        : "bg-white border-[#E2E4DE] shadow-xs"
                      : isDark
                      ? "bg-white/[0.02] border-white/5 opacity-80"
                      : "bg-white/60 border-[#E2E4DE]/60 opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                        isPassed
                          ? isDark
                            ? "text-[#C5EA32]"
                            : "text-[#1558C9]"
                          : "text-[#737785]"
                      }`}
                    >
                      {point.code}
                    </span>
                    <span className="text-[10px] font-mono text-[#737785]">
                      {point.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl border shrink-0 mt-0.5 ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white"
                          : "bg-[#F5F7EE] border-[#E2E4DE] text-[#1A1D15]"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3
                        className={`font-serif text-lg font-medium leading-snug ${
                          isDark ? "text-white" : "text-[#1A1D15]"
                        }`}
                      >
                        {point.title}
                      </h3>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed font-light ${
                          isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                        }`}
                      >
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
