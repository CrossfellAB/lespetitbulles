import { NextResponse } from "next/server";
import { guard } from "@/lib/admin/guard";
import { saveEvents, type StoredEvent } from "@/lib/store";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

function slug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "event";
}

// Tar emot hela listan med event och sparar den. Varje rad kontrolleras och rensas.
export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.events) || body.events.length > 200) {
    return NextResponse.json({ error: "Ogiltiga uppgifter." }, { status: 400 });
  }
  const seen = new Set<string>();
  const events: StoredEvent[] = [];
  for (const raw of body.events) {
    const date = text(raw?.date, 10);
    const title = text(raw?.title, 80);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
      return NextResponse.json({ error: `Datumet saknas eller är fel för "${title || "ett event"}".` }, { status: 400 });
    }
    if (!title) return NextResponse.json({ error: "Varje event behöver en rubrik." }, { status: 400 });
    let id = text(raw?.id, 80).replace(/[^a-z0-9-]/g, "") || `${slug(title)}-${date}`;
    while (seen.has(id)) id = `${id}-x`;
    seen.add(id);
    const e: StoredEvent = { id, date, title, description: text(raw?.description, 400), dropIn: raw?.dropIn === true };
    const time = text(raw?.time, 20);
    const price = text(raw?.price, 40);
    if (time) e.time = time;
    if (price) e.price = price;
    events.push(e);
  }
  events.sort((a, b) => a.date.localeCompare(b.date));
  await saveEvents(events);
  return NextResponse.json({ ok: true, events });
}
