"use client";

import { useState } from "react";

type Props = {
  type: string; // t.ex. "Catering" – syns i mejlets ämnesrad
  showDate?: boolean;
  showGuests?: boolean;
  dateLabel?: string;
  messageLabel?: string;
  defaultMessage?: string;
  email: string;
};

type State = { status: "idle" | "sending" | "sent" | "error"; message?: string; fallback?: string };

export default function InquiryForm({
  type,
  showDate,
  showGuests,
  dateLabel = "Datum",
  messageLabel = "Berätta mer",
  defaultMessage = "",
  email,
}: Props) {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setState({ status: "sending" });

    const fallback = () => {
      const lines = [
        `Namn: ${data.name}`,
        `Telefon: ${data.phone || "-"}`,
        data.date ? `${dateLabel}: ${data.date}` : "",
        data.guests ? `Antal personer: ${data.guests}` : "",
        "",
        data.message,
      ].filter((l) => l !== "");
      return `mailto:${email}?subject=${encodeURIComponent(`${type} – förfrågan från ${data.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    };

    try {
      const res = await fetch("/api/forfragan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        form.reset();
        setState({ status: "sent" });
      } else {
        setState({ status: "error", message: json.error, fallback: fallback() });
      }
    } catch {
      setState({ status: "error", fallback: fallback() });
    }
  }

  if (state.status === "sent") {
    return (
      <div className="alert alert-ok" role="status">
        Tack! Vi har fått din förfrågan och hör av oss så snart vi kan, oftast inom ett par dagar.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor={`${type}-name`}>Namn</label>
          <input id={`${type}-name`} name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor={`${type}-phone`}>Telefon</label>
          <input id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${type}-email`}>E-post</label>
        <input id={`${type}-email`} name="email" type="email" required autoComplete="email" />
      </div>
      {(showDate || showGuests) && (
        <div className="form-row">
          {showDate && (
            <div className="field">
              <label htmlFor={`${type}-date`}>{dateLabel}</label>
              <input id={`${type}-date`} name="date" type="date" />
            </div>
          )}
          {showGuests && (
            <div className="field">
              <label htmlFor={`${type}-guests`}>Antal personer</label>
              <input id={`${type}-guests`} name="guests" type="number" min={1} inputMode="numeric" />
            </div>
          )}
        </div>
      )}
      <div className="field">
        <label htmlFor={`${type}-message`}>{messageLabel}</label>
        <textarea id={`${type}-message`} name="message" required defaultValue={defaultMessage} />
      </div>
      <div className="hp" aria-hidden="true">
        <label>Lämna tomt<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state.status === "error" && (
        <div className="alert alert-err" role="alert">
          {state.message || "Det gick inte att skicka just nu."}{" "}
          {state.fallback && (<>Du kan <a href={state.fallback}>skicka samma meddelande som mejl</a> eller ringa oss.</>)}
        </div>
      )}
      <div>
        <button className="btn btn-wine" type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Skickar …" : "Skicka förfrågan"}
        </button>
      </div>
      <p className="small" style={{ margin: 0 }}>Vi använder dina uppgifter bara för att svara på förfrågan.</p>
    </form>
  );
}
