"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { p, type Dict, type Locale } from "@/lib/i18n";

export default function Header({ locale, t }: { locale: Locale; t: Dict["nav"] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: p(locale, "/"), label: t.home },
    { href: p(locale, "/epilation-laser"), label: t.laser },
    { href: p(locale, "/soins-visage"), label: t.face },
    { href: p(locale, "/traitements-corps"), label: t.body },
    { href: p(locale, "/rendez-vous"), label: t.booking },
  ];

  const linkClass = (href: string) =>
    pathname === href ? "active-link" : undefined;

  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const switchHref = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <>
      <header>
        <div className="nav">
          <Link href={p(locale, "/")} className="logo">
            CLINIC GLOBAL ESTHETIC
            <span>{t.tagline}</span>
          </Link>
          <nav className="links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-right">
            <a className="tel-link" href="tel:+41783464201">078 346 42 01</a>
            <Link
              className="lang-switch mono"
              href={switchHref}
              aria-label={otherLocale === "en" ? "Switch to English" : "Passer en français"}
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link className="btn btn-laser btn-sm nav-cta" href={p(locale, "/rendez-vous")}>
              {t.bookCta}
            </Link>
            <button
              className="burger"
              aria-label={t.openMenu}
              onClick={() => setMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? " open" : ""}`} inert={!menuOpen}>
        <div className="close-row">
          <button aria-label={t.closeMenu} onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={linkClass(link.href)}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link href={switchHref} className="mobile-lang mono" onClick={() => setMenuOpen(false)}>
          {otherLocale === "en" ? "English version" : "Version française"}
        </Link>
      </div>
    </>
  );
}
