"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowButton } from "./ArrowButton";
import { ASSET, links } from "./data";

const nav = [
  { label: "Services", href: links.services },
  { label: "Flotte", href: links.fleet },
  { label: "Galerie", href: links.gallery },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="ta-header">
      <a href={links.home} className="ta-header__logo" aria-label="TIM ALLIANCE – Accueil">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/images/logo-header.png`} alt="TIM ALLIANCE – Transport International Maroc" />
      </a>

      <div className="ta-header__brand">
        <a href={links.about} className="ta-header__brand-name">
          TIM ALLIANCE
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/images/tagline.png`} alt="Transport International Maroc" />
      </div>

      <nav className="ta-header__nav" aria-label="Navigation principale">
        {nav.map((item) => (
          <a key={item.label} href={item.href} className="ta-navlink">
            {item.label}
          </a>
        ))}
      </nav>

      <ArrowButton href={links.contact} label="Obtenir un devis" className="ta-header__cta" />

      <button
        type="button"
        className="ta-burger"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
      </button>

      <div className={cn("ta-menu", open && "is-open")} aria-hidden={!open}>
        <div className="ta-menu__top">
          <a href={links.home} className="ta-menu__logo" tabIndex={open ? 0 : -1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSET}/images/logo-menu.png`} alt="TIM ALLIANCE" />
          </a>
          <button
            type="button"
            className="ta-menu__close"
            aria-label="Fermer le menu"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav className="ta-menu__links">
          <a href={links.about} className="ta-menu__brand" tabIndex={open ? 0 : -1}>
            TIM ALLIANCE
          </a>
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="ta-navlink ta-navlink--dark" tabIndex={open ? 0 : -1}>
              {item.label}
            </a>
          ))}
        </nav>
        <ArrowButton href={links.contact} label="Obtenir un devis" className="ta-menu__cta" />
      </div>
    </header>
  );
}
