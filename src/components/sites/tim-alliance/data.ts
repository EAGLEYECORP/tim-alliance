export const ASSET = "/sites/tim-alliance";

/** Site routes. Trailing slashes match the static export (`trailingSlash: true`). */
export const links = {
  home: "/",
  about: "/a-propos/",
  services: "/services/",
  fleet: "/notre-flotte/",
  gallery: "/galerie/",
  contact: "/contactez-nous/",
  contactQuote: "/contactez-nous/#contacts",
  privacy: "/politique-de-confidentialite/",
};

export const contactInfo = {
  email: "contact@timalliance.ma",
  // Confirmed by the Google Business listing (05 22 10 57 24, Lot 27/28 Lotissement Kadiria).
  phone: "+212 522 105 724",
  address: "Zone industrielle Lissasfa, 27/28 lot. Al Kadiria, 3° étg. bur. n° 16, 20230 Casablanca - Maroc",
  mapsQuery: "TIM ALLIANCE, Lot 27/28 Lotissement Kadiria, Casablanca 20230",
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

/** Logo marquee items in source order; `h` is the rendered height so mixed aspect ratios read evenly. */
export const partners = [
  { src: "safran.webp", alt: "Safran", h: 40 },
  { src: "mecachrome.webp", alt: "Mecachrome", h: 44 },
  { src: "stelia.webp", alt: "Stelia Aerospace", h: 40 },
  { src: "airbus.webp", alt: "Airbus", h: 64 },
  { src: "pilatus.svg", alt: "Pilatus", h: 34 },
  { src: "safran-sagem.svg", alt: "Safran Sagem", h: 50 },
  { src: "aircelle.webp", alt: "Aircelle – Groupe Safran", h: 44 },
  { src: "ceva.webp", alt: "CEVA Logistics", h: 42 },
  { src: "db-schenker.svg", alt: "DB Schenker", h: 36 },
  { src: "daher.webp", alt: "Daher", h: 34 },
  { src: "ziegler.webp", alt: "Ziegler", h: 32 },
  { src: "dachser.webp", alt: "Dachser", h: 48 },
  { src: "tst.webp", alt: "TST – Transit Service Transport", h: 48 },
  { src: "stellantis.webp", alt: "Stellantis", h: 34 },
  { src: "renault.webp", alt: "Renault", h: 64 },
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
