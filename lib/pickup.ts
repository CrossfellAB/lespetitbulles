import { closedDates, fredagsladan, openingHours } from "@/content/site";

// Allt räknas i svensk tid oavsett var servern eller besökaren befinner sig.
// Tider jämförs som "lokal tid tolkad som UTC", vilket gör jämförelserna oberoende av sommartid.

const TZ = "Europe/Stockholm";

type LocalParts = { y: number; m: number; d: number; hh: number; mm: number };

function stockholmParts(date: Date): LocalParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day"), hh: get("hour"), mm: get("minute") };
}

const toKey = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fmtTime = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

export type PickupDay = { date: string; label: string; times: string[] };

const weekdayNames = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
const monthNames = ["jan", "feb", "mars", "april", "maj", "juni", "juli", "aug", "sep", "okt", "nov", "dec"];

export function dayLabel(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const name = weekdayNames[wd];
  return `${name[0].toUpperCase()}${name.slice(1)} ${d} ${monthNames[m - 1]}`;
}

export function getPickupDays(now: Date = new Date()): PickupDay[] {
  const p = stockholmParts(now);
  const nowLocal = Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm);
  const earliest = nowLocal + fredagsladan.leadTimeHours * 60 * 60 * 1000;
  const days: PickupDay[] = [];

  for (let i = 0; i <= fredagsladan.daysAhead; i++) {
    const day = new Date(Date.UTC(p.y, p.m - 1, p.d + i));
    const wd = day.getUTCDay();
    const hours = openingHours[wd];
    const key = toKey(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate());
    if (!hours || closedDates.includes(key)) continue;

    const first = minutes(hours.open);
    const last = minutes(hours.close) - fredagsladan.lastPickupBeforeCloseMinutes;
    const times: string[] = [];
    for (let t = first; t <= last; t += fredagsladan.slotMinutes) {
      const slot = day.getTime() + t * 60 * 1000;
      if (slot >= earliest) times.push(fmtTime(t));
    }
    if (times.length) days.push({ date: key, label: dayLabel(key), times });
  }
  return days;
}

export function isValidPickup(date: string, time: string, now: Date = new Date()) {
  const day = getPickupDays(now).find((d) => d.date === date);
  return !!day && day.times.includes(time);
}
