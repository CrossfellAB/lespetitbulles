import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { chapters, getChapter, pairingColumns, pairingRows } from "@/content/kurs";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getChapter((await params).slug);
  return c ? { title: c.heading, description: c.lead } : {};
}

const markLabel = { safe: "Säkert val", good: "Fungerar bra" } as const;

export default async function Chapter({ params }: { params: Promise<{ slug: string }> }) {
  const c = getChapter((await params).slug);
  if (!c) notFound();
  const prev = chapters.find((x) => x.number === c.number - 1);
  const next = chapters.find((x) => x.number === c.number + 1);

  return (
    <article>
      <header className="wrap-narrow page-hero">
        <p className="eyebrow"><Link href="/lar-dig-mer" style={{ color: "inherit", textDecoration: "none" }}>Petite école</Link> · Kapitel {c.number} av {chapters.length}</p>
        <h1 className="h-xl">{c.heading}</h1>
        <p className="lead" style={{ fontSize: 21 }}>{c.lead}</p>
      </header>
      <div className="wrap-narrow">
        <Image className="page-photo" src={c.image} alt={c.imageAlt} width={1200} height={700} priority sizes="(max-width: 860px) 100vw, 800px" style={{ height: "clamp(220px, 34vw, 380px)" }} />
      </div>
      <div className="wrap-narrow section-tight prose">
        {c.pairingTable && (
          <div style={{ marginBottom: 36 }}>
            <div className="table-scroll">
              <table className="pair-table">
                <caption className="sr-only">Vilken champagne passar till vilken ost</caption>
                <thead>
                  <tr><th scope="col">Ost</th>{pairingColumns.map((col) => (<th key={col} scope="col">{col}</th>))}</tr>
                </thead>
                <tbody>
                  {pairingRows.map((r) => (
                    <tr key={r.cheese}>
                      <th scope="row" style={{ fontWeight: 400, border: 0, textAlign: "left" }}>{r.cheese}</th>
                      {r.marks.map((m, i) => (
                        <td key={i}>{m ? <span className={`dot dot-${m}`} title={markLabel[m]} aria-label={markLabel[m]} role="img" /> : <span className="sr-only">Välj hellre något annat</span>}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="small">
              <span className="dot dot-safe" style={{ width: 14, height: 14 }} /> säkert val &nbsp;
              <span className="dot dot-good" style={{ width: 14, height: 14 }} /> fungerar bra &nbsp; tom ruta: välj hellre något annat
            </p>
          </div>
        )}

        {c.paragraphs.map((p, i) => (
          <p key={i}>{p.label && <b>{p.label}. </b>}{p.text}</p>
        ))}

        {c.pairs && (
          <div style={{ display: "grid", gap: 18, margin: "28px 0" }}>
            {c.pairs.map((p) => (
              <div key={p.title} className="panel" style={{ padding: 28 }}>
                <h2 className="h-m" style={{ marginBottom: 10 }}>{p.title}</h2>
                <p style={{ margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        )}

        {c.facts && (
          <div className="panel" style={{ margin: "28px 0" }}>
            <h2 className="h-m" style={{ marginBottom: 12 }}>Deutz i korthet</h2>
            <dl className="facts-list">
              {c.facts.map((f) => (<div key={f.label}><dt>{f.label}</dt><dd>{f.text}</dd></div>))}
            </dl>
          </div>
        )}

        {c.fact && (
          <aside className="fact" style={{ marginTop: 28 }}>
            <h3>{c.fact.title}</h3>
            <p>{c.fact.text}</p>
          </aside>
        )}

        <nav className="chapter-nav" aria-label="Kapitel">
          {prev ? (<Link href={`/lar-dig-mer/${prev.slug}`}><small>← Föregående</small>{prev.heading}</Link>) : <span />}
          {next ? (<Link href={`/lar-dig-mer/${next.slug}`} style={{ textAlign: "right" }}><small>Nästa →</small>{next.heading}</Link>)
            : (<Link href="/event" style={{ textAlign: "right" }}><small>Prova på riktigt →</small>Kommande provningar</Link>)}
        </nav>
      </div>
    </article>
  );
}
