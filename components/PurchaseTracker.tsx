"use client";

import { useEffect } from "react";
import { track } from "@/lib/pixel";

// Skickar Purchase till Meta en gång per betald Stripe-session (inte igen om sidan laddas om).
export default function PurchaseTracker({ sessionId, value, contents }: { sessionId: string; value: number; contents: { id: string; quantity: number }[] }) {
  useEffect(() => {
    const key = `lpb-purchase-${sessionId}`;
    try {
      if (localStorage.getItem(key)) return;
    } catch {}
    const sent = track("Purchase", { value, currency: "SEK", content_type: "product", contents, num_items: contents.reduce((n, c) => n + c.quantity, 0) }, sessionId);
    if (sent) try { localStorage.setItem(key, "1"); } catch {}
  }, [sessionId, value, contents]);
  return null;
}
