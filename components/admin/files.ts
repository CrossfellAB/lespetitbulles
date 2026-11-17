"use client";

// Hjälpfunktioner i webbläsaren: krymp foton, gör bilder av PDF-sidor och ladda upp filer.

export type UploadMode = "blob" | "local";

function safeName(name: string) {
  return (name || "fil").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9._-]+/g, "-").slice(-60);
}

export async function uploadFile(file: Blob, name: string, mode: UploadMode, onProgress?: (pct: number) => void): Promise<string> {
  if (mode === "blob") {
    const { upload } = await import("@vercel/blob/client");
    const res = await upload(`uploads/${safeName(name)}`, file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
      contentType: file.type,
      onUploadProgress: onProgress ? (e) => onProgress(e.percentage) : undefined,
    });
    return res.url;
  }
  const fd = new FormData();
  fd.append("file", file, safeName(name));
  const res = await fetch("/api/admin/upload-local", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.url) throw new Error(json.error || "Uppladdningen misslyckades.");
  onProgress?.(100);
  return json.url;
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Bilden kunde inte skapas."))), "image/jpeg", quality),
  );
}

// Krymper ett foto till högst 1600 px och sparar som JPG. Fungerar med foton direkt från mobilen.
export async function resizePhoto(file: File, max = 1600): Promise<Blob> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Bilden gick inte att läsa. Prova att spara den som JPG först.");
  }
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvasToJpeg(canvas, 0.85);
}

// Gör en JPG-bild av varje sida i en PDF (max 12 sidor), 1400 px bred.
export async function renderPdfPages(file: File, width = 1400): Promise<{ blob: Blob; width: number; height: number }[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const doc = await task.promise;
  if (doc.numPages > 12) throw new Error("PDF:en har fler än 12 sidor.");
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: width / base.width });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    await page.render({ canvas, viewport }).promise;
    pages.push({ blob: await canvasToJpeg(canvas, 0.86), width: canvas.width, height: canvas.height });
  }
  await task.destroy();
  return pages;
}

export async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Något gick fel. Försök igen.");
  return json as T;
}
