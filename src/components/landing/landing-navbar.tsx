"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Moon, ArrowUpRight, Menu, X, Layers } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingNavbar() {
  const { theme, toggleTheme } = useLandingTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      <div
        className={`pointer-events-auto h-16 w-full px-5 rounded-2xl flex items-center justify-between shadow-2xl transition-all duration-300 ${
          isDark
            ? "bg-[#0a0f1a]/85 backdrop-blur-md border border-white/10 text-white"
            : "bg-white/90 backdrop-blur-md border border-[#E2E4DE] text-[#1A1D15] shadow-[0_8px_30px_rgba(3,4,7,0.06)]"
        }`}
      >
        {/* Brand Monogram */}
        <Link href="#hero" className="flex items-center gap-2.5 group">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-95 ${
              isDark
                ? "bg-white/10 border border-white/15 text-[#C5EA32]"
                : "bg-[#030407] text-[#C5EA32]"
            }`}
          >
            <Layers size={17} strokeWidth={2.5} />
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className={`font-serif text-xl tracking-tight font-medium ${
                isDark ? "text-white" : "text-[#1A1D15]"
              }`}
            >
              CampusFix
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1558C9] font-bold">
              AI
            </span>
          </div>
        </Link>

        {/* Minimal Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-1 text-xs uppercase tracking-widest font-mono font-medium ${
            isDark ? "text-[#A5A79B]" : "text-[#5E6270]"
          }`}
        >
          <a
            href="#hero"
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:text-white hover:bg-white/5"
                : "hover:text-[#1A1D15] hover:bg-black/5"
            }`}
          >
            Platform
          </a>
          <a
            href="#connected-campus"
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:text-white hover:bg-white/5"
                : "hover:text-[#1A1D15] hover:bg-black/5"
            }`}
          >
            Connected Campus
          </a>
          <a
            href="#capabilities"
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:text-white hover:bg-white/5"
                : "hover:text-[#1A1D15] hover:bg-black/5"
            }`}
          >
            Capabilities
          </a>
          <a
            href="#intelligence"
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:text-white hover:bg-white/5"
                : "hover:text-[#1A1D15] hover:bg-black/5"
            }`}
          >
            Intelligence
          </a>
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Sign In Link */}
          <Link
            href="/signin"
            className={`hidden lg:inline-flex items-center px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
              isDark
                ? "border-white/10 text-[#A5A79B] hover:text-white hover:bg-white/5"
                : "border-[#E2E4DE] text-[#434653] hover:text-[#1A1D15] hover:bg-[#F3F5E7]"
            }`}
          >
            Sign In
          </Link>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 active:scale-95 ${
              isDark
                ? "bg-white/5 border-white/10 text-[#A5A79B] hover:text-white hover:bg-white/10"
                : "bg-[#F3F5E7] border-[#E2E4DE] text-[#434653] hover:text-[#1A1D15] hover:bg-[#E8E9DC]"
            }`}
            title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun size={14} className="text-[#C5EA32]" />
                <span className="hidden sm:inline text-[11px] font-semibold text-white">Light</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-[#1558C9]" />
                <span className="hidden sm:inline text-[11px] font-semibold text-[#1A1D15]">Dark</span>
              </>
            )}
          </button>

          {/* Primary Action Button */}
          <Link
            href="/signup"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C5EA32] text-[#030407] font-bold text-xs tracking-wide uppercase font-mono shadow-sm shadow-[#C5EA32]/15 hover:bg-[#B3D922] hover:scale-[1.02] transition-all"
          >
            <span>Register Institution</span>
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-white"
                : "bg-black/5 border-[#E2E4DE] text-[#1A1D15]"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto md:hidden mt-2 p-5 rounded-2xl flex flex-col gap-3 shadow-2xl border transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark
              ? "bg-[#0a0f1a]/95 backdrop-blur-xl border-white/10 text-white"
              : "bg-white/95 backdrop-blur-xl border-[#E2E4DE] text-[#1A1D15]"
          }`}
        >
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-mono uppercase tracking-wider text-inherit hover:text-[#1558C9]"
          >
            Platform
          </a>
          <a
            href="#connected-campus"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-mono uppercase tracking-wider text-inherit hover:text-[#1558C9]"
          >
            Connected Campus
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-mono uppercase tracking-wider text-inherit hover:text-[#1558C9]"
          >
            Capabilities
          </a>
          <a
            href="#intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-mono uppercase tracking-wider text-inherit hover:text-[#1558C9]"
          >
            Intelligence
          </a>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#C5EA32] text-[#030407] font-bold text-xs tracking-wide uppercase font-mono shadow-sm shadow-[#C5EA32]/15 hover:bg-[#B3D922]"
            >
              <span>Register Institution</span>
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-mono font-medium ${
                isDark
                  ? "border-white/15 text-white hover:bg-white/5"
                  : "border-[#E2E4DE] text-[#1A1D15] hover:bg-black/5"
              }`}
            >
              Explore Dashboard
            </Link>
            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-mono font-medium ${
                isDark
                  ? "border-white/10 text-[#A5A79B] hover:text-white hover:bg-white/5"
                  : "border-[#E2E4DE] text-[#434653] hover:text-[#1A1D15] hover:bg-black/5"
              }`}
            >
              Sign In to Workspace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

