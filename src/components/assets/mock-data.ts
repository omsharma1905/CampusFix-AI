import {
  AssetRecord,
  AssetKpiSummary,
  PredictiveRiskItem,
  SpatialDistributionItem,
  TaggingHubData,
  AssetDetailRecord,
} from "./types";

export const KPI_SUMMARY: AssetKpiSummary = {
  totalAssets: {
    count: "4,821",
    delta: "+12 this week",
    progress: 100,
    label: "100% active ledger",
  },
  fullyOperational: {
    count: "4,518",
    rate: "93.7% RATE",
    progress: 93.7,
    label: "Normal state",
  },
  maintenanceRequired: {
    count: "248",
    rate: "5.1% RATE",
    progress: 5.1,
    label: "19 pending parts",
  },
  criticalTelemetry: {
    count: "55",
    alert: "IMMEDIATE ATTENTION",
    progress: 25,
    label: "8 auto-dispatched",
  },
};

export const INITIAL_ASSET_RECORDS: AssetRecord[] = [
  {
    id: "AST-2214",
    name: "Sony 4K Laser Projector",
    specification: "VPL-FHZ85 / High-Output AV",
    category: "Audio Visual & Media",
    campus: "North Main",
    building: "Turing Hall",
    space: "Auditorium 101 [East Tier]",
    department: "Academic Tech",
    condition: "Healthy",
    healthScore: 94,
    lastService: "12 Oct 2024",
    serialNumber: "SN-SNY-2214-4K",
    manufacturer: "Sony Electronics",
    installDate: "15 Jan 2023",
  },
  {
    id: "AST-1180",
    name: "Carrier Chiller Plant Compressor #2",
    specification: "Model 19DV-380 / Centrifugal Dual-Stage",
    category: "HVAC & Climate",
    campus: "North Main",
    building: "Central Energy Plant",
    space: "Basement Sub-Level B2",
    department: "Facility Ops",
    condition: "Operational",
    healthScore: 88,
    lastService: "28 Sep 2024",
    serialNumber: "CAR-19DV-380-02",
    manufacturer: "Carrier Commercial HVAC",
    installDate: "20 May 2021",
  },
  {
    id: "AST-3052",
    name: "Shimadzu HPLC Spectrometer",
    specification: "Prominence-i LC-2030C 3D Plus",
    category: "Laboratory & Research",
    campus: "North Main",
    building: "Science Complex East",
    space: "Bio-Chemistry Lab 304",
    department: "Natural Sciences",
    condition: "Maintenance Required",
    healthScore: 64,
    lastService: "04 Aug 2024",
    serialNumber: "SHM-LC2030-3D",
    manufacturer: "Shimadzu Scientific",
    installDate: "11 Nov 2022",
  },
  {
    id: "AST-4120",
    name: "Eaton 500kVA Transformer Substation",
    specification: "Padmount Primary • SN: ETN-9981-L",
    category: "Power Distribution",
    campus: "North Main",
    building: "Engineering Block A",
    space: "High-Voltage Vault 02",
    department: "Infrastructure Ops",
    condition: "Critical",
    conditionDetail: "Critical: Vibration Sensor Alert",
    healthScore: 28,
    lastService: "Overdue 14d",
    isOverdue: true,
    serialNumber: "ETN-9981-L",
    manufacturer: "Eaton Power Quality",
    installDate: "03 Mar 2019",
  },
  {
    id: "AST-5018",
    name: "Cisco Catalyst 9600 Core Switch",
    specification: "C9606R Chassis / Quad Power Supply",
    category: "IT & Telephony",
    campus: "North Main",
    building: "Central Energy Plant",
    space: "Rack 14-B / Hot Aisle",
    department: "Network Engineering",
    condition: "Operational",
    healthScore: 91,
    lastService: "17 Nov 2024",
    serialNumber: "CSC-C9606R-QP4",
    manufacturer: "Cisco Systems",
    installDate: "08 Jul 2023",
  },
  {
    id: "AST-1940",
    name: "Liebert Industrial Dehumidifier",
    specification: "Decommissioned 31 Aug 2024",
    category: "HVAC & Climate",
    campus: "North Main",
    building: "Central Energy Plant",
    space: "Surplus Bay 4",
    department: "Asset Disposition",
    condition: "Retired",
    healthScore: null,
    lastService: "31 Aug 2024",
    isRetired: true,
    serialNumber: "LBT-IND-DH-1940",
    manufacturer: "Vertiv Liebert",
    installDate: "14 Feb 2016",
  },
  {
    id: "AST-6204",
    name: "Olympus BX53 Biological Microscope",
    specification: "Fluorescence Phase Contrast Assembly",
    category: "Laboratory & Research",
    campus: "North Main",
    building: "Turing Hall",
    space: "Histology Lab 204",
    department: "Life Sciences",
    condition: "Healthy",
    healthScore: 96,
    lastService: "01 Dec 2024",
    serialNumber: "OLY-BX53-FPC",
    manufacturer: "Evident Olympus",
    installDate: "22 Sep 2023",
  },
  {
    id: "AST-7102",
    name: "Kohler 750kVA Emergency Diesel Generator",
    specification: "Fast-Response X Controller Tier 4",
    category: "Power Distribution",
    campus: "North Main",
    building: "Engineering Block A",
    space: "Generator Yard Bay 1",
    department: "Infrastructure Ops",
    condition: "Healthy",
    healthScore: 95,
    lastService: "15 Oct 2024",
    serialNumber: "KOH-750REOZD",
    manufacturer: "Kohler Power Systems",
    installDate: "19 Jun 2020",
  },
  {
    id: "AST-8319",
    name: "Thermo Scientific Ultralow Freezer (-86°C)",
    specification: "TSX Series VIP Plus R-290",
    category: "Laboratory & Research",
    campus: "North Main",
    building: "Science Complex East",
    space: "Cryo Storage Room B-12",
    department: "Natural Sciences",
    condition: "Maintenance Required",
    healthScore: 68,
    lastService: "22 Sep 2024",
    serialNumber: "TS-TSX600-VIP",
    manufacturer: "Thermo Fisher Scientific",
    installDate: "05 May 2022",
  },
];

