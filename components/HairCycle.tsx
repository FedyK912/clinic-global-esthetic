"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import CycleDiagram from "./CycleDiagram";

export default function HairCycle({ t }: { t: Dict["cycle"] }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Redémarré à chaque clic : la sélection manuelle n'est pas écrasée par le
  // tick suivant. Pas d'auto-avance si prefers-reduced-motion est actif.
  const restartAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (reduced) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % t.phases.length),
      4600,
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
        <h2>{t.title}</h2>
        <p>{t.text}</p>
        <div className="cycle-phases">
          {t.phases.map((phase, i) => (
            <button
              type="button"
              key={phase.title}
              className="phase"
              aria-pressed={i === active}
              onClick={() => selectPhase(i)}
            >
              <div className="dot" aria-hidden="true"></div>
              <div>
                <h4>{phase.title}</h4>
                <p>{phase.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="cycle-figure" role="img" aria-label={t.sceneAria}>
        <CycleDiagram phase={active} />
        <div className="scene-tag">
          <span>{t.sceneTag}</span>
          <span>{t.phases[active].tag}</span>
        </div>
      </div>
    </div>
  );
}
