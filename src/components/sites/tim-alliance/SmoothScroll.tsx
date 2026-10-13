"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling plus the orange reading-progress bar. Starts once the intro has finished. */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    const bar = document.querySelector<HTMLElement>(".ta-progress");
    let lenis: Lenis | null = null;
    let raf = 0;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -80 } });
      lenis.on("scroll", ({ progress }: { progress: number }) => {
        if (bar) bar.style.transform = `scaleX(${progress})`;
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    if (html.dataset.intro === "playing") {
      const mo = new MutationObserver(() => {
        if (html.dataset.intro !== "playing") {
          mo.disconnect();
          start();
        }
      });
      mo.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
      return () => {
        mo.disconnect();
        cancelAnimationFrame(raf);
        lenis?.destroy();
      };
    }
    start();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <div className="ta-progress" aria-hidden />;
}
