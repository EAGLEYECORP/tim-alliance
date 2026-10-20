"use client";

import { useEffect, useState } from "react";

/** Crossfading photo slideshow (replaces the source's animated GIFs with the real photos). */
export function Slideshow({ images, alt, interval = 3600 }: { images: string[]; alt: string; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="ta-slides">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          loading="lazy"
          className={i === index ? "is-active" : undefined}
        />
      ))}
      {images.length > 1 && (
        <div className="ta-slides__dots" role="tablist" aria-label="Photos">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
