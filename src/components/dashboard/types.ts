export type PriorityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type TicketStatus = "IN_TRIAGE" | "DISPATCHED" | "IN_PROGRESS" | "AWAITING_PARTS";

export interface TicketItem {
  id: string;
  assetName: string;
  assetTag: string;
  issue: string;
  location: string;
  space: string;
  zone: string;
  priority: PriorityLevel;
  assignedTechnician: {
    name: string;
    avatarInitials: string;
    role: string;
  };
  status: TicketStatus;
  slaRemaining: string;
  slaUrgent: boolean;
  isOverdue?: boolean;
  category: "HVAC" | "Electrical" | "Plumbing" | "Elevators" | "General";
  reportedAt: string;
}

export interface KpiCardData {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  badge: string;
  badgeVariant: "acid" | "cobalt" | "burgundy" | "sage" | "neutral";
  subtitle: string;
  contextNote: string;
  metricNumber: number;
}

export interface AssetHealthBreakdown {
  healthy: { count: number; percentage: number };
  attention: { count: number; percentage: number };
  critical: { count: number; percentage: number };
  overhaul: { count: number; percentage: number };
}

export interface PreventiveMaintenanceItem {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  title: string;
  subsystem: string;
  building: string;
  locationRoom: string;
  zone: string;
  contractorOrTeam: string;
  isExternalVendor: boolean;
  complianceSpec: string;
  urgency: "REGULAR" | "HIGH_PRIORITY" | "STATUTORY";
}

export interface BuildingIncidentItem {
  id: string;
  name: string;
  code: string;
  issuesCount: number;
  criticalCount: number;
  healthPercent: number;
  zone: string;
}

export interface DepartmentShare {
  department: string;
  percentage: number;
  count: number;
  colorHex: string;
}

export interface ActivityEvent {
  id: string;
  type: "SLA_ALERT" | "WORK_ORDER" | "MAINTENANCE_COMPLETE" | "TICKET_RESOLVED" | "ASSET_REGISTERED";
  title: string;
  detail: string;
  timestamp: string;
  badgeLabel: string;
  badgeStyle: "burgundy" | "cobalt" | "acid" | "sage" | "cream";
  actorName: string;
  targetRef: string;
}

