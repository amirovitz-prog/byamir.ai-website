# by AMIR — website

Statische website (HTML/CSS/JS, geen build-stap). Tweetalig NL/EN.

## Structuur
- `index.html`, `diensten.html`, `over-amir.html`, `contact.html` — de pagina's
- `404.html` — niet-gevonden-pagina
- `assets/` — `site.css`, `site.js`, `i18n.js` (EN-vertalingen), afbeeldingen en logo's

## Hosting (Cloudflare Pages)
Geen build nodig:
- **Framework preset:** None
- **Build command:** _(leeg)_
- **Build output directory:** `/`

Elke push naar `main` deployt automatisch.

## Contactformulier
Verstuurt via [Web3Forms](https://web3forms.com) naar amir@byamir.ai (access key staat in `contact.html`).
