"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Copy,
  Check,
  Edit3,
  RotateCw,
  Info,
  Clock,
  GraduationCap,
} from "lucide-react";
import { useAuthTheme } from "./auth-theme-context";

export type VerificationState =
  | "pending"
  | "checking"
  | "resending"
  | "cooldown"
  | "verified"
  | "expired"
  | "error";

export interface StateConfig {
  stage: number;
  statusText: string;
  payload: string;
  banner: {
    type: "info" | "success" | "warning" | "error" | "resend";
    class: string;
    lightClass: string;
    message: string;
    title?: string;
  } | null;
  btnText: string;
  btnArrow?: boolean;
  btnClass: string;
  btnDisabled: boolean;
}

export const statesConfig: Record<VerificationState, StateConfig> = {
  pending: {
    stage: 1,
    statusText: "STAGE 1 — PENDING (WAITING FOR USER INBOX HANDSHAKE)",
    payload: "AUTH_TOKEN_PENDING",
    banner: null,
    btnText: "I've verified my email",
    btnArrow: true,
    btnClass:
      "bg-[#C5EA32] text-[#030407] hover:bg-[#D3F542] shadow-[0_0_24px_-4px_rgba(197,234,50,0.35)]",
    btnDisabled: false,
  },
  checking: {
    stage: 2,
    statusText: "STAGE 2 — CHECKING (POLLING APEX QUAD HSM REGISTRY...)",
    payload: "HSM_RESOLVE_HASH_POLL_RUNNING",
    banner: {
      type: "info",
      class: "bg-[#1558C9]/20 border-[#1558C9] text-blue-300",
      lightClass: "bg-blue-50 border-blue-300 text-blue-900",
      message:
        "Verifying cryptographic signature against Apex Central Auth Node... Please wait.",
    },
    btnText: "Handshake in progress...",
    btnClass: "bg-zinc-800 text-zinc-400 cursor-wait",
    btnDisabled: true,
  },
  resending: {
    stage: 3,
    statusText: "STAGE 3 — RESENDING (DISPATCHING FRESH ENCRYPTED TOKEN)",
    payload: "TOKEN_RELAY_DISPATCH_TRIGGERED",
    banner: {
      type: "resend",
      class: "bg-[#C5EA32]/15 border-[#C5EA32]/40 text-[#C5EA32]",
      lightClass: "bg-[#C5EA32]/25 border-[#C5EA32] text-[#2F3B00] font-medium",
      message:
        "Fresh cryptographic handshake transmitted to recipient inbox. Token TTL reset to 15:00 min.",
    },
    btnText: "Handshake Redispatched ✓",
    btnClass:
      "bg-[#C5EA32] text-[#030407] font-bold shadow-[0_0_24px_-4px_rgba(197,234,50,0.35)]",
    btnDisabled: false,
  },
  cooldown: {
    stage: 4,
    statusText: "STAGE 4 — COOLDOWN (SECURITY RATE-LIMIT IN EFFECT: 30s)",
    payload: "THROTTLE_WINDOW_ACTIVE_30S",
    banner: {
      type: "warning",
      class: "bg-amber-500/20 border-amber-500 text-amber-300",
      lightClass: "bg-amber-50 border-amber-300 text-amber-900",
      message:
        "Rate-limit cooldown active. Institutional security throttle prevents multiple simultaneous token requests.",
    },
    btnText: "I've verified my email",
    btnArrow: true,
    btnClass:
      "bg-[#C5EA32] text-[#030407] hover:bg-[#D3F542] shadow-[0_0_24px_-4px_rgba(197,234,50,0.35)]",
    btnDisabled: false,
  },
  verified: {
    stage: 5,
    statusText: "STAGE 5 — VERIFIED (ACCESS GRANTED TO APEX DISPATCH)",
    payload: "STATUS_200_ACCESS_TOKEN_ISSUED",
    banner: {
      type: "success",
      class: "bg-emerald-500/20 border-emerald-500 text-emerald-300",
      lightClass: "bg-emerald-50 border-emerald-300 text-emerald-900",
      title: "✓ Handshake Verified:",
      message:
        "Transponder identity confirmed. Launching campus operations console in 3s...",
    },
    btnText: "✓ Node Verified — Entering Gateway",
    btnClass: "bg-emerald-400 text-[#030407] font-bold shadow-sm",
    btnDisabled: true,
  },
  expired: {
    stage: 6,
    statusText: "STAGE 6 — EXPIRED (TOKEN TTL ELAPSED AFTER 15 MIN)",
    payload: "AUTH_TOKEN_TIMEOUT_EXPIRED",
    banner: {
      type: "error",
      class: "bg-rose-500/20 border-rose-500 text-rose-300",
      lightClass: "bg-rose-50 border-rose-300 text-rose-900",
      title: "Token Expired:",
      message:
        "Ephemeral mesh token exceeded 15:00 MIN TTL validity. Please click 'Resend verification email' below.",
    },
    btnText: "Token Expired — Request New Token",
    btnClass: "bg-zinc-800 text-rose-400 border border-rose-500/50",
    btnDisabled: false,
  },
  error: {
    stage: 7,
    statusText: "STAGE 7 — ERROR (502 GATEWAY HANDSHAKE ABORT)",
    payload: "ERR_502_BAD_GATEWAY_NODE_UNREACHABLE",
    banner: {
      type: "error",
      class: "bg-red-500/20 border-red-500 text-red-300",
      lightClass: "bg-red-50 border-red-300 text-red-900",
      title: "Security Enclave Alert:",
      message:
        "Gateway handshake failed (502 Bad Gateway). Institutional relay could not reach key server. Retry in 15 seconds.",
    },
    btnText: "Retry Verification Handshake",
    btnClass: "bg-red-600 text-white font-bold",
    btnDisabled: false,
  },
};

