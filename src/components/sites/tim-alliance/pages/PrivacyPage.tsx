import { PageHero } from "../PageHero";
import { SiteShell } from "../SiteShell";
import { Toc } from "../Toc";
import { contactInfo } from "../data";

const sections = [
  {
    title: "Qui sommes-nous",
    body: (
      <p>
        Chez TIM ALLIANCE, nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Cette
        politique décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous interagissez avec
        notre site web ou nos services.
      </p>
    ),
  },
  {
    title: "Informations que nous collectons",
    body: (
      <>
        <p>Nous pouvons collecter des données personnelles et professionnelles telles que :</p>
        <ul>
          <li>Nom, adresse e-mail, numéro de téléphone et société</li>
          <li>Détails de la demande (par exemple, besoins de service)</li>
          <li>Données d&apos;utilisation du site web (adresse IP, navigateur, pages visitées)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Comment nous utilisons vos données",
    body: (
      <>
        <p>Nous utilisons vos informations pour :</p>
        <ul>
          <li>Répondre aux messages et fournir des devis</li>
          <li>Fournir et améliorer nos services</li>
          <li>Envoyer des mises à jour pertinentes (avec votre consentement)</li>
          <li>Respecter les obligations légales</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cookies et Analyses",
    body: (
      <p>
        Nous utilisons des cookies et des outils comme Google Analytics pour comprendre l&apos;utilisation du site web et
        améliorer l&apos;expérience utilisateur. Vous pouvez gérer vos préférences de cookies dans votre navigateur.
      </p>
    ),
  },
  {
    title: "Partage et Sécurité",
    body: (
      <p>
        Nous ne vendons pas vos données. Nous pouvons les partager avec des partenaires de confiance qui nous aident à gérer
        notre activité (par exemple, hébergement, messagerie électronique). Vos données sont protégées par des mesures de
        sécurité conformes aux normes du secteur.
      </p>
    ),
  },
  {
    title: "Vos droits",
    body: (
      <>
        <p>Selon votre localisation, vous pouvez :</p>
        <ul>
          <li>Accéder à vos données, les rectifier ou les supprimer ;</li>
          <li>Vous opposer au traitement ou retirer votre consentement ;</li>
          <li>Demander l&apos;exportation de vos données ;</li>
          <li>Contacter une autorité de protection des données.</li>
        </ul>
        <p>
          Pour exercer vos droits, veuillez envoyer un e-mail à <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
      </>
    ),
  },
  {
    title: "Stockage et Transferts de données",
    body: (
      <p>
        Nous conservons les données uniquement le temps nécessaire à des fins commerciales ou juridiques. Les données
        peuvent être stockées ou traitées dans l&apos;UE ou en Afrique, sous réserve de garanties appropriées.
      </p>
    ),
  },
  {
    title: "Mises à jour des politiques et contact",
    body: (
      <>
        <p>
          Nous sommes susceptibles de mettre à jour cette politique si nécessaire. La dernière version sera toujours
          disponible sur cette page.
        </p>
        <p>Contactez-nous :</p>
        <p>{contactInfo.address}</p>
        <p>
          Courriel : <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
      </>
    ),
  },
];

export function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero
        compact
        crumb="Politique de confidentialité"
        tag="Date d'entrée en vigueur : septembre 2025"
        title="Politique de confidentialité"
        lead={
          <p>
            Chez TIM ALLIANCE, nous nous engageons à protéger votre vie privée et à garantir que vos données personnelles
            soient traitées de manière responsable et transparente. Cette politique de confidentialité explique comment nous
            collectons, utilisons et protégeons vos informations lorsque vous interagissez avec notre site web ou que vous
            nous contactez directement.
          </p>
        }
      />
      <section className="ta-section ta-legal">
        <Toc items={sections.map((s, i) => ({ id: `section-${i + 1}`, label: s.title }))} />
        <div className="ta-legal__body">
          {sections.map((s, i) => (
            <article key={s.title} id={`section-${i + 1}`} className="ta-legal__section">
              <h2>
                <em>0{i + 1}</em> {s.title}
              </h2>
              {s.body}
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
