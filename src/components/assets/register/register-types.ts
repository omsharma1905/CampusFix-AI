export type AssetIdSchemaOption =
  | "AST-[YYYY]-[AUTO]"
  | "AV-MED-[NUM]"
  | "CAMPUS-TECH-[NUM]"
  | "CUSTOM";

export interface Step01BasicInfoData {
  name: string;
  idSchema: AssetIdSchemaOption;
  reservedId: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  description: string;
  photo: {
    url: string;
    filename: string;
    size: string;
    isVerifiedAttachment: boolean;
  } | null;
  rfidTag: string;
  barcode: string;
}

export type AssetCategory =
  | "Audio Visual & Media"
  | "HVAC & Climate Control"
  | "Power & Electrical"
  | "Laboratory Instrumentation"
  | "Physical Security";

export type AssetDiscipline =
  | "Electrical"
  | "Mechanical"
  | "Electronic"
  | "Civil / Structural"
  | "Information Tech (IT)"
  | "Specialized Lab";

export type CriticalityLevel = "Low" | "Normal" | "High" | "Critical";

export type OperationalClassification =
  | "Fixed Asset"
  | "Movable"
  | "Infras."
  | "Portable";

export interface Step02ClassificationData {
  category: AssetCategory;
  subcategory: string;
  discipline: AssetDiscipline;
  criticality: CriticalityLevel;
  expectedUsefulLife: number;
  operationalClassification: OperationalClassification;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  badge?: string;
}

export interface Step03LocationData {
  tenantId: string;
  tenantName: string;
  campus: string;
  building: string;
  floor: string;
  space: string;
  spaceRigId?: string;
  owningDepartment: string;
  assignedTeam: string;
  custodian: StaffMember;
  facilitiesContact: StaffMember;
  accessProtocolNotes: string;
}

export type ProcurementMethod =
  | "Direct Institutional RFP"
  | "State Consortium Contract"
  | "Sole Source Procurement"
  | "Departmental Discretionary Grant";

export type DepreciationMethod =
  | "Straight-Line Depreciation"
  | "Double Declining Balance"
  | "Sum-of-the-Years'-Digits"
  | "Units of Production";

export type VerificationStatus =
  | "Commissioned & Aligned"
  | "Mounted — Calibration Pending"
  | "Field Testing Active";

export interface WarrantyAttachment {
  filename: string;
  size: string;
  metadata: string;
}

export interface Step04LifecycleData {
  acquisitionDate: string;
  procurementVendor: string;
  purchaseOrderReference: string;
  invoiceReference: string;
  procurementMethod: ProcurementMethod;
  acquisitionCost: number | null;
  currency: string;
  depreciationMethod: DepreciationMethod;
  residualSalvageValue: number | null;
  warrantyStartDate: string;
  warrantyExpiryDate: string;
  warrantyProvider: string;
  warrantyAgreementReference: string;
  warrantyAttachment: WarrantyAttachment | null;
  installationDate: string;
  installationLocation: string;
  signOffEngineer: string;
  verificationStatus: VerificationStatus;
}

export type MaintenanceStrategy =
  | "Preventive Maintenance"
  | "Reactive Only"
  | "Preventive + Reactive";

export type RecurrenceCadence =
  | "Weekly (Every 7 Days)"
  | "Monthly (Every 30 Days)"
  | "Quarterly (Every 90 Days)"
  | "Half-yearly (Every 180 Days)"
  | "Annually (Every 365 Days)";

export interface InspectionTask {
  id: string;
  code: string;
  name: string;
  isDefault?: boolean;
}

export interface Step05MaintenanceData {
  strategy: MaintenanceStrategy;
  responsibleTeam: string;
  assignedLead: string;
  recurrenceCadence: RecurrenceCadence;
  preferredMaintenanceWindow: string;
  selectedTaskIds: string[];
  customTasks: InspectionTask[];
}

export interface RegisterWizardState {
  currentStep: number;
  lastSavedAt: string;
  isDraftSaved: boolean;
  step01: Step01BasicInfoData;
  step02: Step02ClassificationData;
  step03: Step03LocationData;
  step04: Step04LifecycleData;
  step05: Step05MaintenanceData;
  step06Review?: Record<string, unknown>;
}

export interface WizardStepDefinition {
  stepNumber: number;
  label: string;
  name: string;
}

export const WIZARD_STEPS: WizardStepDefinition[] = [
  { stepNumber: 1, label: "STEP 01", name: "Basic Info" },
  { stepNumber: 2, label: "STEP 02", name: "Classification" },
  { stepNumber: 3, label: "STEP 03", name: "Location & Ownership" },
  { stepNumber: 4, label: "STEP 04", name: "Lifecycle" },
  { stepNumber: 5, label: "STEP 05", name: "Maintenance" },
  { stepNumber: 6, label: "STEP 06", name: "Review & Register" },
];

