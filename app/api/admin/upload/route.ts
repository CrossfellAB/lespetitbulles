import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";
import { sameOrigin } from "@/lib/admin/guard";

// Ger webbläsaren tillstånd att ladda upp en fil direkt till Vercel Blob (bilder och PDF:er),
// men bara om Josefin är inloggad. Filer hamnar alltid under uploads/ och får ett slumpat namn.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const token = (await cookies()).get(SESSION_COOKIE)?.value;
        if (!sameOrigin(req) || !(await verifySession(token))) throw new Error("Du är inte inloggad.");
        if (!/^uploads\/[a-z0-9._-]{1,80}$/i.test(pathname)) throw new Error("Ogiltigt filnamn.");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
          maximumSizeInBytes: 25 * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 31536000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Uppladdningen misslyckades." }, { status: 400 });
  }
}
