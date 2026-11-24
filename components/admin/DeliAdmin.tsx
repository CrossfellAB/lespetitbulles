"use client";

import { useState } from "react";
import type { DeliItem } from "@/content/deli";
import type { StoredDeli } from "@/lib/store";
import { postJson, resizePhoto, uploadFile, type UploadMode } from "./files";

type Kind = "cheeses" | "extras";
type VariantDraft = { id?: string; label: string; price: string };
type Draft = {
  kind: Kind;
  index: number | null; // null = ny vara
  slug?: string;
  name: string;
  lead: string;
  badge: string;
  text: string; // stycken med en tom rad emellan
  image?: string;
  imageContain: boolean;
  file?: File;
  preview?: string;
  variants: VariantDraft[];
};

const label = { cheeses: "osten", extras: "tillbehöret" };

function toDraft(kind: Kind, index: number | null, item?: DeliItem): Draft {
  return {
    kind,
    index,
    slug: item?.slug,
    name: item?.name ?? "",
    lead: item?.lead ?? "",
    badge: item?.badge ?? "",
    text: (item?.text ?? []).join("\n\n"),
    image: item?.image,
    imageContain: item?.imageContain ?? false,
    variants: item?.variants.map((v) => ({ id: v.id, label: v.label ?? "", price: String(v.priceSek) })) ?? (kind === "cheeses" ? [{ label: "150 g", price: "" }] : [{ label: "", price: "" }]),
  };
}

