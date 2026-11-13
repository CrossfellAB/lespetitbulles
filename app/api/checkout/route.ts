import { NextResponse } from "next/server";
import { fredagsladan } from "@/content/site";
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
  const quantity = Number(body.quantity);

  if (!name || !phone) return NextResponse.json({ error: "Fyll i namn och telefon." }, { status: 400 });
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > fredagsladan.maxQuantity) {
    return NextResponse.json({ error: "Välj antal lådor." }, { status: 400 });
  }
  if (!isValidPickup(date, time)) {
    return NextResponse.json({ error: "Den hämtningstiden går inte längre att välja. Ladda om sidan och välj en ny tid." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Betalningen är inte aktiverad ännu. Ring oss så ordnar vi din låda." }, { status: 503 });
  }

  const pickup = `${dayLabel(date)} kl. ${time.replace(":", ".")}`;
  const base = siteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "sv",
      currency: "sek",
      line_items: [
        {
          quantity,
          price_data: {
            currency: "sek",
            unit_amount: fredagsladan.priceSek * 100,
            product_data: { name: "Fredagslådan", description: `Hämtas ${pickup} i Lindens Galleria` },
          },
        },
      ],
      phone_number_collection: { enabled: false },
      customer_creation: "if_required",
      metadata: { pickup_date: date, pickup_time: time, pickup, name, phone, note, quantity: String(quantity) },
      payment_intent_data: {
        description: `Fredagslådan × ${quantity} – hämtas ${pickup} – ${name}`,
        metadata: { pickup, name, phone, note },
      },
      custom_text: { submit: { message: `Du hämtar din Fredagslåda ${pickup} i Lindens Galleria, Norrköping.` } },
      success_url: `${base}/fredagsladan/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/fredagsladan?avbruten=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "Betalningen kunde inte startas. Försök igen om en stund eller ring oss." }, { status: 502 });
  }
}
