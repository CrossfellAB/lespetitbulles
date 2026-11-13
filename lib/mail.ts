import { site } from "@/content/site";

// Skickar mejl via Resend (https://resend.com). Utan RESEND_API_KEY returneras false
// och formulären visar i stället en länk för att mejla direkt.

export function mailConfigured() {
  return !!process.env.RESEND_API_KEY;
}

export async function sendMail(opts: { subject: string; text: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "Les Petit Bulles <onboarding@resend.dev>",
      to: [process.env.INQUIRY_TO || site.email],
      subject: opts.subject,
      text: opts.text,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return false;
  }
  return true;
}
