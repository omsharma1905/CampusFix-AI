"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  SlidersHorizontal,
  RotateCw,
} from "lucide-react";

export type SignInStatePreset =
  | "empty"
  | "filled"
  | "invalid-email"
  | "error"
  | "loading";

export function SignInForm() {
  // Form Fields
  const [email, setEmail] = useState("m.vance@apex.edu");
  const [password, setPassword] = useState("ApexStrict#2025Telemetry!");
  const [rememberStation, setRememberStation] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Validation & UI States
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{
    type: "info" | "error" | "success";
    title?: string;
    message: string;
  } | null>(null);

  // Active prototype simulation state (Defaults to 'filled' as shown in the Stitch reference)
  const [activePreset, setActivePreset] = useState<SignInStatePreset>("filled");

  const validate = (): boolean => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "Institutional work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email =
        "Institutional policy error: Only accredited (.edu / .org) domains permitted.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setFormFeedback({
      type: "info",
      title: "Cryptographic Verification In-Flight",
      message: "Connecting to Apex Quad 01 SSO Node via TLS strict pipe...",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormFeedback({
        type: "success",
        title: "Identity Enclave Validated",
        message:
          "Welcome back Director Vance. Routing to Asset Control Console...",
      });
    }, 1400);
  };

  const handleGoogleSSO = () => {
    setFormFeedback({
      type: "info",
      title: "Federated OAuth2 Relay",
      message: "Connecting to Google Workspace Enterprise IdP gateway...",
    });
  };

  // State Simulation Applicator for Prototype QA
  const applyState = (stateName: SignInStatePreset) => {
    setActivePreset(stateName);
    setErrors({});
    setFormFeedback(null);
    setIsSubmitting(false);

    if (stateName === "empty") {
      setEmail("");
      setPassword("");
    } else if (stateName === "filled") {
      setEmail("m.vance@apex.edu");
      setPassword("ApexStrict#2025Telemetry!");
    } else if (stateName === "invalid-email") {
      setEmail("m.vance@personal-gmail.com");
      setPassword("Password123!");
      setErrors({
        email:
          "Institutional policy error: Only accredited (.edu / .org) domains permitted.",
      });
      setFormFeedback({
        type: "error",
        title: "Unregistered Institutional Domain",
        message:
          "Please use your official university or institutional faculty address.",
      });
    } else if (stateName === "error") {
      setEmail("m.vance@apex.edu");
      setPassword("WrongAccessKey!");
      setFormFeedback({
        type: "error",
        title: "Authentication Handshake Failed (401)",
        message:
          "Invalid credential pair or expired EduPass token. Station session logged.",
      });
    } else if (stateName === "loading") {
      setEmail("m.vance@apex.edu");
      setPassword("••••••••••••••••");
      setIsSubmitting(true);
      setFormFeedback({
        type: "info",
        title: "Cryptographic Verification In-Flight",
        message: "Connecting to Apex Quad 01 SSO Node via TLS strict pipe...",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* ================= WHITE AUTHENTICATION CARD ================= */}
      <div className="bg-white text-[#1a1d15] rounded-2xl shadow-xl p-6 sm:p-8 border border-[#e2e4d6]">
        {/* Form Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[#0041a0] font-sans text-xs font-semibold uppercase tracking-wider">
            <Lock size={14} className="text-[#0041a0]" />
            <span>WORKSPACE AUTHENTICATION</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#f3f5e7] font-mono text-xs text-[#434653] border border-black/5">
            SSO NODE v4
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1a1d15] tracking-tight">
          Welcome back
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#434653] mt-1 mb-6">
          Sign in to access your authorized institution dashboard, asset registers, and dispatch consoles.
        </p>

        {/* Dynamic Alert Banner (Toggled via Prototype Switcher or Form Submit) */}
        {formFeedback && (
          <div
            role="alert"
            className={`mb-4 p-3.5 rounded-xl border flex items-start gap-2.5 text-xs transition-all ${
              formFeedback.type === "error"
                ? "bg-[#ffdad6] text-[#93000a] border-red-200"
                : formFeedback.type === "success"
                ? "bg-[#c8f30c]/25 text-[#171e00] border-[#c8f30c]/40 font-medium"
                : "bg-[#ccd8ff] text-[#001946] border-blue-200"
            }`}
          >
            {formFeedback.type === "error" ? (
              <AlertCircle size={18} className="shrink-0 text-[#93000a] mt-0.5" />
            ) : formFeedback.type === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 text-[#536600] mt-0.5" />
            ) : (
              <Loader2 size={18} className="shrink-0 text-[#0041a0] animate-spin mt-0.5" />
            )}
            <div className="leading-relaxed">
              {formFeedback.title && (
                <p className="font-semibold text-xs mb-0.5">{formFeedback.title}</p>
              )}
              <p>{formFeedback.message}</p>
              {formFeedback.type === "success" && (
                <div className="pt-2 flex items-center gap-3 font-semibold text-xs text-[#0041a0]">
                  <Link href="/dashboard" className="underline hover:opacity-80 flex items-center gap-1">
                    <span>Enter Console</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="institutionEmail"
                className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#434653]"
              >
                Institutional Work Email
              </label>
              <span className="font-mono text-[11px] text-[#536600] font-semibold">
                .EDU / .ORG APPROVED
              </span>
            </div>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
              />
              <input
                id="institutionEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f3f5e7] font-sans text-sm text-[#1a1d15] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#c8f30c] transition-all border ${
                  errors.email ? "border-red-500 ring-2 ring-red-200" : "border-transparent"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 font-sans text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="accountPassword"
                className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#434653]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="font-sans text-xs text-[#0041a0] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Key
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
              />
              <input
                id="accountPassword"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#f3f5e7] font-sans text-sm text-[#1a1d15] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#c8f30c] transition-all border ${
                  errors.password ? "border-red-500 ring-2 ring-red-200" : "border-transparent"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737785] hover:text-[#1a1d15] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 font-sans text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Checkbox & Station Trust */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberStation}
                onChange={(e) => setRememberStation(e.target.checked)}
                className="w-4 h-4 rounded text-[#0041a0] focus:ring-[#c8f30c] accent-[#536600] cursor-pointer"
              />
              <span className="font-sans text-xs text-[#434653]">
                Remember this station (30 days)
              </span>
            </label>
            <span className="font-mono text-[11px] text-[#737785] uppercase">
              FIPS 140-3 COMPLIANT
            </span>
          </div>

          {/* Primary High-Visibility Button (Strict Rule: Dark Text on Citron) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#c8f30c] text-[#030407] font-semibold text-sm hover:brightness-95 active:scale-[0.99] transition-all shadow-md group cursor-pointer disabled:opacity-75 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin text-[#030407]" />
                <span>Verifying Enclave HSM...</span>
              </>
            ) : (
              <>
                <span>Sign In to Institution Workspace</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* SSO Partition */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full h-px bg-[#eeefe2]" />
            <span className="absolute bg-white px-3 font-sans text-[11px] uppercase tracking-wider text-[#737785]">
              OR CONTINUE WITH
            </span>
          </div>

          {/* Google Workspace SSO Button */}
          <button
            type="button"
            onClick={handleGoogleSSO}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#f3f5e7] hover:bg-[#eeefe2] text-[#1a1d15] font-semibold text-sm transition-colors cursor-pointer border border-[#e2e4d6]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google Workspace</span>
          </button>
        </form>

        {/* Bottom Footer Link */}
        <div className="pt-4 mt-4 text-center">
          <p className="font-sans text-xs text-[#434653]">
            New to CampusFix AI?{" "}
            <Link href="/signup" className="text-[#0041a0] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
          <p className="font-sans text-[11px] text-[#737785] mt-2 leading-relaxed">
            Access is managed through your institution&apos;s authorized workspace and single sign-on security policy.
          </p>
        </div>
      </div>

      {/* ================= DOCKED PROTOTYPE STATE SWITCHER (v2.4) ================= */}
      <div className="rounded-2xl p-4 bg-white/[0.04] border border-white/10 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#c8f30c]">
            <SlidersHorizontal size={14} />
            <span>PROTOTYPE STATE SWITCHER (v2.4)</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Click cards to simulate UX flows
          </span>
        </div>

        {/* 5 Compact Interactive State Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {/* State 1: Default Empty */}
          <button
            type="button"
            onClick={() => applyState("empty")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "empty"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold ring-2 ring-[#c8f30c]"
                : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-white"
            }`}
          >
            <div
              className={`font-mono text-xs font-semibold ${
                activePreset === "empty" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Default Empty]
            </div>
            <div
              className={`text-[10px] truncate mt-0.5 ${
                activePreset === "empty" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Initial blank baseline
            </div>
            <div
              className={`mt-2 text-[10px] font-mono font-medium ${
                activePreset === "empty" ? "text-[#030407] font-bold" : "text-zinc-400"
              }`}
            >
              STATUS: IDLE
            </div>
          </button>

          {/* State 2: Field Filled (Active by default) */}
          <button
            type="button"
            onClick={() => applyState("filled")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "filled"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold ring-2 ring-[#c8f30c]"
                : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-white"
            }`}
          >
            <div
              className={`font-mono text-xs font-bold ${
                activePreset === "filled" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Field Filled]
            </div>
            <div
              className={`text-[10px] truncate mt-0.5 ${
                activePreset === "filled" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Pre-filled credentials
            </div>
            <div
              className={`mt-2 text-[10px] font-mono uppercase font-bold ${
                activePreset === "filled" ? "text-[#030407]" : "text-zinc-400"
              }`}
            >
              STATUS: ACTIVE
            </div>
          </button>

          {/* State 3: Invalid Email */}
          <button
            type="button"
            onClick={() => applyState("invalid-email")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "invalid-email"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold ring-2 ring-[#c8f30c]"
                : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-rose-300"
            }`}
          >
            <div
              className={`font-mono text-xs font-semibold ${
                activePreset === "invalid-email" ? "text-[#030407]" : "text-rose-300"
              }`}
            >
              [Invalid Email]
            </div>
            <div
              className={`text-[10px] truncate mt-0.5 ${
                activePreset === "invalid-email" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Syntax &amp; domain error
            </div>
            <div
              className={`mt-2 text-[10px] font-mono font-medium ${
                activePreset === "invalid-email" ? "text-[#030407] font-bold" : "text-rose-400"
              }`}
            >
              ERR_MALFORMED
            </div>
          </button>

          {/* State 4: Simulate Auth 401 Error */}
          <button
            type="button"
            onClick={() => applyState("error")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "error"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold ring-2 ring-[#c8f30c]"
                : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-amber-300"
            }`}
          >
            <div
              className={`font-mono text-xs font-semibold ${
                activePreset === "error" ? "text-[#030407]" : "text-amber-300"
              }`}
            >
              [Simulate Error]
            </div>
            <div
              className={`text-[10px] truncate mt-0.5 ${
                activePreset === "error" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Gateway 401 failure
            </div>
            <div
              className={`mt-2 text-[10px] font-mono font-medium ${
                activePreset === "error" ? "text-[#030407] font-bold" : "text-amber-400"
              }`}
            >
              HTTP 401 UNAUTH
            </div>
          </button>

          {/* State 5: Loading State */}
          <button
            type="button"
            onClick={() => applyState("loading")}
            className={`col-span-2 sm:col-span-1 text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "loading"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold ring-2 ring-[#c8f30c]"
                : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-blue-300"
            }`}
          >
            <div
              className={`font-mono text-xs font-semibold ${
                activePreset === "loading" ? "text-[#030407]" : "text-blue-300"
              }`}
            >
              [Loading State]
            </div>
            <div
              className={`text-[10px] truncate mt-0.5 ${
                activePreset === "loading" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Async TLS handshake
            </div>
            <div
              className={`mt-2 text-[10px] font-mono flex items-center gap-1 ${
                activePreset === "loading" ? "text-[#030407] font-bold" : "text-blue-400"
              }`}
            >
              <RotateCw size={10} className="animate-spin" />
              <span>DISPATCHING</span>
            </div>
          </button>
        </div>

        {/* Architecture Contract Micro-Footnote */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
          <span className="flex items-center gap-1 text-[#c8f30c]">
            <span>✓</span>
            <span>CITRON ACTIVE CONTRAST: #030407 ON #C8F30C (AA COMPLIANT)</span>
          </span>
          <span className="text-[11px] text-zinc-500">TOKEN_SPEC: STRICT RESTORED</span>
        </div>
      </div>
    </div>
  );
}
