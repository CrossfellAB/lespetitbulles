// Event och provningar.
// Josefin lägger till, ändrar och tar bort daterade event i admin (/admin). Det som sparas där gäller.
// seedEvents nedan används bara tills första gången något sparas i admin.
// recurringEvents är fasta återkommande punkter utan datum och ändras här i koden.

import type { StoredEvent } from "@/lib/store";

export type RecurringEvent = { title: string; recurring: string; time: string; description: string };

export const recurringEvents: RecurringEvent[] = [
  {
    title: "After work i baren",
    recurring: "Onsdag till fredag",
    time: "16–19",
    description: "Ett glas bubbel och en liten charktallrik efter jobbet.",
  },
];

export const seedEvents: StoredEvent[] = [
  {
    id: "bubbel-blindprovning-2026-11-18",
    title: "Bubbel-blindprovning",
    date: "2026-11-18",
    time: "16–19",
    price: "269 kr/person",
    description: "Champagne, crémant, prosecco, cava … Boka på 0708-47 91 00 eller kom förbi!",
    dropIn: false,
  },
  {
    id: "beaujolais-nouveau-2026-11-19",
    title: "Beaujolais Nouveau-premiär",
    date: "2026-11-19",
    time: "11–19",
    description: "Release av årets Bojo. Välkomna!",
    dropIn: true,
  },
  {
    id: "sip-paint-2026-11-25",
    title: "Sip & Paint",
    date: "2026-11-25",
    time: "16–19",
    description: "Måla din egen julgranskula medan du bubblar.",
    dropIn: true,
  },
  {
    id: "deutz-friday-2026-11-27",
    title: "Deutz Friday!",
    date: "2026-11-27",
    time: "15–19",
    description: "Marcus från Swedish Brand Wines serverar Amour de Deutz och engelska Nyetimber.",
    dropIn: true,
  },
];
