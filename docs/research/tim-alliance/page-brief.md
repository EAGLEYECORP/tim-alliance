# TIM ALLIANCE homepage – page brief

Source: https://propitious-cube-434694.framer.app/ (Framer, `lang="fr"`)
Local route: `/` → `src/app/page.tsx` → `src/components/sites/tim-alliance/TimAlliancePage.tsx`

## Route map

| Source | Local | Status |
|---|---|---|
| `/` | `/` | Cloned |
| `/services`, `/notre-flotte`, `/galerie`, `/à-propos`, `/contactez-nous`, `/politique-de-confidentialité` | — | Not in scope; links point back to the source origin (`links` in `data.ts`) |

## File ownership

- `src/components/sites/tim-alliance/TimAlliancePage.tsx` – all sections
- `Header.tsx` (client) – desktop nav + phone/tablet overlay menu
- `Reveal.tsx`, `Counter.tsx` (client) – scroll reveal and count-up stats
- `ArrowButton.tsx` – Framer "pill + arrow circle" button
- `data.ts` – copy, partner logos, outbound links
- `tim-alliance.css` – all section styles, breakpoints ≥1200 / 810–1199 / ≤809
- `public/sites/tim-alliance/` – fonts, images, logos, icons, video

## Typography and colour

- Urbanist 400/500/600/700 (static woff2 files served by Framer from Fontshare), OpenType features `blwf cv03 cv04 cv09 cv11`.
- Ink `#1c1817`, orange `#f94006`, gradient `#f94006 → #ae2d04`, light panel `#f3f2f2`, sub-footer `#363130`.
- Hero H1 72/72 600; section titles 62.4, 52, 40 px 600; body 20/26 400.

## Sections (desktop 1440, top → height)

1. Header (absolute over hero, 183 tall): logo 271×175, brand text + tagline image, nav links 25.6px/700 with orange hover fill, CTA button. Below 1200px: hamburger → full-screen white menu.
2. Hero (0 → 1024): background video `hero.mp4` (Strait of Gibraltar) with Tangier-port poster, overlay `rgba(71,62,59,.6)`, per-character entrance on the title.
3. Certifications (1024 → 1568): 4 × 294px columns, 48px SVG icons.
4. Key figures (1568 → 2070): tag + title left, 2×2 stats right; count-up to 100.0%, 24/7, +1052; chevron tile band at 4% ink.
5. Clients & partners (2070 → 2506): 15-logo marquee, ~100 px/s leftward, logos contained in square frames.
6. Why us (2506 → 3519): sticky left copy (top 120) + three icon cards (271×212).
7. Reasons (3519 → 4429): grey gradient, 357×480 truck video + 2×2 white cards.
8. CTA band (177): black pill with looping truck video + "Obtenez un devis personnalisé" button on chevron pattern.
9. Footer + sub-footer: logo, three link columns, newsletter, copyright row.

## Responsive notes

- Phone hero background is 1286px tall while the hero box is 1171px, so it runs under the next section.
- Phone footer links are 25.6/700 with ↗ icons; the phone layout shows a **different phone number** (`+212 522 652 951`) than desktop (`+212 522 105 724`) – reproduced as-is.
- Phone "Pourquoi TIM ALLIANCE ?" heading is ink-coloured with an extra lead line "Chez Transport International Maroc".
- At ≥1600px, stats/clients/reasons/footer stay inside a 1440 frame while hero, certifications and why-us stretch.

## Asset map (source → local)

