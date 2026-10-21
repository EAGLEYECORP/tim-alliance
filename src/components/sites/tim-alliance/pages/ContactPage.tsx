/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import { PageHero } from "../PageHero";
import { Reveal } from "../Reveal";
import { SiteShell } from "../SiteShell";
import { ContactForm } from "../forms";
import { ASSET, contactInfo } from "../data";
import { Tag } from "../ui";

const IMG = `${ASSET}/pages`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.mapsQuery)}`;

export function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Contact"
        tag="Contactez-nous"
        title="Logistique sur mesure, adaptée à vos besoins"
        image={`${IMG}/contact-2.webp`}
        lead={
          <p>
            Que vous recherchiez un devis, que vous ayez une question spécifique ou que vous souhaitiez simplement découvrir
            comment nous pouvons répondre à vos besoins logistiques, nous sommes là pour vous aider.
          </p>
        }
      />

      <section className="ta-section ta-contact" id="contacts">
        <div className="ta-contact__info">
          <Reveal>
            <Tag>Nos coordonnées</Tag>
            <h2 className="ta-contact__title">Parlons de votre prochaine expédition.</h2>
          </Reveal>
          <Reveal className="ta-contact__cards" delay={80}>
            <a className="ta-contact-card" href={`mailto:${contactInfo.email}`}>
              <span className="ta-contact-card__label">E-mail</span>
              <strong>{contactInfo.email}</strong>
            </a>
            <a className="ta-contact-card" href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
              <span className="ta-contact-card__label">Téléphone</span>
              <strong>{contactInfo.phone}</strong>
            </a>
            <a className="ta-contact-card ta-contact-card--wide" href={mapsUrl} target="_blank" rel="noreferrer">
              <span className="ta-contact-card__label">Adresse</span>
              <strong>{contactInfo.address}</strong>
              <em>Ouvrir dans Google Maps ↗</em>
            </a>
          </Reveal>
          <Reveal className="ta-contact__photos" delay={160}>
            <img src={`${IMG}/contact-1.webp`} alt="Utilitaire TIM ALLIANCE à quai" loading="lazy" />
            <img src={`${IMG}/contact-2.webp`} alt="Alignement de tracteurs de la flotte" loading="lazy" />
          </Reveal>
        </div>
        <Reveal className="ta-contact__form-card">
          <p className="ta-contact__eyebrow">Contactez-nous.</p>
          <h2>Lancez la conversation.</h2>
          <ContactForm />
        </Reveal>
      </section>
    </SiteShell>
  );
}
