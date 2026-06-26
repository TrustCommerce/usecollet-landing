import type { Metadata } from "next";
import ManagersPage from "@/components/ManagersPage";

export const metadata: Metadata = {
  title: "Collet · for property managers",
  description:
    "Collet collects every tenant's rent, splits each owner's share to the naira, remits it automatically, and proves where every payment went. The back office Nigerian property managers have been doing by hand.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <ManagersPage />;
}
