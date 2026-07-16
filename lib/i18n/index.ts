import { notFound } from "next/navigation";
import { fr } from "./fr";
import { en } from "./en";

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type Dict = typeof fr;

const dicts: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  // Une URL comme /xx/rendez-vous arrive ici avec une locale inconnue :
  // sans garde-fou, `dicts[locale]` vaut undefined et la page renvoie une 500.
  const dict = dicts[locale];
  if (!dict) notFound();
  return dict;
}

/** Préfixe un chemin interne avec la locale : p("en", "/rendez-vous") → "/en/rendez-vous". */
export function p(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}` || `/${locale}`;
}
