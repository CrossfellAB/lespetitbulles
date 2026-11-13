import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import { openingHoursText, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Hitta till Les Petit Bulles i Lindens Galleria, Norrköping. Öppettider, telefon och e-post.",
};

export default function Kontakt() {
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">Bienvenue</p>
        <h1 className="h-xl">Kontakt &amp; hitta hit</h1>
        <p className="lead">Du hittar oss i {site.address.line1} i {site.address.city}. Kom förbi, ring eller skriv en rad.</p>
      </section>
      <section className="section-tight">
        <div className="wrap split" style={{ maxWidth: 1180 }}>
          <div style={{ display: "grid", gap: 18 }}>
            <div className="fact"><h3>Adress</h3><p>{site.address.line1}<br />{site.address.city}</p></div>
            <div className="fact"><h3>Öppettider</h3><p>{openingHoursText.map((o) => (<span key={o.days}>{o.days} {o.hours}<br /></span>))}Söndag–tisdag stängt</p></div>
            <div className="fact"><h3>Telefon &amp; e-post</h3><p><a href={`tel:${site.phoneHref}`}>{site.phone}</a><br /><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
            <div className="fact"><h3>Instagram</h3><p><a href={site.instagram.url} target="_blank" rel="noopener noreferrer">{site.instagram.handle}</a></p></div>
          </div>
          <div className="panel wide">
            <h2 className="h-m" style={{ marginBottom: 6 }}>Skriv till oss</h2>
            <p className="small" style={{ marginTop: 0, marginBottom: 22 }}>Vi svarar oftast inom ett par dagar.</p>
            <InquiryForm type="Kontakt" email={site.email} messageLabel="Meddelande" />
          </div>
        </div>
      </section>
    </>
  );
}
