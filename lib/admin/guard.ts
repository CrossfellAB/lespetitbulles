import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";

// Körs först i varje admin-API. Returnerar ett felsvar, eller null om anropet är tillåtet.
export async function guard(req: Request): Promise<NextResponse | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: "Du är inte inloggad. Ladda om sidan och logga in igen." }, { status: 401 });
  }
  if (req.method !== "GET" && !sameOrigin(req)) {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 403 });
  }
  return null;
}

// Skydd mot att en annan webbplats skickar formulär i Josefins namn.
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
