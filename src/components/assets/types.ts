export type AssetCondition =
  | "Healthy"
  | "Operational"
  | "Maintenance Required"
  | "Critical"
  | "Retired";

export type AssetCategory =
  | "Audio Visual & Media"
  | "HVAC & Climate"
  | "Laboratory & Research"
  | "Power Distribution"
  | "IT & Telephony"
  | "IT & Computational"
  | "Electrical Distribution";

export interface AssetRecord {
  id: string; // e.g., "AST-2214"
  name: string; // e.g., "Sony 4K Laser Projector"
  specification: string; // e.g., "VPL-FHZ85 / High-Output AV"
  category: AssetCategory;
  campus: string; // e.g., "North Main"
  building: string; // e.g., "Turing Hall"
  space: string; // e.g., "Auditorium 101 [East Tier]"
  department: string; // e.g., "Academic Tech"
  condition: AssetCondition;
  conditionDetail?: string; // e.g., "Critical: Vibration Sensor Alert"
  healthScore: number | null; // e.g., 94 (or null for retired)
  lastService: string; // e.g., "12 Oct 2024" or "Overdue 14d"
  isOverdue?: boolean;
  serialNumber?: string;
  isRetired?: boolean;
  modelNumber?: string;
  manufacturer?: string;
  installDate?: string;
}

export interface AssetFilterState {
  searchQuery: string;
  category: string;
  campus: string;
  building: string;
  condition: string;
  healthScoreRange: string;
}

export interface AssetKpiSummary {
  totalAssets: { count: string; delta: string; progress: number; label: string };
  fullyOperational: { count: string; rate: string; progress: number; label: string };
  maintenanceRequired: { count: string; rate: string; progress: number; label: string };
  criticalTelemetry: { count: string; alert: string; progress: number; label: string };
}

export interface PredictiveRiskItem {
  id: string;
  assetName: string;
  subsystemFault: string;
  probability: string;
  isCritical: boolean;
}

export interface SpatialDistributionItem {
  buildingName: string;
  assetCount: string;
  percentage: number;
}

export interface TaggingHubData {
  templateName: string;
  pendingCount: number;
  statusLabel: string;
}

export interface MaintenanceTimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  workOrderId: string;
  technician: string;
  status: string;
  dotColor: "primary" | "secondary" | "tertiary";
}

export interface AssetWorkOrderItem {
  id: string;
  task: string;
  state: string;
  priority: "High" | "Normal" | "Routine" | "Low";
  assigned: string;
}

export interface AssetDocumentItem {
  id: string;
  title: string;
  format: string;
  size: string;
  tag: string;
}

export interface AuditTrailEvent {
  id: string;
  message: string;
  actor: string;
  timestamp: string;
  dotColor: "primary" | "secondary" | "tertiary";
}

export interface AssetDetailRecord extends AssetRecord {
  location?: string;
  modelVariant: string;
  opticalSource: string;
  nativeResolution: string;
  brightnessRating: string;
  nominalPowerDraw: string;
  standbyPower: string;
  institution: string;
  preciseEnclosure: string;
  designatedCustodian: string;
  fieldSupportSquad: string;
  primaryContact: string;
  criticality: "High Criticality" | "Medium Criticality" | "Low Criticality";
  imageUrl: string;
  qrPayload: string;
  qrVerified: boolean;
  qrLastScanned: string;
  healthMetrics: {
    score: number;
    statusLabel: string;
    explanation: string;
    trendAverage: string;
    trendPeriod: string;
    sparklinePoints: number[];
    laserRuntime: { current: number; max: number; label: string; percentConsumed: number };
    coolingDelta: { value: string; label: string; barPercent: number };
    incidents: { count: number; label: string };
    pmCompliance: { rate: string; lastDate: string };
    serviceDelay: { value: string; label: string };
  };
  lifecycle: {
    currentStageNumber: number;
    currentStageName: string;
    stageTimelineSummary: string;
    stages: Array<{
      number: string;
      title: string;
      dateAndVendor: string;
      reference: string;
      status: "COMPLETED" | "ACTIVE" | "UPCOMING" | "PROJECTED";
    }>;
  };
  maintenanceHistory: MaintenanceTimelineItem[];
  workOrdersList: AssetWorkOrderItem[];
  documentsList: AssetDocumentItem[];
  auditLog: AuditTrailEvent[];
}


