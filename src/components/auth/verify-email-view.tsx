"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  VerifyEmailForm,
  VerifyEmailQAConsole,
  type VerificationState,
} from "./verify-email-form";
import { VerifyEmailInfoPanel } from "./verify-email-info-panel";
import { AuthThemeProvider, useAuthTheme } from "./auth-theme-context";
import { Sun, Moon } from "lucide-react";

function VerifyEmailContent() {
  const { theme, toggleTheme } = useAuthTheme();
  const isDark = theme === "dark";

  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "m.vance@apex.edu";

  const [email, setEmail] = useState(emailParam);
  const [activeState, setActiveState] = useState<VerificationState>("pending");
  const [cooldownSeconds, setCooldownSeconds] = useState(27);

  // Live countdown timer for resend cooldown
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  const handleStateChange = (newState: VerificationState) => {
    setActiveState(newState);
    if (newState === "cooldown" || newState === "resending") {
      setCooldownSeconds(27);
    }
  };

  const handleReset = () => {
    setActiveState("pending");
    setEmail(emailParam);
    setCooldownSeconds(27);
  };

  const handleTriggerResend = () => {
    setActiveState("resending");
    setCooldownSeconds(27);
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased flex flex-col justify-between transition-colors duration-200 [background-size:36px_36px] ${
        isDark
          ? "bg-[#030407] text-[#A5A79B] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]"
          : "bg-[#F9FAED] text-[#1A1D15] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]"
      }`}
    >
      {/* ========================================================= */}
      {/* TOP SYSTEM NAVIGATION (STITCH REFERENCE)                 */}
      {/* ========================================================= */}
      <header
        className={`w-full backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-2.5 transition-colors duration-200 border-b ${
          isDark
            ? "border-white/[0.08] bg-[#0A0D14]/90 text-white"
            : "border-[#DCE0D4] bg-white/90 text-[#1A1D15] shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Node Identifier */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`w-7 h-7 rounded flex items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-inner transition-colors ${
                isDark
                  ? "bg-[#0D121F] border border-white/[0.08] text-[#C5EA32] hover:border-white/20"
                  : "bg-[#030407] border border-[#030407] text-[#C5EA32] hover:opacity-90"
              }`}
            >
              CF
            </Link>
            <div className="flex items-baseline gap-2">
              <Link
                href="/"
                className={`font-semibold tracking-tight text-sm hover:opacity-90 ${
                  isDark ? "text-white" : "text-[#030407]"
                }`}
              >
                CampusFix<span className="text-[#C5EA32]">.AI</span>
              </Link>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase border transition-colors ${
                  isDark
                    ? "bg-black/60 border-white/[0.08] text-zinc-300"
                    : "bg-[#F3F5E7] border-[#DCE0D4] text-[#53574A]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isDark ? "bg-[#C5EA32]" : "bg-[#536600]"
                  }`}
                />
                Apex Inst. · Node 01
              </span>
            </div>
          </div>

          {/* Telemetry Health Badges (Center) */}
          <div
            className={`hidden md:flex items-center gap-4 text-[11px] font-mono ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                isDark
                  ? "bg-[#0D121F]/60 border-white/[0.08]"
                  : "bg-[#F3F5E7] border-[#DCE0D4]"
              }`}
            >
              <span className="text-blue-500">●</span>
              <span>EDUPASS FEDERATED SSO</span>
              <span className={isDark ? "text-zinc-600" : "text-[#A5A79B]"}>|</span>
              <span className="text-emerald-500 font-semibold">READY</span>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                isDark
                  ? "bg-[#0D121F]/60 border-white/[0.08]"
                  : "bg-[#F3F5E7] border-[#DCE0D4]"
              }`}
            >
              <span className="text-amber-500">🔒</span>
              <span>TLS 1.3 STRICT ENCLAVE</span>
            </div>
          </div>

          {/* Right Controls: Compliance & Theme Toggle */}
          <div className="flex items-center gap-2.5 font-mono text-[11px]">
            <span
              className={`hidden sm:inline-block px-2 py-1 rounded border transition-colors ${
                isDark
                  ? "border-white/[0.08] bg-[#0D121F]/40 text-zinc-400"
                  : "border-[#DCE0D4] bg-[#F3F5E7] text-[#53574A]"
              }`}
            >
              ISO-55001 CERT
            </span>

            {/* Enclave Light / Dark Theme Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border transition-colors cursor-pointer active:scale-95 ${
                isDark
                  ? "bg-[#0D121F] border-white/[0.08] text-zinc-300 hover:text-white hover:border-zinc-600"
                  : "bg-white border-[#DCE0D4] text-[#1A1D15] hover:bg-[#EEF0E2] shadow-2xs"
              }`}
            >
              {isDark ? (
                <>
                  <Sun size={13} className="text-[#C5EA32]" />
                  <span className="tracking-tight text-[11px]">Enclave Light</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-[#0041A0]" />
                  <span className="tracking-tight text-[11px]">Enclave Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN VERIFICATION WORKSPACE                               */}
      {/* ========================================================= */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-8">
        {/* UPPER WORKSPACE DUAL CARD */}
        <section
          className={`w-full rounded-xl border overflow-hidden transition-colors duration-200 ${
            isDark
              ? "bg-[#0A0D14] border-white/[0.08] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.75)]"
              : "bg-white border-[#DCE0D4] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          }`}
          aria-label="Institutional Identity &amp; Verification Terminal"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left Column: Institutional Identity & Edge Node (5 cols) */}
            <VerifyEmailInfoPanel />

            {/* Right Column: User Verification Flow Experience (7 cols) */}
            <VerifyEmailForm
              email={email}
              onEmailChange={setEmail}
              activeState={activeState}
              onStateChange={handleStateChange}
              cooldownSeconds={cooldownSeconds}
              onTriggerResend={handleTriggerResend}
            />
          </div>
        </section>

        {/* INTEGRATED PROTOTYPE QA RACK (FULL-WIDTH BELOW DUAL CARD) */}
        <VerifyEmailQAConsole
          activeState={activeState}
          onStateChange={handleStateChange}
          onReset={handleReset}
        />
      </main>

      {/* ========================================================= */}
      {/* SITE FOOTER (UNDERSTATED STITCH FOOTER)                   */}
      {/* ========================================================= */}
      <footer
        className={`w-full border-t py-4 px-4 sm:px-8 mt-6 font-mono text-[11px] transition-colors duration-200 ${
          isDark
            ? "border-white/[0.08] bg-[#0A0D14]/70 text-zinc-500"
            : "border-[#DCE0D4] bg-[#F3F5E7]/80 text-[#53574A]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2025 Apex Institute of Technology · Campus Operations Telemetry
          </div>
          <div className="flex items-center gap-4">
            <span>Secured via Enterprise HSM Architecture</span>
            <span className={isDark ? "text-zinc-700" : "text-[#A5A79B]"}>|</span>
            <span
              className={`font-semibold ${
                isDark ? "text-[#C5EA32]/80" : "text-[#536600]"
              }`}
            >
              v4.12.0-prod
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function VerifyEmailView() {
  return (
    <AuthThemeProvider>
      <VerifyEmailContent />
    </AuthThemeProvider>
  );
}
