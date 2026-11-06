"use client";

import React from "react";
import Image from "next/image";
import { Key, ShieldCheck, Building2, Radio } from "lucide-react";

interface ResetPasswordInfoPanelProps {
  isDark: boolean;
}

export function ResetPasswordInfoPanel({ isDark }: ResetPasswordInfoPanelProps) {
  return (
    <section
      className={`p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-colors duration-200 ${
        isDark
          ? "bg-[#0A0D15] text-white border-b lg:border-b-0 lg:border-r border-white/[0.08]"
          : "bg-[#F3F5E7] text-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200"
      }`}
    >
      {/* Ambient Radial Gradient Accents */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#1558C9]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#D4FF24]/10 blur-3xl pointer-events-none" />

      {/* Upper Content */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF24] animate-pulse" />
          <span
            className={`font-mono text-[11px] uppercase tracking-widest font-semibold ${
              isDark ? "text-[#D4FF24]" : "text-[#536600]"
            }`}
          >
            Workspace Credential Recovery
          </span>
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight leading-[1.18]">
            Secure your account.
            <span
              className={`block italic font-serif ${
                isDark ? "text-[#E8D2B5]" : "text-[#1558C9]"
              }`}
            >
              Start fresh. Stay protected.
            </span>
          </h1>
          <p
            className={`text-sm leading-relaxed max-w-md ${
              isDark ? "text-[#A5A79B]" : "text-slate-600"
            }`}
          >
            Create a new institutional password to restore access to your CampusFix AI workspace. Your account security begins with a credential only you control.
          </p>
        </div>

        {/* Campus Visual with Telemetry Overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group bg-[#090D14]">
          <div className="relative w-full h-48 sm:h-52">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7WO1LsJzk9PblufHjI4YWDsbTWX140wCV6nrEhpueMon_-WasIPnmR5PNncFZqBvZQ2SYfl3jm722RrQSkog2igP2GgWyOcCT2TwkrCnwjibyk9MBziBzh7PrnrMhV897CNIhp6tH0ehWcf3tjnL7vp38lEjpBIanXrJJSJarKl_07kcRRA9KA2APjjX55jwKFwQqrBMjQPdc5uU1w4msYGNGNpUM0b-eUBZO_8k"
              alt="CampusFix AI 3D Isometric Architectural Campus Infrastructure"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
            />
          </div>

          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/90 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Telemetry Overlay Badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#030407]/80 backdrop-blur-md border border-white/15 text-white">
              <Radio size={14} className="text-[#D4FF24]" />
              <span className="font-mono text-[11px]">Telemetry Grid Active</span>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#030407]/80 backdrop-blur-md border border-white/15 text-slate-300">
              v4.12 Node Sync
            </span>
          </div>
        </div>

        {/* 3 Security Principle Cards */}
        <div className="space-y-3 pt-1">
          {/* Card 1: Strong Credentials */}
          <div
            className={`p-3.5 rounded-xl shadow-sm flex items-start gap-3 transition-transform hover:-translate-y-0.5 border ${
              isDark
                ? "bg-[#111726]/80 border-white/[0.06]"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#D4FF24]/15 border border-[#D4FF24]/30 flex items-center justify-center text-[#D4FF24] shrink-0 mt-0.5">
              <Key size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold">Strong Credentials</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isDark
                      ? "bg-white/[0.08] text-[#D4FF24]"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  Standard
                </span>
              </div>
              <p
                className={`text-[11px] mt-0.5 leading-snug ${
                  isDark ? "text-[#A5A79B]" : "text-slate-600"
                }`}
              >
                Create a password that meets the required security criteria.
              </p>
            </div>
          </div>

          {/* Card 2: Identity Protection */}
          <div
            className={`p-3.5 rounded-xl shadow-sm flex items-start gap-3 transition-transform hover:-translate-y-0.5 border ${
              isDark
                ? "bg-[#111726]/80 border-white/[0.06]"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#1558C9]/20 border border-[#1558C9]/35 flex items-center justify-center text-[#1558C9] shrink-0 mt-0.5">
              <ShieldCheck size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold">Identity Protection</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isDark
                      ? "bg-white/[0.08] text-blue-300"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  Enforced
                </span>
              </div>
              <p
                className={`text-[11px] mt-0.5 leading-snug ${
                  isDark ? "text-[#A5A79B]" : "text-slate-600"
                }`}
              >
                Recovery access must be validated before credentials can be changed.
              </p>
            </div>
          </div>

          {/* Card 3: Institutional Access */}
          <div
            className={`p-3.5 rounded-xl shadow-sm flex items-start gap-3 transition-transform hover:-translate-y-0.5 border ${
              isDark
                ? "bg-[#111726]/80 border-white/[0.06]"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#E8D2B5] shrink-0 mt-0.5">
              <Building2 size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold">Institutional Access</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isDark
                      ? "bg-white/[0.08] text-slate-300"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Directory
                </span>
              </div>
              <p
                className={`text-[11px] mt-0.5 leading-snug ${
                  isDark ? "text-[#A5A79B]" : "text-slate-600"
                }`}
              >
                Federated accounts may need to update credentials through their campus identity provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Statement Banner */}
      <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#A5A79B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24]" />
          <span>Intelligent infrastructure. Better campus operations.</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold tracking-wider text-[10px]">
          ENTERPRISE ARCHITECTURE
        </span>
      </div>
    </section>
  );
}

