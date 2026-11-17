# Les Petit Bulles – hemsida

Next.js-sida för champagnebaren och delin i Lindens Galleria, Norrköping. Design: riktning F · Maison de Craie.
Driftas på Vercel; varje push till `main` publiceras automatiskt.

## Uppdatera innehåll

Allt innehåll ligger i mappen `content/`:

| Fil | Innehåll |
| --- | --- |
| `content/site.ts` | Adress, telefon, e-post, Instagram, öppettider, stängda dagar, företagsnamn/org.nr |
| `content/deli.ts` | Deli To-Go: Fredagslådan, Ostpåsen, ostar i bit, tillbehör, priser och hämtningstider |
| `content/events.ts` | After work (fast rad) och startlistan med event. Daterade event sköter Josefin i /admin |
| `content/products.ts` | Startlistan för Nytt på hyllan. Josefin byter nyheterna i /admin |
| `content/meny.ts` | Menyn på /meny: veckans champagne på glas och hela menyn. PDF:en ligger i `public/meny/` |
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

## Admin för Josefin (/admin)

Josefin loggar in på /admin med lösenordet i `ADMIN_PASSWORD` och kan själv:

- lägga till, ändra och ta bort event (datum, tid, rubrik, beskrivning, drop-in eller anmäl intresse),
- byta ut de fyra nyheterna i Nytt på hyllan, med foto,
- ladda upp glasmenyn och hela menyn som PDF. Sidorna visas som bilder på /meny.

Allt sparas i Vercel Blob (`BLOB_READ_WRITE_TOKEN`), inte i koden. Det som finns sparat där gäller före
`content/events.ts` och `content/products.ts`, som bara används tills något sparats första gången.
Utan `ADMIN_PASSWORD` och `ADMIN_SESSION_SECRET` är inloggningen avstängd. Byts lösenordet loggas alla ut.

Lokalt utan Blob-nyckel sparas allt i mappen `.data/` (testläge).
