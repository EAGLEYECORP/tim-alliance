/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import { ArrowButton } from "../ArrowButton";
import { Counter } from "../Counter";
import { PageHero } from "../PageHero";
import { Reveal } from "../Reveal";
import { SiteShell } from "../SiteShell";
import { Slideshow } from "../Slideshow";
import { ASSET, links } from "../data";
import { SectionHead, Tag } from "../ui";

const IMG = `${ASSET}/pages`;

const categories = [
  {
    title: "Tracteurs Routiers",
    images: [`${IMG}/fleet-1.webp`],
    points: [
      "Investissement régulier dans une flotte moderne de tracteurs routiers de type EURO 6",
      "Flotte adaptée aux exigences du transport international longue distance",
    ],
  },
  {
    title: "Remorques bâchées",
    accent: "ANTI-INTRUSION",
    images: [`${IMG}/fleet-2-a.webp`, `${IMG}/fleet-2-b.webp`],
    points: [
      "Remorques tautliner standard",
      "Remorques tautliner MEGA",
      "Bâches anti-intrusion (câbles aciers & maillage métallique)",
    ],
  },
  {
    title: "Remorques tôlées MEGA",
    images: [`${IMG}/fleet-3-a.webp`, `${IMG}/fleet-3-b.webp`],
    points: [
      "Disponible en fourgon standard pour du General Cargo ou en double planchers",
      "Remorques conformes à l'ADR pour le transport de matières dangereuses",
    ],
  },
  {
    title: "Remorques tôlées équipées suspendu",
    images: [`${IMG}/fleet-4.webp`],
    points: [
      "Notre parc est adapté au transport de vêtements suspendus textile et industrie Fashion",
      "Chargement offrant flexibilité, polyvalence, efficacité ergonomie et sécurité",
    ],
  },
  {
    title: "Remorques sous température dirigée",
    images: [`${IMG}/fleet-5.webp`],
    points: ["Plage de température : –28 °C à +25 °C", "Surveillance de la température et de l'humidité en temps réel"],
  },
  {
    title: "Solutions Express",
    images: [`${IMG}/fleet-6-a.webp`, `${IMG}/fleet-6-b.webp`, `${IMG}/fleet-6-c.webp`],
    points: [
      "Connecter le Maroc et l'Europe par la route",
      "Des véhicules Express de type 2 & 3 pour répondre à vos délais avec ponctualité et fiabilité",
    ],
  },
  {
    title: "Porte-Voitures",
    images: [`${IMG}/fleet-7-a.webp`, `${IMG}/fleet-7-b.webp`],
    points: [],
  },
];

export function FleetPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Notre flotte"
        tag="Présentation"
        title="Notre Flotte en mouvement"
        image={`${IMG}/fleet-hero.webp`}
        lead={
          <p>
            Des véhicules dotés d&apos;une technologie avancée, spécialement conçus pour déplacer votre fret rapidement et en
            toute sécurité.
          </p>
        }
      />

      <section className="ta-section ta-stats ta-fleet-stats">
        <div className="ta-pattern ta-pattern--light ta-stats__pattern" aria-hidden />
        <div className="ta-stats__glow" aria-hidden />
        <div className="ta-stats__inner">
          <SectionHead
            tag="En chiffres"
            light
            title="Une flotte diversifiée au service de nos clients en Europe et en Afrique."
          />
          <div className="ta-stats__grid">
            <Reveal className="ta-stat">
              <p className="ta-stat__num">
                <Counter to={12} />
                <em>+</em>
              </p>
              <p className="ta-stat__label">Total des véhicules.</p>
            </Reveal>
            <Reveal className="ta-stat" delay={90}>
              <p className="ta-stat__num">
                <Counter to={12} />
                <em>+</em>
              </p>
              <p className="ta-stat__label">Semi-remorques.</p>
            </Reveal>
            <Reveal className="ta-stat" delay={180}>
              <p className="ta-stat__num">
                <Counter to={47} />
                <em>%</em>
              </p>
              <p className="ta-stat__label">Unités conformité ADR.</p>
            </Reveal>
            <Reveal className="ta-stat ta-stat--flags" delay={270}>
              <div className="ta-flags">
                <img src={`${ASSET}/images/flag-morocco.webp`} alt="Drapeau du Maroc" className="ta-flag" />
                <span className="ta-flags__link" aria-hidden />
                <img src={`${ASSET}/images/flag-europe.webp`} alt="Drapeau de l'Union européenne" className="ta-flag" />
              </div>
              <p className="ta-stat__label">Europe · Afrique</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="ta-section ta-categories">
        <aside className="ta-categories__aside">
          <Reveal>
            <Tag light>Catégories de véhicules</Tag>
            <h2 className="ta-categories__title">La polyvalence est au cœur de notre métier</h2>
            <p>
              Chez TIM ALLIANCE, la polyvalence est essentielle. Notre flotte est stratégiquement diversifiée pour répondre à
              l&apos;ensemble des besoins de transport, du fret industriel lourd aux livraisons urgentes sous chaîne du froid
              en passant par la distribution urbaine rapide.
            </p>
            <p>
              Que vous transportiez des matières premières, des biens de consommation ou des marchandises spécialisées, nous
              avons le véhicule adéquat pour garantir sécurité, conformité et ponctualité.
            </p>
            <ul className="ta-checks">
              <li>
                Nous avons les véhicules adéquats pour garantir une livraison fiable via des hubs logistiques sur toute
                l&apos;Europe
              </li>
              <li>
                Notre expertise vous confère sécurité et conformité optimisée dans le respect des normes de poids et de
                prévention routière internationale
              </li>
            </ul>
            <ArrowButton href={links.contactQuote} label="Utilisez notre Flotte" variant="outline" arrow="light" className="ta-btn--on-orange" />
          </Reveal>
        </aside>
        <div className="ta-categories__list">
          {categories.map((c, i) => (
            <Reveal key={c.title} className="ta-vehicle" as="article">
              <header>
                <span className="ta-vehicle__num">0{i + 1}</span>
                <h3>
                  {c.title} {c.accent && <span>{c.accent}</span>}
                </h3>
              </header>
              <div className="ta-vehicle__media">
                <Slideshow images={c.images} alt={c.title} />
              </div>
              {c.points.length > 0 && (
                <ul className="ta-checks ta-checks--dark">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ta-section ta-tracking">
        <SectionHead tag="Suivi GPS" title="Le fret sous contrôle, la sécurité et la route en temps réel.">
          <p className="ta-head__lead">
            Chaque véhicule est doté d&apos;un traceur GPS, vous garantissant une géolocalisation en temps réel ainsi
            qu&apos;un suivi précis pour renforcer la sécurité et assurer un tracking de vos marchandises en toute
            transparence.
          </p>
        </SectionHead>
        <Reveal className="ta-tracking__map">
          <img src={`${IMG}/fleet-map.webp`} alt="Carte des liaisons routières TIM ALLIANCE entre le Maroc et l'Europe" loading="lazy" />
          <span className="ta-tracking__ping" style={{ left: "22%", top: "79%" }} aria-hidden />
          <span className="ta-tracking__ping" style={{ left: "53%", top: "36%" }} aria-hidden />
          <span className="ta-tracking__ping" style={{ left: "66%", top: "30%" }} aria-hidden />
        </Reveal>
      </section>
    </SiteShell>
  );
}
