import { promises as fs } from "fs";
import path from "path";
import { BlobNotFoundError, del, get, put } from "@vercel/blob";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { seedEvents } from "@/content/events";
import { products as seedProducts } from "@/content/products";
import { cheeses as seedCheeses, extras as seedExtras, type DeliItem } from "@/content/deli";

// Det Josefin ändrar i admin sparas här: event, Nytt på hyllan, menyerna och Deli To-Go (ostar i bit och tillbehör).
// På Vercel i Vercel Blob (BLOB_READ_WRITE_TOKEN). Lokalt, utan nyckel, i mappen .data/ så att allt går att testa.
// Finns inget sparat ännu används startvärdena i content/events.ts, content/products.ts och content/deli.ts.

export type StoredEvent = {
  id: string;
  date: string; // ÅÅÅÅ-MM-DD
  time?: string;
  title: string;
  description: string;
  price?: string;
  dropIn: boolean;
};

export type StoredProduct = { category: string; name: string; description: string; image?: string; example?: boolean };

export type MenuPage = { url: string; width: number; height: number };
export type MenuFile = { pdf: string; pages: MenuPage[]; updated: string };
export type StoredMenu = { glass?: MenuFile; full?: MenuFile };
export type StoredDeli = { cheeses: DeliItem[]; extras: DeliItem[] };

type Key = "events" | "products" | "menu" | "deli";

export const PRODUCT_SLOTS = 8;
export const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const localDir = path.join(process.cwd(), ".data");

async function read(key: Key): Promise<unknown | null> {
  if (useBlob()) {
    const res = await get(`data/${key}.json`, { access: "public", useCache: false }).catch((e: unknown) => {
      if (e instanceof BlobNotFoundError) return null;
      throw e; // Nätverksfel: låt sidan behålla sin förra version i stället för att visa startvärden.
    });
    if (!res || res.statusCode !== 200) return null;
    return JSON.parse(await new Response(res.stream).text());
  }
  try {
    return JSON.parse(await fs.readFile(path.join(localDir, `${key}.json`), "utf8"));
  } catch {
    return null;
  }
}

async function write(key: Key, data: unknown) {
  const body = JSON.stringify(data, null, 1);
  if (useBlob()) {
    await put(`data/${key}.json`, body, { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
  } else {
    await fs.mkdir(localDir, { recursive: true });
    await fs.writeFile(path.join(localDir, `${key}.json`), body);
  }
  revalidateTag(`store-${key}`);
  for (const p of ["/", "/event", "/butiken", "/meny", "/deli-to-go", "/admin"]) revalidatePath(p);
}

export const getEvents = unstable_cache(
  async (): Promise<StoredEvent[]> => {
    const data = await read("events");
    return Array.isArray(data) ? (data as StoredEvent[]) : seedEvents;
  },
  ["store-events"],
  { tags: ["store-events"], revalidate: 3600 },
);

export const getProducts = unstable_cache(
  async (): Promise<StoredProduct[]> => {
    const data = await read("products");
    const list = Array.isArray(data) ? (data as StoredProduct[]) : seedProducts;
    return list.slice(0, PRODUCT_SLOTS);
  },
  ["store-products", "seed-2026-11-18"], // Byt nyckel när startlistan i content/products.ts ändras.
  { tags: ["store-products"], revalidate: 3600 },
);

export const getMenu = unstable_cache(
  async (): Promise<StoredMenu> => {
    const data = await read("menu");
    return data && typeof data === "object" ? (data as StoredMenu) : {};
  },
  ["store-menu"],
  { tags: ["store-menu"], revalidate: 3600 },
);

export const getDeli = unstable_cache(
  async (): Promise<StoredDeli> => {
    const data = (await read("deli")) as Partial<StoredDeli> | null;
    return {
      cheeses: Array.isArray(data?.cheeses) ? data.cheeses : seedCheeses,
      extras: Array.isArray(data?.extras) ? data.extras : seedExtras,
    };
  },
  ["store-deli"],
  { tags: ["store-deli"], revalidate: 3600 },
);

export const saveEvents = (list: StoredEvent[]) => write("events", list);
export const saveProducts = (list: StoredProduct[]) => write("products", list);
export const saveMenu = (menu: StoredMenu) => write("menu", menu);
export const saveDeli = (deli: StoredDeli) => write("deli", deli);

// Bara filer som ligger i vår egen lagring får användas som bild eller PDF.
export function isOwnFile(url: unknown): url is string {
  if (typeof url !== "string" || url.length > 500) return false;
  if (url.startsWith("/api/local-files/uploads/")) return !useBlob();
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".public.blob.vercel-storage.com") && u.pathname.startsWith("/uploads/");
  } catch {
    return false;
  }
}

// Tar bort filer som inte längre används (gamla foton och menysidor).
export async function removeFiles(urls: (string | undefined)[]) {
  const own = urls.filter(isOwnFile);
  if (!own.length) return;
  try {
    if (useBlob()) await del(own);
    else await Promise.all(own.map((u) => fs.rm(path.join(localDir, u.replace("/api/local-files/", "")), { force: true })));
  } catch {
    // En fil som inte gick att ta bort ligger bara kvar. Det påverkar inte sajten.
  }
}

export const localFilesDir = localDir;
