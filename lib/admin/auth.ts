// Inloggning för Josefins admin. Ett lösenord (ADMIN_PASSWORD i Vercel) och en signerad cookie.
// Signaturen görs med ADMIN_SESSION_SECRET och lösenordets hash, så byts lösenordet blir alla gamla
// inloggningar ogiltiga. Använder Web Crypto så att samma kod fungerar i middleware och i API-rutter.

export const SESSION_COOKIE = "lpb_admin";
export const SESSION_DAYS = 30;

const enc = new TextEncoder();

function b64url(buf: ArrayBuffer) {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sha256(text: string) {
  return b64url(await crypto.subtle.digest("SHA-256", enc.encode(text)));
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(process.env.ADMIN_SESSION_SECRET ?? ""), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

// Jämför utan att avslöja hur många tecken som stämde.
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function adminConfigured() {
  return (process.env.ADMIN_PASSWORD ?? "").length >= 10 && (process.env.ADMIN_SESSION_SECRET ?? "").length >= 32;
}

export async function checkPassword(input: unknown) {
  if (!adminConfigured() || typeof input !== "string" || input.length > 200) return false;
  return safeEqual(await sha256(input), await sha256(process.env.ADMIN_PASSWORD as string));
}

export async function createSession() {
  const exp = Date.now() + SESSION_DAYS * 86400_000;
  const pw = await sha256(process.env.ADMIN_PASSWORD ?? "");
  return `${exp}.${await hmac(`${exp}.${pw}`)}`;
}

export async function verifySession(token: string | undefined | null) {
  if (!adminConfigured() || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const pw = await sha256(process.env.ADMIN_PASSWORD ?? "");
  return safeEqual(sig, await hmac(`${exp}.${pw}`));
}
