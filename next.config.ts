import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
  async redirects() {
    return [
      // Français par défaut à la racine
      { source: "/", destination: "/fr", permanent: false },
      // Anciennes URLs sans préfixe de langue
      { source: "/epilation-laser", destination: "/fr/epilation-laser", permanent: true },
      { source: "/soins-visage", destination: "/fr/soins-visage", permanent: true },
      { source: "/traitements-corps", destination: "/fr/traitements-corps", permanent: true },
      { source: "/rendez-vous", destination: "/fr/rendez-vous", permanent: true },
    ];
  },
};

export default nextConfig;
