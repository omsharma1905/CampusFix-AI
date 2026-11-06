"use client";

import React, { useState, useMemo } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { DashboardIntroduction } from "./dashboard-introduction";
import { DashboardKpiGrid } from "./dashboard-kpi-grid";
import { LiveTicketQueue } from "./live-ticket-queue";
import { AssetHealthOverview } from "./asset-health-overview";
import { PreventiveSchedule } from "./preventive-schedule";
import { BuildingIncidentDensity } from "./building-incident-density";
import { OperationalActivityFeed } from "./operational-activity-feed";
import {
  KPI_DATA,
  TICKETS_DATA,
  ASSET_HEALTH_DATA,
  PREVENTIVE_SCHEDULE_DATA,
  BUILDING_INCIDENTS_DATA,
  DEPARTMENT_BREAKDOWN,
  ACTIVITY_FEED_DATA,
} from "./mock-data";
import { TicketItem } from "./types";
import { X, Check, Bell } from "lucide-react";

export function DashboardShell() {
  // Navigation & View States
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("apex-main");
  const [selectedZone, setSelectedZone] = useState("All Campus Zones");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Panels
  const [reportIssueOpen, setReportIssueOpen] = useState(false);
  const [registerAssetOpen, setRegisterAssetOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  // Quick Action Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Filtered tickets based on search and selected zone
  const filteredTickets = useMemo(() => {
    return TICKETS_DATA.filter((ticket) => {
      // Zone filter
      if (selectedZone !== "All Campus Zones" && ticket.zone !== selectedZone) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ticket.assetName.toLowerCase().includes(q);
        const matchesTag = ticket.assetTag.toLowerCase().includes(q);
        const matchesIssue = ticket.issue.toLowerCase().includes(q);
        const matchesLoc = ticket.location.toLowerCase().includes(q);
        const matchesTech = ticket.assignedTechnician.name.toLowerCase().includes(q);
        if (!matchesName && !matchesTag && !matchesIssue && !matchesLoc && !matchesTech) {
          return false;
        }
      }
      return true;
    });
  }, [selectedZone, searchQuery]);

  // Filtered buildings based on selected zone
  const filteredBuildings = useMemo(() => {
    if (selectedZone === "All Campus Zones") return BUILDING_INCIDENTS_DATA;
    return BUILDING_INCIDENTS_DATA.filter((bld) => bld.zone === selectedZone);
  }, [selectedZone]);

  // Form states for Report Issue
  const [issueForm, setIssueForm] = useState({
    assetName: "",
    location: "Turing Science Complex",
    priority: "HIGH",
    description: "",
  });

  // Form states for Register Asset
  const [assetForm, setAssetForm] = useState({
    name: "",
    tag: "",
    category: "HVAC",
    building: "Turing Science Complex",
    zone: "North Science Quad",
    manufacturer: "",
  });

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setReportIssueOpen(false);
    showToast(`Maintenance issue logged: "${issueForm.assetName || "Unspecified asset"}" dispatched to triage queue.`);
    setIssueForm({ assetName: "", location: "Turing Science Complex", priority: "HIGH", description: "" });
  };

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterAssetOpen(false);
    showToast(`Asset registered: "${assetForm.name || "Physical Asset"}" added to Central Inventory.`);
    setAssetForm({ name: "", tag: "", category: "HVAC", building: "Turing Science Complex", zone: "North Science Quad", manufacturer: "" });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7F8EF] text-[#151710] font-sans">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-lg border border-[#030407] bg-[#030407] px-4 py-3 text-xs font-medium text-white shadow-xl animate-fade-in">
          <span className="grid size-5 place-items-center rounded-full bg-[#D4FF24] text-[#030407]">
            <Check size={12} className="stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/50 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Global Navigation Rail */}
      <DashboardSidebar
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        unreadNotificationsCount={3}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenHelp={() => showToast("CampusFix Operations Manual v2.4.0 — All facilities runbooks active.")}
        onOpenSettings={() => showToast("Operations Configuration: Shift B tolerances active (US-EAST node).")}
        onOpenProfile={() => showToast("Facilities Operations Admin: Logged in via apex.edu directory.")}
      />

      {/* Main Workspace Frame (offset for vertical capsule rail on desktop) */}
      <div className="flex min-h-screen w-full max-w-full min-w-0 flex-col overflow-x-hidden md:pl-20">
        {/* Top Application Toolbar */}
        <DashboardHeader
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenReportIssue={() => setReportIssueOpen(true)}
          onOpenRegisterAsset={() => setRegisterAssetOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedInstitutionId={selectedInstitutionId}
          onSelectInstitution={setSelectedInstitutionId}
        />

        {/* Dashboard Introduction Section */}
        <DashboardIntroduction
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          onOpenReportIssue={() => setReportIssueOpen(true)}
          onOpenRegisterAsset={() => setRegisterAssetOpen(true)}
        />

        {/* Dashboard Content Container */}
        <main className="w-full max-w-full min-w-0 flex-1 space-y-6 p-4 sm:p-6 md:p-8">
          {/* Active Search & Filter Indicator */}
          {(selectedZone !== "All Campus Zones" || searchQuery) && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#1558C9]/20 bg-[#1558C9]/5 px-4 py-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1558C9]">Active Workspace Filter:</span>
                {selectedZone !== "All Campus Zones" && (
                  <span className="rounded bg-[#1558C9] px-2 py-0.5 font-mono text-[10px] text-white">
                    Zone: {selectedZone}
                  </span>
                )}
                {searchQuery && (
                  <span className="rounded bg-[#030407] px-2 py-0.5 font-mono text-[10px] text-white">
                    Search: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedZone("All Campus Zones");
                  setSearchQuery("");
                }}
                className="font-medium text-[#1558C9] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Section D: Five Core KPI Cards */}
          <DashboardKpiGrid cards={KPI_DATA} />

          {/* Section E: Live Ticket Queue & SLA Monitor */}
          <div id="tickets" className="w-full max-w-full min-w-0 scroll-mt-20">
            <LiveTicketQueue
              initialTickets={filteredTickets}
              onSelectTicket={(ticket) => setSelectedTicket(ticket)}
              onViewAllTickets={() => showToast("Opening full Ticket Index registry...")}
            />
          </div>

          {/* Section F: Asset Health Overview & AI Recommendation */}
          <div id="work-orders" className="w-full max-w-full min-w-0 scroll-mt-20">
            <AssetHealthOverview
              data={ASSET_HEALTH_DATA}
              onGenerateWorkOrder={(recId) =>
                showToast(`Preventive Work Order generated for ${recId}: Scheduled for dispatch.`)
              }
              onSelectDomain={(domainId) => showToast(`Filtered domain telemetry: ${domainId}`)}
            />
          </div>

          {/* Section G: Preventive Schedule & Milestones */}
          <div id="preventive" className="w-full max-w-full min-w-0 scroll-mt-20">
            <PreventiveSchedule
              items={PREVENTIVE_SCHEDULE_DATA}
              onOpenCalendar={() => showToast("Navigating to PM Operations Calendar view...")}
              onDownloadSchedule={() => showToast("Downloading PM dispatch compliance calendar (ICS)...")}
            />
          </div>

          {/* Section H: Building Incident Density & Department Breakdown */}
          <div id="buildings" className="w-full max-w-full min-w-0 scroll-mt-20">
            <BuildingIncidentDensity
              buildings={filteredBuildings}
              departments={DEPARTMENT_BREAKDOWN}
              onSelectBuilding={(bldId) => showToast(`Selected building view: ${bldId}`)}
            />
          </div>

          {/* Section I: Recent Operational Activity Feed */}
          <div id="telemetry" className="w-full max-w-full min-w-0 scroll-mt-20">
            <OperationalActivityFeed
              activities={ACTIVITY_FEED_DATA}
              onSelectActivity={(act) => showToast(`Inspecting activity ref ${act.targetRef}`)}
            />
          </div>
        </main>
      </div>

      {/* MODAL: Report Maintenance Issue */}
      {reportIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#E7E9DC] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7E9DC] pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#590907] uppercase">
                  DISPATCH ESCALATION
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#030407]">
                  Report Operational Issue
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReportIssueOpen(false)}
                className="rounded-lg p-1 text-[#73766C] hover:bg-[#F7F8EF]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateIssue} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-medium text-[#151710]">Asset Name or System Tag</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Centrifugal Chiller Unit #03 (HVAC-CH-03)"
                  value={issueForm.assetName}
                  onChange={(e) => setIssueForm({ ...issueForm, assetName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2.5 text-xs text-[#030407] focus:border-[#1558C9] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-[#151710]">Building / Facility</label>
                  <select
                    value={issueForm.location}
                    onChange={(e) => setIssueForm({ ...issueForm, location: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                  >
                    <option>Turing Science Complex</option>
                    <option>Hamilton Engineering Center</option>
                    <option>Newton Physics & Astronomy</option>
                    <option>Student Union & Dining Quad</option>
                    <option>Somerville Biomedical Tower</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-[#151710]">Priority Level</label>
                  <select
                    value={issueForm.priority}
                    onChange={(e) => setIssueForm({ ...issueForm, priority: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                  >
                    <option value="CRITICAL">CRITICAL (Immediate SLA)</option>
                    <option value="HIGH">HIGH (4h SLA)</option>
                    <option value="MEDIUM">MEDIUM (12h SLA)</option>
                    <option value="LOW">LOW (48h SLA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-[#151710]">Fault Symptoms & Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe sensor telemetry, audible vibrations, fluid leaks or error codes..."
                  value={issueForm.description}
                  onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2.5 text-xs text-[#030407] focus:border-[#1558C9] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E9DC]">
                <button
                  type="button"
                  onClick={() => setReportIssueOpen(false)}
                  className="rounded-lg border border-[#E7E9DC] px-4 py-2 font-semibold text-[#73766C] hover:bg-[#F7F8EF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#590907] px-4 py-2 font-bold text-white shadow-sm hover:bg-[#430605]"
                >
                  Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Register Asset */}
      {registerAssetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#E7E9DC] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7E9DC] pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#1558C9] uppercase">
                  CENTRAL REPOSITORY
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#030407]">
                  Register Campus Asset
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRegisterAssetOpen(false)}
                className="rounded-lg p-1 text-[#73766C] hover:bg-[#F7F8EF]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterAsset} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-[#151710]">Asset Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Backup UPS Battery Bank 40kVA"
                    value={assetForm.name}
                    onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-medium text-[#151710]">RFID / Barcode Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ELEC-UPS-04-TSC"
                    value={assetForm.tag}
                    onChange={(e) => setAssetForm({ ...assetForm, tag: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-[#151710]">Domain Category</label>
                  <select
                    value={assetForm.category}
                    onChange={(e) => setAssetForm({ ...assetForm, category: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                  >
                    <option>HVAC / Climate</option>
                    <option>Electrical / Power</option>
                    <option>Plumbing / Hydraulics</option>
                    <option>Vertical Transit (Elevators)</option>
                    <option>Fire & Life Safety</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-[#151710]">Campus Building</label>
                  <select
                    value={assetForm.building}
                    onChange={(e) => setAssetForm({ ...assetForm, building: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                  >
                    <option>Turing Science Complex</option>
                    <option>Hamilton Engineering Center</option>
                    <option>Newton Physics & Astronomy</option>
                    <option>Student Union & Dining Quad</option>
                    <option>Somerville Biomedical Tower</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-[#151710]">Manufacturer / Model Spec</label>
                <input
                  type="text"
                  placeholder="e.g. Schneider Electric Galaxy VS 40kVA"
                  value={assetForm.manufacturer}
                  onChange={(e) => setAssetForm({ ...assetForm, manufacturer: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-2 text-xs text-[#030407] focus:border-[#1558C9] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E9DC]">
                <button
                  type="button"
                  onClick={() => setRegisterAssetOpen(false)}
                  className="rounded-lg border border-[#E7E9DC] px-4 py-2 font-semibold text-[#73766C] hover:bg-[#F7F8EF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#D4FF24] px-4 py-2 font-bold text-[#030407] shadow-sm hover:bg-[#c3ec1e]"
                >
                  Confirm & Tag Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER: Notifications & Telemetry Alerts */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-md flex-col border-l border-[#E7E9DC] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7E9DC] p-5">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-[#1558C9]" />
                <h3 className="font-serif text-xl font-normal text-[#030407]">
                  Operational Notifications
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsOpen(false)}
                className="rounded-lg p-1 text-[#73766C] hover:bg-[#F7F8EF]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#E7E9DC]">
              <div className="py-3">
                <span className="rounded-xs bg-[#590907] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                  CRITICAL SLA
                </span>
                <p className="mt-1 font-semibold text-xs text-[#030407]">
                  Chiller #02 High Pressure Trip in Turing Complex
                </p>
                <p className="mt-0.5 text-[11px] text-[#73766C]">
                  SLA target expires in 38 minutes. Tech Marcus Vance dispatched.
                </p>
              </div>

              <div className="py-3">
                <span className="rounded-xs bg-[#1558C9] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-white">
                  DISPATCH
                </span>
                <p className="mt-1 font-semibold text-xs text-[#030407]">
                  WO-8821 Cleanroom Fume Hood Calibration
                </p>
                <p className="mt-0.5 text-[11px] text-[#73766C]">
                  Tech Elena Rostova has arrived at Somerville Tower, Room 308.
                </p>
              </div>

              <div className="py-3">
                <span className="rounded-xs bg-[#D4FF24] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#030407]">
                  PM COMPLIANCE
                </span>
                <p className="mt-1 font-semibold text-xs text-[#030407]">
                  Substation B Transformer Thermal Scan Signed Off
                </p>
                <p className="mt-0.5 text-[11px] text-[#73766C]">
                  Siemens Power Services verified zero abnormal thermal signatures.
                </p>
              </div>
            </div>

            <div className="border-t border-[#E7E9DC] p-4 bg-[#F7F8EF]">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  showToast("All operational alerts acknowledged.");
                }}
                className="w-full rounded-lg bg-[#030407] py-2 text-xs font-semibold text-white hover:bg-black"
              >
                Acknowledge All Alerts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Ticket Detail Quick Inspect */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#E7E9DC] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7E9DC] pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#1558C9] uppercase">
                  TICKET INSPECTION · {selectedTicket.id}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#030407]">
                  {selectedTicket.assetName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="rounded-lg p-1 text-[#73766C] hover:bg-[#F7F8EF]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-lg border border-[#E7E9DC] bg-[#F7F8EF] p-3 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#73766C]">Asset Tag:</span>
                  <span className="font-bold text-[#030407]">{selectedTicket.assetTag}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-[#73766C]">Location:</span>
                  <span className="text-[#030407]">{selectedTicket.location} · {selectedTicket.space}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-[#73766C]">Priority:</span>
                  <span className="font-bold text-[#590907]">{selectedTicket.priority}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-[#73766C]">SLA Target:</span>
                  <span className="font-bold text-[#1558C9]">{selectedTicket.slaRemaining}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#030407]">Reported Issue:</span>
                <p className="mt-1 text-xs leading-relaxed text-[#73766C]">
                  {selectedTicket.issue}
                </p>
              </div>

              <div className="border-t border-[#E7E9DC] pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#73766C] uppercase font-mono">Assigned Tech:</span>
                  <div className="font-semibold text-[#030407]">{selectedTicket.assignedTechnician.name} ({selectedTicket.assignedTechnician.role})</div>
                </div>
                <span className="rounded-xs bg-[#1558C9]/10 px-2 py-1 font-mono text-[10px] font-bold text-[#1558C9]">
                  STATUS: {selectedTicket.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#E7E9DC] pt-3">
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="rounded-lg border border-[#E7E9DC] px-4 py-2 font-semibold text-[#73766C] hover:bg-[#F7F8EF] text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTicket(null);
                  showToast(`Work order updated for ticket ${selectedTicket.id}`);
                }}
                className="rounded-lg bg-[#1558C9] px-4 py-2 font-bold text-white hover:bg-[#0f44a0] text-xs"
              >
                Update Dispatch Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