export const INITIAL_STEP_01_DATA: Step01BasicInfoData = {
  name: "Sony 4K Laser Projector",
  idSchema: "AST-[YYYY]-[AUTO]",
  reservedId: "AST-2024-2849",
  manufacturer: "Sony Corporation",
  model: "VPL-FHZ85",
  serialNumber: "SN-VPL-99824-KT",
  description:
    "High-output 7,300 lumens 3LCD laser installation projector mounted on heavy-duty ceiling bracket. Primary audio-visual feed for Turing Hall main theater lectures.",
  photo: {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKYT6RToS3uId7u4WOTnLEizLOCOzI_kzspAvyvWpcZgL1XkUpddKgyESh0Q3IWaEHeTOUtNiEGJiIyqCqqyBLnztCh6fcTEqIlbgi7L_SLqR_G1UJtJwBulfJtXYYMOrZ6H4v2fh9JqtIp0ynl9-JATaA4sN5RIkZq6fhd1Mu7xK1HS2iMQ_18NHAs-NA8hr6J_7BOuC9vQpAULsghhgJdZdzGfOMi2YNjzBGcLY",
    filename: "IMG_SONY_VPL_AUD101.raw",
    size: "8.2 MB",
    isVerifiedAttachment: true,
  },
  rfidTag: "EPC-992-88102-X",
  barcode: "Code128 / 2849",
};

export const CATEGORY_SUBCATEGORIES_MAP: Record<AssetCategory, string[]> = {
  "Audio Visual & Media": [
    "Projection Equipment",
    "Public Address / Acoustics",
    "Digital Signage & Displays",
    "Lecture Capture Rig",
  ],
  "HVAC & Climate Control": [
    "Centrifugal Chiller",
    "Air Handling Unit (AHU)",
    "Cooling Tower",
    "Variable Air Volume (VAV)",
  ],
  "Power & Electrical": [
    "Transformer Substation",
    "Switchgear & Distribution",
    "Uninterruptible Power Supply (UPS)",
    "Emergency Diesel Generator",
  ],
  "Laboratory Instrumentation": [
    "Mass Spectrometer",
    "Optical & Phase Microscope",
    "Centrifuge & Thermal Cycler",
    "Fume Hood & Exhaust",
  ],
  "Physical Security": [
    "Access Control Gateway",
    "Surveillance Telemetry",
    "Perimeter Sensors",
    "Fire Suppression System",
  ],
};

export const INITIAL_STEP_02_DATA: Step02ClassificationData = {
  category: "Audio Visual & Media",
  subcategory: "Projection Equipment",
  discipline: "Electronic",
  criticality: "High",
  expectedUsefulLife: 7,
  operationalClassification: "Fixed Asset",
};

export const AVAILABLE_STAFF: StaffMember[] = [
  {
    id: "FAC-8821",
    name: "Dr. Elena Rostova",
    role: "Head of Academic Media",
    department: "Academic Technology & Research",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyCfjMk5TQoXd81lMjrCbsPnaps2NXM9eYujmKodULrbG7dGUSmNxSMbZMs6DvjYMmHyoBHuRyR1u7vPm2m9_CSSjeWkWAwyUkZj56f1dxZ0sk5_8PU5RllM-NgqJ1VAi37L0AGwV1snN5wx4qjSJ1gvry9WojDJCDbM9DR5UR_mjbtAU7oxwfzRo1iEoZq1e7k64n-lj61MOl5Z3DeAH7KfO9bauZT67FnyeVxW4",
    badge: "VERIFIED STAFF",
  },
  {
    id: "FAC-4402",
    name: "Marcus Vance",
    role: "Director of Facilities • Ext. 4402",
    department: "Facilities & Campus Physical Plant",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6ttj9vnjTK6zRTn7txOM4JinUT21oPCljusnEdPwia5fz-_TpPuSoiy6XRZc88SoMHYI_5cthWosRIN2G-qESsO9ch1VgesjiaigAc3k6kJrTEofioLJgM2Pph8fe1IRRVVOhydr0Txj5MdsieX6UZNQlV3iD3Y9VQFYtfpjLrE-ze3ANv26-ULdGu0MBOPnvA-SInGV4bGcNJnvpDrUp9ChhL0ohgYdnjGSfoUs",
    badge: "Emergency Lead",
  },
  {
    id: "ENG-4412",
    name: "Sarah Jenkins",
    role: "Lead AV Systems Engineer",
    department: "Academic Technology & Research",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    badge: "AV Specialist",
  },
  {
    id: "OPS-3391",
    name: "David Chen",
    role: "Senior Infrastructure Specialist",
    department: "Information Technology Services",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    badge: "Infrastructure Lead",
  },
];

export interface RoomMetadata {
  id: string;
  name: string;
  gridRef: string;
  capacity: string;
  ceilingHeight: string;
  powerFeed: string;
  hvacZone: string;
  rigId: string;
  tag: string;
}

