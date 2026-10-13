/* eslint-disable @next/next/no-img-element -- static exported assets with measured sizes */
import { Fragment, type ReactNode } from "react";
import { ArrowButton } from "./ArrowButton";
import { Counter } from "./Counter";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
import { ASSET, certifications, links, partners, reasons, trustCards } from "./data";
import "./tim-alliance.css";

/** Renders "\n" as a line break that only applies on desktop. */
function DesktopBreaks({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br className="ta-br-desk" />}
      {i > 0 && " "}
      <Lines text={line.replace(/\|/g, "\n")} />
    </Fragment>
  ));
}

/** Renders "\n" as a line break at every width. */
function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <p className="ta-tag">
      <span className="ta-tag__ring" aria-hidden />
      {children}
    </p>
  );
}

/** Splits a line into per-character spans for the staggered hero entrance. */
function AnimatedLine({ text, offset, phoneBreaks = [] }: { text: string; offset: number; phoneBreaks?: number[] }) {
  return text.split(" ").map((word, w, words) => {
    const before = words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
    return (
      <Fragment key={w}>
        <span className="ta-word">
          {[...word].map((ch, c) => (
            <span key={c} className="ta-char" style={{ animationDelay: `${(offset + before + c) * 22}ms` }}>
              {ch}
            </span>
          ))}
        </span>
        {w < words.length - 1 && " "}
        {phoneBreaks.includes(w) && <br className="ta-br-phone" />}
      </Fragment>
    );
  });
}

