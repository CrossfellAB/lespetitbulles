// Josefins videotips på Butiken-sidan. Visas i den ordning de står här, så lägg nya överst.
// Videofilen och affischbilden ligger i public/video/ med samma namn som slug.
// Klipp bort intro och outro och komprimera till 720×960 innan filen läggs in (se README).

export type VideoTip = {
  slug: string;
  title: string;
  text: string; // en rad under videon
  seconds: number; // längd efter klippning
};

export const videoTips: VideoTip[] = [
  {
    slug: "gammelknas",
    title: "Gammelknas",
    text: "Döm aldrig en ost efter utseendet. Prova den med en klick jalapeñomarmelad.",
    seconds: 40,
  },
  {
    slug: "beemster",
    title: "Beemster Grand Cru",
    text: "Lagrad holländsk gouda med smak av brynt smör och smörkola. Ät den i rejäla bitar.",
    seconds: 55,
  },
  {
    slug: "montagnolo",
    title: "Montagnolo",
    text: "Mild och krämig grönmögelost. Bäst med fikonmarmelad och ett enkelt kex.",
    seconds: 60,
  },
  {
    slug: "ankrillette",
    title: "Ankrillette",
    text: "Ankkött som kokats länge i ankfett. Gott på tunnbrödschips med lite fikonmarmelad.",
    seconds: 39,
  },
];
