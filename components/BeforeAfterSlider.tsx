"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  ariaLabel: string;
  width: number;
  height: number;
};

/**
 * Comparateur avant/après à poignée glissante.
 * Le contrôle est un vrai <input type="range"> invisible qui couvre l'image :
 * accessible au clavier (flèches), au doigt et à la souris sans aucune
 * gestion manuelle du drag.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  ariaLabel,
  width,
  height,
}: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba-slider" style={{ aspectRatio: `${width} / ${height}` }}>
      <Image src={after} alt={afterAlt} fill sizes="(max-width: 960px) 100vw, 45vw" />
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="(max-width: 960px) 100vw, 45vw" />
      </div>

      <span className="ba-chip left">{beforeLabel}</span>
      <span className="ba-chip right">{afterLabel}</span>

      <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="ba-grip">‹ ›</span>
      </div>

      <input
        className="ba-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={ariaLabel}
      />
    </div>
  );
}