export const ROOM_METADATA_MAP: Record<string, RoomMetadata> = {
  // Turing Hall
  "Auditorium 101 (Main Amphitheater)": {
    id: "RM-101",
    name: "Auditorium 101",
    gridRef: "T1-01-N4",
    capacity: "240 Tiered Seats",
    ceilingHeight: "4.80 Meters (Harness)",
    powerFeed: "Vault 02 • 20A Isolated",
    hvacZone: "North Plenum Chiller 3",
    rigId: "RIG #02-CEIL",
    tag: "Lecture Theater • 240 seats",
  },
  "Lab 104 (Robotics Testbed)": {
    id: "RM-104",
    name: "Lab 104",
    gridRef: "T1-01-W2",
    capacity: "36 Workstations",
    ceilingHeight: "3.50 Meters",
    powerFeed: "Subpanel B • 40A Bus",
    hvacZone: "Precision Lab Chiller 1",
    rigId: "RIG #04-WALL",
    tag: "Robotics Research • 36 stations",
  },
  "Seminar Room 112": {
    id: "RM-112",
    name: "Seminar Room 112",
    gridRef: "T1-01-E1",
    capacity: "45 Modular Seats",
    ceilingHeight: "3.20 Meters",
    powerFeed: "Branch 12 • 15A Line",
    hvacZone: "North Plenum VAV-04",
    rigId: "RIG #12-DROP",
    tag: "Seminar Suite • 45 seats",
  },
  "AV Rack Closet 101-C": {
    id: "RM-101C",
    name: "AV Rack 101-C",
    gridRef: "T1-01-R1",
    capacity: "4x 42U Server Racks",
    ceilingHeight: "2.80 Meters",
    powerFeed: "Dual 30A L6-30 PDU",
    hvacZone: "Dedicated In-Row CRAC",
    rigId: "RACK-101C-01",
    tag: "Telecom Closet • 4 Racks",
  },
  "Atrium Main Exhibit": {
    id: "RM-001",
    name: "Atrium Main Exhibit",
    gridRef: "T1-00-C1",
    capacity: "Open Public Gallery",
    ceilingHeight: "9.50 Meters",
    powerFeed: "Floor Boxes • 20A Bus",
    hvacZone: "Atrium Displacement HVAC",
    rigId: "RIG-ATR-CEIL",
    tag: "Exhibition Concourse",
  },
  "Lecture Hall 010": {
    id: "RM-010",
    name: "Lecture Hall 010",
    gridRef: "T1-00-S2",
    capacity: "180 Tiered Seats",
    ceilingHeight: "4.20 Meters",
    powerFeed: "Vault 01 • 20A Isolated",
    hvacZone: "South Chiller VAV-02",
    rigId: "RIG #01-DROP",
    tag: "Lecture Theater • 180 seats",
  },
  "Welcome Center Hall": {
    id: "RM-002",
    name: "Welcome Center Hall",
    gridRef: "T1-00-E3",
    capacity: "60 Visitors",
    ceilingHeight: "3.60 Meters",
    powerFeed: "Wall Subpanel 1A",
    hvacZone: "Main Concourse Loop",
    rigId: "WALL-DS-01",
    tag: "Reception & Visitor Suite",
  },
  "Central Chiller Vault B-02": {
    id: "RM-B02",
    name: "Central Chiller Vault B-02",
    gridRef: "T1-B1-M1",
    capacity: "Heavy Plant Vault",
    ceilingHeight: "5.50 Meters",
    powerFeed: "480V 3-Phase 800A Switchgear",
    hvacZone: "Industrial Exhaust 12,000 CFM",
    rigId: "VAULT-PLANT-02",
    tag: "Central Plant Machinery",
  },
  "High Voltage Transformer Chamber B-04": {
    id: "RM-B04",
    name: "High Voltage Chamber B-04",
    gridRef: "T1-B1-E4",
    capacity: "Restricted Utility Vault",
    ceilingHeight: "4.50 Meters",
    powerFeed: "13.2kV Utility Intertie",
    hvacZone: "Positive Pressure Air Exchange",
    rigId: "HV-GRID-SUB04",
    tag: "High Voltage Substation",
  },
  "Department Boardroom 201": {
    id: "RM-201",
    name: "Department Boardroom 201",
    gridRef: "T1-02-N1",
    capacity: "28 Conference Seats",
    ceilingHeight: "3.20 Meters",
    powerFeed: "Branch 24 • Clean Power",
    hvacZone: "Executive Zone VAV-11",
    rigId: "RIG-CONF-201",
    tag: "Executive Conference",
  },
  "Dean Executive Suite 210": {
    id: "RM-210",
    name: "Dean Executive Suite 210",
    gridRef: "T1-02-W4",
    capacity: "12 Executive Staff",
    ceilingHeight: "3.00 Meters",
    powerFeed: "Branch 22 • 15A Clean",
    hvacZone: "Executive Zone VAV-12",
    rigId: "WALL-AV-210",
    tag: "Dean Office Enclosure",
  },

  // Maxwell Applied Physics Wing
  "Cryo Optics Chamber B-01": {
    id: "MAX-B01",
    name: "Cryo Optics Chamber B-01",
    gridRef: "MX-B1-C1",
    capacity: "Cleanroom Class 100",
    ceilingHeight: "3.80 Meters",
    powerFeed: "Isolated Motor Generator 480V",
    hvacZone: "Cryo Chilled He Exhaust",
    rigId: "CRYO-OPT-01",
    tag: "Sub-Kelvin Physics Bay",
  },
  "Superconducting Magnet Bay B-03": {
    id: "MAX-B03",
    name: "Superconducting Magnet Bay B-03",
    gridRef: "MX-B1-M3",
    capacity: "High Magnetic Field Lab",
    ceilingHeight: "4.50 Meters",
    powerFeed: "DC High Current Rectifier 200A",
    hvacZone: "Liquid Nitrogen Scrubber",
    rigId: "MAG-BAY-03",
    tag: "Magnetic Resonance Vault",
  },
  "Physics Demonstration Hall 05": {
    id: "MAX-005",
    name: "Physics Demonstration Hall 05",
    gridRef: "MX-00-D5",
    capacity: "160 Tiered Seats",
    ceilingHeight: "4.60 Meters",
    powerFeed: "Demonstration Bench 120/208V",
    hvacZone: "Maxwell Lower Chiller",
    rigId: "RIG-MAX-05",
    tag: "Experimental Demo Theater",
  },
  "Quantum Materials Lab 12": {
    id: "MAX-012",
    name: "Quantum Materials Lab 12",
    gridRef: "MX-00-Q2",
    capacity: "24 Research Technicians",
    ceilingHeight: "3.40 Meters",
    powerFeed: "Subpanel Q • 60A Isolated",
    hvacZone: "Precision Constant Temp ±0.1°C",
    rigId: "RIG-QUANT-12",
    tag: "Solid State Synthesis Lab",
  },
  "Femtosecond Laser Bench 102": {
    id: "MAX-102",
    name: "Femtosecond Laser Bench 102",
    gridRef: "MX-01-L2",
    capacity: "Laser Interlock Enclosure",
    ceilingHeight: "3.20 Meters",
    powerFeed: "Optics Table 30A UPS",
    hvacZone: "HEPA Filtration Laminar Flow",
    rigId: "RIG-LASER-102",
    tag: "Ultrafast Optical Bench",
  },
  "Spectroscopy Suite 108": {
    id: "MAX-108",
    name: "Spectroscopy Suite 108",
    gridRef: "MX-01-S8",
    capacity: "18 Workstations",
    ceilingHeight: "3.20 Meters",
    powerFeed: "Precision 120V 20A Clean",
    hvacZone: "North Wing Plenum",
    rigId: "RIG-SPEC-108",
    tag: "Raman & IR Spectroscopy",
  },

  // Ada Lovelace Computational Commons
  "Student Collaboration Commons": {
    id: "ADA-001",
    name: "Student Collaboration Commons",
    gridRef: "AD-00-C1",
    capacity: "120 Shared Desks",
    ceilingHeight: "4.00 Meters",
    powerFeed: "Underfloor Busway 20A Modules",
    hvacZone: "Commons Variable Air 1",
    rigId: "RIG-COMMONS-01",
    tag: "Open Study & Coding Arena",
  },
  "Tech Support Desk": {
    id: "ADA-002",
    name: "Tech Support Desk",
    gridRef: "AD-00-T2",
    capacity: "10 Support Staff",
    ceilingHeight: "3.20 Meters",
    powerFeed: "Dedicated Circuit A1",
    hvacZone: "Concourse Perimeter",
    rigId: "DESK-TECH-02",
    tag: "Hardware Service Station",
  },
  "Enterprise HPC Cluster Bay 101": {
    id: "ADA-101",
    name: "HPC Cluster Bay 101",
    gridRef: "AD-01-H1",
    capacity: "32x 48U Liquid-Cooled Racks",
    ceilingHeight: "4.20 Meters",
    powerFeed: "Dual 415V 60A 3-Phase Busway",
    hvacZone: "In-Row Containment 240kW",
    rigId: "HPC-BAY-101",
    tag: "Tier-3 Datacenter Vault",
  },
  "Core Network NOC Center 105": {
    id: "ADA-105",
    name: "Core Network NOC Center 105",
    gridRef: "AD-01-N5",
    capacity: "12 Mission Consoles",
    ceilingHeight: "3.50 Meters",
    powerFeed: "Uninterruptible 100kVA PDU",
    hvacZone: "Dedicated In-Row CRAC 2",
    rigId: "NOC-WALL-105",
    tag: "Network Operations Console",
  },
  "Interactive Media Lab 201": {
    id: "ADA-201",
    name: "Interactive Media Lab 201",
    gridRef: "AD-02-M1",
    capacity: "40 Spatial Workstations",
    ceilingHeight: "3.40 Meters",
    powerFeed: "Clean Branch 14 • 30A",
    hvacZone: "Level 2 Collaboration Loop",
    rigId: "RIG-VR-201",
    tag: "Spatial Computing & VR Lab",
  },
  "Graduate Research Pod 208": {
    id: "ADA-208",
    name: "Graduate Research Pod 208",
    gridRef: "AD-02-P8",
    capacity: "16 Doctoral Desks",
    ceilingHeight: "3.00 Meters",
    powerFeed: "Branch 18 • 20A Isolated",
    hvacZone: "Level 2 East VAV",
    rigId: "RIG-POD-208",
    tag: "Doctoral Research Suite",
  },

  // Faraday Research Annex
  "High Bay Assembly Crane Floor": {
    id: "FAR-001",
    name: "High Bay Crane Floor",
    gridRef: "FR-00-H1",
    capacity: "10-Ton Overhead Gantry",
    ceilingHeight: "12.00 Meters",
    powerFeed: "480V 3-Phase 400A High Bay Bus",
    hvacZone: "High-Volume Low-Speed Fans",
    rigId: "GANTRY-CRANE-01",
    tag: "Industrial Prototyping Bay",
  },
  "Rapid Prototyping Workshop": {
    id: "FAR-002",
    name: "Rapid Prototyping Workshop",
    gridRef: "FR-00-P2",
    capacity: "20 Fabrication Stations",
    ceilingHeight: "4.00 Meters",
    powerFeed: "208V 3-Phase 60A Sockets",
    hvacZone: "Dust Extraction & Fume Scrubber",
    rigId: "RIG-FAB-02",
    tag: "Additive CNC Machinery",
  },
  "Telemetry Observation Deck M-01": {
    id: "FAR-M01",
    name: "Telemetry Observation Deck M-01",
    gridRef: "FR-MZ-O1",
    capacity: "25 Engineering Observers",
    ceilingHeight: "3.50 Meters",
    powerFeed: "Dedicated 120V 20A Line",
    hvacZone: "Mezzanine HVAC Loop",
    rigId: "RIG-OBS-M01",
    tag: "Overhead Flight & Drone Deck",
  },

  // Edison Power Lab
  "Substation Control Room 01": {
    id: "EDI-001",
    name: "Substation Control Room 01",
    gridRef: "ED-00-S1",
    capacity: "8 SCADA Operator Desks",
    ceilingHeight: "3.50 Meters",
    powerFeed: "Station Battery 125V DC + 120V AC",
    hvacZone: "Constant Positive Pressure",
    rigId: "SCADA-PANEL-01",
    tag: "Grid SCADA Gateway",
  },
  "Switchgear Test Bench 04": {
    id: "EDI-004",
    name: "Switchgear Test Bench 04",
    gridRef: "ED-00-T4",
    capacity: "Safety Interlocked Test Bay",
    ceilingHeight: "5.00 Meters",
    powerFeed: "69kV Test Transformer Tap",
    hvacZone: "High Velocity Blast Exhaust",
    rigId: "TEST-BENCH-04",
    tag: "High Energy Breaker Lab",
  },
  "Impulse Generator Chamber": {
    id: "EDI-101",
    name: "Impulse Generator Chamber",
    gridRef: "ED-01-I1",
    capacity: "Faraday Cage Shielded Bay",
    ceilingHeight: "8.50 Meters",
    powerFeed: "Marx Generator 1.2MV Tap",
    hvacZone: "Dehumidified Air Loop <30% RH",
    rigId: "MARX-GEN-101",
    tag: "Lightning & Surge Test Vault",
  },

  // Tesla Robotics Facility
  "Robotic Rover Test Track": {
    id: "TES-001",
    name: "Robotic Rover Test Track",
    gridRef: "TS-00-R1",
    capacity: "Obstacle Obstruction Arena",
    ceilingHeight: "7.00 Meters",
    powerFeed: "Wireless Charging Coils 50kW",
    hvacZone: "Regulated Ambient 20°C",
    rigId: "TRACK-NAV-01",
    tag: "Autonomous Mobility Arena",
  },
  "Drone Flight Enclosure Bay": {
    id: "TES-002",
    name: "Drone Flight Enclosure Bay",
    gridRef: "TS-00-D2",
    capacity: "Protective Netting 500m³",
    ceilingHeight: "8.00 Meters",
    powerFeed: "Fast Charger Bank 12kW",
    hvacZone: "Turbulence-Free Air Supply",
    rigId: "FLIGHT-NET-02",
    tag: "UAV Flight Research Cage",
  },
  "Kinematic Arm Workcell 101": {
    id: "TES-101",
    name: "Kinematic Arm Workcell 101",
    gridRef: "TS-01-K1",
    capacity: "6 Heavy Industrial Manipulators",
    ceilingHeight: "4.20 Meters",
    powerFeed: "480V 3-Phase Servo Bus 100A",
    hvacZone: "Clean Filtered Lab Air",
    rigId: "ARM-CELL-101",
    tag: "Precision Motion Staging",
  },

  // Maritime Innovation Basin
  "Autonomous Submersible Tank 01": {
    id: "MAR-001",
    name: "Submersible Tank 01",
    gridRef: "MB-00-T1",
    capacity: "1.5 Million Liter Test Tank",
    ceilingHeight: "9.00 Meters",
    powerFeed: "Waterproof Sub-480V 150A Supply",
    hvacZone: "Saline Air Filtration & Dehumidifier",
    rigId: "POOL-RIG-01",
    tag: "Deep Water Acoustic Tank",
  },
  "Marine Sensor Calibration Lab": {
    id: "MAR-002",
    name: "Sensor Calibration Lab",
    gridRef: "MB-00-S2",
    capacity: "16 Hydrophone Rigs",
    ceilingHeight: "3.20 Meters",
    powerFeed: "Isolated DC Sensor Rig PDU",
    hvacZone: "Constant Salinity Environment",
    rigId: "CALIB-BENCH-02",
    tag: "Acoustic Sensor Calibrator",
  },
  "Tow Carriage Wave Channel": {
    id: "HYD-001",
    name: "Tow Carriage Channel",
    gridRef: "HY-00-W1",
    capacity: "120m Instrumented Tow Tank",
    ceilingHeight: "6.00 Meters",
    powerFeed: "Linear Synchronous Motor 200kW",
    hvacZone: "Water Surface Boundary Air Exhaust",
    rigId: "TOW-CARRIAGE-01",
    tag: "Hydrodynamic Velocity Flume",
  },
  "Propulsion Dynamometer Cell": {
    id: "HYD-002",
    name: "Dynamometer Cell",
    gridRef: "HY-00-D2",
    capacity: "High Torque Marine Dyno",
    ceilingHeight: "4.50 Meters",
    powerFeed: "Regenerative Drive 350kW",
    hvacZone: "Cooling Water Heat Exchanger",
    rigId: "DYNO-CELL-02",
    tag: "Subsea Thrust Testing Unit",
  },
};

