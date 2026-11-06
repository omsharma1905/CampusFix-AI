"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLandingTheme } from "./landing-theme-context";

export function LandingBackToTop() {
  const { theme } = useLandingTheme();
  const isDark = theme === "dark";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group p-3 rounded-2xl border backdrop-blur-xl shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C5EA32] cursor-pointer ${
        isDark
          ? "bg-[#070b14]/90 border-white/15 text-[#A5A79B] hover:text-[#C5EA32] hover:border-[#C5EA32]/50 hover:bg-[#0c1222]"
          : "bg-white/95 border-[#E2E4DE] text-[#434653] hover:text-[#1558C9] hover:border-[#1558C9]/40 hover:bg-[#F7F8EF]"
      }`}
    >
      <ArrowUp
        size={18}
        strokeWidth={2.2}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span className="sr-only">Back to top</span>
    </button>
  );
}

