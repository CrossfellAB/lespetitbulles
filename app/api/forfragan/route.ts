import { NextResponse } from "next/server";
import { mailConfigured, sendMail } from "@/lib/mail";

const allowedTypes = ["Catering", "After work", "Företagsevent", "Presenter", "Event & provningar", "Kontakt"];

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  // Skräppostfälla: riktiga besökare ser aldrig fältet.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const type = allowedTypes.includes(clean(body.type)) ? clean(body.type) : "Kontakt";
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const date = clean(body.date, 20);
  const guests = clean(body.guests, 10);
  const message = clean(body.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Fyll i namn, en giltig e-postadress och ett meddelande." }, { status: 400 });
  }

  if (!mailConfigured()) {
    return NextResponse.json({ error: "Formuläret är inte kopplat till e-post ännu." }, { status: 503 });
  }

  const text = [
    `Ny förfrågan via hemsidan: ${type}`,
    "",
    `Namn: ${name}`,
    `E-post: ${email}`,
    `Telefon: ${phone || "-"}`,
    date ? `Datum: ${date}` : "",
    guests ? `Antal personer: ${guests}` : "",
    "",
    message,
    "",
    "Svara direkt på det här mejlet för att svara kunden.",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");

  const ok = await sendMail({ subject: `${type} – förfrågan från ${name}`, text, replyTo: email });
  if (!ok) return NextResponse.json({ error: "Det gick inte att skicka just nu." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
