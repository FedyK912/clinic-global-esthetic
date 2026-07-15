# Clinic Global Esthetic — Site Next.js

Site vitrine bilingue (FR/EN) haut de gamme de Clinic Global Esthetic
(épilation laser médicale & soins esthétiques, Meyrin, Genève) — Next.js App
Router, TypeScript, visuels 3D temps réel, photos du cabinet et réservation
par e-mail.

Projet indépendant du site PHP original (`Downloads/site`) et du site Wix.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000 (redirige vers /fr)
```

Build de production :

```bash
npm run build
npm start
```

## Bilingue FR / EN

- URLs préfixées : `/fr/...` (défaut) et `/en/...` ; `/` redirige vers `/fr`,
  les anciennes URLs sans préfixe redirigent en 308.
- Toutes les traductions vivent dans `lib/i18n/fr.ts` et `lib/i18n/en.ts`
  (typées : une clé manquante en anglais casse le build).
- Bascule FR/EN dans le header, `hreflang` + canonical par page, sitemap ×2.

## Réservation par e-mail

Formulaire en 3 étapes sur `/fr/rendez-vous` : motif (consultation gratuite
mise en avant), soin précis optionnel, disponibilités, coordonnées. Envoi au
cabinet + accusé de réception au client via SMTP (nodemailer).

1. Copier `.env.example` en `.env.local`
2. Renseigner un compte SMTP (Infomaniak, Gmail « mot de passe d'application »…)

Sans SMTP configuré, le visiteur bascule automatiquement sur un e-mail
pré-rempli (mailto) ou WhatsApp — aucune demande n'est perdue. Anti-spam :
honeypot + limite de débit (5 demandes / 10 min / IP).

## Page épilation laser (cœur de métier)

Photo immersive du cabinet avec ligne de scan animée, comparatif
rasoir/cire/IPL/laser médical, spécifications techniques (diode 810 nm),
tarifs interactifs femmes/hommes (70+ zones traduites), section épilation
masculine avec photo de marquage, déroulé de séance en 4 étapes, galerie de
résultats, FAQ (JSON-LD FAQPage), bannière consultation gratuite.

## Visuels 3D

- **Hero** (`components/three/LaserScene.tsx`) : pièce à main laser stylisée,
  faisceau doré balayant la peau.
- **Cycle du poil** (`components/three/FollicleScene.tsx`) : coupe de peau 3D,
  follicule animé selon la phase (anagène/catagène/télogène).
- Lazy-load (`next/dynamic`), `prefers-reduced-motion` respecté.

## Structure

```
app/
  [locale]/               → toutes les pages, param fr|en (SSG ×2)
    layout.tsx            → <html lang>, polices, header/footer, JSON-LD
    page.tsx              → Accueil
    epilation-laser/      → page enrichie (photos, comparatif, FAQ…)
    soins-visage/         → 6 soins (tarifs alignés Wix : HydraFacial 200.-…)
    traitements-corps/    → 3 traitements + avant/après remodelage
    rendez-vous/          → formulaire 3 étapes + carte
    opengraph-image.tsx   → image OG générée
  api/reservation/        → envoi SMTP (validation typée, rate-limit, honeypot)
  sitemap.ts / robots.ts / manifest.ts
components/               → Header (bascule langue), ReservationForm, scènes 3D…
lib/
  i18n/                   → dictionnaires fr/en + helpers
  prices.ts               → 70+ zones laser bilingues
  reservation.ts          → validation partagée (clés d'erreur localisables)
  site.ts                 → URL + coordonnées (source unique)
public/images/            → photos du cabinet (séance jambes, marquage dos,
                            avant/après remodelage)
```

## Notes

- `NEXT_PUBLIC_SITE_URL` à définir en production (voir `.env.example`).
- Ne pas lancer `npm run build` pendant que `next dev` tourne (cache `.next`
  partagé → corruption ; supprimer `.next` et redémarrer si ça arrive).
