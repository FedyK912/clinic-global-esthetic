import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ConsultBanner from "@/components/ConsultBanner";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";

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

const CARDS = [
  {
    priceFr: "Dès 170.-",
    priceEn: "From 170.-",
    perSession: true,
    img: "https://static.wixstatic.com/media/aa06a6_2a6014ed8bd34db0903d2dac85d2f8d3~mv2.jpg/v1/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/aa06a6_2a6014ed8bd34db0903d2dac85d2f8d3~mv2.jpg",
  },
  {
    priceFr: "150.-",
    priceEn: "150.-",
    perSession: true,
    img: "https://static.wixstatic.com/media/aa06a6_a4d5cfcc0a124bb1a48c179de3a94f0c~mv2.jpg/v1/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/aa06a6_a4d5cfcc0a124bb1a48c179de3a94f0c~mv2.jpg",
  },
  {
    priceFr: "120.-",
    priceEn: "120.-",
    perSession: false,
    img: "https://static.wixstatic.com/media/aa06a6_c0f821808d3f4725871230d3d6c1724d~mv2.jpeg/v1/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/muscu.jpeg",
  },
];

export default async function TraitementsCorpsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

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
          <Reveal className="service-grid" stagger>
            {t.body.traitements.map((traitement, i) => (
              <div className="service-card" key={traitement.title}>
                <div className="img-box">
                  <Image
                    src={CARDS[i].img}
                    alt={traitement.alt}
                    width={500}
                    height={450}
                  />
                </div>
                <div className="body">
                  <h3>{traitement.title}</h3>
                  <p>{traitement.text}</p>
                  <div className="price-tag">
                    <span>
                      {locale === "fr" ? CARDS[i].priceFr : CARDS[i].priceEn}
                      <small>{CARDS[i].perSession ? t.common.perSession : t.common.per45}</small>
                    </span>
                    <span className="duration">
                      {CARDS[i].perSession ? t.common.approx1h : t.common.dur45}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
            <Link href={p(locale, "/rendez-vous")} className="btn btn-laser">
              {t.body.cta}
            </Link>
          </div>
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
