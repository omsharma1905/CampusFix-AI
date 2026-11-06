"use client";

import React from "react";
import { LandingThemeProvider } from "./landing-theme-context";
import { LandingNavbar } from "./landing-navbar";
import { LandingHero } from "./landing-hero";
import { LandingRunningLine } from "./landing-running-line";
import { LandingConnectedCampus } from "./landing-connected-campus";
import { LandingCapabilities } from "./landing-capabilities";
import { LandingWorkflow } from "./landing-workflow";
import { LandingIntelligence } from "./landing-intelligence";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";
import { LandingBackToTop } from "./landing-back-to-top";

export function LandingPageView() {
  return (
    <LandingThemeProvider>
      <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
        {/* Floating Minimal Navbar */}
        <LandingNavbar />

        {/* Main Content Sections */}
        <main className="w-full flex-1 flex flex-col">
          {/* Section 01: Hero */}
          <LandingHero />

          {/* Section 02: Horizontal Running Line with Hanging Nodes */}
          <LandingRunningLine />

          {/* Section 03: Connected Campus & Problem Statement */}
          <LandingConnectedCampus />

          {/* Section 04: Core Platform Capabilities */}
          <LandingCapabilities />

          {/* Section 05: How It Works / 4-Stage Workflow */}
          <LandingWorkflow />

          {/* Section 06: Operational Intelligence Layer */}
          <LandingIntelligence />

          {/* Section 07: Final Call to Action */}
          <LandingCta />
        </main>

        {/* Global Landing Footer */}
        <LandingFooter />

        {/* Floating Back to Top Button */}
        <LandingBackToTop />
      </div>
    </LandingThemeProvider>
  );
}
