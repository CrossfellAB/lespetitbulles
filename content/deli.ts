// Deli To-Go: allt som går att beställa, betala och hämta i butiken.
// Priser i hela kronor inklusive moms. Varje variant har ett eget id som används i varukorgen och i
// betalningen, så byt inte id på en vara som någon kan ha i en öppen beställning.
// Ta bort en vara genom att radera den. Lägg till en ost genom att kopiera en av ostarna nedan.

export type DeliVariant = { id: string; label?: string; priceSek: number };

export type DeliItem = {
  slug: string;
  name: string;
  lead?: string; // kort rad under namnet
  badge?: string;
  image?: string;
  imageAlt?: string;
  imageContain?: boolean; // visa hela bilden (för produktbilder på vit bakgrund)
  text?: string[]; // stycken; alla utom det första fälls ihop under "Läs mer"
  contents?: string[]; // punktlista, t.ex. vad som ingår
  variants: DeliVariant[];
};

export const fredagsladan: DeliItem = {
  slug: "fredagsladan",
  name: "Fredagslådan",
  lead: "Middag för en, förrätt för två, snacks för tre.",
  image: "/img/platter.jpg",
  imageAlt: "Fat med ost, chark, oliver och kex",
  text: [
    "Lådan innehåller alltid tre olika ostar, tre sorters chark, kex, marmelad, oliver, marconamandlar och vindruvor. Vilka ostar som ingår varierar, men vi visar alltid veckans låda på Instagram och Facebook.",
  ],
  variants: [{ id: "fredagsladan", priceSek: 169 }],
};

export const ostpasen: DeliItem = {
  slug: "ostpasen",
  name: "Ostpåsen",
  lead: "En noga utvald blandning för ostälskaren.",
  image: "/img/ostpasen.jpg",
  imageAlt: "Cheddar, kex, oliver och fikonmarmelad",
  text: ["Just nu har vi valt ut de här ostarna och tillbehören till påsen:"],
  contents: ["150 g Kaltbach Creamy", "150 g skotsk cheddar", "200 g Brie mon Père", "Kex", "Fikonmarmelad", "Gordal-oliver"],
  variants: [{ id: "ostpasen", priceSek: 349 }],
};

export const cheeses: DeliItem[] = [
  {
    slug: "comte-arnaud",
    name: "Comté AOP Arnaud, 24 månader",
    lead: "Fort des Rousses",
    badge: "Världens bästa ost 2026–2027",
    image: "/img/ost-comte.png",
    imageContain: true,
    imageAlt: "En bit Comté Fort des Rousses",
    text: [
      "Korad till världens bästa ost 2026–2027 på världens största osttävling, The World Cheese Awards.",
      "Sedan mejeriet startades av Charles Arnaud år 1907 har värderingar, tradition och hantverk levt vidare genom tre generationer dedikerade ostmakare. Arnauds Comté görs på opastöriserad komjölk utan konserveringsmedel eller färgämnen.",
      "Den exceptionellt fina smaken kommer från de speciella lagringsförhållandena och Jurabergens gräs och växter. Osten doftar hasselnötter, mandel och smält smör, och smaken blir lätt fruktig och lite pepprig med en aning söt avslutning. Fast med en härlig krämighet och ett ljust, crèmefärgat inre.",
    ],
    variants: [
      { id: "comte-150", label: "150 g", priceSek: 118 },
      { id: "comte-250", label: "250 g", priceSek: 195 },
    ],
  },
  {
    slug: "gammel-knas",
    name: "Gammel Knas",
    lead: "Unika",
    image: "/img/ost-gammel-knas.png",
    imageAlt: "Gammel Knas, hel bit och avbrutna bitar",
    text: [
      "Unikas ostmästare drömde om att nytolka den klassiska havartin, och här är det strålande resultatet.",
      "Med andra kulturer, som gör att osten kan lagras längre, har de skapat en fin balans mellan det lite söta, syrliga och mjuka och de överraskande, krispiga kristallerna. Trots namnet är Gammel Knas inte stark, men unik i både smak och struktur.",
    ],
    variants: [
      { id: "gammel-knas-150", label: "150 g", priceSek: 89 },
      { id: "gammel-knas-250", label: "250 g", priceSek: 145 },
    ],
  },
  {
    slug: "fuldmaneost",
    name: "Fuldmåneost, ekologisk",
    lead: "Thise mejeri",
    image: "/img/ost-fuldmane.png",
    imageAlt: "Två bitar Fuldmåneost med naturskorpa",
    text: [
      "Fuldmåneosten görs bara när det är fullmåne, tolv gånger om året.",
      "Thise mejeri lagrar den prisvinnande hårdosten i Hjerms grottor i tio månader, minst 40 veckor. Den hade världspremiär 2019 på International Food Contest och vann Gourmetpriset. Juryn beskrev den som ”ostkonst i världsklass” med doft av fuktig källare och färsk svamp från skorpan och smak av nötter och smör. Härligt krämig med lite kristaller.",
    ],
    variants: [
      { id: "fuldmane-150", label: "150 g", priceSek: 95 },
      { id: "fuldmane-250", label: "250 g", priceSek: 155 },
    ],
  },
  {
    slug: "beemster-royaal",
    name: "Beemster Royaal Grand Cru, 12 månader",
    lead: "Beemster, Nederländerna",
    image: "/img/ost-beemster.jpg",
    imageContain: true,
    imageAlt: "Hel Beemster Royaal Grand Cru med en bit och tärningar",
    text: [
      "En lagrad holländsk gouda från Beemsterpoldern norr om Amsterdam, där korna betar på lerjord som en gång var havsbotten.",
      "Under tolv månaders lagring utvecklar osten en fyllig, rund smak med toner av karamell och rostade nötter och en lätt sötma i avslutningen. Fast och smidig i konsistensen, med små krispiga kristaller som visar att den fått ta sin tid. Lika god på ostbrickan som till ett glas champagne.",
    ],
    variants: [{ id: "beemster-royaal-200", label: "200 g", priceSek: 98 }],
  },
  {
    slug: "montagnolo-affine",
    name: "Montagnolo Affiné",
    lead: "Allgäu, Tyskland",
    image: "/img/ost-montagnolo.jpg",
    imageContain: true,
    imageAlt: "Hjul av Montagnolo Affiné med en utskuren bit",
    text: [
      "En krämig dubbelgrädd blåmögelost från Allgäu, med en vacker grå, lagrad skorpa.",
      "Montagnolo är en mild och lättillgänglig blåmögelost, perfekt för den som tycker att blått brukar vara för starkt. Det smöriga, nästan smältande inre har ett fint blått stråk som ger djup utan att ta över. Härlig med honung, päron eller valnötter, och ett säkert kort på ostbrickan.",
    ],
    variants: [{ id: "montagnolo-150", label: "150 g", priceSek: 57 }],
  },
];

