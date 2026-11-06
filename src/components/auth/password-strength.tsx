"use client";

import React from "react";
import { Check } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  isDark: boolean;
}

export interface PasswordCriteria {
  hasMinLength: boolean;
  hasUpperLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export function evaluateCriteria(password: string): PasswordCriteria {
  return {
    hasMinLength: password.length >= 8,
    hasUpperLower: /[A-Z]/.test(password) && /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };
}

export function getStrengthScore(criteria: PasswordCriteria): number {
  let score = 0;
  if (criteria.hasMinLength) score++;
  if (criteria.hasUpperLower) score++;
  if (criteria.hasNumber) score++;
  if (criteria.hasSpecial) score++;
  return score;
}

export function PasswordStrength({ password, isDark }: PasswordStrengthProps) {
  const criteria = evaluateCriteria(password);
  const score = password.length > 0 ? getStrengthScore(criteria) : 0;

  let strengthLabel = "Enter password";
  let labelColor = isDark ? "text-slate-400" : "text-[#737785]";

  if (password.length > 0) {
    if (score === 0) {
      strengthLabel = "Too weak";
      labelColor = isDark ? "text-[#FFB4AA]" : "text-[#BA1A1A]";
    } else if (score <= 2) {
      strengthLabel = "Moderate";
      labelColor = isDark ? "text-[#FFDAD5]" : "text-[#822820]";
    } else if (score === 3) {
      strengthLabel = "Good";
      labelColor = isDark ? "text-[#B1C5FF]" : "text-[#1558C9]";
    } else {
      strengthLabel = "Strong (FIPS 140-3)";
      labelColor = isDark ? "text-[#C5EA32]" : "text-[#425200]";
    }
  }

  // 4 bar segments
  const getBarColor = (index: number) => {
    if (score === 0) return isDark ? "bg-white/10" : "bg-[#DCE0D4]";
    if (score <= 2) {
      return index < 2 ? "bg-[#BA1A1A]" : isDark ? "bg-white/10" : "bg-[#DCE0D4]";
    }
    if (score === 3) {
      return index < 3 ? "bg-[#1558C9]" : isDark ? "bg-white/10" : "bg-[#DCE0D4]";
    }
    return "bg-[#C5EA32]";
  };

  const criteriaItems = [
    { key: "len", label: "8+ chars", satisfied: criteria.hasMinLength },
    { key: "case", label: "Upper & Lower", satisfied: criteria.hasUpperLower },
    { key: "num", label: "Number", satisfied: criteria.hasNumber },
    { key: "sym", label: "Special Symbol", satisfied: criteria.hasSpecial },
  ];

  return (
    <div
      className={`p-3.5 rounded-xl space-y-2.5 transition-colors border ${
        isDark
          ? "bg-white/[0.03] border-white/10"
          : "bg-[#F4F5EB] border-[#DCE0D4]"
      }`}
    >
      {/* Header with Title and Dynamic Strength Label */}
      <div className="flex items-center justify-between text-xs">
        <span
          className={`font-semibold uppercase tracking-wider text-[11px] font-mono ${
            isDark ? "text-[#A5A79B]" : "text-[#53574A]"
          }`}
        >
          Password Entropy
        </span>
        <span className={`font-mono text-xs font-semibold ${labelColor}`}>
          {strengthLabel}
        </span>
      </div>

      {/* 4-Segment Progress Bar */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`rounded-full transition-colors duration-300 ${getBarColor(idx)}`}
          />
        ))}
      </div>

      {/* Criteria Checklist Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {criteriaItems.map((item) => (
          <span
            key={item.key}
            className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
              item.satisfied
                ? isDark
                  ? "bg-[#C5EA32]/15 text-[#C5EA32] border border-[#C5EA32]/30"
                  : "bg-[#E2F0A5] text-[#334200] border border-[#C5EA32]"
                : isDark
                ? "bg-white/[0.03] text-slate-500 border border-transparent"
                : "bg-white text-slate-400 border border-[#DCE0D4]"
            }`}
          >
            <Check
              size={11}
              strokeWidth={3}
              className={item.satisfied ? "opacity-100" : "opacity-30"}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
