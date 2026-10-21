/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import type { ReactNode } from "react";
import { ArrowButton } from "./ArrowButton";
import { FooterTruck } from "./FooterTruck";
import { NewsletterForm } from "./forms";
import { Reveal } from "./Reveal";
import { ASSET, contactInfo, links } from "./data";
import { Tag } from "./ui";

function FooterLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={className ? `ta-footer__link ${className}` : "ta-footer__link"}>
      <span>{children}</span>
      <img src={`${ASSET}/icons/arrow-up-right.svg`} alt="" width={18} height={18} />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="ta-dark" data-section="footer">
      <div className="ta-cta">
        <div className="ta-pattern ta-pattern--light ta-cta__pattern" aria-hidden />
        <div className="ta-cta__glow" aria-hidden />
        <Reveal className="ta-cta__inner">
          <Tag light>Parlons de votre projet</Tag>
          <h2 className="ta-cta__title">
            Obtenez un devis <span>personnalisé.</span>
          </h2>
          <ArrowButton href={links.contactQuote} label="Demander mon devis" className="ta-cta__btn" />
        </Reveal>
        <FooterTruck />
      </div>

      <div className="ta-footer">
        <div className="ta-footer__brand">
          <a href={links.home} aria-label="TIM ALLIANCE – Accueil">
            <img src={`${ASSET}/images/logo-footer.webp`} alt="TIM ALLIANCE – Transport International Maroc" />
          </a>
        </div>
        <div className="ta-footer__cols">
          <div className="ta-footer__col">
            <h6>Contacts</h6>
            <FooterLink href={`mailto:${contactInfo.email}`}>{contactInfo.email}</FooterLink>
            <FooterLink href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>{contactInfo.phone}</FooterLink>
          </div>
          <div className="ta-footer__col">
            <h6>Pages</h6>
            <FooterLink href={links.services}>Services</FooterLink>
            <FooterLink href={links.fleet}>Notre flotte</FooterLink>
            <FooterLink href={links.gallery}>Galerie</FooterLink>
          </div>
          <div className="ta-footer__col">
            <h6>Entreprise</h6>
            <FooterLink href={links.about}>À propos</FooterLink>
            <FooterLink href={links.contact}>Contactez-nous</FooterLink>
          </div>
        </div>
        <div className="ta-newsletter">
          <h6>Restez informé en vous abonnant à notre newsletter.</h6>
          <NewsletterForm />
        </div>
      </div>

      <div className="ta-subfooter">
        <p>TIM ALLIANCE - © Copyright 2025</p>
        <a href={links.privacy}>Politique de confidentialité</a>
      </div>
    </footer>
  );
}
