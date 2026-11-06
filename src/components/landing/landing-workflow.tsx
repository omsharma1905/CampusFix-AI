"use client";

import React from "react";
import { QrCode, Radio, Navigation, CheckCircle2, ArrowRight } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

interface WorkflowStage {
  num: string;
  stageCode: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: string;
  badgeTheme: "lime" | "cobalt" | "cream";
  transitionHint?: string;
  alignment: "left" | "right";
}

const STAGES: WorkflowStage[] = [
  {
    num: "01",
    stageCode: "STAGE.01 // PHYSICAL HANDSHAKE",
    title: "Identify",
    subtitle: "Physical Asset Handshake",
    desc: "Industrial QR plaques bonded to equipment link physical devices directly to their real-time telemetry profile, spatial coordinates, and maintenance history.",
    icon: QrCode,
    badge: "Physical QR Scan",
    badgeTheme: "lime",
    transitionHint: "01 ⟶ 02 Triage Gateway",
    alignment: "left",
  },
  {
    num: "02",
    stageCode: "STAGE.02 // SPATIAL TRIAGE",
    title: "Report",
    subtitle: "Spatial Intake & Duplicate Triage",
    desc: "Scan opens instant mobile intake. Automated spatial clustering and vision filters flag duplicate reports to stop redundant work orders before they start.",
    icon: Radio,
    badge: "Duplicate-Screened",
    badgeTheme: "cobalt",
    transitionHint: "02 ⟶ 03 Dispatch Routing",
    alignment: "right",
  },
  {
    num: "03",
    stageCode: "STAGE.03 // FIELD EXECUTION",
    title: "Dispatch",
    subtitle: "Skill-Matched Assignment & SLA",
    desc: "Autonomous dispatch engine pairs technicians via trade certification, campus quadrant, and live parts availability, activating real-time countdown SLAs.",
    icon: Navigation,
    badge: "Skill-Matched Route",
    badgeTheme: "cream",
    transitionHint: "03 ⟶ 04 Audit Commit",
    alignment: "left",
  },
  {
    num: "04",
    stageCode: "STAGE.04 // PERMANENT LEDGER",
    title: "Resolve",
    subtitle: "Verified Ledger Commit & Custody",
    desc: "Technicians upload cryptographic photographic evidence and bill-of-materials logs, sealing the resolution into an immutable institutional lifecycle history.",
    icon: CheckCircle2,
    badge: "Cryptographic Seal",
    badgeTheme: "lime",
    alignment: "right",
  },
];

export function LandingWorkflow() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="how-it-works"
      className={`w-full py-28 sm:py-36 px-5 sm:px-8 border-t transition-colors duration-300 relative ${
        isDark
          ? "border-white/10 bg-[#030407]"
          : "border-[#E2E4DE] bg-[#F7F8F0]/40"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-24 sm:gap-32">
        {/* Editorial Section Lead-in */}
        <div className="max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#1558C9] dark:text-[#C5EA32] font-semibold">
              Closed-Loop Resolution Protocol
            </span>
          </div>
          <h2
            className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight ${
              isDark ? "text-white" : "text-[#1A1D15]"
            }`}
          >
            From reported anomaly <br className="hidden sm:block" />
            <span
              className={`italic font-light ${
                isDark ? "text-[#E8D2B5]" : "text-[#1558C9]"
              }`}
            >
              to certified ledger resolution.
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light max-w-2xl mt-1 ${
              isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
            }`}
          >
            An unbroken editorial sequence turns frantic campus breakdowns into certified, permanent operational telemetry — eliminating guesswork across every trade.
          </p>
        </div>

        {/* Editorial Operational Sequence: Staggered, Asymmetric Layout */}
        <div className="flex flex-col gap-20 sm:gap-28 relative">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isLeft = stage.alignment === "left";

            return (
              <article
                key={stage.num}
                className={`relative flex flex-col group transition-all duration-300 ${
                  isLeft
                    ? "lg:w-9/12 lg:mr-auto lg:pr-12"
                    : "lg:w-9/12 lg:ml-auto lg:pl-12"
                }`}
              >
                {/* Subtle Architectural Baseline Divider */}
                <div
                  className={`w-full pb-8 sm:pb-12 border-b transition-colors duration-300 ${
                    isDark
                      ? "border-white/10 group-hover:border-white/20"
                      : "border-[#DCE0D4] group-hover:border-[#B8BDAC]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
                    {/* Oversized Editorial Numeral Anchor */}
                    <div className="relative shrink-0 select-none">
                      <span
                        className={`font-serif text-7xl sm:text-8xl lg:text-9xl font-light leading-none tracking-tighter block transition-colors duration-300 ${
                          isDark
                            ? "text-white/15 group-hover:text-[#C5EA32]/40"
                            : "text-[#1558C9]/15 group-hover:text-[#1558C9]/35"
                        }`}
                      >
                        {stage.num}
                      </span>
                    </div>

                    {/* Stage Body Content */}
                    <div className="flex-1 flex flex-col gap-3 min-w-0 pt-1">
                      {/* Stage Eyebrow & Icon */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#737785]">
                          {stage.stageCode}
                        </span>
                        <div
                          className={`p-2 rounded-xl border transition-all duration-300 ${
                            isDark
                              ? "bg-white/[0.03] border-white/10 text-[#C5EA32]"
                              : "bg-white border-[#DCE0D4] text-[#1558C9] shadow-2xs"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                      </div>

                      {/* Headings */}
                      <div className="space-y-1">
                        <h3
                          className={`font-serif text-3xl sm:text-4xl font-normal tracking-tight ${
                            isDark ? "text-white" : "text-[#1A1D15]"
                          }`}
                        >
                          {stage.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-mono tracking-wide ${
                            isDark ? "text-[#E8D2B5]" : "text-[#1558C9]"
                          }`}
                        >
                          {stage.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-sm sm:text-base leading-relaxed font-light max-w-xl ${
                          isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
                        }`}
                      >
                        {stage.desc}
                      </p>

                      {/* Supporting Indicator & Transition Hint */}
                      <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-4">
                        <span
                          className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[11px] font-mono font-medium border ${
                            stage.badgeTheme === "lime"
                              ? isDark
                                ? "bg-[#C5EA32]/10 border-[#C5EA32]/30 text-[#C5EA32]"
                                : "bg-[#F0F5D5] border-[#DCE8AA] text-[#3F5200]"
                              : stage.badgeTheme === "cobalt"
                              ? isDark
                                ? "bg-[#1558C9]/15 border-[#1558C9]/30 text-sky-300"
                                : "bg-[#1558C9]/10 border-[#1558C9]/20 text-[#1558C9]"
                              : isDark
                              ? "bg-[#E8D2B5]/10 border-[#E8D2B5]/30 text-[#E8D2B5]"
                              : "bg-[#E8D2B5]/30 border-[#D8C2A5] text-[#5A4528]"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{stage.badge}</span>
                        </span>

                        {stage.transitionHint && (
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#737785] group-hover:text-[#1A1D15] dark:group-hover:text-white transition-colors">
                            <span>{stage.transitionHint}</span>
                            <ArrowRight
                              size={12}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
