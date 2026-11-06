"use client";

import React from "react";
import Image from "next/image";
import { useAuthTheme } from "./auth-theme-context";

export function VerifyEmailInfoPanel() {
  const { theme } = useAuthTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r transition-colors duration-200 ${
        isDark
          ? "border-white/[0.08] bg-gradient-to-b from-[#0D121F] via-[#0A0D14] to-[#07090E] text-white"
          : "border-[#DCE0D4] bg-gradient-to-b from-[#F3F5E7] via-[#F9FAED] to-[#EEF0E2] text-[#1A1D15]"
      }`}
    >
      <div>
        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold ${
              isDark
                ? "text-[#C5EA32] border border-[#C5EA32]/25 bg-[#C5EA32]/10 shadow-[0_0_10px_rgba(197,234,50,0.2)]"
                : "text-[#3D4C00] border border-[#C5EA32] bg-[#C5EA32]/25"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? "bg-[#C5EA32]" : "bg-[#536600]"
              }`}
            />
            Workspace Identity Assurance
          </span>
        </div>

        {/* Newsreader Editorial Headline */}
        <h1
          className={`font-serif text-3xl lg:text-4xl font-normal leading-tight tracking-tight mb-3 ${
            isDark ? "text-white" : "text-[#030407]"
          }`}
        >
          Institutional identity.
          <br />
          <em
            className={`font-serif italic font-normal ${
              isDark ? "text-[#C5EA32]" : "text-[#536600]"
            }`}
          >
            Verified at the edge.
          </em>
        </h1>
        <p
          className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${
            isDark ? "text-zinc-400" : "text-[#53574A]"
          }`}
        >
          Secure transponder binding and cryptographic credential verification ensure authorized access to campus asset registries, telemetry nodes, and dispatch control consoles.
        </p>

        {/* 3D Isometric Visualization Canvas/Container */}
        <div
          className={`relative w-full rounded-lg overflow-hidden border aspect-[16/9] mb-6 group transition-colors ${
            isDark
              ? "border-white/[0.08] bg-black/40"
              : "border-[#DCE0D4] bg-[#E8E9DC]"
          }`}
        >
          <Image
            src="/images/hero-campus-isometric.jpg"
            alt="3D Isometric Campus Architecture Model"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
            className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Telemetry HUD Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none opacity-80 ${
              isDark
                ? "bg-gradient-to-t from-[#030407] via-transparent to-transparent"
                : "bg-gradient-to-t from-[#1A1D15]/60 via-transparent to-transparent"
            }`}
          />
          <div
            className={`absolute top-2.5 left-2.5 font-mono text-[9px] px-2 py-0.5 rounded border backdrop-blur-sm ${
              isDark
                ? "text-[#C5EA32]/90 bg-[#030407]/80 border-white/10"
                : "text-[#030407] font-bold bg-[#C5EA32]/90 border-[#C5EA32]"
            }`}
          >
            SMART-GRID 29G-A625 // LATENCY: 2.1ms
          </div>
          <div
            className={`absolute bottom-2.5 right-2.5 font-mono text-[9px] px-2 py-0.5 rounded border backdrop-blur-sm ${
              isDark
                ? "text-zinc-300 bg-[#030407]/80 border-white/10"
                : "text-[#030407] font-medium bg-white/90 border-[#DCE0D4]"
            }`}
          >
            QUAD_SEC_BOUND :: STAGE 02 ACTIVE
          </div>
        </div>

        {/* Cryptographic Handshake Sequence Box */}
        <div
          className={`border rounded-lg p-3 font-mono text-[11px] space-y-2 mb-4 transition-colors ${
            isDark
              ? "bg-[#0D121F]/70 border-white/[0.08]"
              : "bg-white border-[#DCE0D4] shadow-xs"
          }`}
        >
          <div
            className={`flex items-center justify-between text-[10px] pb-1 border-b uppercase ${
              isDark
                ? "text-zinc-400 border-white/5"
                : "text-[#53574A] border-[#DCE0D4]"
            }`}
          >
            <span className="tracking-wider">Cryptographic Handshake</span>
            <span
              className={`font-semibold ${
                isDark ? "text-[#C5EA32]" : "text-[#536600]"
              }`}
            >
              STAGE 02 / 02 ACTIVE
            </span>
          </div>
          <div
            className={`flex items-center justify-between ${
              isDark ? "text-zinc-300" : "text-[#1A1D15]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>01. Federated Identity Resolution</span>
            </div>
            <span
              className={`text-[10px] font-mono ${
                isDark ? "text-zinc-500" : "text-[#737785]"
              }`}
            >
              EDUPASS 2.0
            </span>
          </div>
          <div
            className={`flex items-center justify-between ${
              isDark ? "text-zinc-300" : "text-[#1A1D15]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>02. Ephemeral Key Exchange</span>
            </div>
            <span
              className={`text-[10px] font-mono ${
                isDark ? "text-zinc-500" : "text-[#737785]"
              }`}
            >
              ECDH Curve25519
            </span>
          </div>
          <div
            className={`flex items-center justify-between -mx-1 px-1 py-0.5 rounded border transition-colors ${
              isDark
                ? "text-white bg-[#C5EA32]/10 border-[#C5EA32]/20"
                : "text-[#030407] bg-[#C5EA32]/25 border-[#C5EA32]/50 font-medium"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isDark ? "bg-[#C5EA32]" : "bg-[#536600]"
                }`}
              />
              <span
                className={`font-medium ${
                  isDark ? "text-[#C5EA32]" : "text-[#3D4C00] font-semibold"
                }`}
              >
                03. Transponder Zero-Knowledge Proof
              </span>
            </div>
            <span
              className={`text-[10px] uppercase font-bold ${
                isDark ? "text-[#C5EA32]" : "text-[#3D4C00]"
              }`}
            >
              Awaiting User
            </span>
          </div>
        </div>
      </div>

      {/* Institutional Trust Chips Grid */}
      <div
        className={`pt-4 border-t grid grid-cols-3 gap-2 font-mono text-[10px] transition-colors ${
          isDark ? "border-white/[0.08]" : "border-[#DCE0D4]"
        }`}
      >
        <div
          className={`p-2 rounded border transition-colors ${
            isDark
              ? "bg-black/40 border-white/[0.08]"
              : "bg-white border-[#DCE0D4] shadow-2xs"
          }`}
        >
          <div
            className={`uppercase text-[9px] ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            Domain
          </div>
          <div
            className={`font-semibold mt-0.5 ${
              isDark ? "text-white" : "text-[#030407]"
            }`}
          >
            .edu / .org
          </div>
          <div
            className={`text-[9px] truncate ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Apex Quad Bound
          </div>
        </div>
        <div
          className={`p-2 rounded border transition-colors ${
            isDark
              ? "bg-black/40 border-white/[0.08]"
              : "bg-white border-[#DCE0D4] shadow-2xs"
          }`}
        >
          <div
            className={`uppercase text-[9px] ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            Token TTL
          </div>
          <div
            className={`font-semibold mt-0.5 ${
              isDark ? "text-[#C5EA32]" : "text-[#536600]"
            }`}
          >
            15-Min TTL
          </div>
          <div
            className={`text-[9px] truncate ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Ephemeral Mesh
          </div>
        </div>
        <div
          className={`p-2 rounded border transition-colors ${
            isDark
              ? "bg-black/40 border-white/[0.08]"
              : "bg-white border-[#DCE0D4] shadow-2xs"
          }`}
        >
          <div
            className={`uppercase text-[9px] ${
              isDark ? "text-zinc-500" : "text-[#737785]"
            }`}
          >
            Enclave
          </div>
          <div
            className={`font-semibold mt-0.5 ${
              isDark ? "text-white" : "text-[#030407]"
            }`}
          >
            Zero Privilege
          </div>
          <div
            className={`text-[9px] truncate ${
              isDark ? "text-zinc-400" : "text-[#53574A]"
            }`}
          >
            Telemetry Locked
          </div>
        </div>
      </div>
    </div>
  );
}
