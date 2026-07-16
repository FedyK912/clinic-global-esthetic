import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ConsultBanner from "@/components/ConsultBanner";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";
import { BODY_SERVICES } from "@/lib/services";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    title: t.body.metaTitle,
    description: t.body.metaDesc,
    alternates: {
      canonical: p(locale, "/traitements-corps"),
      languages: {
        fr: "/fr/traitements-corps",
        en: "/en/traitements-corps",
        "x-default": "/fr/traitements-corps",
      },
    },
  };
}

export default async function TraitementsCorpsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

  const bookHref = (service: string) =>
    `${p(locale, "/rendez-vous")}?motif=corps&service=${encodeURIComponent(service)}#demande`;

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t.common.ourCare}</div>
          <h1>{t.body.headTitle}</h1>
          <p>{t.body.headText}</p>
          <div className="badge-free" style={{ marginTop: 20 }}>
            <span className="pulse-dot" aria-hidden="true"></span>
            {t.common.freeBadge}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>{t.body.gridTitle}</h2>
          </Reveal>
          <Reveal className="service-grid" stagger>
            {t.body.traitements.map((traitement, i) => (
              <div className="service-card" key={traitement.title}>
                <div className="img-box">
                  <Image
                    src={BODY_SERVICES[i].img}
                    alt={traitement.alt}
                    width={800}
                    height={720}
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                  />
                </div>
                <div className="body">
                  <h3>{traitement.title}</h3>
                  <p>{traitement.text}</p>
                  <div className="price-tag">
                    <span>
                      {locale === "fr" ? BODY_SERVICES[i].priceFr : BODY_SERVICES[i].priceEn}
                      <small>
                        {BODY_SERVICES[i].perSession ? t.common.perSession : t.common.per45}
                      </small>
                    </span>
                    <span className="duration">
                      {BODY_SERVICES[i].perSession ? t.common.approx1h : t.common.dur45}
                    </span>
                  </div>
                  <Link className="card-cta" href={bookHref(t.booking.servicesCorps[i])}>
                    {t.common.bookThis}
                    <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= AVANT / APRÈS ================= */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal className="split-section reverse">
            <div>
              <BeforeAfterSlider
                before="/images/remodelage-avant.jpg"
                after="/images/remodelage-apres.jpg"
                beforeAlt={t.body.beforeAlt}
                afterAlt={t.body.afterAlt}
                beforeLabel={t.body.beforeLabel}
                afterLabel={t.body.afterLabel}
                ariaLabel={t.body.sliderAria}
                width={667}
                height={445}
              />
            </div>
            <div className="split-body">
              <div className="eyebrow">{t.body.resultEyebrow}</div>
              <h2>{t.body.resultTitle}</h2>
              <p>{t.body.resultText}</p>
              <p className="gallery-note">{t.common.resultNote}</p>
              <Link href={p(locale, "/rendez-vous")} className="btn btn-laser">
                {t.common.consultCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= QUESTIONS FRÉQUENTES ================= */}
      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{t.laser.faqEyebrow}</div>
            <h2>{t.body.faqTitle}</h2>
          </Reveal>
          <Reveal className="faq-list">
            {t.body.faq.map((item, i) => (
              <details className="pcat" key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <Reveal>
            <ConsultBanner locale={locale} t={t.common} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