export const CAMPUS_BUILDING_MAP: Record<string, { id: string; buildings: string[] }> = {
  "North Main Campus": {
    id: "CMP-01",
    buildings: [
      "Turing Hall (Computer Science & Engineering)",
      "Maxwell Applied Physics Wing",
      "Ada Lovelace Computational Commons",
      "Faraday Research Annex",
    ],
  },
  "South Tech Extension": {
    id: "CMP-02",
    buildings: ["Edison Power Lab", "Tesla Robotics Facility"],
  },
  "Maritime Innovation Basin": {
    id: "CMP-03",
    buildings: ["Oceanography Research Complex", "Hydrodynamics Testing Basin"],
  },
};

export const BUILDING_FLOORS_MAP: Record<string, { id: string; floors: string[] }> = {
  "Turing Hall (Computer Science & Engineering)": {
    id: "BLD-TRN",
    floors: [
      "Basement Mechanical Sub-level",
      "Ground Level Concourse",
      "First Floor (Lecture & Lab Tier)",
      "Second Floor Faculty Suites",
    ],
  },
  "Maxwell Applied Physics Wing": {
    id: "BLD-MAX",
    floors: ["Sub-basement Cryo Tier", "Ground Floor", "First Floor Laser Labs"],
  },
  "Ada Lovelace Computational Commons": {
    id: "BLD-ADA",
    floors: ["Ground Concourse", "Level 1 Datacenter", "Level 2 Collaboration Hub"],
  },
  "Faraday Research Annex": {
    id: "BLD-FAR",
    floors: ["Ground Floor High Bay", "Mezzanine Observation Deck"],
  },
  "Edison Power Lab": {
    id: "BLD-EDI",
    floors: ["Ground Floor Grid Operations", "First Floor High Voltage Vaults"],
  },
  "Tesla Robotics Facility": {
    id: "BLD-TES",
    floors: ["Ground Arena Floor", "First Floor Kinematics Bay"],
  },
  "Oceanography Research Complex": {
    id: "BLD-OCE",
    floors: ["Ground Floor Acoustic Labs", "Upper Telemetry Concourse"],
  },
  "Hydrodynamics Testing Basin": {
    id: "BLD-HYD",
    floors: ["Basin Deck Level", "Control Observation Tier"],
  },
};

