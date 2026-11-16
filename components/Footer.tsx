import Link from "next/link";
import Image from "next/image";
import { openingHoursText, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Image src="/img/logo.png" alt="Les Petit Bulles" width={224} height={224} />
          <p>Champagnebar &amp; deli<br />i Norrköping</p>
        </div>
        <div>
          <h3>Hitta oss</h3>
          <p>{site.address.line1}<br />{site.address.city}</p>
        </div>
        <div>
          <h3>Öppettider</h3>
          <p>{openingHoursText.map((o) => (<span key={o.days}>{o.days} {o.hours}<br /></span>))}</p>
        </div>
        <div>
          <h3>Kontakt</h3>
          <p>
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a><br />
            <a href={`mailto:${site.email}`}>{site.email}</a><br />
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">Instagram {site.instagram.handle}</a><br />
            <a href={site.facebook.url} target="_blank" rel="noopener noreferrer">Facebook</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}{site.company.name ? ` · ${site.company.name}` : ""}{site.company.orgNr ? ` · Org.nr ${site.company.orgNr}` : ""}</span>
        <span><Link href="/kontakt">Kontakt</Link> · <Link href="/villkor">Köpvillkor &amp; integritet</Link></span>
      </div>
    </footer>
  );
}
