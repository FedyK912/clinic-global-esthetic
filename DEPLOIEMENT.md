# Déploiement sur Infomaniak — globalaesthetic.ch

Guide pas-à-pas pour mettre le site en ligne sur l'hébergement web
Infomaniak existant, avec le domaine **globalaesthetic.ch**.

## 0. Pré-requis (déjà en place ✓)

- [x] Domaine `globalaesthetic.ch` chez Infomaniak (expire 07.2027, DNSSEC + Anycast actifs)
- [x] Service de messagerie lié au domaine
- [x] Hébergement web Infomaniak

## 1. Créer la boîte e-mail du formulaire (5 min)

Manager Infomaniak → **Service Mail** du domaine `globalaesthetic.ch` →
**Créer une adresse e-mail** :

- Adresse : `contact@globalaesthetic.ch`
- Notez le mot de passe — il servira au formulaire de réservation (SMTP).

> Une fois la boîte créée, changer l'adresse affichée sur le site =
> **une seule ligne** : `email:` dans `lib/site.ts`.

## 2. Créer le site Node.js (10 min)

Manager → **Hébergement Web** → **Mes sites** → **Ajouter un site** :

| Réglage | Valeur |
|---|---|
| Domaine | `globalaesthetic.ch` (+ alias `www.globalaesthetic.ch`) |
| Type de site | **Node.js** |
| Version Node | **20 LTS** (ou plus récent) |
| Commande d'installation | `npm ci` |
| Commande de build | `npm run build` |
| Commande de démarrage | `npm start` |

Next.js écoute automatiquement sur le port fourni par Infomaniak
(variable `PORT`). Le certificat SSL (Let's Encrypt) est généré
automatiquement à l'attachement du domaine.

> **Si le type « Node.js » n'apparaît pas** : votre offre d'hébergement
> est ancienne — Infomaniak propose la migration gratuite vers l'offre
> actuelle depuis le Manager (Hébergement → Gérer → Changer d'offre).

## 3. Déposer le code

**Option recommandée — via Git** : dans la configuration du site Node.js,
connectez le dépôt GitHub `clinic-global-esthetic` (branche `main` une
fois la PR fusionnée). Chaque push redéploie automatiquement.

**Option manuelle** : envoyez le dossier du projet (sans `node_modules`
ni `.next`) par SFTP, puis lancez les commandes d'installation/build
depuis l'interface.

## 4. Variables d'environnement

Dans la configuration du site Node.js (ou un fichier `.env.local` à la
racine du projet sur le serveur), reprendre `.env.example` :

```
NEXT_PUBLIC_SITE_URL=https://globalaesthetic.ch
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@globalaesthetic.ch
SMTP_PASS=<mot de passe de la boîte>
RESERVATION_TO=contact@globalaesthetic.ch
RESERVATION_FROM=contact@globalaesthetic.ch
```

`RESERVATION_TO` peut pointer vers n'importe quelle boîte que la
clinique consulte réellement.

## 5. Checklist après mise en ligne

- [ ] `https://globalaesthetic.ch` redirige vers `/fr` (et `www.` fonctionne)
- [ ] `/en` affiche la version anglaise, bascule FR/EN OK
- [ ] Envoyer une **vraie demande de test** depuis `/fr/rendez-vous` :
      l'e-mail arrive dans la boîte + l'accusé de réception arrive au client
- [ ] `https://globalaesthetic.ch/sitemap.xml` et `/robots.txt` répondent
- [ ] Test mobile réel (iPhone/Android) : réservation de bout en bout
- [ ] Déclarer le site dans **Google Search Console** (propriété
      `globalaesthetic.ch`) et soumettre le sitemap
- [ ] Mettre à jour la fiche **Google Business Profile** de la clinique
      avec le nouveau site

## Dépannage rapide

| Symptôme | Cause probable | Solution |
|---|---|---|
| Le formulaire affiche le repli e-mail/WhatsApp | SMTP non configuré ou mot de passe erroné | Vérifier les variables `SMTP_*` puis redémarrer le site |
| Page blanche après déploiement | Build non exécuté | Relancer `npm ci && npm run build`, puis redémarrer |
| Images Wix absentes | Domaine `static.wixstatic.com` bloqué sortant | Vérifier que l'hébergement autorise les requêtes sortantes |
