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

  // Le CTA « Voir les tarifs hommes » pointe vers #tarifs-hommes : on ouvre
  // l'onglet correspondant et on scrolle jusqu'au tableau.
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#tarifs-hommes") {
        setGender("hommes");
        document.getElementById("priceExplorer")?.scrollIntoView({ block: "start" });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <div className="price-explorer" id="priceExplorer" style={{ marginTop: 8 }}>
      <div className="price-toggle">
        <button
          className={gender === "femmes" ? "active" : undefined}
          onClick={() => setGender("femmes")}
        >
          {t.women}
        </button>
        <button
          className={gender === "hommes" ? "active" : undefined}
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
