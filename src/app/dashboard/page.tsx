import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Institution Admin Operations Dashboard | CampusFix AI",
  description:
    "Real-time institutional facility operations, asset health telemetry, critical SLA queue, and preventive maintenance milestones.",
};

export default function DashboardPage() {
  return <DashboardShell />;
}

