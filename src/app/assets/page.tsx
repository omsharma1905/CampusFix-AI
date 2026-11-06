import type { Metadata } from "next";
import { AssetRegistryShell } from "@/components/assets/asset-registry-shell";

export const metadata: Metadata = {
  title: "Asset Registry | Institutional Inventory System | CampusFix AI",
  description:
    "Manage, monitor and maintain every registered physical asset across institutional campuses with real-time telemetry.",
};

export default function AssetsPage() {
  return <AssetRegistryShell />;
}

