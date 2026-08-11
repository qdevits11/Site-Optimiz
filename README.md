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
- `/rendez-vous` (réservation de créneau pour visite sur site)
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

Puis **Redeploy** le projet pour prendre en compte les variables.

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