export const CATEGORIES_FILTER_OPTIONS = [
  "Category (All 14)",
  "Audio Visual & Media",
  "HVAC & Climate",
  "IT & Telephony",
  "Laboratory & Research",
  "Power Distribution",
];

export const CAMPUS_FILTER_OPTIONS = [
  "Campus: North Main",
  "Campus: South Medical Quad",
  "Campus: East Athletics",
];

export const BUILDING_FILTER_OPTIONS = [
  "Building: All Blocks",
  "Turing Hall",
  "Engineering Block A",
  "Science Complex East",
  "Central Energy Plant",
];

export const CONDITION_FILTER_OPTIONS = [
  "Condition: All",
  "Healthy",
  "Operational",
  "Maintenance Required",
  "Critical Only",
  "Retired",
];

export const HEALTH_SCORE_FILTER_OPTIONS = [
  "Health Score (All)",
  "Healthy (80–100%)",
  "Moderate (50–79%)",
  "Degraded (< 50%)",
];

export const PREDICTIVE_RISK_ITEMS: PredictiveRiskItem[] = [
  {
    id: "risk-1",
    assetName: "Turing Hall Substation #02",
    subsystemFault: "Overheating Harmonic Surge",
    probability: "91.4% prob",
    isCritical: true,
  },
  {
    id: "risk-2",
    assetName: "Central Plant Fan Coil 4",
    subsystemFault: "Bearing Wear Decoupling",
    probability: "82.1% prob",
    isCritical: false,
  },
];

export const SPATIAL_DISTRIBUTION_ITEMS: SpatialDistributionItem[] = [
  {
    buildingName: "Turing Hall (CS & Engineering)",
    assetCount: "1,842 assets (38%)",
    percentage: 38,
  },
  {
    buildingName: "Science Complex East",
    assetCount: "1,410 assets (29%)",
    percentage: 29,
  },
  {
    buildingName: "Central Utility Quad",
    assetCount: "920 assets (19%)",
    percentage: 19,
  },
];

export const TAGGING_HUB_DATA: TaggingHubData = {
  templateName: 'Avery Industrial 2x1" Template',
  pendingCount: 48,
  statusLabel: "Ready to print • 48 items pending",
};

