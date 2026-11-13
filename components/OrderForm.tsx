"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PickupDay } from "@/lib/pickup";

type Props = { days: PickupDay[]; price: number; maxQuantity: number; cancelled?: boolean };

export default function OrderForm({ days, price, maxQuantity, cancelled }: Props) {
  const [date, setDate] = useState(days[0]?.date ?? "");
  const times = useMemo(() => days.find((d) => d.date === date)?.times ?? [], [days, date]);
  const [time, setTime] = useState(days[0]?.times[0] ?? "");
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!days.length) {
    return <div className="alert alert-err">Det finns inga lediga hämtningstider de närmaste dagarna. Ring oss gärna.</div>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <form className="form" onSubmit={onSubmit}>
      {cancelled && <div className="alert alert-err" role="status">Betalningen avbröts. Inget har dragits, välj tid och försök igen.</div>}
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
      <div className="form-row">
        <div className="field">
          <label htmlFor="quantity">Antal lådor</label>
          <select id="quantity" name="quantity" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
            {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="phone">Telefon</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Om vi behöver nå dig" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="name">Namn</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="note">Allergier eller önskemål (valfritt)</label>
        <input id="note" name="note" maxLength={300} />
      </div>
      {error && <div className="alert alert-err" role="alert">{error}</div>}
      <div className="price-row" style={{ marginTop: 6 }}>
        <span className="price">{price * qty} kr</span>
        <button className="btn btn-clay" type="submit" disabled={busy}>{busy ? "Öppnar betalning …" : "Till betalning"}</button>
      </div>
      <p className="small" style={{ margin: 0 }}>
        Du betalar säkert via Stripe med kort, Swish, Apple Pay eller Google Pay. Kvitto skickas till din e-post.
        Genom att beställa godkänner du våra <Link href="/villkor">köpvillkor</Link>.
      </p>
    </form>
  );
}
