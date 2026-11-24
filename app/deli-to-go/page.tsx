import type { Metadata } from "next";
import DeliOrder from "@/components/DeliOrder";
import { deliSettings, fredagsladan, ostpasen, pickupHoursText } from "@/content/deli";
import { site } from "@/content/site";
import { getPickupDays } from "@/lib/pickup";
import { getDeli } from "@/lib/store";

export const metadata: Metadata = {
  title: "Deli To-Go",
  description: `Fredagslådan ${fredagsladan.variants[0].priceSek} kr, Ostpåsen, ostar i bit och tillbehör. Beställ och betala här, hämta i Lindens Galleria, Norrköping.`,
};
export const dynamic = "force-dynamic";

export default async function DeliToGo({ searchParams }: { searchParams: Promise<{ avbruten?: string }> }) {
  const { avbruten } = await searchParams;
  const days = getPickupDays();
  const { cheeses, extras } = await getDeli();
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">Beställ, betala, hämta</p>
        <h1 className="h-xl">Deli To-Go</h1>
        <p className="lead">
          Välj det du vill ha, betala här på sidan och hämta i butiken i {site.address.line1}. Vi packar din beställning på en timme.
        </p>
        <div className="ticket-facts deli-facts">
          <div><b>Hämta</b>{pickupHoursText.map((o) => `${o.days.toLowerCase()} ${o.hours}`).join(", ")}</div>
          <div><b>Redo</b>en timme efter beställning</div>
          <div><b>Betala</b>kort, Swish via Klarna, Apple &amp; Google Pay</div>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <DeliOrder
            featured={[fredagsladan, ostpasen]}
            cheeses={cheeses}
            extras={extras}
            days={days}
            maxPerLine={deliSettings.maxPerLine}
            cancelled={avbruten !== undefined}
          />
        </div>
      </section>
    </>
  );
}
