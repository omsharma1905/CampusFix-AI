"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Building2, ShieldCheck, Lock, Sun, Moon } from "lucide-react";
import { AuthThemeProvider, useAuthTheme } from "./auth-theme-context";
import { ResetPasswordInfoPanel } from "./reset-password-info-panel";
import { ResetPasswordForm } from "./reset-password-form";
import { RecoveryInvalidState } from "./recovery-invalid-state";

function ResetPasswordContent() {
  const { theme, toggleTheme } = useAuthTheme();
  const isDark = theme === "dark";

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 relative ${
        isDark
          ? "bg-[#030407] text-[#e1e4ea] selection:bg-[#D4FF24] selection:text-[#030407]"
          : "bg-[#F7F6F3] text-slate-900 selection:bg-[#1558C9] selection:text-white"
      }`}
    >
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)"
            : "radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Bar / App Shell Header */}
      <header
        className={`w-full z-40 sticky top-0 border-b backdrop-blur-md transition-colors ${
          isDark
            ? "bg-[#030407]/90 border-white/[0.08]"
            : "bg-white/90 border-slate-200"
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Left: Brand Monogram & Node */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-[#D4FF24] text-[#030407] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Building2 size={16} strokeWidth={2.5} />
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`font-bold text-[15px] tracking-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  CampusFix
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded font-bold tracking-wider ${
                    isDark
                      ? "bg-white/10 text-[#D4FF24]"
                      : "bg-slate-100 text-[#536600]"
                  }`}
                >
                  AI
                </span>
              </div>
            </Link>

            <div
              className={`h-4 w-px hidden sm:block ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-xs font-mono ${
                  isDark ? "text-[#A5A79B]" : "text-slate-600"
                }`}
              >
                Apex Institute · Auth Node 01
              </span>
            </div>
          </div>

          {/* Right: Security Badges & Controls */}
          <div className="flex items-center gap-3">
            <div
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.08] text-[#A5A79B]"
                  : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>EduPass Directory · Ready</span>
            </div>

            <div
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.08] text-[#A5A79B]"
                  : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              <Lock size={14} className="text-[#1558C9]" />
              <span>TLS 1.3 Strict</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border cursor-pointer ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-[#A5A79B] hover:text-white"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
              }`}
              title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
            >
              {isDark ? (
                <Sun size={15} className="text-[#D4FF24]" />
              ) : (
                <Moon size={15} className="text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Recovery Workspace: Framed Monolith */}
      <main className="w-full flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-[1380px] mx-auto">
          <div
            className={`rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border grid grid-cols-1 lg:grid-cols-12 min-h-[660px] ${
              isDark
                ? "bg-[#0C0E14] border-white/[0.08]"
                : "bg-white border-slate-200"
            }`}
          >
            {/* Left Panel: Institutional Information (~42% desktop width) */}
            <div className="lg:col-span-5">
              <ResetPasswordInfoPanel isDark={isDark} />
            </div>

            {/* Right Panel: Password Reset Form OR Invalid Token State (~58% desktop width) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {token ? (
                <ResetPasswordForm isDark={isDark} token={token} />
              ) : (
                <div
                  className={`p-6 sm:p-10 lg:p-14 flex flex-col justify-between h-full ${
                    isDark ? "bg-[#080B12] text-white" : "bg-white text-slate-900"
                  }`}
                >
                  <RecoveryInvalidState isDark={isDark} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footnote Metadata */}
      <footer
        className={`w-full py-3 px-4 sm:px-6 lg:px-8 border-t transition-colors relative z-10 ${
          isDark
            ? "border-white/[0.08] bg-[#030407] text-[#737785]"
            : "border-slate-200 bg-white text-slate-500"
        }`}
      >
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono">
          <div>© 2025 Apex Institute of Technology · Campus Operations Telemetry</div>
          <div className="flex items-center gap-4">
            <span>Security Classification: Institutional Internal</span>
            <span className="opacity-50">v4.12.0-prod</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function ResetPasswordView() {
  return (
    <AuthThemeProvider>
      <ResetPasswordContent />
    </AuthThemeProvider>
  );
}