export const presetButtons = [
  { id: "pending" as VerificationState, index: "01", title: "Default Pending", sub: "Initial baseline", dotColor: "bg-[#1558C9]" },
  { id: "checking" as VerificationState, index: "02", title: "Simulate Checking", sub: "API handshake", dotColor: "bg-blue-400" },
  { id: "cooldown" as VerificationState, index: "03", title: "Rate-Limit Cooldown", sub: "30s throttle", dotColor: "bg-amber-400" },
  { id: "verified" as VerificationState, index: "04", title: "Verified Pass", sub: "Auth validated", dotColor: "bg-emerald-400" },
  { id: "expired" as VerificationState, index: "05", title: "Token Expired", sub: "TTL elapsed", dotColor: "bg-rose-400" },
  { id: "error" as VerificationState, index: "06", title: "Handshake Error", sub: "502 gateway", dotColor: "bg-red-600" },
];

export const stageButtons = [
  { stage: 1, id: "pending" as VerificationState, title: "1. Pending", badge: "[Active]" },
  { stage: 2, id: "checking" as VerificationState, title: "2. Checking", badge: "[Poll]" },
  { stage: 3, id: "resending" as VerificationState, title: "3. Resending", badge: "[Dispatch]" },
  { stage: 4, id: "cooldown" as VerificationState, title: "4. Cooldown", badge: "[Lock: 30s]" },
  { stage: 5, id: "verified" as VerificationState, title: "5. Verified", badge: "[Passed]" },
  { stage: 6, id: "expired" as VerificationState, title: "6. Expired", badge: "[Timeout]" },
  { stage: 7, id: "error" as VerificationState, title: "7. Error", badge: "[Abort]" },
];

export interface VerifyEmailFormProps {
  initialEmail?: string;
  email?: string;
  onEmailChange?: (email: string) => void;
  activeState?: VerificationState;
  onStateChange?: (state: VerificationState) => void;
  cooldownSeconds?: number;
  onTriggerResend?: () => void;
  isDark?: boolean;
}

