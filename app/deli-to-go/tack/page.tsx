import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Tack för din beställning", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Tack({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let pickup: string | undefined;
  let paid = false;
  const stripe = getStripe();
  if (stripe && session_id?.startsWith("cs_")) {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      pickup = s.metadata?.pickup;
      paid = s.payment_status === "paid";
    } catch {}
  }
  return (
    <section className="wrap-narrow page-hero center" style={{ paddingBottom: 96 }}>
      <p className="eyebrow">Merci!</p>
      <h1 className="h-xl">Tack för din beställning</h1>
      {pickup ? (
        <p className="lead">
          Din beställning står klar <b>{pickup}</b> i {site.address.line1}.
          {paid ? " Kvittot har skickats till din e-post." : " Vi bekräftar så snart betalningen är klar."}
        </p>
      ) : (
        <p className="lead">Vi har tagit emot din beställning. Kvittot och hämtningstiden finns i mejlet från Stripe.</p>
      )}
      <p className="small" style={{ marginTop: 24 }}>Behöver du ändra något? Ring {site.phone}.</p>
      <div className="btn-row"><Link href="/" className="btn btn-line">Till startsidan</Link></div>
    </section>
  );
}