export const DETAIL_AST_2214: AssetDetailRecord = {
  id: "AST-2214",
  name: "Sony 4K Laser Projector",
  specification: "VPL-FHZ85 / High-Output AV",
  category: "Audio Visual & Media",
  campus: "North Main",
  building: "Turing Hall",
  space: "Auditorium 101 [East Tier]",
  location: "Turing Hall • Auditorium 101 [East Tier]",
  department: "Academic Tech",
  condition: "Healthy",
  healthScore: 94,
  lastService: "12 Oct 2024",
  serialNumber: "SN-VPL-99824-KT",
  manufacturer: "Sony Corporation",
  installDate: "15 Jan 2023",
  modelVariant: "VPL-FHZ85 / High-Output 3LCD",
  opticalSource: "Laser Diode (20,000 hrs rating)",
  nativeResolution: "4K (3840 x 2160 WUXGA Upscaled)",
  brightnessRating: "7,300 ANSI Lumens",
  nominalPowerDraw: "490W Active Load (100–240V AC)",
  standbyPower: "0.5W",
  institution: "Apex Institute • North Main Quad",
  preciseEnclosure: "Turing Hall • 1st Floor • Aud 101",
  designatedCustodian: "Dr. Elena Rostova (Head of Media)",
  fieldSupportSquad: "Media Ops Squad 04",
  primaryContact: "R. Davis (Tech Lead)",
  criticality: "High Criticality",
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDawRU-OMP3OmFaAuulDGroudPVoVPFoI1WQWH20sXVc2XjdI9m7lF0RSgx90ddiwYUvrpiBri61sQxnl1zWuKvKjLrupRPPpWEQtvL-09Q93kxVWXOIPUP9V8xepEvnIuXb4rhxcOSAAiia9zXSUTu5x9RN0bnDy59rjADj8KwwYGBaiSfnxQ0SbwyopxskxpmJVwOlKtNrei3XOn_RZ3jiX8AEeGjlG434WP9O1Y",
  qrPayload: "CF://ASSET/AST-2214/SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
  qrVerified: true,
  qrLastScanned: "Today, 09:14 AM (Media Ops 04)",
  healthMetrics: {
    score: 94,
    statusLabel: "Nominal / Optimal",
    explanation:
      "Deterministic Telemetry Calculation: Score computed from run-hours, cooling delta, filter airflow, and PM adherence. (Non-predictive operational index).",
    trendAverage: "94.0 avg",
    trendPeriod: "Q1'25 (96) → Q2'26 (94)",
    sparklinePoints: [96, 95, 93, 95, 94, 94],
    laserRuntime: {
      current: 3420,
      max: 20000,
      label: "17.1% life consumed",
      percentConsumed: 17.1,
    },
    coolingDelta: {
      value: "38.2°C",
      label: "Optimal (<45°C max)",
      barPercent: 48,
    },
    incidents: {
      count: 0,
      label: "Last 180 days clean",
    },
    pmCompliance: {
      rate: "100%",
      lastDate: "12 Sep 2026",
    },
    serviceDelay: {
      value: "0.0 hrs",
      label: "Zero Backlog",
    },
  },
  lifecycle: {
    currentStageNumber: 4,
    currentStageName: "Operational Use",
    stageTimelineSummary: "Stage 4: Operational Use (Year 2.1 of 7.0)",
    stages: [
      {
        number: "01",
        title: "Procurement",
        dateAndVendor: "12 Jun 2024 • Sony Direct",
        reference: "PO-99120 • $8,450",
        status: "COMPLETED",
      },
      {
        number: "02",
        title: "Registration",
        dateAndVendor: "28 Jun 2024 • Barcode Bind",
        reference: "Tag AST-2214",
        status: "COMPLETED",
      },
      {
        number: "03",
        title: "Commissioning",
        dateAndVendor: "18 Aug 2024 • Aud 101",
        reference: "Calibrated & Mounted",
        status: "COMPLETED",
      },
      {
        number: "04",
        title: "Operational Use",
        dateAndVendor: "Age: 2.1 yrs (30% consumed)",
        reference: "Book Val: $5,915 USD",
        status: "ACTIVE",
      },
      {
        number: "05",
        title: "Mid-Life Overhaul",
        dateAndVendor: "Scheduled Q3 2027",
        reference: "Lens & Blower Overhaul",
        status: "UPCOMING",
      },
      {
        number: "06",
        title: "Retirement / Salvage",
        dateAndVendor: "Projected Aug 2031",
        reference: "Straight-Line Deprec.",
        status: "PROJECTED",
      },
    ],
  },
  maintenanceHistory: [
    {
      id: "MH-01",
      title: "Annual Optical Alignment & Laser Calibration",
      date: "12 Sep 2026",
      description:
        "Completed full beam output verification (7,280 lumens verified). Cleaned optical intake prisms.",
      workOrderId: "WO-8194",
      technician: "R. Davis",
      status: "Status: Verified",
      dotColor: "primary",
    },
    {
      id: "MH-02",
      title: "Semi-Annual Air Filter Replacement",
      date: "18 Jul 2026",
      description:
        "Replaced electrostatic filter assembly with OEM Sony part #4-738-921. Vacuumed internal heat exchange plenum.",
      workOrderId: "WO-7901",
      technician: "M. Chen",
      status: "Status: Verified",
      dotColor: "secondary",
    },
    {
      id: "MH-03",
      title: "EDID Handshake Dropout on HDMI-2",
      date: "22 May 2026",
      description:
        "Signal dropout reported during lecture. Resolved via Crestron NVX EDID sync reset and Sony firmware update 2.4.1.",
      workOrderId: "WO-7450",
      technician: "K. Patel",
      status: "Resolved",
      dotColor: "tertiary",
    },
    {
      id: "MH-04",
      title: "Routine Thermal Sensor Calibration",
      date: "15 Feb 2026",
      description:
        "Recalibrated thermistors 1 through 4. Baseline temperature verified at 37.8°C idle state.",
      workOrderId: "WO-7012",
      technician: "R. Davis",
      status: "Status: Verified",
      dotColor: "primary",
    },
  ],
  workOrdersList: [
    {
      id: "WO-8422",
      task: "Exhaust Duct Inspection",
      state: "Scheduled",
      priority: "Normal",
      assigned: "J. Vance",
    },
    {
      id: "WO-8194",
      task: "Image Output Calibration",
      state: "Completed",
      priority: "High",
      assigned: "R. Davis",
    },
    {
      id: "WO-7901",
      task: "Preventive Filter Maint.",
      state: "Completed",
      priority: "Routine",
      assigned: "M. Chen",
    },
  ],
  documentsList: [
    {
      id: "doc-1",
      title: "Sony VPL-FHZ85 Operating Manual",
      format: "PDF",
      size: "4.2 MB",
      tag: "OEM Doc",
    },
    {
      id: "doc-2",
      title: "Purchase Invoice & PO-99120",
      format: "PDF",
      size: "180 KB",
      tag: "Procurement",
    },
    {
      id: "doc-3",
      title: "5-Year Enterprise Laser Warranty Cert",
      format: "PDF",
      size: "940 KB",
      tag: "Valid thru Aug 2029",
    },
    {
      id: "doc-4",
      title: "Commissioning Acoustic & Lux Report",
      format: "PDF",
      size: "1.8 MB",
      tag: "Acceptance Signoff",
    },
  ],
  auditLog: [
    {
      id: "aud-1",
      message: "Routine telemetry ping recorded: 38.2°C nominal exhaust",
      actor: "Automation",
      timestamp: "14m ago",
      dotColor: "secondary",
    },
    {
      id: "aud-2",
      message: "Health score updated to 94/100 following Q3 PM",
      actor: "M. Vance",
      timestamp: "12 Sep",
      dotColor: "primary",
    },
  ],
};

