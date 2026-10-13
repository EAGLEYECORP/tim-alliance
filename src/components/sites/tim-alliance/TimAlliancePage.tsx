/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import { Fragment, type ReactNode } from "react";
import { ArrowButton } from "./ArrowButton";
import { Counter } from "./Counter";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
import { SmoothScroll } from "./SmoothScroll";
import { TruckIntro } from "./intro/TruckIntro";
import { ASSET, certifications, links, partners, reasons, trustCards } from "./data";
import "./tim-alliance.css";

/** Renders "\n" as a line break at every width. */
function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** Source copy carries hand-placed Framer line breaks; the redesign lets text wrap naturally. */
const flow = (text: string) => text.replace(/[\n|]/g, " ");

function Tag({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={light ? "ta-tag ta-tag--light" : "ta-tag"}>
      <span className="ta-tag__ring" aria-hidden />
      {children}
    </p>
  );
}

/** Splits a line into per-character spans for the staggered hero entrance. */
function AnimatedLine({ text, offset, accent = [] }: { text: string; offset: number; accent?: number[] }) {
  return text.split(" ").map((word, w, words) => {
    const before = words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
    return (
      <Fragment key={w}>
        <span className={accent.includes(w) ? "ta-word ta-word--accent" : "ta-word"}>
          {[...word].map((ch, c) => (
            <span key={c} className="ta-char" style={{ animationDelay: `${(offset + before + c) * 20}ms` }}>
              {ch}
            </span>
          ))}
        </span>
        {w < words.length - 1 && " "}
      </Fragment>
    );
  });
}

