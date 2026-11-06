import type { Metadata } from "next";
import { AuthView } from "@/components/auth/auth-view";

export const metadata: Metadata = {
  title: "Sign In | CampusFix AI Institutional Workspace",
  description:
    "Sign in to access your authorized institution dashboard, asset registers, and dispatch consoles.",
};

export default function SignInPage() {
  return <AuthView />;
}