function Hero() {
  const line1 = "20 ans d'expertise transport";
  const line2 = "au service de vos marchandises.";
  return (
    <section className="ta-hero" data-section="hero">
      <video
        className="ta-hero__video ta-hero__video--desk"
        src={`${ASSET}/video/hero.mp4`}
        poster={`${ASSET}/images/hero-poster.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <video
        className="ta-hero__video ta-hero__video--phone"
        src={`${ASSET}/video/hero.mp4`}
        poster={`${ASSET}/images/hero-poster-mobile.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="ta-hero__overlay" />
      <div className="ta-hero__content">
        <h1 className="ta-hero__title" aria-label={`${line1} ${line2}`}>
          <span aria-hidden>
            <AnimatedLine text={line1} offset={0} phoneBreaks={[1, 2]} />
            <br />
            <AnimatedLine text={line2} offset={line1.length + 1} />
          </span>
        </h1>
        <div className="ta-hero__sub">
          <span className="ta-tag__ring ta-hero__ring" aria-hidden />
          <p>
            À travers l&apos;Europe et l&apos;Afrique
            <br />
            nous offrons un transport fiable avec un suivi en temps réel.
            <br />
            Une logistique sur mesure parfaitement adaptée à votre entreprise.
          </p>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="ta-certs" data-section="certifications">
      <div className="ta-certs__grid">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} className="ta-cert" delay={i * 100}>
            <img src={`${ASSET}/icons/${cert.icon}`} alt="" width={48} height={48} className="ta-cert__icon" />
            <h3 className="ta-cert__title">{cert.title}</h3>
            <div className="ta-cert__body">
              {cert.paragraphs.map((p) => (
                <p key={p}>
                  <DesktopBreaks text={p} />
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="ta-stats ta-pattern-host" data-section="stats">
      <div className="ta-pattern ta-pattern--dark ta-stats__pattern" aria-hidden />
      <Reveal className="ta-stats__intro">
        <Tag>Chiffres clés</Tag>
        <h2 className="ta-stats__title">Depuis 2005, les leaders du secteur nous accordent leur confiance.</h2>
      </Reveal>
      <div className="ta-stats__grid">
        <div className="ta-stat">
          <p className="ta-stat__num">
            <Counter to={100} decimals={1} />%
          </p>
          <p className="ta-stat__label">Taux de livraison à temps.</p>
        </div>
        <div className="ta-stat">
          <p className="ta-stat__num">
            <Counter to={24} />
            /7
          </p>
          <p className="ta-stat__label">Couverture de suivi GPS.</p>
        </div>
        <div className="ta-stat">
          <p className="ta-stat__num">
            +<Counter to={1052} />
          </p>
          <p className="ta-stat__label">Voyages annuels exécutés.</p>
        </div>
        <div className="ta-stat ta-stat--flags">
          <img src={`${ASSET}/images/flag-morocco.png`} alt="Drapeau du Maroc" className="ta-flag" />
          <img src={`${ASSET}/images/flag-europe.webp`} alt="Drapeau de l'Union européenne" className="ta-flag" />
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const row = partners.map((p, i) => (
    <div key={i} className="ta-logo" style={{ width: p.box, height: p.box }}>
      <img src={`${ASSET}/logos/${p.src}`} alt={p.alt} loading="lazy" />
    </div>
  ));
  return (
    <section className="ta-clients" data-section="clients">
      <Tag>Clients &amp; Partners</Tag>
      <div className="ta-ticker" aria-label="Clients et partenaires">
        <div className="ta-ticker__track">
          <div className="ta-ticker__set">{row}</div>
          <div className="ta-ticker__set" aria-hidden>
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="ta-why" data-section="why-us">
      <div className="ta-why__left">
        <Reveal as="h2" className="ta-why__title">
          TIM ALLIANCE <br />
          20 ans d&apos;expertise
        </Reveal>
        <Reveal as="h3" className="ta-why__subtitle">
          Pourquoi les grandes entreprises <br className="ta-br-desk" />
          nous font confiance ?
        </Reveal>
        <Reveal className="ta-why__copy">
          <p>TIM ALLIANCE, est bien plus qu&apos;une société de transport et de logistique.</p>
          <p>Nous sommes un véritable partenaire stratégique pour accompagner la croissance de votre entreprise.</p>
          <p className="ta-why__spaced">
            Nous sommes portés par des valeurs de fiabilité, d&apos;efficacité et d&apos;engagement, nous mettons à votre
            disposition notre expertise en gestion de la chaîne d&apos;approvisionnement ainsi qu&apos;une équipe de
            professionnels passionnés afin de vous proposer des solutions sur mesure et un accompagnement personnalisé.
          </p>
          <p className="ta-why__spaced">
            Notre objectif est clair : dépasser vos attentes en vous offrant des services logistiques innovants,
            performants et de qualité supérieure.
          </p>
          <p className="ta-why__spaced">
            Avec TIM ALLIANCE, ouvrez votre entreprise à de nouveaux enjeux commerciaux et dynamisez votre croissance.
          </p>
        </Reveal>
        <ArrowButton href={links.about} label="En savoir plus sur nous" variant="outline" arrow="dark" className="ta-why__btn" />
      </div>
      <div className="ta-why__cards">
        {trustCards.map((card, i) => (
          <Reveal key={card.icon} className="ta-trust" delay={i * 100}>
            <img src={`${ASSET}/icons/${card.icon}`} alt="" style={{ width: card.w, height: card.h }} />
            <p>
              <Lines text={card.title} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="ta-reasons" data-section="reasons">
      <div className="ta-reasons__head">
        <Reveal as="h2" className="ta-reasons__title">
          Pourquoi <br />
          TIM <br className="ta-br-phone" />
          ALLIANCE ?
        </Reveal>
        <Reveal as="p" className="ta-reasons__lead ta-reasons__lead--wide">
          Nous garantissons à nos clients une livraison sûre et efficace à chaque étape.
        </Reveal>
        <Reveal as="p" className="ta-reasons__lead ta-reasons__lead--phone">
          Chez Transport International Maroc <br />
          Nous garantissons à nos clients <br />
          une livraison sûre et efficace <br />à chaque étape.
        </Reveal>
      </div>
      <div className="ta-reasons__body">
        <div className="ta-reasons__media">
          <video
            src={`${ASSET}/video/truck.mp4`}
            poster={`${ASSET}/video/truck-poster.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="ta-reasons__grid">
          {reasons.map((r, i) => (
            <Reveal key={r} className="ta-reason" delay={(i % 2) * 100}>
              <p>{r}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="ta-footer__link">
      {children}
      <img src={`${ASSET}/icons/arrow-up-right.svg`} alt="" width={24} height={24} className="ta-footer__link-icon" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="ta-dark" data-section="footer">
      <div className="ta-cta ta-pattern-host">
        <div className="ta-pattern ta-pattern--light ta-cta__pattern" aria-hidden />
        <div className="ta-cta__pill">
          <video
            src={`${ASSET}/video/cta-ticker.mp4`}
            poster={`${ASSET}/video/cta-ticker-poster.gif`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <ArrowButton href={links.contactQuote} label="Obtenez un devis personnalisé" arrow="light" className="ta-cta__btn" />
      </div>

      <div className="ta-footer">
        <div className="ta-footer__brand">
          <img src={`${ASSET}/images/logo-footer.png`} alt="TIM ALLIANCE – Transport International Maroc" />
        </div>
        <div className="ta-footer__main">
          <div className="ta-footer__cols">
            <div className="ta-footer__col">
              <h6>Contacts</h6>
              <FooterLink href={links.contact}>contact@timalliance.ma</FooterLink>
              {/* The source shows a different phone number on desktop and phone layouts. */}
              <FooterLink href={links.contact}>
                <span className="ta-only-wide">+212 522 105 724</span>
                <span className="ta-only-phone">+212 522 652 951</span>
              </FooterLink>
            </div>
            <div className="ta-footer__col">
              <h6>Pages</h6>
              <FooterLink href={links.services}>Services</FooterLink>
              <FooterLink href={links.fleet}>Notre flotte</FooterLink>
            </div>
            <div className="ta-footer__col">
              <h6>Entreprise</h6>
              <FooterLink href={links.about}>À propos</FooterLink>
              <FooterLink href={links.contact}>Contactez-nous</FooterLink>
            </div>
          </div>
          <div className="ta-newsletter">
            <h6>Restez informé en vous abonnant à notre newsletter.</h6>
            <form
              className="ta-newsletter__form"
              action="mailto:contact@timalliance.ma?subject=Inscription%20newsletter"
              method="post"
              encType="text/plain"
            >
              <input type="email" name="email" required placeholder="exemple@email.com" aria-label="Adresse e-mail" />
              <ArrowButton as="button" label="S'abonner" variant="outline" arrow="light" className="ta-newsletter__btn" />
            </form>
          </div>
        </div>
      </div>

      <div className="ta-subfooter">
        <p>TIM ALLIANCE - © Copyright 2025</p>
        <a href={links.privacy}>Politique de confidentialité</a>
      </div>
    </footer>
  );
}

export function TimAlliancePage() {
  return (
    <div className="ta-root">
      <Header />
      <main>
        <Hero />
        <Certifications />
        <Stats />
        <Clients />
        <WhyUs />
        <Reasons />
      </main>
      <Footer />
    </div>
  );
}
