// Menyn på /meny. Två delar: veckans champagne på glas (ändras ofta) och hela menyn.
// Priser skrivs som text: "995" = per flaska, "115/425" = glas/flaska. Vad två priser betyder står i
// avsnittets priceNote. Lägg en ny PDF i public/meny/ och ändra pdf nedan när menyn uppdateras.

export type MenuItem = { name: string; sub?: string; price: string; text?: string };
export type MenuSection = { title: string; priceNote?: string; intro?: string; items: MenuItem[]; note?: string };
export type MenuGroup = { id: string; title: string; sections: MenuSection[] };

export const menuPdf = { href: "/meny/les-petit-bulles-meny.pdf", updated: "17 november 2026" };

export const glassMenu: MenuItem[] = [
  {
    name: "Deutz Brut Classic",
    price: "175",
    text: "45 % chardonnay, 30 % pinot noir, 25 % meunier. 5–7 g/l, minst 3 år på jästfällningen. Basårgång 2021, druvor från 62 crus. Vinteräpple, citrus, nougat och rostat bröd.",
  },
  {
    name: "Fleur de Meunier Rosé",
    price: "185",
    text: "Djupare roséfärg. Doft av röda bär, vinbär, hallon, rosor och smultron samt elegant fatton med toast och en hint av lakrits. Smaken är fruktig med frisk syra och en tydlig mineralisk underton – roséchampagne med karaktär.",
  },
  {
    name: "L'Inattendue",
    price: "185",
    text: "Elegant och frisk mousse, aromer av äpple, citron, honungsmelon, aprikos och hallon, med en lätt gräddig ton och brioche. Kalkrik mineralitet, fräsch struktur med tydlig karaktär från Meunier – charmig men ändå seriös.",
  },
];

