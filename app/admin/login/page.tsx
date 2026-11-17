"use client";

import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).catch(() => null);
    if (res?.ok) {
      window.location.href = "/admin";
      return;
    }
    const json = await res?.json().catch(() => ({}));
    setError(json?.error || "Det gick inte att logga in. Kontrollera uppkopplingen.");
    setBusy(false);
  }

  return (
    <div className="panel adm-login">
      <p className="eyebrow">Les Petit Bulles</p>
      <h1 className="h-m" style={{ marginBottom: 18 }}>Logga in</h1>
      <form className="form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="password">Lösenord</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        </div>
        {error && <div className="alert alert-err" role="alert">{error}</div>}
        <button className="btn btn-clay" type="submit" disabled={busy}>{busy ? "Loggar in …" : "Logga in"}</button>
      </form>
    </div>
  );
}
