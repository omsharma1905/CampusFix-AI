"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  Eye,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  INITIAL_STEP_01_DATA,
  Step01BasicInfoData,
  INITIAL_STEP_02_DATA,
  Step02ClassificationData,
  INITIAL_STEP_03_DATA,
  Step03LocationData,
  INITIAL_STEP_04_DATA,
  Step04LifecycleData,
  INITIAL_STEP_05_DATA,
  Step05MaintenanceData,
  createFreshStep01Data,
} from "./register-types";
import { RegisterStepper } from "./register-stepper";
import { Step01BasicInfo } from "./step-01-basic-info";
import { Step02Classification } from "./step-02-classification";
import { Step03Location } from "./step-03-location";
import { Step04Lifecycle } from "./step-04-lifecycle";
import { Step05Maintenance } from "./step-05-maintenance";
import { Step06Review } from "./step-06-review";
import { TagPreviewModal } from "./tag-preview-modal";

const DRAFT_STORAGE_KEY = "campusfix_asset_register_wizard_draft_v1";

interface PersistedWizardDraft {
  version: 1;
  currentStep: number;
  completedSteps: number[];
  step01Data: Step01BasicInfoData;
  step02Data: Step02ClassificationData;
  step03Data: Step03LocationData;
  step04Data: Step04LifecycleData;
  step05Data: Step05MaintenanceData;
  isCustodyConfirmed: boolean;
  lastSavedTime: string;
  savedTimestamp?: number;
}

const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7-day retention TTL for abandoned drafts

function loadDraftFromStorage(): PersistedWizardDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    // Enforce 7-day expiration boundary on abandoned wizard drafts
    if (parsed.savedTimestamp && typeof parsed.savedTimestamp === "number") {
      if (Date.now() - parsed.savedTimestamp > DRAFT_MAX_AGE_MS) {
        clearDraftFromStorage();
        return null;
      }
    }

    const currentStep =
      typeof parsed.currentStep === "number" &&
      parsed.currentStep >= 1 &&
      parsed.currentStep <= 6
        ? parsed.currentStep
        : 1;

    const completedSteps = Array.isArray(parsed.completedSteps)
      ? parsed.completedSteps.filter(
          (n: unknown): n is number => typeof n === "number" && n >= 1 && n <= 6
        )
      : [];

    return {
      version: 1,
      currentStep,
      completedSteps,
      step01Data: { ...INITIAL_STEP_01_DATA, ...(parsed.step01Data || {}) },
      step02Data: { ...INITIAL_STEP_02_DATA, ...(parsed.step02Data || {}) },
      step03Data: { ...INITIAL_STEP_03_DATA, ...(parsed.step03Data || {}) },
      step04Data: { ...INITIAL_STEP_04_DATA, ...(parsed.step04Data || {}) },
      step05Data: { ...INITIAL_STEP_05_DATA, ...(parsed.step05Data || {}) },
      isCustodyConfirmed: Boolean(parsed.isCustodyConfirmed),
      lastSavedTime: typeof parsed.lastSavedTime === "string" ? parsed.lastSavedTime : "just now",
      savedTimestamp: typeof parsed.savedTimestamp === "number" ? parsed.savedTimestamp : Date.now(),
    };
  } catch (e) {
    console.error("Failed to load asset draft from storage:", e);
    clearDraftFromStorage();
    return null;
  }
}

function saveDraftToStorage(draft: PersistedWizardDraft): void {
  if (typeof window === "undefined") return;
  try {
    const draftWithTimestamp = {
      ...draft,
      savedTimestamp: draft.savedTimestamp || Date.now(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftWithTimestamp));
  } catch (e) {
    console.error("Failed to save asset draft to storage:", e);
  }
}

function clearDraftFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear asset draft from storage:", e);
  }
}