export const FLOOR_SPACES_MAP: Record<string, string[]> = {
  // Turing Hall
  "First Floor (Lecture & Lab Tier)": [
    "Auditorium 101 (Main Amphitheater)",
    "Lab 104 (Robotics Testbed)",
    "Seminar Room 112",
    "AV Rack Closet 101-C",
  ],
  "Ground Level Concourse": [
    "Atrium Main Exhibit",
    "Lecture Hall 010",
    "Welcome Center Hall",
  ],
  "Basement Mechanical Sub-level": [
    "Central Chiller Vault B-02",
    "High Voltage Transformer Chamber B-04",
  ],
  "Second Floor Faculty Suites": [
    "Department Boardroom 201",
    "Dean Executive Suite 210",
  ],

  // Maxwell Applied Physics Wing
  "Sub-basement Cryo Tier": [
    "Cryo Optics Chamber B-01",
    "Superconducting Magnet Bay B-03",
  ],
  "Ground Floor": [
    "Physics Demonstration Hall 05",
    "Quantum Materials Lab 12",
  ],
  "First Floor Laser Labs": [
    "Femtosecond Laser Bench 102",
    "Spectroscopy Suite 108",
  ],

  // Ada Lovelace Computational Commons
  "Ground Concourse": [
    "Student Collaboration Commons",
    "Tech Support Desk",
  ],
  "Level 1 Datacenter": [
    "Enterprise HPC Cluster Bay 101",
    "Core Network NOC Center 105",
  ],
  "Level 2 Collaboration Hub": [
    "Interactive Media Lab 201",
    "Graduate Research Pod 208",
  ],

  // Faraday Research Annex
  "Ground Floor High Bay": [
    "High Bay Assembly Crane Floor",
    "Rapid Prototyping Workshop",
  ],
  "Mezzanine Observation Deck": [
    "Telemetry Observation Deck M-01",
  ],

  // Edison Power Lab
  "Ground Floor Grid Operations": [
    "Substation Control Room 01",
    "Switchgear Test Bench 04",
  ],
  "First Floor High Voltage Vaults": [
    "Impulse Generator Chamber",
  ],

  // Tesla Robotics Facility
  "Ground Arena Floor": [
    "Robotic Rover Test Track",
    "Drone Flight Enclosure Bay",
  ],
  "First Floor Kinematics Bay": [
    "Kinematic Arm Workcell 101",
  ],

  // Oceanography Research Complex
  "Ground Floor Acoustic Labs": [
    "Autonomous Submersible Tank 01",
    "Marine Sensor Calibration Lab",
  ],
  "Upper Telemetry Concourse": [
    "Marine Sensor Calibration Lab",
  ],

  // Hydrodynamics Testing Basin
  "Basin Deck Level": [
    "Tow Carriage Wave Channel",
  ],
  "Control Observation Tier": [
    "Propulsion Dynamometer Cell",
  ],
};

