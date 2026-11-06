"use client";

import React from "react";
import Link from "next/link";
import { AuthThemeProvider, useAuthTheme } from "./auth-theme-context";
import { AuthBrandPanel } from "./auth-brand-panel";
import { SignInForm } from "./signin-form";
import { ShieldCheck, Lock, Sun, Moon, Shield } from "lucide-react";

function SignInHeader() {
  const { theme, toggleTheme } = useAuthTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`w-full z-40 sticky top-0 backdrop-blur-xl transition-colors duration-200 border-b ${
        isDark
          ? "border-white/10 bg-[#030407]/90 text-white"
          : "border-[#DCE0D4] bg-[#f9faed]/90 text-[#1A1D15] shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        {/* Brand Mark & Node Status */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c8f30c] shadow-[0_0_8px_#c8f30c] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm tracking-tight">CampusFix AI</span>
          </Link>

          <span className="h-4 w-px bg-zinc-300 dark:bg-white/20" />

          <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#536600] dark:bg-[#c8f30c]" />
            <span>APEX INST. · NODE 01</span>
          </div>
        </div>

        {/* Right Controls: Telemetry Indicators & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#536600] dark:text-[#c8f30c]" />
              <span>EDUPASS FEDERATED SSO | READY</span>
            </span>
            <span className="text-zinc-300 dark:text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <Lock size={13} className="text-[#0041a0] dark:text-blue-400" />
              <span>TLS 1.3 STRICT ENCLAVE</span>
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer active:scale-95 ${
              isDark
                ? "bg-white/[0.06] hover:bg-white/[0.12] border-white/10 text-white"
                : "bg-white hover:bg-[#EEF0E5] border-[#DCE0D4] text-[#1A1D15]"
            }`}
            title={isDark ? "Activate Light View" : "Activate Dark View"}
          >
            {isDark ? (
              <>
                <Sun size={15} className="text-[#c8f30c]" />
                <span className="hidden sm:inline font-mono text-[11px]">Light View</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-[#0041a0]" />
                <span className="hidden sm:inline font-mono text-[11px]">Dark View</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function SignInContent() {
  const { theme } = useAuthTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isDark ? "bg-[#030407] text-[#f1f0f7]" : "bg-[#f9faed] text-[#1a1d15]"
      }`}
    >
      {/* Top Technical Navigation Header */}
      <SignInHeader />

      {/* Main Workspace Area with Master Obsidian Container */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Master Dark Olive/Obsidian Container */}
          <div className="w-full bg-[#262a22] text-[#f0f2e4] rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/10">
            {/* Top System Telemetry Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-white/10 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c8f30c] animate-pulse" />
                <span className="text-[#c8f30c] font-semibold tracking-wide uppercase">
                  CAMPUSFIX AI / AUTH-GATEWAY v4.8.2
                </span>
                <span className="text-zinc-600">::</span>
                <span className="text-[#f0f2e4]">SYS-NODE 01 [EDUPASS FEDERATED]</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-[#c8f30c]">
                  <Lock size={12} />
                  <span>TLS 1.3 / STRICT ENCLAVE</span>
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">ZERO-TRUST AUDIT LOG ACTIVE</span>
              </div>
            </div>

            {/* 50/50 Balanced Split Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Brand & Telemetry Identity */}
              <div className="lg:col-span-6">
                <AuthBrandPanel />
              </div>

              {/* Right Column: Authentication Card & Docked State Switcher */}
              <div className="lg:col-span-6">
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Outer Bottom System Footer */}
      <footer
        className={`w-full py-4 text-xs font-mono transition-colors border-t ${
          isDark
            ? "bg-[#030407] text-zinc-500 border-white/5"
            : "bg-[#f3f5e7]/80 text-[#53574a] border-[#dce0d4]"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© 2025 CampusFix AI Technologies Inc.</span>
            <span className="opacity-40">•</span>
            <span>ISO-55001 Asset Management Certified</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Shield size={14} className="text-[#536600] dark:text-[#c8f30c]" />
            <span>Secured via Enterprise HSM Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function AuthView() {
  return (
    <AuthThemeProvider>
      <SignInContent />
    </AuthThemeProvider>
  );
}
