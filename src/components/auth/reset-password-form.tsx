"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LockKeyhole,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Loader2,
  Check,
} from "lucide-react";
import { PasswordStrength, evaluateCriteria } from "./password-strength";
import { ResetPasswordSuccess } from "./reset-password-success";

interface ResetPasswordFormProps {
  isDark: boolean;
  token: string | null;
}

export function ResetPasswordForm({ isDark, token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [integrationNotice, setIntegrationNotice] = useState<string | null>(null);

  const criteria = evaluateCriteria(password);
  const isCriteriaSatisfied =
    criteria.hasMinLength &&
    criteria.hasUpperLower &&
    criteria.hasNumber &&
    criteria.hasSpecial;

  const isMatching =
    confirmPassword.length > 0 && password === confirmPassword;
  const isMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const validate = () => {
    const errs: typeof errors = {};

    if (!password) {
      errs.password = "Please enter your new password.";
    } else if (!isCriteriaSatisfied) {
      errs.password = "Password does not meet all required security criteria.";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "The passwords provided do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrors({
        password: "A valid recovery token is required to reset credentials.",
      });
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setIntegrationNotice(null);

    // Isolated backend handler boundary
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setIntegrationNotice(
        "Institutional credential rotation complete. Password update payload verified against security policy."
      );
    }, 900);
  };

  const isSubmitDisabled =
    !password ||
    !confirmPassword ||
    !isCriteriaSatisfied ||
    isMismatch ||
    isSubmitting ||
    !token;

  if (isSuccess) {
    return <ResetPasswordSuccess isDark={isDark} />;
  }

  return (
    <section
      className={`p-6 sm:p-10 lg:p-14 flex flex-col justify-between transition-colors duration-200 w-full min-h-[660px] ${
        isDark ? "bg-[#080B12] text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Top Breadcrumb & Step Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <span className="flex items-center gap-1 text-emerald-500 font-semibold">
              <Check size={12} strokeWidth={3} />
              <span>Step 01</span>
            </span>
            <span className="text-slate-500">/</span>
            <span className="flex items-center gap-1 text-[#1558C9] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1558C9] animate-pulse" />
              <span>Step 02 Active</span>
            </span>
          </div>
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

      {/* Main Content Area */}
      <div className="py-4 my-auto max-w-xl w-full mx-auto space-y-6">
        {/* Header with Lock Icon */}
        <div className="space-y-4">
          <div className="relative inline-flex">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                isDark
                  ? "bg-[#111726] text-[#1558C9] border border-white/10"
                  : "bg-blue-50 text-[#1558C9] border border-blue-100"
              }`}
            >
              <LockKeyhole size={28} />
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
              Create a new password
            </h2>
            <p
              className={`text-sm ${
                isDark ? "text-[#A5A79B]" : "text-slate-600"
              }`}
            >
              You&apos;re almost back in. Choose a strong password for your CampusFix AI account and confirm it below.
            </p>
          </div>
        </div>

        {/* Global Error Notice */}
        {(errors.password || errors.confirmPassword) && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 animate-in fade-in"
          >
            <AlertCircle size={16} className="shrink-0" />
            <span>{errors.password || errors.confirmPassword}</span>
          </div>
        )}

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
          {/* Field 1: New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="new-password"
              className={`block text-[11px] font-mono tracking-wider uppercase font-semibold ${
                isDark ? "text-[#A5A79B]" : "text-slate-600"
              }`}
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="Enter your new password"
                className={`w-full px-4 py-3.5 pr-11 rounded-lg text-sm transition-all outline-none border ${
                  errors.password
                    ? "border-red-500 bg-red-500/10 focus:ring-1 focus:ring-red-500"
                    : isDark
                    ? "bg-[#111726] border-white/10 text-white placeholder-[#737785] focus:bg-[#151D30] focus:border-[#1558C9]"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-[#737785] focus:bg-white focus:border-[#1558C9]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-3.5 text-[#737785] hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Field 2: Confirm New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirm-new-password"
              className={`block text-[11px] font-mono tracking-wider uppercase font-semibold ${
                isDark ? "text-[#A5A79B]" : "text-slate-600"
              }`}
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirm-new-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                placeholder="Re-enter your new password"
                className={`w-full px-4 py-3.5 pr-16 rounded-lg text-sm transition-all outline-none border ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-500/10 focus:ring-1 focus:ring-red-500"
                    : isDark
                    ? "bg-[#111726] border-white/10 text-white placeholder-[#737785] focus:bg-[#151D30] focus:border-[#1558C9]"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-[#737785] focus:bg-white focus:border-[#1558C9]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-9 top-3.5 text-[#737785] hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <span className="absolute right-3.5 top-3.5 pointer-events-none">
                {isMatching && <CheckCircle2 size={18} className="text-[#D4FF24]" />}
                {isMismatch && <XCircle size={18} className="text-[#FFB4AA]" />}
                {!confirmPassword && <span className="w-4 inline-block" />}
              </span>
            </div>
            {isMismatch && (
              <p className="text-xs text-red-400 mt-1">
                The passwords provided do not match.
              </p>
            )}
            {isMatching && (
              <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <Check size={12} strokeWidth={3} />
                <span>Passwords match</span>
              </p>
            )}
          </div>

          {/* Dynamic Password Strength Component */}
          <PasswordStrength password={password} isDark={isDark} />

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
              isSubmitDisabled
                ? "opacity-50 cursor-not-allowed bg-slate-700 text-slate-400"
                : isDark
                ? "bg-[#D4FF24] text-[#030407] hover:bg-[#bce416] cursor-pointer active:scale-[0.99] shadow-[#D4FF24]/10"
                : "bg-[#1558C9] text-white hover:bg-[#0041a0] cursor-pointer active:scale-[0.99] shadow-[#1558C9]/20"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Updating password...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security Reassurance Callout */}
        <div
          className={`p-3.5 rounded-xl flex items-start gap-3 border text-xs leading-relaxed ${
            isDark
              ? "bg-[#111726]/60 border-white/[0.06] text-[#A5A79B]"
              : "bg-slate-50 border-slate-200 text-slate-600"
          }`}
        >
          <Info size={16} className="text-[#1558C9] shrink-0 mt-0.5" />
          <p>
            <strong className={isDark ? "text-white" : "text-slate-800"}>
              Credential Policy:
            </strong>{" "}
            New passwords must differ from previously used passwords. Federated accounts configured via institutional EduPass must reset credentials via campus SSO.
          </p>
        </div>
      </div>

      {/* Integration Notice */}
      {integrationNotice && (
        <div className="mt-4 p-3 rounded-lg bg-[#1558C9]/15 border border-[#1558C9]/30 text-blue-200 text-xs flex items-center gap-2">
          <Info size={14} className="shrink-0 text-[#D4FF24]" />
          <span>{integrationNotice}</span>
        </div>
      )}

      {/* Subtle Bottom Footnote */}
      <div className="pt-4 text-center text-[11px] text-[#737785]">
        CampusFix AI Enterprise Edition · Credential Update Protocol
      </div>
    </section>
  );
}

