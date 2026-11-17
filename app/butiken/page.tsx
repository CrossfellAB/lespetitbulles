import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import VideoCarousel from "@/components/VideoCarousel";
import { videoTips } from "@/content/videos";
import { openingHoursText, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Butiken",
  description: "Franska ostar, chark, champagne och egna marmelader. Nytt på hyllan hos Les Petit Bulles i Norrköping.",
};

export default function Butiken() {
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">L'épicerie</p>
        <h1 className="h-xl">Butiken</h1>
        <p className="lead">
          Ostdisk, chark, champagne och delikatesser från Frankrike, plus marmelader från vårt eget kök. Vi skär gärna upp en bit
          att smaka.
        </p>
      </section>
      <section className="wrap">
        <Image className="page-photo" src="/img/cheeses.jpg" alt="Franska ostar på rad" width={1600} height={900} priority sizes="100vw" />
        {videoTips.length > 0 && <VideoCarousel videos={videoTips} />}
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <div className="section-head"><h2 className="h-l">Nytt på hyllan</h2></div>
          <ProductGrid />
          <div className="split" style={{ marginTop: 64 }}>
            <div className="fact">
              <h3>Besök oss</h3>
              <p>{site.address.line1}, {site.address.city}<br />{openingHoursText.map((o) => `${o.days} ${o.hours}`).join(" · ")}</p>
            </div>
            <div className="fact">
              <h3>Letar du present?</h3>
              <p>Korgar, presentkort och flaskor. <Link href="/presenter">Så beställer du en present →</Link></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
