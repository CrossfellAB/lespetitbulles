import Link from "next/link";
import { events, type EventItem } from "@/content/events";

const months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
const weekdays = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];

function todayKey() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm" }).format(new Date());
}

export function upcomingEvents(): EventItem[] {
  const today = todayKey();
  return events
    .filter((e) => !e.date || e.date >= today)
    .sort((a, b) => (a.date ?? "0000").localeCompare(b.date ?? "0000"));
}

export default function EventList({ limit, linkTo = "/event" }: { limit?: number; linkTo?: string }) {
  const list = upcomingEvents().slice(0, limit);
  if (!list.length) {
    return <p className="lead">Just nu har vi inga inbokade provningar. Hör av dig om du vill veta när nästa blir av.</p>;
  }
  return (
    <div className="events">
      {list.map((e) => {
        let dateBlock;
        if (e.date) {
          const [y, m, d] = e.date.split("-").map(Number);
          const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
          dateBlock = (<><div className="d">{d}</div><div className="m">{months[m - 1]} · {weekdays[wd]}</div></>);
        } else {
          const [first, ...rest] = (e.recurring ?? "").split(" ");
          dateBlock = (<><div className="r">{first.toLowerCase()}</div><div className="m">{rest.join(" ")}</div></>);
        }
        const inner = (
          <>
            <div className="event-date">{dateBlock}</div>
            <div className="event-text">
              <h3>{e.title}{e.example && <span className="tag-example">Exempel</span>}</h3>
              <p>{e.time}{e.price ? ` · ${e.price}` : ""} · {e.description}</p>
            </div>
            <span className={e.dropIn ? "pill quiet" : "pill"}>{e.dropIn ? "Drop-in · kom förbi" : "Anmäl intresse"}</span>
          </>
        );
        const key = e.title + (e.date ?? "");
        return e.dropIn ? (
          <div key={key} className="event">{inner}</div>
        ) : (
          <Link key={key} href={`${linkTo}?event=${encodeURIComponent(e.title)}#anmalan`} className="event">{inner}</Link>
        );
      })}
    </div>
  );
}
