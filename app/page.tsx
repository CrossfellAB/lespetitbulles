import Link from "next/link";
import Image from "next/image";
import EventList from "@/components/EventList";
import ProductGrid from "@/components/ProductGrid";
import FredagsladanTicket from "@/components/FredagsladanTicket";
import InstagramFeed from "@/components/InstagramFeed";
import JulBand from "@/components/JulBand";
import { chapters } from "@/content/kurs";
import { getService, services } from "@/content/services";
import { openingHoursText, site } from "@/content/site";
import { fredagsladan } from "@/content/deli";
import { products } from "@/content/products";

export const revalidate = 3600;

export default function Home() {
  const cards = services.filter((s) => s.slug !== "after-work");
  const jul = getService("presenter");
  return (
    <>
      <section className="wrap hero center">
        <p className="eyebrow">Bienvenue i {site.address.line1} · {site.address.city}</p>
        <h1 className="h-xl" style={{ maxWidth: "15em", margin: "0 auto" }}>
          Ett glas bubbel, en bit ost och <em>goda vänner.</em>
        </h1>
        <p className="lead">
          Champagnebar och delikatessbutik mitt i Norrköping. Slå dig ner för ett glas, plocka med dig franska ostar och chark
          hem, eller låt oss ordna festen.
        </p>
        <div className="btn-row">
          <Link href="/deli-to-go" className="btn btn-wine">Deli To-Go · Fredagslådan {fredagsladan.variants[0].priceSek} kr</Link>
          <Link href="/event" className="btn btn-line">Se kommande provningar</Link>
        </div>
      </section>

      <section className="wrap collage" aria-label="Bilder från baren">
        <Image className="c-main" src="/img/glass-brie.jpg" alt="Ett glas champagne och en bit brie på en linneduk" width={1100} height={960} priority sizes="(max-width: 860px) 100vw, 45vw" />
        <div className="c-stack">
          <div className="hours-card">
            <strong>Öppet</strong>
            <span>{openingHoursText.map((o) => (<span key={o.days}>{o.days} {o.hours}<br /></span>))}</span>
            <Link href="/meny" className="hours-link">Se menyn →</Link>
          </div>
          <Image src="/img/cheeses.jpg" alt="Fem franska ostar på rad" width={700} height={560} sizes="(max-width: 860px) 50vw, 25vw" />
        </div>
        <Image className="c-side" src="/img/cellar.jpg" alt="Champagne, ost och druvor i en vinkällare" width={700} height={800} sizes="(max-width: 860px) 50vw, 25vw" />
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <FredagsladanTicket />
        </div>
      </section>

      {jul.theme === "jul" && <JulBand s={jul} ctaHref="/presenter#forfragan" />}

      <section className="band section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Kalendern</p>
              <h2 className="h-l">Händer hos oss</h2>
            </div>
            <Link href="/event" className="note">Alla event och provningar →</Link>
          </div>
          <EventList limit={5} />
        </div>
      </section>

      <InstagramFeed />

      <section className="section">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}>
            <p className="eyebrow">Pour la fête</p>
            <h2 className="h-l">Vi ordnar festen</h2>
            <p className="lead" style={{ marginTop: 12 }}>Berätta vad du planerar så återkommer Josefin med ett förslag och pris.</p>
          </div>
          <div className="cards-3">
            {cards.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="photo-card">
                <Image src={s.image} alt={s.imageAlt} width={700} height={880} sizes="(max-width: 900px) 100vw, 33vw" />
                <div className="overlay">
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                  <span className="more">Läs mer →</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="center" style={{ marginTop: 28 }}>
            Efter jobbet? <Link href="/after-work">After work i baren</Link> onsdag till fredag.
          </p>
        </div>
      </section>

      <section className="school section">
        <div className="wrap split" style={{ maxWidth: 1180 }}>
          <div>
            <p className="eyebrow">Petite école</p>
            <h2 className="h-l">Lär dig om champagne &amp; ost</h2>
            <p style={{ margin: "18px 0 28px", fontSize: 18, color: "#f0e1d2" }}>
              Nio korta kapitel från Josefins provningar. Läs i telefonen innan du kommer, eller när du står och väljer ost.
            </p>
            <Image className="round" src="/img/vineyard.jpg" alt="Vinodlingar i Champagne" width={800} height={460} style={{ height: 230 }} />
          </div>
          <ol className="chapter-list wide">
            {chapters.map((c) => (
              <li key={c.slug}>
                <Link href={`/lar-dig-mer/${c.slug}`}><span className="n">{c.number}</span>{c.title}</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <div className="section-head">
            <h2 className="h-l">Nytt på hyllan</h2>
            {products.some((p) => p.example) ? <span className="note">exempelvaror</span> : <Link href="/butiken" className="note">Mer i butiken →</Link>}
          </div>
          <ProductGrid limit={4} />
        </div>
      </section>
    </>
  );
}
