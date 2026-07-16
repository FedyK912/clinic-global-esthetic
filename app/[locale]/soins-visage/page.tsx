import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConsultBanner from "@/components/ConsultBanner";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";
import { FACE_SERVICES } from "@/lib/services";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    title: t.face.metaTitle,
    description: t.face.metaDesc,
    alternates: {
      canonical: p(locale, "/soins-visage"),
      languages: {
        fr: "/fr/soins-visage",
        en: "/en/soins-visage",
        "x-default": "/fr/soins-visage",
      },
    },
  };
}

export default async function SoinsVisagePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

  const bookHref = (service: string) =>
    `${p(locale, "/rendez-vous")}?motif=visage&service=${encodeURIComponent(service)}#demande`;

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t.common.ourCare}</div>
          <h1>{t.face.headTitle}</h1>
          <p>{t.face.headText}</p>
          <div className="badge-free" style={{ marginTop: 20 }}>
            <span className="pulse-dot" aria-hidden="true"></span>
            {t.common.freeBadge}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>{t.face.gridTitle}</h2>
          </Reveal>
          <Reveal className="service-grid" stagger>
            {t.face.soins.map((soin, i) => (
              <div className="service-card" key={soin.title}>
                <div className="img-box">
                  <Image
                    src={FACE_SERVICES[i].img}
                    alt={soin.alt}
                    width={800}
                    height={720}
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                  />
                </div>
                <div className="body">
                  <h3>{soin.title}</h3>
                  <p>{soin.text}</p>
                  <div className="price-tag">
                    <span>
                      {FACE_SERVICES[i].price}
                      <small>{t.common.perSession}</small>
                    </span>
                    <span className="duration">{t.common.approx1h}</span>
                  </div>
                  <Link className="card-cta" href={bookHref(t.booking.servicesVisage[i])}>
                    {t.common.bookThis}
                    <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= QUESTIONS FRÉQUENTES ================= */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{t.laser.faqEyebrow}</div>
            <h2>{t.face.faqTitle}</h2>
          </Reveal>
          <Reveal className="faq-list">
            {t.face.faq.map((item, i) => (
              <details className="pcat" key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal>
            <ConsultBanner locale={locale} t={t.common} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
