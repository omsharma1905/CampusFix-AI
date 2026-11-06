"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Building2,
  Gauge,
  HelpCircle,
  Layers3,
  Settings,
  Wrench,
  Bell,
  SlidersHorizontal,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  href: string;
  badge?: string;
  description?: string;
}

const PRIMARY_NAV: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Activity,
    href: "/dashboard",
    description: "Operational overview & status",
  },
  {
    id: "assets",
    label: "Asset Management",
    icon: Layers3,
    href: "/assets",
    badge: "4.8k",
    description: "Multi-tenant estate registry",
  },
  {
    id: "tickets",
    label: "Complaints & Tickets",
    icon: AlertTriangle,
    href: "/dashboard#tickets",
    badge: "3",
    description: "Active facility incidents",
  },
  {
    id: "work-orders",
    label: "Work Orders",
    icon: Wrench,
    href: "/dashboard#work-orders",
    description: "Technician task dispatch",
  },
  {
    id: "preventive",
    label: "Preventive Maintenance",
    icon: Gauge,
    href: "/dashboard#preventive",
    description: "Predictive inspection cycles",
  },
  {
    id: "campus",
    label: "Campus Management",
    icon: Building2,
    href: "/dashboard#buildings",
    description: "Facility nodes & zones",
  },
  {
    id: "telemetry",
    label: "Analytics & Telemetry",
    icon: SlidersHorizontal,
    href: "/dashboard#telemetry",
    description: "Spatial sensor streams",
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  activeNav?: string;
  onSelectNav?: (id: string) => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  onOpenHelp?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function DashboardSidebar({
  mobileOpen = false,
  onCloseMobile,
  activeNav: explicitActiveNav,
  onSelectNav,
  unreadNotificationsCount = 3,
  onOpenNotifications,
  onOpenHelp,
  onOpenSettings,
  onOpenProfile,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState<string>("");

  // Sync hash state and handle initial page load, client navigation, hashchange, and popstate
  useEffect(() => {
    const handleUrlSync = () => {
      if (typeof window !== "undefined") {
        setCurrentHash(window.location.hash || "");
      }
    };

    handleUrlSync();

    // Scroll smoothly to section if initial load includes a hash
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 120);
        return () => clearTimeout(timer);
      }
    }

    window.addEventListener("hashchange", handleUrlSync);
    window.addEventListener("popstate", handleUrlSync);
    return () => {
      window.removeEventListener("hashchange", handleUrlSync);
      window.removeEventListener("popstate", handleUrlSync);
    };
  }, [pathname]);

  // Determine current active navigation id with 100% predictable precedence
  const resolveActiveNav = (): string => {
    // If an explicit activeNav is provided (e.g. "assets" in asset registry views), honor it
    if (explicitActiveNav && explicitActiveNav !== "dashboard") {
      return explicitActiveNav;
    }

    // Asset Management route
    if (pathname.startsWith("/assets")) {
      return "assets";
    }

    // Dashboard routes and section hashes
    if (pathname === "/dashboard" || pathname.startsWith("/dashboard")) {
      if (currentHash === "#tickets") return "tickets";
      if (currentHash === "#work-orders") return "work-orders";
      if (currentHash === "#preventive") return "preventive";
      if (currentHash === "#buildings") return "campus";
      if (currentHash === "#telemetry") return "telemetry";
      return "dashboard";
    }

    // Default safe fallback - Settings must NEVER appear active on dashboard
    return "dashboard";
  };

  const activeId = resolveActiveNav();

  const handleNavClick = (item: NavItem) => {
    onSelectNav?.(item.id);
    onCloseMobile?.();

    if (item.href.includes("#")) {
      const [path, hash] = item.href.split("#");
      setCurrentHash(`#${hash}`);
      if (pathname !== path) {
        router.push(item.href);
      } else {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", `#${hash}`);
      }
    } else {
      setCurrentHash("");
      if (pathname === item.href) {
        // Reset hash in history and scroll to top smoothly
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", item.href);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        router.push(item.href);
      }
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Floating Vertical Capsule Rail */}
      <aside
        className={`fixed left-2.5 top-2.5 bottom-2.5 z-50 flex w-[60px] flex-col items-center justify-between rounded-[32px] border border-white/10 bg-[#030407] py-3.5 text-white shadow-2xl shadow-black/60 transition-transform duration-200 ease-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-[150%] md:translate-x-0"
        }`}
        aria-label="CampusFix Operations Navigation"
      >
        {/* Top: Brand Monogram & Main Navigation Stack */}
        <div className="flex w-full flex-col items-center">
          {/* Brand Monogram */}
          <div className="group relative flex items-center justify-center">
            <Link
              href="/dashboard"
              onClick={() => {
                setCurrentHash("");
                if (typeof window !== "undefined" && pathname === "/dashboard") {
                  window.history.pushState(null, "", "/dashboard");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                onCloseMobile?.();
              }}
              className="relative flex size-10 items-center justify-center rounded-full bg-[#0E121D] hover:bg-[#1558C9] border border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5EA32]"
              aria-label="CampusFix AI Home"
            >
              <span className="grid size-7 place-items-center rounded-full bg-[#C5EA32] font-mono text-[11px] font-black tracking-tighter text-[#030407] shadow-[0_0_10px_rgba(197,234,50,0.35)] transition-transform group-hover:scale-95">
                CF
              </span>
            </Link>

            {/* Contextual Brand Tooltip */}
            <div
              role="tooltip"
              className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 z-[60] hidden md:flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#080C14] px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-white/15 bg-[#080C14]" />
              <span className="font-semibold text-white">CampusFix.AI</span>
              <span className="text-[10px] text-[#C5EA32] font-mono">v4.12.0</span>
            </div>
          </div>

          {/* Micro Hairline Divider */}
          <div className="my-2.5 h-px w-6 bg-white/10" />

          {/* Primary Navigation Icons */}
          <nav className="flex flex-col items-center space-y-1.5" aria-label="Main Navigation">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon;
              const isSelected = activeId === item.id;

              return (
                <div key={item.id} className="group relative flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`group/btn relative flex size-10 items-center justify-center rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5EA32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030407] ${
                      isSelected
                        ? "bg-[#C5EA32] text-[#030407] font-bold shadow-[0_0_18px_rgba(197,234,50,0.4)] ring-2 ring-[#C5EA32]/30"
                        : "text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                    }`}
                    aria-current={isSelected ? "page" : undefined}
                    aria-label={item.label}
                  >
                    <Icon
                      size={19}
                      className={`transition-transform duration-150 group-active/btn:scale-90 ${
                        isSelected ? "text-[#030407] stroke-[2.3]" : "stroke-[1.8]"
                      }`}
                    />

                    {/* Numeric Count Badge */}
                    {item.badge && !isSelected && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#BA1A1A] px-1 font-mono text-[9px] font-bold text-white shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Contextual Floating Tooltip */}
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 z-[60] hidden md:flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#080C14] px-3 py-1.5 text-xs font-medium text-white shadow-2xl backdrop-blur-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
                  >
                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-white/15 bg-[#080C14]" />
                    <span className="font-sans font-medium text-white">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-white/10 border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-[#C5EA32]">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-mono text-[#C5EA32] font-semibold">
                        ● Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Utilities & User Profile */}
        <div className="flex w-full flex-col items-center space-y-1.5">
          {/* Notifications Trigger */}
          <div className="group relative flex items-center justify-center">
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative flex size-10 items-center justify-center rounded-full text-zinc-400 hover:bg-white/[0.08] hover:text-white transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5EA32]"
              aria-label="View notifications"
            >
              <Bell size={18} className="stroke-[1.8]" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#C5EA32] ring-2 ring-[#030407]" />
              )}
            </button>
            <div
              role="tooltip"
              className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 z-[60] hidden md:flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#080C14] px-3 py-1.5 text-xs text-white shadow-2xl backdrop-blur-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-white/15 bg-[#080C14]" />
              <span className="font-sans">Alerts &amp; Notifications</span>
              <span className="rounded-full bg-[#C5EA32] px-1.5 py-0.2 font-mono text-[10px] font-bold text-[#030407]">
                {unreadNotificationsCount}
              </span>
            </div>
          </div>

          {/* Help & Facilities Manual */}
          <div className="group relative flex items-center justify-center">
            <button
              type="button"
              onClick={onOpenHelp}
              className="flex size-10 items-center justify-center rounded-full text-zinc-400 hover:bg-white/[0.08] hover:text-white transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5EA32]"
              aria-label="Help and documentation"
            >
              <HelpCircle size={18} className="stroke-[1.8]" />
            </button>
            <div
              role="tooltip"
              className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 z-[60] hidden md:flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#080C14] px-3 py-1.5 text-xs text-white shadow-2xl backdrop-blur-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-white/15 bg-[#080C14]" />
              <span className="font-sans">Help &amp; Documentation</span>
            </div>
          </div>

          {/* Operations Settings */}
          <div className="group relative flex items-center justify-center">
            <button
              type="button"
              onClick={onOpenSettings}
              className={`flex size-10 items-center justify-center rounded-full transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5EA32] ${
                activeId === "settings"
                  ? "bg-[#C5EA32] text-[#030407] font-bold shadow-[0_0_18px_rgba(197,234,50,0.4)]"
                  : "text-zinc-400 hover:bg-white/[0.08] hover:text-white"
              }`}
              aria-label="Operations Settings"
            >
              <Settings size={18} className="stroke-[1.8]" />
            </button>
            <div
              role="tooltip"
              className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 z-[60] hidden md:flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#080C14] px-3 py-1.5 text-xs text-white shadow-2xl backdrop-blur-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-white/15 bg-[#080C14]" />
              <span className="font-sans">Operations Settings</span>
            </div>
          </div>

          {/* Micro Hairline Divider */}
          <div className="my-1.5 h-px w-6 bg-white/10" />

          {/* User Profile Avatar */}
          <div className="group relative flex items-center justify-center">
            <button
              type="button"
              onClick={onOpenProfile}
              className="relative flex size-10 items-center justify-center rounded-full border border-white/20 bg-[#1558C9]/30 text-xs font-bold text-[#C5EA32] transition-all duration-200 hover:border-[#C5EA32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5EA32]"
              aria-label="Facilities Operations Profile"
            >
              FO
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-[#030407] bg-[#C5EA32]" />
            </button>
            <div
              role="tooltip"
              className="pointer-events-none absolute left-[68px] top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col whitespace-nowrap rounded-lg border border-white/15 bg-[#080C14] px-3 py-2 text-xs text-white shadow-2xl backdrop-blur-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-white/15 bg-[#080C14]" />
              <span className="font-semibold text-white">Facilities Operations</span>
              <span className="font-mono text-[10px] text-zinc-400">Admin · apex.edu</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