export function RegisterWizardShell() {
  // App Shell States
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState("apex-main");
  const [headerSearch, setHeaderSearch] = useState("");

  // Hydration & Session Lifecycle State
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [step01Data, setStep01Data] = useState<Step01BasicInfoData>(INITIAL_STEP_01_DATA);
  const [step02Data, setStep02Data] = useState<Step02ClassificationData>(INITIAL_STEP_02_DATA);
  const [step03Data, setStep03Data] = useState<Step03LocationData>(INITIAL_STEP_03_DATA);
  const [step04Data, setStep04Data] = useState<Step04LifecycleData>(INITIAL_STEP_04_DATA);
  const [step05Data, setStep05Data] = useState<Step05MaintenanceData>(INITIAL_STEP_05_DATA);
  const [isCustodyConfirmed, setIsCustodyConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSavedTime, setLastSavedTime] = useState<string>("just now");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState<boolean>(false);

  // Restore saved session on initial client mount, or start fresh if ?reset=true is passed
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("reset") === "true") {
        clearDraftFromStorage();
        setStep01Data(createFreshStep01Data("2850"));
        setStep02Data(INITIAL_STEP_02_DATA);
        setStep03Data(INITIAL_STEP_03_DATA);
        setStep04Data(INITIAL_STEP_04_DATA);
        setStep05Data(INITIAL_STEP_05_DATA);
        setIsCustodyConfirmed(false);
        setCurrentStep(1);
        setCompletedSteps([]);
        setErrors({});
        setIsHydrated(true);
        window.history.replaceState({}, "", window.location.pathname);
        return;
      }
    }

    const saved = loadDraftFromStorage();
    if (saved) {
      setCurrentStep(saved.currentStep);
      setCompletedSteps(saved.completedSteps);
      setStep01Data(saved.step01Data);
      setStep02Data(saved.step02Data);
      setStep03Data(saved.step03Data);
      setStep04Data(saved.step04Data);
      setStep05Data(saved.step05Data);
      setIsCustodyConfirmed(saved.isCustodyConfirmed);
      setLastSavedTime(saved.lastSavedTime);
    }
    setIsHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Auto-persist draft whenever wizard state or step changes
  useEffect(() => {
    if (!isHydrated || isRegistrationComplete) return;

    saveDraftToStorage({
      version: 1,
      currentStep,
      completedSteps,
      step01Data,
      step02Data,
      step03Data,
      step04Data,
      step05Data,
      isCustodyConfirmed,
      lastSavedTime,
    });
  }, [
    isHydrated,
    isRegistrationComplete,
    currentStep,
    completedSteps,
    step01Data,
    step02Data,
    step03Data,
    step04Data,
    step05Data,
    isCustodyConfirmed,
    lastSavedTime,
  ]);

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateStep01 = (updated: Partial<Step01BasicInfoData>) => {
    setStep01Data((prev) => ({ ...prev, ...updated }));
    const fieldName = Object.keys(updated)[0];
    if (fieldName && errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleUpdateStep02 = (updated: Partial<Step02ClassificationData>) => {
    setStep02Data((prev) => ({ ...prev, ...updated }));
    const fieldName = Object.keys(updated)[0];
    if (fieldName && errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleUpdateStep03 = (updated: Partial<Step03LocationData>) => {
    setStep03Data((prev) => ({ ...prev, ...updated }));
    const fieldName = Object.keys(updated)[0];
    if (fieldName && errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleUpdateStep04 = (updated: Partial<Step04LifecycleData>) => {
    setStep04Data((prev) => ({ ...prev, ...updated }));
    const fieldName = Object.keys(updated)[0];
    if (fieldName && errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleUpdateStep05 = (updated: Partial<Step05MaintenanceData>) => {
    setStep05Data((prev) => ({ ...prev, ...updated }));
    const fieldName = Object.keys(updated)[0];
    if (fieldName && errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleSaveDraft = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const formatted = `just now (${time})`;
    setLastSavedTime(formatted);
    saveDraftToStorage({
      version: 1,
      currentStep,
      completedSteps,
      step01Data,
      step02Data,
      step03Data,
      step04Data,
      step05Data,
      isCustodyConfirmed,
      lastSavedTime: formatted,
    });
    showToast(`Draft saved successfully at ${time}.`);
  };

  const handleDiscardDraft = () => {
    clearDraftFromStorage();
    setStep01Data(INITIAL_STEP_01_DATA);
    setStep02Data(INITIAL_STEP_02_DATA);
    setStep03Data(INITIAL_STEP_03_DATA);
    setStep04Data(INITIAL_STEP_04_DATA);
    setStep05Data(INITIAL_STEP_05_DATA);
    setIsCustodyConfirmed(false);
    setCurrentStep(1);
    setCompletedSteps([]);
    setErrors({});
    setIsDiscardModalOpen(false);
    showToast("Draft discarded and reset to initial state.");
  };

  const validateStep01 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!step01Data.name.trim()) {
      errs.name = "Primary Asset Common Name is required.";
    }
    if (!step01Data.manufacturer.trim()) {
      errs.manufacturer = "Manufacturer / OEM is required.";
    }
    if (!step01Data.model.trim()) {
      errs.model = "Model Number / Series is required.";
    }
    if (!step01Data.serialNumber.trim()) {
      errs.serialNumber = "Serial Number is required.";
    } else if (step01Data.serialNumber.trim().length < 3) {
      errs.serialNumber = "Serial Number must be at least 3 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep02 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!step02Data.category) {
      errs.category = "Asset Category is required.";
    }
    if (!step02Data.subcategory) {
      errs.subcategory = "Subcategory is required.";
    }
    if (!step02Data.criticality) {
      errs.criticality = "Criticality Level is required.";
    }
    if (
      !step02Data.expectedUsefulLife ||
      step02Data.expectedUsefulLife < 1 ||
      step02Data.expectedUsefulLife > 50
    ) {
      errs.expectedUsefulLife = "Expected useful life must be between 1 and 50 years.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep03 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!step03Data.campus?.trim()) {
      errs.campus = "Campus selection is required.";
    }
    if (!step03Data.building?.trim()) {
      errs.building = "Building selection is required.";
    }
    if (!step03Data.floor?.trim()) {
      errs.floor = "Floor / Level selection is required.";
    }
    if (!step03Data.space?.trim()) {
      errs.space = "Space / Room Designation is required.";
    }
    if (!step03Data.owningDepartment?.trim()) {
      errs.owningDepartment = "Owning Department is required.";
    }
    if (!step03Data.assignedTeam?.trim()) {
      errs.assignedTeam = "Assigned Operational Team is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep04 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!step04Data.acquisitionDate?.trim()) {
      errs.acquisitionDate = "Acquisition Date is required.";
    }
    if (!step04Data.procurementVendor?.trim()) {
      errs.procurementVendor = "Procurement Vendor is required.";
    }
    if (!step04Data.purchaseOrderReference?.trim()) {
      errs.purchaseOrderReference = "Purchase Order Reference is required.";
    }
    if (!step04Data.invoiceReference?.trim()) {
      errs.invoiceReference = "Invoice Reference is required.";
    }
    if (step04Data.acquisitionCost !== null && step04Data.acquisitionCost < 0) {
      errs.acquisitionCost = "Acquisition cost cannot be negative.";
    }
    if (step04Data.residualSalvageValue !== null && step04Data.residualSalvageValue < 0) {
      errs.residualSalvageValue = "Residual value cannot be negative.";
    }
    if (
      step04Data.acquisitionCost !== null &&
      step04Data.residualSalvageValue !== null &&
      step04Data.residualSalvageValue > step04Data.acquisitionCost
    ) {
      errs.residualSalvageValue = "Residual value cannot exceed acquisition cost.";
    }
    if (!step04Data.installationDate?.trim()) {
      errs.installationDate = "Installation Date is required.";
    }
    if (!step04Data.signOffEngineer?.trim()) {
      errs.signOffEngineer = "Sign-Off Engineer is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep05 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!step05Data.strategy) {
      errs.strategy = "Operational strategy selection is required.";
    }
    if (!step05Data.responsibleTeam?.trim()) {
      errs.responsibleTeam = "Responsible maintenance team is required.";
    }
    if (!step05Data.assignedLead?.trim()) {
      errs.assignedLead = "Assigned lead / supervisor is required.";
    }
    if (
      step05Data.strategy !== "Reactive Only" &&
      step05Data.selectedTaskIds.length === 0
    ) {
      errs.selectedTaskIds = "At least one inspection protocol checklist item must be selected for preventive workflows.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (!validateStep01()) {
        showToast("Please fill in all required fields marked with *.");
        return;
      }
      if (!completedSteps.includes(1)) {
        setCompletedSteps((prev) => [...prev, 1]);
      }
      setCurrentStep(2);
      showToast("Step 01 Basic Info completed. Advancing to Classification.");
    } else if (currentStep === 2) {
      if (!validateStep02()) {
        showToast("Please resolve classification validation errors before continuing.");
        return;
      }
      if (!completedSteps.includes(2)) {
        setCompletedSteps((prev) => [...prev, 2]);
      }
      setCurrentStep(3);
      showToast("Step 02 Classification validated. Advancing to Location & Ownership.");
    } else if (currentStep === 3) {
      if (!validateStep03()) {
        showToast("Please fill in all mandatory location and ownership fields.");
        return;
      }
      if (!completedSteps.includes(3)) {
        setCompletedSteps((prev) => [...prev, 3]);
      }
      // Sync Step 03 location to Step 04 installation location
      if (step03Data.building && step03Data.space) {
        setStep04Data((prev) => ({
          ...prev,
          installationLocation: `${step03Data.building.split(" (")[0]}, ${step03Data.space.split(" (")[0]} [Ceiling Rig]`,
        }));
      }
      setCurrentStep(4);
      showToast("Step 03 Location & Ownership validated. Advancing to Lifecycle.");
    } else if (currentStep === 4) {
      if (!validateStep04()) {
        showToast("Please resolve procurement and lifecycle validation errors before continuing.");
        return;
      }
      if (!completedSteps.includes(4)) {
        setCompletedSteps((prev) => [...prev, 4]);
      }
      // Sync team and supervisor into Step 05 if not already configured
      if (!completedSteps.includes(5)) {
        if (step03Data.assignedTeam) {
          setStep05Data((prev) => ({
            ...prev,
            responsibleTeam: step03Data.assignedTeam.includes("Squad 04")
              ? "Media Operations Squad 04 (Audiovisual)"
              : prev.responsibleTeam,
          }));
        }
        if (step04Data.signOffEngineer) {
          setStep05Data((prev) => ({
            ...prev,
            assignedLead: step04Data.signOffEngineer.includes("Davis")
              ? "R. Davis (Tech Lead - Media Ops)"
              : step04Data.signOffEngineer,
          }));
        }
      }
      setCurrentStep(5);
      showToast("Step 04 Lifecycle validated. Advancing to Maintenance.");
    } else if (currentStep === 5) {
      if (!validateStep05()) {
        showToast("Please resolve maintenance protocol validation errors before continuing.");
        return;
      }
      if (!completedSteps.includes(5)) {
        setCompletedSteps((prev) => [...prev, 5]);
      }
      setCurrentStep(6);
      showToast("Step 05 Maintenance Configuration complete. Advancing to Review.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F3] text-[#1A1D15]">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#030407] bg-[#030407] px-4 py-3 text-xs font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="flex size-4 items-center justify-center rounded-full bg-[#C5EA32] text-[#030407]">
            <Check size={11} strokeWidth={3} />
          </span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Shared Application Shell Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        activeNav="assets"
        unreadNotificationsCount={3}
        onOpenNotifications={() => showToast("Viewing operational notifications...")}
        onOpenHelp={() => showToast("Asset Onboarding Guide: 6-step commissioning procedure.")}
        onOpenSettings={() => showToast("Wizard Configuration: ID Auto-reservation enabled.")}
        onOpenProfile={() => showToast("Facilities Operations Admin: Logged in via apex.edu directory.")}
      />

      {/* Main Workspace Frame (vertical capsule rail offset) */}
      <div className="flex min-h-screen flex-col md:pl-20">
        {/* Top Application Toolbar */}
        <DashboardHeader
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenReportIssue={() => showToast("Navigating to Issue Reporting...")}
          onOpenRegisterAsset={() => {}}
          onOpenNotifications={() => showToast("Viewing notifications...")}
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
          selectedInstitutionId={selectedInstitutionId}
          onSelectInstitution={setSelectedInstitutionId}
        />

        {/* Operational Workspace Body */}
        <main className="flex-1 w-full bg-[#F7F6F3]">
          {/* Top Progress & Context Navigation Header */}
          <div className="px-6 sm:px-8 pt-6 pb-4 bg-[#FFFFFF] shadow-sm border-b border-[#EEF0E5] flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col gap-1 min-w-0">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#737785]">
                  <Link href="/dashboard" className="hover:text-[#0041a0] transition-colors">
                    Asset Management
                  </Link>
                  <span>/</span>
                  <Link href="/assets" className="hover:text-[#0041a0] transition-colors">
                    Asset Registry
                  </Link>
                  <span>/</span>
                  <span className="text-[#0041a0] font-semibold">Register Asset</span>
                </nav>

                {/* Title & Reserved Badge */}
                <div className="flex items-center gap-2.5 flex-wrap mt-0.5">
                  <h1 className="font-serif text-[28px] text-[#1A1D15] leading-tight font-normal">
                    Register New Asset
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C5EA32] text-[#171e00] font-mono text-xs font-semibold border border-[#536600]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1558C9] animate-pulse" />
                    AST-2024-2849 RESERVED
                  </span>
                </div>
                <p className="text-xs text-[#434653] max-w-2xl">
                  Add a physical asset to your institution&apos;s inventory and establish its operational identity.
                </p>
              </div>

              {/* Draft Status & Actions */}
              <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F3F5E7] text-[#434653] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#536600] animate-pulse" />
                  <span>Draft auto-saved {lastSavedTime}</span>
                  <span className="text-[#C3C6D6]">•</span>
                  <span className="font-mono text-[10px] text-[#1A1D15] font-semibold">
                    ID Reservation: PENDING
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-3.5 py-2 rounded-lg bg-[#EEEFE2] text-[#1A1D15] font-medium hover:bg-[#E8E9DC] transition-colors text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Save size={14} className="text-[#434653]" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#E2E4D6] text-[#1A1D15] font-medium hover:bg-[#dadbce] transition-colors text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Eye size={14} className="text-[#434653]" />
                  <span>Preview Tag</span>
                </button>
              </div>
            </div>

            {/* Stepper Navigation */}
            {isHydrated ? (
              <RegisterStepper
                currentStep={currentStep}
                onStepClick={(step) => setCurrentStep(step)}
                completedSteps={completedSteps}
              />
            ) : (
              <div className="w-full h-14 bg-[#EEEFE2]/50 rounded-xl animate-pulse" />
            )}
          </div>

          {/* Main Content Area with generous bottom padding so sticky footer never overlaps form controls */}
          <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6 pb-32 sm:pb-36">
            {!isHydrated ? (
              <div className="w-full rounded-2xl bg-white border border-[#E2E4D6] p-12 flex flex-col items-center justify-center min-h-[420px] shadow-sm text-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#1A1D15] border-t-transparent animate-spin mb-4" />
                <p className="text-sm font-medium text-[#1A1D15]">Restoring registration session...</p>
                <p className="text-xs text-[#737785] mt-1 font-mono">Loading saved asset configuration draft</p>
              </div>
            ) : (
              <>
                {currentStep === 1 && (
                  <Step01BasicInfo
                    data={step01Data}
                    onChange={handleUpdateStep01}
                    errors={errors}
                  />
                )}

                {currentStep === 2 && (
                  <Step02Classification
                    data={step02Data}
                    onChange={handleUpdateStep02}
                    errors={errors}
                  />
                )}

                {currentStep === 3 && (
                  <Step03Location
                    data={step03Data}
                    onChange={handleUpdateStep03}
                    errors={errors}
                  />
                )}

                {currentStep === 4 && (
                  <Step04Lifecycle
                    data={step04Data}
                    onChange={handleUpdateStep04}
                    errors={errors}
                    usefulLife={step02Data.expectedUsefulLife}
                    assetModel={step01Data.model ? `SONY ${step01Data.model}` : "SONY VPL-FHZ85"}
                    onDownloadAttachment={() =>
                      showToast("Downloading certificate: Sony_Enterprise_Warranty_Certificate.pdf")
                    }
                  />
                )}

                {currentStep === 5 && (
                  <Step05Maintenance
                    data={step05Data}
                    onChange={handleUpdateStep05}
                    errors={errors}
                    assetName={step01Data.model ? `Sony ${step01Data.model} Laser` : "Sony VPL-FHZ91L Laser"}
                    assetSerial={step01Data.serialNumber ? `SN: ${step01Data.serialNumber}` : "SN: SN-883921-X9"}
                    assetClass={`Class: ${step02Data.category ? step02Data.category.split(" &")[0] : "Audiovisual"} (Tier ${step02Data.criticality === "High" ? 1 : step02Data.criticality === "Critical" ? 0 : 2})`}
                    locationRoom={step03Data.space ? step03Data.space.split(" (")[0] : "Room 304 Auditorium"}
                    installationDate={step04Data.installationDate || "18 Aug 2024"}
                    onDownloadDocument={(filename) =>
                      showToast(`Downloading technical document: ${filename}`)
                    }
                  />
                )}

                {currentStep === 6 && (
                  <Step06Review
                    step01Data={step01Data}
                    step02Data={step02Data}
                    step03Data={step03Data}
                    step04Data={step04Data}
                    step05Data={step05Data}
                    onEditStep={(stepNum) => setCurrentStep(stepNum)}
                    isConfirmed={isCustodyConfirmed}
                    onToggleConfirm={setIsCustodyConfirmed}
                    onPrevious={() => setCurrentStep(5)}
                    onRegisterSuccess={() => {
                      clearDraftFromStorage();
                      setIsRegistrationComplete(true);
                      if (!completedSteps.includes(6)) {
                        setCompletedSteps((prev) => [...prev, 6]);
                      }
                    }}
                    showToast={showToast}
                  />
                )}

                {/* Stepper Navigation Footer Actions Bar (Steps 01-05 only; Step 06 has embedded commit bar) */}
                {currentStep < 6 && (
                  <div className="sticky bottom-0 z-30 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-[#A5A79B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        disabled={currentStep === 1}
                        onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#eeefe2] hover:bg-[#e8e9dc] text-[#1A1D15] font-semibold text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed justify-center"
                      >
                        <ArrowLeft size={16} />
                        <span>
                          {currentStep === 5
                            ? "Previous Step"
                            : currentStep === 4
                            ? "Previous Step"
                            : currentStep === 3
                            ? "Previous: Step 02 Classification"
                            : currentStep === 2
                            ? "Previous: Step 01 Basic Info"
                            : "Previous Step"}
                        </span>
                      </button>
                      {currentStep === 5 && (
                        <span className="hidden sm:inline text-xs text-[#737785]">
                          Lifecycle &amp; Depreciation saved
                        </span>
                      )}
                    </div>

                    {/* Step Counter & Progress Indicator */}
                    <div className="flex flex-col items-center gap-1.5">
                      {currentStep === 5 ? (
                        <div className="flex flex-col items-center sm:items-end">
                          <span className="text-xs text-[#1A1D15] font-medium">Step 5 of 6</span>
                          <span className="font-mono text-[11px] text-[#536600] font-bold">
                            83% Configuration Complete
                          </span>
                        </div>
                      ) : currentStep === 4 ? (
                        <div className="flex items-center gap-3">
                          <div className="w-36 h-2 bg-[#eeefe2] rounded-full overflow-hidden">
                            <div className="h-full bg-[#C5EA32]" style={{ width: "66%" }} />
                          </div>
                          <span className="font-mono text-xs text-[#737785] font-medium">
                            Step 4 of 6 • 66% Complete
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5, 6].map((num) => {
                              const isDone = completedSteps.includes(num);
                              const isCur = num === currentStep;
                              if (isCur) {
                                return (
                                  <span
                                    key={num}
                                    className="w-3 h-3 rounded-full bg-[#C5EA32] ring-2 ring-[#1558C9] transition-all"
                                  />
                                );
                              }
                              if (isDone) {
                                return (
                                  <span
                                    key={num}
                                    className="w-2.5 h-2.5 rounded-full bg-[#1558C9] transition-all"
                                  />
                                );
                              }
                              return (
                                <span
                                  key={num}
                                  className="w-2 h-2 rounded-full bg-[#E8E9DC] transition-all"
                                />
                              );
                            })}
                          </div>
                          <span className="font-mono text-xs text-[#737785]">
                            Step {currentStep} of 6 •{" "}
                            <span className="font-semibold text-[#1A1D15]">
                              {currentStep === 1
                                ? "16% Complete"
                                : currentStep === 2
                                ? "33% Complete"
                                : currentStep === 3
                                ? "50% Complete"
                                : currentStep === 4
                                ? "66% Complete"
                                : currentStep === 5
                                ? "83% Complete"
                                : "100% Complete"}
                            </span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setIsDiscardModalOpen(true)}
                        className="px-4 py-2.5 rounded-lg bg-[#eeefe2] hover:bg-[#e8e9dc] text-[#1A1D15] font-semibold text-xs transition-colors"
                      >
                        Discard
                      </button>
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1558C9] hover:bg-[#0041a0] text-white font-semibold text-xs shadow-md transition-all active:scale-[0.99]"
                      >
                        <span>
                          {currentStep === 1
                            ? "Continue to Classification"
                            : currentStep === 2
                            ? "Continue to Location"
                            : currentStep === 3
                            ? "Continue to Lifecycle"
                            : currentStep === 4
                            ? "Continue to Maintenance"
                            : currentStep === 5
                            ? "Continue to Review"
                            : "Continue to Next Step"}
                        </span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Preview Tag Modal */}
      <TagPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        data={step01Data}
      />

      {/* Discard Draft Confirmation Modal */}
      {isDiscardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030407]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-[#E8E9DC] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[#ba1a1a]">
              <span className="p-2 rounded-full bg-[#ffdad6]">
                <AlertTriangle size={20} />
              </span>
              <h3 className="font-serif text-lg text-[#1A1D15]">Discard Draft?</h3>
            </div>
            <p className="text-xs text-[#434653] leading-relaxed">
              This will reset all data entered across all steps of this registration wizard session. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsDiscardModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#eeefe2] text-[#1A1D15] text-xs font-semibold hover:bg-[#e8e9dc] transition-colors"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={handleDiscardDraft}
                className="px-4 py-2 rounded-lg bg-[#ba1a1a] text-white text-xs font-semibold hover:bg-[#93000a] transition-colors shadow-xs"
              >
                Discard All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
