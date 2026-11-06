"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, LogIn, ShieldCheck } from "lucide-react";

interface ResetPasswordSuccessProps {
  isDark: boolean;
}

export function ResetPasswordSuccess({ isDark }: ResetPasswordSuccessProps) {
  return (
    <div className="py-8 my-auto max-w-lg w-full mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Icon Badge with Glow */}
      <div className="relative inline-flex">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
            isDark
              ? "bg-[#D4FF24]/15 text-[#D4FF24] border border-[#D4FF24]/30"
              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
          }`}
        >
          <CheckCircle2 size={32} />
        </div>
      </div>

      {/* Headlines */}
      <div className="space-y-2">
        <h2
          className={`font-serif text-3xl sm:text-4xl tracking-tight font-medium ${
            isDark ? "text-white" : "text-[#030407]"
          }`}
        >
          Password updated successfully
        </h2>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-[#A5A79B]" : "text-slate-600"
          }`}
        >
          Your password has been changed. You can now sign in using your new credentials.
        </p>
      </div>

      {/* Operational Confirmation Box */}
      <div
        className={`p-4 rounded-xl flex items-start gap-3 border ${
          isDark
            ? "bg-[#111726] border-white/10 text-slate-300"
            : "bg-slate-50 border-slate-200 text-slate-700"
        }`}
      >
        <ShieldCheck size={18} className="text-[#1558C9] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-sm">Identity Synchronized</p>
          <p className="leading-relaxed opacity-90">
            Active sessions across authorized campus nodes and maintenance consoles will recognize your updated credentials upon next sign-in.
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="pt-2">
        <Link
          href="/signin"
          className="w-full py-3.5 px-6 rounded-xl bg-[#1558C9] hover:bg-[#10439B] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99]"
        >
          <span>Return to Sign In</span>
          <LogIn size={18} />
        </Link>
      </div>
    </div>
  );
}

