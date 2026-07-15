"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { usePrefersReducedMotion } from "./three/usePrefersReducedMotion";

const FollicleScene = dynamic(() => import("./three/FollicleScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" aria-hidden="true"></div>,
});

export default function HairCycle({ t }: { t: Dict["cycle"] }) {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Redémarré à chaque clic : la sélection manuelle n'est pas écrasée par le
  // tick suivant. Pas d'auto-avance si prefers-reduced-motion est actif.
  const restartAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (reduced) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % t.phases.length),
      4200,
    );
  }, [reduced, t.phases.length]);

  useEffect(() => {
    restartAuto();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restartAuto]);

  const selectPhase = (i: number) => {
    setActive(i);
    restartAuto();
  };

  return (
    <div className="cycle-wrap">
      <div>
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 style={{ fontSize: 32, marginBottom: 18 }}>{t.title}</h2>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 28 }}>
          {t.text}
        </p>
        <div className="cycle-phases">
          {t.phases.map((phase, i) => (
            <div
              key={phase.title}
              className={`phase${i === active ? " active" : ""}`}
              onClick={() => selectPhase(i)}
            >
              <div className="dot"></div>
              <div>
                <h4>{phase.title}</h4>
                <p>{phase.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cycle-visual" role="img" aria-label={t.sceneAria}>
        <FollicleScene phase={active} />
        <div className="scene-tag">
          <span>{t.sceneTag}</span>
          <span>{t.phases[active].tag}</span>
        </div>
      </div>
    </div>
  );
}
