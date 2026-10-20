import type { Metadata } from "next";
import { AboutPage } from "@/components/sites/tim-alliance/pages/AboutPage";

export const metadata: Metadata = {
  title: "À propos de nous – TIM ALLIANCE",
  description: "Depuis 2005, TIM ALLIANCE apporte des solutions de transport professionnelles entre le Maroc et l'Europe. Découvrez notre histoire.",
};

export default function Page() {
  return <AboutPage />;
}
