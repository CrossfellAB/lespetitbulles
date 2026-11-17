// "Nytt på hyllan": fyra nyheter som visas på startsidan och under Butiken.
// Josefin byter ut dem i admin (/admin). Listan nedan används bara tills första gången något sparas där.

import type { StoredProduct } from "@/lib/store";

export const products: StoredProduct[] = [
  { category: "Ost · Jura", name: "Comté 18 mån", description: "Nötig och knastrig. Perfekt till blanc de blancs.", example: true },
  { category: "Champagne · Aÿ", name: "Deutz Brut Classic", description: "Brödig och frisk. Husets favorit till brie.", example: true },
  { category: "Eget kök", name: "Jalapeñomarmelad", description: "Söt hetta som lyfter vitmögelost.", example: true },
  { category: "Ost · Champagne", name: "Langres", description: "Kittost från regionen. Häll en skvätt i gropen.", example: true },
];