/**
 * Universal fallback room options for any floor or custom location
 */
export const UNIVERSAL_FALLBACK_SPACES = [
  "Room 101 · Main Operations Suite",
  "Room 102 · General Equipment Lab",
  "Room 103 · Technical Workspace",
  "Docking Hub · Mobile Cart Enclosure",
  "Unassigned / Building-Wide Common Infrastructure",
];

/**
 * Robust space/room resolver that guarantees non-empty options for any building/floor
 */
export function getSpacesForFloor(floor: string, building?: string): string[] {
  if (floor && FLOOR_SPACES_MAP[floor] && FLOOR_SPACES_MAP[floor].length > 0) {
    return FLOOR_SPACES_MAP[floor];
  }

  // Attempt building-based fallback
  if (building && BUILDING_FLOORS_MAP[building]) {
    const floors = BUILDING_FLOORS_MAP[building].floors;
    for (const f of floors) {
      if (FLOOR_SPACES_MAP[f] && FLOOR_SPACES_MAP[f].length > 0) {
        return FLOOR_SPACES_MAP[f];
      }
    }
  }

  return UNIVERSAL_FALLBACK_SPACES;
}

/**
 * Robust room metadata resolver with sensible fallbacks
 */
export function getRoomMetadata(space: string): RoomMetadata {
  if (space && ROOM_METADATA_MAP[space]) {
    return ROOM_METADATA_MAP[space];
  }

  const cleanName = space ? space.split(" (")[0].split(" · ")[0] : "General Space";
  return {
    id: "RM-GEN-01",
    name: cleanName,
    gridRef: "T1-01-GEN",
    capacity: "Standard Enclosure",
    ceilingHeight: "3.20 Meters",
    powerFeed: "120V / 20A Branch Circuit",
    hvacZone: "Standard Facilities Loop",
    rigId: "RIG-DEFAULT-01",
    tag: `${cleanName} • Standard Space`,
  };
}

