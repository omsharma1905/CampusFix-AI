"use client";

import React, { useState } from "react";
import {
  PlusCircle,
  X,
  Send,
  Pencil,
  Upload,
  UploadCloud,
  History,
  Search,
  Shield,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  AssetDetailRecord,
  AssetWorkOrderItem,
  AssetDocumentItem,
  MaintenanceTimelineItem,
  AssetCondition,
} from "../types";

// 1. Create Work Order Modal
export function CreateWorkOrderModal({
  isOpen,
  onClose,
  asset,
  onWorkOrderCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetDetailRecord;
  onWorkOrderCreated: (wo: AssetWorkOrderItem) => void;
}) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState<"High" | "Normal" | "Routine" | "Low">("Normal");
  const [assigned, setAssigned] = useState("R. Davis (Tech Lead)");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("2026-11-06");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsSubmitting(true);
    const newWo: AssetWorkOrderItem = {
      id: `WO-${Math.floor(8400 + Math.random() * 500)}`,
      task: task.trim(),
      state: "Scheduled",
      priority,
      assigned: assigned.split(" ")[0] + ". " + assigned.split(" ")[1],
    };
    onWorkOrderCreated(newWo);
    setIsSubmitting(false);
    onClose();
    setTask("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border border-[#A5A79B]/40 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0E5] bg-[#F7F6F3]">
          <div className="flex items-center gap-2">
            <PlusCircle size={20} className="text-[#1558C9]" />
            <div>
              <h3 className="font-serif text-[18px] text-[#030407] font-semibold">Create Work Order</h3>
              <p className="text-[12px] text-[#55584D] font-mono">Asset: {asset.id} • {asset.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737785] hover:bg-[#EEF0E5] hover:text-[#030407] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Optical Prism Inspection & Filter Refresh"
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9] focus:ring-1 focus:ring-[#1558C9]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "High" | "Normal" | "Routine" | "Low")}
                className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
              >
                <option value="Routine">Routine</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
                Scheduled Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Assigned Technician / Squad
            </label>
            <select
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            >
              <option value="R. Davis (Tech Lead)">R. Davis (Tech Lead - Media Ops 04)</option>
              <option value="M. Chen (Senior Field Engineer)">M. Chen (Senior Field Engineer)</option>
              <option value="K. Patel (Systems Specialist)">K. Patel (Systems Specialist)</option>
              <option value="J. Vance (Mechanical Lead)">J. Vance (Mechanical Lead)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Maintenance Instructions & Telemetry Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Include safety precautions, required replacement parts or special tools..."
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEF0E5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#434653] hover:bg-[#EEF0E5] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#1558C9] hover:bg-[#0041a0] rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              <Send size={15} />
              <span>Dispatch Work Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. Edit Asset Modal
export function EditAssetModal({
  isOpen,
  onClose,
  asset,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetDetailRecord;
  onSave: (updated: Partial<AssetDetailRecord>) => void;
}) {
  const [name, setName] = useState(asset.name);
  const [location, setLocation] = useState(asset.location || `${asset.building} • ${asset.space}`);
  const [preciseEnclosure, setPreciseEnclosure] = useState(asset.preciseEnclosure);
  const [designatedCustodian, setDesignatedCustodian] = useState(asset.designatedCustodian);
  const [department, setDepartment] = useState(asset.department);
  const [condition, setCondition] = useState(asset.condition);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    onSave({
      name,
      location,
      preciseEnclosure,
      designatedCustodian,
      department,
      condition,
    });
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border border-[#A5A79B]/40 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0E5] bg-[#F7F6F3]">
          <div className="flex items-center gap-2">
            <Pencil size={18} className="text-[#1558C9]" />
            <div>
              <h3 className="font-serif text-[18px] text-[#030407] font-semibold">Edit Asset Details</h3>
              <p className="text-[12px] text-[#55584D] font-mono">{asset.id} • Registered Node</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737785] hover:bg-[#EEF0E5] hover:text-[#030407] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Asset Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
                Operational Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as AssetCondition)}
                className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
              >
                <option value="Healthy">Healthy (Optimal)</option>
                <option value="Operational">Operational</option>
                <option value="Maintenance Required">Maintenance Required</option>
                <option value="Critical">Critical Alert</option>
                <option value="Retired">Retired / Salvaged</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
                Academic Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Campus Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Precise Enclosure / Room
            </label>
            <input
              type="text"
              value={preciseEnclosure}
              onChange={(e) => setPreciseEnclosure(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Designated Custodian
            </label>
            <input
              type="text"
              value={designatedCustodian}
              onChange={(e) => setDesignatedCustodian(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEF0E5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#434653] hover:bg-[#EEF0E5] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#1558C9] hover:bg-[#0041a0] rounded-lg shadow-sm transition-all"
            >
              {isSaving ? "Saving changes..." : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 3. Upload Document Modal
export function UploadDocumentModal({
  isOpen,
  onClose,
  assetId,
  onDocumentUploaded,
}: {
  isOpen: boolean;
  onClose: () => void;
  assetId: string;
  onDocumentUploaded: (doc: AssetDocumentItem) => void;
}) {
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState("OEM Specification");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    onDocumentUploaded({
      id: `doc-${Date.now()}`,
      title: docTitle.endsWith(".pdf") ? docTitle : `${docTitle}.pdf`,
      format: "PDF",
      size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "1.2 MB",
      tag: docCategory,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border border-[#A5A79B]/40 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0E5] bg-[#F7F6F3]">
          <div className="flex items-center gap-2">
            <Upload size={18} className="text-[#1558C9]" />
            <div>
              <h3 className="font-serif text-[18px] text-[#030407] font-semibold">Upload Asset Document</h3>
              <p className="text-[12px] text-[#55584D] font-mono">Attachment Vault • {assetId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737785] hover:bg-[#EEF0E5] hover:text-[#030407] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleUpload} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Q4 Calibration Signoff Report"
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Document Classification
            </label>
            <select
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border border-[#C3C6D6] rounded-lg focus:outline-none focus:border-[#1558C9]"
            >
              <option value="OEM Specification">OEM Specification / Manual</option>
              <option value="Procurement">Procurement & Invoice</option>
              <option value="Warranty">Warranty & Service SLA</option>
              <option value="Acceptance Signoff">Commissioning & Acceptance Signoff</option>
              <option value="Safety Inspection">Safety & Regulatory Inspection</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
              Select File (PDF, DOCX, ZIP max 25MB)
            </label>
            <div className="border-2 border-dashed border-[#C3C6D6] rounded-xl p-4 text-center hover:bg-[#F7F6F3] transition-colors cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                    if (!docTitle) setDocTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <UploadCloud size={28} className="text-[#1558C9] mx-auto mb-1" />
              <p className="text-[12px] font-medium text-[#1A1D15]">
                {selectedFile ? selectedFile.name : "Click to select or drag and drop document"}
              </p>
              <p className="text-[11px] text-[#737785] mt-0.5">
                {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "Encrypted institutional vault storage"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEF0E5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#434653] hover:bg-[#EEF0E5] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#1558C9] hover:bg-[#0041a0] rounded-lg shadow-sm transition-all"
            >
              Save to Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 4. Full Maintenance Ledger Modal (14 records)
export function FullMaintenanceLedgerModal({
  isOpen,
  onClose,
  records,
  assetName,
  assetId,
}: {
  isOpen: boolean;
  onClose: () => void;
  records: MaintenanceTimelineItem[];
  assetName: string;
  assetId: string;
}) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  // Extended synthetic records to complete full 14 records for display
  const extendedRecords: MaintenanceTimelineItem[] = [
    ...records,
    {
      id: "MH-05",
      title: "Chassis Dust Evacuation & Intake Filter Check",
      date: "04 Nov 2025",
      description: "Airflow velocity checked: 14.2 CFM. Internal chassis inspected for particulate accumulation.",
      workOrderId: "WO-6641",
      technician: "M. Chen",
      status: "Status: Verified",
      dotColor: "secondary",
    },
    {
      id: "MH-06",
      title: "HDMI Cable Loom Strain Relief Adjustment",
      date: "19 Aug 2025",
      description: "Re-secured HDMI-1 and HDMI-2 runs into ceiling drop raceway. Tested 4K60 handshake.",
      workOrderId: "WO-6210",
      technician: "R. Davis",
      status: "Status: Verified",
      dotColor: "primary",
    },
    {
      id: "MH-07",
      title: "Mid-Term Optical Lens Cleaning & Focus Calibration",
      date: "14 May 2025",
      description: "Lens barrel wiped with optical isopropyl solution. Geometry and corner focus verified.",
      workOrderId: "WO-5902",
      technician: "R. Davis",
      status: "Status: Verified",
      dotColor: "primary",
    },
    {
      id: "MH-08",
      title: "Firmware v2.3.0 Engine Upgrade",
      date: "28 Feb 2025",
      description: "Installed factory security patch and remote Crestron control module update.",
      workOrderId: "WO-5480",
      technician: "K. Patel",
      status: "Status: Verified",
      dotColor: "secondary",
    },
    {
      id: "MH-09",
      title: "Exhaust Fan RPM Telemetry Check",
      date: "12 Dec 2024",
      description: "Exhaust blower acoustic profile baseline verified. Tachometer readout nominal at 2,450 RPM.",
      workOrderId: "WO-5120",
      technician: "J. Vance",
      status: "Status: Verified",
      dotColor: "primary",
    },
    {
      id: "MH-10",
      title: "Emergency Thermal Shutdown Test (Drill)",
      date: "15 Oct 2024",
      description: "Simulated auditorium HVAC loss; verified automatic projector standby at 52°C threshold.",
      workOrderId: "WO-4819",
      technician: "M. Chen",
      status: "Status: Verified",
      dotColor: "tertiary",
    },
    {
      id: "MH-11",
      title: "Laser Diode Power Output Benchmarking",
      date: "02 Sep 2024",
      description: "Calibrated optical power meter recorded 7,320 ANSI lumens (100.2% rated specification).",
      workOrderId: "WO-4530",
      technician: "R. Davis",
      status: "Status: Verified",
      dotColor: "primary",
    },
    {
      id: "MH-12",
      title: "Post-Mounting Vibration Test",
      date: "20 Aug 2024",
      description: "Unistrut ceiling bracket torqued to 35 Nm. Laser pointer stability verified over 24 hrs.",
      workOrderId: "WO-4402",
      technician: "J. Vance",
      status: "Status: Verified",
      dotColor: "secondary",
    },
    {
      id: "MH-13",
      title: "Initial Commissioning & Network Configuration",
      date: "18 Aug 2024",
      description: "DHCP reservation configured on Media Subnet VLAN 104. IP 10.14.88.24 assigned.",
      workOrderId: "WO-4390",
      technician: "K. Patel",
      status: "Status: Verified",
      dotColor: "primary",
    },
    {
      id: "MH-14",
      title: "Unboxing & Receiving Inspection",
      date: "14 Jun 2024",
      description: "Inspected carton seal, serial match against PO-99120. Zero shipping impact marks.",
      workOrderId: "WO-4112",
      technician: "M. Vance",
      status: "Status: Verified",
      dotColor: "secondary",
    },
  ];

  const filtered = extendedRecords.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
      r.technician.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border border-[#A5A79B]/40 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0E5] bg-[#F7F6F3] shrink-0">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#1558C9]" />
            <div>
              <h3 className="font-serif text-[18px] text-[#030407] font-semibold">
                Complete Maintenance Ledger
              </h3>
              <p className="text-[12px] text-[#55584D] font-mono">
                {assetId} • {assetName} (14 chronological records)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737785] hover:bg-[#EEF0E5] hover:text-[#030407] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 border-b border-[#EEF0E5] bg-[#FFFFFF] shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737785]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search maintenance logs by description, technician, or WO-ID..."
              className="w-full bg-[#F7F6F3] pl-9 pr-3 py-1.5 text-[12px] rounded-lg border border-transparent focus:border-[#C3C6D6] focus:bg-[#FFFFFF] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 rounded-xl border border-[#EEF0E5] hover:border-[#C3C6D6] hover:bg-[#F7F6F3]/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.dotColor === "secondary"
                        ? "bg-[#536600]"
                        : item.dotColor === "tertiary"
                        ? "bg-[#822820]"
                        : "bg-[#1558C9]"
                    }`}
                  />
                  <h4 className="font-medium text-[13px] text-[#030407]">{item.title}</h4>
                </div>
                <span className="font-mono text-[11px] text-[#737785] shrink-0">{item.date}</span>
              </div>
              <p className="text-[12px] text-[#55584D] mt-1 pl-4">{item.description}</p>
              <div className="flex items-center gap-2 mt-2 pl-4 text-[11px] font-mono text-[#737785]">
                <span className="text-[#1558C9] font-medium">{item.workOrderId}</span>
                <span>•</span>
                <span>Tech: {item.technician}</span>
                <span>•</span>
                <span className="text-[#536600] font-medium">{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-[#EEF0E5] bg-[#F7F6F3] flex items-center justify-between shrink-0">
          <span className="text-[12px] text-[#737785] font-mono">
            Showing {filtered.length} of 14 records
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-medium text-[#030407] bg-[#FFFFFF] border border-[#C3C6D6] rounded-lg hover:bg-[#EEF0E5]"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. Full Audit Log Modal (48 events)
export function FullAuditLogModal({
  isOpen,
  onClose,
  assetId,
}: {
  isOpen: boolean;
  onClose: () => void;
  assetId: string;
}) {
  if (!isOpen) return null;

  const events = [
    {
      id: "ev-48",
      action: "Routine telemetry ping recorded: 38.2°C nominal exhaust",
      actor: "Core AI Sensor Engine",
      time: "14 minutes ago",
      hash: "sha256:7f8a9e01...9c2d",
    },
    {
      id: "ev-47",
      action: "Work Order WO-8194 closed and verified by Field Lead",
      actor: "R. Davis (Tech Lead)",
      time: "12 Sep 2026 15:40",
      hash: "sha256:3a1b4c99...e8fa",
    },
    {
      id: "ev-46",
      action: "Health score updated to 94/100 following Q3 PM adherence",
      actor: "M. Vance (Facilities Head)",
      time: "12 Sep 2026 16:15",
      hash: "sha256:11d28ab0...ff42",
    },
    {
      id: "ev-45",
      action: "QR tag physical scan registered via Media Ops Handheld Scanner",
      actor: "Scanner ID: TERM-09",
      time: "12 Sep 2026 09:14",
      hash: "sha256:c099318b...5467",
    },
    {
      id: "ev-44",
      action: "Maintenance timeline record appended: Annual Optical Alignment",
      actor: "System Ledger",
      time: "12 Sep 2026 14:02",
      hash: "sha256:bb720e3a...118c",
    },
    {
      id: "ev-43",
      action: "Cooling exhaust temperature peaked at 41.2°C during 6-hr seminar",
      actor: "Telemetry Daemon",
      time: "02 Aug 2026 17:30",
      hash: "sha256:e64fa091...bc78",
    },
    {
      id: "ev-42",
      action: "Air filter assembly marked replaced with Sony OEM part #4-738-921",
      actor: "M. Chen",
      time: "18 Jul 2026 11:22",
      hash: "sha256:448b11c0...902a",
    },
    {
      id: "ev-41",
      action: "Firmware version validated at 2.4.1 without regression",
      actor: "Automated Device Poller",
      time: "23 May 2026 04:00",
      hash: "sha256:32ffaa88...012c",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border border-[#A5A79B]/40 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0E5] bg-[#F7F6F3] shrink-0">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[#1558C9]" />
            <div>
              <h3 className="font-serif text-[18px] text-[#030407] font-semibold">
                Tamper-Evident Audit Log
              </h3>
              <p className="text-[12px] text-[#55584D] font-mono">
                {assetId} • Cryptographically Chained (48 total audit events)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737785] hover:bg-[#EEF0E5] hover:text-[#030407] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-3 flex-1">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-3 rounded-lg border border-[#EEF0E5] bg-[#F7F6F3]/40 flex flex-col gap-1"
            >
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium text-[#030407]">{ev.action}</span>
                <span className="font-mono text-[11px] text-[#737785] shrink-0">{ev.time}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#55584D] pt-1">
                <span>By: {ev.actor}</span>
                <span className="text-[#1558C9] bg-white px-2 py-0.5 rounded border border-[#C3C6D6]/40">
                  {ev.hash}
                </span>
              </div>
            </div>
          ))}
          <p className="text-center text-[12px] text-[#737785] font-mono py-2">
            + 40 older immutable events archived in cold audit ledger.
          </p>
        </div>

        <div className="px-6 py-3 border-t border-[#EEF0E5] bg-[#F7F6F3] flex items-center justify-between shrink-0">
          <span className="text-[12px] text-[#536600] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c8f30c]" />
            Chain Integrity: 100% Cryptographically Validated
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-medium text-[#030407] bg-[#FFFFFF] border border-[#C3C6D6] rounded-lg hover:bg-[#EEF0E5]"
          >
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}

// 6. Inspect Frame Modal (Lightbox Image View)
export function InspectFrameModal({
  isOpen,
  onClose,
  imageUrl,
  assetTitle,
  assetId,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  assetTitle: string;
  assetId: string;
}) {
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between text-white mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/80 font-mono text-xs text-[#D4FF24] border border-white/10">
              {assetId}
            </span>
            <span className="font-serif text-lg text-white">{assetTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="font-mono text-xs text-white/80 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={assetTitle}
            style={{ transform: `scale(${zoom})`, transition: "transform 0.15s ease-out" }}
            className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Footer info */}
        <div className="w-full flex items-center justify-between text-white/60 text-xs font-mono mt-3 px-2">
          <span>High-Resolution Optical Hardware Frame Capture</span>
          <span>Verified by CampusFix Media Ops</span>
        </div>
      </div>
    </div>
  );
}
