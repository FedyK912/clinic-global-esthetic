"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { p, type Dict, type Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";

export default function Footer({
  locale,
  t,
  nav,
}: {
  locale: Locale;
  t: Dict["footer"];
  nav: Dict["nav"];
}) {
  const [year, setYear] = useState("");
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Clinic Global Esthetic</div>
            <p style={{ maxWidth: "34ch" }}>{t.about}</p>
          </div>
          <div>
            <h4>{t.navTitle}</h4>
            <Link href={p(locale, "/epilation-laser")}>{nav.laser}</Link>
            <Link href={p(locale, "/soins-visage")}>{nav.face}</Link>
            <Link href={p(locale, "/traitements-corps")}>{nav.body}</Link>
            <Link href={p(locale, "/rendez-vous")}>{nav.booking}</Link>
          </div>
          <div>
            <h4>{t.contactTitle}</h4>
            <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a
              href="https://www.google.com/maps?q=Av.+Louis-Casa%C3%AF+71,+1216+Meyrin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Av. Louis-Casaï 71, 1216 Meyrin
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {t.rights}</span>
          <span className="footer-legal">
            <Link href={p(locale, "/mentions-legales")}>{t.legalNotice}</Link>
            {" · "}
            <Link href={p(locale, "/confidentialite")}>{t.privacy}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
