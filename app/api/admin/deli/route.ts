import { NextResponse } from "next/server";
import { fixedVariantIds, type DeliItem, type DeliVariant } from "@/content/deli";
import { guard } from "@/lib/admin/guard";
import { getDeli, isOwnFile, removeFiles, saveDeli, type StoredDeli } from "@/lib/store";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const idText = (v: unknown) => (typeof v === "string" && /^[a-z0-9-]{1,80}$/.test(v) ? v : "");

function slugify(s: string, fallback: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || fallback;
}

const isImage = (v: unknown): v is string => isOwnFile(v) || (typeof v === "string" && /^\/img\/[a-z0-9-]+\.(jpg|png)$/.test(v));

class Bad extends Error {}

// Tar emot hela listan med ostar eller tillbehör och sparar den. Varje vara kontrolleras och rensas.
// Varu-id behålls när en vara ändras, så att den som redan har varan i varukorgen fortfarande kan betala.
function clean(kind: "cheeses" | "extras", raw: unknown[], taken: Set<string>): DeliItem[] {
  const slugs = new Set<string>();
  const unique = (base: string, seen: Set<string>) => {
    let id = base;
    for (let n = 2; seen.has(id); n++) id = `${base}-${n}`;
    seen.add(id);
    return id;
  };
  return raw.map((r) => {
    const o = (r ?? {}) as Record<string, unknown>;
    const name = text(o.name, 80);
    if (!name) throw new Bad(kind === "cheeses" ? "Varje ost behöver ett namn." : "Varje tillbehör behöver ett namn.");
    const slug = unique(idText(o.slug) || slugify(name, kind === "cheeses" ? "ost" : "tillbehor"), slugs);
    const item: DeliItem = { slug, name, variants: [] };
    const lead = text(o.lead, 80);
    if (lead) item.lead = lead;

    const rawVariants = Array.isArray(o.variants) ? o.variants.slice(0, kind === "cheeses" ? 4 : 1) : [];
    if (!rawVariants.length) throw new Bad(`Ange ett pris för "${name}".`);
    item.variants = rawVariants.map((rv) => {
      const v = (rv ?? {}) as Record<string, unknown>;
      const price = Number(v.priceSek);
      if (!Number.isInteger(price) || price < 1 || price > 10000) throw new Bad(`Priset för "${name}" ska vara ett helt antal kronor.`);
      const label = kind === "cheeses" ? text(v.label, 30) : "";
      if (kind === "cheeses" && !label) throw new Bad(`Ange vikt, t.ex. 150 g, för varje pris på "${name}".`);
      const keep = idText(v.id);
      const id = keep && !taken.has(keep) ? keep : unique(label ? `${slug}-${slugify(label, "bit")}` : slug, taken);
      taken.add(id);
      const out: DeliVariant = { id, priceSek: price };
      if (label) out.label = label;
      return out;
    });

    if (kind === "cheeses") {
      const badge = text(o.badge, 60);
      if (badge) item.badge = badge;
      if (o.image) {
        if (!isImage(o.image)) throw new Bad(`Fotot för "${name}" kunde inte sparas. Ladda upp det igen.`);
        item.image = o.image;
        item.imageAlt = text(o.imageAlt, 120) || name;
        if (o.imageContain === true) item.imageContain = true;
      }
      const paragraphs = (Array.isArray(o.text) ? o.text : []).map((t) => text(t, 1200)).filter(Boolean).slice(0, 6);
      if (paragraphs.length) item.text = paragraphs;
    }
    return item;
  });
}

export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  const kind = body?.kind;
  if ((kind !== "cheeses" && kind !== "extras") || !Array.isArray(body?.items) || body.items.length > 60) {
    return NextResponse.json({ error: "Ogiltiga uppgifter." }, { status: 400 });
  }
  const current = await getDeli();
  const other = kind === "cheeses" ? current.extras : current.cheeses;
  const taken = new Set([...fixedVariantIds, ...other.flatMap((i) => i.variants.map((v) => v.id))]);
  let items: DeliItem[];
  try {
    items = clean(kind, body.items, taken);
  } catch (e) {
    if (e instanceof Bad) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
  const next: StoredDeli = { ...current, [kind]: items };
  await saveDeli(next);
  const kept = new Set(items.map((i) => i.image));
  await removeFiles(current[kind as "cheeses" | "extras"].map((i) => i.image).filter((u) => !kept.has(u)));
  return NextResponse.json({ ok: true, deli: next });
}
