"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Visite du cabinet : trois photos réelles mises en scène dans un espace 3D
 * CSS (perspective + profondeur). La scène s'incline doucement en suivant le
 * pointeur, les cartes latérales attendent en retrait et viennent au premier
 * plan au clic. Défilement automatique discret tant que personne n'interagit.
 * Tout est désactivé si l'utilisateur préfère les animations réduites, et les
 * vignettes-boutons restent le chemin d'accès clavier/lecteur d'écran.
 */

const PHOTOS = [
  "/images/cabinet-accueil.jpg",
  "/images/cabinet-salle-soin.jpg",
  "/images/cabinet-immeuble.jpg",
] as const;

type CabinetDict = {
  photos: readonly { caption: string; alt: string }[];
};

export default function CabinetTour({ t }: { t: CabinetDict }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Rotation automatique douce, uniquement tant que l'utilisateur n'a rien choisi
  useEffect(() => {
    if (reduced || paused || touched) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PHOTOS.length), 5600);
    return () => clearInterval(id);
  }, [reduced, paused, touched]);

  // Inclinaison parallaxe au pointeur (souris uniquement, jamais au toucher)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced || !matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      stage.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    };
    const leave = () => {
      stage.style.setProperty("--px", "0");
      stage.style.setProperty("--py", "0");
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  // Position de chaque carte par rapport à la carte active : 0 devant, ±1 en retrait
  const side = (i: number) => {
    const d = (i - active + PHOTOS.length) % PHOTOS.length;
    return d === 0 ? "is-active" : d === 1 ? "is-right" : "is-left";
  };

  return (
    <div
      className="cabinet"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="cabinet-stage" ref={stageRef}>
        <div className="cabinet-space">
          {PHOTOS.map((src, i) => (
            <figure key={src} className={`cabinet-card ${side(i)}`} onClick={() => pick(i)}>
              <Image
                src={src}
                alt={t.photos[i].alt}
                width={1254}
                height={1254}
                sizes="(max-width: 960px) 92vw, 660px"
              />
              <figcaption className="cabinet-caption">{t.photos[i].caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="cabinet-thumbs">
        {PHOTOS.map((src, i) => (
          <button
            key={src}
            type="button"
            className="cabinet-thumb"
            aria-pressed={active === i}
            onClick={() => pick(i)}
          >
            <Image src={src} alt="" width={68} height={68} aria-hidden="true" />
            <span>{t.photos[i].caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
