"use client";

import { useState } from "react";
import type { StoredDeli, StoredEvent, StoredMenu, StoredProduct } from "@/lib/store";
import DeliAdmin from "./DeliAdmin";
import EventsAdmin from "./EventsAdmin";
import MenuAdmin from "./MenuAdmin";
import ProductsAdmin from "./ProductsAdmin";
import type { UploadMode } from "./files";

const tabs = [
  { key: "events", label: "Event & provningar" },
  { key: "products", label: "Nytt på hyllan" },
  { key: "menu", label: "Menyn" },
  { key: "deli", label: "Deli To-Go" },
] as const;

type Props = { events: StoredEvent[]; products: StoredProduct[]; menu: StoredMenu; deli: StoredDeli; slots: number; mode: UploadMode; today: string };

export default function AdminApp(props: Props) {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("events");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/admin/login";
  }

  return (
    <div className="adm">
      <div className="adm-top">
        <div>
          <p className="eyebrow">Les Petit Bulles</p>
          <h1 className="h-l">Uppdatera sajten</h1>
        </div>
        <div className="adm-top-links">
          <a href="/" target="_blank">Visa sajten ↗</a>
          <button type="button" className="btn btn-line btn-small" onClick={logout}>Logga ut</button>
        </div>
      </div>
      {props.mode === "local" && <div className="alert alert-err">Testläge: ändringar sparas bara på den här datorn.</div>}
      <nav className="adm-tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className={tab === t.key ? "is-active" : ""} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </nav>
      <div hidden={tab !== "events"}><EventsAdmin initial={props.events} today={props.today} /></div>
      <div hidden={tab !== "products"}><ProductsAdmin initial={props.products} slots={props.slots} mode={props.mode} /></div>
      <div hidden={tab !== "menu"}><MenuAdmin initial={props.menu} mode={props.mode} /></div>
      <div hidden={tab !== "deli"}><DeliAdmin initial={props.deli} mode={props.mode} /></div>
    </div>
  );
}
