import type { Metadata } from "next";
import GiftBanner from "@/components/GiftBanner";
import ReservationForm from "@/components/ReservationForm";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";

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

export default async function RendezVousPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t.nav.booking}</div>
          <h1>{t.booking.headTitle}</h1>
          <p>{t.booking.headText}</p>
          <div className="badge-free" style={{ marginTop: 20 }}>
            <span className="pulse-dot" aria-hidden="true"></span>
            {t.common.freeBadge}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="booking-grid">
            <ReservationForm locale={locale} t={t.booking} />
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps?q=Av.+Louis-Casa%C3%AF+71,+1216+Meyrin&output=embed"
                title={t.booking.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
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
