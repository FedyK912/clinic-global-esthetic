"use client";

import dynamic from "next/dynamic";

const LaserScene = dynamic(() => import("./three/LaserScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" aria-hidden="true"></div>,
});

export default function HeroVisual({
  caption,
  ariaLabel,
}: {
  caption: readonly [string, string] | readonly string[];
  ariaLabel: string;
}) {
  return (
    <div className="hero-visual hero-visual-3d" role="img" aria-label={ariaLabel}>
      <LaserScene />
      <div className="scan-caption">
        <span>{caption[0]}</span>
        <span>{caption[1]}</span>
      </div>
    </div>
  );
}
