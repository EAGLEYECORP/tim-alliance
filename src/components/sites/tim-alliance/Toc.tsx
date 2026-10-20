"use client";

import { useEffect, useState } from "react";

/** Sticky table of contents that highlights the section currently in view. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="ta-toc" aria-label="Table des matières">
      <p className="ta-toc__title">Table des matières</p>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? "is-active" : undefined}>
              <em>0{i + 1}</em> {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
