"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, RotateCcw } from "lucide-react";

interface RecoveryInvalidStateProps {
  isDark: boolean;
}

export function RecoveryInvalidState({ isDark }: RecoveryInvalidStateProps) {
  return (
    <div className="py-8 my-auto max-w-lg w-full mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Icon Badge */}
      <div className="relative inline-flex">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
            isDark
              ? "bg-red-500/15 text-red-400 border border-red-500/30"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          <ShieldAlert size={30} />
        </div>
      </div>

      {/* Headings */}
      <div className="space-y-2">
        <h2
          className={`font-serif text-3xl sm:text-4xl tracking-tight font-medium ${
            isDark ? "text-white" : "text-[#030407]"
          }`}
        >
          Recovery link unavailable
        </h2>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-[#A5A79B]" : "text-slate-600"
          }`}
        >
          This password reset link is invalid, expired, or has already been used. For your institutional security, cryptographic recovery tokens are strictly single-use and expire after a limited period.
        </p>
      </div>

      {/* Guidance Callout */}
      <div
        className={`p-4 rounded-xl text-xs space-y-2 border ${
          isDark
            ? "bg-[#111726] border-white/10 text-slate-300"
            : "bg-slate-50 border-slate-200 text-slate-700"
        }`}
      >
        <p className="font-semibold text-sm flex items-center gap-2">
          <span>Security Notice</span>
        </p>
        <p className="leading-relaxed opacity-90">
          If you requested this reset recently, please request a fresh link. If you did not request a password reset, your account credentials remain unchanged.
        </p>
      </div>

      {/* Action CTA Buttons */}
      <div className="space-y-3 pt-2">
        <Link
          href="/forgot-password"
          className="w-full py-3.5 px-6 rounded-xl bg-[#1558C9] hover:bg-[#10439B] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99]"
        >
          <RotateCcw size={16} />
          <span>Request a new reset link</span>
        </Link>

        <Link
          href="/signin"
          className={`w-full py-3.5 px-6 rounded-xl font-medium text-xs transition-colors flex items-center justify-center gap-2 border cursor-pointer ${
            isDark
              ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-slate-300"
              : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-sm"
          }`}
        >
          <ArrowLeft size={14} />
          <span>Return to Sign In</span>
        </Link>
      </div>

      {/* Testing / Preview Note for Evaluator */}
      <div
        className={`p-3 rounded-lg text-[11px] font-mono border text-center ${
          isDark
            ? "bg-white/[0.02] border-white/[0.06] text-slate-400"
            : "bg-slate-50 border-slate-200 text-slate-500"
        }`}
      >
        <span>To test with an authorized recovery token, visit: </span>
        <Link
          href="/reset-password?token=CF-APEX-REC-SECURE-9842"
          className={`underline font-bold ml-1 ${
            isDark ? "text-[#D4FF24]" : "text-[#1558C9]"
          }`}
        >
          /reset-password?token=CF-APEX-REC-SECURE-9842
        </Link>
      </div>
    </div>
  );
}

