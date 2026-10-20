/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import type { ReactNode } from "react";
import { links } from "./data";

/** Dark cinematic page header shared by every inner page. */
export function PageHero({
  tag,
  title,
  lead,
  image,
  video,
  crumb,
  compact,
  children,
}: {
  tag: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  video?: string;
  crumb: string;
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={compact ? "ta-page-hero ta-page-hero--compact" : "ta-page-hero"}>
      <div className="ta-page-hero__media" aria-hidden>
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline preload="metadata" />
        ) : image ? (
          <img src={image} alt="" />
        ) : null}
      </div>
      <div className="ta-page-hero__shade" aria-hidden />
      <div className="ta-page-hero__inner">
        <nav className="ta-crumbs ta-hero-anim" aria-label="Fil d'Ariane">
          <a href={links.home}>Accueil</a>
          <span aria-hidden>/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <p className="ta-hero__eyebrow ta-hero-anim">
          <span className="ta-tag__ring" aria-hidden />
          {tag}
        </p>
        <h1 className="ta-page-hero__title ta-hero-anim">{title}</h1>
        {lead && <div className="ta-page-hero__lead ta-hero-anim">{lead}</div>}
        {children}
      </div>
    </section>
  );
}
