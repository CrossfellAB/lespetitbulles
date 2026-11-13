# Les Petit Bulles – hemsida

Next.js-sida för champagnebaren och delin i Lindens Galleria, Norrköping. Design: riktning F · Maison de Craie.
Driftas på Vercel; varje push till `main` publiceras automatiskt.

## Uppdatera innehåll

Allt innehåll ligger i mappen `content/`:

| Fil | Innehåll |
| --- | --- |
| `content/site.ts` | Adress, telefon, e-post, Instagram, öppettider, stängda dagar, Fredagslådans pris och regler, företagsnamn/org.nr |
| `content/events.ts` | Kommande event och provningar (passerade döljs automatiskt) |
| `content/products.ts` | Nytt på hyllan |
| `content/services.ts` | Texter för Catering, After work, Företag och Presenter |
| `content/kurs.ts` | De nio kapitlen i ost- och champagneskolan |

Bilder ligger i `public/img/`.

Ta bort `example: true` från ett event eller en produkt när den är riktig, så försvinner "Exempel"-märkningen.

## Miljövariabler (Vercel → Project → Settings → Environment Variables)

Se `.env.example`.

- `STRIPE_SECRET_KEY` – krävs för att Fredagslådan ska kunna betalas.
- `STRIPE_WEBHOOK_SECRET` – valfritt; mejlar Josefin vid varje betald låda.
- `RESEND_API_KEY`, `MAIL_FROM`, `INQUIRY_TO` – krävs för att formulären ska skicka mejl. Utan dem visas en "mejla oss"-länk.
- `NEXT_PUBLIC_SITE_URL` – sätts när den egna domänen är kopplad.

## Lokalt

```bash
npm install
npm run dev
```
