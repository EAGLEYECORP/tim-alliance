"use client";

/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import { useCallback, useEffect, useState } from "react";

export type GalleryItem = { src: string; alt: string; wide?: boolean };

/** Masonry-style grid with a keyboard-friendly full-screen lightbox. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <ul className="ta-gallery">
        {items.map((it, i) => (
          <li key={it.src} className={it.wide ? "ta-gallery__item is-wide" : "ta-gallery__item"}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Agrandir : ${it.alt}`}>
              <img src={it.src} alt={it.alt} loading="lazy" />
              <span className="ta-gallery__zoom" aria-hidden>
                +
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div className="ta-lightbox" role="dialog" aria-modal="true" aria-label={items[open].alt} onClick={close}>
          <img src={items[open].src} alt={items[open].alt} onClick={(e) => e.stopPropagation()} />
          <p className="ta-lightbox__caption">
            {items[open].alt} <span>{open + 1} / {items.length}</span>
          </p>
          <button type="button" className="ta-lightbox__btn ta-lightbox__close" aria-label="Fermer" onClick={close}>
            ×
          </button>
          <button
            type="button"
            className="ta-lightbox__btn ta-lightbox__prev"
            aria-label="Photo précédente"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="ta-lightbox__btn ta-lightbox__next"
            aria-label="Photo suivante"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
