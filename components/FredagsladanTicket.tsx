import Link from "next/link";
import Image from "next/image";
import { fredagsladan } from "@/content/deli";

export default function FredagsladanTicket() {
  return (
    <div className="ticket">
      <Image src="/img/platter.jpg" alt="Fat med ost, chark, oliver och kex" width={900} height={700} sizes="(max-width: 860px) 100vw, 50vw" />
      <div className="ticket-body">
        <p className="eyebrow">Deli To-Go</p>
        <h2 className="h-l">Fredagslådan</h2>
        <p style={{ margin: 0, fontSize: 18 }}>
          {fredagsladan.lead} Tre ostar, tre sorters chark, kex, marmelad, oliver, marconamandlar och vindruvor. Betala här på sidan och hämta i butiken.
        </p>
        <div className="ticket-facts">
          <div><b>Hämta</b>ons–fre 11–18, lör 11–16</div>
          <div><b>Redo</b>en timme efter beställning</div>
          <div><b>Betala</b>kort, Swish via Klarna, Apple &amp; Google Pay</div>
        </div>
        <div className="price-row">
          <span className="price">{fredagsladan.variants[0].priceSek} kr</span>
          <Link href="/deli-to-go#fredagsladan" className="btn btn-clay">Beställ</Link>
        </div>
        <p className="small" style={{ marginBottom: 0 }}>
          I <Link href="/deli-to-go">Deli To-Go</Link> finns också Ostpåsen, ostar i bit och tillbehör.
        </p>
      </div>
    </div>
  );
}
