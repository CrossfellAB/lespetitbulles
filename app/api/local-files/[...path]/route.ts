import { promises as fs } from "fs";
import path from "path";
import { localFilesDir, useBlob } from "@/lib/store";

// Visar lokalt uppladdade filer vid testning. På sajten (med Vercel Blob) svarar den alltid 404.
const types: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf" };

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (useBlob()) return new Response("Not found", { status: 404 });
  const parts = (await params).path;
  if (parts[0] !== "uploads" || parts.length !== 2 || !/^[a-z0-9._-]+$/i.test(parts[1])) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(localFilesDir, "uploads", parts[1]));
    return new Response(data, { headers: { "Content-Type": types[path.extname(parts[1]).toLowerCase()] ?? "application/octet-stream" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
