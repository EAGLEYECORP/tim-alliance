import type { Metadata } from "next";
import { GalleryPage } from "@/components/sites/tim-alliance/pages/GalleryPage";

export const metadata: Metadata = {
  title: "Galerie – TIM ALLIANCE",
  description: "TIM ALLIANCE en images : notre flotte, nos chargements et nos équipes sur les routes du Maroc et de l'Europe.",
};

export default function Page() {
  return <GalleryPage />;
}
