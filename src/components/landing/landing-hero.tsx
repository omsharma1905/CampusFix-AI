"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";
import { LandingHeroTwin } from "./landing-hero-twin";

export function LandingHero() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Dynamic Ambient Background Glows (Softer, Refined Intensity) */}
      <div
        className={`absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none ${
          isDark ? "bg-[#1558C9]/20" : "bg-[#1558C9]/8"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-[130px] pointer-events-none ${
          isDark ? "bg-[#C5EA32]/10" : "bg-[#C5EA32]/10"
        }`}
      />
      <div
        className={`absolute -bottom-20 left-1/3 w-[500px] h-48 rounded-full blur-[110px] pointer-events-none ${
          isDark ? "bg-[#590907]/20" : "bg-[#E8D2B5]/25"
        }`}
      />

      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Left Hero Column: Typography & CTAs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit text-[11px] font-mono tracking-widest uppercase font-semibold ${
              isDark
                ? "bg-white/5 border-white/10 text-[#C5EA32]"
                : "bg-[#F3F5E7] border-[#E2E4DE] text-[#3F5200]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C5EA32] animate-ping" />
            <span>Autonomous Infrastructure OS v4.2</span>
          </div>

          <h1
            className={`font-serif text-5xl sm:text-6xl xl:text-7xl font-light tracking-tight leading-[1.08] ${
              isDark ? "text-white" : "text-[#1A1D15]"
            }`}
          >
            Your campus. <br />
            <span className="text-[#1558C9] italic font-normal">Under control.</span>
          </h1>

          <p
            className={`text-base sm:text-lg leading-relaxed max-w-lg font-light ${
              isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
            }`}
          >
            One intelligent platform to manage campus assets, maintenance operations and infrastructure health — from the first reported issue to the final resolution.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C5EA32] text-[#030407] font-bold text-sm tracking-wide shadow-md shadow-[#C5EA32]/15 hover:bg-[#B3D922] hover:shadow-lg hover:shadow-[#C5EA32]/25 hover:scale-[1.02] transition-all"
            >
              <span>Explore the Platform</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>

            <Link
              href="/signup"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-medium text-sm transition-all ${
                isDark
                  ? "bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/30"
                  : "bg-white border-[#E2E4DE] text-[#1A1D15] hover:bg-[#F3F5E7] shadow-xs"
              }`}
            >
              <span>Register Your Institution</span>
              <Building size={16} className={isDark ? "text-[#A5A79B]" : "text-[#5E6270]"} />
            </Link>
          </div>

          {/* Telemetry Badge Strip */}
          <div
            className={`pt-4 border-t flex items-center gap-6 text-xs font-mono ${
              isDark ? "border-white/10 text-[#A5A79B]" : "border-[#E2E4DE] text-[#5E6270]"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" />
              <span>18,490 NODES ONLINE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1558C9]" />
              <span>LATENCY 14ms</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2B5]" />
              <span>ZERO OUTAGES</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Campus Viewport with Floating Glass HUDs (7 cols) */}
        <div className="lg:col-span-7">
          <LandingHeroTwin />
        </div>
      </div>
    </section>
  );
}
