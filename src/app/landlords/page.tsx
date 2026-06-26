import type { Metadata } from "next";
import LandlordsPage from "@/components/LandlordsPage";

export const metadata: Metadata = {
  title: "Collet · proof for your rent",
  description:
    "Collet is where your property manager collects the rent, sends you your share to the naira, and gives you a record you can open from anywhere. Property management for Nigeria, landlord-first.",
  alternates: { canonical: "/landlords" },
};

export default function Page() {
  return <LandlordsPage />;
}
