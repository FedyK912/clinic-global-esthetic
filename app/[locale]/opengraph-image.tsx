import { ImageResponse } from "next/og";
import { getDict, type Locale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Clinic Global Esthetic — Meyrin, Genève / Geneva";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDict(locale);

  const subtitle =
    locale === "fr"
      ? "Soins du visage & du corps — Meyrin, Genève · Depuis 25 ans"
      : "Face & body treatments — Meyrin, Geneva · 25 years of expertise";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#FDFBF8",
          color: "#2E2A25",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            letterSpacing: 6,
            color: "#8C6E3F",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 52, height: 2, background: "#AD8A55", display: "flex" }} />
          {t.home.heroEyebrow}
        </div>
        <div style={{ display: "flex", fontSize: 88, marginTop: 30, lineHeight: 1.04 }}>
          Clinic Global Esthetic
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 26, color: "#726A5F" }}>
          {subtitle}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "#AD8A55",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
