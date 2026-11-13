import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/url";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const work = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-work", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: "sv_SE", siteName: site.name, images: ["/img/glass-brie.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${playfair.variable} ${work.variable}`}>
      <body>
        <Header />
        <main id="innehall">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
