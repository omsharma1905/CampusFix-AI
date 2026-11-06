"use client";

import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Layers3,
  AlertTriangle,
  Wrench,
  Gauge,
  Activity,
} from "lucide-react";
import { KpiCardData } from "./types";

interface KpiCardProps {
  card: KpiCardData;
}

export function KpiCard({ card }: KpiCardProps) {
  // Select contextual icon based on KPI card id
  const renderIcon = () => {
    switch (card.id) {
      case "total-assets":
        return <Layers3 size={18} className="text-[#1558C9]" />;
      case "open-issues":
        return <AlertTriangle size={18} className="text-[#590907]" />;
      case "active-work-orders":
        return <Wrench size={18} className="text-[#1558C9]" />;
      case "pm-compliance":
        return <Gauge size={18} className="text-[#1558C9]" />;
      case "health-index":
        return <Activity size={18} className="text-[#1558C9]" />;
      default:
        return <Activity size={18} className="text-[#1558C9]" />;
    }
  };

  // Badge styling according to design system
  const getBadgeStyle = () => {
    switch (card.badgeVariant) {
      case "acid":
        return "bg-[#D4FF24] text-[#030407] font-bold border border-[#b2d919]";
      case "burgundy":
        return "bg-[#590907] text-white font-bold border border-[#7a0d0a] shadow-xs";
      case "cobalt":
        return "bg-[#1558C9] text-white font-semibold";
      case "sage":
        return "bg-[#A5A79B]/25 text-[#151710] font-semibold border border-[#A5A79B]/40";
      default:
        return "bg-[#F7F8EF] text-[#151710] font-semibold border border-[#E7E9DC]";
    }
  };

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-[#E7E9DC] bg-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1558C9]/40 hover:shadow-md">
      {/* Top Header: Label & Icon */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-[#73766C] uppercase">
            {card.label}
          </span>
          <span className="grid size-8 place-items-center rounded-lg bg-[#F7F8EF] transition-colors group-hover:bg-[#1558C9]/10">
            {renderIcon()}
          </span>
        </div>

        {/* Primary Numerical Metric: Big Newsreader Serif */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="font-serif text-3xl font-medium tracking-tight text-[#030407] sm:text-4xl">
            {card.value}
          </span>
        </div>

        {/* Badge & Trend indicator */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`rounded-sm px-2 py-0.5 font-mono text-[9px] uppercase ${getBadgeStyle()}`}>
            {card.badge}
          </span>

          <div className="flex items-center gap-0.5 font-mono text-[10px] text-[#73766C]">
            {card.trend === "up" && (
              <ArrowUpRight size={12} className="text-[#1558C9] stroke-[2.5]" />
            )}
            {card.trend === "down" && (
              <ArrowDownRight size={12} className="text-[#590907] stroke-[2.5]" />
            )}
            <span>{card.delta}</span>
          </div>
        </div>
      </div>

      {/* Footer Subtitle & Context Microcopy */}
      <div className="mt-4 border-t border-[#E7E9DC]/70 pt-2.5">
        <p className="text-[11px] leading-tight text-[#151710]">{card.subtitle}</p>
        <span className="mt-1 block font-mono text-[9px] text-[#73766C]">
          {card.contextNote}
        </span>
      </div>
    </article>
  );
}

