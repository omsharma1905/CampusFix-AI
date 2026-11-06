"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers3,
  Wrench,
  Radio,
} from "lucide-react";
import { ACTIVITY_FEED_DATA } from "./mock-data";
import { ActivityEvent } from "./types";

interface ActivityFeedProps {
  activities?: ActivityEvent[];
  onSelectActivity?: (act: ActivityEvent) => void;
}

export function OperationalActivityFeed({
  activities = ACTIVITY_FEED_DATA,
  onSelectActivity,
}: ActivityFeedProps) {
  const renderBadge = (badgeStyle: ActivityEvent["badgeStyle"], label: string) => {
    switch (badgeStyle) {
      case "burgundy":
        return (
          <span className="rounded-xs bg-[#590907] px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-2xs">
            {label}
          </span>
        );
      case "cobalt":
        return (
          <span className="rounded-xs bg-[#1558C9] px-2 py-0.5 font-mono text-[9px] font-semibold text-white">
            {label}
          </span>
        );
      case "acid":
        return (
          <span className="rounded-xs bg-[#D4FF24] px-2 py-0.5 font-mono text-[9px] font-bold text-[#030407] border border-[#b2d919]">
            {label}
          </span>
        );
      case "cream":
        return (
          <span className="rounded-xs bg-[#E8D2B5] px-2 py-0.5 font-mono text-[9px] font-bold text-[#030407]">
            {label}
          </span>
        );
      case "sage":
        return (
          <span className="rounded-xs bg-[#A5A79B]/30 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#151710] border border-[#A5A79B]/40">
            {label}
          </span>
        );
      default:
        return (
          <span className="rounded-xs bg-[#F7F8EF] px-2 py-0.5 font-mono text-[9px] text-[#73766C]">
            {label}
          </span>
        );
    }
  };

  const renderIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "SLA_ALERT":
        return <AlertTriangle size={15} className="text-[#590907]" />;
      case "WORK_ORDER":
        return <Wrench size={15} className="text-[#1558C9]" />;
      case "MAINTENANCE_COMPLETE":
        return <CheckCircle2 size={15} className="text-[#1558C9]" />;
      case "TICKET_RESOLVED":
        return <CheckCircle2 size={15} className="text-[#A5A79B]" />;
      case "ASSET_REGISTERED":
        return <Layers3 size={15} className="text-[#030407]" />;
      default:
        return <Activity size={15} className="text-[#1558C9]" />;
    }
  };

  return (
    <article className="w-full max-w-full min-w-0 rounded-xl border border-[#E7E9DC] bg-white p-5 shadow-xs sm:p-6">
      {/* Feed Header */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1558C9] uppercase">
            AUDIT TRAIL & LOGS
          </span>
          <h2 className="mt-1 font-serif text-xl font-normal text-[#030407] sm:text-2xl">
            Recent Operational Activity Feed
          </h2>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-[#73766C]">
          <Radio size={12} className="text-[#1558C9] animate-pulse" />
          <span>Real-time event subscriber active</span>
        </div>
      </div>

      {/* Horizontally arranged cards on desktop / stacked on mobile */}
      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => onSelectActivity?.(activity)}
            className="group flex flex-col justify-between rounded-lg border border-[#E7E9DC] bg-[#F7F8EF]/40 p-4 transition duration-150 hover:-translate-y-0.5 hover:border-[#1558C9]/40 hover:bg-white hover:shadow-xs cursor-pointer"
          >
            <div>
              {/* Top row: Badge & Timestamp */}
              <div className="flex items-center justify-between gap-1.5">
                {renderBadge(activity.badgeStyle, activity.badgeLabel)}
                <div className="flex items-center gap-1 font-mono text-[10px] text-[#73766C]">
                  <Clock size={10} />
                  <span>{activity.timestamp}</span>
                </div>
              </div>

              {/* Title & Icon */}
              <div className="mt-2.5 flex items-start gap-2">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded bg-white border border-[#E7E9DC]">
                  {renderIcon(activity.type)}
                </span>
                <h3 className="font-sans text-xs font-bold leading-tight text-[#030407] group-hover:text-[#1558C9]">
                  {activity.title}
                </h3>
              </div>

              {/* Detail body */}
              <p className="mt-2 text-[11px] leading-relaxed text-[#73766C] line-clamp-3">
                {activity.detail}
              </p>
            </div>

            {/* Footer Actor and Reference ID */}
            <div className="mt-3.5 border-t border-[#E7E9DC]/70 pt-2 flex items-center justify-between font-mono text-[9px] text-[#73766C]">
              <span className="truncate max-w-[110px]" title={activity.actorName}>
                {activity.actorName}
              </span>
              <span className="font-semibold text-[#1558C9]">
                {activity.targetRef}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
