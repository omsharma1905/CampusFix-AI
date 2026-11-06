import React, { Suspense } from "react";
import type { Metadata } from "next";
import { VerifyEmailView } from "@/components/auth/verify-email-view";

export const metadata: Metadata = {
  title: "Verify Email | CampusFix AI Enterprise",
  description:
    "Institutional email verification and cryptographic handshake for CampusFix AI workspace access.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#030407] text-white flex items-center justify-center p-6">
      <div className="text-center space-y-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 rounded-full border-2 border-[#D4FF24] border-t-transparent animate-spin mx-auto" />
        <p>Initializing verification channel...</p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailView />
    </Suspense>
  );
}

