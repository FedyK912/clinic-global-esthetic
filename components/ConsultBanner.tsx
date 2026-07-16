import Link from "next/link";
import { p, type Dict, type Locale } from "@/lib/i18n";

/**
 * Bannière « première consultation gratuite » — l'appel à l'action clé du
 * site. `title`/`text` permettent de varier le message selon la page pour
 * éviter la clôture identique partout.
 */
export default function ConsultBanner({
  locale,
  t,
  title,
  text,
}: {
  locale: Locale;
  t: Dict["common"];
  title?: string;
  text?: string;
}) {
  return (
    <div className="consult-banner">
      <div>
        <div className="badge-free">
          <span className="pulse-dot" aria-hidden="true"></span>
          {t.freeBadge}
        </div>
        <h3>{title ?? t.consultTitle}</h3>
        <p>{text ?? t.consultText}</p>
      </div>
      <Link href={p(locale, "/rendez-vous")} className="btn btn-laser btn-lg">
        {t.consultCta}
      </Link>
    </div>
  );
}
