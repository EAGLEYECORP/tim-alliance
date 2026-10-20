import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SmoothScroll } from "./SmoothScroll";
import { TruckIntro } from "./intro/TruckIntro";
import "./tim-alliance.css";
import "./pages.css";

/** Header, smooth scrolling and footer shared by every page; only the homepage plays the 3D intro. */
export function SiteShell({ children, intro = false }: { children: ReactNode; intro?: boolean }) {
  return (
    <div className="ta-root">
      {intro && <TruckIntro />}
      <SmoothScroll />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