function Hero() {
  const line1 = "20 ans d'expertise transport";
  const line2 = "au service de vos marchandises.";
  return (
    <section className="ta-hero" data-section="hero">
      <div className="ta-hero__media" aria-hidden>
        <video
          className="ta-hero__video ta-hero__video--desk"
          src={`${ASSET}/video/hero-hd.mp4`}
          poster={`${ASSET}/images/hero-poster.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <video
          className="ta-hero__video ta-hero__video--phone"
          src={`${ASSET}/video/hero-hd.mp4`}
          poster={`${ASSET}/images/hero-poster-mobile.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="ta-hero__shade" aria-hidden />
      <div className="ta-hero__grain" aria-hidden />

      <div className="ta-hero__content">
        <p className="ta-hero__eyebrow ta-hero-anim">
          <span className="ta-tag__ring" aria-hidden />
          Transport International Maroc · depuis 2005
        </p>
        <h1 className="ta-hero__title" aria-label={`${line1} ${line2}`}>
          <span aria-hidden>
            <AnimatedLine text={line1} offset={0} accent={[0, 1]} />
            <br />
            <AnimatedLine text={line2} offset={line1.length + 1} />
          </span>
        </h1>
        <p className="ta-hero__sub ta-hero-anim">
          À travers l&apos;Europe et l&apos;Afrique, nous offrons un transport fiable avec un suivi en temps réel. Une
          logistique sur mesure parfaitement adaptée à votre entreprise.
        </p>
        <div className="ta-hero__actions ta-hero-anim">
          <ArrowButton href={links.contact} label="Obtenir un devis" />
          <a href={links.services} className="ta-ghost">
            Découvrir nos services
          </a>
        </div>
      </div>

      <div className="ta-hero__strip ta-hero-anim">
        <div className="ta-hero__fact">
          <strong>100%</strong>
          <span>Taux de livraison à temps</span>
        </div>
        <div className="ta-hero__fact">
          <strong>24/7</strong>
          <span>Couverture de suivi GPS</span>
        </div>
        <div className="ta-hero__fact">
          <strong>25+</strong>
          <span>Pays desservis</span>
        </div>
        <div className="ta-hero__fact ta-hero__fact--certs">
          <strong>ISO 9001 · ADR</strong>
          <span>Certifié · EURO 6</span>
        </div>
      </div>

      <a href="#engagements" className="ta-hero__scroll" aria-label="Défiler vers le contenu">
        <span>Défiler</span>
        <i aria-hidden />
      </a>
    </section>
  );
}

function SectionHead({ tag, title, light, children }: { tag: string; title: ReactNode; light?: boolean; children?: ReactNode }) {
  return (
    <Reveal className="ta-head">
      <Tag light={light}>{tag}</Tag>
      <h2 className="ta-head__title">{title}</h2>
      {children}
    </Reveal>
  );
}

function Certifications() {
  return (
    <section className="ta-section ta-certs" id="engagements" data-section="certifications">
      <SectionHead tag="Nos engagements" title={<>Des normes strictes, à chaque kilomètre.</>} />
      <div className="ta-certs__grid">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} className="ta-cert" delay={i * 90}>
            <span className="ta-cert__icon">
              <img src={`${ASSET}/icons/${cert.icon}`} alt="" width={36} height={36} />
            </span>
            <h3 className="ta-cert__title">{cert.title}</h3>
            <p className="ta-cert__body">{cert.paragraphs.map(flow).join(" ")}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="ta-section ta-stats" data-section="stats">
      <div className="ta-pattern ta-pattern--light ta-stats__pattern" aria-hidden />
      <div className="ta-stats__glow" aria-hidden />
      <div className="ta-stats__inner">
        <SectionHead tag="Chiffres clés" light title="Depuis 2005, les leaders du secteur nous accordent leur confiance." />
        <div className="ta-stats__grid">
          <Reveal className="ta-stat">
            <p className="ta-stat__num">
              <Counter to={100} decimals={1} />
              <em>%</em>
            </p>
            <p className="ta-stat__label">Taux de livraison à temps.</p>
          </Reveal>
          <Reveal className="ta-stat" delay={90}>
            <p className="ta-stat__num">
              <Counter to={24} />
              <em>/7</em>
            </p>
            <p className="ta-stat__label">Couverture de suivi GPS.</p>
          </Reveal>
          <Reveal className="ta-stat" delay={180}>
            <p className="ta-stat__num">
              <em>+</em>
              <Counter to={1052} />
            </p>
            <p className="ta-stat__label">Voyages annuels exécutés.</p>
          </Reveal>
          <Reveal className="ta-stat ta-stat--flags" delay={270}>
            <div className="ta-flags">
              <img src={`${ASSET}/images/flag-morocco.webp`} alt="Drapeau du Maroc" className="ta-flag" />
              <span className="ta-flags__link" aria-hidden />
              <img src={`${ASSET}/images/flag-europe.webp`} alt="Drapeau de l'Union européenne" className="ta-flag" />
            </div>
            <p className="ta-stat__label">Maroc · Europe · Afrique</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LogoRow({ items, reverse }: { items: typeof partners; reverse?: boolean }) {
  const row = items.map((p) => (
    <li key={p.src} className="ta-logo">
      <img src={`${ASSET}/logos/${p.src}`} alt={p.alt} loading="lazy" style={{ height: p.h }} />
    </li>
  ));
  return (
    <div className={reverse ? "ta-marquee ta-marquee--reverse" : "ta-marquee"}>
      <ul className="ta-marquee__track">
        {row}
        {items.map((p) => (
          <li key={`dup-${p.src}`} className="ta-logo" aria-hidden>
            <img src={`${ASSET}/logos/${p.src}`} alt="" loading="lazy" style={{ height: p.h }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Clients() {
  const half = Math.ceil(partners.length / 2);
  return (
    <section className="ta-section ta-clients" data-section="clients">
      <SectionHead tag="Clients & partenaires" title="Ils nous confient leurs marchandises." />
      <div className="ta-clients__rows" aria-label="Clients et partenaires">
        <LogoRow items={partners.slice(0, half)} />
        <LogoRow items={partners.slice(half)} reverse />
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="ta-section ta-why" data-section="why-us">
      <div className="ta-why__left">
        <Reveal as="h2" className="ta-why__title">
          TIM ALLIANCE <br />
          <span>20 ans d&apos;expertise</span>
        </Reveal>
        <Reveal as="h3" className="ta-why__subtitle">
          Pourquoi les grandes entreprises nous font confiance ?
        </Reveal>
        <Reveal className="ta-why__copy">
          <p className="ta-why__lead">
            TIM ALLIANCE, est bien plus qu&apos;une société de transport et de logistique. Nous sommes un véritable
            partenaire stratégique pour accompagner la croissance de votre entreprise.
          </p>
          <p>
            Nous sommes portés par des valeurs de fiabilité, d&apos;efficacité et d&apos;engagement, nous mettons à votre
            disposition notre expertise en gestion de la chaîne d&apos;approvisionnement ainsi qu&apos;une équipe de
            professionnels passionnés afin de vous proposer des solutions sur mesure et un accompagnement personnalisé.
          </p>
          <p>
            Notre objectif est clair : dépasser vos attentes en vous offrant des services logistiques innovants,
            performants et de qualité supérieure.
          </p>
          <p>
            Avec TIM ALLIANCE, ouvrez votre entreprise à de nouveaux enjeux commerciaux et dynamisez votre croissance.
          </p>
        </Reveal>
        <ArrowButton href={links.about} label="En savoir plus sur nous" variant="outline" arrow="dark" className="ta-why__btn" />
      </div>
      <div className="ta-why__cards">
        {trustCards.map((card, i) => (
          <Reveal key={card.icon} className="ta-trust" delay={i * 110}>
            <span className="ta-trust__num">0{i + 1}</span>
            <span className="ta-trust__icon">
              <img src={`${ASSET}/icons/${card.icon}`} alt="" />
            </span>
            <p>
              <Lines text={card.title.replace(/\n/g, " ")} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="ta-section ta-reasons" data-section="reasons">
      <div className="ta-reasons__head">
        <Reveal as="h2" className="ta-reasons__title">
          Pourquoi <span>TIM ALLIANCE&nbsp;?</span>
        </Reveal>
        <Reveal as="p" className="ta-reasons__lead">
          Chez Transport International Maroc, nous garantissons à nos clients une livraison sûre et efficace à chaque
          étape.
        </Reveal>
      </div>
      <div className="ta-reasons__body">
        <Reveal className="ta-reasons__media">
          <video
            src={`${ASSET}/video/truck.mp4`}
            poster={`${ASSET}/video/truck-poster.webp`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="ta-reasons__badge">
            <img src={`${ASSET}/images/logo-header.webp`} alt="" />
            <span>Notre flotte sur la route</span>
          </div>
        </Reveal>
        <div className="ta-reasons__grid">
          {reasons.map((r, i) => (
            <Reveal key={r} className="ta-reason" delay={(i % 2) * 110}>
              <span className="ta-reason__num">0{i + 1}</span>
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
      <span>{children}</span>
      <img src={`${ASSET}/icons/arrow-up-right.svg`} alt="" width={18} height={18} />
    </a>
  );
}

function Footer() {
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
        <div className="ta-cta__road" aria-hidden>
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
      </div>

      <div className="ta-footer">
        <div className="ta-footer__brand">
          <img src={`${ASSET}/images/logo-footer.webp`} alt="TIM ALLIANCE – Transport International Maroc" />
        </div>
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
          <form
            className="ta-newsletter__form"
            action="mailto:contact@timalliance.ma?subject=Inscription%20newsletter"
            method="post"
            encType="text/plain"
          >
            <input type="email" name="email" required placeholder="exemple@email.com" aria-label="Adresse e-mail" />
            <ArrowButton as="button" label="S'abonner" />
          </form>
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
      <TruckIntro />
      <SmoothScroll />
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
