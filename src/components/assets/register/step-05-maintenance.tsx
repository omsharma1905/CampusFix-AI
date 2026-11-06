"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Wrench,
  CheckCircle2,
  Info,
  PlusCircle,
  BookOpen,
  FileText,
  Lock,
  Download,
  Clock,
  Thermometer,
  ShieldCheck,
  AlertCircle,
  X,
  Trash2,
} from "lucide-react";
import {
  Step05MaintenanceData,
  RecurrenceCadence,
  InspectionTask,
  DEFAULT_INSPECTION_TASKS,
  MAINTENANCE_TEAM_OPTIONS,
  CADENCE_OPTIONS,
} from "./register-types";

interface Step05MaintenanceProps {
  data: Step05MaintenanceData;
  onChange: (updated: Partial<Step05MaintenanceData>) => void;
  errors?: Record<string, string>;
  assetName?: string;
  assetSerial?: string;
  assetClass?: string;
  locationRoom?: string;
  installationDate?: string;
  onDownloadDocument?: (filename: string) => void;
}

export function Step05Maintenance({
  data,
  onChange,
  errors = {},
  assetName = "Sony VPL-FHZ91L Laser",
  assetSerial = "SN: SN-883921-X9",
  assetClass = "Class: Audiovisual (Tier 1)",
  locationRoom = "Room 304 Auditorium",
  installationDate = "18 Aug 2024",
  onDownloadDocument,
}: Step05MaintenanceProps) {
  // Modal state for adding a custom protocol step
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false);
  const [customStepCode, setCustomStepCode] = useState("");
  const [customStepName, setCustomStepName] = useState("");
  const [customStepError, setCustomStepError] = useState("");

  const allTasks: InspectionTask[] = [
    ...DEFAULT_INSPECTION_TASKS,
    ...data.customTasks,
  ];

  const handleToggleTask = (taskId: string) => {
    const isSelected = data.selectedTaskIds.includes(taskId);
    let next: string[];
    if (isSelected) {
      next = data.selectedTaskIds.filter((id) => id !== taskId);
    } else {
      next = [...data.selectedTaskIds, taskId];
    }
    onChange({ selectedTaskIds: next });
  };

  const handleAddCustomStep = (e: React.FormEvent) => {
    e.preventDefault();
    const code = customStepCode.trim().toUpperCase();
    const name = customStepName.trim();

    if (!code) {
      setCustomStepError("Protocol code is required (e.g. CAL-OPT-08).");
      return;
    }
    if (!name) {
      setCustomStepError("Protocol step description is required.");
      return;
    }

    const newId = `custom-task-${Date.now()}`;
    const newTask: InspectionTask = {
      id: newId,
      code,
      name,
      isDefault: false,
    };

    onChange({
      customTasks: [...data.customTasks, newTask],
      selectedTaskIds: [...data.selectedTaskIds, newId],
    });

    setCustomStepCode("");
    setCustomStepName("");
    setCustomStepError("");
    setIsAddStepModalOpen(false);
  };

  const handleRemoveCustomStep = (taskId: string) => {
    onChange({
      customTasks: data.customTasks.filter((t) => t.id !== taskId),
      selectedTaskIds: data.selectedTaskIds.filter((id) => id !== taskId),
    });
  };

  // Cadence days parsing
  const getCadenceDays = (cadence: RecurrenceCadence): string => {
    if (data.strategy === "Reactive Only") return "N/A";
    if (cadence.includes("7 Days")) return "7";
    if (cadence.includes("30 Days")) return "30";
    if (cadence.includes("90 Days")) return "90";
    if (cadence.includes("180 Days")) return "180";
    if (cadence.includes("365 Days")) return "365";
    return "90";
  };

  // Calculate readiness percentage
  const calculateReadiness = (): number => {
    let score = 0;
    if (data.strategy) score += 30;
    if (data.responsibleTeam) score += 20;
    if (data.assignedLead) score += 20;
    if (data.selectedTaskIds.length > 0) score += 20;
    if (data.preferredMaintenanceWindow) score += 10;
    return Math.min(100, score);
  };

  const readinessPercentage = calculateReadiness();
  const cadenceDays = getCadenceDays(data.recurrenceCadence);

  // Derive squad short name e.g. "Media Ops 04"
  const getShortSquad = (team: string): string => {
    if (team.includes("Squad 04")) return "Media Ops 04";
    if (team.includes("Electrical")) return "Central Elect.";
    if (team.includes("HVAC")) return "HVAC Group";
    if (team.includes("Network")) return "Net Ops 01";
    return "Facilities Ops";
  };

  // Derive lead short name e.g. "R. Davis"
  const getShortLead = (lead: string): string => {
    const match = lead.match(/^[A-Z]\.\s[A-Za-z]+/);
    if (match) return match[0];
    const parts = lead.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}. ${parts[1]}`;
    return lead.split(" (")[0] || "R. Davis";
  };

  const getMilestoneDate = (monthsOffset: number, fallback: string): string => {
    try {
      const d = new Date(installationDate);
      if (!isNaN(d.getTime())) {
        d.setMonth(d.getMonth() + monthsOffset);
        return d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }
    } catch {
      // fallback
    }
    return fallback;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Left Column: Form Sections (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E9DC] flex flex-col gap-6">
          {/* Card Header & Selected Asset Contextual Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 bg-[#f3f5e7]/50 -mx-6 -mt-6 p-6 rounded-t-xl gap-4 border-b border-[#E8E9DC]">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-[#1558C9] uppercase tracking-widest font-bold">
                Protocol Specification
              </span>
              <h2 className="font-serif text-2xl text-[#1A1D15] font-normal leading-tight">
                Maintenance Configuration
              </h2>
              <p className="text-xs text-[#434653] max-w-xl">
                Define how this asset will be inspected, serviced and maintained throughout its operational life.
              </p>
            </div>

            {/* Asset Quick Reference Preview Card */}
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg shadow-2xs border border-[#E8E9DC] shrink-0">
              <div className="relative w-14 h-14 rounded overflow-hidden bg-[#eeefe2] shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZyN3p5XOgWwJdTw6WPxBQdFBjvD2LN3m5h5Ik_jdhb-cFTuFPZ6pHyJ8xouw2zxWrRJ7Tfowsn56y9VZp6DOJBeNCfJpx2a5SZufj7mz0OnbPZ1ThB_khZn9DfhoOblCnPAs888UgVaDKxlQF1fqnEgDLXFgFCrORWjdITZiJ2bV0Ki99SDErzDkzp79grR_V3gr7nt33Fnk-UvdUthZbejc90BEx-07CguLT6s"
                  alt={assetName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-[#1A1D15] truncate">
                  {assetName}
                </span>
                <span className="font-mono text-[11px] text-[#737785] truncate">
                  {assetSerial}
                </span>
                <span className="font-mono text-[10px] text-[#536600] font-semibold mt-0.5 truncate">
                  {assetClass}
                </span>
              </div>
            </div>
          </div>

          {/* Section A: Maintenance Strategy Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-sm text-[#1A1D15] flex items-center gap-2">
                <span>Section A — Operational Strategy</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#1558C9]/10 text-[#1558C9] uppercase font-bold tracking-wider">
                  Mandatory
                </span>
              </label>
              <span className="font-mono text-[11px] text-[#737785]">
                Select standard operating mandate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Strategy 1: Preventive Maintenance */}
              <label
                onClick={() => onChange({ strategy: "Preventive Maintenance" })}
                className={`cursor-pointer flex flex-col p-4 rounded-xl border transition-all ${
                  data.strategy === "Preventive Maintenance"
                    ? "bg-[#e2e4d6]/50 border-[#1558C9] shadow-xs"
                    : "bg-[#f3f5e7]/60 border-[#E8E9DC] hover:bg-[#eeefe2]/70"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Calendar
                    size={20}
                    className={
                      data.strategy === "Preventive Maintenance"
                        ? "text-[#1558C9]"
                        : "text-[#737785]"
                    }
                  />
                  <input
                    type="radio"
                    name="strategy"
                    checked={data.strategy === "Preventive Maintenance"}
                    onChange={() => onChange({ strategy: "Preventive Maintenance" })}
                    className="accent-[#1558C9] cursor-pointer"
                  />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    data.strategy === "Preventive Maintenance"
                      ? "text-[#1558C9]"
                      : "text-[#1A1D15]"
                  }`}
                >
                  Preventive Maintenance
                </span>
                <p className="text-xs text-[#434653] mt-1 leading-relaxed">
                  Scheduled regular telemetry audits and routine technician health checks.
                </p>
              </label>

              {/* Strategy 2: Reactive Only */}
              <label
                onClick={() => onChange({ strategy: "Reactive Only" })}
                className={`cursor-pointer flex flex-col p-4 rounded-xl border transition-all ${
                  data.strategy === "Reactive Only"
                    ? "bg-[#e2e4d6]/50 border-[#1558C9] shadow-xs"
                    : "bg-[#f3f5e7]/60 border-[#E8E9DC] hover:bg-[#eeefe2]/70"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Wrench
                    size={20}
                    className={
                      data.strategy === "Reactive Only"
                        ? "text-[#1558C9]"
                        : "text-[#737785]"
                    }
                  />
                  <input
                    type="radio"
                    name="strategy"
                    checked={data.strategy === "Reactive Only"}
                    onChange={() => onChange({ strategy: "Reactive Only" })}
                    className="accent-[#1558C9] cursor-pointer"
                  />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    data.strategy === "Reactive Only"
                      ? "text-[#1558C9]"
                      : "text-[#1A1D15]"
                  }`}
                >
                  Reactive Only
                </span>
                <p className="text-xs text-[#434653] mt-1 leading-relaxed">
                  Service triggered solely upon incident complaints or diagnostic failure codes.
                </p>
              </label>

              {/* Strategy 3: Preventive + Reactive (Default / Recommended) */}
              <label
                onClick={() => onChange({ strategy: "Preventive + Reactive" })}
                className={`cursor-pointer flex flex-col p-4 rounded-xl border relative transition-all ${
                  data.strategy === "Preventive + Reactive"
                    ? "bg-[#e2e4d6] border-[#1558C9] shadow-sm"
                    : "bg-[#f3f5e7]/60 border-[#E8E9DC] hover:bg-[#eeefe2]/70"
                }`}
              >
                <div className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-[#C5EA32] text-[#171e00] font-mono text-[10px] font-bold uppercase shadow-2xs border border-[#536600]/20">
                  Recommended
                </div>
                <div className="flex items-center justify-between mb-2">
                  <ShieldCheck
                    size={20}
                    className={
                      data.strategy === "Preventive + Reactive"
                        ? "text-[#1558C9]"
                        : "text-[#737785]"
                    }
                  />
                  <input
                    type="radio"
                    name="strategy"
                    checked={data.strategy === "Preventive + Reactive"}
                    onChange={() => onChange({ strategy: "Preventive + Reactive" })}
                    className="accent-[#1558C9] cursor-pointer"
                  />
                </div>
                <span
                  className={`text-sm font-bold ${
                    data.strategy === "Preventive + Reactive"
                      ? "text-[#1558C9]"
                      : "text-[#1A1D15]"
                  }`}
                >
                  Preventive + Reactive
                </span>
                <p className="text-xs text-[#1A1D15] mt-1 leading-relaxed">
                  Combines scheduled 90-day servicing with immediate complaint-driven workflows.
                </p>
              </label>
            </div>
            {errors.strategy && (
              <p className="text-xs text-[#ba1a1a] mt-1 flex items-center gap-1 font-medium">
                <AlertCircle size={14} />
                <span>{errors.strategy}</span>
              </p>
            )}
          </div>

          {/* Section B: Preventive Schedule & Assignment */}
          <div className="flex flex-col gap-4 pt-4 bg-[#f3f5e7]/40 p-4 rounded-xl border border-[#E8E9DC]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#1A1D15]">
                Section B — Preventive Schedule &amp; Team Assignment
              </span>
              <Wrench size={18} className="text-[#737785]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Responsible Team */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#434653] font-medium">
                  Responsible Maintenance Team
                </label>
                <div className="relative">
                  <select
                    value={data.responsibleTeam}
                    onChange={(e) => onChange({ responsibleTeam: e.target.value })}
                    className="w-full bg-white text-[#1A1D15] text-xs rounded-lg pl-3 pr-8 py-2.5 border border-[#E8E9DC] focus:outline-none focus:border-[#1558C9] shadow-2xs font-sans appearance-none"
                  >
                    {MAINTENANCE_TEAM_OPTIONS.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#737785] text-xs">
                    ▼
                  </span>
                </div>
                {errors.responsibleTeam && (
                  <p className="text-xs text-[#ba1a1a] mt-0.5">{errors.responsibleTeam}</p>
                )}
              </div>

              {/* Assigned Lead */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#434653] font-medium">
                  Assigned Lead / Supervisor
                </label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#E8E9DC] shadow-2xs">
                  <span className="w-6 h-6 rounded-full bg-[#e2e4d6] text-[#434653] flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                    RD
                  </span>
                  <input
                    type="text"
                    value={data.assignedLead}
                    onChange={(e) => onChange({ assignedLead: e.target.value })}
                    className="bg-transparent text-[#1A1D15] text-xs w-full focus:outline-none font-medium"
                    placeholder="Enter technician lead..."
                  />
                  <CheckCircle2 size={16} className="text-[#536600] shrink-0" />
                </div>
                {errors.assignedLead && (
                  <p className="text-xs text-[#ba1a1a] mt-0.5">{errors.assignedLead}</p>
                )}
              </div>

              {/* Recurrence Cadence */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#434653] font-medium">
                  Recurrence Cadence
                </label>
                <div className="relative">
                  <select
                    disabled={data.strategy === "Reactive Only"}
                    value={data.recurrenceCadence}
                    onChange={(e) =>
                      onChange({ recurrenceCadence: e.target.value as RecurrenceCadence })
                    }
                    className="w-full bg-white text-[#1A1D15] text-xs rounded-lg pl-3 pr-8 py-2.5 border border-[#E8E9DC] focus:outline-none focus:border-[#1558C9] shadow-2xs font-sans appearance-none disabled:bg-[#f3f5e7] disabled:text-[#737785] disabled:cursor-not-allowed"
                  >
                    {CADENCE_OPTIONS.map((cadence) => (
                      <option key={cadence} value={cadence}>
                        {cadence}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#737785] text-xs">
                    ▼
                  </span>
                </div>
                {data.strategy === "Reactive Only" && (
                  <span className="font-mono text-[10px] text-[#737785]">
                    Cadence inactive in reactive-only mode
                  </span>
                )}
              </div>

              {/* Preferred Maintenance Window */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#434653] font-medium">
                  Preferred Maintenance Window
                </label>
                <input
                  type="text"
                  value={data.preferredMaintenanceWindow}
                  onChange={(e) => onChange({ preferredMaintenanceWindow: e.target.value })}
                  placeholder="e.g. Academic Intersession / Weekends"
                  className="w-full bg-white text-[#1A1D15] text-xs rounded-lg px-3 py-2.5 border border-[#E8E9DC] focus:outline-none focus:border-[#1558C9] shadow-2xs font-sans"
                />
              </div>
            </div>

            {/* Explanatory Callout Notice */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#eeefe2] border border-[#E8E9DC] text-[#1A1D15] mt-1">
              <Info size={18} className="text-[#1558C9] shrink-0 mt-0.5" />
              <p className="text-xs text-[#434653] leading-relaxed">
                <strong className="text-[#1A1D15] font-semibold">
                  Operational Protocol Note:
                </strong>{" "}
                Saving this configuration establishes the asset protocol profile. It does NOT automatically generate premature work orders until formal schedule activation upon deployment.
              </p>
            </div>
          </div>

          {/* Section C: Inspection Protocol Checklist */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-sm text-[#1A1D15]">
                  Section C — Inspection Protocol Checklist
                </label>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#e8e9dc] text-[#434653] font-semibold">
                  {data.selectedTaskIds.length} Required Tasks
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStepModalOpen(true)}
                className="text-[#1558C9] hover:text-[#0041a0] font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <PlusCircle size={15} />
                <span>Add Custom Protocol Step</span>
              </button>
            </div>

            {/* Interactive Checklist Items */}
            <div className="flex flex-col gap-2">
              {allTasks.map((task) => {
                const isChecked = data.selectedTaskIds.includes(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer group ${
                      isChecked
                        ? "bg-white border-[#E8E9DC] hover:border-[#1558C9]/40 shadow-2xs"
                        : "bg-[#f9faed]/50 border-dashed border-[#E8E9DC] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div
                        className="w-4 h-4 rounded accent-[#1558C9] cursor-pointer shrink-0"
                      />
                      <span
                        className={`text-xs text-[#1A1D15] group-hover:text-[#1558C9] transition-colors leading-snug ${
                          isChecked ? "font-medium" : "text-[#434653]"
                        }`}
                      >
                        {task.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] text-[#737785] bg-[#eeefe2] px-2 py-0.5 rounded border border-[#E8E9DC]">
                        {task.code}
                      </span>
                      {!task.isDefault && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCustomStep(task.id);
                          }}
                          className="text-[#737785] hover:text-[#ba1a1a] p-1 transition-colors"
                          title="Remove custom task"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.selectedTaskIds && (
              <p className="text-xs text-[#ba1a1a] flex items-center gap-1 font-medium mt-1">
                <AlertCircle size={14} />
                <span>{errors.selectedTaskIds}</span>
              </p>
            )}
          </div>

          {/* Section D: Supporting Technical Documentation */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="font-semibold text-sm text-[#1A1D15]">
              Section D — Supporting Technical Documentation
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Doc 1: Bulletin */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f3f5e7]/60 border border-[#E8E9DC]">
                <div className="w-10 h-10 rounded-lg bg-[#e8e9dc] flex items-center justify-center text-[#1558C9] shrink-0">
                  <BookOpen size={20} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-semibold text-xs text-[#1A1D15] truncate">
                    Sony VPL-FHZ Tech Bulletin
                  </span>
                  <span className="font-mono text-[11px] text-[#737785] truncate">
                    OEM Directive v3.2 Applied
                  </span>
                </div>
                <Lock size={16} className="text-[#737785] shrink-0" />
              </div>

              {/* Doc 2: Checklist PDF */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f3f5e7]/60 border border-[#E8E9DC]">
                <div className="w-10 h-10 rounded-lg bg-[#ffdad6] text-[#822820] flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-semibold text-xs text-[#1A1D15] truncate">
                    Sony_OEM_PM_Checklist_2024.pdf
                  </span>
                  <span className="font-mono text-[11px] text-[#737785] truncate">
                    4.2 MB • Attached
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onDownloadDocument?.("Sony_OEM_PM_Checklist_2024.pdf")
                  }
                  className="p-1.5 text-[#434653] hover:text-[#1A1D15] rounded hover:bg-white transition-colors"
                  title="Download attached checklist PDF"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Supporting Telemetry & Preview Panels (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Panel 1: Readiness Scorecard */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E9DC] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-[#1A1D15]">
              Maintenance Readiness
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#C5EA32]/40 text-[#171e00] font-mono text-[11px] font-bold border border-[#536600]/20">
              {readinessPercentage}% Configured
            </span>
          </div>

          {/* Micro-Telemetry Progress */}
          <div className="flex flex-col gap-3 bg-[#f3f5e7] p-3.5 rounded-lg border border-[#E8E9DC]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#434653] font-medium">Standard Alignment</span>
              <span className="font-mono font-bold text-[#1558C9]">ISO-55001 Compliant</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e2e4d6] overflow-hidden">
              <div
                className="h-full bg-[#1558C9] rounded-full transition-all duration-300"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8E9DC]/60">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#737785] uppercase">
                  Active Protocols
                </span>
                <span className="font-serif text-lg text-[#1A1D15]">
                  {data.selectedTaskIds.length}{" "}
                  <span className="text-xs text-[#737785] font-sans">steps</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#737785] uppercase">
                  Cycle Cadence
                </span>
                <span className="font-serif text-lg text-[#1A1D15]">
                  {cadenceDays}{" "}
                  <span className="text-xs text-[#737785] font-sans">days</span>
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry key-value matrix */}
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-[#f3f5e7]">
              <span className="text-[#434653]">Maintenance Model</span>
              <span className="font-semibold text-[#1A1D15] text-right truncate max-w-[170px]">
                {data.strategy}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#f3f5e7]">
              <span className="text-[#434653]">Field Squad</span>
              <span className="font-semibold text-[#1A1D15] text-right truncate max-w-[170px]">
                {getShortSquad(data.responsibleTeam)}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#f3f5e7]">
              <span className="text-[#434653]">Primary Supervisor</span>
              <span className="font-semibold text-[#1A1D15] text-right truncate max-w-[170px]">
                {getShortLead(data.assignedLead)}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-[#434653]">First Target Window</span>
              <span className="font-mono text-xs text-[#1558C9] font-bold">
                {data.strategy === "Reactive Only"
                  ? "On Incident Callout"
                  : `${getMilestoneDate(3, "15 Nov 2024")} (Q4)`}
              </span>
            </div>
          </div>
        </div>

        {/* Panel 2: Visual Recurring Service Schedule Preview */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E9DC] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#737785]" />
              <span className="font-semibold text-sm text-[#1A1D15]">
                12-Month Service Roadmap
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#737785] uppercase">
              Simulated
            </span>
          </div>

          {data.strategy === "Reactive Only" ? (
            <div className="p-4 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] text-center flex flex-col items-center gap-2">
              <Wrench size={24} className="text-[#737785]" />
              <p className="text-xs text-[#434653] leading-relaxed">
                No recurring scheduled maintenance intervals. Work orders will trigger exclusively upon student or faculty complaints or telemetry anomalies.
              </p>
            </div>
          ) : (
            <>
              {/* Schedule Timeline Nodes */}
              <div className="flex flex-col gap-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E9DC]">
                {/* Node 1: Q4 */}
                <div className="flex items-start gap-3 relative">
                  <span className="w-6 h-6 rounded-full bg-[#C5EA32] text-[#171e00] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold z-10 shadow-2xs border border-[#536600]/20">
                    Q4
                  </span>
                  <div className="flex flex-col bg-[#f3f5e7] p-2.5 rounded-lg w-full border border-[#E8E9DC]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1A1D15]">
                        90-Day Filter &amp; Thermal Check
                      </span>
                      <span className="font-mono text-[11px] text-[#1558C9] font-bold">
                        {getMilestoneDate(3, "15 Nov 2024")}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#737785] mt-0.5 leading-snug">
                      Air intake clearance, delta-T &amp; telemetry readout
                    </span>
                  </div>
                </div>

                {/* Node 2: Q1 */}
                <div className="flex items-start gap-3 relative">
                  <span className="w-6 h-6 rounded-full bg-[#e8e9dc] text-[#434653] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold z-10">
                    Q1
                  </span>
                  <div className="flex flex-col bg-[#f3f5e7] p-2.5 rounded-lg w-full border border-[#E8E9DC]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1A1D15]">
                        Optical Alignment &amp; Laser Audit
                      </span>
                      <span className="font-mono text-[11px] text-[#434653]">
                        {getMilestoneDate(6, "15 Feb 2025")}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#737785] mt-0.5 leading-snug">
                      Laser phosphor chromaticity calibration
                    </span>
                  </div>
                </div>

                {/* Node 3: Q2 */}
                <div className="flex items-start gap-3 relative">
                  <span className="w-6 h-6 rounded-full bg-[#e8e9dc] text-[#434653] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold z-10">
                    Q2
                  </span>
                  <div className="flex flex-col bg-[#f3f5e7] p-2.5 rounded-lg w-full border border-[#E8E9DC]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1A1D15]">
                        Semiannual Exhaust Purge
                      </span>
                      <span className="font-mono text-[11px] text-[#434653]">
                        {getMilestoneDate(9, "15 May 2025")}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#737785] mt-0.5 leading-snug">
                      Deep chassis de-dusting and thermal CFM test
                    </span>
                  </div>
                </div>

                {/* Node 4: Q3 */}
                <div className="flex items-start gap-3 relative">
                  <span className="w-6 h-6 rounded-full bg-[#e8e9dc] text-[#434653] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold z-10">
                    Q3
                  </span>
                  <div className="flex flex-col bg-[#f3f5e7] p-2.5 rounded-lg w-full border border-[#E8E9DC]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1A1D15]">
                        Annual Comprehensive Recalibration
                      </span>
                      <span className="font-mono text-[11px] text-[#434653]">
                        {getMilestoneDate(12, "15 Aug 2025")}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#737785] mt-0.5 leading-snug">
                      Full structural tether torque, firmware &amp; warranty audit
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#eeefe2] text-[#434653] text-[11px] flex items-center gap-2 border border-[#E8E9DC]">
                <Clock size={15} className="text-[#737785] shrink-0" />
                <span>Work orders will auto-stage 7 days prior to each active window.</span>
              </div>
            </>
          )}
        </div>

        {/* Panel 3: Facility Health Telemetry Context */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#737785] font-medium">
              Target Zone Ambient Status
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#536600] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C5EA32] animate-pulse" />
              Optimal
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#f3f5e7] p-3 rounded-lg border border-[#E8E9DC]">
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#434653] truncate">
                {locationRoom}
              </span>
              <span className="font-mono text-xs font-bold text-[#1A1D15]">
                Ambient: 21.4°C • 42% RH
              </span>
            </div>
            <Thermometer size={20} className="text-[#737785] shrink-0" />
          </div>
        </div>
      </div>

      {/* Modal Dialog: Add Custom Protocol Step */}
      {isAddStepModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E8E9DC] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E9DC]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#1558C9]/10 text-[#1558C9]">
                  <PlusCircle size={18} />
                </span>
                <h3 className="font-serif text-lg text-[#1A1D15]">
                  Add Custom Protocol Step
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStepModalOpen(false)}
                className="text-[#737785] hover:text-[#1A1D15] p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCustomStep} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#434653]">
                  Protocol Code / Standard Reference *
                </label>
                <input
                  type="text"
                  value={customStepCode}
                  onChange={(e) => setCustomStepCode(e.target.value)}
                  placeholder="e.g. CAL-OPT-08"
                  className="w-full bg-[#f3f5e7] text-[#1A1D15] text-xs font-mono rounded-lg px-3 py-2 border border-[#E8E9DC] focus:outline-none focus:border-[#1558C9]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#434653]">
                  Step Inspection Description *
                </label>
                <textarea
                  value={customStepName}
                  onChange={(e) => setCustomStepName(e.target.value)}
                  placeholder="e.g. Optical prism polarization calibration & RGB chromaticity check"
                  rows={3}
                  className="w-full bg-[#f3f5e7] text-[#1A1D15] text-xs rounded-lg px-3 py-2 border border-[#E8E9DC] focus:outline-none focus:border-[#1558C9] resize-none font-sans"
                />
              </div>

              {customStepError && (
                <p className="text-xs text-[#ba1a1a] flex items-center gap-1 font-medium">
                  <AlertCircle size={14} />
                  <span>{customStepError}</span>
                </p>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddStepModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#eeefe2] text-[#1A1D15] text-xs font-semibold hover:bg-[#e8e9dc] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#1558C9] text-white text-xs font-semibold hover:bg-[#0041a0] transition-colors shadow-xs"
                >
                  Add Protocol Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
