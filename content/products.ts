// "Nytt på hyllan". De fyra första visas på startsidan, alla visas under Butiken.

export type Product = { category: string; name: string; description: string; example?: boolean };

export const products: Product[] = [
  { category: "Ost · Jura", name: "Comté 18 mån", description: "Nötig och knastrig. Perfekt till blanc de blancs.", example: true },
  { category: "Champagne · Aÿ", name: "Deutz Brut Classic", description: "Brödig och frisk. Husets favorit till brie.", example: true },
  { category: "Eget kök", name: "Jalapeñomarmelad", description: "Söt hetta som lyfter vitmögelost.", example: true },
  { category: "Ost · Champagne", name: "Langres", description: "Kittost från regionen. Häll en skvätt i gropen.", example: true },
];
