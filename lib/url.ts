// Sidans bas-URL. Produktion använder den egna domänen; förhandsversioner sin egen Vercel-adress.
const PRODUCTION_URL = "https://www.lespetitbulles.se";

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
