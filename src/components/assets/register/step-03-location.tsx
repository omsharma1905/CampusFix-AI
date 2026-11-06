"use client";

import React, { useState } from "react";
import {
  Building2,
  Lock,
  MapPin,
  Layers,
  DoorClosed,
  Info,
  ArrowRight,
  Briefcase,
  Users,
  Camera,
  CheckCircle2,
  Thermometer,
  AlertCircle,
  X,
  School,
  Check,
} from "lucide-react";
import {
  Step03LocationData,
  StaffMember,
  AVAILABLE_STAFF,
  CAMPUS_BUILDING_MAP,
  BUILDING_FLOORS_MAP,
  DEPARTMENT_OPTIONS,
  TEAM_OPTIONS,
  UNIVERSAL_FALLBACK_SPACES,
  getSpacesForFloor,
  getRoomMetadata,
} from "./register-types";

interface Step03LocationProps {
  data: Step03LocationData;
  onChange: (updated: Partial<Step03LocationData>) => void;
  errors?: Record<string, string>;
}

export function Step03Location({
  data,
  onChange,
  errors = {},
}: Step03LocationProps) {
  // Modal for changing staff
  const [staffModalTarget, setStaffModalTarget] = useState<"custodian" | "contact" | null>(null);

  // Derived location dropdown options with guaranteed non-empty fallbacks
  const campusOptions = Object.keys(CAMPUS_BUILDING_MAP);
  const currentCampusBuildings = CAMPUS_BUILDING_MAP[data.campus]?.buildings;
  const buildingOptions =
    currentCampusBuildings && currentCampusBuildings.length > 0
      ? currentCampusBuildings
      : [data.building || "Turing Hall (Computer Science & Engineering)"];

  const currentBuildingFloors = BUILDING_FLOORS_MAP[data.building]?.floors;
  const floorOptions =
    currentBuildingFloors && currentBuildingFloors.length > 0
      ? currentBuildingFloors
      : [data.floor || "First Floor (Lecture & Lab Tier)"];

  const spaceOptions = getSpacesForFloor(data.floor, data.building);

  // Current room metadata with guaranteed fallback
  const currentRoomMeta = getRoomMetadata(data.space || spaceOptions[0] || "Auditorium 101");

  // Traversal names
  const campusShort = data.campus ? data.campus.replace(" Campus", "") : "Main";
  const buildingShort = data.building ? data.building.split(" (")[0] : "Building";
  const floorShort = data.floor
    ? data.floor.includes("First Floor")
      ? "Floor 01"
      : data.floor.includes("Ground")
      ? "Ground"
      : data.floor.includes("Basement")
      ? "Basement"
      : "Floor 02"
    : "Floor 01";
  const spaceShort = data.space ? data.space.split(" (")[0] : "Room";

  // Department and Team IDs
  const currentDeptObj = DEPARTMENT_OPTIONS.find((d) => d.name === data.owningDepartment);
  const currentTeamObj = TEAM_OPTIONS.find((t) => t.name === data.assignedTeam);
  const campusId = CAMPUS_BUILDING_MAP[data.campus]?.id || "CMP-01";
  const buildingId = BUILDING_FLOORS_MAP[data.building]?.id || "BLD-TRN";

  // Assignment checklist count
  const validChecks = [
    Boolean(data.campus),
    Boolean(data.building),
    Boolean(data.space),
    Boolean(data.owningDepartment),
    Boolean(data.assignedTeam),
  ].filter(Boolean).length;

  // Handlers for cascading selects ensuring non-empty space
  const handleCampusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCampus = e.target.value;
    const availableBuildings = CAMPUS_BUILDING_MAP[newCampus]?.buildings || [];
    const firstBuilding = availableBuildings[0] || data.building;
    const availableFloors = BUILDING_FLOORS_MAP[firstBuilding]?.floors || ["Ground Floor"];
    const firstFloor = availableFloors[0] || "Ground Floor";
    const availableSpaces = getSpacesForFloor(firstFloor, firstBuilding);
    const firstSpace = availableSpaces[0] || UNIVERSAL_FALLBACK_SPACES[0];
    const meta = getRoomMetadata(firstSpace);

    onChange({
      campus: newCampus,
      building: firstBuilding,
      floor: firstFloor,
      space: firstSpace,
      spaceRigId: meta.rigId,
    });
  };

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBuilding = e.target.value;
    const availableFloors = BUILDING_FLOORS_MAP[newBuilding]?.floors || ["Ground Floor"];
    const firstFloor = availableFloors[0] || "Ground Floor";
    const availableSpaces = getSpacesForFloor(firstFloor, newBuilding);
    const firstSpace = availableSpaces[0] || UNIVERSAL_FALLBACK_SPACES[0];
    const meta = getRoomMetadata(firstSpace);

    onChange({
      building: newBuilding,
      floor: firstFloor,
      space: firstSpace,
      spaceRigId: meta.rigId,
    });
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFloor = e.target.value;
    const availableSpaces = getSpacesForFloor(newFloor, data.building);
    const targetSpace = availableSpaces.includes(data.space)
      ? data.space
      : availableSpaces[0] || UNIVERSAL_FALLBACK_SPACES[0];
    const meta = getRoomMetadata(targetSpace);

    onChange({
      floor: newFloor,
      space: targetSpace,
      spaceRigId: meta.rigId,
    });
  };

  const handleSpaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpace = e.target.value;
    const meta = getRoomMetadata(newSpace);
    onChange({
      space: newSpace,
      spaceRigId: meta.rigId,
    });
  };

  const handleSelectStaff = (staff: StaffMember) => {
    if (staffModalTarget === "custodian") {
      onChange({ custodian: staff });
    } else if (staffModalTarget === "contact") {
      onChange({ facilitiesContact: staff });
    }
    setStaffModalTarget(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Form Cards (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
        {/* Card 1: Physical Campus Placement */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E8E9DC]">
          <div className="flex items-start justify-between pb-4 border-b border-[#E8E9DC]/60 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Building2 size={22} className="text-[#1558C9]" />
                <h2 className="font-serif text-[20px] text-[#1A1D15] font-normal">
                  Location &amp; Ownership
                </h2>
              </div>
              <p className="text-xs text-[#434653] mt-1">
                Connect this asset to its physical campus location, department, and responsible team.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#eeefe2] text-[#434653] font-mono text-[10px] tracking-wider uppercase font-semibold shrink-0">
              MANDATORY NODE
            </span>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Field 1: Institutional Tenant (Read-Only) */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between">
                <span>Institutional Tenant</span>
                <span className="text-[11px] font-medium text-[#737785] flex items-center gap-1">
                  <Lock size={12} /> Read-only context
                </span>
              </label>
              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#f3f5e7] rounded-lg text-[#1A1D15] border border-[#E8E9DC]">
                <School size={18} className="text-[#1558C9]" />
                <span className="text-xs font-semibold">{data.tenantName}</span>
                <span className="ml-auto font-mono text-[11px] text-[#737785]">
                  TENANT_ID: {data.tenantId}
                </span>
              </div>
            </div>

            {/* Field 2: Campus Selector */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location-campus"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>
                  Campus <span className="text-[#822820]">*</span>
                </span>
                <span className="text-[#536600] font-medium text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5EA32]" /> Operational
                </span>
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="location-campus"
                  value={data.campus}
                  onChange={handleCampusChange}
                  className={`w-full bg-[#f3f5e7] hover:bg-[#eeefe2] focus:bg-white text-[#1A1D15] text-xs font-medium rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none transition-colors cursor-pointer border ${
                    errors.campus ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {campusOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737785]">
                  ▼
                </div>
              </div>
              {errors.campus && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.campus}</span>
                </p>
              )}
            </div>

            {/* Field 3: Building Selector */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location-building"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>
                  Building <span className="text-[#822820]">*</span>
                </span>
                <span className="font-mono text-[#737785] text-[11px]">4 Active Zones</span>
              </label>
              <div className="relative">
                <Building2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="location-building"
                  value={data.building}
                  onChange={handleBuildingChange}
                  className={`w-full bg-[#f3f5e7] hover:bg-[#eeefe2] focus:bg-white text-[#1A1D15] text-xs font-medium rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none transition-colors cursor-pointer border ${
                    errors.building ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {buildingOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737785]">
                  ▼
                </div>
              </div>
              {errors.building && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.building}</span>
                </p>
              )}
            </div>

            {/* Field 4: Floor / Level */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location-floor"
                className="text-xs font-semibold text-[#1A1D15]"
              >
                Floor / Level <span className="text-[#822820]">*</span>
              </label>
              <div className="relative">
                <Layers
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="location-floor"
                  value={data.floor}
                  onChange={handleFloorChange}
                  className={`w-full bg-[#f3f5e7] hover:bg-[#eeefe2] focus:bg-white text-[#1A1D15] text-xs font-medium rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none transition-colors cursor-pointer border ${
                    errors.floor ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {floorOptions.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737785]">
                  ▼
                </div>
              </div>
              {errors.floor && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.floor}</span>
                </p>
              )}
            </div>

            {/* Field 5: Space / Room Designation */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location-space"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>
                  Space / Room Designation <span className="text-[#822820]">*</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#e8e9dc] text-[#434653] font-mono text-[10px]">
                  {currentRoomMeta.tag}
                </span>
              </label>
              {spaceOptions.length === 0 ? (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} className="text-amber-600 shrink-0" />
                    <span>No pre-configured spaces for this level. Choose a floor above.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange({ space: UNIVERSAL_FALLBACK_SPACES[0] })}
                    className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-mono text-[10px] uppercase font-bold cursor-pointer transition-colors"
                  >
                    Assign Default Space
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <DoorClosed
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                  />
                  <select
                    id="location-space"
                    value={data.space || spaceOptions[0]}
                    onChange={handleSpaceChange}
                    className={`w-full bg-[#f3f5e7] hover:bg-[#eeefe2] focus:bg-white text-[#1A1D15] text-xs font-medium rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none transition-colors cursor-pointer border ${
                      errors.space ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                    }`}
                  >
                    {spaceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737785]">
                    ▼
                  </div>
                </div>
              )}
              {errors.space && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.space}</span>
                </p>
              )}
            </div>
          </div>

          {/* Explanatory Note */}
          <div className="mt-4 p-3 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex items-start gap-2.5">
            <Info size={16} className="text-[#737785] shrink-0 mt-0.5" />
            <p className="text-xs text-[#434653] leading-relaxed">
              Supports campus-level, building-level, outdoor and unassigned infrastructure without forcing room selection. For mobile carts and fleet gear, assign the primary docking hub.
            </p>
          </div>

          {/* Location Traversal Resolution Preview */}
          <div className="mt-4 p-4 bg-[#f3f5e7]/60 rounded-xl border border-[#E8E9DC]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider font-semibold">
                Location Traversal Resolution
              </span>
              <span className="font-mono text-[11px] text-[#536600] font-bold">
                STATUS: VERIFIED (PATH: L5)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#1A1D15] shadow-2xs border border-[#E8E9DC]">
                <School size={14} className="text-[#737785]" />
                <span className="text-xs font-semibold">Apex Institute</span>
              </div>
              <ArrowRight size={14} className="text-[#737785]" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#1A1D15] shadow-2xs border border-[#E8E9DC]">
                <MapPin size={14} className="text-[#737785]" />
                <span className="text-xs font-semibold">{campusShort}</span>
              </div>
              <ArrowRight size={14} className="text-[#737785]" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#1A1D15] shadow-2xs border border-[#E8E9DC]">
                <Building2 size={14} className="text-[#737785]" />
                <span className="text-xs font-semibold">{buildingShort}</span>
              </div>
              <ArrowRight size={14} className="text-[#737785]" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#1A1D15] shadow-2xs border border-[#E8E9DC]">
                <Layers size={14} className="text-[#737785]" />
                <span className="text-xs font-semibold">{floorShort}</span>
              </div>
              <ArrowRight size={14} className="text-[#737785]" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#030407] text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C5EA32] animate-pulse" />
                <span className="text-xs font-bold text-[#C5EA32]">{spaceShort}</span>
                <span className="font-mono text-[10px] text-[#A5A79B]">
                  {data.spaceRigId || currentRoomMeta.rigId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Department & Custodianship */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E8E9DC]">
          <div className="flex items-start justify-between pb-4 border-b border-[#E8E9DC]/60 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Users size={22} className="text-[#1558C9]" />
                <h2 className="font-serif text-[20px] text-[#1A1D15] font-normal">
                  Department &amp; Custodianship
                </h2>
              </div>
              <p className="text-xs text-[#434653] mt-1">
                Establish organizational accountability, preventive ticket routing, and key personnel.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#C5EA32]/30 text-[#171e00] font-mono text-[10px] font-bold border border-[#536600]/20 shrink-0">
              RESPONSIBILITY MATRIX
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Owning Department */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="owning-department"
                className="text-xs font-semibold text-[#1A1D15]"
              >
                Owning Department <span className="text-[#822820]">*</span>
              </label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="owning-department"
                  value={data.owningDepartment}
                  onChange={(e) => onChange({ owningDepartment: e.target.value })}
                  className={`w-full bg-[#f3f5e7] hover:bg-[#eeefe2] focus:bg-white text-[#1A1D15] text-xs font-medium rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none transition-colors cursor-pointer border ${
                    errors.owningDepartment ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {DEPARTMENT_OPTIONS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737785]">
                  ▼
                </div>
              </div>
              {errors.owningDepartment && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.owningDepartment}</span>
                </p>
              )}
            </div>

            {/* Assigned Operational Team */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="assigned-team"
                className="text-xs font-semibold text-[#1A1D15]"
              >
                Assigned Operational Team <span className="text-[#822820]">*</span>
              </label>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785] pointer-events-none"
                />
                <select
                  id="assigned-team"
                  value={data.assignedTeam}
                  onChange={(e) => onChange({ assignedTeam: e.target.value })}
                  className={`w-full bg-[#f3f5e7] hover:bg-[#eeefe2] focus:bg-white text-[#1A1D15] text-xs font-medium rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none transition-colors cursor-pointer border ${
                    errors.assignedTeam ? "border-[#ba1a1a]" : "border-[#E8E9DC]"
                  }`}
                >
                  {TEAM_OPTIONS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737785]">
                  ▼
                </div>
              </div>
              {errors.assignedTeam && (
                <p className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                  <AlertCircle size={12} />
                  <span>{errors.assignedTeam}</span>
                </p>
              )}
            </div>

            {/* Designated Custodian (Primary Sign-off) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between">
                <span>
                  Designated Custodian (Primary Sign-off) <span className="text-[#822820]">*</span>
                </span>
                <span className="font-mono text-[#536600] font-bold text-[11px]">
                  VERIFIED STAFF
                </span>
              </label>
              <div className="flex items-center gap-3 p-2.5 bg-[#f3f5e7] rounded-lg border border-[#E8E9DC]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.custodian.avatar}
                  alt={data.custodian.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-[#1558C9]/30"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-[#1A1D15] truncate">
                    {data.custodian.name}
                  </span>
                  <span className="text-[11px] text-[#434653] truncate">
                    {data.custodian.role} • ID: {data.custodian.id}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStaffModalTarget("custodian")}
                  className="px-2.5 py-1 rounded bg-white text-[#1A1D15] text-xs font-semibold hover:bg-[#eeefe2] transition-colors border border-[#E8E9DC] shadow-2xs"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Facilities Contact (Escalation) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between">
                <span>
                  Facilities Contact (Escalation) <span className="text-[#822820]">*</span>
                </span>
                <span className="font-mono text-[#737785] text-[11px]">Emergency Lead</span>
              </label>
              <div className="flex items-center gap-3 p-2.5 bg-[#f3f5e7] rounded-lg border border-[#E8E9DC]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.facilitiesContact.avatar}
                  alt={data.facilitiesContact.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-[#1558C9]/30"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-[#1A1D15] truncate">
                    {data.facilitiesContact.name}
                  </span>
                  <span className="text-[11px] text-[#434653] truncate">
                    {data.facilitiesContact.role}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStaffModalTarget("contact")}
                  className="px-2.5 py-1 rounded bg-white text-[#1A1D15] text-xs font-semibold hover:bg-[#eeefe2] transition-colors border border-[#E8E9DC] shadow-2xs"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Custodianship & Access Protocol Notes */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                htmlFor="access-protocol-notes"
                className="text-xs font-semibold text-[#1A1D15] flex items-center justify-between"
              >
                <span>Custodianship &amp; Access Protocol Notes</span>
                <span className="font-mono text-[11px] text-[#737785]">
                  {data.accessProtocolNotes.length}/500 CHARS
                </span>
              </label>
              <textarea
                id="access-protocol-notes"
                rows={3}
                maxLength={500}
                value={data.accessProtocolNotes}
                onChange={(e) => onChange({ accessProtocolNotes: e.target.value })}
                className="w-full bg-[#f3f5e7] focus:bg-white text-[#1A1D15] text-xs rounded-lg p-3 focus:outline-none transition-colors resize-none border border-[#E8E9DC]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Spatial Context & Summary Cards (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Panel 1: Spatial Context & Floor Plan Widget */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Layers size={18} className="text-[#1558C9]" />
              <h3 className="font-serif text-base text-[#1A1D15] font-normal">
                Spatial Context
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#eeefe2] text-[#434653] font-mono text-[10px] border border-[#E8E9DC]">
              LVL 1 PLAN
            </span>
          </div>

          {/* Floor Plan Architectural Schematic Container */}
          <div className="relative w-full h-56 rounded-lg bg-[#dadbce]/40 overflow-hidden p-3 flex flex-col justify-between border border-[#E8E9DC]">
            <div className="flex items-center justify-between z-10">
              <div className="px-2 py-1 rounded bg-white/90 backdrop-blur-sm shadow-2xs flex items-center gap-1.5 border border-[#E8E9DC]">
                <span className="w-2 h-2 rounded-full bg-[#C5EA32]" />
                <span className="font-mono text-[10px] text-[#1A1D15] font-bold">
                  {buildingShort.toUpperCase()} — {floorShort.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#434653] bg-white/80 px-1.5 py-0.5 rounded border border-[#E8E9DC]">
                SCALE 1:250
              </span>
            </div>

            {/* Stylized SVG Architectural Zone Layout */}
            <div className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none">
              <svg
                className="w-full h-full opacity-90"
                fill="none"
                viewBox="0 0 320 180"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Wall Boundary */}
                <rect
                  x="10"
                  y="10"
                  width="300"
                  height="160"
                  rx="4"
                  fill="#E8E9DC"
                  stroke="#737785"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                {/* Hallway Spine */}
                <rect x="10" y="85" width="300" height="24" fill="#EEFFE2" opacity="0.6" />

                {/* Rooms Left (Labs) */}
                <rect x="20" y="20" width="70" height="55" rx="2" fill="#F3F5E7" />
                <text x="32" y="52" fill="#737785" fontFamily="Geist, sans-serif" fontSize="9" fontWeight="600">
                  LAB 102
                </text>
                <rect x="100" y="20" width="55" height="55" rx="2" fill="#F3F5E7" />
                <text x="106" y="52" fill="#737785" fontFamily="Geist, sans-serif" fontSize="9" fontWeight="600">
                  STG 103
                </text>

                {/* Highlighted Target: Auditorium 101 */}
                <rect x="165" y="20" width="135" height="95" rx="4" fill="#030407" />
                <rect
                  x="168"
                  y="23"
                  width="129"
                  height="89"
                  rx="3"
                  fill="#1558C9"
                  fillOpacity="0.15"
                  stroke="#C5EA32"
                  strokeWidth="1.5"
                />
                {/* Theater Seating Rows Arc */}
                <circle cx="232" cy="40" r="14" stroke="#C5EA32" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="232" cy="40" r="24" stroke="#C5EA32" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="232" cy="40" r="34" stroke="#C5EA32" strokeWidth="1" strokeDasharray="3 3" />
                {/* Stage and Projector Pin */}
                <rect x="210" y="90" width="44" height="12" rx="2" fill="#C5EA32" />
                <circle cx="232" cy="65" r="4" fill="#C5EA32" />
                <circle cx="232" cy="65" r="8" stroke="#C5EA32" strokeWidth="1" opacity="0.8" />
                <text x="175" y="36" fill="#C5EA32" fontFamily="Geist, sans-serif" fontSize="9" fontWeight="700">
                  AUDITORIUM 101
                </text>

                {/* Southern Wing Rooms */}
                <rect x="20" y="118" width="65" height="42" rx="2" fill="#F3F5E7" />
                <text x="30" y="142" fill="#737785" fontFamily="Geist, sans-serif" fontSize="9">
                  CONF 108
                </text>
                <rect x="95" y="118" width="60" height="42" rx="2" fill="#F3F5E7" />
                <text x="105" y="142" fill="#737785" fontFamily="Geist, sans-serif" fontSize="9">
                  ELEC 109
                </text>
                <rect x="165" y="125" width="135" height="35" rx="2" fill="#F3F5E7" />
                <text x="195" y="146" fill="#737785" fontFamily="Geist, sans-serif" fontSize="9">
                  ATRIUM LOBBY
                </text>
              </svg>
            </div>

            {/* Footer Badge */}
            <div className="flex items-center justify-between z-10 bg-white/95 backdrop-blur-sm p-1.5 rounded text-[11px] font-semibold text-[#1A1D15] border border-[#E8E9DC]">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#536600]" />
                {currentRoomMeta.name} Grid: {currentRoomMeta.gridRef}
              </span>
              <span className="text-[#1558C9] font-bold">Active Focus</span>
            </div>
          </div>

          {/* Room Architectural Specifications Grid (4 Tiles) */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col">
              <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider">
                Room Capacity
              </span>
              <span className="text-xs font-semibold text-[#1A1D15] mt-0.5">
                {currentRoomMeta.capacity}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col">
              <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider">
                Ceiling Height
              </span>
              <span className="text-xs font-semibold text-[#1A1D15] mt-0.5">
                {currentRoomMeta.ceilingHeight}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col">
              <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider">
                Power Feed
              </span>
              <span className="text-xs font-semibold text-[#1A1D15] mt-0.5">
                {currentRoomMeta.powerFeed}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex flex-col">
              <span className="font-mono text-[10px] text-[#737785] uppercase tracking-wider">
                HVAC Zone
              </span>
              <span className="text-xs font-semibold text-[#1A1D15] mt-0.5">
                {currentRoomMeta.hvacZone}
              </span>
            </div>
          </div>

          {/* Photo of Asset Installation Site */}
          <div className="mt-1 overflow-hidden rounded-lg relative group h-32 border border-[#E8E9DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw178K60C5tP4-ErXh0j5FAnCWB1_h_9iz4JuGynuelXwgaHp1yo-yTyuQDwZBz3DTr50km5ngeRflIss5yifPajf3iUi-Gd1B1avqkJT6_Rv78Kj5XUf6RVyIoYTt7ikVhJmqGp9xtaBoysE_sFJ96dbTY59s8ZG8EqFQt1U3cosEqt3jLylpwI1_ho2VvSdcNWmAjCkRziYmUkYwxGE7qUUh002qzy4kjET21Mw"
              alt="Site Inspection Reference: Turing Hall Aud 101"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/85 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[11px] text-white flex items-center gap-1 font-medium">
                <Camera size={13} className="text-[#C5EA32]" />
                Site Inspection Reference: {buildingShort} {spaceShort}
              </span>
            </div>
          </div>
        </div>

        {/* Panel 2: Location Assignment Summary (Validation Checklist) */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E9DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={18} className="text-[#536600]" />
              <h3 className="font-serif text-base text-[#1A1D15] font-normal">
                Assignment Summary
              </h3>
            </div>
            <span className="font-mono text-[11px] text-[#536600] font-bold">
              {validChecks}/5 VALID
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Row 1: Campus Node */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 size={16} className="text-[#536600] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-[#737785] uppercase">
                    Campus Node
                  </span>
                  <span className="text-xs font-semibold text-[#1A1D15] truncate">
                    {data.campus}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#737785] shrink-0">
                ID: {campusId}
              </span>
            </div>

            {/* Row 2: Building Zone */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 size={16} className="text-[#536600] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-[#737785] uppercase">
                    Building Zone
                  </span>
                  <span className="text-xs font-semibold text-[#1A1D15] truncate">
                    {buildingShort} ({floorShort})
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#737785] shrink-0">
                ID: {buildingId}
              </span>
            </div>

            {/* Row 3: Designated Space */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 size={16} className="text-[#536600] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-[#737785] uppercase">
                    Designated Space
                  </span>
                  <span className="text-xs font-semibold text-[#1A1D15] truncate">
                    {spaceShort}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#737785] shrink-0">
                {currentRoomMeta.id}
              </span>
            </div>

            {/* Row 4: Custodial Department */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 size={16} className="text-[#536600] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-[#737785] uppercase">
                    Custodial Department
                  </span>
                  <span className="text-xs font-semibold text-[#1A1D15] truncate">
                    {data.owningDepartment}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#737785] shrink-0">
                {currentDeptObj?.id || "DEPT-ATR"}
              </span>
            </div>

            {/* Row 5: Assigned Squad */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC]">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 size={16} className="text-[#536600] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-[#737785] uppercase">
                    Assigned Squad
                  </span>
                  <span className="text-xs font-semibold text-[#1A1D15] truncate">
                    {data.assignedTeam.split(" (")[0] || data.assignedTeam}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#737785] shrink-0">
                {currentTeamObj?.id || "SQD-04"}
              </span>
            </div>
          </div>

          {/* Environmental Alert / Climate Telemetry */}
          <div className="mt-2 p-3 rounded-lg bg-[#f3f5e7] border border-[#E8E9DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer size={18} className="text-[#1558C9]" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1A1D15]">Climate Telemetry</span>
                <span className="text-[11px] text-[#434653]">
                  Optimal: 21.2°C • 42% Humidity
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#C5EA32] text-[#171e00] font-mono text-[10px] font-bold border border-[#536600]/20">
              NOMINAL
            </span>
          </div>
        </div>
      </div>

      {/* Staff Selection Dialog Modal */}
      {staffModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E8E9DC] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#E8E9DC] flex items-center justify-between bg-[#f3f5e7]">
              <div>
                <h3 className="font-serif text-lg text-[#1A1D15]">
                  {staffModalTarget === "custodian"
                    ? "Select Designated Custodian"
                    : "Select Facilities Contact"}
                </h3>
                <p className="text-xs text-[#434653]">
                  Assign verified personnel responsible for sign-off or escalation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStaffModalTarget(null)}
                className="p-1 rounded-lg text-[#737785] hover:bg-[#eeefe2] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2 max-h-96 overflow-y-auto">
              {AVAILABLE_STAFF.map((staff) => {
                const isSelected =
                  staffModalTarget === "custodian"
                    ? data.custodian.id === staff.id
                    : data.facilitiesContact.id === staff.id;

                return (
                  <button
                    key={staff.id}
                    type="button"
                    onClick={() => handleSelectStaff(staff)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? "bg-[#1558C9]/10 border-[#1558C9] shadow-2xs"
                        : "bg-[#f3f5e7] hover:bg-[#eeefe2] border-[#E8E9DC]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#1558C9]/30"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1A1D15]">
                          {staff.name}
                        </span>
                        {staff.badge && (
                          <span className="font-mono text-[9px] bg-[#eeefe2] px-1.5 py-0.2 rounded font-semibold text-[#536600]">
                            {staff.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#434653] truncate">
                        {staff.role}
                      </span>
                      <span className="font-mono text-[10px] text-[#737785]">
                        ID: {staff.id} • {staff.department}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[#1558C9] text-white flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-[#E8E9DC] bg-[#f3f5e7] flex justify-end">
              <button
                type="button"
                onClick={() => setStaffModalTarget(null)}
                className="px-4 py-2 rounded-lg bg-white border border-[#E8E9DC] text-xs font-semibold text-[#1A1D15] hover:bg-[#eeefe2] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

