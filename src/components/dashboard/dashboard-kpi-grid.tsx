"use client";

import React from "react";
import { KpiCard } from "./kpi-card";
import { KPI_DATA } from "./mock-data";
import { KpiCardData } from "./types";

interface KpiGridProps {
  cards?: KpiCardData[];
}

export function DashboardKpiGrid({ cards = KPI_DATA }: KpiGridProps) {
  return (
    <section aria-label="Operations Key Performance Indicators" className="w-full max-w-full min-w-0">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <KpiCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