export const menu: MenuGroup[] = [
  {
    id: "champagne",
    title: "Champagne & bubbel",
    sections: [
      {
        title: "Champagne",
        priceNote: "Pris per flaska",
        items: [
          { name: "Deutz Brut Classic", price: "995", text: "45 % chardonnay, 30 % pinot noir, 25 % meunier. 5–7 g/l, minst 3 år på jästfällningen. Basårgång 2021, druvor från 62 crus. Vinteräpple, citrus, nougat och rostat bröd." },
          { name: "L'Inattendue", price: "995", text: "Elegant och frisk mousse, aromer av äpple, citron, honungsmelon, aprikos och hallon, med en lätt gräddig ton och brioche. Kalkrik mineralitet, fräsch struktur med tydlig karaktär från Meunier – charmig men ändå seriös. Det är väldigt ovanligt att hitta en instegscuvée som är gjord på endast en druvsort, Meunier, och från ett enskilt område, Treslon." },
          { name: "Pol Roger Brut Réserve", price: "1025", text: "Lika delar pinot noir, meunier och chardonnay från 30 crus. 25 % reservvin, fyra år i källaren 33 meter under Épernay. Varje flaska vänds för hand. Päron, kaprifol, vanilj och brioche. 8 g/l." },
          { name: "Taittinger Brut Reserve", price: "1025", text: "40 % chardonnay, 35 % pinot noir och 25 % meunier. 3–4 år på jästfällningen, 9 g/l. Champagnehus från Reims. Gyllengul med fin mousse; persika, vita blommor, vanilj och brioche. Harmonisk och elegant med lång avslutning." },
          { name: "Bollinger Special Cuvée", price: "1195", text: "60 % pinot noir, 25 % chardonnay, 15 % meunier. 7–8 g/l, över 85 % Grand och Premier Cru. Reservviner sparade i magnum 7–15 år. Källarlagrad dubbelt mot regelverket." },
          { name: "Charles Heidsieck Brut Réserve", price: "1295", text: "40 % pinot noir · 40 % chardonnay · 20 % meunier · 10 g/l · 40 % reservvin med tio års snittålder. Fyrtio procent av blandningen, lagrade i tank i fem till femton år. Varje flaska bär året den lades på jästfällningen och året den degorgerades. Brioche, mango, aprikos och mandel, med nougat och grillad persika i smaken." },
          { name: "La Falise Froissart", sub: "Cuvée 276 Brut Nature Grand Cru", price: "1845", text: "70 % pinot noir och 30 % chardonnay från 2017 med 20 % reservvin från husets ”Réserve perpetuelle” (endast pinot noir). 0 g/100 ml (Brut Nature). Toner av mineral och kalk sammanlänkas med härliga nyanser av gult äpple, tropisk frukt och citrusskal. Syran är närvarande, men avrundad på ett mycket elegant sätt. Degorgerad 2020." },
          { name: "Perrier-Jouët Belle Epoque", price: "3795", text: "50 % chardonnay · 45 % pinot noir · 5 % meunier · 8 g/l · minst sex år på jästfällningen. Chardonnay från Grand Cru-byarna Cramant och Avize ger den blommiga finess huset är känt för. Cuvén kom till 1964, och flaskan bär de japanska anemoner som Émile Gallé målade åt Perrier-Jouët 1902. Vita blommor, pocherat päron och citrusskal." },
          { name: "Pol Roger (2013)", sub: "Cuvée Sir Winston Churchill", price: "3995", text: "Pinot noir med ca 20 % chardonnay · enbart Grand Cru · 7 g/l · 7,5 år på jästfällningen · degorgerad juli 2021. Husets prestigecuvée, gjord bara i utvalda årgångar. Första årgången lanserades 1984 på Blenheim Palace där Churchill föddes – 2013 är den tjugonde utgåvan. Apelsinolja, konfiterad citron och brioche." },
        ],
      },
      {
        title: "Champagne blanc de blancs",
        priceNote: "Pris per flaska",
        items: [
          { name: "Palmer & Co Blanc de Blancs 2019", price: "995", text: "En årgångschampagne gjord enbart på chardonnay från Palmer & Co, ett kooperativ av odlare i Champagne. Den är frisk och elegant med toner av grönt äpple, persika och grapefrukt, och har en touch av rostat bröd, nougat och mineral från lagringen på jästen." },
          { name: "Gosset Grand Blanc de Blancs", price: "1695", text: "100 % chardonnay från Côte des Blancs och Côte des Noirs · 6 g/l · minst tre år på jästfällningen. Champagnes äldsta vinhus, grundat i Aÿ 1584. Gosset blockerar den malolaktiska jäsningen, vilket bevarar en syra och fruktighet som få andra hus har. Vita blommor, aprikos, mirabell och citron över kvittenmarmelad och honung." },
          { name: "Perrier-Jouët Blanc de Blancs", price: "1865", text: "100 % chardonnay från Côte des Blancs, främst Avize och Cramant · 8 g/l · upp till 15 % reservvin. Samma hus som Belle Epoque, men ren chardonnay och utan årgång. Fläder, akacia och kaprifol över en citrusbotten, med mineralisk stramhet och en mjuk avslutning." },
          { name: "Ruinart Blanc de Blancs", price: "1995", text: "100 % chardonnay från Premier Cru-lägen i Côte des Blancs och Montagne de Reims · 9 g/l · fyra år på jästfällningen. Världens äldsta champagnehus, grundat 1729 och sedan dess enbart inriktat på champagne. Vinet mognar i husets kritgruvor under Reims. Äpple, päron, aprikos och Meyer-citron över en smörig, brödig botten." },
          { name: "Pol Roger Blanc de Blancs", price: "2095", text: "100 % chardonnay från Grand Cru-byarna Oiry, Chouilly, Cramant, Avize, Oger och Le Mesnil-sur-Oger · 7 g/l · sex år i källaren. Årgångschampagne som bara görs i utvalda år. Vinet mognar trettiotre meter under Épernays gator och varje flaska vänds för hand. Citronskal, bakverk, mocka och apelsinskal; smörig med hasselnöt och rostade toner, och en syrlig fräschör i avslutningen." },
          { name: "Amour de Deutz 2015 Blanc de Blancs", price: "3495", text: "100 % chardonnay · Avize, Le Mesnil-sur-Oger, Oger och Cramant, alla Grand Cru · 8 g/l · åtta år på jästfällningen · endast en flaska. Husets prestigecuvée och listans enda rena blanc de blancs. All frukt kommer från Grand Cru-byarna i Côte des Blancs. Mogen trädgårdsfrukt, mentol, citronolja och vitpeppar, med salt struktur och kritig avslutning." },
        ],
      },
      {
        title: "Champagne rosé",
        priceNote: "Pris per flaska",
        items: [
          { name: "Fleur de Meunier Rosé", price: "995", text: "Djupare roséfärg. Doft av röda bär, vinbär, hallon, rosor och smultron samt elegant fatton med toast och en hint av lakrits. Smaken är fruktig med frisk syra och en tydlig mineralisk underton – roséchampagne med karaktär. En rosé för gourmanden, ett riktigt matvin gjort på 100 % Meunier. Det röda vinet som blandas för att få färgen och den djupa smaken har lagrats på franska ekfat." },
          { name: "André Clouet Brut Rosé", price: "1050", text: "100 % pinot noir · 4 % stilla rödvin · Grand Cru · 5 g/l. Familjen Clouet var hovtryckare åt Ludvig XV i Versailles, och det är därifrån etiketten har sitt utseende. Druvorna kommer uteslutande från Bouzys mellersta sluttningar – Grand Cru och Champagnes mest kända pinot noir-by. Jordgubbe, kex, nougat, persika och blodapelsin." },
          { name: "Pierre Mignon", sub: "”Année de Madame” Brut Rosé 2012", price: "975", text: "55 % chardonnay, 30 % meunier, 15 % pinot noir. 9 år på jästfällningen, 6 g/l. Odlarchampagne från Le Breuil. Blek lax med orange skimmer; mogen frukt, kryddor och pepparkaka. Silkig och fyllig med fräsch, lång avslutning." },
          { name: "Deutz Brut Rosé", price: "1150", text: "Ca 75 % pinot noir · 25 % chardonnay · ca 8 % stilla rödvin · tre års lagring. Pinot noir från Aÿ, Bouzy och Ambonnay vinifierad som vitt vin, med rödvin från husets egna parceller i Aÿ och Mareuil-sur-Aÿ inblandat på slutet. Skimrande med rosa ton: körsbär, björnbär och granatäpple i doften, jordgubbe och hallon i smaken med en syrlig avslutning." },
          { name: "Gosset Grand Rosé", price: "1595", text: "Chardonnay och pinot noir med stilla rödvin inblandat · druvor från Ambonnay, Aÿ, Bouzy, Chouilly, Verzenay och Villers-Marmery. Samma hus och samma princip: ingen malolaktisk jäsning, vilket gör rosén stramare än de flesta. Blek laxrosa med citrus och jordgubbar i doften, och röda bär som växer fram när vinet blir varmare." },
        ],
      },
      {
        title: "Övriga bubblor",
        priceNote: "Glas/flaska",
        items: [
          { name: "Dissegna Prosecco DOC Extra Dry", sub: "Millesimato", price: "89/395", text: "100 % glera, Extra Dry, 60 dagar på jästfällningen. Familjeföretag sedan 1925, ekologiska odlingar, vineri på solkraft. Prosecco från en enda årgång." },
          { name: "Ackerman Bulle Royale", sub: "Crémant", price: "105/495", text: "Chenin blanc med chardonnay och cabernet franc, 18–25 månader på jästfällningen. Huset grundades 1811 och var först i Loire med flaskjäsning. Grönt äpple och akacia." },
          { name: "Emile Boeckel", sub: "Crémant Brut Blanc de Blancs", price: "105/495", text: "Friskt och elegant mousserande vin gjort på pinot blanc, lagrat 15 månader på jästfällningen. Torr stil med hög syra och krämig mousse, där aromer av vita blommor, grönt äpple, päron och citron samsas med tydliga mineraltoner och en lätt rostad, brödig avslutning." },
          { name: "Tamellini Millesimato Classico", sub: "Extra Brut 2021", price: "145/595", text: "100 % garganega, Extra Brut, minst 5 år på jästfällningen. Bröderna Tamellini var först i Soave med traditionell metod. Kalkrik jord i söderläge, handplockat, minimal svavling." },
        ],
      },
    ],
  },
  {
    id: "vin",
    title: "Vin & drinkar",
    sections: [
      {
        title: "Rött vin",
        priceNote: "Glas/flaska",
        items: [
          { name: "Famille Fabre La Grande Courtade", sub: "Pinot Noir 2024", price: "115/425", text: "100 % pinot noir, ekologiskt, 20 % på ekfat i 3 månader. Familjen Fabre har gjort vin i Languedoc sedan 1605 och ställde om till ekologiskt redan 1991. Mörka körsbär och peppar." },
          { name: "Olivier Ravoire ’Banderet’ Côtes du Rhône", sub: "Rouge 2024", price: "115/425", text: "70 % grenache, 30 % syrah, 55-åriga stockar, cement och ståltank. Egendomen vid foten av Luberon, i familjen sedan 1987. Kryddig doft, mogna röda frukter och läder." },
          { name: "Mitjavile Le Pic du Versant 2022", sub: "Bordeaux", price: "175/695", text: "85 % merlot, 15 % cabernet franc, 18 månader på franska ekfat. Louis Mitjavile, son till François Mitjavile på Tertre Rôteboeuf. Röda bär, plommon, cassis och smörkola." },
          { name: "2026 Beaujolais Nouveau", sub: "Manoir du Carra · premiär 19 november", price: "115/425", text: "100 % gamay · kolsyrejäsning · granit- och sandjord · stockar på 50–100 år. Familjen Sambardier har drivit gården sedan 1850, i fem generationer. Vid sidan av årets nouveau gör de fyra av Beaujolais tio crus – Fleurie, Brouilly, Moulin-à-Vent och Juliénas. Lätt, bärigt och saftigt, gjort för att drickas direkt." },
        ],
      },
      {
        title: "Vitt vin",
        priceNote: "Glas/flaska",
        items: [
          { name: "Georg Müller Stiftung Riesling Trocken 2024", price: "115/475", text: "100 % riesling, VDP.Gutswein, 11,5 %. Godset donerades 1913 till kommunen Hattenheim med förtjänsten öronmärkt åt välgörenhet. Mogna äpplen, persika och aprikos." },
          { name: "Franck Millet Sancerre Blanc 2025", price: "165/695", text: "100 % sauvignon blanc, ingen malolaktisk jäsning, HVE 3. Tre generationer i Bué; när bröderna Millet delade marken fick Franck de äldsta rankorna. Kalksten, gul frukt och örtighet." },
        ],
      },
      {
        title: "Bellini & Kir Royale",
        items: [
          { name: "Bellini", sub: "Persika, passionsfrukt eller hallon", price: "99" },
          { name: "Kir Royale", sub: "Deutz Champagne & crème de cassis", price: "185" },
          { name: "Kir Cadette", sub: "Ackerman Crémant & crème de cassis", price: "115" },
        ],
      },
    ],
  },
  {
    id: "ol",
    title: "Öl & alkoholfritt",
    sections: [
      {
        title: "Lokal öl från Fenix Brewery",
        items: [
          { name: "Lager 5,2 %", price: "79" },
          { name: "NEIPA 6,2 %", price: "89" },
          { name: "Stout 5,6 %", price: "89" },
        ],
      },
      {
        title: "Öl utan alkohol",
        items: [{ name: "Staropramen non alcoholic 0,5 %", price: "45" }],
      },
      {
        title: "Alkoholfritt vin",
        intro: "Fråga oss om rekommendationer för den här veckan.",
        items: [],
      },
      {
        title: "Läsk & vatten",
        items: [
          { name: "San Pellegrino Pesca Clementina Zero", price: "39" },
          { name: "San Pellegrino Melograno Arancina Zero", price: "39" },
          { name: "Ramlösa Citrus", price: "39" },
          { name: "Ramlösa Original", price: "39" },
          { name: "Johlini Pink Grapefruit & Hibiscus", price: "39" },
        ],
      },
    ],
  },
  {
    id: "snacks",
    title: "Snacks & smått",
    sections: [
      {
        title: "Ost & chark",
        items: [
          { name: "Ost & chark", price: "189", text: "Perfekt om du är lite småhungrig eller vill dela med någon trevlig. Vi lägger upp tre olika ostar och två chark tillsammans med oliver, marmelad och kex. (Glutenfria kex finns.)" },
          { name: "Ost", price: "169", text: "För dig som föredrar bara ost går det bra att beställa lite mer ost …! Vi väljer ut tre ostar och serverar tillsammans med oliver, marmelad och kex." },
          { name: "Görans favorit", price: "109", text: "Härlig serranoskinka med cantaloupemelon. Enkelt men väldigt gott." },
          { name: "Fuet Mini", price: "59", text: "Fransk mini-salami – chorizo." },
        ],
        note: "I mån av tid kan vi självklart skära upp av alla ostar vi har i delidisken. Då skär vi ca 100–150 gram och serverar med marmelad och kex. (Det tillkommer 50 kr på ostpriset för tillbehör.)",
      },
      {
        title: "Delikatesser hav",
        intro: "Serveras ur konserv med tillbehör som aioli och tunnbrödschips.",
        items: [
          { name: "Hjärtmusslor i kallpressad rapsolja från Limfjorden", price: "169" },
          { name: "Dansk regnbågsöring med citrontimjan och enbär", price: "159" },
          { name: "Grillad lax från Färöarna i kallpressad rapsolja", price: "169" },
          { name: "Nordisk bokspånsrökt sardin", price: "129" },
        ],
      },
      {
        title: "Delikatesser land",
        items: [
          { name: "Ankrillette", sub: "Fikonmarmelad & minitoast", price: "129" },
          { name: "Ankrillette med Périgordpeppar", sub: "Fikonmarmelad & minitoast", price: "189" },
          { name: "Ankterrin med konfiterad lök", sub: "Fikonmarmelad & minitoast", price: "129" },
          { name: "Bruschetta kronärtskocka", sub: "Tunnbrödschips", price: "89" },
        ],
      },
      {
        title: "Snacks",
        items: [
          { name: "Brets Chips Havssalt", price: "69" },
          { name: "Brets Chips Tryffel & Brie", price: "69" },
          { name: "Oliver Gordal", price: "89" },
          { name: "Gordal-oliver med chili", price: "89" },
          { name: "Marconamandlar", price: "69" },
        ],
      },
      {
        title: "Något sött",
        items: [
          { name: "Nougat mörk, ljus eller pistage", price: "10" },
          { name: "Marshmallow med karamellchips", price: "89" },
          { name: "3 stora marshmallownallebjörnar", price: "159" },
          { name: "Marsipanbar Champagne & Jordgubb", price: "89" },
          { name: "Marsipanbar hjärta", price: "15" },
        ],
      },
    ],
  },
  {
    id: "kaffe",
    title: "Kaffe & avec",
    sections: [
      {
        title: "Kaffe",
        items: [
          { name: "Espresso dubbel", price: "39" },
          { name: "Cappuccino", price: "43" },
          { name: "Latte", price: "45" },
        ],
      },
      {
        title: "Avec",
        priceNote: "4 cl/6 cl",
        items: [
          { name: "Grönstedts Cognac VSOP", price: "120/170" },
          { name: "Cognac Meukow", price: "110/150" },
        ],
      },
    ],
  },
];
