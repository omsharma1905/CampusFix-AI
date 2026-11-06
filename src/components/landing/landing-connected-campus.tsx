"use client";

import React from "react";
import {
  MapPin,
  QrCode,
  AlertTriangle,
  ClipboardList,
  Wrench,
  CheckCircle2,
  FileCheck,
  PhoneOff,
  EyeOff,
  Flame,
  Radio,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

const PIPELINE_STEPS = [
  {
    step: "01",
    phase: "ORIGIN",
    title: "Campus Location",
    desc: "Spatial GIS & zone coordinates locked",
    icon: MapPin,
    highlight: false,
  },
  {
    step: "02",
    phase: "IDENTITY",
    title: "Registered Asset",
    desc: "Serial, warranty, and schema cataloged",
    icon: QrCode,
    highlight: false,
  },
  {
    step: "03",
    phase: "ISSUE",
    title: "Issue Reported",
    desc: "QR scanned, triage severity indexed",
    icon: AlertTriangle,
    highlight: false,
  },
  {
    step: "04",
    phase: "ORDER",
    title: "Work Order",
    desc: "AI auto-generates root cause scope",
    icon: ClipboardList,
    highlight: false,
  },
  {
    step: "05",
    phase: "EXECUTION",
    title: "Technician",
    desc: "Skill-matched routing with live parts kit",
    icon: Wrench,
    highlight: false,
  },
  {
    step: "06",
    phase: "AUDIT",
    title: "Resolution",
    desc: "Photographic proof signed & verified",
    icon: CheckCircle2,
    highlight: false,
  },
  {
    step: "07",
    phase: "IMMUTABLE",
    title: "Permanent History",
    desc: "Lifecycle ledger updated in real time",
    icon: FileCheck,
    highlight: true,
  },
];

export function LandingConnectedCampus() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="connected-campus"
      className={`w-full py-28 px-5 sm:px-8 border-t transition-colors duration-300 relative ${
        isDark
          ? "border-white/10 bg-gradient-to-b from-[#030407] via-[#050811] to-[#030407]"
          : "border-[#E2E4DE] bg-gradient-to-b from-[#F9F9FC] via-[#F2F4E8]/40 to-[#F9F9FC]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Narrative Header: Open & Editorial */}
        <div className="max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#1558C9] dark:text-[#C5EA32] font-semibold">
              Physical-to-Digital Transition
            </span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight ${
              isDark ? "text-white" : "text-[#1A1D15]"
            }`}
          >
            A campus is an ecosystem. <br />
            <span
              className={`italic font-light ${
                isDark ? "text-[#E8D2B5]" : "text-[#1558C9]"
              }`}
            >
              Managing it shouldn&apos;t be chaos.
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light max-w-2xl ${
              isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
            }`}
          >
            When physical reality fragments across sticky notes, buried emails, and forgotten radio calls, facilities degrade silently. CampusFix unifies physical architecture into a synchronous operational stream.
          </p>
        </div>

        {/* Continuous Lifecycle Progression: Open Horizontal Milestone Track */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C5EA32]" />
              <span className={`font-semibold ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                Continuous Lifecycle Pipeline
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#737785]">
              AUTONOMOUS STEP TRANSITIONS
            </span>
          </div>

          {/* Open Milestone Flow (No repetitive isolated boxed cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-8 gap-x-4 relative">
            {PIPELINE_STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col justify-between group pt-2 pb-1"
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`h-0.5 w-full mb-4 transition-colors ${
                      item.highlight
                        ? "bg-[#C5EA32]"
                        : isDark
                        ? "bg-white/10 group-hover:bg-white/30"
                        : "bg-[#E2E4DE] group-hover:bg-[#1558C9]/40"
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#737785] tracking-wider">
                        {item.step} · {item.phase}
                      </span>
                      <div
                        className={`p-1.5 rounded-lg transition-transform group-hover:scale-110 ${
                          item.highlight
                            ? "bg-[#C5EA32] text-[#030407]"
                            : isDark
                            ? "text-[#C5EA32] bg-white/5"
                            : "text-[#1558C9] bg-[#F5F7EE]"
                        }`}
                      >
                        <Icon size={15} />
                      </div>
                    </div>

                    <h3
                      className={`text-sm font-semibold tracking-tight ${
                        item.highlight
                          ? isDark
                            ? "text-[#C5EA32]"
                            : "text-[#2e3d00]"
                          : isDark
                          ? "text-white"
                          : "text-[#1A1D15]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#737785] mt-1.5 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  {index < PIPELINE_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-8 text-[#737785]/40 pointer-events-none">
                      <ArrowRight size={13} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual Contrast Layout: Open Asymmetric Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 items-stretch">
          {/* Left: Fragmented Reality (5 cols) */}
          <div
            className={`lg:col-span-5 p-8 rounded-3xl flex flex-col justify-between gap-8 border transition-all ${
              isDark
                ? "bg-[#590907]/10 border-[#590907]/25"
                : "bg-[#fff7f7] border-[#ffdad6]"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-red-500 font-bold flex items-center gap-1.5">
                  <AlertTriangle size={15} /> Legacy Fragmentation
                </span>
                <span className="text-[10px] text-red-400">DISCONNECTED FAILURES</span>
              </div>

              <h3
                className={`font-serif text-2xl font-normal leading-snug ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                When campus systems operate in isolation, decay accelerates unnoticed.
              </h3>
            </div>

            {/* Typography-led pain points separated by light hairlines (no nested boxes) */}
            <div className="divide-y divide-red-500/15 text-xs">
              <div className="py-4 flex items-start gap-3.5">
                <PhoneOff size={16} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                    Disconnected Operational Silos
                  </h4>
                  <p className="text-[#737785] mt-1 leading-relaxed font-light">
                    Multiple duplicate calls for the same water leak, lost paper tickets, and untracked contractor expenditures.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <EyeOff size={16} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                    Sub-Surface Blind Spots
                  </h4>
                  <p className="text-[#737785] mt-1 leading-relaxed font-light">
                    Substations and chiller plants fail during exam weeks without telemetry warning, incurring emergency surge costs.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Flame size={16} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                    85% Reactive Firefighting
                  </h4>
                  <p className="text-[#737785] mt-1 leading-relaxed font-light">
                    Emergency repairs preempt scheduled maintenance cycles, compounding long-term deferred liability.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`pt-4 border-t border-red-500/20 text-xs font-mono flex items-center justify-between ${
                isDark ? "text-red-300" : "text-red-900"
              }`}
            >
              <span>Net impact on physical plant:</span>
              <span className="font-bold text-red-500">+34% Annual Overhead</span>
            </div>
          </div>

          {/* Right: Unified Digital Twin Solution (7 cols) */}
          <div
            className={`lg:col-span-7 p-8 rounded-3xl flex flex-col justify-between gap-8 border transition-all ${
              isDark
                ? "bg-[#070b14] border-white/10"
                : "bg-white border-[#E2E4DE] shadow-sm"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-[#1558C9] dark:text-[#C5EA32] font-bold flex items-center gap-1.5">
                  <Radio size={15} /> CampusFix Operational Bus
                </span>
                <span className="text-[10px] text-[#1558C9] dark:text-sky-400">
                  SYNCHRONOUS SPATIAL TELEMETRY
                </span>
              </div>

              <h3
                className={`font-serif text-2xl sm:text-3xl font-normal leading-snug ${
                  isDark ? "text-white" : "text-[#1A1D15]"
                }`}
              >
                A single live model coordinating every physical asset, technician dispatch, and lifecycle record.
              </h3>
            </div>

            {/* Open Schematic Spec View (No nested rectangular boxes) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5EA32] animate-pulse" />
                  <span className={`font-semibold ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                    Engineering Quadrant · Sector 04
                  </span>
                </div>
                <span className="text-[#3F5200] dark:text-[#C5EA32] font-semibold text-[11px] px-2 py-0.5 rounded-full bg-[#C5EA32]/15 border border-[#C5EA32]/30">
                  OPTIMAL TOLERANCE
                </span>
              </div>

              {/* Minimal 3-Metric Stream */}
              <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#737785] block uppercase tracking-wider">
                    PUMP 04 VIBRATION
                  </span>
                  <span className={`text-base font-bold mt-1 block ${isDark ? "text-white" : "text-[#1A1D15]"}`}>
                    0.82 mm/s
                  </span>
                  <span className="text-[10px] text-[#737785]">Baseline nominal</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#737785] block uppercase tracking-wider">
                    THERMAL DELTA
                  </span>
                  <span className="text-base font-bold mt-1 block text-[#1558C9] dark:text-[#C5EA32]">
                    +1.2°C Nom
                  </span>
                  <span className="text-[10px] text-[#737785]">Standard variance</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#737785] block uppercase tracking-wider">
                    SLA STATUS
                  </span>
                  <span className="text-base font-bold mt-1 block text-[#1558C9] dark:text-sky-400">
                    100% Pass
                  </span>
                  <span className="text-[10px] text-[#737785]">Zero escalations</span>
                </div>
              </div>

              {/* Proximity Dispatch Indicator Pill */}
              <div
                className={`py-3 px-4 rounded-xl border flex items-center justify-between text-xs ${
                  isDark
                    ? "bg-[#1558C9]/15 border-[#1558C9]/30 text-sky-200"
                    : "bg-[#1558C9]/5 border-[#1558C9]/20 text-[#0041a0]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Navigation size={15} className="text-[#1558C9] dark:text-sky-400" />
                  <span className="font-medium">
                    Proximity dispatch: Tech lead en route to Air Handler 02
                  </span>
                </div>
                <span className="font-mono text-[#3F5200] dark:text-[#C5EA32] font-bold text-[11px] shrink-0">
                  ETA 6 MIN
                </span>
              </div>
            </div>

            <div
              className={`pt-4 border-t border-black/10 dark:border-white/10 text-xs font-mono flex items-center justify-between ${
                isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
              }`}
            >
              <span>Predictive operations compliance:</span>
              <span className="font-bold text-[#3F5200] dark:text-[#C5EA32]">
                94.6% PM Completion Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
