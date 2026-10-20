import type { Metadata } from "next";
import { FleetPage } from "@/components/sites/tim-alliance/pages/FleetPage";

export const metadata: Metadata = {
  title: "Notre flotte – TIM ALLIANCE",
  description: "Une flotte EURO 6 diversifiée : tracteurs routiers, remorques bâchées anti-intrusion, tôlées MEGA, frigorifiques, express et porte-voitures, suivies par GPS en temps réel.",
};

export default function Page() {
  return <FleetPage />;
}
