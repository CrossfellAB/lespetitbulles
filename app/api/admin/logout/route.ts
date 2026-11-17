import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/auth";
import { sameOrigin } from "@/lib/admin/guard";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
