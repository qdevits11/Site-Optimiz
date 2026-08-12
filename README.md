# Optmiz, site vitrine

Recréation du site vitrine [optmiz.be](https://www.optmiz.be) : automatisation et digitalisation des processus pour PME en Wallonie.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Déployé sur Vercel

## URLs Vercel

Le projet est dans l’équipe `qquentindevits-4149s-projects`. L’URL de production est :

**https://site-optimiz-qquentindevits-4149s-projects.vercel.app**

> `https://site-optimiz.vercel.app` renvoie `404 NOT_FOUND` : cet alias court n’existe pas pour un projet d’équipe. Utilisez l’URL ci-dessus (Dashboard → Domains).

### Réglages Dashboard à vérifier

Project **Settings → General / Build and Deployment** :

| Setting | Valeur attendue |
| --- | --- |
| Framework Preset | **Next.js** |
| Root Directory | *(vide / `.`)* |
| Build Command | `npm run build` (ou Override off) |
| Output Directory | *(vide, ne pas mettre `public` ni `.next`)* |
| Install Command | `npm install` |

**Settings → Deployment Protection** : désactiver pour Production si le site doit être public (sinon redirection SSO Vercel).

Dashboard : [vercel.com/.../site-optimiz](https://vercel.com/qquentindevits-4149s-projects/site-optimiz)

## Pages

- `/` (Accueil)
- `/notre-methodologie` (La méthode)
- `/pourquoi-nous` (Pourquoi nous)
- `/cas-concrets` (Cas concrets)
- `/tarifs` (Tarifs)
- `/ressources` (Guides SEO) + `/ressources/[slug]` (articles)
- `/zones` + `/zones/[slug]` (pages locales SEO)
- `/faq` (Questions fréquentes)
- `/contact` (Contact dédié)

## Formulaire de contact

Les soumissions partent via **SMTP OVH** vers `q.devits.optmiz@gmail.com`.

Config dans **Vercel → Project → Settings → Environment Variables** (Production + Preview) :

| Variable | Exemple |
| --- | --- |
| `SMTP_HOST` | `ssl0.ovh.net` ou `smtp.mail.ovh.net` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` (pour 465) |
| `SMTP_USER` | `contact@optmiz.be` |
| `SMTP_PASS` | mot de passe de la boîte |
| `SMTP_FROM` | `Optmiz <contact@optmiz.be>` |
| `CONTACT_TO_EMAIL` | `q.devits.optmiz@gmail.com` |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID (Google Cloud) |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret |
| `GOOGLE_REFRESH_TOKEN` | refresh token (scope Calendar) |
| `GOOGLE_CALENDAR_ID` | `primary` (ou id d’agenda) |
| `BOOKING_TIMEZONE` | `Europe/Brussels` (optionnel) |
| `BOOKING_DURATION_MINUTES` | `45` (optionnel) |
| `BOOKING_SLOT_TIMES` | `09:00,10:30,14:00,15:30` (optionnel) |
| `BOOKING_HORIZON_DAYS` | `14` (optionnel) |
| `BOOKING_BUFFER_MINUTES` | `15` (optionnel) |
| `BOOKING_MANAGE_SECRET` | secret pour signer les liens annuler/modifier (optionnel) |

Puis **Redeploy** le projet pour prendre en compte les variables.

Les anciennes variables `CAL_*` (Cal.com) ne sont plus utilisées : vous pouvez les supprimer.

### Google Calendar (visite chez le client)

Les créneaux et la réservation passent par **Google Calendar** (API gratuite). Aucun e-mail Google n’est envoyé au prospect (`sendUpdates: none`) : seule la confirmation **Optmiz** part en SMTP.

1. [Google Cloud Console](https://console.cloud.google.com/) → créer un projet (ou en choisir un).
2. Activer **Google Calendar API**.
3. APIs & Services → Credentials → **Create OAuth client ID** (type *Desktop app* ou *Web*).
4. Copier `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`.
5. Obtenir un refresh token avec le script local :

```bash
node scripts/google-calendar-oauth.mjs
```

   (ouvre l’URL d’auth, coller le code, récupérer `GOOGLE_REFRESH_TOKEN`).
6. Scope requis : `https://www.googleapis.com/auth/calendar`.
7. Optionnel : `GOOGLE_CALENDAR_ID` si ce n’est pas l’agenda principal.

Parcours site : **2–4 étapes** — priorité, taille, coordonnées + adresse, puis calendrier / horaires (API Google).

### E-mail de confirmation (brand Optmiz)

Après réservation, le site crée l’événement dans Google Agenda et envoie au prospect un e-mail **Optmiz** (SMTP OVH) uniquement. L’e-mail contient des liens signés pour **modifier** ou **annuler** le rendez-vous (`/visite/gerer?token=…`), plus un fichier **`.ics`** (Apple Agenda / Google Agenda) pour ajouter, mettre à jour ou retirer le créneau. Après annulation ou modification, une confirmation part au prospect (et une notification interne à Optmiz).

Une adresse e-mail qui a déjà une visite **future** ne peut pas réserver une seconde visite : le formulaire renvoie vers le lien de gestion.

Optionnel : `BOOKING_MANAGE_SECRET` pour signer les liens (sinon `GOOGLE_CLIENT_SECRET` ou `SMTP_PASS`).

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## SEO & GEO

- Domaine canonique : `https://www.optmiz.be` (l'apex `optmiz.be` redirige en 308, géré par Vercel + DNS OVH).
- Config centrale : `src/lib/seo.ts` (métadonnées, JSON-LD, liste des pages pour le sitemap).
- Navigation / sitelinks : `src/lib/navigation.ts` (libellés courts + `SiteNavigationElement` dans le layout). Google choisit les sous-liens automatiquement ; on ne peut pas les forcer depuis Search Console.
- Articles/guides : `src/lib/articles.ts`.
- `robots.txt` (`src/app/robots.ts`) et `sitemap.xml` (`src/app/sitemap.ts`) générés automatiquement.
- `public/llms.txt` et `public/llms-full.txt` : fiche descriptive pour les moteurs génératifs (GEO).

### Soumettre le sitemap aux moteurs de recherche

**Google** — nécessite une connexion à [Google Search Console](https://search.google.com/search-console) (une propriété existe déjà, vérifiée via une entrée TXT DNS `google-site-verification`) :
1. Ouvrir la propriété `optmiz.be` ou `www.optmiz.be` dans Search Console.
2. Menu **Sitemaps** → coller `sitemap.xml` → **Envoyer**.
3. Après ajout de nouvelles pages, utiliser **Inspection de l'URL → Demander une indexation** pour les pages prioritaires.

**Bing, Yandex, Naver, Seznam.cz, Yep** — automatisé via [IndexNow](https://www.indexnow.org/) (aucune connexion requise, clé de vérification déjà déployée sur le site) :

```bash
npm run submit:indexnow
```

Ce script lit `sitemap.xml` en ligne et pousse toutes les URLs via l'API IndexNow. À relancer après chaque publication d'article ou changement de contenu important. Google ne supporte pas IndexNow.
