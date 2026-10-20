import type { Metadata } from "next";
import { ContactPage } from "@/components/sites/tim-alliance/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contactez-nous – TIM ALLIANCE",
  description: "Demandez un devis ou posez votre question à TIM ALLIANCE : nous vous répondons sous 24h.",
};

export default function Page() {
  return <ContactPage />;
}
