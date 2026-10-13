import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const urbanist = localFont({
  variable: "--font-urbanist",
  display: "swap",
  src: [
    { path: "../../public/sites/tim-alliance/fonts/urbanist-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/sites/tim-alliance/fonts/urbanist-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/sites/tim-alliance/fonts/urbanist-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/sites/tim-alliance/fonts/urbanist-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "TIM ALLIANCE – Votre partenaire logistique de confiance depuis 2005",
  description:
    "TIM ALLIANCE : 20 ans d'expertise en logistique et transport intermodal au Maroc, Europe. Livraisons à temps, suivi GPS, solutions sur mesure. Contactez-nous !",
};

// Runs before first paint so the intro overlay covers the page without a flash of content.
const introScript = `try{var d=document.documentElement;var seen=sessionStorage.getItem("ta-intro-seen");var calm=matchMedia("(prefers-reduced-motion: reduce)").matches;var force=/[?&]intro=1/.test(location.search);d.dataset.intro=(force||(!seen&&!calm))?"playing":"done";}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${urbanist.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
