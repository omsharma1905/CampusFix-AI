"use client";

import React from "react";
import { Building2, AlertTriangle, BarChart3 } from "lucide-react";
import { BUILDING_INCIDENTS_DATA, DEPARTMENT_BREAKDOWN } from "./mock-data";
import { BuildingIncidentItem, DepartmentShare } from "./types";

interface IncidentDensityProps {
  buildings?: BuildingIncidentItem[];
  departments?: DepartmentShare[];
  onSelectBuilding?: (buildingId: string) => void;
}

export function BuildingIncidentDensity({
  buildings = BUILDING_INCIDENTS_DATA,
  departments = DEPARTMENT_BREAKDOWN,
  onSelectBuilding,
}: IncidentDensityProps) {
  const maxIssues = Math.max(...buildings.map((b) => b.issuesCount), 1);

  return (
    <article className="w-full max-w-full min-w-0 rounded-xl border border-[#E7E9DC] bg-white p-5 shadow-xs sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1558C9] uppercase">
            SPATIAL & DOMAIN DISTRIBUTION
          </span>
          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407] sm:text-2xl">
            Building Incident Density & Distribution
          </h2>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#73766C]">
          <Building2 size={13} className="text-[#1558C9]" />
          <span>5 Core Facilities Monitored</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Sub-column: Building-wise Issue Distribution */}
        <div>
          <h3 className="font-mono text-[11px] font-bold tracking-wider text-[#73766C] uppercase">
            Building Issue Density & Criticality
          </h3>

          <div className="mt-3.5 space-y-3.5">
            {buildings.map((bld) => {
              const widthPct = Math.round((bld.issuesCount / maxIssues) * 100);

              return (
                <div
                  key={bld.id}
                  onClick={() => onSelectBuilding?.(bld.id)}
                  className="group cursor-pointer rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/40 p-3 transition hover:border-[#1558C9]/40 hover:bg-white"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="rounded-xs bg-[#030407] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                        {bld.code}
                      </span>
                      <span className="font-semibold text-[#030407] group-hover:text-[#1558C9]">
                        {bld.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {bld.criticalCount > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-xs bg-[#590907] px-1.5 py-0.5 text-[9px] font-bold text-white">
                          <AlertTriangle size={10} />
                          {bld.criticalCount} Critical
                        </span>
                      )}
                      <span className="font-semibold text-[#030407]">
                        {bld.issuesCount} {bld.issuesCount === 1 ? "issue" : "issues"}
                      </span>
                    </div>
                  </div>

                  {/* Relative Density Visual Bar */}
                  <div className="mt-2.5 flex h-2 w-full overflow-hidden rounded-full bg-[#E7E9DC]">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        bld.criticalCount > 0 ? "bg-[#590907]" : "bg-[#1558C9]"
                      }`}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#73766C]">
                    <span>Zone: {bld.zone}</span>
                    <span className="font-semibold text-[#1558C9]">
                      Health Score: {bld.healthPercent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sub-column: Departmental Breakdown Chart */}
        <div>
          <h3 className="font-mono text-[11px] font-bold tracking-wider text-[#73766C] uppercase">
            Domain Fault Distribution
          </h3>

          <div className="mt-3.5 space-y-3.5">
            {departments.map((dept) => (
              <div key={dept.department} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#151710]">{dept.department}</span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-[#73766C]">{dept.count} faults</span>
                    <span className="font-bold text-[#030407]">{dept.percentage}%</span>
                  </div>
                </div>

                {/* Progress Meter Bar */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F7F8EF] border border-[#E7E9DC]">
                  <div
                    style={{
                      width: `${dept.percentage}%`,
                      backgroundColor: dept.colorHex,
                    }}
                    className="h-full rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Departmental Insight Box */}
          <div className="mt-6 rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-3.5 text-xs">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#1558C9] uppercase">
              <BarChart3 size={13} />
              <span>Diagnostic Takeaway</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#73766C]">
              HVAC & thermal climate systems account for 38% of all campus maintenance tickets, with chillers and VAV units experiencing high demand during mid-semester cooling peaks.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
