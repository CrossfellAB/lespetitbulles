// Kommande event och provningar. Lägg till, ändra eller ta bort poster här.
// date: "ÅÅÅÅ-MM-DD" för engångsevent. Lämna date tom och fyll i recurring för återkommande.
// Passerade engångsevent döljs automatiskt.

export type EventItem = {
  title: string;
  date?: string;
  recurring?: string; // t.ex. "Varje fredag"
  time: string;
  description: string;
  price?: string;
  example?: boolean; // visar "exempel" tills riktiga event finns
  dropIn?: boolean; // ingen anmälan: visar "Kom förbi" i stället för knappen
};

export const events: EventItem[] = [
  {
    title: "After work i baren",
    recurring: "Onsdag till fredag",
    time: "16–19",
    description: "Ett glas bubbel och en liten charktallrik efter jobbet.",
  },
  {
    title: "Bubbel-blindprovning",
    date: "2026-11-18",
    time: "16–19",
    price: "269 kr/person",
    description: "Champagne, crémant, prosecco, cava … Boka på 0708-47 91 00 eller kom förbi!",
  },
  {
    title: "Beaujolais Nouveau-premiär",
    dropIn: true,
    date: "2026-11-19",
    time: "11–19",
    description: "Release av årets Bojo. Välkomna!",
  },
  {
    title: "Sip & Paint",
    date: "2026-11-25",
    time: "16–19",
    description: "Måla din egen julgranskula medan du bubblar.",
  },
  {
    title: "Deutz Friday!",
    dropIn: true,
    date: "2026-11-27",
    time: "15–19",
    description: "Marcus från Swedish Brand Wines serverar Amour de Deutz och engelska Nyetimber.",
  },
];
