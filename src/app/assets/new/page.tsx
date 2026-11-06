import React from "react";
import { Metadata } from "next";
import { RegisterWizardShell } from "@/components/assets/register/register-wizard-shell";

export const metadata: Metadata = {
  title: "Register New Asset — Step 01: Basic Info | CampusFix AI",
  description:
    "Add a physical asset to your institution's inventory and establish its operational identity with real-time OCR telemetry.",
};

export default function RegisterAssetPage() {
  return <RegisterWizardShell />;
}

