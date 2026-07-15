import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConsultBanner from "@/components/ConsultBanner";
import Reveal from "@/components/Reveal";
import { getDict, p, type Locale } from "@/lib/i18n";

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

// Tarifs alignés sur la grille Wix Bookings du cabinet.
const CARDS = [
  {
    price: "200.-",
    img: "https://static.wixstatic.com/media/aa06a6_8e4c6265b53e405fa189cd03d5fd5811~mv2.jpg/v1/crop/x_0,y_259,w_1138,h_1039/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/IMG_7859.jpg",
  },
  {
    price: "550.-",
    img: "https://static.wixstatic.com/media/aa06a6_dc7f820667214cbc9fe7c42971bd0490~mv2.jpg/v1/crop/x_0,y_252,w_1200,h_1096/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/IMG_7862_JPG.jpg",
  },
  {
    price: "250.-",
    img: "https://static.wixstatic.com/media/aa06a6_e9e791ceea6242d48d12b94f3d51d47b~mv2.jpg/v1/crop/x_0,y_114,w_1200,h_1096/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/IMG_7860_JPG.jpg",
  },
  {
    price: "220.-",
    img: "https://static.wixstatic.com/media/aa06a6_b16378d35f9845ce984cfe46acdad7ba~mv2.jpg/v1/crop/x_0,y_216,w_736,h_672/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/IMG_7863%202_JPG.jpg",
  },
  {
    price: "250.-",
    img: "https://static.wixstatic.com/media/aa06a6_7d2d305267064e5399e92961396a3e35~mv2.jpg/v1/crop/x_0,y_5,w_1020,h_931/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/cover-radiofrequences.jpg",
  },
  {
    price: "250.-",
    img: "https://static.wixstatic.com/media/aa06a6_bee4bb40923f4b3fbf42622bf058a41f~mv2.jpg/v1/crop/x_0,y_89,w_2048,h_1870/fill/w_500,h_450,al_c,q_85,enc_avif,quality_auto/1FBAC5FE-0675-4F7D-BBAE-E5D18A24B737_JPG.jpg",
  },
];

export default async function SoinsVisagePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

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
          <Reveal className="service-grid" stagger>
            {t.face.soins.map((soin, i) => (
              <div className="service-card" key={soin.title}>
                <div className="img-box">
                  <Image src={CARDS[i].img} alt={soin.alt} width={500} height={450} />
                </div>
                <div className="body">
                  <h3>{soin.title}</h3>
                  <p>{soin.text}</p>
                  <div className="price-tag">
                    <span>
                      {CARDS[i].price}
                      <small>{t.common.perSession}</small>
                    </span>
                    <span className="duration">{t.common.approx1h}</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
            <Link href={p(locale, "/rendez-vous")} className="btn btn-laser">
              {t.face.cta}
            </Link>
          </div>
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
