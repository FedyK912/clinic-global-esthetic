"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { p, type Dict, type Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";

/**
 * Barre de conversion fixe en bas d'écran mobile : réserver / appeler.
 * Masquée sur la page rendez-vous (le formulaire y est déjà l'action) et
 * dans le tiroir de navigation (z-index inférieur).
 */
export default function MobileCtaBar({ locale, t }: { locale: Locale; t: Dict["nav"] }) {
  const pathname = usePathname();
  if (pathname.includes("/rendez-vous")) return null;

  return (
    <div className="mobile-cta-bar">
      <Link href={p(locale, "/rendez-vous")} className="bar-book">
        {t.bookCtaShort}
      </Link>
      <a href={`tel:${CONTACT.phone}`} className="bar-call">
        {t.callCta}
      </a>
    </div>
  );
}
