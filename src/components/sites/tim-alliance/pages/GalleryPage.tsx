import { GalleryGrid, type GalleryItem } from "../GalleryGrid";
import { PageHero } from "../PageHero";
import { SiteShell } from "../SiteShell";
import { ASSET } from "../data";

const IMG = `${ASSET}/pages`;

const items: GalleryItem[] = [
  { src: `${IMG}/gallery-2.webp`, alt: "Porte-voitures TIM ALLIANCE en chargement", wide: true },
  { src: `${IMG}/gallery-3.webp`, alt: "Porte-voitures TIM ALLIANCE sur la route" },
  { src: `${IMG}/gallery-9.webp`, alt: "Utilitaire express TIM ALLIANCE" },
  { src: `${IMG}/gallery-4.webp`, alt: "Chargements de marchandises palettisées", wide: true },
  { src: `${IMG}/fleet-3-b.webp`, alt: "Remorque tôlée MEGA TIM ALLIANCE" },
  { src: `${IMG}/gallery-5.webp`, alt: "Chargements et caisses bois", wide: true },
  { src: `${IMG}/fleet-2-a.webp`, alt: "Remorques bâchées anti-intrusion" },
  { src: `${IMG}/svc-1.webp`, alt: "Tracteurs DAF de la flotte" },
  { src: `${IMG}/gallery-6.webp`, alt: "Transport de vêtements suspendus", wide: true },
  { src: `${IMG}/fleet-5.webp`, alt: "Remorque sous température dirigée" },
  { src: `${IMG}/gallery-7.webp`, alt: "Opérations de chargement", wide: true },
  { src: `${IMG}/svc-5.webp`, alt: "Transport de matières dangereuses ADR" },
  { src: `${IMG}/gallery-8.webp`, alt: "Chargements spéciaux", wide: true },
  { src: `${IMG}/fleet-6-a.webp`, alt: "Solution express Maroc – Europe" },
  { src: `${IMG}/svc-6.webp`, alt: "Porte-voitures national & international" },
  { src: `${IMG}/fleet-7-a.webp`, alt: "Porte-voitures chargé" },
  { src: `${IMG}/svc-3.webp`, alt: "Visuel de la remorque frigorifique TIM ALLIANCE" },
  { src: `${IMG}/gallery-1.webp`, alt: "Véhicule de collection" },
];

export function GalleryPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Galerie"
        tag="Galerie"
        title="TIM ALLIANCE en images"
        image={`${IMG}/gallery-2.webp`}
        lead={<p>Notre flotte, nos chargements et nos équipes sur les routes du Maroc et de l&apos;Europe.</p>}
      />
      <section className="ta-section ta-gallery-section">
        <GalleryGrid items={items} />
      </section>
    </SiteShell>
  );
}
