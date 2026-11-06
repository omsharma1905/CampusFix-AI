import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPasswordView } from "@/components/auth/reset-password-view";

export const metadata: Metadata = {
  title: "Reset Password | CampusFix AI Enterprise",
  description:
    "Create a new password to restore access to your CampusFix AI workspace.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#030407] text-white flex items-center justify-center p-6">
      <div className="text-center space-y-3 font-mono text-xs text-slate-400">
        <div className="w-8 h-8 rounded-full border-2 border-[#1558C9] border-t-transparent animate-spin mx-auto" />
        <p>Loading recovery session...</p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordView />
    </Suspense>
  );
}

