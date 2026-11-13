import type { Metadata } from "next";
import Image from "next/image";
import OrderForm from "@/components/OrderForm";
import { fredagsladan, openingHoursText, site } from "@/content/site";
import { getPickupDays } from "@/lib/pickup";

export const metadata: Metadata = {
  title: "Fredagslådan",
  description: `Färdigplockad låda med ost, chark och tillbehör, lagom som förrätt för två. ${fredagsladan.priceSek} kr. Beställ och betala här, hämta i Lindens Galleria.`,
};
export const dynamic = "force-dynamic";

export default async function Fredagsladan({ searchParams }: { searchParams: Promise<{ avbruten?: string }> }) {
  const { avbruten } = await searchParams;
  const days = getPickupDays();
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">Fredagsmys, enkelt</p>
        <h1 className="h-xl">Fredagslådan</h1>
        <p className="lead">{fredagsladan.short} Välj när du vill hämta, betala här och plocka upp lådan i butiken.</p>
      </section>
      <section className="section-tight">
        <div className="wrap split" style={{ maxWidth: 1180 }}>
          <div>
            <Image className="round" src="/img/platter.jpg" alt="Fat med ost, chark, oliver och kex" width={900} height={700} priority style={{ height: 380 }} sizes="(max-width: 860px) 100vw, 45vw" />
            <div className="ticket-facts" style={{ marginTop: 28 }}>
              <div><b>Pris</b>{fredagsladan.priceSek} kr per låda</div>
              <div><b>Räcker till</b>förrätt för två</div>
              <div><b>Redo</b>två timmar efter beställning</div>
            </div>
            <div className="prose" style={{ marginTop: 24 }}>
              <p>I lådan finns ett urval franska ostar, chark och tillbehör som Josefin plockar ihop efter vad som är bäst i disken just nu.</p>
              <p><b>Hämta i butiken</b> i {site.address.line1}: {openingHoursText.map((o) => `${o.days.toLowerCase()} ${o.hours}`).join(", ")}.</p>
            </div>
          </div>
          <div className="panel wide">
            <h2 className="h-m" style={{ marginBottom: 20 }}>Beställ och välj hämtningstid</h2>
            <OrderForm days={days} price={fredagsladan.priceSek} maxQuantity={fredagsladan.maxQuantity} cancelled={avbruten !== undefined} />
          </div>
        </div>
      </section>
    </>
  );
}
