"use client";

import React from "react";
import { Check } from "lucide-react";
import { WIZARD_STEPS } from "./register-types";

interface RegisterStepperProps {
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  completedSteps?: number[];
}

export function RegisterStepper({
  currentStep,
  onStepClick,
  completedSteps = [],
}: RegisterStepperProps) {
  return (
    <div className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-2xs border border-[#E8E9DC]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {WIZARD_STEPS.map((step) => {
          const isActive = step.stepNumber === currentStep;
          const isCompleted = completedSteps.includes(step.stepNumber);
          const highestUnlockedStep =
            completedSteps.length > 0 ? Math.max(...completedSteps) + 1 : 1;
          const isClickable = isCompleted || step.stepNumber <= highestUnlockedStep;

          return (
            <button
              key={step.stepNumber}
              type="button"
              disabled={!isClickable && !isActive}
              onClick={() => {
                if (isClickable || isActive) {
                  onStepClick?.(step.stepNumber);
                }
              }}
              className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-all ${
                isActive
                  ? step.stepNumber === 5
                    ? "bg-[#1558C9] text-white shadow-sm"
                    : step.stepNumber === 6
                    ? "bg-[#C5EA32]/25 border border-[#C5EA32]/40 shadow-xs"
                    : "bg-[#e2e4d6] border border-[#C5EA32]/40 shadow-xs"
                  : isCompleted
                  ? "bg-[#f3f5e7] hover:bg-[#eeefe2] cursor-pointer"
                  : isClickable
                  ? "bg-[#f9faed] hover:bg-[#eeefe2] cursor-pointer"
                  : "bg-transparent opacity-75 cursor-not-allowed"
              }`}
            >
              {/* Step Circle Badge */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                  isActive
                    ? "bg-[#C5EA32] text-[#171e00] font-bold shadow-xs"
                    : isCompleted
                    ? "bg-[#1558C9] text-white"
                    : "bg-[#eeefe2] text-[#737785] font-medium"
                }`}
              >
                {isCompleted ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  <span>0{step.stepNumber}</span>
                )}
              </div>

              {/* Step Text Info */}
              <div className="flex flex-col min-w-0">
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider ${
                    isActive
                      ? step.stepNumber === 5
                        ? "text-[#ccd8ff] font-medium"
                        : "text-[#536600] font-bold"
                      : isCompleted
                      ? "text-[#737785]"
                      : "text-[#737785]"
                  }`}
                >
                  {isActive && step.stepNumber === 6
                    ? "Step 06"
                    : isActive
                    ? "Active"
                    : `Step 0${step.stepNumber}`}
                </span>
                <span
                  className={`text-xs truncate ${
                    isActive
                      ? step.stepNumber === 5
                        ? "font-semibold text-white"
                        : "font-semibold text-[#1a1d15]"
                      : isCompleted
                      ? "font-semibold text-[#1a1d15]"
                      : "text-[#737785]"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
