"use client";

import { useEffect, useRef } from "react";

export type Milestone = { year: string; text: string; future?: boolean };

/** Vertical "road" timeline; the orange lane fills as the visitor scrolls through it. */
export function Timeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      el.style.setProperty("--progress", p.toFixed(3));
      el.querySelectorAll<HTMLElement>(".ta-milestone").forEach((m) => {
        const mr = m.getBoundingClientRect();
        m.classList.toggle("is-reached", mr.top < vh * 0.6);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol className="ta-timeline" ref={ref}>
      <span className="ta-timeline__road" aria-hidden>
        <span className="ta-timeline__fill" />
      </span>
      {items.map((m, i) => (
        <li key={m.year} className={`ta-milestone ${i % 2 ? "is-right" : "is-left"}${m.future ? " is-future" : ""}`}>
          <span className="ta-milestone__pin" aria-hidden />
          <div className="ta-milestone__card">
            <span className="ta-milestone__year">{m.year}</span>
            <p>{m.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
