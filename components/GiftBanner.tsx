import type { Dict } from "@/lib/i18n";

export default function GiftBanner({ t }: { t: Dict["gift"] }) {
  return (
    <div className="gift-banner">
      <div>
        <div className="eyebrow">{t.eyebrow}</div>
        <h3>{t.title}</h3>
        <p>{t.text}</p>
      </div>
      <a
        href={`mailto:contact@clinicglobalestheticgeneva.ch?subject=${encodeURIComponent(t.mailSubject)}`}
        className="btn btn-ghost"
      >
        {t.cta}
      </a>
    </div>
  );
}