export const extras: DeliItem[] = [
  { slug: "fikon-antona", name: "Fikonmarmelad", lead: "Charles Antona, 110 g", variants: [{ id: "fikon-antona", priceSek: 49 }] },
  { slug: "belberry-apple", name: "Äpple- och calvadosmarmelad", lead: "Belberry", variants: [{ id: "belberry-apple", priceSek: 65 }] },
  { slug: "hafi-tomat", name: "Tomat- och chilimarmelad", lead: "Hafi", variants: [{ id: "hafi-tomat", priceSek: 59 }] },
  { slug: "gordal-karna", name: "Gordal-oliver med kärna", variants: [{ id: "gordal-karna", priceSek: 69 }] },
  { slug: "gordal-chili", name: "Gordal-oliver, urkärnade med chili", variants: [{ id: "gordal-chili", priceSek: 69 }] },
  { slug: "tunnbrodschips", name: "Tunnbrödschips", lead: "Sigtuna Deli", variants: [{ id: "tunnbrodschips", priceSek: 79 }] },
  { slug: "minitoast", name: "Minitoast", variants: [{ id: "minitoast", priceSek: 39 }] },
  { slug: "toast-gf", name: "Toast for Cheese, glutenfri", variants: [{ id: "toast-gf", priceSek: 125 }] },
];

export const deliSettings = {
  maxPerLine: 10,
  // Hämtning: veckodag (0 = söndag … 6 = lördag) → första och sista hämtningstid.
  pickupHours: {
    3: { first: "11:00", last: "18:00" },
    4: { first: "11:00", last: "18:00" },
    5: { first: "11:00", last: "18:00" },
    6: { first: "11:00", last: "16:00" },
  } as Record<number, { first: string; last: string }>,
  leadTimeHours: 1,
  slotMinutes: 30,
  daysAhead: 14,
};

export const pickupHoursText = [
  { days: "Onsdag–fredag", hours: "11–18" },
  { days: "Lördag", hours: "11–16" },
];

const allItems = [fredagsladan, ostpasen, ...cheeses, ...extras];

// id → namn som det står på kvittot, och pris.
export const catalog: Record<string, { name: string; priceSek: number }> = Object.fromEntries(
  allItems.flatMap((item) =>
    item.variants.map((v) => [v.id, { name: v.label ? `${item.name}, ${v.label}` : item.name, priceSek: v.priceSek }]),
  ),
);
