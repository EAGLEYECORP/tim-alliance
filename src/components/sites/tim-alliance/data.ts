export const SOURCE_ORIGIN = "https://propitious-cube-434694.framer.app";
export const ASSET = "/sites/tim-alliance";

/** Pages that exist on the source but are not cloned yet; link back to the source. */
export const links = {
  home: "/",
  about: `${SOURCE_ORIGIN}/à-propos`,
  services: `${SOURCE_ORIGIN}/services`,
  fleet: `${SOURCE_ORIGIN}/notre-flotte`,
  gallery: `${SOURCE_ORIGIN}/galerie`,
  contact: `${SOURCE_ORIGIN}/contactez-nous`,
  contactQuote: `${SOURCE_ORIGIN}/contactez-nous#contacts`,
  privacy: `${SOURCE_ORIGIN}/politique-de-confidentialité`,
};

export const certifications = [
  {
    icon: "iso-9001.svg",
    title: "ISO 9001:2015",
    // "\n" marks desktop-only line breaks, "|" breaks at every width.
    paragraphs: [
      "Nos opérations suivent\ndes normes strictes de\ngestion de la qualité",
      "garantissant la cohérence",
      "l’efficacité et la satisfaction|du client à chaque étape.",
    ],
  },
  {
    icon: "adr.svg",
    title: "Certification ADR",
    paragraphs: [
      "Nous respectons les normes\nde transport de marchandises\npour garantir l’intégrité\net la sécurité logistique\ninternationale tout au long de\nla chaîne d’approvisionnement.",
    ],
  },
  {
    icon: "environment.svg",
    title: "Conformité environnementale",
    paragraphs: [
      "Engagement envers des pratiques logistiques durables qui répondent aux réglementations internationales en matière d’environnement et de sécurité.",
    ],
  },
  {
    icon: "euro-6.svg",
    title: "EURO 6",
    paragraphs: [
      "Cruciale pour l'industrie du transport, car elle impose aux camions des technologies avancées pour affirmer notre engagement de la logistique en faveur d'un avenir plus écologique.",
    ],
  },
];

/** Logo ticker items in source order; `box` is the square frame the logo is contained in. */
export const partners = [
  { src: "safran.png", alt: "Safran", box: 339 },
  { src: "mecachrome.png", alt: "Mecachrome", box: 435 },
  { src: "stelia.png", alt: "Stelia Aerospace", box: 365 },
  { src: "airbus.png", alt: "Airbus", box: 304 },
  { src: "partner-68cGU.svg", alt: "Partenaire", box: 304 },
  { src: "partner-gOImP.svg", alt: "Partenaire", box: 304 },
  { src: "aircelle.png", alt: "Aircelle – Groupe Safran", box: 304 },
  { src: "ceva.png", alt: "CEVA Logistics", box: 304 },
  { src: "partner-7nU1s.svg", alt: "Partenaire", box: 440 },
  { src: "daher.png", alt: "Daher", box: 361 },
  { src: "ziegler.png", alt: "Ziegler", box: 272 },
  { src: "dachser.png", alt: "Dachser", box: 251 },
  { src: "tst.png", alt: "TST", box: 235 },
  { src: "stellantis.png", alt: "Stellantis", box: 630 },
  { src: "renault.png", alt: "Renault", box: 304 },
];

export const trustCards = [
  { icon: "visibility.png", w: 122, h: 88, title: "Visibilité des expéditions\nen temps réel" },
  { icon: "control-tower.png", w: 120, h: 108, title: "Tour de controle\nde sécurité" },
  { icon: "stopwatch.png", w: 217, h: 101, title: "Livraison respectant\nvos délais dans\nplus de 25 pays" },
];

export const reasons = [
  "Large gamme de services de transport disponible",
  "Un support disponible 24/24 pour gérer vos opérations et vous fournir des rapports d'information en temps réel",
  "Reconnaissance sur le marché, auprès d'une clientèle de renommée",
  "Possibilité d'être l'unique point de contact pour tous vos besoins de transport en collaborant avec nos partenaires transitaires",
];
