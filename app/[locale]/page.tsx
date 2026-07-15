import type { Metadata } from "next";
import Link from "next/link";
import ConsultBanner from "@/components/ConsultBanner";
import CountUp from "@/components/CountUp";
import GiftBanner from "@/components/GiftBanner";
import HairCycle from "@/components/HairCycle";
import HeroVisual from "@/components/HeroVisual";
import Reveal from "@/components/Reveal";
import TechStrip from "@/components/TechStrip";
import TiltCard from "@/components/TiltCard";
import { getDict, p, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    title: t.home.metaTitle,
    description: t.home.metaDesc,
    alternates: {
      canonical: p(locale, "/"),
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  const h = t.home;

  const teaserHrefs = [
    p(locale, "/epilation-laser"),
    p(locale, "/soins-visage"),
    p(locale, "/traitements-corps"),
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">{h.heroEyebrow}</div>
            <h1>
              {h.heroTitle1}
              <br />
              {h.heroTitle2}
              <em>{h.heroTitleEm}</em>
              {h.heroTitlePost}
              <br />
              {h.heroTitle3}
            </h1>
            <p className="lead">{h.heroLead}</p>
            <div className="hero-cta">
              <Link href={p(locale, "/rendez-vous")} className="btn btn-laser">
                {t.common.bookSlot}
              </Link>
              <Link href={p(locale, "/epilation-laser")} className="btn btn-ghost">
                {t.common.seePricing}
              </Link>
            </div>
            <div className="badge-free" style={{ marginTop: 22 }}>
              <span className="pulse-dot" aria-hidden="true"></span>
              {t.common.freeBadge}
            </div>
            <div className="hero-stats">
              {h.stats.map((stat) => (
                <div className="stat" key={stat.s}>
                  <CountUp value={stat.b} />
                  <span>{stat.s}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual caption={h.scanCaption} ariaLabel={h.heroSceneAria} />
        </div>
      </section>

      {/* ================= TECHNOLOGIES ================= */}
      <TechStrip techs={t.techs} />

      {/* ================= À PROPOS ================= */}
      <section id="apropos">
        <div className="wrap">
          <Reveal className="about-grid">
            <div>
              <div className="eyebrow">{h.aboutEyebrow}</div>
              <h2>{h.aboutTitle}</h2>
            </div>
            <div>
              <p>{h.aboutP1}</p>
              <p>{h.aboutP2}</p>
              <div className="about-figures">
                {h.figures.map((fig) => (
                  <div className="fig" key={fig.b}>
                    <b>{fig.b}</b>
                    <span>{fig.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROTOCOLE ================= */}
      <section id="protocole" className="section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{h.protocolEyebrow}</div>
            <h2>{h.protocolTitle}</h2>
            <p>{h.protocolText}</p>
          </Reveal>
          <Reveal className="steps" stagger>
            {h.steps.map((step) => (
              <div className="step" key={step.num}>
                <div className="num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= CYCLE DU POIL ================= */}
      <section>
        <div className="wrap">
          <HairCycle t={t.cycle} />
        </div>
      </section>

      {/* ================= TEASER SERVICES ================= */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{h.teaserEyebrow}</div>
            <h2>{h.teaserTitle}</h2>
            <p>{h.teaserText}</p>
          </Reveal>
          <Reveal className="teaser-grid" stagger>
            {h.teasers.map((teaser, i) => (
              <TiltCard key={teaser.title}>
                <Link href={teaserHrefs[i]} className="teaser-card">
                  <h3>{teaser.title}</h3>
                  <p>{teaser.text}</p>
                  <span className="link">{t.common.discover}</span>
                </Link>
              </TiltCard>
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

      {/* ================= CARTE CADEAU ================= */}
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
