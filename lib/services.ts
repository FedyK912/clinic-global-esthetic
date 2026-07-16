/**
 * Données structurelles des soins (image, prix, durée).
 * L'ordre de chaque tableau est ALIGNÉ sur les tableaux de textes
 * correspondants de lib/i18n (face.soins / body.traitements) ; les clés
 * `key` servent de garde-fou visuel lors d'une réorganisation.
 */

export const FACE_SERVICES = [
  { key: "hydrafacial", img: "/images/soin-hydrafacial.jpg", price: "200.-" },
  { key: "laser-co2", img: "/images/soin-laser-co2.jpg", price: "550.-" },
  { key: "microneedling", img: "/images/soin-microneedling.jpg", price: "250.-" },
  { key: "carbon-peel", img: "/images/soin-carbon-peel.jpg", price: "220.-" },
  { key: "ultrasons", img: "/images/soin-ultrasons.jpg", price: "250.-" },
  { key: "radiofrequence", img: "/images/soin-radiofrequence.jpg", price: "250.-" },
] as const;

export const BODY_SERVICES = [
  {
    key: "detatouage",
    img: "/images/corps-detatouage.jpg",
    priceFr: "Dès 170.-",
    priceEn: "From 170.-",
    perSession: true,
  },
  {
    key: "emsculpt",
    img: "/images/corps-emsculpt.jpg",
    priceFr: "150.-",
    priceEn: "150.-",
    perSession: true,
  },
  {
    key: "pressotherapie",
    img: "/images/corps-pressotherapie.jpg",
    priceFr: "120.-",
    priceEn: "120.-",
    perSession: false,
  },
] as const;

export const LASER_GALLERY = [
  "/images/galerie-laser-1.jpg",
  "/images/galerie-laser-2.jpg",
  "/images/galerie-laser-3.jpg",
  "/images/galerie-laser-4.jpg",
] as const;
