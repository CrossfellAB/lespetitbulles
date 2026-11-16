import { NextResponse } from "next/server";
import { catalog, deliSettings } from "@/content/deli";
import { dayLabel, isValidPickup } from "@/lib/pickup";
import { getStripe } from "@/lib/stripe";
import { siteUrl } from "@/lib/url";

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const date = clean(body.date, 10);
  const time = clean(body.time, 5);
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const note = clean(body.note, 300);

  // Varukorgen kommer som { id: antal }. Priser och namn tas alltid från katalogen, aldrig från webbläsaren.
  const rawItems = body.items && typeof body.items === "object" ? (body.items as Record<string, unknown>) : {};
  const lines: { id: string; name: string; priceSek: number; quantity: number }[] = [];
  for (const [id, q] of Object.entries(rawItems)) {
    const item = catalog[id];
    const quantity = Number(q);
    if (!item || !Number.isInteger(quantity) || quantity < 0 || quantity > deliSettings.maxPerLine) {
      return NextResponse.json({ error: "Något i varukorgen stämmer inte. Ladda om sidan och försök igen." }, { status: 400 });
    }
    if (quantity > 0) lines.push({ id, ...item, quantity });
  }

  if (!lines.length) return NextResponse.json({ error: "Varukorgen är tom." }, { status: 400 });
  if (!name || !phone) return NextResponse.json({ error: "Fyll i namn och telefon." }, { status: 400 });
  if (!isValidPickup(date, time)) {
    return NextResponse.json({ error: "Den hämtningstiden går inte längre att välja. Välj en ny tid." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Betalningen är inte aktiverad ännu. Ring oss så ordnar vi din beställning." }, { status: 503 });
  }

  const pickup = `${dayLabel(date)} kl. ${time.replace(":", ".")}`;
  const summary = lines.map((l) => `${l.quantity} × ${l.name}`).join("\n");
  const base = siteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "sv",
      currency: "sek",
      line_items: lines.map((l) => ({
        quantity: l.quantity,
        price_data: { currency: "sek", unit_amount: l.priceSek * 100, product_data: { name: l.name } },
      })),
      phone_number_collection: { enabled: false },
      customer_creation: "if_required",
      metadata: { pickup_date: date, pickup_time: time, pickup, name, phone, note, items: summary.slice(0, 500) },
      payment_intent_data: {
        description: `Deli To-Go – hämtas ${pickup} – ${name}`.slice(0, 1000),
        metadata: { pickup, name, phone, note },
      },
      custom_text: { submit: { message: `Du hämtar din beställning ${pickup} i Lindens Galleria, Norrköping.` } },
      success_url: `${base}/deli-to-go/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/deli-to-go?avbruten=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "Betalningen kunde inte startas. Försök igen om en stund eller ring oss." }, { status: 502 });
  }
}
