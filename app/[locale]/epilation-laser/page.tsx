import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConsultBanner from "@/components/ConsultBanner";
import PriceExplorer from "@/components/PriceExplorer";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    title: t.laser.metaTitle,
    description: t.laser.metaDesc,
    alternates: {
      canonical: p(locale, "/epilation-laser"),
      languages: {
        fr: "/fr/epilation-laser",
        en: "/en/epilation-laser",
        "x-default": "/fr/epilation-laser",
      },
    },
  };
}

const GALLERY = [
  "https://static.wixstatic.com/media/aa06a6_6f30bea7bd6541be9a3cc6e8ce3e7a0d~mv2.jpg/v1/fill/w_400,h_400,al_c,q_85,enc_avif,quality_auto/299A49AB-A2A7-41C3-BE44-37EA206FFE9E_edi.jpg",
  "https://static.wixstatic.com/media/aa06a6_34df226f46444ee794ef8ab65f71ba33~mv2.jpg/v1/fill/w_400,h_400,al_c,q_85,enc_avif,quality_auto/aa06a6_34df226f46444ee794ef8ab65f71ba33~mv2.jpg",
  "https://static.wixstatic.com/media/aa06a6_279db4ac2fca420c833a417de866d4ed~mv2.jpg/v1/fill/w_400,h_400,al_c,q_85,enc_avif,quality_auto/E1A6F42D-BFEC-4178-A5B5-5950D450B68D.jpg",
  "https://static.wixstatic.com/media/aa06a6_d5a56618b151417e91ffd56d926cddd7~mv2.jpg/v1/fill/w_400,h_400,al_c,q_85,enc_avif,quality_auto/IMG_8586_JPG.jpg",
];

export default async function EpilationLaserPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  const l = t.laser;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t.common.ourCare}</div>
          <h1>{l.headTitle}</h1>
          <p>{l.headText}</p>
          <div className="badge-free" style={{ marginTop: 20 }}>
            <span className="pulse-dot" aria-hidden="true"></span>
            {t.common.freeBadge}
          </div>
        </div>
      </section>

      {/* ================= PHOTO IMMERSIVE ================= */}
      <section className="no-pad">
        <div className="photo-banner">
          <Image
            src="/images/laser-seance-jambes.jpg"
            alt={l.photoAlt}
            fill
            sizes="100vw"
            priority
            className="kenburns"
          />
          <div className="scan-line" aria-hidden="true"></div>
          <div className="photo-caption">
            <span>{l.photoCaption[0]}</span>
            <span>{l.photoCaption[1]}</span>
          </div>
        </div>
      </section>

      {/* ================= COMPARATIF ================= */}
      <section>
        <div className="wrap">
          <Reveal className="stat-banner">
            <b>{l.statB}</b>
            <p>{l.statText}</p>
          </Reveal>

          <Reveal className="section-head" delay={80}>
            <div className="eyebrow">{l.compareEyebrow}</div>
            <h2>{l.compareTitle}</h2>
            <p>{l.compareText}</p>
          </Reveal>
          <Reveal className="compare-grid" stagger>
            {l.compare.map((method) => (
              <div
                className={`compare-card${method.highlight ? " highlight" : ""}`}
                key={method.method}
              >
                {method.highlight && method.badge && (
                  <span className="compare-badge mono">{method.badge}</span>
                )}
                <h3>{method.method}</h3>
                <p className="verdict">{method.verdict}</p>
                <p>{method.text}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="specs-strip" delay={100}>
            {l.techSpecs.map((spec) => (
              <span key={spec}>{spec}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= TARIFS ================= */}
      <section className="section-alt" id="tarifs">
        <div className="wrap">
          <div className="eyebrow">{l.pricesEyebrow}</div>
          <PriceExplorer locale={locale} t={t.prices} />
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
            <Link href={p(locale, "/rendez-vous")} className="btn btn-laser">
              {l.ctaConsult}
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEMMES & HOMMES ================= */}
      <section>
        <div className="wrap">
          <Reveal className="split-section">
            <div className="split-photo">
              <Image
                src="/images/marquage-dos-homme.jpg"
                alt={l.menPhotoAlt}
                width={746}
                height={995}
              />
            </div>
            <div className="split-body">
              <div className="eyebrow">{l.menEyebrow}</div>
              <h2>{l.menTitle}</h2>
              <p>{l.menText}</p>
              <a href="#tarifs-hommes" className="btn btn-ghost">
                {l.menCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DÉROULÉ DE SÉANCE ================= */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{l.sessionEyebrow}</div>
            <h2>{l.sessionTitle}</h2>
          </Reveal>
          <Reveal className="steps" stagger>
            {l.session.map((step) => (
              <div className="step" key={step.num}>
                <div className="num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= RÉSULTATS ================= */}
      <section id="resultats">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{l.resultsEyebrow}</div>
            <h2>{l.resultsTitle}</h2>
            <p>{l.resultsText}</p>
          </Reveal>
          <Reveal className="gallery-grid" stagger>
            {GALLERY.map((src, i) => (
              <div className="g-item" key={src}>
                <Image src={src} alt={l.galleryAlts[i]} width={400} height={400} />
              </div>
            ))}
          </Reveal>
          <p className="gallery-note">{l.galleryNote}</p>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{l.faqEyebrow}</div>
            <h2>{l.faqTitle}</h2>
            <p>{l.faqText}</p>
          </Reveal>
          <Reveal className="faq-list" delay={120}>
            {l.faq.map((item, i) => (
              <details className="pcat" key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= CONSULTATION GRATUITE ================= */}
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
