import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { guard } from "@/lib/admin/guard";
import { localFilesDir, useBlob } from "@/lib/store";

// Bara för lokal testning utan Vercel Blob. På sajten används /api/admin/upload.
export async function POST(req: Request) {
  if (useBlob()) return NextResponse.json({ error: "Används inte här." }, { status: 404 });
  const denied = await guard(req);
  if (denied) return denied;
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size > 25 * 1024 * 1024) return NextResponse.json({ error: "Ogiltig fil." }, { status: 400 });
  if (!["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type)) {
    return NextResponse.json({ error: "Filtypen stöds inte." }, { status: 400 });
  }
  const base = (file.name || "fil").replace(/[^a-z0-9._-]/gi, "-").slice(-60);
  const name = `${crypto.randomUUID().slice(0, 8)}-${base}`;
  await fs.mkdir(path.join(localFilesDir, "uploads"), { recursive: true });
  await fs.writeFile(path.join(localFilesDir, "uploads", name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/api/local-files/uploads/${name}` });
}
