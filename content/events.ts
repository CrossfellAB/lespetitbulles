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
};

export const events: EventItem[] = [
  {
    title: "Provning: Deutz & franska ostar",
    date: "2026-11-27",
    time: "18.30",
    description: "Fyra champagner från huset Deutz i Aÿ, var och en med sin ost.",
    example: true,
  },
  {
    title: "After work i baren",
    recurring: "Varje fredag",
    time: "16–19",
    description: "Ett glas bubbel och en liten charktallrik efter jobbet.",
    example: true,
  },
  {
    title: "Julbubbel: blanc de blancs mot rosé",
    date: "2026-12-13",
    time: "14.00",
    description: "Lär dig skillnaden och hitta en flaska till julbordet.",
    example: true,
  },
];