export default function DeliAdmin({ initial, mode }: { initial: StoredDeli; mode: UploadMode }) {
  const [deli, setDeli] = useState(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save(kind: Kind, items: DeliItem[], okText: string) {
    setBusy("Sparar …");
    setMsg(null);
    try {
      const res = await postJson<{ deli: StoredDeli }>("/api/admin/deli", { kind, items });
      setDeli(res.deli);
      setDraft(null);
      setMsg({ ok: true, text: okText });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    }
    setBusy(null);
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
        image = await uploadFile(photo, `deli-${draft.file.name.replace(/\.[^.]+$/, "")}.jpg`, mode, (p) => setBusy(`Laddar upp bilden … ${Math.round(p)} %`));
      }
      const old = draft.index === null ? undefined : deli[draft.kind][draft.index];
      const item = {
        slug: draft.slug,
        name: draft.name,
        lead: draft.lead,
        badge: draft.badge,
        text: draft.text.split(/\n\s*\n/),
        image,
        imageAlt: image && image === old?.image ? old?.imageAlt : draft.name,
        imageContain: draft.imageContain,
        variants: draft.variants.map((v) => ({ id: v.id, label: v.label, priceSek: Number(v.price.replace(",", ".")) })),
      } as unknown as DeliItem;
      const list = [...deli[draft.kind]];
      if (draft.index === null) list.push(item);
      else list[draft.index] = item;
      await save(draft.kind, list, draft.index === null ? `${draft.name} är tillagd och syns på sajten.` : `${draft.name} är uppdaterad på sajten.`);
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
      setBusy(null);
    }
  }

  function remove(kind: Kind, i: number) {
    const item = deli[kind][i];
    if (!confirm(`Ta bort "${item.name}" från Deli To-Go?`)) return;
    save(kind, deli[kind].filter((_, j) => j !== i), `${item.name} är borttagen.`);
  }

  function move(kind: Kind, i: number, dir: -1 | 1) {
    const list = [...deli[kind]];
    [list[i], list[i + dir]] = [list[i + dir], list[i]];
    save(kind, list, "Ordningen är sparad.");
  }

  const setVariant = (i: number, patch: Partial<VariantDraft>) =>
    draft && setDraft({ ...draft, variants: draft.variants.map((v, j) => (j === i ? { ...v, ...patch } : v)) });

  const form = draft && (
    <form className="panel form adm-form" onSubmit={submit}>
      <h3>{draft.index === null ? (draft.kind === "cheeses" ? "Ny ost" : "Nytt tillbehör") : `Ändra ${deli[draft.kind][draft.index].name}`}</h3>
      <div className="field">
        <label htmlFor="dl-name">Namn</label>
        <input id="dl-name" required maxLength={80} placeholder={draft.kind === "cheeses" ? "t.ex. Comté AOP, 24 månader" : "t.ex. Fikonmarmelad"} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="dl-lead">{draft.kind === "cheeses" ? "Mejeri eller ursprung (valfritt)" : "Märke eller storlek (valfritt)"}</label>
        <input id="dl-lead" maxLength={80} placeholder={draft.kind === "cheeses" ? "t.ex. Thise mejeri" : "t.ex. Charles Antona, 110 g"} value={draft.lead} onChange={(e) => setDraft({ ...draft, lead: e.target.value })} />
      </div>

      {draft.kind === "cheeses" ? (
        <>
          <div className="field">
            <label htmlFor="dl-badge">Utmärkelse (valfritt)</label>
            <input id="dl-badge" maxLength={60} placeholder="t.ex. Världens bästa ost 2026–2027" value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="dl-text">Beskrivning</label>
            <textarea id="dl-text" rows={6} value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} />
            <small className="small">Lämna en tom rad mellan styckena. Första stycket syns direkt, resten under ”Läs mer”.</small>
          </div>
          <fieldset className="adm-choice field">
            <legend>Vikt och pris</legend>
            {draft.variants.map((v, i) => (
              <div className="adm-variant" key={i}>
                <input aria-label="Vikt" required maxLength={30} placeholder="150 g" value={v.label} onChange={(e) => setVariant(i, { label: e.target.value })} />
                <input aria-label="Pris i kronor" required inputMode="numeric" pattern="[0-9]+" placeholder="Pris" value={v.price} onChange={(e) => setVariant(i, { price: e.target.value })} />
                <span>kr</span>
                {draft.variants.length > 1 && (
                  <button type="button" className="btn btn-line btn-small" onClick={() => setDraft({ ...draft, variants: draft.variants.filter((_, j) => j !== i) })}>Ta bort</button>
                )}
              </div>
            ))}
            {draft.variants.length < 4 && (
              <div>
                <button type="button" className="btn btn-line btn-small" onClick={() => setDraft({ ...draft, variants: [...draft.variants, { label: "", price: "" }] })}>+ Lägg till en vikt</button>
              </div>
            )}
          </fieldset>
          <div className="field">
            <label htmlFor="dl-photo">Foto {draft.image ? "(välj ett nytt för att byta)" : "(valfritt)"}</label>
            <input
              id="dl-photo"
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
                <img src={draft.preview ?? draft.image} alt="" style={draft.imageContain ? { objectFit: "contain", background: "#fff" } : undefined} />
                {!draft.preview && draft.image && (
                  <button type="button" className="btn btn-line btn-small" onClick={() => setDraft({ ...draft, image: undefined })}>Ta bort fotot</button>
                )}
              </div>
            )}
            {(draft.preview || draft.image) && (
              <label className="adm-check">
                <input type="checkbox" checked={draft.imageContain} onChange={(e) => setDraft({ ...draft, imageContain: e.target.checked })} />
                Produktbild på vit bakgrund (visa hela bilden utan att beskära)
              </label>
            )}
          </div>
        </>
      ) : (
        <div className="field">
          <label htmlFor="dl-price">Pris</label>
          <div className="adm-variant">
            <input id="dl-price" required inputMode="numeric" pattern="[0-9]+" placeholder="Pris" value={draft.variants[0].price} onChange={(e) => setVariant(0, { price: e.target.value })} />
            <span>kr</span>
          </div>
        </div>
      )}

      <div className="adm-buttons">
        <button className="btn btn-clay" type="submit" disabled={!!busy}>{busy ?? "Spara och publicera"}</button>
        <button className="btn btn-line" type="button" disabled={!!busy} onClick={() => setDraft(null)}>Avbryt</button>
      </div>
    </form>
  );

  const list = (kind: Kind) => (
    <ul className="adm-list">
      {deli[kind].map((item, i) => (
        <li key={item.slug} className="adm-row adm-deli-row">
          <div className="adm-deli-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {item.image ? <img src={item.image} alt="" style={item.imageContain ? { objectFit: "contain" } : undefined} /> : null}
          </div>
          <div className="adm-main">
            <b>{item.name}</b>
            {item.badge && <span className="adm-tag strong">{item.badge}</span>}
            <p>{[item.lead, item.variants.map((v) => (v.label ? `${v.label} ${v.priceSek} kr` : `${v.priceSek} kr`)).join(" · ")].filter(Boolean).join(" · ")}</p>
          </div>
          <div className="adm-actions">
            <button type="button" className="btn btn-line btn-small" disabled={!!busy || i === 0} onClick={() => move(kind, i, -1)} aria-label="Flytta upp">↑</button>
            <button type="button" className="btn btn-line btn-small" disabled={!!busy || i === deli[kind].length - 1} onClick={() => move(kind, i, 1)} aria-label="Flytta ner">↓</button>
            <button type="button" className="btn btn-line btn-small" disabled={!!busy} onClick={() => { setMsg(null); setDraft(toDraft(kind, i, item)); }}>Ändra</button>
            <button type="button" className="btn btn-line btn-small danger" disabled={!!busy} onClick={() => remove(kind, i)}>Ta bort</button>
          </div>
        </li>
      ))}
      {!deli[kind].length && <li className="small">Inget här just nu. Avsnittet visas tomt på sajten tills du lägger till {label[kind] === "osten" ? "en ost" : "ett tillbehör"}.</li>}
    </ul>
  );

  const section = (kind: Kind, title: string, help: string, add: string) => (
    <div className="adm-deli-group">
      <div className="adm-head">
        <div>
          <h2 className="h-m">{title}</h2>
          <p className="small">{help}</p>
        </div>
        <button type="button" className="btn btn-clay btn-small" disabled={!!busy} onClick={() => { setMsg(null); setDraft(toDraft(kind, null)); }}>{add}</button>
      </div>
      {draft?.kind === kind && form}
      {list(kind)}
    </div>
  );

  return (
    <section>
      <p className="small">Det du ändrar här syns direkt på <a href="/deli-to-go" target="_blank">/deli-to-go</a>. Fredagslådan och Ostpåsen ändrar Mats.</p>
      {msg && <div className={msg.ok ? "alert alert-ok" : "alert alert-err"} role="status">{msg.text}</div>}
      {section("cheeses", "Ostar i bit", "Varje ost kan ha upp till fyra vikter med egna priser.", "+ Lägg till ost")}
      {section("extras", "Extra tillbehör", "Marmelad, oliver, kex och annat som går att lägga till i beställningen.", "+ Lägg till tillbehör")}
    </section>
  );
}
