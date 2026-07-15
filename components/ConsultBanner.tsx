import Link from "next/link";
import { p, type Dict, type Locale } from "@/lib/i18n";

/** Bannière « première consultation gratuite » — l'appel à l'action clé du site. */
export default function ConsultBanner({
  locale,
  t,
}: {
  locale: Locale;
  t: Dict["common"];
}) {
  return (
    <div className="consult-banner">
      <div>
        <div className="badge-free">
          <span className="pulse-dot" aria-hidden="true"></span>
          {t.freeBadge}
        </div>
        <h3>{t.consultTitle}</h3>
        <p>{t.consultText}</p>
      </div>
      <Link href={p(locale, "/rendez-vous")} className="btn btn-laser">
        {t.consultCta}
      </Link>
    </div>
  );
}
