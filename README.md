# Les Petit Bulles – hemsida

Next.js-sida för champagnebaren och delin i Lindens Galleria, Norrköping. Design: riktning F · Maison de Craie.
Driftas på Vercel; varje push till `main` publiceras automatiskt.

## Uppdatera innehåll

Allt innehåll ligger i mappen `content/`:

| Fil | Innehåll |
| --- | --- |
| `content/site.ts` | Adress, telefon, e-post, Instagram, öppettider, stängda dagar, företagsnamn/org.nr |
| `content/deli.ts` | Deli To-Go: Fredagslådan, Ostpåsen, ostar i bit, tillbehör, priser och hämtningstider |
| `content/events.ts` | Kommande event och provningar (passerade döljs automatiskt) |
| `content/products.ts` | Nytt på hyllan |
| `content/videos.ts` | Josefin tipsar: videorna på Butiken (filerna ligger i `public/video/`, klippta och komprimerade till 720×960) |
| `content/services.ts` | Texter för Catering, After work, Företag och Presenter |
| `content/kurs.ts` | De nio kapitlen i ost- och champagneskolan |

Bilder ligger i `public/img/`.

Ta bort `example: true` från ett event eller en produkt när den är riktig, så försvinner "Exempel"-märkningen.

## Miljövariabler (Vercel → Project → Settings → Environment Variables)

Se `.env.example`.

- `STRIPE_SECRET_KEY` – krävs för att Deli To-Go ska kunna betalas.
- `STRIPE_WEBHOOK_SECRET` – valfritt; mejlar Josefin vid varje betald låda.
- `RESEND_API_KEY` – krävs för att formulären ska skicka mejl (från hemsida@lespetitbulles.se). Utan den visas en "mejla oss"-länk. `MAIL_FROM` och `INQUIRY_TO` är valfria.
- `NEXT_PUBLIC_SITE_URL` – valfritt; produktion använder https://www.lespetitbulles.se.

## Lokalt

```bash
npm install
npm run dev
```
