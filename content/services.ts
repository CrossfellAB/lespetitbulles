// Tjänstesidorna: Catering, After work, Företag och Presenter.
// Varje sida får ett förfrågningsformulär som skickas till Josefin.

export type Service = {
  slug: "catering" | "after-work" | "foretag" | "presenter";
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  body: string[];
  points: string[];
  formTitle: string;
  formIntro: string;
  showDate: boolean;
  showGuests: boolean;
  showBudget?: boolean;
  theme?: "jul"; // säsongsutseende: mörk stjärnhimmel överst i stället för fotot
  notice?: string; // kort rad i sidhuvudet, t.ex. "Beställ i god tid före jul"
  video?: { slug: string; seconds: number; caption?: string }; // fil i public/video/<slug>.mp4 och .jpg
  menuLink?: boolean; // visa länk till menyn under punktlistan
};

export const services: Service[] = [
  {
    slug: "catering",
    eyebrow: "Pour la fête",
    title: "Catering",
    lead: "Ost- och charkbuffé med alla tillbehör till bröllop, födelsedagar och mingel.",
    image: "/img/platter.jpg",
    imageAlt: "Långt fat med ost, chark, oliver och kex",
    body: [
      "Vi plockar ihop franska ostar, chark, oliver, kex och egna marmelader så att det räcker till alla gäster och ser fint ut på bordet.",
      "Berätta hur många ni blir, när festen är och vad ni tänkt er, så återkommer Josefin med ett förslag och pris. Vi kan också tipsa om champagne som passar till.",
    ],
    points: ["Bröllop, födelsedagar och mingel", "Anpassat efter antal gäster", "Champagne och dryck på förfrågan"],
    formTitle: "Skicka en cateringförfrågan",
    formIntro: "Ju mer du berättar, desto bättre förslag kan vi ge.",
    showDate: true,
    showGuests: true,
  },
  {
    slug: "after-work",
    menuLink: true,
    eyebrow: "Après le travail",
    title: "After work",
    lead: "Ett glas bubbel och en liten charktallrik efter jobbet. Kom som du är.",
    image: "/img/glass-brie.jpg",
    imageAlt: "Ett glas champagne och en bit brie",
    body: [
      "Baren är öppen onsdag till fredag fram till 19 och lördagar till 17. Slå dig ner med kollegor eller vänner, beställ ett glas och något gott att plocka på.",
      "Kommer ni ett större sällskap? Hör av dig i förväg så dukar vi fram ett bord och en tallrik till var och en.",
    ],
    points: ["Champagne på glas", "Ost- och charktallrikar", "Bordsbokning för större sällskap"],
    formTitle: "Boka bord för ett större sällskap",
    formIntro: "För sällskap på sex eller fler. Mindre grupper är alltid välkomna utan bokning.",
    showDate: true,
    showGuests: true,
  },
  {
    slug: "foretag",
    eyebrow: "Pour les entreprises",
    title: "Företagsevent",
    lead: "Kundkväll, kickoff eller provning för kollegorna. Hos oss eller hos er.",
    image: "/img/drink.jpg",
    imageAlt: "Drink i vinglas på en bardisk",
    body: [
      "En champagne- och ostprovning är ett enkelt sätt att samla en grupp. Josefin guidar genom några champagner och ostar och berättar om hantverket bakom, utan att det blir högtidligt.",
      "Vi kan ta emot er i baren i Lindens Galleria eller komma till er. Vi ordnar också ostbrickor till möten och julklappar till kunder och personal.",
    ],
    points: ["Champagne- och ostprovningar", "Kundkvällar och kickoffer", "Julklappar och presentkorgar till kunder och personal"],
    formTitle: "Berätta om ert event",
    formIntro: "Vi återkommer med förslag och pris, oftast inom ett par dagar.",
    showDate: true,
    showGuests: true,
  },
  {
    slug: "presenter",
    eyebrow: "Cadeaux de Noël",
    title: "Julklappar",
    lead: "Du bestämmer summan, vi fixar julklapparna. Till personalen, kunderna eller någon du tycker om.",
    theme: "jul",
    notice: "Beställ i god tid före jul",
    video: { slug: "julklappar", seconds: 21, caption: "Josefin visar årets julklappar" },
    image: "/img/cellar.jpg",
    imageAlt: "Champagne, ost och druvor i en vinkällare",
    body: [
      "Vi sätter ihop julklappar med ost, delikatesser och godsaker från Frankrike, och gör dem efter dina önskemål. Säg vad de får kosta och vem de är till, så blir det något riktigt fint och gott.",
      "Ska personalen eller kunderna få julklapp? Vi gör så många du behöver, likadana eller lite olika, och har dem inslagna och klara att hämta.",
      "Letar du en julklapp till någon som redan har allt? En korg med ost och delikatesser eller ett presentkort till en provning brukar bli väl mottaget.",
    ],
    points: ["Julklappar till personal och kunder", "Korgar med ost och delikatesser", "Presentkort till en provning", "Inslaget och klart, med kort om du vill"],
    formTitle: "Beställ julklappar",
    showBudget: true,
    formIntro: "Berätta vad du tänkt dig, hur många du behöver och när, så hör vi av oss.",
    showDate: true,
    showGuests: false,
  },
];

export function getService(slug: Service["slug"]) {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Okänd tjänst: ${slug}`);
  return s;
}
