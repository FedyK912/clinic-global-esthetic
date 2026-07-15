import type { Metadata } from "next";
import { getDict, p, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    title: t.legal.noticeMeta,
    robots: { index: false },
    alternates: {
      canonical: p(locale, "/mentions-legales"),
      languages: {
        fr: "/fr/mentions-legales",
        en: "/en/mentions-legales",
        "x-default": "/fr/mentions-legales",
      },
    },
  };
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{t.legal.noticeTitle}</h1>
        </div>
      </section>
      <section>
        <div className="wrap legal-body">
          {t.legal.noticeSections.map((section) => (
            <div key={section.h}>
              <h2>{section.h}</h2>
              {section.p.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
