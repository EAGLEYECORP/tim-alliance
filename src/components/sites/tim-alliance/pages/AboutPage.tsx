/* eslint-disable @next/next/no-img-element -- static exported assets, sized in CSS */
import { PageHero } from "../PageHero";
import { Reveal } from "../Reveal";
import { SiteShell } from "../SiteShell";
import { Certifications, Clients } from "../TimAlliancePage";
import { Timeline, type Milestone } from "../Timeline";
import { ASSET } from "../data";
import { SectionHead } from "../ui";

const IMG = `${ASSET}/pages`;

const history: Milestone[] = [
  { year: "2005", text: "Création de TIM ALLIANCE" },
  { year: "2007", text: "Acquisition stratégique d'une flotte adaptée à la traction internationale" },
  { year: "2009", text: "Création du département transport finish véhicule (portes-voitures)" },
  { year: "2015", text: "Développement de l'activité transport de marchandises (fourgons tôlés, remorques tautliner)" },
  { year: "2019", text: "Création du département transport sous température dirigée (remorques frigos)" },
  { year: "2022", text: "Création de l'unité maintenance et lavage" },
  { year: "2030", text: "Création de filiales en Europe pour asseoir notre expertise sur le corridor Maroc", future: true },
];

export function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="À propos"
        tag="À propos de nous"
        title="L'expertise, au cœur de notre logistique"
        video={`${IMG}/about-hero.mp4`}
        image={`${IMG}/about-poster.webp`}
        lead={
          <p>
            Notre métier est de vous apporter une solution professionnelle de transport, en prenant en considération la
            typologie des marchandises et vos impératifs de livraison, afin d&apos;aboutir à une prestation optimale.
          </p>
        }
      />

      <section className="ta-section ta-history">
        <div className="ta-history__head">
          <SectionHead tag="Depuis 2005" title={<>Notre histoire</>} />
          <Reveal className="ta-history__flags">
            <img src={`${ASSET}/images/flag-morocco.webp`} alt="Drapeau du Maroc" className="ta-flag" />
            <span className="ta-flags__link" aria-hidden />
            <img src={`${ASSET}/images/flag-europe.webp`} alt="Drapeau de l'Union européenne" className="ta-flag" />
          </Reveal>
        </div>
        <Timeline items={history} />
      </section>

      <Certifications />
      <Clients />
    </SiteShell>
  );
}
