import type { Metadata } from "next";
import { SignupView } from "@/components/auth/signup-view";

export const metadata: Metadata = {
  title: "Create Account | CampusFix AI Enterprise",
  description:
    "Register for CampusFix AI Enterprise - Intelligent physical asset management, predictive maintenance workflows, and spatial telemetry automation for modern campuses.",
};

export default function SignUpPage() {
  return <SignupView />;
}

