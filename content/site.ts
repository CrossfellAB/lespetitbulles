// Grunduppgifter om Les Petit Bulles. Ändra här så uppdateras hela sidan.

export const site = {
  name: "Les Petit Bulles",
  tagline: "Champagnebar & deli i Norrköping",
  description:
    "Champagnebar och delikatessbutik i Lindens Galleria, Norrköping. Franska ostar, chark, champagne, Deli To-Go med Fredagslådan, provningar, catering och företagsevent.",
  address: { line1: "Lindens Galleria", city: "Norrköping" },
  phone: "0708-47 91 00",
  phoneHref: "+46708479100",
  email: "josefin@farmhousesweden.se",
  instagram: { handle: "@lespetitbullesnorrkoping", url: "https://www.instagram.com/lespetitbullesnorrkoping/" },
  facebook: { handle: "Les Petit Bulles Norrköping", url: "https://www.facebook.com/LesPetitBullesNorrkoping/" },
  // Juridisk säljare. Visas i sidfoten och i köpvillkoren. Org.nr visas när det fylls i.
  company: { name: "Swedish Farmhouse AB", orgNr: "556872-8033" },
};

// Öppettider. Veckodag: 0 = söndag, 1 = måndag … 6 = lördag.
export const openingHours: Record<number, { open: string; close: string }> = {
  3: { open: "10:00", close: "19:00" },
  4: { open: "10:00", close: "19:00" },
  5: { open: "10:00", close: "19:00" },
  6: { open: "10:00", close: "17:00" },
};

export const openingHoursText = [
  { days: "Onsdag–fredag", hours: "10–19" },
  { days: "Lördag", hours: "10–17" },
];

// Dagar då butiken är stängd trots ordinarie öppettider (helgdagar, semester), format "ÅÅÅÅ-MM-DD".
export const closedDates: string[] = ["2026-12-24", "2026-12-26", "2026-12-31", "2027-01-06"];

// Fredagslådan, Ostpåsen, ostar och hämtningstider finns i content/deli.ts.
