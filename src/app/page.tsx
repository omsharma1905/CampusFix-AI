import type { Metadata } from "next";
import { LandingPageView } from "@/components/landing/landing-page-view";

export const metadata: Metadata = {
  title: "CampusFix AI — Autonomous Campus Infrastructure OS",
  description:
    "One intelligent platform to manage campus assets, maintenance operations and infrastructure health — from the first reported issue to the final resolution.",
};

export default function HomePage() {
  return <LandingPageView />;
}
