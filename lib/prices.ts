import type { Locale } from "./i18n";

export type PriceValue = number | { fr: string; en: string };

export type PriceRow = {
  fr: string;
  en: string;
  price: PriceValue;
};

export type PriceCategory = {
  cat: { fr: string; en: string };
  rows: PriceRow[];
};

export type Gender = "femmes" | "hommes";

export const PRICES: Record<Gender, PriceCategory[]> = {
  femmes: [
    {
      cat: { fr: "Visage & cou", en: "Face & neck" },
      rows: [
        { fr: "Lèvre supérieure", en: "Upper lip", price: 65 },
        { fr: "Menton", en: "Chin", price: 80 },
        { fr: "Lèvre supérieure + menton", en: "Upper lip + chin", price: 140 },
        { fr: "Bas du visage (pattes)", en: "Lower face (sideburns)", price: 90 },
        { fr: "Ovale du visage", en: "Full face contour", price: 220 },
        { fr: "Cou", en: "Neck", price: 65 },
        { fr: "Nuque", en: "Nape of the neck", price: 90 },
      ],
    },
    {
      cat: { fr: "Mains, pieds & petites zones", en: "Hands, feet & small areas" },
      rows: [
        { fr: "Doigts seuls", en: "Fingers only", price: 55 },
        { fr: "Orteils", en: "Toes", price: 55 },
        { fr: "Mains + doigts", en: "Hands + fingers", price: 85 },
        { fr: "Pieds", en: "Feet", price: 65 },
        { fr: "Ligne sous-ombilicale", en: "Lower belly line", price: 60 },
        { fr: "Aréoles mammaires", en: "Areolas", price: 65 },
      ],
    },
    {
      cat: { fr: "Aisselles & bras", en: "Underarms & arms" },
      rows: [
        { fr: "Aisselles", en: "Underarms", price: 80 },
        { fr: "Avant-bras", en: "Forearms", price: 120 },
        { fr: "Bras complets", en: "Full arms", price: 180 },
      ],
    },
    {
      cat: { fr: "Maillot & zone intime", en: "Bikini & intimate area" },
      rows: [
        { fr: "Sillon inter-fessier (SIF)", en: "Buttock crease", price: 55 },
        { fr: "Maillot brésilien", en: "Brazilian bikini", price: 145 },
        { fr: "Maillot intégral", en: "Full bikini (Hollywood)", price: 170 },
        { fr: "Fesses seules", en: "Buttocks only", price: 140 },
        { fr: "Fesses + SIF", en: "Buttocks + crease", price: 160 },
        { fr: "Maillot intégral + SIF + aisselles", en: "Full bikini + crease + underarms", price: 250 },
        { fr: "Maillot bikini + SIF + aisselles", en: "Classic bikini + crease + underarms", price: 210 },
        { fr: "Maillot brésilien + SIF + aisselles", en: "Brazilian + crease + underarms", price: 220 },
      ],
    },
    {
      cat: { fr: "Jambes", en: "Legs" },
      rows: [
        { fr: "Demi-jambes", en: "Half legs", price: 210 },
        { fr: "Demi-jambes + genoux", en: "Half legs + knees", price: 220 },
        { fr: "Cuisses seules", en: "Thighs only", price: 280 },
        { fr: "3/4 jambes", en: "3/4 legs", price: 320 },
        { fr: "Jambes complètes", en: "Full legs", price: 420 },
      ],
    },
    {
      cat: { fr: "Packs jambes + maillot + aisselles", en: "Legs + bikini + underarms packages" },
      rows: [
        { fr: "Demi-jambes + maillot brésilien + SIF + aisselles", en: "Half legs + Brazilian + crease + underarms", price: 295 },
        { fr: "Demi-jambes + maillot intégral + SIF + aisselles", en: "Half legs + full bikini + crease + underarms", price: 320 },
        { fr: "Jambes complètes + maillot bikini + SIF + aisselles", en: "Full legs + classic bikini + crease + underarms", price: 480 },
        { fr: "Jambes + maillot brésilien + SIF + aisselles", en: "Full legs + Brazilian + crease + underarms", price: 485 },
        { fr: "Jambes complètes + maillot intégral + SIF + aisselles", en: "Full legs + full bikini + crease + underarms", price: 520 },
      ],
    },
  ],
  hommes: [
    {
      cat: { fr: "Visage & tête", en: "Face & head" },
      rows: [
        { fr: "Contour du visage", en: "Face contour", price: 125 },
        { fr: "Sourcils", en: "Eyebrows", price: 70 },
        { fr: "Oreilles", en: "Ears", price: 60 },
        { fr: "Nez", en: "Nose", price: 60 },
        { fr: "Joues", en: "Cheeks", price: 80 },
        { fr: "Pattes", en: "Sideburns", price: 65 },
        { fr: "Lèvre supérieure", en: "Upper lip", price: 65 },
        { fr: "Lèvre inférieure", en: "Lower lip", price: 65 },
        { fr: "Menton", en: "Chin", price: 65 },
        { fr: "Barbe", en: "Beard", price: 95 },
        { fr: "Scalp", en: "Scalp", price: 210 },
      ],
    },
    {
      cat: { fr: "Cou & nuque", en: "Neck & nape" },
      rows: [
        { fr: "Haut du cou", en: "Upper neck", price: 55 },
        { fr: "Nuque", en: "Nape", price: 70 },
        { fr: "Cou + nuque", en: "Neck + nape", price: 140 },
        {
          fr: "Bas du cou",
          en: "Lower neck",
          price: { fr: "Inclus en pack torse", en: "Included in chest package" },
        },
      ],
    },
    {
      cat: { fr: "Mains, pieds & petites zones", en: "Hands, feet & small areas" },
      rows: [
        { fr: "Doigts", en: "Fingers", price: 60 },
        { fr: "Mains", en: "Hands", price: 65 },
        { fr: "Pieds", en: "Feet", price: 55 },
        { fr: "Genoux", en: "Knees", price: 65 },
        { fr: "Ligne sous-ombilicale", en: "Lower belly line", price: 65 },
        { fr: "Aréoles mammaires", en: "Areolas", price: 65 },
        { fr: "Testicules", en: "Testicles", price: 85 },
      ],
    },
    {
      cat: { fr: "Bras & aisselles", en: "Arms & underarms" },
      rows: [
        { fr: "Aisselles", en: "Underarms", price: 80 },
        { fr: "Haut des bras", en: "Upper arms", price: 90 },
        { fr: "Avant-bras", en: "Forearms", price: 90 },
        { fr: "3/4 bras + mains", en: "3/4 arms + hands", price: 160 },
        { fr: "Bras complets", en: "Full arms", price: 185 },
        { fr: "Aisselles + épaules", en: "Underarms + shoulders", price: 220 },
      ],
    },
    {
      cat: { fr: "Maillot & zone intime", en: "Intimate area" },
      rows: [
        { fr: "Maillot (pubis)", en: "Pubic area", price: 90 },
        { fr: "Sillon inter-fessier (SIF)", en: "Buttock crease", price: 80 },
        { fr: "Fesses", en: "Buttocks", price: 140 },
        { fr: "Fesses + SIF", en: "Buttocks + crease", price: 160 },
        { fr: "Maillot intégral + SIF", en: "Full intimate + crease", price: 180 },
      ],
    },
    {
      cat: { fr: "Torse, ventre & dos", en: "Chest, stomach & back" },
      rows: [
        { fr: "Torse", en: "Chest", price: 190 },
        { fr: "Ventre", en: "Stomach", price: 140 },
        { fr: "Torse + ventre", en: "Chest + stomach", price: 280 },
        { fr: "Torse + bas du cou", en: "Chest + lower neck", price: 250 },
        { fr: "Torse + bas du cou + ventre", en: "Chest + lower neck + stomach", price: 320 },
        { fr: "Bas du dos", en: "Lower back", price: 160 },
        { fr: "Haut du dos sans épaules", en: "Upper back without shoulders", price: 160 },
        { fr: "Haut du dos avec épaules", en: "Upper back with shoulders", price: 280 },
        { fr: "3/4 dos", en: "3/4 back", price: 240 },
        { fr: "Torse + ventre + dos complet + épaules", en: "Chest + stomach + full back + shoulders", price: 650 },
      ],
    },
    {
      cat: { fr: "Jambes", en: "Legs" },
      rows: [
        { fr: "Cuisses", en: "Thighs", price: 280 },
        { fr: "1/2 jambes", en: "Half legs", price: 310 },
        { fr: "3/4 jambes", en: "3/4 legs", price: 380 },
        { fr: "3/4 jambes + genoux + pieds", en: "3/4 legs + knees + feet", price: 450 },
        { fr: "Jambes complètes", en: "Full legs", price: 440 },
      ],
    },
  ],
};

export function priceLabel(value: PriceValue, locale: Locale): string {
  if (typeof value === "number") {
    return `${value.toFixed(0)}.-${locale === "fr" ? " / séance" : " / session"}`;
  }
  return value[locale];
}
