import type { Metadata } from "next";
import { site } from "@/content/site";
import { deliSettings, pickupHoursText } from "@/content/deli";

export const metadata: Metadata = { title: "Köpvillkor & integritet", robots: { index: false } };

export default function Villkor() {
  const seller = site.company.name || site.name;
  return (
    <section className="wrap-narrow page-hero prose">
      <p className="eyebrow">Villkor</p>
      <h1 className="h-l" style={{ marginBottom: 28 }}>Köpvillkor &amp; integritet</h1>

      <h2 className="h-m" style={{ margin: "32px 0 12px" }}>Säljare</h2>
      <p>{seller}{site.company.orgNr ? `, org.nr ${site.company.orgNr}` : ""}, {site.address.line1}, {site.address.city}. Telefon {site.phone}, e-post {site.email}.</p>

      <h2 className="h-m" style={{ margin: "32px 0 12px" }}>Deli To-Go</h2>
      <p>Priserna som visas vid beställningen gäller och är inklusive moms. Du betalar när du beställer, via Stripe, med kort, Apple Pay, Google Pay eller Klarna. Väljer du Klarna kan du betala med Swish. Kortuppgifter hanteras av Stripe och når aldrig oss.</p>
      <p>Beställningen hämtas i butiken på den dag och tid du väljer ({pickupHoursText.map((o) => `${o.days.toLowerCase()} ${o.hours}`).join(", ")}), tidigast {deliSettings.leadTimeHours === 1 ? "en timme" : `${deliSettings.leadTimeHours} timmar`} efter beställningen. Vi skickar inte varor.</p>
      <p>Eftersom beställningen innehåller färska livsmedel som snabbt blir dåliga gäller inte ångerrätten enligt distansavtalslagen. Kan du inte hämta på vald tid? Ring oss så snart som möjligt så försöker vi flytta hämtningen.</p>
      <p>Är något fel med beställningen, kontakta oss samma dag så löser vi det.</p>

      <h2 className="h-m" style={{ margin: "32px 0 12px" }}>Personuppgifter</h2>
      <p>När du beställer eller skickar en förfrågan sparar vi namn, e-post, telefon och det du skriver, för att kunna leverera och svara dig. Betalningar hanteras av Stripe och mejl skickas via vår e-posttjänst. Vi säljer eller delar inte dina uppgifter med någon annan och sparar dem inte längre än vi behöver för bokföring och kundkontakt.</p>
      <p>Vill du se, ändra eller ta bort dina uppgifter? Mejla {site.email}.</p>

      <h2 id="kakor" className="h-m" style={{ margin: "32px 0 12px" }}>Kakor</h2>
      <p>Om du godkänner det använder vi Meta-pixeln, en kaka från Meta (Facebook och Instagram). Den talar om för Meta att du besökt sidan, skickat en förfrågan eller gjort en beställning och vad den kostade, så att vi kan se vilka annonser som fungerar och visa annonser för rätt personer. Meta kan koppla uppgifterna till ditt konto hos dem. Vi skickar aldrig ditt namn, din e-post eller ditt telefonnummer till Meta.</p>
      <p>Säger du nej laddas ingenting från Meta. Du kan ändra ditt val när som helst via länken Kakor längst ner på sidan. Utöver det använder sidan bara det som behövs för att varukorgen och sidan ska fungera.</p>
    </section>
  );
}
