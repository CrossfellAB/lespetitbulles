"use client";

import { useState } from "react";
import type { MenuFile, StoredMenu } from "@/lib/store";
import { postJson, renderPdfPages, uploadFile, type UploadMode } from "./files";

const kinds = [
  { key: "glass" as const, title: "Champagne på glas", help: "Veckans glasmeny. Visas överst på menysidan." },
  { key: "full" as const, title: "Hela menyn", help: "Den stora menyn med allt ni serverar. Går också att ladda ner som PDF." },
];

const dateFmt = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Stockholm" });

export default function MenuAdmin({ initial, mode }: { initial: StoredMenu; mode: UploadMode }) {
  const [menu, setMenu] = useState(initial);
  const [busy, setBusy] = useState<{ kind: string; text: string } | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function publish(kind: "glass" | "full", file: File) {
    setMsg(null);
    if (file.type !== "application/pdf") {
      setMsg({ ok: false, text: "Välj en PDF-fil, till exempel den du laddat ner från Canva." });
      return;
    }
    try {
      setBusy({ kind, text: "Läser PDF:en …" });
      const pages = await renderPdfPages(file);
      setBusy({ kind, text: "Laddar upp PDF:en …" });
      const pdf = await uploadFile(file, `meny-${kind}.pdf`, mode);
      const uploaded: MenuFile["pages"] = [];
      for (let i = 0; i < pages.length; i++) {
        setBusy({ kind, text: `Laddar upp sida ${i + 1} av ${pages.length} …` });
        const url = await uploadFile(pages[i].blob, `meny-${kind}-sida-${i + 1}.jpg`, mode);
        uploaded.push({ url, width: pages[i].width, height: pages[i].height });
      }
      setBusy({ kind, text: "Publicerar …" });
      const res = await postJson<{ menu: StoredMenu }>("/api/admin/menu", { kind, file: { pdf, pages: uploaded } });
      setMenu(res.menu);
      setMsg({ ok: true, text: `${kinds.find((k) => k.key === kind)!.title} är uppdaterad på sajten.` });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message || "Det gick inte att läsa PDF:en." });
    }
    setBusy(null);
  }

  return (
    <section>
      <div className="adm-head">
        <div>
          <h2 className="h-m">Menyn</h2>
          <p className="small">Ladda upp PDF:en från Canva. Sidan <a href="/meny" target="_blank">/meny</a> visar den direkt, och gästerna kan också ladda ner den.</p>
        </div>
      </div>

      {msg && <div className={msg.ok ? "alert alert-ok" : "alert alert-err"} role="status">{msg.text}</div>}

      <div className="adm-menus">
        {kinds.map((k) => {
          const current = menu[k.key];
          const mine = busy?.kind === k.key;
          return (
            <div className="panel adm-menu" key={k.key}>
              <h3>{k.title}</h3>
              <p className="small">{k.help}</p>
              <div className="adm-menu-preview">
                {current ? (
                  <a href={current.pdf} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={current.pages[0].url} alt={`${k.title}, första sidan`} />
                  </a>
                ) : (
                  <span>Ingen PDF uppladdad ännu. Sajten visar den menyn som finns inlagd sedan tidigare.</span>
                )}
              </div>
              {current && <p className="small">Uppdaterad {dateFmt.format(new Date(current.updated))} · {current.pages.length} {current.pages.length === 1 ? "sida" : "sidor"}</p>}
              <label className={busy ? "btn btn-clay is-disabled" : "btn btn-clay"}>
                {mine ? busy!.text : current ? "Ladda upp ny PDF" : "Ladda upp PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  disabled={!!busy}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (f) publish(k.key, f);
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
