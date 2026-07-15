"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Anime les enfants directs un à un (vague) au lieu du bloc entier. */
  stagger?: boolean;
};

/** Fait apparaître son contenu en douceur à l'entrée dans le viewport. */
export default function Reveal({ children, className, delay, id, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    // Filet de sécurité : si l'observer ne se déclenche jamais, le contenu
    // ne doit en aucun cas rester invisible.
    const fallback = setTimeout(() => setInView(true), 3000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`${className ? `${className} ` : ""}reveal${stagger ? " stagger" : ""}${inView ? " in" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
