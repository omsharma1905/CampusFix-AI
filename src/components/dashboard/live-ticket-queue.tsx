"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { TICKETS_DATA } from "./mock-data";
import { TicketItem, PriorityLevel, TicketStatus } from "./types";

interface LiveTicketQueueProps {
  initialTickets?: TicketItem[];
  onViewAllTickets?: () => void;
  onSelectTicket?: (ticket: TicketItem) => void;
}

export function LiveTicketQueue({
  initialTickets = TICKETS_DATA,
  onViewAllTickets,
  onSelectTicket,
}: LiveTicketQueueProps) {
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  // Filtering tickets
  const filteredTickets = initialTickets.filter((t) => {
    if (filterCategory === "CRITICAL" && t.priority !== "CRITICAL") return false;
    if (filterCategory === "HVAC" && t.category !== "HVAC") return false;
    if (filterCategory === "Electrical" && t.category !== "Electrical") return false;
    if (filterCategory === "Elevators" && t.category !== "Elevators") return false;
    if (filterCategory === "Plumbing" && t.category !== "Plumbing") return false;

    return true;
  });

  // Priority Pill Styling
  const renderPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case "CRITICAL":
        return (
          <span className="inline-flex items-center gap-1 rounded-sm bg-[#590907] px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-2xs">
            <span className="size-1.5 rounded-full bg-[#D4FF24] animate-pulse" />
            CRITICAL
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center rounded-sm bg-[#1558C9] px-2 py-0.5 font-mono text-[9px] font-semibold text-white">
            HIGH
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center rounded-sm bg-[#E8D2B5] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#030407]">
            MEDIUM
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center rounded-sm bg-[#F7F8EF] px-2 py-0.5 font-mono text-[9px] font-medium text-[#73766C] border border-[#E7E9DC]">
            LOW
          </span>
        );
    }
  };

  // Status Pill Styling
  const renderStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#1558C9]">
            <span className="size-1.5 rounded-full bg-[#1558C9]" />
            In Progress
          </span>
        );
      case "DISPATCHED":
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-[#030407]">
            <span className="size-1.5 rounded-full bg-[#D4FF24] border border-[#030407]" />
            Dispatched
          </span>
        );
      case "IN_TRIAGE":
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-[#73766C]">
            <span className="size-1.5 rounded-full bg-[#A5A79B]" />
            In Triage
          </span>
        );
      case "AWAITING_PARTS":
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-[#73766C]">
            <span className="size-1.5 rounded-full bg-[#E8D2B5]" />
            Awaiting Parts
          </span>
        );
    }
  };

  return (
    <article className="w-full max-w-full min-w-0 rounded-xl border border-[#E7E9DC] bg-white shadow-xs overflow-hidden">
      {/* Header bar: Title, Live indicator, and Filter pills */}
      <div className="flex flex-col justify-between gap-3.5 border-b border-[#E7E9DC] p-4 sm:p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1558C9] uppercase">
              REAL-TIME DISPATCH
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D4FF24]/20 px-2 py-0.5 font-mono text-[9px] font-bold text-[#030407]">
              <span className="size-1.5 rounded-full bg-[#1558C9] animate-ping" />
              LIVE STREAM
            </span>
          </div>
          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407] sm:text-2xl">
            Live Ticket Queue & SLA Monitor
          </h2>
        </div>

        {/* Filter Tabs / Quick Selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: "All Tickets", count: initialTickets.length },
            { id: "CRITICAL", label: "Critical SLAs", count: 3, alert: true },
            { id: "HVAC", label: "HVAC", count: 3 },
            { id: "Electrical", label: "Electrical", count: 2 },
            { id: "Elevators", label: "Elevators", count: 1 },
          ].map((tab) => {
            const isSelected = filterCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  isSelected
                    ? "bg-[#030407] text-white"
                    : tab.alert
                    ? "border border-[#590907]/30 bg-[#590907]/10 text-[#590907] hover:bg-[#590907]/20"
                    : "border border-[#E7E9DC] bg-[#F7F8EF] text-[#73766C] hover:bg-white hover:text-[#151710]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-xs px-1 py-0.2 font-mono text-[9px] ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : tab.alert
                      ? "bg-[#590907] text-white font-bold"
                      : "bg-[#E7E9DC] text-[#73766C]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Ticket Queue Table */}
      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#E7E9DC] bg-[#F7F8EF]/70 font-mono text-[10px] font-semibold tracking-wider text-[#73766C] uppercase">
              <th scope="col" className="py-3 pr-4 pl-5">Asset & Fault Description</th>
              <th scope="col" className="py-3 pr-4 pl-3">Location & Space</th>
              <th scope="col" className="py-3 pr-4 pl-3">Priority</th>
              <th scope="col" className="py-3 pr-4 pl-3">Assigned Tech</th>
              <th scope="col" className="py-3 pr-4 pl-3">Status</th>
              <th scope="col" className="py-3 pr-4 pl-3">SLA Target</th>
              <th scope="col" className="py-3 pr-5 pl-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E9DC]">
            {filteredTickets.map((ticket) => {
              const isCritical = ticket.priority === "CRITICAL";

              return (
                <tr
                  key={ticket.id}
                  onClick={() => onSelectTicket?.(ticket)}
                  className={`group cursor-pointer transition-colors ${
                    isCritical
                      ? "bg-[#590907]/[0.02] hover:bg-[#590907]/[0.05]"
                      : "hover:bg-[#F7F8EF]/70"
                  }`}
                >
                  {/* Asset & Fault Info */}
                  <td className="py-3.5 pr-4 pl-5">
                    <div className="flex items-start gap-2.5">
                      {isCritical && (
                        <span className="mt-0.5 size-2 shrink-0 rounded-full bg-[#590907]" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#030407] group-hover:text-[#1558C9]">
                            {ticket.assetName}
                          </span>
                          <span className="font-mono text-[10px] text-[#73766C]">
                            {ticket.assetTag}
                          </span>
                        </div>
                        <p className="mt-0.5 max-w-md line-clamp-1 text-[11px] text-[#73766C]">
                          {ticket.issue}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location & Space */}
                  <td className="py-3.5 pr-4 pl-3">
                    <div className="font-medium text-[#151710]">{ticket.location}</div>
                    <div className="font-mono text-[10px] text-[#73766C]">{ticket.space}</div>
                  </td>

                  {/* Priority Badge */}
                  <td className="py-3.5 pr-4 pl-3">
                    {renderPriorityBadge(ticket.priority)}
                  </td>

                  {/* Assigned Technician */}
                  <td className="py-3.5 pr-4 pl-3">
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-full bg-[#1558C9]/10 font-mono text-[10px] font-bold text-[#1558C9]">
                        {ticket.assignedTechnician.avatarInitials}
                      </span>
                      <div>
                        <div className="font-medium text-[#030407]">
                          {ticket.assignedTechnician.name}
                        </div>
                        <div className="text-[10px] text-[#73766C]">
                          {ticket.assignedTechnician.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 pr-4 pl-3">
                    {renderStatusBadge(ticket.status)}
                  </td>

                  {/* SLA Countdown Timer */}
                  <td className="py-3.5 pr-4 pl-3">
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[11px] font-bold ${
                        ticket.slaUrgent
                          ? "bg-[#590907] text-white shadow-2xs"
                          : "bg-[#F7F8EF] text-[#030407] border border-[#E7E9DC]"
                      }`}
                    >
                      <Clock size={11} className={ticket.slaUrgent ? "text-[#D4FF24]" : "text-[#73766C]"} />
                      <span>{ticket.slaRemaining}</span>
                    </div>
                  </td>

                  {/* Quick Action */}
                  <td className="py-3.5 pr-5 pl-3 text-right">
                    <span className="inline-flex size-7 items-center justify-center rounded-md border border-transparent text-[#73766C] transition group-hover:border-[#E7E9DC] group-hover:bg-white group-hover:text-[#1558C9]">
                      <ArrowUpRight size={14} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer: Direct Link to Complete Ticket Index */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#E7E9DC] bg-[#F7F8EF]/40 px-4 sm:px-5 py-3 text-xs">
        <span className="font-mono text-[11px] text-[#73766C]">
          Showing {filteredTickets.length} of {initialTickets.length} active tickets · 3 with imminent SLA breach
        </span>

        <button
          type="button"
          onClick={onViewAllTickets}
          className="flex items-center gap-1 font-sans text-xs font-semibold text-[#1558C9] hover:text-[#030407]"
        >
          <span>View complete ticket index (34 tickets)</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}
