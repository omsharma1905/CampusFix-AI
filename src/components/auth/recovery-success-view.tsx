"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MailCheck, Check, Send, RotateCw, LogIn, ShieldCheck } from "lucide-react";

interface RecoverySuccessViewProps {
  email: string;
  isDark: boolean;
  onResetForm: () => void;
}

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "m.v****@apex.edu";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return (user[0] || "*") + "****@" + domain;
  return user.substring(0, 3) + "****@" + domain;
}

export function RecoverySuccessView({
  email,
  isDark,
  onResetForm,
}: RecoverySuccessViewProps) {
  const [cooldownSeconds, setCooldownSeconds] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  const handleResend = () => {
    if (cooldownSeconds > 0 || isResending) return;
    setIsResending(true);
    setResendNotice(null);

    // Isolated resend handler boundary
    setTimeout(() => {
      setIsResending(false);
      setCooldownSeconds(30);
      setResendNotice(
        "Token dispatch request registered. If the account exists, a new recovery message has been queued."
      );
    }, 1000);
  };

  const formatCountdown = (secs: number) => {
    const s = secs < 10 ? `0${secs}` : `${secs}`;
    return `00:${s}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Icon Badge with Checkmark Accent */}
      <div className="relative inline-flex">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
            isDark
              ? "bg-[#D4FF24]/15 text-[#D4FF24] border border-[#D4FF24]/30"
              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
          }`}
        >
          <MailCheck size={32} />
        </div>
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1558C9] flex items-center justify-center text-white shadow-sm">
          <Check size={12} strokeWidth={3} />
        </span>
      </div>

      {/* Headlines */}
      <div className="space-y-2">
        <h2
          className={`font-serif text-3xl sm:text-4xl tracking-tight font-medium ${
            isDark ? "text-white" : "text-[#030407]"
          }`}
        >
          Check your inbox
        </h2>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-[#A5A79B]" : "text-slate-600"
          }`}
        >
          If an account exists with this email address, you&apos;ll receive cryptographic instructions to reset your password shortly.
        </p>
      </div>

      {/* Masked Recipient Pill Badge */}
      <div
        className={`p-4 rounded-xl flex items-center justify-between gap-3 border ${
          isDark
            ? "bg-[#111726] border-white/10"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              isDark ? "bg-white/10 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            <Send size={16} />
          </div>
          <div className="min-w-0">
            <span
              className={`block text-[10px] font-mono uppercase tracking-wider font-semibold ${
                isDark ? "text-[#A5A79B]" : "text-slate-500"
              }`}
            >
              Token Transmitted To
            </span>
            <span
              className={`font-mono text-xs sm:text-sm font-semibold truncate block ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {maskEmail(email)}
            </span>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 ${
            isDark
              ? "bg-[#D4FF24]/20 text-[#D4FF24] border border-[#D4FF24]/30"
              : "bg-emerald-100 text-emerald-800 border border-emerald-300"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-pulse" />
          Dispatched
        </span>
      </div>

      {resendNotice && (
        <div
          className={`p-3 rounded-lg text-xs border ${
            isDark
              ? "bg-blue-500/10 border-blue-500/20 text-blue-200"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          {resendNotice}
        </div>
      )}

      {/* Primary Actions: Back to Sign In & Resend */}
      <div className="space-y-4 pt-2">
        <Link
          href="/signin"
          className="w-full py-3.5 px-6 rounded-xl bg-[#1558C9] hover:bg-[#10439B] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99]"
        >
          <span>Back to Sign In</span>
          <LogIn size={18} />
        </Link>

        {/* Cooldown & Resend Trigger Row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl border text-xs ${
            isDark
              ? "bg-white/[0.03] border-white/10"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <span
            className={`text-center sm:text-left ${
              isDark ? "text-[#A5A79B]" : "text-slate-600"
            }`}
          >
            Didn&apos;t receive the email? Check spam quarantine or
          </span>
          <button
            type="button"
            disabled={cooldownSeconds > 0 || isResending}
            onClick={handleResend}
            className={`flex items-center gap-1.5 font-semibold transition-colors shrink-0 ${
              cooldownSeconds > 0 || isResending
                ? "opacity-50 cursor-not-allowed"
                : isDark
                ? "text-[#D4FF24] hover:underline cursor-pointer"
                : "text-[#1558C9] hover:underline cursor-pointer"
            }`}
          >
            <RotateCw
              size={14}
              className={isResending ? "animate-spin" : ""}
            />
            <span>{isResending ? "Transmitting..." : "Resend email"}</span>
          </button>
        </div>

        {/* Resend Countdown Caption */}
        <div className="text-center text-xs font-mono">
          {cooldownSeconds > 0 ? (
            <span className={isDark ? "text-[#A5A79B]" : "text-slate-500"}>
              Resend available in{" "}
              <strong className={isDark ? "text-white" : "text-slate-900"}>
                {formatCountdown(cooldownSeconds)}
              </strong>
            </span>
          ) : (
            <span
              className={`font-semibold ${
                isDark ? "text-[#D4FF24]" : "text-emerald-700"
              }`}
            >
              Ready to re-transmit token
            </span>
          )}
        </div>

        {/* Reset Input Option */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onResetForm}
            className={`text-xs hover:underline cursor-pointer ${
              isDark ? "text-[#A5A79B]" : "text-slate-500"
            }`}
          >
            Try another institutional email address
          </button>
        </div>
      </div>

      {/* Security Reassurance Notice */}
      <div
        className={`p-3.5 rounded-xl flex items-center gap-2.5 text-xs border ${
          isDark
            ? "bg-[#090D16] border-white/[0.06] text-[#A5A79B]"
            : "bg-slate-50 border-slate-200 text-slate-600"
        }`}
      >
        <ShieldCheck size={18} className="text-[#1558C9] shrink-0" />
        <span>Tokens expire automatically after a limited period for your protection.</span>
      </div>
    </div>
  );
}

