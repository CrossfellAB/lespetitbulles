import { NextResponse } from "next/server";
import { guard } from "@/lib/admin/guard";
import { getMenu, isOwnFile, removeFiles, saveMenu, type MenuFile } from "@/lib/store";

// Byter ut glasmenyn eller hela menyn: PDF:en och bilderna av dess sidor.
export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  const kind = body?.kind;
  if (kind !== "glass" && kind !== "full") return NextResponse.json({ error: "Ogiltig meny." }, { status: 400 });
  const f = body?.file;
  const pages = Array.isArray(f?.pages) ? f.pages : [];
  const valid =
    isOwnFile(f?.pdf) &&
    pages.length >= 1 &&
    pages.length <= 12 &&
    pages.every((p: { url?: unknown; width?: unknown; height?: unknown }) => isOwnFile(p?.url) && Number.isInteger(p?.width) && Number.isInteger(p?.height));
  if (!valid) return NextResponse.json({ error: "Menyn kunde inte sparas. Ladda upp PDF:en igen." }, { status: 400 });

  const file: MenuFile = {
    pdf: f.pdf,
    pages: pages.map((p: { url: string; width: number; height: number }) => ({ url: p.url, width: p.width, height: p.height })),
    updated: new Date().toISOString(),
  };
  const menu = { ...(await getMenu()) };
  const old = menu[kind as "glass" | "full"];
  menu[kind as "glass" | "full"] = file;
  await saveMenu(menu);
  if (old) await removeFiles([old.pdf, ...old.pages.map((p) => p.url)]);
  return NextResponse.json({ ok: true, menu });
}
