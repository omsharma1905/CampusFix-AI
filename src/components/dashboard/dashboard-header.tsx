"use client";

import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Plus,
  Search,
  Check,
  AlertCircle,
} from "lucide-react";
import { INSTITUTIONS } from "./mock-data";

interface HeaderProps {
  onOpenMobileNav?: () => void;
  onOpenReportIssue?: () => void;
  onOpenRegisterAsset?: () => void;
  onOpenNotifications?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  selectedInstitutionId?: string;
  onSelectInstitution?: (id: string) => void;
}

export function DashboardHeader({
  onOpenMobileNav,
  onOpenReportIssue,
  onOpenRegisterAsset,
  onOpenNotifications,
  searchQuery = "",
  onSearchChange,
  selectedInstitutionId = "apex-main",
  onSelectInstitution,
}: HeaderProps) {
  const [institutionDropdownOpen, setInstitutionDropdownOpen] = useState(false);

  const currentInstitution =
    INSTITUTIONS.find((i) => i.id === selectedInstitutionId) || INSTITUTIONS[0];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full max-w-full items-center justify-between border-b border-[#E7E9DC] bg-white/95 px-3 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Nav Toggle & Institution Selector */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="flex size-9 items-center justify-center rounded-lg border border-[#E7E9DC] text-[#151710] hover:bg-[#F7F8EF] md:hidden focus:outline-none focus:ring-2 focus:ring-[#1558C9]"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        {/* Institution Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setInstitutionDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/80 px-2.5 sm:px-3 py-1.5 text-left transition hover:border-[#1558C9]/40 hover:bg-[#F7F8EF] focus:outline-none focus:ring-2 focus:ring-[#1558C9]"
            aria-expanded={institutionDropdownOpen}
            aria-haspopup="listbox"
          >
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs font-bold tracking-tight text-[#030407] sm:text-sm truncate max-w-[110px] xs:max-w-[150px] sm:max-w-none">
                {currentInstitution.name}
              </span>
              <span className="font-sans text-[10px] text-[#73766C] truncate max-w-[110px] xs:max-w-[150px] sm:max-w-none">
                {currentInstitution.campus}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-[#73766C] transition-transform duration-150 shrink-0 ${
                institutionDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Institution Menu */}
          {institutionDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setInstitutionDropdownOpen(false)}
              />
              <div
                role="listbox"
                className="absolute left-0 z-50 mt-1.5 w-72 rounded-xl border border-[#E7E9DC] bg-white py-1.5 shadow-xl shadow-black/5"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#73766C] uppercase">
                  Select Institutional Campus
                </div>
                {INSTITUTIONS.map((inst) => {
                  const isSelected = inst.id === currentInstitution.id;
                  return (
                    <button
                      key={inst.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelectInstitution?.(inst.id);
                        setInstitutionDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                        isSelected
                          ? "bg-[#1558C9]/10 font-semibold text-[#1558C9]"
                          : "text-[#151710] hover:bg-[#F7F8EF]"
                      }`}
                    >
                      <div>
                        <div className="font-medium">{inst.name}</div>
                        <div className="text-[10px] text-[#73766C]">{inst.campus}</div>
                      </div>
                      {isSelected && <Check size={14} className="text-[#1558C9]" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Operational Status Indicator */}
        <div className="hidden items-center gap-2 rounded-full border border-[#D4FF24]/60 bg-[#D4FF24]/10 px-2.5 py-1 text-[11px] font-semibold text-[#030407] lg:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1558C9] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#1558C9]" />
          </span>
          <span className="font-mono text-[10px] tracking-wider uppercase">GRID OPS: NOMINAL</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="mx-1.5 sm:mx-3 max-w-md flex-1 min-w-0 md:mx-4">
        <div className="relative w-full">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#73766C]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search assets, tickets..."
            className="w-full min-w-0 rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/60 py-1.5 pr-8 pl-9 font-sans text-xs text-[#151710] placeholder-[#73766C] transition focus:border-[#1558C9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1558C9]"
            aria-label="Global search across assets and operations"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[10px] font-bold text-[#73766C] hover:text-[#151710]"
              aria-label="Clear search"
            >
              ESC
            </button>
          )}
        </div>
      </div>

      {/* Right Action Toolbar */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative flex size-9 items-center justify-center rounded-lg border border-[#E7E9DC] bg-white text-[#151710] transition hover:bg-[#F7F8EF] focus:outline-none focus:ring-2 focus:ring-[#1558C9]"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#590907] px-1 font-mono text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* Report Issue Action */}
        <button
          type="button"
          onClick={onOpenReportIssue}
          className="hidden items-center gap-1.5 rounded-lg border border-[#E7E9DC] bg-white px-3 py-1.5 font-sans text-xs font-semibold text-[#151710] shadow-2xs transition hover:border-[#151710] hover:bg-[#F7F8EF] md:flex focus:outline-none focus:ring-2 focus:ring-[#1558C9]"
        >
          <AlertCircle size={14} className="text-[#590907]" />
          <span>Report Issue</span>
        </button>

        {/* Primary Action: Acid Lime Register Asset Button */}
        <button
          type="button"
          onClick={onOpenRegisterAsset}
          className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-[#D4FF24] px-2.5 sm:px-3.5 py-1.5 font-sans text-xs font-bold text-[#030407] shadow-sm transition hover:bg-[#c3ec1e] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#030407] active:scale-98 shrink-0"
        >
          <Plus size={15} className="stroke-[2.5]" />
          <span className="tracking-tight hidden xs:inline sm:inline">Register Asset</span>
          <span className="tracking-tight xs:hidden">Register</span>
        </button>

        {/* User Profile Avatar with Operational Badge */}
        <div className="hidden items-center gap-2 pl-1 sm:flex">
          <div className="relative flex size-8 items-center justify-center rounded-full border border-[#1558C9]/30 bg-[#1558C9]/10 font-mono text-xs font-bold text-[#1558C9]">
            FO
            <span className="absolute right-0 bottom-0 size-2 rounded-full border border-white bg-[#D4FF24]" />
          </div>
        </div>
      </div>
    </header>
  );
}
