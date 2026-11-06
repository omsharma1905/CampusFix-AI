import type { Metadata } from "next";
import { ForgotPasswordView } from "@/components/auth/forgot-password-view";

export const metadata: Metadata = {
  title: "Forgot Password | CampusFix AI Enterprise",
  description:
    "Reset your CampusFix AI institutional account credentials with secure cryptographic token verification.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}

