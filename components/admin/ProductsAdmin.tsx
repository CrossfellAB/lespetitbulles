"use client";

import { useState } from "react";
import type { StoredProduct } from "@/lib/store";
import { postJson, resizePhoto, uploadFile, type UploadMode } from "./files";

const categories = ["Ost", "Bubbel", "Champagne", "Eget kök", "Deli", "Chark", "Marmelad", "Sött"];

type Draft = { slot: number; category: string; name: string; description: string; image?: string; file?: File; preview?: string };

export default function ProductsAdmin({ initial, slots, mode }: { initial: StoredProduct[]; slots: number; mode: UploadMode }) {
  const [products, setProducts] = useState(() => Array.from({ length: slots }, (_, i) => initial[i] ?? { category: "", name: "", description: "" }));
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function open(slot: number, keep: boolean) {
    const p = products[slot];
    setMsg(null);
    setDraft(keep ? { slot, category: p.category, name: p.name, description: p.description, image: p.image } : { slot, category: "", name: "", description: "" });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setMsg(null);
    try {
      let image = draft.image;
      if (draft.file) {
        setBusy("Förbereder bilden …");
        const photo = await resizePhoto(draft.file);
        setBusy("Laddar upp bilden …");
        image = await uploadFile(photo, `hyllan-${draft.file.name.replace(/\.[^.]+$/, "")}.jpg`, mode, (p) => setBusy(`Laddar upp bilden … ${Math.round(p)} %`));
      }
      setBusy("Sparar …");
      const res = await postJson<{ products: StoredProduct[] }>("/api/admin/products", {
        slot: draft.slot,
        product: { category: draft.category, name: draft.name, description: draft.description, image },
      });
      setProducts(res.products);
      setDraft(null);
      setMsg({ ok: true, text: `Nyhet ${draft.slot + 1} är sparad och syns på sajten.` });
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    }
    setBusy(null);
  }

  return (
    <section>
      <div className="adm-head">
        <div>
          <h2 className="h-m">Nytt på hyllan</h2>
          <p className="small">Upp till {slots} nyheter. De fyra första visas på startsidan, alla under Butiken. Välj vilken du vill byta ut.</p>
        </div>
      </div>

      {msg && <div className={msg.ok ? "alert alert-ok" : "alert alert-err"} role="status">{msg.text}</div>}

      {draft && (
        <form className="panel form adm-form" onSubmit={submit}>
          <h3>Nyhet {draft.slot + 1}{products[draft.slot]?.name ? ` (ersätter "${products[draft.slot].name}")` : ""}</h3>
          <div className="field">
            <label htmlFor="pr-cat">Kategori</label>
            <input id="pr-cat" list="pr-cats" maxLength={40} placeholder="Välj eller skriv, t.ex. Ost · Jura" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
            <datalist id="pr-cats">{categories.map((c) => (<option key={c} value={c} />))}</datalist>
          </div>
          <div className="field">
            <label htmlFor="pr-name">Rubrik</label>
            <input id="pr-name" required maxLength={60} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="pr-desc">Beskrivning</label>
            <textarea id="pr-desc" rows={3} maxLength={220} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            <small className="small">{draft.description.length}/220 tecken</small>
          </div>
          <div className="field">
            <label htmlFor="pr-photo">Foto {draft.image ? "(välj ett nytt för att byta)" : "(valfritt)"}</label>
            <input
              id="pr-photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (draft.preview) URL.revokeObjectURL(draft.preview);
                setDraft({ ...draft, file, preview: file ? URL.createObjectURL(file) : undefined });
              }}
            />
            {(draft.preview || draft.image) && (
              <div className="adm-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={draft.preview ?? draft.image} alt="" />
                {!draft.preview && draft.image && (
                  <button type="button" className="btn btn-line btn-small" onClick={() => setDraft({ ...draft, image: undefined })}>Ta bort fotot</button>
                )}
              </div>
            )}
          </div>
          <div className="adm-buttons">
            <button className="btn btn-clay" type="submit" disabled={!!busy}>{busy ?? "Spara och publicera"}</button>
            <button className="btn btn-line" type="button" disabled={!!busy} onClick={() => setDraft(null)}>Avbryt</button>
          </div>
        </form>
      )}

      <div className="adm-products">
        {products.map((p, i) => (
          <div className={draft?.slot === i ? "adm-product is-active" : "adm-product"} key={i}>
            <div className="adm-product-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.image ? <img src={p.image} alt="" /> : <span>Inget foto</span>}
            </div>
            <div className="adm-product-body">
              <small>Nyhet {i + 1}{p.example ? " · exempeltext" : ""}</small>
              <div className="cat">{p.category}</div>
              <b>{p.name || "Tom"}</b>
              <p>{p.description}</p>
            </div>
            <div className="adm-actions">
              <button type="button" className="btn btn-clay btn-small" disabled={!!busy} onClick={() => open(i, false)}>Byt ut</button>
              <button type="button" className="btn btn-line btn-small" disabled={!!busy || !p.name} onClick={() => open(i, true)}>Ändra</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