| Source (`framerusercontent.com`) | Local (`public/sites/tim-alliance/`) |
|---|---|
| `images/rqYrncOO5oN8Cyx0J5wpxRgKd0.png` | `images/logo-header.png` |
| `images/V34dGk59mdfch0F8uwq4wxn6ZIw.png` | `images/logo-header-mobile.png` |
| `images/NLpcEDs1g3vZ2fLW2qMZUfXsc.png` | `images/logo-menu.png` |
| `images/nha0h9mW9pIqgpDkj3f8rIg4.png` | `images/tagline.png` |
| `images/VgNta78ThDnEpjVDlvrAibAgi4s.png` | `images/logo-footer.png` |
| `images/bs0bGUTyvpLNNHjsQde3RXgP0EA.jpg` / `Lw46DpCkhvQ7Ny3JSy0qjmGE.jpg` | `images/hero-poster.jpg` / `hero-poster-mobile.jpg` |
| `images/iRgs6NRq5NGPPRBe0Yg5sdDoqk.png`, `vybgESE98ebn3rKkvjsC0A5bY8k.jpg` (actually WebP) | `images/flag-morocco.png`, `images/flag-europe.webp` |
| `images/u0tOg9…`, `Tn4qwl…`, `Sctpwp…` | `icons/visibility.png`, `control-tower.png`, `stopwatch.png` |
| `images/rkWr4L…`, `YojkX4…`, `eLNWAz…`, `mZEOKb….svg` | `icons/iso-9001.svg`, `adr.svg`, `environment.svg`, `euro-6.svg` |
| `images/3NSsh…`, `HSIDU…`, `hjSoE…`, `uZplg….svg` | `icons/arrow-light.svg`, `arrow-dark.svg`, `arrow-light-2.svg`, `arrow-up-right.svg` |
| 15 partner logos (see `partners` in `data.ts`) | `logos/*` (unidentified SVGs kept their hash: `partner-<hash>.svg`) |
| `assets/dP6Kn6L7RTJxj5PhSPmH8Afyo.mp4` | `video/hero.mp4` |
| `assets/EIF5jBYFA109FtLfstEI5ln1Vs.mp4` | `video/truck.mp4` (+ `truck-poster.jpg`, a frame extracted locally) |
| `assets/2DwnztwmbQ1pfLRynqA1Nq20.mp4`, `images/vcKbDpTGJSUx3hPfUjKZ9Eed0rA.gif` | `video/cta-ticker.mp4`, `video/cta-ticker-poster.gif` |
| Fontshare Urbanist woff2 ×4 | `fonts/urbanist-{400,500,600,700}.woff2` |

Not downloaded: `assets/NrIoij0Y7PWsp35L3koQ1KcLMM.mp4` (alternate truck cut) and the 10 MB phone poster GIF `1PtzPVNp2aQ3GAv5SoSeXVLeU.gif`.

## Comparison evidence

`docs/design-references/tim-alliance/compare-desktop-1440.jpg` and `compare-phone-390.jpg` (source left, clone right). The source header does not appear in its full-page capture (see `source-desktop-1440-top.jpg` for it), and source videos show their posters because headless Chromium cannot decode H.264.

## Redesign pass (after the 1:1 clone)

The homepage moved past pixel-matching into a premium redesign on the same DA (logo, orange `#f94006`, ink `#1c1817`, Urbanist). The 1:1 clone is preserved in git history (commit `881eaea`).

- **3D intro** (`intro/TruckIntro.tsx`, `intro/truckScene.ts`): three.js scene, lazy-loaded. A procedurally modelled white cab-over truck (black visor with the logo, branded trailer, headlights with bloom) drives head-on at a lane-level camera (telephoto start, widening lens, building shake) under an orange horizon until the logo grille fills the frame, then flash → logo lockup → curtain reveal. Plays once per browser session (`sessionStorage`), skipped for `prefers-reduced-motion`, falls back to the logo lockup without WebGL, "Passer l'intro" button + Esc. `?intro=1` forces a replay; `?introDebug=<s>` (dev only) freezes a frame.
- **Page**: fixed glass header that compacts and hides on scroll-down, Lenis smooth scroll + progress bar, cinematic hero (Ken Burns, grain, CTA pair, glass facts strip), card-based certifications, dark key-figures section, two-row logo marquee (grayscale → colour on hover), numbered trust/reason cards, oversized CTA band.
- **New copy** written for the redesign: section headings "Des normes strictes, à chaque kilomètre.", "Ils nous confient leurs marchandises.", "Parlons de votre projet", button labels "Découvrir nos services" / "Demander mon devis", badge "Notre flotte sur la route", hero facts "25+ Pays desservis" (from "plus de 25 pays") and "Maroc · Europe · Afrique".
- **Images**: originals re-fetched at full resolution; hero posters, truck poster, EU flag and small logos (TST, Aircelle, Stelia, CEVA) upscaled ×4 with Real-ESRGAN (x4plus); everything converted to WebP, logos trimmed of padding. Hero video: 858px → 1920px via Lanczos + denoise + sharpen (not AI upscaled).
- Unnamed SVG partners identified: DB Schenker, Safran Sagem, Pilatus.
