# by AMIR — website

Statische website (HTML/CSS/JS, geen build-stap). Tweetalig NL/EN.

## Structuur
- `index.html`, `diensten.html`, `over-amir.html`, `contact.html` — de Nederlandse pagina's
- `en/` — dezelfde pagina's in het Engels (`/en`, `/en/diensten`, enz.)
- `404.html` — niet-gevonden-pagina
- `assets/` — `site.css`, `site.js`, `i18n.js` (EN-vertalingen), afbeeldingen en logo's

## Taal
De URL bepaalt de taal: `byamir.ai` = Nederlands, `byamir.ai/en` = Engels.
De NL/EN-knop op de site wisselt naar dezelfde pagina in de andere taal en past de URL aan, zodat een gedeelde link altijd de juiste taal opent. De Engelse pagina's in `en/` zijn gegenereerde kopieën — pas inhoud aan in de NL-bronpagina's (en de Engelse teksten in `assets/i18n.js`) en genereer `en/` opnieuw.

## Hosting (Cloudflare Pages)
Geen build nodig:
- **Framework preset:** None
- **Build command:** _(leeg)_
- **Build output directory:** `/`

Elke push naar `main` deployt automatisch.

## Contactformulier
Verstuurt via [Web3Forms](https://web3forms.com) naar amir@byamir.ai (access key staat in `contact.html`).