export function VerifyEmailForm({
  initialEmail = "m.vance@apex.edu",
  email: controlledEmail,
  onEmailChange,
  activeState: controlledState,
  onStateChange,
  cooldownSeconds: controlledCooldown,
  onTriggerResend,
}: VerifyEmailFormProps) {
  const { theme } = useAuthTheme();
  const isDark = theme === "dark";

  // Internal fallbacks for standalone usage
  const [internalEmail, setInternalEmail] = useState(initialEmail);
  const [internalState, setInternalState] = useState<VerificationState>("pending");
  const [internalCooldown, setInternalCooldown] = useState(27);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(initialEmail);

  const email = controlledEmail ?? internalEmail;
  const activeState = controlledState ?? internalState;
  const cooldownSeconds = controlledCooldown ?? internalCooldown;

  const currentConf = statesConfig[activeState] || statesConfig.pending;

  const handleStateUpdate = (newState: VerificationState) => {
    if (onStateChange) {
      onStateChange(newState);
    } else {
      setInternalState(newState);
    }
  };

  const handleEmailUpdate = (newEmail: string) => {
    if (onEmailChange) {
      onEmailChange(newEmail);
    } else {
      setInternalEmail(newEmail);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedEmail.includes("@")) {
      handleEmailUpdate(editedEmail.trim().toLowerCase());
      setIsEditing(false);
    }
  };

  const handlePrimaryClick = () => {
    if (activeState === "expired" || activeState === "error") {
      handleTriggerResendAction();
      return;
    }
    handleStateUpdate("checking");
    setTimeout(() => {
      handleStateUpdate("verified");
    }, 1200);
  };

  const handleTriggerResendAction = () => {
    if (onTriggerResend) {
      onTriggerResend();
    } else {
      handleStateUpdate("resending");
      setInternalCooldown(27);
    }
  };

  const formatCountdown = (secs: number) => {
    const s = secs < 10 ? `0${secs}` : `${secs}`;
    return `00:${s}`;
  };

  return (
    <div
      className={`lg:col-span-7 p-6 lg:p-10 flex flex-col justify-between transition-colors duration-200 ${
        isDark ? "bg-[#0D121F]/40 text-[#A5A79B]" : "bg-white text-[#1A1D15]"
      }`}
    >
      <div>
        {/* Breadcrumbs & Return Link */}
        <div
          className={`flex items-center justify-between font-mono text-[11px] pb-4 mb-6 border-b transition-colors ${
            isDark ? "border-white/[0.08]" : "border-[#DCE0D4]"
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? "bg-[#C5EA32]" : "bg-[#536600]"
              }`}
            />
            <span>WORKSPACE IDENTITY RECOVERY</span>
            <span className={isDark ? "text-zinc-600" : "text-[#A5A79B]"}>/</span>
            <span
              className={`font-semibold ${
                isDark ? "text-zinc-200" : "text-[#1A1D15]"
              }`}
            >
              STEP 02 OF 02
            </span>
          </div>
          <Link
            href="/signin"
            className={`transition-colors flex items-center gap-1 ${
              isDark
                ? "text-zinc-400 hover:text-[#C5EA32]"
                : "text-[#53574A] hover:text-[#1558C9]"
            }`}
          >
            <span>← Back to Sign In</span>
          </Link>
        </div>

        {/* Envelope Icon Badge & Editorial Header */}
        <div className="mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md mb-4 border transition-colors ${
              isDark
                ? "bg-[#0D121F] border-white/[0.08] text-[#C5EA32] shadow-[0_0_10px_rgba(197,234,50,0.2)]"
                : "bg-[#F3F5E7] border-[#DCE0D4] text-[#536600]"
            }`}
          >
            <Mail
              size={22}
              className={isDark ? "text-[#C5EA32]" : "text-[#536600]"}
            />
          </div>
          <h2
            className={`font-serif text-2xl lg:text-3xl font-medium tracking-tight mb-2 ${
              isDark ? "text-white" : "text-[#030407]"
            }`}
          >
            Verify your email address
          </h2>
          <p
            className={`text-sm leading-relaxed max-w-xl ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            You’re almost there! We’ve dispatched an encrypted verification handshake to your institutional inbox. Verify your address to activate your campus operations node.
          </p>
        </div>

        {/* Dynamic State Alert Container (Rendered on simulation state) */}
        {currentConf.banner && (
          <div
            role="alert"
            className={`p-3.5 rounded-lg border font-mono text-xs mb-6 flex items-start gap-2.5 transition-all ${
              isDark ? currentConf.banner.class : currentConf.banner.lightClass
            }`}
          >
            {activeState === "checking" && (
              <svg
                className="w-4 h-4 animate-spin text-blue-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            <div className="leading-relaxed">
              {currentConf.banner.title && (
                <strong className="font-bold mr-1">{currentConf.banner.title}</strong>
              )}
              <span>{currentConf.banner.message}</span>
            </div>
          </div>
        )}

        {/* Recipient Identifier Card */}
        <div
          className={`p-3.5 rounded-lg border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
            isDark
              ? "bg-black/40 border-white/[0.08]"
              : "bg-[#F9FAED] border-[#DCE0D4]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded border flex items-center justify-center font-mono text-sm transition-colors ${
                isDark
                  ? "bg-[#0D121F] border-white/[0.08] text-[#A5A79B]"
                  : "bg-white border-[#DCE0D4] text-[#53574A]"
              }`}
            >
              <GraduationCap
                size={18}
                className={isDark ? "text-[#A5A79B]" : "text-[#53574A]"}
              />
            </div>
            <div>
              <div
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  isDark ? "text-zinc-500" : "text-[#737785]"
                }`}
              >
                Registered Institutional Recipient
              </div>
              {isEditing ? (
                <form onSubmit={handleSaveEdit} className="flex items-center gap-2 mt-1">
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className={`text-xs font-mono rounded px-2 py-1 outline-none border transition-colors ${
                      isDark
                        ? "bg-black border-white/20 text-white focus:border-[#C5EA32]"
                        : "bg-white border-[#DCE0D4] text-[#030407] focus:border-[#1558C9]"
                    }`}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 text-[10px] font-mono rounded bg-[#C5EA32] text-[#030407] font-bold cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditedEmail(email);
                      setIsEditing(false);
                    }}
                    className={`px-2 py-1 text-[10px] font-mono rounded cursor-pointer ${
                      isDark
                        ? "bg-white/10 text-zinc-300 hover:text-white"
                        : "bg-[#EEF0E2] text-[#53574A] hover:text-[#030407]"
                    }`}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div
                  className={`text-sm font-mono font-medium tracking-tight ${
                    isDark ? "text-white" : "text-[#030407]"
                  }`}
                >
                  {email}
                </div>
              )}
            </div>
          </div>

          {/* Inline Action Triggers */}
          {!isEditing && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={handleCopy}
                className={`px-2.5 py-1.5 rounded border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? "bg-[#0D121F] hover:bg-zinc-800 border-white/[0.08] text-zinc-300 hover:text-white"
                    : "bg-white hover:bg-[#EEF0E2] border-[#DCE0D4] text-[#1A1D15] shadow-2xs"
                }`}
              >
                {isCopied ? (
                  <>
                    <Check
                      size={14}
                      className={isDark ? "text-[#C5EA32]" : "text-[#536600]"}
                    />
                    <span
                      className={
                        isDark
                          ? "text-[#C5EA32] font-semibold"
                          : "text-[#536600] font-semibold"
                      }
                    >
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy
                      size={14}
                      className={isDark ? "text-zinc-400" : "text-[#737785]"}
                    />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedEmail(email);
                  setIsEditing(true);
                }}
                className={`px-2.5 py-1.5 rounded border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? "bg-[#0D121F] hover:bg-zinc-800 border-white/[0.08] text-zinc-300 hover:text-white"
                    : "bg-white hover:bg-[#EEF0E2] border-[#DCE0D4] text-[#1A1D15] shadow-2xs"
                }`}
              >
                <Edit3
                  size={14}
                  className={isDark ? "text-zinc-400" : "text-[#737785]"}
                />
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>

        {/* Primary Action CTA (STRICT CITRON WITH DARK TEXT) */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handlePrimaryClick}
            disabled={currentConf.btnDisabled}
            className={`w-full py-3.5 px-6 rounded-lg font-mono font-bold text-sm tracking-wide active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeState === "checking" && !isDark
                ? "bg-[#E8E9DC] text-[#737785] cursor-wait"
                : currentConf.btnClass
            }`}
          >
            <span>{currentConf.btnText}</span>
            {currentConf.btnArrow && <span className="text-base font-bold">→</span>}
          </button>
        </div>

        {/* Secondary Actions: Resend Verification & Dynamic Cooldown Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono mb-6">
          <button
            type="button"
            onClick={handleTriggerResendAction}
            disabled={cooldownSeconds > 0}
            className={`transition-colors text-left flex items-center gap-1.5 ${
              cooldownSeconds > 0
                ? "text-zinc-500 cursor-not-allowed opacity-60"
                : isDark
                ? "text-zinc-400 hover:text-[#C5EA32] cursor-pointer"
                : "text-[#53574A] hover:text-[#1558C9] cursor-pointer"
            }`}
          >
            <RotateCw
              size={14}
              className={isDark ? "text-[#C5EA32]" : "text-[#536600]"}
            />
            <span>Resend verification email</span>
          </button>
          <div
            className={`flex items-center gap-2 text-[11px] ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            <span>Cooldown window:</span>
            <span
              className={`px-2 py-0.5 rounded border font-semibold ${
                isDark
                  ? "bg-black/60 border-white/[0.08] text-[#C5EA32]"
                  : "bg-[#F3F5E7] border-[#DCE0D4] text-[#3D4C00]"
              }`}
            >
              {cooldownSeconds > 0
                ? `Resend available in ${formatCountdown(cooldownSeconds)}`
                : "Resend available now"}
            </span>
          </div>
        </div>

        {/* Institutional Quarantine & Spam Notice */}
        <div
          className={`p-3.5 rounded-lg border text-xs space-y-1 transition-colors ${
            isDark
              ? "bg-black/30 border-white/[0.08] text-zinc-400"
              : "bg-[#F9FAED] border-[#DCE0D4] text-[#53574A]"
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Info
              size={16}
              className={`shrink-0 mt-0.5 ${
                isDark ? "text-blue-400" : "text-[#1558C9]"
              }`}
            />
            <div>
              <span
                className={`font-medium ${
                  isDark ? "text-zinc-300" : "text-[#1A1D15]"
                }`}
              >
                Institutional Quarantine &amp; SPAM Policy:
              </span>{" "}
              Check your institutional spam filters or quarantined gateway. Organizations using Proofpoint or Mimecast may delay automated cryptographic relays up to 60 seconds.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Token Status Bar */}
      <div
        className={`mt-6 pt-4 border-t flex items-center justify-between font-mono text-[11px] transition-colors ${
          isDark
            ? "border-white/[0.08] text-zinc-400"
            : "border-[#DCE0D4] text-[#53574A]"
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock
            size={14}
            className={isDark ? "text-[#C5EA32]" : "text-[#536600]"}
          />
          <span>Cryptographic Token Validity Window:</span>
        </div>
        <div
          className={`font-bold tracking-wider ${
            isDark ? "text-[#C5EA32]" : "text-[#536600]"
          }`}
        >
          15:00 MIN TTL
        </div>
      </div>
    </div>
  );
}