export const DEPARTMENT_OPTIONS: { name: string; id: string }[] = [
  { name: "Academic Technology & Research", id: "DEPT-ATR" },
  { name: "Information Technology Services (ITS)", id: "DEPT-ITS" },
  { name: "Facilities & Campus Physical Plant", id: "DEPT-FAC" },
  { name: "School of Engineering & Applied Sciences", id: "DEPT-SEAS" },
  { name: "Computer Science & Engineering", id: "DEPT-CSE" },
];

export const TEAM_OPTIONS: { name: string; id: string }[] = [
  { name: "Media Operations Squad 04 (Auditorium AV)", id: "SQD-04" },
  { name: "Compute & Network Tier-1 Team", id: "SQD-01" },
  { name: "HVAC & Environmental Controls Unit", id: "SQD-02" },
  { name: "Rapid Response Facilities Crew", id: "SQD-03" },
];

export const INITIAL_STEP_03_DATA: Step03LocationData = {
  tenantId: "AIT-GLOBAL-01",
  tenantName: "Apex Institute of Technology",
  campus: "North Main Campus",
  building: "Turing Hall (Computer Science & Engineering)",
  floor: "First Floor (Lecture & Lab Tier)",
  space: "Auditorium 101 (Main Amphitheater)",
  spaceRigId: "RIG #02-CEIL",
  owningDepartment: "Academic Technology & Research",
  assignedTeam: "Media Operations Squad 04 (Auditorium AV)",
  custodian: AVAILABLE_STAFF[0],
  facilitiesContact: AVAILABLE_STAFF[1],
  accessProtocolNotes:
    "Primary projection system for Tier-1 lecture series. Access key required for ceiling rig harness. Master safety tether inspection mandatory prior to servicing projector optic module.",
};

export const INITIAL_STEP_04_DATA: Step04LifecycleData = {
  acquisitionDate: "12 Jun 2024",
  procurementVendor: "Sony Direct Commercial",
  purchaseOrderReference: "PO-99120",
  invoiceReference: "INV-2024-8841-US",
  procurementMethod: "Direct Institutional RFP",
  acquisitionCost: 8450.0,
  currency: "USD ($)",
  depreciationMethod: "Straight-Line Depreciation",
  residualSalvageValue: 1200.0,
  warrantyStartDate: "12 Jun 2024",
  warrantyExpiryDate: "18 Aug 2029",
  warrantyProvider: "Sony Corporation Commercial ProCare",
  warrantyAgreementReference: "WRN-SONY-5Y-4991",
  warrantyAttachment: {
    filename: "Sony_Enterprise_Warranty_Certificate.pdf",
    size: "180 KB",
    metadata: "Digital Certificate Encrypted",
  },
  installationDate: "18 Aug 2024",
  installationLocation: "Turing Hall, Auditorium 101 [Ceiling Rig]",
  signOffEngineer: "R. Davis (Tech Lead)",
  verificationStatus: "Commissioned & Aligned",
};

