import type { Metadata } from "next";
import GiftBanner from "@/components/GiftBanner";
import ReservationForm from "@/components/ReservationForm";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";
import { BOOKING_EXTERNAL_URL, CONTACT } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    title: t.booking.metaTitle,
    description: t.booking.metaDesc,
    alternates: {
      canonical: p(locale, "/rendez-vous"),
      languages: {
        fr: "/fr/rendez-vous",
        en: "/en/rendez-vous",
        "x-default": "/fr/rendez-vous",
      },
    },
  };
}

const ICONS = {
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  whatsapp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

export default async function RendezVousPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  const b = t.booking;

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t.nav.booking}</div>
          <h1>{b.headTitle}</h1>
          <p>{b.headText}</p>
          <div className="badge-free" style={{ marginTop: 20 }}>
            <span className="pulse-dot" aria-hidden="true"></span>
            {t.common.freeBadge}
          </div>
        </div>
      </section>

      {/* Agenda externe (Fresha) — affiché dès que BOOKING_EXTERNAL_URL est défini */}
      {BOOKING_EXTERNAL_URL && (
        <section className="section-alt" style={{ padding: "64px 0" }}>
          <div className="wrap">
            <div className="consult-banner">
              <div>
                <div className="eyebrow" style={{ color: "#D9BC8C" }}>
                  {b.onlineEyebrow}
                </div>
                <h3>{b.onlineTitle}</h3>
                <p>{b.onlineText}</p>
              </div>
              <a
                href={BOOKING_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-laser"
              >
                {b.onlineCta}
              </a>
            </div>
            <p className="form-note" style={{ marginTop: 18, textAlign: "center" }}>
              {b.onlineOr}
            </p>
          </div>
        </section>
      )}

      {/* Parcours de réservation en étapes (composant client) */}
      <ReservationForm locale={locale} t={b} />

      {/* ============ CONTACT DIRECT + CARTE ============ */}
      <section>
        <div className="wrap">
          <Reveal className="rdv-direct">
            <div>
              <div className="eyebrow">{b.directTitle}</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 14 }}>
                {b.directText}
              </h2>
              <div className="contact-tiles">
                <a className="contact-tile" href={`tel:${CONTACT.phone}`}>
                  {ICONS.phone}
                  <span>
                    <span className="lbl">{b.contactLabels.phone}</span>
                    <span className="val">{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
                <a
                  className="contact-tile"
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ICONS.whatsapp}
                  <span>
                    <span className="lbl">{b.contactLabels.whatsapp}</span>
                    <span className="val">{b.tileWhatsappText}</span>
                  </span>
                </a>
                <a className="contact-tile" href={`mailto:${CONTACT.email}`}>
                  {ICONS.mail}
                  <span>
                    <span className="lbl">{b.contactLabels.mail}</span>
                    <span className="val">{CONTACT.email}</span>
                  </span>
                </a>
                <div className="contact-tile" style={{ cursor: "default" }}>
                  {ICONS.clock}
                  <span>
                    <span className="lbl">{t.footer.hoursTitle}</span>
                    {t.footer.hours.map((line) => (
                      <span key={line} className="val" style={{ display: "block", fontWeight: 500, fontSize: 13.5 }}>
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps?q=Av.+Louis-Casa%C3%AF+71,+1216+Meyrin&output=embed"
                title={b.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <Reveal>
            <GiftBanner t={t.gift} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
