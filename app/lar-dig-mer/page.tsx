import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/kurs";

export const metadata: Metadata = {
  title: "Lär dig om champagne & ost",
  description: "Nio korta kapitel om champagne, ost och hur du parar dem. Från Josefins provningar på Les Petit Bulles.",
};

export default function Kurs() {
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">Petite école</p>
        <h1 className="h-xl">Lär dig om champagne &amp; ost</h1>
        <p className="lead">
          Nio korta kapitel från Josefins provningar. Läs i telefonen innan du kommer, eller när du står och väljer ost.
        </p>
      </section>
      <section className="wrap">
        <Image className="page-photo" src="/img/vineyard.jpg" alt="Vinodlingar på kritjord i Champagne" width={1600} height={900} priority sizes="100vw" />
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <div className="course-grid">
            {chapters.map((c) => (
              <Link key={c.slug} href={`/lar-dig-mer/${c.slug}`} className="course-card">
                <span className="n">{c.number}</span>
                <span>
                  <h3>{c.heading}</h3>
                  <p>{c.title}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
