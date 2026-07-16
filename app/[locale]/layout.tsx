import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import ScrollProgress from "@/components/ScrollProgress";
import { getDict, LOCALES, type Locale } from "@/lib/i18n";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.home.metaTitle,
    description: t.home.metaDesc,
    applicationName: SITE_NAME,
    icons: { icon: "/icon.svg" },
    // Pas de `url` ici : un og:url global contredirait le canonical des sous-pages.
    // L'image OG est injectée par la convention de fichier opengraph-image.tsx.
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: SITE_NAME,
    description: t.footer.about,
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "CHF",
    inLanguage: locale,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      postalCode: CONTACT.address.postalCode,
      addressLocality: CONTACT.address.city,
      addressCountry: CONTACT.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: ["https://clinicglobalesthetic.wixsite.com/clinic-global-esthet"],
  };

  return (
    <html
      lang={t.htmlLang}
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        <noscript>
          {/* Sans JavaScript, les blocs animés restent visibles */}
          <style>{`.reveal{opacity:1 !important; transform:none !important;}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollProgress />
        <Header locale={locale} t={t.nav} />
        {children}
        <Footer locale={locale} t={t.footer} nav={t.nav} />
        <MobileCtaBar locale={locale} t={t.nav} />
      </body>
    </html>
  );
}
