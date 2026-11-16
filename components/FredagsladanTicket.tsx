import Link from "next/link";
import Image from "next/image";
import { fredagsladan } from "@/content/site";

export default function FredagsladanTicket() {
  return (
    <div className="ticket">
      <Image src="/img/platter.jpg" alt="Fat med ost, chark, oliver och kex" width={900} height={700} sizes="(max-width: 860px) 100vw, 50vw" />
      <div className="ticket-body">
        <p className="eyebrow">Fredagsmys, enkelt</p>
        <h2 className="h-l">Fredagslådan</h2>
        <p style={{ margin: 0, fontSize: 18 }}>{fredagsladan.short} Betala här på sidan och hämta i butiken.</p>
        <div className="ticket-facts">
          <div><b>Hämta</b>ons–lör, under öppettiderna</div>
          <div><b>Redo</b>två timmar efter beställning</div>
          <div><b>Betala</b>kort, Apple &amp; Google Pay, Klarna</div>
        </div>
        <div className="price-row">
          <span className="price">{fredagsladan.priceSek} kr</span>
          <Link href="/fredagsladan" className="btn btn-clay">Välj hämtningstid</Link>
        </div>
      </div>
    </div>
  );
}
