// "Nytt på hyllan": upp till åtta nyheter. De fyra första visas på startsidan, alla under Butiken.
// Josefin byter ut dem i admin (/admin). Listan nedan används bara tills första gången något sparas där.

import type { StoredProduct } from "@/lib/store";

export const products: StoredProduct[] = [
  {
    category: "Deli · Paris",
    name: "Sauce Béarnaise, Bornibus",
    description: "Klassisk béarnaise från det parisiska senapshuset Bornibus, grundat 1855. Krämig, med dragon och en frisk syra. Självklar till entrecôte och pommes.",
    image: "/img/hyllan-bearnaise.jpg",
  },
  {
    category: "Deli · Isle of Wight",
    name: "Black Garlic Purée",
    description: "Svart vitlök har mognat långsamt i värme tills den blivit mjuk, söt och nästan lakritsaktig. Här som puré i tub från The Garlic Farm. Lyfter såser, dressingar och ostbrickan.",
    image: "/img/hyllan-svartvitlok.jpg",
  },
  {
    category: "Sött · Frankrike",
    name: "Bretzels i mörk choklad",
    description: "Krispiga saltkringlor doppade i mörk choklad från Le Comptoir de Mathilde. Salt och sött i fin balans, och en färdig julklapp i sin festliga påse.",
    image: "/img/hyllan-bretzels.jpg",
  },
  {
    category: "Deli · Paris",
    name: "Pesto Sicilien, Bornibus",
    description: "Grov och smakrik pesto på sicilianskt vis. Rör ner i pasta, bred på crostini eller ringla över mozzarella och tomat.",
    image: "/img/hyllan-pesto.jpg",
  },
  {
    category: "Deli · Paris",
    name: "Sauce au Poivre Noir, Bornibus",
    description: "Krämig sås med rejält med svartpeppar. Gör fredagsbiffen till bistromiddag på nolltid.",
    image: "/img/hyllan-poivre.jpg",
  },
  {
    category: "Deli · Sverige",
    name: "Krut Kycklig med Black Garlic",
    description: "Kryddblandning med svart vitlök, gjord för kyckling. Gnid in före ugn eller grill. Finns även som Krut Strössel att strö över ägg och avokado.",
    image: "/img/hyllan-krut.jpg",
  },
  {
    category: "Deli · London",
    name: "Honest Umami Chilli",
    description: "Umami, chili och salt i en burk. Använd som vanligt salt och få mer djup och lagom hetta i wok, äggröra och pommes. Finns även som All Purpose.",
    image: "/img/hyllan-umami.jpg",
  },
];
