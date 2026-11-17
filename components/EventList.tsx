import Link from "next/link";
import { recurringEvents } from "@/content/events";
import { getEvents } from "@/lib/store";

const months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
const weekdays = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];

type Row = { key: string; title: string; date?: string; recurring?: string; time?: string; price?: string; description: string; dropIn: boolean };

export function todayKey() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm" }).format(new Date());
}

async function upcoming(): Promise<Row[]> {
  const today = todayKey();
  const dated = (await getEvents())
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({ ...e, key: e.id }));
  const recurring = recurringEvents.map((e) => ({ ...e, key: e.title, dropIn: true }));
  return [...recurring, ...dated];
}

export default async function EventList({ limit, linkTo = "/event" }: { limit?: number; linkTo?: string }) {
  const list = (await upcoming()).slice(0, limit);
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
        const meta = [e.time, e.price].filter(Boolean).join(" · ");
        const inner = (
          <>
            <div className="event-date">{dateBlock}</div>
            <div className="event-text">
              <h3>{e.title}</h3>
              <p>{meta ? `${meta} · ` : ""}{e.description}</p>
            </div>
            <span className={e.dropIn ? "pill quiet" : "pill"}>{e.dropIn ? "Drop-in · kom förbi" : "Anmäl intresse"}</span>
          </>
        );
        return e.dropIn ? (
          <div key={e.key} className="event">{inner}</div>
        ) : (
          <Link key={e.key} href={`${linkTo}?event=${encodeURIComponent(e.title)}#anmalan`} className="event">{inner}</Link>
        );
      })}
    </div>
  );
}
