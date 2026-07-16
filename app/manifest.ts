import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clinic Global Esthetic · Meyrin, Genève",
    short_name: "Clinic Global Esthetic",
    description:
      "Cabinet d'épilation laser médicale et de soins esthétiques à Meyrin, Genève.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF8",
    theme_color: "#FDFBF8",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
