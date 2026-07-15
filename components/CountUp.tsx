"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anime la partie numérique d'une statistique ("25+", "80%", "1216") au
 * moment où elle entre dans le viewport. Les valeurs sans nombre isolable
 * (ex. "6–8") ou prefers-reduced-motion s'affichent telles quelles.
 */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : null;
  const animatable = match !== null && !/\d/.test(match[3]);

  const ref = useRef<HTMLElement>(null);
  // La valeur FINALE est affichée par défaut : si l'observer ne se déclenche
  // jamais (JS partiel, vieux navigateur), la statistique reste correcte.
  const [display, setDisplay] = useState<number | null>(animatable ? target : null);

  useEffect(() => {
    if (!animatable || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1300;
        const tick = (now: number) => {
          const k = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - k, 3);
          setDisplay(Math.round(target * eased));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animatable, target]);

  if (!animatable || match === null) return <b>{value}</b>;

  return (
    <b ref={ref}>
      {match[1]}
      {display ?? target}
      {match[3]}
    </b>
  );
}
