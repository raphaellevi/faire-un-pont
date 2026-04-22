# Faire un pont® — Coaching de dirigeants

Site web d'Éric Guedj, coach certifié HEC Executive Coaching, spécialisé dans l'accompagnement des dirigeants en crise ou en transition.

## Stack technique

- **React 18** + **Vite**
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** (animations)
- **Sonner** (notifications)
- **Google Apps Script** (formulaire de contact → email + Google Sheets)

## Installation

```bash
npm install
npm run dev
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/...votre_url.../exec
```

## Formulaire de contact

Le formulaire envoie les données vers un Google Apps Script qui :
1. Enregistre la demande dans un Google Sheet
2. Envoie un email de notification à eric@faireunpont.fr

## Déploiement

```bash
npm run build
```

Le dossier `dist/` est prêt à être déployé sur Vercel, Netlify ou tout hébergeur statique.
