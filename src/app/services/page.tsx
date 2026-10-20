import type { Metadata } from "next";
import { ServicesPage } from "@/components/sites/tim-alliance/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Nos services – TIM ALLIANCE",
  description: "Traction de remorques, transport routier national et international, température dirigée, express, matières dangereuses ADR et porte-voitures entre le Maroc et l'Europe.",
};

export default function Page() {
  return <ServicesPage />;
}
