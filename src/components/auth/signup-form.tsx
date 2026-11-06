"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Info,
  ArrowRight,
  Loader2,
  Building2,
  RotateCw,
} from "lucide-react";

export type SignUpPresetState =
  | "empty"
  | "filled"
  | "invalid-email"
  | "error"
  | "loading";

export function SignUpForm() {
  // Form Field State (Defaults to 'filled' as shown in the approved Stitch reference)
  const [fullName, setFullName] = useState("Dr. Marcus Vance");
  const [email, setEmail] = useState("m.vance@apex.edu");
  const [password, setPassword] = useState("Enclave#Apex2025");
  const [confirmPassword, setConfirmPassword] = useState("Enclave#Apex2025");
  const [institutionCode, setInstitutionCode] = useState("APEX-CAMPUS-2024");

  // Code Verification State
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(true);

  // Field Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & UI Notices
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [notificationBanner, setNotificationBanner] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>({
    type: "success",
    message: "All input schemas validated with Apex Federated Enclave.",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  // Prototype state simulation preset
  const [activePreset, setActivePreset] = useState<SignUpPresetState>("filled");

  // Dynamic Password Criteria Evaluation
  const criteria = {
    hasMinLength: password.length >= 8,
    hasUpperLower: /[A-Z]/.test(password) && /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const getStrengthScore = () => {
    let score = 0;
    if (criteria.hasMinLength) score++;
    if (criteria.hasUpperLower) score++;
    if (criteria.hasNumber) score++;
    if (criteria.hasSpecial) score++;
    return score;
  };

  const strengthScore = password.length > 0 ? getStrengthScore() : 0;

  const getStrengthLabel = () => {
    if (!password) return { text: "Enter password", color: "text-zinc-500" };
    if (strengthScore <= 1) return { text: "Too weak", color: "text-rose-400" };
    if (strengthScore === 2) return { text: "Moderate", color: "text-amber-400" };
    if (strengthScore === 3) return { text: "Good", color: "text-blue-400" };
    return { text: "Strong Enclave Password", color: "text-[#c8f30c]" };
  };

  const strengthInfo = getStrengthLabel();

  const isPasswordMatching =
    confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  // Validation Logic
  const validateForm = () => {
    const nextErrors: typeof errors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your legal full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nextErrors.email = "Please enter your institutional work email.";
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email =
        "ERR_INVALID_DOMAIN: Institutional work email requires accredited .edu or approved .org realm.";
    }

    if (strengthScore < 3) {
      nextErrors.password = "Password does not meet required security entropy criteria.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "The passwords provided do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (password && confirmPassword && password !== confirmPassword) {
        setNotificationBanner({
          type: "error",
          message: "Credentials discrepancy: The passwords provided do not match.",
        });
      } else {
        setNotificationBanner({
          type: "error",
          message: "Please complete all mandatory credential fields before dispatching.",
        });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setNotificationBanner({
      type: "info",
      message: "Provisioning HSM secure enclave keys & verifying institutional directory...",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setNotificationBanner({
        type: "success",
        message:
          "Credentials encrypted via HSM. Redirecting to workspace telemetry console...",
      });
    }, 1200);
  };

  const handleVerifyCode = () => {
    if (!institutionCode.trim()) {
      setNotificationBanner({
        type: "error",
        message: "Enter an institutional node code to verify (e.g. APEX-CAMPUS-2024).",
      });
      return;
    }

    setIsVerifyingCode(true);
    setTimeout(() => {
      setIsVerifyingCode(false);
      setIsCodeVerified(true);
      setNotificationBanner({
        type: "success",
        message: `Verified node ${institutionCode.trim().toUpperCase()} linked to Apex Institute North Quad.`,
      });
    }, 600);
  };

  const handleSSOClick = () => {
    setNotificationBanner({
      type: "info",
      message:
        "Connecting to Google Workspace / EduPass SAML SSO authentication gateway...",
    });
  };

  // State Switcher Applicator
  const applyState = (stateName: SignUpPresetState) => {
    setActivePreset(stateName);
    setErrors({});
    setIsSubmitting(false);
    setSubmitSuccess(false);

    if (stateName === "empty") {
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setInstitutionCode("");
      setIsCodeVerified(false);
      setNotificationBanner(null);
    } else if (stateName === "filled") {
      setFullName("Dr. Marcus Vance");
      setEmail("m.vance@apex.edu");
      setPassword("Enclave#Apex2025");
      setConfirmPassword("Enclave#Apex2025");
      setInstitutionCode("APEX-CAMPUS-2024");
      setIsCodeVerified(true);
      setNotificationBanner({
        type: "success",
        message: "All input schemas validated with Apex Federated Enclave.",
      });
    } else if (stateName === "invalid-email") {
      setFullName("Dr. Marcus Vance");
      setEmail("marcus.vance@personal-mail.com");
      setPassword("Enclave#Apex2025");
      setConfirmPassword("Enclave#Apex2025");
      setInstitutionCode("APEX-CAMPUS-2024");
      setIsCodeVerified(true);
      setErrors({
        email:
          "ERR_INVALID_DOMAIN: Institutional work email requires accredited .edu or approved .org realm.",
      });
      setNotificationBanner({
        type: "error",
        message:
          "ERR_INVALID_DOMAIN: Institutional work email requires accredited .edu or approved .org realm.",
      });
    } else if (stateName === "error") {
      setFullName("Dr. Marcus Vance");
      setEmail("m.vance@apex.edu");
      setPassword("Enclave#Apex2025");
      setConfirmPassword("MismatchPass#99");
      setInstitutionCode("APEX-CAMPUS-2024");
      setIsCodeVerified(false);
      setErrors({
        confirmPassword: "The passwords provided do not match.",
      });
      setNotificationBanner({
        type: "error",
        message:
          "GATEWAY_ERROR 422: Node code APEX-CAMPUS-2024 capacity threshold reached for active seat cohort.",
      });
    } else if (stateName === "loading") {
      setFullName("Dr. Marcus Vance");
      setEmail("m.vance@apex.edu");
      setPassword("Enclave#Apex2025");
      setConfirmPassword("Enclave#Apex2025");
      setInstitutionCode("APEX-CAMPUS-2024");
      setIsCodeVerified(true);
      setIsSubmitting(true);
      setNotificationBanner({
        type: "info",
        message:
          "Provisioning HSM secure enclave keys & verifying institutional directory...",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Registration Card Container */}
      <div className="bg-white/[0.04] rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md border border-white/10 text-white">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#c8f30c] flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
            Workspace Onboarding
          </span>
          <span className="font-mono text-[11px] text-zinc-400">
            APEX INST. REGISTRATION PORTAL
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight mt-1 mb-1">
          Create your account
        </h2>
        <p className="font-sans text-sm text-zinc-300 mb-6">
          Get started with smarter campus telemetry and predictive facilities management.
        </p>

        {/* Dynamic Notification / State Banner */}
        {notificationBanner && (
          <div
            className={`mb-5 p-3 rounded-xl font-mono text-xs flex items-center justify-between border transition-all ${
              notificationBanner.type === "success"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-semibold"
                : notificationBanner.type === "error"
                ? "bg-rose-950/80 text-rose-200 border-rose-500/40"
                : "bg-blue-950/80 text-blue-200 border-blue-500/40"
            }`}
          >
            <div className="flex items-center gap-2">
              {notificationBanner.type === "success" && (
                <CheckCircle2 size={16} className="text-[#030407] shrink-0" />
              )}
              {notificationBanner.type === "error" && (
                <AlertCircle size={16} className="text-rose-400 shrink-0" />
              )}
              {notificationBanner.type === "info" && (
                <RotateCw size={15} className="animate-spin text-blue-400 shrink-0" />
              )}
              <span className="leading-snug">{notificationBanner.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationBanner(null)}
              className="text-xs opacity-75 hover:opacity-100 p-1 cursor-pointer shrink-0 ml-2"
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleFormSubmit} noValidate className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="signup-fullname"
                className="block text-[11px] font-mono tracking-wider uppercase font-semibold text-zinc-400"
              >
                Full Name
              </label>
            </div>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                id="signup-fullname"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName)
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="Enter legal full name"
                className="w-full bg-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 font-sans text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] focus:ring-1 focus:ring-[#c8f30c] border border-white/10 transition-all"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-rose-400 font-mono mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Institutional Work Email */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="signup-email"
                className="block text-[11px] font-mono tracking-wider uppercase font-semibold text-zinc-400"
              >
                Institutional Work Email
              </label>
              <span className="font-mono text-[11px] text-[#c8f30c] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
                .EDU / .ORG APPROVED
              </span>
            </div>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@university.edu"
                className="w-full bg-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 font-sans text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] focus:ring-1 focus:ring-[#c8f30c] border border-white/10 transition-all"
              />
            </div>
            <p className="font-sans text-xs text-zinc-400">
              Use your academic or research institution email for automatic directory linkage.
            </p>
            {errors.email && (
              <p className="text-xs text-rose-400 font-mono mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password & Confirm Password (Two Columns on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="signup-password"
                className="block text-[11px] font-mono tracking-wider uppercase font-semibold text-zinc-400"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.06] rounded-xl pl-10 pr-10 py-2.5 font-sans text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] focus:ring-1 focus:ring-[#c8f30c] border border-white/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="signup-confirm-password"
                className="block text-[11px] font-mono tracking-wider uppercase font-semibold text-zinc-400"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.06] rounded-xl pl-10 pr-16 py-2.5 font-sans text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1] focus:ring-1 focus:ring-[#c8f30c] border border-white/10 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {isPasswordMatching && (
                    <CheckCircle2 size={15} className="text-[#c8f30c]" />
                  )}
                  {isPasswordMismatch && (
                    <XCircle size={15} className="text-rose-400" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-0.5"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {(errors.password || errors.confirmPassword) && (
            <p className="text-xs text-rose-400 font-mono">
              {errors.password || errors.confirmPassword}
            </p>
          )}

          {/* Password Strength Indicator */}
          <div className="bg-white/[0.03] rounded-xl p-3.5 space-y-2 border border-white/5">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-zinc-400 uppercase tracking-wider">
                Password Strength
              </span>
              <span className={`font-semibold ${strengthInfo.color}`}>
                {strengthInfo.text}
              </span>
            </div>

            {/* 4-segment gauge */}
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`rounded-full transition-colors duration-300 ${
                    strengthScore >= step
                      ? strengthScore === 4
                        ? "bg-[#c8f30c]"
                        : strengthScore === 3
                        ? "bg-blue-400"
                        : "bg-amber-400"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Checklist */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-400 pt-1">
              <span
                className={`flex items-center gap-1 ${
                  criteria.hasMinLength ? "text-[#c8f30c]" : "text-zinc-500"
                }`}
              >
                <Check size={12} strokeWidth={3} /> 8+ Chars
              </span>
              <span
                className={`flex items-center gap-1 ${
                  criteria.hasUpperLower ? "text-[#c8f30c]" : "text-zinc-500"
                }`}
              >
                <Check size={12} strokeWidth={3} /> Uppercase &amp; Lower
              </span>
              <span
                className={`flex items-center gap-1 ${
                  criteria.hasNumber ? "text-[#c8f30c]" : "text-zinc-500"
                }`}
              >
                <Check size={12} strokeWidth={3} /> Numeric
              </span>
              <span
                className={`flex items-center gap-1 ${
                  criteria.hasSpecial ? "text-[#c8f30c]" : "text-zinc-500"
                }`}
              >
                <Check size={12} strokeWidth={3} /> Special Symbol
              </span>
            </div>
          </div>

          {/* Connect to Your Institution Box */}
          <div className="rounded-xl bg-white/[0.03] p-4 space-y-3 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-blue-400" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold">
                  Connect to your Institution
                </span>
              </div>
              {isCodeVerified ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#c8f30c]/20 text-[#c8f30c] font-semibold border border-[#c8f30c]/30">
                  CAMPUS VERIFIED
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-400 border border-white/10">
                  UNLINKED NODE
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-institution-code"
                className="block font-sans text-xs text-zinc-400"
              >
                Institution or Campus Node Code{" "}
                <span className="text-zinc-500">(Optional)</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="input-institution-code"
                  type="text"
                  value={institutionCode}
                  onChange={(e) => {
                    setInstitutionCode(e.target.value.toUpperCase());
                    setIsCodeVerified(false);
                  }}
                  placeholder="E.G. APEX-CAMPUS-2024"
                  className="flex-1 bg-white/[0.06] rounded-xl px-3.5 py-2 font-mono text-xs text-white uppercase placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#c8f30c] border border-white/10"
                />
                <button
                  type="button"
                  id="btn-verify-code"
                  disabled={isVerifyingCode}
                  onClick={handleVerifyCode}
                  className={`px-4 py-2 font-sans text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    isCodeVerified
                      ? "bg-[#c8f30c] text-[#030407]"
                      : "bg-[#1558c9] hover:bg-[#10439b] text-white"
                  }`}
                >
                  {isVerifyingCode ? (
                    <>
                      <RotateCw size={12} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : isCodeVerified ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Verify</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-sans text-xs text-zinc-400">
                Enter code provided by your facility manager or department admin.
              </p>
            </div>

            {/* Important Disclaimer Banner */}
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.04] border border-white/5 font-sans text-xs text-zinc-400">
              <Info size={14} className="shrink-0 mt-0.5 text-zinc-400" />
              <span>
                New accounts do not receive privileged administrative access automatically.
                Institution-level write permissions require node-lead authorization.
              </span>
            </div>
          </div>

          {/* Primary High-Visibility Action Button (Strict Citron Contrast Rule) */}
          <div>
            <button
              id="submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl bg-[#c8f30c] hover:bg-[#b8e20b] text-[#030407] font-sans font-bold text-sm sm:text-[15px] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-wait"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin text-[#030407]" />
                  <span>Provisioning Account Enclave...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <span>Provisioned Successfully</span>
                  <Check size={18} strokeWidth={3} />
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={17} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>

          {/* Alternate Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full border-t border-white/10" />
            <span className="absolute px-3 bg-[#262a22] font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              OR CONTINUE WITH
            </span>
          </div>

          {/* Google / EduPass SSO Action Button */}
          <button
            type="button"
            onClick={handleSSOClick}
            className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-sans text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
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
            <span>Continue with Google Workspace / EduPass SSO</span>
          </button>

          {/* Bottom Legal & Nav Links */}
          <div className="text-center pt-2 space-y-1.5">
            <p className="font-sans text-xs text-zinc-400">
              Already have an enterprise account?{" "}
              <Link
                href="/signin"
                className="text-[#c8f30c] font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
            <p className="font-mono text-[11px] text-zinc-500">
              CampusFix AI Enterprise Edition •{" "}
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>{" "}
              •{" "}
              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="hover:underline cursor-pointer"
              >
                Terms of Service
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* ================= INTEGRATED PROTOTYPE STATE SWITCHER (v2.4-SIM) ================= */}
      <div className="bg-white/[0.03] rounded-2xl p-4 sm:p-5 border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#c8f30c] flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
              PROTOTYPE STATE SWITCHER
            </span>
            <span className="font-mono text-[11px] text-zinc-500">v2.4-SIM</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500 hidden sm:inline">
            Click state to preview visual feedback
          </span>
        </div>

        {/* Five Compact State Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {/* 1. Default Empty */}
          <button
            type="button"
            onClick={() => applyState("empty")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "empty"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold shadow-md"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/5 text-zinc-300"
            }`}
          >
            <div
              className={`font-mono text-[10px] ${
                activePreset === "empty" ? "text-[#030407]/75 font-bold" : "text-zinc-500"
              }`}
            >
              01. BASE
            </div>
            <div
              className={`font-mono text-xs font-semibold mt-0.5 ${
                activePreset === "empty" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Default Empty]
            </div>
            <div
              className={`text-[10px] font-mono truncate mt-1 ${
                activePreset === "empty" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Blank baseline
            </div>
          </button>

          {/* 2. Field Focus / Filled (Active by default) */}
          <button
            type="button"
            onClick={() => applyState("filled")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "filled"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold shadow-md"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/5 text-zinc-300"
            }`}
          >
            <div
              className={`font-mono text-[10px] ${
                activePreset === "filled" ? "text-[#030407]/75 font-bold" : "text-zinc-500"
              }`}
            >
              02. ACTIVE
            </div>
            <div
              className={`font-mono text-xs font-semibold mt-0.5 ${
                activePreset === "filled" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Field Filled]
            </div>
            <div
              className={`text-[10px] font-mono truncate mt-1 ${
                activePreset === "filled" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Pre-filled credentials
            </div>
          </button>

          {/* 3. Invalid Email */}
          <button
            type="button"
            onClick={() => applyState("invalid-email")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "invalid-email"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold shadow-md"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/5 text-zinc-300"
            }`}
          >
            <div
              className={`font-mono text-[10px] ${
                activePreset === "invalid-email"
                  ? "text-[#030407]/75 font-bold"
                  : "text-rose-400"
              }`}
            >
              03. WARN
            </div>
            <div
              className={`font-mono text-xs font-semibold mt-0.5 ${
                activePreset === "invalid-email" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Invalid Email]
            </div>
            <div
              className={`text-[10px] font-mono truncate mt-1 ${
                activePreset === "invalid-email" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Syntax / non-.edu
            </div>
          </button>

          {/* 4. Simulate Error */}
          <button
            type="button"
            onClick={() => applyState("error")}
            className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "error"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold shadow-md"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/5 text-zinc-300"
            }`}
          >
            <div
              className={`font-mono text-[10px] ${
                activePreset === "error"
                  ? "text-[#030407]/75 font-bold"
                  : "text-amber-400"
              }`}
            >
              04. CRIT
            </div>
            <div
              className={`font-mono text-xs font-semibold mt-0.5 ${
                activePreset === "error" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Simulate Error]
            </div>
            <div
              className={`text-[10px] font-mono truncate mt-1 ${
                activePreset === "error" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              Gateway 422 rejected
            </div>
          </button>

          {/* 5. Loading State */}
          <button
            type="button"
            onClick={() => applyState("loading")}
            className={`col-span-2 sm:col-span-1 text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
              activePreset === "loading"
                ? "bg-[#c8f30c] text-[#030407] border-[#c8f30c] font-bold shadow-md"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/5 text-zinc-300"
            }`}
          >
            <div
              className={`font-mono text-[10px] ${
                activePreset === "loading"
                  ? "text-[#030407]/75 font-bold"
                  : "text-blue-400"
              }`}
            >
              05. ASYNC
            </div>
            <div
              className={`font-mono text-xs font-semibold mt-0.5 ${
                activePreset === "loading" ? "text-[#030407]" : "text-white"
              }`}
            >
              [Loading State]
            </div>
            <div
              className={`text-[10px] font-mono truncate mt-1 ${
                activePreset === "loading" ? "text-[#030407]/80" : "text-zinc-400"
              }`}
            >
              TLS provisioning
            </div>
          </button>
        </div>

        {/* Documentation Matrix inside Switcher */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-400 gap-2">
          <span className="flex items-center gap-1.5 text-[#c8f30c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f30c]" />
            <span>Rule: Architectural Citron (#C5EA32) strictly pairs with dark typography (#030407)</span>
          </span>
          <span className="text-zinc-500">ENCLAVE FEDERATION READY · ISO-55001</span>
        </div>
      </div>

      {/* Accessible Institutional Legal Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md p-6 rounded-2xl shadow-2xl border bg-[#090D16] border-white/10 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-semibold text-base">
                {activeModal === "privacy"
                  ? "Institutional Privacy Protocol"
                  : "CampusFix AI Terms of Service"}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="text-xs space-y-2.5 leading-relaxed text-zinc-300 max-h-60 overflow-y-auto pr-1">
              {activeModal === "privacy" ? (
                <>
                  <p>
                    CampusFix AI manages facilities telemetry, asset state, and maintenance workflows for authorized academic and research institutions.
                  </p>
                  <p>
                    Personal credential data is encrypted at rest using enterprise-grade cryptographic standards. Telemetry streams and work order records remain under the strict custodial control of the participating tenant.
                  </p>
                  <p>
                    For institutional data sovereignty inquiries, contact your campus information security officer.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Access to CampusFix AI is restricted to authorized campus facility directors, operational staff, technicians, and departmental custodians.
                  </p>
                  <p>
                    Account registration establishes an institutional identity subject to administrative verification and department chair role authorization.
                  </p>
                  <p>
                    All asset modifications and dispatch actions are logged in the immutable operational audit ledger.
                  </p>
                </>
              )}
            </div>
            <div className="mt-5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#1558c9] hover:bg-[#10439b] text-white transition-colors cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
