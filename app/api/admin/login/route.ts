import { NextResponse } from "next/server";
import { adminConfigured, checkPassword, createSession, SESSION_COOKIE, SESSION_DAYS } from "@/lib/admin/auth";
import { sameOrigin } from "@/lib/admin/guard";

// Bromsar gissning av lösenordet: max fem fel per kvart och IP-adress (per serverinstans),
// och varje felaktigt försök tar en sekund att besvara.
const failures = new Map<string, number[]>();
const WINDOW = 15 * 60_000;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 403 });
  if (!adminConfigured()) return NextResponse.json({ error: "Inloggningen är inte aktiverad ännu." }, { status: 503 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "okänd";
  const now = Date.now();
  const recent = (failures.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= 5) {
    return NextResponse.json({ error: "För många försök. Vänta en kvart och försök igen." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  if (!(await checkPassword(body?.password))) {
    failures.set(ip, [...recent, now]);
    await new Promise((r) => setTimeout(r, 1000));
    return NextResponse.json({ error: "Fel lösenord." }, { status: 401 });
  }
  failures.delete(ip);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  return res;
}
