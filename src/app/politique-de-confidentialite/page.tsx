import type { Metadata } from "next";
import { PrivacyPage } from "@/components/sites/tim-alliance/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité – TIM ALLIANCE",
  description: "Comment TIM ALLIANCE collecte, utilise et protège vos données personnelles.",
};

export default function Page() {
  return <PrivacyPage />;
}
