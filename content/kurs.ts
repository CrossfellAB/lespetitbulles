// Ost- och champagneskolan: nio kapitel från Josefins planscher (mappen "Le Petit Bulles PDF").

export type Paragraph = { label?: string; text: string };

export type Chapter = {
  slug: string;
  number: number;
  title: string;
  heading: string;
  lead: string;
  paragraphs: Paragraph[];
  fact?: { title: string; text: string };
  image: string;
  imageAlt: string;
  pairingTable?: boolean;
  pairs?: { title: string; text: string }[];
  facts?: { label: string; text: string }[];
};

export const chapters: Chapter[] = [
  {
    slug: "tva-hantverk",
    number: 1,
    title: "Vin och ost – två hantverk som tar tid",
    heading: "Två hantverk, samma tålamod",
    lead: "Champagne och ost har mer gemensamt än man kanske tror. Båda utgår från en enkel råvara, men förvandlas till något helt annat med hjälp av jäsning, tid och sin unika växtplats.",
    paragraphs: [
      { text: "Druvsaft förvandlas till vin när jäst omvandlar socker till alkohol, precis som mjölk blir ost när bakterier och löpe får den att stelna. I båda fallen är det levande organismer som gör grovjobbet, och det är tiden som skapar den djupa smaken." },
      { text: "En champagne vilar minst femton månader i källaren innan den får säljas. En comté-ost lagras i minst fyra månader, men ofta i ett år eller mer. Under den här tiden sker en magi som inga recept i världen kan skynda på: vinet utvecklar sin karaktäristiska, brödiga ton och osten får sina komplexa smaker och knastriga små kristaller." },
      { text: "Platsen spelar också en avgörande roll. Kritjorden i distriktet Champagne suger upp vatten och gör det tillgängligt för vinstockarnas rötter. På samma sätt ger gräset på de franska bergsängarna mjölken dess specifika karaktär. De här kapitlen handlar om hur dessa två hantverk fungerar, hur du navigerar bland smakerna och – framför allt – varför de passar så fantastiskt bra ihop." },
    ],
    fact: { title: "Visste du att …", text: "både champagne och många ostar är skyddade ursprungsbeteckningar? Inom EU får bara vin från just distriktet Champagne heta champagne. På samma sätt är det bara ost från specifika områden som får kallas roquefort, comté eller chaource." },
    image: "/img/cellar.jpg",
    imageAlt: "Champagne, ost och druvor i en vinkällare",
  },
  {
    slug: "vad-ar-champagne",
    number: 2,
    title: "Champagne – kritan, druvorna och bubblorna",
    heading: "Vad är champagne?",
    lead: "Champagne är både en region i nordöstra Frankrike och ett mousserande vin som tillverkas enligt bestämda regler.",
    paragraphs: [
      { text: "Området ligger ungefär tretton mil öster om Paris, runt städerna Reims och Épernay. Det är en av Frankrikes nordligaste vinregioner. Klimatet är svalt, och det ger druvor med hög syra. Jorden består av krita som är porös nog att både dränera bort regn och lagra vatten inför torra somrar." },
      { text: "Tre druvor dominerar. Chardonnay ger friskhet och citrus. Pinot noir ger fyllighet och smak av röda bär. Meunier tillför mjukhet och frukt. De flesta champagner är en blandning av alla tre." },
      { text: "De berömda bubblorna skapas genom en andra jäsning. Först görs ett helt vanligt, stilla vin. Sedan tappas det på flaska tillsammans med lite socker och jäst innan flaskan försluts. Jästen äter upp sockret och bildar koldioxid. Eftersom gasen inte kan slippa ut löser den sig i vinet och släpps fri i form av små bubblor först när du öppnar flaskan." },
      { text: "Efter denna jäsning vilar vinet på jästfällningen i minst tolv månader, och flaskan får inte säljas förrän den legat i källaren i totalt femton månader. Det är denna process som ger champagnen dess härliga doft av rostat bröd och nötter." },
    ],
    fact: { title: "Visste du att …", text: "trycket i en champagneflaska är ungefär sex bar? Det är tre gånger trycket i ett bildäck. Därför är flaskan tjockare och korken hålls fast av en ståltråd." },
    image: "/img/vineyard.jpg",
    imageAlt: "Vinodlingar på kritjord i Champagne",
  },
  {
    slug: "las-etiketten",
    number: 3,
    title: "Från brut nature till demi-sec: läs etiketten",
    heading: "Läs etiketten",
    lead: "Etiketten avslöjar hur torr champagnen är, vilka druvor som har använts och vem som har tillverkat den. Här är nyckelorden du behöver hålla koll på.",
    paragraphs: [
      { label: "Sötma", text: "Brut är den allra vanligaste stilen och upplevs som torr. Extra brut och brut nature är ännu torrare, i princip helt utan tillsatt socker. Extra dry är, sitt namn till trots, aningen sötare än brut. Sec är halvtorrt, medan demi-sec är tydligt sött och gör sig bäst till desserter och blåmögelost." },
      { label: "Druvor", text: "Blanc de blancs betyder att vinet uteslutande är gjort på gröna druvor – i praktiken chardonnay – vilket ger en lätt och frisk champagne. Blanc de noirs görs på de blå druvorna pinot noir och meunier, och ger ett fylligare vin. En rosé får oftast sin färg genom att man antingen blandar i rött vin eller låter de mörka druvskalen ligga med en kort stund." },
      { label: "Årgång", text: "De flesta champagner har ingen årgång alls, utan blandas från flera olika årgångar för att smaken ska vara densamma från gång till gång. Står det ett årtal på flaskan kommer däremot allt vin från just det året, och flaskan har då lagrats i minst tre år." },
      { label: "Producent", text: "I det finstilta hittar du ofta två små bokstäver. NM står för ett champagnehus som köper in sina druvor, medan RM betyder att det är en odlare som gör vin på sina egna druvor." },
    ],
    fact: { title: "Visste du att …", text: "en brut innehåller under 12 gram socker per liter men oftast ligger runt 6 till 9 gram? En demi-sec har 32 till 50 gram socker per liter. Det är med andra ord stor skillnad på mängden socker mellan torrt och sött." },
    image: "/img/glass-brie.jpg",
    imageAlt: "Ett glas champagne och en bit brie",
  },
  {
    slug: "vad-ar-ost",
    number: 4,
    title: "Så blir mjölk till ost",
    heading: "Vad är ost?",
    lead: "All ost börjar med fyra enkla ingredienser: mjölk, bakterier, löpe och salt. Det är den femte ingrediensen – tiden – som avgör vad det i slutändan blir.",
    paragraphs: [
      { text: "Processen börjar med att mjölken värms upp och får en syrningskultur, vilket är samma typ av bakterier som gör filmjölk. Sedan tillsätts löpe, ett enzym som får mjölken att stelna till en puddingliknande massa. Massan skärs sedan i småbitar, vasslen rinner av, och det som blir kvar pressas och saltas. Så här ser tillverkningen ut för alla ostar." },
      { text: "Det är vad som händer därefter som skapar all variation. En färskost äts inom ett par dagar och har en tydlig smak av mjölk och syra. En vitmögelost, som brie, utvecklar ett vitt skinn av mögel som gör osten mjuk inifrån. Kittostar, som langres, tvättas med saltlake och färgämnet annatto tills ytan blir orange och doften kraftig. Blåmögelostar, som roquefort, sticks med nålar för att möglet ska kunna växa på insidan. Slutligen har vi hårdostar, exempelvis comté, som pressas ordentligt och lagras länge – ofta i flera år." },
      { text: "Ju längre en ost lagras, desto mer vatten dunstar bort och desto mer koncentrerad blir smaken. En ung ost är mild och mjuk, medan en vällagrad ost blir salt, kraftig och ibland härligt knastrig av saltkristaller." },
    ],
    fact: { title: "Visste du att …", text: "det går åt ungefär elva liter mjölk för att göra ett kilo hårdost? En comté på 40 kilo har börjat som 450 liter mjölk från kor som betat på franska bergsängar." },
    image: "/img/cheeses.jpg",
    imageAlt: "Fem ostar på rad: färskost, brie, langres, blåmögel och comté",
  },
  {
    slug: "darfor-passar-de-ihop",
    number: 5,
    title: "Därför passar champagne och ost ihop",
    heading: "Därför passar de ihop",
    lead: "Ost bidrar med fett och sälta, medan champagne bjuder på syra och bubblor. Det är precis dessa kontraster som gör att de fungerar så bra tillsammans.",
    paragraphs: [
      { text: "När du äter en bit ost lägger sig fettet som en len hinna i munnen. Syran i champagnen skär rakt igenom den hinnan och rensar gommen. Även bubblorna hjälper till; koldioxiden ger ett lätt stick på tungan som lyfter bort både fettet och saltet. Det gör att din nästa bit ost smakar precis lika gott som den första." },
      { text: "Ostens sälta gör i sin tur att champagnen upplevs som mjukare och mer fruktig än om du dricker den på egen hand. Råvarorna lyfter helt enkelt varandra." },
      { text: "Att detta är en klassisk kombination märks inte minst i själva regionen Champagne, som stoltserar med två lokala ostar. Chaource är en mjuk vitmögelost som smakar ljuvligt av smör och svamp. Langres är en kittost med en distinkt fördjupning på ovansidan. Enligt traditionen häller man gärna en skvätt champagne i just den fördjupningen innan osten avnjuts. Champagne och ost har med andra ord delat bord i århundraden." },
    ],
    fact: { title: "Visste du att …", text: "vitt eller mousserande vin ofta är ett bättre val till osten än rött vin? En syrlig champagne med bubblor klarar av att balansera betydligt fler ostsorter på en och samma gång. Och det är ju precis vad man vill när man ställer fram en hel ostbricka!" },
    image: "/img/platter.jpg",
    imageAlt: "Fat med ost och chark",
  },
  {
    slug: "vilken-ost-till-vilken-champagne",
    number: 6,
    title: "Tumregler: lätt till milt, fylligt till kraftigt",
    heading: "Vilken ost till vilken champagne?",
    lead: "Det finns egentligen inga felaktiga svar, men det finns helt klart säkra kort. Här guidar vi dig till de kombinationer som nästan alltid blir en succé.",
    paragraphs: [
      { text: "Tumregeln är ganska enkel: välj en lätt champagne till milda ostar, en fyllig champagne till kraftiga ostar och en söt champagne till de salta." },
      { label: "Blanc de blancs", text: "är lätt och frisk med tydliga citrustoner. Den gör sig utmärkt till färskost, getost och lagrade hårdostar som comté eller parmesan. Hårdostens nötiga smak gifter sig perfekt med vinets brödiga toner." },
      { label: "En brut med mycket pinot noir", text: "är fylligare. Den rår på vitmögelostar som brie och camembert, men också smakrika svenska hårdostar som prästost och Västerbottensost." },
      { label: "Roséchampagne", text: "bjuder ofta på toner av röda bär. Den passar fint till mjuka ostar och milda kittostar, och är den champagnestil som bäst hanterar lite kryddiga tillbehör på brickan." },
      { label: "Demi-sec", text: "är söt och det överlägset bästa valet till en blåmögelost. Sötman skapar en underbar balans till sältan i roquefort, stilton och ädelost – precis på samma sätt som ett sött portvin passar till stilton." },
      { text: "Den svåraste nöten att knäcka är riktigt kraftiga kittostar, som époisses. De har en förmåga att ta över helt om de inte möts av en riktigt fyllig blanc de noirs." },
    ],
    image: "/img/cheeses.jpg",
    imageAlt: "Franska ostar på rad",
    pairingTable: true,
  },
  {
    slug: "sa-serverar-du",
    number: 7,
    title: "Servera rätt: 8–10 grader och tulpanglas",
    heading: "Så serverar du",
    lead: "Rätt temperatur, rätt glas och en ost som fått stå framme. Mer behövs inte.",
    paragraphs: [
      { label: "Temperaturen", text: "En champagne serveras bäst kyld, runt 8 till 10 grader. För årgångschampagne och fylligare stilar är 10 till 12 grader ofta idealiskt. Tre timmar i kylskåpet brukar räcka bra, alternativt tjugo minuter i en hink med vatten och is. Är champagnen för kall försvinner smakerna, och är den för varm skummar den lätt över." },
      { label: "Glaset", text: "Välj hellre ett tulpanformat glas eller ett vanligt vitvinsglas framför ett smalt flöjtglas. Champagne har mycket doft som behöver utrymme för att blomma ut. De breda, klassiska coupe-glasen är oerhört vackra, men tyvärr försvinner bubblorna ur dem på bara några minuter." },
      { label: "Öppningen", text: "Ta bort folien och lossa försiktigt på ståltråden, men behåll hela tiden en hand över korken. Håll korken stilla och vrid på själva flaskan, inte tvärtom. Låt gasen sippra ut med ett diskret pysande. En hög smäll är förvisso festlig, men du kastar samtidigt bort både värdefull gas och vin på köpet." },
      { label: "Osten", text: "Ta fram osten från kylen ungefär en timme innan det är dags. Kylskåpskall ost smakar bara hälften så mycket. Skär osten så att alla får en bit som innehåller både kanten och mitten – som tårtbitar från en rund ost, och tvärskivor från en kil." },
    ],
    fact: { title: "Tre vanliga myter", text: "En silversked i flaskhalsen bevarar tyvärr inga bubblor – det gör bara en tät kork. Bubblornas storlek skvallrar inte om vinets kvalitet; de bildas kring mikroskopiska repor och damm i glaset och växer allteftersom de stiger. Sist men inte minst: champagne är inte bara en festdryck, utan ett fantastiskt matvin som är gjort för att drickas till mat!" },
    image: "/img/glass-brie.jpg",
    imageAlt: "Champagne i tulpanglas",
  },
  {
    slug: "vad-vi-gillar-just-nu",
    number: 8,
    title: "Våra favoritpar, som brie & Deutz Brut Classic",
    heading: "Vad vi gillar just nu",
    lead: "Tre kombinationer från vår egen disk. Prova hemma, eller kom in och prova hos oss.",
    paragraphs: [
      { text: "Ostarna hittar du självklart i vår disk. Kom förbi och fråga, vi skär gärna upp en bit." },
    ],
    pairs: [
      { title: "Brie & Deutz Brut Classic", text: "Brie är en fet och mild ost. Det som skär igenom fett är syra och mousse, och det är precis vad du får i en Deutz Brut Classic. Champagnens bröd- och brioschtoner möter upp ostens svamptoner och skorpa. Komplettera med vår egentillverkade jalapeñomarmelad som tar hela ekipaget till nya höjder." },
      { title: "Gammel Knas & Veuve Clicquot", text: "Gammel Knas är en hårdost som lagrats i två år. Den har sälta, nötighet och kristaller. Osten behöver två saker av champagnen: en fyllighet som matchar och lite sötma som balanserar sältan. Veuve Clicquot har båda. 50 procent pinot noir står för kroppen och en sockerhalt på 9 g/l ger rundheten." },
      { title: "Montagnolo Affiné & Pierre Mignon Rosé", text: "Blåmögelostar passar normalt bäst till söta viner som portvin eller Sauternes. Men Montagnolo är en mild och gräddig blåost och då fungerar champagne lika bra om den har tillräckligt med tyngd. Pierre Mignons årgångsrosé har det efter många års lagring på jästfällningen. Den röda bärfrukten matchar sältan, pepparkakstonen svarar upp mot ostens sötma, och den lätt beska avslutningen håller emot ostens gräddighet." },
    ],
    image: "/img/platter.jpg",
    imageAlt: "Ost och chark från disken",
  },
  {
    slug: "huset-deutz",
    number: 9,
    title: "Huset Deutz i Aÿ, sedan 1838",
    heading: "Deutz – vår huschampagne",
    lead: "Två unga män från Aachen kom till Champagne år 1830 för att köpa vin åt en tysk baron. Åtta år senare grundade de ett eget hus i byn Aÿ. Det huset står kvar på samma adress än i dag.",
    paragraphs: [
      { text: "William Deutz och Pierre-Hubert Geldermann var vinhandlare. Deutz lärde sig yrket hos Bollinger, som ligger några hundra meter bort i samma by. År 1838 startade de firman Deutz & Geldermann. Idén var enkel: ett stort vin kräver en stor vingård. Därför köpte de mark på Aÿs sydsluttning, där det sägs att pinot noir mognar bäst i hela Champagne." },
      { text: "Williams dotter Marie gav huset dess prägel: ett stenhus vid Rue Jeanson från 1861, en engelsk trädgård och salonger i Napoleon III-stil som fortfarande används. År 1887 började man gräva källare i kritberget under byn. Gångarna är i dag tre kilometer långa och ligger mer än tjugo meter under marken. På gården står en bronsstaty av kärleksguden Amor. Den har gett namn åt husets finaste vin, Amour de Deutz." },
      { text: "Huset förblev i släktens ägo i fem generationer, till slut under namnet Lallier. År 1993 var ekonomin ansträngd och familjen Rouzaud, som äger Louis Roederer, köpte huset. Roederer lät Deutz behålla sin egen ledning, sin egen källarmästare och sin egen stil. Sedan dess har produktionen vuxit från ungefär 600 000 flaskor om året till omkring 2,5 miljoner." },
      { text: "Stilen har inte ändrats. Deutz jäser sina viner i ståltank, aldrig på ekfat, för att druvans renhet ska konserveras. Ungefär fyra femtedelar av druvorna kommer från byar med grand cru- eller premier cru-status. Vinerna får ligga längre på jästen än reglerna kräver. Resultatet brukar beskrivas med tre ord: elegans, finess och friskhet. Sedan 2022 leds källaren av Caroline Latrive, husets första kvinnliga källarmästare." },
    ],
    facts: [
      { label: "Grundat", text: "1838 i Aÿ av William Deutz och Pierre-Hubert Geldermann." },
      { label: "Ägare", text: "Familjen Rouzaud (Louis Roederer) sedan 1993." },
      { label: "Vingård", text: "42 hektar egen mark, därtill druvor från omkring 200 hektar inom tre mil från Aÿ." },
      { label: "Produktion", text: "Omkring 2,5 miljoner flaskor om året." },
      { label: "Källare", text: "Tre kilometer gångar i kritberget, grävda 1887–1892." },
      { label: "Brut Classic", text: "Husets basvin, ungefär lika delar pinot noir, chardonnay och pinot meunier." },
      { label: "Cuvée William Deutz", text: "Årgångsvin med pinot noir som bas, uppkallat efter grundaren." },
      { label: "Amour de Deutz", text: "Årgångsvin på enbart chardonnay. Första årgången 1993, släppt 1999." },
    ],
    image: "/img/vineyard.jpg",
    imageAlt: "Vinodlingar i Champagne",
  },
];

// Tabellen i kapitel 6. "safe" = fylld cirkel, "good" = vit cirkel, null = välj hellre något annat.
export const pairingColumns = ["Blanc de blancs", "Brut (pinot-tung)", "Rosé", "Demi-sec"];
export const pairingRows: { cheese: string; marks: ("safe" | "good" | null)[] }[] = [
  { cheese: "Färskost och getost", marks: ["safe", "good", "good", null] },
  { cheese: "Vitmögel (brie, camembert)", marks: ["good", "safe", "safe", null] },
  { cheese: "Kittost (langres, munster)", marks: [null, "good", "safe", null] },
  { cheese: "Blåmögel (roquefort, ädelost)", marks: [null, null, "good", "safe"] },
  { cheese: "Hårdost (comté, Västerbotten)", marks: ["safe", "safe", "good", null] },
];

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}
