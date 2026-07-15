import { fr } from "./fr";
import { en } from "./en";

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type Dict = typeof fr;

const dicts: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}

/** Préfixe un chemin interne avec la locale : p("en", "/rendez-vous") → "/en/rendez-vous". */
export function p(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}` || `/${locale}`;
}
