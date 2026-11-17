import type { Metadata } from "next";
import { glassMenu, menu, menuPdf, type MenuItem } from "@/content/meny";
import { openingHoursText, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Meny",
  description: "Champagne på glas och flaska, vin, öl och snacks i champagnebaren i Lindens Galleria, Norrköping.",
};

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="menu-item">
      <div className="menu-row">
        <span className="menu-name">{item.name}</span>
        <span className="menu-dots" aria-hidden="true" />
        <span className="menu-price">{item.price}</span>
      </div>
      {item.sub && <p className="menu-sub">{item.sub}</p>}
      {item.text && <p className="menu-text">{item.text}</p>}
    </li>
  );
}

export default function Meny() {
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">La carte</p>
        <h1 className="h-xl">Menyn</h1>
        <p className="lead">
          Champagne på glas och flaska, vin och små rätter från delidisken. Menyn ändras med säsongen, så fråga gärna i baren.
        </p>
        <p className="small" style={{ marginTop: 14 }}>
          {site.address.line1} · {openingHoursText.map((o) => `${o.days} ${o.hours}`).join(" · ")}
        </p>
      </section>

      <section className="wrap" style={{ maxWidth: 980 }}>
        <div className="glass-card">
          <p className="eyebrow">Den här veckan</p>
          <h2 className="h-l">Champagne på glas</h2>
          <ul className="menu-list">
            {glassMenu.map((i) => (<Item key={i.name} item={i} />))}
          </ul>
        </div>
        <nav className="menu-nav" aria-label="Menyns avsnitt">
          {menu.map((g) => (<a key={g.id} href={`#${g.id}`}>{g.title}</a>))}
          <a href={menuPdf.href} target="_blank" rel="noopener noreferrer" className="menu-pdf">Hela menyn som PDF ↓</a>
        </nav>
      </section>

      <section className="section-tight">
        <div className="wrap" style={{ maxWidth: 980 }}>
          {menu.map((g) => (
            <div className="menu-group" id={g.id} key={g.id}>
              <h2 className="h-l">{g.title}</h2>
              <div className="menu-sections">
                {g.sections.map((s) => (
                  <section className="menu-section" key={s.title}>
                    <div className="menu-section-head">
                      <h3>{s.title}</h3>
                      {s.priceNote && <span>{s.priceNote}</span>}
                    </div>
                    {s.intro && <p className="menu-intro">{s.intro}</p>}
                    {s.items.length > 0 && (
                      <ul className="menu-list">
                        {s.items.map((i) => (<Item key={i.name + i.price} item={i} />))}
                      </ul>
                    )}
                    {s.note && <p className="menu-note">{s.note}</p>}
                  </section>
                ))}
              </div>
            </div>
          ))}
          <p className="small center" style={{ marginTop: 40 }}>
            Priser i kronor. Menyn uppdaterad {menuPdf.updated}. Med reservation för slutförsäljning.{" "}
            <a href={menuPdf.href} target="_blank" rel="noopener noreferrer">Ladda ner menyn som PDF</a>
          </p>
        </div>
      </section>
    </>
  );
}
