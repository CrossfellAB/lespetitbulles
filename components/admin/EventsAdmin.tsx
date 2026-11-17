"use client";

import { useState } from "react";
import type { StoredEvent } from "@/lib/store";
import { postJson } from "./files";

type Draft = Omit<StoredEvent, "id"> & { id?: string };
const empty: Draft = { date: "", time: "", title: "", description: "", price: "", dropIn: true };

const fmt = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return new Intl.DateTimeFormat("sv-SE", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, day)));
};

export default function EventsAdmin({ initial, today }: { initial: StoredEvent[]; today: string }) {
  const [events, setEvents] = useState(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const past = events.filter((e) => e.date < today);
  const coming = events.filter((e) => e.date >= today);

  async function save(next: Draft[], okText: string) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await postJson<{ events: StoredEvent[] }>("/api/admin/events", { events: next });
      setEvents(res.events);
      setDraft(null);
      setMsg({ ok: true, text: okText });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    }
    setBusy(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    const isEdit = !!draft.id;
    const next = isEdit ? events.map((x) => (x.id === draft.id ? { ...draft, id: x.id } : x)) : [...events, draft];
    save(next, isEdit ? "Eventet är uppdaterat och syns på sajten." : "Eventet är tillagt och syns på sajten.");
  }

  function remove(e: StoredEvent) {
    if (!confirm(`Ta bort "${e.title}"?`)) return;
    save(events.filter((x) => x.id !== e.id), "Eventet är borttaget.");
  }

  function removePast() {
    if (!confirm(`Ta bort ${past.length} passerade event?`)) return;
    save(coming, "Passerade event är borttagna.");
  }

  const row = (e: StoredEvent, isPast: boolean) => (
    <li key={e.id} className={isPast ? "adm-row is-past" : "adm-row"}>
      <div className="adm-date">{fmt(e.date)}{e.time ? <small>{e.time}</small> : null}</div>
      <div className="adm-main">
        <b>{e.title}</b>
        <span className={e.dropIn ? "adm-tag" : "adm-tag strong"}>{e.dropIn ? "Drop-in" : "Anmäl intresse"}</span>
        {isPast && <span className="adm-tag muted">Passerat, visas inte</span>}
        {e.description && <p>{e.description}</p>}
      </div>
      <div className="adm-actions">
        <button type="button" className="btn btn-line btn-small" disabled={busy} onClick={() => { setMsg(null); setDraft({ ...empty, ...e }); }}>Ändra</button>
        <button type="button" className="btn btn-line btn-small danger" disabled={busy} onClick={() => remove(e)}>Ta bort</button>
      </div>
    </li>
  );

  return (
    <section>
      <div className="adm-head">
        <div>
          <h2 className="h-m">Event &amp; provningar</h2>
          <p className="small">Visas på startsidan och under Event. Event vars datum har passerat försvinner från sajten automatiskt.</p>
        </div>
        {!draft && <button type="button" className="btn btn-clay" onClick={() => { setMsg(null); setDraft({ ...empty }); }}>+ Lägg till event</button>}
      </div>

      {msg && <div className={msg.ok ? "alert alert-ok" : "alert alert-err"} role="status">{msg.text}</div>}

      {draft && (
        <form className="panel form adm-form" onSubmit={submit}>
          <h3>{draft.id ? "Ändra event" : "Nytt event"}</h3>
          <div className="form-row">
            <div className="field">
              <label htmlFor="ev-date">Datum</label>
              <input id="ev-date" type="date" required value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="ev-time">Tid (valfritt)</label>
              <input id="ev-time" placeholder="T.ex. 16–19" maxLength={20} value={draft.time ?? ""} onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="ev-title">Rubrik</label>
            <input id="ev-title" required maxLength={80} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="ev-desc">Beskrivning</label>
            <textarea id="ev-desc" rows={3} maxLength={400} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="ev-price">Pris (valfritt)</label>
            <input id="ev-price" placeholder="T.ex. 269 kr/person" maxLength={40} value={draft.price ?? ""} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
          </div>
          <fieldset className="adm-choice">
            <legend>Hur kommer gästerna?</legend>
            <label><input type="radio" name="ev-kind" checked={draft.dropIn} onChange={() => setDraft({ ...draft, dropIn: true })} /> Drop-in · kom förbi</label>
            <label><input type="radio" name="ev-kind" checked={!draft.dropIn} onChange={() => setDraft({ ...draft, dropIn: false })} /> Anmäl intresse (gästen skickar en anmälan till dig)</label>
          </fieldset>
          <div className="adm-buttons">
            <button className="btn btn-clay" type="submit" disabled={busy}>{busy ? "Sparar …" : draft.id ? "Spara ändringen" : "Lägg till"}</button>
            <button className="btn btn-line" type="button" disabled={busy} onClick={() => setDraft(null)}>Avbryt</button>
          </div>
        </form>
      )}

      <h3 className="adm-sub">Kommande ({coming.length})</h3>
      {coming.length ? <ul className="adm-list">{coming.map((e) => row(e, false))}</ul> : <p className="small">Inga kommande event.</p>}

      {past.length > 0 && (
        <>
          <div className="adm-head" style={{ marginTop: 32 }}>
            <h3 className="adm-sub" style={{ margin: 0 }}>Passerade ({past.length})</h3>
            <button type="button" className="btn btn-line btn-small danger" disabled={busy} onClick={removePast}>Ta bort alla passerade</button>
          </div>
          <ul className="adm-list">{past.map((e) => row(e, true))}</ul>
        </>
      )}
    </section>
  );
}