export function getAssetDetailById(assetId: string): AssetDetailRecord | null {
  if (assetId.toUpperCase() === "AST-2214") {
    return DETAIL_AST_2214;
  }

  // Look up in baseline assets roster
  const found = INITIAL_ASSET_RECORDS.find(
    (a) => a.id.toLowerCase() === assetId.toLowerCase()
  );

  if (!found) {
    // If registered asset or dynamic demo asset ID (e.g. AST-2849), adapt DETAIL_AST_2214 cleanly
    return {
      ...DETAIL_AST_2214,
      id: assetId.toUpperCase(),
      qrPayload: `CF://ASSET/${assetId.toUpperCase()}`,
    };
  }

  // Generate populated detail model for any other existing asset
  return {
    ...found,
    location: `${found.building} • ${found.space}`,
    modelVariant: found.specification,
    opticalSource: found.category.includes("HVAC")
      ? "Centrifugal Chiller Motor"
      : found.category.includes("Power")
      ? "Primary Transformer Core"
      : "Standard Component",
    nativeResolution: "N/A (Industrial Plant)",
    brightnessRating: "N/A",
    nominalPowerDraw: "400V 3-Phase AC Grid",
    standbyPower: "1.2W",
    institution: "Apex Institute • North Main Quad",
    preciseEnclosure: `${found.building} • ${found.space}`,
    designatedCustodian: "Facilities Infrastructure Lead",
    fieldSupportSquad: "Rapid Campus Response Squad",
    primaryContact: "Engineering Operations Desk",
    criticality: found.condition === "Critical" ? "High Criticality" : "Medium Criticality",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    qrPayload: `CF://ASSET/${found.id}/SHA256:${found.id.toLowerCase()}-verified`,
    qrVerified: true,
    qrLastScanned: "Today, 08:30 AM (Sensor Node 12)",
    healthMetrics: {
      score: found.healthScore ?? 50,
      statusLabel:
        (found.healthScore ?? 50) >= 80
          ? "Nominal / Optimal"
          : (found.healthScore ?? 50) >= 50
          ? "Attention Needed"
          : "Critical Alert",
      explanation:
        "Deterministic Telemetry Calculation: Score computed from operating hours, thermal differential, and statutory PM adherence.",
      trendAverage: `${found.healthScore ?? 50}.0 avg`,
      trendPeriod: "Q1'25 → Q2'26",
      sparklinePoints: [
        (found.healthScore ?? 50) + 2,
        (found.healthScore ?? 50) + 1,
        (found.healthScore ?? 50) - 2,
        found.healthScore ?? 50,
      ],
      laserRuntime: {
        current: 1840,
        max: 10000,
        label: "18.4% duty cycle consumed",
        percentConsumed: 18.4,
      },
      coolingDelta: {
        value: "41.0°C",
        label: "Within safe threshold (<50°C)",
        barPercent: 55,
      },
      incidents: {
        count: found.condition === "Critical" ? 2 : 0,
        label: found.condition === "Critical" ? "Active telemetry flag" : "No recent faults",
      },
      pmCompliance: {
        rate: "95%",
        lastDate: found.lastService,
      },
      serviceDelay: {
        value: "0.0 hrs",
        label: "Normal Queue",
      },
    },
    lifecycle: {
      currentStageNumber: 4,
      currentStageName: "Operational Use",
      stageTimelineSummary: "Stage 4: Operational Use (Active Service)",
      stages: [
        {
          number: "01",
          title: "Procurement",
          dateAndVendor: "Procured & Invoiced",
          reference: "Approved PO",
          status: "COMPLETED",
        },
        {
          number: "02",
          title: "Registration",
          dateAndVendor: "Tag & Barcode Bind",
          reference: `Tag ${found.id}`,
          status: "COMPLETED",
        },
        {
          number: "03",
          title: "Commissioning",
          dateAndVendor: found.installDate || "Installed",
          reference: "Site Acceptance",
          status: "COMPLETED",
        },
        {
          number: "04",
          title: "Operational Use",
          dateAndVendor: "Current Service",
          reference: "Active Ledger",
          status: "ACTIVE",
        },
        {
          number: "05",
          title: "Mid-Life Overhaul",
          dateAndVendor: "Scheduled Cycle",
          reference: "Scheduled Inspection",
          status: "UPCOMING",
        },
        {
          number: "06",
          title: "Retirement / Salvage",
          dateAndVendor: "Projected Lifecycle",
          reference: "Standard Deprec.",
          status: "PROJECTED",
        },
      ],
    },
    maintenanceHistory: [
      {
        id: `MH-${found.id}-01`,
        title: "Standard Preventive Maintenance & Diagnostics",
        date: found.lastService,
        description: "Verified mechanical linkages, thermal sensors and telemetry output.",
        workOrderId: "WO-7800",
        technician: "Internal Tech",
        status: "Status: Verified",
        dotColor: "primary",
      },
    ],
    workOrdersList: [
      {
        id: "WO-7800",
        task: "Operational Maintenance",
        state: "Completed",
        priority: "Normal",
        assigned: "Facilities Crew",
      },
    ],
    documentsList: [
      {
        id: `doc-${found.id}-1`,
        title: `${found.name} Technical Datasheet`,
        format: "PDF",
        size: "2.1 MB",
        tag: "OEM Specification",
      },
    ],
    auditLog: [
      {
        id: `aud-${found.id}-1`,
        message: `Asset status confirmed as ${found.condition}`,
        actor: "Facilities System",
        timestamp: "Today",
        dotColor: "secondary",
      },
    ],
  };
}