export interface VerifyEmailQAConsoleProps {
  activeState: VerificationState;
  onStateChange: (state: VerificationState) => void;
  onReset: () => void;
}

export function VerifyEmailQAConsole({
  activeState,
  onStateChange,
  onReset,
}: VerifyEmailQAConsoleProps) {
  const { theme } = useAuthTheme();
  const isDark = theme === "dark";
  const currentConf = statesConfig[activeState] || statesConfig.pending;

  return (
    <section
      className={`w-full rounded-xl border p-5 lg:p-7 space-y-6 transition-colors duration-200 ${
        isDark
          ? "bg-[#0A0D14] border-white/[0.08] text-white"
          : "bg-white border-[#DCE0D4] shadow-sm text-[#1A1D15]"
      }`}
      aria-label="Prototype QA &amp; Testing Console"
    >
      {/* QA Terminal Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-3 transition-colors ${
          isDark ? "border-white/[0.08]" : "border-[#DCE0D4]"
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className={isDark ? "text-[#C5EA32] text-sm" : "text-[#536600] text-sm"}>
              ⚙
            </span>
            <h3
              className={`font-mono text-xs sm:text-sm font-bold tracking-wider uppercase ${
                isDark ? "text-white" : "text-[#030407]"
              }`}
            >
              PROTOTYPE QA &amp; TESTING CONSOLE
            </h3>
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${
                isDark
                  ? "bg-zinc-800 text-zinc-300 border-white/[0.08]"
                  : "bg-[#EEF0E2] text-[#53574A] border-[#DCE0D4]"
              }`}
            >
              LIVE-DEV
            </span>
          </div>
          <p
            className={`text-xs font-mono mt-0.5 ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Interactive simulation controls for interface states and token verification lifecycle.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium border ${
              isDark
                ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                : "bg-amber-100 border-amber-300 text-amber-900"
            }`}
          >
            QA SANDBOX ONLY
          </span>
          <button
            type="button"
            onClick={onReset}
            className={`px-3 py-1 rounded border text-[11px] font-mono transition-colors cursor-pointer ${
              isDark
                ? "bg-[#0D121F] hover:bg-zinc-800 border-white/[0.08] text-zinc-300 hover:text-white"
                : "bg-[#F3F5E7] hover:bg-[#EEF0E2] border-[#DCE0D4] text-[#1A1D15]"
            }`}
          >
            Reset Harness
          </button>
        </div>
      </div>

      {/* MODULE 01: Prototype State Switcher (6 Presets) */}
      <div>
        <div
          className={`flex items-center justify-between text-xs font-mono mb-2.5 ${
            isDark ? "text-zinc-400" : "text-[#53574A]"
          }`}
        >
          <span
            className={`font-semibold uppercase tracking-wider ${
              isDark ? "text-zinc-300" : "text-[#1A1D15]"
            }`}
          >
            01. Prototype State Switcher
          </span>
          <span
            className={`text-[10px] ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            6 Scenario Presets · Zero Truncation
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {presetButtons.map((preset) => {
            const isActive = activeState === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onStateChange(preset.id)}
                className={`p-2.5 rounded border text-left font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#C5EA32] text-[#030407] border-[#C5EA32] font-bold shadow-[0_0_16px_-2px_rgba(197,234,50,0.35)]"
                    : isDark
                    ? "border-white/10 bg-black/40 text-zinc-300 hover:border-zinc-500"
                    : "border-[#DCE0D4] bg-[#F9FAED] text-[#1A1D15] hover:border-[#1558C9]"
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={
                      isActive
                        ? "text-[#030407] font-bold"
                        : isDark
                        ? "text-zinc-500"
                        : "text-[#737785]"
                    }
                  >
                    {preset.index}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-[#030407]" : preset.dotColor
                    }`}
                  />
                </div>
                <div
                  className={`text-xs mt-1 ${
                    isActive
                      ? "font-bold text-[#030407]"
                      : isDark
                      ? "font-semibold text-white"
                      : "font-semibold text-[#030407]"
                  }`}
                >
                  {preset.title}
                </div>
                <div
                  className={`text-[9px] mt-0.5 ${
                    isActive
                      ? "text-[#030407]/80 font-medium"
                      : isDark
                      ? "text-zinc-500"
                      : "text-[#737785]"
                  }`}
                >
                  {preset.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODULE 02: Prototype QA Stage Harness (7 Linear Stages) */}
      <div>
        <div
          className={`flex items-center justify-between text-xs font-mono mb-2.5 ${
            isDark ? "text-zinc-400" : "text-[#53574A]"
          }`}
        >
          <span
            className={`font-semibold uppercase tracking-wider ${
              isDark ? "text-zinc-300" : "text-[#1A1D15]"
            }`}
          >
            02. Prototype QA Stage Harness
          </span>
          <span
            className={`text-[10px] ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            7 Linear Stages · Progressive Step Execution
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {stageButtons.map((st) => {
            const isActive = activeState === st.id;
            return (
              <button
                key={st.stage}
                type="button"
                onClick={() => onStateChange(st.id)}
                className={`p-2 rounded border text-left font-mono text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#C5EA32] text-[#030407] border-[#C5EA32] font-bold shadow-xs"
                    : isDark
                    ? "border-white/10 bg-black/40 text-zinc-300 hover:border-zinc-500"
                    : "border-[#DCE0D4] bg-[#F9FAED] text-[#1A1D15] hover:border-[#1558C9]"
                }`}
              >
                <div
                  className={`text-[10px] ${
                    isActive
                      ? "text-[#030407]/80 font-semibold"
                      : isDark
                      ? "text-zinc-500"
                      : "text-[#737785]"
                  }`}
                >
                  {st.title}
                </div>
                <div
                  className={`font-bold text-[11px] mt-0.5 ${
                    isActive
                      ? "text-[#030407]"
                      : isDark
                      ? "text-white"
                      : "text-[#030407]"
                  }`}
                >
                  {st.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-Time Simulation Telemetry Ticker */}
      <div
        className={`p-3 rounded-lg border font-mono text-[11px] space-y-1.5 transition-colors ${
          isDark
            ? "bg-black/80 border-white/[0.08]"
            : "bg-[#F3F5E7] border-[#DCE0D4]"
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? "bg-[#C5EA32]" : "bg-[#536600]"
              }`}
            />
            <span className={isDark ? "text-zinc-500" : "text-[#737785]"}>
              Simulation Engine:
            </span>
            <span
              className={`font-semibold ${
                isDark ? "text-[#C5EA32]" : "text-[#2F3B00]"
              }`}
            >
              {currentConf.statusText}
            </span>
          </div>
          <span
            className={`text-[10px] uppercase ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            Event Bus: Ready
          </span>
        </div>
        <div
          className={`text-[10px] flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 border-t ${
            isDark
              ? "text-zinc-500 border-white/5"
              : "text-[#737785] border-[#DCE0D4]"
          }`}
        >
          <span>
            Payload:{" "}
            <code className={isDark ? "text-zinc-300" : "text-[#030407]"}>
              {currentConf.payload}
            </code>
          </span>
          <span>
            Latency:{" "}
            <code className={isDark ? "text-zinc-300" : "text-[#030407]"}>
              14ms
            </code>
          </span>
          <span>
            Keyboard Nav:{" "}
            <code className={isDark ? "text-zinc-300" : "text-[#030407]"}>
              [TAB] Focus / [ENTER] Activate
            </code>
          </span>
          <span>FIPS 140-3 Compliant</span>
        </div>
      </div>

      {/* Architectural QA Documentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px] pt-1">
        <div
          className={`p-3 rounded border transition-colors ${
            isDark
              ? "bg-[#0D121F]/40 border-white/[0.08]"
              : "bg-[#F9FAED] border-[#DCE0D4]"
          }`}
        >
          <div
            className={`font-semibold mb-1 ${
              isDark ? "text-[#C5EA32]" : "text-[#3D4C00]"
            }`}
          >
            01 / ZERO TRUNCATION
          </div>
          <p
            className={`text-[10px] leading-relaxed ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Every lifecycle label (Pending, Checking, Resending, Cooldown, Verified, Expired, Error) renders in full across desktop, tablet, and mobile breakpoints without clipped typography.
          </p>
        </div>
        <div
          className={`p-3 rounded border transition-colors ${
            isDark
              ? "bg-[#0D121F]/40 border-white/[0.08]"
              : "bg-[#F9FAED] border-[#DCE0D4]"
          }`}
        >
          <div
            className={`font-semibold mb-1 ${
              isDark ? "text-[#C5EA32]" : "text-[#3D4C00]"
            }`}
          >
            02 / ACCESSIBLE CITRON ACTIVE STATE
          </div>
          <p
            className={`text-[10px] leading-relaxed ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Active selections leverage solid Architectural Citron (<span className={isDark ? "text-[#C5EA32] font-bold" : "text-[#3D4C00] font-bold"}>#C5EA32</span>) paired strictly with dark Midnight (<span className={isDark ? "text-white font-semibold" : "text-[#030407] font-semibold"}>#030407</span>) typography for WCAG AAA 12.8:1 contrast.
          </p>
        </div>
        <div
          className={`p-3 rounded border transition-colors ${
            isDark
              ? "bg-[#0D121F]/40 border-white/[0.08]"
              : "bg-[#F9FAED] border-[#DCE0D4]"
          }`}
        >
          <div
            className={`font-semibold mb-1 ${
              isDark ? "text-[#C5EA32]" : "text-[#3D4C00]"
            }`}
          >
            03 / SEGMENTED MODULE DISTINCTION
          </div>
          <p
            className={`text-[10px] leading-relaxed ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Group #1 is structured as a preset decision matrix; Group #2 is presented as a linear progressive execution rack with status telemetry and simulated auth triggers.
          </p>
        </div>
      </div>
    </section>
  );
}
