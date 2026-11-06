import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAssetDetailById } from "@/components/assets/mock-data";
import { AssetDetailView } from "@/components/assets/details/asset-detail-view";

interface AssetDetailPageProps {
  params: Promise<{ assetId: string }>;
}

export async function generateMetadata({
  params,
}: AssetDetailPageProps): Promise<Metadata> {
  const { assetId } = await params;
  const asset = getAssetDetailById(assetId);

  if (!asset) {
    return {
      title: "Asset Not Found | CampusFix AI",
      description: "Requested institutional asset could not be located in registry.",
    };
  }

  return {
    title: `${asset.id} — ${asset.name} | CampusFix AI`,
    description: `Equipment profile, real-time telemetry, maintenance timeline, and lifecycle depreciation for ${asset.name} (${asset.id}).`,
  };
}

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { assetId } = await params;
  const asset = getAssetDetailById(assetId);

  if (!asset) {
    notFound();
  }

  return <AssetDetailView initialAsset={asset} />;
}

