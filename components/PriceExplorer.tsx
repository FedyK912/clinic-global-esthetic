"use client";

import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { PRICES, priceLabel, type Gender } from "@/lib/prices";

export default function PriceExplorer({
  locale,
  t,
}: {
  locale: Locale;
  t: Dict["prices"];
}) {
  const [gender, setGender] = useState<Gender>("femmes");

  // Le CTA « Voir les tarifs hommes » pointe vers #tarifs-hommes : le scroll
  // est natif (id réel ci-dessous) ; ici on bascule seulement l'onglet, au
  // chargement comme au clic (le clic est réémis même si le hash n'a pas changé).
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#tarifs-hommes") setGender("hommes");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    document.addEventListener("click", onAnchorClick);
    function onAnchorClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest?.('a[href$="#tarifs-hommes"]');
      if (a) setGender("hommes");
    }
    return () => {
      window.removeEventListener("hashchange", applyHash);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return (
    // id="tarifs-hommes" réel : l'ancre fonctionne aussi sans JavaScript,
    // le listener hashchange ne sert plus qu'à basculer l'onglet.
    <div className="price-explorer" id="tarifs-hommes" style={{ marginTop: 8 }}>
      <div className="price-toggle">
        <button
          className={gender === "femmes" ? "active" : undefined}
          aria-pressed={gender === "femmes"}
          onClick={() => setGender("femmes")}
        >
          {t.women}
        </button>
        <button
          className={gender === "hommes" ? "active" : undefined}
          aria-pressed={gender === "hommes"}
          onClick={() => setGender("hommes")}
        >
          {t.men}
        </button>
      </div>
      <div>
        {PRICES[gender].map((group, i) => (
          <details className="pcat" key={`${gender}-${group.cat.fr}`} open={i === 0}>
            <summary>{group.cat[locale]}</summary>
            <div className="rows">
              {group.rows.map((row) => (
                <div className="prow" key={row.fr}>
                  <span className="n">{row[locale]}</span>
                  <span className="p">{priceLabel(row.price, locale)}</span>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
