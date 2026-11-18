import { NextResponse } from "next/server";
import { guard } from "@/lib/admin/guard";
import { getProducts, isOwnFile, PRODUCT_SLOTS, removeFiles, saveProducts, type StoredProduct } from "@/lib/store";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

// Ersätter en av nyheterna (plats 0 till PRODUCT_SLOTS - 1).
export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  const slot = body?.slot;
  if (!Number.isInteger(slot) || slot < 0 || slot >= PRODUCT_SLOTS) {
    return NextResponse.json({ error: "Ogiltig plats." }, { status: 400 });
  }
  const p = body?.product ?? {};
  const name = text(p.name, 60);
  if (!name) return NextResponse.json({ error: "Nyheten behöver en rubrik." }, { status: 400 });
  if (p.image && !isOwnFile(p.image) && !/^\/img\/[a-z0-9-]+\.(jpg|png)$/.test(p.image)) return NextResponse.json({ error: "Bilden kunde inte sparas. Ladda upp den igen." }, { status: 400 });

  const list = [...(await getProducts())];
  while (list.length < PRODUCT_SLOTS) list.push({ category: "", name: "", description: "" });
  const old = list[slot];
  const next: StoredProduct = { category: text(p.category, 40), name, description: text(p.description, 220) };
  if (p.image) next.image = p.image;
  list[slot] = next;
  await saveProducts(list);
  if (old?.image && old.image !== next.image) await removeFiles([old.image]);
  return NextResponse.json({ ok: true, products: list });
}
