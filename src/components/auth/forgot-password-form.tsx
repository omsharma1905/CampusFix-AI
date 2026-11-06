"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  ArrowLeft,
  ArrowRight,
  Mail,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { RecoverySuccessView } from "./recovery-success-view";

interface ForgotPasswordFormProps {
  isDark: boolean;
}

export function ForgotPasswordForm({ isDark }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [integrationNotice, setIntegrationNotice] = useState<string | null>(null);

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) {
      setError("Please enter your institutional email address.");
      return false;
    }

    // Standard RFC-compliant email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError("Enter a valid institutional email (.edu, .org, or authorized domain).");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    setIntegrationNotice(null);

    // Isolated recovery submission boundary
    // Validates credentials format and safely demonstrates the check-inbox flow
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      setIntegrationNotice(
        "Institutional Recovery Gateway: Request validated. When a live SMTP/IdP service is connected, an ephemeral token will be dispatched."
      );
    }, 700);
  };

  return (
    <section
      className={`p-6 sm:p-10 lg:p-14 flex flex-col justify-between transition-colors duration-200 w-full min-h-[660px] ${
        isDark ? "bg-[#080B12] text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1558C9] animate-pulse" />
          <span className="font-mono text-xs uppercase text-[#1558C9] font-bold tracking-wider">
            Workspace Identity Recovery · Step 01 / 02
          </span>
        </div>
        <Link
          href="/signin"
          className={`flex items-center gap-1 text-xs font-medium transition-colors group cursor-pointer ${
            isDark
              ? "text-[#A5A79B] hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* Middle Content: Form View OR Check Inbox Confirmation View */}
      <div className="py-6 my-auto max-w-xl w-full mx-auto">
        {isSubmittedSuccess ? (
          <RecoverySuccessView
            email={email}
            isDark={isDark}
            onResetForm={() => {
              setIsSubmittedSuccess(false);
              setEmail("");
              setError(null);
              setIntegrationNotice(null);
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Lock Reset Icon & Header */}
            <div className="space-y-4">
              <div className="relative inline-flex">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                    isDark
                      ? "bg-[#111726] text-[#1558C9] border border-white/10"
                      : "bg-blue-50 text-[#1558C9] border border-blue-100"
                  }`}
                >
                  <KeyRound size={28} />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4FF24]/20 flex items-center justify-center border border-[#D4FF24]/40">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF24]" />
                </span>
              </div>

              <div className="space-y-1.5">
                <h2
                  className={`font-serif text-3xl sm:text-4xl tracking-tight font-medium ${
                    isDark ? "text-white" : "text-[#030407]"
                  }`}
                >
                  Forgot your password?
                </h2>
                <p
                  className={`text-sm ${
                    isDark ? "text-[#A5A79B]" : "text-slate-600"
                  }`}
                >
                  Don&apos;t worry, it happens. Enter the email address associated with your account and we&apos;ll help you get back in.
                </p>
              </div>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 animate-in fade-in"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Recovery Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="recovery-email-input"
                    className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Institutional Work Email
                  </label>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      isDark
                        ? "bg-[#111726] text-[#D4FF24] border border-white/10"
                        : "bg-slate-100 text-[#1558C9] border border-slate-200"
                    }`}
                  >
                    .EDU / .ORG APPROVED
                  </span>
                </div>

                <div
                  className={`relative rounded-xl overflow-hidden shadow-sm transition-all border ${
                    error
                      ? "border-red-500 bg-red-500/10 ring-1 ring-red-500"
                      : isDark
                      ? "bg-[#111726] border-white/10 focus-within:border-[#1558C9] focus-within:ring-1 focus-within:ring-[#1558C9]"
                      : "bg-slate-50 border-slate-200 focus-within:border-[#1558C9] focus-within:ring-1 focus-within:ring-[#1558C9] focus-within:bg-white"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737785]">
                    <Mail size={18} />
                  </div>
                  <input
                    id="recovery-email-input"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="you@institution.edu"
                    className={`w-full pl-10 pr-4 py-3.5 text-sm bg-transparent outline-none ${
                      isDark
                        ? "text-white placeholder-[#737785]"
                        : "text-slate-900 placeholder-[#737785]"
                    }`}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                } ${
                  isDark
                    ? "bg-[#1558C9] hover:bg-[#10439B] text-white"
                    : "bg-[#1558C9] hover:bg-[#0041a0] text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Return to login link */}
            <div className="text-center pt-1">
              <Link
                href="/signin"
                className={`text-xs hover:underline transition-colors ${
                  isDark ? "text-[#A5A79B]" : "text-slate-600"
                }`}
              >
                Remember your credentials?{" "}
                <span
                  className={`font-semibold underline underline-offset-4 ${
                    isDark ? "text-[#D4FF24]" : "text-[#1558C9]"
                  }`}
                >
                  Return to login
                </span>
              </Link>
            </div>

            {/* Informational Security Notice */}
            <div
              className={`p-4 rounded-xl flex items-start gap-3 border ${
                isDark
                  ? "bg-[#111726]/60 border-white/[0.06] text-[#A5A79B]"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <Info size={18} className="text-[#1558C9] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                <strong
                  className={`font-medium ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  Ephemeral Token Policy:
                </strong>{" "}
                For security reasons, recovery links expire after a limited period. Federated EduPass accounts must reset credentials directly via their campus IdP identity hub.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Integration Notice Bar if active */}
      {integrationNotice && (
        <div className="mt-4 p-3 rounded-lg bg-[#1558C9]/15 border border-[#1558C9]/30 text-blue-200 text-xs flex items-center gap-2">
          <Info size={14} className="shrink-0 text-[#D4FF24]" />
          <span>{integrationNotice}</span>
        </div>
      )}

      {/* Subtle Bottom Note */}
      <div className="pt-4 text-center text-[11px] text-[#737785]">
        CampusFix AI Enterprise Edition · Identity Recovery Protocol
      </div>
    </section>
  );
}

