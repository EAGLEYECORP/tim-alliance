/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import { ArrowButton } from "../ArrowButton";
import { PageHero } from "../PageHero";
import { Reveal } from "../Reveal";
import { SiteShell } from "../SiteShell";
import { Slideshow } from "../Slideshow";
import { ASSET, links } from "../data";
import { SectionHead, Tag } from "../ui";

const IMG = `${ASSET}/pages`;

const services = [
  {
    title: "Traction des remorques",
    images: [`${IMG}/svc-1.webp`],
    text: [
      "TIM ALLIANCE offre un service de traction de remorque avec une flotte EURO 6 moderne, garantissant flexibilité et réduction des coûts, adaptée à vos besoins ponctuels ou durables.",
      "Ce service assure un suivi en temps réel pour une gestion optimisée et transparente de votre logistique.",
    ],
  },
  {
    title: "Transport routier national & international",
    sub: "Ensembles routiers, Bâchés / Tôlés",
    images: [`${IMG}/svc-2-a.webp`, `${IMG}/svc-2-b.webp`],
    text: [
      "Ce service couvre le transport de marchandises générales y compris les biens volumineux ou palettisables.",
      "Les semi-remorques bâchées assurent une grande souplesse pour les opérations de chargement et déchargement.",
      "Des bâches spécifiques anti-intrusion garantissent une sécurité optimale.",
      "Les semi-remorques tôlées (fourgons) offrent une protection renforcée contre les intempéries et le vol parfaites pour les produits sensibles ou de grande valeur.",
    ],
  },
  {
    title: "Transport sous température dirigée",
    images: [`${IMG}/svc-3.webp`],
    text: [
      "Le respect de la chaîne du froid est crucial pour l'industrie agro-alimentaire et pharmaceutique.",
      "Notre service de transport sous température dirigée, préserve l'intégrité de vos produits sensibles.",
      "Équipées de technologies modernes, nos véhicules les maintiennent à des températures selon vos besoins, avec une traçabilité et une sécurisation complète, assurée par un suivi satellite en temps réel.",
    ],
  },
  {
    title: "Transport express national & international",
    sub: "-3.5T",
    images: [`${IMG}/svc-4.webp`],
    text: [
      "Nous assurons la connexion entre le Maroc et l'Europe par la route grâce à des solutions express en véhicules de type 2 & 3.",
      "Rapides et sécurisés, ils sont spécialement conçus pour répondre à vos délais avec ponctualité et fiabilité.",
    ],
  },
  {
    title: "Transport de matières dangereuses",
    sub: "ADR, Colisage",
    images: [`${IMG}/svc-5.webp`],
    text: [
      "Certifié ADR, TIM ALLIANCE assure un transport sécurisé des matières dangereuses respectant la réglementation en vigueur.",
      "Nos équipes formées, maîtrisent colisage, signalétique, étiquetage, pour garantir la sécurité des personnes, de l'environnement et des biens.",
    ],
  },
  {
    title: "Porte-voitures national & international",
    images: [`${IMG}/svc-6.webp`],
    text: [
      "Nous traitons chaque véhicule neuf, d'occasion ou de collection, avec respect et professionnalisme.",
      "Notre expertise garantit une manipulation soignée de l'enlèvement à la livraison pour éviter tout dommage.",
      "Nous proposons des solutions adaptées au transport d'un seul véhicule à la gestion d'une flotte entière.",
      "Nos camions porte-voitures spécialisés assurent stabilité et sécurité avec des conducteurs formés aux techniques de chargement et de conduite.",
    ],
  },
];

const sectors = [
  { name: "Aéronautique", img: "sector-1.webp", text: "Nous assurons la sécurité et la traçabilité des composants de haute précision pour l'aéronautique." },
  {
    name: "Automobile",
    img: "sector-2.webp",
    text: "Nous nous concentrons sur les protocoles de transport des pièces de rechange et des véhicules finis pour le secteur automobile.",
  },
  { name: "Fashion & textile", img: "sector-4.webp", text: "Nous maîtrisons les flux tendus pour l'industrie fashion/textile." },
  {
    name: "Agroalimentaire & pharmaceutique",
    img: "sector-5.webp",
    text: "Nous respectons les normes de la chaîne du froid pour le transport des produits agroalimentaires et pharmaceutiques.",
  },
  { name: "Matières dangereuses", img: "svc-5.webp", text: "Nous gérons la réglementation ADR pour le transport de matières dangereuses." },
];

export function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Services"
        tag="Nos services"
        title="Un transport intermodal maîtrisé pour faciliter nos échanges."
        image={`${IMG}/svc-hero.webp`}
      />

      <section className="ta-section ta-split">
        <Reveal as="h2" className="ta-split__title">
          Ensemble, connectons <span>l&apos;Afrique et l&apos;Europe.</span>
        </Reveal>
        <Reveal className="ta-split__copy">
          <p>
            Notre entreprise assure la gestion et l&apos;optimisation du transport de vos marchandises, que ce soit au Maroc
            ou vers l&apos;international.
          </p>
          <p>
            Spécialiste du transport routier, nous contrôlons tous les aspects de votre chaîne logistique de
            l&apos;enlèvement à la livraison, grâce à un service intégré.
          </p>
        </Reveal>
      </section>

      <section className="ta-section ta-services" id="services">
        <aside className="ta-services__aside">
          <Reveal>
            <Tag light>Expertises clés</Tag>
            <h2 className="ta-services__title">Nos Services</h2>
            <p className="ta-services__lead">
              Nous proposons des solutions personalisées en transport et logistique, pour accompagner la croissance de
              votre entreprise.
            </p>
            <ArrowButton href={links.contact} label="Contactez-nous" />
          </Reveal>
          <ol className="ta-services__index" aria-label="Sommaire des services">
            {services.map((s, i) => (
              <li key={s.title}>
                <a href={`#service-${i + 1}`}>
                  <em>0{i + 1}</em> {s.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <div className="ta-services__list">
          {services.map((s, i) => (
            <Reveal key={s.title} className="ta-service" as="article">
              <span id={`service-${i + 1}`} className="ta-anchor" />
              <div className="ta-service__media">
                <Slideshow images={s.images} alt={s.title} />
                <span className="ta-service__num">0{i + 1}</span>
              </div>
              <div className="ta-service__body">
                <h3>
                  {s.title}
                  {s.sub && <small>{s.sub}</small>}
                </h3>
                <ul>
                  {s.text.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ta-section ta-sectors">
        <SectionHead tag="L'expertise sectorielle de TIM ALLIANCE" title="Connaissance approfondie des secteurs.">
          <p className="ta-head__lead">
            Chez TIM ALLIANCE, nous comprenons que la logistique complexe ne peut se contenter d&apos;une simple approche.
            En tant qu&apos;experts, nous avons développé une connaissance approfondie des exigences spécifiques de votre
            secteur pour garantir une exécution de qualité.
          </p>
        </SectionHead>
        <div className="ta-sectors__grid">
          {sectors.map((s, i) => (
            <Reveal key={s.name} className="ta-sector" delay={(i % 3) * 90}>
              <img src={`${IMG}/${s.img}`} alt="" loading="lazy" />
              <div className="ta-sector__body">
                <span className="ta-sector__num">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="ta-sector ta-sector--note" delay={180}>
            <p>
              Notre approche sur mesure garantit la conformité, réduit les risques opérationnels et optimise vos coûts,
              anticipant chaque défi.
            </p>
            <ArrowButton href={links.contactQuote} label="Obtenir un devis" />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
