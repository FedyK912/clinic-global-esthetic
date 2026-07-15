"use client";

import { useRef } from "react";

/** Inclinaison 3D subtile au survol (désactivée si prefers-reduced-motion). */
export default function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = inner.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-2px)`;
  };

  const onLeave = () => {
    if (inner.current) inner.current.style.transform = "";
  };

  return (
    <div className={`tilt-wrap${className ? ` ${className}` : ""}`}>
      <div ref={inner} className="tilt-inner" onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </div>
    </div>
  );
}
