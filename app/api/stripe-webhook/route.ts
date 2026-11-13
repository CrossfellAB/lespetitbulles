import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendMail } from "@/lib/mail";
import { getStripe } from "@/lib/stripe";

// Mejlar Josefin när en Fredagslåda är betald. Kräver STRIPE_WEBHOOK_SECRET och RESEND_API_KEY.
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const signature = req.headers.get("stripe-signature") ?? "";
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const s = event.data.object as Stripe.Checkout.Session;
    if (s.payment_status === "paid") {
      const m = s.metadata ?? {};
      await sendMail({
        subject: `Ny Fredagslåda: ${m.quantity ?? 1} st – ${m.pickup}`,
        replyTo: s.customer_details?.email ?? undefined,
        text: [
          `Ny betald beställning av Fredagslådan.`,
          "",
          `Hämtas: ${m.pickup}`,
          `Antal: ${m.quantity}`,
          `Namn: ${m.name}`,
          `Telefon: ${m.phone}`,
          `E-post: ${s.customer_details?.email ?? "-"}`,
          `Önskemål: ${m.note || "-"}`,
          `Belopp: ${((s.amount_total ?? 0) / 100).toFixed(0)} kr`,
        ].join("\n"),
      });
    }
  }
  return NextResponse.json({ received: true });
}
