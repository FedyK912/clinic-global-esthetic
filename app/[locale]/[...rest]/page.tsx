import { notFound } from "next/navigation";

/** Toute URL inconnue sous /fr ou /en affiche la page 404 stylée. */
export default function CatchAll() {
  notFound();
}
