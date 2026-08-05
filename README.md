# Optmiz — Site vitrine

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
| Output Directory | *(vide — ne pas mettre `public` ni `.next`)* |
| Install Command | `npm install` |

**Settings → Deployment Protection** : désactiver pour Production si le site doit être public (sinon redirection SSO Vercel).

Dashboard : [vercel.com/.../site-optimiz](https://vercel.com/qquentindevits-4149s-projects/site-optimiz)

## Pages

- `/` — Accueil
- `/notre-methodologie` — La méthode
- `/pourquoi-nous` — Pourquoi nous
- `/cas-concrets` — Cas concrets
- `/tarifs` — Tarifs

## Formulaire de contact

Les soumissions partent via **SMTP OVH** vers `q.devits.optmiz@gmail.com`.

Toute la config se fait **dans l’app** : `src/config/mail.ts`

```ts
host: "ssl0.ovh.net", // ou smtp.mail.ovh.net
port: 465,
user: "contact@optmiz.be",
pass: "...",
from: "Optmiz <contact@optmiz.be>",
to: "q.devits.optmiz@gmail.com",
```

Aucun réglage email à faire dans le dashboard Vercel.

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
