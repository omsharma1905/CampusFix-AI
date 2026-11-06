import type { Metadata } from "next";
import { RegistrationSuccessView } from "@/components/assets/registration-success/registration-success-view";

export const metadata: Metadata = {
  title: "Asset Registration Confirmed | CampusFix AI",
  description:
    "Official institutional equipment registration receipt, transponder provisioning, and ledger manifest.",
};

export default function RegistrationSuccessPage() {
  return <RegistrationSuccessView />;
}