export const DEFAULT_INSPECTION_TASKS: InspectionTask[] = [
  {
    id: "task-01",
    code: "ENV-OPT-01",
    name: "Visual chassis & optical lens cleanliness inspection",
    isDefault: true,
  },
  {
    id: "task-02",
    code: "LAS-ALIGN-02",
    name: "Optical engine laser diode alignment check",
    isDefault: true,
  },
  {
    id: "task-03",
    code: "THM-FAN-03",
    name: "Cooling fan CFM airflow & thermal delta-T verification",
    isDefault: true,
  },
  {
    id: "task-04",
    code: "FILT-PRS-04",
    name: "Electrostatic air filter cleaning & static pressure test",
    isDefault: true,
  },
  {
    id: "task-05",
    code: "TEL-LOG-05",
    name: "Laser diode runtime hour logging (20,000 hr institutional cap)",
    isDefault: true,
  },
  {
    id: "task-06",
    code: "NET-AV-06",
    name: "Firmware version & Crestron NVX handshake latency test",
    isDefault: true,
  },
  {
    id: "task-07",
    code: "SEC-MNT-07",
    name: "Ceiling bracket safety tether torque verification",
    isDefault: true,
  },
];

export const MAINTENANCE_TEAM_OPTIONS: string[] = [
  "Media Operations Squad 04 (Audiovisual)",
  "Central Electrical & High Voltage",
  "HVAC & Climate Controls Group",
  "Compute & Network Tier-1 Team",
  "Rapid Response Facilities Crew",
];

export const CADENCE_OPTIONS: RecurrenceCadence[] = [
  "Weekly (Every 7 Days)",
  "Monthly (Every 30 Days)",
  "Quarterly (Every 90 Days)",
  "Half-yearly (Every 180 Days)",
  "Annually (Every 365 Days)",
];

export const INITIAL_STEP_05_DATA: Step05MaintenanceData = {
  strategy: "Preventive + Reactive",
  responsibleTeam: "Media Operations Squad 04 (Audiovisual)",
  assignedLead: "R. Davis (Tech Lead - Media Ops)",
  recurrenceCadence: "Quarterly (Every 90 Days)",
  preferredMaintenanceWindow: "Academic Intersession / Weekends (Non-teaching)",
  selectedTaskIds: [
    "task-01",
    "task-02",
    "task-03",
    "task-04",
    "task-05",
    "task-06",
    "task-07",
  ],
  customTasks: [],
};

export const CONFIRMATION_STORAGE_KEY = "campusfix_registered_asset_confirmation_v1";

export interface RegisteredAssetConfirmation {
  version: 1;
  registeredAt: string;
  formattedTimestamp: string;
  txReference: string;
  permanentId: string;
  convertedFromDraftId: string;
  step01Data: Step01BasicInfoData;
  step02Data: Step02ClassificationData;
  step03Data: Step03LocationData;
  step04Data: Step04LifecycleData;
  step05Data: Step05MaintenanceData;
  payloadUrl: string;
}

export function convertDraftIdToPermanent(reservedId: string): string {
  if (!reservedId) return "AST-2849";
  // Convert AST-YYYY-XXXX to AST-XXXX
  const yearMatch = reservedId.match(/^AST-\d{4}-(\d+)$/i);
  if (yearMatch) {
    return `AST-${yearMatch[1]}`;
  }
  // Convert general AST-[anything]-[num]
  const generalMatch = reservedId.match(/^([A-Z]+)-.*?-(\d+)$/i);
  if (generalMatch) {
    return `${generalMatch[1]}-${generalMatch[2]}`;
  }
  return reservedId;
}

export function generateDemoTxReference(): string {
  const chars = "0123456789abcdef";
  let hash = "0x82f1";
  for (let i = 0; i < 28; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

const CONFIRMATION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24-hour retention TTL for ephemeral receipts

export function saveRegisteredAssetConfirmation(confirmation: RegisteredAssetConfirmation): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONFIRMATION_STORAGE_KEY, JSON.stringify(confirmation));
  } catch (e) {
    console.error("Failed to save registered asset confirmation:", e);
  }
}

export function loadRegisteredAssetConfirmation(): RegisteredAssetConfirmation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONFIRMATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !parsed.permanentId || !parsed.step01Data) {
      clearRegisteredAssetConfirmation();
      return null;
    }

    // Enforce 24-hour expiration TTL on temporary registration receipts
    if (parsed.registeredAt) {
      const regTime = new Date(parsed.registeredAt).getTime();
      if (!isNaN(regTime) && Date.now() - regTime > CONFIRMATION_MAX_AGE_MS) {
        clearRegisteredAssetConfirmation();
        return null;
      }
    }

    return parsed as RegisteredAssetConfirmation;
  } catch (e) {
    console.error("Failed to parse registered asset confirmation:", e);
    clearRegisteredAssetConfirmation();
    return null;
  }
}

export function clearRegisteredAssetConfirmation(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONFIRMATION_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear registered asset confirmation:", e);
  }
}

/**
 * Creates empty, clean Step 01 data for registering a fresh asset
 * with a newly reserved prototype ID.
 */
export function createFreshStep01Data(reservedSuffix = "2850"): Step01BasicInfoData {
  return {
    name: "",
    idSchema: "AST-[YYYY]-[AUTO]",
    reservedId: `AST-2024-${reservedSuffix}`,
    manufacturer: "",
    model: "",
    serialNumber: "",
    description: "",
    photo: null,
    rfidTag: `EPC-992-${reservedSuffix}-X`,
    barcode: `Code128 / ${reservedSuffix}`,
  };
}



