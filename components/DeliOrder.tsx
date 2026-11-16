"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { DeliItem, DeliVariant } from "@/content/deli";
import type { PickupDay } from "@/lib/pickup";

type Props = {
  featured: DeliItem[];
  cheeses: DeliItem[];
  extras: DeliItem[];
  days: PickupDay[];
  maxPerLine: number;
  cancelled?: boolean;
};

type Cart = Record<string, number>;
const STORAGE_KEY = "lpb-deli-cart";

export default function DeliOrder({ featured, cheeses, extras, days, maxPerLine, cancelled }: Props) {
  const [cart, setCart] = useState<Cart>({});
  const [date, setDate] = useState(days[0]?.date ?? "");
  const times = useMemo(() => days.find((d) => d.date === date)?.times ?? [], [days, date]);
  const [time, setTime] = useState(days[0]?.times[0] ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Varukorgen sparas i fliken, så att den finns kvar om man avbryter betalningen och kommer tillbaka.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
      if (saved && typeof saved === "object") setCart(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const variants = useMemo(() => {
    const map: Record<string, { name: string; priceSek: number }> = {};
    for (const item of [...featured, ...cheeses, ...extras]) {
      for (const v of item.variants) map[v.id] = { name: v.label ? `${item.name}, ${v.label}` : item.name, priceSek: v.priceSek };
    }
    return map;
  }, [featured, cheeses, extras]);

  const lines = Object.entries(cart).filter(([id, q]) => q > 0 && variants[id]);
  const count = lines.reduce((n, [, q]) => n + q, 0);
  const total = lines.reduce((n, [id, q]) => n + q * variants[id].priceSek, 0);

  const setQty = (id: string, q: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, Math.min(maxPerLine, q)) }));

  const stepper = (v: DeliVariant, name: string) => {
    const q = cart[v.id] ?? 0;
    if (!q) {
      return (
        <button type="button" className="btn btn-line btn-small" onClick={() => setQty(v.id, 1)} aria-label={`Lägg till ${name}`}>
          Lägg till
        </button>
      );
    }
    return (
      <div className="stepper" role="group" aria-label={`Antal ${name}`}>
        <button type="button" onClick={() => setQty(v.id, q - 1)} aria-label="En färre">−</button>
        <span aria-live="polite">{q}</span>
        <button type="button" onClick={() => setQty(v.id, q + 1)} disabled={q >= maxPerLine} aria-label="En till">+</button>
      </div>
    );
  };

  const variantRows = (item: DeliItem) => (
    <div className="variant-rows">
      {item.variants.map((v) => (
        <div className="variant-row" key={v.id}>
          <span>
            {v.label && <span className="variant-label">{v.label}</span>}
            <span className="variant-price">{v.priceSek} kr</span>
          </span>
          {stepper(v, v.label ? `${item.name}, ${v.label}` : item.name)}
        </div>
      ))}
    </div>
  );

  const body = (item: DeliItem) => {
    const [first, ...rest] = item.text ?? [];
    return (
      <>
        {first && <p>{first}</p>}
        {item.contents && (
          <ul className="contents-list">
            {item.contents.map((c) => (<li key={c}>{c}</li>))}
          </ul>
        )}
        {rest.length > 0 && (
          <details className="read-more">
            <summary>Läs mer</summary>
            {rest.map((t) => (<p key={t.slice(0, 24)}>{t}</p>))}
          </details>
        )}
      </>
    );
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!count) {
      setError("Lägg något i varukorgen först.");
      return;
    }
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items: Object.fromEntries(lines) }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.url) {
        window.location.href = json.url;
        return;
      }
      setError(json.error || "Något gick fel. Försök igen eller ring oss.");
    } catch {
      setError("Kunde inte nå betalningen. Kontrollera uppkopplingen och försök igen.");
    }
    setBusy(false);
  }

  return (
    <div className="deli-layout">
      <div className="deli-items">
        {featured.map((item) => (
          <article className="deli-feature" id={item.slug} key={item.slug}>
            {item.image && (
              <Image src={item.image} alt={item.imageAlt ?? ""} width={600} height={600} sizes="(max-width: 700px) 100vw, 280px" />
            )}
            <div className="deli-feature-body">
              <h2 className="h-l">{item.name}</h2>
              {item.lead && <p className="deli-lead">{item.lead}</p>}
              {body(item)}
              {variantRows(item)}
            </div>
          </article>
        ))}

        <section className="deli-group" id="ostar">
          <h2 className="h-l">Ostar i bit</h2>
          <p className="lead">Här kan du köpa och hämta våra ostfavoriter. Välj en eller flera.</p>
          <div className="cheese-grid">
            {cheeses.map((item) => (
              <article className="cheese-card" id={item.slug} key={item.slug}>
                {item.image && (
                  <Image src={item.image} alt={item.imageAlt ?? ""} width={520} height={480} sizes="(max-width: 700px) 100vw, 320px" style={item.imageContain ? { objectFit: "contain", padding: 10 } : undefined} />
                )}
                <div className="cheese-body">
                  {item.badge && <span className="badge">{item.badge}</span>}
                  <h3>{item.name}</h3>
                  {item.lead && <p className="deli-lead">{item.lead}</p>}
                  {body(item)}
                  {variantRows(item)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="deli-group" id="tillbehor">
          <h2 className="h-l">Extra tillbehör</h2>
          <ul className="extras-list">
            {extras.map((item) => {
              const v = item.variants[0];
              return (
                <li key={item.slug}>
                  <div>
                    <b>{item.name}</b>
                    {item.lead && <span>{item.lead}</span>}
                  </div>
                  <span className="variant-price">{v.priceSek} kr</span>
                  {stepper(v, item.name)}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <aside className="panel deli-cart" id="kassa">
        <h2 className="h-m" style={{ marginBottom: 14 }}>Din beställning</h2>
        {cancelled && <div className="alert alert-err" role="status">Betalningen avbröts. Inget har dragits.</div>}
        {lines.length ? (
          <ul className="cart-lines">
            {lines.map(([id, q]) => (
              <li key={id}>
                <span>{q} × {variants[id].name}</span>
                <span>{q * variants[id].priceSek} kr</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="small">Varukorgen är tom. Välj något till vänster.</p>
        )}
        {days.length ? (
          <form className="form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="date">Hämtningsdag</label>
                <select id="date" name="date" value={date} onChange={(e) => {
                  setDate(e.target.value);
                  setTime(days.find((d) => d.date === e.target.value)?.times[0] ?? "");
                }}>
                  {days.map((d) => (<option key={d.date} value={d.date}>{d.label}</option>))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="time">Tid</label>
                <select id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}>
                  {times.map((t) => (<option key={t} value={t}>{t.replace(":", ".")}</option>))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="name">Namn</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="phone">Telefon</label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Om vi behöver nå dig" />
            </div>
            <div className="field">
              <label htmlFor="note">Allergier eller önskemål (valfritt)</label>
              <input id="note" name="note" maxLength={300} />
            </div>
            {error && <div className="alert alert-err" role="alert">{error}</div>}
            <div className="price-row" style={{ marginTop: 6 }}>
              <span className="price">{total} kr</span>
              <button className="btn btn-clay" type="submit" disabled={busy || !count}>
                {busy ? "Öppnar betalning …" : "Till betalning"}
              </button>
            </div>
            <p className="small" style={{ margin: 0 }}>
              Du betalar säkert via Stripe med kort, Apple Pay eller Google Pay. Vill du swisha väljer du Klarna och sedan Swish. Kvitto skickas till din e-post.
              Genom att beställa godkänner du våra <Link href="/villkor">köpvillkor</Link>.
            </p>
          </form>
        ) : (
          <div className="alert alert-err">Det finns inga lediga hämtningstider de närmaste dagarna. Ring oss gärna.</div>
        )}
      </aside>

      {count > 0 && (
        <a href="#kassa" className="cart-bar">
          <span>{count} {count === 1 ? "vara" : "varor"} · {total} kr</span>
          <b>Till kassan →</b>
        </a>
      )}
    </div>
  );
}
