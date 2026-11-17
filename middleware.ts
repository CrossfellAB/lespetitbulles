import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";

// Allt under /admin och /api/admin kräver inloggning, utom själva inloggningen.
// Uppladdningsrutten kontrollerar inloggningen själv, eftersom Vercel Blob också anropar den.
const open = ["/admin/login", "/api/admin/login", "/api/admin/upload"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = await (async () => {
    if (open.includes(pathname)) return NextResponse.next();
    if (await verifySession(req.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Du är inte inloggad." }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", req.url));
  })();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*", "/admin"] };
